﻿
/**
  * Opciones del editor de capas WFS.
  * 
  * Si se desea que este control pueda funcionar en sesiones sin acceso a Internet, es necesario instalar 
  * en el ámbito de la aplicación que contiene el visor el _[Service Worker](https://developer.mozilla.org/es/docs/Web/API/Service_Worker_API)_ 
  * creado para el funcionamiento de este control en modo desconectado.
  * Para ello basta con copiar el archivo [tc-cb-service-worker.js](https://raw.githubusercontent.com/sitna/api-sitna/master/TC/workers/tc-cb-service-worker.js) a la carpeta raíz de dicha aplicación.
  * @typedef WFSEditOptions
  * @extends SITNA.control.ControlOptions
  * @memberof SITNA.control
  * @see SITNA.control.MapControlOptions
  * @property {HTMLElement|string} [div] - Elemento del DOM en el que crear el control o valor de atributo id de dicho elemento.
  * @property {SITNA.ElevationOptions|boolean} [downloadElevation=false] - Si se establece a un valor verdadero, el control ofrecerá la opción de añadir elevaciones
  * a las geometrías cuando se descarguen las entidades.
  * @property {boolean} [highlightChanges=true] - Si se establece a un valor verdadero, se resaltarán en el mapa con estilo distintivo
  * las entidades modificadas, con un estilo distinto según el tipo de edición (entidad añadida, modificada o eliminada).
  * @property {boolean} [showOriginalFeatures=false] - Si se establece a un valor verdadero, se mostrarán en el mapa las entidades
  * modificadas junto con las mismas entidades antes de ser modificadas, para poder establecer comparaciones.
  * @property {boolean} [snapping=true] - Si se establece a un valor verdadero, la edición de geometrías tendrá un comportamiento 
  * en el que los vértices se "pegarán" y alinearán con otros vértices y aristas al acercarlos a ellos, a la manera de imanes.
  * @property {SITNA.layer.StyleOptions} [styles] - Opciones de los estilos de las entidades editadas, por tipo de geometría.
  * @example <caption>[Ver en vivo](../examples/cfg.WFSEditOptions.html)</caption> {@lang html}
  * <div id="mapa"></div>
  * <script>
  *     // Establecemos un layout simplificado apto para hacer demostraciones de controles.
  *     SITNA.Cfg.layout = "layout/ctl-container";
  *     // Añadimos el control multiFeatureInfo.
  *     SITNA.Cfg.controls.WFSEdit = {
  *         div: "slot1",
  *         downloadElevation: { // Si se desacargan las entidades, se ofrece la opción de añadirles elevaciones
  *             resolution: 20 // Si se interpolan puntos intermedios, por defecto se añadirán cada 20 metros
  *         }
  *     };
  *     // Añadimos una capa WMS sobre la que hacer las consultas.
  *     // El servicio WMS de IDENA tiene un servicio WFS asociado (imprescindible para consultas por línea o recinto).
  *     SITNA.Cfg.workLayers = [
  *         {
  *             id: "cp",
  *             type: SITNA.Consts.layerType.WMS,
  *             url: "https://idena.navarra.es/ogc/wms",
  *             layerNames: ["IDENA:PATRIM_Pol_Merindades"]
  *         }
  *     ];
  *     var map = new SITNA.Map("mapa");
  * </script>
  */

import localforage from 'localforage';
import TC from '../../TC';
import Consts from '../Consts';
import SWCacheClient from './SWCacheClient';
import Geometry from '../Geometry';
import Vector from '../../SITNA/layer/Vector';
import filter from '../filter';
import Toggle from '../../SITNA/ui/Toggle';
import Point from '../../SITNA/feature/Point';
import MultiPoint from '../../SITNA/feature/MultiPoint';
import Polyline from '../../SITNA/feature/Polyline';
import MultiPolyline from '../../SITNA/feature/MultiPolyline';
import Polygon from '../../SITNA/feature/Polygon';
import MultiPolygon from '../../SITNA/feature/MultiPolygon';

TC.control = TC.control || {};
TC.control.SWCacheClient = SWCacheClient;
TC.Geometry = Geometry;
TC.layer = TC.layer || {};
TC.layer.Vector = Vector;
TC.filter = filter;


TC.control.WFSEdit = function () {
    const self = this;

    TC.control.SWCacheClient.apply(this, arguments);
    self.serviceWorkerIsRequired = self.options.serviceWorkerIsRequired || false;

    self._classSelector = '.' + self.CLASS;

    self.layer = null;
    //self.feature = self.options.feature ? self.options.feature : null;
    self.callback = TC.Util.isFunction(arguments[2]) ?
        arguments[2] :
        self.options.callback ? self.options.callback : null;
    self.layersEditData = {};
    self.showsOriginalFeatures = typeof self.options.showOriginalFeatures === 'boolean' ? self.options.showOriginalFeatures : false;
    self.highlightsAdded = self.highlightsModified = self.highlightsRemoved = typeof self.options.highlightChanges === 'boolean' ? self.options.highlightChanges : true;
    if (!TC.Util.isFunction(self.options.getBeforeEditLayerStyleFunction)) {
        self.getBeforeEditLayerStyleFunction = self.getBeforeEditLayerStyle;
    }
    self.styles = self.options.styles || {
        point: {
            fillColor: "#0000aa",
            fillOpacity: 0.1,
            strokeColor: "#0000aa",
            strokeWidth: 2,
            strokeOpacity: 1,
            radius: 6
        },
        line: {
            strokeColor: "#0000aa",
            strokeWidth: 2,
            strokeOpacity: 1
        },
        polygon: {
            fillColor: "#0000aa",
            fillOpacity: 0.1,
            strokeColor: "#0000aa",
            strokeWidth: 2,
            strokeOpacity: 1
        }
    };
};

TC.inherit(TC.control.WFSEdit, TC.control.SWCacheClient);

(function () {
    var newFeatureIdNumber = 0;
    const getNewFeatureId = function () {
        return "NewFeature." + newFeatureIdNumber++;
    };

    const setSyncState = function (ctl) {
        const layerEditData = ctl.getLayerEditData();
        ctl._saveBtn.disabled = !(navigator.onLine && layerEditData && layerEditData.checkedOut) || ctl.isSyncing;
    };

    const setEditState = function (ctl, enabled) {
        ctl.div.querySelector(ctl._classSelector + '-view').classList.toggle(Consts.classes.HIDDEN, !enabled || !ctl.layer || !(ctl.layer.type === Consts.layerType.WFS || ctl.layer.type === Consts.layerType.WMS));
        if (ctl.layer && ctl.layer.wfsLayer) {
            const isLayerCropped = TC.filter && TC.filter.Bbox && ctl.layer.wfsLayer.properties instanceof TC.filter.Bbox;
            ctl._recropBtn.classList.toggle(Consts.classes.HIDDEN, !isLayerCropped);
        }
        ctl.div.querySelector(ctl._classSelector + '-edit').classList.toggle(Consts.classes.HIDDEN, !enabled);
    };

    const setChangesButtonsState = function (ctl) {
        setSyncState(ctl);
        const layerEditData = ctl.getLayerEditData();
        ctl._discardBtn.disabled = !layerEditData || !layerEditData.checkedOut;
    };

    const setChangedState = function (ctl, isChanged) {
        if (ctl.layer) {
            const layerEditData = ctl.getLayerEditData();
            if (typeof isChanged !== 'undefined') {
                layerEditData.checkedOut = isChanged;
                setChangesButtonsState(ctl);
            }
            else {
                var storagePrefix = getStoragePrefix(ctl);
                localforage.keys().then(function (keys) {
                    if (keys) {
                        var disabled = true;
                        for (var i = 0, len = keys.length; i < len; i++) {
                            if (keys[i].indexOf(storagePrefix) === 0) {
                                disabled = false;
                                break;
                            }
                        }
                        layerEditData.checkedOut = !disabled;
                        setChangesButtonsState(ctl);
                    }
                }, err => console.warn(err));
            }
        }
        else {
            setChangesButtonsState(ctl);
        }
    };

    const storeFeature = async function (key, feature) {
        var obj;
        var geometryType;
        switch (true) {
            case feature instanceof Polygon:
                geometryType = Consts.geom.POLYGON;
                break;
            case feature instanceof Polyline:
                geometryType = Consts.geom.POLYLINE;
                break;
            case feature instanceof Point:
                geometryType = Consts.geom.POINT;
                break;
            case feature instanceof MultiPolygon:
                geometryType = Consts.geom.MULTIPOLYGON;
                break;
            case feature instanceof MultiPolyline:
                geometryType = Consts.geom.MULTIPOLYLINE;
                break;
            case feature instanceof MultiPoint:
                geometryType = Consts.geom.MULTIPOINT;
                break;
        }
        obj = {
            id: feature.id || feature.provId,
            attributes: feature.data,
            type: geometryType,
            geometry: feature.geometry
        };
        try {
            await localforage.setItem(key, obj);
            return { feature: feature };
        }
        catch (error) {
            throw { feature: feature, error: error };
        }
    };


    const deleteFeature = async function (key) {
        await localforage.removeItem(key);
        return key;
    };

    const readFeature = async function (key) {
        const value = await localforage.getItem(key);
        return {
            key: key,
            feature: value
        };
    };

    const getLayerStoreID = function (layer) {
        let featureType = layer.options.featureType[0];
        if (featureType.indexOf(':') < 0) {
            featureType = layer.options.featureNS + ':' + featureType;
        }
        return featureType + '@' + layer.options.url;
    };

    const getStoragePrefix = function (ctl, layer) {
        return ctl.LOCAL_STORAGE_KEY_PREFIX + getLayerStoreID(layer || ctl.layer.wfsLayer || ctl.layer);
    };

    const getAddedStoragePrefix = function (ctl, layer) {
        return getStoragePrefix(ctl, layer) + ctl.LOCAL_STORAGE_ADDED_KEY_PREFIX;
    };

    const getModifiedStoragePrefix = function (ctl, layer) {
        return getStoragePrefix(ctl, layer) + ctl.LOCAL_STORAGE_MODIFIED_KEY_PREFIX;
    };

    const getRemovedStoragePrefix = function (ctl, layer) {
        return getStoragePrefix(ctl, layer) + ctl.LOCAL_STORAGE_REMOVED_KEY_PREFIX;
    };

    const getLayerTitle = function (layer) {
        return layer.getPath ? layer.getPath().join(' • ') : layer.title || layer.id;
    };

    const ctlProto = TC.control.WFSEdit.prototype;

    ctlProto.CLASS = 'tc-ctl-wfsedit';

    ctlProto.LOCAL_STORAGE_KEY_PREFIX = "TC.offline.edit.";
    ctlProto.LOCAL_STORAGE_ADDED_KEY_PREFIX = ".added.";
    ctlProto.LOCAL_STORAGE_MODIFIED_KEY_PREFIX = ".modified.";
    ctlProto.LOCAL_STORAGE_REMOVED_KEY_PREFIX = ".removed.";

    ctlProto.register = async function (map) {
        const self = this;

        await TC.control.SWCacheClient.prototype.register.call(self, map);

        window.addEventListener('online', function () {
            setSyncState(self);
        });
        window.addEventListener('offline', function () {
            setSyncState(self);
        });

        map.loaded(function () {
            self._layerSelect.disabled = false;

            if (self.options.layer) {
                self.setLayer(self.options.layer);
            }
            else {
                const wfsLayers = map.workLayers.filter(function (elm) {
                    return elm.type === Consts.layerType.WFS && !elm.options.stealth;
                });
                if (wfsLayers.length === 1) {
                    self.setLayer(wfsLayers[0].id);
                }
                else {
                    self.setLayer(null);
                }
            }

            self.showOriginalFeatures(self.showsOriginalFeatures);
        });

        map.ready(function () {
            map.getControlsByClass('TC.control.WorkLayerManager').forEach(function (ctl) {
                ctl.addItemTool({
                    renderFn: function (container, layerId) {
                        const className = self.CLASS + '-btn-edit';
                        let button = container.querySelector('sitna-toggle.' + className);
                        if (!button) {
                            const text = self.getLocaleString('featureEditing');
                            button = new Toggle();
                            button.text = text;
                            button.classList.add(className);
                            button.checkedIconText = getComputedStyle(document.querySelector(':root'))
                                .getPropertyValue('--icon-edit')
                                .replaceAll('"', '');
                            button.uncheckedIconText = button.checkedIconText;
                            button.dataset.layerId = layerId;
                            const layer = map.getLayer(layerId);
                            if (layer.type === Consts.layerType.WMS) {
                                button.classList.add(Consts.classes.LOADING);
                                layer.getWFSCapabilities()
                                    .catch(() => button.classList.add(Consts.classes.HIDDEN))
                                    .finally(() => button.classList.remove(Consts.classes.LOADING));
                            }
                        }
                        return button;
                    },
                    updateEvents: [Consts.event.BEFORELAYERUPDATE, Consts.event.LAYERUPDATE, Consts.event.LAYERERROR, Consts.event.CONTROLACTIVATE, Consts.event.CONTROLDEACTIVATE],
                    updateFn: function (_e) {
                        const button = this;
                        const layer = map.getLayer(button.dataset.layerId);
                        setTimeout(() => {
                            button.classList.toggle(Consts.classes.ACTIVE, self.layer === layer);
                        }, 500);
                        button.disabled = !layer || layer.isRaster() && layer.names.length !== 1;
                    },
                    actionFn: function () {
                        const button = this;
                        const layer = map.getLayer(button.dataset.layerId);
                        const prevLayer = self.layer;
                        button.classList.remove(Consts.classes.ACTIVE);
                        if (layer.names && layer.names.length === 1 || !layer.isRaster()) {
                            if (layer && prevLayer !== layer) {
                                self.setLayer(layer).then(() => {
                                    //button.classList.toggle(Consts.classes.ACTIVE, self.layer === layer);
                                    self.openEditSession();
                                });
                            }
                            else {
                                self.setLayer(null);
                            }
                        }
                    }
                });
            });
        });

        self._editPromise = map.addControl('edit', {
            id: self.getUID(),
            div: self.div.querySelector(`.${self.CLASS}-edit`),
            styles: self.styles,
            downloadElevation: self.options.downloadElevation,
            snapping: self.options.snapping
        });

        self.editControl = await self._editPromise;

        self.editControl.getAvailableFeaturesToImport = function () {
            const candidates = Object.getPrototypeOf(self.editControl).getAvailableFeaturesToImport.call(self.editControl);
            const layerEditData = self.getLayerEditData();
            return candidates.filter(obj => {
                const layer = map.getLayer(obj.id);
                return layer !== layerEditData.addedFeaturesLayer &&
                    layer !== layerEditData.modifiedFeaturesLayer &&
                    layer !== layerEditData.removedFeaturesLayer &&
                    layer !== layerEditData.beforeEditLayer;
            });
        };
        self.editControl.importFeatures = function (features) {
            const featuresToImport = features || this.featuresToImport || [];
            const layerEditData = self.getLayerEditData();
            const newFeatures = layerEditData.attributes ? featuresToImport.map(function (feature) {
                const properties = {};
                for (let key in layerEditData.attributes) {
                    properties[key] = feature.data[key];
                }
                return new feature.constructor(feature.geometry, { geometryName: layerEditData.geometryName, data: properties });
            }) : features;
            Object.getPrototypeOf(self.editControl).importFeatures.call(self.editControl, newFeatures);
        };
        self.editControl
            .on(Consts.event.DRAWEND, function (e) {
                if (self.getLayerEditData().serializable) {
                    self._storeFeatureAdd(e.feature);
                }
            })
            .on(Consts.event.FEATUREMODIFY, function (e) {
                const feat = e.feature;
                const fid = feat.provId || feat.id;
                const storeSuccess = function () {
                    setChangedState(self, true);
                };
                const storeFailure = function () {
                    TC.error(self.getLocaleString('failedWhenSavingModifyOperationInSession'));
                };
                const layerEditData = self.getLayerEditData();
                if (layerEditData.serializable) {
                    let storedFeature = layerEditData.addedFeaturesLayer.getFeatureById(fid);
                    if (storedFeature) {
                        storedFeature.setCoords(feat.geometry);
                        storedFeature.setData(feat.getData());
                        storeFeature(getAddedStoragePrefix(self) + fid, feat).then(storeSuccess, storeFailure);
                    }
                    else {
                        storedFeature = layerEditData.modifiedFeaturesLayer.getFeatureById(fid);
                        if (storedFeature) {
                            storedFeature.setCoords(feat.geometry);
                            storedFeature.setData(feat.getData());
                        }
                        else {
                            layerEditData.modifiedFeaturesLayer.addFeature(self._createAuxFeature(feat));
                        }
                        storeFeature(getModifiedStoragePrefix(self) + fid, feat).then(storeSuccess, storeFailure);
                    }
                }
            })
            .on(Consts.event.FEATUREADD, function (e) {
                if (self.getLayerEditData().serializable) {
                    self._storeFeatureAdd(e.feature);
                }
            })
            .on(Consts.event.FEATUREREMOVE, function (e) {
                if (self.getLayerEditData().serializable) {
                    self._storeFeatureRemove(e.feature);
                }
            });

        map.workLayers.forEach(layer => self.addLayer(layer));

        map
            .on(Consts.event.LAYERUPDATE, function (e) {
                const layer = e.layer;
                if (layer.type === Consts.layerType.WFS && !layer.options.readOnly) {
                    self.getEditableLayer(layer)
                        .then(l => self.cacheLayer(l))
                        .catch(_err => console.log('Layer not editable: ' + layer.id));
                }
            })
            .on(Consts.event.ZOOM, function (_e) {
                map.workLayers
                    .filter(l => l.wfsLayer)
                    .filter(l => self.layer !== l)
                    .forEach(function (layer) {
                        layer.wfsLayer = null;
                        self.getEditableLayer(layer);
                    });
            })
            .on(Consts.event.LAYERADD, function (e) {
                self.addLayer(e.layer);
            })
            .on(Consts.event.LAYERREMOVE, function (e) {
                const layer = e.layer;
                if (self._removingLayer === layer) {
                    return;
                }
                if (self.layer === layer || layer.wmsLayer && self.layer === layer.wmsLayer) {
                    self.setLayer(null);
                }
                const option = self._layerSelect.querySelector(`option[value="${layer.id}"]`);
                if (option) {
                    option.parentElement.removeChild(option);
                }
            })
            .on(Consts.event.LAYERERROR, function (e) {
                const layer = e.layer;
                if (layer.type === Consts.layerType.WFS && !layer.options.readOnly) {
                    if (e.reason === Consts.WFSErrors.MAX_NUM_FEATURES) {
                        map.toast(self.getLocaleString('query.msgTooManyResults', { limit: e.data.limit }), { type: Consts.msgType.WARNING });
                    }
                    if (self.layer === layer || self.layer && self.layer.wfsLayer === layer) {
                        delete self.layersEditData[self.layer.id];
                        self.setLayer(null);
                    }
                    if (layer.wmsLayer) {
                        map.removeLayer(layer);
                        layer.wmsLayer.wfsLayer = null;
                    }
                }
            });

        return self;
    };

    ctlProto.loadTemplates = async function () {
        const self = this;
        const module = await import('../templates/tc-ctl-wfsedit.mjs');
        self.template = module.default;
    };

    ctlProto.render = function (callback) {
        const self = this;
        var editLayers = [];
        if (self.map) {
            for (var i = 0, len = self.map.workLayers.length; i < len; i++) {
                var wl = self.map.workLayers[i];
                if (wl.type === Consts.layerType.WFS && !wl.options.stealth) {
                    editLayers.push({
                        id: wl.id,
                        title: wl.title || wl.id
                    });
                }
            }
        }
        return self._set1stRenderPromise(TC.Control.prototype.renderData.call(self, {
            layers: editLayers,
            showOriginalFeatures: self.showsOriginalFeatures,
            highlightChanges: self.highlightsAdded || self.highlightsModified || self.highlightsRemoved,
            controlId: self.id
        }, function () {

            self._layerDiv = self.div.querySelector(self._classSelector + '-layer');
            self._layerSelect = self._layerDiv.querySelector(self._classSelector + '-layer-sel');
            self._layerSelect.addEventListener('change', function (_e) {
                setEditState(self, false);
                self.getEditableLayer(self._layerSelect.value)
                    .then(function (layer) {
                        self.setLayer(layer.wmsLayer || layer).then(function () {
                            if (self.layer) {
                                self.openEditSession();
                            }
                        });
                    })
                    .catch(() => {
                        self.setLayer(null);
                    });
            });

            const viewToolsDiv = self.div.querySelector(self._classSelector + '-view');

            self._editingWatch = viewToolsDiv.querySelector(`.${self.CLASS}-view-watch`);
            self._beforeEditLayerWatch = viewToolsDiv.querySelector(`.${self.CLASS}-view-original-watch`);
            self._addedWatch = viewToolsDiv.querySelector(`.${self.CLASS}-view-added-watch`);
            self._modifiedWatch = viewToolsDiv.querySelector(`.${self.CLASS}-view-modified-watch`);
            self._removedWatch = viewToolsDiv.querySelector(`.${self.CLASS}-view-removed-watch`);

            viewToolsDiv.querySelector(`#${self.CLASS}-view-original-cb-${self.id}`).addEventListener('change', function (e) {
                self.showOriginalFeatures(e.target.checked);
            });

            viewToolsDiv.querySelector(`#${self.CLASS}-view-added-cb-${self.id}`).addEventListener('change', function (e) {
                self.highlightAdded(e.target.checked);
            });

            viewToolsDiv.querySelector(`#${self.CLASS}-view-modified-cb-${self.id}`).addEventListener('change', function (e) {
                self.highlightModified(e.target.checked);
            });

            viewToolsDiv.querySelector(`#${self.CLASS}-view-removed-cb-${self.id}`).addEventListener('change', function (e) {
                self.highlightRemoved(e.target.checked);
            });

            const colorRegExp = new RegExp(`${self.CLASS}-view-clr-(.+)-${self.id}`);
            const onColorClick = function (_e) {
                const input = this.parentElement.querySelector('input[type=color]');
                const layerEditData = self.getLayerEditData();
                const layer = layerEditData[input.id.match(colorRegExp)[1] + 'FeaturesLayer'];
                switch (layerEditData.geometryType) {
                    case Consts.geom.POINT:
                        input.value = layer.styles.point.strokeColor;
                        break;
                    case Consts.geom.POLYLINE:
                    case Consts.geom.MULTIPOLYLINE:
                        input.value = layer.styles.line.strokeColor;
                        break;
                    default:
                        input.value = layer.styles.polygon.strokeColor;
                        break;
                }
                input.click();
            };

            const onColorChange = function (e) {
                const input = e.target;
                const layerEditData = self.getLayerEditData();
                const prefix = input.id.match(colorRegExp)[1];
                const layer = layerEditData[prefix + 'FeaturesLayer'];
                const newColor = layerEditData[prefix + 'CustomColor'] = input.value;
                switch (layerEditData.geometryType) {
                    case Consts.geom.POINT:
                        layer.styles.point.strokeColor = newColor;
                        break;
                    case Consts.geom.POLYLINE:
                    case Consts.geom.MULTIPOLYLINE:
                        layer.styles.line.strokeColor = newColor;
                        break;
                    default:
                        layer.styles.polygon.strokeColor = newColor;
                        layer.styles.polygon.fillColor = newColor;
                        break;
                }
                layer.setStyles(layer.styles);
                self[`_${prefix}Watch`].src = getLegendImage(layer, layerEditData.geometryType);
            };

            const addedColorInputId = `${self.CLASS}-view-clr-added-${self.id}`;
            viewToolsDiv.querySelector(`label[for="${addedColorInputId}"]`).addEventListener(Consts.event.CLICK, onColorClick, { passive: true });
            document.getElementById(addedColorInputId).addEventListener('change', onColorChange);

            const modifiedColorInputId = `${self.CLASS}-view-clr-modified-${self.id}`;
            viewToolsDiv.querySelector(`label[for="${modifiedColorInputId}"]`).addEventListener(Consts.event.CLICK, onColorClick, { passive: true });
            document.getElementById(modifiedColorInputId).addEventListener('change', onColorChange);

            const removedColorInputId = `${self.CLASS}-view-clr-removed-${self.id}`;
            viewToolsDiv.querySelector(`label[for="${removedColorInputId}"]`).addEventListener(Consts.event.CLICK, onColorClick, { passive: true });
            document.getElementById(removedColorInputId).addEventListener('change', onColorChange);

            self._saveBtn = self.div.querySelector(self._classSelector + '-btn-save');
            self._saveBtn.addEventListener(Consts.event.CLICK, function () {
                TC.confirm(self.getLocaleString('edit.applyEdits.confirm', { layerTitle: getLayerTitle(self.layer) }), function () {
                    self.applyEdits();
                });
            }, { passive: true });
            
            self._discardBtn = self.div.querySelector(self._classSelector + '-btn-discard');
            self._discardBtn.addEventListener(Consts.event.CLICK, function () {
                TC.confirm(self.getLocaleString('edit.discardEdits.confirm', { layerTitle: getLayerTitle(self.layer) }), function () {
                    self.discardEdits();
                });
            }, { passive: true });

            self._recropBtn = self.div.querySelector(`.${self.CLASS}-view button.${self.CLASS}-btn-crop`);
            self._recropBtn.addEventListener(Consts.event.CLICK, function () {
                if (self.layer) {
                    const reload = () => {
                        if (self.layer && self.layer.wfsLayer && TC.filter && TC.filter.Bbox && self.layer.wfsLayer.properties instanceof TC.filter.Bbox) {
                            const layerEditData = self.getLayerEditData();
                            self.layer.wfsLayer.properties = new TC.filter.Bbox(null, self.map.getExtent(), self.map.getCRS());
                            self.layer.wfsLayer.refresh();
                            if (layerEditData.beforeEditLayer) {
                                layerEditData.beforeEditLayer.properties = self.layer.wfsLayer.properties;
                                layerEditData.beforeEditLayer.refresh();
                            }
                        }
                    };
                    const layerEditData = self.getLayerEditData();
                    const editedFeatures = layerEditData.addedFeaturesLayer.features.concat(layerEditData.modifiedFeaturesLayer.features, layerEditData.removedFeaturesLayer.features);
                    if (editedFeatures.length) {
                        let featuresOutside = false;
                        const extent = self.map.getExtent();
                        const bbox = [[extent[0], extent[1]], [extent[0], extent[3]], [extent[2], extent[3]], [extent[2], extent[1]]];
                        for (var i = 0, ii = editedFeatures.length; i < ii; i++) {
                            if (!TC.Geometry.intersects(editedFeatures[i].geometry, bbox)) {
                                featuresOutside = true;
                                break;
                            }
                        }
                        if (featuresOutside) {
                            TC.confirm(self.getLocaleString('refreshLayerToCurrentExtent.confirm'), function () {
                                reload();
                            });
                        }
                        else {
                            reload();
                        }
                    }
                    else {
                        reload();
                    }
                    
                }
            }, { passive: true });

            if (TC.Util.isFunction(callback)) {
                callback();
            }
        }));
    };

    ctlProto.addLayer = function (layer) {
        const self = this;
        const appendOption = function (layer) {
            const option = document.createElement('option');
            option.setAttribute('value', layer.id);
            option.innerHTML = getLayerTitle(layer);
            self.renderPromise().then(function () {
                self._layerSelect.appendChild(option);
            });
        };
        if (!layer.isBase && !layer.options.readOnly && !layer.options.stealth) {
            self.getEditableLayer(layer)
                .then(function (l) {
                    // Añadimos opción cuando es una capa WMS con WFS asociado o una capa WFS independiente
                    if (layer.isRaster() || !l.wmsLayer) {
                        appendOption(layer);
                    }
                })
                .catch((err) => console.log(`Layer ${layer.id} not editable. Reason: ${err.message}`));
        }
    };

    ctlProto.setLayer = function (layer) {
        const self = this;
        return new Promise(function (resolve, reject) {

            const map = self.map;
            const selector = self.div.querySelector(self._classSelector + '-layer-sel');

            layer = map.getLayer(layer);
            const mapLayer = map.workLayers.filter(l => l === layer)[0];

            const setNewLayer = function () {
                if (mapLayer) {
                    self.getEditableLayer(mapLayer)
                        .then(function (editableLayer) {
                            const endProcess = function () {
                                self.layer = mapLayer;
                                self._enableEditSerialization(mapLayer)
                                    .then(function () {
                                        self.getEditControl().then(c => {
                                            selector.value = self.layer.id;
                                            c.mode = null;
                                            c.setLayer(editableLayer);
                                            resolve(self.layer);
                                        });
                                    })
                                    .catch((err) => {
                                        self.setLayer(null);
                                        reject(err);
                                    });
                            };

                            if (map.workLayers.indexOf(editableLayer) >= 0) {
                                endProcess();
                            }
                            else {
                                map.addLayer(editableLayer).then(endProcess);
                            }
                        })
                        .catch(() => {
                            self.setLayer(null);
                            resolve(null);
                        });
                }
                else {
                    if (self.layer && self.layer.wfsLayer) {
                        self._removingLayer = self.layer.wfsLayer;
                    }
                    self.getEditControl().then(c => {
                        setEditState(self, false);
                        //setChangedState(self, false);
                        self.closeEditSession()
                            .then(() => {
                                selector.value = '';
                                c.mode = null;
                                c.setLayer(null);
                                self.layer = null;
                                resolve(null);
                            })
                            .finally(() => {
                                delete self._removingLayer;
                            });
                    });
                }
            };

            if (layer === null || !self.layer) {
                setNewLayer();
            }
            else {
                if (self.layer.wfsLayer) {
                    self._removingLayer = self.layer.wfsLayer;
                }
                self.closeEditSession().then(() => {
                    if (mapLayer) {
                        setNewLayer();
                    }
                });
            }
        });
    };

    ctlProto._storeFeatureAdd = function (feature) {
        const self = this;
        feature.provId = getNewFeatureId();
        const layerEditData = self.getLayerEditData();
        const newFeature = self._createAuxFeature(feature);
        layerEditData.addedFeaturesLayer.addFeature(newFeature);
        storeFeature(getAddedStoragePrefix(self) + feature.provId, newFeature).then(function () {
            setChangedState(self, true);
            //self.map.toast(self.getLocaleString('addOperationSavedInSession'));
        }, function () {
            TC.error(self.getLocaleString('failedWhenSavingAddOperationInSession'));
        });
    };

    ctlProto._storeFeatureRemove = function (feature) {
        const self = this;
        var fid = feature.provId || feature.id;
        var storeSuccess = function () {
            setChangedState(self);
            //self.map.toast(self.getLocaleString('removeOperationSavedInSession'));
        };
        var storeFailure = function () {
            TC.error(self.getLocaleString('failedWhenSavingRemoveOperationInSession'));
        };
        const layerEditData = self.getLayerEditData();
        if (layerEditData.serializable) {
            let storedFeature = layerEditData.addedFeaturesLayer.getFeatureById(fid);
            if (!storedFeature) {
                var removedStoragePrefix = getRemovedStoragePrefix(self);
                storedFeature = layerEditData.modifiedFeaturesLayer.getFeatureById(fid);
                if (!storedFeature) {
                    storedFeature = layerEditData.removedFeaturesLayer.getFeatureById(fid);
                    if (!storedFeature) {
                        layerEditData.removedFeaturesLayer.addFeature(self._createAuxFeature(feature));
                        storeFeature(removedStoragePrefix + fid, feature).then(storeSuccess, storeFailure);
                    }
                }
                else {
                    layerEditData.modifiedFeaturesLayer.removeFeature(storedFeature);
                    layerEditData.removedFeaturesLayer.addFeature(self._createAuxFeature(feature));
                    deleteFeature(getModifiedStoragePrefix(self) + fid).then(function () {
                        storeSuccess();
                        storeFeature(removedStoragePrefix + fid, feature).then(storeSuccess, storeFailure);
                    }, storeFailure);
                }
            }
            else {
                layerEditData.addedFeaturesLayer.removeFeature(storedFeature);
                deleteFeature(getAddedStoragePrefix(self) + fid).then(storeSuccess, storeFailure);
            }
        }
    };

    ctlProto._createAuxFeature = function (feature) {
        const self = this;
        const fid = feature.provId || feature.id;
        const layerEditData = self.getLayerEditData();
        const result = new feature.constructor(feature.geometry, { geometryName: layerEditData.geometryName, data: feature.getData() });
        result.setStyle(null);
        result.setId(fid);
        return result;
    };

    ctlProto.getEditControl = function () {
        const self = this;
        return self._editPromise || new Promise(function (resolve, _reject) {
            self.renderPromise().then(() => resolve(self.editControl));
        });
    };

    ctlProto.cacheLayer = async function (layer) {
        const self = this;
        await self.getServiceWorker();
        if (navigator.onLine) {
            const gfUrl = layer.wrap.getGetFeatureUrl();
            const dftUrl = await layer.getDescribeFeatureTypeUrl();
            if (gfUrl && dftUrl) {
                await self.createCache(getStoragePrefix(self, layer), {
                    urlList: [gfUrl, dftUrl]
                });
            }
        }
    };

    ctlProto.getFeatureType = function (layer) {
        const self = this;
        return new Promise(function (resolve, reject) {
            layer = layer || self.layer;
            const li = self.map.getLoadingIndicator();
            const waitId = li && li.addWait();
            layer.describeFeatureType()
                .then(function (attributes) {
                    self.getEditControl().then(function (editControl) {
                        const layerEditData = self.getLayerEditData(layer);
                        // recogemos los atributos no geométricos y definimos la geometría
                        layerEditData.attributes = {};
                        let key;
                        for (key in attributes) {
                            const attr = attributes[key];
                            const geometryType = editControl.getGeometryType(attr.type);
                            if (geometryType) {
                                layerEditData.geometryName = attr.name;
                                layerEditData.geometryType = typeof geometryType === 'boolean' ? null : geometryType;
                            }
                            else {
                                layerEditData.attributes[key] = attr;
                            }
                        }
                        for (key in layerEditData.attributes) {
                            const attr = layerEditData.attributes[key];
                            attr.type = attr.type.substr(attr.type.indexOf(':') + 1);
                        }
                        resolve(layerEditData);
                    });
                })
                .catch(function (err) {
                    reject(err);
                })
                .finally(() => li && li.removeWait(waitId));
        });
    };

    ctlProto._addAuxLayersToMap = async function (layer) {
        const self = this;
        const map = self.map;
        layer = layer || self.layer;
        const layerEditData = self.getLayerEditData(layer);
        const beLayer = layerEditData.beforeEditLayer;
        if (beLayer) {
            const onLayerUpdate = function (e) {
                if (e.layer === beLayer) {
                    beLayer.setVisibility(self.showsOriginalFeatures);
                    beLayer.setOpacity(1);
                    map.off(Consts.event.LAYERUPDATE, onLayerUpdate);
                }
            };
            map.on(Consts.event.LAYERUPDATE, onLayerUpdate);
            const afLayer = layerEditData.addedFeaturesLayer;
            const mfLayer = layerEditData.modifiedFeaturesLayer;
            const rfLayer = layerEditData.removedFeaturesLayer;
            await Promise.all([
                beLayer.setOpacity(0),
                map.addLayer(beLayer),
                map.addLayer(afLayer),
                map.addLayer(mfLayer),
                map.addLayer(rfLayer)
            ]);
            const editableLayer = await self.getEditableLayer(layer);
            let idx = map.layers.indexOf(editableLayer);
            afLayer.setVisibility(self.highlightsAdded);
            mfLayer.setVisibility(self.highlightsModified);
            rfLayer.setVisibility(self.highlightsRemoved);
            await map.insertLayer(beLayer, ++idx);
            const newIdx = idx + 1;
            map.insertLayer(afLayer, newIdx);
            map.insertLayer(mfLayer, newIdx);
            map.insertLayer(rfLayer, newIdx);

            beLayer.setStyles(self.getBeforeEditLayerStyle(editableLayer));
            afLayer.setStyles(self.getAddedFeaturesLayerStyle(editableLayer));
            mfLayer.setStyles(self.getModifiedFeaturesLayerStyle(editableLayer));
            rfLayer.setStyles(self.getRemovedFeaturesLayerStyle(editableLayer));
            self._editingWatch.src = getLegendImage(editableLayer, layerEditData.geometryType);
            self._beforeEditLayerWatch.src = getLegendImage(beLayer, layerEditData.geometryType);
            self._addedWatch.src = getLegendImage(afLayer, layerEditData.geometryType);
            self._modifiedWatch.src = getLegendImage(mfLayer, layerEditData.geometryType);
            self._removedWatch.src = getLegendImage(rfLayer, layerEditData.geometryType);
        }
        else {
            throw Error(`No auxiliary layers for ${layer.id}`);
        }
    };

    ctlProto.openEditSession = function () {
        const self = this;
        if (!self.layer) {
            return Promise.reject(Error('No layer set for editing'));
        }
        return new Promise(function (resolve, reject) {

            self.getFeatureType() // Obtenemos datos de los atributos y la geometría
                .then(function (layerEditData) {

                    self.getEditControl().then(function (editControl) {
                        self.getEditableLayer(self.layer).then(function (editableLayer) {
                            editControl.setLayer(editableLayer);
                            switch (layerEditData.geometryType) {
                                case Consts.geom.MULTIPOLYLINE:
                                case Consts.geom.MULTIPOLYGON:
                                    editControl.setComplexGeometry(true);
                                    break;
                                default:
                                    editControl.setComplexGeometry(false);
                                    break;
                            }
                            editControl.activate();
                            setEditState(self, true);
                            setChangedState(self);

                            const modes = [TC.control.Edit.mode.MODIFY, TC.control.Edit.mode.OTHER];
                            switch (layerEditData.geometryType) {
                                case Consts.geom.POINT:
                                    modes.push(TC.control.Edit.mode.ADDPOINT);
                                    break;
                                case Consts.geom.POLYLINE:
                                case Consts.geom.MULTIPOLYLINE:
                                    modes.push(TC.control.Edit.mode.ADDLINE);
                                    //modes.push(TC.control.Edit.mode.CUT);
                                    break;
                                case Consts.geom.POLYGON:
                                case Consts.geom.MULTIPOLYGON:
                                    modes.push(TC.control.Edit.mode.ADDPOLYGON);
                                    //modes.push(TC.control.Edit.mode.CUT);
                                    break;
                                default:
                                    break;
                            }
                            editControl.constrainModes(modes);
                            editControl.mode = TC.control.Edit.mode.MODIFY;

                            self._addAuxLayersToMap()
                                .then(() => resolve())
                                .catch((err) => reject(err));
                        });
                    });
                })
                .catch(function (err) {
                    if (self.layer && self.layer.type === Consts.layerType.VECTOR) {
                        self.getEditControl().then(function (editControl) {
                            editControl.activate();
                            setEditState(self, true);
                            editControl.mode = TC.control.Edit.mode.MODIFY;
                            resolve();
                        });
                    }
                    else {
                        reject(err);
                    }
                });
        });
    };

    ctlProto.closeEditSession = async function () {
        const self = this;
        await self.renderPromise();
        setChangedState(self, false);
        self.getEditControl().then(c => c.deactivate());
        const layerEditData = self.getLayerEditData();
        if (layerEditData?.beforeEditLayer) {
            self._editingWatch.src = Consts.BLANK_IMAGE;
            self._beforeEditLayerWatch.src = Consts.BLANK_IMAGE;
            self._addedWatch.src = Consts.BLANK_IMAGE;
            self._modifiedWatch.src = Consts.BLANK_IMAGE;
            self._removedWatch.src = Consts.BLANK_IMAGE;
            const previousLayer = self.layer;
            const editableLayer = await self.getEditableLayer(self.layer);
            const removePromises = [];
            const removeLayer = function (layer) {
                if (self.map.workLayers.indexOf(layer) >= 0) {
                    removePromises.push(self.map.removeLayer(layer));
                }
            };
            removeLayer(layerEditData.beforeEditLayer);
            removeLayer(layerEditData.beforeEditLayer);
            removeLayer(layerEditData.addedFeaturesLayer);
            removeLayer(layerEditData.modifiedFeaturesLayer);
            removeLayer(layerEditData.removedFeaturesLayer);
            if (previousLayer !== editableLayer) {
                previousLayer.wfsLayer = null;
                removeLayer(editableLayer);
            }
            await Promise.all(removePromises);
        }
    };

    ctlProto.getEditableLayer = async function (layer) {
        const self = this;
        const notEditableErrorMsg = `Layer ${layer.id} not editable`;
        const map = self.map;
        layer = map ? map.getLayer(layer) : layer;
        if (layer) {
            if (layer.type === Consts.layerType.WFS && (layer.wmsLayer || !layer.options.stealth && !layer.options.readOnly)) {
                await layer.getCapabilitiesPromise();
                return layer;
            }
            else if (layer.type === Consts.layerType.WMS) {
                if (layer.wfsLayer) {
                    await layer.wfsLayer.getCapabilitiesPromise();
                    return layer.wfsLayer;
                }
                else {
                    const capabilities = await layer.getWFSCapabilities();
                    //comprobamos que la solo es una capa y existe en el capabilities del WFS
                    const layers = layer.getDisgregatedLayerNames();
                    let fullLayerName = layers[0];
                    let colonIdx = fullLayerName.indexOf(':');
                    if (colonIdx < 0) {
                        fullLayerName = await layer.getWFSFeatureType();
                        colonIdx = fullLayerName.indexOf(':');
                    }
                    const prefix = fullLayerName.substr(0, colonIdx);
                    const shortLayerName = fullLayerName.substring(colonIdx + 1);
                    if (layers.length !== 1 || Object.prototype.hasOwnProperty.call(capabilities.FeatureTypes, shortLayerName)) {
                        const wfsLayerOptions = {
                            id: self.getUID(),
                            type: Consts.layerType.WFS,
                            url: await layer.getWFSURL(),
                            properties: map ? new TC.filter.Bbox(null, map.getExtent(), map.getCRS()) : null,
                            outputFormat: Consts.format.JSON,
                            title: `${layer.getPath().join(' • ')} - ${self.getLocaleString('featureEditing')}`,
                            geometryName: 'geom',
                            featureType: [shortLayerName],
                            featureNS: prefix,
                            styles: self.styles,
                            stealth: true
                        };
                        layer.wfsLayer = new TC.layer.Vector(wfsLayerOptions);
                        layer.wfsLayer.wmsLayer = layer;
                        return layer.wfsLayer;
                    }
                    else {
                        throw Error(notEditableErrorMsg);
                    }
                }
            }
            else if (layer.type === Consts.layerType.VECTOR) {
                return layer;
            }
            else {
                throw Error(notEditableErrorMsg);
            }
        }
        else {
            throw Error('No layer to edit');
        }
    };

    ctlProto.isLayerEdited = async function (layer) {
        const self = this;
        const storagePrefix = getStoragePrefix(self, layer);
        try {
            const keys = await localforage.keys();
            if (keys) {
                return keys.some(key => key.indexOf(storagePrefix) === 0);
            }
            return false;
        }
        catch (err) {
            console.warn(err);
            return false;
        }
    };

    ctlProto.getLayerEditData = function (optionalLayer) {
        const self = this;
        const layer = optionalLayer || self.layer;
        if (!layer) {
            return null;
        }
        return self.layersEditData[layer.id] = self.layersEditData[layer.id] || {
            checkedOut: false
        };
    };

    const getLegendImage = function (layer, geometryType) {
        switch (geometryType) {
            case Consts.geom.POINT:
            case Consts.geom.MULTIPOINT:
                return TC.Util.getLegendImageFromStyle(layer.styles.point, { geometryType: Consts.geom.POINT });
            case Consts.geom.POLYLINE:
            case Consts.geom.MULTIPOLYLINE:
                return TC.Util.getLegendImageFromStyle(layer.styles.line, { geometryType: Consts.geom.POLYLINE });
            default:
                return TC.Util.getLegendImageFromStyle(layer.styles.polygon, { geometryType: Consts.geom.POLYGON });
        }
    };

    ctlProto._enableEditSerialization = function (layer) {
        const self = this;
        return new Promise(function (resolve, _reject) {
            self.getEditableLayer(layer)
                .then(function (editableLayer) {

                    const endProcess = function () {
                        const layerEditData = self.getLayerEditData(layer);

                        const baseTitle = getLayerTitle(layer);

                        var beforeEditLayer = layerEditData.beforeEditLayer;
                        if (!beforeEditLayer) {
                            beforeEditLayer = layerEditData.beforeEditLayer = new TC.layer.Vector(TC.Util.extend({}, editableLayer.options, {
                                id: self.getUID(),
                                title: `${baseTitle} - ${self.getLocaleString('dataBeforeEdits')}`,
                                readOnly: true,
                                owner: self,
                                stealth: true
                            }));
                        }

                        var addedFeaturesLayer = layerEditData.addedFeaturesLayer;
                        let aflIsOld = true;
                        if (!addedFeaturesLayer) {
                            aflIsOld = false;
                            addedFeaturesLayer = layerEditData.addedFeaturesLayer = new TC.layer.Vector({
                                id: self.getUID(),
                                title: `${baseTitle} - ${self.getLocaleString('addedFeatures')}`,
                                owner: self,
                                stealth: true,
                                zIndex: 2
                            });
                        }

                        var modifiedFeaturesLayer = layerEditData.modifiedFeaturesLayer;
                        let mflIsOld = true;
                        if (!modifiedFeaturesLayer) {
                            mflIsOld = false;
                            modifiedFeaturesLayer = layerEditData.modifiedFeaturesLayer = new TC.layer.Vector({
                                id: self.getUID(),
                                title: `${baseTitle} - ${self.getLocaleString('modifiedFeatures')}`,
                                owner: self,
                                stealth: true,
                                zIndex: 2
                            });
                        }

                        var removedFeaturesLayer = layerEditData.removedFeaturesLayer;
                        let rflIsOld = true;
                        if (!removedFeaturesLayer) {
                            rflIsOld = false;
                            removedFeaturesLayer = layerEditData.removedFeaturesLayer = new TC.layer.Vector({
                                id: self.getUID(),
                                title: `${baseTitle} - ${self.getLocaleString('removedFeatures')}`,
                                owner: self,
                                stealth: true,
                                zIndex: 2
                            });
                        }

                        const featurePromises = [];
                        if (aflIsOld && mflIsOld && rflIsOld) {
                            // Existen de antes las capas de adiciones, modificaciones y eliminaciones. Leemos de ahí.
                            removedFeaturesLayer.features.forEach(function (removedFeature) {
                                const f = editableLayer.getFeatureById(removedFeature.id);
                                if (f) {
                                    editableLayer.removeFeature(f);
                                }
                            });
                            modifiedFeaturesLayer.features.forEach(function (modifiedFeature) {
                                const f = editableLayer.getFeatureById(modifiedFeature.id);
                                if (f) {
                                    f.setCoords(modifiedFeature.geometry);
                                    f.setData(modifiedFeature.getData());
                                }
                            });
                            addedFeaturesLayer.features.forEach(function (addedFeature) {
                                if (!editableLayer.getFeatureById(addedFeature.id)) {
                                    featurePromises.push(editableLayer.addFeature(self._createAuxFeature(addedFeature)));
                                }
                            });
                            Promise.all(featurePromises).then(() => {
                                layerEditData.serializable = true;
                                resolve(editableLayer);
                            });
                        }
                        else {
                            // Las capas de adiciones, modificaciones y eliminaciones son nuevas. Leemos de local storage.
                            const storagePrefix = getStoragePrefix(self, editableLayer);
                            const addedStoragePrefix = getAddedStoragePrefix(self, editableLayer);
                            const modifiedStoragePrefix = getModifiedStoragePrefix(self, editableLayer);
                            const removedStoragePrefix = getRemovedStoragePrefix(self, editableLayer);
                            //var li = map.getLoadingIndicator();
                            localforage.keys().then(function (keys) {
                                if (keys) {
                                    keys
                                        .filter(key => key.indexOf(storagePrefix) === 0)
                                        .forEach(function (key) {
                                            //li && li.addWait(uid);
                                            featurePromises.push(new Promise(function (res, _rej) {
                                                readFeature(key).then(function (obj) {
                                                    var id;
                                                    var k = obj.key;
                                                    if (k.indexOf(removedStoragePrefix) === 0) {
                                                        id = k.substr(removedStoragePrefix.length);
                                                        const feature = editableLayer.getFeatureById(id);
                                                        editableLayer.removeFeature(feature);
                                                        removedFeaturesLayer.addFeature(feature).then(() => res(feature));
                                                        //li && li.removeWait(uid);
                                                    }
                                                    else if (k.indexOf(modifiedStoragePrefix) === 0) {
                                                        id = k.substr(modifiedStoragePrefix.length);
                                                        const feature = editableLayer.getFeatureById(id);
                                                        if (feature) {
                                                            feature.setCoords(obj.feature.geometry);
                                                            feature.setData(obj.feature.attributes);
                                                            const newFeature = feature.clone();
                                                            newFeature.setId(feature.id);
                                                            modifiedFeaturesLayer.addFeature(newFeature).then(() => res(feature));
                                                            //li && li.removeWait(uid);
                                                        }
                                                        else {
                                                            res(feature);
                                                        }
                                                    }
                                                    else if (k.indexOf(addedStoragePrefix) === 0) {
                                                        id = k.substr(addedStoragePrefix.length);
                                                        var idNumber = parseInt(id.substr(id.lastIndexOf('.') + 1));
                                                        newFeatureIdNumber = Math.max(newFeatureIdNumber, idNumber + 1);
                                                        var addPromise;
                                                        switch (obj.feature.type) {
                                                            case Consts.geom.POINT:
                                                                addPromise = editableLayer.addPoint(obj.feature.geometry);
                                                                break;
                                                            case Consts.geom.POLYLINE:
                                                                addPromise = editableLayer.addPolyline(obj.feature.geometry);
                                                                break;
                                                            case Consts.geom.POLYGON:
                                                                addPromise = editableLayer.addPolygon(obj.feature.geometry);
                                                                break;
                                                            case Consts.geom.MULTIPOLYLINE:
                                                                addPromise = editableLayer.addMultiPolyline(obj.feature.geometry);
                                                                break;
                                                            case Consts.geom.MULTIPOLYGON:
                                                                addPromise = editableLayer.addMultiPolygon(obj.feature.geometry);
                                                                break;
                                                            default:
                                                                break;
                                                        }
                                                        addPromise.then(function (feat) {
                                                            //feat.setStyle(TC.Util.extend({}, layer.styles.line, layer.styles.polygon));
                                                            feat.provId = id;
                                                            feat.setData(obj.feature.attributes);
                                                            const newFeat = feat.clone();
                                                            newFeat.setStyle(null);
                                                            newFeat.setId(feat.provId);
                                                            addedFeaturesLayer.addFeature(newFeat).then(() => res(newFeat));
                                                            //li && li.removeWait(uid);
                                                        });
                                                    }
                                                });
                                            }));
                                        });
                                }
                                Promise.all(featurePromises).then(() => {
                                    layerEditData.serializable = true;
                                    resolve(editableLayer);
                                });
                            });
                        }
                    };

                    if (editableLayer.type === Consts.layerType.WFS) {
                        if (editableLayer.state === TC.Layer.state.IDLE) {
                            endProcess();
                        }
                        else {
                            const onLayerUpdate = function (e) {
                                if (e.layer === editableLayer) {
                                    endProcess();
                                    self.map.off(Consts.event.LAYERUPDATE, onLayerUpdate);
                                }
                            };
                            self.map.on(Consts.event.LAYERUPDATE, onLayerUpdate);
                        }
                    }
                    else {
                        resolve(editableLayer);
                    }
                });
        });
    };

    ctlProto.applyEdits = function () {
        const self = this;
        if (self.layer) {
            const layerEditData = self.getLayerEditData();
            if (layerEditData.serializable) {
                self.isSyncing = true;
                setSyncState(self);
                const li = self.map.getLoadingIndicator();
                const waitId = li && li.addWait();
                // Copiamos modificadas para ponerle el nombre de atributo de geometría descrito en DescribeFeatureType.
                const modified = layerEditData.modifiedFeaturesLayer.features.map(function (feature) {
                    const unmodifiedFeature = layerEditData.beforeEditLayer.features.filter(f => f.id === feature.id)[0];
                    let newData;
                    let newGeometry;
                    if (unmodifiedFeature) {
                        newGeometry = Geometry.equals(feature.geometry, unmodifiedFeature.geometry) ?
                            null : feature.geometry;
                        newData = {};
                        for (var key in feature.data) {
                            if (key !== 'id') {
                                const oldValue = unmodifiedFeature.data[key];
                                const newValue = feature.data[key];
                                if (oldValue !== newValue) {
                                    newData[key] = newValue;
                                }
                            }
                        }
                    }
                    else {
                        newGeometry = feature.geometry;
                        newData = feature.data;
                    }
                    const result = new feature.constructor(newGeometry, { geometryName: layerEditData.geometryName });
                    result.setData(newData);
                    result.setId(feature.id);
                    return result;
                });
                self.getEditableLayer(self.layer)
                    .then(function (l) {
                        l.applyEdits(layerEditData.addedFeaturesLayer.features, modified, layerEditData.removedFeaturesLayer.features)
                            .then(function (_response) {
                                if (self.layer.type === Consts.layerType.WMS) {
                                    self.layer.refresh();
                                }
                                layerEditData.beforeEditLayer.clearFeatures();
                                l.features.forEach(f => {
                                    const beLayerFeatures = layerEditData.beforeEditLayer.features;
                                    beLayerFeatures[beLayerFeatures.length] = f.clone();
                                });
                                self.deleteCache(getStoragePrefix(self)).then(function () {
                                    self.cacheLayer(l).finally(function () {
                                        self.isSyncing = false;
                                        li && li.removeWait(waitId);
                                        // Las acciones a realizar a partir de este punto son las mismas que al descartar una edición
                                        self.discardEdits();
                                        self.map.toast(self.getLocaleString('changesSuccessfullySyncedWithServer'), { type: Consts.msgType.INFO });
                                    });
                                });
                            })
                            .catch(function (obj) {
                                self.isSyncing = false;
                                setSyncState(self);
                                li && li.removeWait(waitId);
                                TC.error(self.getLocaleString('errorSyncingChanges', { code: obj.code, reason: obj.reason }), [Consts.msgErrorMode.TOAST, Consts.msgErrorMode.CONSOLE]);
                            });
                    });
            }
        }
    };

    ctlProto.discardEdits = function () {
        var self = this;
        self._joinedFeatureAttributes = [];
        var storagePrefix = getStoragePrefix(self);
        localforage.keys().then(function (keys) {
            if (keys) {
                for (var i = 0, len = keys.length; i < len; i++) {
                    var key = keys[i];
                    if (key.indexOf(storagePrefix) === 0) {
                        localforage.removeItem(key);
                    }
                }
                if (self.layer) {
                    const layerEditData = self.getLayerEditData();
                    if (layerEditData.serializable) {
                        layerEditData.addedFeaturesLayer.clearFeatures();
                        layerEditData.modifiedFeaturesLayer.clearFeatures();
                        layerEditData.removedFeaturesLayer.clearFeatures();
                        self.editControl.setSelectedFeatures([]);
                        self.editControl.modifyControl.closeAttributes();
                        self.getEditableLayer(self.layer).then(l => l.refresh());
                    }
                }
                setChangedState(self, false);
            }
        }, err => console.warn(err));
        self.editControl.mode = null;
    };

    ctlProto.showOriginalFeatures = function (show) {
        const self = this;
        self.showsOriginalFeatures = show;
        const layerEditData = self.getLayerEditData();
        if (layerEditData) {
            layerEditData.beforeEditLayer.setVisibility(show);
        }
    };

    ctlProto.highlightAdded = function (highlight) {
        const self = this;
        self.highlightsAdded = highlight;
        const layerEditData = self.getLayerEditData();
        if (layerEditData && layerEditData.addedFeaturesLayer) {
            layerEditData.addedFeaturesLayer.setVisibility(highlight);
        }
    };

    ctlProto.highlightModified = function (highlight) {
        const self = this;
        self.highlightsModified = highlight;
        const layerEditData = self.getLayerEditData();
        if (layerEditData && layerEditData.modifiedFeaturesLayer) {
            layerEditData.modifiedFeaturesLayer.setVisibility(highlight);
        }
    };

    ctlProto.highlightRemoved = function (highlight) {
        const self = this;
        self.highlightsRemoved = highlight;
        const layerEditData = self.getLayerEditData();
        if (layerEditData && layerEditData.removedFeaturesLayer) {
            layerEditData.removedFeaturesLayer.setVisibility(highlight);
        }
    };

    const getStyleFromFeatureType = function (ctl, layer) {
        const result = {};
        const layerEditData = ctl.getLayerEditData(layer.wmsLayer || layer);
        switch (layerEditData.geometryType) {
            case Consts.geom.POLYGON:
            case Consts.geom.MULTIPOLYGON:
                result.polygon = layer.map.options.styles.polygon;
                break;
            case Consts.geom.POLYLINE:
            case Consts.geom.MULTIPOLYLINE:
                result.line = layer.map.options.styles.line;
                break;
            default:
                result.point = layer.map.options.styles.point;
                break;
        }
        return result;
    };

    ctlProto.getBeforeEditLayerStyle = function (layer) {
        const self = this;
        const getNegativeColor = function (color) {
            const rgba = layer.wrap.getRGBA(color);
            for (var i = 0; i < 3; i++) {
                rgba[i] = 255 - rgba[i];
            }
            return '#' + (rgba[0] * 65536 + rgba[1] * 256 + rgba[2]).toString(16).padStart(6, '0');
        };

        const dash = [1, 3];
        const result = TC.Util.extend(true, {}, layer.options.styles || getStyleFromFeatureType(self, layer));
        if (result.point) {
            result.point.strokeColor = getNegativeColor(result.point.strokeColor);
            result.point.lineDash = dash;
        }
        if (result.line) {
            result.line.strokeColor = getNegativeColor(result.line.strokeColor);
            result.line.lineDash = dash;
        }
        if (result.polygon) {
            result.polygon.strokeColor = getNegativeColor(result.polygon.strokeColor);
            result.polygon.lineDash = dash;
        }

        return result;
    };

    const colorizeLayer = function (ctl, layer, color) {
        const result = TC.Util.extend(true, {}, layer.options.styles || getStyleFromFeatureType(ctl, layer));
        if (result.point) {
            result.point.strokeColor = color;
            result.point.fillColor = color;
        }
        if (result.line) {
            result.line.strokeColor = color;
        }
        if (result.polygon) {
            result.polygon.strokeColor = color;
            result.polygon.fillColor = color;
        }

        return result;
    };

    ctlProto.getAddedFeaturesLayerStyle = function (layer) {
        const self = this;
        const layerEditData = self.getLayerEditData(layer.wmsLayer || layer);
        return colorizeLayer(self, layer, layerEditData.addedCustomColor || '#00ff00');
    };

    ctlProto.getModifiedFeaturesLayerStyle = function (layer) {
        const self = this;
        const layerEditData = self.getLayerEditData(layer.wmsLayer || layer);
        return colorizeLayer(self, layer, layerEditData.modifiedCustomColor || '#ff7f00');
    };

    ctlProto.getRemovedFeaturesLayerStyle = function (layer) {
        const self = this;
        const layerEditData = self.getLayerEditData(layer.wmsLayer || layer);
        return colorizeLayer(self, layer, layerEditData.removedCustomColor || '#ff0000');
    };

})();

const WFSEdit = TC.control.WFSEdit;
export default WFSEdit;