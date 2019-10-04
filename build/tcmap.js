/**
 * LoadJS descargado de https://github.com/muicss/loadjs
 * @version 3.5.2
 */
loadjs = function () { var l = function () { }, c = {}, f = {}, u = {}; function o(e, n) { if (e) { var t = u[e]; if (f[e] = n, t) for (; t.length;)t[0](e, n), t.splice(0, 1) } } function s(e, n) { e.call && (e = { success: e }), n.length ? (e.error || l)(n) : (e.success || l)(e) } function h(t, r, i, c) { var o, s, e = document, n = i.async, f = (i.numRetries || 0) + 1, u = i.before || l, a = t.replace(/^(css|img)!/, ""); c = c || 0, /(^css!|\.css$)/.test(t) ? (o = !0, (s = e.createElement("link")).rel = "stylesheet", s.href = a) : /(^img!|\.(png|gif|jpg|svg)$)/.test(t) ? (s = e.createElement("img")).src = a : ((s = e.createElement("script")).src = t, s.async = void 0 === n || n), !(s.onload = s.onerror = s.onbeforeload = function (e) { var n = e.type[0]; if (o && "hideFocus" in s) try { s.sheet.cssText.length || (n = "e") } catch (e) { 18 != e.code && (n = "e") } if ("e" == n && (c += 1) < f) return h(t, r, i, c); r(t, n, e.defaultPrevented) }) !== u(t, s) && e.head.appendChild(s) } function t(e, n, t) { var r, i; if (n && n.trim && (r = n), i = (r ? t : n) || {}, r) { if (r in c) throw "LoadJS"; c[r] = !0 } !function (e, r, n) { var t, i, c = (e = e.push ? e : [e]).length, o = c, s = []; for (t = function (e, n, t) { if ("e" == n && s.push(e), "b" == n) { if (!t) return; s.push(e) } --c || r(s) }, i = 0; i < o; i++)h(e[i], t, n) }(e, function (e) { s(i, e), o(r, e) }, i) } return t.ready = function (e, n) { return function (e, t) { e = e.push ? e : [e]; var n, r, i, c = [], o = e.length, s = o; for (n = function (e, n) { n.length && c.push(e), --s || t(c) }; o--;)r = e[o], (i = f[r]) ? n(r, i) : (u[r] = u[r] || []).push(n) }(e, function (e) { s(n, e) }), t }, t.done = function (e) { o(e, []) }, t.reset = function () { c = {}, f = {}, u = {} }, t.isDefined = function (e) { return e in c }, t }();

var TC = TC || {};
/*
 * Initialization
 */
TC.version = '2.0.0 [2019-10-4 14:25:45]';
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
        TEMPLATING: 'lib/dust/dust-full-helpers.min.js',
        TEMPLATING_I18N: 'lib/dust/dustjs-i18n.min.js',
        TEMPLATING_OVERRIDES: 'lib/dust/dust.overrides.js',
        PROJ4JS: 'lib/proj4js/proj4-src.js',
        EPSG: 'https://epsg.io/',
        LOCALFORAGE: TC.apiLocation + 'lib/localForage/localforage.min.js',
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
    TC.Consts.layer = {
        IDENA_ORTHOPHOTO: 'ortofoto',
        IDENA_BASEMAP: 'mapabase',
        IDENA_CADASTER: 'catastro',
        IDENA_CARTO: 'cartografia',
        IDENA_ORTHOPHOTO2018: 'ortofoto2018',
        IDENA_ORTHOPHOTO2017: 'ortofoto2017',
        IDENA_ORTHOPHOTO2014: 'ortofoto2014',
        IDENA_ORTHOPHOTO2012: 'ortofoto2012',
        IDENA_DYNBASEMAP: 'mapabase_dinamico',
        IDENA_DYNORTHOPHOTO: 'ortofoto_dinamico',
        IDENA_DYNORTHOPHOTO2018: 'ortofoto2018_dinamico',
        IDENA_DYNORTHOPHOTO2017: 'ortofoto2017_dinamico',
        IDENA_DYNORTHOPHOTO2014: 'ortofoto2014_dinamico',
        IDENA_DYNORTHOPHOTO2012: 'ortofoto2012_dinamico',
        IDENA_DYNCARTO: 'cartografia_dinamico',
        IDENA_BW_RELIEF: 'relieve_bn',
        IDENA_BASEMAP_ORTHOPHOTO: 'base_orto',

        IGN_ES_CARTO: "ign-raster",
        IGN_ES_BASEMAP: "ign-base",
        IGN_ES_BASEMAP_GREY: "ign-base-gris",
        IGN_ES_RELIEF: "ign-mtn",
        IGN_ES_ORTHOPHOTO: "ign-pnoa",
        IGN_ES_LIDAR: "ign-lidar",

        IGN_ES_DYNCARTO: "ign-raster-dyn",
        IGN_ES_DYNBASEMAP: "ign-base-dyn",
        IGN_ES_DYNBASEMAP_GREY: "ign-base-gris-dyn",
        IGN_ES_DYNRELIEF: "ign-mtn-dyn",
        IGN_ES_DYNORTHOPHOTO: "ign-pnoa-dyn",
        IGN_ES_DYNLIDAR: "ign-lidar-dyn",

        IGN_FR_CARTO: "ign-fr-cartes",
        IGN_FR_BASEMAP: "ign-fr-base",
        IGN_FR_RELIEF: "ign-fr-estompage",
        IGN_FR_ORTHOPHOTO: "ign-fr-orto",

        IGN_FR_DYNCARTO: "ign-fr-cartes-dyn",
        IGN_FR_DYNBASEMAP: "ign-fr-base-dyn",
        IGN_FR_DYNRELIEF: "ign-fr-estompage-dyn",
        IGN_FR_DYNORTHOPHOTO: "ign-fr-orto-dyn",

        OSM: 'osm',
        CARTO_VOYAGER: 'carto_voyager',
        CARTO_LIGHT: 'carto_light',
        CARTO_DARK: 'carto_dark',
        MAPBOX_STREETS: 'mapbox_streets',
        MAPBOX_SATELLITE: 'mapbox_satellite',

        BLANK: 'ninguno'
    };
    TC.Consts.text = {
        API_ERROR: 'Error API SITNA',
        APP_ERROR: 'Error de aplicación'
    };
    /**
     * Colección de identificadores de tipo de capa.
     * No se deberían modificar las propiedades de esta clase.
     * @class TC.consts.LayerType
     * @static
     */
    /**
     * Identificador de capa de tipo WMS.
     * @property WMS
     * @type string
     * @final
     */
    /**
     * Identificador de capa de tipo WMTS.
     * @property WMTS
     * @type string
     * @final
     */
    /**
     * Identificador de capa de tipo WFS.
     * @property WFS
     * @type string
     * @final
     */
    /**
     * Identificador de capa de tipo KML.
     * @property KML
     * @type string
     * @final
     */
    /**
     * Identificador de capa de tipo GPX.
     * @property GPX
     * @type string
     * @final
     */
    /**
     * Identificador de capa de tipo vectorial. Este tipo de capa es la que se utiliza para dibujar marcadores.
     * @property VECTOR
     * @type string
     * @final
     */
    /**
     * Identificador de capa de grupo.
     * @property GROUP
     * @type string
     * @final
     */
    TC.Consts.layerType = {
        WMS: 'WMS',
        WMTS: 'WMTS',
        WFS: 'WFS',
        VECTOR: 'vector',
        KML: 'KML',
        GPX: 'GPX',
        GML: 'GML',
        GEOJSON: 'GeoJSON',
        GROUP: 'group'
    };
    TC.Consts.geom = {
        POINT: 'point',
        MULTIPOINT: 'multipoint',
        POLYLINE: 'polyline',
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
    TC.Consts.mimeType = {
        PNG: 'image/png',
        JPEG: 'image/jpeg',
        JSON: 'application/json',
        GEOJSON: 'application/vnd.geo+json',
        KML: 'application/vnd.google-earth.kml+xml',
        GML: 'application/gml+xml',
        GPX: 'application/gpx+xml',
        XML: 'application/xml'
    };
    TC.Consts.format = {
        JSON: 'JSON',
        KML: 'KML',
        GML: 'GML',
        GML2: 'GML2',
        GML3: 'GML2',
        GEOJSON: 'GeoJSON',
        TOPOJSON: 'TopoJSON',
        GPX: 'GPX',
        WKT: 'WKT'
    };
    //enumerado de errores y warninqs derivados de descargas, getfeatures
    TC.Consts.WFSErrors = {
        GetFeatureNotAvailable: "GetFeatureNotAvailable",
        LayersNotAvailable: "LayersNotAvailable",
        NoLayers: "NoLayers",
        NoValidLayers: "noValidLayers",
        QueryNotAvailable: "QueryNotAvailable",
        CapabilitiesParseError: "CapabilitiesParseError",
        NumMaxFeatures: "NumMaxFeatures",
        GetCapabilities: "GetCapabilities",
        Indeterminate: "Indeterminate",
        NoFeatures: "NoFeatures"
    }
    /**
     * Colección de identificadores de estados de visibilidad.
     * No se deberían modificar las propiedades de esta clase.
     * @class TC.consts.Visibility
     * @static
     */
    /**
     * Identificador de nodo no visible.
     * @property NOT_VISIBLE
     * @type number
     * @final
     */
    /**
     * Identificador de nodo no visible a la resolución actual.
     * @property NOT_VISIBLE_AT_RESOLUTION
     * @type number
     * @final
     */
    /**
     * Identificador de nodo no visible pero que tiene nodos hijos visibles.
     * @property HAS_VISIBLE
     * @type number
     * @final
     */
    /**
     * Identificador de nodo visible.
     * @property VISIBLE
     * @type number
     * @final
     */
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
                    id: TC.Consts.layer.IDENA_DYNORTHOPHOTO2018,
                    title: 'Ortofoto 2014',
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
                    title: 'Ortofoto 2014',
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
                featureInfo: true,
                featureTools: true
            },

            layout: null,

            styles: {
                point: {
                    fillColor: '#000000',
                    fillOpacity: 0.1,
                    strokeColor: '#ff0000',
                    strokeWidth: 2,
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
                    labelOutlineWidth: 2,
                    labelOutlineColor: '#ffffff',
                    fontColor: '#000000',
                    fontSize: 10
                },
                polygon: {
                    strokeColor: '#ff0000',
                    strokeWidth: 2,
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
                        fontColor: "#fff",
                        fontSize: 9
                    }
                },
                selection: {
                    point: {
                        fillColor: '#0000ff',
                        fillOpacity: 0.5,
                        strokeColor: '#0000ff',
                        strokeWidth: 2,
                        radius: 6,
                        labelOutlineWidth: 2,
                        labelOutlineColor: '#ffffff',
                        labelOffset: [0, -16],
                        fontColor: '#000000',
                        fontSize: 10
                    },
                    line: {
                        strokeColor: '#0000ff',
                        strokeWidth: 2,
                        labelOutlineWidth: 2,
                        labelOutlineColor: '#ffffff',
                        fontColor: '#000000',
                        fontSize: 10
                    },
                    polygon: {
                        strokeColor: '#0000ff',
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
                            return value;
                        });
                    },
                    function (err) {
                        return ctor.resolve(callback()).then(function () {
                            return ctor.reject(err);
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
                if (method === 'GET') {
                    url = url + '?' + data;
                }
                if (options.cache === false) {
                    url += (url.indexOf('?') < 0 ? '&' : '?') + 'ts=' + Date.now();
                }
                const request = new XMLHttpRequest();
                request.open(method, options.url);

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

        // Completamos los datos de versión
        document.addEventListener('DOMContentLoaded', function () {
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
        });

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
            return new Promise(function (resolve, reject) {
                options = options || {};
                var code = options.crs.substr(options.crs.indexOf(':') + 1);
                if (Number.isNaN(parseInt(code))) {
                    // El CRS no está en modo urn o EPSG
                    code = options.crs.substr(options.crs.lastIndexOf('/') + 1);
                }
                var projData = projectionDataCache[code];
                if (projData) {
                    resolve(projData);
                }
                else {
                    var url = TC.Consts.url.EPSG + '?format=json&q=' + code;
                    const toolProxification = new TC.tool.Proxification(TC.proxify);
                    toolProxification.fetchJSON(url, options).then(function (data) {
                        projectionDataCache[code] = data;
                        resolve(data);
                    }).catch(function (error) {
                        reject(Error(error));
                    });
                }
            });
        };

        TC.loadProjDef = function (options) {
            options = options || {};
            const crs = options.crs;
            const epsgPrefix = 'EPSG:';
            const urnPrefix = 'urn:ogc:def:crs:EPSG::';
            const urnxPrefix = 'urn:x-ogc:def:crs:EPSG:';
            const gmlPrefix = 'http://www.opengis.net/gml/srs/epsg.xml#';

            const fromHTTPURIToURN = function (name) {
                var match = /http:\/\/www\.opengis\.net\/def\/crs\/EPSG\/\d\/(\d{4})/.exec(name);
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
                const epsgCode = epsgPrefix + code;
                const urnCode = urnPrefix + code;
                const urnxCode = urnxPrefix + code;
                const gmlCode = gmlPrefix + code;
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
                // Por convención, los CRS definidos por URI siempre tienen orden de coordenadas X-Y.
                loadProj4Def(gmlCode, axisUnawareDef);
                if (crs.indexOf('http') === 0) {
                    // El CRS es tipo URI, usado seguramente en un GML.
                    loadProj4Def(crs, axisUnawareDef);
                    getDef(crs).name = name;
                }
                getDef(epsgCode).name = name;
                getDef(gmlCode).name = name;
            };
            const loadDefResponse = function (data) {
                var result = data.status === 'ok' && data.number_result === 1;
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
                    TC.getProjectionData(options).then(function (data) {
                        if (loadDefResponse(data) && isFunction(options.callback)) {
                            options.callback();
                        };
                    });
                }
            }
        };

        TC.url = {
            templating: [
                TC.apiLocation + TC.Consts.url.TEMPLATING,
                TC.apiLocation + TC.Consts.url.TEMPLATING_I18N,
                TC.apiLocation + TC.Consts.url.TEMPLATING_OVERRIDES
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

        if (!TC.Util) {
            TC.syncLoadJS(TC.apiLocation + 'TC/Util');
        }

        TC.Cfg = TC.Util.extend(true, {}, TC.Defaults, TC.Cfg);

        TC.capabilities = {};

        TC.WFScapabilities = {};

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
});