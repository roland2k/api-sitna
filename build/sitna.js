/**
 * @overview API SITNA: API JavaScript para la visualización de datos georreferenciados en aplicaciones web.
 * @version 2.2.0
 * @copyright 2019 Gobierno de Navarra
 * @license BSD-2-Clause
 * @author Fernando Lacunza <flacunza@itracasa.es>
 */

/**
 * LoadJS descargado de https://github.com/muicss/loadjs
 * @version 3.5.2
 * @ignore
 */
loadjs = function () { var l = function () { }, c = {}, f = {}, u = {}; function o(e, n) { if (e) { var t = u[e]; if (f[e] = n, t) for (; t.length;)t[0](e, n), t.splice(0, 1) } } function s(e, n) { e.call && (e = { success: e }), n.length ? (e.error || l)(n) : (e.success || l)(e) } function h(t, r, i, c) { var o, s, e = document, n = i.async, f = (i.numRetries || 0) + 1, u = i.before || l, a = t.replace(/^(css|img)!/, ""); c = c || 0, /(^css!|\.css$)/.test(t) ? (o = !0, (s = e.createElement("link")).rel = "stylesheet", s.href = a) : /(^img!|\.(png|gif|jpg|svg)$)/.test(t) ? (s = e.createElement("img")).src = a : ((s = e.createElement("script")).src = t, s.async = void 0 === n || n), !(s.onload = s.onerror = s.onbeforeload = function (e) { var n = e.type[0]; if (o && "hideFocus" in s) try { s.sheet.cssText.length || (n = "e") } catch (e) { 18 != e.code && (n = "e") } if ("e" == n && (c += 1) < f) return h(t, r, i, c); r(t, n, e.defaultPrevented) }) !== u(t, s) && e.head.appendChild(s) } function t(e, n, t) { var r, i; if (n && n.trim && (r = n), i = (r ? t : n) || {}, r) { if (r in c) throw "LoadJS"; c[r] = !0 } !function (e, r, n) { var t, i, c = (e = e.push ? e : [e]).length, o = c, s = []; for (t = function (e, n, t) { if ("e" == n && s.push(e), "b" == n) { if (!t) return; s.push(e) } --c || r(s) }, i = 0; i < o; i++)h(e[i], t, n) }(e, function (e) { s(i, e), o(r, e) }, i) } return t.ready = function (e, n) { return function (e, t) { e = e.push ? e : [e]; var n, r, i, c = [], o = e.length, s = o; for (n = function (e, n) { n.length && c.push(e), --s || t(c) }; o--;)r = e[o], (i = f[r]) ? n(r, i) : (u[r] = u[r] || []).push(n) }(e, function (e) { s(n, e) }), t }, t.done = function (e) { o(e, []) }, t.reset = function () { c = {}, f = {}, u = {} }, t.isDefined = function (e) { return e in c }, t }();

var TC = TC || {};
/*
 * Initialization
 */
TC.version = '2.2.0 [2021-12-2 12:14:07]';
(function () {
    if (!TC.apiLocation) {
        var src;
        var script;
        if (document.currentScript) {
            script = document.currentScript;
        }
        else {
            var scripts = document.getElementsByTagName('script');
            script = scripts[scripts.length - 1];
        }
        var src = script.getAttribute('src');
        TC.apiLocation = src.substr(0, src.lastIndexOf('/') + 1);
    }
})();

if (!TC.Consts) {

    TC.Consts = {};
    TC.Consts.OLNS = 'ol';
    TC.Consts.PROJ4JSOBJ = 'proj4';
    TC.Consts.GEOGRAPHIC = 'geographic';
    TC.Consts.UTM = 'UTM';
    TC.Consts.OLD_BROWSER_ALERT = 'TC.oldBrowserAlert';
    TC.Consts.CLUSTER_ANIMATION_DURATION = 200;
    TC.Consts.ZOOM_ANIMATION_DURATION = 300;
    TC.Consts.URL_MAX_LENGTH = 2048;
    TC.Consts.METER_PRECISION = 0;
    TC.Consts.DEGREE_PRECISION = 5;
    TC.Consts.EXTENT_TOLERANCE = 0.9998;/*URI: debido al redondeo del extente en el hash se obtiene un nivel de resolución mayor al debido. Con este valor definimos una tolerancia para que use una resolución si es muy muy muy próxima*/
    TC.Consts.SRSDOWNLOAD_GEOJSON_KML = "EPSG:4326";

    TC.Consts.url = {
        SPLIT_REGEX: /([^:]*:)?\/\/([^:]*:?[^@]*@)?([^:\/\?]*):?([^\/\?]*)/,
        OL: 'lib/ol/build/ol-sitna',
        OL_CONNECTOR: 'TC/ol/ol',
        TEMPLATING_FULL: 'lib/handlebars/handlebars',
        TEMPLATING_RUNTIME: 'lib/handlebars/handlebars.runtime',
        TEMPLATING_HELPERS: 'lib/handlebars/helpers.js',
        PROJ4JS: 'lib/proj4js/proj4.js',
        EPSG: 'https://epsg.io/',
        LOCALFORAGE: TC.apiLocation + 'lib/localforage/localforage',
        D3C3: TC.apiLocation + 'lib/d3c3/d3c3.min.js',
        CESIUM: TC.isDebug ? 'lib/cesium/build/cesium-sitna.js' : 'lib/cesium/build/cesium-sitna.min.js',
        CESIUM_CONNECTOR: 'TC/cesium/cesium.js',
        JSNLOG: 'lib/jsnlog/jsnlog.min.js',
        INTERACTJS: 'lib/interactjs/interact.min.js',
        ERROR_LOGGER: TC.apiLocation + 'errors/logger.ashx',
        PDFMAKE: TC.apiLocation + 'lib/pdfmake/pdfmake-fonts.min.js',
        UA_PARSER: 'lib/ua-parser/ua-parser.min.js',
        HASH: 'lib/jshash/md5-min.js',
        DRAGGABILLY: 'lib/draggabilly/draggabilly.pkgd',
        URL_POLYFILL: 'lib/polyfill/url.js',
        PROMISE_POLYFILL: 'lib/polyfill/promise/polyfill.min.js'
    };
    TC.Consts.classes = {
        MAP: 'tc-map',
        POINT: 'tc-point',
        MARKER: 'tc-marker',
        VISIBLE: 'tc-visible',
        HIDDEN: 'tc-hidden',
        COLLAPSED: 'tc-collapsed',
        CHECKED: 'tc-checked',
        DISABLED: 'tc-disabled',
        ACTIVE: 'tc-active',
        DEFAULT: 'tc-default',
        LASTCHILD: 'tc-lastchild',
        TRANSPARENT: 'tc-transparent',
        DROP: 'tc-drop',
        LOADING: 'tc-loading',
        IPAD_IOS7_FIX: 'tc-ipad-ios7-fix',
        INFO: 'tc-msg-info',
        WARNING: 'tc-msg-warning',
        ERROR: 'tc-msg-error',
        THREED: 'tc-3d'
    };
    TC.Consts.msgType = {
        INFO: 'info',
        WARNING: 'warning',
        ERROR: 'error'
    };
    TC.Consts.msgErrorMode = {
        TOAST: 'toast',
        CONSOLE: 'console',
        EMAIL: 'email'
    };
    TC.Consts.event = {
        /**
         * Se lanza cuando el mapa ha cargado todas sus capas iniciales y todos sus controles
         * @event mapload
         */
        MAPLOAD: 'mapload.tc',
        MAPREADY: 'mapready.tc',
        MAPCHANGE: 'mapchange.tc',
        BEFORELAYERADD: 'beforelayeradd.tc',
        LAYERADD: 'layeradd.tc',
        LAYERREMOVE: 'layerremove.tc',
        LAYERORDER: 'layerorder.tc',
        BEFORELAYERUPDATE: 'beforelayerupdate.tc',
        LAYERUPDATE: 'layerupdate.tc',
        LAYERERROR: 'layererror.tc',
        BEFOREBASELAYERCHANGE: 'beforebaselayerchange.tc',
        BASELAYERCHANGE: 'baselayerchange.tc',
        BEFOREUPDATE: 'beforeupdate.tc',
        UPDATE: 'update.tc',
        BEFOREZOOM: 'beforezoom.tc',
        ZOOM: 'zoom.tc',
        BEFOREUPDATEPARAMS: 'beforeupdateparams.tc',
        UPDATEPARAMS: 'updateparams.tc',
        VECTORUPDATE: 'vectorupdate.tc',
        FEATUREADD: 'featureadd.tc',
        BEFOREFEATURESADD: 'beforefeaturesadd.tc',
        FEATURESADD: 'featuresadd.tc',
        FEATUREREMOVE: 'featureremove.tc',
        FEATURESCLEAR: 'featuresclear.tc',
        FEATURESIMPORT: 'featuresimport.tc',
        FEATURESIMPORTERROR: 'featuresimporterror.tc',
        FEATURESIMPORTPARTIAL: 'featuresimportpartial.tc',
        BEFORETILELOAD: 'beforetileload.tc',
        TILELOAD: 'tileload.tc',
        TILELOADERROR: 'tileloaderror.tc',
        CONTROLADD: 'controladd.tc',
        CONTROLACTIVATE: 'controlactivate.tc',
        CONTROLDEACTIVATE: 'controldeactivate.tc',
        BEFORECONTROLRENDER: 'beforecontrolrender.tc',
        CONTROLRENDER: 'controlrender.tc',
        BEFORELAYOUTLOAD: 'beforelayoutload.tc',
        LAYOUTLOAD: 'layoutload.tc',
        LAYERVISIBILITY: 'layervisibility.tc',
        LAYEROPACITY: 'layeropacity.tc',
        FEATURECLICK: 'featureclick.tc',
        NOFEATURECLICK: 'nofeatureclick.tc',
        FEATUREOVER: 'featureover.tc',
        FEATUREOUT: 'featureout.tc',
        BEFOREFEATUREINFO: 'beforefeatureinfo.tc',
        FEATUREINFO: 'featureinfo.tc',
        NOFEATUREINFO: 'nofeatureinfo.tc',
        FEATUREINFOERROR: 'featureinfoerror.tc',
        CLICK: 'click',
        MOUSEUP: 'mouseup',
        MOUSEMOVE: 'mousemove',
        MOUSELEAVE: 'mouseleave',
        STARTLOADING: 'startloading.tc',
        STOPLOADING: 'stoploading.tc',
        EXTERNALSERVICEADDED: 'externalserviceadded.tc',
        ZOOMTO: 'zoomto.tc',
        PROJECTIONCHANGE: 'projectionchange.tc',
        VIEWCHANGE: 'viewchange.tc',
        TERRAINPROVIDERADD: 'terrainprovideradd.tc',
        TERRAINPROVIDERREMOVE: 'terrainproviderremove.tc',
        OVERVIEWBASELAYERCHANGE: 'overviewbaselayerchange.tc',
        POPUP: 'popup.tc',
        BEFOREAPPLYQUERY: 'beforeapplyquery.tc'
    };

    /**
     * Colección de identificadores de capas útiles de IDENA y otros servicios de terceros.
     * @namespace SITNA.Consts.layer
     * @see MapOptions
     * @see SITNA.Map#addLayer
     * @see SITNA.Map#setBaseLayer
     */
    TC.Consts.layer = {
        /**
         * Identificador de la capa de ortofoto de máxima actualidad del WMTS de IDENA. Esta capa solo es compatible con el sistema de referencia EPSG:25830.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_ORTHOPHOTO: 'ortofoto',
        /**
         * Identificador de la capa de mapa base del WMTS de IDENA. Esta capa solo es compatible con el sistema de referencia EPSG:25830.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_BASEMAP: 'mapabase',
        /**
         * Identificador de la capa de catastro del WMS de IDENA.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_CADASTER: 'catastro',
        /**
         * Identificador de la capa de cartografía topográfica 2017 del WMTS de IDENA. Esta capa solo es compatible con el sistema de referencia EPSG:25830.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_CARTO: 'cartografia',
        /**
         * Identificador de la capa de ortofoto 2020 del WMTS de IDENA. Esta capa solo es compatible con el sistema de referencia EPSG:25830.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_ORTHOPHOTO2020: 'ortofoto2020',
        /**
         * Identificador de la capa de ortofoto 2019 del WMTS de IDENA. Esta capa solo es compatible con el sistema de referencia EPSG:25830.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_ORTHOPHOTO2019: 'ortofoto2019',
        /**
         * Identificador de la capa de ortofoto 2018 del WMTS de IDENA. Esta capa solo es compatible con el sistema de referencia EPSG:25830.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_ORTHOPHOTO2018: 'ortofoto2018',
        /**
         * Identificador de la capa de ortofoto 2017 del WMTS de IDENA. Esta capa solo es compatible con el sistema de referencia EPSG:25830.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_ORTHOPHOTO2017: 'ortofoto2017',
        /**
         * Identificador de la capa de ortofoto 2014 del WMTS de IDENA. Esta capa solo es compatible con el sistema de referencia EPSG:25830.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_ORTHOPHOTO2014: 'ortofoto2014',
        /**
         * Identificador de la capa de ortofoto 2012 del WMTS de IDENA. Esta capa solo es compatible con el sistema de referencia EPSG:25830.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_ORTHOPHOTO2012: 'ortofoto2012',
        /**
         * Identificador de la capa de ortofoto de la comarca de Pamplona 2020 del WMTS de IDENA. Esta capa solo es compatible con el sistema de referencia EPSG:25830.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_PAMPLONA_ORTHOPHOTO2020: 'ortofoto_pamplona2020',
        /**
         * Identificador de la capa de mapa base del WMS de IDENA.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_DYNBASEMAP: 'mapabase_dinamico',
        /**
         * Identificador de la capa de ortofoto de máxima actualidad del WMS de IDENA.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_DYNORTHOPHOTO: 'ortofoto_dinamico',
        /**
         * Identificador de la capa de ortofoto 2020 del WMS de IDENA.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_DYNORTHOPHOTO2020: 'ortofoto2020_dinamico',
        /**
         * Identificador de la capa de ortofoto 2019 del WMS de IDENA.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_DYNORTHOPHOTO2019: 'ortofoto2019_dinamico',
        /**
         * Identificador de la capa de ortofoto 2018 del WMS de IDENA.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_DYNORTHOPHOTO2018: 'ortofoto2018_dinamico',
        /**
         * Identificador de la capa de ortofoto 2017 del WMS de IDENA.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_DYNORTHOPHOTO2017: 'ortofoto2017_dinamico',
        /**
         * Identificador de la capa de ortofoto 2014 del WMS de IDENA.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_DYNORTHOPHOTO2014: 'ortofoto2014_dinamico',
        /**
         * Identificador de la capa de ortofoto 2012 del WMS de IDENA.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_DYNORTHOPHOTO2012: 'ortofoto2012_dinamico',
        /**
         * Identificador de la capa de ortofoto de la comarca de Pamplona 2020 del WMS de IDENA.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_PAMPLONA_DYNORTHOPHOTO2020: 'ortofoto_pamplona2020_dinamico',
        /**
         * Identificador de la capa de cartografía topográfica 2017 del WMS de IDENA.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_DYNCARTO: 'cartografia_dinamico',
        /**
         * Identificador de la capa de relieve en blanco y negro del WMS de IDENA.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_BW_RELIEF: 'relieve_bn',
        /**
         * Identificador de la capa de la combinación de ortofoto de máxima actualidad y mapa base del WMS de IDENA.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IDENA_BASEMAP_ORTHOPHOTO: 'base_orto',

        /**
         * Identificador de la capa de cartografía raster del WMTS del Instituto Geográfico Nacional.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_ES_CARTO: "ign-raster",
        /**
         * Identificador de la capa del callejero del WMTS del Instituto Geográfico Nacional.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_ES_BASEMAP: "ign-base",
        /**
         * Identificador de la capa del callejero en gris del WMTS del Instituto Geográfico Nacional. Esta capa solo es compatible con el sistema de referencia EPSG:3857.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_ES_BASEMAP_GREY: "ign-base-gris",
        /**
         * Identificador de la capa de relieve del WMTS del Instituto Geográfico Nacional.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_ES_RELIEF: "ign-mtn",
        /**
         * Identificador de la capa del PNOA del WMTS del Instituto Geográfico Nacional.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_ES_ORTHOPHOTO: "ign-pnoa",
        /**
         * Identificador de la capa del modelo digital de superficies LIDAR del WMTS del Instituto Geográfico Nacional.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_ES_LIDAR: "ign-lidar",

        /**
         * Identificador de la capa de cartografía raster del WMS del Instituto Geográfico Nacional.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_ES_DYNCARTO: "ign-raster-dyn",
        /**
         * Identificador de la capa del callejero del WMS del Instituto Geográfico Nacional.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_ES_DYNBASEMAP: "ign-base-dyn",
        /**
         * Identificador de la capa del callejero en gris del WMS del Instituto Geográfico Nacional.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_ES_DYNBASEMAP_GREY: "ign-base-gris-dyn",
        /**
         * Identificador de la capa de relieve del WMS del Instituto Geográfico Nacional.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_ES_DYNRELIEF: "ign-mtn-dyn",
        /**
         * Identificador de la capa del PNOA del WMS del Instituto Geográfico Nacional.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_ES_DYNORTHOPHOTO: "ign-pnoa-dyn",
        /**
         * Identificador de la capa del modelo digital de superficies LIDAR del WMS del Instituto Geográfico Nacional.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_ES_DYNLIDAR: "ign-lidar-dyn",

        /**
         * Identificador de la capa de cartografía raster del WMTS del Instituto Geográfico Nacional Francés. Esta capa solo es compatible con el sistema de referencia EPSG:3857.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_FR_CARTO: "ign-fr-cartes",
        /**
         * Identificador de la capa de mapa base del WMTS del Instituto Geográfico Nacional Francés. Esta capa solo es compatible con el sistema de referencia EPSG:3857.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_FR_BASEMAP: "ign-fr-base",
        /**
         * Identificador de la capa de relieve del WMTS del Instituto Geográfico Nacional Francés. Esta capa solo es compatible con el sistema de referencia EPSG:3857.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_FR_RELIEF: "ign-fr-estompage",
        /**
         * Identificador de la capa de ortofoto del WMTS del Instituto Geográfico Nacional Francés. Esta capa solo es compatible con el sistema de referencia EPSG:3857.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_FR_ORTHOPHOTO: "ign-fr-orto",

        /**
         * Identificador de la capa de cartografía raster del WMS del Instituto Geográfico Nacional Francés.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_FR_DYNCARTO: "ign-fr-cartes-dyn",
        /**
         * Identificador de la capa de mapa base del WMS del Instituto Geográfico Nacional Francés.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_FR_DYNBASEMAP: "ign-fr-base-dyn",
        /**
         * Identificador de la capa de relieve del WMS del Instituto Geográfico Nacional Francés.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_FR_DYNRELIEF: "ign-fr-estompage-dyn",
        /**
         * Identificador de la capa de ortofoto del WMS del Instituto Geográfico Nacional Francés.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        IGN_FR_DYNORTHOPHOTO: "ign-fr-orto-dyn",

        /**
         * Identificador de la capa de OpenStreetMap a través del WMTS de la API SITNA. Esta capa solo es compatible con el sistema de referencia EPSG:3857.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        OSM: 'osm',
        /**
         * Identificador de la capa de Carto Voyager a través del WMTS de la API SITNA. Esta capa solo es compatible con el sistema de referencia EPSG:3857.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        CARTO_VOYAGER: 'carto_voyager',
        /**
         * Identificador de la capa de Carto Light a través del WMTS de la API SITNA. Esta capa solo es compatible con el sistema de referencia EPSG:3857.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        CARTO_LIGHT: 'carto_light',
        /**
         * Identificador de la capa de Carto Dark a través del WMTS de la API SITNA. Esta capa solo es compatible con el sistema de referencia EPSG:3857.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        CARTO_DARK: 'carto_dark',
        /**
         * Identificador de la capa de Mapbox Streets a través del WMTS de la API SITNA. Esta capa solo es compatible con el sistema de referencia EPSG:3857.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        MAPBOX_STREETS: 'mapbox_streets',
        /**
         * Identificador de la capa de Mapbox Satellite a través del WMTS de la API SITNA. Esta capa solo es compatible con el sistema de referencia EPSG:3857.
         * @var {string}
         * @memberof SITNA.Consts.layer
         * @readonly
         */
        MAPBOX_SATELLITE: 'mapbox_satellite',
        /** 
         * Identificador de una capa en blanco.
         * @var {string}
         * @readonly
         * @memberof SITNA.Consts.layer
         */
        BLANK: 'ninguno'
    };
    TC.Consts.text = {
        API_ERROR: 'Error API SITNA',
        APP_ERROR: 'Error de aplicación'
    };

    /**
     * Colección de identificadores de tipo de capa.
     * @namespace SITNA.Consts.layerType
     * @see LayerOptions
     */
    TC.Consts.layerType = {
        /**
         * Identificador de capa de tipo WMS.
         * @var {string}
         * @memberof SITNA.Consts.layerType
         * @readonly
         */
        WMS: 'WMS',
        /**
         * Identificador de capa de tipo WMTS.
         * @var {string}
         * @memberof SITNA.Consts.layerType
         * @readonly
         */
        WMTS: 'WMTS',
        /**
         * Identificador de capa de tipo WFS.
         * @var {string}
         * @memberof SITNA.Consts.layerType
         * @readonly
         */
        WFS: 'WFS',
        /**
         * Identificador de capa de tipo vectorial. Este tipo de capa es la que se utiliza para dibujar marcadores.
         * @var {string}
         * @memberof SITNA.Consts.layerType
         * @readonly
         */
        VECTOR: 'vector',
        /**
         * Identificador de capa de tipo KML.
         * @var {string}
         * @memberof SITNA.Consts.layerType
         * @deprecated En lugar de esta propiedad es recomendable usar {@link SITNA.Consts.layerType.VECTOR} para cargar archivos KML.
         * @readonly
         */
        KML: 'KML',
        GPX: 'GPX',
        GML: 'GML',
        GEOJSON: 'GeoJSON',
        GROUP: 'group'
    };

    /**
     * Colección de identificadores de tipo de geometría.
     * @namespace SITNA.Consts.geom
     */
    TC.Consts.geom = {
        /**
         * Identificador de geometría de tipo punto.
         * @var {string}
         * @memberof SITNA.Consts.geom
         * @readonly
         */
        POINT: 'point',
        MULTIPOINT: 'multipoint',
        /**
         * Identificador de geometría de tipo línea.
         * @var {string}
         * @memberof SITNA.Consts.geom
         * @readonly
         */
        POLYLINE: 'polyline',
        /**
         * Identificador de geometría de tipo polígono.
         * @var {string}
         * @memberof SITNA.Consts.geom
         * @readonly
         */
        POLYGON: 'polygon',
        MULTIPOLYLINE: 'multipolyline',
        MULTIPOLYGON: 'multipolygon',
        CIRCLE: 'circle',
        RECTANGLE: 'rectangle'
    };
    TC.Consts.searchType = {
        CADASTRAL: 'cadastral',
        COORDINATES: 'coordinates',
        MUNICIPALITY: 'municipality',
        COUNCIL: 'council',
        LOCALITY: 'locality',
        STREET: 'street',
        NUMBER: 'number',
        URBAN: 'urban',
        COMMONWEALTH: 'commonwealth',
        ROAD: 'road',
        ROADMILESTONE: 'roadmilestone',
        PLACENAME: 'placename',
        PLACENAMEMUNICIPALITY: 'placenamemunicipality'
    };
    TC.Consts.mapSearchType = {
        MUNICIPALITY: TC.Consts.searchType.MUNICIPALITY,
        COUNCIL: TC.Consts.searchType.COUNCIL,
        URBAN: TC.Consts.searchType.URBAN,
        COMMONWEALTH: TC.Consts.searchType.COMMONWEALTH,
        GENERIC: 'generic'
    };
    TC.Consts.comparison = {
        EQUAL_TO: '==',
        NOT_EQUAL_TO: '!=',
        LESS_THAN: '<',
        GREATER_THAN: '>',
        LESS_THAN_EQUAL_TO: '=<',
        GREATER_THAN_EQUAL_TO: '>=',
        LIKE: 'is'
    };
    TC.Consts.logicalOperator = {
        AND: 'and',
        OR: 'or'
    };
    TC.Consts.WMTSEncoding = {
        KVP: 'KVP',
        RESTFUL: 'RESTful'
    };

    /**
     * Colección de tipos MIME de utilidad.
     * @namespace SITNA.Consts.mimeType
     * @see LayerOptions
     */
    TC.Consts.mimeType = {
        /** 
         * Tipo MIME de imagen PNG.
         * @var {string}
         * @memberof SITNA.Consts.mimeType
         * @readonly
         * @default
         */
        PNG: 'image/png',
        /** 
         * Tipo MIME de imagen JPEG.
         * @var {string}
         * @memberof SITNA.Consts.mimeType
         * @readonly
         * @default 
         */
        JPEG: 'image/jpeg',
        /** 
         * Tipo MIME de documento JSON.
         * @var {string}
         * @memberof SITNA.Consts.mimeType
         * @readonly
         * @default 
         */
        JSON: 'application/json',
        /** 
         * Tipo MIME de documento GeoJSON.
         * @var {string}
         * @memberof SITNA.Consts.mimeType
         * @readonly
         * @default 
         */
        GEOJSON: 'application/vnd.geo+json',
        /** 
         * Tipo MIME de documento KML.
         * @var {string}
         * @memberof SITNA.Consts.mimeType
         * @readonly
         * @default 
         */
        KML: 'application/vnd.google-earth.kml+xml',
        KMZ: 'application/vnd.google-earth.kmz',
        /** 
         * Tipo MIME de documento GML.
         * @var {string}
         * @memberof SITNA.Consts.mimeType
         * @readonly
         * @default 
         */
        GML: 'application/gml+xml',
        /** 
         * Tipo MIME de documento GPX.
         * @var {string}
         * @memberof SITNA.Consts.mimeType
         * @readonly
         * @default 
         */
        GPX: 'application/gpx+xml',
        /** 
         * Tipo MIME de documento XML.
         * @var {string}
         * @memberof SITNA.Consts.mimeType
         * @readonly
         * @default 
         */
        XML: 'application/xml'
    };
    /**
     * Colección de tipos de formatos de utilidad.
     * @namespace SITNA.Consts.format
     */
    TC.Consts.format = {
        /** 
         * Leer y escribir datos en formato JSON.
         * @var {string}
         * @memberof SITNA.Consts.format
         * @readonly
         * @default
         */
        JSON: 'JSON',
        /** 
        * Leer y escribir datos en formato KML.
        * @var {string}
        * @memberof SITNA.Consts.format
        * @readonly
        * @default
        */
        KML: 'KML',
        /** 
        * Leer y escribir datos en formato KMZ.
        * @var {string}
        * @memberof SITNA.Consts.format
        * @readonly
        * @default
        */
        KMZ: 'KMZ',
        /** 
         * Leer y escribir datos en formato GML.
         * @var {string}
         * @memberof SITNA.Consts.format
         * @readonly
         * @default
         */
        GML: 'GML',
        /** 
         * Leer y escribir datos en formato GML2.
         * @var {string}
         * @memberof SITNA.Consts.format
         * @readonly
         * @default
         */
        GML2: 'GML2',
        /** 
         * Leer y escribir datos en formato GML3.
         * @var {string}
         * @memberof SITNA.Consts.format
         * @readonly
         * @default
         */
        GML3: 'GML3',
        /** 
         * Leer y escribir datos en formato GML3.2.
         * @var {string}
         * @memberof SITNA.Consts.format
         * @readonly
         * @default
         */
        GML32: 'GML32',
        /** 
         * Leer y escribir datos en formato GeoJSON.
         * @var {string}
         * @memberof SITNA.Consts.format
         * @readonly
         * @default
         */
        GEOJSON: 'GeoJSON',
        /** 
         * Leer y escribir datos en formato TopoJSON.
         * @var {string}
         * @memberof SITNA.Consts.format
         * @readonly
         * @default
         */
        TOPOJSON: 'TopoJSON',
        /** 
         * Leer y escribir datos en formato GPX.
         * @var {string}
         * @memberof SITNA.Consts.format
         * @readonly
         * @default
         */
        GPX: 'GPX',
        /** 
         * Leer y escribir datos en formato WKT.
         * @var {string}
         * @memberof SITNA.Consts.format
         * @readonly
         * @default
         */
        WKT: 'WKT',
        /** 
         * Leer y escribir datos en formato ShapeFile.
         * @var {string}
         * @memberof SITNA.Consts.format
         * @readonly
         * @default
         */
        SHP: 'SHP',
        /** 
         * Leer y escribir datos en formato ZIP.
         * @var {string}
         * @memberof SITNA.Consts.format
         * @readonly
         * @default
         */
        ZIP: 'ZIP',
        /** 
         * Leer y escribir datos en formato GeoPackage.
         * @var {string}
         * @memberof SITNA.Consts.format
         * @readonly
         * @default
         */
        GPKG: 'GPKG'
    };
    //enumerado de errores y warninqs derivados de descargas, getfeatures
    TC.Consts.WFSErrors = {
        GETFEATURE_NOT_AVAILABLE: "GetFeatureNotAvailable",
        LAYERS_NOT_AVAILABLE: "LayersNotAvailable",
        NO_LAYERS: "NoLayers",
        NO_VALID_LAYERS: "noValidLayers",
        QUERY_NOT_AVAILABLE: "QueryNotAvailable",
        //CapabilitiesParseError: "CapabilitiesParseError",
        MAX_NUM_FEATURES: "NumMaxFeatures",
        GETCAPABILITIES: "GetCapabilities",
        INDETERMINATE: "Indeterminate",
        NO_FEATURES: "NoFeatures"
    }
    TC.Consts.visibility = {
        NOT_VISIBLE: 0,
        NOT_VISIBLE_AT_RESOLUTION: 1,
        HAS_VISIBLE: 2,
        VISIBLE: 4
    };

    TC.Consts.view = {
        DEFAULT: 0,
        THREED: 1,
        PRINTING: 2
    };

    TC.Consts.units = {
        DEGREES: "degrees",
        METERS: "m"
    };

    TC.Consts.MARKER = 'marker';

    TC.Consts.infoContainer = {
        POPUP: 'popup',
        RESULTS_PANEL: 'resultsPanel'
    };

    /**
     * Opciones de configuración del mapa. Para más información de como usar objetos de este tipo, consultar {@tutorial 2-configuration}.
     * @typedef MapOptions
     * @see 2-configuration
     * @property {LayerOptions[]|string[]} [baseLayers=[SITNA.Consts. layer. IDENA_BASEMAP]{@link SITNA.Consts.layer.IDENA_BASEMAP}, [SITNA.Consts. layer. IDENA_ORTHOPHOTO]{@link SITNA.Consts.layer.IDENA_ORTHOPHOTO}, [SITNA.Consts. layer. IDENA_CADASTER]{@link SITNA.Consts.layer.IDENA_CADASTER}, [SITNA.Consts. layer. IDENA_CARTO]{@link SITNA.Consts.layer.IDENA_CARTO}] - Lista con cualquier combinación de objetos de definición de capa o de identificadores de capas de la API SITNA
     * (miembros de {@link SITNA.Consts.layer}) para incluir dichas capas como mapas de fondo.
     * @property {MapControlOptions} [controls] - Opciones de controles de mapa, define qué controles se incluyen en un mapa y qué opciones se pasan a cada control.
     * @property {MapViewOptions} [views] - Opciones de vista de mapa, define qué opciones se pasan a cada vista.
     * @property {string} [crossOrigin] - Valor del atributo `crossorigin` de las imágenes del mapa para habilitar CORS Es necesario establecer esta opción para poder utilizar el método {@link SITNA.Map#exportImage}.
     *
     * Los valores soportados son `anonymous` y `use-credentials`.
     * @property {string} [crs="EPSG:25830"] - Código EPSG del sistema de referencia de coordenadas del mapa.
     * @property {string} [defaultBaseLayer=[SITNA.Consts. layer. IDENA_BASEMAP]{@link SITNA.Consts.layer.IDENA_BASEMAP}] - Identificador de la capa base por defecto o índice de la capa base por defecto en la lista de capas base del mapa (Definida con la propiedad `baseLayers`).
     * @property {number[]} [initialExtent=[541084.221, 4640788.225, 685574.4632, 4796618.764]] - Extensión inicial del mapa definida por x mínima, y mínima, x máxima, y máxima, en las unidades del sistema de referencia de coordenadas del mapa (Ver propiedad `crs`). Por defecto la extensión es la de Navarra.
     * @property {string} [layout="layout/responsive"] - URL de la carpeta de maquetación. Para prescindir de maquetación, establecer esta propiedad a `null`. Para más información al respecto de esta propiedad, 
     * consulte el tutorial {@tutorial layout_cfg}.
     * @property {string} [locale="es-ES"] - Código de idioma de la interfaz de usuario. Este código debe obedecer la sintaxis definida por la IETF. Los valores posibles son `es-ES`, `eu-ES` y `en-US`.
     * @property {number[]|boolean} [maxExtent=false] - Extensión máxima del mapa definida por x mínima, y mínima, x máxima, y máxima, de forma que el centro del mapa nunca saldrá fuera de estos límites. 
     * Estos valores deben estar en las unidades definidas por el sistema de referencia de coordenadas del mapa (Ver propiedad `crs`).
     *
     * Si en vez de un array el valor es `false`, el mapa no tiene limitada la extensión máxima.
     * @property {boolean} [mouseWheelZoom=true] - Si se establece a un valor verdadero, la rueda de scroll del ratón se puede utilizar para hacer zoom en el mapa.
     * @property {boolean} [stateful=false] - Si se establece a un valor verdadero, el mapa mantiene un historial de estados 
     * añadiendo a la URL de la aplicación que lo contiene un código _hash_.
     * 
     * Con esta opción activa, el mapa puede pasar al estado previo o siguiente con los botones de historial del navegador. Así mismo, si se recarga la página el mapa conservará el estado en el que se encontraba.
     * @property {number} [pixelTolerance=10] - Tolerancia en pixels a las consultas de información de capa.
     *
     * En ciertas capas, por ejemplo las que representan geometrías de puntos, puede ser difícil pulsar precisamente en el punto donde está la entidad geográfica que interesa.
     * 
     * La propiedad `pixelTolerance` define un área de un número de pixels hacia cada lado del punto de pulsación, de forma que toda entidad geográfica que esté dentro de ese área, total o parcialmente, se incluye en el resultado de la consulta.
     * 
     * Por ejemplo, si el valor establecido es 10, toda entidad geográfica que esté dentro de un cuadrado de 21 pixels de lado (10 pixels por cuadrante más el pixel central) 
     * centrado en el punto de pulsación se mostrará en el resultado. A tener en cuenta: Esta propiedad establece el valor de los llamados *parámetros de vendedor* 
     * que los servidores de mapas admiten para modificar el comportamiento de las peticiones `getFeatureInfo` del standard WMS. Pero este comportamiento puede ser modificado también por otras circunstancias, 
     * como los estilos aplicados a las capas en el servidor.
     * 
     * Como estas circunstancias están fuera del ámbito de alcance de esta API, es posible que los resultados obtenidos desde algún servicio WMS sean inesperados en lo referente a `pixelTolerance`.
     * @property {string} [proxy] - URL del proxy utilizado para peticiones a dominios remotos.
     * 
     * Debido a restricciones de seguridad implementadas en Javascript, a través de `XMLHttpRequest` no es posible obtener información de dominios distintos al de la página web.
     * 
     * Hay dos maneras de solventar esta restricción. La primera es que el servidor remoto permita el acceso entre dominios estableciendo la cabecera `Access-Control-Allow-Origin` a la respuesta HTTP. 
     * Dado que esta solución la implementan terceras personas (los administradores del dominio remoto), no siempre es aplicable.
     * 
     * La segunda solución es desplegar en el dominio propio un proxy. Un proxy es un servicio que recibe peticiones HTTP y las redirige a otra URL.
     * 
     * Si la propiedad `proxy` está establecida, todas las peticiones a dominios remotos las mandará al proxy para que este las redirija. 
     * De esta manera no infringimos las reglas de seguridad de JavaScript, dado que el proxy está alojado en el dominio propio.
     * @property {StyleOptions} [styles] - Opciones de estilo de las entidades geográficas.
     * @property {LayerOptions[]} [workLayers] - Lista de objetos de definición de capa para incluir dichas capas como contenido activo del mapa.
     */

    TC.Defaults = (function () {

        var clusterRadii = {};
        var getClusterRadius = function (feature) {
            var count = feature.features.length;
            var result = clusterRadii[count];
            if (!result) {
                result = 2 + Math.round(Math.sqrt(count) * 5);
                clusterRadii[count] = result;
            }
            return result;
        };

        return {
            imageRatio: 1.05,
            proxy: '',

            crs: 'EPSG:25830',
            utmCrs: 'EPSG:25830',
            geoCrs: 'EPSG:4326',
            initialExtent: [541084.221, 4640788.225, 685574.4632, 4796618.764],
            maxExtent: false,
            baselayerExtent: [480408, 4599748, 742552, 4861892],
            resolutions: [1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, .5, .25],
            pointBoundsRadius: 30,
            extentMargin: 0.2,
            mouseWheelZoom: true,
            attribution: '<a href="http://sitna.navarra.es/" target="_blank">SITNA</a>',
            oldBrowserAlert: true,
            notifyApplicationErrors: false,
            loggingErrorsEnabled: true,
            maxErrorCount: 10,

            locale: 'es-ES',

            view: TC.Consts.view.DEFAULT,

            screenSize: 20,
            pixelTolerance: 10, // Used in GFI requests
            maxResolutionError: 0.01, // Max error ratio to consider two resolutions equivalent

            toastDuration: 5000,

            averageTileSize: 31000,

            availableBaseLayers: [
                {
                    id: TC.Consts.layer.IDENA_BASEMAP,
                    title: 'Mapa base',
                    type: TC.Consts.layerType.WMTS,
                    url: '//idena.navarra.es/ogc/wmts/',
                    matrixSet: 'epsg25830extended',
                    layerNames: 'mapabase',
                    encoding: TC.Consts.WMTSEncoding.RESTFUL,
                    format: 'image/png',
                    isDefault: true,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-basemap.png',
                    fallbackLayer: TC.Consts.layer.IDENA_DYNBASEMAP,
                    overviewMapLayer: TC.Consts.layer.IDENA_BASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_ORTHOPHOTO,
                    title: 'Ortofoto máxima actualidad',
                    type: TC.Consts.layerType.WMTS,
                    url: '//idena.navarra.es/ogc/wmts/',
                    matrixSet: 'epsg25830',
                    layerNames: 'ortofoto_maxima_actualidad',
                    encoding: TC.Consts.WMTSEncoding.RESTFUL,
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-orthophoto.jpg',
                    fallbackLayer: TC.Consts.layer.IDENA_DYNORTHOPHOTO,
                    overviewMapLayer: TC.Consts.layer.IDENA_BASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_ORTHOPHOTO2020,
                    title: 'Ortofoto 2020',
                    type: TC.Consts.layerType.WMTS,
                    url: '//idena.navarra.es/ogc/wmts/',
                    matrixSet: 'epsg25830',
                    layerNames: 'ortofoto2020',
                    encoding: TC.Consts.WMTSEncoding.RESTFUL,
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-ortho2020.jpg',
                    fallbackLayer: TC.Consts.layer.IDENA_DYNORTHOPHOTO2020,
                    overviewMapLayer: TC.Consts.layer.IDENA_BASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_ORTHOPHOTO2019,
                    title: 'Ortofoto 2019',
                    type: TC.Consts.layerType.WMTS,
                    url: '//idena.navarra.es/ogc/wmts/',
                    matrixSet: 'epsg25830',
                    layerNames: 'ortofoto2019',
                    encoding: TC.Consts.WMTSEncoding.RESTFUL,
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-ortho2019.jpg',
                    fallbackLayer: TC.Consts.layer.IDENA_DYNORTHOPHOTO2019,
                    overviewMapLayer: TC.Consts.layer.IDENA_BASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_ORTHOPHOTO2018,
                    title: 'Ortofoto 2018',
                    type: TC.Consts.layerType.WMTS,
                    url: '//idena.navarra.es/ogc/wmts/',
                    matrixSet: 'epsg25830',
                    layerNames: 'ortofoto2018',
                    encoding: TC.Consts.WMTSEncoding.RESTFUL,
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-ortho2018.jpg',
                    fallbackLayer: TC.Consts.layer.IDENA_DYNORTHOPHOTO2018,
                    overviewMapLayer: TC.Consts.layer.IDENA_BASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_ORTHOPHOTO2017,
                    title: 'Ortofoto 2017',
                    type: TC.Consts.layerType.WMTS,
                    url: '//idena.navarra.es/ogc/wmts/',
                    matrixSet: 'epsg25830',
                    layerNames: 'ortofoto2017',
                    encoding: TC.Consts.WMTSEncoding.RESTFUL,
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-ortho2017.jpg',
                    fallbackLayer: TC.Consts.layer.IDENA_DYNORTHOPHOTO2017,
                    overviewMapLayer: TC.Consts.layer.IDENA_BASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_ORTHOPHOTO2014,
                    title: 'Ortofoto 2014',
                    type: TC.Consts.layerType.WMTS,
                    url: '//idena.navarra.es/ogc/wmts/',
                    matrixSet: 'epsg25830reduced',
                    layerNames: 'ortofoto2014',
                    encoding: TC.Consts.WMTSEncoding.RESTFUL,
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-ortho2014.jpg',
                    fallbackLayer: TC.Consts.layer.IDENA_DYNORTHOPHOTO2014,
                    overviewMapLayer: TC.Consts.layer.IDENA_BASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_ORTHOPHOTO2012,
                    title: 'Ortofoto 2012',
                    type: TC.Consts.layerType.WMTS,
                    url: '//idena.navarra.es/ogc/wmts/',
                    matrixSet: 'epsg25830',
                    layerNames: 'ortofoto2012',
                    encoding: TC.Consts.WMTSEncoding.RESTFUL,
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-ortho2012.jpg',
                    fallbackLayer: TC.Consts.layer.IDENA_DYNORTHOPHOTO2012,
                    overviewMapLayer: TC.Consts.layer.IDENA_BASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_PAMPLONA_ORTHOPHOTO2020,
                    title: 'Ortofoto comarca de Pamplona 2020',
                    type: TC.Consts.layerType.WMTS,
                    url: '//idena.navarra.es/ogc/wmts/',
                    matrixSet: 'epsg25830deep',
                    layerNames: 'ortofotoPamplona2020',
                    encoding: TC.Consts.WMTSEncoding.RESTFUL,
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-ortho-pamplona2020.jpg',
                    fallbackLayer: TC.Consts.layer.IDENA_PAMPLONA_DYNORTHOPHOTO2020,
                    overviewMapLayer: TC.Consts.layer.IDENA_BASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_CARTO,
                    title: 'Cartografía topográfica 2017',
                    type: TC.Consts.layerType.WMTS,
                    url: '//idena.navarra.es/ogc/wmts/',
                    matrixSet: 'epsg25830',
                    layerNames: 'mapaTopografico',
                    encoding: TC.Consts.WMTSEncoding.RESTFUL,
                    format: 'image/png',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-bta.png',
                    fallbackLayer: TC.Consts.layer.IDENA_DYNCARTO,
                    overviewMapLayer: TC.Consts.layer.IDENA_BASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_CADASTER,
                    title: 'Catastro',
                    type: TC.Consts.layerType.WMS,
                    url: '//idena.navarra.es/ogc/wms',
                    layerNames: 'catastro,regionesFronterizas',
                    format: 'image/png',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-cadaster.png',
                    overviewMapLayer: TC.Consts.layer.IDENA_BASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_BW_RELIEF,
                    title: 'Relieve',
                    type: TC.Consts.layerType.WMS,
                    url: '//idena.navarra.es/ogc/wms',
                    layerNames: 'IDENA:mapa_relieve_bn',
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-relief_bw.jpg',
                    overviewMapLayer: TC.Consts.layer.IDENA_BASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_BASEMAP_ORTHOPHOTO,
                    title: 'Mapa base/ortofoto',
                    type: TC.Consts.layerType.WMS,
                    url: '//idena.navarra.es/ogc/wms',
                    layerNames: 'mapaBase_orto',
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-base_ortho.png',
                    overviewMapLayer: TC.Consts.layer.IDENA_BASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_DYNBASEMAP,
                    title: 'Mapa base',
                    type: TC.Consts.layerType.WMS,
                    url: '//idena.navarra.es/ogc/wms',
                    layerNames: 'mapaBase,regionesFronterizas',
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-basemap.png',
                    overviewMapLayer: TC.Consts.layer.IDENA_DYNBASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_DYNORTHOPHOTO,
                    title: 'Ortofoto máxima actualidad',
                    type: TC.Consts.layerType.WMS,
                    url: '//idena.navarra.es/ogc/wms',
                    layerNames: 'ortofoto_maxima_actualidad',
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-orthophoto.jpg',
                    overviewMapLayer: TC.Consts.layer.IDENA_DYNBASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_DYNORTHOPHOTO2020,
                    title: 'Ortofoto 2020',
                    type: TC.Consts.layerType.WMS,
                    url: '//idena.navarra.es/ogc/wms',
                    layerNames: 'ortofoto_5000_2020',
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-ortho2020.jpg',
                    overviewMapLayer: TC.Consts.layer.IDENA_DYNBASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_DYNORTHOPHOTO2019,
                    title: 'Ortofoto 2019',
                    type: TC.Consts.layerType.WMS,
                    url: '//idena.navarra.es/ogc/wms',
                    layerNames: 'ortofoto_5000_2019',
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-ortho2019.jpg',
                    overviewMapLayer: TC.Consts.layer.IDENA_DYNBASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_DYNORTHOPHOTO2018,
                    title: 'Ortofoto 2018',
                    type: TC.Consts.layerType.WMS,
                    url: '//idena.navarra.es/ogc/wms',
                    layerNames: 'ortofoto_5000_2018',
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-ortho2018.jpg',
                    overviewMapLayer: TC.Consts.layer.IDENA_DYNBASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_DYNORTHOPHOTO2017,
                    title: 'Ortofoto 2017',
                    type: TC.Consts.layerType.WMS,
                    url: '//idena.navarra.es/ogc/wms',
                    layerNames: 'ortofoto_5000_2017',
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-ortho2017.jpg',
                    overviewMapLayer: TC.Consts.layer.IDENA_DYNBASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_DYNORTHOPHOTO2014,
                    title: 'Ortofoto 2014',
                    type: TC.Consts.layerType.WMS,
                    url: '//idena.navarra.es/ogc/wms',
                    layerNames: 'ortofoto_5000_2014',
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-ortho2014.jpg',
                    overviewMapLayer: TC.Consts.layer.IDENA_DYNBASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_DYNORTHOPHOTO2012,
                    title: 'Ortofoto 2012',
                    type: TC.Consts.layerType.WMS,
                    url: '//idena.navarra.es/ogc/wms',
                    layerNames: 'ortofoto_5000_2012',
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-ortho2012.jpg',
                    overviewMapLayer: TC.Consts.layer.IDENA_DYNBASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_PAMPLONA_DYNORTHOPHOTO2020,
                    title: 'Ortofoto comarca de Pamplona 2020',
                    type: TC.Consts.layerType.WMS,
                    url: '//idena.navarra.es/ogc/wms',
                    layerNames: 'ortofoto_500_Pamplona_2020',
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-ortho-pamplona2020.jpg',
                    overviewMapLayer: TC.Consts.layer.IDENA_DYNBASEMAP
                },
                {
                    id: TC.Consts.layer.IDENA_DYNCARTO,
                    title: 'Cartografía topográfica 2017',
                    type: TC.Consts.layerType.WMS,
                    url: '//idena.navarra.es/ogc/wms',
                    layerNames: 'MTNa5_BTA',
                    format: 'image/png',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-bta.png',
                    overviewMapLayer: TC.Consts.layer.IDENA_DYNBASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_ES_CARTO,
                    type: TC.Consts.layerType.WMTS,
                    title: "Cartografía raster \r\n (IGN ES)",
                    url: "//www.ign.es/wmts/mapa-raster",
                    encoding: TC.Consts.WMTSEncoding.KVP,
                    layerNames: "MTN",
                    matrixSet: "EPSG:25830",
                    format: "image/jpeg",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-carto_ign.png",
                    fallbackLayer: TC.Consts.layer.IGN_ES_DYNCARTO,
                    overviewMapLayer: TC.Consts.layer.IGN_ES_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_ES_BASEMAP,
                    title: "Callejero \r\n (IGN ES)",
                    type: TC.Consts.layerType.WMTS,
                    url: "//www.ign.es/wmts/ign-base",
                    encoding: TC.Consts.WMTSEncoding.KVP,
                    layerNames: "IGNBaseTodo",
                    matrixSet: "EPSG:25830",
                    format: "image/jpeg",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-basemap_ign.png",
                    fallbackLayer: TC.Consts.layer.IGN_ES_DYNBASEMAP,
                    overviewMapLayer: TC.Consts.layer.IGN_ES_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_ES_BASEMAP_GREY,
                    title: "Callejero gris \r\n (IGN ES)",
                    type: TC.Consts.layerType.WMTS,
                    url: "//www.ign.es/wmts/ign-base",
                    encoding: TC.Consts.WMTSEncoding.KVP,
                    layerNames: "IGNBase-gris",
                    matrixSet: "GoogleMapsCompatible",
                    format: "image/jpeg",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-basemap_grey_ign.png",
                    fallbackLayer: TC.Consts.layer.IGN_ES_DYNBASEMAP_GREY,
                    overviewMapLayer: TC.Consts.layer.IGN_ES_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_ES_RELIEF,
                    title: "Relieve \r\n (IGN ES)",
                    type: TC.Consts.layerType.WMTS,
                    url: "//servicios.idee.es/wmts/mdt",
                    encoding: TC.Consts.WMTSEncoding.KVP,
                    layerNames: "Relieve",
                    matrixSet: "EPSG:25830",
                    format: "image/jpeg",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-relief_ign.jpg",
                    fallbackLayer: TC.Consts.layer.IGN_ES_DYNRELIEF,
                    overviewMapLayer: TC.Consts.layer.IGN_ES_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_ES_ORTHOPHOTO,
                    title: "Ortofoto PNOA",
                    type: TC.Consts.layerType.WMTS,
                    url: "//www.ign.es/wmts/pnoa-ma",
                    encoding: TC.Consts.WMTSEncoding.KVP,
                    layerNames: "OI.OrthoimageCoverage",
                    matrixSet: "EPSG:25830",
                    format: "image/jpeg",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-orthophoto_pnoa.jpg",
                    fallbackLayer: TC.Consts.layer.IGN_ES_DYNORTHOPHOTO,
                    overviewMapLayer: TC.Consts.layer.IGN_ES_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_ES_LIDAR,
                    title: "Modelo digital LIDAR (IGN ES)",
                    type: TC.Consts.layerType.WMTS,
                    url: "//wmts-mapa-lidar.idee.es/lidar",
                    encoding: TC.Consts.WMTSEncoding.KVP,
                    layerNames: "EL.GridCoverageDSM",
                    matrixSet: "GoogleMapsCompatible",
                    format: "image/png",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-lidar_ign.jpg",
                    fallbackLayer: TC.Consts.layer.IGN_ES_DYNLIDAR,
                    overviewMapLayer: TC.Consts.layer.IGN_ES_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_ES_DYNBASEMAP,
                    title: 'Callejero \r\n (IGN ES)',
                    type: TC.Consts.layerType.WMS,
                    url: '//www.ign.es/wms-inspire/ign-base',
                    layerNames: 'IGNBaseTodo',
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-basemap_ign.png',
                    overviewMapLayer: TC.Consts.layer.IGN_ES_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_ES_DYNBASEMAP_GREY,
                    title: 'Callejero gris \r\n (IGN ES)',
                    type: TC.Consts.layerType.WMS,
                    url: '//www.ign.es/wms-inspire/ign-base',
                    layerNames: 'IGNBaseTodo-gris',
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-basemap_grey_ign.png',
                    overviewMapLayer: TC.Consts.layer.IGN_ES_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_ES_DYNORTHOPHOTO,
                    title: 'Ortofoto PNOA',
                    type: TC.Consts.layerType.WMS,
                    url: '//www.ign.es/wms-inspire/pnoa-ma',
                    layerNames: 'OI.OrthoimageCoverage',
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-orthophoto_pnoa.jpg',
                    overviewMapLayer: TC.Consts.layer.IGN_ES_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_ES_DYNCARTO,
                    title: 'Cartografía raster \r\n (IGN ES)',
                    type: TC.Consts.layerType.WMS,
                    url: '//www.ign.es/wms-inspire/mapa-raster',
                    layerNames: 'mtn_rasterizado',
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-carto_ign.png',
                    overviewMapLayer: TC.Consts.layer.IGN_ES_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_ES_DYNRELIEF,
                    title: 'Relieve \r\n (IGN ES)',
                    type: TC.Consts.layerType.WMS,
                    url: '//servicios.idee.es/wms-inspire/mdt',
                    layerNames: 'EL.GridCoverage',
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-relief_ign.jpg',
                    overviewMapLayer: TC.Consts.layer.IGN_ES_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_ES_DYNLIDAR,
                    title: 'Modelo digital LIDAR (IGN ES)',
                    type: TC.Consts.layerType.WMS,
                    url: '//wms-mapa-lidar.idee.es/lidar',
                    layerNames: 'EL.GridCoverage',
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-lidar_ign.jpg",
                    overviewMapLayer: TC.Consts.layer.IGN_ES_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_FR_CARTO,
                    title: "Cartografía raster \r\n (IGN FR)",
                    type: TC.Consts.layerType.WMTS,
                    url: "//wxs.ign.fr/njfzwf3vgc55gekk8ra4zezx/geoportail/wmts",
                    encoding: TC.Consts.WMTSEncoding.KVP,
                    layerNames: "GEOGRAPHICALGRIDSYSTEMS.MAPS",
                    matrixSet: "PM",
                    format: "image/jpeg",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-carto-fr-ign.png",
                    fallbackLayer: TC.Consts.layer.IGN_FR_DYNCARTO,
                    ignoreProxification: true,
                    overviewMapLayer: TC.Consts.layer.IGN_FR_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_FR_BASEMAP,
                    title: "Mapa base \r\n (IGN FR)",
                    type: TC.Consts.layerType.WMTS,
                    url: "//wxs.ign.fr/essentiels/geoportail/wmts",
                    encoding: TC.Consts.WMTSEncoding.KVP,
                    layerNames: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
                    matrixSet: "PM",
                    format: "image/png",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-base-fr-ign.png",
                    fallbackLayer: TC.Consts.layer.IGN_FR_DYNBASEMAP,
                    ignoreProxification: true,
                    overviewMapLayer: TC.Consts.layer.IGN_FR_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_FR_RELIEF,
                    title: "Relieve \r\n (IGN FR)",
                    type: TC.Consts.layerType.WMTS,
                    url: "//wxs.ign.fr/altimetrie/geoportail/wmts",
                    encoding: TC.Consts.WMTSEncoding.KVP,
                    layerNames: "ELEVATION.ELEVATIONGRIDCOVERAGE.SHADOW",
                    matrixSet: "PM",
                    format: "image/png",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-estom-fr-ign.jpg",
                    fallbackLayer: TC.Consts.layer.IGN_FR_DYNRELIEF,
                    ignoreProxification: true,
                    overviewMapLayer: TC.Consts.layer.IGN_FR_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_FR_ORTHOPHOTO,
                    title: "Ortofoto \r\n (IGN FR)",
                    type: TC.Consts.layerType.WMTS,
                    url: "//wxs.ign.fr/essentiels/geoportail/wmts",
                    encoding: TC.Consts.WMTSEncoding.KVP,
                    layerNames: "ORTHOIMAGERY.ORTHOPHOTOS",
                    matrixSet: "PM",
                    format: "image/jpeg",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-ortho-fr-ign.jpg",
                    fallbackLayer: TC.Consts.layer.IGN_FR_DYNORTHOPHOTO,
                    ignoreProxification: true,
                    overviewMapLayer: TC.Consts.layer.IGN_FR_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_FR_DYNCARTO,
                    title: 'Cartografía raster \r\n (IGN FR)',
                    type: TC.Consts.layerType.WMS,
                    url: "//wxs.ign.fr/njfzwf3vgc55gekk8ra4zezx/geoportail/r/wms",
                    layerNames: "GEOGRAPHICALGRIDSYSTEMS.MAPS",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-carto-fr-ign.png",
                    ignoreProxification: true,
                    overviewMapLayer: TC.Consts.layer.IGN_FR_BASEMAP,
                },
                {
                    id: TC.Consts.layer.IGN_FR_DYNBASEMAP,
                    title: 'Mapa base \r\n (IGN FR)',
                    type: TC.Consts.layerType.WMS,
                    url: "//wxs.ign.fr/essentiels/geoportail/r/wms",
                    layerNames: "GEOGRAPHICALGRIDSYSTEMS.PLANIGN",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-base-fr-ign.png",
                    ignoreProxification: true,
                    overviewMapLayer: TC.Consts.layer.IGN_FR_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_FR_DYNRELIEF,
                    title: 'Relieve \r\n (IGN FR)',
                    type: TC.Consts.layerType.WMS,
                    url: "//wxs.ign.fr/altimetrie/geoportail/r/wms",
                    layerNames: "ELEVATION.ELEVATIONGRIDCOVERAGE.SHADOW",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-estom-fr-ign.jpg",
                    ignoreProxification: true,
                    overviewMapLayer: TC.Consts.layer.IGN_FR_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_FR_DYNORTHOPHOTO,
                    title: 'Ortofoto \r\n (IGN FR)',
                    type: TC.Consts.layerType.WMS,
                    url: "//wxs.ign.fr/essentiels/geoportail/r/wms",
                    layerNames: "ORTHOIMAGERY.ORTHOPHOTOS",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-ortho-fr-ign.jpg",
                    ignoreProxification: true,
                    overviewMapLayer: TC.Consts.layer.IGN_FR_BASEMAP
                },
                {
                    id: TC.Consts.layer.OSM,
                    title: 'OSM',
                    type: TC.Consts.layerType.WMTS,
                    url: TC.apiLocation + 'wmts/osm/',
                    matrixSet: 'WorldWebMercatorQuad',
                    layerNames: 'osm',
                    encoding: TC.Consts.WMTSEncoding.RESTFUL,
                    format: 'image/png',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-osm.png',
                    overviewMapLayer: TC.Consts.layer.OSM
                },
                {
                    id: TC.Consts.layer.CARTO_VOYAGER,
                    title: 'CARTO Voyager',
                    type: TC.Consts.layerType.WMTS,
                    url: TC.apiLocation + 'wmts/carto/',
                    matrixSet: 'WorldWebMercatorQuad',
                    layerNames: 'voyager',
                    encoding: TC.Consts.WMTSEncoding.RESTFUL,
                    format: 'image/png',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-carto-voyager.png',
                    overviewMapLayer: TC.Consts.layer.CARTO_VOYAGER
                },
                {
                    id: TC.Consts.layer.CARTO_LIGHT,
                    title: 'CARTO light',
                    type: TC.Consts.layerType.WMTS,
                    url: TC.apiLocation + 'wmts/carto/',
                    matrixSet: 'WorldWebMercatorQuad',
                    layerNames: 'light_all',
                    encoding: TC.Consts.WMTSEncoding.RESTFUL,
                    format: 'image/png',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-carto-light.png',
                    overviewMapLayer: TC.Consts.layer.CARTO_VOYAGER
                },
                {
                    id: TC.Consts.layer.CARTO_DARK,
                    title: 'CARTO dark',
                    type: TC.Consts.layerType.WMTS,
                    url: TC.apiLocation + 'wmts/carto/',
                    matrixSet: 'WorldWebMercatorQuad',
                    layerNames: 'dark_all',
                    encoding: TC.Consts.WMTSEncoding.RESTFUL,
                    format: 'image/png',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-carto-dark.png',
                    overviewMapLayer: TC.Consts.layer.CARTO_VOYAGER
                },
                {
                    id: TC.Consts.layer.MAPBOX_STREETS,
                    title: 'Mapbox Streets',
                    type: TC.Consts.layerType.WMTS,
                    url: TC.apiLocation + 'wmts/mapbox/',
                    matrixSet: 'WorldWebMercatorQuad',
                    layerNames: 'streets',
                    encoding: TC.Consts.WMTSEncoding.RESTFUL,
                    format: 'image/png',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-mapbox-streets.png',
                    overviewMapLayer: TC.Consts.layer.MAPBOX_STREETS
                },
                {
                    id: TC.Consts.layer.MAPBOX_SATELLITE,
                    title: 'Mapbox Satellite',
                    type: TC.Consts.layerType.WMTS,
                    url: TC.apiLocation + 'wmts/mapbox/',
                    matrixSet: 'WorldWebMercatorQuad',
                    layerNames: 'satellite',
                    encoding: TC.Consts.WMTSEncoding.RESTFUL,
                    format: 'image/jpeg',
                    isDefault: false,
                    hideTree: true,
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-mapbox-satellite.jpg',
                    overviewMapLayer: TC.Consts.layer.MAPBOX_STREETS
                },
                {
                    id: TC.Consts.layer.BLANK,
                    title: 'Mapa en blanco',
                    type: TC.Consts.layerType.VECTOR
                }
            ],

            baseLayers: [
                TC.Consts.layer.IDENA_BASEMAP,
                TC.Consts.layer.IDENA_ORTHOPHOTO,
                TC.Consts.layer.IDENA_CADASTER,
                TC.Consts.layer.IDENA_CARTO
            ],

            defaultBaseLayer: TC.Consts.layer.IDENA_BASEMAP,

            workLayers: [],

            /**
             * Opciones de clustering de puntos de una capa, define si los puntos se tienen que agrupar cuando están más cerca entre sí que un valor umbral.
             *
             * Hay que tener en cuenta que el archivo `config.json` de una maquetación puede sobreescribir los valores por defecto de esta propiedad 
             * (para ver instrucciones de uso de maquetaciones, consultar {@tutorial layout_cfg}).
             * @typedef ClusterOptions
             * @property {number} distance - Distancia en píxels que tienen que tener como máximo los puntos entre sí para que se agrupen en un cluster.
             * @property {boolean} [animate] - Si se establece a `true`, los puntos se agrupan y desagrupan con una transición animada.
             * @property {ClusterStyleOptions} [styles] - Opciones de estilo de los clusters.
             * @example <caption>[Ver en vivo](../examples/cfg.LayerOptions.cluster.html)</caption> {@lang html}
             * <div id="mapa"></div>
             * <script>
             *     // Creamos un mapa con una capa de puntos de un KML,
             *     // clustering activado a 50 pixels y transiciones animadas.
             *     var map = new SITNA.Map("mapa", {
             *         workLayers: [
             *             {
             *                 id: "cluster",
             *                 type: SITNA.Consts.layerType.KML,
             *                 url: "data/PromocionesViviendas.kml",
             *                 title: "Clusters",
             *                 cluster: {
             *                     distance: 50,
             *                     animate: true
             *                 }
             *             }
             *         ]
             *     });
             * </script>
             */

            /**
             * Opciones de capa. Este objeto se utiliza en al [configurar un mapa]{@linkplain MapOptions}, el [control del catálogo de capas]{@linkplain LayerCatalogOptions} 
             * o como parámetro al [añadir una capa]{@linkplain SITNA.Map#addLayer}.
             * @typedef LayerOptions
             * @see MapOptions
             * @see LayerCatalogOptions
             * @see SITNA.Map#addLayer
             * @see SITNA.Map#setBaseLayer
             * @property {string} id - Identificador único de capa. No puede haber en un mapa dos capas con el mismo valor de `id`.
             * @property {ClusterOptions} [cluster] - La capa agrupa sus entidades puntuales cercanas entre sí en grupos (clusters). 
             * Aplicable a capas de tipo [VECTOR]{@link SITNA.Consts.layerType.VECTOR}, [WFS]{@link SITNA.Consts.layerType.WFS} y [KML]{@link SITNA.Consts.layerType.KML}.
             * @property {string} [filter] - Aplicable a capas de tipo [WMS]{@link SITNA.Consts.layerType.WMS}. Filtro en formato GML o <a href="https://docs.geoserver.org/latest/en/user/tutorials/cql/cql_tutorial.html" target="_blank">CQL</a>. En función del formato especificado, se añade a las peticiones GetMap posteriores el parámetro <a href="https://docs.geoserver.org/latest/en/user/services/wms/vendor.html#filter" target="_blank">filter</a> o <a href="https://docs.geoserver.org/latest/en/user/services/wms/vendor.html#cql-filter" target="_blank">cql_filter</a> correspondiente.
             *
             * No se pueden añadir al mapa 2 o más capas del mismo servicio (misma URL), en las cuales se establezcan filtros de tipo distinto. Es decir, no se pueden mezclar filtros CQL y GML en capas del mismo servicio.
             * @property {string} [format] - En las capas de tipo [WMS]{@link SITNA.Consts.layerType.WMS} y [WMTS]{@link SITNA.Consts.layerType.WMTS},
             * es el tipo MIME del formato de archivo de imagen a obtener del servicio. En las capas de tipo [VECTOR]{@link SITNA.Consts.layerType.VECTOR}, es el tipo MIME
             * del formato de archivo de datos geográficos que queremos cargar (GeoJSON, KML, etc.).
             * 
             * Si esta propiedad no está definida, si la capa es un mapa de fondo (consultar propiedad `isBase`), se asume que el formato es `image/jpeg`, en caso contrario se asume que el formato es `image/png`.
             *
             * Para asignar valor a esta propiedad se puede usar las constantes de definidas en {@link SITNA.Consts.mimeType}.
             * @property {boolean} [hideTree] - Aplicable a capas de tipo [WMS]{@link SITNA.Consts.layerType.WMS} y [KML]{@link SITNA.Consts.layerType.KML}.
             * Si se establece a `true`, la capa no muestra la jerarquía de grupos de capas en la tabla de contenidos ni en la leyenda.
             * @property {boolean} [isBase] - Si se establece a `true`, la capa es un mapa de fondo.
             * @property {boolean} [isDefault] - *__Obsoleta__: En lugar de esta propiedad es recomendable usar la propiedad `defaultBaseLayer`de {@link MapOptions}.*
             * 
             * Si se establece a true, la capa se muestra por defecto si forma parte de los mapas de fondo.
             * @property {string} [layerNames] - Lista separada por comas de los nombres de capa del servicio OGC. Aplicable a capas de tipo [WMS]{@link SITNA.Consts.layerType.WMS} y [WMTS]{@link SITNA.Consts.layerType.WMTS}.
             * @property {string} [matrixSet] - Nombre de grupo de matrices del servicio WMTS. Propiedad obligatoria para capas de tipo [WMTS]{@link SITNA.Consts.layerType.WMTS}.
             * @property_ {LayerOptions|string} [overviewMapLayer] - Definición de la capa que se utilizará como fondo en el control de mapa de situación cuando esta capa está de fondo en el mapa principal.
             * Si el valor es de tipo `string`, tiene que ser un identificador de capas de la API SITNA (un miembro de {@link SITNA.Consts.layer}).
             * 
             * La capa del mapa de situación debe ser compatible con el sistema de referencia de coordenadas del mapa principal (ver propiedad `crs` de {@link MapOptions}).
             * @property {boolean} [stealth] - Si se establece a `true`, la capa no aparece en la tabla de contenidos ni en la leyenda.
             * De este modo se puede añadir una superposición de capas de trabajo que el usuario la perciba como parte del mapa de fondo.
             * @property {StyleOptions} [styles] - Descripción de los estilos que tendrán las entidades geográficas de la capa.
             * 
             * Esta propiedad solamente se tiene en cuenta en capas de tipo [VECTOR]{@link SITNA.Consts.layerType.VECTOR}, [WFS]{@link SITNA.Consts.layerType.WFS} 
             * y [KML]{@link SITNA.Consts.layerType.KML}.
             * @property {string} [thumbnail] - URL de una imagen en miniatura a mostrar en el selector de mapas de fondo.
             * @property {string} [title] - Título de capa. Este valor se mostrará en la tabla de contenidos y la leyenda.
             * @property {string} [type] - Tipo de capa. Si no se especifica se considera que la capa es WMS. La lista de valores posibles está definida en {@link SITNA.Consts.layerType}.
             * @property {string} [url] - URL del servicio OGC o del archivo de datos geográficos que define la capa. Propiedad obligatoria en capas de tipo [WMS]{@link SITNA.Consts.layerType.WMS},
             * [WMTS]{@link SITNA.Consts.layerType.WMTS}, [WFS]{@link SITNA.Consts.layerType.WFS} y [KML]{@link SITNA.Consts.layerType.KML}.
             * 
             * En las capas de tipo [VECTOR]{@link SITNA.Consts.layerType.VECTOR} los archivos de datos geográficos soportados son KML, GeoJSON, GPX, GML, WKT y TopoJSON.
             * El formato se deduce de la extensión del nombre de archivo, pero también se puede especificar utilizando la propiedad `format`.
             *
             * En el caso de que un fichero KML tenga definido el <a target="_blank" href="https://developers.google.com/kml/documentation/kmlreference#balloonstyle">estilo del bocadillo</a>, este formato será usado al renderizar el bocadillo en visores basados en la API SITNA.
             * @example <caption>Ejemplo de uso de la propiedad `url` - [Ver en vivo](../examples/cfg.LayerOptions.url.html)</caption> {@lang html}
             * <div id="mapa"></div>
             * <script>
             *     // Establecemos un layout simplificado apto para hacer demostraciones de controles.
             *     SITNA.Cfg.layout = "layout/ctl-container";
             *     // Añadimos el control de tabla de contenidos en la primera posición.
             *     SITNA.Cfg.controls.TOC = {
             *         div: "slot1"
             *     };
             *     // Añadimos una capa raster desde un servicio WMS y cuatro capas vectoriales
             *     // a partir de archivos geográficos: GeoJSON, GPX, KML y GML.
             *     SITNA.Cfg.workLayers = [
             *         {
             *             id: "wms",
             *             title: "Camino de Santiago",
             *             type: SITNA.Consts.layerType.WMS,
             *             url: "//idena.navarra.es/ogc/wms",
             *             layerNames: "IDENA:PATRIM_Lin_CaminoSantR",
             *             format: SITNA.Consts.mimeType.PNG
             *         },
             *         {
             *             id: "geojson",
             *             type: SITNA.Consts.layerType.VECTOR,
             *             url: "data/PARQUESNATURALES.json",
             *             format: SITNA.Consts.mimeType.GEOJSON
             *         },
             *         {
             *             id: "gpx",
             *             type: SITNA.Consts.layerType.VECTOR,
             *             url: "data/CAMINOFRANCES.gpx"
             *         },
             *         {
             *             id: "kml",
             *             type: SITNA.Consts.layerType.VECTOR,
             *             url: "data/MUSEOSNAVARRA.kml"
             *         },
             *         {
             *             id: "gml",
             *             type: SITNA.Consts.layerType.VECTOR,
             *             url: "data/ESTACIONESTREN.gml"
             *         },
             *     ];
             *     var map = new SITNA.Map("mapa");
             * </script>
             * @example <caption>Ejemplo de uso de la propiedad `filter` - [Ver en vivo](../examples/cfg.LayerOptions.filter.html)</caption> {@lang html}
             * <div id="mapa"></div>
             * <script>
             * // Establecemos un layout simplificado apto para hacer demostraciones de controles.
             * SITNA.Cfg.layout = "layout/ctl-container";
             * // Añadimos el control de tabla de contenidos en la primera posición.
             * SITNA.Cfg.controls.TOC = {
             *     div: "slot1"
             * };
             * // Añadimos la capa de IDENA de "Estaciones de aforo del Gobierno de Navarra" cuyo titular es "Gobierno de Navarra"
             * // Y añadimos la capa "Estaciones meteorológicas" de IDENA mostrando solo aquellas que están por encima de 1000 m.
             * SITNA.Cfg.workLayers = [
             *     {
             *         id: "layer1",
             *         title: "Estaciones de aforo del Gobierno de Navarra",
             *         type: SITNA.Consts.layerType.WMS,
             *         url: "//idena.navarra.es/ogc/wms",
             *         layerNames: "IDENA:HIDROG_Sym_EstacAforo",
             *         filter: '<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc"><ogc:PropertyIsEqualTo><ogc:PropertyName>TITULAR</ogc:PropertyName><ogc:Literal><![CDATA[Gobierno de Navarra]]></ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter>'
             *     },
             *     {
             *         id: "layer2",
             *         title: "Estaciones meteorológicas por encima de 1000m",
             *         type: SITNA.Consts.layerType.WMS,
             *         url: "//idena.navarra.es/ogc/wms",
             *         layerNames: "IDENA:estacMeteor",
             *         filter: 'ALTITUD>1000'
             *     }
             * ];
             * var map = new SITNA.Map("mapa");
             * </script>
             * @example_ <caption>Ejemplo de uso de la propiedad `overviewMapLayer` - [Ver en vivo](../examples/cfg.LayerOptions.overviewMapLayer.html)</caption> {@lang html}
             * <div id="mapa"></div>
             * <script>
             *     // Añadimos una capas de fondo con capas asociadas para el mapa de situación
             *     SITNA.Cfg.baseLayers = [
             *         {
             *             id: "hybrid",
             *             title: "Mapa base/ortofoto",
             *             type: SITNA.Consts.layerType.WMS,
             *             url: "//idena.navarra.es/ogc/wms",
             *             layerNames: "mapaBase_orto",
             *             thumbnail: "//idena.navarra.es/navegar/api/TC/css/img/thumb-base_ortho.png",
             *             overviewMapLayer: {
             *                 id: "hybrid_ov",
             *                 type: SITNA.Consts.layerType.WMS,
             *                 url: "//www.ign.es/wms-inspire/ign-base",
             *                 layerNames: "IGNBaseTodo-gris"
             *             }
             *         },
             *         {
             *             id: "mapbox",
             *             title: "Mapbox Streets",
             *             type: SITNA.Consts.layerType.WMTS,
             *             encoding: SITNA.Consts.WMTSEncoding.RESTFUL,
             *             url: "//idena.navarra.es/navegar/api/wmts/mapbox/",
             *             format: SITNA.Consts.mimeType.PNG,
             *             layerNames: "streets",
             *             matrixSet: "WorldWebMercatorQuad",
             *             thumbnail: "//idena.navarra.es/navegar/api/TC/css/img/thumb-mapbox-streets.png",
             *             overviewMapLayer: SITNA.Consts.layer.CARTO_DARK
             *         }
             *     ];
             *     var map = new SITNA.Map("mapa");
             * </script>
             */

            /**
            * Opciones de vista de mapa, define qué controles se incluyen en una vista y qué opciones se pasan a cada vista. Las opciones de los controles se heredan de {@link MapControlOptions}.
            * @typedef MapViewOptions
            * @see MapOptions
            * @property {ViewOptions} [threeD] - Se establece un valor *truthy* con las opciones de la vista del mapa.
            */

            /**
            * Opciones de controles de mapa, define qué controles se incluyen en un mapa y qué opciones se pasan a cada control.
            * @typedef MapControlOptions
            * @see MapOptions
            * @property {boolean|ControlOptions} [attribution=true] - Si se establece a un valor *truthy*, el mapa tiene atribución. 
            * @property {boolean|ControlOptions} [basemapSelector=false] - Si se establece a un valor *truthy*, el mapa tiene un selector de mapas de fondo.
            * @property {boolean|ClickOptions} [click=false] - Si se establece a un valor *truthy*, el mapa tiene un control que gestiona los clics del usuario sobre su ventana de visualización.
            * La atribución es un texto superpuesto al mapa que actúa como reconocimiento de la procedencia de los datos que se muestran.
            * @property {boolean|CoordinatesOptions} [coordinates=true] - Si se establece a un valor *truthy*, el mapa tiene un indicador de coordenadas y de sistema de referencia espacial.
            * @property {boolean|DataLoaderOptions} [dataLoader=false] - Si se establece a un valor *truthy*,  se muestra un control para añadir datos externos, en concreto servicios WMS y archivos locales de datos geográficos.
            * 
            * Hay más información sobre el funcionamiento del control en la página de documentación de {@link DataLoaderOptions}.
            * @property_ {boolean|TabContainerOptions} [download=false] - Si se establece a un valor *truthy*, el mapa tiene un control que permite descargar la imagen actual del mapa o las capas cargadas como un archivo de datos vectoriales.
            * Para llevar a cabo esta segunda operación, es necesario que las capas del mapa tengan asociado un servicio WFS al servicio WMS que muestra las entidades en el mapa (software como GeoServer realiza esto automáticamente).
            * El control infiere la URL del servicio WFS a partir de la [operación DescribeLayer del estándar WMS-SLD](https://docs.geoserver.org/latest/en/user/services/wms/reference.html#describelayer).
            * @property_ {boolean|DrawMeasureModifyOptions} [drawMeasureModify=false] - Si se establece a un valor *truthy*, el mapa tiene un control para dibujar, medir y modificar geometrías en el mapa.
            * @property {boolean|FeatureInfoOptions} [featureInfo=true] - Si se establece a un valor *truthy*, el mapa responde a los clics con un información de las capas cargadas de tipo WMS. Se usa para ello la petición `getFeatureInfo` del standard WMS.
            * @property {boolean|ControlOptions} [fullScreen=false] - Si se establece a un valor *truthy*, el mapa incorpora un botón para activar el modo de pantalla completa.
            * @property {boolean|GeolocationOptions} [geolocation=false] - Si se establece a un valor *truthy*, se muestra un control para geolocalizar y crear, visualizar y guardar rutas.
            * @property {boolean|LayerCatalogOptions} [layerCatalog=false] - Si se establece a un valor *truthy*, se muestra un control para añadir capas de trabajo desde uno o varios servicios WMS.
            *
            * Este control se usa habitualmente en combinación con `workLayerManager`. Hay más información de cómo funcionan ambos controles en 
            * la página de documentación de {@link LayerCatalogOptions}.
            * @property {boolean|ControlOptions} [legend=false] - Si se establece a un valor *truthy*, el mapa tiene leyenda.
            * @property {boolean|ControlOptions} [loadingIndicator=true] - Si se establece a un valor *truthy*, el mapa tiene un indicador de espera de carga.
            * @property {boolean|ControlOptions} [measure=false] - Si se establece a un valor *truthy*, el mapa tiene un medidor de longitudes, áreas y perímetros.
            * @property {boolean|MultiFeatureInfoOptions} [multiFeatureInfo=false] - Si se establece a un valor *truthy*, el mapa incluye un control que permite la
            * obtención de información de las entidades que se intersecan con puntos, líneas o polígonos dibujados por el usuario. Para líneas y polígonos, 
            * es necesario que las capas del mapa tengan asociado un servicio WFS al servicio WMS que muestra las entidades en el mapa (software como GeoServer realiza esto automáticamente).
            * El control infiere la URL del servicio WFS a partir de la [operación DescribeLayer del estándar WMS-SLD](https://docs.geoserver.org/latest/en/user/services/wms/reference.html#describelayer).
            * @property {boolean|ControlOptions} [navBar=false] - Si se establece a un valor *truthy*, el mapa tiene una barra de navegación con control de zoom.
            * @property {boolean|OfflineMapMakerOptions} [offlineMapMaker=false] - Si se establece a un valor *truthy*, el mapa tiene un creador de mapas sin conexión para uso sin acceso a Internet.
            * 
            * Hay más información sobre los requisitos necesarios para el correcto funcionamiento del control en la página de documentación de
            * {@link OfflineMapMakerOptions}.
            * @property {boolean|OverviewMapOptions} [overviewMap=false] - Si se establece a un valor *truthy*, el mapa tiene un mapa de situación.
            * @property {boolean|ControlOptions} [popup=false] - Si se establece a un valor *truthy*, el mapa muestra los datos asociados a los marcadores cuando se pulsa sobre ellos.
            * @property {boolean|PrintMapOptions} [printMap=false] - Si se establece a un valor *truthy*, se muestra una herramienta para imprimir el mapa en PDF.
            *
            * El control permite al usuario elegir entre varios tamaños de hoja y orientación horizontal o vertical, además se le puede poner un título al documento de impresión.
            * 
            * Al pulsar el botón de imprimir se abre una previsualización como paso previo a la impresión. Ahí el usuario puede realizar unos últimos ajustes a la extensión del mapa.
            * 
            * El PDF se generará al pulsar en el botón dentro de la previsualización.
            * @property {boolean|ControlOptions} [scale=false] - Si se establece a un valor *truthy*, el mapa tiene un indicador numérico de escala.
            * @property {boolean|ControlOptions} [scaleBar=false] - Si se establece a un valor *truthy*, el mapa tiene un indicador gráfico de escala.
            * @property {boolean|ControlOptions} [scaleSelector=false] - Si se establece a un valor *truthy*, el mapa tiene un selector numérico de escala.
            * @property {boolean|SearchOptions} [search=false] - Si se establece a un valor *truthy*, el mapa tiene un buscador. 
            * El buscador localiza coordenadas y busca entidades geográficas tales como: municipios, cascos urbanos, vías, portales, topónimos, carreteras, puntos kilométricos y parcelas catastrales de IDENA. 
            * Es posible establecer un origen de datos distinto a IDENA en el que buscar, consultar la sección: 2.3.1. Objeto de configuración de opciones del buscador.
            * @property {boolean|ControlOptions} [share=false] - Si se establece a un valor *truthy*, el mapa tiene un control para compartir mapas por distintos canales.
            * @property {boolean|StreetViewOptions} [streetView=true] - Si se establece a un valor *truthy*, el usuario podrá abrir una ventana de Google StreetView en la ubicación seleccionada en el mapa.
            * @property {boolean|ControlOptions} [threed=false] - Si se establece a un valor *truthy*, el mapa incorpora un botón para activar la vista 3D.
            *
            * Hay más información sobre la configuración necesaria para el correcto funcionamiento del control en la página de documentación de
            * {@link ThreeDOptions}.
            * @property {boolean|ControlOptions} [TOC=false] - Si se establece a un valor *truthy*, el mapa tiene una tabla de contenidos mostrando las capas de trabajo y los grupos de marcadores.
            * Los controles `TOC` y `workLayerManager` realizan varias funciones comunes, así rara vez será necesario tener los dos a la vez en un visor.
            * @property_ {boolean|WFSEditOptions} [WFSEdit=false] - Si se establece a un valor *truthy*, se añade un control para editar las entidades de las capas vectoriales de tipo [WFS]{@link SITNA.Consts.layerType.WFS} o de las
            * capas de tipo [WMS]{@link SITNA.Consts.layerType.WMS} si estas tienen asociado un servicio WFS. Con este control se pueden crear, modificar y eliminar entidades. Las modificaciones pueden ser de geometría o de atributos.
            * @property {boolean|WFSQueryOptions} [WFSQuery=false] - Si se establece a un valor *truthy*, desde el control `workLayerManager` se pueden hacer consultas alfanuméricas a las capas del mapa.
            * @property {boolean|ControlOptions} [workLayerManager=false] - Si se establece a un valor *truthy*, se muestra un control para consultar y gestionar las capas de trabajo que están cargadas en el mapa. 
            * Con este control se dispone de las siguientes funcionalidades: 
            * 
            *    - Consultar qué capas están cargadas en el mapa
            *    - Ver en qué orden están superpuestas y modificar ese orden
            *    - Comprobar si una capa es visible al nivel de zoom actual
            *    - Activar y desactivar la visibilidad de las capas
            *    - Establecer el grado de transparencia de cada capa
            *    - Borrar capas cargadas
            *    - Consultar metadatos asociados a la capa
            *    - Si está también el control `WFSQuery`, ejecutar consultas alfanuméricas sobre las capas cargadas en el mapa, si cuentan con un servicio WFS pareado al WMS.
            * 
            * Los controles `workLayerManager` y `TOC` realizan varias funciones comunes, así rara vez será necesario tener los dos a la vez en un visor.
            * @example <caption>Ejemplo de uso de propiedad `featureInfo` - [Ver en vivo](../examples/cfg.MapControlOptions.featureInfo.html)</caption> {@lang html}
            * <div id="mapa"></div>
            * <script>
            *     // Añadimos el control featureInfo.
            *     SITNA.Cfg.controls.featureInfo = true;
            *     // Añadimos una capa WMS sobre la que hacer las consultas.
            *     SITNA.Cfg.workLayers = [
            *         {
            *             id: "terremotos",
            *             title: "Terremotos últimos 365 días",
            *             type: SITNA.Consts.layerType.WMS,
            *             url: "https://www.ign.es/wms-inspire/geofisica",
            *             layerNames: ["Ultimos365dias"]
            *         }
            *     ];
            *     var map = new SITNA.Map("mapa");
            * </script>
            * @example_ <caption>Ejemplo de uso de propiedad `fullScreen` - [Ver en vivo](../examples/cfg.MapControlOptions.fullScreen.html)</caption> {@lang html}
            * <div id="mapa"></div>
            * <script>
            *     // Añadimos el control fullScreen.
            *     SITNA.Cfg.controls.fullScreen = true;
            *     var map = new SITNA.Map("mapa");
            * </script>
            * @example <caption>Ejemplo de uso de propiedad `printMap` - [Ver en vivo](../examples/cfg.MapControlOptions.printMap.html)</caption> {@lang html}
            * <div id="mapa"></div>
            * <script>
            *     // Establecemos un layout simplificado apto para hacer demostraciones de controles.
            *     SITNA.Cfg.layout = "layout/ctl-container";
            *     // Añadimos el control de impresión en el primer contenedor.
            *     SITNA.Cfg.controls.printMap = {
            *         div: "slot1"
            *     };
            *     var map = new SITNA.Map("mapa");
            * </script>
            * @example_ <caption>Ejemplo de uso de propiedad `share` - [Ver en vivo](../examples/cfg.MapControlOptions.share.html)</caption> {@lang html}
            * <div id="mapa"></div>
            * <script>
            *     // Establecemos un layout simplificado apto para hacer demostraciones de controles.
            *     SITNA.Cfg.layout = "layout/ctl-container";
            *     // Establecemos el mapa con estado (necesario para añadir el control de compartir)
            *     SITNA.Cfg.stateful = true;
            *     // Añadimos el control de mapas de fondo en el primer contenedor.
            *     SITNA.Cfg.controls.basemapSelector = {
            *         div: "slot1"
            *     };
            *     // Añadimos el control de compartir en el segundo contenedor.
            *     SITNA.Cfg.controls.share = {
            *         div: "slot2"
            *     };
            *     var map = new SITNA.Map("mapa");
            * </script>
            * @example <caption>Ejemplo de uso de propiedad `workLayerManager` - [Ver en vivo](../examples/cfg.MapControlOptions.workLayerManager.html)</caption> {@lang html}
            * <div id="mapa"></div>
            * <script>
            *     // Establecemos un layout simplificado apto para hacer demostraciones de controles.
            *     SITNA.Cfg.layout = "layout/ctl-container";
            *     // Añadimos el control de capas cargadas en la primera posición.
            *     SITNA.Cfg.controls.workLayerManager = {
            *         div: "slot1"
            *     };
            *     // Añadimos tres capas WMS.
            *     SITNA.Cfg.workLayers = [
            *         {
            *             id: "relieve",
            *             type: SITNA.Consts.layerType.WMS,
            *             url: "//idena.navarra.es/ogc/wms",
            *             layerNames: ["IDENA:mapa_relieve_bn"]
            *         },
            *         {
            *             id: "pefc",
            *             type: SITNA.Consts.layerType.WMS,
            *             url: "//idena.navarra.es/ogc/wms",
            *             layerNames: ["IDENA:FOREST_Pol_MontesPEFC"]
            *         },
            *         {
            *             id: "pistas",
            *             type: SITNA.Consts.layerType.WMS,
            *             url: "//idena.navarra.es/ogc/wms",
            *             layerNames: ["IDENA:FOREST_Lin_PistasForP"]
            *         }
            *     ];
            *     var map = new SITNA.Map("mapa");
            * </script>
            */
            controls: {
                loadingIndicator: true,
                navBar: false,
                scaleBar: false,
                scale: false,
                scaleSelector: false,
                overviewMap: false,
                basemapSelector: false,
                attribution: true,
                TOC: false,
                workLayerManager: false,
                layerCatalog: false,
                coordinates: true,
                legend: false,
                popup: false,
                search: {
                    url: 'https://idena.navarra.es/ogc/wfs',
                    allowedSearchTypes: {
                        coordinates: {},
                        municipality: {},
                        urban: {},
                        street: {},
                        number: {},
                        cadastral: {}
                    }
                },
                measure: false,
                streetView: false,
                click: false,
                printMap: false,
                featureInfo: {
                    active: true,
                    persistentHighlights: true
                },
                featureTools: true
            },

            layout: null,

            /**
             * Opciones de marcador (punto con un icono). Para determinar qué icono se va a asignar al marcador, se leen las propiedades `url`, `cssClass` `group`, en ese orden de preferencia.
             * Hay que tener en cuenta que el archivo `config.json` de una maquetación puede sobreescribir los valores por defecto de esta propiedad
             * (para ver instrucciones de uso de maquetaciones, consultar {@tutorial layout_cfg}).
             * @typedef MarkerOptions
             * @extends MarkerStyleOptions
             * @see SITNA.Map#addMarker
             * @property {number[]} [anchor=[0.5, 1]] - Posicionamiento relativo del icono respecto al punto del mapa, representado por un array de dos números entre 0 y 1, siendo [0, 0] la esquina superior izquierda del icono y [1, 1] la esquina inferior derecha del icono.
             * @property {string} [angle] - Nombre del campo del cual extraer la rotación a aplicar a la etiqueta. El valor tiene que estar en grados.
             * @property {string[]} [classes=["tc-marker1", "tc-marker2", "tc-marker3", "tc-marker4", "tc-marker5"]] - Lista de nombres de clase CSS a utilizar para los iconos de los marcadores. La API extraerá la URL de las imágenes del atributo `background-image` asociado a la clase.
             * @property {string} [cssClass] - Nombre de una clase CSS. El marcador adoptará como icono el valor del atributo `background-image` de dicha clase.
             * @property {object|string} [data] - Diccionario de pares clave-valor que representa los atributos alfanuméricos del marcador o bien cadena de caracteres con el código HTML asociado al mismo. Al pulsar sobre el marcador, bien una tabla con los atributos o bien el HTML especificado se mostrarán en un bocadillo.
             * @property {string} [fontColor="#000000"] - Color del texto de la etiqueta descriptiva del marcador, representado en formato hex triplet (`#RRGGBB`).
             * @property {number} [fontSize=10] - Tamaño en puntos tipográficos (`pt`) de la fuente del texto de la etiqueta descriptiva del marcador.
             * @property {string} [group] - Nombre de grupo en el que incluir el marcador. Todos los marcadores con el mismo valor en esta propiedad se consideran en un mismo grupo, y
             * con ello comparten el mismo icono. El icono se selecciona por orden de la lista de clases CSS definida en `classes`. Los grupos se muestran en la tabla de contenidos y en la leyenda.
             * @property {number} [height=32] - Altura en píxeles del icono.
             * @property {string} [label] - Colección de nombre de campo o campos de los cuales extraer el valor de la etiqueta.
             * @property {string} [labelOutlineColor="#ffffff"] - Color del contorno del texto de la etiqueta descriptiva del marcador, representado en formato hex triplet (`#RRGGBB`).
             * @property {number} [labelOutlineWidth=2] - Anchura en píxeles del trazo del contorno del texto de la etiqueta.
             * @property {string} [layer] - Esta propiedad se utiliza en {@link SITNA.Map#addMarker}. Es el identificador de una capa de tipo {@link SITNA.Consts.layerType.VECTOR} en la que se añadirá el marcador.
             * Si no se especifica se creará una capa específica para los marcadores que se añadan por este método.
             * @property {boolean} [showPopup] - Si se establece a `true`, el marcador se añade al mapa con el bocadillo de información asociada visible por defecto.
             * @property {string} [url] - URL de archivo de imagen que se utilizará para el icono.
             * @property {number} [width=32] - Anchura en píxeles del icono.
             * @example <caption>Ejemplo del uso de contenido HTML en la propiedad `data` [Ver en vivo](../examples/cfg.MarkerOptions.html)</caption> {@lang html}
             * <div id="mapa"></div>
             * <script>
             *     // Crear mapa.
             *       var map = new SITNA.Map("mapa");
             *   
             *       // Cuando esté todo cargado proceder a trabajar con el mapa.
             *       map.loaded(function () {
             *           // Añadir un marcador.
             *           map.addMarker([610848, 4741533], {
             *                 data: '<h3>Ayuntamiento de Pamplona</h3><img width="500" src="data:image/jpeg;base64,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"/>'
             *           });             
             *           // Centrar el mapa en el marcador.
             *           map.zoomToMarkers();
             *       });
             * </script>
            */

            /**
             * Opciones de estilo de punto. Hay que tener en cuenta que el archivo `config.json` de una maquetación puede sobreescribir los valores por defecto de esta propiedad
             * (para ver instrucciones de uso de maquetaciones, consultar {@tutorial layout_cfg}).
             * @typedef PointStyleOptions
             * @see StyleOptions
             * @see layout_cfg
             * @property {string} [angle] - Nombre del campo del cual extraer la rotación a aplicar a la etiqueta. El valor tiene que estar en grados.
             * @property {string} [fillColor="#000000" ("#333366" en clusters)] - Color de relleno, representado en formato hex triplet (`#RRGGBB`).
             * @property {number} [fillOpacity=0.3 (0.6 en clusters)] - Opacidad de relleno, valor de 0 a 1.
             * @property {string} [fontColor="#000000" ("#ffffff" en clusters)] - Color del texto de la etiqueta descriptiva del punto, representado en formato hex triplet (`#RRGGBB`).
             * @property {number} [fontSize=10 (9 en clusters)] - Tamaño en puntos tipográficos (`pt`) de la fuente del texto de la etiqueta descriptiva del punto.
             * @property {string} [label] - Colección de nombre de campo o campos de los cuales extraer el valor de la etiqueta.
             * @property {string} [labelOutlineColor="#ffffff" (undefined en clusters)] - Color del contorno del texto de la etiqueta descriptiva del punto, representado en formato hex triplet (`#RRGGBB`).
             * @property {number} [labelOutlineWidth=2 (undefined en clusters)] - Anchura en píxeles del trazo del contorno del texto de la etiqueta.
             * @property {number} [radius=6 (undefined en clusters)] - Radio en píxeles del símbolo que representa el punto.
             * @property {string} [strokeColor="#ff0000" (undefined en clusters)] - Color de trazo de la línea que delimita el símbolo del punto, representado en formato hex triplet (`#RRGGBB`).
             * @property {number} [strokeOpacity=1 (undefined en clusters)] - Opacidad de trazo de la línea que delimita el símbolo del punto, valor de 0 a 1.
             * @property {number} [strokeWidth=2 (undefined en clusters)] - Anchura de trazo en píxeles de la línea que delimita el símbolo del punto.
             */

            /**
             * Opciones de estilo de marcador (punto con un icono). Para determinar qué icono se va a asignar al marcador, se leen las propiedades `url` y `cssClass`, en ese orden de preferencia.
             * Hay que tener en cuenta que el archivo `config.json` de una maquetación puede sobreescribir los valores por defecto de esta propiedad
             * (para ver instrucciones de uso de maquetaciones, consultar {@tutorial layout_cfg}).
             * @typedef MarkerStyleOptions
             * @see StyleOptions
             * @see layout_cfg
             * @property {number[]} [anchor=[0.5, 1]] - Posicionamiento relativo del icono respecto al punto del mapa, representado por un array de dos números entre 0 y 1, siendo [0, 0] la esquina superior izquierda del icono y [1, 1] la esquina inferior derecha del icono.
             * @property {string} [angle] - Nombre del campo del cual extraer la rotación a aplicar a la etiqueta. El valor tiene que estar en grados.
             * @property {string[]} [classes=["tc-marker1", "tc-marker2", "tc-marker3", "tc-marker4", "tc-marker5"]] - Lista de nombres de clase CSS a utilizar para los iconos de los marcadores. La API extraerá la URL de las imágenes del atributo `background-image` asociado a la clase.
             * @property {string} [cssClass] - Nombre de una clase CSS. El marcador adoptará como icono el valor del atributo `background-image` de dicha clase.
             * @property {string} [fontColor="#000000"] - Color del texto de la etiqueta descriptiva del marcador, representado en formato hex triplet (`#RRGGBB`).
             * @property {number} [fontSize=10] - Tamaño en puntos tipográficos (`pt`) de la fuente del texto de la etiqueta descriptiva del marcador.
             * @property {number} [height=32] - Altura en píxeles del icono.
             * @property {string} [label] - Colección de nombre de campo o campos de los cuales extraer el valor de la etiqueta.
             * @property {string} [labelOutlineColor="#ffffff"] - Color del contorno del texto de la etiqueta descriptiva del marcador, representado en formato hex triplet (`#RRGGBB`).
             * @property {number} [labelOutlineWidth=2] - Anchura en píxeles del trazo del contorno del texto de la etiqueta.
             * @property {string} [url] - URL de archivo de imagen que se utilizará para el icono.
             * @property {number} [width=32] - Anchura en píxeles del icono.
             */

            /**
            * Opciones de estilo de línea. Hay que tener en cuenta que el archivo `config.json` de una maquetación puede sobreescribir los valores por defecto de esta propiedad
            * (para ver instrucciones de uso de maquetaciones, consultar {@tutorial layout_cfg}).
            * @typedef LineStyleOptions
            * @see StyleOptions
            * @see layout_cfg
            * @property {string} [strokeColor="#ff0000"] - Color de trazo de la línea, representado en formato hex triplet (`#RRGGBB`).
            * @property {number} [strokeOpacity=1] - Opacidad de trazo de la línea, valor de 0 a 1.
            * @property {number} [strokeWidth=2] - Anchura de trazo en píxeles de la línea.
            */

            /**
             * Opciones de estilo de polígono. Hay que tener en cuenta que el archivo `config.json` de una maquetación puede sobreescribir los valores por defecto de esta propiedad
             * (para ver instrucciones de uso de maquetaciones, consultar {@tutorial layout_cfg}).
             * @typedef PolygonStyleOptions
             * @see StyleOptions
             * @see layout_cfg
             * @property {string} [fillColor="#000000"] - Color de relleno, representado en formato hex triplet (`#RRGGBB`).
             * @property {number} [fillOpacity=0.3] - Opacidad de relleno, valor de 0 a 1.
             * @property {string} [strokeColor="#ff0000"] - Color de trazo de los lados del polígono, representado en formato hex triplet (`#RRGGBB`).
             * @property {number} [strokeOpacity=1] - Opacidad de trazo de los lados del polígono, valor de 0 a 1.
             * @property {number} [strokeWidth=2] - Anchura de trazo en de los lados del polígono.
             */

            /**
             * Opciones de estilo de cluster de puntos. Hay que tener en cuenta que el archivo `config.json` de una maquetación puede sobreescribir los valores por defecto de esta propiedad
             * (para ver instrucciones de uso de maquetaciones, consultar {@tutorial layout_cfg}).
             * @typedef ClusterStyleOptions
             * @see StyleOptions
             * @see layout_cfg
             * @property {PointStyleOptions} [point] - Opciones de estilo del punto que representa el cluster.
             * @see ClusterOptions
             * @example <caption>[Ver en vivo](../examples/cfg.ClusterStyleOptions.point.html)</caption> {@lang html}
             * <div id="mapa"></div>
             * <script>
             *     // Creamos un mapa con una capa vectorial,
             *     // clustering activado a 50 pixels y estilos personalizados.
             *     var map = new SITNA.Map("mapa", {
             *         workLayers: [
             *             {
             *                 id: "cluster",
             *                 type: SITNA.Consts.layerType.VECTOR,
             *                 title: "Clusters",
             *                 styles: {
             *                     point: {
             *                         strokeColor: "#0000ff",
             *                         strokeWidth: 2,
             *                         fillColor: "#0000ff",
             *                         fillOpacity: 0.2,
             *                         radius: 6
             *                     }
             *                 },
             *                 cluster: {
             *                     distance: 50,
             *                     styles: {
             *                         point: {
             *                             fillColor: "#f90",
             *                             fillOpacity: 1,
             *                             strokeColor: "#c60",
             *                             strokeWidth: 2,
             *                             fontColor: "#f90"
             *                         }
             *                     }
             *                 }
             *             }
             *         ]
             *     });
             *     
             *     map.loaded(function () {
             *         // Añadimos puntos aleatorios
             *         var extent = TC.Cfg.initialExtent;
             *         var dx = extent[2] - extent[0];
             *         var dy = extent[3] - extent[1];
             *         
             *         var randomPoint = function () {
             *             var x = extent[0] + Math.random() * dx;
             *             var y = extent[1] + Math.random() * dy;
             *             return [x, y];
             *         }
             *             
             *         for (var i = 0; i < 200; i++) {
             *             var point = randomPoint();
             *             map.addMarker(point, {
             *                 layer: "cluster",
             *                 data: {
             *                     x: point[0],
             *                     y: point[1]
             *                 }
             *             });
             *         }
             *     });
             * </script>
             */

            /**
             * Opciones de estilo de mapa de calor. Hay que tener en cuenta que el archivo `config.json` de una maquetación puede sobreescribir los valores por defecto de esta propiedad
             * (para ver instrucciones de uso de maquetaciones, consultar {@tutorial layout_cfg}).
             * @typedef HeatmapStyleOptions             
             * @see StyleOptions
             * @see layout_cfg
             * @property {number} [blur=15] - Ancho en píxeles del difuminado de las manchas del mapa de calor.
             * @property {string[]} [gradient=["#00f", "#0ff", "#0f0", "#ff0", "#f00"]] - Gradiente de colores de las manchas de mapa 
             * de calor. Debe ser un array de cadenas CSS de color.
             * @property {number} [radius=8] - Radio en píxeles de la mancha unitaria en el mapa de calor.
             * @example <caption>[Ver en vivo](../examples/cfg.HeatmapStyleOptions.html)</caption> {@lang html}
             * <div id="mapa"></div>
             * <script>
             *     // Crear un mapa con una capa vectorial, mapa de calor activado con un radio de 32 píxeles,
             *     // un difuminado de 16 píxeles y un gradiente de colores azul-rojo-dorado.
             *     var map = new SITNA.Map("mapa", {
             *         workLayers: [
             *             {
             *                 id: "heatmap",
             *                 type: SITNA.Consts.layerType.VECTOR,
             *                 title: "Mapa de calor",
             *                 heatmap: {
             *                     radius: 16,
             *                     blur: 32,
             *                     gradient: [
             *                         "#00008b",
             *                         "#dc143c",
             *                         "#ffd700"
             *                     ]
             *                 }
             *             }
             *         ]
             *     });
             *     
             *     map.loaded(function () {
             *         // Añadimos puntos aleatorios
             *         var extent = TC.Cfg.initialExtent;
             *         var dx = extent[2] - extent[0];
             *         var dy = extent[3] - extent[1];
             *         
             *         var randomPoint = function () {
             *             var x = extent[0] + Math.random() * dx;
             *             var y = extent[1] + Math.random() * dy;
             *             return [x, y];
             *         }
             *             
             *         for (var i = 0; i < 200; i++) {
             *             var point = randomPoint();
             *             map.addMarker(point, {
             *                 layer: "heatmap",
             *                 data: {
             *                     x: point[0],
             *                     y: point[1]
             *                 }
             *             });
             *         }
             *     });
             * </script>
             */

            /**
            * Opciones de estilo de entidades geográficas.
            * @typedef StyleOptions
            * @see MapOptions
            * @see WFSQueryOptions
            * @see CadastralSearchOptions
            * @see MunicipalitySearchOptions
            * @see PostalAddressSearchOptions
            * @see StreetSearchOptions
            * @see UrbanAreaSearchOptions
            * @property {PointStyleOptions} [point] - Opciones de estilo de punto.
            * @property {LineStyleOptions} [line] - Opciones de estilo de línea.
            * @property {PolygonStyleOptions} [polygon] - Opciones de estilo de polígono.
            * @property {MarkerStyleOptions} [marker] - Opciones de estilo de marcador (punto de mapa con icono).
            * @property {ClusterStyleOptions} [cluster] - Opciones de estilo de cluster de puntos. Consultar la propiedad `cluster` de {@link LayerOptions} para saber cómo mostrar clusters.
            * @property {HeatmapStyleOptions} [heatmap] - Opciones de estilo de mapa de calor.
            */
            styles: {
                point: {
                    fillColor: '#000000',
                    fillOpacity: 0.1,
                    strokeColor: '#ff0000',
                    strokeWidth: 2,
                    strokeOpacity: 1,
                    radius: 6,
                    labelOutlineWidth: 2,
                    labelOutlineColor: '#ffffff',
                    labelOffset: [0, -16],
                    fontColor: '#000000',
                    fontSize: 10
                },
                marker: {
                    classes: [
                        TC.Consts.classes.MARKER + 1,
                        TC.Consts.classes.MARKER + 2,
                        TC.Consts.classes.MARKER + 3,
                        TC.Consts.classes.MARKER + 4,
                        TC.Consts.classes.MARKER + 5
                    ],
                    anchor: [.5, 1],
                    width: 32,
                    height: 32,
                    labelOutlineWidth: 2,
                    labelOutlineColor: '#ffffff',
                    labelOffset: [0, -32],
                    fontColor: '#000000',
                    fontSize: 10
                },
                line: {
                    strokeColor: '#ff0000',
                    strokeWidth: 2,
                    strokeOpacity: 1,
                    labelOutlineWidth: 2,
                    labelOutlineColor: '#ffffff',
                    fontColor: '#000000',
                    fontSize: 10
                },
                polygon: {
                    strokeColor: '#ff0000',
                    strokeWidth: 2,
                    strokeOpacity: 1,
                    fillColor: '#000000',
                    fillOpacity: 0.3,
                    labelOutlineWidth: 2,
                    labelOutlineColor: '#ffffff',
                    fontColor: '#000000',
                    fontSize: 10
                },
                cluster: {
                    point: {
                        fillColor: '#333366',
                        fillOpacity: 0.6,
                        radius: getClusterRadius,
                        label: '${features.length}',
                        fontColor: "#ffffff",
                        fontSize: 9
                    }
                },
                selection: {
                    point: {
                        fillColor: '#008000',
                        fillOpacity: 0.5,
                        strokeColor: '#008000',
                        strokeWidth: 2,
                        radius: 6,
                        labelOutlineWidth: 2,
                        labelOutlineColor: '#ffffff',
                        labelOffset: [0, -16],
                        fontColor: '#000000',
                        fontSize: 10
                    },
                    line: {
                        strokeColor: '#008000',
                        strokeWidth: 2,
                        labelOutlineWidth: 2,
                        labelOutlineColor: '#ffffff',
                        fontColor: '#000000',
                        fontSize: 10
                    },
                    polygon: {
                        strokeColor: '#008000',
                        strokeWidth: 2,
                        fillColor: '#000000',
                        fillOpacity: .3,
                        labelOutlineWidth: 2,
                        labelOutlineColor: '#ffffff',
                        fontColor: '#000000',
                        fontSize: 10
                    }
                }
            }
        };
    })();

    (function () {
        if (!Array.prototype.map) {
            Array.prototype.map = function (fun /*, thisArg */) {
                "use strict";

                if (this === void 0 || this === null)
                    throw new TypeError();

                var t = Object(this);
                var len = t.length >>> 0;
                if (typeof fun !== "function")
                    throw new TypeError();

                var res = new Array(len);
                var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                for (var i = 0; i < len; i++) {
                    // NOTE: Absolute correctness would demand Object.defineProperty
                    //       be used.  But this method is fairly new, and failure is
                    //       possible only if Object.prototype or Array.prototype
                    //       has a property |i| (very unlikely), so use a less-correct
                    //       but more portable alternative.
                    if (i in t)
                        res[i] = fun.call(thisArg, t[i], i, t);
                }

                return res;
            };
        }

        /* 
         * proxify: returns cross-origin safe URL
         */
        TC.proxify = function (url) {
            url = url.trim();
            var result = url;
            if (TC.Cfg.proxy) {
                var prevent = false;
                if (TC.Cfg.proxyExceptions) {
                    for (var i = 0; i < TC.Cfg.proxyExceptions.length; i++) {
                        if (url.indexOf(TC.Cfg.proxyExceptions[i]) > -1) {
                            prevent = true;
                            break;
                        }
                    }
                }

                if (!prevent && !TC.Util.isSameOrigin(url)) {
                    if (typeof TC.Cfg.proxy == "function") {
                        result = TC.Cfg.proxy(url);
                    } else {
                        result = TC.Cfg.proxy;
                        if (url.substr(0, 4) != "http") result += window.location.protocol;
                        result += encodeURIComponent(url);
                    }
                }
            }
            return result;
        };

        var getHead = function () {
            var result;
            var d = document;
            var ah = d.getElementsByTagName("head");
            if (ah.length === 0) {
                result = d.createElement("head");
                d.documentElement.insertBefore(result, document.body);
            }
            else {
                result = ah[0];
            }
            return result;
        };

        if (typeof TC.isDebug != "boolean") {
            TC.isDebug = true;
        };

        var _showLoadFailedError = function (url) {
            let stack = "";
            try {
                throw new Error();
            } catch (error) {
                stack = error && error.stack ? error.stack : error.toString();
            }

            const mapObj = TC.Map.get(document.querySelector('.' + TC.Consts.classes.MAP));
            const subject = "Error al cargar " + url;
            const body = TC.Util.getLocaleString(mapObj.options.locale, "urlFailedToLoad", { url: url });

            // tostada sin la pila
            TC.error(
                body,
                [TC.Consts.msgErrorMode.TOAST],
                subject);
            // email con pila
            TC.error(
                body + ". Pila de la llamada al recurso: \
                " + (stack && stack.length > 0 ? stack : ""),
                [TC.Consts.msgErrorMode.EMAIL],
                subject);
        };

        TC.syncLoadJS = function (url) {
            var _sendRequest = function (url, callbackErrorFn) {
                var req = new XMLHttpRequest();
                req.open("GET", url, false); // 'false': synchronous.
                var result;

                req.onreadystatechange = function (e) {
                    if (req.readyState === 4) {
                        if (req.status === 404) {
                            result = false;
                            callbackErrorFn(true);
                        } else if (req.status !== 200) {
                            callbackErrorFn();
                            result = false;
                        } else {
                            result = req.responseText;
                        }
                    }
                };


                try {
                    req.send(null);
                } catch (error) {
                    result = false;
                    callbackErrorFn();
                }

                return result;
            };

            if (!/(\.js|\/)$/i.test(url)) { // Si pedimos un archivo sin extensión se la ponemos según el entorno
                url = url + (TC.isDebug ? '.js' : '.min.js');
            }

            var reqResult = _sendRequest(url, function (is404) {
                if (is404) {
                    _showLoadFailedError(url);
                    return false;
                } else {
                    return _sendRequest(url, function () {
                        _showLoadFailedError(url);
                    });
                }
            });

            if (reqResult) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.text = reqResult;
                getHead().appendChild(script);
            }
        };

        const prefixes = ['', '-webkit-', '-moz-', '-o-', '-ms-'];
        const randomText = ':-)';
        const urlString = 'http://sitna.tracasa.es/';
        var touch;
        var inputTypeColor;
        var urlParser;
        TC.browserFeatures = {
            touch: function () {
                if (touch === undefined) {
                    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
                        touch = true;
                        return true;
                    }
                    const query = prefixes
                        .map(function (prefix) { return '(' + prefix + 'touch-enabled)'; })
                        .join();
                    touch = matchMedia(query).matches;
                }
                return touch;
            },
            inputTypeColor: function () {
                if (inputTypeColor === undefined) {
                    const elm = document.createElement('input');
                    elm.setAttribute('type', 'color');
                    inputTypeColor = elm.type !== 'text' && 'style' in elm;
                    if (inputTypeColor) {
                        elm.value = randomText;
                        inputTypeColor = elm.value !== randomText;
                    }
                }
                return inputTypeColor;
            },
            urlParser: function () {
                if (urlParser === undefined) {
                    try {
                        // have to actually try use it, because Safari defines a dud constructor
                        const url = new URL(urlString);
                        urlParser = url.href === urlString;
                    } catch (e) {
                        urlParser = false;
                    }
                }
                return urlParser;
            }
        };

        const patchJQuery = function () {
            // Parche para soportar $.when
            $._oldWhen = $.when;
            $.when = function () {
                const newArgs = new Array(arguments.length);
                for (var i = 0; i < arguments.length; i++) {
                    const arg = newArgs[i] = arguments[i];
                    if (arg instanceof Promise) {
                        const newArg = $.Deferred();
                        arg
                            .then(function (val) {
                                newArg.resolve(val)
                            })
                            .catch(function (err) {
                                newArg.reject(err);
                            });
                        newArgs[i] = newArg;
                    }
                }
                return $._oldWhen.apply(this, newArgs);
            };
        };

        if (window.jQuery) {
            TC._jQueryIsLoaded = true;
            patchJQuery();
        }
        //else {
        //    Object.defineProperty(window, 'jQuery', {
        //        configurable: true,
        //        get: fnction () {
        //            console.trace();
        //            Object.defineProperty(window, 'jQuery', { writable: true });
        //            TC.syncLoadJS(TC.Consts.url.JQUERY);
        //            patchJQuery();
        //            TC._jQueryIsLoaded = true;
        //            return jQuery;
        //        }
        //    });
        //    Object.defineProperty(window, '$', {
        //        configurable: true,
        //        get: function () {
        //            console.trace();
        //            Object.defineProperty(window, '$', { writable: true });
        //            TC.syncLoadJS(TC.Consts.url.JQUERY);
        //            patchJQuery();
        //            TC._jQueryIsLoaded = true;
        //            return $;
        //        }
        //    });
        //}

        if (!('Promise' in window)) {
            TC.syncLoadJS(TC.apiLocation + TC.Consts.url.PROMISE_POLYFILL);
        }
        // Polyfill para NodeList.forEach
        if (window.NodeList && !NodeList.prototype.forEach) {
            NodeList.prototype.forEach = Array.prototype.forEach;
        }
        if (!('finally' in Promise.prototype)) {
            // Muchos polyfills de Promise no implementan finally, lo hacemos aquí en ese caso
            Promise.prototype.finally = function (callback) {
                const ctor = this.constructor;
                return this.then(
                    function (val) {
                        return ctor.resolve(callback()).then(function () {
                            return val;
                        });
                    },
                    function (err) {
                        return ctor.resolve(callback()).then(function () {
                            throw err;
                        });
                    }
                );
            };
        }

        if (!TC.tool || !TC.tool.Proxification) {
            TC.syncLoadJS(TC.apiLocation + 'TC/tool/Proxification');
        }

        // Transformación de petición AJAX de jQuery a promesa nativa
        TC.ajax = function (options) {
            return new Promise(function (resolve, reject) {
                options = options || {};
                const method = options.method || 'GET';
                const isGET = method === 'GET';
                var data;
                if (options.data) {
                    if (typeof options.data === 'string') {
                        data = options.data;
                    }
                    else if (typeof options.data === 'object') {
                        if (isGET && (options.contentType || typeof options.contentType === 'boolean')) {
                            data = TC.Util.getParamString(options.data);
                        } else {
                            const paramArray = [];
                            for (var key in options.data) {
                                paramArray.push(key + '=' + options.data[key].toString());
                            }
                            data = paramArray.join('&');
                        }
                    }
                }
                var url = options.url;
                if (isGET && data) {
                    url = url + '?' + data;
                }
                if (options.cache === false) {
                    url += (url.indexOf('?') < 0 ? '?' : '&') + 'ts=' + Date.now();
                }
                const request = new XMLHttpRequest();
                request.open(method, url);

                if (options.contentType || typeof options.contentType === 'boolean') {
                    if (options.contentType) {
                        request.setRequestHeader('Content-Type', options.contentType + '; charset=UTF-8');
                    }
                }
                else {
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                }

                request.onreadystatechange = function (e) {
                    if (request.readyState === 4) { // DONE
                        if (request.status !== 200) {
                            reject({
                                status: request.status,
                                msg: request.statusText,
                                url: options.url
                            });
                        } else {
                            var responseData;
                            try {
                                switch (options.responseType) {
                                    case TC.Consts.mimeType.JSON:
                                        //URI: Compruebo que la respuesta no es un XML de excepción
                                        if (!request.responseXML)
                                            responseData = JSON.parse(request.responseText);
                                        else
                                            throw request.responseXML
                                        break;
                                    case TC.Consts.mimeType.XML:
                                        responseData = new DOMParser().parseFromString(request.responseText, 'application/xml');
                                        break;
                                    default:
                                        responseData = request.responseText;
                                        break;
                                }
                                resolve({ data: responseData, contentType: request.getResponseHeader("Content-type") });
                            }
                            catch (error) {
                                reject(error);
                            }
                        }
                    }
                };

                try {
                    request.send(method === 'POST' ? data : null);
                } catch (error) {
                    reject(error);
                }
            });
        };

        TC.loadJSInOrder = function (condition, url, callback) {
            TC.loadJS(condition, url, callback, true);
        };

        const addCrossOriginAttr = function (path, scriptEl) {
            if (!TC.Util.isSameOrigin(path)) {
                scriptEl.crossOrigin = "anonymous";
            }
        };

        TC.loadJS = function (condition, url, callback, inOrder, notCrossOrigin) {
            if (arguments.length < 4) {
                inOrder = false;
            }

            var urls = Array.isArray(url) ? url : [url];
            urls = urls.map(function (elm) {
                if (!/\.js$/i.test(elm) && elm.indexOf(TC.apiLocation) === 0) { // Si pedimos un archivo sin extensión y es nuestro se la ponemos según el entorno
                    return elm + (TC.isDebug ? '.js' : '.min.js');
                }
                return elm;
            });

            if (condition) {
                urls = urls instanceof Array ? urls : [urls];

                var name = "";
                const getName = function (path) {
                    return path.split('/').reverse().slice(0, 2).reverse().join('_').toLowerCase();
                };
                if (urls.length > 1) {
                    var toReduce = urls.slice(0).filter(function (path, index) {
                        if (loadjs.isDefined(getName(path))) {
                            urls.splice(index, 1);
                            loadjs.ready(getName(path), callback);
                            return false;
                        } else {
                            return true;
                        }
                    });
                    if (toReduce.length === 1) {
                        name = getName(toReduce[0]);
                    } else if (toReduce.length > 0) {
                        name = toReduce.reduce(function (prev, curr) {
                            return getName(prev) + "_" + getName(curr);
                        });
                    }
                } else {
                    name = getName(urls[0]);
                }

                if (name.length > 0) {
                    if (!loadjs.isDefined(name)) {
                        var options = {
                            async: !inOrder,
                            numRetries: 1
                        };

                        if (!notCrossOrigin && !TC.Util.detectIE()) {
                            options.before = addCrossOriginAttr;
                        }

                        loadjs(urls, name, options);
                        loadjs.ready(name, {
                            success: function () {
                                callback();
                            },
                            error: function (pathsNotFound) {
                                _showLoadFailedError(pathsNotFound);
                            }
                        });
                    } else {
                        // Esto vuelve a añadir el script al head si se está pidiendo un script cargado previamente.
                        urls.forEach(function (url) {
                            const urlObj = new URL(url, location.href);
                            const script = Array.from(document.scripts).filter((scr) => scr.src === urlObj.href)[0];
                            if (script) {
                                document.head.appendChild(script.cloneNode());
                            }
                        });
                        loadjs.ready(name, callback);
                    }
                }
            }
            else {
                callback();
            }
        };

        TC.loadCSS = function (url) {
            const getName = function (path) {
                return path.split('/').reverse().slice(0, 2).reverse().join('_').toLowerCase();
            };

            const name = getName(url);
            if (!loadjs.isDefined(name)) {
                loadjs(url, name, {
                    error: function (pathsNotFound) {
                        _showLoadFailedError(pathsNotFound);
                    },
                    numRetries: 1
                });
            } else {
                loadjs.ready(name, {});
            }
        };

        var projectionDataCache = {};

        TC.getProjectionData = function (options) {
            options = options || {};
            const crs = options.crs || '';
            const match = crs.match(/\d{4,5}$/g);
            let code = match ? match[0] : '';
            const url = TC.Consts.url.EPSG + '?format=json&q=' + code;
            let projData = projectionDataCache[code];
            if (projData) {
                if (options.sync) {
                    return projData;
                }
                return Promise.resolve(projData);
            }
            if (options.sync) {
                let result;
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function (e) {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 404) {
                            result = false;
                        } else if (xhr.status != 200) {
                            result = false;
                        } else {
                            result = xhr.responseText;
                        }
                    }
                };
                xhr.open('GET', url, false);

                try {
                    xhr.send(null);
                } catch (error) {
                    result = false;
                }
                if (result) {
                    result = JSON.parse(result);
                }
                return result;
            }
            return new Promise(function (resolve, reject) {
                const toolProxification = new TC.tool.Proxification(TC.proxify);
                toolProxification.fetchJSON(url, options).then(function (data) {
                    projectionDataCache[code] = data;
                    resolve(data);
                }).catch(function (error) {
                    reject(Error(error));
                });
            });
        };

        TC.loadProjDef = function (options) {
            options = options || {};
            const crs = options.crs;
            const epsgPrefix = 'EPSG:';
            const urnPrefix = 'urn:ogc:def:crs:EPSG::';
            const urnxPrefix = 'urn:x-ogc:def:crs:EPSG:';
            const ogcHttpUrlPrefix = 'http://www.opengis.net/gml/srs/epsg.xml#';
            const ogcHttpUriPrefix = 'http://www.opengis.net/def/crs/EPSG/0/';

            const fromHTTPURIToURN = function (name) {
                var match = /http:\/\/www\.opengis\.net\/def\/crs\/EPSG\/\d\/(\d{4,5})/.exec(name);
                if (match && match.length === 2) {
                    return urnPrefix + match[1];
                }

                return name;
            };

            var getDef;
            if (!window[TC.Consts.PROJ4JSOBJ]) {
                TC.syncLoadJS(TC.url.proj4js);
            }
            getDef = function (name) {
                name = fromHTTPURIToURN(name);
                return proj4.defs(name);
            };
            const loadProj4Def = function (code, def) {
                proj4.defs(code, def);
                if (window.ol && window.ol.proj) {
                    // https://openlayers.org/en/latest/apidoc/module-ol_proj_proj4.html
                    window.ol.proj.proj4.register(proj4);
                }
            };
            const isFunction = function (obj) {
                return typeof obj === 'function';
            };
            const loadDef = function (code, def, name) {
                // Lista sacada de https://docs.geoserver.org/stable/en/user/services/wfs/webadmin.html#gml
                const epsgCode = epsgPrefix + code;
                const urnCode = urnPrefix + code;
                const urnxCode = urnxPrefix + code;
                const ogcHttpUrlCode = ogcHttpUrlPrefix + code;
                const ogcHttpUriCode = ogcHttpUriPrefix + code;
                var axisUnawareDef;
                if (typeof def === 'object') {
                    axisUnawareDef = TC.Util.extend({}, def);
                    def = TC.Util.extend({}, def);
                    if (axisUnawareDef.axis) {
                        delete axisUnawareDef.axis;
                    }
                }
                else if (typeof def === 'string') {
                    axisUnawareDef = def.replace('+axis=neu', '');
                }
                loadProj4Def(epsgCode, def);
                loadProj4Def(urnCode, def);
                loadProj4Def(urnxCode, def);
                // Por convención, los CRS definidos por URL siempre tienen orden de coordenadas X-Y.
                loadProj4Def(ogcHttpUrlCode, axisUnawareDef);
                loadProj4Def(ogcHttpUriCode, def);
                if (crs.indexOf(ogcHttpUrlPrefix) === 0) {
                    // El CRS es tipo URL, usado seguramente en un GML.
                    loadProj4Def(crs, axisUnawareDef);
                    getDef(crs).name = name;
                }
                getDef(epsgCode).name = name;
                getDef(ogcHttpUrlCode).name = name;
                getDef(ogcHttpUriCode).name = name;
            };
            const loadDefResponse = function (data) {
                const result = data && data.status === 'ok' && data.number_result === 1;
                if (result) {
                    var def = data.results[0];
                    loadDef(def.code, def.proj4, def.name);
                }
                return result;
            };

            var idx = crs.lastIndexOf('#');
            if (idx < 0) {
                idx = crs.lastIndexOf('/');
            }
            if (idx < 0) {
                idx = crs.lastIndexOf(':');
            }
            var code = crs.substr(idx + 1);
            var def = getDef(crs);
            if (def) {
                loadDef(code, def, options.name);
                if (isFunction(options.callback)) {
                    options.callback();
                }
            }
            else {
                if (options.def) {
                    loadDef(code, options.def, options.name);
                    if (isFunction(options.callback)) {
                        options.callback();
                    }
                }
                else {
                    const loadDataAndExecCallback = function (data) {
                        if (loadDefResponse(data) && isFunction(options.callback)) {
                            options.callback();
                        };
                    };
                    if (options.sync) {
                        const data = TC.getProjectionData(options);
                        loadDataAndExecCallback(data);
                    }
                    else {
                        TC.getProjectionData(options).then(loadDataAndExecCallback);
                    }
                }
            }
        };

        TC.url = {
            templatingRuntime: [
                TC.apiLocation + TC.Consts.url.TEMPLATING_RUNTIME,
                TC.apiLocation + TC.Consts.url.TEMPLATING_HELPERS
            ],
            templatingFull: [
                TC.apiLocation + TC.Consts.url.TEMPLATING_FULL,
                TC.apiLocation + TC.Consts.url.TEMPLATING_HELPERS
            ]
        };

        TC.url.ol = TC.apiLocation + TC.Consts.url.OL;
        TC.url.olConnector = TC.apiLocation + TC.Consts.url.OL_CONNECTOR;
        TC.url.proj4js = TC.apiLocation + TC.Consts.url.PROJ4JS;

        // Precargamos el CRS por defecto
        TC.loadProjDef({ crs: 'EPSG:25830', name: 'ETRS89 / UTM zone 30N', def: '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs' });
        // Precargamos los CRS de IDENA que tienen orden de ejes neu
        TC.loadProjDef({ crs: 'EPSG:4258', name: 'ETRS89', def: '+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs +axis=neu' });
        TC.loadProjDef({ crs: 'EPSG:3040', name: 'ETRS89 / UTM zone 28N (N-E)', def: '+proj=utm +zone=28 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +axis=neu' });
        TC.loadProjDef({ crs: 'EPSG:3041', name: 'ETRS89 / UTM zone 29N (N-E)', def: '+proj=utm +zone=29 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +axis=neu' });
        TC.loadProjDef({ crs: 'EPSG:3042', name: 'ETRS89 / UTM zone 30N (N-E)', def: '+proj=utm +zone=30 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +axis=neu' });
        TC.loadProjDef({ crs: 'EPSG:3043', name: 'ETRS89 / UTM zone 31N (N-E)', def: '+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +axis=neu' });
        TC.loadProjDef({ crs: 'EPSG:4230', name: 'ED50', def: '+proj=longlat +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +no_defs +axis=neu' });
        //resto de CRS nacionales
        TC.loadProjDef({ crs: 'EPSG:25828', name: 'ETRS89 / UTM zone 28N', def: '+proj=utm +zone=28 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs' });
        TC.loadProjDef({ crs: 'EPSG:25829', name: 'ETRS89 / UTM zone 29N', def: '+proj=utm +zone=29 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs' });
        TC.loadProjDef({ crs: 'EPSG:25831', name: 'ETRS89 / UTM zone 31N', def: '+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs' });

        if (!TC.Util) {
            TC.syncLoadJS(TC.apiLocation + 'TC/Util');
        }

        TC.Cfg = TC.Util.extend(true, {}, TC.Defaults, TC.Cfg);

        TC.capabilities = {};
        TC.capabilitiesWFS = {};


        TC.describeFeatureType = {};

        TC.cache = {};

        TC.alert = function (text) {
            alert(text);
        };

        TC.prompt = function (text, value, callback) {
            var newValue = prompt(text, value);
            if (TC.Util.isFunction(callback)) {
                callback(newValue);
            }
        };

        TC.confirm = function (text, accept, cancel) {
            if (confirm(text)) {
                if (TC.Util.isFunction(accept)) {
                    accept();
                }
            }
            else {
                if (TC.Util.isFunction(cancel)) {
                    cancel();
                }
            }
        };

        TC.error = function (text) {
            if (window.console) {
                console.error(text);
            }

        };

        if (!TC.Map) {
            TC.syncLoadJS(TC.apiLocation + 'TC/Map');
        }

        // OpenLayers connectors
        TC.wrap = {
            Map: function (map) {
                var self = this;
                self.parent = map;
                self.map = null;
                /*
                 *  wrap.getMap: Gets OpenLayers map or a promise for the OpenLayers map
                 */
                self.getMap = function () {
                    return self._promise;
                };
            },
            Layer: function (layer) {
                var self = this;
                self.parent = layer;
                self.layer = null;
                TC.EventTarget.call(self);
                /*
                 *  getLayer: Gets OpenLayers layer or a promise for the OpenLayers layer
                 */
                self.getLayer = function () {
                    if (self.layer) {
                        return Promise.resolve(self.layer);
                    }
                    return self._promise;
                };
                /*
                 *  setLayer: Resolves the deferred layer object
                 * Parameter: the OpenLayers layer
                 */
                self.setLayer = function (olLayer) {
                    self.layer = olLayer;
                };
            },
            layer: {
                Raster: function () { TC.wrap.Layer.apply(this, arguments); },
                Vector: function () { TC.wrap.Layer.apply(this, arguments); }
            },
            Control: function (ctl) {
                var self = this;
                self.parent = ctl;
            },
            control: {
                Click: function () { TC.wrap.Control.apply(this, arguments); },
                ScaleBar: function () { TC.wrap.Control.apply(this, arguments); },
                NavBar: function () { TC.wrap.Control.apply(this, arguments); },
                NavBarHome: function () { TC.wrap.Control.apply(this, arguments); },
                Coordinates: function () { TC.wrap.Control.apply(this, arguments); },
                Search: function () { TC.wrap.Control.apply(this, arguments); },
                Measure: function () { TC.wrap.Control.apply(this, arguments); },
                OverviewMap: function () { TC.wrap.Control.apply(this, arguments); },
                FeatureInfo: function () { TC.wrap.Control.apply(this, arguments); },
                Popup: function () { TC.wrap.Control.apply(this, arguments); },
                GeometryFeatureInfo: function () { TC.wrap.Control.apply(this, arguments); },
                Geolocation: function () { TC.wrap.Control.apply(this, arguments); },
                Draw: function () { TC.wrap.Control.apply(this, arguments); },
                Modify: function () { TC.wrap.Control.apply(this, arguments); },
                OfflineMapMaker: function () { TC.wrap.Control.apply(this, arguments); },
                Edit: function () { TC.wrap.Control.apply(this, arguments); },
                ResultsPanel: function () { TC.wrap.Control.apply(this, arguments); }
            },
            Feature: function () { },
            Geometry: function () { }
        };
        TC.inherit(TC.wrap.Layer, TC.EventTarget);
        TC.inherit(TC.wrap.layer.Raster, TC.wrap.Layer);
        TC.inherit(TC.wrap.layer.Vector, TC.wrap.Layer);
        TC.inherit(TC.wrap.control.Click, TC.wrap.Control);
        TC.inherit(TC.wrap.control.ScaleBar, TC.wrap.Control);
        TC.inherit(TC.wrap.control.NavBar, TC.wrap.Control);
        TC.inherit(TC.wrap.control.NavBarHome, TC.wrap.Control);
        TC.inherit(TC.wrap.control.Coordinates, TC.wrap.Control);
        TC.inherit(TC.wrap.control.Measure, TC.wrap.Control);
        TC.inherit(TC.wrap.control.OverviewMap, TC.wrap.Control);
        TC.inherit(TC.wrap.control.Popup, TC.wrap.Control);
        TC.inherit(TC.wrap.control.FeatureInfo, TC.wrap.control.Click);
        TC.inherit(TC.wrap.control.GeometryFeatureInfo, TC.wrap.control.Click);
        TC.inherit(TC.wrap.control.Geolocation, TC.wrap.Control);
        TC.inherit(TC.wrap.control.Draw, TC.wrap.Control);
        TC.inherit(TC.wrap.control.OfflineMapMaker, TC.wrap.Control);
        TC.inherit(TC.wrap.control.Edit, TC.wrap.Control);
        TC.inherit(TC.wrap.control.ResultsPanel, TC.wrap.Control);

        TC.loadCSS(TC.apiLocation + 'TC/css/tcmap.css');


        TC.loadJS(!TC.browserFeatures.urlParser(), TC.apiLocation + TC.Consts.url.URL_POLYFILL, function () { });

        var uids = {};
        TC.setPrefixUID = function (prefix, lastValue) {
            uids[prefix] = lastValue;
        }
        TC.getUID = function (prefix) {
            prefix = prefix || '';
            var value = uids[prefix];
            if (!value) {
                value = uids[prefix] = 1;
            }
            var result = prefix + value;
            uids[prefix] = value + 1;
            return result;
        };

        const pluses = /\+/g;
        function raw(s) {
            return s;
        }
        function decoded(s) {
            return decodeURIComponent(s.replace(pluses, ' '));
        }

        TC.cookie = function (key, value, options) {

            // key and at least value given, set cookie...
            if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null)) {
                options = TC.Util.extend({}, options);

                if (value === null) {
                    options.expires = -1;
                }

                if (typeof options.expires === 'number') {
                    var days = options.expires, t = options.expires = new Date();
                    t.setDate(t.getDate() + days);
                }

                value = String(value);

                return (document.cookie = [
                    encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                    options.expires ? ';expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                    options.path ? ';path=' + options.path : '',
                    options.domain ? ';domain=' + options.domain : '',
                    options.secure ? ';secure' : ''
                ].join(''));
            }

            // key and possibly options given, get cookie...
            options = value || {};
            var decode = options.raw ? raw : decoded;
            var cookies = document.cookie.split('; ');
            for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
                if (decode(parts.shift()) === key) {
                    return decode(parts.join('='));
                }
            }
            return null;
        };

    })();
}

document.addEventListener('DOMContentLoaded', function () {

    // Completamos los datos de versión
    var build;
    var mapLibrary = 'Unknown library';
    var OL = 'OpenLayers';
    if (TC.Control) {
        build = 'Compiled';
        if (window.ol) {
            mapLibrary = OL + ' ' + ol.VERSION;
        }
    }
    else {
        build = 'On demand';
        mapLibrary = OL;
    }
    TC.version = TC.version + ' (' + build + '; ' + mapLibrary + '; @ ' + TC.apiLocation + ')';

    TC.browser = TC.Util.getBrowser();

    TC.loadJS(!TC.Cfg.acceptedBrowserVersions, TC.apiLocation + 'TC/config/browser-versions.js', function (result) {
        TC._isSupported = true;
        var versions = TC.Cfg.acceptedBrowserVersions;

        var match = versions.filter(function (item) {
            return item.name.toLowerCase() === TC.browser.name.toLowerCase();
        });

        // GLS: 14/02/2019 Añadimos gestión para que no muestre tostada ni envíe correos en caso de que el navegador sea uno expirado
        if (match.length > 0 && match[0].expired) {
            TC.Cfg.loggingErrorsEnabled = false;
        } else {
            if (match.length > 0 && !isNaN(match[0].version)) {
                if (TC.browser.version < match[0].version) {
                    TC._isSupported = false;
                }
            }

            if (TC.Cfg.oldBrowserAlert && !TC._isSupported) {
                TC.Cfg.loggingErrorsEnabled = false;
                const mapObj = TC.Map.get(document.querySelector('.' + TC.Consts.classes.MAP));

                TC.i18n.loadResources(!TC.i18n[mapObj.options.locale], TC.apiLocation + 'TC/resources/', mapObj.options.locale).then(function () {
                    TC.error(TC.Util.getLocaleString(mapObj.options.locale, 'outdatedBrowser'), TC.Consts.msgErrorMode.TOAST);
                });
            }
        }
    });

    if (/ip(ad|hone|od)/i.test(navigator.userAgent)) {
        // En iOS, el primer click es un mouseover, por eso usamos touchstart como sustituto.
        TC.Consts.event.CLICK = "touchstart";
    }

    // Gestión de errores
    if (TC.Cfg.loggingErrorsEnabled) {

        if (!window.JL) {
            TC.syncLoadJS(TC.apiLocation + TC.Consts.url.JSNLOG);
        }

        JL.defaultAjaxUrl = TC.Consts.url.ERROR_LOGGER;

        const onError = (function () {
            var errorCount = 0;

            var mapObj;

            return function (e) {
                mapObj = mapObj || TC.Map.get(document.querySelector('.' + TC.Consts.classes.MAP));

                var errorMsg, url = "", lineNumber = -1, column = -1, errorObj, apiError;

                if (e.type === "unhandledrejection") {
                    errorMsg = e.reason ? e.reason.message : "";
                    if (e.reason && e.reason.stack) {
                        apiError = e.reason.stack.indexOf(TC.apiLocation) >= 0;
                    } else {
                        apiError = true;
                    }
                    errorObj = e.reason;
                } else {
                    errorMsg = e.message;
                    url = e.filename;
                    lineNumber = e.lineno;
                    column = e.colno;
                    errorObj = e.error;
                    apiError = url.indexOf(TC.apiLocation) >= 0;
                }

                // Si notifyApplicationErrors === false solo capturamos los errores de la API
                if ((TC.Cfg.notifyApplicationErrors || apiError) && errorCount < TC.Cfg.maxErrorCount && TC.Cfg.loggingErrorsEnabled) {
                    // Send object with all data to server side log, using severity fatal, 
                    // from logger "onerrorLogger"

                    const previousMapState = mapObj.getPreviousMapState();

                    // 13/03/2020 añadimos el estado de los controles a la URL que se enviará por correo
                    const endProcess = function (appUrl) {
                        var msg = apiError ? TC.Consts.text.API_ERROR : TC.Consts.text.APP_ERROR;
                        JL("onerrorLogger").fatalException({
                            "msg": msg,
                            "errorMsg": errorMsg,
                            "url": url,
                            "lineNumber": lineNumber,
                            "column": column,
                            "appUrl": appUrl,
                            "apiVersion": TC.version,
                            "prevState": previousMapState,
                            "userAgent": navigator.userAgent
                        }, errorObj);
                        errorCount++;
                    };

                    let appUrl = location.href;
                    const controlStates = mapObj.exportControlStates() || [];
                    if (controlStates.length > 0) {
                        var currentUrl = location.href;
                        const hashPosition = currentUrl.indexOf('#');
                        if (hashPosition > 0) {
                            currentUrl = currentUrl.substring(0, hashPosition);
                        }

                        mapObj.getMapState({ extraStates: { ctl: controlStates } }).then(state => {
                            appUrl = currentUrl.concat("#", state);
                            endProcess(appUrl);
                        });
                    }
                    else {
                        endProcess(appUrl);
                    }

                    if (!TC.isDebug) {
                        var DEFAULT_CONTACT_EMAIL = "webmaster@itracasa.es";
                        TC.i18n.loadResources(!TC.i18n[mapObj.options.locale], TC.apiLocation + 'TC/resources/', mapObj.options.locale)
                            .then(function () {
                                TC.error(TC.Util.getLocaleString(mapObj.options.locale, "genericError") + (mapObj.options.contactEmail || DEFAULT_CONTACT_EMAIL), { type: TC.Consts.msgType.ERROR });
                            });
                    }
                }
                // Tell browser to run its own error handler as well   
                return false;
            };
        })();

        window.addEventListener('error', onError, false);
        window.addEventListener('unhandledrejection', onError, false);
    }
});

/**
 * Espacio de nombres donde se encuentran las clases de la API SITNA.
 * @namespace
 */

var SITNA = window.SITNA || {};
var TC = window.TC || {};
TC.isDebug = true;

/**
 * Espacio de nombres donde se encuentran las constantes de utilidad.
 * @namespace SITNA.Consts
 */
SITNA.Consts = TC.Consts;

/**
 * Configuración general de la API. Cualquier llamada a un método o un constructor de la API sin parámetro de opciones toma las opciones de aquí. 
 * Hay que tener en cuenta que el archivo config.json de una maquetación puede sobreescribir los valores por defecto de las propiedades de este espacio de nombres 
 * (consultar el tutorial {@tutorial layout_cfg} para ver instrucciones de uso de maquetaciones).
 * @member Cfg
 * @type MapOptions
 * @memberof SITNA
 * @example <caption>Configuración de capas base - [Ver en vivo](../examples/Cfg.baseLayers.html)</caption> {@lang html}
 * <div id="mapa"></div>
 * <script>
 *     // Establecer un proxy porque se hacen peticiones a otro dominio.
 *     SITNA.Cfg.proxy = "proxy/proxy.ashx?";
 * 
 *     // Añadir PNOA y establecerla como mapa de fondo por defecto.
 *     SITNA.Cfg.baseLayers.push({
 *         id: "PNOA",
 *         url: "http://www.ign.es/wms-inspire/pnoa-ma",
 *         layerNames: "OI.OrthoimageCoverage",
 *         isBase: true
 *     });
 *     SITNA.Cfg.defaultBaseLayer = "PNOA";
 * 
 *     var map = new SITNA.Map("mapa");
 * </script>
 * @example <caption>Configuración de CRS - [Ver en vivo](../examples/Cfg.crs.html)</caption> {@lang html}
 * <div id="mapa"></div>
 * <script>
 *     // SITNA.Cfg.baseLayers[0] (capa por defecto) no es compatible con WGS 84, lo cambiamos por SITNA.Consts.layer.IDENA_DYNBASEMAP.
 *     SITNA.Cfg.baseLayers[0] = SITNA.Consts.layer.IDENA_DYNBASEMAP;
 *     SITNA.Cfg.defaultBaseLayer = SITNA.Consts.layer.IDENA_DYNBASEMAP;
 *     
 *     // WGS 84
 *     SITNA.Cfg.crs = "EPSG:4326";
 *     // Coordenadas en grados decimales, porque el sistema de referencia espacial es WGS 84.
 *     SITNA.Cfg.initialExtent = [-2.848205, 41.789124, -0.321350, 43.557898];
 *     SITNA.Cfg.maxExtent = [-2.848205, 41.789124, -0.321350, 43.557898];
 *     
 *     var map = new SITNA.Map("mapa", {
 *         // SITNA.Cfg.baseLayers[0] (capa por defecto) no es compatible con WGS 84, establecer la capa SITNA.Consts.layer.IDENA_DYNBASEMAP en el control de mapa de situación.
 *         controls: {
 *             overviewMap: {
 *                 layer: SITNA.Consts.layer.IDENA_DYNBASEMAP
 *             }
 *         }
 *     });
 * </script>
 * @example <caption>Configuración de capas de trabajo - [Ver en vivo](../examples/Cfg.workLayers.html)</caption> {@lang html}
 * <div id="mapa"></div>
 * <script>
 *     // Establecer un proxy porque se hacen peticiones a otro dominio.
 *     SITNA.Cfg.proxy = "proxy/proxy.ashx?";
 * 
 *     SITNA.Cfg.workLayers = [{
 *              id: "terremotos",
 *              title: "Terremotos últimos 365 días",
 *              type: SITNA.Consts.layerType.WMS,
 *              url: "https://www.ign.es/wms-inspire/geofisica",
 *              layerNames: ["Ultimos365dias"]
 *          }
 *     ];
 *     var map = new SITNA.Map("mapa");
 * </script>
 * @example <caption>Configuración de uso de proxy</caption> {@lang javascript}
 * SITNA.Cfg.proxy = ""; // Las peticiones a http://www.otrodominio.com se hacen directamente
 * 
 * SITNA.Cfg.proxy = "/cgi-bin/proxy.cgi?url="; // Las peticiones a http://www.otrodominio.com se convierten en peticiones a /cgi-bin/proxy.cgi?url=http://www.otrodominio.com
 */
SITNA.Cfg = TC.Cfg;

SITNA.Cfg.layout = TC.apiLocation + 'TC/layout/responsive';

/**
 * Objeto principal de la API, instancia un mapa dentro de un elemento del DOM. Nótese que la inicialización del mapa es asíncrona, por tanto cualquier código
 * que haga uso de este objeto debería estar dentro de una función de callback pasada como parámetro al método [loaded]{@link SITNA.Map#loaded}.
 *
 * Las opciones de configuración del mapa son una combinación de las opciones de configuración global (definidas en {@link SITNA.Cfg},
 * las opciones definidas por la [maquetación]{@tutorial layout_cfg} que utilicemos, y las opciones pasadas como parámetro al
 * constructor. Estas opciones están ordenadas de menor a mayor prevalencia, de modo que por ejemplo una opción pasada como parámetro del constructor
 * siempre sobreescribirá una opción de la configuración global.
 * @class Map
 * @memberof SITNA
 * @param {HTMLElement|string} div Elemento del DOM en el que crear el mapa o valor de atributo id de dicho elemento.
 * @param {MapOptions} [options] Objeto de opciones de configuración del mapa. Sus propiedades sobreescriben las del objeto de configuración global {@link SITNA.Cfg}.
 * @see SITNA.Cfg
 * @see layout_cfg
 * @example <caption>[Ver en vivo](../examples/Map.1.html)</caption> {@lang html}
 * <div id="mapa"/>
 * <script>
 *     // Crear un mapa con las opciones por defecto.
 *     var map = new SITNA.Map("mapa");
 * </script>
 * @example <caption>[Ver en vivo](../examples/Map.2.html)</caption> {@lang html}
 * <div id="mapa"/>
 * <script>
 *     // Crear un mapa en el sistema de referencia WGS 84 con el de mapa de fondo.
 *     var map = new SITNA.Map("mapa", {
 *         crs: "EPSG:4326",
 *         initialExtent: [ // Coordenadas en grados decimales, porque el sistema de referencia espacial es WGS 84.
 *             -2.84820556640625,
 *             41.78912492257675,
 *             -0.32135009765625,
 *             43.55789822064767
 *         ],
 *         maxExtent: [
 *             -2.84820556640625,
 *             41.78912492257675,
 *             -0.32135009765625,
 *             43.55789822064767
 *         ],
 *         baselayerExtent: [
 *             -2.84820556640625,
 *             41.78912492257675,
 *             -0.32135009765625,
 *             43.55789822064767
 *         ],
 *         baseLayers: [
 *             SITNA.Consts.layer.IDENA_DYNBASEMAP
 *         ],
 *         defaultBaseLayer: SITNA.Consts.layer.IDENA_DYNBASEMAP,
 *         // Establecemos el mapa de situación con una capa compatible con WGS 84
 *         controls: {
 *             overviewMap: {
 *                 layer: SITNA.Consts.layer.IDENA_DYNBASEMAP
 *             }
 *         }
 *     });
 * </script>
 * @example <caption>[Ver en vivo](../examples/Map.3.html)</caption> {@lang html}
 * <div id="mapa"/>
 * <script>
 *     // Crear un mapa que tenga como contenido las capas de toponimia y mallas cartográficas del WMS de IDENA.
 *     var map = new SITNA.Map("mapa", {
 *         workLayers: [
 *             {
 *                 id: "topo_mallas",
 *                 title: "Toponimia y mallas cartográficas",
 *                 type: SITNA.Consts.layerType.WMS,
 *                 url: "//idena.navarra.es/ogc/wms",
 *                 layerNames: "IDENA:TOPONI_Txt_Toponimos,IDENA:mallas"
 *             }
 *         ]
 *     });
 * </script>
 */

SITNA.Map = function (div, options) {
    var map = this;

    if (TC.Cfg.controls.search) {
        // Por defecto en SITNA todas las búsquedas están habilitadas
        TC.Cfg.controls.search.allowedSearchTypes = TC.Util.extend(TC.Cfg.controls.search.allowedSearchTypes, {
            urban: {},
            street: {},
            number: {},
            cadastral: {}
        });

        if (options && options.controls && options.controls.search) {
            var keys = Object.keys(options.controls.search);

            var searchCfg = TC.Util.extend(options.controls.search, { allowedSearchTypes: {} });

            keys.forEach(function (key) {
                if (typeof (options.controls.search[key]) === "boolean" || TC.Util.isPlainObject(options.controls.search[key])) {
                    if (options.controls.search[key]) {

                        switch (true) {
                            case (key === "placeName"):
                                searchCfg.allowedSearchTypes[TC.Consts.searchType.PLACENAME] = TC.Util.isPlainObject(options.controls.search[key]) ? options.controls.search[key] : {};
                                break;
                            case (key === "placeNameMunicipality"):
                                searchCfg.allowedSearchTypes[TC.Consts.searchType.PLACENAMEMUNICIPALITY] = TC.Util.isPlainObject(options.controls.search[key]) ? options.controls.search[key] : {};
                                break;
                            case (key === "postalAddress"):
                                searchCfg.allowedSearchTypes[TC.Consts.searchType.NUMBER] = TC.Util.isPlainObject(options.controls.search[key]) ? options.controls.search[key] : {};
                                break;
                            case (key === "cadastralParcel"):
                                searchCfg.allowedSearchTypes[TC.Consts.searchType.CADASTRAL] = TC.Util.isPlainObject(options.controls.search[key]) ? options.controls.search[key] : {};
                                break;
                            case (key === "town"):
                                searchCfg.allowedSearchTypes[TC.Consts.searchType.URBAN] = TC.Util.isPlainObject(options.controls.search[key]) ? options.controls.search[key] : {};
                                break;
                            default:
                                searchCfg.allowedSearchTypes[key] = TC.Util.isPlainObject(options.controls.search[key]) ? options.controls.search[key] : {};
                        }
                    }

                    delete searchCfg[key];
                }
            });

            options.controls.search = searchCfg;
        }
    }

    if (TC.Cfg.controls.threeD) {
        if (SITNA.Cfg.views && SITNA.Cfg.views.threeD) {
            SITNA.Cfg.views.threeD.controls = [
                "search",
                "toc",
                "attribution",
                "basemapSelector",
                "workLayerManager",
                "layerCatalog",
                "featureInfo",
                "fullScreen",
                "loadingIndicator",
                "navBarHome",
                "navBar",
                "overviewMap",
                "legend",
                "threeD",
                "coordinates",
                "geolocation",
                "resultsPanel",
                "share"
            ];
        }
    }

    var tcMap = new TC.Map(div, options);
    var tcSearch;
    var tcSearchLayer;

    /**
     * Añade una capa al mapa. Si se le pasa un objeto del Tipo {@link LayerOptions} como parámetro `layer`
     * y tiene definida la propiedad `url`, establece por defecto
     * el tipo de capa a {@link SITNA.Consts.layerType.KML} si la URL acaba en _**.kml**_.
     * 
     * El tipo de la capa no puede ser {@link SITNA.Consts.layerType.WFS}.
     * @method addLayer
     * @memberof SITNA.Map
     * @instance
     * @async
     * @param {string|LayerOptions} layer Identificador de capa u objeto de opciones de capa.
     * @param {function} [callback] Función a la que se llama tras ser añadida la capa.     
     * @example <caption>[Ver en vivo](../examples/Map.addLayer.1.html)</caption> {@lang html}
     * <div id="mapa"></div>
     * <script>
     *     // Crear un mapa con las opciones por defecto.
     *     var map = new SITNA.Map("mapa");
     *     // Cuando esté todo cargado proceder a trabajar con el mapa.
     *     map.loaded(function () {
     *         // Añadir al mapa la capa de cartografía topográfica de IDENA
     *         map.addLayer(SITNA.Consts.layer.IDENA_CARTO);
     *     });
     * </script>
     * @example <caption>[Ver en vivo](../examples/Map.addLayer.2.html)</caption> {@lang html}
     * <div id="mapa"></div>
     * <script>
     *     // Crear un mapa con las opciones por defecto.
     *     var map = new SITNA.Map("mapa");
     * 
     *     // Cuando esté todo cargado proceder a trabajar con el mapa.
     *     map.loaded(function () {
     *         // Añadir al mapa un documento KML
     *         map.addLayer({
     *             id: "capa_kml",
     *             title: "Museos en Navarra",
     *             type: SITNA.Consts.layerType.KML,
     *             url: "data/MUSEOSNAVARRA.kml"
     *         });
     *     });
     * </script>
     */
    map.addLayer = function (layer, callback) {
        tcMap.addLayer(layer, callback);
    };

    /**
     * Hace visible una capa como mapa de fondo. Esta capa debe existir previamente en la lista de mapas de fondo del mapa.
     * @method setBaseLayer
     * @memberof SITNA.Map
     * @instance
     * @async
     * @param {string|LayerOptions} layer Identificador de capa u objeto de opciones de capa. 
     * @param {function} [callback] Función al que se llama tras ser establecida la capa como mapa de fondo.
     * @example <caption>[Ver en vivo](../examples/Map.setBaseLayer.1.html)</caption> {@lang html}
     * <div id="mapa"></div>
     * <script>
     *     // Crear mapa con opciones por defecto. Esto incluye la capa del catastro de Navarra entre los mapas de fondo.
     *     var map = new SITNA.Map("mapa");
     *     // Cuando esté todo cargado establecer como mapa de fondo visible el catastro de Navarra.
     *     map.loaded(function () {
     *         map.setBaseLayer(SITNA.Consts.layer.IDENA_CADASTER);
     *     });
     * </script>
     * @example <caption>[Ver en vivo](../examples/Map.setBaseLayer.2.html)</caption> {@lang html} 
     * <div id="mapa"></div>
     * <script>
     *     // Crear mapa con opciones por defecto.
     *     var map = new SITNA.Map("mapa");
     *     // Cuando el mapa esté cargado, añadir la ortofoto de 1956/1957 como mapa de fondo y establecerla como mapa de fondo visible.
     *     map.loaded(function () {
     *         map.addLayer({
     *             id: "orto_56_57",
     *             title: "Ortofoto de 1956/1957",
     *             url: "http://idena.navarra.es/ogc/wms",
     *             layerNames: "ortofoto_10000_1957",
     *             isBase: true
     *         }, function () {
     *             map.setBaseLayer("orto_56_57");
     *         });
     *     });
     * </script>
     */
    map.setBaseLayer = function (layer, callback) {
        tcMap.setBaseLayer(layer, callback);
    };

    /**
     * Añade un marcador (un punto asociado a un icono) al mapa.
     * @method addMarker
     * @memberof SITNA.Map
     * @instance
     * @param {array} coords Coordenadas x e y del punto en las unidades del sistema de referencia del mapa.
     * @param {MarkerOptions} [options] Objeto de opciones de marcador.
     * @example <caption>[Ver en vivo](../examples/Map.addMarker.1.html)</caption> {@lang html}
     * <div id="mapa"></div>
     * <script>
     *     // Crear mapa.
     *     var map = new SITNA.Map("mapa");
     * 
     *     // Cuando esté todo cargado proceder a trabajar con el mapa.
     *     map.loaded(function () {
     *         // Añadir un marcador.
     *         map.addMarker([610749, 4741648]);
     *         // Centrar el mapa en el marcador.
     *         map.zoomToMarkers();
     *     });
     * </script> 
     * @example <caption>[Ver en vivo](../examples/Map.addMarker.2.html)</caption> {@lang html}   
     * <div id="mapa"></div>
     * <script>
     *     // Crear mapa.
     *     var map = new SITNA.Map("mapa");
     *     
     *     // Cuando esté todo cargado proceder a trabajar con el mapa.
     *     map.loaded(function () {
     *         // Añadir marcadores al grupo "Marcadores colgantes"
     *         // cuyo icono se ancle al punto en el centro hacia abajo.
     *         // Establecer un icono adecuado.
     *         var markerOptions = {
     *             group: "Marcadores colgantes",
     *             url: "data/colgante.png",
     *             anchor: [0.5, 0]
     *         };
     *         map.addMarker([610887, 4741244], markerOptions);
     *         map.addMarker([615364, 4657556], markerOptions);
     *         // Centrar el mapa en los marcadores.
     *         map.zoomToMarkers();
     *     });
     * </script> 
     * @example <caption>[Ver en vivo](../examples/Map.addMarker.3.html)</caption> {@lang html}
     * <div id="mapa"></div>
     * <script>
     *     // Crear un mapa con una capa vectorial, centrado en la Ciudadela de Pamplona.
     *     var map = new SITNA.Map("mapa", {
     *         initialExtent: [
     *             609627,
     *             4740225,
     *             611191,
     *             4741395
     *         ],
     *         workLayers: [{
     *             id: "markers",
     *             title: "Marcadores geográficos",
     *             type: SITNA.Consts.layerType.VECTOR
     *         }]
     *     });
     *     // Cuando esté todo cargado proceder a trabajar con el mapa.
     *     map.loaded(function () {
     *         // Añadir un marcador en la capa "markers",
     *         // asignarle un grupo para que salga en tabla de contenidos y leyenda.
     *         map.addMarker([610431, 4740837], {
     *             layer: "markers",
     *             group: "Ciudadela"
     *         });
     *     });
     * </script>
     * @example <caption>[Ver en vivo](../examples/Map.addMarker.4.html)</caption> {@lang html}  
     * <div id="mapa"></div>
     * <script>
     *     // Añadir información emergente al mapa.
     *     SITNA.Cfg.controls.popup = true;
     *     
     *     // Crear un mapa.
     *     var map = new SITNA.Map("mapa");
     *     // Cuando esté todo cargado proceder a trabajar con el mapa.
     *     map.loaded(function () {
     *         // Añadir un marcador con un icono de 40x40 píxeles definido por la clase CSS kiosko.
     *         // Asignarle unos datos asociados que se muestren por defecto.
     *         map.addMarker([615366, 4657426], {
     *             cssClass: "kiosko",
     *             width: 40,
     *             height: 40,
     *             data: {
     *                 "Nombre": "Plaza de la Constitución, Tudela",
     *                 "Sitio web": "http://www.tudela.es/"
     *             },
     *             showPopup: true
     *         });
     *         // Centrar el mapa en el marcador.
     *         map.zoomToMarkers();
     *     });
     * </script> 
     */
    map.addMarker = function (coords, options) {
        tcMap.addMarker(coords, options);
    };

    /**
     * Centra y escala el mapa a la extensión que ocupan todos sus marcadores.
     * @method zoomToMarkers
     * @memberof SITNA.Map
     * @instance
     * @param {object} [options] Objeto de opciones de zoom.
     * @param {number} [options.pointBoundsRadius=30] Radio en metros del área alrededor del marcador que se respetará al hacer zoom. Por defecto es 30.
     * @param {number} [options.extentMargin=0.2] Tamaño del margen que se aplicará a la extensión total de todas los marcadores.
     * El valor es la relación de crecimiento en ancho y alto entre la extensión resultante y la original. Por ejemplo, el valor por defecto 0,2 indica un crecimiento del 20% de la extensión, 10% por cada lado.
     * @example <caption>[Ver en vivo](../examples/Map.zoomToMarkers.html)</caption> {@lang html}  
     * <div class="controls">
     *     <div><button id="addMarkerBtn">Añadir marcador aleatorio</button></div>
     *     <div><input type="number" step="1" id="pbrVal" value="30" /> <label for="pbrVal">pointBoundsRadius</label></div>
     *     <div><input type="number" step="0.1" id="emVal" value="0.2" /> <label for="emVal">extentMargin</label></div>
     *     <div><button id="zoomBtn">Hacer zoom a los marcadores</button></div>
     * </div>
     * <div id="mapa"></div>
     * <script>
     *     // Crear mapa.
     *     var map = new SITNA.Map("mapa");
     *       
     *     // Añadir un marcador en un punto aleatorio
     *     var addRandomMarker = function () {
     *         var xmin = SITNA.Cfg.initialExtent[0];
     *         var ymin = SITNA.Cfg.initialExtent[1];
     *         var width = SITNA.Cfg.initialExtent[2] - SITNA.Cfg.initialExtent[0];
     *         var height = SITNA.Cfg.initialExtent[3] - SITNA.Cfg.initialExtent[1];
     *         map.addMarker([xmin + Math.random() width, ymin + Math.random() height]);
     *     };
     * 
     *     // Hacer zoom a los marcadores con las opciones elegidas
     *     var zoomToMarkers = function () {
     *         map.zoomToMarkers({
     *             pointBoundsRadius: parseInt(document.getElementById("pbrVal").value),
     *             extentMargin: parseFloat(document.getElementById("emVal").value)
     *         });
     *     };
     *     
     *     document.getElementById("addMarkerBtn").addEventListener("click", addRandomMarker);
     *     document.getElementById("zoomBtn").addEventListener("click", zoomToMarkers);
     * </script> 
     */
    map.zoomToMarkers = function (options) {
        tcMap.zoomToMarkers(options);
    };

    /**
     * Añade una función de callback que se ejecutará cuando el mapa, sus controles y todas sus capas se hayan cargado.
     * @method loaded
     * @memberof SITNA.Map
     * @instance
     * @async
     * @param {function} callback Función a la que se llama tras la carga del mapa.
     * @example {@lang javascript}
     * // Notificar cuando se haya cargado el mapa.
     * map.loaded(function () { 
     *     console.log("Código del mapa y de sus controles cargado, datos cargados.");
     * });
     */
    map.loaded = function (callback) {
        tcMap.loaded(callback);
    };

    // Si existe el control featureInfo lo activamos.
    tcMap.loaded(function () {

        TC.loadJS(
            !TC.control.Search,
            TC.apiLocation + 'TC/control/Search',
            function () {
                tcSearch = new TC.control.Search();
                tcSearch.register(tcMap);

                tcSearch.getLayer() && tcSearch.getLayer().then(function (layer) {
                    tcSearchLayer = layer;
                });
            }
        );

        if (!tcMap.activeControl) {
            var fi = tcMap.getControlsByClass('TC.control.FeatureInfo')[0];
            if (fi) {
                fi.activate();
            }
        }
    });
    /**
     * Objeto proporcionado en las respuestas a peticiones de datos de búsqueda ({@link SITNA.Map#getMunicipalities}, etc.).
     * @typedef SITNA.Map~SearchResultItem
     * @see SITNA.Map#getCommonwealths
     * @see SITNA.Map#getCouncils
     * @see SITNA.Map#getMunicipalities
     * @see SITNA.Map#getUrbanAreas
     * @property {string} id - Identificador del elemento a buscar.
     * @property {string} label - Texto descriptivo del elemento a buscar que se mostrará en la lista de sugerencias de resultados de búsqueda.
     */

    /**
     * Función de callback que gestiona las respuestas a peticiones de datos de búsqueda ({@link SITNA.Map#getMunicipalities}, etc.).
     * @callback SITNA.Map~SearchDataCallback
     * @param {SITNA.Map~SearchResultItem[]} data - Lista de elementos de búsqueda. Cada elemento tiene un identificador y un texto descriptivo.
     */

    /**
     * Función de callback que gestiona las respuestas a búsquedas por identfificador ({@link SITNA.Map#searchMunicipality}, etc.).
     * @callback SITNA.Map~SearchByIdCallback
     * @param {string} queryId - Identificador de consulta realizada. Su valor es `undefined` si no hay resultado.
     */

    /*
      Obtiene los valores ({@link SITNA.Map~SearchResultItem}) de las entidades geográficas disponibles en la capa de IDENA que corresponda según el parámetro searchType. 
      Puede consultar también online el [ejemplo 1](../examples/Map.getQueryableData.html). 
    
     method getQueryableData
     async
     param {string|SITNA.consts.MapSearchType} searchType Fuente de datos del cual obtendremos los valores disponibles para buscar posteriormente.
     param {function} [callback] Función a la que se llama tras obtener los datos.  
     example
        <div class="instructions divSelect">
            <div>
                Municipios
                <select id="municipality" onchange="applyFilter(this)">
                    <option value="-1">Seleccione...</option>
                </select>
                <br />
                <br />
                Concejos
                <select id="council" onchange="applyFilter(this)">
                    <option value="-1">Seleccione...</option>
                </select>
                <br />
                <br />
                Casco Urbano
                <select id="urban" onchange="applyFilter(this)">
                    <option value="-1">Seleccione...</option>
                </select>
                <br />
                <br />
                Manconmunidad
                <select id="commonwealth" onchange="applyFilter(this)">
                    <option value="-1">Seleccione...</option>
                </select>
            </div>
        </div>
        <div id="mapa"></div>
        <script>
        // Crear mapa.
        var map = new SITNA.Map("mapa");

        map.loaded(function () {
            // completamos el desplegable de municipios
            map.getQueryableData(SITNA.Consts.mapSearchType.MUNICIPALITY, function (data) {
                var fragment = document.createDocumentFragment();
                data.forEach(function (value) {
                    var option = document.createElement("option");
                    option.setAttribute("value", value.id);
                    option.textContent = value.label;
                    fragment.appendChild(option);
                });
                document.querySelector("#municipality").appendChild(fragment);
            });

            // completamos el desplegable de concejos
            map.getQueryableData(SITNA.Consts.mapSearchType.COUNCIL, function (data) {
                var fragment = document.createDocumentFragment();
                data.forEach(function (value) {
                    var option = document.createElement("option");
                    option.setAttribute("value", value.id);
                    option.textContent = value.label;
                    fragment.appendChild(option);
                });
                document.querySelector("#council").appendChild(fragment);
            });

            // completamos el desplegable de cascos urbanos
            map.getQueryableData(SITNA.Consts.mapSearchType.URBAN, function (data) {
                var fragment = document.createDocumentFragment();
                data.forEach(function (value) {
                    var option = document.createElement("option");
                    option.setAttribute("value", value.id);
                    option.textContent = value.label;
                    fragment.appendChild(option);
                });
                document.querySelector("#urban").appendChild(fragment);
            });

            // completamos el desplegable de mancomunidades de residuos
            map.getQueryableData(SITNA.Consts.mapSearchType.COMMONWEALTH, function (data) {
                var fragment = document.createDocumentFragment();
                data.forEach(function (value) {
                    var option = document.createElement("option");
                    option.setAttribute("value", value.id);
                    option.textContent = value.label;
                    fragment.appendChild(option);
                });
                document.querySelector("#commonwealth").appendChild(fragment);
            });
        });

        // Establecer como filtro del mapa el valor seleccionado del desplegable que lance el evento change
        function applyFilter(target) {
            if (target) {
                var municipalitySelect = document.querySelector("#municipality");
                var councilSelect = document.querySelector("#council");
                var urbanSelect = document.querySelector("#urban");
                var commonwealthSelect = document.querySelector("#commonwealth");
                var id = target.querySelector('option:checked').value;
                var searchType;
                switch (true) {
                    case target.id == SITNA.Consts.mapSearchType.MUNICIPALITY:
                        searchType = SITNA.Consts.mapSearchType.MUNICIPALITY;

                        councilSelect.value = -1;
                        urbanSelect.value = -1;
                        commonwealthSelect.value = -1;
                        break;
                    case target.id == SITNA.Consts.mapSearchType.COUNCIL:
                        searchType = SITNA.Consts.mapSearchType.COUNCIL;

                        municipalitySelect.value = -1;
                        urbanSelect.value = -1;
                        commonwealthSelect.value = -1;
                        break;
                    case target.id == SITNA.Consts.mapSearchType.URBAN:
                        searchType = SITNA.Consts.mapSearchType.URBAN;

                        municipalitySelect.value = -1;
                        councilSelect.value = -1;
                        commonwealthSelect.value = -1;
                        break;
                    case target.id == SITNA.Consts.mapSearchType.COMMONWEALTH:
                        searchType = SITNA.Consts.mapSearchType.COMMONWEALTH;

                        municipalitySelect.value = -1;
                        councilSelect.value = -1;
                        urbanSelect.value = -1;
                        break;
                }

                if (id == -1)
                    map.removeSearch();
                else {
                    map.searchTyped(searchType, id, function (idQuery) {
                        if (idQuery == null) {
                            alert('No se han encontrado resultados');
                        }
                    });
                }
            }
        };
        </script>
    */
    map.getQueryableData = function (searchType, callback) {
        var queryable = tcSearch.availableSearchTypes[searchType];

        if (queryable.queryableData) {
            if (callback)
                callback(queryable.queryableData);
        } else {
            var params = {
                request: 'GetFeature',
                service: 'WFS',
                typename: queryable.featurePrefix + ':' + queryable.featureType,
                version: queryable.version,
                propertyname: (!(queryable.dataIdProperty instanceof Array) ? [queryable.dataIdProperty] : queryable.dataIdProperty)
                    .concat((!(queryable.outputProperties instanceof Array) ? [queryable.outputProperties] : queryable.outputProperties)).join(','),
                outputformat: TC.Consts.format.JSON
            };

            var url = queryable.url + '?' + TC.Util.getParamString(params);
            TC.ajax({
                url: url,
                responseType: TC.Consts.mimeType.JSON
            }).then(function (response) {
                const responseData = response.data;
                queryable.queryableData = [];

                if (responseData.features) {
                    var features = responseData.features;

                    for (var i = 0; i < features.length; i++) {
                        var f = features[i];
                        var data = {};

                        data.id = [];
                        if (!(queryable.dataIdProperty instanceof Array))
                            queryable.dataIdProperty = [queryable.dataIdProperty];

                        for (var ip = 0; ip < queryable.dataIdProperty.length; ip++) {
                            if (f.properties.hasOwnProperty(queryable.dataIdProperty[ip])) {
                                data.id.push(f.properties[queryable.dataIdProperty[ip]]);
                            }
                        }

                        data.id = queryable.idPropertiesIdentifier ? data.id.join(queryable.idPropertiesIdentifier) : data.id.join('');

                        data.label = [];
                        if (!(queryable.outputProperties instanceof Array))
                            queryable.outputProperties = [queryable.outputProperties];

                        for (var lbl = 0; lbl < queryable.outputProperties.length; lbl++) {
                            if (f.properties.hasOwnProperty(queryable.outputProperties[lbl])) {
                                data.label.push(f.properties[queryable.outputProperties[lbl]]);
                            }
                        }

                        var add = (data.label instanceof Array && data.label.join('').trim().length > 0) || (!(data.label instanceof Array) && data.label.trim().length > 0);
                        data.label = queryable.outputFormatLabel ? queryable.outputFormatLabel.tcFormat(data.label) : data.label.join('-');

                        if (add)
                            queryable.queryableData.push(data);
                    }
                }

                queryable.queryableData = queryable.queryableData.sort(function (a, b) {
                    if (queryable.idPropertiesIdentifier ? a.id.indexOf(queryable.idPropertiesIdentifier) == -1 : false) {
                        if (tcSearch.removePunctuation(a.label) < tcSearch.removePunctuation(b.label))
                            return -1;
                        else if (tcSearch.removePunctuation(a.label) > tcSearch.removePunctuation(b.label))
                            return 1;
                        else
                            return 0;
                    } else {
                        if (tcSearch.removePunctuation(a.label.split(' ')[0]) < tcSearch.removePunctuation(b.label.split(' ')[0]))
                            return -1;
                        else if (tcSearch.removePunctuation(a.label.split(' ')[0]) > tcSearch.removePunctuation(b.label.split(' ')[0]))
                            return 1;
                        else
                            return 0;
                    }
                });
                queryable.queryableData = queryable.queryableData.filter(function (value, index, arr) {
                    if (index < 1)
                        return true;
                    else
                        return value.id !== arr[index - 1].id && value.label !== arr[index - 1].label;
                });

                if (callback)
                    callback(queryable.queryableData);
            });
        }
    };
    /**
     * Obtiene los valores ({@link SITNA.Map~SearchResultItem}) de los municipios disponibles en la capa de IDENA.
     * @method getMunicipalities
     * @memberof SITNA.Map
     * @instance
     * @async  
     * @param {SITNA.Map~SearchDataCallback} callback - Función a la que se llama tras obtener los datos.
     * @example <caption>[Ver en vivo](../examples/Map.getMunicipalities.html)</caption> {@lang html} 
     * <div class="instructions divSelect">
     *     <div>
     *         Municipios
     *         <select id="municipality" onchange="applyFilter()">
     *             <option value="-1">Seleccione...</option>
     *         </select>
     *     </div>
     * </div>
     * <div id="mapa"></div>
     * <script>
     *     // Crear mapa.
     *     var map = new SITNA.Map("mapa");
     * 
     *     map.loaded(function () {
     *         // completamos el desplegable
     *         map.getMunicipalities(function (data) {
     *             var fragment = document.createDocumentFragment();
     *             data.forEach(function (value) {
     *                 var option = document.createElement("option");
     *                 option.setAttribute("value", value.id);
     *                 option.textContent = value.label;
     *                 fragment.appendChild(option);
     *             });
     *             document.querySelector("#municipality").appendChild(fragment);
     *         });
     *     });
     *
     *     // Establecer como filtro del mapa el valor seleccionado del desplegable que lance el evento change
     *     function applyFilter() {
     *         var id = document.querySelector("#council").querySelector("option:checked").value;
     *         if (id == -1)
     *             map.removeSearch();
     *         else {
     *             map.searchMunicipality(id, function (idQuery) {
     *                 if (idQuery == null) {
     *                     alert("No se han encontrado resultados");
     *                 }
     *             });
     *         }
     *     };
     * </script> 
     */
    map.getMunicipalities = function (callback) {
        map.getQueryableData(SITNA.Consts.mapSearchType.MUNICIPALITY, callback);
    };
    /**
     * Obtiene los valores ({@link SITNA.Map~SearchResultItem}) de los cascos urbanos disponibles en la capa de IDENA.
     * @method getUrbanAreas
     * @memberof SITNA.Map
     * @instance
     * @async  
     * @param {SITNA.Map~SearchDataCallback} callback - Función a la que se llama tras obtener los datos.  
     * @example <caption>[Ver en vivo](../examples/Map.getUrbanAreas.html)</caption> {@lang html} 
     * <div class="instructions divSelect">
     *     <div>
     *         Cascos urbanos
     *         <select id="urban" onchange="applyFilter()">
     *             <option value="-1">Seleccione...</option>
     *         </select>
     *     </div>
     * </div>
     * <div id="mapa"></div>
     * <script>
     *     // Crear mapa.
     *     var map = new SITNA.Map("mapa");
     *     
     *     map.loaded(function () {
     *         // completamos el desplegable
     *         map.getUrbanAreas(function (data) {
     *             var fragment = document.createDocumentFragment();
     *             data.forEach(function (value) {
     *                 var option = document.createElement("option");
     *                 option.setAttribute("value", value.id);
     *                 option.textContent = value.label;
     *                 fragment.appendChild(option);
     *             });
     *             document.querySelector("#urban").appendChild(fragment);
     *         });
     *     });
     *
     *     // Establecer como filtro del mapa el valor seleccionado del desplegable que lance el evento change
     *     function applyFilter() {
     *         var id = document.querySelector("#urban").querySelector("option:checked").value;
     *         if (id == -1)
     *             map.removeSearch();
     *         else {
     *             map.searchUrbanArea(id, function (idQuery) {
     *                 if (idQuery == null) {
     *                     alert('No se han encontrado resultados');
     *                 }
     *             });
     *         }
     *     };
     * </script>
     */
    map.getUrbanAreas = function (callback) {
        map.getQueryableData(SITNA.Consts.mapSearchType.URBAN, callback);
    };
    /**
     * Obtiene los valores ({@link SITNA.Map~SearchResultItem}) de las mancomunidades de residuos disponibles en la capa de IDENA. 
     * @method getCommonwealths
     * @memberof SITNA.Map
     * @instance
     * @async  
     * @param {SITNA.Map~SearchDataCallback} callback - Función a la que se llama tras obtener los datos.  
     * @example <caption>[Ver en vivo](../examples/Map.getCommonwealths.html)</caption> {@lang html} 
     * <div class="instructions divSelect">
     *     <div>
     *         Mancomunidades de residuos
     *         <select id="commonwealths" onchange="applyFilter()">
     *             <option value="-1">Seleccione...</option>
     *         </select>
     *     </div>
     * </div>
     * <div id="mapa"></div>
     * <script>
     *     // Crear mapa.
     *     var map = new SITNA.Map("mapa");
     *     
     *     map.loaded(function () {
     *         // completamos el desplegable
     *         map.getCommonwealths(function (data) {
     *             var fragment = document.createDocumentFragment();
     *             data.forEach(function (value) {
     *                 var option = document.createElement("option");
     *                 option.setAttribute("value", value.id);
     *                 option.textContent = value.label;
     *                 fragment.appendChild(option);
     *             });
     *             document.querySelector("#commonwealths").appendChild(fragment);
     *         });
     *     });
     *         
     *     // Establecer como filtro del mapa el valor seleccionado del desplegable que lance el evento change
     *     function applyFilter() {
     *         var id = document.querySelector("#commonwealths").querySelector("option:checked").value;
     *         if (id == -1)
     *             map.removeSearch();
     *         else {
     *             map.searchCommonwealth(id, function (idQuery) {
     *                 if (idQuery == null) {
     *                     alert("No se han encontrado resultados");
     *                 }
     *             });
     *         }
     *     };
     * </script>     
     */
    map.getCommonwealths = function (callback) {
        map.getQueryableData(SITNA.Consts.mapSearchType.COMMONWEALTH, callback);
    };
    /**
     * Obtiene los valores ({@link SITNA.Map~SearchResultItem}) de los concejos disponibles en la capa de IDENA. 
     * @method getCouncils
     * @memberof SITNA.Map
     * @instance
     * @async  
     * @param {SITNA.Map~SearchDataCallback} callback - Función a la que se llama tras obtener los datos.  
     * @example <caption>[Ver en vivo](../examples/Map.getCouncils.html)</caption> {@lang html} 
     * <div class="instructions divSelect">
     *     <div>
     *         Concejos
     *         <select id="council" onchange="applyFilter()">
     *             <option value="-1">Seleccione...</option>
     *         </select>
     *     </div>
     * </div>
     * <div id="mapa"></div>
     * <script>
     *     // Crear mapa.
     *     var map = new SITNA.Map("mapa");
     *     
     *     map.loaded(function () {
     *         // completamos el desplegable
     *         map.getCouncils(function (data) {
     *             var fragment = document.createDocumentFragment();
     *             data.forEach(function (value) {
     *                 var option = document.createElement("option");
     *                 option.setAttribute("value", value.id);
     *                 option.textContent = value.label;
     *                 fragment.appendChild(option);
     *             });
     *             document.querySelector("#council").appendChild(fragment);
     *         });
     *     });
     *     
     *     // Establecer como filtro del mapa el valor seleccionado del desplegable que lance el evento change
     *     function applyFilter() {
     *         var id = document.querySelector("#council").querySelector("option:checked").value;
     *         if (id == -1)
     *             map.removeSearch();
     *         else {
     *             map.searchCouncil(id, function (idQuery) {
     *                 if (idQuery == null) {
     *                     alert("No se han encontrado resultados");
     *                 }
     *             });
     *         }
     *     };
     * </script>
     */
    map.getCouncils = function (callback) {
        map.getQueryableData(SITNA.Consts.mapSearchType.COUNCIL, callback);
    };
    /**
     * Busca la mancomunidad de residuos y pinta en el mapa la entidad geográfica encontrada que corresponda al identificador indicado.
     * @method searchCommonwealth
     * @memberof SITNA.Map
     * @instance
     * @async
     * @param {string} id Identificador de la entidad geográfica a pintar.
     * @param {SITNA.Map~SearchByIdCallback} [callback] Función a la que se llama tras aplicar el filtro.  
     * @example <caption>[Ver en vivo](../examples/Map.searchCommonwealth.html)</caption> {@lang html} 
     * <div class="instructions searchCommonwealth">    
     *     <div><button id="searchPamplonaBtn">Buscar Mancomunidad de la Comarca de Pamplona</button></div>    
     * </div>
     * <div id="mapa"></div>
     * <script>
     *     // Crear mapa.
     *     var map = new SITNA.Map("mapa");
     *     map.loaded(function () {
     *         document.getElementById("searchPamplonaBtn").addEventListener("click", search);
     *     });
     *           
     *     var search = function () {
     *         map.removeSearch();
     *         map.searchCommonwealth("8", function (idQuery) {
     *             if (idQuery == null) {
     *                 alert("No se ha encontrado la mancomunidad con código 8.");
     *             }
     *         });
     *     };
     * </script>
     */
    map.searchCommonwealth = function (id, callback) {
        map.searchTyped(SITNA.Consts.mapSearchType.COMMONWEALTH, id, callback);
    };
    /**
     * Busca el concejo que corresponda con el identificador pasado como parámetro y pinta la entidad geográfica encontrada en el mapa.
     * @method searchCouncil
     * @memberof SITNA.Map
     * @instance
     * @async    
     * @param {string} id - Identificador de la entidad geográfica a pintar.
     * @param {SITNA.Map~SearchByIdCallback} [callback] - Función a la que se llama tras aplicar el filtro.  
     * @example <caption>[Ver en vivo](../examples/Map.searchCouncil.html)</caption> {@lang html} 
     * <div class="instructions search">    
     *     <div><button id="searchBtn">Buscar concejo Esquíroz (Galar)</button></div>    
     * </div>
     * <div id="mapa"></div>
     * <script>
     *     // Crear mapa.
     *     var map = new SITNA.Map("mapa");
     *     map.loaded(function () {
     *         document.getElementById("searchBtn").addEventListener("click", search);
     *     });
     *     
     *     var search = function () {
     *         map.removeSearch();
     *         map.searchCouncil("109#5", function (idQuery) {
     *             if (idQuery == null) {
     *                 alert("No se ha encontrado el concejo con código 109#5.");
     *             }
     *         });
     *     };    
     * </script>    
     */
    map.searchCouncil = function (id, callback) {
        map.searchTyped(SITNA.Consts.mapSearchType.COUNCIL, id, callback);
    };
    /**
     * Busca el casco urbano que corresponda con el identificador pasado como parámetro y pinta la entidad geográfica encontrada en el mapa.
     * @method searchUrbanArea
     * @memberof SITNA.Map
     * @instance
     * @async    
     * @param {string} id Identificador de la entidad geográfica a pintar.
     * @param {SITNA.Map~SearchByIdCallback} [callback] Función a la que se llama tras aplicar el filtro.  
     * @example <caption>[Ver en vivo](../examples/Map.searchUrbanArea.html)</caption> {@lang html} 
     * <div class="instructions search">
     *     <div><button id="searchBtn">Buscar casco urbano de Arbizu</button></div>
     * </div>
     * <div id="mapa"></div>
     * <script>
     *     // Crear mapa.
     *     var map = new SITNA.Map("mapa");
     *     map.loaded(function () {
     *         document.getElementById("searchBtn").addEventListener("click", search);
     *     });
     *     var search = function () {
     *         map.removeSearch();
     *         map.searchUrbanArea("27", function (idQuery) {
     *             if (idQuery == null) {
     *                 alert("No se ha encontrado el casco urbano con código 27.");
     *             }
     *         });
     *     };
     * </script>
     */
    map.searchUrbanArea = function (id, callback) {
        map.searchTyped(SITNA.Consts.mapSearchType.URBAN, id, callback);
    };
    /**
     * Busca el municipio que corresponda con el identificador pasado como parámetro y pinta la entidad geográfica encontrada en el mapa.
     * @method searchMunicipality
     * @memberof SITNA.Map
     * @instance
     * @async    
     * @param {string} id Identificador de la entidad geográfica a pintar.
     * @param {SITNA.Map~SearchByIdCallback} [callback] Función a la que se llama tras aplicar el filtro.  
     * @example <caption>[Ver en vivo](../examples/Map.searchMunicipality.html)</caption> {@lang html} 
     * <div class="instructions search">
     *     <div><button id="searchBtn">Buscar Arbizu</button></div>
     * </div>
     * <div id="mapa"></div>
     * <script>
     *     // Crear mapa.
     *     var map = new SITNA.Map("mapa");
     *     map.loaded(function () {
     *         document.getElementById("searchBtn").addEventListener("click", search);
     *     });
     *          
     *     var search = function () {
     *         map.removeSearch();
     *         map.searchMunicipality("27", function (idQuery) {
     *             if (idQuery == null) {
     *                 alert("No se ha encontrado el municipio con código 27.");
     *             }
     *         });
     *     };
     * </script>
     */
    map.searchMunicipality = function (id, callback) {
        map.searchTyped(SITNA.Consts.mapSearchType.MUNICIPALITY, id, callback);
    };

    // Busca en la configuración que corresponda según el parámetro searchType el identificador pasado como parámetro
    map.searchTyped = function (searchType, id, callback) {
        var idQuery = TC.getUID();
        var query = tcSearch.availableSearchTypes[searchType];

        if (id instanceof Array && query.goToIdFormat)
            id = query.goToIdFormat.tcFormat(id);

        tcSearch._search.data = tcSearch._search.data || [];
        tcSearch._search.data.push({
            dataLayer: query.featureType,
            dataRole: searchType,
            id: id,
            label: "",
            text: ""
        });

        map.removeSearch();

        if (tcSearch.availableSearchTypes[searchType] && !tcSearch.getSearchTypeByRole(searchType)) {

            if (!tcSearch.availableSearchTypes[searchType].goTo) {
                tcSearch.availableSearchTypes[searchType].goTo = function (id) {
                    var getProperties = function (id) {

                        if (!TC.filter) {
                            TC.syncLoadJS(TC.apiLocation + 'TC/Filter');
                        }

                        var filter = [];
                        if (query.idPropertiesIdentifier) id = id.split(query.idPropertiesIdentifier);
                        if (!(id instanceof Array)) id = [id];
                        for (var i = 0; i < query.dataIdProperty.length; i++) {
                            filter.push(
                                new TC.filter.equalTo(query.dataIdProperty[i], id[i].trim())
                            );
                        }

                        if (filter.length > 1) {
                            filter = new TC.filter.and(filter);
                        } else {
                            filter = filter[0];
                        }

                        return filter;
                    };
                    var properties = getProperties(id);

                    return {
                        params: {
                            type: TC.Consts.layerType.WFS,
                            url: this.url,
                            version: this.version,
                            geometryName: this.geometryName,
                            featurePrefix: this.featurePrefix,
                            featureType: this.featureType,
                            properties: properties,
                            outputFormat: this.outputFormat,
                            styles: this.styles
                        }
                    };
                }.bind(query);
            }

            tcSearch.addAllowedSearchType(searchType, tcSearch.availableSearchTypes[searchType], tcSearch);
        }

        tcMap.one(TC.Consts.event.SEARCHQUERYEMPTY, function (e) {
            tcMap.toast(tcSearch.EMPTY_RESULTS_LABEL, {
                type: TC.Consts.msgType.INFO, duration: 5000
            });

            if (callback)
                callback(null);
        });

        tcMap.one(TC.Consts.event.FEATURESADD, function (e) {
            if (e.layer == tcSearchLayer && e.layer.features && e.layer.features.length > 0)
                tcMap.zoomToFeatures(e.layer.features);

            map.search = {
                layer: e.layer, type: searchType
            };

            if (callback)
                callback(e.layer.id !== idQuery ? e.layer.id : idQuery);
        });

        tcSearch.goToResult(id, searchType);
    };
    /**
     * Busca y pinta en el mapa la entidad geográfica encontrada correspondiente al identificador establecido.
     * @method searchFeature
     * @memberof SITNA.Map
     * @instance
     * @async
     * @param {string} layer - Nombre de la capa de IDENA en la cual buscar.
     * @param {string} field - Campo de la capa de IDENA en el cual buscar.
     * @param {string} id - Identificador de la entidad geográfica por el cual filtrar.
     * @param {IDENA.Map~SearchByIdCallback} [callback] - Función a la que se llama tras aplicar el filtro.  
     * @example <caption>[Ver en vivo](../examples/Map.searchFeature.html)</caption> {@lang html} 
     * <div class="instructions query">
     *     <div><label>Capa</label><input type="text" id="capa" placeholder="Nombre capa de IDENA" /> </div>
     *     <div><label>Campo</label><input type="text" id="campo" placeholder="Nombre campo" /> </div>
     *     <div><label>Valor</label><input type="text" id="valor" placeholder="Valor a encontrar" /> </div>
     *     <div><button id="searchBtn">Buscar</button></div>
     *     <div><button id="removeBtn">Eliminar filtro</button></div>
     * </div>
     * <div id="mapa"></div>
     * <script>
     *     // Crear mapa.
     *     var map = new SITNA.Map("mapa");
     * 
     *     map.loaded(function () {
     *         document.getElementById("searchBtn").addEventListener("click", search);
     *         document.getElementById("removeBtn").addEventListener("click", remove);
     *     });
     *     
     *     var search = function () {
     *         var capa = document.getElementById("capa").value;
     *         capa = capa.trim();
     *         
     *         var campo = document.getElementById("campo").value;
     *         campo = campo.trim();
     *         
     *         var valor = document.getElementById("valor").value;
     *         valor = valor.trim();
     *         
     *         map.searchFeature(capa, campo, valor, function (idQuery) {
     *             if (idQuery == null) {
     *                 alert("No se han encontrado resultados en la capa: " + capa + " en el campo: " + campo + " el valor: " + valor + ".");
     *             }
     *         });
     *     };
     *     
     *     // Limpiar el mapa 
     *     var remove = function () {
     *         map.removeSearch();
     *     };
     * </script>
     */
    map.searchFeature = function (layer, field, id, callback) {
        var idQuery = TC.getUID();
        var prefix = tcSearch.featurePrefix;

        map.removeSearch();

        layer = (layer || '').trim(); field = (field || '').trim(); id = (id || '').trim();
        if (layer.length == 0 || field.length == 0 || id.length == 0) {
            tcMap.toast(tcSearch.EMPTY_RESULTS_LABEL, {
                type: TC.Consts.msgType.INFO, duration: 5000
            });

            if (callback)
                callback(null);
        } else {

            if (layer.indexOf(':') > -1) {
                prefix = layer.split(':')[0];
                layer = layer.split(':')[1];
            }

            var transformFilter = function (properties) {
                var self = this;

                if (!TC.filter) {
                    TC.syncLoadJS(TC.apiLocation + 'TC/Filter');
                }

                if (properties && properties instanceof Array) {
                    var filters = properties.map(function (elm) {
                        if (elm.hasOwnProperty("type")) {
                            switch (true) {
                                case elm.type == TC.Consts.comparison.EQUAL_TO: {
                                    return new TC.filter.equalTo(elm.name, elm.value);
                                }
                            }
                        } else {
                            return new TC.filter.equalTo(elm.name, elm.value);
                        }
                    });

                    if (filters.length > 1) {
                        return TC.filter.and.apply(null, filters);
                    } else {
                        return filters[0];
                    }
                }
            }

            var layerOptions = {
                id: idQuery,
                type: SITNA.Consts.layerType.WFS,
                url: tcSearch.url,
                version: tcSearch.version,
                stealth: true,
                geometryName: 'the_geom',
                featurePrefix: prefix,
                featureType: layer,
                maxFeatures: 1,
                properties: transformFilter([{
                    name: field, value: id, type: TC.Consts.comparison.EQUAL_TO
                }]),
                outputFormat: TC.Consts.format.JSON
            };

            var tcSrchGenericLayer;
            tcMap.addLayer(layerOptions).then(function (layer) {
                tcSrchGenericLayer = layer;

                map.search = {
                    layer: layer, type: SITNA.Consts.mapSearchType.GENERIC
                };
            });

            tcMap.on(TC.Consts.event.FEATURESADD, function (e) {
                const layer = e.layer;
                if (layer == tcSrchGenericLayer && layer.features && layer.features.length > 0) {

                    for (var i = 0; i < layer.features.length; i++) {
                        if (layer.features[i].showsPopup != tcSearch.queryableFeatures)
                            layer.features[i].showsPopup = tcSearch.queryableFeatures;
                    }

                    tcMap.zoomToFeatures(layer.features);
                }
            });

            tcMap.on(TC.Consts.event.LAYERUPDATE, function (e) {
                const layer = e.layer;
                const newData = e.newData;
                if (layer == tcSrchGenericLayer && newData && newData.features && newData.features.length == 0)
                    tcMap.toast(tcSearch.EMPTY_RESULTS_LABEL, {
                        type: TC.Consts.msgType.INFO, duration: 5000
                    });

                if (callback)
                    callback(layer == tcSrchGenericLayer && newData && newData.features && newData.features.length == 0 ? null : idQuery);
            });
        }
    };
    /**
     * Elimina del mapa la entidad geográfica encontrada en la última búsqueda. 
     * @method removeSearch
     * @memberof SITNA.Map
     * @instance
     * @async   
     * @param {function} [callback] Función a la que se llama tras eliminar la entidad geográfica.  
     * @example <caption>[Ver en vivo](../examples/Map.removeSearch.html)</caption> {@lang html} 
     * <div class="instructions query">
     *     <div><label>Capa</label><input type="text" id="capa" placeholder="Nombre capa de IDENA" /> </div>
     *     <div><label>Campo</label><input type="text" id="campo" placeholder="Nombre campo" /> </div>
     *     <div><label>Valor</label><input type="text" id="valor" placeholder="Valor a encontrar" /> </div>
     *     <div><button id="searchBtn">Buscar</button></div>
     *     <div><button id="removeBtn">Eliminar filtro</button></div>
     * </div>
     * <div id="mapa"></div>
     * <script>
     *     // Crear mapa.
     *     var map = new SITNA.Map("mapa");
     *         
     *     map.loaded(function () {
     *         document.getElementById("addFilterBtn").addEventListener("click", addFilter);
     *         document.getElementById("removeFilterBtn").addEventListener("click", removeFilter);
     *     });
     *         
     *     // Establecer como filtro del mapa el municipio Valle de Egüés
     *     var addFilter = function () {
     *         var capa = document.getElementById("capa").value;
     *         capa = capa.trim();
     *         
     *         var campo = document.getElementById("campo").value;
     *         campo = campo.trim();
     *         
     *         var valor = document.getElementById("valor").value;
     *         valor = valor.trim();
     *         
     *         map.searchFeature(capa, campo, valor, function (idQuery) {
     *             if (idQuery == null) {
     *                 alert("No se han encontrado resultados en la capa: " + capa + " en el campo: " + campo + " el valor: " + valor + ".");
     *             }
     *         });
     *     };
     *     
     *     // Limpiar el mapa del filtro
     *     var remove = function () {
     *         map.removeSearch();
     *     };
     * </script>
     */
    map.removeSearch = function (callback) {
        if (map.search) {
            if (!tcSearch.availableSearchTypes[map.search.type] || !tcSearch.availableSearchTypes[map.search.type].hasOwnProperty('goTo')) {
                tcMap.removeLayer(map.search.layer).then(function () {
                    map.search = null;
                });
            } else {
                for (var i = 0; i < map.search.layer.features.length; i++) {
                    map.search.layer.removeFeature(map.search.layer.features[i]);
                }
                map.search = null;
            }
        }

        if (callback)
            callback();
    };

    /**
 * Exporta el mapa a una imagen PNG. Para poder utilizar este método hay que establecer la opción `crossOrigin` al instanciar {@link SITNA.Map}. 
 * @method exportImage
 * @memberof SITNA.Map
 * @instance
 * @return {string} Imagen en un [data URI](https://developer.mozilla.org/es/docs/Web/HTTP/Basics_of_HTTP/Datos_URIs).
 * @see [Atributos de configuración CORS]{@link https://developer.mozilla.org/es/docs/Web/HTML/Atributos_de_configuracion_CORS}
 * @example <caption>[Ver en vivo](../examples/Map.exportImage.html)</caption> {@lang html} 
 * <div id="controls" class="controls">
 *     <button id="imageBtn">Exportar imagen</button>
 * </div>
 * <div id="mapa"></div>
 * <script>
 *     // Crear un mapa con la opción de imágenes CORS habilitada.
 *     var map = new SITNA.Map("mapa", { crossOrigin: "anonymous" });
 *     
 *     var exportImage = function () {
 *         var dataUrl = map.exportImage();
 *         var image = document.createElement("img");
 *         image.setAttribute("src", dataUrl);
 *         image.style.width = '25vw';
 *         var div = document.createElement("div");
 *         div.appendChild(image);
 *         document.getElementById("controls").appendChild(div);
 *     };
 *     
 *     document.getElementById("imageBtn").addEventListener("click", exportImage);
 * </script>
     */
    map.exportImage = function () {
        return tcMap.exportImage();
    };

    map.search = null;
};
