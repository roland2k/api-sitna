﻿TC.control = TC.control || {};

if (!TC.control.MapContents) {
    TC.syncLoadJS(TC.apiLocation + 'TC/control/MapContents');
}

TC.control.TOC = function () {
    var self = this;

    TC.control.MapContents.apply(self, arguments);
};

TC.inherit(TC.control.TOC, TC.control.MapContents);

(function () {
    var ctlProto = TC.control.TOC.prototype;

    ctlProto.CLASS = 'tc-ctl-toc';

    ctlProto.template = {};
    ctlProto.template[ctlProto.CLASS] = TC.apiLocation + "TC/templates/tc-ctl-toc.hbs";
    ctlProto.template[ctlProto.CLASS + '-branch'] = TC.apiLocation + "TC/templates/tc-ctl-toc-branch.hbs";
    ctlProto.template[ctlProto.CLASS + '-node'] = TC.apiLocation + "TC/templates/tc-ctl-toc-node.hbs";

    var CLICKEVENT = 'click';

    ctlProto.register = function (map) {
        const self = this;
        const result = TC.control.MapContents.prototype.register.call(self, map);

        map.on(TC.Consts.event.EXTERNALSERVICEADDED, function (e) {
            self.onExternalServiceAdded(e);
        });

        return result;
    };

    ctlProto.onExternalServiceAdded = function (e) {
        const self = this;
        if (e && e.layer) {
            e.layer.map = self.map;
            self.map.addLayer(e.layer).then(function (layer) {
                self.updateLayerTree(e.layer);
            });
        }
    };

    ctlProto.addUIEventListeners = function () {
        const self = this;
        self.div.addEventListener(CLICKEVENT, TC.EventTarget.listenerBySelector('input[type=checkbox]', function (e) { // No usamos TC.Consts.event.CLICK porque en iPad los eventos touchstart no van bien en los checkbox
            const checkbox = e.target;
            var ul = checkbox;
            while (ul && !ul.matches('ul.' + self.CLASS + '-wl')) {
                ul = ul.parentElement;
            }
            const lis = [];
            for (var i = 0, len = ul.children.length; i < len; i++) {
                child = ul.children[i];
                if (child.tagName === 'LI') {
                    lis.push(child);
                }
            }
            for (var i = 0, len = lis.length; i < len; i++) {
                const li = lis[i];
                if (li.contains(checkbox)) {
                    const layer = self.map.getLayer(li.dataset.layerId);
                    var parent = checkbox;
                    do {
                        parent = parent.parentElement;
                    }
                    while (parent && parent.tagName !== 'LI');
                    const uid = parent.dataset.layerUid;
                    layer.setNodeVisibility(uid, checkbox.checked);
                    break;
                }
            }

            e.stopPropagation();
        }));
        self.div.addEventListener(TC.Consts.event.MOUSEUP, TC.EventTarget.listenerBySelector('button.' + self.CLASS + '-collapse-btn', function (e) {
            e.target.blur();
            const li = e.target.parentElement;
            if (!li.classList.contains(self.CLASS + '-leaf')) {
                li.classList.toggle(TC.Consts.classes.COLLAPSED);
                const ul = li.querySelector('ul');
                ul.classList.toggle(TC.Consts.classes.COLLAPSED);
                e.stopPropagation();
            }
        }));
    };

    ctlProto.update = function () {
        var self = this;

        var _getCheckbox = function (li) {
            for (var i = 0, len = li.children.length; i < len; i++) {
                const child = li.children[i];
                if (child.matches('input[type=checkbox]')) {
                    return child;
                }
            }
            return null;
        };

        self.getLayerUIElements().forEach(function (li) {
            const layer = self.map.getLayer(li.dataset.layerId);
            if (layer) {
                _getCheckbox(li).checked = layer.getVisibility();

                layer.tree = null;

                li.querySelectorAll('li').forEach(function (l) {
                    const checkbox = _getCheckbox(l);
                    const uid = l.dataset.layerUid;
                    switch (layer.getNodeVisibility(uid)) {
                        case TC.Consts.visibility.VISIBLE:
                            checkbox.checked = true;
                            checkbox.indeterminate = false;
                            break;
                        case TC.Consts.visibility.NOT_VISIBLE_AT_RESOLUTION:
                            checkbox.checked = true;
                            checkbox.indeterminate = false;
                            break;
                        case TC.Consts.visibility.HAS_VISIBLE:
                            checkbox.checked = false;
                            checkbox.indeterminate = true;
                            break;
                        default:
                            checkbox.checked = false;
                            checkbox.indeterminate = false;
                    }
                });
            }
        });

        self.updateScale();
    };

    ctlProto.updateScale = function () {
        const self = this;
        self.getLayerUIElements().forEach(function (li) {
            const layer = self.map.getLayer(li.dataset.layerId);
            li.querySelectorAll('li').forEach(function (elm) {
                const uid = elm.dataset.layerUid;
                elm.classList.toggle(self.CLASS + '-node-notvisible', !layer.isVisibleByScale(uid));
            });
        });
    };

    ctlProto.updateLayerTree = function (layer) {
        var self = this;

        if (!layer.isBase && !layer.options.stealth) {
            TC.control.MapContents.prototype.updateLayerTree.call(self, layer);

            self.div.querySelector('.' + self.CLASS + '-empty').classList.add(TC.Consts.classes.HIDDEN);

            self.getRenderedHtml(self.CLASS + '-branch', self.layerTrees[layer.id])
                .then(function (out) {
                    const parser = new DOMParser();
                    const newLi = parser.parseFromString(out, 'text/html').body.firstChild;
                    const uid = newLi.dataset.layerUid;
                    const li = self.div.querySelector('.' + self.CLASS + '-wl li[data-layer-uid="' + uid + '"]');
                    if (li) {
                        li.innerHTML = newLi.innerHTML;
                        li.setAttribute('class', newLi.getAttribute('class')); // Esto actualiza si un nodo deja de ser hoja o pasa a ser hoja
                        if (!li.dataset.layerId) {
                            li.dataset.layerId = layer.id;
                        }
                    }
                    else {
                        newLi.dataset.layerId = layer.id;
                        const ul = self.div.querySelector('.' + self.CLASS + '-wl');
                        ul.insertBefore(newLi, ul.firstChild);
                    }

                    var wl = 'ul.' + self.CLASS + '-wl';
                    var branch = 'ul.' + self.CLASS + '-branch';
                    var node = 'li.' + self.CLASS + '-node';
                    var leaf = 'li.' + self.CLASS + '-leaf';
                    self.div.querySelectorAll(wl + ' ' + branch + ' ' + branch + ',' + wl + ' ' + branch + ' ' + node).forEach(function (node) {
                        if (!node.matches(leaf)) {
                            node.classList.add(TC.Consts.classes.COLLAPSED);
                        }
                    });
                    self.update();
                })
                .catch(function (err) {
                    TC.error(err);
                });
        }
    };

    ctlProto.removeLayer = function (layer) {
        if (!layer.isBase) {
            TC.control.MapContents.prototype.removeLayer.call(this, layer);
        }
    };

    ctlProto.updateLayerVisibility = function (layer) {
        var self = this;
        self.getLayerUIElements().forEach(function (li) {
            if (li.dataset.layerId === layer.id) {
                var isHidden = !layer.getVisibility();
                li.querySelectorAll('input[type=checkbox]').forEach(function (checkbox) {
                    if (checkbox.matches('.' + self.CLASS + '-branch-cb')) {
                        checkbox.checked = !isHidden;
                    }
                    else {
                        checkbox.disabled = isHidden;
                    }
                });
            }
        });
    };

    ctlProto.updateLayerOrder = function (layer, oldIdx, newIdx) {
        // Este control no tiene que hacer nada
    };

    ctlProto.render = function (callback) {
        const self = this;

        return TC.Control.prototype.render.call(self, function () {

            var controlOptions = self.options.controls || [];

            if (controlOptions.length > 0) {
                var ctl = controlOptions[0];
                var newDiv = document.createElement("div");
                self.div.appendChild(newDiv);
                self.map.addControl(ctl.name, TC.Util.extend({ 'div': newDiv }, ctl.options));
            }

            if (TC.Util.isFunction(callback)) {
                callback();
            }
        });
    };

    ctlProto.getLayerUIElements = function () {
        const self = this;
        const result = [];
        const children = self.div.querySelector('ul.' + self.CLASS + '-wl').children;
        for (var i = 0, len = children.length; i < len; i++) {
            child = children[i];
            if (child.tagName === 'LI') {
                result.push(child);
            }
        }
        return result;
    };
})();
