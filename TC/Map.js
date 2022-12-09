import TC from '../TC';
import Consts from './Consts';
import EventTarget from './EventTarget';
import i18n from './i18n';
import Control from './Control';
import Raster from './layer/Raster';
import Vector from './layer/Vector';
import wrap from './ol/ol';
import Attribution from './control/Attribution';
import BasemapSelector from './control/BasemapSelector';
import CacheBuilder from './control/CacheBuilder';
import Click from './control/Click';
import Container from './control/Container';
import ControlContainer from './control/ControlContainer';
import Coordinates from './control/Coordinates';
import DataLoader from './control/DataLoader';
import Download from './control/Download';
import Draw from './control/Draw';
import DrawMeasureModify from './control/DrawMeasureModify';
import Edit from './control/Edit';
import Elevation from './control/Elevation';
import ExternalWMS from './control/ExternalWMS';
import FeatureDownloadDialog from './control/FeatureDownloadDialog';
import FeatureInfo from './control/FeatureInfo';
import FeatureInfoCommons from './control/FeatureInfoCommons';
import FeatureTools from './control/FeatureTools';
import FileImport from './control/FileImport';
import FullScreen from './control/FullScreen';
import Geolocation from './control/Geolocation';
import GeometryFeatureInfo from './control/GeometryFeatureInfo';
import infoShare from './control/infoShare';
import LayerCatalog from './control/LayerCatalog';
import Legend from './control/Legend';
import LineFeatureInfo from './control/LineFeatureInfo';
import ListTOC from './control/ListTOC';
import LoadingIndicator from './control/LoadingIndicator';
import MapContents from './control/MapContents';
import MapInfo from './control/MapInfo';
import Measure from './control/Measure';
import Modify from './control/Modify';
import MultiFeatureInfo from './control/MultiFeatureInfo';
import NavBar from './control/NavBar';
import NavBarHome from './control/NavBarHome';
import OfflineMapMaker from './control/OfflineMapMaker';
import OverviewMap from './control/OverviewMap';
import PolygonFeatureInfo from './control/PolygonFeatureInfo';
import Popup from './control/Popup';
import Print from './control/Print';
import PrintMap from './control/PrintMap';
import ProjectionSelector from './control/ProjectionSelector';
import ResultsPanel from './control/ResultsPanel';
import Scale from './control/Scale';
import ScaleBar from './control/ScaleBar';
import ScaleSelector from './control/ScaleSelector';
import Search from './control/Search';
import SelectContainer from './control/SelectContainer';
import Share from './control/Share';
import StreetView from './control/StreetView';
import SWCacheClient from './control/SWCacheClient';
import TabContainer from './control/TabContainer';
import ThreeD from './control/ThreeD';
import TOC from './control/TOC';
import WFSEdit from './control/WFSEdit';
import WFSQuery from './control/WFSQuery';
import WorkLayerManager from './control/WorkLayerManager';
import { JL } from 'jsnlog';

TC.Consts = Consts;
TC.EventTarget = EventTarget;
TC.i18n = TC.i18n || i18n;
TC.Control = Control;
TC.wrap = wrap;
TC.control = TC.control || {};
TC.control.Attribution = Attribution;
TC.control.BasemapSelector = BasemapSelector;
TC.control.CacheBuilder = CacheBuilder;
TC.control.Click = Click;
TC.control.Container = Container;
TC.control.ControlContainer = ControlContainer;
TC.control.Coordinates = Coordinates;
TC.control.DataLoader = DataLoader;
TC.control.Download = Download;
TC.control.Draw = Draw;
TC.control.DrawMeasureModify = DrawMeasureModify;
TC.control.Edit = Edit;
TC.control.Elevation = Elevation;
TC.control.ExternalWMS = ExternalWMS;
TC.control.FeatureDownloadDialog = FeatureDownloadDialog;
TC.control.FeatureInfo = FeatureInfo;
TC.control.FeatureInfoCommons = FeatureInfoCommons;
TC.control.FeatureTools = FeatureTools;
TC.control.FileImport = FileImport;
TC.control.FullScreen = FullScreen;
TC.control.Geolocation = Geolocation;
TC.control.GeometryFeatureInfo = GeometryFeatureInfo;
TC.control.infoShare = infoShare;
TC.control.LayerCatalog = LayerCatalog;
TC.control.Legend = Legend;
TC.control.LineFeatureInfo = LineFeatureInfo;
TC.control.ListTOC = ListTOC;
TC.control.LoadingIndicator = LoadingIndicator;
TC.control.MapContents = MapContents;
TC.control.MapInfo = MapInfo;
TC.control.Measure = Measure;
TC.control.Modify = Modify;
TC.control.MultiFeatureInfo = MultiFeatureInfo;
TC.control.NavBar = NavBar;
TC.control.NavBarHome = NavBarHome;
TC.control.OfflineMapMaker = OfflineMapMaker;
TC.control.OverviewMap = OverviewMap;
TC.control.PolygonFeatureInfo = PolygonFeatureInfo;
TC.control.Popup = Popup;
TC.control.Print = Print;
TC.control.PrintMap = PrintMap;
TC.control.ProjectionSelector = ProjectionSelector;
TC.control.ResultsPanel = ResultsPanel;
TC.control.Scale = Scale;
TC.control.ScaleBar = ScaleBar;
TC.control.ScaleSelector = ScaleSelector;
TC.control.Search = Search;
TC.control.SelectContainer = SelectContainer;
TC.control.Share = Share;
TC.control.StreetView = StreetView;
TC.control.SWCacheClient = SWCacheClient;
TC.control.TabContainer = TabContainer;
TC.control.ThreeD = ThreeD;
TC.control.TOC = TOC;
TC.control.WFSEdit = WFSEdit;
TC.control.WFSQuery = WFSQuery;
TC.control.WorkLayerManager = WorkLayerManager;
TC.layer = TC.layer || {};
TC.layer.Raster = Raster;
TC.layer.Vector = Vector;

TC.inherit = function (childCtor, parentCtor) {
    childCtor.prototype = Object.create(parentCtor.prototype);
    childCtor.prototype.constructor = childCtor;
    childCtor._super = parentCtor.prototype;
};

TC.mix = function (targetCtor, ...mixins) {
    Object.assign(targetCtor.prototype, ...mixins);
};

(function () {

    // Polyfill de CustomEvent
    /*! (c) Andrea Giammarchi - ISC */
    var self = this || /* istanbul ignore next */ {};
    self.CustomEvent = typeof CustomEvent === 'function' ?
        CustomEvent :
        (function (__p__) {
            CustomEvent[__p__] = new CustomEvent('').constructor[__p__];
            return CustomEvent;
            function CustomEvent(type, init) {
                if (!init) init = {};
                var e = document.createEvent('CustomEvent');
                e.initCustomEvent(type, !!init.bubbles, !!init.cancelable, init.detail);
                return e;
            }
        }('prototype'));

    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
    }

    /**
     * <p>Objeto principal de la API, instancia un mapa dentro de un elemento del DOM. Nótese que el constructor es asíncrono, por tanto cualquier código que haga uso de este objeto debería
     * estar dentro de una función de callback pasada como parámetro al método {{#crossLink "TC.Map/loaded:method"}}{{/crossLink}}.</p>
     * <p>Puede consultar también online el <a href="../../examples/Map.1.html">ejemplo 1</a>, el <a href="../../examples/Map.2.html">ejemplo 2</a> y el <a href="../../examples/Map.3.html">ejemplo 3</a>.</p>
     * @class TC.Map
     * @constructor
     * @async
     * @param {HTMLElement|string} div Elemento del DOM en el que crear el mapa o valor de atributo id de dicho elemento.
     * @param {object} [options] Objeto de opciones de configuración del mapa. Sus propiedades sobreescriben el objeto de configuración global {{#crossLink "TC.Cfg"}}{{/crossLink}}.
     * @param {string} [options.crs="EPSG:25830"] Código EPSG del sistema de referencia espacial del mapa.
     * @param {array} [options.initialExtent] Extensión inicial del mapa definida por x mínima, y mínima, x máxima, y máxima. 
     * Esta opción es obligatoria si el sistema de referencia espacial del mapa es distinto del sistema por defecto (ver TC.Cfg.{{#crossLink "TC.Cfg/crs:property"}}{{/crossLink}}).
     * Para más información consultar TC.Cfg.{{#crossLink "TC.Cfg/initialExtent:property"}}{{/crossLink}}.
     * @param {array} [options.maxExtent] Extensión máxima del mapa definida por x mínima, y mínima, x máxima, y máxima. Para más información consultar TC.Cfg.{{#crossLink "TC.Cfg/maxExtent:property"}}{{/crossLink}}.
     * @param {string} [options.layout] URL de una carpeta de maquetación. Consultar TC.Cfg.{{#crossLink "TC.Cfg/layout:property"}}{{/crossLink}} para ver instrucciones de uso de maquetaciones.
     * @param {array} [options.baseLayers] Lista de identificadores de capa o instancias de la clase {{#crossLink "TC.cfg.LayerOptions"}}{{/crossLink}} para incluir dichas capas como mapas de fondo. 
     * @param {array} [options.workLayers] Lista de identificadores de capa o instancias de la clase {{#crossLink "TC.cfg.LayerOptions"}}{{/crossLink}} para incluir dichas capas como contenido del mapa. 
     * @param {TC.cfg.MapControlOptions} [options.controls] Opciones de controles de mapa.
     * @param {TC.cfg.StyleOptions} [options.styles] Opciones de estilo de entidades geográficas.
     * @param {string} [options.locale="es-ES"] Código de idioma de la interfaz de usuario. Este código debe ser obedecer la sintaxis definida por la <a href="https://en.wikipedia.org/wiki/IETF_language_tag">IETF</a>.
     * Los valores posibles son <code>es-ES</code>, <code>eu-ES</code> y <code>en-US</code>.
     * @param {string} [options.proxy] URL del proxy utilizado para peticiones a dominios remotos (ver TC.Cfg.{{#crossLink "TC.Cfg/proxy:property"}}{{/crossLink}}).
     * @example
     *     <div id="mapa"/>
     *     <script>
     *         // Crear un mapa con las opciones por defecto.
     *         var map = new TC.Map("mapa");
     *     </script>
     * @example
     *     <div id="mapa"/>
     *     <script>
     *         // Crear un mapa en el sistema de referencia WGS 84 con el de mapa de fondo.
     *         var map = new TC.Map("mapa", {
     *             crs: "EPSG:4326",
     *             initialExtent: [ // Coordenadas en grados decimales, porque el sistema de referencia espacial es WGS 84.
     *                 -2.84820556640625,
     *                 41.78912492257675,
     *                 -0.32135009765625,
     *                 43.55789822064767
     *             ],
     *             maxExtent: [
     *                 -2.84820556640625,
     *                 41.78912492257675,
     *                 -0.32135009765625,
     *                 43.55789822064767
     *             ],
     *             baseLayers: [
     * 				TC.Consts.layer.IDENA_DYNBASEMAP
     *             ]
     *         });
     *     </script>
     * @example
     *     <div id="mapa"></div>
     *     <script>
     *         // Crear un mapa que tenga como contenido las capas de toponimia y mallas cartográficas del WMS de IDENA.
     *         var map = new TC.Map("mapa", {
     *             workLayers: [
     *                 {
     *                     id: "topo_mallas",
     *                     title: "Toponimia y mallas cartográficas",
     *                     type: TC.Consts.layerType.WMS,
     *                     url: "//idena.navarra.es/ogc/wms",
     *                     layerNames: "IDENA:toponimia,IDENA:mallas"
     *                 }
     *             ]
     *         });
     *     </script>
     */

    var currentState = null;
    var previousState = null;
    const _setupStateControl = function () {
        const self = this;

        var MIN_TIMEOUT_VALUE = 4;

        // eventos a los que estamos suscritos para obtener el estado            
        var events = [
            TC.Consts.event.LAYERADD,
            TC.Consts.event.LAYERORDER,
            TC.Consts.event.LAYERREMOVE,
            //TC.Consts.event.LAYEROPACITY, // Este evento lo vamos a tratar por separado, para evitar exceso de actualizaciones de estado.
            TC.Consts.event.LAYERVISIBILITY,
            TC.Consts.event.ZOOM,
            TC.Consts.event.BASELAYERCHANGE,
            TC.Consts.event.UPDATEPARAMS
        ].join(' ');

        // gestión siguiente - anterior

        let eventsToMapChange = [
            TC.Consts.event.LAYERUPDATE,
            TC.Consts.event.FEATUREADD,
            TC.Consts.event.FEATUREREMOVE,
            TC.Consts.event.FEATUREMODIFY,
            TC.Consts.event.FEATURESADD,
            TC.Consts.event.FEATURESCLEAR,
            TC.Consts.event.UPDATEPARAMS
        ].join(' ');

        self.on(eventsToMapChange, () => self.trigger(TC.Consts.event.MAPCHANGE));

        // registramos el estado inicial                
        self.replaceCurrent = true;
        _addToHistory.call(self);

        const fn_addToHistory = _addToHistory.bind(self);

        // nos suscribimos a los eventos para registrar el estado en cada uno de ellos
        self.on(events, fn_addToHistory);

        // a la gestión del evento de opacidad le metemos un retardo, para evitar que haya un exceso de actualizaciones de estado.
        var layerOpacityHandlerTimeout;
        self.on(TC.Consts.event.LAYEROPACITY, function (e) {
            clearTimeout(layerOpacityHandlerTimeout);
            layerOpacityHandlerTimeout = setTimeout(function () {
                _addToHistory.call(self, e);
            }, 500);
        });

        // gestión siguiente - anterior
        window.addEventListener('popstate', function (e) {
            var wait;
            wait = self.loadingCtrl && self.loadingCtrl.addWait();
            setTimeout(async function () {
                if (e) {
                    // eliminamos la suscripción para no registrar el cambio de estado que vamos a provocar
                    self.off(events, fn_addToHistory);

                    var state = e.state;
                    if (Object.prototype.toString.call(state) === '[object Object]') {
                        state = await self.checkLocation();
                    }

                    // gestionamos la actualización para volver a suscribirnos a los eventos del mapa                        
                    _loadIntoMap.call(self, state).then(function () {
                        setTimeout(function () {
                            self.on(events, fn_addToHistory);
                        }, 200);
                        self.loadingCtrl && self.loadingCtrl.removeWait(wait);
                    });
                }
            }, MIN_TIMEOUT_VALUE);
        });
    };

    let jsonPackWorkerUrlPromise;
    const jsonPackSettleFunctions = {};
    const getJsonPackWorker = async function () {
        if (!jsonPackWorkerUrlPromise) {
            jsonPackWorkerUrlPromise = TC.Util.getWebWorkerCrossOriginURL(TC.apiLocation + 'TC/workers/tc-jsonpack-web-worker.js');
        }
        const jsonPackWorkerUrl = await jsonPackWorkerUrlPromise;
        const jsonPackWorker = new Worker(jsonPackWorkerUrl);
        jsonPackWorker.onmessage = function (e) {
            const settleFunctions = jsonPackSettleFunctions[e.data.id];
            if (settleFunctions) {
                if (e.data.error) {
                    settleFunctions.reject(e.data.error);
                }
                else {
                    settleFunctions.resolve(e.data.result);
                }
                jsonPackWorker.terminate();
                delete jsonPackSettleFunctions[e.data.id];
            }
        };
        return jsonPackWorker;
    };

    const jsonpackProcess = function (action, json) {
        return new Promise(function (resolve, reject) {
            getJsonPackWorker().then(function (worker) {
                const workId = TC.getUID();
                jsonPackSettleFunctions[workId] = { resolve: resolve, reject: reject };
                worker.postMessage({
                    id: workId,
                    action: action,
                    object: json
                });
            });
        });
    };

    const supportsFileSystemAccess = TC.Util.isFunction(DataTransferItem.prototype.getAsFileSystemHandle);

    const _addToHistory = async function (e) {
        const self = this;

        var state = await _getMapState.call(self);
        if (self.replaceCurrent) {
            window.history.replaceState(state, null, null);
            delete self.replaceCurrent;

            return;
        } else {

            /*if (self.registerState != undefined && !self.registerState) {
                self.registerState = true;
                return;
            }*/

            var saveState = function () {
                previousState = currentState;
                currentState = TC.Util.utf8ToBase64(state);
                if (currentState !== previousState) {
                    window.history.pushState(state, null, window.location.href.split('#').shift() + '#' + currentState);
                }
            };

            if (e) {
                self.lastEventType = e.type;

                switch (true) {
                    case e.type === TC.Consts.event.BASELAYERCHANGE:
                    case e.type === TC.Consts.event.LAYERORDER:
                    case e.type === TC.Consts.event.ZOOM:
                        saveState();
                        break;
                    case e.type === TC.Consts.event.UPDATEPARAMS:
                        // unicamente modifico el hash si la capa es WMS
                        if (e.layer.type === TC.Consts.layerType.WMS) {
                            saveState();
                        }
                        break;
                    case e.type.toLowerCase().indexOf("LAYER".toLowerCase()) > -1:
                        // unicamente modifico el hash si la capa es WMS o vectorial de archivos locales
                        if (e.layer.type === TC.Consts.layerType.WMS ||
                            supportsFileSystemAccess && e.layer.type === TC.Consts.layerType.VECTOR && e.layer.options.file) {
                            saveState();
                        }
                        break;
                }

                self.trigger(TC.Consts.event.MAPCHANGE);
            }
        }
    };

    const _getMapState = function (options) {
        const self = this;
        options = options || {};
        return new Promise(function (resolve, reject) {
            var state = {};

            if (self.crs !== self.options.crs) {
                state.crs = self.crs;
            }

            var ext = self.getExtent();
            for (var i = 0; i < ext.length; i++) {
                if (Math.abs(ext[i]) > 180)
                    ext[i] = Math.floor(ext[i] * 1000) / 1000;
            }
            state.ext = ext;

            //determinar capa base
            var baseLayerData = [];

            // ¿es una capa de respaldo?
            if (self.baseLayers) {
                baseLayerData = self.baseLayers.filter(function (baseLayer) {
                    return baseLayer.isRaster() && baseLayer.fallbackLayer;
                }).map(function (baseLayer) {
                    return {
                        baseLayer: baseLayer, fallbackLayerID: baseLayer.fallbackLayer.id
                    };
                }).filter(function (baseLayerData) {
                    return baseLayerData.fallbackLayerID === (self.baseLayer ? self.baseLayer.id : self.baseLayers[0].id);
                });
            }

            if (baseLayerData.length > 0) {
                state.base = baseLayerData[0].baseLayer.id;
            } else if (self.baseLayer || self.baseLayers && self.baseLayers[0]) {
                state.base = (self.baseLayer || self.baseLayers[0]).id;
            }

            //capas cargadas
            state.layers = [];

            self.workLayers.forEach(function addLayerState(layer) {
                if (layer.type === TC.Consts.layerType.WMS && !layer.options.stateless) {
                    layer.layerNames = layer.names || layer.layerNames;
                    if (layer.layerNames && layer.layerNames.length || layer.hideTree === false) {
                        const entry = {
                            u: TC.Util.isOnCapabilities(layer.url),
                            n: Array.isArray(layer.names) ? layer.names.join(',') : layer.names,
                            o: layer.getOpacity(),
                            v: layer.getVisibility(),
                            h: layer.options.hideTitle,
                            ur: layer.unremovable,
                            f: layer.filter && (layer.filter instanceof TC.filter.Filter ? layer.filter.getText() : layer.filter),
                            t: layer.title,
                            i: layer.id
                        };
                        //24/11/2021 URI: Añadir el hidetree si no tiene el valor por defecto que es true
                        if (layer.hideTree === false) {
                            entry.x = 0;
                        }

                        state.layers.push(entry);
                    }
                }
                else if (supportsFileSystemAccess && layer.type === TC.Consts.layerType.VECTOR && layer.options.file) {
                    const entry = {
                        o: layer.getOpacity(),
                        v: layer.getVisibility(),
                        h: layer.options.hideTitle,
                        ur: layer.unremovable,
                        fn: layer.options.file,
                        t: layer.title,
                        i: layer.id
                    };
                    state.layers.push(entry);
                }
            });

            if (self.on3DView && self.view3D.cameraControls) {
                state.vw3 = self.view3D.cameraControls.getCameraState();
            }

            if (options.extraStates) {
                TC.Util.extend(state, options.extraStates);
            }

            if (!options.cacheResult && self._controlStatesCache) {
                delete self._controlStatesCache;
            }
            if (self._controlStatesCache) {
                resolve(self._controlStatesCache);
            }
            else {
                jsonpackProcess('pack', state)
                    .then(packed => {
                        if (options.cacheResult) {
                            self._controlStatesCache = packed;
                        }
                        resolve(packed);
                    })
                    .catch(error => reject(error));
            }
        });
    };

    const _loadIntoMap = function (stringOrJson) {
        const self = this;
        const promises = [];

        if (!stringOrJson) {
            return Promise.resolve();
        }

        if (!self.loadingctrl) {
            self.loadingCtrl = self.getControlsByClass("TC.control.LoadingIndicator")[0];
        }

        if (!self.hasWait) {
            self.hasWait = self.loadingCtrl && self.loadingCtrl.addWait();
        }

        // GLS lo añado para poder gestionar el final de la actualización de estado y volver a suscribirme a los eventos del mapa
        return new Promise(function (resolve, _reject) {
            var resolved = function () {
                self.loadingCtrl && self.loadingCtrl.removeWait(self.hasWait);
                delete self.hasWait;
                resolve();
            };

            let objPromise;
            if (typeof stringOrJson === "string") {
                objPromise = new Promise(function (res, rej) {
                    jsonpackProcess('unpack', stringOrJson)
                        .then(obj => res(obj))
                        .catch(_err => res(JSON.parse(stringOrJson)))
                        .catch(err => {
                            TC.error(TC.Util.getLocaleString(self.options.locale, 'mapStateNotValid'));
                            rej(err);
                        });
                });
            } else {
                objPromise = Promise.resolve(stringOrJson);
            }

            objPromise.then(function (obj) {
                // CRS
                if (obj.crs && obj.crs !== self.crs ||
                    typeof obj.crs === 'undefined' && self.crs !== self.options.crs) {
                    promises.push(self.setProjection({
                        crs: obj.crs || self.options.crs,
                        oldCrs: self.crs,
                        extent: obj.ext,
                        baseLayer: self.getLayer(obj.base)
                    }));
                }
                else {
                    //capa base
                    if (obj.base != self.getBaseLayer().id) {
                        if (self.getLayer(obj.base)) {
                            self.setBaseLayer(obj.base);
                        }
                        const firstOption = self.baseLayers.filter(function (baseLayer) {
                            return baseLayer.options.fallbackLayer === obj.base;
                        })[0];
                        if (firstOption) {
                            const fbPromise = self.addLayer(firstOption.getFallbackLayer());
                            promises.push(fbPromise);
                            fbPromise.then(function (newLayer) {
                                self.setBaseLayer(newLayer);
                            });
                        }
                    }

                    //extent
                    if (obj.ext) {
                        promises.push(self.setExtent(obj.ext, { animate: false }));
                    }
                }

                obj.layers = obj.layers || obj.capas || [];

                if (obj.layers.length > 0) {

                    for (var i = 0; i < obj.layers.length; i++) {
                        var stateLayer = obj.layers[i];

                        var layerInConfig = false;
                        let lyrCfg;
                        for (var j = 0; j < self.options.workLayers.length; j++) {

                            lyrCfg = TC.Util.extend({}, self.options.workLayers[j], { map: self });

                            if (stateLayer.u === lyrCfg.url &&
                                (!lyrCfg.layerNames ||
                                    lyrCfg.layerNames.length ||
                                    lyrCfg.layerNames.indexOf(stateLayer.n) >= 0)) {
                                layerInConfig = true;
                                lyrCfg.renderOptions = { "opacity": stateLayer.o, "hide": !stateLayer.v };
                                lyrCfg.unremovable = stateLayer.ur;
                                lyrCfg.title = stateLayer.t;
                                lyrCfg.hideTree = Object.prototype.hasOwnProperty.call(stateLayer, "x") ? !!stateLayer.x : true;
                                if (stateLayer.n)
                                    lyrCfg.layerNames = stateLayer.n;
                                promises.push(self.addOrUpdateLayer(lyrCfg).then(function (layer) {
                                    layer.setVisibility(this.v);
                                    layer.setOpacity(this.o, true);
                                }.bind(stateLayer)));
                            }
                        }

                        if (!layerInConfig) {
                            const lyrCfg = {
                                id: stateLayer.i || TC.getUID(),
                                hideTitle: stateLayer.h,
                                unremovable: stateLayer.ur,
                                title: stateLayer.t,
                                hideTree: Object.prototype.hasOwnProperty.call(stateLayer, "x") ? !!stateLayer.x : true,
                                renderOptions: {
                                    opacity: stateLayer.o,
                                    hide: !stateLayer.v
                                }
                            };
                            if (stateLayer.fn) {
                                // Capa de archivo serializada
                                lyrCfg.type = TC.Consts.layerType.VECTOR;
                                lyrCfg.file = stateLayer.fn;
                            }
                            else {
                                lyrCfg.url = TC.Util.isOnCapabilities(stateLayer.u, stateLayer.u.indexOf(window.location.protocol) < 0) || stateLayer.u;
                                lyrCfg.layerNames = stateLayer.n ? stateLayer.n.split(',') : [];
                            }
                            promises.push(self.addOrUpdateLayer(lyrCfg).then(function (layer) {
                                var rootNode = layer.wrap.getRootLayerNode();
                                layer.title = rootNode.Title || rootNode.title;
                                /*URI:el setOpacity recibe un nuevo parametro. Que indica si se no se va a lanzar evento LAYEROPACITY
                                esto es porque en el loadstate al establecer la opacidad dedido a un timeout pasados X segundos se lanzaba 
                                este evento y producía un push en el state innecesario*/
                                layer.setOpacity(this.o, true);
                                layer.setVisibility(this.v);
                            }.bind(stateLayer)));
                        }
                    }
                }

                //eliinar las capas añadidas al mapa que desaparecen en el nuevo estado
                self.workLayers.filter(l => l.type === TC.Consts.layerType.WMS && !obj.layers.some(l2 => l2.i === l.id)).forEach(
                    function (layer) {
                        self.removeLayer(layer);
                    });

                Promise.all(promises)
                    .then(function () {
                        resolved();
                    })
                    .catch(function () {
                        resolved();
                    });
            })
                //.catch(err => resolved());
                .catch(function () {
                    resolved();
                });
        });
    };

    const getReduceByValueFunction = function (prop, value) {
        return function (prev, cur, idx) {
            return cur[prop] === value ? idx : prev;
        };
    };

    const getReduceByZIndexFunction = function (zIndex) {
        return function (prev, cur, idx) {
            return cur.zIndex <= zIndex ? idx : prev;
        };
    };

    const getAvailableBaseLayer = function (id) {
        const ablCollection = this instanceof TC.Map ? this.options.availableBaseLayers : TC.Cfg.availableBaseLayers;
        return ablCollection.filter(function (abl) {
            return abl.id === id;
        })[0];
    };

    TC.Map = TC.Map || function (div, options) {
        ///<summary>
        ///Constructor
        ///</summary>
        ///<param name="div" type="HTMLElement|string">Elemento del DOM en el que crear el mapa o valor de atributo id de dicho elemento.</param>
        ///<param name="options" type="object" optional="true">Objeto de opciones de configuración del mapa. Sus propiedades sobreescriben el objeto de configuración global TC.Cfg.</param>
        ///<returns type="TC.Map"></returns>
        ///<field name='isReady' type='boolean'>Indica si todos los controles del mapa están cargados.</field>
        ///<field name='isLoaded' type='boolean' default='false'>Indica si todos los controles y todas las capas del mapa están cargados.</field>
        ///<field name='activeControl' type='TC.Control'>Control que está activo en el mapa, y que por tanto responderá a los eventos de ratón en su área de visualización.</field>
        ///<field name='layers' type='array' elementType='TC.Layer'>Lista de todas las capas base cargadas en el mapa.</field>
        ///<field name='controls' type='array' elementType='TC.Control'>Lista de todos los controles del mapa.</field>
        const self = this;
        TC.EventTarget.call(self);
        TC.Map._instances.push(self);

        //TC.Object.apply(self, arguments);

        /**
         * Indica si todos los controles del mapa están cargados.
         * @property isReady
         * @type boolean
         * @default false
         */
        self.isReady = false;

        /**
         * Indica si todos los controles y todas las capas del mapa están cargados.
         * @property isLoaded
         * @type boolean
         * @default false
         */
        self.isLoaded = false;

        /**
         * Lista de todos los controles del mapa.
         * @property controls
         * @type array
         * @default []
         */
        self.controls = [];

        /**
         * Control que está activo en el mapa, y que por tanto responderá a los eventos de ratón en su área de visualización.
         * @property activeControl
         * @type TC.Control
         * @default null
         */
        self.activeControl = null;

        /**
         * Lista de todas las capas cargadas en el mapa.
         * @property layers
         * @type array
         * @default []
         */
        self.layers = [];

        /**
         * Lista de todas las capas base cargadas en el mapa.
         * @property baseLayers
         * @type array
         * @default []
         */
        self.baseLayers = [];

        /**
         * Lista de todas las capas de trabajo cargadas en el mapa.
         * @property workLayers
         * @type array
         * @default []
         */
        self.workLayers = [];

        /**
         * Capa base actual del mapa.
         * @property baseLayer
         * @type TC.Layer
         */
        self.baseLayer = null;

        /**
         * Capa donde se dibujan las entidades geográficas si no se especifica la capa explícitamente. Se instancia en el momento de añadir la primera entidad.
         * @property vectors
         * @type TC.layer.Vector
         * @default null
         */
        self.vectors = null;

        var loadingLayerCount = 0;
        /**
         * Elemento del DOM donde se ha creado el mapa.
         * @property div
         * @type HTMLElement
         */
        self.div = TC.Util.getDiv(div);
        /**
         * El mapa ha cargado todas sus capas iniciales y todos sus controles
         * @event MAPLOAD
         */
        /**
         * El mapa ha cargado todos sus controles, pero no hay garantía de que estén cargadas las capas
         * @event MAPREADY
         */
        /**
         * Se va a añadir una capa al mapa.
         * @event BEFORELAYERADD
         * @param {TC.Layer} layer Capa que se va a añadir.
         */
        /**
         * Se ha añadido una capa al mapa.
         * @event LAYERADD
         * @param {TC.Layer} layer Capa que se ha añadido.
         */
        /**
         * Se ha eliminado una capa del mapa.
         * @event LAYERREMOVE
         * @param {TC.Layer} layer Capa que se ha eliminado.
         */
        /**
         * Se ha cambiado de posición una capa en la lista de capas del mapa.
         * @event LAYERORDER
         * @param {TC.Layer} layer Capa que se ha eliminado.
         * @param {number} oldIndex Índice de la posición antes del cambio.
         * @param {number} newIndex Índice de la posición después del cambio.
         */
        /**
         * Se va a actualizar una capa del mapa: se van a modificar sus entidades o se va solicitar una nueva imagen.
         * @event BEFORELAYERUPDATE
         * @param {TC.Layer} layer Capa que va a actualizarse.
         */
        /**
         * Se ha actualizado una capa del mapa: se ha modificado sus entidades o se ha cargado una imagen nueva.
         * @event LAYERUPDATE
         * @param {TC.Layer} layer Capa que se ha actualizado.
         */
        /**
         * Ha habido un error al cargar la capa, bien porque no se ha podido obtener su capabilities o porque no soporta CRS compatibles.
         * @event LAYERERROR
         * @param {TC.Layer} layer Capa que sufre el error.
         */
        /**
         * Se ha establecido una nueva capa como mapa base.
         * @event BASELAYERCHANGE
         * @param {TC.Layer} layer Capa que es el nuevo mapa base.
         */
        /**
         * Se va a actualizar alguna capa del mapa.
         * @event BEFOREUPDATE
         */

        self.div.classList.add(TC.Consts.classes.LOADING, TC.Consts.classes.MAP);

        // Para gestionar zoomToMarkers
        self._markerPromises = [];

        self._layerBuffer = {
            layers: [],
            contains: function (id) {
                return this.layers.some(function (l) {
                    return l.id === id;
                });
            },
            getIndex: function (id) {
                return this.layers.reduce(getReduceByValueFunction('id', id), -1);
            },
            add: function (id, zIndex, isBase) {
                const obj = {
                    id: id,
                    pending: true,
                    zIndex: zIndex,
                    isBase: isBase
                };
                this.layers.splice(this.getIndexForZIndex(zIndex), 0, obj);
            },
            remove: function (id) {
                this.layers.splice(this.getIndex(id), 1);
            },
            getMapLayers: function () {
                return this.layers
                    .filter(l => l.pending === false)
                    .filter(l => !l.rejected)
                    .map(l => l.mapLayer);
            },
            resolve: function (map, layer, isBase) {
                const layerObj = this.layers[this.getIndex(layer.id)];
                layerObj.mapLayer = layer;
                layerObj.pending = false;
                map.layers = this.getMapLayers();
                if (isBase) {
                    if (map.baseLayers.length === 0) {
                        map.baseLayers = new Array(map.options.baseLayers.length);
                    }

                    var index = map.options.baseLayers.map(l => l.id).indexOf(layer.id);
                    if (index < 0) {
                        index = map.baseLayers.map(l => l.type).indexOf(TC.Consts.layerType.VECTOR);
                        if (index < 0) {
                            map.baseLayers.push(layer);
                        } else {
                            map.baseLayers.splice(index, 0, layer);
                        }
                    } else {
                        map.baseLayers.splice(index, 1, layer);
                    }
                }
                else {
                    map.workLayers = map.layers.filter(function (l) {
                        return !l.isBase;
                    });
                }
            },
            reject: function (map, error) {
                const layerObj = this.layers[this.getIndex(error.layerId)];
                layerObj.mapLayer = null;
                layerObj.pending = false;
                layerObj.rejected = true;
                var index = map.options.baseLayers.map(l => l.id).indexOf(error.layerId);
                if (index >= 0) {
                    map.baseLayers.splice(index, 1);
                }
            },
            getResolvedWorkLayerIndex: function (_map, id) {
                return this.layers.filter(function (l) {
                    return l.id === id || !l.isBase && l.pending === false;
                }).reduce(getReduceByValueFunction('id', id), -1);
            },
            getResolvedVisibleLayerIndex: function (map, id) {
                var index = this.getResolvedWorkLayerIndex(map, id);
                if (map.baseLayer) {
                    index = index + 1;
                }
                return index;
            },
            getIndexForZIndex: function (zIndex) {
                return this.layers.reduce(getReduceByZIndexFunction(zIndex), -1) + 1;
            },
            checkMapLoad: function (map) {
                const self = this;
                if (map.options.baseLayers
                    .concat(map.options.workLayers)
                    .every(function (l) {
                        return self.contains(l.id || l);
                    }) && // Si ya se han empezado a procesar todas las capas de las opciones
                    !this.layers.some(function (layer) {
                        return layer.pending === true; // Si ya se han terminado de procesar
                    })) {
                    const throwMapLoad = async function () {
                        if (!map.isLoaded) {
                            const setLoaded = function () {

                                // 07/03/2019 GLS: Bug 24832 la gestión del estado comienza después de TC.Consts.event.MAPLOAD, 
                                // como los callbacks a loaded se lanzan según el orden de suscripción, el de script.js de IDENA se lanza antes 
                                // que el de la gestión del estado, lo que provoca que las capas añadidas por queryString no se registren.
                                if (map.options.stateful) {
                                    _setupStateControl.call(map);
                                }

                                map.isLoaded = true;
                                // Si hay datos en cache es posible que salte el evento MAPREADY después de MAPLOAD.
                                // Por eso quitamos la clase LOADING en un callback de ready().
                                map.ready(() => map.div.classList.remove(TC.Consts.classes.LOADING));
                                map.trigger(TC.Consts.event.MAPLOAD);
                            };
                            // tenemos estado 3d
                            if (map.state && map.state.vw3) {
                                if (!map.div.classList.contains(TC.Consts.classes.THREED)) {
                                    map.div.classList.add(TC.Consts.classes.THREED);

                                    if (!TC.view || !TC.view.ThreeD) {
                                        const module = await import('./view/ThreeD');
                                        TC.view = TC.view || {};
                                        TC.view.ThreeD = module.default;
                                    }
                                    TC.view.ThreeD.apply({
                                        map: map, state: map.state.vw3, callback: function () {
                                            setLoaded();

                                            map.getControlsByClass(TC.control.ThreeD)[0].button.removeAttribute("disabled");
                                        }
                                    });
                                }
                            } else {
                                setLoaded();
                            }
                        }
                    };
                    // Gestionamos el final de la carga del mapa
                    if (map.baseLayer) {
                        throwMapLoad();
                    }
                    else {
                        //GLS: Si no hay mapa de fondo cargado es posible que se haya añadido desde diálogo modal, lo comprobamos en todos los mapas de fondo disponibles del API
                        var onAvailables = [];
                        if (map.state && map.state.base) {
                            onAvailables = TC.Cfg.availableBaseLayers.filter(l => l.id === map.state.base);
                        }

                        if (onAvailables.length > 0) {
                            onAvailables[0].isBase = true;
                            map.addLayer(onAvailables[0]).then(function (_layer) {
                                throwMapLoad();
                            });
                        }
                        else {
                            // Si no hay capa base cargada cargamos la primera compatible
                            const lastResortBaseLayer = map.baseLayers.filter(function (layer) {
                                return !layer.mustReproject;
                            }).filter(function (l) {
                                return l.wrap && l.wrap.layer;
                            });

                            if (lastResortBaseLayer.length > 0) {
                                map.wrap.setBaseLayer(lastResortBaseLayer[0].wrap.layer);
                                map.baseLayer = lastResortBaseLayer[0];
                            }

                            throwMapLoad();
                        }
                    }
                }
            }
        };

        self._layerBuffer.layers = [];

        self._fileHandles = new WeakMap();

        if (!TC.ready) {
            TC.Cfg = TC.Util.extend({}, TC.Defaults, TC.Cfg);
            TC.ready = true;
        }

        // GLS: mergeOptions es inclusivo, para poder sobrescribir los tipos de búsqueda, añado con valor a false las que el usuario no haya configurado.
        if (options && options.controls && options.controls.search && options.controls.search.allowedSearchTypes) {
            for (var allowed in TC.Cfg.controls.search.allowedSearchTypes) {
                if (!Object.prototype.hasOwnProperty.call(options.controls.search.allowedSearchTypes, allowed)) {
                    options.controls.search.allowedSearchTypes[allowed] = false;
                }
            }
        }

        // Añado las capas disponibles a la configuración general

        /**
         * Objeto de opciones del constructor.
         * @property options
         * @type object
         */
        options = options || {};
        mergeOptions.call(self, options);

        self.id = options.id || TC.getUID({ prefix: 'map-' });

        self.crossOrigin = self.options.crossOrigin;

        var init = async function () {

            self.state = await self.checkLocation();

            if (self.options.layout) {
                self.trigger(TC.Consts.event.LAYOUTLOAD, { map: self });
            }

            if (options && options.workLayers !== undefined) {
                self.options.workLayers = options.workLayers;
            }
            if (options && options.baseLayers !== undefined) {
                self.options.baseLayers = options.baseLayers;
            }

            if (self.options.zoomToFeatures) {
                // zoom a features solo cuando se cargue el mapa
                var handleFeaturesAdd = function handleFeaturesAdd(e) {
                    clearTimeout(self._zoomToFeaturesTimeout);

                    self._zoomToFeaturesTimeout = setTimeout(function () {
                        self.zoomToFeatures(e.layer.features, { animate: false });
                        self.off(TC.Consts.event.FEATURESADD, handleFeaturesAdd);
                    }, 100);
                };
                self.on(TC.Consts.event.FEATURESADD, handleFeaturesAdd);
            }
            var _handleLayerAdd = function _handleLayerAdd(e) {
                if (e.layer.isBase &&
                    (e.layer === self.baseLayer ||
                        self.baseLayer && e.layer.fallbackLayer && e.layer.fallbackLayer.id === self.baseLayer.id)) {
                    if (typeof self.state !== "undefined") {
                        if (self.state.crs) {
                            self.loaded(function () {
                                self.setProjection({
                                    crs: self.state.crs,
                                    extent: self.state.ext
                                });
                            });
                        }
                        else {
                            self.setExtent(self.state.ext, { animate: false });
                        }
                    }
                    self.off(TC.Consts.event.LAYERADD, _handleLayerAdd);
                }
            };
            self.on(TC.Consts.event.LAYERADD, _handleLayerAdd);

            /**
             * Well-known ID (WKID) del CRS del mapa.
             * @property crs
             * @type string
             */
            self.crs = self.options.crs;
            self.initialExtent = self.options.initialExtent;
            self.maxExtent = self.options.maxExtent;

            self.defaultInfoContainer = self.defaultInfoContainer || self.options.defaultInfoContainer;
            // Si no se ha especificado, definimos defaultInfoContainer en base al espacio disponible en pantalla.
            if (!self.defaultInfoContainer && window.matchMedia('screen and (max-width: 40em), screen and (max-height: 40em)').matches) {
                self.defaultInfoContainer = TC.Consts.infoContainer.RESULTS_PANEL;
            }


            self.wrap = new TC.wrap.Map(self);

            TC.loadProjDef({
                crs: self.options.crs,
                callback: function () {
                    self.wrap.setMap();
                    const ctlPromises = [];

                    for (var name in self.options.controls) {
                        var ctlOptions = self.options.controls[name];
                        if (ctlOptions) {
                            ctlOptions = typeof ctlOptions === 'boolean' ? {} : TC.Util.extend(true, {}, ctlOptions);
                            if (typeof ctlOptions.div === 'string') {
                                ctlOptions.div = self.div.querySelector('#' + ctlOptions.div) || ctlOptions.div;
                            }
                            ctlPromises.push(self.addControl(name, ctlOptions));
                        }
                    }

                    self.on(TC.Consts.event.BEFORELAYERUPDATE, _triggerLayersBeforeUpdateEvent);
                    self.on(TC.Consts.event.LAYERUPDATE, _triggerLayersUpdateEvent);
                    self.on(TC.Consts.event.LAYERERROR, _triggerLayersUpdateEvent);

                    var i;
                    var lyrCfg;
                    for (i = 0; i < self.options.baseLayers.length; i++) {
                        lyrCfg = self.options.baseLayers[i];
                        if (typeof lyrCfg === 'string') {
                            lyrCfg = getAvailableBaseLayer.call(self, lyrCfg);
                        }
                        self.addLayer(TC.Util.extend({}, lyrCfg, { isBase: true, map: self }));
                    }

                    var setVisibility = function (layer) {
                        if (layer.isRaster() && !layer.names) {
                            layer.setVisibility(false);
                        }
                    };
                    const workLayersNotInState = self.options.workLayers
                        .map(function (workLayer) {
                            return TC.Util.extend({}, workLayer, { map: self });
                        })
                        .filter(function (workLayer) {
                            if (!self.state || !self.state.layers) {
                                return true;
                            }
                            return !self.state.layers.some(function (stateLayer) {
                                const result = stateLayer.u === workLayer.url && (!workLayer.layerNames || !workLayer.layerNames.length || workLayer.layerNames.indexOf(stateLayer.n) >= 0);
                                if (result) {
                                    stateLayer.id = workLayer.id; // Hemos identificado la capa, le damos el id que le corresponde
                                }
                                return result;
                            });
                        });
                    workLayersNotInState.forEach(function (workLayer) {
                        self.addLayer(workLayer).then(setVisibility);
                    });

                    if (self.state && self.state.layers) {

                        self.state.layers.forEach(function (stateLayer) {

                            const lyrCfg = {
                                id: stateLayer.i || TC.getUID(),
                                hideTitle: stateLayer.h,
                                unremovable: stateLayer.ur,
                                title: stateLayer.t,
                                filter: stateLayer.f,
                                hideTree: stateLayer.x !== 0,
                                renderOptions: {
                                    opacity: stateLayer.o,
                                    hide: !stateLayer.v
                                }
                            };
                            if (stateLayer.u) {
                                lyrCfg.url = TC.Util.isOnCapabilities(stateLayer.u, stateLayer.u.indexOf(window.location.protocol) < 0) || stateLayer.u;
                                lyrCfg.layerNames = stateLayer.n ? stateLayer.n.split(',') : undefined;
                            }
                            else {
                                lyrCfg.type = TC.Consts.layerType.VECTOR;
                                lyrCfg.file = stateLayer.fn;
                            }
                            // añado como promesa cada una de las capas que se añaden
                            self.addLayer(lyrCfg).then(function (layer) {
                                if (layer.wrap.getRootLayerNode) {
                                    var rootNode = layer.wrap.getRootLayerNode();
                                }
                                layer.title = stateLayer.t || rootNode && (rootNode.Title || rootNode.title);
                                if (this.o < 1) {
                                    layer.setOpacity(this.o);
                                }
                                if (!this.v) {
                                    layer.setVisibility(this.v);
                                }
                            }.bind(stateLayer))
                                .catch(function (error) {
                                    // no hacemos nada porque al llegar a este punto ya hemos gestionado el error en la instrucción crsLayerError(self, lyr); en la línea 4888														

                                    //URI:Si que hacemos ya que si falla el getCapabilities no hay CRS que valga
                                    self.toast(error.message, { type: TC.Consts.msgType.ERROR });
                                });
                        });
                    }
                    Promise.all(ctlPromises).finally(function () {
                        // 13/03/2020 si tenemos estado de controles, pasamos a establecer los estados
                        if (self.state && self.state.ctl) {
                            self.importControlStates(self.state.ctl);
                        }

                        self.isReady = true;
                        self.trigger(TC.Consts.event.MAPREADY);
                    });
                    setHeightFix(self.div);
                }
            });

            self.on(TC.Consts.event.FEATURECLICK, function (e) {
                if (!self.activeControl || !self.activeControl.isExclusive()) {
                    e.feature.showInfo();
                }
            });

            self.on(TC.Consts.event.NOFEATURECLICK, function (e) {
                e.layer._noFeatureClicked = true;
                var allLayersClicked = true;
                for (var i = 0, len = self.workLayers.length; i < len; i++) {
                    if (!self.workLayers[i]._noFeatureClicked) {
                        allLayersClicked = false;
                        break;
                    }
                }
                if (allLayersClicked) {
                    self.workLayers.forEach(function (wl) {
                        delete wl._noFeatureClicked;
                    });
                    self.getControlsByClass(TC.control.Popup).forEach(function (p) {
                        if (p.isVisible()) {
                            p.hide();
                        }
                    });
                }
            });
        };

        mapProto.getMapState = async function (options) {
            const self = this;

            var state = await _getMapState.call(self, options);
            return TC.Util.utf8ToBase64(state);
        };

        mapProto.getPreviousMapState = function () {
            return previousState;
        };

        mapProto.checkLocation = async function () {
            const self = this;
            var hash = window.location.hash;

            if (hash && hash.length > 1) {
                hash = hash.substr(1);

                var obj;
                try {
                    obj = await jsonpackProcess('unpack', TC.Util.base64ToUtf8(hash));
                }
                catch (error) {
                    try {
                        obj = JSON.parse(TC.Util.base64ToUtf8(hash));
                    }
                    catch (err) {
                        TC.error(TC.Util.getLocaleString(self.options.locale, 'mapStateNotValid'), TC.Consts.msgErrorMode.TOAST);
                        return;
                    }
                }

                if (TC.Util.detectIE() && window.location.href.length === 2047) {
                    TC.error(TC.Util.getLocaleString(self.options.locale, 'mapStateNotValidForEdge'), TC.Consts.msgErrorMode.TOAST);
                }

                if (obj) {
                    var inValidState = false;
                    //chequeo la integriadad del objeto restaurado del State
                    if (!Object.prototype.hasOwnProperty.call(obj, "ext")) {
                        inValidState = true;
                        obj.ext = self.options.initialExtent;
                    }
                    if (!Object.prototype.hasOwnProperty.call(obj, "base")) {
                        inValidState = true;
                        obj.base = self.options.defaultBaseLayer;
                    }
                    if (!Object.prototype.hasOwnProperty.call(obj, "layers")) {
                        inValidState = true;
                        obj.layers = [];
                    }
                    else {
                        for (var i = obj.layers.length - 1; i >= 0; i--) {
                            const stateLayer = obj.layers[i];
                            if (!stateLayer ||
                                !(Object.prototype.hasOwnProperty.call(stateLayer, "u") && Object.prototype.hasOwnProperty.call(stateLayer, "n") ||
                                    Object.prototype.hasOwnProperty.call(stateLayer, "fn"))) {
                                inValidState = true;
                                obj.layers.length = obj.layers.length - 1;
                                continue;
                            }
                            else if (!Object.prototype.hasOwnProperty.call(stateLayer, "o") ||
                                !Object.prototype.hasOwnProperty.call(stateLayer, "v") ||
                                !Object.prototype.hasOwnProperty.call(stateLayer, "h")) {
                                inValidState = true;
                                TC.Util.extend(stateLayer, {
                                    o: stateLayer.o || 1,
                                    v: stateLayer.v || true,
                                    h: stateLayer.h || false
                                });
                            }
                        }
                    }

                    if (Object.prototype.hasOwnProperty.call(obj, "vw3")) {

                        if (!obj.vw3) {
                            inValidState = true;
                        } else if (!obj.vw3.cp || obj.vw3.cp.length !== 3 ||
                            !obj.vw3.chpr || obj.vw3.chpr.length !== 3 ||
                            !obj.vw3.bcpd) {
                            inValidState = true;
                        }
                    }

                    if (inValidState)
                        TC.error(TC.Util.getLocaleString(self.options.locale, 'mapStateNotValid'), TC.Consts.msgErrorMode.TOAST);
                    return obj;
                }
                TC.error(TC.Util.getLocaleString(self.options.locale, 'mapStateNotValid'), TC.Consts.msgErrorMode.TOAST);
            }
            return;
        };

        /*
        *  _triggerLayersBeforeUpdateEvent: Triggers map beforeupdate event (jQuery.Event) when any layer starts loading
        *  Parameters: OpenLayers.Layer, event name ('loadstart', 'loadend')
        */
        var _triggerLayersBeforeUpdateEvent = function (_e) {
            if (loadingLayerCount <= 0) {
                loadingLayerCount = 0;
                self.trigger(TC.Consts.event.BEFOREUPDATE);
            }
            loadingLayerCount = loadingLayerCount + 1;
        };

        var _triggerLayersUpdateEvent = function (_e) {
            loadingLayerCount = loadingLayerCount - 1;
            if (loadingLayerCount <= 0) {
                loadingLayerCount = 0;
                self.trigger(TC.Consts.event.UPDATE);
            }
        };

        const locale = self.options.locale;

        TC.i18n.loadResources(!TC.i18n[locale], TC.apiLocation + 'TC/resources/', locale).finally(function () {
            // Si no hay tamaño definido en el div, lo ponemos a pantalla completa
            // Lo ponemos aquí porque es poco antes de cargar markup.html
            const divRect = self.div.getBoundingClientRect();
            if (divRect.height === 0) {
                document.querySelectorAll('html,body').forEach(elm => elm.classList.add('tc-fullscreen'));
                self.div.classList.add('tc-fullscreen');
            }
            // 22/03/2019 GLS: siempre vamos a tener layout porque en sitna.js (1757) se establece por defecto layout/responsive
            //                 si el usuario define otro se sobrescribe
            if (self.options.layout) {
                var layout = self.options.layout;

                self.trigger(TC.Consts.event.BEFORELAYOUTLOAD, { map: self });

                var layoutURLs = {};
                var ignoreError = false;
                if (typeof layout === 'string') {
                    var href = layout.trim();
                    href += href.match(/\/$/) ? '' : '/';

                    layoutURLs.config = href + 'config.json';
                    layoutURLs.markup = href + 'markup.html';
                    layoutURLs.style = href + 'style.css';
                    layoutURLs.script = href + 'script.js';
                    layoutURLs.i18n = href + 'resources';

                    // Si el layout se define como string, no podemos saber qué archivos a definido y cuales no, 
                    // por eso tampoco podemos saber si es un error de configuración o es que no lo ha definido así que no mostramos error entendiendo que si
                    // el archivo no está es porque no quiere.
                    ignoreError = true;
                }
                else if (
                    Object.prototype.hasOwnProperty.call(layout, 'config') ||
                    Object.prototype.hasOwnProperty.call(layout, 'markup') ||
                    Object.prototype.hasOwnProperty.call(layout, 'style') ||
                    Object.prototype.hasOwnProperty.call(layout, 'script') ||
                    Object.prototype.hasOwnProperty.call(layout, 'href') ||
                    Object.prototype.hasOwnProperty.call(layout, 'i18n')
                ) {
                    layoutURLs = TC.Util.extend({}, layout);
                }

                if (layoutURLs.i18n) {
                    layoutURLs.i18n += layoutURLs.i18n.match(/\/$/) ? '' : '/';
                }

                self.layout = layoutURLs;

                const layoutPromises = [];
                const ResponseError = function (status, url) {
                    this.status = status;
                    this.url = url;
                };
                const onError = function (error) {
                    if (!ignoreError || error.status != 404) {
                        const mapObj = TC.Map.get(document.querySelector('.' + TC.Consts.classes.MAP));
                        TC.error(
                            TC.Util.getLocaleString(mapObj.options.locale, "urlFailedToLoad",
                                { url: error.url }),
                            [TC.Consts.msgErrorMode.TOAST, TC.Consts.msgErrorMode.EMAIL],
                            "Error al cargar " + error.url);
                    }
                };

                const i18nLayoutPromise = new Promise(function (resolve, _reject) {
                    if (layoutURLs.config) {

                        layoutPromises.push(fetch(layoutURLs.config)
                            .then(function (response) {
                                if (!response.ok) { // status no está en el rango 200-299
                                    throw new ResponseError(response.status, layoutURLs.config);
                                }
                                return response.json();
                            }).then(function (data) {
                                resolve(data.i18n);
                                mergeOptions.call(self, data, options);
                            }).catch(function (error) {
                                if (error.status) {
                                    onError(error);
                                }

                                resolve(false);
                            }));
                    }
                    else {
                        resolve(false);
                    }
                });
                layoutPromises.push(i18nLayoutPromise);

                if (layoutURLs.style) {
                    layoutPromises.push(new Promise(function (resolve, _reject) {
                        // Añadimos una clase para hacer más fáciles las reglas del layout
                        self.div.classList.add('tc-lo');

                        // GLS: 28/03/2019 Necesito hacer el HEAD para validar si existe porque si lo hago directamente y lo cargo como BLOB, 
                        // las referencias a las fuentes son relativas al blob por lo que no funcionan, así que HEAD y si existe lo cargo por href
                        fetch(layoutURLs.style, {
                            method: navigator.onLine ? 'HEAD' : 'GET' // FLP: Las peticiones HEAD no se guardan en la cache, así que offline fallan, por eso la opción GET.
                        }).then(function (response) {
                            if (!response.ok) { // status no está en el rango 200-299
                                throw new ResponseError(response.status, layoutURLs.style);
                            }
                            return response;
                        }).then(function () {
                            var linkElement = document.createElement('link');
                            linkElement.rel = 'stylesheet';
                            linkElement.href = layoutURLs.style;

                            document.head.appendChild(linkElement);
                            resolve();
                        }).catch(function (error) {
                            if (error.status) {
                                onError(error);
                            }

                            resolve();
                        });
                    }));
                }

                if (layoutURLs.markup) {
                    layoutPromises.push(new Promise(function (resolve, _reject) {

                        fetch(layoutURLs.markup)
                            .then(function (response) {
                                if (!response.ok) { // status no está en el rango 200-299
                                    throw new ResponseError(response.status, layoutURLs.markup);
                                }
                                return response.text();
                            }).then(function (data) {
                                // markup.html puede ser una plantilla para soportar i18n, compilarla si es el caso
                                i18nLayoutPromise.then(function (i18n) {
                                    if (i18n && locale && layoutURLs.i18n) {
                                        TC.i18n.loadResources(true, layoutURLs.i18n, locale).finally(function () {
                                            const replacerFn = function (_match, grp1, grp2, grp3) {
                                                return TC.Util.getLocaleString(locale, grp1 || grp2 || grp3);
                                            };
                                            //data = data.replace(/\{\{([^\}\{]+)\}\}/g, replacerFn); // Estilo {{key}}
                                            //data = data.replace(/\{@i18n \$key="([^\}\{]+)"\/\}/g, replacerFn); // Estilo {@i18n $key="key"/}
                                            //data = data.replace(/\{\{i18n "([^\}\{]+)"\}\}/g, replacerFn); // Estilo {{i18n "key"}}
                                            data = data.replace(/\{\{i18n "([^\}\{]+)"\}\}|\{\{([^\}\{]+)\}\}|\{@i18n \$key="([^\}\{]+)"\/\}/g, replacerFn); // Los tres estilos anteriores
                                            self.div.insertAdjacentHTML('beforeend', data);
                                            resolve();
                                        });
                                    }
                                    else {
                                        self.div.insertAdjacentHTML('beforeend', data);
                                        resolve();
                                    }
                                });
                            }).catch(function (error) {
                                if (error.status) {
                                    onError(error);
                                }

                                resolve();
                            });
                    }));
                }

                Promise.all(layoutPromises).finally(function () {

                    if (layoutURLs.script) {
                        fetch(layoutURLs.script)
                            .then(function (response) {
                                if (!response.ok) { // status no está en el rango 200-299
                                    throw new ResponseError(response.status, layoutURLs.script);
                                }
                                return response.blob();
                            }).then(function (fileBlob) {
                                var fileURL = URL.createObjectURL(fileBlob);

                                var scriptElement = document.createElement('script');
                                scriptElement.src = fileURL;

                                scriptElement.onload = function () {
                                    setHeightFix(self.div);
                                    init();
                                };

                                document.head.appendChild(scriptElement);

                            }).catch(function (error) {
                                if (error.status) {
                                    onError(error);
                                }
                                init();
                            });
                    } else {
                        init();
                    }
                });

            }
            else {
                init();
            }
        });

        // Borramos árboles de capas cacheados
        self.on(TC.Consts.event.UPDATEPARAMS, function (e) {
            deleteTreeCache(e.layer);
        });
        self.on(TC.Consts.event.ZOOM, function () {
            for (var i = 0; i < self.workLayers.length; i++) {
                deleteTreeCache(self.workLayers[i]);
            }
        });

        // Redefinimos TC.error para añadir un aviso en el mapa
        /*var oldError = TC.error;
        TC.error = function (text) {
            oldError(text);
            self.toast(text, { type: TC.Consts.msgType.ERROR, duration: TC.Cfg.toastDuration * 2 });
        };*/
        var oldError = TC.error;
        TC.error = function (text, options, subject) {
            if (TC.isDebug && console.trace) {
                console.trace();
            }
            if (!options) {
                oldError(text);
                self.toast(text, { type: TC.Consts.msgType.ERROR, duration: TC.Cfg.toastDuration * 2 });
            }
            else {
                var fnc = function (text, mode, subject) {
                    switch (mode) {
                        case TC.Consts.msgErrorMode.TOAST:
                            if (!self.toast) { console.warn("No existe el objeto Toast"); return; }
                            self.toast(text, { type: TC.Consts.msgType.ERROR, duration: TC.Cfg.toastDuration * 2 });
                            break;
                        case TC.Consts.msgErrorMode.EMAIL:
                            if (TC.Cfg.loggingErrorsEnabled) {
                                JL("onerrorLogger").fatalException(!subject ? text : {
                                    "msg": subject,
                                    "errorMsg": text
                                }, null);
                            }
                            break;
                        case TC.Consts.msgErrorMode.CONSOLE:
                        default:
                            console.error(text);
                            break;
                    }
                };
                if (!Array.isArray(options)) {
                    fnc(text, options, subject);
                }
                else {
                    for (var i = 0; i < options.length; i++) {
                        fnc(text, options[i], subject);
                    }
                }
            }

        };
    };

    TC.Map._instances = [];

    TC.Map.get = function (elm) {
        for (var i = 0, len = TC.Map._instances.length; i < len; i++) {
            const instance = TC.Map._instances[i];
            if (instance.div === elm) {
                return instance;
            }
        }
    };

    TC.inherit(TC.Map, TC.EventTarget);

    var deleteTreeCache = function (layer) {
        if (layer.type === TC.Consts.layerType.WMS) {
            layer.tree = null;
        }
    };

    /*
     * Función que mezcla opciones de mapa relativos a capa, teniendo cuidado de que puede haber objetos de opciones de capa o identificadores de capa.
     * En este último caso, si no son la opción prioritaria, hay que sustituirlos por los objetos de definiciones de capa.
     */
    var mergeLayerOptions = function (optionsArray, propertyName) {
        const self = this;
        // lista de opciones de capa de los argumentos
        var layerOptions = Array.prototype.slice.call(optionsArray).map(function (elm) {
            var result = {};
            if (elm) {
                result[propertyName] = elm[propertyName];
            }
            return result;
        });
        if (propertyName === 'availableBaseLayers') console.log("layerOptions", layerOptions);
        // añadimos las opciones de capa de la configuración general
        var layerOption = {};
        layerOption[propertyName] = TC.Cfg[propertyName];
        layerOptions.unshift(layerOption);

        //Si se han definido baseLayers en el visor, hay que hacer un merge con las predefinidas en la API
        if (propertyName === 'baseLayers' && layerOptions[1]['baseLayers']) {
            layerOption = layerOptions[1];

            for (var i = 0; i < layerOption.baseLayers.length; i++) {
                if (typeof layerOption.baseLayers[i] === 'object') {
                    TC.Util.extend(layerOption.baseLayers[i], getAvailableBaseLayer.call(self, layerOption.baseLayers[i].id));
                }
            }
        } else {
            layerOptions.unshift(true); // Deep merge
            layerOption = TC.Util.extend.apply(this, layerOptions);
            if (propertyName === 'availableBaseLayers') console.log("layerOption", layerOption);
        }

        return layerOption[propertyName];
    };

    const mergeControlOptions = function (controlOptions) {

        if (controlOptions.controlContainer) {

            if (Array.isArray(controlOptions.controlContainer.controls)) {

                controlOptions.controlContainer.controls.forEach((ctl) => {
                    Object.keys(ctl).filter((key) => key !== "position").forEach((name) => {
                        if (controlOptions[name] !== undefined) {
                            if (typeof ctl[name] === 'boolean') {
                                ctl[name] = {};
                            }
                            TC.Util.extend(ctl[name], controlOptions[name]);
                            delete controlOptions[name];
                        }
                    });
                });

            } else {
                // GLS compatibilidad hacia atrás

                Object.keys(controlOptions).filter(function (key) {
                    return Object.keys(controlOptions.controlContainer.controls).indexOf(key) > -1;
                }).forEach(function (key) {
                    const containerControl = controlOptions.controlContainer.controls[key];
                    if (typeof containerControl.options === 'boolean') {
                        containerControl.options = {};
                    }
                    TC.Util.extend(containerControl.options, controlOptions[key]);
                    delete controlOptions[key];
                });
            }
        }

        return controlOptions;
    };

    const mergeOptions = function () {
        const argArray = [true, {}, TC.Cfg].concat(Array.prototype.slice.call(arguments));
        const result = this.options = TC.Util.extend.apply(this, argArray);
        // Concatenamos las colecciones availableBaseLayers
        result.availableBaseLayers = TC.Cfg.availableBaseLayers.concat.apply(TC.Cfg.availableBaseLayers, Array.prototype.map.call(arguments, function (arg) {
            return arg.availableBaseLayers || [];
        }));
        result.baseLayers = mergeLayerOptions.call(this, arguments, 'baseLayers');
        result.workLayers = mergeLayerOptions.call(this, arguments, 'workLayers');

        const controls = Array.prototype.slice.call(arguments)
            .filter(elem => elem.controls)
            .map(elem => elem.controls);
        if (controls.length > 0) {
            result.controls = TC.Util.extend(true, result.controls, mergeControlOptions(TC.Util.extend(true, controls[0], controls[1])));
        }
        return result;
    };

    var mapProto = TC.Map.prototype;

    var crsLayerError = function (map, layer) {
        var errorMessage = 'Layer "' + layer.title + '" ("' + layer.names + '"): ';
        var reason;
        if (layer.isValidFromNames()) {
            reason = 'layerSrsNotCompatible';
        } else {
            reason = 'layerNameNotValid';
        }
        errorMessage += TC.Util.getLocaleString(map.options.locale, reason);
        TC.error(errorMessage);
        map.trigger(TC.Consts.event.LAYERERROR, { layer: layer, reason: reason });

        const error = Error(errorMessage);
        error.layerId = layer.id;
        return error;
    };

    mapProto.getCrs = mapProto.getCRS = function () {
        const self = this;

        if (!self.on3DView) {
            return self.crs;
        } else {
            return self.view3D.crs;
        }
    };

    mapProto.setCrs = async function (crs, callback) {
        const self = this;
        await self.setProjection({ crs: crs });
        if (TC.Util.isFunction(callback)) {
            callback(crs);
        }
        return crs;
    };

    const appendRasterEvents = function (layer) {
        layer.wrap.$events.on(TC.Consts.event.TILELOADERROR, function (event) {
            if ((event.error.code && event.error.code.toString() != '404') && (event.error.text != 'offline')) {
                const wrap = this;
                if (!wrap._tileloaderror) {
                    const path = layer.getPath();
                    const title = path.length ? path[path.length - 1] : layer.title;
                    layer.map.toast(TC.Util.getLocaleString(layer.map.options.locale, 'tileload.error',
                        { name: title, error: event.error.text }),
                        { type: TC.Consts.msgType.ERROR });
                    wrap._tileloaderror = true;
                    const onTileload = function (e) {
                        if (e.tile.src && e.tile.src !== TC.Consts.BLANK_IMAGE) {
                            delete wrap._tileloaderror;
                            wrap.$events.off(TC.Consts.event.TILELOAD, onTileload);
                        }
                    };
                    wrap.$events.on(TC.Consts.event.TILELOAD, onTileload);
                }
            }
        });
    };

    /**
     * Añade una capa al mapa.
     * @method addLayer
     * @async
     * @param {TC.Layer|TC.cfg.LayerOptions|string} layer Objeto de capa, objeto de opciones del constructor de la capa, o identificador de capa.
     * @param {function} [callback] Función de callback.
     * @return {Promise} Promesa de objeto {{#crossLink "TC.Layer"}}{{/crossLink}}
     */
    mapProto.addLayer = function (layer, callback) {
        const self = this;

        const result = new Promise(function (resolve, reject) {

            if (typeof layer === 'object') {
                if (!layer.id)
                    layer.id = TC.getUID();
                else {
                    //URI expresion regular para sacar el prefijo y el número del ID de la capa y setear  lista de prefijos
                    const groups = /(?<ctl>[-_\p{Letter}]+(\u002D\d)?\u002D)?(?<num>[\d]*)?/gu.exec(layer.id).groups;
                    if (groups["num"] && groups["ctl"])
                        TC.setUIDStart(parseInt(groups["num"]) + 1, { prefix: groups["ctl"] });
                }

            }

            let zIndex = layer.options ? layer.options.zIndex : layer.zIndex;
            if (typeof zIndex !== 'number') {
                zIndex = layer.stealth ? 1 : 0;
            }

            self._layerBuffer.add(layer.id || layer, zIndex, layer.isBase);

            if (self.getLayer(layer.id)) {
                // Si ya existe capa con el mismo id, lanzamos error
                const error = Error(`Layer "${layer.id}" already exists`);
                error.layerId = layer.id;
                reject(error);
                return;
            }

            var lyr;
            if (typeof layer === 'string') {
                lyr = new TC.layer.Raster(TC.Util.extend({}, getAvailableBaseLayer.call(self, layer), { map: self }));
            }
            else {
                if (layer instanceof TC.Layer) {
                    lyr = layer;
                    lyr.map = self;
                }
                else {
                    layer.map = self;
                    if (layer.type === TC.Consts.layerType.VECTOR || layer.type === TC.Consts.layerType.KML || layer.type === TC.Consts.layerType.WFS) {
                        lyr = new TC.layer.Vector(layer);
                    }
                    else {
                        lyr = new TC.layer.Raster(layer);
                    }
                }
            }

            Promise.all([self.wrap.getMap(), lyr.wrap.getLayer()]).then(function () {

                self.trigger(TC.Consts.event.BEFORELAYERADD, { layer: lyr });

                // Nos aseguramos de que las capas raster se quedan por debajo de las vectoriales
                var idx;
                if (isRaster(lyr)) {
                    appendRasterEvents(lyr);
                    idx = self.wrap.indexOfFirstVector();
                }
                if (idx === -1) {
                    idx = self.wrap.getLayerCount();
                }

                const currentCrs = self.state && self.state.crs ? self.state.crs : self.getCRS();
                TC.loadProjDef({
                    crs: currentCrs,
                    callback: function () {
                        const isCompatible = lyr.isCompatible(currentCrs);
                        if (lyr.isBase) {
                            const baseLayerEndFn = function () {
                                if (self.state) {
                                    lyr.isDefault = self.state.base === lyr.id ||
                                        self.state.base === lyr.options.fallbackLayer;
                                }
                                else if (typeof self.options.defaultBaseLayer === 'string') {
                                    lyr.isDefault = self.options.defaultBaseLayer === lyr.id;
                                }
                                else if (typeof self.options.defaultBaseLayer === 'number') {
                                    lyr.isDefault = self.options.defaultBaseLayer === self.baseLayers.length;
                                }
                                if (lyr.isDefault) {
                                    var fit;
                                    if (lyr.mustReproject &&
                                        (lyr.type !== TC.Consts.layerType.WMTS || !lyr.wrap.getCompatibleMatrixSets(currentCrs)[0])) {
                                        if (lyr.options.fallbackLayer && lyr.getFallbackLayer) {

                                            self.addLayer(lyr.getFallbackLayer()).then(function (l) {
                                                self.wrap.setBaseLayer(l.wrap.layer);
                                                self.baseLayer = l.wrap.parent;
                                                // GLS: Tema casita + initialExtent
                                                fitToInitialExtent(fit);

                                                resolve(lyr);
                                            });
                                        } else {
                                            reject(crsLayerError(self, lyr));
                                        }
                                    }
                                    else {
                                        fit = self.baseLayer === null;

                                        lyr.wrap.getLayer().then(function (ollyr) {
                                            self.wrap.setBaseLayer(ollyr);
                                            self.baseLayer = lyr;

                                            // GLS: Tema casita + initialExtent
                                            fitToInitialExtent(fit);

                                            resolve(lyr);
                                        });
                                    }
                                }
                                else {
                                    //self.baseLayers.push(lyr);
                                    resolve(lyr);
                                }
                            };
                            if (isCompatible) {
                                baseLayerEndFn();
                            }
                            else {
                                // Puede ser que sea una capa nueva en un capabilities nuevo que lo tenemos cacheado
                                // Antes de lanzar error, nos aseguramos de que tenemos la versión nueva
                                lyr.getCapabilitiesOnline().then(function (onlineCapabilities) {
                                    lyr.capabilities = onlineCapabilities;
                                    if (!lyr.isCompatible(currentCrs)) {
                                        if (lyr.type !== TC.Consts.layerType.WMTS) {
                                            lyr.mustReproject = true;
                                        }
                                        else {
                                            const compatibleMatrixSet = lyr.wrap.getCompatibleMatrixSets(currentCrs)[0];
                                            if (compatibleMatrixSet) {
                                                lyr.wrap.setMatrixSet(compatibleMatrixSet);
                                            }
                                            else {
                                                lyr.mustReproject = true;
                                            }
                                        }
                                    }
                                    baseLayerEndFn();
                                });
                            }
                        }
                        else {
                            if (isCompatible) {
                                lyr.wrap.getLayer().then(function (_l) {
                                    resolve(lyr);
                                });
                            }
                            else {
                                // Puede ser que sea una capa nueva en un capabilities nuevo que lo tenemos cacheado
                                // Antes de lanzar error, nos aseguramos de que tenemos la versión nueva
                                lyr.getCapabilitiesOnline().then(function (onlineCapabilities) {
                                    lyr.capabilities = onlineCapabilities;
                                    if (lyr.isCompatible(currentCrs)) {
                                        lyr.wrap.getLayer().then(function (_l) {
                                            resolve(lyr);
                                        });
                                    }
                                    else {
                                        reject(crsLayerError(self, lyr));
                                    }
                                });
                            }
                        }
                    }
                });
            }, function (error) {
                var err = new Error(error);
                err.layerId = layer.id;
                reject(err);
            });
        });

        result
            .then(function (l) {
                self._layerBuffer.resolve(self, l, l.isBase);
                if (!l.isBase) {
                    self.wrap.insertLayer(l.wrap.layer, self._layerBuffer.getResolvedVisibleLayerIndex(self, l.id));
                }
                self.trigger(TC.Consts.event.LAYERADD, { layer: l });
                self._layerBuffer.checkMapLoad(self);
                if (TC.Util.isFunction(callback)) {
                    callback(l);
                }
            }, function (err) {
                self._layerBuffer.reject(self, err);
                self._layerBuffer.checkMapLoad(self);
            });

        const fitToInitialExtent = function (fit) {
            if (fit) {
                self.setExtent(self.initialExtent, { animate: false, contain: true });
            }
        };
        return result;
    };

    /**
    * Añade o actualiza una capa al mapa.
    * @method addLayer
    * @async
    * @param {TC.Layer|TC.cfg.LayerOptions|string} layer Objeto de capa, objeto de opciones del constructor de la capa, o identificador de capa.
    * @param {function} [callback] Función de callback.
    * @return {Promise} Promesa de objeto {{#crossLink "TC.Layer"}}{{/crossLink}}
    */
    mapProto.addOrUpdateLayer = async function (layer, callback) {
        const self = this;
        const currentLayer = self.getLayer(layer.id);
        if (currentLayer) {
            //actualiza			
            const layerNamesAsArray = Array.isArray(layer.layerNames) ? layer.layerNames :
                layer.layerNames ? layer.layerNames.split(',') : [];
            switch (currentLayer.type) {
                case TC.Consts.layerType.WFS:
                    break;
                case TC.Consts.layerType.WMS:
                    if (currentLayer.layerNames !== layerNamesAsArray) {
                        await currentLayer.setLayerNames(layerNamesAsArray);
                    }
                    if (layer.visibility != undefined && currentLayer.visibility !== layer.visibility) {
                        currentLayer.setVisibility(layer.visibility);
                        currentLayer.renderOptions = Object.assign(layer.renderOptions, { hide: layer.visibility });
                    }
                    if (layer.opacity !== undefined && currentLayer.opacity !== layer.opacity) {
                        currentLayer.setOpacity(layer.opacity, true);
                        currentLayer.renderOptions = Object.assign(layer.renderOptions, { opacity: layer.opacity });
                    }
                    currentLayer.unremovable = layer.unremovable;
                    currentLayer.title = layer.title;
                    currentLayer.hideTree = layer.hideTree;
                    break;
                default:
                    break;
            }
            return currentLayer;
        }
        return await self.addLayer(layer, callback);
    };

    mapProto.removeLayer = function (layer) {
        const self = this;

        return new Promise(function (resolve, reject) {

            if (layer.unremovable) {
                return reject("Unremovable");
            }

            let found = false;
            for (var i = 0; i < self.layers.length; i++) {
                if (self.layers[i] === layer) {
                    self.layers.splice(i, 1);
                    found = true;
                    break;
                }
            }
            if (!found) {
                reject(new Error(`Layer ${layer.id} not found in map`));
                return;
            }
            if (layer.isBase) {
                for (i = 0; i < self.baseLayers.length; i++) {
                    if (self.baseLayers[i] === layer) {
                        self.baseLayers.splice(i, 1);
                        if (self.baseLayer === layer) {
                            self.setBaseLayer(self.baseLayers[0]);
                        }
                        break;
                    }
                }
            }
            else {
                for (i = 0; i < self.workLayers.length; i++) {
                    if (self.workLayers[i] === layer) {
                        self.workLayers.splice(i, 1);
                        break;
                    }
                }
                if (layer === self.vectors) {
                    self.vectors = null;
                }
            }

            layer.wrap.getLayer().then(function (olLayer) {
                self.wrap.removeLayer(olLayer);
                self._layerBuffer.remove(layer.id);
                self.trigger(TC.Consts.event.LAYERREMOVE, { layer: layer });
                self._layerBuffer.checkMapLoad(self);
                resolve(layer);
            });
        });
    };

    mapProto.insertLayer = function (layer, idx, callback) {
        const self = this;
        return new Promise(function (resolve, _reject) {
            var beforeIdx = -1;
            for (var i = 0; i < self.layers.length; i++) {
                if (layer === self.layers[i]) {
                    beforeIdx = i;
                    break;
                }
            }

            var promises = [];
            promises.push(layer.wrap.getLayer());
            var targetLayer = self.layers[idx];
            if (targetLayer) {
                promises.push(targetLayer.wrap.getLayer());
            }
            Promise.all(promises).then(function (olLayers) {
                const olLayer = olLayers[0];
                const olTargetLayer = olLayers[1];
                var olIdx = -1;
                if (olTargetLayer) {
                    olIdx = self.wrap.getLayerIndex(olTargetLayer);
                }
                else {
                    olIdx = self.wrap.getLayerCount();
                }
                if (olIdx >= 0) {
                    layer.map = self;
                    self.wrap.insertLayer(olLayer, olIdx);
                    if (beforeIdx > -1) {
                        self.layers.splice(beforeIdx, 1);
                    }
                    self.layers.splice(idx, 0, layer);
                    self.workLayers = self.layers.filter(function (elm) {
                        return !elm.isBase;
                    });
                    self.trigger(TC.Consts.event.LAYERORDER, { layer: layer, oldIndex: beforeIdx, newIndex: idx });
                }
                if (TC.Util.isFunction(callback)) {
                    callback();
                }
                resolve(layer);
            });
        });
    };

    mapProto.setLayerIndex = function (layer, idx) {
        const self = this;
        const olIdx = idx - self.baseLayers.length + 1;
        self.wrap.setLayerIndex(layer.wrap.layer, olIdx);
    };

    mapProto.putLayerOnTop = function (layer) {
        var self = this;
        var n = self.wrap.getLayerCount();
        self.wrap.setLayerIndex(layer.wrap.layer, n - 1);
    };

    /*
    *  setBaseLayer: Set a layer as base layer, it is added to layers collection it wasn't before
    *  Parameters: TC.Layer or string, callback which accepts layer as parameter
    *  Returns: TC.Layer promise
    */
    mapProto.setBaseLayer = async function (layer, callback) {
        var self = this;
        var result = null;
        var found = false;

        if (typeof layer === 'string') {
            var i;
            for (i = 0; i < self.layers.length; i++) {
                if (self.layers[i].id === layer) {
                    layer = self.layers[i];
                    found = true;
                    break;
                }
            }
            if (!found) {
                layer = getAvailableBaseLayer.call(self, layer);
                if (layer) {
                    layer = await self.addLayer(TC.Util.extend(true, {}, layer, { isDefault: true, isBase: true, map: self }));
                    found = true;
                }
            }
        }
        else {
            if (self.layers.indexOf(layer) < 0) {
                layer.isDefault = true;
                layer.isBase = true;
                layer.map = self;
                self.addLayer(layer);
                // GLS: comento lo siguiente porque ya se va a tratar en la línea 1838, si no, se lanza el evento 2 veces
                //.then(function () {                
                //self.trigger(TC.Consts.event.BASELAYERCHANGE, { layer: layer });
                //if (TC.Util.isFunction(callback)) {
                //    callback();
                //}
                //});

                //result = layer;
                //return result;
            }
            found = true;
        }
        if (!found) {
            TC.error('Base layer is not available');
        }
        else {
            if (!layer.isCompatible(self.getCRS()) && (!layer.fallbackLayer || layer.fallbackLayer && !layer.fallbackLayer.isCompatible(self.getCRS()))) {
                TC.error('Base layer must be reprojected');
            }
            else {
                self.trigger(TC.Consts.event.BEFOREBASELAYERCHANGE, { oldLayer: self.getBaseLayer(), newLayer: layer });

                result = layer;
                await self.wrap.getMap();
                const olLayer = await layer.wrap.getLayer();
                await self.wrap.setBaseLayer(olLayer);
                self.baseLayer = layer;
                self.trigger(TC.Consts.event.BASELAYERCHANGE, { layer: layer });
                if (TC.Util.isFunction(callback)) {
                    callback();
                }
            }
        }
        return result;
    };

    mapProto.setView = function (view) {
        const self = this;

        self.view = view;
        self.trigger(TC.Consts.event.VIEWCHANGE, { view: view });
    };

    /*
     * Asigna un callback que se ejecutará cuando los controles del mapa se hayan cargado.
     * @method ready
     * @async
     * @param {function} [callback] Función a ejecutar.
     */
    mapProto.ready = function (callback) {
        var self = this;
        if (TC.Util.isFunction(callback)) {
            if (self.isReady) {
                callback();
            }
            else {
                self.one(TC.Consts.event.MAPREADY, callback);
            }
        }
    };

    /*
     * Asigna un callback que se ejecutará cuando los controles y las capas iniciales del mapa se hayan cargado.
     * @method loaded
     * @async
     * @param {function} [callback] Función a ejecutar.
     */
    mapProto.loaded = function (callback) {
        const self = this;
        if (TC.Util.isFunction(callback)) {
            if (self.isLoaded) {
                callback();
            }
            else {
                self.one(TC.Consts.event.MAPLOAD, callback);
            }
        }
        return new Promise(resolve => {
            if (self.isLoaded) {
                resolve();
            }
            else {
                self.one(TC.Consts.event.MAPLOAD, resolve);
            }
        });
    };



    /*
     * Devuelve un árbol de capas del mapa.
     * @method getLayerTree
     * @return {TC.LayerTree}
     */
    mapProto.getLayerTree = function () {


        var _traverse = function (o, func) {
            for (var i in o.children) {
                if (o.children && o.children.length > 0) {
                    //bajar un nivel en el árbol
                    _traverse(o.children[i], func);
                }

                func.apply(this, [o]);
            }
        };



        var self = this;
        var result = { baseLayers: [], workLayers: [] };
        if (self.baseLayer) {
            result.baseLayers[0] = self.baseLayer.getTree();
        }
        for (var i = 0; i < self.workLayers.length; i++) {
            var tree = self.workLayers[i].getTree();

            if (tree) {
                result.workLayers.unshift(tree);
            }
        }
        return result;
    };

    /**
     * Añade un control al mapa.
     * @method addControl
     * @async
     * @param {TC.Control|string} control Control a añadir o nombre del control
     * @param {object} [options] Objeto de opciones de configuración del control. Consultar el parámetro de opciones del constructor del control.
     * @return {Promise} Promesa de objeto {{#crossLink "TC.Control"}}{{/crossLink}}
     */
    mapProto.addControl = function (control, options) {
        const self = this;

        return new Promise(function (resolve, reject) {
            const _addCtl = function (ctl) {
                self.controls.push(ctl);
                // Lo envolvemos en Promise.resolve para asegurarse compatibilidad hacia atrás con los controles que devuelven un $.Deferred.
                return Promise.resolve(ctl.register(self))
                    .then(function (c) {
                        if (ctl.div) {
                            if (!ctl.div.parentNode) {
                                self.div.appendChild(ctl.div);
                            }
                        }
                        self.trigger(TC.Consts.event.CONTROLADD, { control: ctl });
                        return c;
                    })
                    .catch(function (err) {
                        reject(err instanceof Error ? err : Error(err));
                    });
            };
            if (typeof control === 'string') {
                const ctorName = control.substr(0, 1).toUpperCase() + control.substr(1);
                const addStringControl = () => _addCtl(new TC.control[ctorName](null, options)).then(resolve);
                if (!TC.Control || !TC.control[ctorName]) {
                    import(/* webpackMode: "eager" */ './control/' + ctorName).then(function (module) {
                        TC.control[ctorName] = module.default;
                        addStringControl();
                    });
                }
                else {
                    addStringControl();
                }
            }
            else {
                _addCtl(control).then(function (ctl) {
                    resolve(ctl);
                });
            }
        });
    };

    /*
     * Devuelve la lista de controles que son de la clase especificada.
     * @method getControlsByClass
     * @param {function|string} classObj Nombre de la clase o función constructora de la clase.
     * @return {array}
     */
    mapProto.getControlsByClass = function (classObj) {
        var self = this;
        var result = [];
        var obj = classObj;
        if (typeof classObj === 'string') {
            obj = window;
            var namespaces = classObj.split('.');
            for (var i = 0; i < namespaces.length; i++) {
                obj = obj[namespaces[i]];
                if (!obj) {
                    break;
                }
            }
        }
        if (TC.Util.isFunction(obj)) {
            self.controls.forEach(ctl => {
                if (ctl instanceof obj) {
                    result.push(ctl);
                }
            });
        }

        return result;
    };

    mapProto.getControlById = function (id) {
        const self = this;
        for (var i = 0, len = self.controls.length; i < len; i++) {
            const ctl = self.controls[i];
            if (ctl.id === id) {
                return ctl;
            }
        }
        return null;
    };

    mapProto.getDefaultControl = function () {
        const self = this;
        var candidate;
        if (self.options.defaultActiveControl) {
            candidate = self.getControlsByClass('TC.control.' + self.options.defaultActiveControl.substr(0, 1).toUpperCase() + self.options.defaultActiveControl.substr(1))[0];
        }
        if (!candidate) {
            candidate = self.getControlsByClass('TC.control.MultiFeatureInfo')[0];
            if (candidate) {
                candidate = candidate.lastCtrlActive;
            }
            else {
                candidate = self.getControlsByClass('TC.control.FeatureInfo')[0];
            }
        }
        return candidate;
    };

    /*
     * Devuelve el primer control del mapa que sea de la clase {{#crossLink "TC.control.LoadingIndicator"}}{{/crossLink}}.
     * @method getLoadingIndicator
     * @return {TC.control.LoadingIndicator}
     */
    mapProto.getLoadingIndicator = function () {
        var result = null;
        var ctls = this.getControlsByClass('TC.control.LoadingIndicator');
        if (ctls.length) {
            result = ctls[0];
        }
        return result;
    };

    mapProto.addResultsPanel = function (options) {
        const self = this;
        const opts = Object.assign({}, options);
        const container = self.getControlsByClass(TC.control.ControlContainer)[0];
        if (container) {
            opts.position = container.POSITION.RIGHT;
            return container.addControl('resultsPanel', opts);
        }
        else {
            return self.addControl('resultsPanel', opts);
        }
    };

    /*
     * Establece la extensión del mapa.
     * @method setExtent
     * @param {array} extent Array de cuatro números que representan las coordenadas x mínima, y mínima, x máxima e y máxima respectivamente.
     * @param {object} [options] Objeto de opciones.
     * @param {boolean} [options.animate=true] Establece si se realiza una animación al cambiar la extensión.
     * La unidad de las coordenadas es la correspondiente al CRS del mapa.
     */
    mapProto.setExtent = function (extent, options, callback) {
        return this.wrap.setExtent(extent, options, callback);
    };

    /**
     * Obtiene la extensión actual del mapa.
     * @method getExtent
     * @return {array} Array de cuatro números que representan las coordenadas x mínima, y mínima, x máxima e y máxima respectivamente.
     * La unidad de las coordenadas es la correspondiente al CRS del mapa.
     */
    mapProto.getExtent = function () {
        return this.wrap.getExtent();
    };

    mapProto.getMaxExtent = function () {
        return this.maxExtent || null;
    };

    /*
     * Establece el centro del mapa.
     * @method setCenter
     * @param {array} coord Array de dos números que representan la coordenada del punto en las unidades correspondientes al CRS del mapa.
     * @param {object} [options] Objeto de opciones.
     * @param {boolean} [options.animate=true] Establece si se realiza una animación al centrar.
     */
    mapProto.setCenter = function (coord, options) {
        return this.wrap.setCenter(coord, options);
    };

    mapProto.getCenter = function () {
        return this.wrap.getCenter();
    };

    mapProto.setRotation = function (rotation) {
        this.wrap.setRotation(rotation);
    };

    mapProto.getRotation = function () {
        return this.wrap.getRotation();
    };

    mapProto.getViewHTML = function () {
        return this.wrap.getViewport();
    };


    mapProto.getCompatibleCRS = function (options) {
        const self = this;
        options = options || {};
        const layers = options.layers || self.workLayers.concat(self.baseLayer);
        const crsLists = layers
            .filter(function (layer) {
                return layer.isRaster();
            }) // capas raster
            .map(function (layer) {
                return layer.getCompatibleCRS({ normalized: true, includeFallback: options.includeFallbacks });
            });
        const otherCrsLists = crsLists.slice(1);
        return crsLists[0].filter(function (elm) {
            return otherCrsLists.every(function (crsList) {
                return crsList.indexOf(elm) >= 0;
            });
        });
    };

    mapProto.loadProjections = function (options) {
        const self = this;
        options = options || {};
        return new Promise(function (resolve, reject) {
            const crsList = options.crsList || [];
            Promise.all(crsList
                .map(function (crs) {
                    return TC.getProjectionData({
                        crs: TC.Util.getCRSCode(crs)
                    });
                })).then(function (responses) {
                    var projList = responses
                        .filter(function (response) {
                            return response.status === 'ok' && response.number_result > 0;
                        })
                        .map(function (response, index, array) {
                            const projData = response.results[0];
                            const code = 'EPSG:' + projData.code;
                            TC.loadProjDef({
                                crs: code,
                                def: projData.def,
                                name: projData.name,
                                silent: index < array.length - 1 // Solo registramos proj4 en la última iteración
                            });
                            return {
                                code: code,
                                name: projData.name,
                                proj4: projData.proj4,
                                unit: projData.unit
                            };
                        });
                    if (options.orderBy) {
                        projList = projList
                            .sort(TC.Util.getSorterByProperty(options.orderBy));
                    }
                    resolve(projList);
                },
                    function (error) {
                        reject(error);
                    });
        });
    };

    mapProto.setProjection = function (options) {
        const self = this;
        options = options || {};
        const oldCrs = self.crs;
        return new Promise(function (resolve, reject) {
            var baseLayer;
            if (options.crs) {
                self.isReprojecting = true;
                if (options.baseLayer) {
                    baseLayer = options.baseLayer;
                }
                else if (options.allowFallbackLayer) {
                    // Cambiamos de capa de fondo si es mejor o no hay más remedio
                    if (!self.baseLayer.isCompatible(options.crs) &&
                        self.baseLayer.wrap.getCompatibleMatrixSets(options.crs).length === 0) {
                        if (self.baseLayer.options.fallbackLayer) {
                            baseLayer = self.baseLayer.getFallbackLayer();
                        }
                    }
                    else if (self.baseLayer.firstOption && (self.baseLayer.firstOption.isCompatible(options.crs) ||
                        self.baseLayer.firstOption.wrap.getCompatibleMatrixSets(options.crs).length > 0)) {
                        baseLayer = self.baseLayer.firstOption;
                    }
                }
                if (!baseLayer) {
                    baseLayer = self.baseLayer;
                }

                const endReproject = () => self.isReprojecting = false;

                const setOptionalExtent = async function () {
                    if (options.extent) {
                        await self.setExtent(options.extent);
                    }
                };

                const resolveChange = async function () {
                    endReproject();
                    self.trigger(TC.Consts.event.PROJECTIONCHANGE, { oldCrs: oldCrs, newCrs: options.crs });
                    await setOptionalExtent();
                    resolve();
                };

                // 03/04/2019 GLS: esperamos a que termine de añadirse la capa porque si no se duplica en la gestión de la carga del CRS.
                const loadProj = function () {
                    TC.loadProjDef({
                        crs: options.crs,
                        callback: function () {
                            const setProjection = function (baseLayer) {

                                const _setProjection = function () {
                                    const layerProjectionOptions = TC.Util.extend({}, options, { oldCrs: self.crs });
                                    const setLayerProjection = function (layer) {
                                        layer.setProjection(layerProjectionOptions);
                                    };
                                    if (baseLayer.isCompatible(options.crs) || baseLayer.wrap.getCompatibleMatrixSets(options.crs).length > 0) {
                                        baseLayer.setProjection(layerProjectionOptions);
                                        self.wrap.setProjection(TC.Util.extend({}, options, { baseLayer: baseLayer }));
                                        self.crs = options.crs;
                                        // En las capas base disponibles, evaluar su compatibilidad con el nuevo CRS
                                        self.baseLayers
                                            .filter(function (layer) {
                                                return layer !== baseLayer;
                                            })
                                            .forEach(setLayerProjection);
                                        // Reprojectamos capas cargadas
                                        self.workLayers.forEach(setLayerProjection);
                                        if (baseLayer && baseLayer !== self.baseLayer) {
                                            self.setBaseLayer(baseLayer, resolveChange);
                                        }
                                        else {
                                            resolveChange();
                                        }
                                    }
                                    else if (baseLayer.fallbackLayer) {
                                        setProjection(baseLayer.fallbackLayer);
                                    } else {
                                        endReproject();
                                        reject(Error('Layer has no fallback'));
                                    }
                                };

                                if (baseLayer.type === TC.Consts.layerType.WMS || baseLayer.type === TC.Consts.layerType.WMTS) {
                                    baseLayer.getCapabilitiesPromise().then(_setProjection).catch(endReproject);
                                } else {
                                    _setProjection();
                                }
                            };

                            setProjection(baseLayer);
                        }
                    });
                };

                if (self.baseLayers.indexOf(baseLayer) < 0) {
                    self.addLayer(baseLayer).then(loadProj).catch(endReproject);
                } else {
                    loadProj();
                }
            }
        });
    };

    mapProto.getMetersPerUnit = function () {
        return this.wrap.getMetersPerUnit();
    };

    /**
     * Obtiene una coordenada a partir de una posición del área de visualización del mapa en píxeles.
     * @method getCoordinateFromPixel
     * @param {array} xy Coordenada en píxeles de la posición en el área de visualización.
     * @return {array} Array de dos números que representa las coordenada del punto en las unidades correspondientes al CRS del mapa.
     */
    mapProto.getCoordinateFromPixel = function (xy) {
        return this.wrap.getCoordinateFromPixel(xy);
    };

    /**
     * Obtiene una posición en el área de visualización a partir de una coordenada.
     * @method getCoordinateFromPixel
     * @param {array} coord Coordenada en el mapa.
     * @return {array} Array de dos números que representa las posición del punto en píxeles.
     */
    mapProto.getPixelFromCoordinate = function (coord) {
        return this.wrap.getPixelFromCoordinate(coord);
    };

    /**
     * Establece la extensión del mapa de forma que abarque todas las entidades geográficas pasadas por parámetro.
     * @method zoomToFeatures
     * @param {array} features Array de entidades geográficas. Si está vacío este método no hace nada.
     * @param {object} [options] Objeto de opciones de zoom.
     * @param {number} [options.pointBoundsRadius=30] Radio en metros del área alrededor del punto que se respetará al hacer zoom.
     * @param {number} [options.extentMargin=0.2] Tamaño del margen que se aplicará a la extensión total de todas las entidades. 
     * @param {boolean} [options.animate=false] Realizar animación al hacer el zoom. 
     * El valor es la relación resultante de la diferencia de dimensiones entre la extensión ampliada y la original relativa a la original.
     */
    mapProto.zoomToFeatures = function (features, options) {
        const self = this;
        if (features.length > 0) {
            let bounds;
            const setExtent = () => {
                bounds = [Infinity, Infinity, -Infinity, -Infinity];
                var opts = options || {};
                opts.contain = true;
                var radius = opts.pointBoundsRadius || self.options.pointBoundsRadius;
                radius = radius / self.getMetersPerUnit();
                var extentMargin = opts.extentMargin;
                if (typeof extentMargin !== 'number') {
                    extentMargin = self.options.extentMargin;
                }
                for (var i = 0; i < features.length; i++) {
                    var b = features[i].getBounds();
                    if (b) {
                        bounds[0] = Math.min(bounds[0], b[0]);
                        bounds[1] = Math.min(bounds[1], b[1]);
                        bounds[2] = Math.max(bounds[2], b[2]);
                        bounds[3] = Math.max(bounds[3], b[3]);
                    }
                }
                if (bounds[2] - bounds[0] === 0) {
                    bounds[0] = bounds[0] - radius;
                    bounds[2] = bounds[2] + radius;
                }
                if (bounds[3] - bounds[1] === 0) {
                    bounds[1] = bounds[1] - radius;
                    bounds[3] = bounds[3] + radius;
                }
                if (extentMargin) {
                    var dx = (bounds[2] - bounds[0]) * extentMargin / 2;
                    var dy = (bounds[3] - bounds[1]) * extentMargin / 2;
                    bounds[0] = bounds[0] - dx;
                    bounds[1] = bounds[1] - dy;
                    bounds[2] = bounds[2] + dx;
                    bounds[3] = bounds[3] + dy;
                }
                if (self.maxExtent) {
                    bounds[0] = Math.max(bounds[0], self.maxExtent[0]);
                    bounds[1] = Math.max(bounds[1], self.maxExtent[1]);
                    bounds[2] = Math.min(bounds[2], self.maxExtent[2]);
                    bounds[3] = Math.min(bounds[3], self.maxExtent[3]);
                }
                self.setExtent(bounds, opts);
            };
            if (self.isReprojecting) {
                self.one(TC.Consts.event.PROJECTIONCHANGE, setExtent);
            }
            else {
                setExtent();
            }

            if (self.on3DView) { // GLS: Necesito diferenciar un zoom programático de un zoom del usuario para la gestión del zoom en 3D
                self._on3DZoomTo({ extent: bounds });
            }
        }
    };

    mapProto._on3DZoomTo = function (options) {
        const self = this;

        options = options || {};

        if (self.on3DView && options.extent && options.extent.length === 4) {
            // GLS: Necesito diferenciar un zoom programático de un zoom del usuario para la gestión del zoom en 3D
            if (options.reprojected) {
                self.trigger(TC.Consts.event.ZOOMTO, options);
            } else {
                let extent = options.extent;
                let coordsXY = self.view3D.view2DCRS !== self.view3D.crs ?
                    TC.Util.reproject(extent.slice(0, 2), self.view3D.view2DCRS, self.view3D.crs) :
                    extent.slice(0, 2);

                let coordsXY2 = self.view3D.view2DCRS !== self.view3D.crs ?
                    TC.Util.reproject(extent.slice(2), self.view3D.view2DCRS, self.view3D.crs) :
                    extent.slice(2);

                options.extent = coordsXY.concat(coordsXY2);

                self.trigger(TC.Consts.event.ZOOMTO, options);
            }
        }
    };

    /*
     * Establece la extensión del mapa de forma que abarque todas los marcadores que existen en él.
     * El método espera a todos los marcadores pendientes de incluir, dado que el método {{#crossLink "TC.Map/addMarker:method"}}{{/crossLink}} es asíncrono.
     * @method zoomToMarkers
     */
    mapProto.zoomToMarkers = function (options) {
        var self = this;
        Promise.all(self._markerPromises).then(function () {
            var markers = [];
            for (var i = 0; i < self.workLayers.length; i++) {
                var layer = self.workLayers[i];
                if (layer.type === TC.Consts.layerType.VECTOR) {
                    for (var j = 0; j < layer.features.length; j++) {
                        var feature = layer.features[j];
                        if (feature instanceof TC.feature.Marker) {
                            markers.push(feature);
                        }
                    }
                }
            }

            self.zoomToFeatures(markers, options);
            self._markerPromises = [];
        });
    };

    mapProto.zoomToLayer = function (layer, options) {
        const self = this;
        layer = self.getLayer(layer);
        if (layer.isRaster()) {
            const extent = layer.getExtent();
            if (extent) {
                options = options || {};
                options.contain = true;
                if (typeof options.extentMargin !== 'number') {
                    options.extentMargin = self.options.extentMargin;
                }
                self.setExtent(extent, options);

                if (self.on3DView) { // GLS: Necesito diferenciar un zoom programático de un zoom del usuario para la gestión del zoom en 3D
                    self._on3DZoomTo({ extent: extent, reprojected: true });
                    /* reprojected: true:
                        Al obtener el extent de la capa desde el capabilities ya se gestiona que el CRS del mapa está en 4326
                        porque map.getCRS ya gestiona si estamos en 3D o no por lo que el extent ya llega en geográficas.
                    */
                }
            }
        }
        else {
            if (layer.features && layer.features.length) {
                self.zoomToFeatures(layer.features, options);
            }
        }
    };

    /*
     * Obtiene una capa por su identificador o devuelve la propia capa.
     * @method getLayer
     * @param {string|TC.Layer} layer Identificador de la capa u objeto de capa.
     * @return {TC.Layer}
     */
    mapProto.getLayer = function (layer) {
        const self = this;
        var result = null;
        if (typeof layer === 'string') {
            for (var i = 0; i < self.layers.length; i++) {
                if (self.layers[i].id === layer) {
                    result = self.layers[i];
                    break;
                }
            }
        }
        else if (TC.Layer && layer instanceof TC.Layer && layer.map === self) {
            result = layer;
        }
        return result;
    };

    var _getVectors = function (map) {
        var result;
        if (!map.vectors) {
            result = map.addLayer({
                id: TC.getUID(), title: TC.i18n[map.options.locale].vectorLayer, type: TC.Consts.layerType.VECTOR
            });
            map.vectors = result;
            result.then(function (vectors) {
                map.vectors = vectors;
            });
        }
        else {
            result = Promise.resolve(map.vectors);
        }
        return result;
    };

    /**
     * Añade un punto al mapa. Si no se especifica una capa en el parámetro de opciones se añadirá a una capa vectorial destinada a añadir entidades geográficas.
     * Esta capa se crea al añadir por primera vez una entidad sin especificar capa.
     * @method addPoint
     * @async
     * @param {array} coord Array de dos números representando la coordenada del punto en las unidades del CRS del mapa.
     * @param {TC.cfg.PointStyleOptions} [options] Opciones del punto.
     */
    mapProto.addPoint = function (coord, options) {
        var self = this;
        if (options && options.layer) {
            var layer = self.getLayer(options.layer);
            if (layer) {
                layer.addPoint(coord, TC.Util.extend(true, {}, options, { layer: layer }));
            }
            else {
                throw new Error('Layer "' + options.layer + '" not found');
            }
        }
        else {
            _getVectors(self).then(function (vectors) {
                vectors.addPoint(coord, options);
            });
        }
    };

    /*
     * Añade un marcador puntual al mapa. Si no se especifica una capa en el parámetro de opciones se añadirá a una capa vectorial destinada a añadir entidades geográficas.
     * Esta capa se crea al añadir por primera vez una entidad sin especificar capa.
     * @method addMarker
     * @async
     * @param {array} coord Array de dos números representando la coordenada del punto en las unidades del CRS del mapa.
     * @param {TC.cfg.MarkerStyleOptions} [options] Opciones del marcador.
     */
    mapProto.addMarker = async function (coord, options, callback) {
        const self = this;
        if (TC.Util.isFunction(options)) {
            callback = options;
            options = {};
        }
        else {
            options = options || {};
        }
        let markerPromise;
        if (options && options.layer) {
            var layer = self.getLayer(options.layer);
            if (layer) {
                markerPromise = layer.addMarker(coord, TC.Util.extend(true, {}, options, { layer: layer }));
            }
            else {
                markerPromise = Promise.reject(new Error('Layer "' + options.layer + '" not found'));
            }
            self._markerPromises.push(markerPromise);
        }
        else {
            // Se añade una promise más para evitar que zoomToMarkers salte antes de poblarse el array _markerPromises.
            markerPromise = new Promise(function (resolve, _reject) {
                _getVectors(self).then(function (vectors) {
                    vectors.addMarker(coord, options).then(function (marker) {
                        resolve(marker);
                    });
                });
            });
            self._markerPromises.push(markerPromise);
        }
        const marker = await markerPromise;
        if (TC.Util.isFunction(callback)) {
            callback(marker);
        }
        return marker;
    };

    /**
     * Añade una polilínea al mapa. Si no se especifica una capa en el parámetro de opciones se añadirá a una capa vectorial destinada a añadir entidades geográficas.
     * Esta capa se crea al añadir por primera vez una entidad sin especificar capa.
     * @method addPolyline
     * @async
     * @param {array} coords Array de arrays de dos números representando las coordenadas de los vértices en las unidades del CRS del mapa.
     * @param {object} [options] Opciones de la polilínea.
     */
    mapProto.addPolyline = function (coords, options) {
        var self = this;
        if (options && options.layer) {
            var layer = self.getLayer(options.layer);
            if (layer) {
                layer.addPolyline(coords, TC.Util.extend(true, {}, options, { layer: layer }));
            }
            else {
                throw new Error('Layer "' + options.layer + '" not found');
            }
        }
        else {
            _getVectors(self).then(function (vectors) {
                vectors.addPolyline(coords, options);
            });
        }
    };

    /**
     * Añade un polígono al mapa. Si no se especifica una capa en el parámetro de opciones se añadirá a una capa vectorial destinada a añadir entidades geográficas.
     * Esta capa se crea al añadir por primera vez una entidad sin especificar capa.
     * @method addPolygon
     * @async
     * @param {array} coords Array que contiene anillos. Estos a su vez son arrays de arrays de dos números representando las coordenadas de los vértices en las unidades del CRS del mapa.
     * El primer anillo es el exterior y el resto son islas. No es necesario cerrar los anillos (poner el mismo vértice al principio y al final).
     * @param {object} [options] Opciones del polígono.
     */
    mapProto.addPolygon = function (coords, options) {
        var self = this;
        if (options && options.layer) {
            var layer = self.getLayer(options.layer);
            if (layer) {
                layer.addPolygon(coords, TC.Util.extend(true, {}, options, { layer: layer }));
            }
            else {
                throw new Error('Layer "' + options.layer + '" not found');
            }
        }
        else {
            _getVectors(self).then(function (vectors) {
                vectors.addPolygon(coords, options);
            });
        }
    };

    mapProto.removeFeatures = function (features) {
        const self = this;
        self
            .workLayers
            .filter(wl => TC.layer.Vector && wl instanceof TC.layer.Vector)
            .map(function (layer) {
                return {
                    layer: layer,
                    features: layer.features.filter(f => features.includes(f))
                };
            })
            .forEach(fg => fg.features.forEach(f => fg.layer.removeFeature(f)));
    };


    mapProto.getBaseLayer = function () {
        return this.baseLayer || this.baseLayers[0];
    };

    mapProto.getResolutions = function () {
        return this.wrap.getResolutions();
    };

    mapProto.getResolution = function () {
        return this.wrap.getResolution();
    };

    mapProto.setResolution = function (resolution) {
        return this.wrap.setResolution(resolution);
    };

    mapProto.exportFeatures = async function (features, options) {
        var self = this;
        options = options || {};
        var loadingCtl = self.getLoadingIndicator();
        var waitId = loadingCtl && loadingCtl.addWait();
        // Eliminamos las elevaciones nulas
        // En GPX hay un bug con los valores cero, que hace que se tome el valor de elevación del punto previo, por eso ponemos NaN.
        const elevSubst = options.format === TC.Consts.format.GPX ? Number.NaN : 0;
        features.forEach(function (feature, idx) {
            // Decodificamos entidades HTML de la feature
            const data = feature.getData();
            for (let key in data) {
                if (/&(\w+|#\d{2,4});/g.test(key)) {
                    const value = data[key];
                    const newData = {};
                    const elm = document.createElement('div');
                    elm.innerHTML = key;
                    newData[elm.innerText] = value;
                    feature.unsetData(key);
                    feature.setData(newData);
                }
            }
            // Formateamos el valor de elevación
            var flatCoords = feature.getCoords({ pointArray: true });
            if (flatCoords.some(function (point) {
                return point[2] === null;
            })) {
                const newFeature = feature.clone();
                newFeature.setId(feature.id);
                features[idx] = feature = newFeature;
                flatCoords = feature.getCoords({ pointArray: true });
                flatCoords.forEach(function (point) {
                    if (point[2] === null) {
                        point[2] = elevSubst;
                    }
                });
            }
        });
        const format = options.format || "";
        if (format === TC.Consts.format.SHAPEFILE) {
            const defaultEncoding = "ISO-8859-1";
            //generar shape

            //agrupar por capa
            const layers = features.reduce(function (rv, feature) {
                var id = feature.id.substr(0, feature.id.lastIndexOf("."));
                //var id = feature.layer? (typeof(feature.layer)==="string"?feature.layer:feature.layer.id) :feature.id.substr(0, feature.id.lastIndexOf("."));
                (rv[id] = rv[id] || []).push(feature);
                return rv;
            }, {});

            const getInnerType = function (type) {

                switch (true) {
                    case type === 'TC.feature.Point':
                        return 'POINT';
                    case type === 'TC.feature.Polygon':
                    case type === 'TC.feature.MultiPolygon':
                        return 'POLYGON';
                    case type === 'TC.feature.Polyline':
                    case type === 'TC.feature.MultiPolyline':
                        return 'POLYLINE';
                }
                return 'NULL';
            };
            const proj = await TC.getProjectionData({ crs: self.crs });

            const arrPromises = [];
            const shpWrite = (await import('@aleffabricio/shp-write/index')).default;
            let layerId;
            for (layerId in layers) {
                //agrupar las features por tipos
                let groups = layers[layerId].reduce(function (rv, x) {
                    (rv[x.CLASSNAME] = rv[x.CLASSNAME] || []).push(x);
                    return rv;
                }, {});
                let group;
                for (group in groups) {
                    arrPromises.push(new Promise(function (resolve) {
                        const _group = group;
                        const _features = groups[_group];
                        const data = _features.reduce(function (prev, curr) {
                            const data = {};
                            for (var key in curr.data) {
                                const val = curr.data[key];
                                data[key] = typeof val === 'string' ?
                                    val.replace(/•/g, "&bull;").replace(/›/g, "&rsaquo;") :
                                    val;
                            }
                            if (curr.getStyle().label && !curr.data.name)
                                data.name = curr.getStyle().label;
                            return prev.concat([data]);
                        }, []);
                        const geometries = _features.reduce(function (prev, curr) {
                            //No se porque no le gusta las geometrias polyline de la herramienta draw por tanto las convierto a multipolyline
                            if (curr instanceof TC.feature.Polyline) {
                                curr = new TC.feature.MultiPolyline(curr.getCoords(), curr.options);
                            }
                            //si el sistema de referencia es distinto a EPSG:4326 reproyecto las geometrias							
                            return prev.concat([curr.geometry]);
                        }, []);
                        //generamos el un shape mas sus allegados por grupo
                        shpWrite.write(data
                            , getInnerType(_group)
                            , geometries
                            , function (_empty, content) {
                                const fileName = layerId + (Object.keys(groups).length > 1 ? "_" + getInnerType(_group) : "");
                                resolve({ "fileName": fileName, "content": content });
                            });
                    }));
                }
            }

            const resolves = [];
            for (var i = 0; i < arrPromises.length; i++) {
                resolves[i] = await arrPromises[i];
            }

            //creamos el fichero zip
            const JSZip = (await import("jszip/dist/jszip")).default;
            const zip = new JSZip();
            resolves.forEach(resolve => {
                zip.file(resolve.fileName + ".shp", resolve.content.shp.buffer);
                zip.file(resolve.fileName + ".shx", resolve.content.shx.buffer);
                zip.file(resolve.fileName + ".dbf", resolve.content.dbf.buffer);
                zip.file(resolve.fileName + ".prj", proj.results[0].wkt);
                zip.file(resolve.fileName + ".cst", defaultEncoding);
                zip.file(resolve.fileName + ".cpg", defaultEncoding);
            });
            try {
                const blob = await zip.generateAsync({ type: "blob" });
                loadingCtl && loadingCtl.removeWait(waitId);
                return blob;
            }
            catch (err) {
                loadingCtl && loadingCtl.removeWait(waitId);
                throw err;
            }
        }
        if (format === TC.Consts.format.GEOPACKAGE) {
            const fieldDataType = function (geopackage, value) {
                var name = '';
                switch (typeof value) {
                    case "string":
                        name = geopackage.DataTypes.TEXT;
                        break;
                    case "number":
                        if (value % 1 === 0)
                            name = geopackage.DataTypes.INT;
                        else
                            name = geopackage.DataTypes.FLOAT;
                        break;
                    case "boolean":
                        name = geopackage.DataTypes.BOOLEAN;
                        break;
                    default:
                        name = geopackage.DataTypes.TEXT;
                    //date y datetime
                }
                return name;
            };
            const currentCrs = self.crs;
            const geopackage = await import("../lib/geopackagejs/dist/geopackage-browser");
            await import("wkx/dist/wkx");
            const wkx = require('wkx');
            //Promise.all([import("../lib/geopackagejs/dist/geopackage-browser"), import("wkx/dist/wkx")]).then(async function (responses) {                                    
            const geopackageAPI = geopackage.GeoPackageAPI;
            const FeatureColumn = geopackage.FeatureColumn;
            const GeometryColumns = geopackage.GeometryColumns;
            const myPackage = await geopackageAPI.create();

            var srs_id = currentCrs.substr(currentCrs.indexOf(":") + 1);
            if (!myPackage.spatialReferenceSystemDao.queryForId(srs_id)) {
                var newSRS = myPackage.spatialReferenceSystemDao.createObject();
                var projData = await TC.getProjectionData({ crs: currentCrs });
                newSRS.srs_name = currentCrs;
                newSRS.srs_id = projData.results[0].code;
                newSRS.organization = currentCrs.substr(0, currentCrs.indexOf(":"));
                newSRS.organization_coordsys_id = projData.results[0].code;
                newSRS.definition = projData.results[0].proj4.trim();
                newSRS.definition_12_063 = projData.results[0].wkt.trim();
                newSRS.description = projData.results[0].name;
                myPackage.spatialReferenceSystemDao.create(newSRS);
            }
            //agrupar por capa
            //const timestamp = options.fileName.substring(options.fileName.lastIndexOf("_", options.fileName.lastIndexOf("_") - 1) + 1); 
            const layers = features.reduce(function (rv, feature) {
                var id = typeof feature.id === "string" ? feature.id.substr(0, feature.id.lastIndexOf(".")) : options.fileName;
                //var id = feature.layer ? (typeof (feature.layer) === "string" ? feature.layer : feature.layer.id) : feature.id.substr(0, feature.id.lastIndexOf("."));
                (rv[id] = rv[id] || []).push(feature);
                return rv;
            }, {});
            let layerId;
            for (layerId in layers) {
                //agrupar las features por tipos
                let groups = layers[layerId].reduce(function (rv, x) {
                    (rv[x.CLASSNAME] = rv[x.CLASSNAME] || []).push(x);
                    return rv;
                }, {});
                let group;
                for (group in groups) {
                    const _features = groups[group];
                    //crear columnas

                    let i = 0;

                    const geometryType = _features[0].CLASSNAME.substr(_features[0].CLASSNAME.lastIndexOf(".") + 1).replace("Polyline", "LineString").replace("Marker", "Point");
                    const tableName = layerId + (Object.keys(groups).length > 1 ? "_" + geometryType : "");// + (timestamp ? "_" + timestamp : "");
                    var columns = [];
                    //var dataColumns = [];
                    var pkColumnName = "id";

                    if (Object.prototype.hasOwnProperty.call(features[0], "id") ||
                        Object.prototype.hasOwnProperty.call(features[0], "ID")) {
                        columns.push(FeatureColumn.createPrimaryKeyColumnWithIndexAndName(i++, pkColumnName));
                    }
                    columns.push(FeatureColumn.createGeometryColumn(i++, 'geometry', geometryType.toUpperCase(), true, null));

                    var bounds = [Infinity, Infinity, -Infinity, -Infinity];
                    for (var j = 0; j < _features.length; j++) {
                        var b = _features[j].getBounds();
                        if (b) {
                            bounds[0] = Math.min(bounds[0], b[0]);
                            bounds[1] = Math.min(bounds[1], b[1]);
                            bounds[2] = Math.max(bounds[2], b[2]);
                            bounds[3] = Math.max(bounds[3], b[3]);
                        }
                    }

                    for (var x in _features[0].data || _features[0].attributes) {
                        var fieldName = _features[0].attributes && _features[0].attributes[x] ? _features[0].attributes[x].name : x;
                        if (fieldName.toLowerCase() === 'id') continue;
                        var fieldValue = _features[0].data[fieldName];
                        const c = FeatureColumn.createColumn(i++, fieldName, fieldDataType(geopackage, fieldValue));
                        columns.push(c);
                        //dataColumns.push(c);
                    }
                    //si alguna feature tiene simbología de tipo texto se añade como una columna más a la tabla llamada "name"
                    if (_features.some(f => f.getStyle().label && !f.data.name)) {
                        const c = FeatureColumn.createColumn(i++, "name", geopackage.DataTypes.TEXT);
                        columns.push(c);
                    }


                    var geometryColumns = new GeometryColumns();
                    geometryColumns.table_name = tableName;
                    geometryColumns.column_name = 'geometry';
                    geometryColumns.geometry_type_name = geometryType.toUpperCase();
                    geometryColumns.z = _features[0].getGeometryStride();
                    geometryColumns.m = 2;
                    geometryColumns.srs_id = srs_id;
                    i = 0;
                    const boundingBox = new geopackage.BoundingBox(bounds[0], bounds[2], bounds[1], bounds[3]);
                    await myPackage.createFeatureTable(tableName, geometryColumns, columns, boundingBox, srs_id)
                    //geopackage.createFeatureTableWithDataColumnsAndBoundingBox(myPackage, tableName, geometryColumns, columns, null, boundingBox, srs_id)
                    const featureDao = myPackage.getFeatureDao(tableName);
                    for (let i = 0; i < _features.length; i++) {
                        const feature = _features[i];
                        const featureRow = featureDao.newRow();
                        const geometryData = new geopackage.GeometryData();
                        geometryData.setSrsId(srs_id);
                        const geometry = wkx.Geometry.parse('SRID=' + srs_id + ';' + new ol.format.WKT().writeFeature(feature.wrap.feature));
                        //const geometry=(hexString => new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16))))(new ol.format.WKB().writeGeometry(feature.wrap.feature.getGeometry(),{featureProjection:currentCrs,dataProjection:currentCrs}));
                        geometryData.setGeometry(geometry);
                        featureRow.setValueWithColumnName(featureRow.geometryColumn.name, geometryData);
                        if (Object.prototype.hasOwnProperty.call(_features[i], "id") ||
                            Object.prototype.hasOwnProperty.call(_features[i], "ID"))
                            featureRow.setValueWithColumnName(pkColumnName, typeof feature.id === "string" ? feature.id.substring(feature.id.lastIndexOf(".") + 1) : feature.id);
                        else if (Object.prototype.hasOwnProperty.call(_features[i].data, "id") ||
                            Object.prototype.hasOwnProperty.call(_features[i].data, "ID"))
                            featureRow.setValueWithColumnName(pkColumnName, typeof feature.id === "string" ? feature.id.substring(feature.id.lastIndexOf(".") + 1) : feature.id);
                        for (var y in feature.data || feature.attributes) {
                            const fieldName = _features[0].attributes && _features[0].attributes[y] ? _features[0].attributes[x].name : y;
                            if (fieldName.toLowerCase() === 'id') {
                                continue;
                            }
                            const fieldValue = feature.data[fieldName];
                            featureRow.setValueWithColumnName(fieldName, fieldValue);
                        }
                        if (featureDao.columns.indexOf("name") >= 0 && !feature.data.name) {
                            featureRow.setValueWithColumnName("name", feature.getStyle().label);
                        }

                        featureDao.create(featureRow);
                    }
                }
            }

            let data;

            try {
                data = await myPackage.export();
                loadingCtl && loadingCtl.removeWait(waitId);
                return data;
            }
            catch (error) {
                console.log(error);
                loadingCtl && loadingCtl.removeWait(waitId);
            }
            return;
        }
        const data = self.wrap.exportFeatures(features, options);
        const mimeType = TC.Consts.mimeType[options.format];
        if (format === TC.Consts.format.KMZ) {
            const JSZip = (await import("jszip/dist/jszip")).default;
            const zip = new JSZip();
            zip.file((options.fileName || 'doc') + ".kml", data);
            const blob = await zip.generateAsync({ type: "blob", mimeType: mimeType, compression: "DEFLATE" });
            loadingCtl && loadingCtl.removeWait(waitId);
            return blob;
        }
        else {
            loadingCtl && loadingCtl.removeWait(waitId);
            return data;
        }
    };

    mapProto.exportControlStates = function () {
        const self = this;

        return self.controls
            .map(function (ctl) {
                return ctl.exportState();
            })
            .filter(function (state) {
                // Quitamos los estados nulos o vacíos
                if (state) {
                    for (var key in state) {
                        if (Object.prototype.hasOwnProperty.call(state, key)) {
                            return true;
                        }
                    }
                }
                return false;
            });
    };

    mapProto.importControlStates = function (controlStates) {
        const self = this;

        controlStates.forEach(function (state) {
            const ctl = self.getControlById(state.id);
            if (ctl) {
                self.loaded(function () {
                    ctl.importState(state);
                });
            }
        });
    };

    var toasts = {};
    var toastHide = function () {
        const toast = this;
        var container = toast;
        do {
            container = container.parentElement;
        }
        while (container && !container.matches('.' + TC.Consts.classes.TOAST_CONTAINER));
        const text = toast.innerHTML;
        toast.classList.add(TC.Consts.classes.HIDDEN);
        if (toasts[text] !== undefined) {
            toasts[text] = undefined;
        }
        setTimeout(function () {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
            if (container && !container.querySelector('.' + TC.Consts.classes.TOAST) && container.parentElement) {
                container.parentElement.removeChild(container);
            }
        }, 1000);
    };

    mapProto.toastHide = function (text) {
        var toastInfo = toasts[text];
        if (toastInfo) {
            clearTimeout(toastInfo.timeout);
            if (toastInfo.toast && toastInfo.toast.parentElement) {
                toastInfo.toast.parentElement.removeChild(toastInfo.toast);
            }
            toastInfo.toast = null;
        }
    };

    mapProto.toast = function (text, options) {
        const self = this;
        var opts = options || {
        };
        var duration = opts.duration || TC.Cfg.toastDuration;
        var toastInfo = toasts[text];
        if (toastInfo) {
            clearTimeout(toastInfo.timeout);
            if (toastInfo.toast && toastInfo.toast.parentElement) {
                toastInfo.toast.parentElement.removeChild(toastInfo.toast);
            }
            toastInfo.toast = null;
        }
        var container = self.div.querySelector('.' + TC.Consts.classes.TOAST_CONTAINER);
        if (!container) {
            container = document.createElement('div');
            container.classList.add(TC.Consts.classes.TOAST_CONTAINER);
            (opts.container ? opts.container : self.div).appendChild(container);
        }
        const toast = document.createElement('div');
        const span = document.createElement('span');
        toast.classList.add(TC.Consts.classes.TOAST);
        toast.appendChild(span);
        const p = document.createElement('p');
        p.innerHTML = text;
        toast.appendChild(p);
        toast.addEventListener(TC.Consts.event.CLICK, toastHide, { passive: true });
        container.appendChild(toast);
        toastInfo = toasts[text] = {
            toast: toast
        };

        var className = '';
        switch (opts.type) {
            case TC.Consts.msgType.INFO:
                className = TC.Consts.classes.INFO;
                break;
            case TC.Consts.msgType.WARNING:
                className = TC.Consts.classes.WARNING;
                break;
            case TC.Consts.msgType.ERROR:
                className = TC.Consts.classes.ERROR;
                break;
        }
        if (className.length) {
            toastInfo.toast.classList.add(className);
        }

        toastInfo.timeout = setTimeout(function () {
            toastHide.call(toastInfo.toast);
        }, duration);
    };

    // iPad iOS7 bug fix
    var mapHeightNeedsFix = false;
    var setHeightFix = function (div) {
        if (/iPad/i.test(navigator.userAgent)) {
            var ih = window.innerHeight;
            var mh = div.getBoundingClientRect.height;
            var dh = matchMedia('only screen and (orientation : landscape)').matches ? 20 : 0;
            if (mh === ih + dh) {
                mapHeightNeedsFix = true;
            }
        }
        var fix = function () {
            div.classList.toggle(TC.Consts.classes.IPAD_IOS7_FIX, matchMedia('only screen and (orientation : landscape)').matches);
        };
        if (mapHeightNeedsFix) {
            fix();
            window.addEventListener('resize', fix);
        }
        else {
            window.removeEventListener('resize', fix);
        }
    };

    var isRaster = function (layer) {
        return typeof layer === 'string' ||
            layer.type !== TC.Consts.layerType.VECTOR && layer.type !== TC.Consts.layerType.KML && layer.type !== TC.Consts.layerType.WFS;
    };

    mapProto.exportImage = function () {
        var self = this;
        var result = null;
        var errorMsg = 'El mapa actual no es compatible con la exportación de imágenes';
        var canvas = self.wrap.getViewport({ synchronous: true }).getElementsByTagName('canvas')[0];
        if (canvas && self.crossOrigin) {
            try {
                result = canvas.toDataURL();
            }
            catch (e) {
                TC.error(errorMsg + ': ' + e.message);
            }
        }
        else {
            TC.error(errorMsg);
        }
        return result;
    };

    mapProto.loadFiles = function (files, options) {
        const self = this;
        self.wrap.loadFiles(files, options);
    };

    mapProto.getElevationTool = function () {
        const self = this;
        if (!self.elevation && !self.options.elevation) {
            return Promise.resolve(null);
        }
        if (self.elevation) {
            return Promise.resolve(self.elevation);
        }
        return new Promise(function (resolve, _reject) {
            TC.loadJS(
                !TC.tool || !TC.tool.Elevation,
                TC.apiLocation + 'TC/tool/Elevation',
                function () {
                    if (!self.options.elevation) {
                        self.elevation = null;
                    }
                    else {
                        const elevationOptions = typeof self.options.elevation === 'boolean' ? {} : self.options.elevation;
                        if (elevationOptions.services && self.options.googleMapsKey) {
                            elevationOptions.services = elevationOptions.services.map(function (service) {
                                const isString = typeof service === 'string';
                                const serviceName = isString ? service : service.name;
                                if (serviceName === 'elevationServiceGoogle') {
                                    return TC.Util.extend({
                                        name: serviceName,
                                        googleMapsKey: self.options.googleMapsKey
                                    }, isString ? {} : service);
                                }
                                return service;
                            });
                        }
                        self.elevation = new TC.tool.Elevation(elevationOptions);
                    }
                    resolve(self.elevation);
                }
            );
        });
    };


    const _checkMaxFeatures = function (numMaxfeatures, urlData, data) {
        return new Promise(function (resolve) {
            urlData.mapLayer.toolProxification.fetchXML(urlData.url, {
                data: data,
                contentType: 'application/xml',
                type: 'POST'
            }).then(function (response) {
                if (response instanceof XMLDocument) {
                    const exception = response.querySelector("ExceptionReport Exception");
                    if (exception) {
                        resolve({
                            errors: [{
                                key: TC.Consts.WFSErrors.INDETERMINATE,
                                params: {
                                    err: exception.getAttribute("exceptionCode"), errorThrown: exception.querySelector("ExceptionText").textContent
                                }
                            }]
                        });
                        return;
                    }
                }
                var featFounds = parseInt(response.querySelector("FeatureCollection").getAttribute("numberMatched") || response.querySelector("FeatureCollection").getAttribute("numberOfFeatures"), 10);
                if (isNaN(featFounds) || featFounds > parseInt(numMaxfeatures, 10)) {
                    resolve({
                        errors: [{
                            key: TC.Consts.WFSErrors.MAX_NUM_FEATURES
                        }]
                    });
                    return;
                }
                else if (featFounds === 0) {
                    resolve({
                        errors: [{
                            key: TC.Consts.WFSErrors.NO_FEATURES
                        }]
                    });
                    return;
                }
                else
                    resolve(featFounds);

            }).catch(function (e) {
                //return Promise.reject(error);

                resolve({
                    errors: [{
                        key: TC.Consts.WFSErrors.INDETERMINATE,
                        params: { err: e.name, errorThrown: e.message }
                    }]
                });
                return;
            });

            //TC.ajax({
            //    url: url,
            //    data: data,
            //    contentType: 'application/xml',
            //    responseType: 'application/xml',
            //    method: 'POST'
            //}).then(function (response) {
            //    const responseData = response.data;
            //    if (responseData instanceof XMLDocument) {
            //        const exception = responseData.querySelector("ExceptionReport Exception")
            //        if (exception) {
            //            resolve({
            //                errors: [{
            //                    key: TC.Consts.WFSErrors.INDETERMINATE,
            //                    params: {
            //                        err: exception.getAttribute("exceptionCode"), errorThrown: exception.querySelector("ExceptionText").textContent
            //                    }
            //                }]
            //            })
            //            return;
            //        }
            //    }
            //    var featFounds = parseInt(responseData.querySelector("FeatureCollection").getAttribute("numberMatched") || responseData.querySelector("FeatureCollection").getAttribute("numberOfFeatures"), 10);                
            //    if (isNaN(featFounds) || featFounds > parseInt(numMaxfeatures, 10)) {
            //        resolve({
            //            errors: [{
            //                key: TC.Consts.WFSErrors.MAX_NUM_FEATURES
            //            }]
            //        });
            //        return;
            //    }
            //    else if (featFounds === 0) {
            //        resolve({
            //            errors: [{
            //                key: TC.Consts.WFSErrors.NO_FEATURES
            //            }]
            //        });
            //        return;
            //    }
            //    else
            //        resolve(featFounds);

            //}, function (e) {
            //    resolve({
            //        errors: [{
            //            key: TC.Consts.WFSErrors.INDETERMINATE,
            //            params: { err: e.name, errorThrown: e.message }
            //        }]
            //    });
            //    return;
            //});
        });
    };

    const _makePostCall = function (objLayer, data) {
        return new Promise(function (resolve) {
            objLayer.mapLayer.toolProxification.fetch(objLayer.url, {
                data: data,
                contentType: 'application/xml',
                type: 'POST'
            }).then(function (response) {
                if (response instanceof XMLDocument) {
                    const exception = response.querySelector("ExceptionReport Exception");
                    if (exception) {
                        resolve({
                            errors: [{
                                key: TC.Consts.WFSErrors.INDETERMINATE,
                                params: {
                                    err: exception.getAttribute("exceptionCode"), errorThrown: exception.querySelector("ExceptionText").textContent
                                }
                            }]
                        });
                        return;
                    }
                }
                resolve({ response: response });
            }).catch(function (e) {
                resolve({
                    errors: [{
                        key: TC.Consts.WFSErrors.INDETERMINATE,
                        params: { err: e.name, errorThrown: e.message }
                    }]
                });
                return;
            });
        });
    };

    const magicFunction = function (layer, availableLayers, filter) {
        //obtenemos el describe featuretype de cada capa
        return new Promise(async function (resolve, reject) {
            let response;
            try {
                response = await layer.describeFeatureType(availableLayers);
            }
            catch (error) {
                reject(error);
                return;
            }
            var returnObject = {};
            if (availableLayers.length === 1) {
                var obj = {};
                obj[availableLayers[0]] = response;
                response = obj;
            }
            //buscamos las geometrías por cada respuesta
            for (var layerName in response) {
                let _filter;
                var geometryFields = [];
                for (var k in response[layerName]) {
                    if (TC.Util.isGeometry(response[layerName][k].type) && !response[layerName][k].nillable && !response[layerName][k].minOccurs) {
                        //if (/^gml:\w+PropertyType$/.test(response[layerName][k].type) && !response[layerName][k].nillable && !response[layerName][k].minOccurs) {
                        geometryFields.push(k);
                    }
                }
                //Si solo hay un campo de tipo geometría bsucamos recursivamente entre en los filtros logicos And y or a la caza de filtros espaciales
                //para poner el nombre de la geometría
                if (geometryFields.length <= 1) {
                    const recursive = (filter, geomName) => {
                        if (filter instanceof TC.filter.LogicalNary) {
                            filter.conditions.forEach((condition) => recursive(condition, geomName));
                        }
                        else if (filter instanceof TC.filter.Spatial) {
                            filter.geometryName = geomName;
                            return filter;
                        }
                    };
                    _filter = Object.assign(new filter.constructor(), recursive(filter, geometryFields.length === 0 ? null : geometryFields[0]));
                }
                //Si has mas de un campo de tipo geometría bsucamos recursivamente entre en los filtros logicos And y or a la caza de filtros espaciales
                //para duplicar el filtro con los nombres de las geometrias y los emvolvemos en un filtro OR
                else if (geometryFields.length > 1) {
                    const recursive = (filter, geomNames) => {
                        if (filter instanceof TC.filter.LogicalNary) {
                            filter.conditions.forEach((condition) => recursive(condition, geomNames));
                        }
                        else if (filter instanceof TC.filter.Spatial) {
                            return TC.filter.or.apply(null, geomNames.reduce((acc, curr) => {
                                acc.push(new TC.filter[filter.getTagName()](curr, filter.geometry, filter.srsName));
                                return acc;
                            }, []));
                        }
                    };
                    _filter = Object.assign(new filter.constructor(), recursive(filter, geometryFields));
                }
                //ahora construimos el objeto que de vuelta
                returnObject[layerName] = _filter;
            }
            resolve(returnObject);

        });
    };

    mapProto.extractFeatures = function (options) {
        const self = this;
        const arrPromises = [];
        options = options || {};
        const filter = options.filter;
        const outputFormat = options.outputFormat;
        const download = options.download;
        const layersToExtract = options.layers || self.layers;

        const services = {};

        const _getServiceTitle = function (service) {
            const mapLayer = service.mapLayers[0];
            return service.title || service.mapLayers.reduce(function (prev, cur) {
                return prev || cur.title;
            }, '') || mapLayer.tree && mapLayer.tree.title || mapLayer.capabilities.Service.Title;
        };


        const getCRS = function () {
            if (download && (outputFormat === TC.Consts.mimeType.JSON || outputFormat === TC.Consts.mimeType.KML))
                return TC.Consts.SRSDOWNLOAD_GEOJSON_KML;
            return self.getCRS();
        };
        const _postOrDownload = function (objlayer, data) {
            return new Promise(function (resolve) {
                if (!download) {
                    _makePostCall(objlayer, data).then(function (response) {
                        if (response.errors && response.errors.length > 0) {
                            response.errors[0].params.serviceTitle = objlayer.service.mapLayers.reduce(function (prev, cur) {
                                return prev || cur.title;
                            }, '') || _getServiceTitle(objlayer.service);
                            resolve(response);
                        }
                        else {
                            resolve(response);
                        }
                    });
                }
                else {
                    objlayer.mapLayer.toolProxification.cacheHost.getAction(objlayer.url).then(function (cacheAction) {
                        resolve({
                            url: cacheAction.action(objlayer.url),
                            data: data
                        });
                    });
                }
            });
        };
        layersToExtract.forEach(function (layer) {
            if (!layer.getVisibility() || self.workLayers.indexOf(layer) < 0 || layer.type !== TC.Consts.layerType.WMS) {
                return;
            }
            var availableLayers = layer.getDisgregatedLayerNames() || layer.availableNames;
            const url = layer.url.toLowerCase();
            var serviceObj = services[url];
            if (!serviceObj) {
                serviceObj = services[url] = {
                    url: url,
                    layers: [],
                    mapLayers: [layer],
                    layerNames: []
                };
            }
            for (var i = 0; i < availableLayers.length; i++) {
                var name = availableLayers[i];
                //URI:se quita la exclusion de capas no visibles por escala
                /*if (!layer.isVisibleByScale(name) && !download)
                    continue;*/
                if (!layer.wrap.getInfo(name).queryable)
                    continue;
                serviceObj.layerNames.push(name);
                var path = layer.getPath(name);
                serviceObj.layers.push({
                    name: name,
                    title: path[path.length - 1],
                    path: path.slice(1),
                    features: []
                });
            }
            if (serviceObj.layerNames.length === 0) {
                return;
            }
            if (typeof serviceObj.request !== "undefined") {
                return;
            }
            serviceObj.request = serviceObj.request || layer.getWFSCapabilities(); //WFSCapabilities.Promises(url);
            arrPromises.push(new Promise(function (resolve, _reject) {
                serviceObj.request.then(function (capabilities) {
                    var service = null;
                    var errors = [];
                    for (var url in services) {
                        if (services[url].request && services[url].request === serviceObj.request) {
                            service = services[url];
                        }
                    }
                    var _numMaxFeatures = null;
                    var layerList = service.layerNames;
                    if (!(layerList instanceof Array) || !layerList.length) return;//condici\u00f3n de salida
                    //comprobamos que tiene el getfeature habilitado
                    if (typeof capabilities.Operations.GetFeature === "undefined") {
                        errors.push({ key: TC.Consts.WFSErrors.GETFEATURE_NOT_AVAILABLE, params: { serviceTitle: _getServiceTitle(service) } });
                        resolve({ "errors": errors });
                        return;
                    }
                    var availableLayers = [];
                    for (var i = 0; i < layerList.length; i++) {
                        //Comprbamos si la capa en el WMS tiene el mimso nombre que en el WFS
                        var layer = layerList[i];
                        //quitamos los ultimos caracteres que sean "_" , cosas de Idena
                        while (layer[layer.length - 1] === "_") {
                            layer = layer.substring(0, layer.lastIndexOf("_"));
                        }
                        if (!Object.prototype.hasOwnProperty.call(capabilities.FeatureTypes, layer.substring(layerList[i].indexOf(":") + 1))) {
                            var titles = service.mapLayers[0].getPath(layer.substring(layerList[i].indexOf(":") + 1));
                            errors.push({ key: TC.Consts.WFSErrors.LAYERS_NOT_AVAILABLE, params: { serviceTitle: _getServiceTitle(service), "layerName": titles[titles.length - 1] } });
                            continue;
                        }
                        if (availableLayers.indexOf(layer) < 0)
                            availableLayers.push(layer);
                    }
                    if (availableLayers.length === 0) {
                        errors.push({ key: TC.Consts.WFSErrors.NO_VALID_LAYERS, params: { serviceTitle: _getServiceTitle(service) } });
                        resolve({ "errors": errors });
                        return;
                    }
                    if (capabilities.Operations.GetFeature.CountDefault)
                        _numMaxFeatures = capabilities.Operations.GetFeature.CountDefault.DefaultValue;
                    //comprobamos si soporta querys    
                    if (
                        capabilities.version === "1.0.0" && !Object.prototype.hasOwnProperty.call(capabilities.Operations.GetFeature.Operations, "Query")
                        ||
                        (capabilities.version === "2.0.0" || capabilities.version === "1.1.0") && capabilities.Operations.QueryExpressions.indexOf("wfs:Query") < 0
                    ) {
                        errors.push({ key: TC.Consts.WFSErrors.QUERY_NOT_AVAILABLE, params: { serviceTitle: _getServiceTitle(service) } });
                        resolve({ "errors": errors });
                        return;
                    }
                    const operationUrl = capabilities.Operations.GetFeature.DCPType ? capabilities.Operations.GetFeature.DCPType[1].HTTP.Post.onlineResource : capabilities.Operations.GetFeature.DCP.HTTP.Post.href;

                    Promise.all([
                        magicFunction(service.mapLayers[0], availableLayers, filter)//clonar filtro
                    ]).then(function (response) {
                        var filter = response[0]; //1
                        if (_numMaxFeatures) {
                            _checkMaxFeatures(_numMaxFeatures, { url: operationUrl, mapLayer: service.mapLayers[0] }, TC.Util.WFSQueryBuilder(filter, null, capabilities, outputFormat, true, getCRS())).then(function (response) {
                                if (response.errors && response.errors.length > 0) {
                                    switch (response.errors[0].key) {
                                        case TC.Consts.WFSErrors.INDETERMINATE:
                                            response.errors[0].params.serviceTitle = service.mapLayers.reduce((prev, cur) => prev || cur.title, '') || _getServiceTitle(service);
                                            break;
                                        case TC.Consts.WFSErrors.MAX_NUM_FEATURES:
                                            response.errors[0].params = { limit: _numMaxFeatures, serviceTitle: _getServiceTitle(service) };
                                            break;
                                        case TC.Consts.WFSErrors.NO_FEATURES:
                                            response.errors[0].params = { serviceTitle: _getServiceTitle(service) };
                                            break;
                                    }
                                    resolve(response);
                                }
                                else {
                                    _postOrDownload({ url: operationUrl, mapLayer: service.mapLayers[0], service: service }, TC.Util.WFSQueryBuilder(filter, null, capabilities, download ? outputFormat : TC.Consts.mimeType.JSON, false, getCRS())).then(function (response) {
                                        resolve(Object.assign({ service: service, errors: errors }, response));
                                    });
                                }
                            });
                        }
                        else {
                            _postOrDownload({ url: operationUrl, mapLayer: service.mapLayers[0], service: service }, TC.Util.WFSQueryBuilder(filter, null, capabilities, download ? outputFormat : TC.Consts.mimeType.JSON, false, getCRS())).then(function (response) {
                                resolve(Object.assign({ service: service, errors: errors }, response));

                            });
                        }
                    }).catch(function (e) {
                        resolve({
                            errors: [{
                                key: TC.Consts.WFSErrors.INDETERMINATE,
                                params: { err: e.name, errorThrown: e.message, serviceTitle: _getServiceTitle(service) }
                            }]
                        });
                    });
                }, function (e) {
                    var service = null;
                    for (var title in services)
                        if (services[title].request && services[title].request === serviceObj.request) {
                            service = services[title];
                        }
                    resolve({ errors: [{ key: TC.Consts.WFSErrors.GETCAPABILITIES, params: { err: e.name, serviceTitle: _getServiceTitle(service) } }] });
                });
            }));
        });
        return arrPromises;
    };

    mapProto.updateSize = function () {
        this.wrap.updateSize();
    };

    mapProto.linkTo = function (map) {
        this.wrap.linkTo(map);
    };

})();

/**
 * Árbol de capas del mapa.
 * Esta clase no tiene constructor.
 * @class TC.LayerTree
 * @static
 */
/**
 * Lista de árboles de (objetos de la clase {{#crossLink "TC.layer.LayerTree"}}{{/crossLink}}) de todas las capas base del mapa.
 * @property baseLayers
 * @type array
 */
/**
 * Lista de árboles de (objetos de la clase {{#crossLink "TC.layer.LayerTree"}}{{/crossLink}}) de todas las capas de trabajo del mapa.
 * @property workLayers
 * @type array
 */

const BasicMap = TC.Map;
export default BasicMap;