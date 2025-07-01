var mejs = {};
mejs.version = "2.18.2";
mejs.meIndex = 0;
mejs.plugins = {
    silverlight: [{
        version: [3, 0],
        types: ["video/mp4", "video/m4v", "video/mov", "video/wmv", "audio/wma", "audio/m4a", "audio/mp3", "audio/wav", "audio/mpeg"]
    }],
    flash: [{
        version: [9, 0, 124],
        types: ["video/mp4", "video/m4v", "video/mov", "video/flv", "video/rtmp", "video/x-flv", "audio/flv", "audio/x-flv", "audio/mp3", "audio/m4a", "audio/mpeg", "video/youtube", "video/x-youtube", "video/dailymotion", "video/x-dailymotion", "application/x-mpegURL"]
    }],
    youtube: [{
        version: null,
        types: ["video/youtube", "video/x-youtube", "audio/youtube", "audio/x-youtube"]
    }],
    vimeo: [{
        version: null,
        types: ["video/vimeo", "video/x-vimeo"]
    }]
};
mejs.Utility = {
    encodeUrl: function (e) {
        return encodeURIComponent(e)
    },
    escapeHTML: function (e) {
        return e.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")
    },
    absolutizeUrl: function (e) {
        var t = document.createElement("div");
        return t.innerHTML = '<a href="' + this.escapeHTML(e) + '">x</a>', t.firstChild.href
    },
    getScriptPath: function (e) {
        var t, i, n, o, s, a, r, l, d, c, u, h;
        for (var t, i, n, o, s, a, r = 0, l = "", d = "", c = document.getElementsByTagName("script"), u = c.length, h = e.length; u > r; r++) {
            for (o = c[r].src, i = o.lastIndexOf("/"), i > -1 ? (a = o.substring(i + 1), s = o.substring(0, i + 1)) : (a = o, s = ""), t = 0; h > t; t++)
                if (d = e[t], n = a.indexOf(d), n > -1) {
                    l = s;
                    break
                }
            if ("" !== l) break
        }
        return l
    },
    calculateTimeFormat: function (e, t, i) {
        0 > e && (e = 0), "undefined" == typeof i && (i = 25);
        var n = t.timeFormat,
            o = n[0],
            s = n[1] == n[0],
            a = s ? 2 : 1,
            r = ":",
            l = Math.floor(e / 3600) % 24,
            d = Math.floor(e / 60) % 60,
            c = Math.floor(e % 60),
            u = Math.floor((e % 1 * i).toFixed(3)),
            h = [
                [u, "f"],
                [c, "s"],
                [d, "m"],
                [l, "h"]
            ];
        n.length < a && (r = n[a]);
        for (var p = !1, m = 0, f = h.length; f > m; m++)
            if (-1 !== n.indexOf(h[m][1])) p = !0;
            else if (p) {
                for (var g = !1, v = m; f > v; v++)
                    if (h[v][0] > 0) {
                        g = !0;
                        break
                    }
                if (!g) break;
                s || (n = o + n), n = h[m][1] + r + n, s && (n = h[m][1] + n), o = h[m][1]
            }
        t.currentTimeFormat = n
    },
    twoDigitsString: function (e) {
        return 10 > e ? "0" + e : String(e)
    },
    secondsToTimeCode: function (e, t) {
        if (0 > e && (e = 0), "object" != typeof t) {
            var n = "m:ss";
            n = arguments[1] ? "hh:mm:ss" : n, n = arguments[2] ? n + ":ff" : n, t = {
                currentTimeFormat: n,
                framesPerSecond: arguments[3] || 25
            }
        }
        var o = t.framesPerSecond;
        "undefined" == typeof o && (o = 25);
        var n = t.currentTimeFormat,
            s = Math.floor(e / 3600) % 24,
            a = Math.floor(e / 60) % 60,
            r = Math.floor(e % 60),
            l = Math.floor((e % 1 * o).toFixed(3));
        lis = [
            [l, "f"],
            [r, "s"],
            [a, "m"],
            [s, "h"]
        ];
        var d = n;
        for (i = 0, len = lis.length; i < len; i++) d = d.replace(lis[i][1] + lis[i][1], this.twoDigitsString(lis[i][0])), d = d.replace(lis[i][1], lis[i][0]);
        return d
    },
    timeCodeToSeconds: function (e, t, i, n) {
        "undefined" == typeof i ? i = !1 : "undefined" == typeof n && (n = 25);
        var o = e.split(":"),
            s = parseInt(o[0], 10),
            a = parseInt(o[1], 10),
            r = parseInt(o[2], 10),
            l = 0,
            d = 0;
        return i && (l = parseInt(o[3]) / n), d = 3600 * s + 60 * a + r + l
    },
    convertSMPTEtoSeconds: function (e) {
        if ("string" != typeof e) return !1;
        e = e.replace(",", ".");
        var t = 0,
            i = -1 != e.indexOf(".") ? e.split(".")[1].length : 0,
            n = 1;
        e = e.split(":").reverse();
        for (var o = 0; o < e.length; o++) n = 1, o > 0 && (n = Math.pow(60, o)), t += Number(e[o]) * n;
        return Number(t.toFixed(i))
    },
    removeSwf: function (e) {
        var t = document.getElementById(e);
        t && /object|embed/i.test(t.nodeName) && (mejs.MediaFeatures.isIE ? (t.style.display = "none", function () {
            4 == t.readyState ? mejs.Utility.removeObjectInIE(e) : setTimeout(arguments.callee, 10)
        }()) : t.parentNode.removeChild(t))
    },
    removeObjectInIE: function (e) {
        var t = document.getElementById(e);
        if (t) {
            for (var i in t) "function" == typeof t[i] && (t[i] = null);
            t.parentNode.removeChild(t)
        }
    }
};
mejs.PluginDetector = {
    hasPluginVersion: function (e, t) {
        var i = this.plugins[e];
        return t[1] = t[1] || 0, t[2] = t[2] || 0, i[0] > t[0] || i[0] == t[0] && i[1] > t[1] || i[0] == t[0] && i[1] == t[1] && i[2] >= t[2] ? !0 : !1
    },
    nav: window.navigator,
    ua: window.navigator.userAgent.toLowerCase(),
    plugins: [],
    addPlugin: function (e, t, i, n, o) {
        this.plugins[e] = this.detectPlugin(t, i, n, o)
    },
    detectPlugin: function (e, t, i, n) {
        var o, s, a, r = [0, 0, 0];
        if ("undefined" != typeof this.nav.plugins && "object" == typeof this.nav.plugins[e]) {
            if (o = this.nav.plugins[e].description, o && ("undefined" == typeof this.nav.mimeTypes || !this.nav.mimeTypes[t] || this.nav.mimeTypes[t].enabledPlugin))
                for (r = o.replace(e, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split("."), s = 0; s < r.length; s++) r[s] = parseInt(r[s].match(/\d+/), 10)
        } else if ("undefined" != typeof window.ActiveXObject) try {
            a = new ActiveXObject(i), a && (r = n(a))
        } catch (l) {
        }
        return r
    }
};
mejs.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function (e) {
    var t = [],
        i = e.GetVariable("$version");
    return i && (i = i.split(" ")[1].split(","), t = [parseInt(i[0], 10), parseInt(i[1], 10), parseInt(i[2], 10)]), t
}), mejs.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl", function (e) {
    var t = [0, 0, 0, 0],
        i = function (e, t, i, n) {
            for (; e.isVersionSupported(t[0] + "." + t[1] + "." + t[2] + "." + t[3]);) t[i] += n;
            t[i] -= n
        };
    return i(e, t, 0, 1), i(e, t, 1, 1), i(e, t, 2, 1e4), i(e, t, 2, 1e3), i(e, t, 2, 100), i(e, t, 2, 10), i(e, t, 2, 1), i(e, t, 3, 1), t
});
mejs.MediaFeatures = {
    init: function () {
        var e, t, i = this,
            n = document,
            o = mejs.PluginDetector.nav,
            s = mejs.PluginDetector.ua.toLowerCase(),
            a = ["source", "track", "audio", "video"];
        i.isiPad = null !== s.match(/ipad/i), i.isiPhone = null !== s.match(/iphone/i), i.isiOS = i.isiPhone || i.isiPad, i.isAndroid = null !== s.match(/android/i), i.isBustedAndroid = null !== s.match(/android 2\.[12]/), i.isBustedNativeHTTPS = "https:" === location.protocol && (null !== s.match(/android [12]\./) || null !== s.match(/macintosh.* version.* safari/)), i.isIE = -1 != o.appName.toLowerCase().indexOf("microsoft") || null !== o.appName.toLowerCase().match(/trident/gi), i.isChrome = null !== s.match(/chrome/gi), i.isChromium = null !== s.match(/chromium/gi), i.isFirefox = null !== s.match(/firefox/gi), i.isWebkit = null !== s.match(/webkit/gi), i.isGecko = null !== s.match(/gecko/gi) && !i.isWebkit && !i.isIE, i.isOpera = null !== s.match(/opera/gi), i.hasTouch = "ontouchstart" in window, i.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
        for (e = 0; e < a.length; e++) t = document.createElement(a[e]);
        i.supportsMediaTag = "undefined" != typeof t.canPlayType || i.isBustedAndroid;
        try {
            t.canPlayType("video/mp4")
        } catch (r) {
            i.supportsMediaTag = !1
        }
        i.hasSemiNativeFullScreen = "undefined" != typeof t.webkitEnterFullscreen, i.hasNativeFullscreen = "undefined" != typeof t.requestFullscreen, i.hasWebkitNativeFullScreen = "undefined" != typeof t.webkitRequestFullScreen, i.hasMozNativeFullScreen = "undefined" != typeof t.mozRequestFullScreen, i.hasMsNativeFullScreen = "undefined" != typeof t.msRequestFullscreen, i.hasTrueNativeFullScreen = i.hasWebkitNativeFullScreen || i.hasMozNativeFullScreen || i.hasMsNativeFullScreen, i.nativeFullScreenEnabled = i.hasTrueNativeFullScreen, i.hasMozNativeFullScreen ? i.nativeFullScreenEnabled = document.mozFullScreenEnabled : i.hasMsNativeFullScreen && (i.nativeFullScreenEnabled = document.msFullscreenEnabled), i.isChrome && (i.hasSemiNativeFullScreen = !1), i.hasTrueNativeFullScreen && (i.fullScreenEventName = "", i.hasWebkitNativeFullScreen ? i.fullScreenEventName = "webkitfullscreenchange" : i.hasMozNativeFullScreen ? i.fullScreenEventName = "mozfullscreenchange" : i.hasMsNativeFullScreen && (i.fullScreenEventName = "MSFullscreenChange"), i.isFullScreen = function () {
            return i.hasMozNativeFullScreen ? n.mozFullScreen : i.hasWebkitNativeFullScreen ? n.webkitIsFullScreen : i.hasMsNativeFullScreen ? null !== n.msFullscreenElement : void 0
        }, i.requestFullScreen = function (e) {
            i.hasWebkitNativeFullScreen ? e.webkitRequestFullScreen() : i.hasMozNativeFullScreen ? e.mozRequestFullScreen() : i.hasMsNativeFullScreen && e.msRequestFullscreen()
        }, i.cancelFullScreen = function () {
            i.hasWebkitNativeFullScreen ? document.webkitCancelFullScreen() : i.hasMozNativeFullScreen ? document.mozCancelFullScreen() : i.hasMsNativeFullScreen && document.msExitFullscreen()
        }), i.hasSemiNativeFullScreen && s.match(/mac os x 10_5/i) && (i.hasNativeFullScreen = !1, i.hasSemiNativeFullScreen = !1)
    }
};
mejs.MediaFeatures.init();
mejs.HtmlMediaElement = {
    pluginType: "native",
    isFullScreen: !1,
    setCurrentTime: function (e) {
        this.currentTime = e
    },
    setMuted: function (e) {
        this.muted = e
    },
    setVolume: function (e) {
        this.volume = e
    },
    stop: function () {
        this.pause()
    },
    setSrc: function (e) {
        for (var t = this.getElementsByTagName("source"); t.length > 0;) this.removeChild(t[0]);
        if ("string" == typeof e) this.src = e;
        else {
            var i, n;
            for (i = 0; i < e.length; i++)
                if (n = e[i], this.canPlayType(n.type)) {
                    this.src = n.src;
                    break
                }
        }
    },
    setVideoSize: function (e, t) {
        this.width = e, this.height = t
    }
};
mejs.PluginMediaElement = function (e, t, i) {
    this.id = e, this.pluginType = t, this.src = i, this.events = {}, this.attributes = {}
};
mejs.PluginMediaElement.prototype = {
    pluginElement: null,
    pluginType: "",
    isFullScreen: !1,
    playbackRate: -1,
    defaultPlaybackRate: -1,
    seekable: [],
    played: [],
    paused: !0,
    ended: !1,
    seeking: !1,
    duration: 0,
    error: null,
    tagName: "",
    muted: !1,
    volume: 1,
    currentTime: 0,
    play: function () {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.playVideo() : this.pluginApi.playMedia(), this.paused = !1)
    },
    load: function () {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType || this.pluginApi.loadMedia(), this.paused = !1)
    },
    pause: function () {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.pauseVideo() : this.pluginApi.pauseMedia(), this.paused = !0)
    },
    stop: function () {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.stopVideo() : this.pluginApi.stopMedia(), this.paused = !0)
    },
    canPlayType: function (e) {
        var t, i, n, o = mejs.plugins[this.pluginType];
        for (t = 0; t < o.length; t++)
            if (n = o[t], mejs.PluginDetector.hasPluginVersion(this.pluginType, n.version))
                for (i = 0; i < n.types.length; i++)
                    if (e == n.types[i]) return "probably";
        return ""
    },
    positionFullscreenButton: function (e, t, i) {
        null != this.pluginApi && this.pluginApi.positionFullscreenButton && this.pluginApi.positionFullscreenButton(Math.floor(e), Math.floor(t), i)
    },
    hideFullscreenButton: function () {
        null != this.pluginApi && this.pluginApi.hideFullscreenButton && this.pluginApi.hideFullscreenButton()
    },
    setSrc: function (e) {
        if ("string" == typeof e) this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(e)), this.src = mejs.Utility.absolutizeUrl(e);
        else {
            var t, i;
            for (t = 0; t < e.length; t++)
                if (i = e[t], this.canPlayType(i.type)) {
                    this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(i.src)), this.src = mejs.Utility.absolutizeUrl(i.src);
                    break
                }
        }
    },
    setCurrentTime: function (e) {
        null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.seekTo(e) : this.pluginApi.setCurrentTime(e), this.currentTime = e)
    },
    setVolume: function (e) {
        null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.setVolume(100 * e) : this.pluginApi.setVolume(e), this.volume = e)
    },
    setMuted: function (e) {
        null != this.pluginApi && ("youtube" == this.pluginType ? (e ? this.pluginApi.mute() : this.pluginApi.unMute(), this.muted = e, this.dispatchEvent({
            type: "volumechange"
        })) : this.pluginApi.setMuted(e), this.muted = e)
    },
    setVideoSize: function (e, t) {
        this.pluginElement && this.pluginElement.style && (this.pluginElement.style.width = e + "px", this.pluginElement.style.height = t + "px"), null != this.pluginApi && this.pluginApi.setVideoSize && this.pluginApi.setVideoSize(e, t)
    },
    setFullscreen: function (e) {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.pluginApi.setFullscreen(e)
    },
    enterFullScreen: function () {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!0)
    },
    exitFullScreen: function () {
        null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!1)
    },
    addEventListener: function (e, t, i) {
        this.events[e] = this.events[e] || [], this.events[e].push(t)
    },
    removeEventListener: function (e, t) {
        if (!e) return this.events = {}, !0;
        var i = this.events[e];
        if (!i) return !0;
        if (!t) return this.events[e] = [], !0;
        for (var n = 0; n < i.length; n++)
            if (i[n] === t) return this.events[e].splice(n, 1), !0;
        return !1
    },
    dispatchEvent: function (e) {
        var t, i = this.events[e.type];
        if (i)
            for (t = 0; t < i.length; t++) i[t].apply(this, [e])
    },
    hasAttribute: function (e) {
        return e in this.attributes
    },
    removeAttribute: function (e) {
        delete this.attributes[e]
    },
    getAttribute: function (e) {
        return this.hasAttribute(e) ? this.attributes[e] : ""
    },
    setAttribute: function (e, t) {
        this.attributes[e] = t
    },
    remove: function () {
        mejs.Utility.removeSwf(this.pluginElement.id), mejs.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id)
    }
};
mejs.MediaPluginBridge = {
    pluginMediaElements: {},
    htmlMediaElements: {},
    registerPluginElement: function (e, t, i) {
        this.pluginMediaElements[e] = t, this.htmlMediaElements[e] = i
    },
    unregisterPluginElement: function (e) {
        delete this.pluginMediaElements[e], delete this.htmlMediaElements[e]
    },
    initPlugin: function (e) {
        var t = this.pluginMediaElements[e],
            i = this.htmlMediaElements[e];
        if (t) {
            switch (t.pluginType) {
                case "flash":
                    t.pluginElement = t.pluginApi = document.getElementById(e);
                    break;
                case "silverlight":
                    t.pluginElement = document.getElementById(t.id), t.pluginApi = t.pluginElement.Content.MediaElementJS
            }
            null != t.pluginApi && t.success && t.success(t, i)
        }
    },
    fireEvent: function (e, t, i) {
        var n, o, s, a = this.pluginMediaElements[e];
        if (a) {
            n = {
                type: t,
                target: a
            };
            for (o in i) a[o] = i[o], n[o] = i[o];
            s = i.bufferedTime || 0, n.target.buffered = n.buffered = {
                start: function (e) {
                    return 0
                },
                end: function (e) {
                    return s
                },
                length: 1
            }, a.dispatchEvent(n)
        }
    }
};
mejs.MediaElementDefaults = {
    mode: "auto",
    plugins: ["flash", "silverlight", "youtube", "vimeo"],
    enablePluginDebug: !1,
    httpsBasicAuthSite: !1,
    type: "",
    pluginPath: mejs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
    flashName: "flashmediaelement.swf",
    flashStreamer: "",
    flashScriptAccess: "sameDomain",
    enablePluginSmoothing: !1,
    enablePseudoStreaming: !1,
    pseudoStreamingStartQueryParam: "start",
    silverlightName: "silverlightmediaelement.xap",
    defaultVideoWidth: 480,
    defaultVideoHeight: 270,
    pluginWidth: -1,
    pluginHeight: -1,
    pluginVars: [],
    timerRate: 250,
    startVolume: .8,
    success: function () {
    },
    error: function () {
    }
};
mejs.MediaElement = function (e, t) {
    return mejs.HtmlMediaElementShim.create(e, t)
};
mejs.HtmlMediaElementShim = {
    create: function (e, t) {
        var i, n, o = {},
            s = "string" == typeof e ? document.getElementById(e) : e,
            a = s.tagName.toLowerCase(),
            r = "audio" === a || "video" === a,
            l = r ? s.getAttribute("src") : s.getAttribute("href"),
            d = s.getAttribute("poster"),
            c = s.getAttribute("autoplay"),
            u = s.getAttribute("preload"),
            h = s.getAttribute("controls");
        for (n in mejs.MediaElementDefaults) o[n] = mejs.MediaElementDefaults[n];
        for (n in t) o[n] = t[n];
        return l = "undefined" == typeof l || null === l || "" == l ? null : l, d = "undefined" == typeof d || null === d ? "" : d, u = "undefined" == typeof u || null === u || "false" === u ? "none" : u, c = !("undefined" == typeof c || null === c || "false" === c), h = !("undefined" == typeof h || null === h || "false" === h), i = this.determinePlayback(s, o, mejs.MediaFeatures.supportsMediaTag, r, l), i.url = null !== i.url ? mejs.Utility.absolutizeUrl(i.url) : "", "native" == i.method ? (mejs.MediaFeatures.isBustedAndroid && (s.src = i.url, s.addEventListener("click", function () {
            s.play()
        }, !1)), this.updateNative(i, o, c, u)) : "" !== i.method ? this.createPlugin(i, o, d, c, u, h) : (this.createErrorMessage(i, o, d), this)
    },
    determinePlayback: function (e, t, i, n, o) {
        var s, a, r, l, d, c, u, h, p, m, f, g = [],
            v = {
                method: "",
                url: "",
                htmlMediaElement: e,
                isVideo: "audio" != e.tagName.toLowerCase()
            };
        if ("undefined" != typeof t.type && "" !== t.type)
            if ("string" == typeof t.type) g.push({
                type: t.type,
                url: o
            });
            else
                for (s = 0; s < t.type.length; s++) g.push({
                    type: t.type[s],
                    url: o
                });
        else if (null !== o) c = this.formatType(o, e.getAttribute("type")), g.push({
            type: c,
            url: o
        });
        else
            for (s = 0; s < e.childNodes.length; s++) d = e.childNodes[s], 1 == d.nodeType && "source" == d.tagName.toLowerCase() && (o = d.getAttribute("src"), c = this.formatType(o, d.getAttribute("type")), f = d.getAttribute("media"), (!f || !window.matchMedia || window.matchMedia && window.matchMedia(f).matches) && g.push({
                type: c,
                url: o
            }));
        if (!n && g.length > 0 && null !== g[0].url && this.getTypeFromFile(g[0].url).indexOf("audio") > -1 && (v.isVideo = !1), mejs.MediaFeatures.isBustedAndroid && (e.canPlayType = function (e) {
            return null !== e.match(/video\/(mp4|m4v)/gi) ? "maybe" : ""
        }), mejs.MediaFeatures.isChromium && (e.canPlayType = function (e) {
            return null !== e.match(/video\/(webm|ogv|ogg)/gi) ? "maybe" : ""
        }), i && ("auto" === t.mode || "auto_plugin" === t.mode || "native" === t.mode) && (!mejs.MediaFeatures.isBustedNativeHTTPS || t.httpsBasicAuthSite !== !0)) {
            for (n || (m = document.createElement(v.isVideo ? "video" : "audio"), e.parentNode.insertBefore(m, e), e.style.display = "none", v.htmlMediaElement = e = m), s = 0; s < g.length; s++)
                if ("video/m3u8" == g[s].type || "" !== e.canPlayType(g[s].type).replace(/no/, "") || "" !== e.canPlayType(g[s].type.replace(/mp3/, "mpeg")).replace(/no/, "") || "" !== e.canPlayType(g[s].type.replace(/m4a/, "mp4")).replace(/no/, "")) {
                    v.method = "native", v.url = g[s].url;
                    break
                }
            if ("native" === v.method && (null !== v.url && (e.src = v.url), "auto_plugin" !== t.mode)) return v
        }
        if ("auto" === t.mode || "auto_plugin" === t.mode || "shim" === t.mode)
            for (s = 0; s < g.length; s++)
                for (c = g[s].type, a = 0; a < t.plugins.length; a++)
                    for (u = t.plugins[a], h = mejs.plugins[u], r = 0; r < h.length; r++)
                        if (p = h[r], null == p.version || mejs.PluginDetector.hasPluginVersion(u, p.version))
                            for (l = 0; l < p.types.length; l++)
                                if (c.toLowerCase() == p.types[l].toLowerCase()) return v.method = u, v.url = g[s].url, v;
        return "auto_plugin" === t.mode && "native" === v.method ? v : ("" === v.method && g.length > 0 && (v.url = g[0].url), v)
    },
    formatType: function (e, t) {
        return e && !t ? this.getTypeFromFile(e) : t && ~t.indexOf(";") ? t.substr(0, t.indexOf(";")) : t
    },
    getTypeFromFile: function (e) {
        e = e.split("?")[0];
        var t = e.substring(e.lastIndexOf(".") + 1).toLowerCase(),
            i = /(mp4|m4v|ogg|ogv|m3u8|webm|webmv|flv|wmv|mpeg|mov)/gi.test(t) ? "video/" : "audio/";
        return this.getTypeFromExtension(t, i)
    },
    getTypeFromExtension: function (e, t) {
        switch (t = t || "", e) {
            case "mp4":
            case "m4v":
            case "m4a":
            case "f4v":
            case "f4a":
                return t + "mp4";
            case "flv":
                return t + "x-flv";
            case "webm":
            case "webma":
            case "webmv":
                return t + "webm";
            case "ogg":
            case "oga":
            case "ogv":
                return t + "ogg";
            case "m3u8":
                return "application/x-mpegurl";
            case "ts":
                return t + "mp2t";
            default:
                return t + e
        }
    },
    createErrorMessage: function (e, t, i) {
        var n = e.htmlMediaElement,
            o = document.createElement("div"),
            s = t.customError;
        o.className = "me-cannotplay";
        try {
            o.style.width = n.width + "px", o.style.height = n.height + "px"
        } catch (a) {
        }
        s || (s = '<a href="' + e.url + '">', "" !== i && (s += '<img src="' + i + '" width="100%" height="100%" alt="" />'), s += "<span>" + mejs.i18n.t("Download File") + "</span></a>"), o.innerHTML = s, n.parentNode.insertBefore(o, n), n.style.display = "none", t.error(n)
    },
    createPlugin: function (e, t, i, n, o, s) {
        var a, r, l, d = e.htmlMediaElement,
            c = 1,
            u = 1,
            h = "me_" + e.method + "_" + mejs.meIndex++,
            p = new mejs.PluginMediaElement(h, e.method, e.url),
            m = document.createElement("div");
        p.tagName = d.tagName;
        for (var f = 0; f < d.attributes.length; f++) {
            var g = d.attributes[f];
            g.specified && p.setAttribute(g.name, g.value)
        }
        for (r = d.parentNode; null !== r && null != r.tagName && "body" !== r.tagName.toLowerCase() && null != r.parentNode && null != r.parentNode.tagName && null != r.parentNode.constructor && "ShadowRoot" === r.parentNode.constructor.name;) {
            if ("p" === r.parentNode.tagName.toLowerCase()) {
                r.parentNode.parentNode.insertBefore(r, r.parentNode);
                break
            }
            r = r.parentNode
        }
        switch (e.isVideo ? (c = t.pluginWidth > 0 ? t.pluginWidth : t.videoWidth > 0 ? t.videoWidth : null !== d.getAttribute("width") ? d.getAttribute("width") : t.defaultVideoWidth, u = t.pluginHeight > 0 ? t.pluginHeight : t.videoHeight > 0 ? t.videoHeight : null !== d.getAttribute("height") ? d.getAttribute("height") : t.defaultVideoHeight, c = mejs.Utility.encodeUrl(c), u = mejs.Utility.encodeUrl(u)) : t.enablePluginDebug && (c = 320, u = 240), p.success = t.success, mejs.MediaPluginBridge.registerPluginElement(h, p, d), m.className = "me-plugin", m.id = h + "_container", e.isVideo ? d.parentNode.insertBefore(m, d) : document.body.insertBefore(m, document.body.childNodes[0]), l = ["id=" + h, "jsinitfunction=mejs.MediaPluginBridge.initPlugin", "jscallbackfunction=mejs.MediaPluginBridge.fireEvent", "isvideo=" + (e.isVideo ? "true" : "false"), "autoplay=" + (n ? "true" : "false"), "preload=" + o, "width=" + c, "startvolume=" + t.startVolume, "timerrate=" + t.timerRate, "flashstreamer=" + t.flashStreamer, "height=" + u, "pseudostreamstart=" + t.pseudoStreamingStartQueryParam], null !== e.url && ("flash" == e.method ? l.push("file=" + mejs.Utility.encodeUrl(e.url)) : l.push("file=" + e.url)), t.enablePluginDebug && l.push("debug=true"), t.enablePluginSmoothing && l.push("smoothing=true"), t.enablePseudoStreaming && l.push("pseudostreaming=true"), s && l.push("controls=true"), t.pluginVars && (l = l.concat(t.pluginVars)), e.method) {
            case "silverlight":
                m.innerHTML = '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + h + '" name="' + h + '" width="' + c + '" height="' + u + '" class="mejs-shim"><param name="initParams" value="' + l.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + t.pluginPath + t.silverlightName + '" /></object>';
                break;
            case "flash":
                mejs.MediaFeatures.isIE ? (a = document.createElement("div"), m.appendChild(a), a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + h + '" width="' + c + '" height="' + u + '" class="mejs-shim"><param name="movie" value="' + t.pluginPath + t.flashName + "?x=" + new Date + '" /><param name="flashvars" value="' + l.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="' + t.flashScriptAccess + '" /><param name="allowFullScreen" value="true" /><param name="scale" value="default" /></object>') : m.innerHTML = '<embed id="' + h + '" name="' + h + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="' + t.flashScriptAccess + '" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' + t.pluginPath + t.flashName + '" flashvars="' + l.join("&") + '" width="' + c + '" height="' + u + '" scale="default"class="mejs-shim"></embed>';
                break;
            case "youtube":
                var v;
                -1 != e.url.lastIndexOf("youtu.be") ? (v = e.url.substr(e.url.lastIndexOf("/") + 1), -1 != v.indexOf("?") && (v = v.substr(0, v.indexOf("?")))) : v = e.url.substr(e.url.lastIndexOf("=") + 1), youtubeSettings = {
                    container: m,
                    containerId: m.id,
                    pluginMediaElement: p,
                    pluginId: h,
                    videoId: v,
                    height: u,
                    width: c
                }, mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0]) ? mejs.YouTubeApi.createFlash(youtubeSettings, t) : mejs.YouTubeApi.enqueueIframe(youtubeSettings);
                break;
            case "vimeo":
                var y = h + "_player";
                if (p.vimeoid = e.url.substr(e.url.lastIndexOf("/") + 1), m.innerHTML = '<iframe src="//player.vimeo.com/video/' + p.vimeoid + "?api=1&portrait=0&byline=0&title=0&player_id=" + y + '" width="' + c + '" height="' + u + '" frameborder="0" class="mejs-shim" id="' + y + '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>', "function" == typeof $f) {
                    var b = $f(m.childNodes[0]);
                    b.addEvent("ready", function () {
                        function e(e, t, i, n) {
                            var o = {
                                type: i,
                                target: t
                            };
                            "timeupdate" == i && (t.currentTime = o.currentTime = n.seconds, t.duration = o.duration = n.duration), t.dispatchEvent(o)
                        }

                        b.playVideo = function () {
                            b.api("play")
                        }, b.stopVideo = function () {
                            b.api("unload")
                        }, b.pauseVideo = function () {
                            b.api("pause")
                        }, b.seekTo = function (e) {
                            b.api("seekTo", e)
                        }, b.setVolume = function (e) {
                            b.api("setVolume", e)
                        }, b.setMuted = function (e) {
                            e ? (b.lastVolume = b.api("getVolume"), b.api("setVolume", 0)) : (b.api("setVolume", b.lastVolume), delete b.lastVolume)
                        }, b.addEvent("play", function () {
                            e(b, p, "play"), e(b, p, "playing")
                        }), b.addEvent("pause", function () {
                            e(b, p, "pause")
                        }), b.addEvent("finish", function () {
                            e(b, p, "ended")
                        }), b.addEvent("playProgress", function (t) {
                            e(b, p, "timeupdate", t)
                        }), p.pluginElement = m, p.pluginApi = b, mejs.MediaPluginBridge.initPlugin(h)
                    })
                } else console.warn("You need to include froogaloop for vimeo to work")
        }
        return d.style.display = "none", d.removeAttribute("autoplay"), p
    },
    updateNative: function (e, t, i, n) {
        var o, s = e.htmlMediaElement;
        for (o in mejs.HtmlMediaElement) s[o] = mejs.HtmlMediaElement[o];
        return t.success(s, s), s
    }
};
mejs.YouTubeApi = {
    isIframeStarted: !1,
    isIframeLoaded: !1,
    loadIframeApi: function () {
        if (!this.isIframeStarted) {
            var e = document.createElement("script");
            e.src = "//www.youtube.com/player_api";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t), this.isIframeStarted = !0
        }
    },
    iframeQueue: [],
    enqueueIframe: function (e) {
        this.isLoaded ? this.createIframe(e) : (this.loadIframeApi(), this.iframeQueue.push(e))
    },
    createIframe: function (e) {
        var t = e.pluginMediaElement,
            i = new YT.Player(e.containerId, {
                height: e.height,
                width: e.width,
                videoId: e.videoId,
                playerVars: {
                    controls: 0
                },
                events: {
                    onReady: function () {
                        e.pluginMediaElement.pluginApi = i, mejs.MediaPluginBridge.initPlugin(e.pluginId), setInterval(function () {
                            mejs.YouTubeApi.createEvent(i, t, "timeupdate")
                        }, 250)
                    },
                    onStateChange: function (e) {
                        mejs.YouTubeApi.handleStateChange(e.data, i, t)
                    }
                }
            })
    },
    createEvent: function (e, t, i) {
        var n = {
            type: i,
            target: t
        };
        if (e && e.getDuration) {
            t.currentTime = n.currentTime = e.getCurrentTime(), t.duration = n.duration = e.getDuration(), n.paused = t.paused, n.ended = t.ended, n.muted = e.isMuted(), n.volume = e.getVolume() / 100, n.bytesTotal = e.getVideoBytesTotal(), n.bufferedBytes = e.getVideoBytesLoaded();
            var o = n.bufferedBytes / n.bytesTotal * n.duration;
            n.target.buffered = n.buffered = {
                start: function (e) {
                    return 0
                },
                end: function (e) {
                    return o
                },
                length: 1
            }
        }
        t.dispatchEvent(n)
    },
    iFrameReady: function () {
        for (this.isLoaded = !0, this.isIframeLoaded = !0; this.iframeQueue.length > 0;) {
            var e = this.iframeQueue.pop();
            this.createIframe(e)
        }
    },
    flashPlayers: {},
    createFlash: function (e) {
        this.flashPlayers[e.pluginId] = e;
        var t,
            i = "//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" + e.pluginId + "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";
        mejs.MediaFeatures.isIE ? (t = document.createElement("div"), e.container.appendChild(t), t.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + e.pluginId + '" width="' + e.width + '" height="' + e.height + '" class="mejs-shim"><param name="movie" value="' + i + '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="' + options.flashScriptAccess + '" /><param name="allowFullScreen" value="true" /></object>') : e.container.innerHTML = '<object type="application/x-shockwave-flash" id="' + e.pluginId + '" data="' + i + '" width="' + e.width + '" height="' + e.height + '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="' + options.flashScriptAccess + '"><param name="wmode" value="transparent"></object>'
    },
    flashReady: function (e) {
        var t = this.flashPlayers[e],
            i = document.getElementById(e),
            n = t.pluginMediaElement;
        n.pluginApi = n.pluginElement = i, mejs.MediaPluginBridge.initPlugin(e), i.cueVideoById(t.videoId);
        var o = t.containerId + "_callback";
        window[o] = function (e) {
            mejs.YouTubeApi.handleStateChange(e, i, n)
        }, i.addEventListener("onStateChange", o), setInterval(function () {
            mejs.YouTubeApi.createEvent(i, n, "timeupdate")
        }, 250), mejs.YouTubeApi.createEvent(i, n, "canplay")
    },
    handleStateChange: function (e, t, i) {
        switch (e) {
            case -1:
                i.paused = !0, i.ended = !0, mejs.YouTubeApi.createEvent(t, i, "loadedmetadata");
                break;
            case 0:
                i.paused = !1, i.ended = !0, mejs.YouTubeApi.createEvent(t, i, "ended");
                break;
            case 1:
                i.paused = !1, i.ended = !1, mejs.YouTubeApi.createEvent(t, i, "play"), mejs.YouTubeApi.createEvent(t, i, "playing");
                break;
            case 2:
                i.paused = !0, i.ended = !1, mejs.YouTubeApi.createEvent(t, i, "pause");
                break;
            case 3:
                mejs.YouTubeApi.createEvent(t, i, "progress");
                break;
            case 5:
        }
    }
};
window.onYouTubePlayerAPIReady = function () {
    mejs.YouTubeApi.iFrameReady()
};
window.onYouTubePlayerReady = function (e) {
    mejs.YouTubeApi.flashReady(e)
};
window.mejs = mejs;
window.MediaElement = mejs.MediaElement;
!function () {
    e = document;
    t = mejs;
    "use strict";
    var n = {
        locale: {
            language: t.i18n && t.i18n.locale.language || "",
            strings: t.i18n && t.i18n.locale.strings || {}
        },
        ietf_lang_regex: /^(x\-)?[a-z]{2,}(\-\w{2,})?(\-\w{2,})?$/,
        methods: {}
    };
    n.getLanguage = function () {
        var e = n.locale.language || window.navigator.userLanguage || window.navigator.language;
        return n.ietf_lang_regex.exec(e) ? e : null
    }, "undefined" != typeof mejsL10n && (n.locale.language = mejsL10n.language), n.methods.checkPlain = function (e) {
        var t, i, n = {
            "&": "&amp;",
            '"': "&quot;",
            "<": "&lt;",
            ">": "&gt;"
        };
        e = String(e);
        for (t in n) n.hasOwnProperty(t) && (i = new RegExp(t, "g"), e = e.replace(i, n[t]));
        return e
    }, n.methods.t = function (e, t) {
        return n.locale.strings && n.locale.strings[t.context] && n.locale.strings[t.context][e] && (e = n.locale.strings[t.context][e]), n.methods.checkPlain(e)
    }, n.t = function (e, t) {
        if ("string" == typeof e && e.length > 0) {
            var i = n.getLanguage();
            return t = t || {
                context: i
            }, n.methods.t(e, t)
        }
        throw {
            name: "InvalidArgumentException",
            message: "First argument is either not a string or empty."
        }
    }, t.i18n = n
}();
!function (e, t) {
    "use strict";
    "undefined" != typeof mejsL10n && (e[mejsL10n.language] = mejsL10n.strings)
}(mejs.i18n.locale.strings), "undefined" != typeof jQuery ? mejs.$ = jQuery : "undefined" != typeof Zepto ? (mejs.$ = Zepto, Zepto.fn.outerWidth = function (e) {
    var t = $(this).width();
    return e && (t += parseInt($(this).css("margin-right"), 10), t += parseInt($(this).css("margin-left"), 10)), t
}) : "undefined" != typeof ender && (mejs.$ = ender);
!function (e) {
    mejs.MepDefaults = {
        poster: "",
        showPosterWhenEnded: !1,
        defaultVideoWidth: 480,
        defaultVideoHeight: 270,
        videoWidth: -1,
        videoHeight: -1,
        defaultAudioWidth: 400,
        defaultAudioHeight: 30,
        defaultSeekBackwardInterval: function (e) {
            return .05 * e.duration
        },
        defaultSeekForwardInterval: function (e) {
            return .05 * e.duration
        },
        setDimensions: !0,
        audioWidth: -1,
        audioHeight: -1,
        startVolume: .8,
        loop: !1,
        autoRewind: !0,
        enableAutosize: !0,
        timeFormat: "",
        alwaysShowHours: !1,
        showTimecodeFrameCount: !1,
        framesPerSecond: 25,
        autosizeProgress: !0,
        alwaysShowControls: !1,
        hideVideoControlsOnLoad: !1,
        clickToPlayPause: !0,
        iPadUseNativeControls: !1,
        iPhoneUseNativeControls: !1,
        AndroidUseNativeControls: !1,
        features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"],
        isVideo: !0,
        enableKeyboard: !0,
        pauseOtherPlayers: !0,
        keyActions: [{
            keys: [32, 179],
            action: function (e, t) {
                t.paused || t.ended ? t.play() : t.pause()
            }
        }, {
            keys: [38],
            action: function (e, t) {
                e.container.find(".mejs-volume-slider").css("display", "block"), e.isVideo && (e.showControls(), e.startControlsTimer());
                var i = Math.min(t.volume + .1, 1);
                t.setVolume(i)
            }
        }, {
            keys: [40],
            action: function (e, t) {
                e.container.find(".mejs-volume-slider").css("display", "block"), e.isVideo && (e.showControls(), e.startControlsTimer());
                var i = Math.max(t.volume - .1, 0);
                t.setVolume(i)
            }
        }, {
            keys: [37, 227],
            action: function (e, t) {
                if (!isNaN(t.duration) && t.duration > 0) {
                    e.isVideo && (e.showControls(), e.startControlsTimer());
                    var i = Math.max(t.currentTime - e.options.defaultSeekBackwardInterval(t), 0);
                    t.setCurrentTime(i)
                }
            }
        }, {
            keys: [39, 228],
            action: function (e, t) {
                if (!isNaN(t.duration) && t.duration > 0) {
                    e.isVideo && (e.showControls(), e.startControlsTimer());
                    var i = Math.min(t.currentTime + e.options.defaultSeekForwardInterval(t), t.duration);
                    t.setCurrentTime(i)
                }
            }
        }, {
            keys: [70],
            action: function (e, t) {
                "undefined" != typeof e.enterFullScreen && (e.isFullScreen ? e.exitFullScreen() : e.enterFullScreen())
            }
        }, {
            keys: [77],
            action: function (e, t) {
                e.container.find(".mejs-volume-slider").css("display", "block"), e.isVideo && (e.showControls(), e.startControlsTimer()), e.media.muted ? e.setMuted(!1) : e.setMuted(!0)
            }
        }]
    }, mejs.mepIndex = 0, mejs.players = {}, mejs.MediaElementPlayer = function (t, i) {
        if (!(this instanceof mejs.MediaElementPlayer)) return new mejs.MediaElementPlayer(t, i);
        var n = this;
        return n.$media = n.$node = e(t), n.node = n.media = n.$media[0], n.node ? "undefined" != typeof n.node.player ? n.node.player : ("undefined" == typeof i && (i = n.$node.data("mejsoptions")), n.options = e.extend({}, mejs.MepDefaults, i), n.options.timeFormat || (n.options.timeFormat = "mm:ss", n.options.alwaysShowHours && (n.options.timeFormat = "hh:mm:ss"), n.options.showTimecodeFrameCount && (n.options.timeFormat += ":ff")), mejs.Utility.calculateTimeFormat(0, n.options, n.options.framesPerSecond || 25), n.id = "mep_" + mejs.mepIndex++, mejs.players[n.id] = n, n.init(), n) : void 0
    }, mejs.MediaElementPlayer.prototype = {
        hasFocus: !1,
        controlsAreVisible: !0,
        init: function () {
            var t = this,
                i = mejs.MediaFeatures,
                n = e.extend(!0, {}, t.options, {
                    success: function (e, i) {
                        t.meReady(e, i)
                    },
                    error: function (e) {
                        t.handleError(e)
                    }
                }),
                o = t.media.tagName.toLowerCase();
            if (t.isDynamic = "audio" !== o && "video" !== o, t.isDynamic ? t.isVideo = t.options.isVideo : t.isVideo = "audio" !== o && t.options.isVideo, i.isiPad && t.options.iPadUseNativeControls || i.isiPhone && t.options.iPhoneUseNativeControls) t.$media.attr("controls", "controls"), i.isiPad && null !== t.media.getAttribute("autoplay") && t.play();
            else if (i.isAndroid && t.options.AndroidUseNativeControls) ;
            else {
                t.$media.removeAttr("controls");
                var s = t.isVideo ? mejs.i18n.t("Video Player") : mejs.i18n.t("Audio Player");
                if (e('<span class="mejs-offscreen">' + s + "</span>").insertBefore(t.$media), t.container = e('<div id="' + t.id + '" class="mejs-container ' + (mejs.MediaFeatures.svg ? "svg" : "no-svg") + '" tabindex="0" role="application" aria-label="' + s + '"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>').addClass(t.$media[0].className).insertBefore(t.$media).focus(function (e) {
                    if (!t.controlsAreVisible) {
                        t.showControls(!0);
                        var i = t.container.find(".mejs-playpause-button > button");
                        i.focus()
                    }
                }), t.container.addClass((i.isAndroid ? "mejs-android " : "") + (i.isiOS ? "mejs-ios " : "") + (i.isiPad ? "mejs-ipad " : "") + (i.isiPhone ? "mejs-iphone " : "") + (t.isVideo ? "mejs-video " : "mejs-audio ")), i.isiOS) {
                    var a = t.$media.clone();
                    t.container.find(".mejs-mediaelement").append(a), t.$media.remove(), t.$node = t.$media = a, t.node = t.media = a[0]
                } else t.container.find(".mejs-mediaelement").append(t.$media);
                t.node.player = t, t.controls = t.container.find(".mejs-controls"), t.layers = t.container.find(".mejs-layers");
                var r = t.isVideo ? "video" : "audio",
                    l = r.substring(0, 1).toUpperCase() + r.substring(1);
                t.options[r + "Width"] > 0 || t.options[r + "Width"].toString().indexOf("%") > -1 ? t.width = t.options[r + "Width"] : "" !== t.media.style.width && null !== t.media.style.width ? t.width = t.media.style.width : null !== t.media.getAttribute("width") ? t.width = t.$media.attr("width") : t.width = t.options["default" + l + "Width"], t.options[r + "Height"] > 0 || t.options[r + "Height"].toString().indexOf("%") > -1 ? t.height = t.options[r + "Height"] : "" !== t.media.style.height && null !== t.media.style.height ? t.height = t.media.style.height : null !== t.$media[0].getAttribute("height") ? t.height = t.$media.attr("height") : t.height = t.options["default" + l + "Height"], t.setPlayerSize(t.width, t.height), n.pluginWidth = t.width, n.pluginHeight = t.height
            }
            mejs.MediaElement(t.$media[0], n), "undefined" != typeof t.container && t.controlsAreVisible && t.container.trigger("controlsshown")
        },
        showControls: function (e) {
            var t = this;
            e = "undefined" == typeof e || e, t.controlsAreVisible || (e ? (t.controls.css("visibility", "visible").stop(!0, !0).fadeIn(200, function () {
                t.controlsAreVisible = !0, t.container.trigger("controlsshown")
            }), t.container.find(".mejs-control").css("visibility", "visible").stop(!0, !0).fadeIn(200, function () {
                t.controlsAreVisible = !0
            })) : (t.controls.css("visibility", "visible").css("display", "block"), t.container.find(".mejs-control").css("visibility", "visible").css("display", "block"), t.controlsAreVisible = !0, t.container.trigger("controlsshown")), t.setControlsSize())
        },
        hideControls: function (t) {
            var i = this;
            t = "undefined" == typeof t || t, !i.controlsAreVisible || i.options.alwaysShowControls || i.keyboardAction || (t ? (i.controls.stop(!0, !0).fadeOut(200, function () {
                e(this).css("visibility", "hidden").css("display", "block"), i.controlsAreVisible = !1, i.container.trigger("controlshidden")
            }), i.container.find(".mejs-control").stop(!0, !0).fadeOut(200, function () {
                e(this).css("visibility", "hidden").css("display", "block")
            })) : (i.controls.css("visibility", "hidden").css("display", "block"), i.container.find(".mejs-control").css("visibility", "hidden").css("display", "block"), i.controlsAreVisible = !1, i.container.trigger("controlshidden")))
        },
        controlsTimer: null,
        startControlsTimer: function (e) {
            var t = this;
            e = "undefined" != typeof e ? e : 1500, t.killControlsTimer("start"), t.controlsTimer = setTimeout(function () {
                t.hideControls(), t.killControlsTimer("hide")
            }, e)
        },
        killControlsTimer: function (e) {
            var t = this;
            null !== t.controlsTimer && (clearTimeout(t.controlsTimer), delete t.controlsTimer, t.controlsTimer = null)
        },
        controlsEnabled: !0,
        disableControls: function () {
            var e = this;
            e.killControlsTimer(), e.hideControls(!1), this.controlsEnabled = !1
        },
        enableControls: function () {
            var e = this;
            e.showControls(!1), e.controlsEnabled = !0
        },
        meReady: function (t, i) {
            var n, o, s = this,
                a = mejs.MediaFeatures,
                r = i.getAttribute("autoplay"),
                l = !("undefined" == typeof r || null === r || "false" === r);
            if (!s.created) {
                if (s.created = !0, s.media = t, s.domNode = i, !(a.isAndroid && s.options.AndroidUseNativeControls || a.isiPad && s.options.iPadUseNativeControls || a.isiPhone && s.options.iPhoneUseNativeControls)) {
                    s.buildposter(s, s.controls, s.layers, s.media), s.buildkeyboard(s, s.controls, s.layers, s.media), s.buildoverlays(s, s.controls, s.layers, s.media), s.findTracks();
                    for (n in s.options.features)
                        if (o = s.options.features[n], s["build" + o]) try {
                            s["build" + o](s, s.controls, s.layers, s.media)
                        } catch (d) {
                        }
                    s.container.trigger("controlsready"), s.setPlayerSize(s.width, s.height), s.setControlsSize(), s.isVideo && (mejs.MediaFeatures.hasTouch ? s.$media.bind("touchstart", function () {
                        s.controlsAreVisible ? s.hideControls(!1) : s.controlsEnabled && s.showControls(!1)
                    }) : (s.clickToPlayPauseCallback = function () {
                        s.options.clickToPlayPause && (s.media.paused ? s.play() : s.pause())
                    }, s.media.addEventListener("click", s.clickToPlayPauseCallback, !1), s.container.bind("mouseenter", function () {
                        s.controlsEnabled && (s.options.alwaysShowControls || (s.killControlsTimer("enter"), s.showControls(), s.startControlsTimer(2500)))
                    }).bind("mousemove", function () {
                        s.controlsEnabled && (s.controlsAreVisible || s.showControls(), s.options.alwaysShowControls || s.startControlsTimer(2500))
                    }).bind("mouseleave", function () {
                        s.controlsEnabled && (s.media.paused || s.options.alwaysShowControls || s.startControlsTimer(1e3))
                    })), s.options.hideVideoControlsOnLoad && s.hideControls(!1), l && !s.options.alwaysShowControls && s.hideControls(), s.options.enableAutosize && s.media.addEventListener("loadedmetadata", function (e) {
                        s.options.videoHeight <= 0 && null === s.domNode.getAttribute("height") && !isNaN(e.target.videoHeight) && (s.setPlayerSize(e.target.videoWidth, e.target.videoHeight), s.setControlsSize(), s.media.setVideoSize(e.target.videoWidth, e.target.videoHeight))
                    }, !1)), t.addEventListener("play", function () {
                        var e;
                        for (e in mejs.players) {
                            var t = mejs.players[e];
                            t.id == s.id || !s.options.pauseOtherPlayers || t.paused || t.ended || t.pause(), t.hasFocus = !1
                        }
                        s.hasFocus = !0
                    }, !1), s.media.addEventListener("ended", function (t) {
                        if (s.options.autoRewind) try {
                            s.media.setCurrentTime(0), window.setTimeout(function () {
                                e(s.container).find(".mejs-overlay-loading").parent().hide()
                            }, 20)
                        } catch (i) {
                        }
                        s.media.pause(), s.setProgressRail && s.setProgressRail(), s.setCurrentRail && s.setCurrentRail(), s.options.loop ? s.play() : !s.options.alwaysShowControls && s.controlsEnabled && s.showControls()
                    }, !1), s.media.addEventListener("loadedmetadata", function (e) {
                        s.updateDuration && s.updateDuration(), s.updateCurrent && s.updateCurrent(), s.isFullScreen || (s.setPlayerSize(s.width, s.height), s.setControlsSize())
                    }, !1);
                    var c = null;
                    s.media.addEventListener("timeupdate", function () {
                        c !== this.duration && (c = this.duration, mejs.Utility.calculateTimeFormat(c, s.options, s.options.framesPerSecond || 25))
                    }, !1), s.container.focusout(function (t) {
                        if (t.relatedTarget) {
                            var i = e(t.relatedTarget);
                            s.keyboardAction && 0 === i.parents(".mejs-container").length && (s.keyboardAction = !1, s.hideControls(!0))
                        }
                    }), setTimeout(function () {
                        s.setPlayerSize(s.width, s.height), s.setControlsSize()
                    }, 50), s.globalBind("resize", function () {
                        s.isFullScreen || mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen || s.setPlayerSize(s.width, s.height), s.setControlsSize()
                    }), "youtube" == s.media.pluginType && (a.isiOS || a.isAndroid) && s.container.find(".mejs-overlay-play").hide()
                }
                l && "native" == t.pluginType && s.play(), s.options.success && ("string" == typeof s.options.success ? window[s.options.success](s.media, s.domNode, s) : s.options.success(s.media, s.domNode, s))
            }
        },
        handleError: function (e) {
            var t = this;
            t.controls.hide(), t.options.error && t.options.error(e)
        },
        setPlayerSize: function (t, i) {
            var n = this;
            if (!n.options.setDimensions) return !1;
            if ("undefined" != typeof t && (n.width = t), "undefined" != typeof i && (n.height = i), n.height.toString().indexOf("%") > 0 || "none" !== n.$node.css("max-width") && "t.width" !== n.$node.css("max-width") || n.$node[0].currentStyle && "100%" === n.$node[0].currentStyle.maxWidth) {
                var o = function () {
                        return n.isVideo ? n.media.videoWidth && n.media.videoWidth > 0 ? n.media.videoWidth : null !== n.media.getAttribute("width") ? n.media.getAttribute("width") : n.options.defaultVideoWidth : n.options.defaultAudioWidth
                    }(),
                    s = function () {
                        return n.isVideo ? n.media.videoHeight && n.media.videoHeight > 0 ? n.media.videoHeight : null !== n.media.getAttribute("height") ? n.media.getAttribute("height") : n.options.defaultVideoHeight : n.options.defaultAudioHeight
                    }(),
                    a = n.container.parent().closest(":visible").width(),
                    r = n.container.parent().closest(":visible").height(),
                    l = n.isVideo || !n.options.autosizeProgress ? parseInt(a * s / o, 10) : s;
                isNaN(l) && (l = r), n.container.parent().length > 0 && "body" === n.container.parent()[0].tagName.toLowerCase() && (a = e(window).width(), l = e(window).height()), l && a && (n.container.width(a).height(l), n.$media.add(n.container.find(".mejs-shim")).width("100%").height("100%"), n.isVideo && n.media.setVideoSize && n.media.setVideoSize(a, l), n.layers.children(".mejs-layer").width("100%").height("100%"))
            } else n.container.width(n.width).height(n.height), n.layers.children(".mejs-layer").width(n.width).height(n.height)
        },
        setControlsSize: function () {
            var t = this,
                i = 0,
                n = 0,
                o = t.controls.find(".mejs-time-rail"),
                s = t.controls.find(".mejs-time-total"),
                a = o.siblings(),
                r = a.last(),
                l = null;
            if (t.container.is(":visible") && o.length && o.is(":visible")) {
                t.options && !t.options.autosizeProgress && (n = parseInt(o.css("width"), 10)), 0 !== n && n || (a.each(function () {
                    var t = e(this);
                    "absolute" != t.css("position") && t.is(":visible") && (i += e(this).outerWidth(!0))
                }), n = t.controls.width() - i - (o.outerWidth(!0) - o.width()));
                do o.width(n), s.width(n - (s.outerWidth(!0) - s.width())), "absolute" != r.css("position") && (l = r.length ? r.position() : null, n--); while (null !== l && l.top > 0 && n > 0);
                t.container.trigger("controlsresize")
            }
        },
        buildposter: function (t, i, n, o) {
            var s = this,
                a = e('<div class="mejs-poster mejs-layer"></div>').appendTo(n),
                r = t.$media.attr("poster");
            "" !== t.options.poster && (r = t.options.poster), r ? s.setPoster(r) : a.hide(), o.addEventListener("play", function () {
                a.hide()
            }, !1), t.options.showPosterWhenEnded && t.options.autoRewind && o.addEventListener("ended", function () {
                a.show()
            }, !1)
        },
        setPoster: function (t) {
            var i = this,
                n = i.container.find(".mejs-poster"),
                o = n.find("img");
            0 === o.length && (o = e('<img width="100%" height="100%" alt="" />').appendTo(n)), o.attr("src", t), n.css({
                "background-image": "url(" + t + ")"
            })
        },
        buildoverlays: function (t, i, n, o) {
            var s = this;
            if (t.isVideo) {
                var a = e('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>').hide().appendTo(n),
                    r = e('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>').hide().appendTo(n),
                    l = e('<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button"></div></div>').appendTo(n).bind("click", function () {
                        s.options.clickToPlayPause && o.paused && o.play()
                    });
                o.addEventListener("play", function () {
                    l.hide(), a.hide(), i.find(".mejs-time-buffering").hide(), r.hide()
                }, !1), o.addEventListener("playing", function () {
                    l.hide(), a.hide(), i.find(".mejs-time-buffering").hide(), r.hide()
                }, !1), o.addEventListener("seeking", function () {
                    a.show(), i.find(".mejs-time-buffering").show()
                }, !1), o.addEventListener("seeked", function () {
                    a.hide(), i.find(".mejs-time-buffering").hide()
                }, !1), o.addEventListener("pause", function () {
                    mejs.MediaFeatures.isiPhone || l.show()
                }, !1), o.addEventListener("waiting", function () {
                    a.show(), i.find(".mejs-time-buffering").show()
                }, !1), o.addEventListener("loadeddata", function () {
                    a.show(), i.find(".mejs-time-buffering").show(), mejs.MediaFeatures.isAndroid && (o.canplayTimeout = window.setTimeout(function () {
                        if (document.createEvent) {
                            var e = document.createEvent("HTMLEvents");
                            return e.initEvent("canplay", !0, !0), o.dispatchEvent(e)
                        }
                    }, 300))
                }, !1), o.addEventListener("canplay", function () {
                    a.hide(), i.find(".mejs-time-buffering").hide(), clearTimeout(o.canplayTimeout)
                }, !1), o.addEventListener("error", function (e) {
                    s.handleError(e), a.hide(), l.hide(), r.show(), r.find(".mejs-overlay-error").html("Error loading this resource")
                }, !1), o.addEventListener("keydown", function (e) {
                    s.onkeydown(t, o, e)
                }, !1)
            }
        },
        buildkeyboard: function (t, i, n, o) {
            var s = this;
            s.container.keydown(function () {
                s.keyboardAction = !0
            }), s.globalBind("keydown", function (i) {
                return t.hasFocus = 0 !== e(i.target).closest(".mejs-container").length, s.onkeydown(t, o, i)
            }), s.globalBind("click", function (i) {
                t.hasFocus = 0 !== e(i.target).closest(".mejs-container").length
            })
        },
        onkeydown: function (e, t, i) {
            if (e.hasFocus && e.options.enableKeyboard)
                for (var n = 0, o = e.options.keyActions.length; o > n; n++)
                    for (var s = e.options.keyActions[n], a = 0, r = s.keys.length; r > a; a++)
                        if (i.keyCode == s.keys[a]) return "function" == typeof i.preventDefault && i.preventDefault(), s.action(e, t, i.keyCode), !1;
            return !0
        },
        findTracks: function () {
            var t = this,
                i = t.$media.find("track");
            t.tracks = [], i.each(function (i, n) {
                n = e(n), t.tracks.push({
                    srclang: n.attr("srclang") ? n.attr("srclang").toLowerCase() : "",
                    src: n.attr("src"),
                    kind: n.attr("kind"),
                    label: n.attr("label") || "",
                    entries: [],
                    isLoaded: !1
                })
            })
        },
        changeSkin: function (e) {
            this.container[0].className = "mejs-container " + e, this.setPlayerSize(this.width, this.height), this.setControlsSize()
        },
        play: function () {
            this.load(), this.media.play()
        },
        pause: function () {
            try {
                this.media.pause()
            } catch (e) {
            }
        },
        load: function () {
            this.isLoaded || this.media.load(), this.isLoaded = !0
        },
        setMuted: function (e) {
            this.media.setMuted(e)
        },
        setCurrentTime: function (e) {
            this.media.setCurrentTime(e)
        },
        getCurrentTime: function () {
            return this.media.currentTime
        },
        setVolume: function (e) {
            this.media.setVolume(e)
        },
        getVolume: function () {
            return this.media.volume
        },
        setSrc: function (e) {
            this.media.setSrc(e)
        },
        remove: function () {
            var e, t, i = this;
            i.container.prev(".mejs-offscreen").remove();
            for (e in i.options.features)
                if (t = i.options.features[e], i["clean" + t]) try {
                    i["clean" + t](i)
                } catch (n) {
                }
            i.isDynamic ? i.$node.insertBefore(i.container) : (i.$media.prop("controls", !0), i.$node.clone().insertBefore(i.container).show(), i.$node.remove()), "native" !== i.media.pluginType && i.media.remove(), delete mejs.players[i.id], "object" == typeof i.container && i.container.remove(), i.globalUnbind(), delete i.node.player
        },
        rebuildtracks: function () {
            var e = this;
            e.findTracks(), e.buildtracks(e, e.controls, e.layers, e.media)
        },
        resetSize: function () {
            var e = this;
            setTimeout(function () {
                e.setPlayerSize(e.width, e.height), e.setControlsSize()
            }, 50)
        }
    },
        function () {
            function t(t, n) {
                var o = {
                    d: [],
                    w: []
                };
                return e.each((t || "").split(" "), function (e, t) {
                    var s = t + "." + n;
                    0 === s.indexOf(".") ? (o.d.push(s),
                        o.w.push(s)) : o[i.test(t) ? "w" : "d"].push(s)
                }), o.d = o.d.join(" "), o.w = o.w.join(" "), o
            }

            var i = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
            mejs.MediaElementPlayer.prototype.globalBind = function (i, n, o) {
                var s = this,
                    a = s.node ? s.node.ownerDocument : document;
                i = t(i, s.id), i.d && e(a).bind(i.d, n, o), i.w && e(window).bind(i.w, n, o)
            }, mejs.MediaElementPlayer.prototype.globalUnbind = function (i, n) {
                var o = this,
                    s = o.node ? o.node.ownerDocument : document;
                i = t(i, o.id), i.d && e(s).unbind(i.d, n), i.w && e(window).unbind(i.w, n)
            }
        }(), "undefined" != typeof e && (e.fn.mediaelementplayer = function (t) {
        return t === !1 ? this.each(function () {
            var t = e(this).data("mediaelementplayer");
            t && t.remove(), e(this).removeData("mediaelementplayer")
        }) : this.each(function () {
            e(this).data("mediaelementplayer", new mejs.MediaElementPlayer(this, t))
        }), this
    }, e(document).ready(function () {
        e(".mejs-player").mediaelementplayer()
    })), window.MediaElementPlayer = mejs.MediaElementPlayer
}(mejs.$);
!function (e) {
    e.extend(mejs.MepDefaults, {
        playText: mejs.i18n.t("Play"),
        pauseText: mejs.i18n.t("Pause")
    }), e.extend(MediaElementPlayer.prototype, {
        buildplaypause: function (t, i, n, o) {
            function s(e) {
                "play" === e ? (l.removeClass("mejs-play").addClass("mejs-pause"), d.attr({
                    title: r.pauseText,
                    "aria-label": r.pauseText
                })) : (l.removeClass("mejs-pause").addClass("mejs-play"), d.attr({
                    title: r.playText,
                    "aria-label": r.playText
                }))
            }

            var a = this,
                r = a.options,
                l = e('<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="' + a.id + '" title="' + r.playText + '" aria-label="' + r.playText + '"></button></div>').appendTo(i).click(function (e) {
                    return e.preventDefault(), o.paused ? o.play() : o.pause(), !1
                }),
                d = l.find("button");
            s("pse"), o.addEventListener("play", function () {
                s("play")
            }, !1), o.addEventListener("playing", function () {
                s("play")
            }, !1), o.addEventListener("pause", function () {
                s("pse")
            }, !1), o.addEventListener("paused", function () {
                s("pse")
            }, !1)
        }
    })
}(mejs.$);
!function (e) {
    e.extend(mejs.MepDefaults, {
        stopText: "Stop"
    }), e.extend(MediaElementPlayer.prototype, {
        buildstop: function (t, i, n, o) {
            var s = this;
            e('<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="' + s.id + '" title="' + s.options.stopText + '" aria-label="' + s.options.stopText + '"></button></div>').appendTo(i).click(function () {
                o.paused || o.pause(), o.currentTime > 0 && (o.setCurrentTime(0), o.pause(), i.find(".mejs-time-current").width("0px"), i.find(".mejs-time-handle").css("left", "0px"), i.find(".mejs-time-float-current").html(mejs.Utility.secondsToTimeCode(0, t.options)), i.find(".mejs-currenttime").html(mejs.Utility.secondsToTimeCode(0, t.options)), n.find(".mejs-poster").show())
            })
        }
    })
}(mejs.$);
!function (e) {
    e.extend(mejs.MepDefaults, {
        progessHelpText: mejs.i18n.t("Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.")
    }), e.extend(MediaElementPlayer.prototype, {
        buildprogress: function (t, i, n, o) {
            e('<div class="mejs-time-rail"><span  class="mejs-time-total mejs-time-slider"><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span><span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span></span></div>').appendTo(i), i.find(".mejs-time-buffering").hide();
            var s = this,
                a = i.find(".mejs-time-total"),
                r = i.find(".mejs-time-loaded"),
                l = i.find(".mejs-time-current"),
                d = i.find(".mejs-time-handle"),
                c = i.find(".mejs-time-float"),
                u = i.find(".mejs-time-float-current"),
                h = i.find(".mejs-time-slider"),
                p = function (e) {
                    var i, n = a.offset(),
                        s = a.width(),
                        r = 0,
                        l = 0,
                        d = 0;
                    i = e.originalEvent && e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].pageX : e.changedTouches ? e.changedTouches[0].pageX : e.pageX, o.duration && (i < n.left ? i = n.left : i > s + n.left && (i = s + n.left), d = i - n.left, r = d / s, l = .02 >= r ? 0 : r * o.duration, m && l !== o.currentTime && o.setCurrentTime(l), mejs.MediaFeatures.hasTouch || (c.css("left", d), u.html(mejs.Utility.secondsToTimeCode(l, t.options)), c.show()))
                },
                m = !1,
                f = !1,
                g = 0,
                v = !1,
                y = t.options.autoRewind,
                b = function (e) {
                    var i = o.currentTime,
                        n = mejs.i18n.t("Time Slider"),
                        s = mejs.Utility.secondsToTimeCode(i, t.options),
                        a = o.duration;
                    h.attr({
                        "aria-label": n,
                        "aria-valuemin": 0,
                        "aria-valuemax": a,
                        "aria-valuenow": i,
                        "aria-valuetext": s,
                        role: "slider",
                        tabindex: 0
                    })
                },
                w = function () {
                    var e = new Date;
                    e - g >= 1e3 && o.play()
                };
            h.bind("focus", function (e) {
                t.options.autoRewind = !1
            }), h.bind("blur", function (e) {
                t.options.autoRewind = y
            }), h.bind("keydown", function (e) {
                new Date - g >= 1e3 && (v = o.paused);
                var t = e.keyCode,
                    i = o.duration,
                    n = o.currentTime;
                switch (t) {
                    case 37:
                        n -= 1;
                        break;
                    case 39:
                        n += 1;
                        break;
                    case 38:
                        n += Math.floor(.1 * i);
                        break;
                    case 40:
                        n -= Math.floor(.1 * i);
                        break;
                    case 36:
                        n = 0;
                        break;
                    case 35:
                        n = i;
                        break;
                    case 10:
                        return void (o.paused ? o.play() : o.pause());
                    case 13:
                        return void (o.paused ? o.play() : o.pause());
                    default:
                        return
                }
                return n = 0 > n ? 0 : n >= i ? i : Math.floor(n), g = new Date, v || o.pause(), n < o.duration && !v && setTimeout(w, 1100), o.setCurrentTime(n), e.preventDefault(), e.stopPropagation(), !1
            }), a.bind("mousedown touchstart", function (e) {
                (1 === e.which || 0 === e.which) && (m = !0, p(e), s.globalBind("mousemove.dur touchmove.dur", function (e) {
                    p(e)
                }), s.globalBind("mouseup.dur touchend.dur", function (e) {
                    m = !1, c.hide(), s.globalUnbind(".dur")
                }))
            }).bind("mouseenter", function (e) {
                f = !0, s.globalBind("mousemove.dur", function (e) {
                    p(e)
                }), mejs.MediaFeatures.hasTouch || c.show()
            }).bind("mouseleave", function (e) {
                f = !1, m || (s.globalUnbind(".dur"), c.hide())
            }), o.addEventListener("progress", function (e) {
                t.setProgressRail(e), t.setCurrentRail(e)
            }, !1), o.addEventListener("timeupdate", function (e) {
                t.setProgressRail(e), t.setCurrentRail(e), b(e)
            }, !1), s.container.on("controlsresize", function () {
                t.setProgressRail(), t.setCurrentRail()
            }), s.loaded = r, s.total = a, s.current = l, s.handle = d
        },
        setProgressRail: function (e) {
            var t = this,
                i = void 0 !== e ? e.target : t.media,
                n = null;
            i && i.buffered && i.buffered.length > 0 && i.buffered.end && i.duration ? n = i.buffered.end(i.buffered.length - 1) / i.duration : i && void 0 !== i.bytesTotal && i.bytesTotal > 0 && void 0 !== i.bufferedBytes ? n = i.bufferedBytes / i.bytesTotal : e && e.lengthComputable && 0 !== e.total && (n = e.loaded / e.total), null !== n && (n = Math.min(1, Math.max(0, n)), t.loaded && t.total && t.loaded.width(t.total.width() * n))
        },
        setCurrentRail: function () {
            var e = this;
            if (void 0 !== e.media.currentTime && e.media.duration && e.total && e.handle) {
                var t = Math.round(e.total.width() * e.media.currentTime / e.media.duration),
                    i = t - Math.round(e.handle.outerWidth(!0) / 2);
                e.current.width(t), e.handle.css("left", i)
            }
        }
    })
}(mejs.$);
!function (e) {
    e.extend(mejs.MepDefaults, {
        duration: -1,
        timeAndDurationSeparator: "<span> | </span>"
    }), e.extend(MediaElementPlayer.prototype, {
        buildcurrent: function (t, i, n, o) {
            var s = this;
            e('<div class="mejs-time" role="timer" aria-live="off"><span class="mejs-currenttime">' + mejs.Utility.secondsToTimeCode(0, t.options) + "</span></div>").appendTo(i), s.currenttime = s.controls.find(".mejs-currenttime"), o.addEventListener("timeupdate", function () {
                t.updateCurrent()
            }, !1)
        },
        buildduration: function (t, i, n, o) {
            var s = this;
            i.children().last().find(".mejs-currenttime").length > 0 ? e(s.options.timeAndDurationSeparator + '<span class="mejs-duration">' + mejs.Utility.secondsToTimeCode(s.options.duration, s.options) + "</span>").appendTo(i.find(".mejs-time")) : (i.find(".mejs-currenttime").parent().addClass("mejs-currenttime-container"), e('<div class="mejs-time mejs-duration-container"><span class="mejs-duration">' + mejs.Utility.secondsToTimeCode(s.options.duration, s.options) + "</span></div>").appendTo(i)), s.durationD = s.controls.find(".mejs-duration"), o.addEventListener("timeupdate", function () {
                t.updateDuration()
            }, !1)
        },
        updateCurrent: function () {
            var e = this;
            e.currenttime && e.currenttime.html(mejs.Utility.secondsToTimeCode(e.media.currentTime, e.options))
        },
        updateDuration: function () {
            var e = this;
            e.container.toggleClass("mejs-long-video", e.media.duration > 3600), e.durationD && (e.options.duration > 0 || e.media.duration) && e.durationD.html(mejs.Utility.secondsToTimeCode(e.options.duration > 0 ? e.options.duration : e.media.duration, e.options))
        }
    })
}(mejs.$);
!function (e) {
    e.extend(mejs.MepDefaults, {
        muteText: mejs.i18n.t("Mute Toggle"),
        allyVolumeControlText: mejs.i18n.t("Use Up/Down Arrow keys to increase or decrease volume."),
        hideVolumeOnTouchDevices: !0,
        audioVolume: "horizontal",
        videoVolume: "vertical"
    }), e.extend(MediaElementPlayer.prototype, {
        buildvolume: function (t, i, n, o) {
            if (!mejs.MediaFeatures.isAndroid && !mejs.MediaFeatures.isiOS || !this.options.hideVolumeOnTouchDevices) {
                var s = this,
                    a = s.isVideo ? s.options.videoVolume : s.options.audioVolume,
                    r = "horizontal" == a ? e('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + s.id + '" title="' + s.options.muteText + '" aria-label="' + s.options.muteText + '"></button></div><a href="javascript:void(0);" class="mejs-horizontal-volume-slider"><span class="mejs-offscreen">' + s.options.allyVolumeControlText + '</span><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></a>').appendTo(i) : e('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + s.id + '" title="' + s.options.muteText + '" aria-label="' + s.options.muteText + '"></button><a href="javascript:void(0);" class="mejs-volume-slider"><span class="mejs-offscreen">' + s.options.allyVolumeControlText + '</span><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></a></div>').appendTo(i),
                    l = s.container.find(".mejs-volume-slider, .mejs-horizontal-volume-slider"),
                    d = s.container.find(".mejs-volume-total, .mejs-horizontal-volume-total"),
                    c = s.container.find(".mejs-volume-current, .mejs-horizontal-volume-current"),
                    u = s.container.find(".mejs-volume-handle, .mejs-horizontal-volume-handle"),
                    h = function (e, t) {
                        if (!l.is(":visible") && "undefined" == typeof t) return l.show(), h(e, !0), void l.hide();
                        e = Math.max(0, e), e = Math.min(e, 1), 0 === e ? (r.removeClass("mejs-mute").addClass("mejs-unmute"), r.children("button").attr("title", mejs.i18n.t("Unmute")).attr("aria-label", mejs.i18n.t("Unmute"))) : (r.removeClass("mejs-unmute").addClass("mejs-mute"), r.children("button").attr("title", mejs.i18n.t("Mute")).attr("aria-label", mejs.i18n.t("Mute")));
                        var i = d.position();
                        if ("vertical" == a) {
                            var n = d.height(),
                                o = n - n * e;
                            u.css("top", Math.round(i.top + o - u.height() / 2)), c.height(n - o), c.css("top", i.top + o)
                        } else {
                            var s = d.width(),
                                p = s * e;
                            u.css("left", Math.round(i.left + p - u.width() / 2)), c.width(Math.round(p))
                        }
                    },
                    p = function (e) {
                        var t = null,
                            i = d.offset();
                        if ("vertical" === a) {
                            var n = d.height(),
                                s = e.pageY - i.top;
                            if (t = (n - s) / n, 0 === i.top || 0 === i.left) return
                        } else {
                            var r = d.width(),
                                l = e.pageX - i.left;
                            t = l / r
                        }
                        t = Math.max(0, t), t = Math.min(t, 1), h(t), 0 === t ? o.setMuted(!0) : o.setMuted(!1), o.setVolume(t)
                    },
                    m = !1,
                    f = !1;
                r.hover(function () {
                    l.show(), f = !0
                }, function () {
                    f = !1, m || "vertical" != a || l.hide()
                });
                var g = function (e) {
                    var t = Math.floor(100 * o.volume);
                    l.attr({
                        "aria-label": mejs.i18n.t("volumeSlider"),
                        "aria-valuemin": 0,
                        "aria-valuemax": 100,
                        "aria-valuenow": t,
                        "aria-valuetext": t + "%",
                        role: "slider",
                        tabindex: 0
                    })
                };
                l.bind("mouseover", function () {
                    f = !0
                }).bind("mousedown", function (e) {
                    return p(e), s.globalBind("mousemove.vol", function (e) {
                        p(e)
                    }), s.globalBind("mouseup.vol", function () {
                        m = !1, s.globalUnbind(".vol"), f || "vertical" != a || l.hide()
                    }), m = !0, !1
                }).bind("keydown", function (e) {
                    var t = e.keyCode,
                        i = o.volume;
                    switch (t) {
                        case 38:
                            i += .1;
                            break;
                        case 40:
                            i -= .1;
                            break;
                        default:
                            return !0
                    }
                    return m = !1, h(i), o.setVolume(i), !1
                }), r.find("button").click(function () {
                    o.setMuted(!o.muted)
                }), r.find("button").bind("focus", function () {
                    l.show()
                }), o.addEventListener("volumechange", function (e) {
                    m || (o.muted ? (h(0), r.removeClass("mejs-mute").addClass("mejs-unmute")) : (h(o.volume), r.removeClass("mejs-unmute").addClass("mejs-mute"))), g(e)
                }, !1), 0 === t.options.startVolume && o.setMuted(!0), "native" === o.pluginType && o.setVolume(t.options.startVolume), s.container.on("controlsresize", function () {
                    h(o.volume)
                })
            }
        }
    })
}(mejs.$);
!function (e) {
    e.extend(mejs.MepDefaults, {
        usePluginFullScreen: !0,
        newWindowCallback: function () {
            return ""
        },
        fullscreenText: mejs.i18n.t("Fullscreen")
    }), e.extend(MediaElementPlayer.prototype, {
        isFullScreen: !1,
        isNativeFullScreen: !1,
        isInIframe: !1,
        buildfullscreen: function (t, i, n, o) {
            if (t.isVideo) {
                if (t.isInIframe = window.location != window.parent.location, mejs.MediaFeatures.hasTrueNativeFullScreen) {
                    var s = function (e) {
                        t.isFullScreen && (mejs.MediaFeatures.isFullScreen() ? (t.isNativeFullScreen = !0, t.setControlsSize()) : (t.isNativeFullScreen = !1, t.exitFullScreen()))
                    };
                    t.globalBind(mejs.MediaFeatures.fullScreenEventName, s)
                }
                var a = this,
                    r = e('<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="' + a.id + '" title="' + a.options.fullscreenText + '" aria-label="' + a.options.fullscreenText + '"></button></div>').appendTo(i);
                if ("native" === a.media.pluginType || !a.options.usePluginFullScreen && !mejs.MediaFeatures.isFirefox) r.click(function () {
                    var e = mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || t.isFullScreen;
                    e ? t.exitFullScreen() : t.enterFullScreen()
                });
                else {
                    var l = null,
                        d = function () {
                            var e, t = document.createElement("x"),
                                i = document.documentElement,
                                n = window.getComputedStyle;
                            return "pointerEvents" in t.style ? (t.style.pointerEvents = "auto", t.style.pointerEvents = "x", i.appendChild(t), e = n && "auto" === n(t, "").pointerEvents, i.removeChild(t), !!e) : !1
                        }();
                    if (d && !mejs.MediaFeatures.isOpera) {
                        var c, u, h = !1,
                            p = function () {
                                if (h) {
                                    for (var e in m) m[e].hide();
                                    r.css("pointer-events", ""), a.controls.css("pointer-events", ""), a.media.removeEventListener("click", a.clickToPlayPauseCallback), h = !1
                                }
                            },
                            m = {},
                            f = ["top", "left", "right", "bottom"],
                            g = function () {
                                var e = r.offset().left - a.container.offset().left,
                                    t = r.offset().top - a.container.offset().top,
                                    i = r.outerWidth(!0),
                                    n = r.outerHeight(!0),
                                    o = a.container.width(),
                                    s = a.container.height();
                                for (c in m) m[c].css({
                                    position: "absolute",
                                    top: 0,
                                    left: 0
                                });
                                m.top.width(o).height(t), m.left.width(e).height(n).css({
                                    top: t
                                }), m.right.width(o - e - i).height(n).css({
                                    top: t,
                                    left: e + i
                                }), m.bottom.width(o).height(s - n - t).css({
                                    top: t + n
                                })
                            };
                        for (a.globalBind("resize", function () {
                            g()
                        }), c = 0, u = f.length; u > c; c++) m[f[c]] = e('<div class="mejs-fullscreen-hover" />').appendTo(a.container).mouseover(p).hide();
                        r.on("mouseover", function () {
                            if (!a.isFullScreen) {
                                var e = r.offset(),
                                    i = t.container.offset();
                                o.positionFullscreenButton(e.left - i.left, e.top - i.top, !1), r.css("pointer-events", "none"), a.controls.css("pointer-events", "none"), a.media.addEventListener("click", a.clickToPlayPauseCallback);
                                for (c in m) m[c].show();
                                g(), h = !0
                            }
                        }), o.addEventListener("fullscreenchange", function (e) {
                            a.isFullScreen = !a.isFullScreen, a.isFullScreen ? a.media.removeEventListener("click", a.clickToPlayPauseCallback) : a.media.addEventListener("click", a.clickToPlayPauseCallback), p()
                        }), a.globalBind("mousemove", function (e) {
                            if (h) {
                                var t = r.offset();
                                (e.pageY < t.top || e.pageY > t.top + r.outerHeight(!0) || e.pageX < t.left || e.pageX > t.left + r.outerWidth(!0)) && (r.css("pointer-events", ""), a.controls.css("pointer-events", ""), h = !1)
                            }
                        })
                    } else r.on("mouseover", function () {
                        null !== l && (clearTimeout(l), delete l);
                        var e = r.offset(),
                            i = t.container.offset();
                        o.positionFullscreenButton(e.left - i.left, e.top - i.top, !0)
                    }).on("mouseout", function () {
                        null !== l && (clearTimeout(l), delete l), l = setTimeout(function () {
                            o.hideFullscreenButton()
                        }, 1500)
                    })
                }
                t.fullscreenBtn = r, a.globalBind("keydown", function (e) {
                    (mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || a.isFullScreen) && 27 == e.keyCode && t.exitFullScreen()
                }), a.normalHeight = 0, a.normalWidth = 0
            }
        },
        cleanfullscreen: function (e) {
            e.exitFullScreen()
        },
        containerSizeTimeout: null,
        enterFullScreen: function () {
            var t = this;
            if ("native" === t.media.pluginType || !mejs.MediaFeatures.isFirefox && !t.options.usePluginFullScreen) {
                if (e(document.documentElement).addClass("mejs-fullscreen"), t.normalHeight = t.container.height(), t.normalWidth = t.container.width(), "native" === t.media.pluginType)
                    if (mejs.MediaFeatures.hasTrueNativeFullScreen) mejs.MediaFeatures.requestFullScreen(t.container[0]), t.isInIframe && setTimeout(function n() {
                        if (t.isNativeFullScreen) {
                            var i = window.devicePixelRatio || 1,
                                o = .002,
                                s = i * e(window).width(),
                                a = screen.width,
                                r = i * s;
                            Math.abs(a - s) > Math.abs(a - r) && (s = r);
                            var l = Math.abs(a - s),
                                d = a * o;
                            l > d ? t.exitFullScreen() : setTimeout(n, 500)
                        }
                    }, 1e3);
                    else if (mejs.MediaFeatures.hasSemiNativeFullScreen) return void t.media.webkitEnterFullscreen();
                if (t.isInIframe) {
                    var i = t.options.newWindowCallback(this);
                    if ("" !== i) {
                        if (!mejs.MediaFeatures.hasTrueNativeFullScreen) return t.pause(), void window.open(i, t.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no");
                        setTimeout(function () {
                            t.isNativeFullScreen || (t.pause(), window.open(i, t.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no"))
                        }, 250)
                    }
                }
                t.container.addClass("mejs-container-fullscreen").width("100%").height("100%"), t.containerSizeTimeout = setTimeout(function () {
                    t.container.css({
                        width: "100%",
                        height: "100%"
                    }), t.setControlsSize()
                }, 500), "native" === t.media.pluginType ? t.$media.width("100%").height("100%") : (t.container.find(".mejs-shim").width("100%").height("100%"), t.media.setVideoSize(e(window).width(), e(window).height())), t.layers.children("div").width("100%").height("100%"), t.fullscreenBtn && t.fullscreenBtn.removeClass("mejs-fullscreen").addClass("mejs-unfullscreen"), t.setControlsSize(), t.isFullScreen = !0, t.container.find(".mejs-captions-text").css("font-size", screen.width / t.width * 1 * 100 + "%"), t.container.find(".mejs-captions-position").css("bottom", "45px"), t.container.trigger("enteredfullscreen")
            }
        },
        exitFullScreen: function () {
            var t = this;
            return clearTimeout(t.containerSizeTimeout), "native" !== t.media.pluginType && mejs.MediaFeatures.isFirefox ? void t.media.setFullscreen(!1) : (mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || t.isFullScreen) && mejs.MediaFeatures.cancelFullScreen(), e(document.documentElement).removeClass("mejs-fullscreen"), t.container.removeClass("mejs-container-fullscreen").width(t.normalWidth).height(t.normalHeight), "native" === t.media.pluginType ? t.$media.width(t.normalWidth).height(t.normalHeight) : (t.container.find(".mejs-shim").width(t.normalWidth).height(t.normalHeight), t.media.setVideoSize(t.normalWidth, t.normalHeight)), t.layers.children("div").width(t.normalWidth).height(t.normalHeight), t.fullscreenBtn.removeClass("mejs-unfullscreen").addClass("mejs-fullscreen"), t.setControlsSize(), t.isFullScreen = !1, t.container.find(".mejs-captions-text").css("font-size", ""), t.container.find(".mejs-captions-position").css("bottom", ""), void t.container.trigger("exitedfullscreen"))
        }
    })
}(mejs.$);
!function (e) {
    e.extend(mejs.MepDefaults, {
        speeds: ["2.00", "1.50", "1.25", "1.00", "0.75"],
        defaultSpeed: "1.00",
        speedChar: "x"
    }), e.extend(MediaElementPlayer.prototype, {
        buildspeed: function (t, i, n, o) {
            var s = this;
            if ("native" == s.media.pluginType) {
                for (var a = null, r = null, l = null, d = null, c = [], u = !1, h = 0, p = s.options.speeds.length; p > h; h++) {
                    var m = s.options.speeds[h];
                    "string" == typeof m ? (c.push({
                        name: m + s.options.speedChar,
                        value: m
                    }), m === s.options.defaultSpeed && (u = !0)) : (c.push(m), m.value === s.options.defaultSpeed && (u = !0))
                }
                u || c.push({
                    name: s.options.defaultSpeed + s.options.speedChar,
                    value: s.options.defaultSpeed
                }), c.sort(function (e, t) {
                    return parseFloat(t.value) - parseFloat(e.value)
                });
                var f = function (e) {
                        for (h = 0, p = c.length; p > h; h++)
                            if (c[h].value === e) return c[h].name
                    },
                    g = '<div class="mejs-button mejs-speed-button"><button type="button">' + f(s.options.defaultSpeed) + '</button><div class="mejs-speed-selector"><ul>';
                for (h = 0, il = c.length; h < il; h++) d = s.id + "-speed-" + c[h].value, g += '<li><input type="radio" name="speed" value="' + c[h].value + '" id="' + d + '" ' + (c[h].value === s.options.defaultSpeed ? " checked" : "") + ' /><label for="' + d + '" ' + (c[h].value === s.options.defaultSpeed ? ' class="mejs-speed-selected"' : "") + ">" + c[h].name + "</label></li>";
                g += "</ul></div></div>", a = e(g).appendTo(i), r = a.find(".mejs-speed-selector"), l = s.options.defaultSpeed, o.addEventListener("loadedmetadata", function (e) {
                    l && (o.playbackRate = parseFloat(l))
                }, !0), r.on("click", 'input[type="radio"]', function () {
                    var t = e(this).attr("value");
                    l = t, o.playbackRate = parseFloat(t), a.find("button").html(f(t)), a.find(".mejs-speed-selected").removeClass("mejs-speed-selected"), a.find('input[type="radio"]:checked').next().addClass("mejs-speed-selected")
                }), a.one("mouseenter focusin", function () {
                    r.height(a.find(".mejs-speed-selector ul").outerHeight(!0) + a.find(".mejs-speed-translations").outerHeight(!0)).css("top", -1 * r.height() + "px")
                })
            }
        }
    })
}(mejs.$);
!function (e) {
    e.extend(mejs.MepDefaults, {
        startLanguage: "",
        tracksText: mejs.i18n.t("Captions/Subtitles"),
        tracksAriaLive: !1,
        hideCaptionsButtonWhenEmpty: !0,
        toggleCaptionsButtonWhenOnlyOne: !1,
        slidesSelector: ""
    }), e.extend(MediaElementPlayer.prototype, {
        hasChapters: !1,
        cleartracks: function (e, t, i, n) {
            e && (e.captions && e.captions.remove(), e.chapters && e.chapters.remove(), e.captionsText && e.captionsText.remove(), e.captionsButton && e.captionsButton.remove())
        },
        buildtracks: function (t, i, n, o) {
            if (0 !== t.tracks.length) {
                var s, a = this,
                    r = a.options.tracksAriaLive ? 'role="log" aria-live="assertive" aria-atomic="false"' : "";
                if (a.domNode.textTracks)
                    for (s = a.domNode.textTracks.length - 1; s >= 0; s--) a.domNode.textTracks[s].mode = "hidden";
                a.cleartracks(t, i, n, o), t.chapters = e('<div class="mejs-chapters mejs-layer"></div>').prependTo(n).hide(), t.captions = e('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover" ' + r + '><span class="mejs-captions-text"></span></div></div>').prependTo(n).hide(), t.captionsText = t.captions.find(".mejs-captions-text"), t.captionsButton = e('<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="' + a.id + '" title="' + a.options.tracksText + '" aria-label="' + a.options.tracksText + '"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="' + t.id + '_captions" id="' + t.id + '_captions_none" value="none" checked="checked" /><label for="' + t.id + '_captions_none">' + mejs.i18n.t("None") + "</label></li></ul></div></div>").appendTo(i);
                var l = 0;
                for (s = 0; s < t.tracks.length; s++) "subtitles" == t.tracks[s].kind && l++;
                for (a.options.toggleCaptionsButtonWhenOnlyOne && 1 == l ? t.captionsButton.on("click", function () {
                    null === t.selectedTrack ? lang = t.tracks[0].srclang : lang = "none", t.setTrack(lang)
                }) : (t.captionsButton.on("mouseenter focusin", function () {
                    e(this).find(".mejs-captions-selector").css("visibility", "visible")
                }).on("click", "input[type=radio]", function () {
                    lang = this.value, t.setTrack(lang)
                }), t.captionsButton.on("mouseleave focusout", function () {
                    e(this).find(".mejs-captions-selector").css("visibility", "hidden")
                })), t.options.alwaysShowControls ? t.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover") : t.container.bind("controlsshown", function () {
                    t.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover")
                }).bind("controlshidden", function () {
                    o.paused || t.container.find(".mejs-captions-position").removeClass("mejs-captions-position-hover")
                }), t.trackToLoad = -1, t.selectedTrack = null, t.isLoadingTrack = !1, s = 0; s < t.tracks.length; s++) "subtitles" == t.tracks[s].kind && t.addTrackButton(t.tracks[s].srclang, t.tracks[s].label);
                t.loadNextTrack(), o.addEventListener("timeupdate", function (e) {
                    t.displayCaptions()
                }, !1), "" !== t.options.slidesSelector && (t.slidesContainer = e(t.options.slidesSelector), o.addEventListener("timeupdate", function (e) {
                    t.displaySlides()
                }, !1)), o.addEventListener("loadedmetadata", function (e) {
                    t.displayChapters()
                }, !1), t.container.hover(function () {
                    t.hasChapters && (t.chapters.css("visibility", "visible"), t.chapters.fadeIn(200).height(t.chapters.find(".mejs-chapter").outerHeight()))
                }, function () {
                    t.hasChapters && !o.paused && t.chapters.fadeOut(200, function () {
                        e(this).css("visibility", "hidden"), e(this).css("display", "block")
                    })
                }), a.container.on("controlsresize", function () {
                    a.adjustLanguageBox()
                }), null !== t.node.getAttribute("autoplay") && t.chapters.css("visibility", "hidden")
            }
        },
        setTrack: function (e) {
            var t, i = this;
            if ("none" == e) i.selectedTrack = null, i.captionsButton.removeClass("mejs-captions-enabled");
            else
                for (t = 0; t < i.tracks.length; t++)
                    if (i.tracks[t].srclang == e) {
                        null === i.selectedTrack && i.captionsButton.addClass("mejs-captions-enabled"), i.selectedTrack = i.tracks[t], i.captions.attr("lang", i.selectedTrack.srclang), i.displayCaptions();
                        break
                    }
        },
        loadNextTrack: function () {
            var e = this;
            e.trackToLoad++, e.trackToLoad < e.tracks.length ? (e.isLoadingTrack = !0, e.loadTrack(e.trackToLoad)) : (e.isLoadingTrack = !1, e.checkForTracks())
        },
        loadTrack: function (t) {
            var i = this,
                n = i.tracks[t],
                o = function () {
                    n.isLoaded = !0, i.enableTrackButton(n.srclang, n.label), i.loadNextTrack()
                };
            e.ajax({
                url: n.src,
                dataType: "text",
                success: function (e) {
                    "string" == typeof e && /<tt\s+xml/gi.exec(e) ? n.entries = mejs.TrackFormatParser.dfxp.parse(e) : n.entries = mejs.TrackFormatParser.webvtt.parse(e), o(), "chapters" == n.kind && i.media.addEventListener("play", function (e) {
                        i.media.duration > 0 && i.displayChapters(n)
                    }, !1), "slides" == n.kind && i.setupSlides(n)
                },
                error: function () {
                    i.removeTrackButton(n.srclang), i.loadNextTrack()
                }
            })
        },
        enableTrackButton: function (t, i) {
            var n = this;
            "" === i && (i = mejs.language.codes[t] || t), n.captionsButton.find("input[value=" + t + "]").prop("disabled", !1).siblings("label").html(i), n.options.startLanguage == t && e("#" + n.id + "_captions_" + t).prop("checked", !0).trigger("click"), n.adjustLanguageBox()
        },
        removeTrackButton: function (e) {
            var t = this;
            t.captionsButton.find("input[value=" + e + "]").closest("li").remove(), t.adjustLanguageBox()
        },
        addTrackButton: function (t, i) {
            var n = this;
            "" === i && (i = mejs.language.codes[t] || t), n.captionsButton.find("ul").append(e('<li><input type="radio" name="' + n.id + '_captions" id="' + n.id + "_captions_" + t + '" value="' + t + '" disabled="disabled" /><label for="' + n.id + "_captions_" + t + '">' + i + " (loading)</label></li>")), n.adjustLanguageBox(), n.container.find(".mejs-captions-translations option[value=" + t + "]").remove()
        },
        adjustLanguageBox: function () {
            var e = this;
            e.captionsButton.find(".mejs-captions-selector").height(e.captionsButton.find(".mejs-captions-selector ul").outerHeight(!0) + e.captionsButton.find(".mejs-captions-translations").outerHeight(!0))
        },
        checkForTracks: function () {
            var e = this,
                t = !1;
            if (e.options.hideCaptionsButtonWhenEmpty) {
                for (i = 0; i < e.tracks.length; i++)
                    if ("subtitles" == e.tracks[i].kind && e.tracks[i].isLoaded) {
                        t = !0;
                        break
                    }
                t || (e.captionsButton.hide(), e.setControlsSize())
            }
        },
        displayCaptions: function () {
            if ("undefined" != typeof this.tracks) {
                var e, t = this,
                    i = t.selectedTrack;
                if (null !== i && i.isLoaded) {
                    for (e = 0; e < i.entries.times.length; e++)
                        if (t.media.currentTime >= i.entries.times[e].start && t.media.currentTime <= i.entries.times[e].stop) return t.captionsText.html(i.entries.text[e]).attr("class", "mejs-captions-text " + (i.entries.times[e].identifier || "")), void t.captions.show().height(0);
                    t.captions.hide()
                } else t.captions.hide()
            }
        },
        setupSlides: function (e) {
            var t = this;
            t.slides = e, t.slides.entries.imgs = [t.slides.entries.text.length], t.showSlide(0)
        },
        showSlide: function (t) {
            if ("undefined" != typeof this.tracks && "undefined" != typeof this.slidesContainer) {
                var i = this,
                    n = i.slides.entries.text[t],
                    o = i.slides.entries.imgs[t];
                "undefined" == typeof o || "undefined" == typeof o.fadeIn ? i.slides.entries.imgs[t] = o = e('<img src="' + n + '">').on("load", function () {
                    o.appendTo(i.slidesContainer).hide().fadeIn().siblings(":visible").fadeOut()
                }) : o.is(":visible") || o.is(":animated") || o.fadeIn().siblings(":visible").fadeOut()
            }
        },
        displaySlides: function () {
            if ("undefined" != typeof this.slides) {
                var e, t = this,
                    i = t.slides;
                for (e = 0; e < i.entries.times.length; e++)
                    if (t.media.currentTime >= i.entries.times[e].start && t.media.currentTime <= i.entries.times[e].stop) return void t.showSlide(e)
            }
        },
        displayChapters: function () {
            var e, t = this;
            for (e = 0; e < t.tracks.length; e++)
                if ("chapters" == t.tracks[e].kind && t.tracks[e].isLoaded) {
                    t.drawChapters(t.tracks[e]), t.hasChapters = !0;
                    break
                }
        },
        drawChapters: function (t) {
            var i, n, o = this,
                s = 0,
                a = 0;
            for (o.chapters.empty(), i = 0; i < t.entries.times.length; i++) n = t.entries.times[i].stop - t.entries.times[i].start, s = Math.floor(n / o.media.duration * 100), (s + a > 100 || i == t.entries.times.length - 1 && 100 > s + a) && (s = 100 - a), o.chapters.append(e('<div class="mejs-chapter" rel="' + t.entries.times[i].start + '" style="left: ' + a.toString() + "%;width: " + s.toString() + '%;"><div class="mejs-chapter-block' + (i == t.entries.times.length - 1 ? " mejs-chapter-block-last" : "") + '"><span class="ch-title">' + t.entries.text[i] + '</span><span class="ch-time">' + mejs.Utility.secondsToTimeCode(t.entries.times[i].start, o.options) + "&ndash;" + mejs.Utility.secondsToTimeCode(t.entries.times[i].stop, o.options) + "</span></div></div>")), a += s;
            o.chapters.find("div.mejs-chapter").click(function () {
                o.media.setCurrentTime(parseFloat(e(this).attr("rel"))), o.media.paused && o.media.play()
            }), o.chapters.show()
        }
    }), mejs.language = {
        codes: {
            af: "Afrikaans",
            sq: "Albanian",
            ar: "Arabic",
            be: "Belarusian",
            bg: "Bulgarian",
            ca: "Catalan",
            zh: "Chinese",
            "zh-cn": "Chinese Simplified",
            "zh-tw": "Chinese Traditional",
            hr: "Croatian",
            cs: "Czech",
            da: "Danish",
            nl: "Dutch",
            en: "English",
            et: "Estonian",
            fl: "Filipino",
            fi: "Finnish",
            fr: "French",
            gl: "Galician",
            de: "German",
            el: "Greek",
            ht: "Haitian Creole",
            iw: "Hebrew",
            hi: "Hindi",
            hu: "Hungarian",
            is: "Icelandic",
            id: "Indonesian",
            ga: "Irish",
            it: "Italian",
            ja: "Japanese",
            ko: "Korean",
            lv: "Latvian",
            lt: "Lithuanian",
            mk: "Macedonian",
            ms: "Malay",
            mt: "Maltese",
            no: "Norwegian",
            fa: "Persian",
            pl: "Polish",
            pt: "Portuguese",
            ro: "Romanian",
            ru: "Russian",
            sr: "Serbian",
            sk: "Slovak",
            sl: "Slovenian",
            es: "Spanish",
            sw: "Swahili",
            sv: "Swedish",
            tl: "Tagalog",
            th: "Thai",
            tr: "Turkish",
            uk: "Ukrainian",
            vi: "Vietnamese",
            cy: "Welsh",
            yi: "Yiddish"
        }
    }, mejs.TrackFormatParser = {
        webvtt: {
            pattern_timecode: /^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
            parse: function (t) {
                for (var i, n, o, s = 0, a = mejs.TrackFormatParser.split2(t, /\r?\n/), r = {
                    text: [],
                    times: []
                }; s < a.length; s++) {
                    if (i = this.pattern_timecode.exec(a[s]), i && s < a.length) {
                        for (s - 1 >= 0 && "" !== a[s - 1] && (o = a[s - 1]), s++, n = a[s], s++;
                             "" !== a[s] && s < a.length;) n = n + "\n" + a[s], s++;
                        n = e.trim(n).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a href='$1' target='_blank'>$1</a>"), r.text.push(n), r.times.push({
                            identifier: o,
                            start: 0 === mejs.Utility.convertSMPTEtoSeconds(i[1]) ? .2 : mejs.Utility.convertSMPTEtoSeconds(i[1]),
                            stop: mejs.Utility.convertSMPTEtoSeconds(i[3]),
                            settings: i[5]
                        })
                    }
                    o = ""
                }
                return r
            }
        },
        dfxp: {
            parse: function (t) {
                t = e(t).filter("tt");
                var i, n, o = 0,
                    s = t.children("div").eq(0),
                    a = s.find("p"),
                    r = t.find("#" + s.attr("style")),
                    l = {
                        text: [],
                        times: []
                    };
                if (r.length) {
                    var d = r.removeAttr("id").get(0).attributes;
                    if (d.length)
                        for (i = {}, o = 0; o < d.length; o++) i[d[o].name.split(":")[1]] = d[o].value
                }
                for (o = 0; o < a.length; o++) {
                    var c, u = {
                        start: null,
                        stop: null,
                        style: null
                    };
                    if (a.eq(o).attr("begin") && (u.start = mejs.Utility.convertSMPTEtoSeconds(a.eq(o).attr("begin"))), !u.start && a.eq(o - 1).attr("end") && (u.start = mejs.Utility.convertSMPTEtoSeconds(a.eq(o - 1).attr("end"))), a.eq(o).attr("end") && (u.stop = mejs.Utility.convertSMPTEtoSeconds(a.eq(o).attr("end"))), !u.stop && a.eq(o + 1).attr("begin") && (u.stop = mejs.Utility.convertSMPTEtoSeconds(a.eq(o + 1).attr("begin"))), i) {
                        c = "";
                        for (var h in i) c += h + ":" + i[h] + ";"
                    }
                    c && (u.style = c), 0 === u.start && (u.start = .2), l.times.push(u), n = e.trim(a.eq(o).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a href='$1' target='_blank'>$1</a>"), l.text.push(n), 0 === l.times.start && (l.times.start = 2)
                }
                return l
            }
        },
        split2: function (e, t) {
            return e.split(t)
        }
    }, 3 != "x\n\ny".split(/\n/gi).length && (mejs.TrackFormatParser.split2 = function (e, t) {
        var i, n = [],
            o = "";
        for (i = 0; i < e.length; i++) o += e.substring(i, i + 1), t.test(o) && (n.push(o.replace(t, "")), o = "");
        return n.push(o), n
    })
}(mejs.$);
!function (e) {
    e.extend(mejs.MepDefaults, {
        contextMenuItems: [{
            render: function (e) {
                return "undefined" == typeof e.enterFullScreen ? null : e.isFullScreen ? mejs.i18n.t("Turn off Fullscreen") : mejs.i18n.t("Go Fullscreen")
            },
            click: function (e) {
                e.isFullScreen ? e.exitFullScreen() : e.enterFullScreen()
            }
        }, {
            render: function (e) {
                return e.media.muted ? mejs.i18n.t("Unmute") : mejs.i18n.t("Mute")
            },
            click: function (e) {
                e.media.muted ? e.setMuted(!1) : e.setMuted(!0)
            }
        }, {
            isSeparator: !0
        }, {
            render: function (e) {
                return mejs.i18n.t("Download Video")
            },
            click: function (e) {
                window.location.href = e.media.currentSrc
            }
        }]
    }), e.extend(MediaElementPlayer.prototype, {
        buildcontextmenu: function (t, i, n, o) {
            t.contextMenu = e('<div class="mejs-contextmenu"></div>').appendTo(e("body")).hide(), t.container.bind("contextmenu", function (e) {
                return t.isContextMenuEnabled ? (e.preventDefault(), t.renderContextMenu(e.clientX - 1, e.clientY - 1), !1) : void 0;
            }), t.container.bind("click", function () {
                t.contextMenu.hide()
            }), t.contextMenu.bind("mouseleave", function () {
                t.startContextMenuTimer()
            })
        },
        cleancontextmenu: function (e) {
            e.contextMenu.remove()
        },
        isContextMenuEnabled: !0,
        enableContextMenu: function () {
            this.isContextMenuEnabled = !0
        },
        disableContextMenu: function () {
            this.isContextMenuEnabled = !1
        },
        contextMenuTimeout: null,
        startContextMenuTimer: function () {
            var e = this;
            e.killContextMenuTimer(), e.contextMenuTimer = setTimeout(function () {
                e.hideContextMenu(), e.killContextMenuTimer()
            }, 750)
        },
        killContextMenuTimer: function () {
            var e = this.contextMenuTimer;
            null != e && (clearTimeout(e), delete e, e = null)
        },
        hideContextMenu: function () {
            this.contextMenu.hide()
        },
        renderContextMenu: function (t, i) {
            for (var n = this, o = "", s = n.options.contextMenuItems, a = 0, r = s.length; r > a; a++)
                if (s[a].isSeparator) o += '<div class="mejs-contextmenu-separator"></div>';
                else {
                    var l = s[a].render(n);
                    null != l && (o += '<div class="mejs-contextmenu-item" data-itemindex="' + a + '" id="element-' + 1e6 * Math.random() + '">' + l + "</div>")
                }
            n.contextMenu.empty().append(e(o)).css({
                top: i,
                left: t
            }).show(), n.contextMenu.find(".mejs-contextmenu-item").each(function () {
                var t = e(this),
                    i = parseInt(t.data("itemindex"), 10),
                    o = n.options.contextMenuItems[i];
                "undefined" != typeof o.show && o.show(t, n), t.click(function () {
                    "undefined" != typeof o.click && o.click(n), n.contextMenu.hide()
                })
            }), setTimeout(function () {
                n.killControlsTimer("rev3")
            }, 100)
        }
    })
}(mejs.$);
!function (e) {
    e.extend(mejs.MepDefaults, {
        skipBackInterval: 30,
        skipBackText: mejs.i18n.t("Skip back %1 seconds")
    }), e.extend(MediaElementPlayer.prototype, {
        buildskipback: function (t, i, n, o) {
            var s = this,
                a = s.options.skipBackText.replace("%1", s.options.skipBackInterval);
            e('<div class="mejs-button mejs-skip-back-button"><button type="button" aria-controls="' + s.id + '" title="' + a + '" aria-label="' + a + '">' + s.options.skipBackInterval + "</button></div>").appendTo(i).click(function () {
                o.setCurrentTime(Math.max(o.currentTime - s.options.skipBackInterval, 0)), e(this).find("button").blur()
            })
        }
    })
}(mejs.$);
!function (e) {
    e.extend(mejs.MepDefaults, {
        postrollCloseText: mejs.i18n.t("Close")
    }), e.extend(MediaElementPlayer.prototype, {
        buildpostroll: function (t, i, n, o) {
            var s = this,
                a = s.container.find('link[rel="postroll"]').attr("href");
            "undefined" != typeof a && (t.postroll = e('<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">' + s.options.postrollCloseText + '</a><div class="mejs-postroll-layer-content"></div></div>').prependTo(n).hide(), s.media.addEventListener("ended", function (i) {
                e.ajax({
                    dataType: "html",
                    url: a,
                    success: function (e, t) {
                        n.find(".mejs-postroll-layer-content").html(e)
                    }
                }), t.postroll.show()
            }, !1))
        }
    })
}(mejs.$);
!function (e, t, i, n) {
    var o = i("html"),
        s = i(e),
        a = i(t),
        r = i.fancybox = function () {
            r.open.apply(this, arguments)
        },
        l = navigator.userAgent.match(/msie/i),
        d = null,
        c = t.createTouch !== n,
        u = function (e) {
            return e && e.hasOwnProperty && e instanceof i
        },
        h = function (e) {
            return e && "string" === i.type(e)
        },
        p = function (e) {
            return h(e) && 0 < e.indexOf("%")
        },
        m = function (e, t) {
            var i = parseInt(e, 10) || 0;
            return t && p(e) && (i *= r.getViewport()[t] / 100), Math.ceil(i)
        },
        f = function (e, t) {
            return m(e, t) + "px"
        };
    i.extend(r, {
        version: "2.1.5",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !c,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: .5,
            leftRatio: .5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3e3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {
                dataType: "html",
                headers: {
                    "X-fancyBox": !0
                }
            },
            iframe: {
                scrolling: "auto",
                preload: !0
            },
            swf: {
                wmode: "transparent",
                allowfullscreen: "true",
                allowscriptaccess: "always"
            },
            keys: {
                next: {
                    13: "left",
                    34: "up",
                    39: "left",
                    40: "up"
                },
                prev: {
                    8: "right",
                    33: "down",
                    37: "right",
                    38: "down"
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: "left",
                prev: "right"
            },
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (l ? ' allowtransparency="true"' : "") + "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: !0,
                title: !0
            },
            onCancel: i.noop,
            beforeLoad: i.noop,
            afterLoad: i.noop,
            beforeShow: i.noop,
            afterShow: i.noop,
            beforeChange: i.noop,
            beforeClose: i.noop,
            afterClose: i.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function (e, t) {
            return e && (i.isPlainObject(t) || (t = {}), !1 !== r.close(!0)) ? (i.isArray(e) || (e = u(e) ? i(e).get() : [e]), i.each(e, function (o, s) {
                var a, l, d, c, p, m = {};
                "object" === i.type(s) && (s.nodeType && (s = i(s)), u(s) ? (m = {
                    href: s.data("fancybox-href") || s.attr("href"),
                    title: s.data("fancybox-title") || s.attr("title"),
                    isDom: !0,
                    element: s
                }, i.metadata && i.extend(!0, m, s.metadata())) : m = s), a = t.href || m.href || (h(s) ? s : null), l = t.title !== n ? t.title : m.title || "", c = (d = t.content || m.content) ? "html" : t.type || m.type, !c && m.isDom && (c = s.data("fancybox-type"), c || (c = (c = s.prop("class").match(/fancybox\.(\w+)/)) ? c[1] : null)), h(a) && (c || (r.isImage(a) ? c = "image" : r.isSWF(a) ? c = "swf" : "#" === a.charAt(0) ? c = "inline" : h(s) && (c = "html", d = s)), "ajax" === c && (p = a.split(/\s+/, 2), a = p.shift(), p = p.shift())), d || ("inline" === c ? a ? d = i(h(a) ? a.replace(/.*(?=#[^\s]+$)/, "") : a) : m.isDom && (d = s) : "html" === c ? d = a : !c && !a && m.isDom && (c = "inline", d = s)), i.extend(m, {
                    href: a,
                    type: c,
                    content: d,
                    title: l,
                    selector: p
                }), e[o] = m
            }), r.opts = i.extend(!0, {}, r.defaults, t), t.keys !== n && (r.opts.keys = t.keys ? i.extend({}, r.defaults.keys, t.keys) : !1), r.group = e, r._start(r.opts.index)) : void 0
        },
        cancel: function () {
            var e = r.coming;
            e && !1 !== r.trigger("onCancel") && (r.hideLoading(), r.ajaxLoad && r.ajaxLoad.abort(), r.ajaxLoad = null, r.imgPreload && (r.imgPreload.onload = r.imgPreload.onerror = null), e.wrap && e.wrap.stop(!0, !0).trigger("onReset").remove(), r.coming = null, r.current || r._afterZoomOut(e))
        },
        close: function (e) {
            r.cancel(), !1 !== r.trigger("beforeClose") && (r.unbindEvents(), r.isActive && (r.isOpen && !0 !== e ? (r.isOpen = r.isOpened = !1, r.isClosing = !0, i(".fancybox-item, .fancybox-nav").remove(), r.wrap.stop(!0, !0).removeClass("fancybox-opened"), r.transitions[r.current.closeMethod]()) : (i(".fancybox-wrap").stop(!0).trigger("onReset").remove(), r._afterZoomOut())))
        },
        play: function (e) {
            var t = function () {
                    clearTimeout(r.player.timer)
                },
                i = function () {
                    t(), r.current && r.player.isActive && (r.player.timer = setTimeout(r.next, r.current.playSpeed))
                },
                n = function () {
                    t(), a.unbind(".player"), r.player.isActive = !1, r.trigger("onPlayEnd")
                };
            !0 === e || !r.player.isActive && !1 !== e ? r.current && (r.current.loop || r.current.index < r.group.length - 1) && (r.player.isActive = !0, a.bind({
                "onCancel.player beforeClose.player": n,
                "onUpdate.player": i,
                "beforeLoad.player": t
            }), i(), r.trigger("onPlayStart")) : n()
        },
        next: function (e) {
            var t = r.current;
            t && (h(e) || (e = t.direction.next), r.jumpto(t.index + 1, e, "next"))
        },
        prev: function (e) {
            var t = r.current;
            t && (h(e) || (e = t.direction.prev), r.jumpto(t.index - 1, e, "prev"))
        },
        jumpto: function (e, t, i) {
            var o = r.current;
            o && (e = m(e), r.direction = t || o.direction[e >= o.index ? "next" : "prev"], r.router = i || "jumpto", o.loop && (0 > e && (e = o.group.length + e % o.group.length), e %= o.group.length), o.group[e] !== n && (r.cancel(), r._start(e)))
        },
        reposition: function (e, t) {
            var n, o = r.current,
                s = o ? o.wrap : null;
            s && (n = r._getPosition(t), e && "scroll" === e.type ? (delete n.position, s.stop(!0, !0).animate(n, 200)) : (s.css(n), o.pos = i.extend({}, o.dim, n)))
        },
        update: function (e) {
            var t = e && e.type,
                i = !t || "orientationchange" === t;
            i && (clearTimeout(d), d = null), r.isOpen && !d && (d = setTimeout(function () {
                var n = r.current;
                n && !r.isClosing && (r.wrap.removeClass("fancybox-tmp"), (i || "load" === t || "resize" === t && n.autoResize) && r._setDimension(), "scroll" === t && n.canShrink || r.reposition(e), r.trigger("onUpdate"), d = null)
            }, i && !c ? 0 : 300))
        },
        toggle: function (e) {
            r.isOpen && (r.current.fitToView = "boolean" === i.type(e) ? e : !r.current.fitToView, c && (r.wrap.removeAttr("style").addClass("fancybox-tmp"), r.trigger("onUpdate")), r.update())
        },
        hideLoading: function () {
            a.unbind(".loading"), i("#fancybox-loading").remove()
        },
        showLoading: function () {
            var e, t;
            r.hideLoading(), e = i('<div id="fancybox-loading"><div></div></div>').click(r.cancel).appendTo("body"), a.bind("keydown.loading", function (e) {
                27 === (e.which || e.keyCode) && (e.preventDefault(), r.cancel())
            }), r.defaults.fixed || (t = r.getViewport(), e.css({
                position: "absolute",
                top: .5 * t.h + t.y,
                left: .5 * t.w + t.x
            }))
        },
        getViewport: function () {
            var t = r.current && r.current.locked || !1,
                i = {
                    x: s.scrollLeft(),
                    y: s.scrollTop()
                };
            return t ? (i.w = t[0].clientWidth, i.h = t[0].clientHeight) : (i.w = c && e.innerWidth ? e.innerWidth : s.width(), i.h = c && e.innerHeight ? e.innerHeight : s.height()), i
        },
        unbindEvents: function () {
            r.wrap && u(r.wrap) && r.wrap.unbind(".fb"), a.unbind(".fb"), s.unbind(".fb")
        },
        bindEvents: function () {
            var e, t = r.current;
            t && (s.bind("orientationchange.fb" + (c ? "" : " resize.fb") + (t.autoCenter && !t.locked ? " scroll.fb" : ""), r.update), (e = t.keys) && a.bind("keydown.fb", function (o) {
                var s = o.which || o.keyCode,
                    a = o.target || o.srcElement;
                return 27 === s && r.coming ? !1 : void (!o.ctrlKey && !o.altKey && !o.shiftKey && !o.metaKey && (!a || !a.type && !i(a).is("[contenteditable]")) && i.each(e, function (e, a) {
                    return 1 < t.group.length && a[s] !== n ? (r[e](a[s]), o.preventDefault(), !1) : -1 < i.inArray(s, a) ? (r[e](), o.preventDefault(), !1) : void 0
                }))
            }), i.fn.mousewheel && t.mouseWheel && r.wrap.bind("mousewheel.fb", function (e, n, o, s) {
                for (var a = i(e.target || null), l = !1; a.length && !l && !a.is(".fancybox-skin") && !a.is(".fancybox-wrap");) l = a[0] && !(a[0].style.overflow && "hidden" === a[0].style.overflow) && (a[0].clientWidth && a[0].scrollWidth > a[0].clientWidth || a[0].clientHeight && a[0].scrollHeight > a[0].clientHeight), a = i(a).parent();
                0 !== n && !l && 1 < r.group.length && !t.canShrink && (s > 0 || o > 0 ? r.prev(s > 0 ? "down" : "left") : (0 > s || 0 > o) && r.next(0 > s ? "up" : "right"), e.preventDefault())
            }))
        },
        trigger: function (e, t) {
            var n, o = t || r.coming || r.current;
            if (o) {
                if (i.isFunction(o[e]) && (n = o[e].apply(o, Array.prototype.slice.call(arguments, 1))), !1 === n) return !1;
                o.helpers && i.each(o.helpers, function (t, n) {
                    n && r.helpers[t] && i.isFunction(r.helpers[t][e]) && r.helpers[t][e](i.extend(!0, {}, r.helpers[t].defaults, n), o)
                }), a.trigger(e)
            }
        },
        isImage: function (e) {
            return h(e) && e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        },
        isSWF: function (e) {
            return h(e) && e.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function (e) {
            var t, n, o = {};
            if (e = m(e), t = r.group[e] || null, !t) return !1;
            if (o = i.extend(!0, {}, r.opts, t), t = o.margin, n = o.padding, "number" === i.type(t) && (o.margin = [t, t, t, t]), "number" === i.type(n) && (o.padding = [n, n, n, n]), o.modal && i.extend(!0, o, {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null,
                helpers: {
                    overlay: {
                        closeClick: !1
                    }
                }
            }), o.autoSize && (o.autoWidth = o.autoHeight = !0), "auto" === o.width && (o.autoWidth = !0), "auto" === o.height && (o.autoHeight = !0), o.group = r.group, o.index = e, r.coming = o, !1 === r.trigger("beforeLoad")) r.coming = null;
            else {
                if (n = o.type, t = o.href, !n) return r.coming = null, r.current && r.router && "jumpto" !== r.router ? (r.current.index = e, r[r.router](r.direction)) : !1;
                if (r.isActive = !0, ("image" === n || "swf" === n) && (o.autoHeight = o.autoWidth = !1, o.scrolling = "visible"), "image" === n && (o.aspectRatio = !0), "iframe" === n && c && (o.scrolling = "scroll"), o.wrap = i(o.tpl.wrap).addClass("fancybox-" + (c ? "mobile" : "desktop") + " fancybox-type-" + n + " fancybox-tmp " + o.wrapCSS).appendTo(o.parent || "body"), i.extend(o, {
                    skin: i(".fancybox-skin", o.wrap),
                    outer: i(".fancybox-outer", o.wrap),
                    inner: i(".fancybox-inner", o.wrap)
                }), i.each(["Top", "Right", "Bottom", "Left"], function (e, t) {
                    o.skin.css("padding" + t, f(o.padding[e]))
                }), r.trigger("onReady"), "inline" === n || "html" === n) {
                    if (!o.content || !o.content.length) return r._error("content")
                } else if (!t) return r._error("href");
                "image" === n ? r._loadImage() : "ajax" === n ? r._loadAjax() : "iframe" === n ? r._loadIframe() : r._afterLoad()
            }
        },
        _error: function (e) {
            i.extend(r.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: e,
                content: r.coming.tpl.error
            }), r._afterLoad()
        },
        _loadImage: function () {
            var e = r.imgPreload = new Image;
            e.onload = function () {
                this.onload = this.onerror = null, r.coming.width = this.width / r.opts.pixelRatio, r.coming.height = this.height / r.opts.pixelRatio, r._afterLoad()
            }, e.onerror = function () {
                this.onload = this.onerror = null, r._error("image")
            }, e.src = r.coming.href, !0 !== e.complete && r.showLoading()
        },
        _loadAjax: function () {
            var e = r.coming;
            r.showLoading(), r.ajaxLoad = i.ajax(i.extend({}, e.ajax, {
                url: e.href,
                error: function (e, t) {
                    r.coming && "abort" !== t ? r._error("ajax", e) : r.hideLoading()
                },
                success: function (t, i) {
                    "success" === i && (e.content = t, r._afterLoad())
                }
            }))
        },
        _loadIframe: function () {
            var e = r.coming,
                t = i(e.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", c ? "auto" : e.iframe.scrolling).attr("src", e.href);
            i(e.wrap).bind("onReset", function () {
                try {
                    i(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (e) {
                }
            }), e.iframe.preload && (r.showLoading(), t.one("load", function () {
                i(this).data("ready", 1), c || i(this).bind("load.fb", r.update), i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), r._afterLoad()
            })), e.content = t.appendTo(e.inner), e.iframe.preload || r._afterLoad()
        },
        _preloadImages: function () {
            var e, t, i = r.group,
                n = r.current,
                o = i.length,
                s = n.preload ? Math.min(n.preload, o - 1) : 0;
            for (t = 1; s >= t; t += 1) e = i[(n.index + t) % o], "image" === e.type && e.href && ((new Image).src = e.href)
        },
        _afterLoad: function () {
            var e, t, n, o, s, a = r.coming,
                l = r.current;
            if (r.hideLoading(), a && !1 !== r.isActive)
                if (!1 === r.trigger("afterLoad", a, l)) a.wrap.stop(!0).trigger("onReset").remove(), r.coming = null;
                else {
                    switch (l && (r.trigger("beforeChange", l), l.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), r.unbindEvents(), e = a.content, t = a.type, n = a.scrolling, i.extend(r, {
                        wrap: a.wrap,
                        skin: a.skin,
                        outer: a.outer,
                        inner: a.inner,
                        current: a,
                        previous: l
                    }), o = a.href, t) {
                        case "inline":
                        case "ajax":
                        case "html":
                            a.selector ? e = i("<div>").html(e).find(a.selector) : u(e) && (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", i('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()), e = e.show().detach(), a.wrap.bind("onReset", function () {
                                i(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
                            }));
                            break;
                        case "image":
                            e = a.tpl.image.replace("{href}", o);
                            break;
                        case "swf":
                            e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + o + '"></param>', s = "", i.each(a.swf, function (t, i) {
                                e += '<param name="' + t + '" value="' + i + '"></param>', s += " " + t + '="' + i + '"'
                            }), e += '<embed src="' + o + '" type="application/x-shockwave-flash" width="100%" height="100%"' + s + "></embed></object>"
                    }
                    (!u(e) || !e.parent().is(a.inner)) && a.inner.append(e), r.trigger("beforeShow"), a.inner.css("overflow", "yes" === n ? "scroll" : "no" === n ? "hidden" : n), r._setDimension(), r.reposition(), r.isOpen = !1, r.coming = null, r.bindEvents(), r.isOpened ? l.prevMethod && r.transitions[l.prevMethod]() : i(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove(), r.transitions[r.isOpened ? a.nextMethod : a.openMethod](), r._preloadImages()
                }
        },
        _setDimension: function () {
            var e, t, n, o, s, a, l, d, c, u = r.getViewport(),
                h = 0,
                g = !1,
                v = !1,
                g = r.wrap,
                y = r.skin,
                b = r.inner,
                w = r.current,
                v = w.width,
                x = w.height,
                S = w.minWidth,
                C = w.minHeight,
                T = w.maxWidth,
                k = w.maxHeight,
                j = w.scrolling,
                _ = w.scrollOutside ? w.scrollbarWidth : 0,
                E = w.margin,
                I = m(E[1] + E[3]),
                M = m(E[0] + E[2]);
            if (g.add(y).add(b).width("auto").height("auto").removeClass("fancybox-tmp"), E = m(y.outerWidth(!0) - y.width()), e = m(y.outerHeight(!0) - y.height()), t = I + E, n = M + e, o = p(v) ? (u.w - t) * m(v) / 100 : v, s = p(x) ? (u.h - n) * m(x) / 100 : x, "iframe" === w.type) {
                if (c = w.content, w.autoHeight && 1 === c.data("ready")) try {
                    c[0].contentWindow.document.location && (b.width(o).height(9999), a = c.contents().find("body"), _ && a.css("overflow-x", "hidden"), s = a.outerHeight(!0))
                } catch (P) {
                }
            } else (w.autoWidth || w.autoHeight) && (b.addClass("fancybox-tmp"), w.autoWidth || b.width(o), w.autoHeight || b.height(s), w.autoWidth && (o = b.width()), w.autoHeight && (s = b.height()), b.removeClass("fancybox-tmp"));
            if (v = m(o), x = m(s), d = o / s, S = m(p(S) ? m(S, "w") - t : S), T = m(p(T) ? m(T, "w") - t : T), C = m(p(C) ? m(C, "h") - n : C), k = m(p(k) ? m(k, "h") - n : k), a = T, l = k, w.fitToView && (T = Math.min(u.w - t, T), k = Math.min(u.h - n, k)), t = u.w - I, M = u.h - M, w.aspectRatio ? (v > T && (v = T, x = m(v / d)), x > k && (x = k, v = m(x * d)), S > v && (v = S, x = m(v / d)), C > x && (x = C, v = m(x * d))) : (v = Math.max(S, Math.min(v, T)), w.autoHeight && "iframe" !== w.type && (b.width(v), x = b.height()), x = Math.max(C, Math.min(x, k))), w.fitToView)
                if (b.width(v).height(x), g.width(v + E), u = g.width(), I = g.height(), w.aspectRatio)
                    for (;
                        (u > t || I > M) && v > S && x > C && !(19 < h++);) x = Math.max(C, Math.min(k, x - 10)), v = m(x * d), S > v && (v = S, x = m(v / d)), v > T && (v = T, x = m(v / d)), b.width(v).height(x), g.width(v + E), u = g.width(), I = g.height();
                else v = Math.max(S, Math.min(v, v - (u - t))), x = Math.max(C, Math.min(x, x - (I - M)));
            _ && "auto" === j && s > x && t > v + E + _ && (v += _), b.width(v).height(x), g.width(v + E), u = g.width(), I = g.height(), g = (u > t || I > M) && v > S && x > C, v = w.aspectRatio ? a > v && l > x && o > v && s > x : (a > v || l > x) && (o > v || s > x), i.extend(w, {
                dim: {
                    width: f(u),
                    height: f(I)
                },
                origWidth: o,
                origHeight: s,
                canShrink: g,
                canExpand: v,
                wPadding: E,
                hPadding: e,
                wrapSpace: I - y.outerHeight(!0),
                skinSpace: y.height() - x
            }), !c && w.autoHeight && x > C && k > x && !v && b.height("auto")
        },
        _getPosition: function (e) {
            var t = r.current,
                i = r.getViewport(),
                n = t.margin,
                o = r.wrap.width() + n[1] + n[3],
                s = r.wrap.height() + n[0] + n[2],
                n = {
                    position: "absolute",
                    top: n[0],
                    left: n[3]
                };
            return t.autoCenter && t.fixed && !e && s <= i.h && o <= i.w ? n.position = "fixed" : t.locked || (n.top += i.y, n.left += i.x), n.top = f(Math.max(n.top, n.top + (i.h - s) * t.topRatio)), n.left = f(Math.max(n.left, n.left + (i.w - o) * t.leftRatio)), n
        },
        _afterZoomIn: function () {
            var e = r.current;
            e && (r.isOpen = r.isOpened = !0, r.wrap.css("overflow", "visible").addClass("fancybox-opened"), r.update(), (e.closeClick || e.nextClick && 1 < r.group.length) && r.inner.css("cursor", "pointer").bind("click.fb", function (t) {
                !i(t.target).is("a") && !i(t.target).parent().is("a") && (t.preventDefault(), r[e.closeClick ? "close" : "next"]())
            }), e.closeBtn && i(e.tpl.closeBtn).appendTo(r.skin).bind("click.fb", function (e) {
                e.preventDefault(), r.close()
            }), e.arrows && 1 < r.group.length && ((e.loop || 0 < e.index) && i(e.tpl.prev).appendTo(r.outer).bind("click.fb", r.prev), (e.loop || e.index < r.group.length - 1) && i(e.tpl.next).appendTo(r.outer).bind("click.fb", r.next)), r.trigger("afterShow"), e.loop || e.index !== e.group.length - 1 ? r.opts.autoPlay && !r.player.isActive && (r.opts.autoPlay = !1, r.play()) : r.play(!1))
        },
        _afterZoomOut: function (e) {
            e = e || r.current, i(".fancybox-wrap").trigger("onReset").remove(), i.extend(r, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            }), r.trigger("afterClose", e)
        }
    }), r.transitions = {
        getOrigPosition: function () {
            var e = r.current,
                t = e.element,
                i = e.orig,
                n = {},
                o = 50,
                s = 50,
                a = e.hPadding,
                l = e.wPadding,
                d = r.getViewport();
            return !i && e.isDom && t.is(":visible") && (i = t.find("img:first"), i.length || (i = t)), u(i) ? (n = i.offset(), i.is("img") && (o = i.outerWidth(), s = i.outerHeight())) : (n.top = d.y + (d.h - s) * e.topRatio, n.left = d.x + (d.w - o) * e.leftRatio), ("fixed" === r.wrap.css("position") || e.locked) && (n.top -= d.y, n.left -= d.x), n = {
                top: f(n.top - a * e.topRatio),
                left: f(n.left - l * e.leftRatio),
                width: f(o + l),
                height: f(s + a)
            }
        },
        step: function (e, t) {
            var i, n, o = t.prop;
            n = r.current;
            var s = n.wrapSpace,
                a = n.skinSpace;
            ("width" === o || "height" === o) && (i = t.end === t.start ? 1 : (e - t.start) / (t.end - t.start), r.isClosing && (i = 1 - i), n = "width" === o ? n.wPadding : n.hPadding, n = e - n, r.skin[o](m("width" === o ? n : n - s * i)), r.inner[o](m("width" === o ? n : n - s * i - a * i)))
        },
        zoomIn: function () {
            var e = r.current,
                t = e.pos,
                n = e.openEffect,
                o = "elastic" === n,
                s = i.extend({
                    opacity: 1
                }, t);
            delete s.position, o ? (t = this.getOrigPosition(), e.openOpacity && (t.opacity = .1)) : "fade" === n && (t.opacity = .1), r.wrap.css(t).animate(s, {
                duration: "none" === n ? 0 : e.openSpeed,
                easing: e.openEasing,
                step: o ? this.step : null,
                complete: r._afterZoomIn
            })
        },
        zoomOut: function () {
            var e = r.current,
                t = e.closeEffect,
                i = "elastic" === t,
                n = {
                    opacity: .1
                };
            i && (n = this.getOrigPosition(), e.closeOpacity && (n.opacity = .1)), r.wrap.animate(n, {
                duration: "none" === t ? 0 : e.closeSpeed,
                easing: e.closeEasing,
                step: i ? this.step : null,
                complete: r._afterZoomOut
            })
        },
        changeIn: function () {
            var e, t = r.current,
                i = t.nextEffect,
                n = t.pos,
                o = {
                    opacity: 1
                },
                s = r.direction;
            n.opacity = .1, "elastic" === i && (e = "down" === s || "up" === s ? "top" : "left", "down" === s || "right" === s ? (n[e] = f(m(n[e]) - 200), o[e] = "+=200px") : (n[e] = f(m(n[e]) + 200), o[e] = "-=200px")), "none" === i ? r._afterZoomIn() : r.wrap.css(n).animate(o, {
                duration: t.nextSpeed,
                easing: t.nextEasing,
                complete: r._afterZoomIn
            })
        },
        changeOut: function () {
            var e = r.previous,
                t = e.prevEffect,
                n = {
                    opacity: .1
                },
                o = r.direction;
            "elastic" === t && (n["down" === o || "up" === o ? "top" : "left"] = ("up" === o || "left" === o ? "-" : "+") + "=200px"), e.wrap.animate(n, {
                duration: "none" === t ? 0 : e.prevSpeed,
                easing: e.prevEasing,
                complete: function () {
                    i(this).trigger("onReset").remove()
                }
            })
        }
    }, r.helpers.overlay = {
        defaults: {
            closeClick: !0,
            speedOut: 200,
            showEarly: !0,
            css: {},
            locked: !c,
            fixed: !0
        },
        overlay: null,
        fixed: !1,
        el: i("html"),
        create: function (e) {
            e = i.extend({}, this.defaults, e), this.overlay && this.close(), this.overlay = i('<div class="fancybox-overlay"></div>').appendTo(r.coming ? r.coming.parent : e.parent), this.fixed = !1, e.fixed && r.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
        },
        open: function (e) {
            var t = this;
            e = i.extend({}, this.defaults, e), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(e), this.fixed || (s.bind("resize.overlay", i.proxy(this.update, this)), this.update()), e.closeClick && this.overlay.bind("click.overlay", function (e) {
                return i(e.target).hasClass("fancybox-overlay") ? (r.isActive ? r.close() : t.close(), !1) : void 0
            }), this.overlay.css(e.css).show()
        },
        close: function () {
            var e, t;
            s.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (i(".fancybox-margin").removeClass("fancybox-margin"), e = s.scrollTop(), t = s.scrollLeft(), this.el.removeClass("fancybox-lock"), s.scrollTop(e).scrollLeft(t)), i(".fancybox-overlay").remove().hide(), i.extend(this, {
                overlay: null,
                fixed: !1
            })
        },
        update: function () {
            var e, i = "100%";
            this.overlay.width(i).height("100%"), l ? (e = Math.max(t.documentElement.offsetWidth, t.body.offsetWidth), a.width() > e && (i = a.width())) : a.width() > s.width() && (i = a.width()), this.overlay.width(i).height(a.height())
        },
        onReady: function (e, t) {
            var n = this.overlay;
            i(".fancybox-overlay").stop(!0, !0), n || this.create(e), e.locked && this.fixed && t.fixed && (n || (this.margin = a.height() > s.height() ? i("html").css("margin-right").replace("px", "") : !1), t.locked = this.overlay.append(t.wrap), t.fixed = !1), !0 === e.showEarly && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function (e, t) {
            var n, o;
            t.locked && (!1 !== this.margin && (i("*").filter(function () {
                return "fixed" === i(this).css("position") && !i(this).hasClass("fancybox-overlay") && !i(this).hasClass("fancybox-wrap")
            }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), n = s.scrollTop(), o = s.scrollLeft(), this.el.addClass("fancybox-lock"), s.scrollTop(n).scrollLeft(o)), this.open(e)
        },
        onUpdate: function () {
            this.fixed || this.update()
        },
        afterClose: function (e) {
            this.overlay && !r.coming && this.overlay.fadeOut(e.speedOut, i.proxy(this.close, this))
        }
    }, r.helpers.title = {
        defaults: {
            type: "float",
            position: "bottom"
        },
        beforeShow: function (e) {
            var t = r.current,
                n = t.title,
                o = e.type;
            if (i.isFunction(n) && (n = n.call(t.element, t)), h(n) && "" !== i.trim(n)) {
                switch (t = i('<div class="fancybox-title fancybox-title-' + o + '-wrap">' + n + "</div>"), o) {
                    case "inside":
                        o = r.skin;
                        break;
                    case "outside":
                        o = r.wrap;
                        break;
                    case "over":
                        o = r.inner;
                        break;
                    default:
                        o = r.skin, t.appendTo("body"), l && t.width(t.width()), t.wrapInner('<span class="child"></span>'), r.current.margin[2] += Math.abs(m(t.css("margin-bottom")))
                }
                t["top" === e.position ? "prependTo" : "appendTo"](o)
            }
        }
    }, i.fn.fancybox = function (e) {
        var t, n = i(this),
            o = this.selector || "",
            s = function (s) {
                var a, l, d = i(this).blur(),
                    c = t;
                !s.ctrlKey && !s.altKey && !s.shiftKey && !s.metaKey && !d.is(".fancybox-wrap") && (a = e.groupAttr || "data-fancybox-group", l = d.attr(a), l || (a = "rel", l = d.get(0)[a]), l && "" !== l && "nofollow" !== l && (d = o.length ? i(o) : n, d = d.filter("[" + a + '="' + l + '"]'), c = d.index(this)), e.index = c, !1 !== r.open(d, e) && s.preventDefault())
            };
        return e = e || {}, t = e.index || 0, o && !1 !== e.live ? a.undelegate(o, "click.fb-start").delegate(o + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", s) : n.unbind("click.fb-start").bind("click.fb-start", s), this.filter("[data-fancybox-start=1]").trigger("click"), this
    }, a.ready(function () {
        var t, s;
        if (i.scrollbarWidth === n && (i.scrollbarWidth = function () {
            var e = i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                t = e.children(),
                t = t.innerWidth() - t.height(99).innerWidth();
            return e.remove(), t
        }), i.support.fixedPosition === n) {
            t = i.support, s = i('<div style="position:fixed;top:20px;"></div>').appendTo("body");
            var a = 20 === s[0].offsetTop || 15 === s[0].offsetTop;
            s.remove(), t.fixedPosition = a
        }
        i.extend(r.defaults, {
            scrollbarWidth: i.scrollbarWidth(),
            fixed: i.support.fixedPosition,
            parent: i("body")
        }), t = i(e).width(), o.addClass("fancybox-lock-test"), s = i(e).width(), o.removeClass("fancybox-lock-test"), i("<style type='text/css'>.fancybox-margin{margin-right:" + (s - t) + "px;}</style>").appendTo("head")
    })
}(window, document, jQuery);
!function (e) {
    "use strict";
    var t = jQuery.fancybox,
        i = function (t, i, n) {
            return n = n || "", "object" === e.type(n) && (n = e.param(n, !0)), e.each(i, function (e, i) {
                t = t.replace("$" + e, i || "")
            }), n.length && (t += (t.indexOf("?") > 0 ? "&" : "?") + n), t
        };
    t.helpers.media = {
        defaults: {
            youtube: {
                matcher: /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
                params: {
                    autoplay: 1,
                    autohide: 1,
                    fs: 1,
                    rel: 0,
                    hd: 1,
                    wmode: "opaque",
                    enablejsapi: 1
                },
                type: "iframe",
                url: "//www.youtube.com/embed/$3"
            },
            vimeo: {
                matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
                params: {
                    autoplay: 1,
                    hd: 1,
                    show_title: 1,
                    show_byline: 1,
                    show_portrait: 0,
                    fullscreen: 1
                },
                type: "iframe",
                url: "//player.vimeo.com/video/$1"
            },
            metacafe: {
                matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
                params: {
                    autoPlay: "yes"
                },
                type: "swf",
                url: function (t, i, n) {
                    return n.swf.flashVars = "playerVars=" + e.param(i, !0), "//www.metacafe.com/fplayer/" + t[1] + "/.swf"
                }
            },
            dailymotion: {
                matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
                params: {
                    additionalInfos: 0,
                    autoStart: 1
                },
                type: "swf",
                url: "//www.dailymotion.com/swf/video/$1"
            },
            twitvid: {
                matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
                params: {
                    autoplay: 0
                },
                type: "iframe",
                url: "//www.twitvid.com/embed.php?guid=$1"
            },
            twitpic: {
                matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
                type: "image",
                url: "//twitpic.com/show/full/$1/"
            },
            instagram: {
                matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                type: "image",
                url: "//$1/p/$2/media/?size=l"
            },
            google_maps: {
                matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
                type: "iframe",
                url: function (e) {
                    return "//maps.google." + e[1] + "/" + e[3] + e[4] + "&output=" + (e[4].indexOf("layer=c") > 0 ? "svembed" : "embed")
                }
            }
        },
        beforeLoad: function (t, n) {
            var o, s, a, r, l = n.href || "",
                d = !1;
            for (o in t)
                if (t.hasOwnProperty(o) && (s = t[o], a = l.match(s.matcher))) {
                    d = s.type, r = e.extend(!0, {}, s.params, n[o] || (e.isPlainObject(t[o]) ? t[o].params : null)), l = "function" === e.type(s.url) ? s.url.call(this, a, r, n) : i(s.url, a, r);
                    break
                }
            d && (n.href = l, n.type = d, n.autoHeight = !1)
        }
    }
}(jQuery);
!function (e, t, i) {
    var n = {
        init: function (t, i) {
            this.$elem = e(i), this.options = e.extend({}, e.fn.owlCarousel.options, this.$elem.data(), t), this.userOptions = t, this.loadContent()
        },
        loadContent: function () {
            function t(e) {
                var t, i = "";
                if ("function" == typeof n.options.jsonSuccess) n.options.jsonSuccess.apply(this, [e]);
                else {
                    for (t in e.owl) e.owl.hasOwnProperty(t) && (i += e.owl[t].item);
                    n.$elem.html(i)
                }
                n.logIn()
            }

            var i, n = this;
            "function" == typeof n.options.beforeInit && n.options.beforeInit.apply(this, [n.$elem]), "string" == typeof n.options.jsonPath ? (i = n.options.jsonPath, e.getJSON(i, t)) : n.logIn()
        },
        logIn: function () {
            this.$elem.data("owl-originalStyles", this.$elem.attr("style")), this.$elem.data("owl-originalClasses", this.$elem.attr("class")), this.$elem.css({
                opacity: 0
            }), this.orignalItems = this.options.items, this.checkBrowser(), this.wrapperWidth = 0, this.checkVisible = null, this.setVars()
        },
        setVars: function () {
            return 0 === this.$elem.children().length ? !1 : (this.baseClass(), this.eventTypes(), this.$userItems = this.$elem.children(), this.itemsAmount = this.$userItems.length, this.wrapItems(), this.$owlItems = this.$elem.find(".owl-item"), this.$owlWrapper = this.$elem.find(".owl-wrapper"), this.playDirection = "next", this.prevItem = 0, this.prevArr = [0], this.currentItem = 0, this.customEvents(), void this.onStartup())
        },
        onStartup: function () {
            this.updateItems(), this.calculateAll(), this.buildControls(), this.updateControls(), this.response(), this.moveEvents(), this.stopOnHover(), this.owlStatus(), !1 !== this.options.transitionStyle && this.transitionTypes(this.options.transitionStyle), !0 === this.options.autoPlay && (this.options.autoPlay = 5e3), this.play(), this.$elem.find(".owl-wrapper").css("display", "block"), this.$elem.is(":visible") ? this.$elem.css("opacity", 1) : this.watchVisibility(), this.onstartup = !1, this.eachMoveUpdate(), "function" == typeof this.options.afterInit && this.options.afterInit.apply(this, [this.$elem])
        },
        eachMoveUpdate: function () {
            !0 === this.options.lazyLoad && this.lazyLoad(), !0 === this.options.autoHeight && this.autoHeight(), this.onVisibleItems(), "function" == typeof this.options.afterAction && this.options.afterAction.apply(this, [this.$elem])
        },
        updateVars: function () {
            "function" == typeof this.options.beforeUpdate && this.options.beforeUpdate.apply(this, [this.$elem]), this.watchVisibility(), this.updateItems(), this.calculateAll(), this.updatePosition(), this.updateControls(), this.eachMoveUpdate(), "function" == typeof this.options.afterUpdate && this.options.afterUpdate.apply(this, [this.$elem])
        },
        reload: function () {
            var e = this;
            t.setTimeout(function () {
                e.updateVars()
            }, 0)
        },
        watchVisibility: function () {
            var e = this;
            return !1 !== e.$elem.is(":visible") ? !1 : (e.$elem.css({
                opacity: 0
            }), t.clearInterval(e.autoPlayInterval), t.clearInterval(e.checkVisible), void (e.checkVisible = t.setInterval(function () {
                e.$elem.is(":visible") && (e.reload(), e.$elem.animate({
                    opacity: 1
                }, 200), t.clearInterval(e.checkVisible))
            }, 500)))
        },
        wrapItems: function () {
            this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), this.wrapperOuter = this.$elem.find(".owl-wrapper-outer"), this.$elem.css("display", "block")
        },
        baseClass: function () {
            var e = this.$elem.hasClass(this.options.baseClass),
                t = this.$elem.hasClass(this.options.theme);
            e || this.$elem.addClass(this.options.baseClass), t || this.$elem.addClass(this.options.theme)
        },
        updateItems: function () {
            var t, i;
            if (!1 === this.options.responsive) return !1;
            if (!0 === this.options.singleItem) return this.options.items = this.orignalItems = 1, this.options.itemsCustom = !1, this.options.itemsDesktop = !1, this.options.itemsDesktopSmall = !1, this.options.itemsTablet = !1, this.options.itemsTabletSmall = !1, this.options.itemsMobile = !1;
            if (t = e(this.options.responsiveBaseWidth).width(), t > (this.options.itemsDesktop[0] || this.orignalItems) && (this.options.items = this.orignalItems), !1 !== this.options.itemsCustom)
                for (this.options.itemsCustom.sort(function (e, t) {
                    return e[0] - t[0]
                }), i = 0; i < this.options.itemsCustom.length; i += 1) this.options.itemsCustom[i][0] <= t && (this.options.items = this.options.itemsCustom[i][1]);
            else t <= this.options.itemsDesktop[0] && !1 !== this.options.itemsDesktop && (this.options.items = this.options.itemsDesktop[1]), t <= this.options.itemsDesktopSmall[0] && !1 !== this.options.itemsDesktopSmall && (this.options.items = this.options.itemsDesktopSmall[1]), t <= this.options.itemsTablet[0] && !1 !== this.options.itemsTablet && (this.options.items = this.options.itemsTablet[1]),
            t <= this.options.itemsTabletSmall[0] && !1 !== this.options.itemsTabletSmall && (this.options.items = this.options.itemsTabletSmall[1]), t <= this.options.itemsMobile[0] && !1 !== this.options.itemsMobile && (this.options.items = this.options.itemsMobile[1]);
            this.options.items > this.itemsAmount && !0 === this.options.itemsScaleUp && (this.options.items = this.itemsAmount)
        },
        response: function () {
            var i, n, o = this;
            return !0 !== o.options.responsive ? !1 : (n = e(t).width(), o.resizer = function () {
                e(t).width() !== n && (!1 !== o.options.autoPlay && t.clearInterval(o.autoPlayInterval), t.clearTimeout(i), i = t.setTimeout(function () {
                    n = e(t).width(), o.updateVars()
                }, o.options.responsiveRefreshRate))
            }, void e(t).resize(o.resizer))
        },
        updatePosition: function () {
            this.jumpTo(this.currentItem), !1 !== this.options.autoPlay && this.checkAp()
        },
        appendItemsSizes: function () {
            var t = this,
                i = 0,
                n = t.itemsAmount - t.options.items;
            t.$owlItems.each(function (o) {
                var s = e(this);
                s.css({
                    width: t.itemWidth
                }).data("owl-item", Number(o)), (0 === o % t.options.items || o === n) && (o > n || (i += 1)), s.data("owl-roundPages", i)
            })
        },
        appendWrapperSizes: function () {
            this.$owlWrapper.css({
                width: this.$owlItems.length * this.itemWidth * 2,
                left: 0
            }), this.appendItemsSizes()
        },
        calculateAll: function () {
            this.calculateWidth(), this.appendWrapperSizes(), this.loops(), this.max()
        },
        calculateWidth: function () {
            this.itemWidth = Math.round(this.$elem.width() / this.options.items)
        },
        max: function () {
            var e = -1 * (this.itemsAmount * this.itemWidth - this.options.items * this.itemWidth);
            return this.options.items > this.itemsAmount ? this.maximumPixels = e = this.maximumItem = 0 : (this.maximumItem = this.itemsAmount - this.options.items, this.maximumPixels = e), e
        },
        min: function () {
            return 0
        },
        loops: function () {
            var t, i, n = 0,
                o = 0;
            for (this.positionsInArray = [0], this.pagesInArray = [], t = 0; t < this.itemsAmount; t += 1) o += this.itemWidth, this.positionsInArray.push(-o), !0 === this.options.scrollPerPage && (i = e(this.$owlItems[t]), i = i.data("owl-roundPages"), i !== n && (this.pagesInArray[n] = this.positionsInArray[t], n = i))
        },
        buildControls: function () {
            (!0 === this.options.navigation || !0 === this.options.pagination) && (this.owlControls = e('<div class="owl-controls"/>').toggleClass("clickable", !this.browser.isTouch).appendTo(this.$elem)), !0 === this.options.pagination && this.buildPagination(), !0 === this.options.navigation && this.buildButtons()
        },
        buildButtons: function () {
            var t = this,
                i = e('<div class="owl-buttons"/>');
            t.owlControls.append(i), t.buttonPrev = e("<div/>", {
                "class": "owl-prev",
                html: t.options.navigationText[0] || ""
            }), t.buttonNext = e("<div/>", {
                "class": "owl-next",
                html: t.options.navigationText[1] || ""
            }), i.append(t.buttonPrev).append(t.buttonNext), i.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function (e) {
                e.preventDefault()
            }), i.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function (i) {
                i.preventDefault(), e(this).hasClass("owl-next") ? t.next() : t.prev()
            })
        },
        buildPagination: function () {
            var t = this;
            t.paginationWrapper = e('<div class="owl-pagination"/>'), t.owlControls.append(t.paginationWrapper), t.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (i) {
                i.preventDefault(), Number(e(this).data("owl-page")) !== t.currentItem && t.goTo(Number(e(this).data("owl-page")), !0)
            })
        },
        updatePagination: function () {
            var t, i, n, o, s, a;
            if (!1 === this.options.pagination) return !1;
            for (this.paginationWrapper.html(""), t = 0, i = this.itemsAmount - this.itemsAmount % this.options.items, o = 0; o < this.itemsAmount; o += 1) 0 === o % this.options.items && (t += 1, i === o && (n = this.itemsAmount - this.options.items), s = e("<div/>", {
                "class": "owl-page"
            }), a = e("<span></span>", {
                text: !0 === this.options.paginationNumbers ? t : "",
                "class": !0 === this.options.paginationNumbers ? "owl-numbers" : ""
            }), s.append(a), s.data("owl-page", i === o ? n : o), s.data("owl-roundPages", t), this.paginationWrapper.append(s));
            this.checkPagination()
        },
        checkPagination: function () {
            var t = this;
            return !1 === t.options.pagination ? !1 : void t.paginationWrapper.find(".owl-page").each(function () {
                e(this).data("owl-roundPages") === e(t.$owlItems[t.currentItem]).data("owl-roundPages") && (t.paginationWrapper.find(".owl-page").removeClass("active"), e(this).addClass("active"))
            })
        },
        checkNavigation: function () {
            return !1 === this.options.navigation ? !1 : void (!1 === this.options.rewindNav && (0 === this.currentItem && 0 === this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.addClass("disabled")) : 0 === this.currentItem && 0 !== this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.removeClass("disabled")) : this.currentItem === this.maximumItem ? (this.buttonPrev.removeClass("disabled"), this.buttonNext.addClass("disabled")) : 0 !== this.currentItem && this.currentItem !== this.maximumItem && (this.buttonPrev.removeClass("disabled"), this.buttonNext.removeClass("disabled"))))
        },
        updateControls: function () {
            this.updatePagination(), this.checkNavigation(), this.owlControls && (this.options.items >= this.itemsAmount ? this.owlControls.hide() : this.owlControls.show())
        },
        destroyControls: function () {
            this.owlControls && this.owlControls.remove()
        },
        next: function (e) {
            if (this.isTransition) return !1;
            if (this.currentItem += !0 === this.options.scrollPerPage ? this.options.items : 1, this.currentItem > this.maximumItem + (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0)) {
                if (!0 !== this.options.rewindNav) return this.currentItem = this.maximumItem, !1;
                this.currentItem = 0, e = "rewind"
            }
            this.goTo(this.currentItem, e)
        },
        prev: function (e) {
            if (this.isTransition) return !1;
            if (this.currentItem = !0 === this.options.scrollPerPage && 0 < this.currentItem && this.currentItem < this.options.items ? 0 : this.currentItem - (!0 === this.options.scrollPerPage ? this.options.items : 1), 0 > this.currentItem) {
                if (!0 !== this.options.rewindNav) return this.currentItem = 0, !1;
                this.currentItem = this.maximumItem, e = "rewind"
            }
            this.goTo(this.currentItem, e)
        },
        goTo: function (e, i, n) {
            var o = this;
            return o.isTransition ? !1 : ("function" == typeof o.options.beforeMove && o.options.beforeMove.apply(this, [o.$elem]), e >= o.maximumItem ? e = o.maximumItem : 0 >= e && (e = 0), o.currentItem = o.owl.currentItem = e, !1 !== o.options.transitionStyle && "drag" !== n && 1 === o.options.items && !0 === o.browser.support3d ? (o.swapSpeed(0), !0 === o.browser.support3d ? o.transition3d(o.positionsInArray[e]) : o.css2slide(o.positionsInArray[e], 1), o.afterGo(), o.singleItemTransition(), !1) : (e = o.positionsInArray[e], !0 === o.browser.support3d ? (o.isCss3Finish = !1, !0 === i ? (o.swapSpeed("paginationSpeed"), t.setTimeout(function () {
                o.isCss3Finish = !0
            }, o.options.paginationSpeed)) : "rewind" === i ? (o.swapSpeed(o.options.rewindSpeed), t.setTimeout(function () {
                o.isCss3Finish = !0
            }, o.options.rewindSpeed)) : (o.swapSpeed("slideSpeed"), t.setTimeout(function () {
                o.isCss3Finish = !0
            }, o.options.slideSpeed)), o.transition3d(e)) : !0 === i ? o.css2slide(e, o.options.paginationSpeed) : "rewind" === i ? o.css2slide(e, o.options.rewindSpeed) : o.css2slide(e, o.options.slideSpeed), void o.afterGo()))
        },
        jumpTo: function (e) {
            "function" == typeof this.options.beforeMove && this.options.beforeMove.apply(this, [this.$elem]), e >= this.maximumItem || -1 === e ? e = this.maximumItem : 0 >= e && (e = 0), this.swapSpeed(0), !0 === this.browser.support3d ? this.transition3d(this.positionsInArray[e]) : this.css2slide(this.positionsInArray[e], 1), this.currentItem = this.owl.currentItem = e, this.afterGo()
        },
        afterGo: function () {
            this.prevArr.push(this.currentItem), this.prevItem = this.owl.prevItem = this.prevArr[this.prevArr.length - 2], this.prevArr.shift(0), this.prevItem !== this.currentItem && (this.checkPagination(), this.checkNavigation(), this.eachMoveUpdate(), !1 !== this.options.autoPlay && this.checkAp()), "function" == typeof this.options.afterMove && this.prevItem !== this.currentItem && this.options.afterMove.apply(this, [this.$elem])
        },
        stop: function () {
            this.apStatus = "stop", t.clearInterval(this.autoPlayInterval)
        },
        checkAp: function () {
            "stop" !== this.apStatus && this.play()
        },
        play: function () {
            var e = this;
            return e.apStatus = "play", !1 === e.options.autoPlay ? !1 : (t.clearInterval(e.autoPlayInterval), void (e.autoPlayInterval = t.setInterval(function () {
                e.next(!0)
            }, e.options.autoPlay)))
        },
        swapSpeed: function (e) {
            "slideSpeed" === e ? this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)) : "paginationSpeed" === e ? this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)) : "string" != typeof e && this.$owlWrapper.css(this.addCssSpeed(e))
        },
        addCssSpeed: function (e) {
            return {
                "-webkit-transition": "all " + e + "ms ease",
                "-moz-transition": "all " + e + "ms ease",
                "-o-transition": "all " + e + "ms ease",
                transition: "all " + e + "ms ease"
            }
        },
        removeTransition: function () {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                transition: ""
            }
        },
        doTranslate: function (e) {
            return {
                "-webkit-transform": "translate3d(" + e + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + e + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + e + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + e + "px, 0px, 0px)",
                transform: "translate3d(" + e + "px, 0px,0px)"
            }
        },
        transition3d: function (e) {
            this.$owlWrapper.css(this.doTranslate(e))
        },
        css2move: function (e) {
            this.$owlWrapper.css({
                left: e
            })
        },
        css2slide: function (e, t) {
            var i = this;
            i.isCssFinish = !1, i.$owlWrapper.stop(!0, !0).animate({
                left: e
            }, {
                duration: t || i.options.slideSpeed,
                complete: function () {
                    i.isCssFinish = !0
                }
            })
        },
        checkBrowser: function () {
            var e = i.createElement("div");
            e.style.cssText = "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)", e = e.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g), this.browser = {
                support3d: null !== e && 1 === e.length,
                isTouch: "ontouchstart" in t || t.navigator.msMaxTouchPoints
            }
        },
        moveEvents: function () {
            (!1 !== this.options.mouseDrag || !1 !== this.options.touchDrag) && (this.gestures(), this.disabledEvents())
        },
        eventTypes: function () {
            var e = ["s", "e", "x"];
            this.ev_types = {}, !0 === this.options.mouseDrag && !0 === this.options.touchDrag ? e = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : !1 === this.options.mouseDrag && !0 === this.options.touchDrag ? e = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : !0 === this.options.mouseDrag && !1 === this.options.touchDrag && (e = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]), this.ev_types.start = e[0], this.ev_types.move = e[1], this.ev_types.end = e[2]
        },
        disabledEvents: function () {
            this.$elem.on("dragstart.owl", function (e) {
                e.preventDefault()
            }), this.$elem.on("mousedown.disableTextSelect", function (t) {
                return e(t.target).is("input, textarea, select, option")
            })
        },
        gestures: function () {
            function n(e) {
                if (void 0 !== e.touches) return {
                    x: e.touches[0].pageX,
                    y: e.touches[0].pageY
                };
                if (void 0 === e.touches) {
                    if (void 0 !== e.pageX) return {
                        x: e.pageX,
                        y: e.pageY
                    };
                    if (void 0 === e.pageX) return {
                        x: e.clientX,
                        y: e.clientY
                    }
                }
            }

            function o(t) {
                "on" === t ? (e(i).on(r.ev_types.move, s), e(i).on(r.ev_types.end, a)) : "off" === t && (e(i).off(r.ev_types.move), e(i).off(r.ev_types.end))
            }

            function s(o) {
                o = o.originalEvent || o || t.event, r.newPosX = n(o).x - l.offsetX, r.newPosY = n(o).y - l.offsetY, r.newRelativeX = r.newPosX - l.relativePos, "function" == typeof r.options.startDragging && !0 !== l.dragging && 0 !== r.newRelativeX && (l.dragging = !0, r.options.startDragging.apply(r, [r.$elem])), (8 < r.newRelativeX || -8 > r.newRelativeX) && !0 === r.browser.isTouch && (void 0 !== o.preventDefault ? o.preventDefault() : o.returnValue = !1, l.sliding = !0), (10 < r.newPosY || -10 > r.newPosY) && !1 === l.sliding && e(i).off("touchmove.owl"), r.newPosX = Math.max(Math.min(r.newPosX, r.newRelativeX / 5), r.maximumPixels + r.newRelativeX / 5), !0 === r.browser.support3d ? r.transition3d(r.newPosX) : r.css2move(r.newPosX)
            }

            function a(i) {
                i = i.originalEvent || i || t.event;
                var n;
                i.target = i.target || i.srcElement, l.dragging = !1, !0 !== r.browser.isTouch && r.$owlWrapper.removeClass("grabbing"), r.dragDirection = 0 > r.newRelativeX ? r.owl.dragDirection = "left" : r.owl.dragDirection = "right", 0 !== r.newRelativeX && (n = r.getNewPosition(), r.goTo(n, !1, "drag"), l.targetElement === i.target && !0 !== r.browser.isTouch && (e(i.target).on("click.disable", function (t) {
                    t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault(), e(t.target).off("click.disable")
                }), i = e._data(i.target, "events").click, n = i.pop(), i.splice(0, 0, n))), o("off")
            }

            var r = this,
                l = {
                    offsetX: 0,
                    offsetY: 0,
                    baseElWidth: 0,
                    relativePos: 0,
                    position: null,
                    minSwipe: null,
                    maxSwipe: null,
                    sliding: null,
                    dargging: null,
                    targetElement: null
                };
            r.isCssFinish = !0, r.$elem.on(r.ev_types.start, ".owl-wrapper", function (i) {
                i = i.originalEvent || i || t.event;
                var s;
                if (3 === i.which) return !1;
                if (!(r.itemsAmount <= r.options.items)) {
                    if (!1 === r.isCssFinish && !r.options.dragBeforeAnimFinish || !1 === r.isCss3Finish && !r.options.dragBeforeAnimFinish) return !1;
                    !1 !== r.options.autoPlay && t.clearInterval(r.autoPlayInterval), !0 === r.browser.isTouch || r.$owlWrapper.hasClass("grabbing") || r.$owlWrapper.addClass("grabbing"), r.newPosX = 0, r.newRelativeX = 0, e(this).css(r.removeTransition()), s = e(this).position(), l.relativePos = s.left, l.offsetX = n(i).x - s.left, l.offsetY = n(i).y - s.top, o("on"), l.sliding = !1, l.targetElement = i.target || i.srcElement
                }
            })
        },
        getNewPosition: function () {
            var e = this.closestItem();
            return e > this.maximumItem ? e = this.currentItem = this.maximumItem : 0 <= this.newPosX && (this.currentItem = e = 0), e
        },
        closestItem: function () {
            var t = this,
                i = !0 === t.options.scrollPerPage ? t.pagesInArray : t.positionsInArray,
                n = t.newPosX,
                o = null;
            return e.each(i, function (s, a) {
                n - t.itemWidth / 20 > i[s + 1] && n - t.itemWidth / 20 < a && "left" === t.moveDirection() ? (o = a, t.currentItem = !0 === t.options.scrollPerPage ? e.inArray(o, t.positionsInArray) : s) : n + t.itemWidth / 20 < a && n + t.itemWidth / 20 > (i[s + 1] || i[s] - t.itemWidth) && "right" === t.moveDirection() && (!0 === t.options.scrollPerPage ? (o = i[s + 1] || i[i.length - 1], t.currentItem = e.inArray(o, t.positionsInArray)) : (o = i[s + 1], t.currentItem = s + 1))
            }), t.currentItem
        },
        moveDirection: function () {
            var e;
            return 0 > this.newRelativeX ? (e = "right", this.playDirection = "next") : (e = "left", this.playDirection = "prev"), e
        },
        customEvents: function () {
            var e = this;
            e.$elem.on("owl.next", function () {
                e.next()
            }), e.$elem.on("owl.prev", function () {
                e.prev()
            }), e.$elem.on("owl.play", function (t, i) {
                e.options.autoPlay = i, e.play(), e.hoverStatus = "play"
            }), e.$elem.on("owl.stop", function () {
                e.stop(), e.hoverStatus = "stop"
            }), e.$elem.on("owl.goTo", function (t, i) {
                e.goTo(i)
            }), e.$elem.on("owl.jumpTo", function (t, i) {
                e.jumpTo(i)
            })
        },
        stopOnHover: function () {
            var e = this;
            !0 === e.options.stopOnHover && !0 !== e.browser.isTouch && !1 !== e.options.autoPlay && (e.$elem.on("mouseover", function () {
                e.stop()
            }), e.$elem.on("mouseout", function () {
                "stop" !== e.hoverStatus && e.play()
            }))
        },
        lazyLoad: function () {
            var t, i, n, o, s;
            if (!1 === this.options.lazyLoad) return !1;
            for (t = 0; t < this.itemsAmount; t += 1) i = e(this.$owlItems[t]), "loaded" !== i.data("owl-loaded") && (n = i.data("owl-item"), o = i.find(".lazyOwl"), "string" != typeof o.data("src") ? i.data("owl-loaded", "loaded") : (void 0 === i.data("owl-loaded") && (o.hide(), i.addClass("loading").data("owl-loaded", "checked")), (s = !0 === this.options.lazyFollow ? n >= this.currentItem : !0) && n < this.currentItem + this.options.items && o.length && this.lazyPreload(i, o)))
        },
        lazyPreload: function (e, i) {
            function n() {
                e.data("owl-loaded", "loaded").removeClass("loading"), i.removeAttr("data-src"), "fade" === a.options.lazyEffect ? i.fadeIn(400) : i.show(), "function" == typeof a.options.afterLazyLoad && a.options.afterLazyLoad.apply(this, [a.$elem])
            }

            function o() {
                r += 1, a.completeImg(i.get(0)) || !0 === s ? n() : 100 >= r ? t.setTimeout(o, 100) : n()
            }

            var s, a = this,
                r = 0;
            "DIV" === i.prop("tagName") ? (i.css("background-image", "url(" + i.data("src") + ")"), s = !0) : i[0].src = i.data("src"), o()
        },
        autoHeight: function () {
            function i() {
                var i = e(s.$owlItems[s.currentItem]).height();
                s.wrapperOuter.css("height", i + "px"), s.wrapperOuter.hasClass("autoHeight") || t.setTimeout(function () {
                    s.wrapperOuter.addClass("autoHeight")
                }, 0)
            }

            function n() {
                o += 1, s.completeImg(a.get(0)) ? i() : 100 >= o ? t.setTimeout(n, 100) : s.wrapperOuter.css("height", "")
            }

            var o, s = this,
                a = e(s.$owlItems[s.currentItem]).find("img");
            void 0 !== a.get(0) ? (o = 0, n()) : i()
        },
        completeImg: function (e) {
            return !e.complete || "undefined" != typeof e.naturalWidth && 0 === e.naturalWidth ? !1 : !0
        },
        onVisibleItems: function () {
            var t;
            for (!0 === this.options.addClassActive && this.$owlItems.removeClass("active"), this.visibleItems = [], t = this.currentItem; t < this.currentItem + this.options.items; t += 1) this.visibleItems.push(t), !0 === this.options.addClassActive && e(this.$owlItems[t]).addClass("active");
            this.owl.visibleItems = this.visibleItems
        },
        transitionTypes: function (e) {
            this.outClass = "owl-" + e + "-out", this.inClass = "owl-" + e + "-in"
        },
        singleItemTransition: function () {
            var e = this,
                t = e.outClass,
                i = e.inClass,
                n = e.$owlItems.eq(e.currentItem),
                o = e.$owlItems.eq(e.prevItem),
                s = Math.abs(e.positionsInArray[e.currentItem]) + e.positionsInArray[e.prevItem],
                a = Math.abs(e.positionsInArray[e.currentItem]) + e.itemWidth / 2;
            e.isTransition = !0, e.$owlWrapper.addClass("owl-origin").css({
                "-webkit-transform-origin": a + "px",
                "-moz-perspective-origin": a + "px",
                "perspective-origin": a + "px"
            }), o.css({
                position: "relative",
                left: s + "px"
            }).addClass(t).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function () {
                e.endPrev = !0, o.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"), e.clearTransStyle(o, t)
            }), n.addClass(i).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function () {
                e.endCurrent = !0, n.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"), e.clearTransStyle(n, i)
            })
        },
        clearTransStyle: function (e, t) {
            e.css({
                position: "",
                left: ""
            }).removeClass(t), this.endPrev && this.endCurrent && (this.$owlWrapper.removeClass("owl-origin"), this.isTransition = this.endCurrent = this.endPrev = !1)
        },
        owlStatus: function () {
            this.owl = {
                userOptions: this.userOptions,
                baseElement: this.$elem,
                userItems: this.$userItems,
                owlItems: this.$owlItems,
                currentItem: this.currentItem,
                prevItem: this.prevItem,
                visibleItems: this.visibleItems,
                isTouch: this.browser.isTouch,
                browser: this.browser,
                dragDirection: this.dragDirection
            }
        },
        clearEvents: function () {
            this.$elem.off(".owl owl mousedown.disableTextSelect"), e(i).off(".owl owl"), e(t).off("resize", this.resizer)
        },
        unWrap: function () {
            0 !== this.$elem.children().length && (this.$owlWrapper.unwrap(), this.$userItems.unwrap().unwrap(), this.owlControls && this.owlControls.remove()), this.clearEvents(), this.$elem.attr("style", this.$elem.data("owl-originalStyles") || "").attr("class", this.$elem.data("owl-originalClasses"))
        },
        destroy: function () {
            this.stop(), t.clearInterval(this.checkVisible), this.unWrap(), this.$elem.removeData()
        },
        reinit: function (t) {
            t = e.extend({}, this.userOptions, t), this.unWrap(), this.init(t, this.$elem)
        },
        addItem: function (e, t) {
            var i;
            return e ? 0 === this.$elem.children().length ? (this.$elem.append(e), this.setVars(), !1) : (this.unWrap(), i = void 0 === t || -1 === t ? -1 : t, i >= this.$userItems.length || -1 === i ? this.$userItems.eq(-1).after(e) : this.$userItems.eq(i).before(e), void this.setVars()) : !1
        },
        removeItem: function (e) {
            return 0 === this.$elem.children().length ? !1 : (e = void 0 === e || -1 === e ? -1 : e, this.unWrap(), this.$userItems.eq(e).remove(), void this.setVars())
        }
    };
    e.fn.owlCarousel = function (t) {
        return this.each(function () {
            if (!0 === e(this).data("owl-init")) return !1;
            e(this).data("owl-init", !0);
            var i = Object.create(n);
            i.init(t, this), e.data(this, "owlCarousel", i)
        })
    }, e.fn.owlCarousel.options = {
        items: 5,
        itemsCustom: !1,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: !1,
        itemsMobile: [479, 1],
        singleItem: !1,
        itemsScaleUp: !1,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1e3,
        autoPlay: !1,
        stopOnHover: !1,
        navigation: !1,
        navigationText: ["prev", "next"],
        rewindNav: !0,
        scrollPerPage: !1,
        pagination: !0,
        paginationNumbers: !1,
        responsive: !0,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: t,
        baseClass: "owl-carousel",
        theme: "owl-theme",
        lazyLoad: !1,
        lazyFollow: !0,
        lazyEffect: "fade",
        autoHeight: !1,
        jsonPath: !1,
        jsonSuccess: !1,
        dragBeforeAnimFinish: !0,
        mouseDrag: !0,
        touchDrag: !0,
        addClassActive: !1,
        transitionStyle: !1,
        beforeUpdate: !1,
        afterUpdate: !1,
        beforeInit: !1,
        afterInit: !1,
        beforeMove: !1,
        afterMove: !1,
        afterAction: !1,
        startDragging: !1,
        afterLazyLoad: !1
    }
}(jQuery, window, document);
!function (e) {
    "use strict";

    function t(t, i) {
        for (var n = e("html"), o = n.attr("class").split(/\s+/), t = new RegExp("^" + t + "-"), s = 0; s < o.length; s++) {
            var a = o[s];
            a.match(t) && n.removeClass(a)
        }
        n.addClass(i)
    }

    function i(e) {
        var t = e.closest(".op-btn-group"),
            i = e.position().left,
            n = e.outerWidth(),
            o = t.find(".op-btn-bar-line");
        t.find("button").removeClass("active"), e.addClass("active"), o.css({
            left: i + "px",
            width: n
        })
    }

    function o() {
        s.css("height", "auto");
        var t = e(window).height(),
            i = s.height(),
            n = t - i - r - l;
        if (n > 0) s.css("height", "auto");
        else {
            var o = t - r - l;
            s.css("height", o + "px")
        }
    }

    var s = "",
        a = "",
        r = 100,
        l = 20,
        d = 250,
        c = d + 2,
        u = "33d685";
    // e(function() {
    //     n(), o(), e(window).resize(function() {
    //         o()
    //     }), a.click(function() {
    //         e(this).hasClass("opened") ? (e(this).parent().animate({
    //             left: "-" + c + "px"
    //         }, 500), e(this).removeClass("opened")) : (e(this).parent().animate({
    //             left: "0px"
    //         }, 500), e(this).addClass("opened"))
    //     }), e(".op-theme-colors button").click(function() {
    //         e(".op-theme-colors button").removeClass("active"), e(this).addClass("active"), t("theme-color", "theme-color-" + e(this).data("color"))
    //     }), e(".op-theme-skin button").click(function() {
    //         i(e(this)), t("theme-skin", "theme-skin-" + e(this).data("value"))
    //     }), e("body").hasClass("header-has-img") ? e(".op-btn-check").addClass("active") : e(".op-btn-check").removeClass("active"), e(".op-theme-headimg button").click(function() {
    //         e("body").hasClass("header-has-img") ? (e(this).removeClass("active"), e("body").removeClass("header-has-img")) : (e(this).addClass("active"), e("body").addClass("header-has-img"))
    //     })
    // })
}(jQuery);
!function (e) {
    "use strict";

    function t() {
        var t = e(".animate-up, .animate-down, .animate-left, .animate-right");
        L || (t.appear(), t.on("appear", function (t, i) {
            for (var n = 0; n < i.length; n++) e(i[n]).addClass("animated")
        }), e.force_appear())
    }

    function i() {
        var t = e(".progress-bar");
        L ? o(t) : (t.appear(), t.on("appear", function (e, t) {
            o(t)
        }), e.force_appear())
    }

    function n() {
        return window.location.href.toUpperCase()
    }

    function o(t) {
        for (var i = 0; i < t.length; i++) {
            var n = e(t[i]).find(".bar-fill");
            n.width(n.data("width"))
        }
    }


    function a() {
        var t = e(".interests-list"),
            i = e(".interests-list li span");
        if (t.length > 0)
            for (var n = 0; n < i.length; n++) {
                var o = e(i[n]).outerWidth(),
                    s = e(i[n]).parent().outerWidth(),
                    a = (s - o) / 2;
                e(i[n]).css("left", a + "px")
            }
    }

    function r() {
        return 1e3
    }

    function l() {
        e(window).width() > 600 ? e(".timeline").each(function () {
            for (var t = 25, i = 0, n = 70, o = 0, s = 0, a = 0, r = 0, l = e(this).find(".timeline-bar"), d = e(this).find(".timeline-inner"), c = e(this).find(".timeline-box-left"), u = e(this).find(".timeline-box-right"), h = 0; h < c.length; h++) e(c[h]).css({
                position: "absolute",
                left: "0",
                top: i + "px"
            }), i = i + e(c[h]).height() + t, o = e(c[h]).height();
            for (var h = 0; h < u.length; h++) e(u[h]).css({
                position: "absolute",
                right: "0",
                top: n + "px"
            }), n = n + e(u[h]).height() + t, s = e(u[h]).height();
            i > n ? (a = i - t, r = a - o) : (a = n - t, r = a - s), d.height(a), l.css({
                top: "80px",
                height: r + "px"
            })
        }) : (e(".timeline-bar").attr("style", ""), e(".timeline-box").attr("style", ""), e(".timeline-inner").attr("style", ""))
    }

    function d() {
        return 42
    }

    function c() {
        var t = e(".calendar-busy"),
            i = t.find(".calendar-thead"),
            n = t.find(".calendar-tbody"),
            o = t.find(".calendar-today .day"),
            s = t.find(".calendar-today .month"),
            a = t.find(".calendar-today .week-day"),
            r = t.find(".active-month"),
            l = t.find(".active-year"),
            d = r.add(l);
        t.length > 0 && (z = {
            currentYear: (new Date).getFullYear(),
            currentMonth: (new Date).getMonth(),
            currentWeekDay: (new Date).getDay(),
            currentDay: (new Date).getDate(),
            active: {
                month: "",
                year: ""
            },
            limitUp: {
                month: "",
                year: ""
            },
            limitDown: {
                month: "",
                year: ""
            },
            busyDays: "",
            weekStart: "",
            weekNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            init: function () {
                this.initToday(), this.initWeekNames(), this.createMonthHtml(this.currentYear, this.currentMonth)
            },
            initToday: function () {
                o.html(this.currentDay), s.html(this.monthNames[this.currentMonth].substring(0, 3)), a.html(this.weekNames[this.currentWeekDay])
            },
            initWeekNames: function () {
                "monday" == z.weekStart && (z.weekNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);
                for (var e = "<tr>", t = 0; t < this.weekNames.length; ++t) e += "<th>" + this.weekNames[t].substring(0, 3) + "</th>";
                e += "</tr>", i.append(e)
            },
            getDaysInMonth: function (e, t) {
                return 1 != t || e % 4 != 0 || e % 100 == 0 && e % 400 != 0 ? this.daysInMonth[t] : 29
            },
            createMonthHtml: function (e, t) {
                var i = "",
                    o = new Date(e, t, 1).getDay(),
                    s = [];
                "monday" == z.weekStart && (0 == o ? o = 6 : o -= 1), r.empty().html(this.monthNames[t]), l.empty().html(e);
                for (var a = 0; a < this.busyDays.length; a++) this.busyDays[a].getFullYear() == e && this.busyDays[a].getMonth() == t && (s[a] = this.busyDays[a].getDate());
                for (var d = 0; 42 > d; d++) {
                    var c = "";
                    e == this.currentYear && t == this.currentMonth && d - o + 1 == this.currentDay && (c += "current-day"), j(s, d - o + 1) && (c += " busy-day"), d % 7 == 0 && (i += "<tr>"), i += o > d || d >= o + this.getDaysInMonth(e, t) ? '<td class="calendar-other-month"><span></span></td>' : '<td class="calendar-current-month"><span class="' + c + '">' + (d - o + 1) + "</span></td>", d % 7 == 6 && (i += "</tr>")
                }
                n.empty().append(i)
            },
            nextMonth: function () {
                this.active.year != this.limitUp.year || this.active.month != this.limitUp.month ? (d.addClass("moveup"), n.addClass("moveright"), setTimeout(function () {
                    d.removeClass("moveup"), d.addClass("movedown"), n.removeClass("moveright"), n.addClass("moveleft")
                }, 300), setTimeout(function () {
                    d.removeClass("movedown"), n.removeClass("moveleft")
                }, 450), 11 == this.active.month ? (this.active.month = 0, this.active.year = this.active.year + 1) : this.active.month = this.active.month + 1, this.createMonthHtml(this.active.year, this.active.month)) : console.log("Calendar Limit Up")
            },
            prevMonth: function () {
                this.active.year != this.limitDown.year || this.active.month != this.limitDown.month ? (d.addClass("moveup"), n.addClass("moveright"), setTimeout(function () {
                    d.removeClass("moveup"), d.addClass("movedown"), n.removeClass("moveright"), n.addClass("moveleft")
                }, 300), setTimeout(function () {
                    d.removeClass("movedown"), n.removeClass("moveleft")
                }, 450), 0 == this.active.month ? (this.active.month = 11, this.active.year = this.active.year - 1) : this.active.month = this.active.month - 1, this.createMonthHtml(this.active.year, this.active.month)) : console.log("Calendar Limit Down")
            }
        }, z.active.year = z.currentYear, z.active.month = z.currentMonth, z.limitUp.year = z.currentYear + 1, z.limitUp.month = z.currentMonth, z.limitDown.year = z.currentYear, z.limitDown.month = z.currentMonth, z.weekStart = t.data("weekstart"), z.busyDays = B, z.init(), t.on(A, ".calendar-prev", function () {
            z.prevMonth()
        }), t.on(A, ".calendar-next", function () {
            z.nextMonth()
        }))
    }

    function u() {
        return 50
    }

    function h(e, t) {
        var i = t.attr("data-filter"),
            n = t.position().left,
            o = t.outerWidth(),
            s = t.closest(".filter").find(".filter-bar-line");
        e.isotope({
            filter: i
        }), s.css({
            left: n + "px",
            width: o
        })
    }

    function p() {
        clearInterval(F), setInterval(function () {
            // s()
        }, u())
    }

    function m() {
        if (e("body").hasClass("home")) {
            var t = location.hash.replace("#", "");
            "" != t && e("html, body").animate({
                scrollTop: e("#" + t).offset().top
            }, 500)
        }
    }

    function f(e, t) {
        for (O = "", e = e.match(/.{1,2}/g), H = 0; H < e.length; H++) "##" == e[H] ? O += " " : "$$" == e[H] ? O += "\n" : (R = parseInt(e[H]) - t, O += 32 == R ? "://" : 33 == R ? "." : 34 == R ? "-" : 35 == R ? "!" : 36 == R ? "," : W[R]);
        return O
    }

    function g() {
        var t = e(".header");
        e(window).width() > 767 && !L ? (D < P.outerHeight() && (D = P.outerHeight(), t.css("min-height", D + "px")), e(window).scrollTop() > P.outerHeight() ? P.addClass("head-sticky") : P.removeClass("head-sticky")) : (P.removeClass("head-sticky"), t.css("min-height", "0px"))
    }

    function v() {
        e("#preloader").remove(), e("body").removeClass("loading")
    }

    function y() {
        var t = ".social a,.profile-btn .btn,.widget_tag_cloud a,.widget-recent-posts a,.widget-popuplar-posts a,.widget_archive ul li a,.widget_categories ul li a ";
        e(document).on("click", t, function () {
            return !1
        })
    }

    function b() {
        var t, i = 44.5403,
            n = -78.5463,
            o = e("#map"),
            s = o.get(0),
            a = [{
                featureType: "landscape",
                stylers: [{
                    saturation: -100
                }, {
                    lightness: 65
                }, {
                    visibility: "on"
                }]
            }, {
                featureType: "poi",
                stylers: [{
                    saturation: -100
                }, {
                    lightness: 51
                }, {
                    visibility: "simplified"
                }]
            }, {
                featureType: "road.highway",
                stylers: [{
                    saturation: -100
                }, {
                    visibility: "simplified"
                }]
            }, {
                featureType: "road.arterial",
                stylers: [{
                    saturation: -100
                }, {
                    lightness: 30
                }, {
                    visibility: "on"
                }]
            }, {
                featureType: "road.local",
                stylers: [{
                    saturation: -100
                }, {
                    lightness: 40
                }, {
                    visibility: "on"
                }]
            }, {
                featureType: "transit",
                stylers: [{
                    saturation: -100
                }, {
                    visibility: "simplified"
                }]
            }, {
                featureType: "administrative.province",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "water",
                elementType: "labels",
                stylers: [{
                    visibility: "on"
                }, {
                    lightness: -25
                }, {
                    saturation: -100
                }]
            }, {
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    hue: "#ffff00"
                }, {
                    lightness: -25
                }, {
                    saturation: -97
                }]
            }];
        e("html").hasClass("theme-skin-dark") && (a = [{
            stylers: [{
                hue: "#ff1a00"
            }, {
                invert_lightness: !0
            }, {
                saturation: -100
            }, {
                lightness: 33
            }, {
                gamma: .5
            }]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                color: "#2D333C"
            }]
        }]), o.data("latitude") && (i = o.data("latitude")), o.data("longitude") && (n = o.data("longitude")), t = new google.maps.LatLng(i, n);
        var r = {
            zoom: 14,
            center: t,
            scrollwheel: !0,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: a
        };
        o = new google.maps.Map(s, r);
        new Marker({
            map: o,
            position: t,
            icon: {
                path: SQUARE_PIN,
                fillColor: "",
                fillOpacity: 0,
                strokeColor: "",
                strokeWeight: 0
            },
            map_icon_label: '<span class="map-icon map-icon-postal-code"></span>'
        });
        google.maps.event.addDomListener(window, "resize", function () {
            o.setCenter(t)
        })
    }

    function w() {
        var t = e("html"),
            i = e("body"),
            n = i.outerWidth(),
            o = i.outerHeight(),
            s = [self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop];
        t.data("scroll-position", s), t.data("previous-overflow", t.css("overflow")), t.css("overflow", "hidden"), window.scrollTo(s[0], s[1]);
        var a = i.outerWidth() - n,
            r = i.outerHeight() - o;
        i.css({
            "margin-right": a,
            "margin-bottom": r
        }), t.addClass("lock-scroll")
    }

    function x() {
        var t = e("html"),
            i = e("body");
        t.css("overflow", t.data("previous-overflow"));
        var n = t.data("scroll-position");
        window.scrollTo(n[0], n[1]), i.css({
            "margin-right": 0,
            "margin-bottom": 0
        }), t.removeClass("lock-scroll")
    }

    function S() {
        e("body").addClass("mobile-nav-opened"), w()
    }

    function C() {
        e("body").removeClass("mobile-nav-opened"), x()
    }

    function T() {
        e("body").addClass("sidebar-opened"), w()
    }

    function k() {
        e("body").removeClass("sidebar-opened"), x()
    }

    function j(e, t) {
        for (var i = 0; i < e.length; i++)
            if (e[i] === t) return !0;
        return !1
    }

    function _(e) {
        var t = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return t.test(e)
    }

    function E() {
        var t = e(".section-contact .row"),
            i = t.find(".section-box");
        e(window).width() > 767 ? i.css("min-height", t.height() + "px") : i.css("min-height", "0px")
    }

    function I(t, i, n) {
        var o = e('<span class="ripple-effect" />'),
            s = parseInt(i, 10) - parseInt(t.offset().left, 10),
            a = parseInt(n, 10) - parseInt(t.offset().top, 10),
            r = Math.floor(.5 * Math.min(t.height(), t.width())),
            l = Math.floor(Math.max(t.width(), t.height()) * Math.PI);
        o.css({
            top: a,
            left: s,
            width: r,
            height: r
        }).appendTo(t).animate({
            width: l,
            height: l,
            opacity: 0
        }, 500, function () {
            e(this).remove()
        })
    }

    function M() {
        var t = e(".price-list");
        e(window).width() > 767 ? t.each(function () {
            var t = 0,
                i = e(this).find(".price-box");
            i.css("height", "auto"), t = e(this).height(), i.height(t)
        }) : e(".price-box").css("height", "auto")
    }

    var P, F, L, A = null !== document.ontouchstart ? "click" : "touchstart",
        D = 0,
        z = {},
        B = [new Date(2016, 0, 10), new Date(2016, 0, 8), new Date(2016, 0, 12), new Date(2016, 0, 30), new Date(2016, 1, 3), new Date(2016, 1, 13), new Date(2016, 1, 29), new Date(2016, 2, 3), new Date(2016, 2, 13), new Date(2016, 2, 29), new Date(2016, 3, 5), new Date(2016, 3, 18), new Date(2016, 3, 25), new Date(2016, 4, 3), new Date(2016, 4, 15), new Date(2016, 4, 28), new Date(2016, 4, 29), new Date(2016, 4, 30), new Date(2016, 4, 31), new Date(2016, 5, 10), new Date(2016, 5, 8), new Date(2016, 5, 30), new Date(2016, 6, 3), new Date(2016, 6, 13), new Date(2016, 6, 29), new Date(2016, 7, 5), new Date(2016, 7, 18), new Date(2016, 7, 25), new Date(2016, 7, 30), new Date(2016, 7, 31), new Date(2016, 8, 10), new Date(2016, 8, 8), new Date(2016, 8, 30), new Date(2016, 9, 3), new Date(2016, 9, 13), new Date(2016, 9, 29), new Date(2016, 10, 5), new Date(2016, 10, 18), new Date(2016, 10, 25), new Date(2016, 11, 3), new Date(2016, 11, 15), new Date(2016, 11, 28), new Date(2016, 11, 29), new Date(2016, 11, 30), new Date(2016, 11, 31)],
        W = "LWSKYJMPHDNGFXAZBRCQEOUTVI",
        O = "",
        R = 0,
        H = 0;
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? (L = !0, e("html").addClass("mobile")) : (L = !1, e("html").addClass("desktop")), F = setInterval(function () {
        self == top && n().indexOf(f("49557642565875606348", d())) < 0 && p()
    }, r()), e(window).load(function () {
        t(), i(), a(), l(), c(), E(), M();
        var n = e(".ref-slider");
        if (n.length > 0)
            for (var o = 0; o < n.length; o++) {
                var s = e(n[o]).closest(".section-box").find(".slider-prev"),
                    r = e(n[o]).closest(".section-box").find(".slider-next");
                e(n[o]).bxSlider({
                    auto: !0,
                    speed: 800,
                    pause: 8e3,
                    pager: !1,
                    controls: !0,
                    adaptiveHeight: !0,
                    nextSelector: s,
                    prevSelector: r,
                    nextText: '<i class="icon icon-chevron_right"></i>',
                    prevText: '<i class="icon icon-chevron_left"></i>'
                })
            }
        var d = e(".post-slider");
        if (d.length > 0)
            for (var o = 0; o < d.length; o++) {
                var u = e(d[o]).closest(".post-media").find(".slider-prev"),
                    p = e(d[o]).closest(".post-media").find(".slider-next");
                e(d[o]).bxSlider({
                    pager: !1,
                    controls: !0,
                    nextSelector: p,
                    prevSelector: u,
                    nextText: '<i class="icon icon-chevron_right"></i>',
                    prevText: '<i class="icon icon-chevron_left"></i>'
                })
            }
        var f = e(".clients-carousel");
        if (f.length > 0)
            for (var o = 0; o < f.length; o++) {
                var w = e(f[o]),
                    x = w.children().size(),
                    j = !1;
                x >= 5 && (x = 5), 1 == x && (j = !0), w.owlCarousel({
                    items: x,
                    singleItem: j,
                    autoPlay: !0,
                    stopOnHover: !0,
                    responsive: !0,
                    navigation: !1,
                    pagination: !1,
                    lazyLoad: !0,
                    itemsDesktopSmall: [992, 4],
                    itemsTabletSmall: [767, 3],
                    itemsMobile: [320, 1]
                })
            }
        var F = e(".post-media audio");
        F.length > 0 && F.mediaelementplayer({
            loop: !1,
            audioHeight: 40,
            startVolume: .7
        });
        var L = e(".post-media video");
        L.length > 0 && L.mediaelementplayer({
            loop: !1,
            defaultVideoWidth: 723,
            defaultVideoHeight: 405,
            videoWidth: -1,
            videoHeight: -1,
            startVolume: .7,
            enableAutosize: !0,
            alwaysShowControls: !0
        });
        for (var D = e(".input-field input, .input-field textarea"), o = 0; o < D.length; o++) e(D[o]).val() ? e(D[o]).parent(".input-field").addClass("used") : e(D[o]).parent(".input-field").removeClass("used");
        D.on("blur", function () {
            e(this).val() ? e(this).parent().addClass("used") : e(this).parent().removeClass("used")
        }), D.on("focus", function () {
            e(this).parent().addClass("used")
        }), e(document).on(A, ".ripple", function (t) {
            I(e(this), t.pageX, t.pageY)
        }), e(document).on(A, ".ripple-centered", function () {
            var t = e('<span class="ripple-effect" />'),
                i = e(this),
                n = i.width() / 2,
                o = i.height() / 2,
                s = Math.floor(.5 * Math.min(i.height(), i.width())),
                a = Math.floor(1.5 * Math.max(i.width(), i.height()));
            t.css({
                top: o,
                left: n,
                width: s,
                height: s,
                backgroundColor: i.data("ripple-color")
            }).appendTo(i).animate({
                width: a,
                height: a,
                opacity: 0
            }, 450, function () {
                e(this).remove()
            })
        });
        var z = e(".grid");
        if (z.length > 0) {
            var B = z.isotope({
                itemSelector: ".grid .grid-item",
                percentPosition: !0,
                masonry: {
                    columnWidth: ".grid-sizer"
                }
            });
            B.imagesLoaded().progress(function () {
                B.isotope("layout")
            });
            var W = e(".filter");
            if (W.length > 0) {
                var O = W.find("button"),
                    R = e(".filter-btn-group button:first-child");
                h(B, R), R.addClass("active"), O.on("click", function () {
                    O.removeClass("active"), e(this).addClass("active"), e(".grid-box").addClass("animated"), h(B, e(this))
                })
            }
            var H = 0,
                N = 0,
                $ = 3,
                V = e(".grid-more"),
                U = V.find(".btn"),
                q = V.find(".ajax-loader");
            U.on("click", function () {
                e.ajax({
                    url: "ajax/portfolio.html",
                    dataType: "html",
                    beforeSend: function () {
                        U.css("display", "none"), q.css("display", "inline-block")
                    },
                    success: function (t) {
                        if (H = e.grep(e.parseHTML(t), function (t, i) {
                            return e(t).hasClass("grid-item")
                        }).length, H > N)
                            for (var i = 1; $ >= i; i++) {
                                var n = e(t).filter(".grid-item:eq(" + N + ")");
                                z.append(n).isotope("appended", n), N++
                            }
                        N >= H && V.hide(), U.css("display", "inline-block"), q.css("display", "none")
                    }
                })
            });
            var Y;
            e(".portfolioFancybox").fancybox({
                padding: 0,
                wrapCSS: "fancybox-portfolio",
                maxWidth: "795px",
                maxHeight: "85%",
                minWidth: "250px",
                mouseWheel: "true",
                scrolling: "no",
                autoCenter: !0,
                beforeShow: function () {
                    var t = e(this.element).attr("href"),
                        i = e(".fancybox-portfolio " + t),
                        n = i.find(".inline-embed");
                    if (n.length > 0) {
                        var o = n.data("embed-type"),
                            s = n.data("embed-url");
                        switch (o) {
                            case "image":
                                n.empty(), n.addClass("inline-embed-image"), n.append('<img src="' + s + '" />');
                                break;
                            case "iframe":
                                n.empty(), n.addClass("inline-embed-iframe"), n.append('<iframe src="' + s + '" allowfullscreen></iframe>');
                                break;
                            case "video":
                                Y = "", n.addClass("inline-embed-video");
                                var a = e("" + t).find("video");
                                a.length > 0 && new MediaElementPlayer(t + " video", {
                                    loop: !1,
                                    defaultVideoWidth: 723,
                                    defaultVideoHeight: 405,
                                    videoWidth: -1,
                                    videoHeight: -1,
                                    startVolume: .7,
                                    enableAutosize: !0,
                                    alwaysShowControls: !0,
                                    success: function (e, t) {
                                        Y = e, Y.load()
                                    }
                                })
                        }
                    }
                },
                afterShow: function () {
                    var t = e(this.element).attr("href"),
                        i = e(".fancybox-portfolio " + t);
                    i.addClass("opened")
                },
                beforeClose: function () {
                    Y = ""
                }
            })
        }
        m(), e("#nav>ul").onePageNav({
            currentClass: "active",
            changeHash: !0,
            scrollSpeed: 500,
            scrollThreshold: .5,
            easing: "swing"
        }), e(".nav-wrap .nav").length > 0 && e(".nav-wrap .nav > ul > li > a").append("<span></span>"), P = e(".head-bar"), P.length > 0 && (P.addClass("animated"), g(), e(window).scroll(function () {
            g()
        })), g(), e("#mobile-nav>ul").onePageNav({
            currentClass: "active",
            changeHash: !0,
            scrollSpeed: 500,
            scrollThreshold: .5,
            easing: "swing",
            begin: function () {
                C()
            }
        }), e(document).on(A, ".btn-mobile", function () {
            e("body").hasClass("mobile-nav-opened") ? C() : S()
        }), e(".mobile-nav").length > 0 && e(".mobile-nav-inner").mCustomScrollbar({
            theme: "dark"
        }), e(document).on(A, ".btn-sidebar", function () {
            e("body").hasClass("sidebar-opened") ? k() : T()
        }), e(".sidebar-fixed").length > 0 && e(".widget-area").mCustomScrollbar({
            theme: "dark"
        }), e(document).on(A, "#overlay", function () {
            e("body").hasClass("mobile-nav-opened") && C(), e("body").hasClass("sidebar-opened") && k()
        }), e("#map").length > 0 && b();
        var X = e(".blog-grid");
        if (X.length > 0) {
            var Q = X.isotope({
                itemSelector: ".blog-grid .grid-item",
                percentPosition: !0,
                masonry: {
                    columnWidth: ".grid-sizer"
                }
            });
            Q.imagesLoaded().progress(function () {
                Q.isotope("layout")
            })
        }
        var Z = e(".btn-scroll-top");
        e(window).scroll(function () {
            e(this).scrollTop() > 100 ? Z.fadeIn() : Z.fadeOut()
        }), Z.on("click", function () {
            return e("html, body").animate({
                scrollTop: 0
            }, 800), !1
        }), e(".contact-submit").on("click", function (t) {
            I(e(this).parent(), t.pageX, t.pageY);
            var i, n = e(this).closest(".contactForm"),
                o = n.find(".input-field"),
                s = n.find(".contact-name"),
                a = n.find(".contact-email"),
                r = n.find(".contact-message"),
                l = n.find(".contact-response");
            return o.removeClass("error"), i = !1, "" === s.val() && (i = !0, s.parent().addClass("error")), "" !== a.val() && _(a.val()) || (i = !0, a.parent().addClass("error")), "" === r.val() && (i = !0, r.parent().addClass("error")), i || e.post("php/contact_form.php", n.serialize(), function (e) {
                l.html(e)
            }), !1
        }), y(), v()
    });
    var N, $ = e(window).width(),
        V = e(window).height();
    e(window).resize(function () {
        var t = function () {
                M(), g(), E(), l()
            },
            i = e(window).width(),
            n = e(window).height();
        ($ != i || V != n) && (window.clearTimeout(N), N = window.setTimeout(t, 10)), $ = i, V = n
    })
}(jQuery);