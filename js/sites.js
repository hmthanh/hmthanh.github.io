var MAP_PIN = "",
    SQUARE_PIN = "",
    SHIELD = "",
    ROUTE = "",
    SQUARE = "",
    SQUARE_ROUNDED = "",
    inherits = function (e, t) {
        function i() {
        }

        i.prototype = t.prototype, e.superClass_ = t.prototype, e.prototype = new i, e.prototype.constructor = e
    };

var MarkerLabel = function (e) {
    var t = this;
    this.setValues(e), this.div = document.createElement("div"), this.div.className = "map-icon-label", google.maps.event.addDomListener(this.div, "click", function (e) {
        e.stopPropagation && e.stopPropagation(), google.maps.event.trigger(t.marker, "click")
    })
};
MarkerLabel.prototype = new google.maps.OverlayView, MarkerLabel.prototype.onAdd = function () {
    var e = (this.getPanes().overlayImage.appendChild(this.div), this);
    this.listeners = [google.maps.event.addListener(this, "position_changed", function () {
        e.draw()
    }), google.maps.event.addListener(this, "text_changed", function () {
        e.draw()
    }), google.maps.event.addListener(this, "zindex_changed", function () {
        e.draw()
    })]
}, MarkerLabel.prototype.onRemove = function () {
    this.div.parentNode.removeChild(this.div);
    for (var e = 0, t = this.listeners.length; t > e; ++e) google.maps.event.removeListener(this.listeners[e])
}, MarkerLabel.prototype.draw = function () {
    var e = this.getProjection(),
        t = e.fromLatLngToDivPixel(this.get("position")),
        i = this.div;
    this.div.innerHTML = this.get("text").toString(), i.style.zIndex = this.get("zIndex"), i.style.display = "block", i.style.left = t.x - i.offsetWidth / 2 + "px", i.style.top = t.y - i.offsetHeight + "px"
},
    function (e) {
        function t(t) {
            var i = t || window.event,
                n = [].slice.call(arguments, 1),
                o = 0,
                s = 0,
                a = 0,
                t = e.event.fix(i);
            return t.type = "mousewheel", i.wheelDelta && (o = i.wheelDelta / 120), i.detail && (o = -i.detail / 3), a = o, void 0 !== i.axis && i.axis === i.HORIZONTAL_AXIS && (a = 0, s = -1 * o), void 0 !== i.wheelDeltaY && (a = i.wheelDeltaY / 120), void 0 !== i.wheelDeltaX && (s = -1 * i.wheelDeltaX / 120), n.unshift(t, o, s, a), (e.event.dispatch || e.event.handle).apply(this, n)
        }

        var i = ["DOMMouseScroll", "mousewheel"];
        if (e.event.fixHooks)
            for (var n = i.length; n;) e.event.fixHooks[i[--n]] = e.event.mouseHooks;
        e.event.special.mousewheel = {
            setup: function () {
                if (this.addEventListener)
                    for (var e = i.length; e;) this.addEventListener(i[--e], t, !1);
                else this.onmousewheel = t
            },
            teardown: function () {
                if (this.removeEventListener)
                    for (var e = i.length; e;) this.removeEventListener(i[--e], t, !1);
                else this.onmousewheel = null
            }
        }, e.fn.extend({
            mousewheel: function (e) {
                return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
            },
            unmousewheel: function (e) {
                return this.unbind("mousewheel", e)
            }
        })
    }(jQuery),
    function () {
        function e() {
        }

        function t(e, t) {
            for (var i = e.length; i--;)
                if (e[i].listener === t) return i;
            return -1
        }

        function i(e) {
            return function () {
                return this[e].apply(this, arguments)
            }
        }

        var n = e.prototype,
            o = this,
            s = o.EventEmitter;
        n.getListeners = function (e) {
            var t, i, n = this._getEvents();
            if ("object" == typeof e) {
                t = {};
                for (i in n) n.hasOwnProperty(i) && e.test(i) && (t[i] = n[i])
            } else t = n[e] || (n[e] = []);
            return t
        }, n.flattenListeners = function (e) {
            var t, i = [];
            for (t = 0; e.length > t; t += 1) i.push(e[t].listener);
            return i
        }, n.getListenersAsObject = function (e) {
            var t, i = this.getListeners(e);
            return i instanceof Array && (t = {}, t[e] = i), t || i
        }, n.addListener = function (e, i) {
            var n, o = this.getListenersAsObject(e),
                s = "object" == typeof i;
            for (n in o) o.hasOwnProperty(n) && -1 === t(o[n], i) && o[n].push(s ? i : {
                listener: i,
                once: !1
            });
            return this
        }, n.on = i("addListener"), n.addOnceListener = function (e, t) {
            return this.addListener(e, {
                listener: t,
                once: !0
            })
        }, n.once = i("addOnceListener"), n.defineEvent = function (e) {
            return this.getListeners(e), this
        }, n.defineEvents = function (e) {
            for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
            return this
        }, n.removeListener = function (e, i) {
            var n, o, s = this.getListenersAsObject(e);
            for (o in s) s.hasOwnProperty(o) && (n = t(s[o], i), -1 !== n && s[o].splice(n, 1));
            return this
        }, n.off = i("removeListener"), n.addListeners = function (e, t) {
            return this.manipulateListeners(!1, e, t)
        }, n.removeListeners = function (e, t) {
            return this.manipulateListeners(!0, e, t)
        }, n.manipulateListeners = function (e, t, i) {
            var n, o, s = e ? this.removeListener : this.addListener,
                a = e ? this.removeListeners : this.addListeners;
            if ("object" != typeof t || t instanceof RegExp)
                for (n = i.length; n--;) s.call(this, t, i[n]);
            else
                for (n in t) t.hasOwnProperty(n) && (o = t[n]) && ("function" == typeof o ? s.call(this, n, o) : a.call(this, n, o));
            return this
        }, n.removeEvent = function (e) {
            var t, i = typeof e,
                n = this._getEvents();
            if ("string" === i) delete n[e];
            else if ("object" === i)
                for (t in n) n.hasOwnProperty(t) && e.test(t) && delete n[t];
            else delete this._events;
            return this
        }, n.removeAllListeners = i("removeEvent"), n.emitEvent = function (e, t) {
            var i, n, o, s, a = this.getListenersAsObject(e);
            for (o in a)
                if (a.hasOwnProperty(o))
                    for (n = a[o].length; n--;) i = a[o][n], i.once === !0 && this.removeListener(e, i.listener), s = i.listener.apply(this, t || []), s === this._getOnceReturnValue() && this.removeListener(e, i.listener);
            return this
        }, n.trigger = i("emitEvent"), n.emit = function (e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(e, t)
        }, n.setOnceReturnValue = function (e) {
            return this._onceReturnValue = e, this
        }, n._getOnceReturnValue = function () {
            return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
        }, n._getEvents = function () {
            return this._events || (this._events = {})
        }, e.noConflict = function () {
            return o.EventEmitter = s, e
        }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
            return e
        }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
    }.call(this),
    function (e) {
        function t(t) {
            var i = e.event;
            return i.target = i.target || i.srcElement || t, i
        }

        var i = document.documentElement,
            n = function () {
            };
        i.addEventListener ? n = function (e, t, i) {
            e.addEventListener(t, i, !1)
        } : i.attachEvent && (n = function (e, i, n) {
            e[i + n] = n.handleEvent ? function () {
                var i = t(e);
                n.handleEvent.call(n, i)
            } : function () {
                var i = t(e);
                n.call(e, i)
            }, e.attachEvent("on" + i, e[i + n])
        });
        var o = function () {
        };
        i.removeEventListener ? o = function (e, t, i) {
            e.removeEventListener(t, i, !1)
        } : i.detachEvent && (o = function (e, t, i) {
            e.detachEvent("on" + t, e[t + i]);
            try {
                delete e[t + i]
            } catch (n) {
                e[t + i] = void 0
            }
        });
        var s = {
            bind: n,
            unbind: o
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", s) : e.eventie = s
    }(this),
    function (e, t) {
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (i, n) {
            return t(e, i, n)
        }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
    }(window, function (e, t, i) {
        function n(e, t) {
            for (var i in t) e[i] = t[i];
            return e
        }

        function o(e) {
            return "[object Array]" === h.call(e)
        }

        function s(e) {
            var t = [];
            if (o(e)) t = e;
            else if ("number" == typeof e.length)
                for (var i = 0, n = e.length; n > i; i++) t.push(e[i]);
            else t.push(e);
            return t
        }

        function a(e, t, i) {
            if (!(this instanceof a)) return new a(e, t);
            "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = s(e), this.options = n({}, this.options), "function" == typeof t ? i = t : n(this.options, t), i && this.on("always", i), this.getImages(), d && (this.jqDeferred = new d.Deferred);
            var o = this;
            setTimeout(function () {
                o.check()
            })
        }

        function r(e) {
            this.img = e
        }

        function l(e) {
            this.src = e, p[e] = this
        }

        var d = e.jQuery,
            c = e.console,
            u = void 0 !== c,
            h = Object.prototype.toString;
        a.prototype = new t, a.prototype.options = {}, a.prototype.getImages = function () {
            this.images = [];
            for (var e = 0, t = this.elements.length; t > e; e++) {
                var i = this.elements[e];
                "IMG" === i.nodeName && this.addImage(i);
                var n = i.nodeType;
                if (n && (1 === n || 9 === n || 11 === n))
                    for (var o = i.querySelectorAll("img"), s = 0, a = o.length; a > s; s++) {
                        var r = o[s];
                        this.addImage(r)
                    }
            }
        }, a.prototype.addImage = function (e) {
            var t = new r(e);
            this.images.push(t)
        }, a.prototype.check = function () {
            function e(e, o) {
                return t.options.debug && u && c.log("confirm", e, o), t.progress(e), i++, i === n && t.complete(), !0
            }

            var t = this,
                i = 0,
                n = this.images.length;
            if (this.hasAnyBroken = !1, !n) return void this.complete();
            for (var o = 0; n > o; o++) {
                var s = this.images[o];
                s.on("confirm", e), s.check()
            }
        }, a.prototype.progress = function (e) {
            this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
            var t = this;
            setTimeout(function () {
                t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
            })
        }, a.prototype.complete = function () {
            var e = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = !0;
            var t = this;
            setTimeout(function () {
                if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                    var i = t.hasAnyBroken ? "reject" : "resolve";
                    t.jqDeferred[i](t)
                }
            })
        }, d && (d.fn.imagesLoaded = function (e, t) {
            var i = new a(this, e, t);
            return i.jqDeferred.promise(d(this))
        }), r.prototype = new t, r.prototype.check = function () {
            var e = p[this.img.src] || new l(this.img.src);
            if (e.isConfirmed) return void this.confirm(e.isLoaded, "cached was confirmed");
            if (this.img.complete && void 0 !== this.img.naturalWidth) return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
            var t = this;
            e.on("confirm", function (e, i) {
                return t.confirm(e.isLoaded, i), !0
            }), e.check()
        }, r.prototype.confirm = function (e, t) {
            this.isLoaded = e, this.emit("confirm", this, t)
        };
        var p = {};
        return l.prototype = new t, l.prototype.check = function () {
            if (!this.isChecked) {
                var e = new Image;
                i.bind(e, "load", this), i.bind(e, "error", this), e.src = this.src, this.isChecked = !0
            }
        }, l.prototype.handleEvent = function (e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, l.prototype.onload = function (e) {
            this.confirm(!0, "onload"), this.unbindProxyEvents(e)
        }, l.prototype.onerror = function (e) {
            this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
        }, l.prototype.confirm = function (e, t) {
            this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
        }, l.prototype.unbindProxyEvents = function (e) {
            i.unbind(e.target, "load", this), i.unbind(e.target, "error", this)
        }, a
    }), !function (e) {
    function t() {
    }

    function i(e) {
        function i(t) {
            t.prototype.option || (t.prototype.option = function (t) {
                e.isPlainObject(t) && (this.options = e.extend(!0, this.options, t))
            })
        }

        function o(t, i) {
            e.fn[t] = function (o) {
                if ("string" == typeof o) {
                    for (var a = n.call(arguments, 1), r = 0, l = this.length; l > r; r++) {
                        var d = this[r],
                            c = e.data(d, t);
                        if (c)
                            if (e.isFunction(c[o]) && "_" !== o.charAt(0)) {
                                var u = c[o].apply(c, a);
                                if (void 0 !== u) return u
                            } else s("no such method '" + o + "' for " + t + " instance");
                        else s("cannot call methods on " + t + " prior to initialization; attempted to call '" + o + "'")
                    }
                    return this
                }
                return this.each(function () {
                    var n = e.data(this, t);
                    n ? (n.option(o), n._init()) : (n = new i(this, o), e.data(this, t, n))
                })
            }
        }

        if (e) {
            var s = "undefined" == typeof console ? t : function (e) {
                console.error(e)
            };
            return e.bridget = function (e, t) {
                i(t), o(e, t)
            }, e.bridget
        }
    }

    var n = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], i) : i("object" == typeof exports ? require("jquery") : e.jQuery)
}(window),
    function (e) {
        function t(t) {
            var i = e.event;
            return i.target = i.target || i.srcElement || t, i
        }

        var i = document.documentElement,
            n = function () {
            };
        i.addEventListener ? n = function (e, t, i) {
            e.addEventListener(t, i, !1)
        } : i.attachEvent && (n = function (e, i, n) {
            e[i + n] = n.handleEvent ? function () {
                var i = t(e);
                n.handleEvent.call(n, i)
            } : function () {
                var i = t(e);
                n.call(e, i)
            }, e.attachEvent("on" + i, e[i + n])
        });
        var o = function () {
        };
        i.removeEventListener ? o = function (e, t, i) {
            e.removeEventListener(t, i, !1)
        } : i.detachEvent && (o = function (e, t, i) {
            e.detachEvent("on" + t, e[t + i]);
            try {
                delete e[t + i]
            } catch (n) {
                e[t + i] = void 0
            }
        });
        var s = {
            bind: n,
            unbind: o
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", s) : "object" == typeof exports ? module.exports = s : e.eventie = s
    }(window),
    function () {
        "use strict";

        function e() {
        }

        function t(e, t) {
            for (var i = e.length; i--;)
                if (e[i].listener === t) return i;
            return -1
        }

        function i(e) {
            return function () {
                return this[e].apply(this, arguments)
            }
        }

        var n = e.prototype,
            o = this,
            s = o.EventEmitter;
        n.getListeners = function (e) {
            var t, i, n = this._getEvents();
            if (e instanceof RegExp) {
                t = {};
                for (i in n) n.hasOwnProperty(i) && e.test(i) && (t[i] = n[i])
            } else t = n[e] || (n[e] = []);
            return t
        }, n.flattenListeners = function (e) {
            var t, i = [];
            for (t = 0; t < e.length; t += 1) i.push(e[t].listener);
            return i
        }, n.getListenersAsObject = function (e) {
            var t, i = this.getListeners(e);
            return i instanceof Array && (t = {}, t[e] = i), t || i
        }, n.addListener = function (e, i) {
            var n, o = this.getListenersAsObject(e),
                s = "object" == typeof i;
            for (n in o) o.hasOwnProperty(n) && -1 === t(o[n], i) && o[n].push(s ? i : {
                listener: i,
                once: !1
            });
            return this
        }, n.on = i("addListener"), n.addOnceListener = function (e, t) {
            return this.addListener(e, {
                listener: t,
                once: !0
            })
        }, n.once = i("addOnceListener"), n.defineEvent = function (e) {
            return this.getListeners(e), this
        }, n.defineEvents = function (e) {
            for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
            return this
        }, n.removeListener = function (e, i) {
            var n, o, s = this.getListenersAsObject(e);
            for (o in s) s.hasOwnProperty(o) && (n = t(s[o], i), -1 !== n && s[o].splice(n, 1));
            return this
        }, n.off = i("removeListener"), n.addListeners = function (e, t) {
            return this.manipulateListeners(!1, e, t)
        }, n.removeListeners = function (e, t) {
            return this.manipulateListeners(!0, e, t)
        }, n.manipulateListeners = function (e, t, i) {
            var n, o, s = e ? this.removeListener : this.addListener,
                a = e ? this.removeListeners : this.addListeners;
            if ("object" != typeof t || t instanceof RegExp)
                for (n = i.length; n--;) s.call(this, t, i[n]);
            else
                for (n in t) t.hasOwnProperty(n) && (o = t[n]) && ("function" == typeof o ? s.call(this, n, o) : a.call(this, n, o));
            return this
        }, n.removeEvent = function (e) {
            var t, i = typeof e,
                n = this._getEvents();
            if ("string" === i) delete n[e];
            else if (e instanceof RegExp)
                for (t in n) n.hasOwnProperty(t) && e.test(t) && delete n[t];
            else delete this._events;
            return this
        }, n.removeAllListeners = i("removeEvent"), n.emitEvent = function (e, t) {
            var i, n, o, s, a = this.getListenersAsObject(e);
            for (o in a)
                if (a.hasOwnProperty(o))
                    for (n = a[o].length; n--;) i = a[o][n], i.once === !0 && this.removeListener(e, i.listener), s = i.listener.apply(this, t || []), s === this._getOnceReturnValue() && this.removeListener(e, i.listener);
            return this
        }, n.trigger = i("emitEvent"), n.emit = function (e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(e, t)
        }, n.setOnceReturnValue = function (e) {
            return this._onceReturnValue = e, this
        }, n._getOnceReturnValue = function () {
            return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
        }, n._getEvents = function () {
            return this._events || (this._events = {})
        }, e.noConflict = function () {
            return o.EventEmitter = s, e
        }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
            return e
        }) : "object" == typeof module && module.exports ? module.exports = e : o.EventEmitter = e
    }.call(this),
    function (e) {
        function t(e) {
            if (e) {
                if ("string" == typeof n[e]) return e;
                e = e.charAt(0).toUpperCase() + e.slice(1);
                for (var t, o = 0, s = i.length; s > o; o++)
                    if (t = i[o] + e, "string" == typeof n[t]) return t
            }
        }

        var i = "Webkit Moz ms Ms O".split(" "),
            n = document.documentElement.style;
        "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function () {
            return t
        }) : "object" == typeof exports ? module.exports = t : e.getStyleProperty = t
    }(window),
    function (e, t) {
        function i(e) {
            var t = parseFloat(e),
                i = -1 === e.indexOf("%") && !isNaN(t);
            return i && t
        }

        function n() {
        }

        function o() {
            for (var e = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, t = 0, i = r.length; i > t; t++) {
                var n = r[t];
                e[n] = 0
            }
            return e
        }

        function s(t) {
            function n() {
                if (!h) {
                    h = !0;
                    var n = e.getComputedStyle;
                    if (d = function () {
                        var e = n ? function (e) {
                            return n(e, null)
                        } : function (e) {
                            return e.currentStyle
                        };
                        return function (t) {
                            var i = e(t);
                            return i || a("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), i
                        }
                    }(), c = t("boxSizing")) {
                        var o = document.createElement("div");
                        o.style.width = "200px", o.style.padding = "1px 2px 3px 4px", o.style.borderStyle = "solid", o.style.borderWidth = "1px 2px 3px 4px", o.style[c] = "border-box";
                        var s = document.body || document.documentElement;
                        s.appendChild(o);
                        var r = d(o);
                        u = 200 === i(r.width), s.removeChild(o)
                    }
                }
            }

            function s(e) {
                if (n(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
                    var t = d(e);
                    if ("none" === t.display) return o();
                    var s = {};
                    s.width = e.offsetWidth, s.height = e.offsetHeight;
                    for (var a = s.isBorderBox = !(!c || !t[c] || "border-box" !== t[c]), h = 0, p = r.length; p > h; h++) {
                        var m = r[h],
                            f = t[m];
                        f = l(e, f);
                        var g = parseFloat(f);
                        s[m] = isNaN(g) ? 0 : g
                    }
                    var v = s.paddingLeft + s.paddingRight,
                        y = s.paddingTop + s.paddingBottom,
                        b = s.marginLeft + s.marginRight,
                        w = s.marginTop + s.marginBottom,
                        x = s.borderLeftWidth + s.borderRightWidth,
                        S = s.borderTopWidth + s.borderBottomWidth,
                        C = a && u,
                        T = i(t.width);
                    T !== !1 && (s.width = T + (C ? 0 : v + x));
                    var k = i(t.height);
                    return k !== !1 && (s.height = k + (C ? 0 : y + S)), s.innerWidth = s.width - (v + x), s.innerHeight = s.height - (y + S), s.outerWidth = s.width + b, s.outerHeight = s.height + w, s
                }
            }

            function l(t, i) {
                if (e.getComputedStyle || -1 === i.indexOf("%")) return i;
                var n = t.style,
                    o = n.left,
                    s = t.runtimeStyle,
                    a = s && s.left;
                return a && (s.left = t.currentStyle.left), n.left = i, i = n.pixelLeft, n.left = o, a && (s.left = a), i
            }

            var d, c, u, h = !1;
            return s
        }

        var a = "undefined" == typeof console ? n : function (e) {
                console.error(e)
            },
            r = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
        "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], s) : "object" == typeof exports ? module.exports = s(require("desandro-get-style-property")) : e.getSize = s(e.getStyleProperty)
    }(window),
    function (e) {
        function t(e) {
            "function" == typeof e && (t.isReady ? e() : a.push(e))
        }

        function i(e) {
            var i = "readystatechange" === e.type && "complete" !== s.readyState;
            t.isReady || i || n()
        }

        function n() {
            t.isReady = !0;
            for (var e = 0, i = a.length; i > e; e++) {
                var n = a[e];
                n()
            }
        }

        function o(o) {
            return "complete" === s.readyState ? n() : (o.bind(s, "DOMContentLoaded", i), o.bind(s, "readystatechange", i), o.bind(e, "load", i)), t
        }

        var s = e.document,
            a = [];
        t.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], o) : "object" == typeof exports ? module.exports = o(require("eventie")) : e.docReady = o(e.eventie)
    }(window),
    function (e) {
        "use strict";

        function t(e, t) {
            return e[a](t)
        }

        function i(e) {
            if (!e.parentNode) {
                var t = document.createDocumentFragment();
                t.appendChild(e)
            }
        }

        function n(e, t) {
            i(e);
            for (var n = e.parentNode.querySelectorAll(t), o = 0, s = n.length; s > o; o++)
                if (n[o] === e) return !0;
            return !1
        }

        function o(e, n) {
            return i(e), t(e, n)
        }

        var s, a = function () {
            if (e.matches) return "matches";
            if (e.matchesSelector) return "matchesSelector";
            for (var t = ["webkit", "moz", "ms", "o"], i = 0, n = t.length; n > i; i++) {
                var o = t[i],
                    s = o + "MatchesSelector";
                if (e[s]) return s
            }
        }();
        if (a) {
            var r = document.createElement("div"),
                l = t(r, "div");
            s = l ? t : o
        } else s = n;
        "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function () {
            return s
        }) : "object" == typeof exports ? module.exports = s : window.matchesSelector = s
    }(Element.prototype),
    function (e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["doc-ready/doc-ready", "matches-selector/matches-selector"], function (i, n) {
            return t(e, i, n)
        }) : "object" == typeof exports ? module.exports = t(e, require("doc-ready"), require("desandro-matches-selector")) : e.fizzyUIUtils = t(e, e.docReady, e.matchesSelector)
    }(window, function (e, t, i) {
        var n = {};
        n.extend = function (e, t) {
            for (var i in t) e[i] = t[i];
            return e
        }, n.modulo = function (e, t) {
            return (e % t + t) % t
        };
        var o = Object.prototype.toString;
        n.isArray = function (e) {
            return "[object Array]" == o.call(e)
        }, n.makeArray = function (e) {
            var t = [];
            if (n.isArray(e)) t = e;
            else if (e && "number" == typeof e.length)
                for (var i = 0, o = e.length; o > i; i++) t.push(e[i]);
            else t.push(e);
            return t
        }, n.indexOf = Array.prototype.indexOf ? function (e, t) {
            return e.indexOf(t)
        } : function (e, t) {
            for (var i = 0, n = e.length; n > i; i++)
                if (e[i] === t) return i;
            return -1
        }, n.removeFrom = function (e, t) {
            var i = n.indexOf(e, t);
            -1 != i && e.splice(i, 1)
        }, n.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function (e) {
            return e instanceof HTMLElement
        } : function (e) {
            return e && "object" == typeof e && 1 == e.nodeType && "string" == typeof e.nodeName
        }, n.setText = function () {
            function e(e, i) {
                t = t || (void 0 !== document.documentElement.textContent ? "textContent" : "innerText"), e[t] = i
            }

            var t;
            return e
        }(), n.getParent = function (e, t) {
            for (; e != document.body;)
                if (e = e.parentNode, i(e, t)) return e
        }, n.getQueryElement = function (e) {
            return "string" == typeof e ? document.querySelector(e) : e
        }, n.handleEvent = function (e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, n.filterFindElements = function (e, t) {
            e = n.makeArray(e);
            for (var o = [], s = 0, a = e.length; a > s; s++) {
                var r = e[s];
                if (n.isElement(r))
                    if (t) {
                        i(r, t) && o.push(r);
                        for (var l = r.querySelectorAll(t), d = 0, c = l.length; c > d; d++) o.push(l[d])
                    } else o.push(r)
            }
            return o
        }, n.debounceMethod = function (e, t, i) {
            var n = e.prototype[t],
                o = t + "Timeout";
            e.prototype[t] = function () {
                var e = this[o];
                e && clearTimeout(e);
                var t = arguments,
                    s = this;
                this[o] = setTimeout(function () {
                    n.apply(s, t), delete s[o]
                }, i || 100)
            }
        }, n.toDashed = function (e) {
            return e.replace(/(.)([A-Z])/g, function (e, t, i) {
                return t + "-" + i
            }).toLowerCase()
        };
        var s = e.console;
        return n.htmlInit = function (i, o) {
            t(function () {
                for (var t = n.toDashed(o), a = document.querySelectorAll(".js-" + t), r = "data-" + t + "-options", l = 0, d = a.length; d > l; l++) {
                    var c, u = a[l],
                        h = u.getAttribute(r);
                    try {
                        c = h && JSON.parse(h)
                    } catch (p) {
                        s && s.error("Error parsing " + r + " on " + u.nodeName.toLowerCase() + (u.id ? "#" + u.id : "") + ": " + p);
                        continue
                    }
                    var m = new i(u, c),
                        f = e.jQuery;
                    f && f.data(u, o, m)
                }
            })
        }, n
    }),
    function (e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property", "fizzy-ui-utils/utils"], function (i, n, o, s) {
            return t(e, i, n, o, s)
        }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property"), require("fizzy-ui-utils")) : (e.Outlayer = {}, e.Outlayer.Item = t(e, e.EventEmitter, e.getSize, e.getStyleProperty, e.fizzyUIUtils))
    }(window, function (e, t, i, n, o) {
        "use strict";

        function s(e) {
            for (var t in e) return !1;
            return t = null, !0
        }

        function a(e, t) {
            e && (this.element = e, this.layout = t, this.position = {
                x: 0,
                y: 0
            }, this._create())
        }

        function r(e) {
            return e.replace(/([A-Z])/g, function (e) {
                return "-" + e.toLowerCase()
            })
        }

        var l = e.getComputedStyle,
            d = l ? function (e) {
                return l(e, null)
            } : function (e) {
                return e.currentStyle
            },
            c = n("transition"),
            u = n("transform"),
            h = c && u,
            p = !!n("perspective"),
            m = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend",
                transition: "transitionend"
            }[c],
            f = ["transform", "transition", "transitionDuration", "transitionProperty"],
            g = function () {
                for (var e = {}, t = 0, i = f.length; i > t; t++) {
                    var o = f[t],
                        s = n(o);
                    s && s !== o && (e[o] = s)
                }
                return e
            }();
        o.extend(a.prototype, t.prototype), a.prototype._create = function () {
            this._transn = {
                ingProperties: {},
                clean: {},
                onEnd: {}
            }, this.css({
                position: "absolute"
            })
        }, a.prototype.handleEvent = function (e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, a.prototype.getSize = function () {
            this.size = i(this.element)
        }, a.prototype.css = function (e) {
            var t = this.element.style;
            for (var i in e) {
                var n = g[i] || i;
                t[n] = e[i]
            }
        }, a.prototype.getPosition = function () {
            var e = d(this.element),
                t = this.layout.options,
                i = t.isOriginLeft,
                n = t.isOriginTop,
                o = e[i ? "left" : "right"],
                s = e[n ? "top" : "bottom"],
                a = this.layout.size,
                r = -1 != o.indexOf("%") ? parseFloat(o) / 100 * a.width : parseInt(o, 10),
                l = -1 != s.indexOf("%") ? parseFloat(s) / 100 * a.height : parseInt(s, 10);
            r = isNaN(r) ? 0 : r, l = isNaN(l) ? 0 : l, r -= i ? a.paddingLeft : a.paddingRight, l -= n ? a.paddingTop : a.paddingBottom, this.position.x = r, this.position.y = l
        }, a.prototype.layoutPosition = function () {
            var e = this.layout.size,
                t = this.layout.options,
                i = {},
                n = t.isOriginLeft ? "paddingLeft" : "paddingRight",
                o = t.isOriginLeft ? "left" : "right",
                s = t.isOriginLeft ? "right" : "left",
                a = this.position.x + e[n];
            i[o] = this.getXValue(a), i[s] = "";
            var r = t.isOriginTop ? "paddingTop" : "paddingBottom",
                l = t.isOriginTop ? "top" : "bottom",
                d = t.isOriginTop ? "bottom" : "top",
                c = this.position.y + e[r];
            i[l] = this.getYValue(c), i[d] = "", this.css(i), this.emitEvent("layout", [this])
        }, a.prototype.getXValue = function (e) {
            var t = this.layout.options;
            return t.percentPosition && !t.isHorizontal ? e / this.layout.size.width * 100 + "%" : e + "px"
        }, a.prototype.getYValue = function (e) {
            var t = this.layout.options;
            return t.percentPosition && t.isHorizontal ? e / this.layout.size.height * 100 + "%" : e + "px"
        }, a.prototype._transitionTo = function (e, t) {
            this.getPosition();
            var i = this.position.x,
                n = this.position.y,
                o = parseInt(e, 10),
                s = parseInt(t, 10),
                a = o === this.position.x && s === this.position.y;
            if (this.setPosition(e, t), a && !this.isTransitioning) return void this.layoutPosition();
            var r = e - i,
                l = t - n,
                d = {};
            d.transform = this.getTranslate(r, l), this.transition({
                to: d,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            })
        }, a.prototype.getTranslate = function (e, t) {
            var i = this.layout.options;
            return e = i.isOriginLeft ? e : -e, t = i.isOriginTop ? t : -t, p ? "translate3d(" + e + "px, " + t + "px, 0)" : "translate(" + e + "px, " + t + "px)"
        }, a.prototype.goTo = function (e, t) {
            this.setPosition(e, t), this.layoutPosition()
        }, a.prototype.moveTo = h ? a.prototype._transitionTo : a.prototype.goTo, a.prototype.setPosition = function (e, t) {
            this.position.x = parseInt(e, 10), this.position.y = parseInt(t, 10)
        }, a.prototype._nonTransition = function (e) {
            this.css(e.to), e.isCleaning && this._removeStyles(e.to);
            for (var t in e.onTransitionEnd) e.onTransitionEnd[t].call(this)
        }, a.prototype._transition = function (e) {
            if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(e);
            var t = this._transn;
            for (var i in e.onTransitionEnd) t.onEnd[i] = e.onTransitionEnd[i];
            for (i in e.to) t.ingProperties[i] = !0, e.isCleaning && (t.clean[i] = !0);
            if (e.from) {
                this.css(e.from);
                var n = this.element.offsetHeight;
                n = null
            }
            this.enableTransition(e.to), this.css(e.to), this.isTransitioning = !0
        };
        var v = "opacity," + r(g.transform || "transform");
        a.prototype.enableTransition = function () {
            this.isTransitioning || (this.css({
                transitionProperty: v,
                transitionDuration: this.layout.options.transitionDuration
            }), this.element.addEventListener(m, this, !1))
        }, a.prototype.transition = a.prototype[c ? "_transition" : "_nonTransition"], a.prototype.onwebkitTransitionEnd = function (e) {
            this.ontransitionend(e)
        }, a.prototype.onotransitionend = function (e) {
            this.ontransitionend(e)
        };
        var y = {
            "-webkit-transform": "transform",
            "-moz-transform": "transform",
            "-o-transform": "transform"
        };
        a.prototype.ontransitionend = function (e) {
            if (e.target === this.element) {
                var t = this._transn,
                    i = y[e.propertyName] || e.propertyName;
                if (delete t.ingProperties[i], s(t.ingProperties) && this.disableTransition(), i in t.clean && (this.element.style[e.propertyName] = "", delete t.clean[i]), i in t.onEnd) {
                    var n = t.onEnd[i];
                    n.call(this), delete t.onEnd[i]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, a.prototype.disableTransition = function () {
            this.removeTransitionStyles(), this.element.removeEventListener(m, this, !1), this.isTransitioning = !1
        }, a.prototype._removeStyles = function (e) {
            var t = {};
            for (var i in e) t[i] = "";
            this.css(t)
        };
        var b = {
            transitionProperty: "",
            transitionDuration: ""
        };
        return a.prototype.removeTransitionStyles = function () {
            this.css(b)
        }, a.prototype.removeElem = function () {
            this.element.parentNode.removeChild(this.element), this.css({
                display: ""
            }), this.emitEvent("remove", [this])
        }, a.prototype.remove = function () {
            if (!c || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
            var e = this;
            this.once("transitionEnd", function () {
                e.removeElem()
            }), this.hide()
        }, a.prototype.reveal = function () {
            delete this.isHidden, this.css({
                display: ""
            });
            var e = this.layout.options,
                t = {},
                i = this.getHideRevealTransitionEndProperty("visibleStyle");
            t[i] = this.onRevealTransitionEnd, this.transition({
                from: e.hiddenStyle,
                to: e.visibleStyle,
                isCleaning: !0,
                onTransitionEnd: t
            })
        }, a.prototype.onRevealTransitionEnd = function () {
            this.isHidden || this.emitEvent("reveal")
        }, a.prototype.getHideRevealTransitionEndProperty = function (e) {
            var t = this.layout.options[e];
            if (t.opacity) return "opacity";
            for (var i in t) return i
        }, a.prototype.hide = function () {
            this.isHidden = !0, this.css({
                display: ""
            });
            var e = this.layout.options,
                t = {},
                i = this.getHideRevealTransitionEndProperty("hiddenStyle");
            t[i] = this.onHideTransitionEnd, this.transition({
                from: e.visibleStyle,
                to: e.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: t
            })
        }, a.prototype.onHideTransitionEnd = function () {
            this.isHidden && (this.css({
                display: "none"
            }), this.emitEvent("hide"))
        }, a.prototype.destroy = function () {
            this.css({
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                transition: "",
                transform: ""
            })
        }, a
    }),
    function (e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "eventEmitter/EventEmitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, o, s, a) {
            return t(e, i, n, o, s, a)
        }) : "object" == typeof exports ? module.exports = t(e, require("eventie"), require("wolfy87-eventemitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : e.Outlayer = t(e, e.eventie, e.EventEmitter, e.getSize, e.fizzyUIUtils, e.Outlayer.Item)
    }(window, function (e, t, i, n, o, s) {
        "use strict";

        function a(e, t) {
            var i = o.getQueryElement(e);
            if (!i) return void (r && r.error("Bad element for " + this.constructor.namespace + ": " + (i || e)));
            this.element = i, l && (this.$element = l(this.element)), this.options = o.extend({}, this.constructor.defaults), this.option(t);
            var n = ++c;
            this.element.outlayerGUID = n, u[n] = this, this._create(), this.options.isInitLayout && this.layout()
        }

        var r = e.console,
            l = e.jQuery,
            d = function () {
            },
            c = 0,
            u = {};
        return a.namespace = "outlayer", a.Item = s, a.defaults = {
            containerStyle: {
                position: "relative"
            },
            isInitLayout: !0,
            isOriginLeft: !0,
            isOriginTop: !0,
            isResizeBound: !0,
            isResizingContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {
                opacity: 0,
                transform: "scale(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scale(1)"
            }
        }, o.extend(a.prototype, i.prototype), a.prototype.option = function (e) {
            o.extend(this.options, e)
        }, a.prototype._create = function () {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
        }, a.prototype.reloadItems = function () {
            this.items = this._itemize(this.element.children)
        }, a.prototype._itemize = function (e) {
            for (var t = this._filterFindItemElements(e), i = this.constructor.Item, n = [], o = 0, s = t.length; s > o; o++) {
                var a = t[o],
                    r = new i(a, this);
                n.push(r)
            }
            return n
        }, a.prototype._filterFindItemElements = function (e) {
            return o.filterFindElements(e, this.options.itemSelector)
        }, a.prototype.getItemElements = function () {
            for (var e = [], t = 0, i = this.items.length; i > t; t++) e.push(this.items[t].element);
            return e
        }, a.prototype.layout = function () {
            this._resetLayout(), this._manageStamps();
            var e = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, e), this._isLayoutInited = !0
        }, a.prototype._init = a.prototype.layout, a.prototype._resetLayout = function () {
            this.getSize()
        }, a.prototype.getSize = function () {
            this.size = n(this.element)
        }, a.prototype._getMeasurement = function (e, t) {
            var i, s = this.options[e];
            s ? ("string" == typeof s ? i = this.element.querySelector(s) : o.isElement(s) && (i = s), this[e] = i ? n(i)[t] : s) : this[e] = 0
        }, a.prototype.layoutItems = function (e, t) {
            e = this._getItemsForLayout(e), this._layoutItems(e, t), this._postLayout()
        }, a.prototype._getItemsForLayout = function (e) {
            for (var t = [], i = 0, n = e.length; n > i; i++) {
                var o = e[i];
                o.isIgnored || t.push(o)
            }
            return t
        }, a.prototype._layoutItems = function (e, t) {
            if (this._emitCompleteOnItems("layout", e), e && e.length) {
                for (var i = [], n = 0, o = e.length; o > n; n++) {
                    var s = e[n],
                        a = this._getItemLayoutPosition(s);
                    a.item = s, a.isInstant = t || s.isLayoutInstant, i.push(a)
                }
                this._processLayoutQueue(i)
            }
        }, a.prototype._getItemLayoutPosition = function () {
            return {
                x: 0,
                y: 0
            }
        }, a.prototype._processLayoutQueue = function (e) {
            for (var t = 0, i = e.length; i > t; t++) {
                var n = e[t];
                this._positionItem(n.item, n.x, n.y, n.isInstant)
            }
        }, a.prototype._positionItem = function (e, t, i, n) {
            n ? e.goTo(t, i) : e.moveTo(t, i)
        }, a.prototype._postLayout = function () {
            this.resizeContainer()
        }, a.prototype.resizeContainer = function () {
            if (this.options.isResizingContainer) {
                var e = this._getContainerSize();
                e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
            }
        }, a.prototype._getContainerSize = d, a.prototype._setContainerMeasure = function (e, t) {
            if (void 0 !== e) {
                var i = this.size;
                i.isBorderBox && (e += t ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), e = Math.max(e, 0), this.element.style[t ? "width" : "height"] = e + "px"
            }
        }, a.prototype._emitCompleteOnItems = function (e, t) {
            function i() {
                o.dispatchEvent(e + "Complete", null, [t])
            }

            function n() {
                a++, a === s && i()
            }

            var o = this,
                s = t.length;
            if (!t || !s) return void i();
            for (var a = 0, r = 0, l = t.length; l > r; r++) {
                var d = t[r];
                d.once(e, n)
            }
        }, a.prototype.dispatchEvent = function (e, t, i) {
            var n = t ? [t].concat(i) : i;
            if (this.emitEvent(e, n), l)
                if (this.$element = this.$element || l(this.element), t) {
                    var o = l.Event(t);
                    o.type = e, this.$element.trigger(o, i)
                } else this.$element.trigger(e, i)
        }, a.prototype.ignore = function (e) {
            var t = this.getItem(e);
            t && (t.isIgnored = !0)
        }, a.prototype.unignore = function (e) {
            var t = this.getItem(e);
            t && delete t.isIgnored
        }, a.prototype.stamp = function (e) {
            if (e = this._find(e)) {
                this.stamps = this.stamps.concat(e);
                for (var t = 0, i = e.length; i > t; t++) {
                    var n = e[t];
                    this.ignore(n)
                }
            }
        }, a.prototype.unstamp = function (e) {
            if (e = this._find(e))
                for (var t = 0, i = e.length; i > t; t++) {
                    var n = e[t];
                    o.removeFrom(this.stamps, n), this.unignore(n)
                }
        }, a.prototype._find = function (e) {
            return e ? ("string" == typeof e && (e = this.element.querySelectorAll(e)), e = o.makeArray(e)) : void 0
        }, a.prototype._manageStamps = function () {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var e = 0, t = this.stamps.length; t > e; e++) {
                    var i = this.stamps[e];
                    this._manageStamp(i)
                }
            }
        }, a.prototype._getBoundingRect = function () {
            var e = this.element.getBoundingClientRect(),
                t = this.size;
            this._boundingRect = {
                left: e.left + t.paddingLeft + t.borderLeftWidth,
                top: e.top + t.paddingTop + t.borderTopWidth,
                right: e.right - (t.paddingRight + t.borderRightWidth),
                bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
            }
        }, a.prototype._manageStamp = d, a.prototype._getElementOffset = function (e) {
            var t = e.getBoundingClientRect(),
                i = this._boundingRect,
                o = n(e),
                s = {
                    left: t.left - i.left - o.marginLeft,
                    top: t.top - i.top - o.marginTop,
                    right: i.right - t.right - o.marginRight,
                    bottom: i.bottom - t.bottom - o.marginBottom
                };
            return s
        }, a.prototype.handleEvent = function (e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, a.prototype.bindResize = function () {
            this.isResizeBound || (t.bind(e, "resize", this), this.isResizeBound = !0)
        }, a.prototype.unbindResize = function () {
            this.isResizeBound && t.unbind(e, "resize", this), this.isResizeBound = !1
        }, a.prototype.onresize = function () {
            function e() {
                t.resize(), delete t.resizeTimeout
            }

            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var t = this;
            this.resizeTimeout = setTimeout(e, 100)
        }, a.prototype.resize = function () {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, a.prototype.needsResizeLayout = function () {
            var e = n(this.element),
                t = this.size && e;
            return t && e.innerWidth !== this.size.innerWidth
        }, a.prototype.addItems = function (e) {
            var t = this._itemize(e);
            return t.length && (this.items = this.items.concat(t)), t
        }, a.prototype.appended = function (e) {
            var t = this.addItems(e);
            t.length && (this.layoutItems(t, !0), this.reveal(t))
        }, a.prototype.prepended = function (e) {
            var t = this._itemize(e);
            if (t.length) {
                var i = this.items.slice(0);
                this.items = t.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(t, !0), this.reveal(t), this.layoutItems(i)
            }
        }, a.prototype.reveal = function (e) {
            this._emitCompleteOnItems("reveal", e);
            for (var t = e && e.length, i = 0; t && t > i; i++) {
                var n = e[i];
                n.reveal()
            }
        }, a.prototype.hide = function (e) {
            this._emitCompleteOnItems("hide", e);
            for (var t = e && e.length, i = 0; t && t > i; i++) {
                var n = e[i];
                n.hide()
            }
        }, a.prototype.revealItemElements = function (e) {
            var t = this.getItems(e);
            this.reveal(t)
        }, a.prototype.hideItemElements = function (e) {
            var t = this.getItems(e);
            this.hide(t)
        }, a.prototype.getItem = function (e) {
            for (var t = 0, i = this.items.length; i > t; t++) {
                var n = this.items[t];
                if (n.element === e) return n
            }
        }, a.prototype.getItems = function (e) {
            e = o.makeArray(e);
            for (var t = [], i = 0, n = e.length; n > i; i++) {
                var s = e[i],
                    a = this.getItem(s);
                a && t.push(a)
            }
            return t
        }, a.prototype.remove = function (e) {
            var t = this.getItems(e);
            if (this._emitCompleteOnItems("remove", t), t && t.length)
                for (var i = 0, n = t.length; n > i; i++) {
                    var s = t[i];
                    s.remove(), o.removeFrom(this.items, s)
                }
        }, a.prototype.destroy = function () {
            var e = this.element.style;
            e.height = "", e.position = "", e.width = "";
            for (var t = 0, i = this.items.length; i > t; t++) {
                var n = this.items[t];
                n.destroy()
            }
            this.unbindResize();
            var o = this.element.outlayerGUID;
            delete u[o], delete this.element.outlayerGUID, l && l.removeData(this.element, this.constructor.namespace)
        }, a.data = function (e) {
            e = o.getQueryElement(e);
            var t = e && e.outlayerGUID;
            return t && u[t]
        }, a.create = function (e, t) {
            function i() {
                a.apply(this, arguments)
            }

            return Object.create ? i.prototype = Object.create(a.prototype) : o.extend(i.prototype, a.prototype), i.prototype.constructor = i, i.defaults = o.extend({}, a.defaults), o.extend(i.defaults, t), i.prototype.settings = {}, i.namespace = e, i.data = a.data, i.Item = function () {
                s.apply(this, arguments)
            }, i.Item.prototype = new s, o.htmlInit(i, e), l && l.bridget && l.bridget(e, i), i
        }, a.Item = s, a
    }),
    function (e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], t) : "object" == typeof exports ? module.exports = t(require("outlayer")) : (e.Isotope = e.Isotope || {}, e.Isotope.Item = t(e.Outlayer))
    }(window, function (e) {
        "use strict";

        function t() {
            e.Item.apply(this, arguments)
        }

        t.prototype = new e.Item, t.prototype._create = function () {
            this.id = this.layout.itemGUID++, e.Item.prototype._create.call(this), this.sortData = {}
        }, t.prototype.updateSortData = function () {
            if (!this.isIgnored) {
                this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                var e = this.layout.options.getSortData,
                    t = this.layout._sorters;
                for (var i in e) {
                    var n = t[i];
                    this.sortData[i] = n(this.element, this)
                }
            }
        };
        var i = t.prototype.destroy;
        return t.prototype.destroy = function () {
            i.apply(this, arguments), this.css({
                display: ""
            })
        }, t
    }),
    function (e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], t) : "object" == typeof exports ? module.exports = t(require("get-size"), require("outlayer")) : (e.Isotope = e.Isotope || {}, e.Isotope.LayoutMode = t(e.getSize, e.Outlayer))
    }(window, function (e, t) {
        "use strict";

        function i(e) {
            this.isotope = e, e && (this.options = e.options[this.namespace], this.element = e.element, this.items = e.filteredItems, this.size = e.size)
        }

        return function () {
            function e(e) {
                return function () {
                    return t.prototype[e].apply(this.isotope, arguments)
                }
            }

            for (var n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], o = 0, s = n.length; s > o; o++) {
                var a = n[o];
                i.prototype[a] = e(a)
            }
        }(), i.prototype.needsVerticalResizeLayout = function () {
            var t = e(this.isotope.element),
                i = this.isotope.size && t;
            return i && t.innerHeight != this.isotope.size.innerHeight
        }, i.prototype._getMeasurement = function () {
            this.isotope._getMeasurement.apply(this, arguments)
        }, i.prototype.getColumnWidth = function () {
            this.getSegmentSize("column", "Width")
        }, i.prototype.getRowHeight = function () {
            this.getSegmentSize("row", "Height")
        }, i.prototype.getSegmentSize = function (e, t) {
            var i = e + t,
                n = "outer" + t;
            if (this._getMeasurement(i, n), !this[i]) {
                var o = this.getFirstItemSize();
                this[i] = o && o[n] || this.isotope.size["inner" + t]
            }
        }, i.prototype.getFirstItemSize = function () {
            var t = this.isotope.filteredItems[0];
            return t && t.element && e(t.element)
        }, i.prototype.layout = function () {
            this.isotope.layout.apply(this.isotope, arguments)
        }, i.prototype.getSize = function () {
            this.isotope.getSize(), this.size = this.isotope.size
        }, i.modes = {}, i.create = function (e, t) {
            function n() {
                i.apply(this, arguments)
            }

            return n.prototype = new i, t && (n.options = t), n.prototype.namespace = e, i.modes[e] = n, n
        }, i
    }),
    function (e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"], t) : "object" == typeof exports ? module.exports = t(require("outlayer"), require("get-size"), require("fizzy-ui-utils")) : e.Masonry = t(e.Outlayer, e.getSize, e.fizzyUIUtils)
    }(window, function (e, t, i) {
        var n = e.create("masonry");
        return n.prototype._resetLayout = function () {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
            var e = this.cols;
            for (this.colYs = []; e--;) this.colYs.push(0);
            this.maxY = 0
        }, n.prototype.measureColumns = function () {
            if (this.getContainerWidth(), !this.columnWidth) {
                var e = this.items[0],
                    i = e && e.element;
                this.columnWidth = i && t(i).outerWidth || this.containerWidth
            }
            var n = this.columnWidth += this.gutter,
                o = this.containerWidth + this.gutter,
                s = o / n,
                a = n - o % n,
                r = a && 1 > a ? "round" : "floor";
            s = Math[r](s), this.cols = Math.max(s, 1)
        }, n.prototype.getContainerWidth = function () {
            var e = this.options.isFitWidth ? this.element.parentNode : this.element,
                i = t(e);
            this.containerWidth = i && i.innerWidth
        }, n.prototype._getItemLayoutPosition = function (e) {
            e.getSize();
            var t = e.size.outerWidth % this.columnWidth,
                n = t && 1 > t ? "round" : "ceil",
                o = Math[n](e.size.outerWidth / this.columnWidth);
            o = Math.min(o, this.cols);
            for (var s = this._getColGroup(o), a = Math.min.apply(Math, s), r = i.indexOf(s, a), l = {
                x: this.columnWidth * r,
                y: a
            }, d = a + e.size.outerHeight, c = this.cols + 1 - s.length, u = 0; c > u; u++) this.colYs[r + u] = d;
            return l
        }, n.prototype._getColGroup = function (e) {
            if (2 > e) return this.colYs;
            for (var t = [], i = this.cols + 1 - e, n = 0; i > n; n++) {
                var o = this.colYs.slice(n, n + e);
                t[n] = Math.max.apply(Math, o)
            }
            return t
        }, n.prototype._manageStamp = function (e) {
            var i = t(e),
                n = this._getElementOffset(e),
                o = this.options.isOriginLeft ? n.left : n.right,
                s = o + i.outerWidth,
                a = Math.floor(o / this.columnWidth);
            a = Math.max(0, a);
            var r = Math.floor(s / this.columnWidth);
            r -= s % this.columnWidth ? 0 : 1, r = Math.min(this.cols - 1, r);
            for (var l = (this.options.isOriginTop ? n.top : n.bottom) + i.outerHeight, d = a; r >= d; d++) this.colYs[d] = Math.max(l, this.colYs[d])
        }, n.prototype._getContainerSize = function () {
            this.maxY = Math.max.apply(Math, this.colYs);
            var e = {
                height: this.maxY
            };
            return this.options.isFitWidth && (e.width = this._getContainerFitWidth()), e
        }, n.prototype._getContainerFitWidth = function () {
            for (var e = 0, t = this.cols; --t && 0 === this.colYs[t];) e++;
            return (this.cols - e) * this.columnWidth - this.gutter
        }, n.prototype.needsResizeLayout = function () {
            var e = this.containerWidth;
            return this.getContainerWidth(), e !== this.containerWidth
        }, n
    }),
    function (e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], t) : "object" == typeof exports ? module.exports = t(require("../layout-mode"), require("masonry-layout")) : t(e.Isotope.LayoutMode, e.Masonry)
    }(window, function (e, t) {
        "use strict";

        function i(e, t) {
            for (var i in t) e[i] = t[i];
            return e
        }

        var n = e.create("masonry"),
            o = n.prototype._getElementOffset,
            s = n.prototype.layout,
            a = n.prototype._getMeasurement;
        i(n.prototype, t.prototype), n.prototype._getElementOffset = o, n.prototype.layout = s, n.prototype._getMeasurement = a;
        var r = n.prototype.measureColumns;
        n.prototype.measureColumns = function () {
            this.items = this.isotope.filteredItems, r.call(this)
        };
        var l = n.prototype._manageStamp;
        return n.prototype._manageStamp = function () {
            this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, l.apply(this, arguments)
        }, n
    }),
    function (e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], t) : "object" == typeof exports ? module.exports = t(require("../layout-mode")) : t(e.Isotope.LayoutMode)
    }(window, function (e) {
        "use strict";
        var t = e.create("fitRows");
        return t.prototype._resetLayout = function () {
            this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
        }, t.prototype._getItemLayoutPosition = function (e) {
            e.getSize();
            var t = e.size.outerWidth + this.gutter,
                i = this.isotope.size.innerWidth + this.gutter;
            0 !== this.x && t + this.x > i && (this.x = 0, this.y = this.maxY);
            var n = {
                x: this.x,
                y: this.y
            };
            return this.maxY = Math.max(this.maxY, this.y + e.size.outerHeight), this.x += t, n
        }, t.prototype._getContainerSize = function () {
            return {
                height: this.maxY
            }
        }, t
    }),
    function (e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], t) : "object" == typeof exports ? module.exports = t(require("../layout-mode")) : t(e.Isotope.LayoutMode)
    }(window, function (e) {
        "use strict";
        var t = e.create("vertical", {
            horizontalAlignment: 0
        });
        return t.prototype._resetLayout = function () {
            this.y = 0
        }, t.prototype._getItemLayoutPosition = function (e) {
            e.getSize();
            var t = (this.isotope.size.innerWidth - e.size.outerWidth) * this.options.horizontalAlignment,
                i = this.y;
            return this.y += e.size.outerHeight, {
                x: t,
                y: i
            }
        }, t.prototype._getContainerSize = function () {
            return {
                height: this.y
            }
        }, t
    }),
    function (e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function (i, n, o, s, a, r) {
            return t(e, i, n, o, s, a, r)
        }) : "object" == typeof exports ? module.exports = t(e, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("./item"), require("./layout-mode"), require("./layout-modes/masonry"), require("./layout-modes/fit-rows"), require("./layout-modes/vertical")) : e.Isotope = t(e, e.Outlayer, e.getSize, e.matchesSelector, e.fizzyUIUtils, e.Isotope.Item, e.Isotope.LayoutMode)
    }(window, function (e, t, i, n, o, s, a) {
        function r(e, t) {
            return function (i, n) {
                for (var o = 0, s = e.length; s > o; o++) {
                    var a = e[o],
                        r = i.sortData[a],
                        l = n.sortData[a];
                    if (r > l || l > r) {
                        var d = void 0 !== t[a] ? t[a] : t,
                            c = d ? 1 : -1;
                        return (r > l ? 1 : -1) * c
                    }
                }
                return 0
            }
        }

        var l = e.jQuery,
            d = String.prototype.trim ? function (e) {
                return e.trim()
            } : function (e) {
                return e.replace(/^\s+|\s+$/g, "")
            },
            c = document.documentElement,
            u = c.textContent ? function (e) {
                return e.textContent
            } : function (e) {
                return e.innerText
            },
            h = t.create("isotope", {
                layoutMode: "masonry",
                isJQueryFiltering: !0,
                sortAscending: !0
            });
        h.Item = s, h.LayoutMode = a, h.prototype._create = function () {
            this.itemGUID = 0, this._sorters = {}, this._getSorters(), t.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
            for (var e in a.modes) this._initLayoutMode(e)
        }, h.prototype.reloadItems = function () {
            this.itemGUID = 0, t.prototype.reloadItems.call(this)
        }, h.prototype._itemize = function () {
            for (var e = t.prototype._itemize.apply(this, arguments), i = 0, n = e.length; n > i; i++) {
                var o = e[i];
                o.id = this.itemGUID++
            }
            return this._updateItemsSortData(e), e
        }, h.prototype._initLayoutMode = function (e) {
            var t = a.modes[e],
                i = this.options[e] || {};
            this.options[e] = t.options ? o.extend(t.options, i) : i, this.modes[e] = new t(this)
        }, h.prototype.layout = function () {
            return !this._isLayoutInited && this.options.isInitLayout ? void this.arrange() : void this._layout()
        }, h.prototype._layout = function () {
            var e = this._getIsInstant();
            this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, e), this._isLayoutInited = !0
        }, h.prototype.arrange = function (e) {
            function t() {
                n.reveal(i.needReveal), n.hide(i.needHide)
            }

            this.option(e), this._getIsInstant();
            var i = this._filter(this.items);
            this.filteredItems = i.matches;
            var n = this;
            this._bindArrangeComplete(), this._isInstant ? this._noTransition(t) : t(), this._sort(), this._layout()
        }, h.prototype._init = h.prototype.arrange, h.prototype._getIsInstant = function () {
            var e = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            return this._isInstant = e, e
        }, h.prototype._bindArrangeComplete = function () {
            function e() {
                t && i && n && o.dispatchEvent("arrangeComplete", null, [o.filteredItems])
            }

            var t, i, n, o = this;
            this.once("layoutComplete", function () {
                t = !0, e()
            }), this.once("hideComplete", function () {
                i = !0, e()
            }), this.once("revealComplete", function () {
                n = !0, e()
            })
        }, h.prototype._filter = function (e) {
            var t = this.options.filter;
            t = t || "*";
            for (var i = [], n = [], o = [], s = this._getFilterTest(t), a = 0, r = e.length; r > a; a++) {
                var l = e[a];
                if (!l.isIgnored) {
                    var d = s(l);
                    d && i.push(l), d && l.isHidden ? n.push(l) : d || l.isHidden || o.push(l)
                }
            }
            return {
                matches: i,
                needReveal: n,
                needHide: o
            }
        }, h.prototype._getFilterTest = function (e) {
            return l && this.options.isJQueryFiltering ? function (t) {
                return l(t.element).is(e)
            } : "function" == typeof e ? function (t) {
                return e(t.element)
            } : function (t) {
                return n(t.element, e)
            }
        }, h.prototype.updateSortData = function (e) {
            var t;
            e ? (e = o.makeArray(e), t = this.getItems(e)) : t = this.items, this._getSorters(), this._updateItemsSortData(t)
        }, h.prototype._getSorters = function () {
            var e = this.options.getSortData;
            for (var t in e) {
                var i = e[t];
                this._sorters[t] = p(i)
            }
        }, h.prototype._updateItemsSortData = function (e) {
            for (var t = e && e.length, i = 0; t && t > i; i++) {
                var n = e[i];
                n.updateSortData()
            }
        };
        var p = function () {
            function e(e) {
                if ("string" != typeof e) return e;
                var i = d(e).split(" "),
                    n = i[0],
                    o = n.match(/^\[(.+)\]$/),
                    s = o && o[1],
                    a = t(s, n),
                    r = h.sortDataParsers[i[1]];
                return e = r ? function (e) {
                    return e && r(a(e))
                } : function (e) {
                    return e && a(e)
                }
            }

            function t(e, t) {
                var i;
                return i = e ? function (t) {
                    return t.getAttribute(e)
                } : function (e) {
                    var i = e.querySelector(t);
                    return i && u(i)
                }
            }

            return e
        }();
        h.sortDataParsers = {
            parseInt: function (e) {
                return parseInt(e, 10)
            },
            parseFloat: function (e) {
                return parseFloat(e)
            }
        }, h.prototype._sort = function () {
            var e = this.options.sortBy;
            if (e) {
                var t = [].concat.apply(e, this.sortHistory),
                    i = r(t, this.options.sortAscending);
                this.filteredItems.sort(i), e != this.sortHistory[0] && this.sortHistory.unshift(e)
            }
        }, h.prototype._mode = function () {
            var e = this.options.layoutMode,
                t = this.modes[e];
            if (!t) throw new Error("No layout mode: " + e);
            return t.options = this.options[e], t
        }, h.prototype._resetLayout = function () {
            t.prototype._resetLayout.call(this), this._mode()._resetLayout()
        }, h.prototype._getItemLayoutPosition = function (e) {
            return this._mode()._getItemLayoutPosition(e)
        }, h.prototype._manageStamp = function (e) {
            this._mode()._manageStamp(e)
        }, h.prototype._getContainerSize = function () {
            return this._mode()._getContainerSize()
        }, h.prototype.needsResizeLayout = function () {
            return this._mode().needsResizeLayout()
        }, h.prototype.appended = function (e) {
            var t = this.addItems(e);
            if (t.length) {
                var i = this._filterRevealAdded(t);
                this.filteredItems = this.filteredItems.concat(i)
            }
        }, h.prototype.prepended = function (e) {
            var t = this._itemize(e);
            if (t.length) {
                this._resetLayout(), this._manageStamps();
                var i = this._filterRevealAdded(t);
                this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = t.concat(this.items)
            }
        }, h.prototype._filterRevealAdded = function (e) {
            var t = this._filter(e);
            return this.hide(t.needHide), this.reveal(t.matches), this.layoutItems(t.matches, !0), t.matches
        }, h.prototype.insert = function (e) {
            var t = this.addItems(e);
            if (t.length) {
                var i, n, o = t.length;
                for (i = 0; o > i; i++) n = t[i], this.element.appendChild(n.element);
                var s = this._filter(t).matches;
                for (i = 0; o > i; i++) t[i].isLayoutInstant = !0;
                for (this.arrange(), i = 0; o > i; i++) delete t[i].isLayoutInstant;
                this.reveal(s)
            }
        };
        var m = h.prototype.remove;
        return h.prototype.remove = function (e) {
            e = o.makeArray(e);
            var t = this.getItems(e);
            m.call(this, e);
            var i = t && t.length;
            if (i)
                for (var n = 0; i > n; n++) {
                    var s = t[n];
                    o.removeFrom(this.filteredItems, s)
                }
        }, h.prototype.shuffle = function () {
            for (var e = 0, t = this.items.length; t > e; e++) {
                var i = this.items[e];
                i.sortData.random = Math.random()
            }
            this.options.sortBy = "random", this._sort(), this._layout()
        }, h.prototype._noTransition = function (e) {
            var t = this.options.transitionDuration;
            this.options.transitionDuration = 0;
            var i = e.call(this);
            return this.options.transitionDuration = t, i
        }, h.prototype.getFilteredItemElements = function () {
            for (var e = [], t = 0, i = this.filteredItems.length; i > t; t++) e.push(this.filteredItems[t].element);
            return e
        }, h
    }), !function (e, t, i, n) {
    var o = function (n, o) {
        this.elem = n, this.$elem = e(n), this.options = o, this.metadata = this.$elem.data("plugin-options"), this.$win = e(t), this.sections = {}, this.didScroll = !1, this.$doc = e(i), this.docHeight = this.$doc.height()
    };
    o.prototype = {
        defaults: {
            navItems: "a",
            currentClass: "current",
            changeHash: !1,
            easing: "swing",
            filter: "",
            scrollSpeed: 750,
            scrollThreshold: .5,
            begin: !1,
            end: !1,
            scrollChange: !1
        },
        init: function () {
            return this.config = e.extend({}, this.defaults, this.options, this.metadata), this.$nav = this.$elem.find(this.config.navItems), "" !== this.config.filter && (this.$nav = this.$nav.filter(this.config.filter)), this.$nav.on("click.onePageNav", e.proxy(this.handleClick, this)), this.getPositions(), this.bindInterval(), this.$win.on("resize.onePageNav", e.proxy(this.getPositions, this)), this
        },
        adjustNav: function (e, t) {
            e.$elem.find("." + e.config.currentClass).removeClass(e.config.currentClass), t.addClass(e.config.currentClass)
        },
        bindInterval: function () {
            var e, t = this;
            t.$win.on("scroll.onePageNav", function () {
                t.didScroll = !0
            }), t.t = setInterval(function () {
                e = t.$doc.height(), t.didScroll && (t.didScroll = !1, t.scrollChange()), e !== t.docHeight && (t.docHeight = e, t.getPositions())
            }, 250)
        },
        getHash: function (e) {
            return e.attr("href").split("#")[1]
        },
        getPositions: function () {
            var t, i, n, o = this;
            o.$nav.each(function () {
                t = o.getHash(e(this)), n = e("#" + t), n.length && (i = n.offset().top, o.sections[t] = Math.round(i))
            })
        },
        getSection: function (e) {
            var t = null,
                i = Math.round(this.$win.height() * this.config.scrollThreshold);
            for (var n in this.sections) this.sections[n] - i < e && (t = n);
            return t
        },
        handleClick: function (i) {
            var n = this,
                o = e(i.currentTarget),
                s = o.parent(),
                a = "#" + n.getHash(o);
            s.hasClass(n.config.currentClass) || (n.config.begin && n.config.begin(), n.adjustNav(n, s), n.unbindInterval(), n.scrollTo(a, function () {
                n.config.changeHash && (t.location.hash = a), n.bindInterval(), n.config.end && n.config.end()
            })), i.preventDefault()
        },
        scrollChange: function () {
            var e, t = this.$win.scrollTop(),
                i = this.getSection(t);
            null !== i && (e = this.$elem.find('a[href$="#' + i + '"]').parent(), e.hasClass(this.config.currentClass) || (this.adjustNav(this, e), this.config.scrollChange && this.config.scrollChange(e)))
        },
        scrollTo: function (t, i) {
            var n = e(t).offset().top;
            e("html, body").animate({
                scrollTop: n
            }, this.config.scrollSpeed, this.config.easing, i)
        },
        unbindInterval: function () {
            clearInterval(this.t), this.$win.unbind("scroll.onePageNav")
        }
    }, o.defaults = o.prototype.defaults, e.fn.onePageNav = function (e) {
        return this.each(function () {
            new o(this, e).init()
        })
    }
}(jQuery, window, document), !function (e) {
    function t() {
        s = !1;
        for (var t = 0, i = n.length; i > t; t++) {
            var o = e(n[t]).filter(function () {
                return e(this).is(":appeared")
            });
            if (o.trigger("appear", [o]), l[t]) {
                var a = l[t].not(o);
                a.trigger("disappear", [a])
            }
            l[t] = o
        }
    }

    function i(e) {
        n.push(e), l.push()
    }

    var n = [],
        o = !1,
        s = !1,
        a = {
            interval: 250,
            force_process: !1
        },
        r = e(window),
        l = [];
    e.expr[":"].appeared = function (t) {
        var i = e(t);
        if (!i.is(":visible")) return !1;
        var n = r.scrollLeft(),
            o = r.scrollTop(),
            s = i.offset(),
            a = s.left,
            l = s.top;
        return l + i.height() >= o && l - (i.data("appear-top-offset") || 0) <= o + r.height() && a + i.width() >= n && a - (i.data("appear-left-offset") || 0) <= n + r.width() ? !0 : !1
    }, e.fn.extend({
        appear: function (n) {
            var r = e.extend({}, a, n || {}),
                l = this.selector || this;
            if (!o) {
                var d = function () {
                    s || (s = !0, setTimeout(t, r.interval))
                };
                e(window).scroll(d).resize(d), o = !0
            }
            return r.force_process && setTimeout(t, r.interval), i(l), e(l)
        }
    }), e.extend({
        force_appear: function () {
            return o ? (t(), !0) : !1
        }
    })
}(function () {
    return "undefined" != typeof module ? require("jquery") : jQuery
}()), !function (e) {
    var t = {},
        n = {
            mode: "horizontal",
            slideSelector: "",
            infiniteLoop: !0,
            hideControlOnEnd: !1,
            speed: 500,
            easing: null,
            slideMargin: 0,
            startSlide: 0,
            randomStart: !1,
            captions: !1,
            ticker: !1,
            tickerHover: !1,
            adaptiveHeight: !1,
            adaptiveHeightSpeed: 500,
            video: !1,
            useCSS: !0,
            preloadImages: "visible",
            responsive: !0,
            slideZIndex: 50,
            touchEnabled: !0,
            swipeThreshold: 50,
            oneToOneTouch: !0,
            preventDefaultSwipeX: !0,
            preventDefaultSwipeY: !1,
            pager: !0,
            pagerType: "full",
            pagerShortSeparator: " / ",
            pagerSelector: null,
            buildPager: null,
            pagerCustom: null,
            controls: !0,
            nextText: "Next",
            prevText: "Prev",
            nextSelector: null,
            prevSelector: null,
            autoControls: !1,
            startText: "Start",
            stopText: "Stop",
            autoControlsCombine: !1,
            autoControlsSelector: null,
            auto: !1,
            pause: 4e3,
            autoStart: !0,
            autoDirection: "next",
            autoHover: !1,
            autoDelay: 0,
            minSlides: 1,
            maxSlides: 1,
            moveSlides: 0,
            slideWidth: 0,
            onSliderLoad: function () {
            },
            onSlideBefore: function () {
            },
            onSlideAfter: function () {
            },
            onSlideNext: function () {
            },
            onSlidePrev: function () {
            },
            onSliderResize: function () {
            }
        };
    e.fn.bxSlider = function (o) {
        if (0 == this.length) return this;
        if (this.length > 1) return this.each(function () {
            e(this).bxSlider(o)
        }), this;
        var s = {},
            a = this;
        t.el = this;
        var r = e(window).width(),
            l = e(window).height(),
            d = function () {
                s.settings = e.extend({}, n, o), s.settings.slideWidth = parseInt(s.settings.slideWidth), s.children = a.children(s.settings.slideSelector), s.children.length < s.settings.minSlides && (s.settings.minSlides = s.children.length), s.children.length < s.settings.maxSlides && (s.settings.maxSlides = s.children.length), s.settings.randomStart && (s.settings.startSlide = Math.floor(Math.random() * s.children.length)), s.active = {
                    index: s.settings.startSlide
                }, s.carousel = s.settings.minSlides > 1 || s.settings.maxSlides > 1, s.carousel && (s.settings.preloadImages = "all"), s.minThreshold = s.settings.minSlides * s.settings.slideWidth + (s.settings.minSlides - 1) * s.settings.slideMargin, s.maxThreshold = s.settings.maxSlides * s.settings.slideWidth + (s.settings.maxSlides - 1) * s.settings.slideMargin, s.working = !1, s.controls = {}, s.interval = null, s.animProp = "vertical" == s.settings.mode ? "top" : "left", s.usingCSS = s.settings.useCSS && "fade" != s.settings.mode && function () {
                    var e = document.createElement("div"),
                        t = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var i in t)
                        if (void 0 !== e.style[t[i]]) return s.cssPrefix = t[i].replace("Perspective", "").toLowerCase(), s.animProp = "-" + s.cssPrefix + "-transform", !0;
                    return !1
                }(), "vertical" == s.settings.mode && (s.settings.maxSlides = s.settings.minSlides), a.data("origStyle", a.attr("style")), a.children(s.settings.slideSelector).each(function () {
                    e(this).data("origStyle", e(this).attr("style"))
                }), c()
            },
            c = function () {
                a.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'), s.viewport = a.parent(), s.loader = e('<div class="bx-loading" />'), s.viewport.prepend(s.loader), a.css({
                    width: "horizontal" == s.settings.mode ? 100 * s.children.length + 215 + "%" : "auto",
                    position: "relative"
                }), s.usingCSS && s.settings.easing ? a.css("-" + s.cssPrefix + "-transition-timing-function", s.settings.easing) : s.settings.easing || (s.settings.easing = "swing"), g(), s.viewport.css({
                    width: "100%",
                    overflow: "hidden",
                    position: "relative"
                }), s.viewport.parent().css({
                    maxWidth: m()
                }), s.settings.pager || s.viewport.parent().css({
                    margin: "0 auto 0px"
                }), s.children.css({
                    "float": "horizontal" == s.settings.mode ? "left" : "none",
                    listStyle: "none",
                    position: "relative"
                }), s.children.css("width", f()), "horizontal" == s.settings.mode && s.settings.slideMargin > 0 && s.children.css("marginRight", s.settings.slideMargin), "vertical" == s.settings.mode && s.settings.slideMargin > 0 && s.children.css("marginBottom", s.settings.slideMargin), "fade" == s.settings.mode && (s.children.css({
                    position: "absolute",
                    zIndex: 0,
                    display: "none"
                }), s.children.eq(s.settings.startSlide).css({
                    zIndex: s.settings.slideZIndex,
                    display: "block"
                })), s.controls.el = e('<div class="bx-controls" />'), s.settings.captions && k(), s.active.last = s.settings.startSlide == v() - 1, s.settings.video && a.fitVids();
                var t = s.children.eq(s.settings.startSlide);
                "all" == s.settings.preloadImages && (t = s.children), s.settings.ticker ? s.settings.pager = !1 : (s.settings.pager && S(), s.settings.controls && C(), s.settings.auto && s.settings.autoControls && T(), (s.settings.controls || s.settings.autoControls || s.settings.pager) && s.viewport.after(s.controls.el)), u(t, h)
            },
            u = function (t, i) {
                var n = t.find("img, iframe").length;
                if (0 == n) return void i();
                var o = 0;
                t.find("img, iframe").each(function () {
                    e(this).one("load", function () {
                        ++o == n && i()
                    }).each(function () {
                        this.complete && e(this).load()
                    })
                })
            },
            h = function () {
                if (s.settings.infiniteLoop && "fade" != s.settings.mode && !s.settings.ticker) {
                    var t = "vertical" == s.settings.mode ? s.settings.minSlides : s.settings.maxSlides,
                        i = s.children.slice(0, t).clone().addClass("bx-clone"),
                        n = s.children.slice(-t).clone().addClass("bx-clone");
                    a.append(i).prepend(n)
                }
                s.loader.remove(), b(), "vertical" == s.settings.mode && (s.settings.adaptiveHeight = !0), s.viewport.height(p()), a.redrawSlider(), s.settings.onSliderLoad(s.active.index), s.initialized = !0, s.settings.responsive && e(window).bind("resize", N), s.settings.auto && s.settings.autoStart && D(), s.settings.ticker && z(), s.settings.pager && P(s.settings.startSlide), s.settings.controls && A(), s.settings.touchEnabled && !s.settings.ticker && W()
            },
            p = function () {
                var t = 0,
                    n = e();
                if ("vertical" == s.settings.mode || s.settings.adaptiveHeight)
                    if (s.carousel) {
                        var o = 1 == s.settings.moveSlides ? s.active.index : s.active.index * y();
                        for (n = s.children.eq(o), i = 1; i <= s.settings.maxSlides - 1; i++) n = o + i >= s.children.length ? n.add(s.children.eq(i - 1)) : n.add(s.children.eq(o + i))
                    } else n = s.children.eq(s.active.index);
                else n = s.children;
                return "vertical" == s.settings.mode ? (n.each(function () {
                    t += e(this).outerHeight()
                }), s.settings.slideMargin > 0 && (t += s.settings.slideMargin * (s.settings.minSlides - 1))) : t = Math.max.apply(Math, n.map(function () {
                    return e(this).outerHeight(!1)
                }).get()), t
            },
            m = function () {
                var e = "100%";
                return s.settings.slideWidth > 0 && (e = "horizontal" == s.settings.mode ? s.settings.maxSlides * s.settings.slideWidth + (s.settings.maxSlides - 1) * s.settings.slideMargin : s.settings.slideWidth), e
            },
            f = function () {
                var e = s.settings.slideWidth,
                    t = s.viewport.width();
                return 0 == s.settings.slideWidth || s.settings.slideWidth > t && !s.carousel || "vertical" == s.settings.mode ? e = t : s.settings.maxSlides > 1 && "horizontal" == s.settings.mode && (t > s.maxThreshold || t < s.minThreshold && (e = (t - s.settings.slideMargin * (s.settings.minSlides - 1)) / s.settings.minSlides)), e
            },
            g = function () {
                var e = 1;
                if ("horizontal" == s.settings.mode && s.settings.slideWidth > 0)
                    if (s.viewport.width() < s.minThreshold) e = s.settings.minSlides;
                    else if (s.viewport.width() > s.maxThreshold) e = s.settings.maxSlides;
                    else {
                        var t = s.children.first().width();
                        e = Math.floor(s.viewport.width() / t)
                    } else "vertical" == s.settings.mode && (e = s.settings.minSlides);
                return e
            },
            v = function () {
                var e = 0;
                if (s.settings.moveSlides > 0)
                    if (s.settings.infiniteLoop) e = s.children.length / y();
                    else
                        for (var t = 0, i = 0; t < s.children.length;) ++e, t = i + g(), i += s.settings.moveSlides <= g() ? s.settings.moveSlides : g();
                else e = Math.ceil(s.children.length / g());
                return e
            },
            y = function () {
                return s.settings.moveSlides > 0 && s.settings.moveSlides <= g() ? s.settings.moveSlides : g()
            },
            b = function () {
                if (s.children.length > s.settings.maxSlides && s.active.last && !s.settings.infiniteLoop) {
                    if ("horizontal" == s.settings.mode) {
                        var e = s.children.last(),
                            t = e.position();
                        w(-(t.left - (s.viewport.width() - e.width())), "reset", 0)
                    } else if ("vertical" == s.settings.mode) {
                        var i = s.children.length - s.settings.minSlides,
                            t = s.children.eq(i).position();
                        w(-t.top, "reset", 0)
                    }
                } else {
                    var t = s.children.eq(s.active.index * y()).position();
                    s.active.index == v() - 1 && (s.active.last = !0), void 0 != t && ("horizontal" == s.settings.mode ? w(-t.left, "reset", 0) : "vertical" == s.settings.mode && w(-t.top, "reset", 0))
                }
            },
            w = function (e, t, i, n) {
                if (s.usingCSS) {
                    var o = "vertical" == s.settings.mode ? "translate3d(0, " + e + "px, 0)" : "translate3d(" + e + "px, 0, 0)";
                    a.css("-" + s.cssPrefix + "-transition-duration", i / 1e3 + "s"), "slide" == t ? (a.css(s.animProp, o), a.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                        a.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), F()
                    })) : "reset" == t ? a.css(s.animProp, o) : "ticker" == t && (a.css("-" + s.cssPrefix + "-transition-timing-function", "linear"), a.css(s.animProp, o), a.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                        a.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), w(n.resetValue, "reset", 0), B()
                    }))
                } else {
                    var r = {};
                    r[s.animProp] = e, "slide" == t ? a.animate(r, i, s.settings.easing, function () {
                        F()
                    }) : "reset" == t ? a.css(s.animProp, e) : "ticker" == t && a.animate(r, speed, "linear", function () {
                        w(n.resetValue, "reset", 0), B()
                    })
                }
            },
            x = function () {
                for (var t = "", i = v(), n = 0; i > n; n++) {
                    var o = "";
                    s.settings.buildPager && e.isFunction(s.settings.buildPager) ? (o = s.settings.buildPager(n), s.pagerEl.addClass("bx-custom-pager")) : (o = n + 1, s.pagerEl.addClass("bx-default-pager")), t += '<div class="bx-pager-item"><a href="" data-slide-index="' + n + '" class="bx-pager-link">' + o + "</a></div>"
                }
                s.pagerEl.html(t)
            },
            S = function () {
                s.settings.pagerCustom ? s.pagerEl = e(s.settings.pagerCustom) : (s.pagerEl = e('<div class="bx-pager" />'), s.settings.pagerSelector ? e(s.settings.pagerSelector).html(s.pagerEl) : s.controls.el.addClass("bx-has-pager").append(s.pagerEl), x()), s.pagerEl.on("click", "a", M)
            },
            C = function () {
                s.controls.next = e('<a class="bx-next" href="">' + s.settings.nextText + "</a>"), s.controls.prev = e('<a class="bx-prev" href="">' + s.settings.prevText + "</a>"), s.controls.next.bind("click", j), s.controls.prev.bind("click", _), s.settings.nextSelector && e(s.settings.nextSelector).append(s.controls.next),
                s.settings.prevSelector && e(s.settings.prevSelector).append(s.controls.prev), s.settings.nextSelector || s.settings.prevSelector || (s.controls.directionEl = e('<div class="bx-controls-direction" />'), s.controls.directionEl.append(s.controls.prev).append(s.controls.next), s.controls.el.addClass("bx-has-controls-direction").append(s.controls.directionEl))
            },
            T = function () {
                s.controls.start = e('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + s.settings.startText + "</a></div>"), s.controls.stop = e('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + s.settings.stopText + "</a></div>"), s.controls.autoEl = e('<div class="bx-controls-auto" />'), s.controls.autoEl.on("click", ".bx-start", E), s.controls.autoEl.on("click", ".bx-stop", I), s.settings.autoControlsCombine ? s.controls.autoEl.append(s.controls.start) : s.controls.autoEl.append(s.controls.start).append(s.controls.stop), s.settings.autoControlsSelector ? e(s.settings.autoControlsSelector).html(s.controls.autoEl) : s.controls.el.addClass("bx-has-controls-auto").append(s.controls.autoEl), L(s.settings.autoStart ? "stop" : "start")
            },
            k = function () {
                s.children.each(function () {
                    var t = e(this).find("img:first").attr("title");
                    void 0 != t && ("" + t).length && e(this).append('<div class="bx-caption"><span>' + t + "</span></div>")
                })
            },
            j = function (e) {
                s.settings.auto && a.stopAuto(), a.goToNextSlide(), e.preventDefault()
            },
            _ = function (e) {
                s.settings.auto && a.stopAuto(), a.goToPrevSlide(), e.preventDefault()
            },
            E = function (e) {
                a.startAuto(), e.preventDefault()
            },
            I = function (e) {
                a.stopAuto(), e.preventDefault()
            },
            M = function (t) {
                s.settings.auto && a.stopAuto();
                var i = e(t.currentTarget),
                    n = parseInt(i.attr("data-slide-index"));
                n != s.active.index && a.goToSlide(n), t.preventDefault()
            },
            P = function (t) {
                var i = s.children.length;
                return "short" == s.settings.pagerType ? (s.settings.maxSlides > 1 && (i = Math.ceil(s.children.length / s.settings.maxSlides)), void s.pagerEl.html(t + 1 + s.settings.pagerShortSeparator + i)) : (s.pagerEl.find("a").removeClass("active"), void s.pagerEl.each(function (i, n) {
                    e(n).find("a").eq(t).addClass("active")
                }))
            },
            F = function () {
                if (s.settings.infiniteLoop) {
                    var e = "";
                    0 == s.active.index ? e = s.children.eq(0).position() : s.active.index == v() - 1 && s.carousel ? e = s.children.eq((v() - 1) * y()).position() : s.active.index == s.children.length - 1 && (e = s.children.eq(s.children.length - 1).position()), e && ("horizontal" == s.settings.mode ? w(-e.left, "reset", 0) : "vertical" == s.settings.mode && w(-e.top, "reset", 0))
                }
                s.working = !1, s.settings.onSlideAfter(s.children.eq(s.active.index), s.oldIndex, s.active.index)
            },
            L = function (e) {
                s.settings.autoControlsCombine ? s.controls.autoEl.html(s.controls[e]) : (s.controls.autoEl.find("a").removeClass("active"), s.controls.autoEl.find("a:not(.bx-" + e + ")").addClass("active"))
            },
            A = function () {
                1 == v() ? (s.controls.prev.addClass("disabled"), s.controls.next.addClass("disabled")) : !s.settings.infiniteLoop && s.settings.hideControlOnEnd && (0 == s.active.index ? (s.controls.prev.addClass("disabled"), s.controls.next.removeClass("disabled")) : s.active.index == v() - 1 ? (s.controls.next.addClass("disabled"), s.controls.prev.removeClass("disabled")) : (s.controls.prev.removeClass("disabled"), s.controls.next.removeClass("disabled")))
            },
            D = function () {
                s.settings.autoDelay > 0 ? setTimeout(a.startAuto, s.settings.autoDelay) : a.startAuto(), s.settings.autoHover && a.hover(function () {
                    s.interval && (a.stopAuto(!0), s.autoPaused = !0)
                }, function () {
                    s.autoPaused && (a.startAuto(!0), s.autoPaused = null)
                })
            },
            z = function () {
                var t = 0;
                if ("next" == s.settings.autoDirection) a.append(s.children.clone().addClass("bx-clone"));
                else {
                    a.prepend(s.children.clone().addClass("bx-clone"));
                    var i = s.children.first().position();
                    t = "horizontal" == s.settings.mode ? -i.left : -i.top
                }
                w(t, "reset", 0), s.settings.pager = !1, s.settings.controls = !1, s.settings.autoControls = !1, s.settings.tickerHover && !s.usingCSS && s.viewport.hover(function () {
                    a.stop()
                }, function () {
                    var t = 0;
                    s.children.each(function () {
                        t += "horizontal" == s.settings.mode ? e(this).outerWidth(!0) : e(this).outerHeight(!0)
                    });
                    var i = s.settings.speed / t,
                        n = "horizontal" == s.settings.mode ? "left" : "top",
                        o = i * (t - Math.abs(parseInt(a.css(n))));
                    B(o)
                }), B()
            },
            B = function (e) {
                speed = e ? e : s.settings.speed;
                var t = {
                        left: 0,
                        top: 0
                    },
                    i = {
                        left: 0,
                        top: 0
                    };
                "next" == s.settings.autoDirection ? t = a.find(".bx-clone").first().position() : i = s.children.first().position();
                var n = "horizontal" == s.settings.mode ? -t.left : -t.top,
                    o = "horizontal" == s.settings.mode ? -i.left : -i.top,
                    r = {
                        resetValue: o
                    };
                w(n, "ticker", speed, r)
            },
            W = function () {
                s.touch = {
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    }
                }, s.viewport.bind("touchstart", O)
            },
            O = function (e) {
                if (s.working) e.preventDefault();
                else {
                    s.touch.originalPos = a.position();
                    var t = e.originalEvent;
                    s.touch.start.x = t.changedTouches[0].pageX, s.touch.start.y = t.changedTouches[0].pageY, s.viewport.bind("touchmove", R), s.viewport.bind("touchend", H)
                }
            },
            R = function (e) {
                var t = e.originalEvent,
                    i = Math.abs(t.changedTouches[0].pageX - s.touch.start.x),
                    n = Math.abs(t.changedTouches[0].pageY - s.touch.start.y);
                if (3 * i > n && s.settings.preventDefaultSwipeX ? e.preventDefault() : 3 * n > i && s.settings.preventDefaultSwipeY && e.preventDefault(), "fade" != s.settings.mode && s.settings.oneToOneTouch) {
                    var o = 0;
                    if ("horizontal" == s.settings.mode) {
                        var a = t.changedTouches[0].pageX - s.touch.start.x;
                        o = s.touch.originalPos.left + a
                    } else {
                        var a = t.changedTouches[0].pageY - s.touch.start.y;
                        o = s.touch.originalPos.top + a
                    }
                    w(o, "reset", 0)
                }
            },
            H = function (e) {
                s.viewport.unbind("touchmove", R);
                var t = e.originalEvent,
                    i = 0;
                if (s.touch.end.x = t.changedTouches[0].pageX, s.touch.end.y = t.changedTouches[0].pageY, "fade" == s.settings.mode) {
                    var n = Math.abs(s.touch.start.x - s.touch.end.x);
                    n >= s.settings.swipeThreshold && (s.touch.start.x > s.touch.end.x ? a.goToNextSlide() : a.goToPrevSlide(), a.stopAuto())
                } else {
                    var n = 0;
                    "horizontal" == s.settings.mode ? (n = s.touch.end.x - s.touch.start.x, i = s.touch.originalPos.left) : (n = s.touch.end.y - s.touch.start.y, i = s.touch.originalPos.top), !s.settings.infiniteLoop && (0 == s.active.index && n > 0 || s.active.last && 0 > n) ? w(i, "reset", 200) : Math.abs(n) >= s.settings.swipeThreshold ? (0 > n ? a.goToNextSlide() : a.goToPrevSlide(), a.stopAuto()) : w(i, "reset", 200)
                }
                s.viewport.unbind("touchend", H)
            },
            N = function () {
                var t = e(window).width(),
                    i = e(window).height();
                (r != t || l != i) && (r = t, l = i, a.redrawSlider(), s.settings.onSliderResize.call(a, s.active.index))
            };
        return a.goToSlide = function (t, i) {
            if (!s.working && s.active.index != t)
                if (s.working = !0, s.oldIndex = s.active.index, s.active.index = 0 > t ? v() - 1 : t >= v() ? 0 : t, s.settings.onSlideBefore(s.children.eq(s.active.index), s.oldIndex, s.active.index), "next" == i ? s.settings.onSlideNext(s.children.eq(s.active.index), s.oldIndex, s.active.index) : "prev" == i && s.settings.onSlidePrev(s.children.eq(s.active.index), s.oldIndex, s.active.index), s.active.last = s.active.index >= v() - 1, s.settings.pager && P(s.active.index), s.settings.controls && A(), "fade" == s.settings.mode) s.settings.adaptiveHeight && s.viewport.height() != p() && s.viewport.animate({
                    height: p()
                }, s.settings.adaptiveHeightSpeed), s.children.filter(":visible").fadeOut(s.settings.speed).css({
                    zIndex: 0
                }), s.children.eq(s.active.index).css("zIndex", s.settings.slideZIndex + 1).fadeIn(s.settings.speed, function () {
                    e(this).css("zIndex", s.settings.slideZIndex), F()
                });
                else {
                    s.settings.adaptiveHeight && s.viewport.height() != p() && s.viewport.animate({
                        height: p()
                    }, s.settings.adaptiveHeightSpeed);
                    var n = 0,
                        o = {
                            left: 0,
                            top: 0
                        };
                    if (!s.settings.infiniteLoop && s.carousel && s.active.last)
                        if ("horizontal" == s.settings.mode) {
                            var r = s.children.eq(s.children.length - 1);
                            o = r.position(), n = s.viewport.width() - r.outerWidth()
                        } else {
                            var l = s.children.length - s.settings.minSlides;
                            o = s.children.eq(l).position()
                        }
                    else if (s.carousel && s.active.last && "prev" == i) {
                        var d = 1 == s.settings.moveSlides ? s.settings.maxSlides - y() : (v() - 1) * y() - (s.children.length - s.settings.maxSlides),
                            r = a.children(".bx-clone").eq(d);
                        o = r.position()
                    } else if ("next" == i && 0 == s.active.index) o = a.find("> .bx-clone").eq(s.settings.maxSlides).position(), s.active.last = !1;
                    else if (t >= 0) {
                        var c = t * y();
                        o = s.children.eq(c).position()
                    }
                    if ("undefined" != typeof o) {
                        var u = "horizontal" == s.settings.mode ? -(o.left - n) : -o.top;
                        w(u, "slide", s.settings.speed)
                    }
                }
        }, a.goToNextSlide = function () {
            if (s.settings.infiniteLoop || !s.active.last) {
                var e = parseInt(s.active.index) + 1;
                a.goToSlide(e, "next")
            }
        }, a.goToPrevSlide = function () {
            if (s.settings.infiniteLoop || 0 != s.active.index) {
                var e = parseInt(s.active.index) - 1;
                a.goToSlide(e, "prev")
            }
        }, a.startAuto = function (e) {
            s.interval || (s.interval = setInterval(function () {
                "next" == s.settings.autoDirection ? a.goToNextSlide() : a.goToPrevSlide()
            }, s.settings.pause), s.settings.autoControls && 1 != e && L("stop"))
        }, a.stopAuto = function (e) {
            s.interval && (clearInterval(s.interval), s.interval = null, s.settings.autoControls && 1 != e && L("start"))
        }, a.getCurrentSlide = function () {
            return s.active.index
        }, a.getCurrentSlideElement = function () {
            return s.children.eq(s.active.index)
        }, a.getSlideCount = function () {
            return s.children.length
        }, a.redrawSlider = function () {
            s.children.add(a.find(".bx-clone")).outerWidth(f()), s.viewport.css("height", p()), s.settings.ticker || b(), s.active.last && (s.active.index = v() - 1), s.active.index >= v() && (s.active.last = !0), s.settings.pager && !s.settings.pagerCustom && (x(), P(s.active.index))
        }, a.destroySlider = function () {
            s.initialized && (s.initialized = !1, e(".bx-clone", this).remove(), s.children.each(function () {
                void 0 != e(this).data("origStyle") ? e(this).attr("style", e(this).data("origStyle")) : e(this).removeAttr("style")
            }), void 0 != e(this).data("origStyle") ? this.attr("style", e(this).data("origStyle")) : e(this).removeAttr("style"), e(this).unwrap().unwrap(), s.controls.el && s.controls.el.remove(), s.controls.next && s.controls.next.remove(), s.controls.prev && s.controls.prev.remove(), s.pagerEl && s.settings.controls && s.pagerEl.remove(), e(".bx-caption", this).remove(), s.controls.autoEl && s.controls.autoEl.remove(), clearInterval(s.interval), s.settings.responsive && e(window).unbind("resize", N))
        }, a.reloadSlider = function (e) {
            void 0 != e && (o = e), a.destroySlider(), d()
        }, d(), this
    }
}(jQuery), !function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
}(function (e) {
    function t(t) {
        var a = t || window.event,
            r = l.call(arguments, 1),
            d = 0,
            u = 0,
            h = 0,
            p = 0,
            m = 0,
            f = 0;
        if (t = e.event.fix(a), t.type = "mousewheel", "detail" in a && (h = -1 * a.detail), "wheelDelta" in a && (h = a.wheelDelta), "wheelDeltaY" in a && (h = a.wheelDeltaY), "wheelDeltaX" in a && (u = -1 * a.wheelDeltaX), "axis" in a && a.axis === a.HORIZONTAL_AXIS && (u = -1 * h, h = 0), d = 0 === h ? u : h, "deltaY" in a && (h = -1 * a.deltaY, d = h), "deltaX" in a && (u = a.deltaX, 0 === h && (d = -1 * u)), 0 !== h || 0 !== u) {
            if (1 === a.deltaMode) {
                var g = e.data(this, "mousewheel-line-height");
                d *= g, h *= g, u *= g
            } else if (2 === a.deltaMode) {
                var v = e.data(this, "mousewheel-page-height");
                d *= v, h *= v, u *= v
            }
            if (p = Math.max(Math.abs(h), Math.abs(u)), (!s || s > p) && (s = p, n(a, p) && (s /= 40)), n(a, p) && (d /= 40, u /= 40, h /= 40), d = Math[d >= 1 ? "floor" : "ceil"](d / s), u = Math[u >= 1 ? "floor" : "ceil"](u / s), h = Math[h >= 1 ? "floor" : "ceil"](h / s), c.settings.normalizeOffset && this.getBoundingClientRect) {
                var y = this.getBoundingClientRect();
                m = t.clientX - y.left, f = t.clientY - y.top
            }
            return t.deltaX = u, t.deltaY = h, t.deltaFactor = s, t.offsetX = m, t.offsetY = f, t.deltaMode = 0, r.unshift(t, d, u, h), o && clearTimeout(o), o = setTimeout(i, 200), (e.event.dispatch || e.event.handle).apply(this, r)
        }
    }

    function i() {
        s = null
    }

    function n(e, t) {
        return c.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 === 0
    }

    var o, s, a = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        r = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        l = Array.prototype.slice;
    if (e.event.fixHooks)
        for (var d = a.length; d;) e.event.fixHooks[a[--d]] = e.event.mouseHooks;
    var c = e.event.special.mousewheel = {
        version: "3.1.12",
        setup: function () {
            if (this.addEventListener)
                for (var i = r.length; i;) this.addEventListener(r[--i], t, !1);
            else this.onmousewheel = t;
            e.data(this, "mousewheel-line-height", c.getLineHeight(this)), e.data(this, "mousewheel-page-height", c.getPageHeight(this))
        },
        teardown: function () {
            if (this.removeEventListener)
                for (var i = r.length; i;) this.removeEventListener(r[--i], t, !1);
            else this.onmousewheel = null;
            e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function (t) {
            var i = e(t),
                n = i["offsetParent" in e.fn ? "offsetParent" : "parent"]();
            return n.length || (n = e("body")), parseInt(n.css("fontSize"), 10) || parseInt(i.css("fontSize"), 10) || 16
        },
        getPageHeight: function (t) {
            return e(t).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    e.fn.extend({
        mousewheel: function (e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function (e) {
            return this.unbind("mousewheel", e)
        }
    })
}), !function (e) {
    "undefined" != typeof module && module.exports ? module.exports = e : e(jQuery, window, document)
}(function (e) {
    !function (t) {
        var i = "function" == typeof define && define.amd,
            n = "undefined" != typeof module && module.exports,
            o = "https:" == document.location.protocol ? "https:" : "http:",
            s = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js";
        i || (n ? require("jquery-mousewheel")(e) : e.event.special.mousewheel || e("head").append(decodeURI("%3Cscript src=" + o + "//" + s + "%3E%3C/script%3E"))), t()
    }(function () {
        var t, i = "mCustomScrollbar",
            n = "mCS",
            o = ".mCustomScrollbar",
            s = {
                setTop: 0,
                setLeft: 0,
                axis: "y",
                scrollbarPosition: "inside",
                scrollInertia: 950,
                autoDraggerLength: !0,
                alwaysShowScrollbar: 0,
                snapOffset: 0,
                mouseWheel: {
                    enable: !0,
                    scrollAmount: "auto",
                    axis: "y",
                    deltaFactor: "auto",
                    disableOver: ["select", "option", "keygen", "datalist", "textarea"]
                },
                scrollButtons: {
                    scrollType: "stepless",
                    scrollAmount: "auto"
                },
                keyboard: {
                    enable: !0,
                    scrollType: "stepless",
                    scrollAmount: "auto"
                },
                contentTouchScroll: 25,
                advanced: {
                    autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                    updateOnContentResize: !0,
                    updateOnImageLoad: "auto",
                    autoUpdateTimeout: 60
                },
                theme: "light",
                callbacks: {
                    onTotalScrollOffset: 0,
                    onTotalScrollBackOffset: 0,
                    alwaysTriggerOffsets: !0
                }
            },
            a = 0,
            r = {},
            l = window.attachEvent && !window.addEventListener ? 1 : 0,
            d = !1,
            c = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
            u = {
                init: function (t) {
                    var t = e.extend(!0, {}, s, t),
                        i = h.call(this);
                    if (t.live) {
                        var l = t.liveSelector || this.selector || o,
                            d = e(l);
                        if ("off" === t.live) return void m(l);
                        r[l] = setTimeout(function () {
                            d.mCustomScrollbar(t), "once" === t.live && d.length && m(l)
                        }, 500)
                    } else m(l);
                    return t.setWidth = t.set_width ? t.set_width : t.setWidth, t.setHeight = t.set_height ? t.set_height : t.setHeight, t.axis = t.horizontalScroll ? "x" : f(t.axis), t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia, "object" != typeof t.mouseWheel && 1 == t.mouseWheel && (t.mouseWheel = {
                        enable: !0,
                        scrollAmount: "auto",
                        axis: "y",
                        preventDefault: !1,
                        deltaFactor: "auto",
                        normalizeDelta: !1,
                        invert: !1
                    }), t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount, t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta : t.mouseWheel.normalizeDelta, t.scrollButtons.scrollType = g(t.scrollButtons.scrollType), p(t), e(i).each(function () {
                        var i = e(this);
                        if (!i.data(n)) {
                            i.data(n, {
                                idx: ++a,
                                opt: t,
                                scrollRatio: {
                                    y: null,
                                    x: null
                                },
                                overflowed: null,
                                contentReset: {
                                    y: null,
                                    x: null
                                },
                                bindEvents: !1,
                                tweenRunning: !1,
                                sequential: {},
                                langDir: i.css("direction"),
                                cbOffsets: null,
                                trigger: null,
                                poll: {
                                    size: {
                                        o: 0,
                                        n: 0
                                    },
                                    img: {
                                        o: 0,
                                        n: 0
                                    },
                                    change: {
                                        o: 0,
                                        n: 0
                                    }
                                }
                            });
                            var o = i.data(n),
                                s = o.opt,
                                r = i.data("mcs-axis"),
                                l = i.data("mcs-scrollbar-position"),
                                d = i.data("mcs-theme");
                            r && (s.axis = r), l && (s.scrollbarPosition = l), d && (s.theme = d, p(s)), v.call(this), o && s.callbacks.onCreate && "function" == typeof s.callbacks.onCreate && s.callbacks.onCreate.call(this), e("#mCSB_" + o.idx + "_container img:not(." + c[2] + ")").addClass(c[2]), u.update.call(null, i)
                        }
                    })
                },
                update: function (t, i) {
                    var o = t || h.call(this);
                    return e(o).each(function () {
                        var t = e(this);
                        if (t.data(n)) {
                            var o = t.data(n),
                                s = o.opt,
                                a = e("#mCSB_" + o.idx + "_container"),
                                r = e("#mCSB_" + o.idx),
                                l = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];
                            if (!a.length) return;
                            o.tweenRunning && q(t), i && o && s.callbacks.onBeforeUpdate && "function" == typeof s.callbacks.onBeforeUpdate && s.callbacks.onBeforeUpdate.call(this), t.hasClass(c[3]) && t.removeClass(c[3]), t.hasClass(c[4]) && t.removeClass(c[4]), r.height() !== t.height() && r.css("max-height", t.height()), b.call(this), "y" === s.axis || s.advanced.autoExpandHorizontalScroll || a.css("width", y(a)), o.overflowed = T.call(this), E.call(this), s.autoDraggerLength && x.call(this), S.call(this), j.call(this);
                            var d = [Math.abs(a[0].offsetTop), Math.abs(a[0].offsetLeft)];
                            "x" !== s.axis && (o.overflowed[0] ? l[0].height() > l[0].parent().height() ? k.call(this) : (Y(t, d[0].toString(), {
                                dir: "y",
                                dur: 0,
                                overwrite: "none"
                            }), o.contentReset.y = null) : (k.call(this), "y" === s.axis ? _.call(this) : "yx" === s.axis && o.overflowed[1] && Y(t, d[1].toString(), {
                                dir: "x",
                                dur: 0,
                                overwrite: "none"
                            }))), "y" !== s.axis && (o.overflowed[1] ? l[1].width() > l[1].parent().width() ? k.call(this) : (Y(t, d[1].toString(), {
                                dir: "x",
                                dur: 0,
                                overwrite: "none"
                            }), o.contentReset.x = null) : (k.call(this), "x" === s.axis ? _.call(this) : "yx" === s.axis && o.overflowed[0] && Y(t, d[0].toString(), {
                                dir: "y",
                                dur: 0,
                                overwrite: "none"
                            }))), i && o && (2 === i && s.callbacks.onImageLoad && "function" == typeof s.callbacks.onImageLoad ? s.callbacks.onImageLoad.call(this) : 3 === i && s.callbacks.onSelectorChange && "function" == typeof s.callbacks.onSelectorChange ? s.callbacks.onSelectorChange.call(this) : s.callbacks.onUpdate && "function" == typeof s.callbacks.onUpdate && s.callbacks.onUpdate.call(this)), V.call(this)
                        }
                    })
                },
                scrollTo: function (t, i) {
                    if ("undefined" != typeof t && null != t) {
                        var o = h.call(this);
                        return e(o).each(function () {
                            var o = e(this);
                            if (o.data(n)) {
                                var s = o.data(n),
                                    a = s.opt,
                                    r = {
                                        trigger: "external",
                                        scrollInertia: a.scrollInertia,
                                        scrollEasing: "mcsEaseInOut",
                                        moveDragger: !1,
                                        timeout: 60,
                                        callbacks: !0,
                                        onStart: !0,
                                        onUpdate: !0,
                                        onComplete: !0
                                    },
                                    l = e.extend(!0, {}, r, i),
                                    d = N.call(this, t),
                                    c = l.scrollInertia > 0 && l.scrollInertia < 17 ? 17 : l.scrollInertia;
                                d[0] = $.call(this, d[0], "y"), d[1] = $.call(this, d[1], "x"), l.moveDragger && (d[0] *= s.scrollRatio.y, d[1] *= s.scrollRatio.x), l.dur = c, setTimeout(function () {
                                    null !== d[0] && "undefined" != typeof d[0] && "x" !== a.axis && s.overflowed[0] && (l.dir = "y", l.overwrite = "all", Y(o, d[0].toString(), l)), null !== d[1] && "undefined" != typeof d[1] && "y" !== a.axis && s.overflowed[1] && (l.dir = "x", l.overwrite = "none", Y(o, d[1].toString(), l))
                                }, l.timeout)
                            }
                        })
                    }
                },
                stop: function () {
                    var t = h.call(this);
                    return e(t).each(function () {
                        var t = e(this);
                        t.data(n) && q(t)
                    })
                },
                disable: function (t) {
                    var i = h.call(this);
                    return e(i).each(function () {
                        var i = e(this);
                        i.data(n) && (i.data(n), V.call(this, "remove"), _.call(this), t && k.call(this), E.call(this, !0), i.addClass(c[3]))
                    })
                },
                destroy: function () {
                    var t = h.call(this);
                    return e(t).each(function () {
                        var o = e(this);
                        if (o.data(n)) {
                            var s = o.data(n),
                                a = s.opt,
                                r = e("#mCSB_" + s.idx),
                                l = e("#mCSB_" + s.idx + "_container"),
                                d = e(".mCSB_" + s.idx + "_scrollbar");
                            a.live && m(a.liveSelector || e(t).selector), V.call(this, "remove"), _.call(this), k.call(this), o.removeData(n), G(this, "mcs"), d.remove(), l.find("img." + c[2]).removeClass(c[2]), r.replaceWith(l.contents()), o.removeClass(i + " _" + n + "_" + s.idx + " " + c[6] + " " + c[7] + " " + c[5] + " " + c[3]).addClass(c[4])
                        }
                    })
                }
            },
            h = function () {
                return "object" != typeof e(this) || e(this).length < 1 ? o : this
            },
            p = function (t) {
                var i = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
                    n = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
                    o = ["minimal", "minimal-dark"],
                    s = ["minimal", "minimal-dark"],
                    a = ["minimal", "minimal-dark"];
                t.autoDraggerLength = e.inArray(t.theme, i) > -1 ? !1 : t.autoDraggerLength, t.autoExpandScrollbar = e.inArray(t.theme, n) > -1 ? !1 : t.autoExpandScrollbar, t.scrollButtons.enable = e.inArray(t.theme, o) > -1 ? !1 : t.scrollButtons.enable, t.autoHideScrollbar = e.inArray(t.theme, s) > -1 ? !0 : t.autoHideScrollbar, t.scrollbarPosition = e.inArray(t.theme, a) > -1 ? "outside" : t.scrollbarPosition
            },
            m = function (e) {
                r[e] && (clearTimeout(r[e]), G(r, e))
            },
            f = function (e) {
                return "yx" === e || "xy" === e || "auto" === e ? "yx" : "x" === e || "horizontal" === e ? "x" : "y"
            },
            g = function (e) {
                return "stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" : "stepless"
            },
            v = function () {
                var t = e(this),
                    o = t.data(n),
                    s = o.opt,
                    a = s.autoExpandScrollbar ? " " + c[1] + "_expand" : "",
                    r = ["<div id='mCSB_" + o.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + o.idx + "_scrollbar mCS-" + s.theme + " mCSB_scrollTools_vertical" + a + "'><div class='" + c[12] + "'><div id='mCSB_" + o.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + o.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + o.idx + "_scrollbar mCS-" + s.theme + " mCSB_scrollTools_horizontal" + a + "'><div class='" + c[12] + "'><div id='mCSB_" + o.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
                    l = "yx" === s.axis ? "mCSB_vertical_horizontal" : "x" === s.axis ? "mCSB_horizontal" : "mCSB_vertical",
                    d = "yx" === s.axis ? r[0] + r[1] : "x" === s.axis ? r[1] : r[0],
                    u = "yx" === s.axis ? "<div id='mCSB_" + o.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
                    h = s.autoHideScrollbar ? " " + c[6] : "",
                    p = "x" !== s.axis && "rtl" === o.langDir ? " " + c[7] : "";
                s.setWidth && t.css("width", s.setWidth), s.setHeight && t.css("height", s.setHeight), s.setLeft = "y" !== s.axis && "rtl" === o.langDir ? "989999px" : s.setLeft, t.addClass(i + " _" + n + "_" + o.idx + h + p).wrapInner("<div id='mCSB_" + o.idx + "' class='mCustomScrollBox mCS-" + s.theme + " " + l + "'><div id='mCSB_" + o.idx + "_container' class='mCSB_container' style='position:relative; top:" + s.setTop + "; left:" + s.setLeft + ";' dir=" + o.langDir + " /></div>");
                var m = e("#mCSB_" + o.idx),
                    f = e("#mCSB_" + o.idx + "_container");
                "y" === s.axis || s.advanced.autoExpandHorizontalScroll || f.css("width", y(f)), "outside" === s.scrollbarPosition ? ("static" === t.css("position") && t.css("position", "relative"), t.css("overflow", "visible"), m.addClass("mCSB_outside").after(d)) : (m.addClass("mCSB_inside").append(d), f.wrap(u)), w.call(this);
                var g = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];
                g[0].css("min-height", g[0].height()), g[1].css("min-width", g[1].width())
            },
            y = function (t) {
                var i = [t[0].scrollWidth, Math.max.apply(Math, t.children().map(function () {
                        return e(this).outerWidth(!0)
                    }).get())],
                    n = t.parent().width();
                return i[0] > n ? i[0] : i[1] > n ? i[1] : "100%"
            },
            b = function () {
                var t = e(this),
                    i = t.data(n),
                    o = i.opt,
                    s = e("#mCSB_" + i.idx + "_container");
                if (o.advanced.autoExpandHorizontalScroll && "y" !== o.axis) {
                    s.css({
                        width: "auto",
                        "min-width": 0,
                        "overflow-x": "scroll"
                    });
                    var a = Math.ceil(s[0].scrollWidth);
                    3 === o.advanced.autoExpandHorizontalScroll || 2 !== o.advanced.autoExpandHorizontalScroll && a > s.parent().width() ? s.css({
                        width: a,
                        "min-width": "100%",
                        "overflow-x": "inherit"
                    }) : s.css({
                        "overflow-x": "inherit",
                        position: "absolute"
                    }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                        width: Math.ceil(s[0].getBoundingClientRect().right + .4) - Math.floor(s[0].getBoundingClientRect().left),
                        "min-width": "100%",
                        position: "relative"
                    }).unwrap()
                }
            },
            w = function () {
                var t = e(this),
                    i = t.data(n),
                    o = i.opt,
                    s = e(".mCSB_" + i.idx + "_scrollbar:first"),
                    a = ee(o.scrollButtons.tabindex) ? "tabindex='" + o.scrollButtons.tabindex + "'" : "",
                    r = ["<a href='#' class='" + c[13] + "' oncontextmenu='return false;' " + a + " />", "<a href='#' class='" + c[14] + "' oncontextmenu='return false;' " + a + " />", "<a href='#' class='" + c[15] + "' oncontextmenu='return false;' " + a + " />", "<a href='#' class='" + c[16] + "' oncontextmenu='return false;' " + a + " />"],
                    l = ["x" === o.axis ? r[2] : r[0], "x" === o.axis ? r[3] : r[1], r[2], r[3]];
                o.scrollButtons.enable && s.prepend(l[0]).append(l[1]).next(".mCSB_scrollTools").prepend(l[2]).append(l[3])
            },
            x = function () {
                var t = e(this),
                    i = t.data(n),
                    o = e("#mCSB_" + i.idx),
                    s = e("#mCSB_" + i.idx + "_container"),
                    a = [e("#mCSB_" + i.idx + "_dragger_vertical"), e("#mCSB_" + i.idx + "_dragger_horizontal")],
                    r = [o.height() / s.outerHeight(!1), o.width() / s.outerWidth(!1)],
                    d = [parseInt(a[0].css("min-height")), Math.round(r[0] * a[0].parent().height()), parseInt(a[1].css("min-width")), Math.round(r[1] * a[1].parent().width())],
                    c = l && d[1] < d[0] ? d[0] : d[1],
                    u = l && d[3] < d[2] ? d[2] : d[3];
                a[0].css({
                    height: c,
                    "max-height": a[0].parent().height() - 10
                }).find(".mCSB_dragger_bar").css({
                    "line-height": d[0] + "px"
                }), a[1].css({
                    width: u,
                    "max-width": a[1].parent().width() - 10
                })
            },
            S = function () {
                var t = e(this),
                    i = t.data(n),
                    o = e("#mCSB_" + i.idx),
                    s = e("#mCSB_" + i.idx + "_container"),
                    a = [e("#mCSB_" + i.idx + "_dragger_vertical"), e("#mCSB_" + i.idx + "_dragger_horizontal")],
                    r = [s.outerHeight(!1) - o.height(), s.outerWidth(!1) - o.width()],
                    l = [r[0] / (a[0].parent().height() - a[0].height()), r[1] / (a[1].parent().width() - a[1].width())];
                i.scrollRatio = {
                    y: l[0],
                    x: l[1]
                }
            },
            C = function (e, t, i) {
                var n = i ? c[0] + "_expanded" : "",
                    o = e.closest(".mCSB_scrollTools");
                "active" === t ? (e.toggleClass(c[0] + " " + n), o.toggleClass(c[1]), e[0]._draggable = e[0]._draggable ? 0 : 1) : e[0]._draggable || ("hide" === t ? (e.removeClass(c[0]), o.removeClass(c[1])) : (e.addClass(c[0]), o.addClass(c[1])))
            },
            T = function () {
                var t = e(this),
                    i = t.data(n),
                    o = e("#mCSB_" + i.idx),
                    s = e("#mCSB_" + i.idx + "_container"),
                    a = null == i.overflowed ? s.height() : s.outerHeight(!1),
                    r = null == i.overflowed ? s.width() : s.outerWidth(!1),
                    l = s[0].scrollHeight,
                    d = s[0].scrollWidth;
                return l > a && (a = l), d > r && (r = d), [a > o.height(), r > o.width()]
            },
            k = function () {
                var t = e(this),
                    i = t.data(n),
                    o = i.opt,
                    s = e("#mCSB_" + i.idx),
                    a = e("#mCSB_" + i.idx + "_container"),
                    r = [e("#mCSB_" + i.idx + "_dragger_vertical"), e("#mCSB_" + i.idx + "_dragger_horizontal")];
                if (q(t), ("x" !== o.axis && !i.overflowed[0] || "y" === o.axis && i.overflowed[0]) && (r[0].add(a).css("top", 0), Y(t, "_resetY")), "y" !== o.axis && !i.overflowed[1] || "x" === o.axis && i.overflowed[1]) {
                    var l = dx = 0;
                    "rtl" === i.langDir && (l = s.width() - a.outerWidth(!1), dx = Math.abs(l / i.scrollRatio.x)), a.css("left", l), r[1].css("left", dx), Y(t, "_resetX")
                }
            },
            j = function () {
                function t() {
                    a = setTimeout(function () {
                        e.event.special.mousewheel ? (clearTimeout(a), L.call(i[0])) : t()
                    }, 100)
                }

                var i = e(this),
                    o = i.data(n),
                    s = o.opt;
                if (!o.bindEvents) {
                    if (M.call(this), s.contentTouchScroll && P.call(this), F.call(this), s.mouseWheel.enable) {
                        var a;
                        t()
                    }
                    z.call(this), W.call(this), s.advanced.autoScrollOnFocus && B.call(this), s.scrollButtons.enable && O.call(this), s.keyboard.enable && R.call(this), o.bindEvents = !0
                }
            },
            _ = function () {
                var t = e(this),
                    i = t.data(n),
                    o = i.opt,
                    s = n + "_" + i.idx,
                    a = ".mCSB_" + i.idx + "_scrollbar",
                    r = e("#mCSB_" + i.idx + ",#mCSB_" + i.idx + "_container,#mCSB_" + i.idx + "_container_wrapper," + a + " ." + c[12] + ",#mCSB_" + i.idx + "_dragger_vertical,#mCSB_" + i.idx + "_dragger_horizontal," + a + ">a"),
                    l = e("#mCSB_" + i.idx + "_container");
                o.advanced.releaseDraggableSelectors && r.add(e(o.advanced.releaseDraggableSelectors)), i.bindEvents && (e(document).unbind("." + s), r.each(function () {
                    e(this).unbind("." + s)
                }), clearTimeout(t[0]._focusTimeout), G(t[0], "_focusTimeout"), clearTimeout(i.sequential.step), G(i.sequential, "step"), clearTimeout(l[0].onCompleteTimeout), G(l[0], "onCompleteTimeout"), i.bindEvents = !1)
            },
            E = function (t) {
                var i = e(this),
                    o = i.data(n),
                    s = o.opt,
                    a = e("#mCSB_" + o.idx + "_container_wrapper"),
                    r = a.length ? a : e("#mCSB_" + o.idx + "_container"),
                    l = [e("#mCSB_" + o.idx + "_scrollbar_vertical"), e("#mCSB_" + o.idx + "_scrollbar_horizontal")],
                    d = [l[0].find(".mCSB_dragger"), l[1].find(".mCSB_dragger")];
                "x" !== s.axis && (o.overflowed[0] && !t ? (l[0].add(d[0]).add(l[0].children("a")).css("display", "block"), r.removeClass(c[8] + " " + c[10])) : (s.alwaysShowScrollbar ? (2 !== s.alwaysShowScrollbar && d[0].css("display", "none"), r.removeClass(c[10])) : (l[0].css("display", "none"), r.addClass(c[10])), r.addClass(c[8]))), "y" !== s.axis && (o.overflowed[1] && !t ? (l[1].add(d[1]).add(l[1].children("a")).css("display", "block"), r.removeClass(c[9] + " " + c[11])) : (s.alwaysShowScrollbar ? (2 !== s.alwaysShowScrollbar && d[1].css("display", "none"), r.removeClass(c[11])) : (l[1].css("display", "none"), r.addClass(c[11])), r.addClass(c[9]))), o.overflowed[0] || o.overflowed[1] ? i.removeClass(c[5]) : i.addClass(c[5])
            },
            I = function (e) {
                var t = e.type;
                switch (t) {
                    case "pointerdown":
                    case "MSPointerDown":
                    case "pointermove":
                    case "MSPointerMove":
                    case "pointerup":
                    case "MSPointerUp":
                        return e.target.ownerDocument !== document ? [e.originalEvent.screenY, e.originalEvent.screenX, !1] : [e.originalEvent.pageY, e.originalEvent.pageX, !1];
                    case "touchstart":
                    case "touchmove":
                    case "touchend":
                        var i = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
                            n = e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
                        return e.target.ownerDocument !== document ? [i.screenY, i.screenX, n > 1] : [i.pageY, i.pageX, n > 1];
                    default:
                        return [e.pageY, e.pageX, !1]
                }
            },
            M = function () {
                function t(e) {
                    var t = m.find("iframe");
                    if (t.length) {
                        var i = e ? "auto" : "none";
                        t.css("pointer-events", i)
                    }
                }

                function i(e, t, i, n) {
                    if (m[0].idleTimer = u.scrollInertia < 233 ? 250 : 0, o.attr("id") === p[1]) var s = "x",
                        a = (o[0].offsetLeft - t + n) * c.scrollRatio.x;
                    else var s = "y",
                        a = (o[0].offsetTop - e + i) * c.scrollRatio.y;
                    Y(r, a.toString(), {
                        dir: s,
                        drag: !0
                    })
                }

                var o, s, a, r = e(this),
                    c = r.data(n),
                    u = c.opt,
                    h = n + "_" + c.idx,
                    p = ["mCSB_" + c.idx + "_dragger_vertical", "mCSB_" + c.idx + "_dragger_horizontal"],
                    m = e("#mCSB_" + c.idx + "_container"),
                    f = e("#" + p[0] + ",#" + p[1]),
                    g = u.advanced.releaseDraggableSelectors ? f.add(e(u.advanced.releaseDraggableSelectors)) : f;
                f.bind("mousedown." + h + " touchstart." + h + " pointerdown." + h + " MSPointerDown." + h, function (i) {
                    if (i.stopImmediatePropagation(), i.preventDefault(), K(i)) {
                        d = !0, l && (document.onselectstart = function () {
                            return !1
                        }), t(!1), q(r), o = e(this);
                        var n = o.offset(),
                            c = I(i)[0] - n.top,
                            h = I(i)[1] - n.left,
                            p = o.height() + n.top,
                            m = o.width() + n.left;
                        p > c && c > 0 && m > h && h > 0 && (s = c, a = h), C(o, "active", u.autoExpandScrollbar)
                    }
                }).bind("touchmove." + h, function (e) {
                    e.stopImmediatePropagation(), e.preventDefault();
                    var t = o.offset(),
                        n = I(e)[0] - t.top,
                        r = I(e)[1] - t.left;
                    i(s, a, n, r)
                }), e(document).bind("mousemove." + h + " pointermove." + h + " MSPointerMove." + h, function (e) {
                    if (o) {
                        var t = o.offset(),
                            n = I(e)[0] - t.top,
                            r = I(e)[1] - t.left;
                        if (s === n) return;
                        i(s, a, n, r)
                    }
                }).add(g).bind("mouseup." + h + " touchend." + h + " pointerup." + h + " MSPointerUp." + h, function (e) {
                    o && (C(o, "active", u.autoExpandScrollbar), o = null), d = !1, l && (document.onselectstart = null), t(!0)
                })
            },
            P = function () {
                function i(e) {
                    if (!J(e) || d || I(e)[2]) return void (t = 0);
                    t = 1, S = 0, C = 0, c = 1, T.removeClass("mCS_touch_action");
                    var i = M.offset();
                    u = I(e)[0] - i.top, h = I(e)[1] - i.left, B = [I(e)[0], I(e)[1]]
                }

                function o(e) {
                    if (J(e) && !d && !I(e)[2] && (e.stopImmediatePropagation(), (!C || S) && c)) {
                        g = Q();
                        var t = E.offset(),
                            i = I(e)[0] - t.top,
                            n = I(e)[1] - t.left,
                            o = "mcsLinearOut";
                        if (F.push(i), L.push(n), B[2] = Math.abs(I(e)[0] - B[0]), B[3] = Math.abs(I(e)[1] - B[1]), k.overflowed[0]) var s = P[0].parent().height() - P[0].height(),
                            a = u - i > 0 && i - u > -(s * k.scrollRatio.y) && (2 * B[3] < B[2] || "yx" === j.axis);
                        if (k.overflowed[1]) var r = P[1].parent().width() - P[1].width(),
                            p = h - n > 0 && n - h > -(r * k.scrollRatio.x) && (2 * B[2] < B[3] || "yx" === j.axis);
                        a || p ? (R || e.preventDefault(), S = 1) : (C = 1, T.addClass("mCS_touch_action")), R && e.preventDefault(), w = "yx" === j.axis ? [u - i, h - n] : "x" === j.axis ? [null, h - n] : [u - i, null], M[0].idleTimer = 250, k.overflowed[0] && l(w[0], D, o, "y", "all", !0), k.overflowed[1] && l(w[1], D, o, "x", z, !0)
                    }
                }

                function s(e) {
                    if (!J(e) || d || I(e)[2]) return void (t = 0);
                    t = 1, e.stopImmediatePropagation(), q(T), f = Q();
                    var i = E.offset();
                    p = I(e)[0] - i.top, m = I(e)[1] - i.left, F = [], L = []
                }

                function a(e) {
                    if (J(e) && !d && !I(e)[2]) {
                        c = 0, e.stopImmediatePropagation(), S = 0, C = 0, v = Q();
                        var t = E.offset(),
                            i = I(e)[0] - t.top,
                            n = I(e)[1] - t.left;
                        if (!(v - g > 30)) {
                            b = 1e3 / (v - f);
                            var o = "mcsEaseOut",
                                s = 2.5 > b,
                                a = s ? [F[F.length - 2], L[L.length - 2]] : [0, 0];
                            y = s ? [i - a[0], n - a[1]] : [i - p, n - m];
                            var u = [Math.abs(y[0]), Math.abs(y[1])];
                            b = s ? [Math.abs(y[0] / 4), Math.abs(y[1] / 4)] : [b, b];
                            var h = [Math.abs(M[0].offsetTop) - y[0] * r(u[0] / b[0], b[0]), Math.abs(M[0].offsetLeft) - y[1] * r(u[1] / b[1], b[1])];
                            w = "yx" === j.axis ? [h[0], h[1]] : "x" === j.axis ? [null, h[1]] : [h[0], null], x = [4 * u[0] + j.scrollInertia, 4 * u[1] + j.scrollInertia];
                            var T = parseInt(j.contentTouchScroll) || 0;
                            w[0] = u[0] > T ? w[0] : 0, w[1] = u[1] > T ? w[1] : 0, k.overflowed[0] && l(w[0], x[0], o, "y", z, !1), k.overflowed[1] && l(w[1], x[1], o, "x", z, !1)
                        }
                    }
                }

                function r(e, t) {
                    var i = [1.5 * t, 2 * t, t / 1.5, t / 2];
                    return e > 90 ? t > 4 ? i[0] : i[3] : e > 60 ? t > 3 ? i[3] : i[2] : e > 30 ? t > 8 ? i[1] : t > 6 ? i[0] : t > 4 ? t : i[2] : t > 8 ? t : i[3]
                }

                function l(e, t, i, n, o, s) {
                    e && Y(T, e.toString(), {
                        dur: t,
                        scrollEasing: i,
                        dir: n,
                        overwrite: o,
                        drag: s
                    })
                }

                var c, u, h, p, m, f, g, v, y, b, w, x, S, C, T = e(this),
                    k = T.data(n),
                    j = k.opt,
                    _ = n + "_" + k.idx,
                    E = e("#mCSB_" + k.idx),
                    M = e("#mCSB_" + k.idx + "_container"),
                    P = [e("#mCSB_" + k.idx + "_dragger_vertical"), e("#mCSB_" + k.idx + "_dragger_horizontal")],
                    F = [],
                    L = [],
                    D = 0,
                    z = "yx" === j.axis ? "none" : "all",
                    B = [],
                    W = M.find("iframe"),
                    O = ["touchstart." + _ + " pointerdown." + _ + " MSPointerDown." + _, "touchmove." + _ + " pointermove." + _ + " MSPointerMove." + _, "touchend." + _ + " pointerup." + _ + " MSPointerUp." + _],
                    R = void 0 !== document.body.style.touchAction;
                M.bind(O[0], function (e) {
                    i(e)
                }).bind(O[1], function (e) {
                    o(e)
                }), E.bind(O[0], function (e) {
                    s(e)
                }).bind(O[2], function (e) {
                    a(e)
                }), W.length && W.each(function () {
                    e(this).load(function () {
                        A(this) && e(this.contentDocument || this.contentWindow.document).bind(O[0], function (e) {
                            i(e), s(e)
                        }).bind(O[1], function (e) {
                            o(e)
                        }).bind(O[2], function (e) {
                            a(e)
                        })
                    })
                })
            },
            F = function () {
                function i() {
                    return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0
                }

                function o(e, t, i) {
                    c.type = i && s ? "stepped" : "stepless", c.scrollAmount = 10, H(a, e, t, "mcsLinearOut", i ? 60 : null)
                }

                var s, a = e(this),
                    r = a.data(n),
                    l = r.opt,
                    c = r.sequential,
                    u = n + "_" + r.idx,
                    h = e("#mCSB_" + r.idx + "_container"),
                    p = h.parent();
                h.bind("mousedown." + u, function (e) {
                    t || s || (s = 1, d = !0)
                }).add(document).bind("mousemove." + u, function (e) {
                    if (!t && s && i()) {
                        var n = h.offset(),
                            a = I(e)[0] - n.top + h[0].offsetTop,
                            d = I(e)[1] - n.left + h[0].offsetLeft;
                        a > 0 && a < p.height() && d > 0 && d < p.width() ? c.step && o("off", null, "stepped") : ("x" !== l.axis && r.overflowed[0] && (0 > a ? o("on", 38) : a > p.height() && o("on", 40)), "y" !== l.axis && r.overflowed[1] && (0 > d ? o("on", 37) : d > p.width() && o("on", 39)))
                    }
                }).bind("mouseup." + u + " dragend." + u, function (e) {
                    t || (s && (s = 0, o("off", null)), d = !1)
                })
            },
            L = function () {
                function t(t, n) {
                    if (q(i), !D(i, t.target)) {
                        var a = "auto" !== s.mouseWheel.deltaFactor ? parseInt(s.mouseWheel.deltaFactor) : l && t.deltaFactor < 100 ? 100 : t.deltaFactor || 100;
                        if ("x" === s.axis || "x" === s.mouseWheel.axis) var c = "x",
                            u = [Math.round(a * o.scrollRatio.x), parseInt(s.mouseWheel.scrollAmount)],
                            h = "auto" !== s.mouseWheel.scrollAmount ? u[1] : u[0] >= r.width() ? .9 * r.width() : u[0],
                            p = Math.abs(e("#mCSB_" + o.idx + "_container")[0].offsetLeft),
                            m = d[1][0].offsetLeft,
                            f = d[1].parent().width() - d[1].width(),
                            g = t.deltaX || t.deltaY || n;
                        else var c = "y",
                            u = [Math.round(a * o.scrollRatio.y), parseInt(s.mouseWheel.scrollAmount)],
                            h = "auto" !== s.mouseWheel.scrollAmount ? u[1] : u[0] >= r.height() ? .9 * r.height() : u[0],
                            p = Math.abs(e("#mCSB_" + o.idx + "_container")[0].offsetTop),
                            m = d[0][0].offsetTop,
                            f = d[0].parent().height() - d[0].height(),
                            g = t.deltaY || n;
                        "y" === c && !o.overflowed[0] || "x" === c && !o.overflowed[1] || ((s.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (g = -g), s.mouseWheel.normalizeDelta && (g = 0 > g ? -1 : 1), (g > 0 && 0 !== m || 0 > g && m !== f || s.mouseWheel.preventDefault) && (t.stopImmediatePropagation(), t.preventDefault()), Y(i, (p - g * h).toString(), {
                            dir: c
                        }))
                    }
                }

                if (e(this).data(n)) {
                    var i = e(this),
                        o = i.data(n),
                        s = o.opt,
                        a = n + "_" + o.idx,
                        r = e("#mCSB_" + o.idx),
                        d = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")],
                        c = e("#mCSB_" + o.idx + "_container").find("iframe");
                    c.length && c.each(function () {
                        e(this).load(function () {
                            A(this) && e(this.contentDocument || this.contentWindow.document).bind("mousewheel." + a, function (e, i) {
                                t(e, i)
                            })
                        })
                    }), r.bind("mousewheel." + a, function (e, i) {
                        t(e, i)
                    })
                }
            },
            A = function (e) {
                var t = null;
                try {
                    var i = e.contentDocument || e.contentWindow.document;
                    t = i.body.innerHTML
                } catch (n) {
                }
                return null !== t
            },
            D = function (t, i) {
                var o = i.nodeName.toLowerCase(),
                    s = t.data(n).opt.mouseWheel.disableOver,
                    a = ["select", "textarea"];
                return e.inArray(o, s) > -1 && !(e.inArray(o, a) > -1 && !e(i).is(":focus"))
            },
            z = function () {
                var t = e(this),
                    i = t.data(n),
                    o = n + "_" + i.idx,
                    s = e("#mCSB_" + i.idx + "_container"),
                    a = s.parent(),
                    r = e(".mCSB_" + i.idx + "_scrollbar ." + c[12]);
                r.bind("touchstart." + o + " pointerdown." + o + " MSPointerDown." + o, function (e) {
                    d = !0
                }).bind("touchend." + o + " pointerup." + o + " MSPointerUp." + o, function (e) {
                    d = !1
                }).bind("click." + o, function (n) {
                    if (e(n.target).hasClass(c[12]) || e(n.target).hasClass("mCSB_draggerRail")) {
                        q(t);
                        var o = e(this),
                            r = o.find(".mCSB_dragger");
                        if (o.parent(".mCSB_scrollTools_horizontal").length > 0) {
                            if (!i.overflowed[1]) return;
                            var l = "x",
                                d = n.pageX > r.offset().left ? -1 : 1,
                                u = Math.abs(s[0].offsetLeft) - .9 * d * a.width()
                        } else {
                            if (!i.overflowed[0]) return;
                            var l = "y",
                                d = n.pageY > r.offset().top ? -1 : 1,
                                u = Math.abs(s[0].offsetTop) - .9 * d * a.height()
                        }
                        Y(t, u.toString(), {
                            dir: l,
                            scrollEasing: "mcsEaseInOut"
                        })
                    }
                })
            },
            B = function () {
                var t = e(this),
                    i = t.data(n),
                    o = i.opt,
                    s = n + "_" + i.idx,
                    a = e("#mCSB_" + i.idx + "_container"),
                    r = a.parent();
                a.bind("focusin." + s, function (i) {
                    var n = e(document.activeElement),
                        s = a.find(".mCustomScrollBox").length,
                        l = 0;
                    n.is(o.advanced.autoScrollOnFocus) && (q(t), clearTimeout(t[0]._focusTimeout), t[0]._focusTimer = s ? (l + 17) * s : 0, t[0]._focusTimeout = setTimeout(function () {
                        var e = [te(n)[0], te(n)[1]],
                            i = [a[0].offsetTop, a[0].offsetLeft],
                            s = [i[0] + e[0] >= 0 && i[0] + e[0] < r.height() - n.outerHeight(!1), i[1] + e[1] >= 0 && i[0] + e[1] < r.width() - n.outerWidth(!1)],
                            d = "yx" !== o.axis || s[0] || s[1] ? "all" : "none";
                        "x" === o.axis || s[0] || Y(t, e[0].toString(), {
                            dir: "y",
                            scrollEasing: "mcsEaseInOut",
                            overwrite: d,
                            dur: l
                        }), "y" === o.axis || s[1] || Y(t, e[1].toString(), {
                            dir: "x",
                            scrollEasing: "mcsEaseInOut",
                            overwrite: d,
                            dur: l
                        })
                    }, t[0]._focusTimer))
                })
            },
            W = function () {
                var t = e(this),
                    i = t.data(n),
                    o = n + "_" + i.idx,
                    s = e("#mCSB_" + i.idx + "_container").parent();
                s.bind("scroll." + o, function (t) {
                    (0 !== s.scrollTop() || 0 !== s.scrollLeft()) && e(".mCSB_" + i.idx + "_scrollbar").css("visibility", "hidden")
                })
            },
            O = function () {
                var t = e(this),
                    i = t.data(n),
                    o = i.opt,
                    s = i.sequential,
                    a = n + "_" + i.idx,
                    r = ".mCSB_" + i.idx + "_scrollbar",
                    l = e(r + ">a");
                l.bind("mousedown." + a + " touchstart." + a + " pointerdown." + a + " MSPointerDown." + a + " mouseup." + a + " touchend." + a + " pointerup." + a + " MSPointerUp." + a + " mouseout." + a + " pointerout." + a + " MSPointerOut." + a + " click." + a, function (n) {
                    function a(e, i) {
                        s.scrollAmount = o.snapAmount || o.scrollButtons.scrollAmount, H(t, e, i)
                    }

                    if (n.preventDefault(), K(n)) {
                        var r = e(this).attr("class");
                        switch (s.type = o.scrollButtons.scrollType, n.type) {
                            case "mousedown":
                            case "touchstart":
                            case "pointerdown":
                            case "MSPointerDown":
                                if ("stepped" === s.type) return;
                                d = !0, i.tweenRunning = !1, a("on", r);
                                break;
                            case "mouseup":
                            case "touchend":
                            case "pointerup":
                            case "MSPointerUp":
                            case "mouseout":
                            case "pointerout":
                            case "MSPointerOut":
                                if ("stepped" === s.type) return;
                                d = !1, s.dir && a("off", r);
                                break;
                            case "click":
                                if ("stepped" !== s.type || i.tweenRunning) return;
                                a("on", r)
                        }
                    }
                })
            },
            R = function () {
                function t(t) {
                    function n(e, t) {
                        a.type = s.keyboard.scrollType, a.scrollAmount = s.snapAmount || s.keyboard.scrollAmount, "stepped" === a.type && o.tweenRunning || H(i, e, t)
                    }

                    switch (t.type) {
                        case "blur":
                            o.tweenRunning && a.dir && n("off", null);
                            break;
                        case "keydown":
                        case "keyup":
                            var r = t.keyCode ? t.keyCode : t.which,
                                l = "on";
                            if ("x" !== s.axis && (38 === r || 40 === r) || "y" !== s.axis && (37 === r || 39 === r)) {
                                if ((38 === r || 40 === r) && !o.overflowed[0] || (37 === r || 39 === r) && !o.overflowed[1]) return;
                                "keyup" === t.type && (l = "off"), e(document.activeElement).is(u) || (t.preventDefault(), t.stopImmediatePropagation(), n(l, r))
                            } else if (33 === r || 34 === r) {
                                if ((o.overflowed[0] || o.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type) {
                                    q(i);
                                    var h = 34 === r ? -1 : 1;
                                    if ("x" === s.axis || "yx" === s.axis && o.overflowed[1] && !o.overflowed[0]) var p = "x",
                                        m = Math.abs(d[0].offsetLeft) - .9 * h * c.width();
                                    else var p = "y",
                                        m = Math.abs(d[0].offsetTop) - .9 * h * c.height();
                                    Y(i, m.toString(), {
                                        dir: p,
                                        scrollEasing: "mcsEaseInOut"
                                    })
                                }
                            } else if ((35 === r || 36 === r) && !e(document.activeElement).is(u) && ((o.overflowed[0] || o.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type)) {
                                if ("x" === s.axis || "yx" === s.axis && o.overflowed[1] && !o.overflowed[0]) var p = "x",
                                    m = 35 === r ? Math.abs(c.width() - d.outerWidth(!1)) : 0;
                                else var p = "y",
                                    m = 35 === r ? Math.abs(c.height() - d.outerHeight(!1)) : 0;
                                Y(i, m.toString(), {
                                    dir: p,
                                    scrollEasing: "mcsEaseInOut"
                                })
                            }
                    }
                }

                var i = e(this),
                    o = i.data(n),
                    s = o.opt,
                    a = o.sequential,
                    r = n + "_" + o.idx,
                    l = e("#mCSB_" + o.idx),
                    d = e("#mCSB_" + o.idx + "_container"),
                    c = d.parent(),
                    u = "input,textarea,select,datalist,keygen,[contenteditable='true']",
                    h = d.find("iframe"),
                    p = ["blur." + r + " keydown." + r + " keyup." + r];
                h.length && h.each(function () {
                    e(this).load(function () {
                        A(this) && e(this.contentDocument || this.contentWindow.document).bind(p[0], function (e) {
                            t(e)
                        })
                    })
                }), l.attr("tabindex", "0").bind(p[0], function (e) {
                    t(e)
                })
            },
            H = function (t, i, o, s, a) {
                function r(e) {
                    var i = "stepped" !== h.type,
                        n = a ? a : e ? i ? f / 1.5 : g : 1e3 / 60,
                        o = e ? i ? 7.5 : 40 : 2.5,
                        l = [Math.abs(p[0].offsetTop), Math.abs(p[0].offsetLeft)],
                        c = [d.scrollRatio.y > 10 ? 10 : d.scrollRatio.y, d.scrollRatio.x > 10 ? 10 : d.scrollRatio.x],
                        u = "x" === h.dir[0] ? l[1] + h.dir[1] * c[1] * o : l[0] + h.dir[1] * c[0] * o,
                        m = "x" === h.dir[0] ? l[1] + h.dir[1] * parseInt(h.scrollAmount) : l[0] + h.dir[1] * parseInt(h.scrollAmount),
                        v = "auto" !== h.scrollAmount ? m : u,
                        y = s ? s : e ? i ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear",
                        b = e ? !0 : !1;
                    return e && 17 > n && (v = "x" === h.dir[0] ? l[1] : l[0]), Y(t, v.toString(), {
                        dir: h.dir[0],
                        scrollEasing: y,
                        dur: n,
                        onComplete: b
                    }), e ? void (h.dir = !1) : (clearTimeout(h.step), void (h.step = setTimeout(function () {
                        r()
                    }, n)))
                }

                function l() {
                    clearTimeout(h.step), G(h, "step"), q(t)
                }

                var d = t.data(n),
                    u = d.opt,
                    h = d.sequential,
                    p = e("#mCSB_" + d.idx + "_container"),
                    m = "stepped" === h.type ? !0 : !1,
                    f = u.scrollInertia < 26 ? 26 : u.scrollInertia,
                    g = u.scrollInertia < 1 ? 17 : u.scrollInertia;
                switch (i) {
                    case "on":
                        if (h.dir = [o === c[16] || o === c[15] || 39 === o || 37 === o ? "x" : "y", o === c[13] || o === c[15] || 38 === o || 37 === o ? -1 : 1], q(t), ee(o) && "stepped" === h.type) return;
                        r(m);
                        break;
                    case "off":
                        l(), (m || d.tweenRunning && h.dir) && r(!0)
                }
            },
            N = function (t) {
                var i = e(this).data(n).opt,
                    o = [];
                return "function" == typeof t && (t = t()), t instanceof Array ? o = t.length > 1 ? [t[0], t[1]] : "x" === i.axis ? [null, t[0]] : [t[0], null] : (o[0] = t.y ? t.y : t.x || "x" === i.axis ? null : t, o[1] = t.x ? t.x : t.y || "y" === i.axis ? null : t), "function" == typeof o[0] && (o[0] = o[0]()), "function" == typeof o[1] && (o[1] = o[1]()), o
            },
            $ = function (t, i) {
                if (null != t && "undefined" != typeof t) {
                    var o = e(this),
                        s = o.data(n),
                        a = s.opt,
                        r = e("#mCSB_" + s.idx + "_container"),
                        l = r.parent(),
                        d = typeof t;
                    i || (i = "x" === a.axis ? "x" : "y");
                    var c = "x" === i ? r.outerWidth(!1) : r.outerHeight(!1),
                        h = "x" === i ? r[0].offsetLeft : r[0].offsetTop,
                        p = "x" === i ? "left" : "top";
                    switch (d) {
                        case "function":
                            return t();
                        case "object":
                            var m = t.jquery ? t : e(t);
                            if (!m.length) return;
                            return "x" === i ? te(m)[1] : te(m)[0];
                        case "string":
                        case "number":
                            if (ee(t)) return Math.abs(t);
                            if (-1 !== t.indexOf("%")) return Math.abs(c * parseInt(t) / 100);
                            if (-1 !== t.indexOf("-=")) return Math.abs(h - parseInt(t.split("-=")[1]));
                            if (-1 !== t.indexOf("+=")) {
                                var f = h + parseInt(t.split("+=")[1]);
                                return f >= 0 ? 0 : Math.abs(f)
                            }
                            if (-1 !== t.indexOf("px") && ee(t.split("px")[0])) return Math.abs(t.split("px")[0]);
                            if ("top" === t || "left" === t) return 0;
                            if ("bottom" === t) return Math.abs(l.height() - r.outerHeight(!1));
                            if ("right" === t) return Math.abs(l.width() - r.outerWidth(!1));
                            if ("first" === t || "last" === t) {
                                var m = r.find(":" + t);
                                return "x" === i ? te(m)[1] : te(m)[0]
                            }
                            return e(t).length ? "x" === i ? te(e(t))[1] : te(e(t))[0] : (r.css(p, t), void u.update.call(null, o[0]))
                    }
                }
            },
            V = function (t) {
                function i() {
                    return clearTimeout(h[0].autoUpdate), 0 === r.parents("html").length ? void (r = null) : void (h[0].autoUpdate = setTimeout(function () {
                        return d.advanced.updateOnSelectorChange && (l.poll.change.n = s(), l.poll.change.n !== l.poll.change.o) ? (l.poll.change.o = l.poll.change.n, void a(3)) : d.advanced.updateOnContentResize && (l.poll.size.n = r[0].scrollHeight + r[0].scrollWidth + h[0].offsetHeight + r[0].offsetHeight, l.poll.size.n !== l.poll.size.o) ? (l.poll.size.o = l.poll.size.n, void a(1)) : !d.advanced.updateOnImageLoad || "auto" === d.advanced.updateOnImageLoad && "y" === d.axis || (l.poll.img.n = h.find("img").length, l.poll.img.n === l.poll.img.o) ? void ((d.advanced.updateOnSelectorChange || d.advanced.updateOnContentResize || d.advanced.updateOnImageLoad) && i()) : (l.poll.img.o = l.poll.img.n, void h.find("img").each(function () {
                            o(this)
                        }))
                    }, d.advanced.autoUpdateTimeout))
                }

                function o(t) {
                    function i(e, t) {
                        return function () {
                            return t.apply(e, arguments)
                        }
                    }

                    function n() {
                        this.onload = null, e(t).addClass(c[2]), a(2)
                    }

                    if (e(t).hasClass(c[2])) return void a();
                    var o = new Image;
                    o.onload = i(o, n), o.src = t.src
                }

                function s() {
                    d.advanced.updateOnSelectorChange === !0 && (d.advanced.updateOnSelectorChange = "*");
                    var e = 0,
                        t = h.find(d.advanced.updateOnSelectorChange);
                    return d.advanced.updateOnSelectorChange && t.length > 0 && t.each(function () {
                        e += this.offsetHeight + this.offsetWidth
                    }), e
                }

                function a(e) {
                    clearTimeout(h[0].autoUpdate), u.update.call(null, r[0], e)
                }

                var r = e(this),
                    l = r.data(n),
                    d = l.opt,
                    h = e("#mCSB_" + l.idx + "_container");
                return t ? (clearTimeout(h[0].autoUpdate), void G(h[0], "autoUpdate")) : void i()
            },
            U = function (e, t, i) {
                return Math.round(e / t) * t - i
            },
            q = function (t) {
                var i = t.data(n),
                    o = e("#mCSB_" + i.idx + "_container,#mCSB_" + i.idx + "_container_wrapper,#mCSB_" + i.idx + "_dragger_vertical,#mCSB_" + i.idx + "_dragger_horizontal");
                o.each(function () {
                    Z.call(this)
                })
            },
            Y = function (t, i, o) {
                function s(e) {
                    return l && d.callbacks[e] && "function" == typeof d.callbacks[e]
                }

                function a() {
                    return [d.callbacks.alwaysTriggerOffsets || b >= w[0] + S, d.callbacks.alwaysTriggerOffsets || -T >= b]
                }

                function r() {
                    var e = [p[0].offsetTop, p[0].offsetLeft],
                        i = [v[0].offsetTop, v[0].offsetLeft],
                        n = [p.outerHeight(!1), p.outerWidth(!1)],
                        s = [h.height(), h.width()];
                    t[0].mcs = {
                        content: p,
                        top: e[0],
                        left: e[1],
                        draggerTop: i[0],
                        draggerLeft: i[1],
                        topPct: Math.round(100 * Math.abs(e[0]) / (Math.abs(n[0]) - s[0])),
                        leftPct: Math.round(100 * Math.abs(e[1]) / (Math.abs(n[1]) - s[1])),
                        direction: o.dir
                    }
                }

                var l = t.data(n),
                    d = l.opt,
                    c = {
                        trigger: "internal",
                        dir: "y",
                        scrollEasing: "mcsEaseOut",
                        drag: !1,
                        dur: d.scrollInertia,
                        overwrite: "all",
                        callbacks: !0,
                        onStart: !0,
                        onUpdate: !0,
                        onComplete: !0
                    },
                    o = e.extend(c, o),
                    u = [o.dur, o.drag ? 0 : o.dur],
                    h = e("#mCSB_" + l.idx),
                    p = e("#mCSB_" + l.idx + "_container"),
                    m = p.parent(),
                    f = d.callbacks.onTotalScrollOffset ? N.call(t, d.callbacks.onTotalScrollOffset) : [0, 0],
                    g = d.callbacks.onTotalScrollBackOffset ? N.call(t, d.callbacks.onTotalScrollBackOffset) : [0, 0];
                if (l.trigger = o.trigger, (0 !== m.scrollTop() || 0 !== m.scrollLeft()) && (e(".mCSB_" + l.idx + "_scrollbar").css("visibility", "visible"), m.scrollTop(0).scrollLeft(0)), "_resetY" !== i || l.contentReset.y || (s("onOverflowYNone") && d.callbacks.onOverflowYNone.call(t[0]), l.contentReset.y = 1), "_resetX" !== i || l.contentReset.x || (s("onOverflowXNone") && d.callbacks.onOverflowXNone.call(t[0]), l.contentReset.x = 1), "_resetY" !== i && "_resetX" !== i) {
                    switch (!l.contentReset.y && t[0].mcs || !l.overflowed[0] || (s("onOverflowY") && d.callbacks.onOverflowY.call(t[0]), l.contentReset.x = null), !l.contentReset.x && t[0].mcs || !l.overflowed[1] || (s("onOverflowX") && d.callbacks.onOverflowX.call(t[0]), l.contentReset.x = null), d.snapAmount && (i = U(i, d.snapAmount, d.snapOffset)), o.dir) {
                        case "x":
                            var v = e("#mCSB_" + l.idx + "_dragger_horizontal"),
                                y = "left",
                                b = p[0].offsetLeft,
                                w = [h.width() - p.outerWidth(!1), v.parent().width() - v.width()],
                                x = [i, 0 === i ? 0 : i / l.scrollRatio.x],
                                S = f[1],
                                T = g[1],
                                k = S > 0 ? S / l.scrollRatio.x : 0,
                                j = T > 0 ? T / l.scrollRatio.x : 0;
                            break;
                        case "y":
                            var v = e("#mCSB_" + l.idx + "_dragger_vertical"),
                                y = "top",
                                b = p[0].offsetTop,
                                w = [h.height() - p.outerHeight(!1), v.parent().height() - v.height()],
                                x = [i, 0 === i ? 0 : i / l.scrollRatio.y],
                                S = f[0],
                                T = g[0],
                                k = S > 0 ? S / l.scrollRatio.y : 0,
                                j = T > 0 ? T / l.scrollRatio.y : 0
                    }
                    x[1] < 0 || 0 === x[0] && 0 === x[1] ? x = [0, 0] : x[1] >= w[1] ? x = [w[0], w[1]] : x[0] = -x[0], t[0].mcs || (r(), s("onInit") && d.callbacks.onInit.call(t[0])), clearTimeout(p[0].onCompleteTimeout), (l.tweenRunning || !(0 === b && x[0] >= 0 || b === w[0] && x[0] <= w[0])) && (X(v[0], y, Math.round(x[1]), u[1], o.scrollEasing), X(p[0], y, Math.round(x[0]), u[0], o.scrollEasing, o.overwrite, {
                        onStart: function () {
                            o.callbacks && o.onStart && !l.tweenRunning && (s("onScrollStart") && (r(), d.callbacks.onScrollStart.call(t[0])), l.tweenRunning = !0, C(v), l.cbOffsets = a())
                        },
                        onUpdate: function () {
                            o.callbacks && o.onUpdate && s("whileScrolling") && (r(), d.callbacks.whileScrolling.call(t[0]))
                        },
                        onComplete: function () {
                            if (o.callbacks && o.onComplete) {
                                "yx" === d.axis && clearTimeout(p[0].onCompleteTimeout);
                                var e = p[0].idleTimer || 0;
                                p[0].onCompleteTimeout = setTimeout(function () {
                                    s("onScroll") && (r(), d.callbacks.onScroll.call(t[0])), s("onTotalScroll") && x[1] >= w[1] - k && l.cbOffsets[0] && (r(), d.callbacks.onTotalScroll.call(t[0])), s("onTotalScrollBack") && x[1] <= j && l.cbOffsets[1] && (r(), d.callbacks.onTotalScrollBack.call(t[0])), l.tweenRunning = !1, p[0].idleTimer = 0, C(v, "hide")
                                }, e)
                            }
                        }
                    }))
                }
            },
            X = function (e, t, i, n, o, s, a) {
                function r() {
                    x.stop || (y || m.call(), y = Q() - v, l(), y >= x.time && (x.time = y > x.time ? y + h - (y - x.time) : y + h - 1, x.time < y + 1 && (x.time = y + 1)), x.time < n ? x.id = p(r) : g.call())
                }

                function l() {
                    n > 0 ? (x.currVal = u(x.time, b, S, n, o), w[t] = Math.round(x.currVal) + "px") : w[t] = i + "px", f.call()
                }

                function d() {
                    h = 1e3 / 60, x.time = y + h, p = window.requestAnimationFrame ? window.requestAnimationFrame : function (e) {
                        return l(), setTimeout(e, .01)
                    }, x.id = p(r)
                }

                function c() {
                    null != x.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(x.id) : clearTimeout(x.id), x.id = null)
                }

                function u(e, t, i, n, o) {
                    switch (o) {
                        case "linear":
                        case "mcsLinear":
                            return i * e / n + t;
                        case "mcsLinearOut":
                            return e /= n, e--, i * Math.sqrt(1 - e * e) + t;
                        case "easeInOutSmooth":
                            return e /= n / 2, 1 > e ? i / 2 * e * e + t : (e--, -i / 2 * (e * (e - 2) - 1) + t);
                        case "easeInOutStrong":
                            return e /= n / 2, 1 > e ? i / 2 * Math.pow(2, 10 * (e - 1)) + t : (e--, i / 2 * (-Math.pow(2, -10 * e) + 2) + t);
                        case "easeInOut":
                        case "mcsEaseInOut":
                            return e /= n / 2, 1 > e ? i / 2 * e * e * e + t : (e -= 2, i / 2 * (e * e * e + 2) + t);
                        case "easeOutSmooth":
                            return e /= n, e--, -i * (e * e * e * e - 1) + t;
                        case "easeOutStrong":
                            return i * (-Math.pow(2, -10 * e / n) + 1) + t;
                        case "easeOut":
                        case "mcsEaseOut":
                        default:
                            var s = (e /= n) * e,
                                a = s * e;
                            return t + i * (.499999999999997 * a * s + -2.5 * s * s + 5.5 * a + -6.5 * s + 4 * e)
                    }
                }

                e._mTween || (e._mTween = {
                    top: {},
                    left: {}
                });
                var h, p, a = a || {},
                    m = a.onStart || function () {
                    },
                    f = a.onUpdate || function () {
                    },
                    g = a.onComplete || function () {
                    },
                    v = Q(),
                    y = 0,
                    b = e.offsetTop,
                    w = e.style,
                    x = e._mTween[t];
                "left" === t && (b = e.offsetLeft);
                var S = i - b;
                x.stop = 0, "none" !== s && c(), d()
            },
            Q = function () {
                return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
            },
            Z = function () {
                var e = this;
                e._mTween || (e._mTween = {
                    top: {},
                    left: {}
                });
                for (var t = ["top", "left"], i = 0; i < t.length; i++) {
                    var n = t[i];
                    e._mTween[n].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(e._mTween[n].id) : clearTimeout(e._mTween[n].id), e._mTween[n].id = null, e._mTween[n].stop = 1)
                }
            },
            G = function (e, t) {
                try {
                    delete e[t]
                } catch (i) {
                    e[t] = null
                }
            },
            K = function (e) {
                return !(e.which && 1 !== e.which)
            },
            J = function (e) {
                var t = e.originalEvent.pointerType;
                return !(t && "touch" !== t && 2 !== t)
            },
            ee = function (e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            },
            te = function (e) {
                var t = e.parents(".mCSB_container");
                return [e.offset().top - t.offset().top, e.offset().left - t.offset().left]
            };
        e.fn[i] = function (t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
        }, e[i] = function (t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
        }, e[i].defaults = s, window[i] = !0, e(window).load(function () {
            e(o)[i](), e.extend(e.expr[":"], {
                mcsInView: e.expr[":"].mcsInView || function (t) {
                    var i, n, o = e(t),
                        s = o.parents(".mCSB_container");
                    return s.length ? (i = s.parent(), n = [s[0].offsetTop, s[0].offsetLeft], n[0] + te(o)[0] >= 0 && n[0] + te(o)[0] < i.height() - o.outerHeight(!1) && n[1] + te(o)[1] >= 0 && n[1] + te(o)[1] < i.width() - o.outerWidth(!1)) : void 0
                },
                mcsOverflow: e.expr[":"].mcsOverflow || function (t) {
                    var i = e(t).data(n);
                    return i ? i.overflowed[0] || i.overflowed[1] : void 0
                }
            })
        })
    })
});

