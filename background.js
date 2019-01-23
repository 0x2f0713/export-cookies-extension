// FileSaver.js
var saveAs =
  saveAs ||
  (function(t) {
    "use strict";
    if (
      !(
        void 0 === t ||
        ("undefined" != typeof navigator &&
          /MSIE [1-9]\./.test(navigator.userAgent))
      )
    ) {
      let e = function() {
          return t.URL || t.webkitURL || t;
        },
        n = t.document.createElementNS("http://www.w3.org/1999/xhtml", "a"),
        r = "download" in n,
        o = /constructor/i.test(t.HTMLElement) || t.safari,
        a = /CriOS\/[\d]+/.test(navigator.userAgent),
        i = t.setImmediate || t.setTimeout,
        c = function(t) {
          i(function() {
            throw t;
          }, 0);
        },
        d = function(t) {
          setTimeout(function() {
            "string" == typeof t ? e().revokeObjectURL(t) : t.remove();
          }, 4e4);
        },
        f = function(t) {
          return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
            t.type
          )
            ? new Blob([String.fromCharCode(65279), t], {
                type: t.type
              })
            : t;
        },
        s = function(s, u, l) {
          l || (s = f(s));
          let p,
            v = this,
            w = "application/octet-stream" === s.type,
            m = function() {
              !(function(t, e, n) {
                for (let r = (e = [].concat(e)).length; r--; ) {
                  let o = t["on" + e[r]];
                  if ("function" == typeof o)
                    try {
                      o.call(t, n || t);
                    } catch (t) {
                      c(t);
                    }
                }
              })(v, "writestart progress write writeend".split(" "));
            };
          if (((v.readyState = v.INIT), r))
            return (
              (p = e().createObjectURL(s)),
              void i(function() {
                let t, e;
                (n.href = p),
                  (n.download = u),
                  (t = n),
                  (e = new MouseEvent("click")),
                  t.dispatchEvent(e),
                  m(),
                  d(p),
                  (v.readyState = v.DONE);
              }, 0)
            );
          !(function() {
            if ((a || (w && o)) && t.FileReader) {
              let n = new FileReader();
              return (
                (n.onloadend = function() {
                  let e = a
                    ? n.result
                    : n.result.replace(/^data:[^;]*;/, "data:attachment/file;");
                  t.open(e, "_blank") || (t.location.href = e),
                    (e = void 0),
                    (v.readyState = v.DONE),
                    m();
                }),
                n.readAsDataURL(s),
                void (v.readyState = v.INIT)
              );
            }
            p || (p = e().createObjectURL(s)),
              w
                ? (t.location.href = p)
                : t.open(p, "_blank") || (t.location.href = p);
            (v.readyState = v.DONE), m(), d(p);
          })();
        },
        u = s.prototype;
      return "undefined" != typeof navigator && navigator.msSaveOrOpenBlob
        ? function(t, e, n) {
            return (
              (e = e || t.name || "download"),
              n || (t = f(t)),
              navigator.msSaveOrOpenBlob(t, e)
            );
          }
        : ((u.abort = function() {}),
          (u.readyState = u.INIT = 0),
          (u.WRITING = 1),
          (u.DONE = 2),
          (u.error = u.onwritestart = u.onprogress = u.onwrite = u.onabort = u.onerror = u.onwriteend = null),
          function(t, e, n) {
            return new s(t, e || t.name || "download", n);
          });
    }
  })(
    ("undefined" != typeof self && self) ||
      ("undefined" != typeof window && window) ||
      this
  );
// Main
function extractHostname(url) {
  var hostname;

  if (url.indexOf("//") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }
  hostname = hostname.split(":")[0];
  hostname = hostname.split("?")[0];

  return hostname;
}
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    chrome.cookies.getAll({ url: tabs[0].url }, cookies => {
      var a = {
        url: tabs[0].url,
        cookies: cookies
      };
      // Get password
      saveAs(
        new File([JSON.stringify(a)], `${extractHostname(tabs[0].url)}.json`, {
          type: "application/json;charset=utf-8"
        })
      );
    });
  });
});
