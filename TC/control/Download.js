﻿TC.control = TC.control || {};

if (!TC.control.MapInfo) {
    TC.syncLoadJS(TC.apiLocation + 'TC/control/MapInfo');
}

if (!TC.filter) {
    TC.syncLoadJS(TC.apiLocation + 'TC/Filter');
}

TC.control.Download = function (options) {
    var self = this;
    self._classSelector = '.' + self.CLASS;

    TC.Control.apply(self, arguments);

    var opts = options || {};
    self._$dialogDiv = $(TC.Util.getDiv(opts.dialogDiv));
    if (!opts.dialogDiv) {
        self._$dialogDiv.appendTo('body');
    }    
};

TC.inherit(TC.control.Download, TC.control.MapInfo);

(function () {
    var ctlProto = TC.control.Download.prototype;

    ctlProto.CLASS = 'tc-ctl-download';

    ctlProto.template = {};

    if (TC.isDebug) {
        ctlProto.template[ctlProto.CLASS] = TC.apiLocation + "TC/templates/Download.html";
        ctlProto.template[ctlProto.CLASS + '-dialog'] = TC.apiLocation + "TC/templates/DownloadDialog.html";
    } else {
        ctlProto.template[ctlProto.CLASS] = function () { dust.register(ctlProto.CLASS, body_0); function body_0(chk, ctx) { return chk.w("<h2>").h("i18n", ctx, {}, { "$key": "download" }).w(" </h2><div class=\"tc-ctl-tctr tc-ctl-tctr-select\"><form><label class=\"tc-ctl-tctr-tab tc-ctl-download-image\" style=\"width:calc(100%/2 - 1px)\"><input type=\"radio\" name=\"sctnr-sel\" value=\"image\" /><span>").h("i18n", ctx, {}, { "$key": "dl.export.map" }).w("</span></label><label class=\"tc-ctl-tctr-tab tc-ctl-download-data\" style=\"width:calc(100%/2 - 1px)\"><input type=\"radio\" name=\"sctnr-sel\" value=\"data\" /><span>").h("i18n", ctx, {}, { "$key": "dl.export.vector" }).w("</span></label></form></div><div class=\"tc-ctl tc-ctl-tctr-elm tc-ctl-tctr-elm-image tc-group tc-ctl-download-cnt tc-ctl-download-image tc-collapsed\"><div><label>").h("i18n", ctx, {}, { "$key": "format" }).w(":</label><select id=\"download-format-image\" class=\"tc-combo\"><option value=\"image/png\">PNG</option><option value=\"image/jpeg\">JPEG</option></select><div class=\"tc-ctl-download-div\"><input id=\"tc-ctl-download-image-qr\" class=\"tc-hidden\" type=\"checkbox\" checked style=\"display:none;\" /><label for=\"tc-ctl-download-image-qr\" class=\"tc-ctl-download-image-qr-label\" title=\"").h("i18n", ctx, {}, { "$key": "createQrCodeToImage" }).w("\">").h("i18n", ctx, {}, { "$key": "appendQRCode" }).w("</label></div><div class=\"tc-group tc-group tc-ctl-download-cnt\" style=\"text-align:right;\"><button type=\"button\" class=\"tc-ctl-download-btn tc-button tc-icon-button\" title=\"").h("i18n", ctx, {}, { "$key": "downloadImageFromCurrentMap" }).w("\" name=\"descargar\">").h("i18n", ctx, {}, { "$key": "download" }).w("</button></div><div class=\"tc-ctl-download-alert tc-alert alert-warning tc-hidden\"><p>").h("i18n", ctx, {}, { "$key": "qrAdvice|s" }).w("</p></div></div></div><div class=\"tc-ctl tc-ctl-tctr-elm tc-ctl-tctr-elm-data tc-group tc-ctl-download-cnt tc-collapsed\"><div><label>").h("i18n", ctx, {}, { "$key": "format" }).w(":</label><select id=\"download-format\" class=\"tc-combo\"><option value=\"GML32\">GML</option><option value=\"application/json\">GeoJSON</option><option value=\"application/vnd.google-earth.kml+xml\">KML (Google Earth)</option><option value=\"shape-zip\">Shape (ESRI)</option></select><div class=\"tc-ctl-download-div\"><i class=\"tc-ctl-download-help icon-question-sign\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"").h("i18n", ctx, {}, { "$key": "showDownloadHelp" }).w("\"></i></div><div class=\"tc-group tc-group tc-ctl-download-cnt\" style=\"text-align:right;\"><button type=\"button\" class=\"tc-ctl-download-btn tc-button tc-icon-button\" title=\"").h("i18n", ctx, {}, { "$key": "downloadLayersFromCurrentExtent" }).w("\" name=\"descargar\">").h("i18n", ctx, {}, { "$key": "download" }).w("</button></div><div class=\"tc-alert alert-warning tc-hidden\"><p id=\"zoom-msg\"><strong>").h("i18n", ctx, {}, { "$key": "tooManyFeatures" }).w(": </strong>").h("i18n", ctx, {}, { "$key": "tooManyFeatures.instructions" }).w("</p><p id=\"layers-msg\"><strong>").h("i18n", ctx, {}, { "$key": "noLayersLoaded" }).w(": </strong>").h("i18n", ctx, {}, { "$key": "noLayersLoaded.instructions" }).w("</p><p id=\"url-msg\"><strong>").h("i18n", ctx, {}, { "$key": "tooManySelectedLayers" }).w(": </strong>").h("i18n", ctx, {}, { "$key": "tooManySelectedLayers.instructions" }).w("</p><p id=\"noFeatures-msg\"><strong>").h("i18n", ctx, {}, { "$key": "noData" }).w(": </strong>").h("i18n", ctx, {}, { "$key": "noData.instructions" }).w("</p><p id=\"novalid-msg\"><strong>").h("i18n", ctx, {}, { "$key": "noValidService" }).w(": </strong>").h("i18n", ctx, {}, { "$key": "noValidService.instructions" }).w("</p></div></div></div>"); } body_0.__dustBody = !0; return body_0 };
        ctlProto.template[ctlProto.CLASS + '-dialog'] = function () { dust.register(ctlProto.CLASS + '-dialog', body_0); function body_0(chk, ctx) { return chk.w("<div class=\"tc-ctl-download-help-dialog tc-modal\"><div class=\"tc-modal-background tc-modal-close\"></div><div class=\"tc-modal-window\"><div class=\"tc-modal-header\"><h3>").h("i18n", ctx, {}, { "$key": "downloadData" }).w("</h3><div class=\"tc-modal-close\"></div></div><div class=\"tc-modal-body\"><p>").h("i18n", ctx, {}, { "$key": "dl.instructions.1|s" }).w("</p><ul><li>").h("i18n", ctx, {}, { "$key": "dl.instructions.2|s" }).w("</li><li>").h("i18n", ctx, {}, { "$key": "dl.instructions.3|s" }).w("</li><li>").h("i18n", ctx, {}, { "$key": "dl.instructions.4|s" }).w("<ul><li>").h("i18n", ctx, {}, { "$key": "dl.instructions.5|s" }).w("</li><li>").h("i18n", ctx, {}, { "$key": "dl.instructions.6|s" }).w("</li></ul></li></ul></div><div class=\"tc-modal-footer\"><button type=\"button\" class=\"tc-button tc-modal-close\">").h("i18n", ctx, {}, { "$key": "close" }).w("</button></div></div></div>"); } body_0.__dustBody = !0; return body_0 };
    }

    ctlProto.render = function (callback) {
        var self = this;
        self.getRenderedHtml(self.CLASS + '-dialog', null, function (html) {
            self._$dialogDiv.html(html);
        }).then(function () {
            TC.Control.prototype.render.call(self, function () {
                var selDisabledCLASS = self.CLASS + '-seldisabled';

                var cs = '.tc-ctl-tctr';
                self._selectors = {
                    TAB: cs + '-tab',
                    RADIOBUTTON: 'input[type=radio][name=sctnr-sel]',
                    ELEMENT: cs + '-elm'
                };

                var clickHandler = function (e) {
                    var $cb = $(this).closest(self._selectors.TAB).find(self._selectors.RADIOBUTTON);
                    var newValue = $cb.val();
                    var $elms = self._$div.find(self._selectors.ELEMENT);
                    if (self._oldValue === newValue && self.options.deselectable) {
                        setTimeout(function () {
                            $cb.prop("checked", false);
                        }, 0);
                        self._oldValue = null;
                        $active = $();
                        $hidden = $elms;
                    }
                    else {
                        $active = $elms.filter(self._selectors.ELEMENT + '-' + newValue);
                        $hidden = $elms.not($active);
                        self._oldValue = newValue;
                    }

                    $active.removeClass(TC.Consts.classes.COLLAPSED);
                    $hidden.addClass(TC.Consts.classes.COLLAPSED);
                    $cb.prop("checked", true);
                };

                self._$div.find('span').on(TC.Consts.event.CLICK, clickHandler);

                if (callback)
                    callback();
            });
        });
    };

    ctlProto.register = function (map) {
        var self = this;
        const result = TC.control.MapInfo.prototype.register.call(self, map);

        // GLS: Añado el flag al mapa para tenerlo en cuenta cuando se establece la función de carga de imágenes
        self.map.mustBeExportable = true;

        /**
         * Descarga las features de las capas de trabajo actualmente seleccionadas. Comprueba que el número de features a descargar
         * no excede el límite impuesto por el servidor.
         */       

        var _download = function () {
            var wait = self.map.getLoadingIndicator().addWait();

            var format = $active.find('select').val();
            if ($active.find('select').val().indexOf('image') > -1) {
                var doneQR = $.Deferred();
                var canvas = self.map.wrap.getViewport({ synchronous: true }).getElementsByTagName('canvas')[0];
                var newCanvas = TC.Util.cloneCanvas(canvas);
                var result;

                var sb = self.map.getControlsByClass(TC.control.ScaleBar);
                if (sb) {
                    self.drawScaleBarIntoCanvas({ canvas: newCanvas, fill: true });
                }

                if ($active.find('#' + self.CLASS + '-image-qr:checked').length > 0) {
                    var $codeContainer = $('#qrcode');
                    if ($codeContainer.length === 0) {
                        $('body').append('<div id="qrcode"></div>');
                        $codeContainer = $('#qrcode');                        
                    } else {
                        $codeContainer.empty();
                    }

                    $codeContainer.css({ top: -200, left: -200, position: 'absolute' });

                    self.makeQRCode($codeContainer, 87, 87).then(function (qrCodeBase64) {                        
                        if (qrCodeBase64) {
                            var ctx = newCanvas.getContext("2d");
                            ctx.fillStyle = "#ffffff";
                            ctx.fillRect(newCanvas.width - 91, newCanvas.height - 91, 91, 91);

                            $.when(TC.Util.addToCanvas(newCanvas, qrCodeBase64, { x: newCanvas.width - 88, y: newCanvas.height - 88 })).then(function (mapCanvas) {
                                doneQR.resolve(mapCanvas);
                            });
                        } else {
                            TC.error(self.getLocaleString('dl.export.map.error') + ': ' + 'QR');
                            self.map.getLoadingIndicator().removeWait(wait);
                        }
                    });                    
                } else {
                    doneQR.resolve(newCanvas);
                }

                $.when(doneQR).then(function (_canvas) {
                    try {
                        result = _canvas.toDataURL(format);
                        TC.Util.downloadDataURI(window.location.hostname + '_' + TC.Util.getFormattedDate(new Date().toString(), true) + '.' + format.split('/')[1], format, result);
                    } catch (e) {
                        TC.error(self.getLocaleString('dl.export.map.error') + ': ' + e.message);
                    }

                    self.map.getLoadingIndicator().removeWait(wait);
                });
            }
            else {
                var visibleLayers = _getVisibleLayers();

                var extent = self.map.getExtent();
                var coordsXY = TC.Util.reproject(extent.slice(0, 2), self.map.crs, TC.Defaults.crs);
                var coordsXY2 = TC.Util.reproject(extent.slice(2), self.map.crs, TC.Defaults.crs);

                var arrPromises = TC.WFSGetFeatureBuilder(self.map, new TC.filter.bbox([coordsXY[0], coordsXY[1], coordsXY2[0], coordsXY2[1]]), format, true);
                $.when.apply($, arrPromises).then(function () {

                    var responses = $.grep(arguments, function (item) { return item != null });
                    if (responses.length === 0) {
                        _showAlertMsg({ key: TC.Consts.WFSErrors.NoLayers }, wait);
                        return;
                    }
                    var arrDownloads = [];
                    for (var i = 0; i < responses.length; i++) {
                        //errores del WFS
                        if (responses[i].errors && responses[i].errors.length) {
                            for (var j = 0; j < responses[i].errors.length; j++) {
                                var error = responses[i].errors[j];
                                _showAlertMsg(error, wait);
                            }
                            continue;
                        }
                        var data = responses[i].data;
                        var url = responses[i].url;
                        if (data && url)
                            arrDownloads.push({ url: url + "?download=zip", data: data });
                    }

                    TC.Util.downloadFileForm(arrDownloads);
                    self.map.getLoadingIndicator().removeWait(wait);
                });
            }
        };

        /**
         * Comprueba si hay capas visibles en el panel de capas cargadas.
         */
        var _getVisibleLayers = function () {
            var visibleLayers = [];
            for (var i = 0; i < self.map.workLayers.length; i++) {
                var layer = self.map.workLayers[i];
                if (layer.type === TC.Consts.layerType.WMS) {
                    if (layer.getVisibility() && layer.names.length > 0) {
                        visibleLayers.push(layer);
                    }
                }
            }
            return visibleLayers;
        };

        var _showAlertMsg = function (error, wait) {
            var alert = self._$div.find(".alert-warning");
            var errorMsg;
            switch (error.key) {
                case TC.Consts.WFSErrors.NumMaxFeatures:
                    errorMsg = alert.find("#zoom-msg").html().format({ serviceName: error.params.serviceTitle });
                    break;
                case TC.Consts.WFSErrors.NoLayers:
                    errorMsg = self.getLocaleString('noLayersLoaded');
                    break;
                case TC.Consts.WFSErrors.GetCapabilities:
                    errorMsg = alert.find("#novalid-msg").html().format({ serviceName: error.params.serviceTitle });
                    break;
                case TC.Consts.WFSErrors.NoFeatures:
                    errorMsg = alert.find("#noFeatures-msg").html();
                    break;
                case TC.Consts.WFSErrors.Indeterminate:
                    errorMsg = self.getLocaleString("wfs.IndeterminateError");
                    self.map.toast(errorMsg, { type: TC.Consts.msgType.ERROR });
                    TC.error("Error:{error} \r\n Descripcion:{descripcion} \r\n Servicio:{serviceName}".format({ error: error.params.err, descripcion: error.params.errorThrown, serviceName: error.params.serviceTitle }), TC.Consts.msgErrorMode.CONSOLE);
                    self.map.getLoadingIndicator().removeWait(wait);
                    return
                    break;
                default:
                    errorMsg = self.getLocaleString("wfs." + error.key, error.params);
                    break;
            }
            /*if (error.zoom) {
                errorMsg = alert.find("#zoom-msg").html().format({ serviceName: error.serviceName });
            } else if (error.layers) {
                errorMsg = self.getLocaleString('noLayersLoaded');
            } else if (error.url) {
                errorMsg = self.getLocaleString('tooManySelectedLayers');
            } else if (error.noFeatures) {
                errorMsg = alert.find("#noFeatures-msg").html();
            } else if (error.noValid) {
                errorMsg = alert.find("#novalid-msg").html().format({ serviceName: error.serviceName });
            }*/
            self.map.toast(errorMsg, { type: TC.Consts.msgType.WARNING });

            self.map.getLoadingIndicator().removeWait(wait);
        };

        var _showHelp = function (evt) {
            evt.stopPropagation();
            TC.Util.showModal(self._$dialogDiv.find(self._classSelector + '-help-dialog'));
        };

        self._$div.on(TC.Consts.event.CLICK, '.tc-ctl-download-btn', _download);
        self._$div.on(TC.Consts.event.CLICK, '.tc-ctl-download-help', _showHelp);        

        self._$div.on("click", "#" + self.CLASS + "-image-qr", function (evt) {
            if ($(this).prop('checked')) {
                self.generateLink();
            } else {
                self._$div.find('.' + self.CLASS + '-alert').addClass(TC.Consts.classes.HIDDEN);
            }
        });

        self._$div.on("click", "h2", function (evt) {            
            self.generateLink();
            self.registerListeners();
        });

        return result;
    };

    ctlProto.manageMaxLengthExceed = function (maxLengthExceed) {
        const self = this;

        if ($("#" + self.CLASS + "-image-qr").prop('checked')) {
            if (maxLengthExceed.qr) {
                self._$div.find('.' + self.CLASS + '-alert').removeClass(TC.Consts.classes.HIDDEN);
            } else if (!maxLengthExceed.qr) {
                self._$div.find('.' + self.CLASS + '-alert').addClass(TC.Consts.classes.HIDDEN);
            }
        } else {
            self._$div.find('.' + self.CLASS + '-alert').addClass(TC.Consts.classes.HIDDEN);
        }
    };

})();
