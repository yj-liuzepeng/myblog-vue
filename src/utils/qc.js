var QC = (function () {
  function o() {}
  var a =
      window.ActiveXObject && ~~navigator.userAgent.match(/MSIE\s+(\d+)/)[1],
    t =
      ((e._reg = /\{(\w+)\}/g),
      {
        str2dom: function (t) {
          var n = [],
            e = (arguments.callee._temp =
              arguments.callee._temp || document.createElement("div"));
          for (e.innerHTML = t; e.firstChild; )
            n.push(e.removeChild(e.firstChild));
          return 1 < n.length
            ? (function () {
                for (
                  var t = document.createDocumentFragment(), e = 0;
                  e < n.length;
                  e++
                )
                  t.appendChild(n[e]);
                return t;
              })()
            : n[0];
        },
        format: e,
        extend: function (t, e) {
          var n = o;
          return (
            (n.prototype = e.prototype),
            (t.prototype = new n()),
            (t.constructor = t)
          );
        },
      });
  function e(t, n) {
    return t.replace(arguments.callee._reg, function (t, e) {
      return null !== n[e] ? n[e] : e;
    });
  }
  var r,
    s,
    n =
      ((r =
        /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g),
      (s = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      }),
      {
        stringify: window.JSON && JSON.stringify ? JSON.stringify : c,
        parse: function (e) {
          e = e || "{}";
          var t = {};
          try {
            t = new Function("return (" + e + ")")();
          } catch (t) {
            w.error("JSON.parse => parse数据格式错误:" + e);
          }
          return t;
        },
      });
  function c(t) {
    var e,
      n,
      o = [],
      i = "";
    for (e in t) {
      switch (typeof (i = void 0 !== (i = t[e]) ? i : "")) {
        case "string":
          (n = i),
            (r.lastIndex = 0),
            (i = r.test(n)
              ? '"' +
                n.replace(r, function (t) {
                  var e = s[t];
                  return "string" == typeof e
                    ? e
                    : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
                }) +
                '"'
              : '"' + n + '"');
          break;
        case "object":
          i = c(i);
          break;
        case "function":
          continue;
      }
      o.push('"' + e + '":' + i);
    }
    return "{" + o + "}";
  }
  var d,
    i,
    p,
    u,
    l,
    h,
    f,
    m = (function () {
      document.implementation.hasFeature("XPath", "3.0") &&
        ((XMLDocument.prototype.selectNodes = function (t, e) {
          e = e || this;
          for (
            var n = this.createNSResolver(this.documentElement),
              o = this.evaluate(
                t,
                e,
                n,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null
              ),
              i = [],
              r = 0;
            r < o.snapshotLength;
            r++
          )
            i[r] = o.snapshotItem(r);
          return i;
        }),
        (Element.prototype.selectNodes = function (t) {
          if (this.ownerDocument.selectNodes)
            return this.ownerDocument.selectNodes(t, this);
          throw "For XML Elements Only";
        }));
      return {
        stringify: function (t) {
          return t.xml || new XMLSerializer().serializeToString(t);
        },
        parse: function (t) {
          var e = a
            ? new ActiveXObject("Microsoft.XMLDOM")
            : document.implementation.createDocument("text/xml", "", null);
          if (a) return e.loadXML(t) ? e : null;
          try {
            for (var n = e.childNodes, o = n.length - 1; 0 <= o; o--)
              e.removeChild(n[o]);
            var i = new DOMParser().parseFromString(t, "text/xml"),
              r = e.importNode(i.documentElement, !0);
            return e.appendChild(r), e;
          } catch (t) {
            return null;
          }
        },
      };
    })(),
    g = {
      extend: function () {
        var t,
          e,
          n,
          o = arguments,
          i = arguments.length,
          r = !1,
          a = 1,
          s = o[0];
        for (
          "boolean" == typeof s && ((r = s), (s = arguments[1] || {}), (a = 2)),
            "object" != typeof s && "function" != typeof s && (s = {}),
            i === a && ((s = {}), --a);
          a < i;
          a++
        )
          if (null != (t = arguments[a]))
            for (var c in t)
              (e = s[c]),
                s !== (n = t[c]) &&
                  (r && n && "object" == typeof n && !n.nodeType
                    ? ((e =
                        e ||
                        (n instanceof Array
                          ? []
                          : "object" == typeof n
                          ? {}
                          : n)),
                      (s[c] = object.extend(r, e, n)))
                    : void 0 !== n && (s[c] = n));
        return s;
      },
    },
    _ =
      ((d = /"/g),
      (i = {
        genHttpParamString: function (t) {
          return this.commonDictionaryJoin(
            t,
            null,
            null,
            null,
            window.encodeURIComponent
          );
        },
        splitHttpParamString: function (t) {
          return this.commonDictionarySplit(
            t,
            null,
            null,
            null,
            window.decodeURIComponent
          );
        },
        commonDictionarySplit: function (t, e, n, o, i) {
          var r,
            a,
            s,
            c = {};
          if (!t || "string" != typeof t) return c;
          if (
            ("string" != typeof n && (n = ""),
            "string" != typeof o && (o = "="),
            (r = t.split((e = "string" != typeof e ? "&" : e))) && r.length)
          )
            for (var d = 0, p = r.length; d < p; ++d)
              1 < (a = r[d].split(o)).length
                ? ((s = (s = a.slice(1).join(o).split(n))
                    .slice(n.length, s.length - n.length)
                    .join(n)),
                  (c[a[0]] = "function" == typeof i ? i(s) : s))
                : a[0] && (c[a[0]] = !0);
          return c;
        },
        commonDictionaryJoin: function (t, e, n, o, i) {
          var r,
            a,
            s = [];
          if (!t || "object" != typeof t) return "";
          if ("string" == typeof t) return t;
          for (a in ("string" != typeof e && (e = "&"),
          "string" != typeof n && (n = ""),
          "string" != typeof o && (o = "="),
          t))
            (r = (t[a] + "").replace(d, '\\"')),
              s.push(a + o + n + ("function" == typeof i ? i(r) : r) + n);
          return s.join(e);
        },
      }),
      {
        stringify: function (t) {
          return i.genHttpParamString(t);
        },
        parse: function (t) {
          return i.splitHttpParamString(t);
        },
        getParameter: function (t) {
          (t = new RegExp("(\\?|#|&)" + t + "=([^&#]*)(&|#|$)")),
            (t = location.href.match(t));
          return decodeURIComponent(t ? t[2] : "");
        },
      }),
    y =
      ((p = [
        /&(?!amp;|lt;|gt;|#039;|quot;|#39;)/g,
        /</g,
        />/g,
        /\x27/g,
        /\x22/g,
      ]),
      (u = ["&amp;", "&lt;", "&gt;", "&#039;", "&quot;"]),
      {
        escHTML: function (t) {
          for (var e = t, n = 0, o = p.length; n < o; n++)
            e = e.replace(p[n], u[n]);
          return e;
        },
        format: t.format,
      }),
    v =
      ((l = document.domain || ""),
      {
        set: function (t, e, n, o, i) {
          var r;
          return (
            i && (r = new Date()).setTime(r.getTime() + 36e5 * i),
            (document.cookie =
              t +
              "=" +
              e +
              "; " +
              (i ? "expires=" + r.toGMTString() + "; " : "") +
              (o ? "path=" + o + "; " : "path=/; ") +
              (n ? "domain=" + n + ";" : "domain=" + l + ";")),
            !0
          );
        },
        get: function (t) {
          (t = new RegExp("(?:^|;+|\\s+)" + t + "=([^;]*)")),
            (t = document.cookie.match(t));
          return t ? t[1] : "";
        },
        del: function (t, e, n) {
          document.cookie =
            t +
            "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " +
            (n ? "path=" + n + "; " : "path=/; ") +
            (e ? "domain=" + e + ";" : "domain=" + l + ";");
        },
      }),
    w =
      ((f = (h = { log: 3, info: 2, warn: 1, error: 0 }).info),
      {
        log: C("log"),
        info: C("info"),
        warn: C("warn"),
        error: C("error"),
        setLevel: function (t) {
          return (f = h[t] || f);
        },
      });
  function C(e) {
    return function (t) {
      window.console &&
        console[e] &&
        ~~(f || h.info) >= h[e] &&
        console[e](" :: [QQConnect] > " + t);
    };
  }
  var q,
    q =
      ((k.list = []),
      (k.fired = !1),
      q ||
        ((q = !0),
        document.addEventListener
          ? document.addEventListener(
              "DOMContentLoaded",
              function () {
                document.removeEventListener(
                  "DOMContentLoaded",
                  arguments.callee,
                  !1
                ),
                  k();
              },
              !1
            )
          : document.attachEvent &&
            (document.attachEvent("onreadystatechange", function () {
              ("complete" !== document.readyState &&
                "loaded" !== document.readyState) ||
                (document.detachEvent("onreadystatechange", arguments.callee),
                k());
            }),
            document.documentElement.doScroll &&
              (function () {
                try {
                  document.documentElement.doScroll("left"),
                    document.body.appendChild;
                } catch (t) {
                  return k.fired || setTimeout(arguments.callee, 0);
                }
                k();
              })())),
      {
        domReady: function (t) {
          "function" == typeof t &&
            (k.fired ||
            "complete" === document.readyState ||
            "loaded" === document.readyState
              ? (k(), t())
              : k.list.push(t));
        },
        add: function (t, e, n) {
          t &&
            e &&
            n &&
            (t && t.addEventListener
              ? t.addEventListener(e, n, !1)
              : t.attachEvent("on" + e, n));
        },
        remove: function (t, e, n) {
          t &&
            e &&
            n &&
            (t && t.removeEventListener
              ? t.removeEventListener(e, n, !1)
              : t.detachEvent("on" + e, n));
        },
      });
  function k() {
    var t;
    for (k.fired = !0; (t = k.list.shift()); ) t();
  }
  function x(t, e, n) {
    setTimeout(function () {
      x.send(t, e, n);
    }, 0);
  }
  x.send = function (t, e, n) {};
  function b(t, e, n, o) {
    setTimeout(function () {
      b.send(t, e, n, o);
    }, 0);
  }
  b.send = function () {};
  return {
    Like: { _insertButton: o },
    Share: {},
    Toolkit: t,
    JSON: n,
    XML: m,
    Object: g,
    QueryString: _,
    String: y,
    Cookie: v,
    Console: w,
    Event: q,
    pv: x,
    valueStat: b,
    reportBNL: function (t, e) {},
    getVersion: function () {
      return "1.0.1";
    },
  };
})();
!(function (g) {
  function _(t) {
    return "string" == typeof t ? document.getElementById(t) : t;
  }
  function t(t) {
    return e && ((e.dataset && e.dataset[t]) || e.getAttribute("data-" + t));
  }
  var e,
    n,
    o = QC.getVersion();
  ~~g.QueryString.getParameter("__qc_wId") ||
    ~~g.Cookie.get("__qc_wId") ||
    ((n = +new Date() % 1e3),
    (document.cookie = ["__qc_wId=" + n, "; path=/"].join(";")));
  for (
    var i,
      r = /qc_jssdk/i,
      a = document.getElementsByTagName("script"),
      s = 0,
      c = a.length;
    s < c;
    s++
  )
    if (((i = a[s]).src || "").match(r)) {
      e = i;
      break;
    }
  var y = g.Toolkit,
    v = g.JSON,
    w = (g.XML, g.Object),
    C = (g.QueryString, g.String, g.Cookie),
    q = g.Console,
    k = function () {},
    x = window.ActiveXObject && ~~navigator.userAgent.match(/MSIE\s+(\d+)/)[1],
    d = {
      PMCrossPage: "https://graph.qq.com/jsdkproxy/PMProxy.html#" + o,
      FLACrossPage: "https://graph.qq.com/jsdkproxy/FLAProxy.swf",
      getCrossSolution: function () {
        var t = window.postMessage
          ? "PMProxy"
          : (window.ActiveXObject &&
              (function () {
                var e = !0;
                try {
                  new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                } catch (t) {
                  e = !1;
                }
                return e;
              })()) ||
            (navigator.plugins && navigator.plugins["Shockwave Flash"])
          ? "FLAProxy"
          : (g.Console.error("未找到可用的跨域通信方案"), "EMPProxy");
        return g.Console.info("确定跨域代理策略：" + t), t;
      },
    },
    p = 1e3;
  g.getConfig = function () {
    return d;
  };
  function u(t, e, n, o) {
    (this.uri = t),
      (this.paras = e || {}),
      (this.fmt = n || "json"),
      (this.method = (o || "get").toLocaleLowerCase()),
      (this.successPool = []),
      (this.errorPool = []),
      (this.completePool = []),
      (this.seq = p++);
  }
  (u.prototype.success = function (t) {
    return this.successPool.push(t), this;
  }),
    (u.prototype.error = function (t) {
      return this.errorPool.push(t), this;
    }),
    (u.prototype.complete = function (t) {
      return this.completePool.push(t), this;
    }),
    (u.prototype.send = k),
    (u.prototype._onCallback = function (t, e, n) {
      var o;
      200 == t.status || 204 == t.status
        ? ((o = t.responseText),
          ~~(o = new l(o, t.status, e, n)).code
            ? this.onError(o)
            : this.onSuccess(o))
        : this.onError(new l("", t.status, e, n));
    }),
    (u.prototype.onSuccess = function (t) {
      for (var e = this.successPool, n = 0; n < e.length; n++) e[n](t);
      this.onComplete(t);
    }),
    (u.prototype.onError = function (t) {
      for (var e = this.errorPool, n = 0; n < e.length; n++) e[n](t);
      this.onComplete(t);
    }),
    (u.prototype.onComplete = function (t) {
      for (var e = this.completePool, n = 0; n < e.length; n++) e[n](t);
    });
  var l = function (t, e, n, o) {
    (this.status = e || -1),
      (this.fmt = n || "json"),
      (this.code = this.ret = -1),
      (this.data = null),
      (this.seq = o || -1),
      this.parseData(t),
      this.code && l[this.code] && l[this.code](this.data, this.dataText);
  };
  (l.prototype.parseData = function (t) {
    var e;
    (this.dataText = t),
      "xml" === this.fmt
        ? ((this.data = g.XML.parse(t || "<root></root>")),
          (e = this.data.selectNodes("//ret")[0]),
          (this.code = this.ret = (e && e.firstChild.nodeValue) || -1))
        : ((this.data = g.JSON.parse(t || "{}")),
          (this.code = this.ret =
            void 0 !== this.data.ret
              ? ~~this.data.ret
              : this.data.data && void 0 !== this.data.data.ret
              ? ~~this.data.data.ret
              : -1));
  }),
    (l.prototype.stringifyData = function () {
      return this.dataText;
    }),
    (l[100013] = function (t, e) {
      g.Login.signOut(), g.Console.warn("api返回token失效");
    });
  var h = g.Toolkit.extend(function () {
    u.apply(this, arguments), (this.xhr = h.createInstance());
  }, u);
  g.Object.extend(h.prototype, {
    send: function () {
      var t = this.xhr,
        e = this.method,
        n = this.fmt,
        o = this,
        i = g.QueryString.stringify(o.paras),
        r =
          "post" == e
            ? this.uri
            : this.uri.indexOf("?") < 0
            ? this.uri + "?" + i
            : this.uri.replace(/[&?]*/g, "") + "&" + i;
      t.open(e, r, !!this.async);
      try {
        t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
          t.setRequestHeader("X-Requested-From", "_TC_QC_jsProxy_");
      } catch (t) {}
      (t.onreadystatechange = function () {
        4 === t.readyState && o._onCallback(t, n, o.seq);
      }),
        t.send(i || null);
    },
  }),
    (h.createInstance = window.XMLHttpRequest
      ? function () {
          return new window.XMLHttpRequest();
        }
      : function () {
          return new window.ActiveXObject("Microsoft.XMLHTTP");
        });
  function f() {
    (this.requests = []),
      (this.invokes = []),
      (this.readyPool = []),
      (this.isReady = !1),
      (this.timeStamp = +new Date()),
      this.init();
  }
  var m, b;
  (f.prototype.init = k),
    (f.prototype.ready = function (t) {
      this.readyPool.push(t);
    }),
    (f.prototype.onReady = function () {
      this.isReady = !0;
      for (var t = this.readyPool, e = 0; e < t.length; e++) t[e]();
    }),
    (f.prototype.send = function (t) {
      var e;
      for (
        t && this.requests.push(t);
        this.isReady && (e = this.requests.shift());

      )
        f.pendingRequests.push(e),
          QC.Console.log("seq no :" + e.seq + "请求发起  ts -> " + +new Date()),
          this._doSend(e);
    }),
    (f.prototype._doSend = function (t) {}),
    (f.prototype._preDispatch = function (t, e, n, o) {
      var i = (e.data || (e.currentTarget && e.currentTarget.data) || {}).split(
        "@@@"
      );
      "invoke" === i[0] ? this.invoke(i[1]) : this.dispatch(i[1] || e, n, o);
    }),
    (f.prototype.invoke = function (t) {
      var e;
      for (
        t && this.invokes.push(t);
        this.isReady && (e = this.invokes.shift());

      )
        this._doInvoke(e);
    }),
    (f.prototype._doInvoke = function (t) {}),
    (f.prototype.dispose = function () {
      (b = null), this.onDispose();
    }),
    (f.prototype.onDispose = function () {}),
    (f.pendingRequests = []),
    (f.dispatchReceive = function (t, e, n, o) {
      for (var i = f.pendingRequests, r = 0; r < i.length; r++)
        if (i[r].seq == t)
          return (
            QC.Console.log("seq no :" + t + "响应收到  ts -> " + +new Date()),
            i[r]._onCallback({ status: n, responseText: e }, o, t),
            void i.splice(r, 1)
          );
    }),
    (f.invoke =
      ((m = []),
      function (t) {
        if ((t && m.push(t), !b))
          return (
            g.Console.info("Proxy未初始化，invoke入栈"), void f.generateProxy()
          );
        for (var e; (e = m.shift()); ) b._doInvoke(e);
      })),
    (f.generateProxy = function (t) {
      var e = { PMProxy: S, FLAProxy: I, EMPProxy: E };
      return t ? new e[t]() : (b = b || new e[d.getCrossSolution()]());
    }),
    (f.getFunction = function (t) {
      var e;
      t = t.split(".");
      for (var n = 0; n < t.length; n++) e = (e || window)[t[n]];
      return e;
    }),
    (g._create_fla_proxy = function () {
      (g._create_fla_proxy = k),
        document._qc_cross_request_flash_proxy ||
          _("_qc_cross_request_flash_proxy") ||
          new I();
    });
  var I = g.Toolkit.extend(function () {
    f.apply(this, arguments);
  }, f);
  g.Object.extend(I.prototype, {
    prefix: "_TC_QC_flaProxy_",
    init: function () {
      var t,
        e,
        o = this,
        n =
          ((t = window.name.match(/oauth2Login_(\d+)/)),
          (e = ~~g.Cookie.get("__qc_wId")),
          t && t[1]
            ? (n = t[1])
            : window._b_is_qc_cb_win
            ? (n = 1e4 + e)
            : ((n = e),
              (document.cookie = ["__qc_wId=" + n, "; path=/"].join(";"))),
          g.Console.info("跨域窗口标识号 __qc_wId : " + n),
          n),
        n = I.getFlashHtml({
          src: d.FLACrossPage,
          width: "100%",
          height: "100%",
          allowScriptAccess: "always",
          id: "_qc_cross_request_flash_proxy",
          name: "_qc_cross_request_flash_proxy",
          flashVars:
            "suffix=" +
            this.timeStamp +
            "&conId=" +
            n +
            "&conId_receive=" +
            (n < 1e4 ? n + 1e4 : n - 1e4),
        }),
        i = (this.cot = document.createElement("div"));
      (i.style.cssText =
        "position:fixed; _position:absolute; top:-999px; left: -999px; width:1px; height:1px; margin:0; padding:0; display:none;"),
        (i.innerHTML = n),
        QC.Event.domReady(function () {
          document.body.appendChild(i), (i.style.display = "block");
        }),
        (window[this.prefix + "onFlashReady_" + this.timeStamp] = function () {
          g.Console.info(
            "FLAProxy代理创建成功，耗时" + (new Date() - o.timeStamp)
          ),
            setTimeout(function () {
              (o.isReady = !0), o.send(), o.invoke();
            }),
            g.Login._check() ||
              document._qc_cross_request_flash_proxy.initConn();
        }),
        (window[this.prefix + "onFlashRequestComplete_" + this.timeStamp] =
          function (t, e, n) {
            setTimeout(function () {
              o._preDispatch(o, t, e, n);
            });
          }),
        (window[this.prefix + "onFlashInvokeBack_" + this.timeStamp] =
          function () {
            var n = arguments;
            setTimeout(function () {
              var t = f.getFunction(n[0]),
                e = n[1];
              -1 < n[0].indexOf(".") ? t.apply(null, e) : t(e);
            });
          });
    },
    _doSend: function (t) {
      var e = t.uri,
        n = g.QueryString.stringify(t.paras),
        o = t.seq,
        i = t.fmt,
        r = t.method,
        t =
          document._qc_cross_request_flash_proxy.httpRequest ||
          _("_qc_cross_request_flash_proxy").httpRequest;
      t
        ? t(e, n, r, i, o)
        : (function () {
            throw new Error("flash proxy 初始化失败");
          })();
    },
    dispatch: function (t, e, n) {
      var o = t.currentTarget.data,
        t = "complete" != t.type ? 404 : 200;
      f.dispatchReceive(e, o, t, n);
    },
    _doInvoke: function (t) {
      var e =
        document._qc_cross_request_flash_proxy.jsCallSwf ||
        _("_qc_cross_request_flash_proxy").jsCallSwf;
      e && e.apply(null, t);
    },
  }),
    (I.getFlashHtml = function (t, e, n) {
      var o,
        i = [],
        r = [],
        a = !!window.ActiveXObject;
      for (o in ((e = e || 9), t))
        switch (o) {
          case "noSrc":
          case "movie":
            continue;
          case "id":
          case "name":
          case "width":
          case "height":
          case "style":
            void 0 !== t[o] && i.push(" ", o, '="', t[o], '"');
            break;
          case "src":
            a
              ? r.push(
                  '<param name="movie" value="',
                  t.noSrc ? "" : t[o],
                  '"/>'
                )
              : i.push(' data="', t.noSrc ? "" : t[o], '"');
            break;
          default:
            r.push('<param name="', o, '" value="', t[o], '" />');
        }
      return (
        a
          ? i.push(
              ' classid="clsid:',
              n || "D27CDB6E-AE6D-11cf-96B8-444553540000",
              '"'
            )
          : i.push(' type="application/x-shockwave-flash"'),
        location &&
          location.protocol.indexOf("https") < 0 &&
          i.push(
            ' codeBase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=',
            e,
            '"'
          ),
        "<object" + i.join("") + ">" + r.join("") + "</object>"
      );
    });
  var L = "https://graph.qq.com",
    S = g.Toolkit.extend(function () {
      f.apply(this, arguments);
    }, f);
  g.Object.extend(S.prototype, {
    init: function () {
      var e = this;
      (e._connFrame = document.createElement("iframe")),
        (e._connFrame.style.cssText =
          "width:0px; height:0px; display:none; overflow:hidden;");
      var t = function () {
        t.fire(), (t.fire = k);
      };
      (t.fire = function () {
        g.Console.info(
          "PMProxy代理创建成功，耗时" + (new Date() - e.timeStamp)
        ),
          (e.isReady = !0),
          e.send(),
          e.invoke();
      }),
        (e._connFrame.onload = t),
        e._connFrame.addEventListener &&
          e._connFrame.addEventListener("load", t, !1),
        e._connFrame.attachEvent && e._connFrame.attachEvent("onload", t),
        (e._connFrame.src = d.PMCrossPage),
        QC.Event.domReady(function () {
          document.body.appendChild(e._connFrame);
        });
      function n(t) {
        !t.origin ||
          (t.origin != L && "https://qzonestyle.gtimg.cn" != t.origin) ||
          e._preDispatch(e, t);
      }
      window.addEventListener
        ? window.addEventListener("message", n, !1)
        : window.attachEvent("onmessage", n);
    },
    _doSend: function (t) {
      t = g.QueryString.stringify({
        uri: t.uri,
        paras: g.QueryString.stringify(t.paras),
        fmt: t.fmt,
        method: t.method,
      });
      this._connFrame.contentWindow.postMessage(t, L);
    },
    dispatch: function (t) {
      var e = t.data.split(":<.<<#:"),
        n = e[0],
        o = e[1],
        t = e[2],
        e = e[3];
      g.Console.log("data:\t" + e), f.dispatchReceive(n, e, o, t);
    },
    _doInvoke: function (t) {
      var e;
      g.Console.log("invoke:\t" + t),
        "string" == typeof t &&
          ((t = (e = t.split("#"))[0]),
          (e = e[1] && e[1].split(",")),
          f.getFunction(t).apply(null, e));
    },
    onDispose: function () {
      this._connFrame.parentNode.removeChild(this._connFrame),
        (this._connFrame = null);
    },
  });
  var E = g.Toolkit.extend(function () {
    f.apply(this, arguments);
  }, f);
  g.Object.extend(E.prototype, {
    init: function () {
      g.Console.info("init:" + arguments);
    },
    _doSend: function (t) {
      g.Console.info("_doSend:" + arguments);
    },
    dispatch: function (t) {
      g.Console.info("dispatch:" + arguments);
    },
  }),
    (g.XHRRequest = h),
    (g.request = function (t, e, n, o) {
      return new h(t, e, n, o);
    });
  var Q,
    T,
    P = [];
  function M(t) {
    var e = g.Login._getTokenKeys();
    if (R <= 0)
      throw new Error("意外的调用了绑定token到req的方法 bindTokenPara");
    return (
      (t.paras.oauth_consumer_key = R),
      (t.paras.access_token = e.accessToken),
      (t.paras.openid = e.openid),
      (t.paras.format = t.fmt),
      t
    );
  }
  function j(e, t, n, o) {
    b = f.generateProxy();
    var i = B(e);
    (e = i.api || e), (o = o || i.method);
    var r = new u(e, (t = t || {}), n, o);
    return (
      0 < R
        ? setTimeout(function () {
            var t = g.Login._getTokenKeys();
            t.openid && t.accessToken
              ? b.send(M(r))
              : (T.push(r),
                g.Console.log(
                  "openid与accessToken丢失，调用请求入栈 : [" +
                    e +
                    "]，栈大小：" +
                    T.length
                ));
          }, 10)
        : (T.push(r),
          g.Console.log(
            (b.isReady && R < 0
              ? "token获取失败，请调用用户登录流程"
              : "api代理尚未初始化成功") +
              "，调用请求入栈 : [" +
              e +
              "]，栈大小：" +
              T.length
          )),
      r
        .success(function () {
          QC.valueStat(i.statId, 1, 0);
        })
        .error(function (t) {
          t = t || {};
          QC.valueStat(i.statId, 1, "number" == typeof t.ret ? t.ret : 1);
        }),
      r
    );
  }
  g.api =
    ((T = []),
    (j._ready = function () {
      var t;
      for (g.Console.info("init成功，开始触发api调用堆栈"); (t = T.shift()); )
        b.send(M(t));
    }),
    (j.getDoc =
      ((Q = null),
      function (t, e) {
        var n, o, i;
        Q && e
          ? e(Q[t])
          : ((n = t),
            (o = e || k),
            ((i = document.createElement("script")).type = "text/javascript"),
            (i.src = "https://qzonestyle.gtimg.cn/qzone/openapi/qc_jsdkdoc.js"),
            document.body.appendChild(i),
            (window.on_qc_jsdkdoc_loaded = function (t) {
              (Q = t), o && o(Q[n]), document.body.removeChild(i), (i = null);
            }));
      })),
    j);
  g.Login = (function () {
    var d,
      p,
      u,
      l = {
        A_XL: { styleId: 5, size: "230*48" },
        A_L: { styleId: 4, size: "170*32" },
        A_M: { styleId: 3, size: "120*24" },
        A_S: { styleId: 2, size: "105*16" },
        B_M: { styleId: 7, size: "63*24" },
        B_S: { styleId: 6, size: "50*16" },
        C_S: { styleId: 1, size: "16*16" },
      };
    function s(n) {
      n.clientId && QC.init({ appId: n.clientId });
      var o = QC.getAppId();
      if (o < 0) QC.getAppId(arguments);
      else {
        n.size = n.size || "B_M";
        var t = _(n.btnId),
          e = (l[n.size] || l.B_M).styleId,
          i = n.fullWindow || !1,
          r = n.btnMode || "standard";
        n.redirectURI = n.redirectURI || O;
        var a,
          s,
          i = { size: e, fullWindow: i, url: arguments.callee._getPopupUrl(n) };
        if (n && n.btnId) {
          if (!t) throw new Error("未找到插入节点:");
          t.innerHTML = arguments.callee.getBtnHtml(i, r, n);
          var c,
            r = t.firstChild.onclick;
          n.showModal
            ? (((c = document.createElement("DIV")).style =
                "position: absolute; visibility: hidden; width: 500px;height: 620px; padding: 0px; margin: 0px;border:1px #ddd solid; background: white;"),
              (c.innerHTML =
                '<iframe id="qq_login_iframe" frameborder="0" width="100%" height="100%"></iframe>'),
              (c.style.top = 0),
              (c.style.left = window.innerWidth / 2 - 250 + "px"),
              document.body.appendChild(c),
              (t.firstChild.onclick = function () {
                var t,
                  e = document.getElementById("qq_login_iframe");
                e.src ||
                  ((t = "?"),
                  (t += "response_type=token&"),
                  (t += "client_id=" + o + "&"),
                  (t += "redirect_uri=" + n.redirectURI),
                  (e.src = "https://graph.qq.com/oauth2.0/authorize" + t)),
                  (c.style.visibility = "visible");
              }))
            : (t.firstChild.onclick =
                ((a = r),
                window.addEventListener
                  ? window.addEventListener("unload", d, !1)
                  : window.attachEvent("onunload", d),
                function () {
                  return (
                    s && s.close(),
                    (s = a()),
                    g._create_fla_proxy(),
                    QC.pv("graph.qq.com", "/open/connect/click"),
                    !1
                  );
                }));
        }
      }
      function d() {
        s && s.close(), QC.Cookie.del("__qc_wId");
      }
    }
    (s.TEMPLATE = [
      '<a href="javascript:;" onclick="{onclick};"><img src="{src}" alt="{alt}" border="0"/></a>',
    ].join("")),
      ((s.getBtnHtml = function (t, e, n) {
        return arguments.callee.MODE[e] && arguments.callee.MODE[e](t, n);
      }).MODE = {
        standard: function (t) {
          var e = 1e4 + ~~C.get("__qc_wId");
          return y.format(s.TEMPLATE, {
            src:
              "https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_" +
              t.size +
              ".png",
            onclick: t.fullWindow
              ? "return window.open('" + t.url + "', 'oauth2Login_" + e + "');"
              : "return window.open('" +
                t.url +
                "', 'oauth2Login_" +
                e +
                "' ,'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes')",
            alt: "QQ登录",
          });
        },
        showUserAfterLogin: function (t, e) {
          var n = v.stringify(e),
            e = (l[e.size] || l.B_M).size.split("*");
          return (
            '<iframe frameBorder="0" scrolling="no" src="https://qzs.qq.com/qzone/openapi/frames/login_button.html#para=' +
            encodeURIComponent(n) +
            '" width="' +
            Math.max(200, e[0]) +
            '" height="' +
            e[1] +
            '" allowTransparency="true"></iframe>'
          );
        },
      }),
      (s._getPopupUrl = function (t) {
        var e = t.scope || "all",
          n = t.redirectURI || "",
          o = t.display || "",
          t = t.appId || QC.getAppId(),
          n =
            n ||
            "http%3A%2F%2Fqzonestyle.gtimg.cn%2Fqzone%2Fopenapi%2Fredirect-1.0.1.html";
        x <= 6 &&
          (n =
            "https://graph.qq.com/jsdkproxy/redirect_ie6.html#" +
            encodeURIComponent(n));
        t = ["client_id=" + t, "response_type=token"];
        return (
          e && t.push("scope=" + e),
          n &&
            (0 < n.indexOf("://") && (n = encodeURIComponent(n)),
            t.push("redirect_uri=" + n)),
          "mobile" == o && t.push("display=" + o),
          "https://graph.qq.com/oauth2.0/authorize?" + t.join("&")
        );
      });
    function t(e, n, t, o) {
      var i, r;
      function a() {
        for (var t = 0; t < f.length; t++) (0, f[t])(c);
      }
      return (
        (p = p || e.access_token),
        o ||
          null === t ||
          m.push(
            ((i = e),
            function () {
              (t || k)(i), s(i);
            })
          ),
        o ||
          null === n ||
          f.push(
            ((r = e),
            function (t) {
              (
                n ||
                function (t, e) {
                  QC.Login.fillUserInfo(e.btnId, t);
                }
              )(t, r);
            })
          ),
        c
          ? a()
          : p
          ? h(function (t) {
              t
                ? QC.api("get_user_info")
                    .success(function (t) {
                      (c = t.data), a();
                    })
                    .error(function (t) {
                      QC.Console.error("Login => getMe 获取数据失败" + t);
                    })
                : s(e);
            })
          : s(e),
        QC.valueStat(350368, 1, 0),
        null
      );
    }
    var c,
      o = function () {
        return (
          p ||
          (function () {
            var t,
              e,
              n = location && location.hash.match(/access_token=([^&]*)/i);
            if (
              (e = C.get("__qc__k")) &&
              ((t = e.split("=")), e.length && 2 != t.length)
            )
              throw new Error("QQConnect -> cookie : __qc__k 格式非法");
            p = (n && n[1]) || (t && t[1]);
          })()
        );
      },
      h = (function () {
        var i,
          r = [];
        o();
        function n(e, n, o) {
          for (var t; (t = r.shift()); )
            setTimeout(
              (function (t) {
                return function () {
                  t(e, n, o);
                };
              })(t)
            );
        }
        var a,
          s,
          e = function (t) {
            q.error(t + " : _getMeError"),
              window.callback({ error_description: t });
          },
          c = function (t) {
            (s = s || window.callback),
              t && c.cbPool.push(t),
              (window.callback = function (t) {
                if ((clearTimeout(i), t.openid)) {
                  var e,
                    n = (d = (u = t).openid),
                    o = p;
                  for (
                    q.log(
                      " getMe => openId & accessToken " +
                        [n, o, a ? "通过me接口" : "通过本地"]
                    );
                    (e = c.cbPool.shift());

                  )
                    e(n, p, t);
                  (a = null), (window.callback = s);
                }
              }),
              o()
                ? u
                  ? window.callback(u)
                  : a ||
                    (((a = document.createElement("script")).type =
                      "text/javascript"),
                    (a.src =
                      "https://graph.qq.com/oauth2.0/me?access_token=" + p),
                    (a.onerror = function () {
                      e("me接口返回格式错误");
                    }),
                    (t = document.getElementsByTagName("head")[0]) &&
                      t.appendChild(a),
                    (i = setTimeout(function () {
                      e("me接口超时");
                    }, 5e3)))
                : e("access_token丢失");
          };
        return (
          (c.cbPool = []),
          function (t, e) {
            e ? r.unshift(t) : r.push(t), c(n), QC.valueStat(350371, 1, 0);
          }
        );
      })(),
      f = [],
      m = [];
    return (
      w.extend(t, {
        insertButton: s,
        getMe: h,
        showPopup: function (t) {
          t = s._getPopupUrl(t || {});
          return QC.valueStat(350369, 1, 0), window.open(t);
        },
        signOut: function () {
          (d = ""),
            (document.cookie = ["__qc__k=", "path=/;"].join(";")),
            (function () {
              (p = void 0), (c = u = null);
              for (var t = 0; t < m.length; t++) (0, m[t])();
              QC.valueStat(350370, 1, 0);
            })();
        },
        _getTokenKeys: function () {
          return { openid: d, accessToken: p };
        },
        check: function () {
          return QC.valueStat(350372, 1, 0), !!p;
        },
        _check: function () {
          return !!(u && p && c);
        },
        _onLoginBack: function (t, e, n) {
          t &&
            e &&
            ((d = t),
            (document.cookie = [
              "__qc__k=" + ["TC_MK", e].join("="),
              "path=/",
            ].join(";"))),
            (u = { client_id: (u && u.client_id) || -1, openid: d }),
            o(),
            QC.Event.domReady(function () {
              QC.init(), n || QC.Login({}, null, null, 1);
            });
        },
        reset: function () {
          (f = []), (m = []);
        },
        fillUserInfo: function (t, e) {
          var n = _(t),
            t = [
              '<span class="qc_item figure"><img src="{figureurl}" class="{size_key}"/></span>',
              '<span class="qc_item nickname" style="margin-left:6px;">{nickname}</span>',
              '<span class="qc_item logout"><a href="javascript:QC.Login.signOut();" style="margin-left:6px;">退出</a></span>',
            ].join("");
          n &&
            (n.innerHTML = QC.String.format(t, {
              nickname: QC.String.escHTML(e.nickname),
              figureurl: e.figureurl,
            }));
        },
      }),
      t
    );
  })();
  var R = -1,
    F = null,
    O = "";
  (g.init = function (o) {
    F = o = o || F || {};
    var t = g.Login._getTokenKeys();
    if (((R = o.appId), (O = o.redirectURI), t.openid))
      g.Login.getMe(function (t, e, n) {
        !~~n.error && (n.client_id <= 0 || n.client_id % 1e6 == o.appId % 1e6)
          ? ((R = n.client_id =
              o.appId || o.clientId || o.app_id || o.client_id || -1),
            g.api._ready && g.api._ready())
          : g.Console.error(n.error_description || "appId/client_id 不匹配");
      }, !0);
    else if ((f.invoke(), P.length && -1 < o.appId))
      for (var e = 0; e < P.length; e++) P[e]();
  }),
    (g.getAppId = function (t) {
      return (
        t &&
          P.push(function () {
            t.callee.apply(null, t);
          }),
        R
      );
    }),
    (g.invoke = function () {
      f.generateProxy("FLAProxy").invoke(arguments);
    });
  var D,
    A,
    z,
    B =
      ((D = {
        get_user_info: {
          api: "https://graph.qq.com/user/get_user_info",
          method: "get",
          statId: 350373,
        },
        add_topic: {
          api: "https://graph.qq.com/shuoshuo/add_topic",
          method: "post",
          statId: 350374,
        },
        add_one_blog: {
          api: "https://graph.qq.com/blog/add_one_blog",
          method: "post",
          statId: 350375,
        },
        add_album: {
          api: "https://graph.qq.com/photo/add_album",
          method: "post",
          statId: 350376,
        },
        upload_pic: {
          api: "https://graph.qq.com/photo/upload_pic",
          method: "post",
          statId: 350377,
        },
        list_album: {
          api: "https://graph.qq.com/photo/list_album",
          method: "get",
          statId: 350391,
        },
        add_share: {
          api: "https://graph.qq.com/share/add_share",
          method: "post",
          statId: 350378,
        },
        check_page_fans: {
          api: "https://graph.qq.com/user/check_page_fans",
          method: "get",
          statId: 350379,
        },
        add_t: {
          api: "https://graph.qq.com/t/add_t",
          method: "post",
          statId: 350380,
        },
        add_pic_t: {
          api: " https://graph.qq.com/t/add_pic_t",
          method: "post",
          statId: 350381,
        },
        del_t: {
          api: "https://graph.qq.com/t/del_t",
          method: "post",
          statId: 350382,
        },
        get_repost_list: {
          api: "https://graph.qq.com/t/get_repost_list",
          method: "get",
          statId: 350383,
        },
        get_info: {
          api: "https://graph.qq.com/user/get_info",
          method: "get",
          statId: 350384,
        },
        get_other_info: {
          api: "https://graph.qq.com/user/get_other_info",
          method: "get",
          statId: 350385,
        },
        get_fanslist: {
          api: "https://graph.qq.com/relation/get_fanslist",
          method: "get",
          statId: 350386,
        },
        get_idollist: {
          api: "https://graph.qq.com/relation/get_idollist",
          method: "get",
          statId: 350387,
        },
        add_idol: {
          api: "https://graph.qq.com/relation/add_idol",
          method: "post",
          statId: 350388,
        },
        del_idol: {
          api: "https://graph.qq.com/relation/del_idol",
          method: "post",
          statId: 350389,
        },
        get_tenpay_addr: {
          api: "https://graph.qq.com/cft_info/get_tenpay_addr",
          method: "get",
          statId: 350390,
        },
      }),
      function (t) {
        return D[t] || {};
      });
  (A = t("appid")),
    (z = t("redirecturi")),
    A &&
      (g.Console.info("检测到自动初始化参数\nappId:" + A + "\nrUri:" + z),
      isNaN(A)
        ? g.Console.error("参数appid错误")
        : z && 0 != z.indexOf("http")
        ? g.Console.error("参数rediectURI错误")
        : g.Event.domReady(function () {
            g.init({ appId: A, redirectURI: z });
          })),
    t("callback")
      ? ((window._b_is_qc_cb_win = !0),
        QC.Login.getMe(function (e, n, t) {
          if (window.opener) {
            QC.Console.info("cb_method_1:window.opener.QC.Login._onLoginBack");
            try {
              window.opener.QC.Login._onLoginBack(e, n);
            } catch (t) {
              QC.Console.info("cb_method_2:window.opener.postMessage");
              try {
                window.opener.postMessage(
                  "invoke@@@QC.Login._onLoginBack#" + [e, n].join(","),
                  "*"
                );
              } catch (t) {
                QC.Console.info("cb_method_3:QC.invoke");
                try {
                  QC.invoke("QC.Login._onLoginBack", e, n);
                } catch (t) {
                  QC.Console.info("cb_method_5:[empty]");
                }
              }
            }
          } else {
            QC.Console.info("cb_method_4:QC.invoke");
            try {
              QC.invoke("QC.Login._onLoginBack", e, n);
            } catch (t) {}
          }
          setTimeout(function () {
            (7 < x ? window.open("about:blank", "_self") : window).close();
          }, 1e3);
        }),
        QC.pv("graph.qq.com", "/open/connect/channel/pv"))
      : (A && QC.Login.check()
          ? (QC.Event.domReady(function () {
              QC.Login.getMe(function (t, e) {
                QC.Login._onLoginBack(t, e, 1);
              });
            }),
            QC.pv("graph.qq.com", "/open/connect/logged_in/pv"))
          : QC.pv("graph.qq.com", "/open/connect/pv"),
        QC.reportBNL(11236, A));
})(QC),
  (window.qc = QC),
  "function" == typeof Object.freeze && Object.freeze(QC);
