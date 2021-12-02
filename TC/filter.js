﻿TC.filter = {};

TC.filter.Filter = function (tagName) {
    this.tagName_ = tagName;
    
    this._defaultNSURL = "http://www.opengis.net/ogc";
    this._defaultPrefixNS = this._wfsPrefixNS = "ogc";
    this._fieldTitle = "PropertyName";

    this._defaultNSURL = this._wfsNSURL = "http://www.opengis.net/ogc";
    this._wfs2prefixNS = "fes";
    this._wfs2NSURL = "http://www.opengis.net/fes/2.0";
    this._wfs2FieldTitle = "ValueReference";
    this._escapeAttrName = "escape";
    this._wfs2EscapeAttrName = "escapeChar";
};

TC.filter.Filter.prototype.getTagName = function () {
    return this.tagName_;
};
TC.filter.Filter.prototype.setTagName = function (text) {    
    return this.tagName_;
};

TC.filter.Filter.prototype.writeFilterCondition_ = function () {

    //return '<{prefix}:{tag}>{childs}</{prefix}:{tag}>'.format({prefix:"ogc",tag:filter.getTagName(),childs:""});
    var filter = this;
    return '<{prefix}:Filter xmlns:{prefix}=\"{NSURL}" xmlns:gml=\"http://www.opengis.net/gml{gmlversion}">{inner}</{prefix}:Filter>'.format({
        prefix: this._defaultPrefixNS,
        NSURL: this._defaultNSURL,
        tag: filter.getTagName(),
        inner: this.writeInnerCondition_(filter),
        gmlVersion: (this._defaultNSURL === this._wfs2NSURL ? '/3.2' : '')
    });

    /*ol.xml.pushSerializeAndPop(item,
        ol.format.WFS.GETFEATURE_SERIALIZERS_,
        ol.xml.makeSimpleNodeFactory(filter.getTagName()),
        [filter], objectStack);*/
}
TC.filter.Filter.prototype.writeInnerCondition_ = function (filter) {
    if (filter != this) {
        filter._defaultNSURL = this._defaultNSURL;
        filter._defaultPrefixNS = this._defaultPrefixNS;
        filter._fieldTitle = this._fieldTitle;
    }

    if (filter instanceof TC.filter.LogicalNary) {
        return filter.write()
    }
    else if (filter instanceof TC.filter.ComparisonBinary) {
        return filter.write();
    }
    else if (filter instanceof TC.filter.Comparison) {
        return filter.write();
    }
    else if (filter instanceof TC.filter.Spatial) {
        return filter.write();
    }
    else if (filter instanceof TC.filter.Function) {
        return filter.write();
    }
    else
        return filter.write();
};
TC.filter.Filter.prototype.writeInnerArrayCondition_ = function (filters) {
    const parent = this;
    return parent.conditions.reduce(function (vi, va, index) {
        return (vi instanceof TC.filter.Filter ? parent.writeInnerCondition_(vi) : vi) + parent.writeInnerCondition_(va);
    });
}

TC.filter.Filter.prototype.getText = function (wfsVersion) {    
    if (wfsVersion && parseFloat(wfsVersion,10) >= 2) {
        this._defaultPrefixNS = this._wfs2prefixNS;
        this._defaultNSURL = this._wfs2NSURL;
        this._fieldTitle = this._wfs2FieldTitle;
        this._escapeAttrName = this._wfs2EscapeAttrName;
    }
    return this.writeFilterCondition_();
};

TC.filter.Filter.prototype.readText = function (text) {
    if (text.indexOf(this._wfs2prefixNS) > -1 && 
        text.indexOf(this._wfs2NSURL) > -1 &&
        text.indexOf(this._wfs2FieldTitle) > -1 &&
        text.indexOf(this._wfs2EscapeAttrName) > -1) {
        this._defaultPrefixNS = this._wfs2prefixNS;
        this._defaultNSURL = this._wfs2NSURL;
        this._fieldTitle = this._wfs2FieldTitle;
        this._escapeAttrName = this._wfs2EscapeAttrName;
    }

    return this.readFilterCondition_(text);    
};

TC.filter.Filter.prototype.readFilterCondition_ = function (text) {
    this.setTagName(text);
    return this.readInnerCondition_(text);    
}
TC.filter.Filter.prototype.readInnerCondition_ = function (text) {
    //if (filter != this) {        
    //    filter._fieldTitle = this._fieldTitle;
    //}

    //if (filter instanceof TC.filter.LogicalNary) {
    //    return filter.write()
    //}
    //else if (filter instanceof TC.filter.ComparisonBinary) {
    //    return filter.write();
    //}
    //else if (filter instanceof TC.filter.Comparison) {
    //    return filter.write();
    //}
    //else if (filter instanceof TC.filter.Spatial) {
    //    return filter.write();
    //}
    //else if (filter instanceof TC.filter.Function) {
    //    return filter.write();
    //}
    //else
        return filter.read(text);
};

TC.filter.and = function (conditions) {
    var params = [null].concat(Array.prototype.slice.call(arguments));
    return new (Function.prototype.bind.apply(TC.filter.And, params));
};

TC.filter.or = function (conditions) {
    var params = [null].concat(Array.prototype.slice.call(arguments));
    return new (Function.prototype.bind.apply(TC.filter.Or, params));
};

TC.filter.not = function (condition) {
    return new TC.filter.Not(condition);
};


TC.filter.intersects = function () {
    if (Object.prototype.toString.call(arguments[0]) !== "[object String]")
        return new TC.filter.Intersects(null, arguments[0], arguments[1]);
    else
        return new TC.filter.Intersects(arguments[0], arguments[1], arguments[2]);
};


TC.filter.within = function () {
    if (Object.prototype.toString.call(arguments[0]) !== "[object String]")
        return new TC.filter.Within(null, arguments[0], arguments[1]);
    else
        return new TC.filter.Within(arguments[0], arguments[1], arguments[2]);
};


TC.filter.equalTo = function (propertyName, expression, opt_matchCase) {
    return new TC.filter.EqualTo(propertyName, expression, opt_matchCase);
};

TC.filter.notEqualTo = function (propertyName, expression, opt_matchCase) {
    return new TC.filter.NotEqualTo(propertyName, expression, opt_matchCase);
};

TC.filter.lessThan = function (propertyName, expression) {
    return new TC.filter.LessThan(propertyName, expression);
};

TC.filter.lessThanOrEqualTo = function (propertyName, expression) {
    return new TC.filter.LessThanOrEqualTo(propertyName, expression);
};

TC.filter.greaterThan = function (propertyName, expression) {
    return new TC.filter.GreaterThan(propertyName, expression);
};

TC.filter.greaterThanOrEqualTo = function (propertyName, expression) {
    return new TC.filter.GreaterThanOrEqualTo(propertyName, expression);
};

TC.filter.isNull = function (propertyName) {
    return new TC.filter.IsNull(propertyName);
};

TC.filter.between = function (propertyName, lowerBoundary, upperBoundary) {
    return new TC.filter.IsBetween(propertyName, lowerBoundary, upperBoundary);
};

TC.filter["function"] = function (functionName, params) {
    return new TC.filter.Function(functionName, params);
};

TC.filter.like = function (propertyName, pattern,
    opt_wildCard, opt_singleChar, opt_escapeChar, opt_matchCase) {
    return new TC.filter.IsLike(propertyName, pattern,
        opt_wildCard, opt_singleChar, opt_escapeChar, opt_matchCase);
};

TC.filter.LogicalNary = function (tagName, conditions) {

    TC.filter.Filter.call(this, tagName);

    this.conditions = Array.prototype.slice.call(arguments, 1);
};
TC.inherit(TC.filter.LogicalNary, TC.filter.Filter);

TC.filter.And = function (conditions) {
    var params = ['And'].concat(Array.prototype.slice.call(arguments));
    TC.filter.LogicalNary.apply(this, params);
};
TC.inherit(TC.filter.And, TC.filter.LogicalNary);

TC.filter.Or = function (conditions) {
    var params = ['Or'].concat(Array.prototype.slice.call(arguments));
    TC.filter.LogicalNary.apply(this, params);
};
TC.inherit(TC.filter.Or, TC.filter.LogicalNary);

TC.filter.LogicalNary.prototype.write = function () {
    return '<{prefix}:{tag}>{inner}</{prefix}:{tag}>'.format({
        prefix: this._defaultPrefixNS,
        tag: this.getTagName(),
        inner: this.writeInnerArrayCondition_()
    });
}

TC.filter.Not = function (condition) {
    this.condition = condition;
    TC.filter.Filter.call(this, 'Not');
    
};
TC.inherit(TC.filter.Not, TC.filter.Filter);

TC.filter.Filter.prototype.write=function () {
    return '<{prefix}:{tag}>{inner}</{prefix}:{tag}>'.format({
        prefix: this._defaultPrefixNS,
        tag: this.getTagName(),
        inner: this.writeInnerCondition_(this.condition)
    });
}

TC.filter.Comparison = function (tagName, propertyName) {

    TC.filter.Filter.call(this, tagName);

    this.propertyName = propertyName;
};
TC.inherit(TC.filter.Comparison, TC.filter.Filter);

TC.filter.Comparison.prototype.write = function () {
    var values = '';
    //isbetween
    if (this.lowerBoundary && this.upperBoundary)
        values = '<{prefix}:LowerBoundary><{prefix}:Literal>{LowerBoundary}</{prefix}:Literal></{prefix}:LowerBoundary><{prefix}:UpperBoundary><{prefix}:Literal>{UpperBoundary}</{prefix}:Literal></{prefix}:UpperBoundary>'.format({
            prefix:this._defaultPrefixNS,
            LowerBoundary: this.lowerBoundary,
            UpperBoundary: this.upperBoundary
        });
    if (this.pattern)
        values = '<{prefix}:Literal><![CDATA[{Pattern}]]></{prefix}:Literal>'.format({
            prefix: this._defaultPrefixNS,
            Pattern: this.pattern
        });
    if (this.params)
        if (Array.isArray(this.params))
            values = this.params.reduce(function (a, b, i) {
                var fmt = function (text) {
                    return '<{prefix}:Literal><![CDATA[{value}]]></{prefix}:Literal>'.format({ prefix: this._defaultPrefixNS, value: text });
                }
                return (i > 0 ? a : fmt(a)) + fmt(b);
            });
        else
            values = '<{prefix}:Literal><![CDATA[{value}]]></{prefix}:Literal>'.format({ prefix: this._defaultPrefixNS, value: this.params });

    return '<{prefix}:{tag}{matchCase}{escape}{singleChar}{wildCard}><{prefix}:{fieldTitle}>{name}</{prefix}:{fieldTitle}>{values}</{prefix}:{tag}>'.format({
        prefix: this._defaultPrefixNS,
        tag: this.getTagName(),
        matchCase: (typeof (this.matchCase) !== "undefined" ? " matchCase=\"" + this.matchCase + "\"" : ""),
        escape: (typeof (this.escapeChar) !== "undefined" ? (" " + this._escapeAttrName +"=\"" + this.escapeChar + "\"") : ""),
        singleChar: (typeof (this.singleChar) !== "undefined" ? " singleChar=\"" + this.singleChar + "\"" : ""),
        wildCard: (typeof (this.wildCard) !== "undefined" ? " wildCard=\"" + this.wildCard + "\"" : ""),
        name: this.propertyName,
        values: values,
        fieldTitle: this._fieldTitle
    });
}

TC.filter.ComparisonBinary = function (
    tagName, propertyName, expression, opt_matchCase) {

    TC.filter.Comparison.call(this, tagName, propertyName);

    this.expression = expression;

    this.matchCase = opt_matchCase;
};
TC.inherit(TC.filter.ComparisonBinary, TC.filter.Comparison);

TC.filter.ComparisonBinary.prototype.write = function () {
    var _str = '<{prefix}:{tag}{matchCase}>' + (this.propertyName instanceof TC.filter.Filter ? '{name}' : '<{prefix}:{fieldTitle}>{name}</{prefix}:{fieldTitle}>') + '<{prefix}:Literal><![CDATA[{value}]]></{prefix}:Literal></{prefix}:{tag}>';
    return _str.format({
        prefix: this._defaultPrefixNS,
        tag: this.getTagName(),
        matchCase: (typeof (this.matchCase) !== "undefined" ? " matchCase=\"" + this.matchCase + "\"" : ""),
        //escape:(typeof(this.escapeChar)!=="undefined"? " escape=\"" + this.escapeChar+ "\"":""),
        //singleChar:(typeof(this.singleChar)!=="undefined"? " singleChar=\"" + this.singleChar+ "\"":""),
        //wildCard:(typeof(this.wildCard)!=="undefined"? " wildCard=\"" + this.wildCard+ "\"":""),
        name: this.propertyName instanceof TC.filter.Filter ? this.propertyName.write() : this.propertyName,
        value: this.expression,
        fieldTitle: this._fieldTitle
    });
}
TC.filter.EqualTo = function (propertyName, expression, opt_matchCase) {
    TC.filter.ComparisonBinary.call(this, 'PropertyIsEqualTo', propertyName, expression, opt_matchCase);
};
TC.inherit(TC.filter.EqualTo, TC.filter.ComparisonBinary);

TC.filter.GreaterThan = function (propertyName, expression) {
    TC.filter.ComparisonBinary.call(this, 'PropertyIsGreaterThan', propertyName, expression);
};
TC.inherit(TC.filter.GreaterThan, TC.filter.ComparisonBinary);

TC.filter.GreaterThanOrEqualTo = function (propertyName, expression) {
    TC.filter.ComparisonBinary.call(this, 'PropertyIsGreaterThanOrEqualTo', propertyName, expression);
};
TC.inherit(TC.filter.GreaterThanOrEqualTo, TC.filter.ComparisonBinary);

TC.filter.LessThan = function (propertyName, expression) {
    TC.filter.ComparisonBinary.call(this, 'PropertyIsLessThan', propertyName, expression);
};
TC.inherit(TC.filter.LessThan, TC.filter.ComparisonBinary);

TC.filter.LessThanOrEqualTo = function (propertyName, expression) {
    TC.filter.ComparisonBinary.call(this, 'PropertyIsLessThanOrEqualTo', propertyName, expression);
};
TC.inherit(TC.filter.LessThanOrEqualTo, TC.filter.ComparisonBinary);

TC.filter.NotEqualTo = function (propertyName, expression, opt_matchCase) {
    TC.filter.ComparisonBinary.call(this, 'PropertyIsNotEqualTo', propertyName, expression, opt_matchCase);
};
TC.inherit(TC.filter.NotEqualTo, TC.filter.ComparisonBinary);

TC.filter.IsLike = function (propertyName, pattern,
    opt_wildCard, opt_singleChar, opt_escapeChar, opt_matchCase) {
    TC.filter.Comparison.call(this, 'PropertyIsLike', propertyName);

    this.pattern = pattern;

    this.wildCard = (opt_wildCard !== undefined) ? opt_wildCard : '*';

    this.singleChar = (opt_singleChar !== undefined) ? opt_singleChar : '.';

    this.escapeChar = (opt_escapeChar !== undefined) ? opt_escapeChar : '!';

    this.matchCase = opt_matchCase;
};
TC.inherit(TC.filter.IsLike, TC.filter.Comparison);

TC.filter.IsNull = function (propertyName) {
    TC.filter.Comparison.call(this, 'PropertyIsNull', propertyName);
};
TC.inherit(TC.filter.IsNull, TC.filter.Comparison);

TC.filter.IsBetween = function (propertyName, lowerBoundary, upperBoundary) {
    TC.filter.Comparison.call(this, 'PropertyIsBetween', propertyName);
    this.lowerBoundary = lowerBoundary;
    this.upperBoundary = upperBoundary;
};
TC.inherit(TC.filter.IsBetween, TC.filter.Comparison);

TC.filter.Function = function (functionName, params) {
    TC.filter.Filter.call(this, functionName);
    this.params = params
};
TC.inherit(TC.filter.Function, TC.filter.Filter);

TC.filter.Function.prototype.write = function () {
    var values = '';
    if (this.params) {
        var _paramsToText = function (param, prefix) {
            if (typeof (param) === "string") {
                return '<{prefix}:Literal><![CDATA[{value}]]></{prefix}:Literal>'.format({ prefix: prefix, value: param });
            }
            if (typeof (param) === "object") {
                var _text = '';
                for (var attr in param) {
                    _text = _text + '<{prefix}:{key}>{value}</{prefix}:{key}>'.format({ prefix: prefix, value: param[attr], key: attr })
                }
                return _text;
            }
        }
        if (Array.isArray(this.params)) {
            var prefix = this._defaultPrefixNS;
            values = this.params.reduce(function (a, b, i) {
                var fmt = function (param) {
                    return _paramsToText(param, prefix);
                }
                return (i > 1 ? a : fmt(a)) + fmt(b);
            });
        }
        else
            values = _paramsToText(this.params, this._defaultPrefixNS);
    }
    return '<{prefix}:Function name="{tag}">{inner}</{prefix}:Function>'.format({
        prefix: this._defaultPrefixNS,
        tag: this.getTagName(),
        inner: values
    });
};

TC.filter.Spatial = function (tagName, geometryName, geometry, opt_srsName) {
    TC.filter.Filter.call(this, tagName);
    this.geometryName = geometryName;
    this.geometry = geometry;
    this.srsName = opt_srsName;
    this.wrap = new TC.wrap.Filter(this);
};

TC.wrap.Filter = function (filter) {
    this.parent = filter;
};

TC.wrap.Filter.prototype.getAxisOrientation = function () {
    // Establecemos el srsName a EPSG:xxxx o urn:x-ogc:def:crs:EPSG:xxxx dependiendo del orden de eje de coordenadas del CRS.
    // Esto se debe a que GeoServer hace asunciones en el orden de los ejes dependiendo del formato de srsName que se use.
    // Más información: https://docs.geoserver.org/latest/en/user/services/wfs/basics.html#wfs-basics-axis
    var srsName = this.parent.srsName;
    if (srsName) {
        const match = srsName.match(/\d{4,6}$/);
        if (match) {
            const code = match[0];
            const def = ol.proj.get(srsName);
            if (def) {
                return ((def.axisOrientation_ === 'neu' ? 'urn:x-ogc:def:crs:EPSG:' : 'EPSG:') + code);
            }
        }
    }
    return srsName;
};

TC.inherit(TC.filter.Spatial, TC.filter.Filter);

TC.filter.Spatial.prototype.write = function () {
    var pattern = null;
    if (this.geometryName) {
        pattern = '<{prefix}:{tag}><{prefix}:{fieldTitle}>{name}</{prefix}:{fieldTitle}>{geometry}</{prefix}:{tag}>';
    }
    else {
        pattern = '<{prefix}:{tag}><{prefix}:{fieldTitle}/>{geometry}</{prefix}:{tag}>';
    }

    return pattern.format({
        prefix: this._defaultPrefixNS,
        tag: this.getTagName(),
        name: this.geometryName,
        geometry: (this.geometry instanceof TC.filter.Function ? this.writeInnerCondition_(this.geometry) : this.geometry.wrap.toGML(undefined, this.wrap.getAxisOrientation())),
        fieldTitle: this._fieldTitle
    });
};

TC.filter.bbox = function () {
    if (Object.prototype.toString.call(arguments[0]) !== "[object String]")
        return new TC.filter.Bbox(null, arguments[0], arguments[1]);
    else
        return new TC.filter.Bbox(arguments[0], arguments[1], arguments[2]);
};

TC.filter.Bbox = function (geometryName, extent, opt_srsName) {
    TC.filter.Filter.call(this, 'BBOX');
    this.geometryName = geometryName;
    this.extent = extent;
    this.srsName = opt_srsName;
};
TC.inherit(TC.filter.Bbox, TC.filter.Spatial);

TC.filter.Bbox.prototype.write = function () {
    var bbox = '<gml:Envelope{srsName}><gml:lowerCorner>{lowerCorner}</gml:lowerCorner><gml:upperCorner>{upperCorner}</gml:upperCorner></gml:Envelope>'
	.format({
	    srsName: (typeof (this.srsName) !== "undefined" ? " srsName=\"" + this.srsName + "\"" : ""),
	    lowerCorner: (this.extent[0] + ' ' + this.extent[1]),
	    upperCorner: (this.extent[2] + ' ' + this.extent[3])
	});
    var pattern = null;
    if (this.geometryName)
        pattern='<{prefix}:{tag}><{prefix}:{fieldTitle}>{name}</{prefix}:{fieldTitle}>{BBOX}</{prefix}:{tag}>';
    else
        pattern='<{prefix}:{tag}><{prefix}:{fieldTitle}/>{BBOX}</{prefix}:{tag}>';
    return pattern.format({
        prefix: this._defaultPrefixNS,
        tag: this.getTagName(),
        fieldTitle:  this._fieldTitle,
        name: this.geometryName,
        BBOX: bbox
    });
};

TC.filter.Intersects = function (geometryName, geometry, opt_srsName) {
    TC.filter.Spatial.call(this, 'Intersects', geometryName, geometry, opt_srsName);
};
TC.inherit(TC.filter.Intersects, TC.filter.Spatial);

TC.filter.Within = function (geometryName, geometry, opt_srsName) {
    TC.filter.Spatial.call(this, 'Within', geometryName, geometry, opt_srsName);
};
TC.inherit(TC.filter.Within, TC.filter.Spatial);