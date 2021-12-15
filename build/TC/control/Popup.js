TC.control = TC.control || {};

if (!TC.Control) {
    TC.syncLoadJS(TC.apiLocation + 'TC/Control');
}

TC.Consts.event.POPUP = TC.Consts.event.POPUP || 'popup.tc';
TC.Consts.event.POPUPHIDE = TC.Consts.event.POPUPHIDE || 'popuphide.tc';
TC.Consts.classes.DRAG = TC.Consts.classes.DRAG || 'tc-drag';
TC.Consts.classes.DRAGGED = TC.Consts.classes.DRAGGED || 'tc-dragged';
TC.Consts.classes.DRAGGABLE = TC.Consts.classes.DRAGGABLE || 'tc-draggable';

TC.control.Popup = function () {
    var self = this;

    TC.Control.apply(self, arguments);
    self.currentFeature = null;
    //self.wrap = { popup: null };    
    self.wrap = new TC.wrap.control.Popup(self);
};

TC.inherit(TC.control.Popup, TC.Control);

(function () {
    var ctlProto = TC.control.Popup.prototype;

    ctlProto.CLASS = 'tc-ctl-popup';

    ctlProto.template = {};
    ctlProto.template[ctlProto.CLASS] = TC.apiLocation + "TC/templates/tc-ctl-popup.hbs";

    ctlProto.render = function (callback) {
        const self = this;
        return self._set1stRenderPromise(new Promise(function (resolve, reject) {
            TC.Control.prototype.renderData.call(self, {
                closeButton: self.options.closeButton || self.options.closeButton === undefined,
                shareButton: self.options.share
            })
                .then(function addPopup() {
                    self.popupDiv = self.div.querySelector(`.${ctlProto.CLASS}`);
                    self.contentDiv = self.popupDiv.querySelector(`.${ctlProto.CLASS}-content`);
                    self.menuDiv = self.popupDiv.querySelector(`.${ctlProto.CLASS}-menu`);
                    self.addUIEventListeners();

                    self.map.wrap.addPopup(self).then(function endRender() {
                        if (TC.Util.isFunction(callback)) {
                            callback();
                        }
                        resolve();
                    });
                })
                .catch(err => reject(err instanceof Error ? err : Error(err)));
        }));
    };

    ctlProto.register = function (map) {
        const self = this;
        const result = TC.Control.prototype.register.call(self, map);
        return new Promise(function (resolve, reject) {
            Promise.all([result, self.renderPromise()]).then(function () {
                map.on(TC.Consts.event.VIEWCHANGE, function () {
                    if (map.view === TC.Consts.view.PRINTING) {
                        if (self.isVisible()) {
                            self.hide();
                        }
                    }
                });

                map.on(TC.Consts.event.LAYERVISIBILITY, function (e) {
                    if (self.currentFeature && self.currentFeature.layer === e.layer && !e.layer.getVisibility()) {
                        if (self.isVisible()) {
                            self.hide();
                        }
                    }
                });

                map.on(TC.Consts.event.LAYERREMOVE + ' ' + TC.Consts.event.FEATURESCLEAR, function (e) {
                    if (self.currentFeature && self.currentFeature.layer === e.layer) {
                        if (self.isVisible()) {
                            self.hide();
                        }
                    }
                });

                map.on(TC.Consts.event.UPDATE, function () {
                    if (!self.currentFeature || self.currentFeature._visibilityState === TC.Consts.visibility.NOT_VISIBLE) {
                        if (self.isVisible()) {
                            self.hide();
                        }
                    }
                });

                map.on(TC.Consts.event.FEATUREREMOVE, function (e) {
                    if (self.currentFeature === e.feature) {
                        if (self.isVisible()) {
                            self.hide();
                        }
                    }
                });

                /*
                    GLS: Controlamos el ancla del popup cuando hay zoom in/out de pantalla o navegador, debería hacerlo OL pero no lo gestiona.
                    No funciona, sólo salta la primera vez, paso a sobrescribir el método de OL
                 */
                //var config = { attributes: true, attributeFilter: ['style', 'class'], childList: false, subtree: false };
                //var observer = new MutationObserver(function (mutationsList, observer) {
                //    //var positionMutation = mutationsList.filter(function (mutation) {
                //    //    return mutation.type === "attributes"
                //    //}).filter(function (mutation) {
                //    //    return ['top', 'right', 'bottom', 'left', 'style'].indexOf(mutation.attributeName) > -1;
                //    //});

                //    if (mutationsList.length > 0) {
                //        // me desconecto para no entrar en un bucle infinito
                //        //observer.disconnect();

                //        var top = mutationsList[0].target[mutationsList[0].attributeName].top;
                //        var right = mutationsList[0].target[mutationsList[0].attributeName].right;
                //        var bottom = mutationsList[0].target[mutationsList[0].attributeName].bottom;
                //        var left = mutationsList[0].target[mutationsList[0].attributeName].left;

                //        [{ top: top }, { right: right }, { bottom: bottom }, { left: left }].forEach(function (elm) {
                //            var key = Object.keys(elm)[0];
                //            if (elm[key].length > 0) {
                //                document.querySelector('.ol-overlay-container').style[key] = parseFloat(elm[key].replace('px', '')) / window.devicePixelRatio + 'px';
                //            }
                //        });

                //        // volvemos a observar
                //        //observer.observe(document.querySelector('.ol-overlay-container'), config);
                //    }
                //});
                //observer.observe(document.querySelector('.ol-overlay-container'), config);

                resolve(self);
            }).catch(function (err) {
                reject(err instanceof Error ? err : Error(err));
            });
        })
    };

    ctlProto.addUIEventListeners = function () {
        const self = this;
        const closeBtn = self.menuDiv.querySelector(`.${self.CLASS}-close`)
        if (closeBtn) {
            closeBtn.addEventListener(TC.Consts.event.CLICK, function () {
                self.hide();
            }, { passive: true });
        }
        const shareBtn = self.menuDiv.querySelector(`.${self.CLASS}-share`)
        if (shareBtn) {
            shareBtn.addEventListener(TC.Consts.event.CLICK, function () {
                if (self.caller) {
                    self.caller.showShareDialog();
                }
            }, { passive: true });
        }
    };

    ctlProto.fitToView = function (delayed) {
        var self = this;
        if (delayed) {
            setTimeout(function () {
                self.wrap.fitToView();
            }, 1000);
        }
        else {
            self.wrap.fitToView();
        }
    };

    ctlProto.hide = function () {
        var self = this;
        if (self.map) {
            const data = {
                control: self,
                feature: self.currentFeature
            };
            self.map.wrap.hidePopup(self);
            self.getContainerElement().innerHTML = '';
            self.setDragged(false);
            self.map.trigger(TC.Consts.event.POPUPHIDE, data);
        }
    };

    ctlProto.getContainerElement = function () {
        return this.contentDiv || null;
    };

    ctlProto.getMenuElement = function () {
        return this.menuDiv || null;
    };

    ctlProto.setDragged = function (dragged) {
        const self = this;
        self.dragged = dragged;
        if (self.popupDiv) {
            self.popupDiv.classList.toggle(TC.Consts.classes.DRAGGED, !!dragged);
        }
        self.wrap.setDragged(dragged);
    };

    ctlProto.setDragging = function (dragging) {
        const self = this;
        if (dragging) {
            self.setDragged(true);
            self.popupDiv.classList.add(TC.Consts.classes.DRAG);
        }
        else {
            self.popupDiv.classList.remove(TC.Consts.classes.DRAG);
        }
    };

    ctlProto.isVisible = function () {
        const self = this;

        return self.popupDiv && self.popupDiv.classList.contains(TC.Consts.classes.VISIBLE);
    };

})();