﻿import TC from '../../TC';
import BasicMap from '../Map';
import Util from '../Util';
import Consts from '../Consts';
import i18n from '../i18n';
import Button from '../../SITNA/ui/Button';

TC.Consts = Consts;
TC.control = TC.control || {};
TC.i18n = TC.i18n || i18n;

class WebComponentControl extends HTMLElement {
    template;
    control;
    #onBySelectorMap = new WeakMap();
    static CLASS = 'tc-ctl';

    constructor() {
        super();
        const self = this;

        self.map = null;
        self.isActive = false;
        self.isDisabled = false;

        var len = arguments.length;

        self.options = Util.extend({}, len > 1 ? arguments[1] : arguments[0]);

        const divOption = self.options.div || arguments[0];
        if (divOption) {
            const parentElement = Util.getDiv(divOption);
            self.div = parentElement;
        }
        else {
            self.div = self.parentElement;
        }

        self.template = self.options.template || self.template;
        self.exportsState = false;
    }

    connectedCallback() {
        const self = this;
        self.classList.add(WebComponentControl.CLASS, self.CLASS);
        if (self.map instanceof BasicMap) {
            return;
        }
        const mapOption = self.getAttribute('for');
        let map;
        if (mapOption) {
            const mapElement = document.getElementById(mapOption);
            if (mapElement) {
                map = BasicMap.get(mapElement);
                if (map) {
                    map.addControl(self);
                }
                else {
                    const observer = new MutationObserver(function (mutationList, observer) {
                        for (const mutation of mutationList) {
                            if (mutation.type === 'childList') {
                                map = BasicMap.get(mapElement);
                                if (map) {
                                    map.addControl(self);
                                    observer.disconnect();
                                }
                            }
                        }
                    });
                    observer.observe(mapElement, { childList: true });
                }
            }
        }
        else {
            let element = self;
            do {
                element = element.parentNode;
            }
            while (element && !element.classList.contains(TC.Consts.classes.MAP));
            map = BasicMap.get(element);
            if (map) {
                map.addControl(self);
            }
            else {
                self.renderPromise();
            }
        }
    }

    show() {
        this.style.display = '';
    }

    hide() {
        this.style.display = 'none';
    }

    render(callback) {
        const self = this;
        return self._set1stRenderPromise(self.renderData(null, function () {
            self.addUIEventListeners();
            if (typeof callback === 'function') {
                callback();
            }
        }));
    }

    _set1stRenderPromise(promise) {
        const self = this;
        if (!self._firstRender) {
            self._firstRender = promise;
        }
        return promise;
    }

    renderData(data, callback) {
        const self = this;
        return new Promise(function (resolve, _reject) {
            if (self.map) {
                self.trigger(TC.Consts.event.BEFORECONTROLRENDER, { dataObject: data });
            }
            self.classList.toggle(TC.Consts.classes.DISABLED, self.isDisabled);

            let template;
            if (typeof self.template === 'object' && !self.template.compiler) {
                template = self.template[self.CLASS];
            }
            else {
                template = self.template;
                self.template = {};
                self.template[self.CLASS] = template;
            }

            self.getRenderedHtml(self.CLASS, data)
                .then(function (html) {
                    self.innerHTML = html;
                    if (!self.parentElement && self.div) {
                        self.div.appendChild(self);
                    }
                    if (self.map) {
                        self.trigger(TC.Consts.event.CONTROLRENDER);
                    }
                    if (TC.Util.isFunction(callback)) {
                        callback();
                    }
                    resolve();
                });
        });
    }

    getRenderedHtml(templateId, data, callback) {
        const self = this;
        return new Promise(function (resolve, _reject) {

            const endFn = function (template) {
                if (typeof template === 'undefined') {
                    resolve('');
                    return;
                }
                const html = template(data);
                if (TC.Util.isFunction(callback)) {
                    callback(html);
                }
                resolve(html);
            };

            const template = self.template[templateId];
            if (typeof template !== 'function') {
                self.#processTemplates({ locale: self.map && self.map.options.locale, className: self.CLASS }).then(function () {
                    endFn(self.template[templateId]);
                });
            }
            else {
                endFn(template);
            }
        });
    }

    #processTemplates(options) {
        const self = this;
        options = options || {};
        return new Promise(function (resolve, _reject) {
            const templates = self.template;
            let mustCompile = false;
            for (var key in templates) {
                const template = templates[key];
                if (typeof template === 'string') {
                    mustCompile = true;
                }
            }

            const callback = function () {
                const templatePromises = [];
                for (var key in templates) {
                    const templateName = key;
                    let template = templates[templateName];
                    if (typeof template === 'string') {
                        templatePromises.push(new Promise(function (res, rej) {
                            TC.ajax({
                                url: template,
                                method: 'GET',
                                responseType: 'text'
                            })
                                .then(function (response) {
                                    templates[templateName] = template = TC._hbs.compile(response.data); // TODO: add optimization options
                                    res(template);
                                })
                                .catch(function (err) {
                                    console.log("Error fetching template: " + err);
                                    rej(err);
                                });
                        }));
                    }
                    else {
                        if (typeof template === 'object') {
                            templates[key] = template = TC._hbs.template(template);
                        }
                    }
                }

                Promise.all(templatePromises).then(function () {
                    for (var key in templates) {
                        const t = templates[key];
                        if (t && key !== options.className) {
                            TC._hbs.registerPartial(key, templates[key]);
                        }
                    }
                    resolve();
                });
            };

            if (mustCompile) {
                TC.loadJSInOrder(
                    !TC._hbs || !TC._hbs.compile,
                    [
                        TC.apiLocation + TC.Consts.url.TEMPLATING_FULL,
                        TC.apiLocation + TC.Consts.url.TEMPLATING_HELPERS
                    ],
                    callback
                );
            }
            else {
                TC.loadJSInOrder(
                    !TC._hbs,
                    [
                        TC.apiLocation + TC.Consts.url.TEMPLATING_RUNTIME,
                        TC.apiLocation + TC.Consts.url.TEMPLATING_HELPERS
                    ],
                    callback
                );
            }
        });
    }

    register(map) {
        const self = this;
        self.id = self.options.id || TC.getUID({
            prefix: self.CLASS.substr('tc-ctl'.length + 1) + '-'
        });
        return new Promise(function (resolve, _reject) {
            self.map = map;
            Promise.resolve(self.render()).then(function () {
                if (!self.div.parentElement) {
                    map.div.appendChild(self);
                    self.div = map.div;
                }
                if (self.options.active) {
                    self.activate();
                }
                resolve(self);
            });
        });
    }

    activate() {
        const self = this;
        if (self.map && self.map.activeControl && self.map.activeControl !== self) {
            self.map.previousActiveControl = self.map.activeControl;
            self.map.activeControl.deactivate();
        }
        self.isActive = true;
        if (self.map) {
            self.map.activeControl = self;
            self.map.trigger(TC.Consts.event.CONTROLACTIVATE, { control: self });
            self.trigger(TC.Consts.event.CONTROLACTIVATE, { control: self });
        }
    }

    deactivate(stopChain) {
        if (arguments.length === 0) {
            stopChain = false;
        }

        const self = this;
        self.isActive = false;
        if (self.map) {
            self.map.activeControl = null;

            if (!stopChain) {
                //determinar cuál es el control predeterminado para reactivarlo
                //salvo que sea yo mismo, claro
                var nextControl = self.map.getDefaultControl();
                if (nextControl === self) nextControl = null;
                else if (self.map.previousActiveControl === self) // GLS: Validamos antes de activar que el control activo anterior sea distinto al control actual
                    nextControl = null;
                else if (!nextControl) {
                    nextControl = self.map.previousActiveControl;
                }

                if (nextControl)
                    nextControl.activate();
            }
            self.map.trigger(TC.Consts.event.CONTROLDEACTIVATE, { control: self });
            self.trigger(TC.Consts.event.CONTROLDEACTIVATE, { control: self });
        }
    }

    enable() {
        const self = this;
        self.isDisabled = false;
        self.classList.remove(TC.Consts.classes.DISABLED);
        delete self.dataset.tcMessage;
        if (self.containerControl && self.containerControl.onControlEnable) {
            self.containerControl.onControlEnable(self);
        }
    }

    disable(options) {
        const self = this;
        options = options || {};
        self.isDisabled = true;
        self.classList.add(TC.Consts.classes.DISABLED);
        let message = self.getLocaleString('disabledControl');
        if (options.reason) {
            message = `${message} - ${options.reason}`;
        }
        self.dataset.tcMessage = message;
        if (self.containerControl && self.containerControl.onControlDisable) {
            self.containerControl.onControlDisable(self);
        }
    }

    renderPromise() {
        const self = this;
        return self._firstRender || new Promise(function (resolve, _reject) {
            self.one(TC.Consts.event.CONTROLRENDER, function () {
                resolve(self);
            });
        });
    }

    addUIEventListener(selector, event, listener) {
        const self = this;
        const elements = selector ? self.querySelectorAll(selector) : [self];
        elements.forEach(function (elm) {
            elm.addEventListener(event, listener);
        });
    }

    addUIEventListeners() {
    }

    isExclusive() {
        return false;
    }

    getLocaleString(key, texts) {
        const self = this;
        const locale = self.map ? self.map.options.locale : TC.Cfg.locale;
        return Util.getLocaleString(locale, key, texts);
    }

    getUID() {
        const self = this;
        return TC.getUID({
            prefix: self.id + '-'
        });
    }

    exportState() {
        const self = this;
        if (self.exportsState) {
            return {};
        }
        return null;
    }

    importState(_state) {
    }

    getDownloadDialog() {
        const self = this;
        self._downloadDialog = self._downloadDialog || self.map.getControlsByClass('TC.control.FeatureDownloadDialog')[0];
        if (self._downloadDialog) {
            self._downloadDialog.caller = self;
            return Promise.resolve(self._downloadDialog);
        }
        return new Promise(function (resolve, _reject) {
            self.map.addControl('FeatureDownloadDialog').then(ctl => {
                self._downloadDialog = ctl;
                self._downloadDialog.caller = self;
                resolve(ctl);
            });
        });
    }

    getElevationTool() {
        const self = this;
        if (!self.displayElevation && !self.options.displayElevation) {
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
                    if (typeof self.options.displayElevation === 'boolean') {
                        if (self.map) {
                            self.map.getElevationTool().then(function (mapElevation) {
                                if (mapElevation) {
                                    self.elevation = mapElevation;
                                }
                                else {
                                    self.elevation = new TC.tool.Elevation();
                                }
                                resolve(self.elevation);
                            });
                        }
                        else {
                            self.elevation = new TC.tool.Elevation();
                            resolve(self.elevation);
                        }
                    }
                    else {
                        if (self.map) {
                            self.map.getElevationTool().then(function (mapElevation) {
                                if (mapElevation) {
                                    self.elevation = new TC.tool.Elevation(TC.Util.extend(true, {}, mapElevation.options, self.options.displayElevation));
                                }
                                else {
                                    self.elevation = new TC.tool.Elevation(self.options.displayElevation);
                                }
                                resolve(self.elevation);
                            });
                        }
                        else {
                            self.elevation = new TC.tool.Elevation(self.options.displayElevation);
                            resolve(self.elevation);
                        }
                    }
                }
            );
        });
    }

    #getNativeListener(evt, callback) {
        const result = function (evt) {
            const cbParameter = {
                type: evt.type,
                target: this,
                currentTarget: this
            };
            if (evt.detail) {
                Object.keys(evt.detail).forEach(function (key) {
                    if (!(key in cbParameter)) {
                        cbParameter[key] = evt.detail[key];
                    }
                });
            }
            return callback.call(this, cbParameter);
        }.bind(this);
        const stack = this._listeners[evt] = this._listeners[evt] || new Map();
        stack.set(callback, result);
        return result;
    }

    #onInternal(events, callback, options) {
        const self = this;
        events.split(' ').forEach(function (evt) {
            self.addEventListener(evt, self.#getNativeListener(evt, callback), options);
        });
        return self;
    }

    on(events, callback) {
        const self = this;
        return self.#onInternal(events, callback);
    }

    one(events, callback) {
        return self.#onInternal(events, callback, { once: true });
    }

    off(events, callback) {
        const self = this;
        const eventList = events.split(' ');
        if (callback) {
            eventList.forEach(function (evt) {
                const stack = self._listeners[evt];
                if (stack && stack.has(callback)) {
                    self.removeEventListener(evt, stack.get(callback));
                }
            });
        }
        else {
            eventList.forEach(function (evt) {
                const stack = self._listeners[evt];
                if (stack) {
                    stack.forEach(function (cb) {
                        self.removeEventListener(evt, cb);
                    });
                    stack.clear();
                }
            });
        }
        return self;
    }

    trigger(type, options) {
        const self = this;
        let ceOptions;
        if (options) {
            ceOptions = {
                detail: options
            };
        }
        const event = new CustomEvent(type, ceOptions);
        self.dispatchEvent(event);
    }

    listenerBySelector(selector, callback) {
        const self = this;
        // Crea una estructura a partir de un mapa cuyas claves son los elementos.
        // Los valores son objetos cuyas claves son tipos de eventos
        // y cuyos valores son objetos que tienen como claves los selectores
        // y cuyos valores son las funciones de callback.
        // Se crea una función que va buscando la primera correspondencia con un selector.
        // En cuanto la encuentra, ejecuta el callback y deja de procesar.
        return function (e) {
            const element = this;
            const eventType = e.type;
            var eventTypes = self.#onBySelectorMap.get(element);
            if (!eventTypes) {
                eventTypes = {};
                self.#onBySelectorMap.set(element, eventTypes);
            }
            var selectors = eventTypes[eventType];
            if (!selectors) {
                eventTypes[eventType] = selectors = {};
            }
            if (!selectors[selector]) {
                selectors[selector] = callback;
            }
            // Para cada evento en cada elemento hay que llamar una sola vez al callback que toque.
            // Así que si se ejecuta un callback, prohibimos al resto de los listeners resolverse.
            if (!e._listenerBySelectorCalled) {
                var matches = false;
                var elm = e.target;
                var result;
                while (elm && elm !== element) {
                    for (selector in selectors) {
                        if (elm.matches && elm.matches(selector)) {
                            matches = true;
                            result = selectors[selector].call(element, e);
                            e._listenerBySelectorCalled = true;
                        }
                    }
                    if (matches) {
                        return result;
                    }
                    elm = elm.parentNode;
                }
            }
        }
    }

    static async create(type, options) {
        const ctorName = type.substr(0, 1).toUpperCase() + type.substr(1);
        if (!TC.control[ctorName]) {
            const module = await import('./' + ctorName);
            TC.control[ctorName] = module.default;
        }
        return new TC.control[ctorName](null, options);
    }
}

customElements.define('sitna-control', WebComponentControl);
TC.control.WebComponentControl = WebComponentControl;
export default WebComponentControl;