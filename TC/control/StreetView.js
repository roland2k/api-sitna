﻿
/**
  * Opciones de control de StreetView.
  * @typedef StreetViewOptions
  * @extends SITNA.control.ControlOptions
  * @memberof SITNA.control
  * @see SITNA.control.MapControlOptions
  * @property {HTMLElement|string} [div] - Elemento del DOM en el que crear el control o valor de atributo id de dicho elemento.
  * @property {string} [googleMapsKey] - El control de StreetView hace uso de la API de Google Maps para funcionar. 
  * Esta propiedad establece la clave de uso asociada al sitio donde está alojada la aplicación que usa la API SITNA. 
  * No es necesaria para hacer funcionar el control pero es recomendable obtener una para garantizar el servicio por parte de Google.
  * 
  * Puede obtener más información en el [sitio para desarrolladores de Google](https://developers.google.com/maps/documentation/javascript/get-api-key).
  * @property {HTMLElement|string} [viewDiv] - Elemento del DOM en el que mostrar la vista de StreetView o valor de atributo id de dicho elemento.
  * @example <caption>[Ver en vivo](../examples/cfg.StreetViewOptions.html)</caption> {@lang html}
  * <div id="mapa"/>
  * <div id="sv"/>
  * <script>
  *     // Creamos un mapa con el control de StreetView.
  *     // La vista de StreetView se debe dibujar en el elemento con identificador "sv".
  *     // Se utilizará la clave de Google Maps para el SITNA.
  *     // (Solamente es válida en el sitio web del SITNA, está aquí a título de ejemplo).
  *     var map = new SITNA.Map("mapa", {
  *         controls: {
  *             streetView: {
  *                 viewDiv: "sv",
  *                 googleMapsKey: "AIzaSyDyXgqllcajbMjx8yQxEX28VgA9nQOhtCM"
  *             }
  *         }
  *     });
  * </script>
  */

import TC from '../../TC';
import Consts from '../Consts';
import Cfg from '../Cfg';
import Control from '../Control';

TC.control = TC.control || {};
TC.Control = Control;

(function () {
    Consts.url.GOOGLEMAPS = '//maps.googleapis.com/maps/api/js?v=3';
    var gMapsUrl = Consts.url.GOOGLEMAPS;
    Cfg.proxyExceptions = Cfg.proxyExceptions || [];
    Cfg.proxyExceptions.push(Consts.url.GOOGLEMAPS);

    TC.control.StreetView = function () {
        var self = this;
        self._sv = null;
        self._mapActiveControl = null;

        TC.Control.apply(self, arguments);

        self.viewDiv = null;
        self._startLonLat = null;
    };

    TC.inherit(TC.control.StreetView, TC.Control);

    var ctlProto = TC.control.StreetView.prototype;

    ctlProto.CLASS = 'tc-ctl-sv';

    const dispatchCanvasResize = function () {
        var event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        const elm = this.map.div.querySelector('canvas') || window;
        elm.dispatchEvent(event);
    };

    var preset = function (ctl) {
        ctl.div.querySelector('.' + ctl.CLASS + '-btn').classList.add(Consts.classes.CHECKED);
        ctl.mapDiv.classList.add(ctl.CLASS + '-active');
    };

    var reset = function (ctl) {
        const view = ctl.viewDiv;
        const onTransitionend = function () {
            view.removeEventListener('transitionend', onTransitionend);
            dispatchCanvasResize.call(ctl);
        };

        view.addEventListener('transitionend', onTransitionend);

        // Por si no salta transitionend
        setTimeout(function () {
            dispatchCanvasResize.call(ctl);
        }, 1000);

        if (ctl.map.on3DView && ctl.ThreeDMarker) {
            ctl.ThreeDMarker.show = false;
            ctl.map.view3D.getScene().requestRender();
        }
        else
            ctl.layer.clearFeatures();
        ctl.div.querySelector('.' + ctl.CLASS + '-btn').classList.remove(Consts.classes.CHECKED);
        ctl.div.querySelector('.' + ctl.CLASS + '-drag').classList.remove(Consts.classes.HIDDEN);
        ctl.mapDiv.classList.remove(ctl.CLASS + '-active');
        ctl._startLonLat = null;
    };

    var resolve = function (ctl) {
        var result = false;
        const btn = ctl.div.querySelector('.' + ctl.CLASS + '-btn');
        const drag = ctl.div.querySelector('.' + ctl.CLASS + '-drag');

        var btnRect = btn.getBoundingClientRect();
        var dragRect = drag.getBoundingClientRect();
        drag.classList.add(Consts.classes.HIDDEN);
        if (dragRect.top < btnRect.top || dragRect.top > btnRect.bottom ||
            dragRect.left < btnRect.left || dragRect.left > btnRect.right) {
            // Hemos soltado fuera del botón: activar StreetView
            result = true;
            // Precarga de marcadores
            var extent = ctl.map.getExtent();
            var xy = [extent[2], extent[3]];
            if (!ctl.map.on3DView)
                for (var i = 0; i < 16; i++) {
                    ctl.layer.addMarker(xy, {
                        id: 'pegman',
                        cssClass: 'tc-marker-sv-' + i,
                        width: 48,
                        height: 48,
                        anchor: [0, 1]
                    });
                }
            /////////////////////
            // Activamos StreetView
            var mapRect = ctl.mapDiv.getBoundingClientRect();
            var xpos = (dragRect.left + dragRect.right) / 2 - mapRect.left;
            var ypos = dragRect.bottom - mapRect.top;
            var coords = ctl.getCoordinateFromPixel([xpos, ypos]);
            ctl.callback(coords);
        }
        else {
            reset(ctl);
        }
        return result;
    };

    ctlProto.register = function (map) {
        const self = this;

        if (!self.viewDiv) {
            self.viewDiv = TC.Util.getDiv(self.options.viewDiv);
            self.viewDiv.classList.add(self.CLASS + '-view', Consts.classes.HIDDEN);
            if (!self.options.viewDiv) {
                map.div.insertAdjacentElement('beforebegin', self.viewDiv);
            }
        }

        const result = TC.Control.prototype.register.call(self, map);

        self.mapDiv = self.map.div;

        self.getCoordinateFromPixel = self.map.wrap.getCoordinateFromPixel;
        //ahora google pide en la url de google maps una función función global que se llamará una vez que la API de Maps JavaScript se cargue por completo.
        let fnCallBackSV = "SV_" + (Math.random() + 1).toString(36).substring(7);

        window[fnCallBackSV] = function () {
            delete window[fnCallBackSV];
        }
        const googleMapsKey = self.options.googleMapsKey || map.options.googleMapsKey;
        if (googleMapsKey) {
            gMapsUrl += '&key=' + googleMapsKey + "&callback=" + fnCallBackSV;
        }

        self.layer = null;
        self.ThreeDMarker = null;
        var layerId = self.getUID();
        for (var i = 0; i < map.workLayers.length; i++) {
            var layer = map.workLayers[i];
            if (layer.type === Consts.layerType.VECTOR && layer.id === layerId) {
                self.layer = layer;
                break;
            }
        }
        if (!self.layer) {
            map.loaded(function () {
                map.addLayer({
                    id: layerId,
                    owner: self,
                    stealth: true,
                    type: Consts.layerType.VECTOR
                }).then(function (layer) {
                    self.layer = layer;
                });
            });
        }

        self.renderPromise().then(function () {
            import("draggabilly").then(function (module) {
                const Draggabilly = module.default;
                const drag = new Draggabilly(self.div.querySelector('.' + self.CLASS + '-drag'), {
                    containment: (self.getMapDiv && self.mapDiv) || self.map.div
                });
                drag.on('dragStart', function (_e) {
                    preset(self);
                });
                drag.on('dragEnd', function (_e) {
                    resolve(self);
                    drag.setPosition(0, 0);
                });
            });

            const view = self.viewDiv;
            view.querySelector('.' + self.CLASS + '-btn-close').addEventListener(Consts.event.CLICK, function (e) {
                e.stopPropagation();
                self.closeView();
            }, { passive: true });
        }
            , function () {
                TC.error("Error de renderizado StreetView");
            });

        map.on(Consts.event.VIEWCHANGE, function (e) {
            const view = e.view;

            if (view === Consts.view.THREED) {
                self.mapDiv = this.view3D.container;
                self.getCoordinateFromPixel = (coords) => {
                    const _coords = this.view3D.Coordinates2DTo3D(coords);
                    return [_coords.lon, _coords.lat];
                }

            } else if (view === Consts.view.DEFAULT) {
                self.mapDiv = this.div;
                self.getCoordinateFromPixel = self.map.wrap.getCoordinateFromPixel;
            }
        });
        map.on(Consts.event.THREED_DRAG, function (e) {
            if (e.pickedFeature === self.ThreeDMarker) {
                self._startLonLat = e.oldCoords;
                self._sv.setPosition({ lng: e.newCoords[0], lat: e.newCoords[1] });
            }
        })
        return result;
    };

    ctlProto.loadTemplates = async function () {
        const self = this;
        const mainTemplatePromise = import('../templates/tc-ctl-sv.mjs');
        const viewTemplatePromise = import('../templates/tc-ctl-sv-view.mjs');

        const template = {};
        template[self.CLASS] = (await mainTemplatePromise).default;
        template[self.CLASS + '-view'] = (await viewTemplatePromise).default;
        self.template = template;
    };

    ctlProto.render = function () {
        const self = this;

        return self._set1stRenderPromise(new Promise(function (resolve, _reject) {
            self.renderData(null, function () {
                self.getRenderedHtml(self.CLASS + '-view', null).then(function (out) {
                    //lo normal sería hacer el resolve después de volcar out en viewDiv
                    //pero a veces fallaba
                    //no se detonaba, sin dar error alguno
                    //así que lo arreglo como a mí me gusta:
                    setTimeout(function () {
                        self.viewDiv.innerHTML = out;
                        resolve(self);
                    }
                        , 300);


                    //console.log("Casi resuelto... " + out.length);
                    //self._$viewDiv.html(out);
                    //if (err)
                    //{
                    //    TC.error(err);
                    //}
                    //resolve(self);
                    //console.log("Resuelto!");

                })
                    .catch(function (err) {
                        TC.error(err);
                    });
            });
        }));
    };

    var waitId = 0;

    ctlProto.callback = function (coords) {
        var self = this;
        var geogCrs = 'EPSG:4326';
        const mapCrs = self.map.on3DView ? self.map.view3D.crs : self.map.crs;
        var ondrop = function (feature) {
            if (self._sv) {
                var bounds = feature.getBounds();
                const lonLat = TC.Util.reproject([(bounds[0] + bounds[2]) / 2, (bounds[1] + bounds[3]) / 2], mapCrs, geogCrs);
                self._sv.setPosition({ lng: lonLat[0], lat: lonLat[1] });
            }
        };

        var ondrag = function (feature) {
            if (self._sv) {
                var bounds = feature.getBounds();
                self._startLonLat = TC.Util.reproject([(bounds[0] + bounds[2]) / 2, (bounds[1] + bounds[3]) / 2], mapCrs, geogCrs);
            }
        };

        var li = self.map.getLoadingIndicator();
        if (li) {
            waitId = li.addWait(waitId);
        }

        const mapDiv = self.mapDiv;

        var setMarker = function (sv, center) {

            self.layer.clearFeatures();

            var xy;
            var heading;
            if (sv) {
                var latLon = sv.getPosition();
                xy = TC.Util.reproject([latLon.lng(), latLon.lat()], geogCrs, mapCrs);
                heading = sv.getPov().heading;
            }
            else {
                xy = coords;
                heading = 0;
            }
            if (self.map.on3DView) {
                self.ThreeDMarker = self.map.view3D.setMarker(xy,
                    TC.Util.getBackgroundUrlFromCss('tc-marker-sv-' + (Math.round(16.0 * heading / 360) + 16) % 16),
                    self.ThreeDMarker);

            }
            else {
                self.map.addMarker(xy, {
                    cssClass: 'tc-marker-sv-' + (Math.round(16.0 * heading / 360) + 16) % 16,
                    width: 48,
                    height: 48,
                    anchor: [0.4791666666666667, 0.7083333333333333],
                    layer: self.layer,
                    showsPopup: false
                });
                Promise.all(self.map._markerPromises).then(function () {
                    // Para poder arrastrar a pegman                
                    self.layer.wrap.setDraggable(true, ondrop, ondrag);
                });
            }

            if (center) {
                var setCenter = function () {
                    if (!self.map.on3DView)
                        self.map.setCenter(xy);
                    else {
                        self.map.view3D.setCenter(xy);
                    }
                };
                // Esperamos a que el mapa esté colapsado para centrarnos: ahorramos ancho de banda
                if (mapDiv.classList.contains(Consts.classes.COLLAPSED)) {
                    setCenter();
                }
                else {
                    setTimeout(setCenter, 1200);
                }
            }
        };
        var changeMarker = function (cssClass) {
            if (!self.map.on3DView) {
                if (self.layer.features && self.layer.features.length > 0) {
                    var pegmanMarker = self.layer.features[0];
                    delete pegmanMarker.options.url;
                    pegmanMarker.options.cssClass = cssClass
                    //pegmanMarker.options.cssClass = 'tc-marker-sv-' + (Math.round(16.0 * self._sv.getPov().heading / 360) + 16) % 16;
                    pegmanMarker.setStyle(pegmanMarker.options);
                }
            }
            else {
                self.ThreeDMarker.setImage(Math.random() * 1000, TC.Util.getBackgroundUrlFromCss(cssClass));
            }

        }

        TC.loadJS(
            !window.google || !google.maps,
            gMapsUrl,
            function () {

                if (window.google) {
                    setMarker();
                    const view = self.viewDiv;
                    const lonLat = TC.Util.reproject(coords, mapCrs, geogCrs);
                    const mapsLonLat = new google.maps.LatLng(lonLat[1], lonLat[0]);

                    // Comprobamos si hay datos de SV en el sitio elegido.
                    const svService = new google.maps.StreetViewService();
                    svService.getPanorama({
                        location: mapsLonLat,
                        preference: google.maps.StreetViewPreference.BEST
                    }, function (svPanoramaData, svStatus) {
                        if (svStatus !== google.maps.StreetViewStatus.OK) {
                            if (li) {
                                li.removeWait(waitId);
                            }
                            setTimeout(function () { // Timeout para dar tiempo a ocultarse a LoadingIndicator
                                TC.alert(svStatus === google.maps.StreetViewStatus.ZERO_RESULTS ? self.getLocaleString('noStreetView') : self.getLocaleString('streetViewUnknownError'));
                                self.layer.wrap.setDraggable(false);
                                reset(self);
                            }, 100);
                        }
                        else {
                            const onTransitionend = function (e) {
                                if (!self._transitioning) {
                                    return;
                                }

                                if (e.propertyName === 'width' || e.propertyName === 'height') {

                                    self._transitioning = false;

                                    if (li) {
                                        li.removeWait(waitId);
                                    }

                                    const resizeEvent = document.createEvent('HTMLEvents');
                                    resizeEvent.initEvent('resize', false, false);
                                    mapDiv.dispatchEvent(resizeEvent);

                                    dispatchCanvasResize.call(self);
                                    view.removeEventListener('transitionend', onTransitionend);

                                    var svOptions = {
                                        position: mapsLonLat,
                                        pov: {
                                            heading: 0,
                                            pitch: 0
                                        },
                                        zoom: 1,
                                        fullscreenControl: false,
                                        zoomControlOptions: {
                                            position: google.maps.ControlPosition.LEFT_TOP
                                        },
                                        panControlOptions: {
                                            position: google.maps.ControlPosition.LEFT_TOP
                                        },
                                        imageDateControl: true
                                    };

                                    if (!self._sv) {
                                        self._sv = new google.maps.StreetViewPanorama(view, svOptions);
                                        google.maps.event.addListener(self._sv, 'position_changed', function () {
                                            setMarker(self._sv, view.classList.contains(Consts.classes.VISIBLE));
                                        });
                                        const managePOVChange = function () {
                                            var heading
                                            if (self.map.on3DView)
                                                heading = (self._sv.getPov().heading || 360) - self.map.view3D.getCameraData().heading
                                            else {
                                                heading = self._sv.getPov().heading;
                                            }
                                            changeMarker('tc-marker-sv-' + (Math.round(16.0 * heading / 360) + 16) % 16);
                                        }
                                        self.map.on(Consts.event.CAMERACHANGE, managePOVChange);
                                        google.maps.event.addListener(self._sv, 'pov_changed', managePOVChange);
                                        google.maps.event.addListener(self._sv, 'status_changed', function () {
                                            var svStatus = self._sv.getStatus();

                                            if (svStatus !== google.maps.StreetViewStatus.OK) {
                                                self._sv.setVisible(false);
                                                TC.alert(svStatus === google.maps.StreetViewStatus.ZERO_RESULTS ? self.getLocaleString('noStreetView') : self.getLocaleString('streetViewUnknownError'));
                                                if (self._startLonLat) {
                                                    self._sv.setVisible(true);
                                                    self._sv.setPosition({ lng: self._startLonLat[0], lat: self._startLonLat[1] });
                                                }
                                                else {
                                                    self.layer.wrap.setDraggable(false);
                                                    self.closeView();
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        self._sv.setOptions(svOptions);
                                        self._sv.setVisible(true);
                                    }
                                }
                            };

                            self._transitioning = true;
                            view.addEventListener('transitionend', onTransitionend);

                            if (!self.options.viewDiv || !mapDiv.classList.contains(Consts.classes.FULL_SCREEN)) {
                                // No había definida una vista. Para hacer el control compatible con mapas incrustados,
                                // en este caso a la vista nueva le asignamos el tamaño del mapa.
                                const mapRect = mapDiv.getBoundingClientRect();
                                self.viewDiv.style.height = mapRect.height + 'px';
                                self.viewDiv.style.width = mapRect.width + 'px';
                            }
                            const zIndexMap = parseInt(window.getComputedStyle(mapDiv).zIndex, 10);

                            mapDiv.classList.add(Consts.classes.COLLAPSED);
                            mapDiv.style.width = self.options.ovmapW || "25vh";
                            mapDiv.style.height = self.options.ovmapH || "25vh";
                            if (self.map.on3DView)//si es en modo 3d se oculta el mapa 2D para que no interfiera
                                self.map.div.style.display = "none"
                            view.style.left = '';
                            view.style.top = '';
                            view.classList.remove(Consts.classes.HIDDEN);
                            view.classList.add(Consts.classes.VISIBLE);

                            const zIndexView = parseInt(window.getComputedStyle(view).zIndex, 10);
                            if (zIndexMap <= zIndexView)
                                mapDiv.style.zIndex = (zIndexView + 1)


                            // Por si no salta transitionend
                            setTimeout(function () {
                                onTransitionend({ propertyName: 'width' });
                            }, 1000);

                            const header = document.body.querySelector('header');
                            if (header) {
                                header.style.display = 'none';
                            }

                            //apagar lo que sea que esté encendido (probablemente featInfo)
                            //al cerrar con el aspa, volverá a detonarse StreetView.deactivate()
                            //que, a su vez, restaurará el control anterior (FeatureInfo)
                            if (self.map.activeControl) {
                                self._previousActiveControl = self.map.activeControl;
                                self.map.activeControl.deactivate(true);
                            }

                            setMarker(self._sv);
                        }
                    });
                }
                else {
                    reset(self);
                }
            }, false, true);
    };

    ctlProto.closeView = function () {
        const self = this;
        const mapDiv = self.mapDiv;
        const view = self.viewDiv;

        const endProcess = function () {
            mapDiv.classList.remove(Consts.classes.COLLAPSED);
            mapDiv.style.width = mapDiv.style.height = mapDiv.style.zIndex = "";
            if (self.map.on3DView)//si es en modo 3d se oculta el mapa 2D para que no interfiera
                self.map.div.style.display = '';
            const resizeEvent = document.createEvent('HTMLEvents');
            resizeEvent.initEvent('resize', false, false);
            mapDiv.dispatchEvent(resizeEvent); // Para evitar que salga borroso el mapa tras cerrar SV.
        };
        const transitionend = 'transitionend';
        const onTransitionend = function (e) {
            if (e.propertyName === 'width' || e.propertyName === 'height') {
                view.removeEventListener(transitionend, onTransitionend);
                endProcess();
            }
        };
        view.removeEventListener(transitionend, onTransitionend);
        view.addEventListener(transitionend, onTransitionend);
        setTimeout(endProcess, 1000); // backup por si falla la transición.

        if (!self.options.viewDiv) {
            // No había definida una vista. Para hacer el control compatible con mapas incrustados,
            // en este caso a la vista nueva le habíamos asignado el tamaño del mapa.
            self.viewDiv.style.removeProperty('height');
            self.viewDiv.style.removeProperty('width');
        }
        view.classList.add(Consts.classes.HIDDEN);
        view.classList.remove(Consts.classes.VISIBLE);
        view.style.height = view.style.width = "";
        self.div.querySelector('.' + self.CLASS + '-drag').classList.remove(Consts.classes.HIDDEN);
        self.layer.wrap.setDraggable(false);
        reset(self);
        self._sv.setVisible(false);
        const header = document.body.querySelector('header');
        if (header) {
            header.style.display = '';
        }

        if (self._previousActiveControl) {
            self._previousActiveControl.activate();
        }
    };
})();

const StreetView = TC.control.StreetView;
export default StreetView;