/*
 countdown.js v2.6.1 http://countdownjs.org
 Copyright (c)2006-2014 Stephen M. McKamey.
 Licensed under The MIT License.
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function (b, e, d) {
  b instanceof String && (b = String(b));
  for (var g = b.length, k = 0; k < g; k++) {
    var l = b[k];
    if (e.call(d, l, k, b)) return { i: k, v: l };
  }
  return { i: -1, v: void 0 };
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (b, e, d) {
        b != Array.prototype && b != Object.prototype && (b[e] = d.value);
      };
$jscomp.getGlobal = function (b) {
  return "undefined" != typeof window && window === b
    ? b
    : "undefined" != typeof global && null != global
    ? global
    : b;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (b, e, d, g) {
  if (e) {
    d = $jscomp.global;
    b = b.split(".");
    for (g = 0; g < b.length - 1; g++) {
      var k = b[g];
      k in d || (d[k] = {});
      d = d[k];
    }
    b = b[b.length - 1];
    g = d[b];
    e = e(g);
    e != g &&
      null != e &&
      $jscomp.defineProperty(d, b, {
        configurable: !0,
        writable: !0,
        value: e,
      });
  }
};
$jscomp.polyfill(
  "Array.prototype.find",
  function (b) {
    return b
      ? b
      : function (b, d) {
          return $jscomp.findInternal(this, b, d).v;
        };
  },
  "es6",
  "es3"
);
$jscomp.polyfill(
  "Array.prototype.findIndex",
  function (b) {
    return b
      ? b
      : function (b, d) {
          return $jscomp.findInternal(this, b, d).i;
        };
  },
  "es6",
  "es3"
);
var countdown = (function () {
    function b(a, c) {
      var f = a.getTime();
      a.setMonth(a.getMonth() + c);
      return Math.round((a.getTime() - f) / 864e5);
    }
    function e(a) {
      var c = a.getTime(),
        f = new Date(c);
      f.setMonth(a.getMonth() + 1);
      return Math.round((f.getTime() - c) / 864e5);
    }
    function d(a, c) {
      c =
        c instanceof Date || (null !== c && isFinite(c))
          ? new Date(+c)
          : new Date();
      if (!a) return c;
      var f = +a.value || 0;
      if (f) return c.setTime(c.getTime() + f), c;
      (f = +a.milliseconds || 0) && c.setMilliseconds(c.getMilliseconds() + f);
      (f = +a.seconds || 0) && c.setSeconds(c.getSeconds() + f);
      (f = +a.minutes || 0) && c.setMinutes(c.getMinutes() + f);
      (f = +a.hours || 0) && c.setHours(c.getHours() + f);
      (f = +a.weeks || 0) && (f *= 7);
      (f += +a.days || 0) && c.setDate(c.getDate() + f);
      (f = +a.months || 0) && c.setMonth(c.getMonth() + f);
      (f = +a.millennia || 0) && (f *= 10);
      (f += +a.centuries || 0) && (f *= 10);
      (f += +a.decades || 0) && (f *= 10);
      (f += +a.years || 0) && c.setFullYear(c.getFullYear() + f);
      return c;
    }
    function g(a, c) {
      return z(a) + (1 === a ? q[c] : t[c]);
    }
    function k() {}
    function l(a, c, f, b, d, g) {
      0 <= a[f] && ((c += a[f]), delete a[f]);
      c /= d;
      if (1 >= c + 1) return 0;
      if (0 <= a[b]) {
        a[b] = +(a[b] + c).toFixed(g);
        switch (b) {
          case "seconds":
            if (60 !== a.seconds || isNaN(a.minutes)) break;
            a.minutes++;
            a.seconds = 0;
          case "minutes":
            if (60 !== a.minutes || isNaN(a.hours)) break;
            a.hours++;
            a.minutes = 0;
          case "hours":
            if (24 !== a.hours || isNaN(a.days)) break;
            a.days++;
            a.hours = 0;
          case "days":
            if (7 !== a.days || isNaN(a.weeks)) break;
            a.weeks++;
            a.days = 0;
          case "weeks":
            if (a.weeks !== e(a.refMonth) / 7 || isNaN(a.months)) break;
            a.months++;
            a.weeks = 0;
          case "months":
            if (12 !== a.months || isNaN(a.years)) break;
            a.years++;
            a.months = 0;
          case "years":
            if (10 !== a.years || isNaN(a.decades)) break;
            a.decades++;
            a.years = 0;
          case "decades":
            if (10 !== a.decades || isNaN(a.centuries)) break;
            a.centuries++;
            a.decades = 0;
          case "centuries":
            10 !== a.centuries ||
              isNaN(a.millennia) ||
              (a.millennia++, (a.centuries = 0));
        }
        return 0;
      }
      return c;
    }
    function v(a, c, f, d, g, k) {
      var h = new Date();
      a.start = c = c || h;
      a.end = f = f || h;
      a.units = d;
      a.value = f.getTime() - c.getTime();
      0 > a.value && ((h = f), (f = c), (c = h));
      if (0 < a.value)
        return (
          (a.millennia = 0),
          (a.centuries = 0),
          (a.decades = 0),
          (a.years = 0),
          (a.months = 0),
          (a.weeks = 0),
          (a.days = 0),
          (a.hours = 0),
          (a.minutes = 0),
          (a.seconds = 0),
          (a.milliseconds = 0),
          a
        );
      a.refMonth = new Date(c.getFullYear(), c.getMonth(), 15, 12, 0, 0);
      try {
        a.millennia = 0;
        a.centuries = 0;
        a.decades = 0;
        a.years = f.getFullYear() - c.getFullYear();
        a.months = f.getMonth() - c.getMonth();
        a.weeks = 0;
        a.days = f.getDate() - c.getDate();
        a.hours = f.getHours() - c.getHours();
        a.minutes = f.getMinutes() - c.getMinutes();
        a.seconds = f.getSeconds() - c.getSeconds();
        a.milliseconds = f.getMilliseconds() - c.getMilliseconds();
        if (0 > a.milliseconds) {
          var r = u(-a.milliseconds / 1e3);
          a.seconds -= r;
          a.milliseconds += 1e3 * r;
        } else
          1e3 <= a.milliseconds &&
            ((a.seconds += m(a.milliseconds / 1e3)), (a.milliseconds %= 1e3));
        0 > a.seconds
          ? ((r = u(-a.seconds / 60)), (a.minutes -= r), (a.seconds += 60 * r))
          : 60 <= a.seconds &&
            ((a.minutes += m(a.seconds / 60)), (a.seconds %= 60));
        0 > a.minutes
          ? ((r = u(-a.minutes / 60)), (a.hours -= r), (a.minutes += 60 * r))
          : 60 <= a.minutes &&
            ((a.hours += m(a.minutes / 60)), (a.minutes %= 60));
        0 > a.hours
          ? ((r = u(-a.hours / 24)), (a.days -= r), (a.hours += 24 * r))
          : 24 <= a.hours && ((a.days += m(a.hours / 24)), (a.hours %= 24));
        for (; 0 > a.days; ) a.months--, (a.days += b(a.refMonth, 1));
        7 <= a.days && ((a.weeks += m(a.days / 7)), (a.days %= 7));
        0 > a.months
          ? ((r = u(-a.months / 12)), (a.years -= r), (a.months += 12 * r))
          : 12 <= a.months && ((a.years += m(a.months / 12)), (a.months %= 12));
        10 <= a.years &&
          ((a.decades += m(a.years / 10)),
          (a.years %= 10),
          10 <= a.decades &&
            ((a.centuries += m(a.decades / 10)),
            (a.decades %= 10),
            10 <= a.centuries &&
              ((a.millennia += m(a.centuries / 10)), (a.centuries %= 10))));
        c = 0;
        !(d & 1024) || c >= g
          ? ((a.centuries += 10 * a.millennia), delete a.millennia)
          : a.millennia && c++;
        !(d & 512) || c >= g
          ? ((a.decades += 10 * a.centuries), delete a.centuries)
          : a.centuries && c++;
        !(d & 256) || c >= g
          ? ((a.years += 10 * a.decades), delete a.decades)
          : a.decades && c++;
        !(d & 128) || c >= g
          ? ((a.months += 12 * a.years), delete a.years)
          : a.years && c++;
        !(d & 64) || c >= g
          ? (a.months && (a.days += b(a.refMonth, a.months)),
            delete a.months,
            7 <= a.days && ((a.weeks += m(a.days / 7)), (a.days %= 7)))
          : a.months && c++;
        !(d & 32) || c >= g
          ? ((a.days += 7 * a.weeks), delete a.weeks)
          : a.weeks && c++;
        !(d & 16) || c >= g
          ? ((a.hours += 24 * a.days), delete a.days)
          : a.days && c++;
        !(d & 8) || c >= g
          ? ((a.minutes += 60 * a.hours), delete a.hours)
          : a.hours && c++;
        !(d & 4) || c >= g
          ? ((a.seconds += 60 * a.minutes), delete a.minutes)
          : a.minutes && c++;
        !(d & 2) || c >= g
          ? ((a.milliseconds += 1e3 * a.seconds), delete a.seconds)
          : a.seconds && c++;
        if (!(d & 1) || c >= g) {
          var n = l(a, 0, "milliseconds", "seconds", 1e3, k);
          if (
            n &&
            (n = l(a, n, "seconds", "minutes", 60, k)) &&
            (n = l(a, n, "minutes", "hours", 60, k)) &&
            (n = l(a, n, "hours", "days", 24, k)) &&
            (n = l(a, n, "days", "weeks", 7, k)) &&
            (n = l(a, n, "weeks", "months", e(a.refMonth) / 7, k))
          ) {
            d = n;
            var A = a.refMonth,
              p = A.getTime(),
              q = new Date(p);
            q.setFullYear(A.getFullYear() + 1);
            var t = Math.round((q.getTime() - p) / 864e5);
            if ((n = l(a, d, "months", "years", t / e(a.refMonth), k)))
              if ((n = l(a, n, "years", "decades", 10, k)))
                if ((n = l(a, n, "decades", "centuries", 10, k)))
                  if ((n = l(a, n, "centuries", "millennia", 10, k)))
                    throw Error("Fractional unit overflow");
          }
        }
      } finally {
        delete a.refMonth;
      }
      return a;
    }
    function h(a, c, b, e, g) {
      b = +b || 222;
      e = 0 < e ? e : NaN;
      g = 0 < g ? (20 > g ? Math.round(g) : 20) : 0;
      var f = null;
      if ("function" === typeof a) {
        var h = a;
        a = null;
      } else
        a instanceof Date ||
          (null !== a && isFinite(a)
            ? (a = new Date(+a))
            : ("object" === typeof f && (f = a), (a = null)));
      var l = null;
      "function" === typeof c
        ? ((h = c), (c = null))
        : c instanceof Date ||
          (null !== c && isFinite(c)
            ? (c = new Date(+c))
            : ("object" === typeof c && (l = c), (c = null)));
      f && (a = d(f, c));
      l && (c = d(l, a));
      if (!a && !c) return new k();
      if (!h) return v(new k(), a, c, b, e, g);
      f =
        b & 1
          ? 1e3 / 30
          : b & 2
          ? 1e3
          : b & 4
          ? 6e4
          : b & 8
          ? 36e5
          : b & 16
          ? 864e5
          : 6048e5;
      var m;
      l = function () {
        h(v(new k(), a, c, b, e, g), m);
      };
      l();
      return (m = setInterval(l, f));
    }
    var u = Math.ceil,
      m = Math.floor,
      q,
      t,
      w,
      x,
      y,
      p,
      z;
    k.prototype.toString = function (a) {
      var c = B(this),
        b = c.length;
      if (!b) return a ? "" + a : y;
      if (1 === b) return c[0];
      a = w + c.pop();
      return c.join(x) + a;
    };
    k.prototype.toHTML = function (a, c) {
      a = a || "span";
      var b = B(this),
        d = b.length;
      if (!d) return (c = c || y) ? "<" + a + ">" + c + "</" + a + ">" : c;
      for (c = 0; c < d; c++) b[c] = "<" + a + ">" + b[c] + "</" + a + ">";
      if (1 === d) return b[0];
      a = w + b.pop();
      return b.join(x) + a;
    };
    k.prototype.addTo = function (a) {
      return d(this, a);
    };
    var B = function (a) {
      var c = [],
        b = a.millennia;
      b && c.push(p(b, 10));
      (b = a.centuries) && c.push(p(b, 9));
      (b = a.decades) && c.push(p(b, 8));
      (b = a.years) && c.push(p(b, 7));
      (b = a.months) && c.push(p(b, 6));
      (b = a.weeks) && c.push(p(b, 5));
      (b = a.days) && c.push(p(b, 4));
      (b = a.hours) && c.push(p(b, 3));
      (b = a.minutes) && c.push(p(b, 2));
      (b = a.seconds) && c.push(p(b, 1));
      (b = a.milliseconds) && c.push(p(b, 0));
      return c;
    };
    h.MILLISECONDS = 1;
    h.SECONDS = 2;
    h.MINUTES = 4;
    h.HOURS = 8;
    h.DAYS = 16;
    h.WEEKS = 32;
    h.MONTHS = 64;
    h.YEARS = 128;
    h.DECADES = 256;
    h.CENTURIES = 512;
    h.MILLENNIA = 1024;
    h.DEFAULTS = 222;
    h.ALL = 2047;
    var D = (h.setFormat = function (a) {
        if (a) {
          if ("singular" in a || "plural" in a) {
            var b = a.singular || [];
            b.split && (b = b.split("|"));
            var d = a.plural || [];
            d.split && (d = d.split("|"));
            for (var e = 0; 10 >= e; e++)
              (q[e] = b[e] || q[e]), (t[e] = d[e] || t[e]);
          }
          "string" === typeof a.last && (w = a.last);
          "string" === typeof a.delim && (x = a.delim);
          "string" === typeof a.empty && (y = a.empty);
          "function" === typeof a.formatNumber && (z = a.formatNumber);
          "function" === typeof a.formatter && (p = a.formatter);
        }
      }),
      C = (h.resetFormat = function () {
        q =
          " millisecond; second; minute; hour; day; week; month; year; decade; century; millennium".split(
            ";"
          );
        t =
          " milliseconds; seconds; minutes; hours; days; weeks; months; years; decades; centuries; millennia".split(
            ";"
          );
        w = " and ";
        x = ", ";
        y = "";
        z = function (a) {
          return a;
        };
        p = g;
      });
    h.setLabels = function (a, b, d, e, g, k, h) {
      D({
        singular: a,
        plural: b,
        last: d,
        delim: e,
        empty: g,
        formatNumber: k,
        formatter: h,
      });
    };
    h.resetLabels = C;
    C();
    "undefined" !== typeof module && module.exports
      ? (module.exports = h)
      : "undefined" !== typeof window &&
        "function" === typeof window.define &&
        "undefined" !== typeof window.define.amd &&
        window.define("countdown", [], function () {
          return h;
        });
    return h;
  })(),
  DIRECTIVE_KEY_MAP = {
    Y: "years",
    m: "months",
    n: "daysToMonth",
    d: "daysToWeek",
    w: "weeks",
    W: "weeksToMonth",
    H: "hours",
    M: "minutes",
    S: "seconds",
    D: "days",
    I: "totalHours",
    N: "totalMinutes",
    T: "totalSeconds",
  };
function escapedRegExp(b) {
  b = b.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  return new RegExp(b);
}
function strftime(b) {
  return function (e) {
    var d = e.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
    if (d)
      for (var g = 0, k = d.length; g < k; ++g) {
        var l = d[g].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
          v = escapedRegExp(l[0]),
          h = l[1] || "",
          u = l[3] || "",
          m = null;
        l = l[2];
        DIRECTIVE_KEY_MAP.hasOwnProperty(l) &&
          ((m = DIRECTIVE_KEY_MAP[l]), (m = Number(b[m])));
        null !== m &&
          ("!" === h && (m = pluralize(u, m)),
          "" === h && 10 > m && (m = "0" + m.toString()),
          (e = e.replace(v, m.toString())));
      }
    return (e = e.replace(/%%/, "%"));
  };
}
function pluralize(b, e) {
  var d = "s",
    g = "";
  b &&
    ((b = b.replace(/(:|;|\s)/gi, "").split(/,/)),
    1 === b.length ? (d = b[0]) : ((g = b[0]), (d = b[1])));
  return 1 < Math.abs(e) ? d : g;
}
var matchers = [];
matchers.push(/^[0-9]*$/.source);
matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
matchers.push(
  /[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source
);
matchers = new RegExp(matchers.join("|"));
function parseDateString(b) {
  if (b instanceof Date) return b;
  if (String(b).match(matchers)) {
    if (
      (String(b).match(/^[0-9]*$/) && (b = Number(b)),
      String(b).match(/\-/) && (b = String(b).replace(/\-/g, "/")),
      (b = new Date(b)),
      isValidDate(b))
    )
      return b;
  } else throw Error("Couldn't cast `" + b + "` to a date object.");
}
function isValidDate(b) {
  return b instanceof Date && !isNaN(b);
}
var isBuilder = document.querySelector("html").classList.contains("is-builder"),
  countdowns = [];
function initCountdown(b) {
  document
    .querySelectorAll(".countdown:not(.countdown-inited)")
    .forEach(function (e) {
      var d =
        countdown.DAYS |
        countdown.HOURS |
        countdown.MINUTES |
        countdown.SECONDS;
      e.classList.add("countdown-inited");
      var g = parseDateString(e.getAttribute("data-due-date"));
      countdowns.find(function (d) {
        return d.id === b.getAttribute("id");
      }) && (countdowns = []);
      b.getAttribute("id") &&
        ((d = countdown(
          g,
          function (b) {
            function d(b, d) {
              d = new RegExp("^" + d + "-\\d+$");
              for (var e = 0; e < b.length; e++) if (d.test(b[e])) return b[e];
              return null;
            }
            b.strftime = strftime(b);
            var g = e
                .closest(".countdown-cont")
                .querySelector("div.daysCountdown")
                .getAttribute("title"),
              h = e
                .closest(".countdown-cont")
                .querySelector("div.hoursCountdown")
                .getAttribute("title"),
              k = e
                .closest(".countdown-cont")
                .querySelector("div.minutesCountdown")
                .getAttribute("title"),
              m = e
                .closest(".countdown-cont")
                .querySelector("div.secondsCountdown")
                .getAttribute("title"),
              q = e.closest(".countdown-cont");
            q = d(q.classList, "display");
            var t = e.closest(".countdown-cont");
            t = d(
              t.querySelector(
                "div.daysCountdown, div.hoursCountdown, div.minutesCountdown, div.secondsCountdown"
              ).classList,
              "display"
            );
            e.innerHTML = b.strftime(
              [
                '<div class="row"><div class="col-3"><div class="number-wrap"><span class="number ',
                q || "display-2",
                '"><b>%D</b></span><span mbr-text class="period ',
                t || "display-7",
                '">',
                g,
                '</span><span class="dot">:</span></div></div><div class="col-3"><div class="number-wrap"><span class="number ',
                q || "display-2",
                '"><b>%H</b></span><span mbr-text class="period ',
                t || "display-7",
                '">',
                h,
                '</span><span class="dot">:</span></div></div><div class="col-3"><div class="number-wrap"><span class="number ',
                q || "display-2",
                '"><b>%M</b></span><span mbr-text class="period ',
                t || "display-7",
                '">',
                k,
                '</span><span class="dot">:</span></div></div><div class="col-3"><div class="number-wrap"><span class="number ',
                q || "display-2",
                '"><b>%S</b></span><span mbr-text class="period ',
                t || "display-7",
                '">',
                m,
                "</span></div></div></div>",
              ].join("")
            );
          },
          d
        )),
        (d = { id: b.getAttribute("id"), timerId: d }),
        d.id && countdowns.push(d));
    });
  document
    .querySelectorAll(".countdown:not(.countdown-inited)")
    .forEach(function (b) {
      new countdown(b.getAttribute("data-due-date"), function (d) {
        b.textContent = d.strftime("%D days %H:%M:%S");
      });
    });
}
function initCountdownBuild() {
  document
    .querySelectorAll(".countdown:not(.countdown-inited)")
    .forEach(function (b) {
      var e =
        countdown.DAYS |
        countdown.HOURS |
        countdown.MINUTES |
        countdown.SECONDS;
      b.classList.add("countdown-inited");
      var d = parseDateString(b.getAttribute("data-due-date"));
      countdown(
        d,
        function (d) {
          d.strftime = strftime(d);
          var e = b
              .closest(".countdown-cont")
              .querySelector("div.daysCountdown")
              .getAttribute("title"),
            g = b
              .closest(".countdown-cont")
              .querySelector("div.hoursCountdown")
              .getAttribute("title"),
            v = b
              .closest(".countdown-cont")
              .querySelector("div.minutesCountdown")
              .getAttribute("title"),
            h = b
              .closest(".countdown-cont")
              .querySelector("div.secondsCountdown")
              .getAttribute("title");
          b.innerHTML = d.strftime(
            [
              '<div class="row"><div class="col-3"><div class="number-wrap"><span class="number display-2"><b>%D</b></span><span mbr-text class="period display-7">',
              e,
              '</span><span class="dot">:</span></div></div><div class="col-3"><div class="number-wrap"><span class="number display-2"><b>%H</b></span><span mbr-text class="period display-7">',
              g,
              '</span><span class="dot">:</span></div></div><div class="col-3"><div class="number-wrap"><span class="number display-2"><b>%M</b></span><span mbr-text class="period display-7">',
              v,
              '</span><span class="dot">:</span></div></div><div class="col-3"><div class="number-wrap"><span class="number display-2"><b>%S</b></span><span mbr-text class="period display-7">',
              h,
              "</span></div></div></div>",
            ].join("")
          );
        },
        e
      );
    });
}
function changeCountdown(b, e) {
  var d = b.querySelector(".countdown");
  -1 < e.search(/\d\d\d\d\/\d\d\/\d\d/g) &&
    (d.classList.remove("countdown-inited"), initCountdown(b));
}
if (isBuilder)
  $(document)
    .on("add.cards", function (b) {
      0 != $(".countdown").length && initCountdown(b.target);
    })
    .on("changeParameter.cards", function (b, e, d) {
      if ("countdown" === e) {
        e = countdowns.find(function (d) {
          return d.id === b.target.getAttribute("id");
        });
        var g = countdowns.findIndex(function (d) {
          return d.id === b.target.getAttribute("id");
        });
        e && (clearTimeout(e.timerId), countdowns.splice(g, 1));
        changeCountdown(b.target, d);
      }
    })
    .on("delete.cards", function (b) {
      if (b.target.querySelector(".countdown")) {
        var e = countdowns.find(function (d) {
            return d.id === b.target.getAttribute("id");
          }),
          d = countdowns.findIndex(function (d) {
            return d.id === b.target.getAttribute("id");
          });
        -1 !== d && (clearTimeout(e.timerId), countdowns.splice(d, 1));
      }
    });
else
  0 != document.querySelectorAll(".countdown").length && initCountdownBuild();
