﻿import TC from '../../TC';
import Feature from '../Feature';
TC.Feature = Feature;
TC.feature = TC.feature || {};

/*
 * Polyline
 * Parameters: coords, array of 2 element arrays of numbers; options, object
 */
TC.feature.MultiPolyline = function (coords, options) {
    const self = this;

    TC.Feature.apply(self, arguments);

    if (!self.wrap.isNative(coords)) {
        self.wrap.createMultiPolyline(coords, options);
    }
};

TC.inherit(TC.feature.MultiPolyline, TC.Feature);

TC.feature.MultiPolyline.prototype.STYLETYPE = "line";

TC.feature.MultiPolyline.prototype.CLASSNAME = 'TC.feature.MultiPolyline';

TC.feature.MultiPolyline.prototype.getCoords = function (options) {
    options = options || {};
    const coords = TC.Feature.prototype.getCoords.call(this, options);
    if (options.pointArray) {
        return [].concat.apply([], coords);
    }
    return coords;
};

TC.feature.MultiPolyline.prototype.setCoords = function (coords) {
    const self = this;
    if (Array.isArray(coords) && Array.isArray(coords[0]) && !Array.isArray(coords[0][0])) {
        coords = [coords];
    }
    return TC.Feature.prototype.setCoords.call(self, coords);
};

TC.feature.MultiPolyline.prototype.getLength = function (options) {
    return this.wrap.getLength(options);
};

const MultiPolyline = TC.feature.MultiPolyline;
export default MultiPolyline;