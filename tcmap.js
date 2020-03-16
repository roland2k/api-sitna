﻿/**
 * LoadJS descargado de https://github.com/muicss/loadjs
 * @version 3.5.2
 * @ignore
 */
loadjs = function () { var l = function () { }, c = {}, f = {}, u = {}; function o(e, n) { if (e) { var t = u[e]; if (f[e] = n, t) for (; t.length;)t[0](e, n), t.splice(0, 1) } } function s(e, n) { e.call && (e = { success: e }), n.length ? (e.error || l)(n) : (e.success || l)(e) } function h(t, r, i, c) { var o, s, e = document, n = i.async, f = (i.numRetries || 0) + 1, u = i.before || l, a = t.replace(/^(css|img)!/, ""); c = c || 0, /(^css!|\.css$)/.test(t) ? (o = !0, (s = e.createElement("link")).rel = "stylesheet", s.href = a) : /(^img!|\.(png|gif|jpg|svg)$)/.test(t) ? (s = e.createElement("img")).src = a : ((s = e.createElement("script")).src = t, s.async = void 0 === n || n), !(s.onload = s.onerror = s.onbeforeload = function (e) { var n = e.type[0]; if (o && "hideFocus" in s) try { s.sheet.cssText.length || (n = "e") } catch (e) { 18 != e.code && (n = "e") } if ("e" == n && (c += 1) < f) return h(t, r, i, c); r(t, n, e.defaultPrevented) }) !== u(t, s) && e.head.appendChild(s) } function t(e, n, t) { var r, i; if (n && n.trim && (r = n), i = (r ? t : n) || {}, r) { if (r in c) throw "LoadJS"; c[r] = !0 } !function (e, r, n) { var t, i, c = (e = e.push ? e : [e]).length, o = c, s = []; for (t = function (e, n, t) { if ("e" == n && s.push(e), "b" == n) { if (!t) return; s.push(e) } --c || r(s) }, i = 0; i < o; i++)h(e[i], t, n) }(e, function (e) { s(i, e), o(r, e) }, i) } return t.ready = function (e, n) { return function (e, t) { e = e.push ? e : [e]; var n, r, i, c = [], o = e.length, s = o; for (n = function (e, n) { n.length && c.push(e), --s || t(c) }; o--;)r = e[o], (i = f[r]) ? n(r, i) : (u[r] = u[r] || []).push(n) }(e, function (e) { s(n, e) }), t }, t.done = function (e) { o(e, []) }, t.reset = function () { c = {}, f = {}, u = {} }, t.isDefined = function (e) { return e in c }, t }();

var TC = TC || {};
/*
 * Initialization
 */
TC.version = '2.1.0';
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
        TEMPLATING: 'lib/dust/dust-full',
        TEMPLATING_HELPERS: 'lib/dust/dust-helpers',
        TEMPLATING_I18N: 'lib/dust/dustjs-i18n',
        TEMPLATING_OVERRIDES: 'lib/dust/dust.overrides.js',
        TEMPLATING_FULL: 'lib/handlebars/handlebars',
        TEMPLATING_RUNTIME: 'lib/handlebars/handlebars.runtime',
        TEMPLATING_HBS_HELPERS: 'lib/handlebars/helpers.js',
        PROJ4JS: 'lib/proj4js/proj4.js',
        EPSG: 'https://epsg.io/',
        LOCALFORAGE: TC.apiLocation + 'lib/localforage/localforage',
        D3C3: TC.apiLocation + 'lib/d3c3/d3c3.min.js',
        CESIUM: TC.apiLocation + 'lib/cesium/release/Cesium.js',
        JSNLOG: 'lib/jsnlog/jsnlog.min.js',
        ERROR_LOGGER: TC.apiLocation + 'errors/logger.ashx',
        PDFMAKE: TC.apiLocation + 'lib/pdfmake/pdfmake-fonts.min.js',
        JSONPACK: 'lib/jsonpack/jsonpack.min.js',
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
        THREED: 'tc-threed'
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
        POPUP: 'popup.tc'
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
 * Identificador de la capa del callejero en gris del WMTS del Instituto Geográfico Nacional.
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
        ROADPK: 'roadpk',
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
    TC.Consts.format = {
        JSON: 'JSON',
        KML: 'KML',
        KMZ: 'KMZ',
        GML: 'GML',
        GML2: 'GML2',
        GML3: 'GML3',
        GML32: 'GML32',
        GEOJSON: 'GeoJSON',
        TOPOJSON: 'TopoJSON',
        GPX: 'GPX',
        WKT: 'WKT'
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

/**
 * Opciones de configuración del mapa. Para más información de como usar objetos de este tipo, consultar {@tutorial 2-configuration}.
 * @typedef MapOptions
 * @see 2-configuration
 * @property {LayerOptions[]|string[]} [baseLayers=[SITNA.Consts. layer. IDENA_BASEMAP]{@link SITNA.Consts.layer.IDENA_BASEMAP}, [SITNA.Consts. layer. IDENA_ORTHOPHOTO]{@link SITNA.Consts.layer.IDENA_ORTHOPHOTO}, [SITNA.Consts. layer. IDENA_CADASTER]{@link SITNA.Consts.layer.IDENA_CADASTER}, [SITNA.Consts. layer. IDENA_CARTO]{@link SITNA.Consts.layer.IDENA_CARTO}] - Lista con cualquier combinación de objetos de definición de capa o de identificadores de capas de la API SITNA
 * (miembros de {@link SITNA.Consts.layer}) para incluir dichas capas como mapas de fondo.
 * @property {MapControlOptions} [controls] - Opciones de controles de mapa, define qué controles se incluyen en un mapa y qué opciones se pasan a cada control.
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
 * @property {boolean} [mouseWheelZoom=true] - Si se establece a `true`, la rueda de scroll del ratón se puede utilizar para hacer zoom en el mapa.
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

            avgTileSize: 31000,

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
                    title: 'Ortofoto',
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
                    id: TC.Consts.layer.IDENA_DYNCARTO,
                    title: 'Cartografía topográfica',
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
                    matrixSet: "EPSG:25830",
                    format: "image/jpeg",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-basemap_grey_ign.png",
                    fallbackLayer: TC.Consts.layer.IGN_ES_DYNBASEMAP_GREY,
                    overviewMapLayer: TC.Consts.layer.IGN_ES_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_ES_RELIEF,
                    title: "Relieve \r\n (IGN ES)",
                    type: TC.Consts.layerType.WMTS,
                    url: "//www.ign.es/wmts/mdt",
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
                    url: "http://wmts-mapa-lidar.idee.es/lidar",
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
                    title: 'Mapa base \r\n (IGN ES)',
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
                    title: 'Ortofoto \r\n (IGN ES)',
                    type: TC.Consts.layerType.WMS,
                    url: '//www.ign.es/wms-inspire/pnoa-ma',
                    layerNames: 'OI.OrthoimageCoverage',
                    thumbnail: TC.apiLocation + 'TC/css/img/thumb-orthophoto_pnoa.jpg',
                    overviewMapLayer: TC.Consts.layer.IGN_ES_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_ES_DYNCARTO,
                    title: 'Cartografía topográfica \r\n (IGN ES)',
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
                    url: '//www.ign.es/wms-inspire/mdt',
                    layerNames: 'relieve',
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
                    url: "//wxs.ign.fr/njfzwf3vgc55gekk8ra4zezx/wmts",
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
                    url: "//wxs.ign.fr/njfzwf3vgc55gekk8ra4zezx/wmts",
                    encoding: TC.Consts.WMTSEncoding.KVP,
                    layerNames: "GEOGRAPHICALGRIDSYSTEMS.PLANIGN",
                    matrixSet: "PM",
                    format: "image/jpeg",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-base-fr-ign.png",
                    fallbackLayer: TC.Consts.layer.IGN_FR_DYNBASEMAP,
                    ignoreProxification: true,
                    overviewMapLayer: TC.Consts.layer.IGN_FR_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_FR_RELIEF,
                    title: "Relieve \r\n (IGN FR)",
                    type: TC.Consts.layerType.WMTS,
                    url: "//wxs.ign.fr/njfzwf3vgc55gekk8ra4zezx/wmts",
                    encoding: TC.Consts.WMTSEncoding.KVP,
                    layerNames: "ELEVATION.ELEVATIONGRIDCOVERAGE.SHADOW",
                    matrixSet: "PM",
                    format: "image/png",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-estom-fr-ign.png",
                    fallbackLayer: TC.Consts.layer.IGN_FR_DYNRELIEF,
                    ignoreProxification: true,
                    overviewMapLayer: TC.Consts.layer.IGN_FR_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_FR_ORTHOPHOTO,
                    title: "Ortofoto \r\n (IGN FR)",
                    type: TC.Consts.layerType.WMTS,
                    url: "//wxs.ign.fr/njfzwf3vgc55gekk8ra4zezx/wmts",
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
                    url: "//wxs.ign.fr/njfzwf3vgc55gekk8ra4zezx/geoportail/r/wms",
                    layerNames: "GEOGRAPHICALGRIDSYSTEMS.PLANIGN",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-base-fr-ign.png",
                    ignoreProxification: true,
                    overviewMapLayer: TC.Consts.layer.IGN_FR_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_FR_DYNRELIEF,
                    title: 'Relieve \r\n (IGN FR)',
                    type: TC.Consts.layerType.WMS,
                    url: "//wxs.ign.fr/njfzwf3vgc55gekk8ra4zezx/geoportail/r/wms",
                    layerNames: "ELEVATION.ELEVATIONGRIDCOVERAGE",
                    thumbnail: TC.apiLocation + "tc/css/img/thumb-estom-fr-ign.png",
                    ignoreProxification: true,
                    overviewMapLayer: TC.Consts.layer.IGN_FR_BASEMAP
                },
                {
                    id: TC.Consts.layer.IGN_FR_DYNORTHOPHOTO,
                    title: 'Ortofoto \r\n (IGN FR)',
                    type: TC.Consts.layerType.WMS,
                    url: "//wxs.ign.fr/njfzwf3vgc55gekk8ra4zezx/geoportail/r/wms",
                    layerNames: "HR.ORTHOIMAGERY.ORTHOPHOTOS",
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
 * Aplicable a capas de tipo {@link SITNA.Consts.layerType.VECTOR}, {@link SITNA.Consts.layerType.WFS} y {@link SITNA.Consts.layerType.KML}.
 * @property {string} [format] - En las capas de tipo {@link SITNA.Consts.layerType.WMS} y {@link SITNA.Consts.layerType.WMTS},
 * es el tipo MIME del formato de archivo de imagen a obtener del servicio. En las capas de tipo {@link SITNA.Consts.layerType.VECTOR}, es el tipo MIME
 * del formato de archivo de datos geográficos que queremos cargar (GeoJSON, KML, etc.).
 * 
 * Si esta propiedad no está definida, si la capa es un mapa de fondo (consultar propiedad `isBase`), se asume que el formato es `image/jpeg`, en caso contrario se asume que el formato es `image/png`.
 *
 * Para asignar valor a esta propiedad se puede usar las constantes de definidas en {@link SITNA.Consts.mimeType}.
 * @property {boolean} [hideTree] - Aplicable a capas de tipo {@link SITNA.Consts.layerType.WMS} y {@link SITNA.Consts.layerType.KML}.
 * Si se establece a `true`, la capa no muestra la jerarquía de grupos de capas en la tabla de contenidos ni en la leyenda.
 * @property {boolean} [isBase] - Si se establece a `true`, la capa es un mapa de fondo.
 * @property {boolean} [isDefault] - *__Obsoleta__: En lugar de esta propiedad es recomendable usar la propiedad `defaultBaseLayer`de {@link MapOptions}.*
 * 
 * Si se establece a true, la capa se muestra por defecto si forma parte de los mapas de fondo.
 * @property {string} [layerNames] - Lista separada por comas de los nombres de capa del servicio OGC. Aplicable a capas de tipo {@link SITNA.Consts.layerType.WMS} y {@link SITNA.Consts.layerType.WMTS}.
 * @property {string} [matrixSet] - Nombre de grupo de matrices del servicio WMTS. Propiedad obligatoria para capas de tipo {@link SITNA.Consts.layerType.WMTS}.
 * @property {boolean} [stealth] - Si se establece a `true`, la capa no aparece en la tabla de contenidos ni en la leyenda. 
 * De este modo se puede añadir una superposición de capas de trabajo que el usuario la perciba como parte del mapa de fondo.
 * @property {string} [thumbnail] - URL de una imagen en miniatura a mostrar en el selector de mapas de fondo.
 * @property {string} [title] - Título de capa. Este valor se mostrará en la tabla de contenidos y la leyenda.
 * @property {string} [type] - Tipo de capa. Si no se especifica se considera que la capa es WMS. La lista de valores posibles está definida en {@link SITNA.Consts.layerType}.
 * @property {string} [url] - URL del servicio OGC o del archivo de datos geográficos que define la capa. Propiedad obligatoria en capas de tipo {@link SITNA.Consts.layerType.WMS},
 * {@link SITNA.Consts.layerType.WMTS}, {@link SITNA.Consts.layerType.WFS} y {@link SITNA.Consts.layerType.KML}.
 * 
 * En las capas de tipo {@link SITNA.Consts.layerType.VECTOR} los archivos de datos geográficos soportados son KML, GeoJSON, GPX, GML, WKT y TopoJSON.
 * El formato se deduce de la extensión del nombre de archivo, pero también se puede especificar utilizando la propiedad `format`.
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
 */

/**
 * Opciones básicas de control.
 * @typedef ControlOptions
 * @see MapControlOptions
 * @see 2-configuration
 * @property {HTMLElement|string} [div] - Elemento del DOM en el que crear el control o valor de atributo id de dicho elemento.
 */

/**
 * Opciones de sugerencia de servicio externo WMS.
 * @typedef WMSOptions
 * @see WMSGroupOptions
 * @property {string} name - Nombre del servicio WMS. Se mostrará como un elemento en la lista de opciones del control.
 * @property {string} url - URL de acceso al servicio WMS.
 */
 
/**
 * Opciones de grupo de sugerencias de servicios externos WMS.
 * @typedef WMSGroupOptions
 * @see DataLoaderOptions
 * @property {string} group - Nombre del grupo de sugerencias. Se mostrará como una sección en la lista de opciones del control.
 * @property {WMSOptions[]} items - Lista de sugerencias de servicios externos WMS.
 */

/**
 * Función de callback que gestiona los clic del usuario en la ventana de visualización del mapa.
 * @callback SITNA.Map~ClickCallback
 * @param {number[]} coords - Coordenadas del punto donde se ha realizado clic, en las unidades del sistema de referencia de coordenadas del mapa (Ver propiedad `crs`de {@link MapOptions}). Array de dos números correspondientes a las coordenadas x e y.
 * @example <caption>[Ver en vivo](../examples/cfg.ClickOptions.html)</caption> {@lang html} 
 * <div id="mapa"/>
 * <script>
 *     // Creamos un mapa con el control de gestión de clics, con una función de callback personalizada
 *     var map = new SITNA.Map("mapa", {
 *         controls: {
 *             click: {
 *                 active: true,
 *                 callback: function (coord) {
 *                     alert("Has pulsado en la posición " + coord[0] + ", " + coord[1]);
 *                 }
 *             }
 *         }
 *     });
 * </script>
 */
 
/**
 * Opciones de control de clics de usuario.
 * @typedef ClickOptions
 * @property {boolean} [active] - Si se establece a `true`, el control asociado está activo, es decir, responde a los clics hechos en el mapa desde el que se carga.
 * Como máximo puede haber solamente un control activo en el mapa en cada momento.
 * @property {SITNA.Map~ClickCallback} callback - Función de callback que gestiona la respuesta al clic.
 */
 
/**
 * Opciones de control de obtención de información de entidades de mapa por click.
 * @typedef FeatureInfoOptions
 * @extends ClickOptions
 * @see MapControlOptions
 * @property {boolean} [active] - Si se establece a `true`, el control asociado está activo, es decir, responde a los clics hechos en el mapa desde el que se carga.
 * Como máximo puede haber solamente un control activo en el mapa en cada momento.
 * @property {SITNA.Map~ClickCallback} callback - Función de callback que gestiona la respuesta al clic.
 * @property {boolean} [persistentHighlights] - Cuando el control `featureInfo` muestra los resultados de la consulta, si el servicio lo soporta, mostrará resaltadas sobre el mapa las geometrías
 * de las entidades geográficas de la respuesta. Si este valor es `true`, dichas geometrías se quedan resaltadas en el mapa indefinidamente. En caso contrario, las geometrías resaltadas se borran en el 
 * momento en que se cierra el bocadillo de resultados o se hace una nueva consulta.
 * @example <caption>[Ver en vivo](../examples/cfg.FeatureInfoOptions.persistentHighlights.html)</caption> {@lang html} 
 * <div id="mapa"></div>
 * <script>
 *     // Añadimos el control featureInfo.
 *     SITNA.Cfg.controls.featureInfo = {
 *         persistentHighlights: true
 *     };
 *     // Añadimos una capa WMS sobre la que hacer las consultas.
 *     SITNA.Cfg.workLayers = [
 *         {
 *             id: "masas",
 *             title: "Masas de agua",
 *             type: SITNA.Consts.layerType.WMS,
 *             url: "https://servicios.idee.es/wms-inspire/hidrografia",
 *             layerNames: ["HY.PhysicalWaters.Waterbodies"]
 *         }
 *     ];
 *     var map = new SITNA.Map("mapa");
 * </script> */
/**
 * Opciones de control de coordenadas.
 * @typedef CoordinatesOptions
 * @property {HTMLElement|string} [div] - Elemento del DOM en el que crear el control o valor de atributo id de dicho elemento.
 * @property {boolean} [showGeo] - Determina si se muestran coordenadas geográficas (en EPSG:4326) además de las del mapa, que por defecto son UTM (EPSG:25830).
 * @example <caption>[Ver en vivo](../examples/cfg.CoordinatesOptions.html)</caption> {@lang html} 
 * <div id="mapa"/>
 * <script>
 *     // Hacemos que el control que muestra las coordenadas en pantalla
 *     // muestre también las coordenadas geográficas
 *     SITNA.Cfg.controls.coordinates = {
 *         showGeo: true
 *     };
 *     var map = new SITNA.Map('map');
 * </script>
 */
 
/**
 * Opciones de control para añadir datos geográficos.
 * @typedef DataLoaderOptions
 * @extends ControlOptions
 * @see MapControlOptions
 * @property {HTMLElement|string} [div] - Elemento del DOM en el que crear el control o valor de atributo id de dicho elemento.
 * @property {boolean} [enableDragAndDrop] - Propiedad que establece si está permitido arrastrar y soltar archivos al área del mapa, además de abrirlos de la manera convencional abriendo el cuadro de diálogo de búsqueda de archivos.
 * @property {WMSGroupOptions[]} [wmsSuggestions] - Lista de grupos de sugerencias de servicios WMS ofrecidos por el control. Por ejemplo se puede establecer un grupo de servicios WMS estatales y otro de servicios WMS mundiales.
 * @example <caption>[Ver en vivo](../examples/cfg.DataLoaderOptions.html)</caption> {@lang html} 
 * <div id="mapa"></div>
 * <script>
 *     // Establecemos un layout simplificado apto para hacer demostraciones de controles.
 *     SITNA.Cfg.layout = "layout/ctl-container";
 *     // Activamos el proxy para poder acceder a servicios de otro dominio.
 *     SITNA.Cfg.proxy = "proxy.ashx?";
 *     // Añadimos el control de tabla de contenidos en el primer contenedor.
 *     SITNA.Cfg.controls.TOC = {
 *         div: "slot1"
 *     };
 *     // Añadimos el control de datos externos en el segundo contenedor.
 *     SITNA.Cfg.controls.dataLoader = {
 *         div: "slot2",
 *         enableDragAndDrop: true,
 *         wmsSuggestions: [
 *             {
 *                 group: "Estatales",
 *                 items: [
 *                     {
 *                         name: "Mapa Base (IGN)",
 *                         url: "https://www.ign.es/wms-inspire/ign-base"
 *                     },
 *                     {
 *                         name: "Unidades Administrativas (IGN)",
 *                         url: "https://www.ign.es/wms-inspire/unidades-administrativas"
 *                     },
 *                     {
 *                         name: "Cartografía Topográfica (IGN)",
 *                         url: "https://www.ign.es/wms-inspire/mapa-raster"
 *                     },
 *                     {
 *                         name: "Ortofotos PNOA Máxima Actualidad (IGN)",
 *                         url: "https://www.ign.es/wms-inspire/pnoa-ma"
 *                     }
 *                 ]
 *             },
 *             {
 *                 group: "Comunidades limítrofes",
 *                 items: [
 *                     {
 *                         name: "Aragón",
 *                         url: "http://idearagon.aragon.es/Visor2D"
 *                     },
 *                     {
 *                         name: "La Rioja",
 *                         url: "https://ogc.larioja.org/wms/request.php"
 *                     },
 *                     {
 *                         name: "País Vasco",
 *                         url: "http://www.geo.euskadi.eus/WMS_KARTOGRAFIA"
 *                     }
 *                 ]
 *             }
 *         ]
 *     };
 *     var map = new SITNA.Map("mapa");
 * </script>
 */

/**
 * Opciones de control de mapa de situación.
 * @typedef LayerCatalogOptions
 * @extends ControlOptions
 * @see MapControlOptions
 * @property {HTMLElement|string} [div] - Elemento del DOM en el que crear el control o valor de atributo id de dicho elemento.
 * @property {boolean} [enableSearch] - Propiedad que establece si se puede buscar capas por texto. La búsqueda del texto se realiza en los títulos 
 * y los resúmenes descriptivos de cada capa, que se publican en el [documento de capacidades](https://github.com/7o9/implementer-friendly-standards/blob/master/introduction.rst#getcapabilities) del servicio.
 * @property {LayerOptions[]} layers - Lista de objetos de definición de las con capas de servicios WMS que queremos añadir al catálogo.
 * 
 * En estos objetos, si se asigna un valor a la propiedad `layerNames`, solo las capas especificadas y sus hijas estarán disponibles para ser añadidas al mapa. 
 * Sin embargo, si esta propiedad se deja sin asignar, todas las capas publicadas en el servicio WMS estarán disponibles para ser añadidas.
 * @example <caption>[Ver en vivo](../examples/cfg.MapControlOptions.layerCatalog_workLayerManager.html)</caption> {@lang html}
 * <div id="mapa"></div>
 * <script>
 *     // Establecemos un layout simplificado apto para hacer demostraciones de controles.
 *     SITNA.Cfg.layout = "layout/ctl-container";
 *     // Añadimos el control de capas cargadas en la primera posición.
 *     SITNA.Cfg.controls.workLayerManager = {
 *         div: "slot1"
 *     };
 *     // Añadimos en la segunda posición el catálogo de capas con dos servicios.
 *     SITNA.Cfg.controls.layerCatalog = {
 *         div: "slot2",
 *         enableSearch: true,
 *         layers: [
 *             {
 *                 id: "idena",
 *                 title: "IDENA",
 *                 hideTitle: true,
 *                 type: SITNA.Consts.layerType.WMS,
 *                 url: "//idena.navarra.es/ogc/wms",
 *                 hideTree: false
 *             },
 *             {
 *                 id: "sismica",
 *                 title: "Información sísmica y volcánica",
 *                 type: SITNA.Consts.layerType.WMS,
 *                 url: "//www.ign.es/wms-inspire/geofisica",
 *                 layerNames: ["Ultimos10dias", "Ultimos30dias", "Ultimos365dias"],
 *                 hideTree: false
 *             }
 *         ]
 *     };
 *     var map = new SITNA.Map("mapa");
 * </script>
 */
 
/**
 * Opciones de control de mapa de situación.
 * @typedef OverviewMapOptions
 * @extends ControlOptions
 * @see MapControlOptions
 * @property {HTMLElement|string} [div] - Elemento del DOM en el que crear el control o valor de atributo id de dicho elemento.
 * @property {string|object} layer - Identificador de capa para usar como mapa de fondo u objeto de opciones de capa.
 */
 
 /**
 * Opciones de control de consultas alfanuméricas.
 * 
 * Algunos servidores tienen servicios WMS y WFS que actúan en paralelo, es decir, están alojados dentro del mismo nombre de host y publican las mismas capas.
 * Si el control `WFSQuery` está en el mapa, verifica si las capas de servicios WMS están asociadas a un WFS paralelo. Si es así, ofrece un interfaz de usuario
 * para poder hacer consultas a la capa en base a los valores de las propiedades de los elementos de la capa. Esta interfaz de usuario es accesible desde el control
 * `workLayerManager`.
 * @typedef WFSQueryOptions
 * @see MapControlOptions
 * @property {StyleOptions} [styles] - Opciones de estilo de las geometrías de las entidades resultado de la consulta.
 * @property {StyleOptions} [highlightStyles] - Opciones de estilo de las geometrías de las entidades resaltadas.
 * @example <caption>[Ver en vivo](../examples/cfg.WFSQueryOptions.html)</caption> {@lang html}
 * <div id="mapa" />
 * <script>
 *     // Establecemos un layout simplificado apto para hacer demostraciones de controles.
 *     SITNA.Cfg.layout = "layout/ctl-container";
 *     // Añadimos el control de capas cargadas en la primera posición.
 *     SITNA.Cfg.controls.workLayerManager = {
 *         div: "slot1"
 *     };
 *     //Si se añade el control WFSQuery, el control busca un servicio WFS pareado al WMS de cada capa añadida al mapa y si lo encuentra habilita la lupa que da acceso al constructor de consultas.
 *     SITNA.Cfg.controls.WFSQuery = {
 *         //Establecemos el estilo de las geometrías de las entidades resultado de la consulta
 *         styles: {
 *             //Estilo de polígonos y multipolígonos
 *             polygon: {
 *                 strokeColor: "#057f28",
 *                 strokeWidth: 4,
 *                 fillColor: "#057f28",
 *                 fillOpacity: 0.3
 *             },
 *             //Estilo de polilíneas y multipolilíneas
 *             line: {
 *                 strokeColor: "#057f28",
 *                 strokeWidth: 4
 *             },
 *             //Estilo de puntos y multipuntos
 *             point: {
 *                 strokeColor: "#057f28"
 *             }
 *         },
 *         //Establecemos el estilo de las geometrías de las entidades resaltadas
 *         highlightStyles: {
 *             //Estilo de polígonos y multipolígonos
 *             polygon: {
 *                 strokeColor: "#ff7f27",
 *                 strokeWidth: 4,
 *                 fillColor: "#ff7f27",
 *                 fillOpacity: 0.3
 *             },
 *             //Estilo de polilíneas y multipolilíneas
 *             line: {
 *                 strokeColor: "#ff7f27",
 *                 strokeWidth: 4
 *             },
 *             //Estilo de puntos y multipuntos
 *             point: {
 *                 strokeColor: "#ff7f27"
 *             }
 *         }
 *     };
 *     var map = new SITNA.Map("mapa", {
 *         workLayers: [{
 *             id: "paisajes",
 *             title: "Paisajes singulares",
 *             type: SITNA.Consts.layerType.WMS,
 *             url: "//idena.navarra.es/ogc/wms",
 *             layerNames: "IDENA:BIODIV_Pol_PaisajesSing"
 *         },
 *         {
 *             id: "meteorologia",
 *             title: "Meteorología",
 *             type: SITNA.Consts.layerType.WMS,
 *             url: "//idena.navarra.es/ogc/wms",
 *             layerNames: "IDENA:estacMeteor"
 *         },
 *         {
 *             id: "plazaola",
 *             title: "Vía Verde del Plazaola",
 *             type: SITNA.Consts.layerType.WMS,
 *             url: "//idena.navarra.es/ogc/wms",
 *             layerNames: "IDENA:DOTACI_Lin_VVPlazaola"
 *         }]
 *     });
 * </script>
 */

/**
 * Configuración del origen de datos auxiliar a la búsqueda de parcelas catastrales para la codificación de los nombres de municipio.
 * @typedef CadastralSearchOptionsExt
 * @see CadastralSearchOptions
 * @property {string[]} featureType - Colección de nombre de capa o capas a consultar.
 * @property {string} idProperty - Nombre de campo que identifica unívocamente el municipio cuyos valores deben coincidir con los posibles valores del campo indicado en firstQueryWord.
 * @property {string} labelProperty - Nombre de campo en el que buscar el texto indicado.
 * @example
 * {
 *     url: '//miServicioWFS/ogc/wfs',
 *     featurePrefix: 'IDENA',    
 *     featureType: ['Pol_ParcelaUrbana', 'Pol_ParcelaRustica', 'Pol_ParcelaMixta'],
 *     municipality: {
 *         featureType: 'Pol_Municipio',
 *         labelProperty: 'MUNICIPIO',
 *         idProperty: 'COD_MUNICIPIO'      
 *     },
 *     queryProperties: {
 *         firstQueryWord: 'COD_MUNICIPIO',
 *         secondQueryWord: 'POLIGONO',
 *         thirdQueryWord: 'PARCELA'
 *     }
 * }
 */

/**
 * Opciones de configuración del origen de datos de una búsqueda.
 * @typedef SearchQueryPropertyOptions
 * @see CadastralSearchOptions
 * @see MunicipalitySearchOptions
 * @see PostalAddressSearchOptions
 * @see StreetSearchOptions
 * @see TownSearchOptions
 * @property {string[]} firstQueryWord - Colección de nombre de campo o campos a consultar para el 1º término del criterio de búsqueda, deben existir en la capa o capas definidas en la propiedad `FeatureType`.
 * @property {string[]} secondQueryWord - Colección de nombre de campo o campos a consultar para el 2º término del criterio de búsqueda, deben existir en la capa o capas definidas en la propiedad `FeatureType`.
 * @property {string[]} thirdQueryWord - Colección de nombre de campo o campos a consultar para el 3º término del criterio de búsqueda, deben existir en la capa o capas definidas en la propiedad `FeatureType`.
 */

/**
 * Definición del color con el que se dibujará los resultados de la búsqueda en el mapa. Este color también se mostrará en la leyenda de la lista de sugerencias de resultados posibles de la búsqueda.
 * @typedef SearchResultColor
 * @see SearchSuggestionHeaderOptions
 * @property {string} css - Nombre de la propiedad de las sugerencias de la cual extraer el color. Ha de ser alguna de las distintas propiedades de colores presentes en {@link PointStyleOptions}, 
 * {@link LineStyleOptions} o {@link PolygonStyleOptions}.
 * @property {string} geomType - Nombre del tipo de geometría (el valor es un miembro de {@link SITNA.Consts.geom}).
 * @example
 * color: {
 *     geomType: "point",
 *     css: "fontColor"
 * } 
 */
 
/**
 * Algunas búsquedas hacen la consulta sobre varias capas. Este objeto define el color de los resultados de la búsqueda de cada capa. Estos colores también se mostrarán en la leyenda de la lista de sugerencias de resultados posibles de la búsqueda.
 * @typedef SearchResultColorDictionary
 * @see SearchSuggestionHeaderOptions
 * @property {SearchResultColor} color - Configuración para obtener el color.
 * @property {string} title - Title para identificar al color. Se define con la clave del diccionario de traducciones. Revisar la sección **Soporte multiidioma** en {@tutorial layout_cfg}.
 * @example
 * CATAST_Pol_ParcelaUrba: {
 *     title: "search.list.cadastral.urban",
 *     color: {
 *         geomType: "polygon",
 *         css: "strokeColor"
 *     } 
 * }
 */
 
/**
 * Opciones de configuración para la composición de la cabecera de una lista de sugerencias de búsqueda.
 * @typedef SearchSuggestionHeaderOptions
 * @see CadastralSearchOptions
 * @see MunicipalitySearchOptions
 * @see PostalAddressSearchOptions
 * @see StreetSearchOptions
 * @see TownSearchOptions
 * @property {string} label - Clave del diccionario de traducciones que indica qué tipo de búsqueda es: Parcela Catastral, Municipio, Calle… Revisar la sección **Soporte multiidioma** en {@tutorial layout_cfg}.
 * @property {SearchResultColorDictionary|SearchResultColor|string} color - Configuración para obtener el color que representa al tipo de búsqueda.
 * Se establece como color la primera coincidencia en `styles` que cumpla con la configuración.
 * 
 * La definición como string ha de ser para indicar el nombre de una propiedad presente en {@link PointStyleOptions}, {@link LineStyleOptions} o {@link PolygonStyleOptions}.
 * @example
 * {
 *     label: "search.list.town",
 *     color: "strokeColor"
 * }
 */
 
/**
 * Opciones de configuración del origen de datos de la búsqueda de parcelas catastrales.
 * @typedef CadastralSearchOptions
 * @see SearchOptions
 * @see {@link http://www.opengeospatial.org/standards/wfs|OGC Web Feature Service Standard}
 * @property {string} featurePrefix - Prefijo del nombre de la capa o capas a definir en la propiedad `featureType`. En caso de ser un WFS de GeoServer, se trata del nombre del espacio de trabajo (workspace).
 * @property {string[]} featureType - Colección con el nombre de la capa o capas a consultar. Es posible indicar más de una capa si todas ellas cuentan con los campos definidos en `queryProperties`.
 * @property {string} geometryName - Nombre del campo de la geometría de la parcela catastral.
 * @property {CadastralSearchOptionsExt} municipality - Definición de la fuente de datos para la búsqueda de parcela por nombre de municipio en lugar de por código del mismo.
 * @property {SearchQueryPropertyOptions} queryProperties - Definición de los campos por los que filtrar la búsqueda de parcelas.
 *
 * En este tipo de búsqueda es obligatorio dar un valor a las siguientes propiedades:
 * - `firstQueryWord`: se indicará el campo o campos en los que buscar el código de municipio.
 * - `secondQueryWord`: se indicará el campo o campos en los que buscar el polígono.
 * - `thirdQueryWord`: se indicará el campo o campos en los que buscar la parcela.
 * @property {StyleOptions[]} styles - Colección de objetos de configuración de estilo. La relación entre capa y estilo se hace mediante el índice en la colección en `featureType` y en `styles`, por tanto, 
 * deberá haber tantas instancias como capas definidas en `featureType`.
 * 
 * No está disponible `cluster`.
 * @property {SearchSuggestionHeaderOptions} suggestionListHead - Configuración de la cabecera a mostrar en la lista de sugerencias. La cabecera consta de un literal y de un color. El literal indica el tipo de búsqueda y el color será el que mejor representa a las entidades correspondientes en el mapa.
 * @property {string} url - Dirección del servicio WFS (las búsquedas en el API SITNA están implementadas sobre el estándar [OGC Web Feature Service](http://www.opengeospatial.org/standards/wfs).
 * @example <caption>[Ver en vivo](../examples/Cfg.SearchCadastralSource.html)</caption> {@lang javascript}
 * {   
 *     url:'//idena.navarra.es/ogc/wfs',                
 *     featurePrefix: 'IDENA',
 *     geometryName: 'the_geom',        
 *     featureType: ['CATAST_Pol_ParcelaUrba', 'CATAST_Pol_ParcelaRusti', 'CATAST_Pol_ParcelaMixta'],
 *     municipality: {
 *         featureType: 'CATAST_Pol_Municipio',
 *         labelProperty: 'MUNICIPIO',
 *         idProperty: 'CMUNICIPIO'
 *     },
 *     queryProperties: {
 *         firstQueryWord: 'CMUNICIPIO',
 *         secondQueryWord: 'POLIGONO',
 *         thirdQueryWord: 'PARCELA'
 *     },
 *     suggestionListHead: {
 *         label: "search.list.cadastral",
 *         color: [
 *             {
 *                 CATAST_Pol_ParcelaUrba: {
 *                     title: "search.list.cadastral.urban",
 *                     color: {
 *                         geomType: "polygon",
 *                         css: "strokeColor"
 *                     }
 *                 }
 *             },
 *             {
 *                 CATAST_Pol_ParcelaRusti: {
 *                     title: "search.list.cadastral.rustic",
 *                     color: {
 *                         geomType: "polygon",
 *                         css: "strokeColor"
 *                     }
 *                 }
 *             },
 *             {
 *                 CATAST_Pol_ParcelaMixta: {
 *                     title: "search.list.cadastral.mixed",
 *                     color: {
 *                         geomType: "polygon",
 *                         css: "strokeColor"
 *                     }
 *                 }
 *             }
 *         ]
 *     },
 *     styles: [
 *         {
 *             polygon: {
 *                 fillColor: '#000000',
 *                 fillOpacity: 0.1,
 *                 strokeColor: '#136278',
 *                 strokeWidth: 2,
 *                 strokeOpacity: 1
 *             }
 *         },
 *         {
 *             polygon: {
 *                 fillColor: '#000000',
 *                 fillOpacity: 0.1,
 *                 strokeColor: '#0c8b3d',
 *                 strokeWidth: 2,
 *                 strokeOpacity: 1
 *             }
 *         },
 *         {
 *             polygon: {
 *                 fillColor: '#000000',
 *                 fillOpacity: 0.1,
 *                 strokeColor: '#e5475f',
 *                 strokeWidth: 2,
 *                 strokeOpacity: 1
 *             },
 *         }
 *     ]
 * }
 */

/**
 * Opciones de configuración del origen de datos de la búsqueda de municipios.
 * @typedef MunicipalitySearchOptions
 * @see SearchOptions
 * @see {@link http://www.opengeospatial.org/standards/wfs|OGC Web Feature Service Standard}
 * @property {string[]} dataIdProperty - Colección con el nombre del campo o campos que nos servirán para identificar unívocamente a un municipio. Los campos definidos deben existir en la capa o capas definidas en la propiedad `featureType`.
 * @property {string} featurePrefix - Prefijo del nombre de la capa o capas a definir en la propiedad `featureType`. En caso de ser un WFS de GeoServer, se trata del nombre del espacio de trabajo (workspace).
 * @property {string[]} featureType - Colección con el nombre de la capa o capas a consultar. Es posible indicar más de una capa si todas ellas cuentan con los campos definidos en `queryProperties`.
 * @property {string} geometryName - Nombre del campo de la geometría del municipio.
 * @property {string} outputFormatLabel - Cadena con el patrón a mostrar en la lista de sugerencias. Reemplaza el valor numérico (entre llaves) que corresponde con el índice de la colección `outputProperties` con el valor del campo. Las llaves de cierre y apertura son necesarias.
 *
 * Por ejemplo: `outputProperties` como `[NombreMunicipio]` y `outputFormatLabel` como `“{0}”` mostrará en la lista resultados del tipo: *Pamplona*.
 * @property {string[]} outputProperties - Colección con los nombres de campos a mostrar (según el patrón indicando en `outputFormatLabel`) en la lista de sugerencias. 
 * Los campos indicados también se usan para controlar los posibles registros duplicados en la lista de sugerencias. Es decir, indicando código y nombre los resultados se agruparán por los 2 campos. 
 * Los campos definidos deben existir en la capa o capas definidas en la propiedad `featureType`.
 * @property {SearchQueryPropertyOptions} queryProperties - Definición de los campos por los que filtrar la búsqueda de municipios.
 *
 * En este tipo de búsqueda es obligatorio dar un valor a la propiedad `firstQueryWord`: se indicará el campo o campos (tipo `string`) en los que buscar el nombre del municipio.
 * @property {StyleOptions[]} styles - Colección de objetos de configuración de estilo. La relación entre capa y estilo se hace mediante el índice en la colección en `featureType` y en `styles`, por tanto, 
 * deberá haber tantas instancias como capas definidas en `featureType`.
 * 
 * No está disponible `cluster`.
 * @property {SearchSuggestionHeaderOptions} suggestionListHead - Configuración de la cabecera a mostrar en la lista de sugerencias. La cabecera consta de un literal y de un color. El literal indica el tipo de búsqueda y el color será el que mejor representa a las entidades correspondientes en el mapa.
 * @property {string} url - Dirección del servicio WFS (las búsquedas en el API SITNA están implementadas sobre el estándar [OGC Web Feature Service](http://www.opengeospatial.org/standards/wfs).
 * @example <caption>[Ver en vivo](../examples/Cfg.SearchMunicipalitySource.html)</caption> {@lang javascript}
 * {
 *     url:'//idena.navarra.es/ogc/wfs',        
 *     featurePrefix: 'IDENA',
 *     geometryName: 'the_geom',
 *     featureType: 'CATAST_Pol_Municipio',
 *     dataIdProperty: ['CMUNICIPIO'],
 *     queryProperties: {
 *         firstQueryWord: ['MUNINOAC', 'MUNICIPIO']
 *     },
 *     suggestionListHead: {
 *         label: "search.list.municipality",
 *         color: "strokeColor"
 *     },
 *     outputProperties: ['MUNICIPIO'],
 *     outputFormatLabel: '{0}',        
 *     styles: [
 *         {
 *             polygon: {
 *                 fillColor: '#000000',
 *                 fillOpacity: 0.1,
 *                 strokeColor: '#fe06a5',
 *                 strokeWidth: 2,
 *                 strokeOpacity: 1
 *             }
 *         }
 *     ]
 * }
 */
 
/**
 * Opciones de configuración del origen de datos de la búsqueda de direcciones postales.
 * @typedef PostalAddressSearchOptions
 * @see SearchOptions
 * @see {@link http://www.opengeospatial.org/standards/wfs|OGC Web Feature Service Standard}
 * @property {string[]} dataIdProperty - Colección con el nombre del campo o campos que nos servirán para identificar unívocamente a la dirección postal. Los campos definidos deben existir en la capa o capas definidas en la propiedad `featureType`.
 * @property {string} featurePrefix - Prefijo del nombre de la capa o capas a definir en la propiedad `featureType`. En caso de ser un WFS de GeoServer, se trata del nombre del espacio de trabajo (workspace).
 * @property {string[]} featureType - Colección con el nombre de la capa o capas a consultar. Es posible indicar más de una capa si todas ellas cuentan con los campos definidos en `queryProperties`.
 * @property {string} geometryName - Nombre del campo de la geometría de la dirección postal.
 * @property {string} outputFormatLabel - Cadena con el patrón a mostrar en la lista de sugerencias. Reemplaza el valor numérico (entre llaves) que corresponde con el índice de la colección `outputProperties` con el valor del campo. Las llaves de cierre y apertura son necesarias.
 *
 * Por ejemplo: `outputProperties` como `[EntidadPoblacion, Via, Numero]` y `outputFormatLabel` como `“{1} {2}, {0}”` mostrará en la lista resultados del tipo: *Calle Estafeta 13, Pamplona*.
 * @property {string[]} outputProperties - Colección con los nombres de campos a mostrar (según el patrón indicando en `outputFormatLabel`) en la lista de sugerencias. 
 * Los campos indicados también se usan para controlar los posibles registros duplicados en la lista de sugerencias. Es decir, indicando código y nombre los resultados se agruparán por los 2 campos. 
 * Los campos definidos deben existir en la capa o capas definidas en la propiedad `featureType`.
 * @property {SearchQueryPropertyOptions} queryProperties - Definición de los campos por los que filtrar la búsqueda de direcciones postales.
 *
 * En este tipo de búsqueda es obligatorio dar un valor a las siguientes propiedades:
 * - `firstQueryWord`: se indicará el campo o campos (tipo `string`) en los que buscar el nombre de la entidad de población.
 * - `secondQueryWord`: se indicará el campo o campos (tipo `string`) en los que buscar el nombre de la vía.
 * - `thirdQueryWord`: se indicará el campo o campos (tipo `string`) en los que buscar el número de portal.
 * @property {StyleOptions[]} styles - Colección de objetos de configuración de estilo. La relación entre capa y estilo se hace mediante el índice en la colección en `featureType` y en `styles`, por tanto, 
 * deberá haber tantas instancias como capas definidas en `featureType`.
 * 
 * No está disponible cluster.
 * @property {SearchSuggestionHeaderOptions} suggestionListHead - Configuración de la cabecera a mostrar en la lista de sugerencias. La cabecera consta de un literal y de un color. El literal indica el tipo de búsqueda y el color será el que mejor representa a las entidades correspondientes en el mapa.
 * @property {string} url - Dirección del servicio WFS (las búsquedas en el API SITNA están implementadas sobre el estándar [OGC Web Feature Service](http://www.opengeospatial.org/standards/wfs).
 * @example <caption>[Ver en vivo](../examples/Cfg.SearchPostalAddressSource.html)</caption> {@lang javascript}
 * {
 *     url: '//idena.navarra.es/ogc/wfs',        
 *     featurePrefix: 'IDENA',
 *     geometryName: 'the_geom',
 *     featureType: 'CATAST_Txt_Portal',
 *     dataIdProperty: ['CMUNICIPIO', 'CENTIDADC', 'CVIA', 'PORTAL'],
 *     queryProperties: {
 *         firstQueryWord: ['ENTIDADC', 'ENTINOAC'],
 *         secondQueryWord: ['VIA', 'VIANOAC'],
 *         thirdQueryWord: ['PORTAL']
 *     },
 *     suggestionListHead: {
 *         label: "search.list.number",
 *         color: "fontColor"
 *     },
 *     outputProperties: ['ENTIDADC', 'VIA', 'PORTAL', 'CVIA', 'CENTIDADC', 'CMUNICIPIO'],
 *     outputFormatLabel: '{1} {2}, {0}',
 *     styles: [
 *         {
 *             point: {
 *                 radius: 0,
 *                 label: "PORTAL",
 *                 angle: "CADANGLE",
 *                 fontColor: "#CB0000",
 *                 fontSize: 14,
 *                 labelOutlineColor: "#FFFFFF",
 *                 labelOutlineWidth: 4
 *             }
 *         }
 *     ]
 * }
 */

/**
 * Opciones de configuración del origen de datos de la búsqueda de vías.
 * @typedef StreetSearchOptions
 * @see SearchOptions
 * @see {@link http://www.opengeospatial.org/standards/wfs|OGC Web Feature Service Standard}
 * @property {string[]} dataIdProperty - Colección con el nombre del campo o campos que nos servirán para identificar unívocamente a una vía. Los campos definidos deben existir en la capa o capas definidas en la propiedad `featureType`.
 * @property {string} featurePrefix - Prefijo del nombre de la capa o capas a definir en la propiedad `featureType`. En caso de ser un WFS de GeoServer, se trata del nombre del espacio de trabajo (workspace).
 * @property {string[]} featureType - Colección con el nombre de la capa o capas a consultar. Es posible indicar más de una capa si todas ellas cuentan con los campos definidos en `queryProperties`.
 * @property {string} geometryName - Nombre del campo de la geometría de la vía.
 * @property {string} outputFormatLabel - Cadena con el patrón a mostrar en la lista de sugerencias. Reemplaza el valor numérico (entre llaves) que corresponde con el índice de la colección `outputProperties` con el valor del campo. Las llaves de cierre y apertura son necesarias.
 *
 * Por ejemplo: `outputProperties` como `[EntidadPoblacion, Via]` y `outputFormatLabel` como `“{1}, {0}”` mostrará en la lista resultados del tipo: *Calle Estafeta, Pamplona*.
 * @property {string[]} outputProperties - Colección con los nombres de campos a mostrar (según el patrón indicando en `outputFormatLabel`) en la lista de sugerencias. 
 * Los campos indicados también se usan para controlar los posibles registros duplicados en la lista de sugerencias. Es decir, indicando código y nombre los resultados se agruparán por los 2 campos. 
 * Los campos definidos deben existir en la capa o capas definidas en la propiedad `featureType`.
 * @property {SearchQueryPropertyOptions} queryProperties - Definición de los campos por los que filtrar la búsqueda de vías.
 *
 * En este tipo de búsqueda es obligatorio dar un valor a las siguientes propiedades:
 * - `firstQueryWord`: se indicará el campo o campos (tipo `string`) en los que buscar el nombre de la entidad de población.
 * - `secondQueryWord`: se indicará el campo o campos (tipo `string`) en los que buscar el nombre de la vía.
 * @property {string[]} renderFeatureType - Colección con los nombres de las capas auxiliares a añadir al resultado de la búsqueda en el mapa. Es posible indicar más de una capa si todas ellas cuentan con los campos definidos en `dataIdProperty`.
 *
 * No se muestran sugerencias en base a las capas auxiliares, únicamente se añade información en el momento de pintar en el mapa, es por ello que debe existir relación en los datos entre las capas definidas en `featureType` y `renderFeatureType` y que ambas cuenten con los campos definidos en `dataIdProperty`.
 * @property {StyleOptions[]} styles - Colección de objetos de configuración de estilo. La relación entre capa y estilo se hace mediante el índice en las colecciones 1 y 2 siendo 1 la concatenación de `featureType` 
 * y `renderFeatureType` y 2 `styles`, por tanto, deberá haber tantas instancias como la suma de las capas definidas en `featureType` y en `renderFeatureType`.
 * 
 * No está disponible cluster.
 * @property {SearchSuggestionHeaderOptions} suggestionListHead - Configuración de la cabecera a mostrar en la lista de sugerencias. La cabecera consta de un literal y de un color. El literal indica el tipo de búsqueda y el color será el que mejor representa a las entidades correspondientes en el mapa.
 * @property {string} url - Dirección del servicio WFS (las búsquedas en el API SITNA están implementadas sobre el estándar [OGC Web Feature Service](http://www.opengeospatial.org/standards/wfs).
 * @example <caption>[Ver en vivo](../examples/Cfg.SearchStreetSource.html)</caption> {@lang javascript}
 * {
 *     url: '//idena.navarra.es/ogc/wfs',        
 *     featurePrefix: 'IDENA',
 *     geometryName: 'the_geom',
 *     renderFeatureType: 'CATAST_Txt_Calle',
 *     featureType: 'CATAST_Lin_CalleEje',
 *     dataIdProperty: ['CVIA'],        
 *     queryProperties: {
 *         firstQueryWord: ['ENTINOAC', 'ENTIDADC'],
 *         secondQueryWord: ['VIA', 'VIANOAC']
 *     },
 *     suggestionListHead: {
 *         label: "search.list.street",
 *         color: "strokeColor"
 *     },
 *     outputProperties: ['ENTIDADC', 'VIA', 'CVIA', 'CENTIDADC', 'CMUNICIPIO'],
 *     outputFormatLabel: '{1}, {0}',
 *     styles: [
 *         {
 *             line: {
 *                 strokeColor: "#CB0000",
 *                 strokeOpacity: 1,
 *                 strokeWidth: 2,
 *                 strokeLinecap: "round",
 *                 strokeDashstyle: "solid"
 *             }
 *         },
 *         {
 *             point: {
 *                 label: "VIA",
 *                 angle: "CADANGLE",
 *                 fontColor: "#000000",
 *                 fontSize: 7,
 *                 labelOutlineColor: "#ffffff",
 *                 labelOutlineWidth: 2
 *             }
 *         }
 *     ]
 * }
 */

/**
 * Opciones de configuración del origen de datos de la búsqueda de vías.
 * @typedef TownSearchOptions
 * @see SearchOptions
 * @see {@link http://www.opengeospatial.org/standards/wfs|OGC Web Feature Service Standard}
 * @property {string[]} dataIdProperty - Colección con el nombre del campo o campos que nos servirán para identificar unívocamente a un casco urbano. Los campos definidos deben existir en la capa o capas definidas en la propiedad `featureType`.
 * @property {string} featurePrefix - Prefijo del nombre de la capa o capas a definir en la propiedad `featureType`. En caso de ser un WFS de GeoServer, se trata del nombre del espacio de trabajo (workspace).
 * @property {string[]} featureType - Colección con el nombre de la capa o capas a consultar. Es posible indicar más de una capa si todas ellas cuentan con los campos definidos en `queryProperties`.
 * @property {string} geometryName - Nombre del campo de la geometría del casco urbano.
 * @property {string} outputFormatLabel - Cadena con el patrón a mostrar en la lista de sugerencias. Reemplaza el valor numérico (entre llaves) que corresponde con el índice de la colección `outputProperties` con el valor del campo. Las llaves de cierre y apertura son necesarias.
 *
 * Por ejemplo: `outputProperties` como `[NombreMunicipio, NombreCascoUrbano]` y `outputFormatLabel` como `“{1} ({0})”` mostrará en la lista resultados del tipo: *Salinas de Pamplona (Galar)*.
 * @property {string[]} outputProperties - Colección con los nombres de campos a mostrar (según el patrón indicando en `outputFormatLabel`) en la lista de sugerencias. 
 * Los campos indicados también se usan para controlar los posibles registros duplicados en la lista de sugerencias. Es decir, indicando código y nombre los resultados se agruparán por los 2 campos. 
 * Los campos definidos deben existir en la capa o capas definidas en la propiedad `featureType`.
 * @property {SearchQueryPropertyOptions} queryProperties - Definición de los campos por los que filtrar la búsqueda de vías.
 *
 * En este tipo de búsqueda es obligatorio dar un valor a la propiedad `firstQueryWord`: se indicará el campo o campos (tipo `string`) en los que buscar el nombre del casco urbano.
 * @property {StyleOptions[]} styles - La relación entre capa y estilo se hace mediante el índice en la colección en `featureType` y en `styles`, por tanto, deberá haber tantas instancias como capas definidas en `featureType`.
 * 
 * No está disponible cluster.
 * @property {SearchSuggestionHeaderOptions} suggestionListHead - Configuración de la cabecera a mostrar en la lista de sugerencias. La cabecera consta de un literal y de un color. El literal indica el tipo de búsqueda y el color será el que mejor representa a las entidades correspondientes en el mapa.
 * @property {string} url - Dirección del servicio WFS (las búsquedas en el API SITNA están implementadas sobre el estándar [OGC Web Feature Service](http://www.opengeospatial.org/standards/wfs).
 * @example <caption>[Ver en vivo](../examples/Cfg.SearchTownSource.html)</caption> {@lang javascript}
 * {
 *     url: '//idena.navarra.es/ogc/wfs',        
 *     featurePrefix: 'IDENA',
 *     geometryName: 'the_geom',
 *     featureType: 'ESTADI_Pol_EntidadPob',        
 *     dataIdProperty: ['CMUNICIPIO', 'CENTIDAD'],        
 *     queryProperties: {
 *         firstQueryWord: ['ENTINOAC', 'ENTIDAD']
 *     },
 *     suggestionListHead: {
 *         label: "search.list.urban",
 *         color: "strokeColor"
 *     },
 *     outputProperties: ['MUNICIPIO', 'ENTIDAD'],
 *     outputFormatLabel: '{1} ({0})',        
 *     styles: [
 *         {
 *             polygon: {
 *                 fillColor: '#000000',
 *                 fillOpacity: 0.1,
 *                 strokeColor: '#feba1e',
 *                 strokeWidth: 2,
 *                 strokeOpacity: 1
 *             }
 *         }
 *     ]
 * }
 */
 
/**
 * Opciones de control de búsquedas. La configuración por defecto tiene como origen de datos el WFS de IDENA. 
 * Es posible establecer un origen de datos distinto en el que consultar, para ello en lugar de asignar un booleano a la propiedad, que activa o desactiva la búsqueda, 
 * se asignará un objeto con las propiedades a sobrescribir. Las propiedades a sobrescribir no siempre serán las mismas, variarán en función de la configuración que tenga la búsqueda que se quiera modificar.
 * @typedef SearchOptions
 * @extends ControlOptions
 * @see MapControlOptions
 * @property {HTMLElement|string} [div] - Elemento del DOM en el que crear el control o valor de atributo id de dicho elemento.
 * @property {boolean|CadastralSearchOptions} [cadastralParcel=true] - Esta propiedad activa/desactiva la búsqueda de parcelas catastrales en el buscador del mapa. Formato: municipio, polígono, parcela.
 *
 * Para configurar un origen de datos distinto a IDENA, establecer como valor una instancia de {@link CadastralSearchOptions}.
 *
 * @property {boolean} [coordinates=true] - Esta propiedad activa/desactiva la localización de coordenadas en Sistema de Referencia ETRS89, bien UTM Huso 30 Norte (EPSG:25830) o latitud-longitud (EPSG:4258, EPSG:4326 o CRS:84) en el buscador del mapa.
 * @property {string} [instructions="Buscar municipio, casco urbano, calle, dirección, referencia catastral, coordenadas UTM o latitud-longitud"] - Esta propiedad establece el atributo `title` del cajetín y del botón del buscador del mapa.
 * @property {boolean|MunicipalitySearchOptions} [municipality=true] - Esta propiedad activa/desactiva la búsqueda de municipios en el buscador del mapa.
 *
 * Para configurar un origen de datos distinto a IDENA, establecer como valor una instancia de {@link MunicipalitySearchOptions}.
 * @property {boolean|PostalAddressSearchOptions} [postalAddress=true] - Esta propiedad activa/desactiva la búsqueda de direcciones postales en el buscador del mapa. Formato: entidad de población, vía, portal.
 * @property {boolean|StreetSearchOptions} [street=true] - Esta propiedad activa/desactiva la búsqueda de vías en el buscador del mapa. Formato: entidad de población, vía.
 * @property {boolean|TownSearchOptions} [town=true] - Esta propiedad activa/desactiva de cascos urbanos en el buscador del mapa.
 *
 * Para configurar un origen de datos distinto a IDENA, establecer como valor una instancia de {@link TownSearchOptions}.
 * @example <caption>[Ver en vivo](../examples/cfg.SearchOptions.html)</caption> {@lang html}
 * <div id="mapa"></div>    
 * <script>
 *     // Creamos un mapa con el control de búsquedas. 
 *     // Configuramos el buscador desactivando la búsqueda de parcelas y la localización de coordenadas.
 *     // Indicamos un placeHolder y tooltip (propiedad "instructions") acorde con las búsquedas configuradas.
 *     var map = new SITNA.Map("mapa", {
 *         controls: {
 *             search: {
 *                 coordinates: false,
 *                 cadastralParcel: false,
 *                 municipality: true,
 *                 town: true,
 *                 street: true,
 *                 postalAddress: true,
 *                 placeHolder: "Municipio, casco urbano, calle o portal",
 *                 instructions: "Buscar municipio, casco urbano, calle o portal"
 *             }
 *         }
 *     });
 * </script>
 */
  
/**
 * Opciones de control de búsquedas.
 * @typedef StreetViewOptions
 * @extends ControlOptions
 * @see MapControlOptions
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
 * Se pueden añadir WMS escribiendo la dirección del servicio o eligiendo un servicio de la lista de sugerencias de servicios de interés.
 * 
 * Se pueden añadir datos de archivos buscándolos en el cuadro de diálogo que se abre tras pulsar “Abrir archivo” o arrastrándolos y soltándolos dentro del área del mapa.
 * @property {boolean|FeatureInfoOptions} [featureInfo=true] - Si se establece a un valor *truthy*, el mapa responde a los clics con un información de las capas cargadas de tipo WMS. Se usa para ello la petición `getFeatureInfo` del standard WMS.
 * @property {boolean|LayerCatalogOptions} [layerCatalog=false] - Si se establece a un valor *truthy*, se muestra un control para añadir capas de trabajo desde uno o varios servicios WMS. 
 * Con este control se dispone de las siguientes funcionalidades:
 *
 *    - Consultar las capas disponibles en uno o varios WMS.
 *    - Buscar capas mediante texto libre. Se busca el texto en los títulos y los resúmenes descriptivos de cada capa, que se publican en el [documento de capacidades](https://github.com/7o9/implementer-friendly-standards/blob/master/introduction.rst#getcapabilities) del servicio.
 *    - Añadir capas al mapa como capas de trabajo.
 *
 * Este control se usa habitualmente en combinación con `workLayerManager`, como se muestra en el ejemlo de {@link LayerCatalogOptions}.
 * @property {boolean|ControlOptions} [legend=false] - Si se establece a un valor *truthy*, el mapa tiene leyenda.
 * @property {boolean|ControlOptions} [loadingIndicator=true] - Si se establece a un valor *truthy*, el mapa tiene un indicador de espera de carga.
 * @property {boolean|ControlOptions} [measure=false] - Si se establece a un valor *truthy*, el mapa tiene un medidor de longitudes, áreas y perímetros.
 * @property {boolean|ControlOptions} [navBar=false] - Si se establece a un valor *truthy*, el mapa tiene una barra de navegación con control de zoom.
 * @property {boolean|OverviewMapOptions} [overviewMap=false] - Si se establece a un valor *truthy*, el mapa tiene un mapa de situación.
 * @property {boolean|ControlOptions} [popup=false] - Si se establece a un valor *truthy*, el mapa muestra los datos asociados a los marcadores cuando se pulsa sobre ellos.
 * @property {boolean|ControlOptions} [printMap=false] - Si se establece a un valor *truthy*, se muestra una herramienta para imprimir el mapa en PDF.
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
 * El buscador localiza coordenadas y busca entidades geográficas tales como: municipios, cascos urbanos, vías, portales y parcelas catastrales de IDENA. 
 * Es posible establecer un origen de datos distinto a IDENA en el que buscar, consultar la sección: 2.3.1. Objeto de configuración de opciones del buscador.
 * @property {boolean|StreetViewOptions} [streetView=true] - Si se establece a un valor *truthy*, el usuario podrá abrir una ventana de Google StreetView en la ubicación seleccionada en el mapa.
 * @property {boolean|ControlOptions} [TOC=false] - Si se establece a un valor *truthy*, el mapa tiene una tabla de contenidos mostrando las capas de trabajo y los grupos de marcadores. 
 * Los controles `TOC` y `workLayerManager` realizan varias funciones comunes, así rara vez será necesario tener los dos a la vez en un visor.
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
                    url: '//idena.navarra.es/ogc/wfs',
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
 * @property {object} [data] - Diccionario de pares clave-valor que representa los atributos alfanuméricos del marcador. Al pulsar sobre este, los atributos se mostrarán en un bocadillo.
 * @property {string} [layer] - Esta propiedad se utiliza en {@link SITNA.Map#addMarker}. Es el identificador de una capa de tipo {@link SITNA.Consts.layerType.VECTOR} en la que se añadirá el marcador. 
 * Si no se especifica se creará una capa específica para los marcadores que se añadan por este método.
 * @property {boolean} [showPopup] - Si se establece a `true`, el marcador se añade al mapa con el bocadillo de información asociada visible por defecto.
 * @property {number[]} [anchor=[0.5, 1]] - Posicionamiento relativo del icono respecto al punto del mapa, representado por un array de dos números entre 0 y 1, siendo [0, 0] la esquina superior izquierda del icono y [1, 1] la esquina inferior derecha del icono.
 * @property {string[]} [classes=["tc-marker1", "tc-marker2", "tc-marker3", "tc-marker4", "tc-marker5"]] - Lista de nombres de clase CSS a utilizar para los iconos de los marcadores. La API extraerá la URL de las imágenes del atributo `background-image` asociado a la clase.
 * @property {string} [cssClass] - Nombre de una clase CSS. El marcador adoptará como icono el valor del atributo `background-image` de dicha clase.
 * @property {number} [height=32] - Altura en píxeles del icono.
 * @property {number} [width=32] - Anchura en píxeles del icono.
 * @property {string} [url] - URL de archivo de imagen que se utilizará para el icono.
 * @property {string} [group] - Nombre de grupo en el que incluir el marcador. Todos los marcadores con el mismo valor en esta propiedad se consideran en un mismo grupo, y 
 * con ello comparten el mismo icono. El icono se selecciona por orden de la lista de clases CSS definida en `classes`. Los grupos se muestran en la tabla de contenidos y en la leyenda.
 * @property {string} [angle] - Nombre del campo del cual extraer la rotación a aplicar a la etiqueta.
 * @property {string} [fontColor="#000000"] - Color del texto de la etiqueta descriptiva del marcador, representado en formato hex triplet (`#RRGGBB`).
 * @property {number} [fontSize=10] - Tamaño de fuente del texto de la etiqueta descriptiva del marcador.
 * @property {string} [label] - Colección de nombre de campo o campos de los cuales extraer el valor de la etiqueta.
 * @property {string} [labelOutlineColor="#ffffff"] - Color del contorno del texto de la etiqueta descriptiva del marcador, representado en formato hex triplet (`#RRGGBB`).
 * @property {number} [labelOutlineWidth=2] - Anchura en píxeles del trazo del contorno del texto de la etiqueta.
 */

/**
 * Opciones de estilo de punto. Hay que tener en cuenta que el archivo `config.json` de una maquetación puede sobreescribir los valores por defecto de esta propiedad
 * (para ver instrucciones de uso de maquetaciones, consultar {@tutorial layout_cfg}).
 * @typedef PointStyleOptions
 * @see StyleOptions
 * @see layout_cfg
 * @property {string} [angle] - Nombre del campo del cual extraer la rotación a aplicar a la etiqueta.
 * @property {string} [fillColor="#000000" ("#333366" en clusters)] - Color de relleno, representado en formato hex triplet (`#RRGGBB`).
 * @property {number} [fillOpacity=0.3 (0.6 en clusters)] - Opacidad de relleno, valor de 0 a 1.
 * @property {string} [fontColor="#000000" ("#ffffff" en clusters)] - Color del texto de la etiqueta descriptiva del punto, representado en formato hex triplet (`#RRGGBB`).
 * @property {number} [fontSize=10 (9 en clusters)] - Tamaño de fuente del texto de la etiqueta descriptiva del punto.
 * @property {string} [label] - Colección de nombre de campo o campos de los cuales extraer el valor de la etiqueta.
 * @property {string} [labelOutlineColor="#ffffff" (undefined en clusters)] - Color del contorno del texto de la etiqueta descriptiva del punto, representado en formato hex triplet (`#RRGGBB`).
 * @property {number} [labelOutlineWidth=2 (undefined en clusters)] - Anchura en píxeles del trazo del contorno del texto de la etiqueta.
 * @property {number} [radius=6 (undefined en clusters)] - Radio en pixels del símbolo que representa el punto.
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
 * @property {string[]} [classes=["tc-marker1", "tc-marker2", "tc-marker3", "tc-marker4", "tc-marker5"]] - Lista de nombres de clase CSS a utilizar para los iconos de los marcadores. La API extraerá la URL de las imágenes del atributo `background-image` asociado a la clase.
 * @property {string} [cssClass] - Nombre de una clase CSS. El marcador adoptará como icono el valor del atributo `background-image` de dicha clase.
 * @property {number} [height=32] - Altura en píxeles del icono.
 * @property {number} [width=32] - Anchura en píxeles del icono.
 * @property {string} [url] - URL de archivo de imagen que se utilizará para el icono.
 * @property {string} [angle] - Nombre del campo del cual extraer la rotación a aplicar a la etiqueta.
 * @property {string} [fontColor="#000000"] - Color del texto de la etiqueta descriptiva del marcador, representado en formato hex triplet (`#RRGGBB`).
 * @property {number} [fontSize=10] - Tamaño de fuente del texto de la etiqueta descriptiva del marcador.
 * @property {string} [label] - Colección de nombre de campo o campos de los cuales extraer el valor de la etiqueta.
 * @property {string} [labelOutlineColor="#ffffff"] - Color del contorno del texto de la etiqueta descriptiva del marcador, representado en formato hex triplet (`#RRGGBB`).
 * @property {number} [labelOutlineWidth=2] - Anchura en píxeles del trazo del contorno del texto de la etiqueta.
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
 * Opciones de estilo de entidades geográficas.
 * @typedef StyleOptions
 * @see MapOptions
 * @see WFSQueryOptions
 * @see CadastralSearchOptions
 * @see MunicipalitySearchOptions
 * @see PostalAddressSearchOptions
 * @see StreetSearchOptions
 * @see TownSearchOptions
 * @property {PointStyleOptions} point - Opciones de estilo de punto.
 * @property {LineStyleOptions} line - Opciones de estilo de línea.
 * @property {PolygonStyleOptions} polygon - Opciones de estilo de polígono.
 * @property {MarkerStyleOptions} marker - Opciones de estilo de marcador (punto de mapa con icono).
 * @property {ClusterStyleOptions} cluster - Opciones de estilo de cluster de puntos. Consultar la propiedad `cluster` de {@link LayerOptions} para saber cómo mostrar clusters.
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
            const mapObj = TC.Map.get(document.querySelector('.' + TC.Consts.classes.MAP));
            TC.error(
                TC.Util.getLocaleString(mapObj.options.locale, "urlFailedToLoad",
                    { url: url }),
                [TC.Consts.msgErrorMode.TOAST, TC.Consts.msgErrorMode.EMAIL],
                "Error al cargar " + url);
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
                var data;
                if (options.data) {
                    if (typeof options.data === 'string') {
                        data = options.data;
                    }
                    else if (typeof options.data === 'object') {
                        const paramArray = [];
                        for (var key in options.data) {
                            paramArray[paramArray.length] = key + '=' + options.data[key].toString();
                        }
                        data = paramArray.join('&');
                    }
                }
                var url = options.url;
                if (method === 'GET' && data) {
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
                                        responseData = JSON.parse(request.responseText);
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
            templating: [
                TC.apiLocation + TC.Consts.url.TEMPLATING,
                TC.apiLocation + TC.Consts.url.TEMPLATING_HELPERS,
                TC.apiLocation + TC.Consts.url.TEMPLATING_I18N,
                TC.apiLocation + TC.Consts.url.TEMPLATING_OVERRIDES
            ],
            templatingRuntime: [
                TC.apiLocation + TC.Consts.url.TEMPLATING_RUNTIME,
                TC.apiLocation + TC.Consts.url.TEMPLATING_HBS_HELPERS
            ],
            templatingFull: [
                TC.apiLocation + TC.Consts.url.TEMPLATING_FULL,
                TC.apiLocation + TC.Consts.url.TEMPLATING_HBS_HELPERS
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
                CacheBuilder: function () { TC.wrap.Control.apply(this, arguments); },
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
        TC.inherit(TC.wrap.control.CacheBuilder, TC.wrap.Control);
        TC.inherit(TC.wrap.control.Edit, TC.wrap.Control);
        TC.inherit(TC.wrap.control.ResultsPanel, TC.wrap.Control);

        TC.loadCSS(TC.apiLocation + 'TC/css/tcmap.css');


        TC.loadJS(!TC.browserFeatures.urlParser(), TC.apiLocation + TC.Consts.url.URL_POLYFILL, function () { });

        var uids = {};
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
        var isSupported = true;
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
                    isSupported = false;
                }
            }

            if (TC.Cfg.oldBrowserAlert && !isSupported) {
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
                    var msg = apiError ? TC.Consts.text.API_ERROR : TC.Consts.text.APP_ERROR;
                    JL("onerrorLogger").fatalException({
                        "msg": msg,
                        "errorMsg": errorMsg,
                        "url": url,
                        "lineNumber": lineNumber,
                        "column": column,
                        "appUrl": location.href,
                        "apiVersion": TC.version,
                        "prevState": mapObj.getPreviousMapState(),
                        "userAgent": navigator.userAgent
                    }, errorObj);
                    errorCount++;

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