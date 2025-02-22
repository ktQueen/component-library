/**
 * jquery-date-range-picker
 * @version v0.4.0
 * @link https://github.com/longbill/jquery-date-range-picker
 * @license MIT
 */
requirejs.config({
    paths: {
        'moment': 'modules/calendar/js/moment.min',
        'jquery': 'modules/libs/jq/jquery-2.1.1.min'
    },
});
! function(e) {
    "function" == typeof define && define.amd ?
        define(["jquery", "moment"], e) :
        "object" == typeof exports && "undefined" != typeof module ?
        module.exports = e(require("jquery"), require("moment")) :
        e(jQuery, moment)
}(function(e, t) {
    "use strict";
    e.dateRangePickerLanguages = {
            "default": {
                selected: "Selected:",
                day: "Day",
                days: "Days",
                apply: "Close",
                "week-1": "mo",
                "week-2": "tu",
                "week-3": "we",
                "week-4": "th",
                "week-5": "fr",
                "week-6": "sa",
                "week-7": "su",
                "week-number": "W",
                "month-name": ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
                shortcuts: "Shortcuts",
                "custom-values": "Custom Values",
                past: "Past",
                following: "Following",
                previous: "Previous",
                "prev-week": "Week",
                "prev-month": "Month",
                "prev-year": "Year",
                next: "Next",
                "next-week": "Week",
                "next-month": "Month",
                "next-year": "Year",
                "less-than": "Date range should not be more than %d days",
                "more-than": "Date range should not be less than %d days",
                "default-more": "Please select a date range longer than %d days",
                "default-single": "Please select a date",
                "default-less": "Please select a date range less than %d days",
                "default-range": "Please select a date range between %d and %d days",
                "default-default": "Please select a date range",
                time: "Time",
                hour: "Hour",
                minute: "Minute"
            },
            cn: {
                selected: "已选择:",
                day: "天",
                days: "天",
                apply: "确定",
                "week-1": "一",
                "week-2": "二",
                "week-3": "三",
                "week-4": "四",
                "week-5": "五",
                "week-6": "六",
                "week-7": "日",
                "week-number": "周",
                "month-name": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                shortcuts: "快捷选择",
                past: "过去",
                following: "将来",
                previous: "&nbsp;&nbsp;&nbsp;",
                "prev-week": "上周",
                "prev-month": "上个月",
                "prev-year": "去年",
                next: "&nbsp;&nbsp;&nbsp;",
                "next-week": "下周",
                "next-month": "下个月",
                "next-year": "明年",
                "less-than": "所选日期范围不能大于%d天",
                "more-than": "所选日期范围不能小于%d天",
                "default-more": "请选择大于%d天的日期范围",
                "default-less": "请选择小于%d天的日期范围",
                "default-range": "请选择%d天到%d天的日期范围",
                "default-single": "请选择一个日期",
                "default-default": "请选择一个日期范围",
                time: "时间",
                hour: "小时",
                minute: "分钟"
            }
        },
        e.fn.dateRangePicker = function(a) {
            function n(t, a) {
                return a.contains(t.target) || t.target == a || void 0 != a.childNodes && e.inArray(t.target, a.childNodes) >= 0
            }

            function r() {
                function r(t) {
                    var n = e(t).parents("table").hasClass("month2"),
                        r = n ? a.month2 : a.month1;
                    r = F(r), !a.singleMonth && !a.singleDate && !n && N(r, a.month2) >= 0 || _(r) || (Y(r, n ? "month2" : "month1"), W())
                }

                function i(e) {
                    var t = F(a.month1),
                        n = F(a.month2);
                    _(n) || !a.singleDate && N(t, n) >= 0 || (Y(t, "month1"), Y(n, "month2"), S())
                }

                function o(t) {
                    var n = e(t).parents("table").hasClass("month2"),
                        r = n ? a.month2 : a.month1;
                    r = H(r),
                        n && N(r, a.month1) <= 0 || _(r) || (Y(r, n ? "month2" : "month1"), W())
                }

                function d(e) {
                    var t = H(a.month1),
                        n = H(a.month2);
                    _(t) || !a.singleDate && N(n, t) <= 0 || (Y(n, "month2"), Y(t, "month1"), S())
                }

                var l = this;
                if (e(this).data("date-picker-opened")) return void A();
                e(this).data("date-picker-opened", !0),
                    re = q().hide(),
                    re.append('<div class="date-range-length-tip"></div>'),
                    re.delegate(".day", "mouseleave",
                        function() {
                            re.find(".date-range-length-tip").hide(),
                                a.singleDate && x()
                        }),
                    e(a.container).append(re),
                    a.inline ? re.addClass("inline-wrapper") : s(),
                    a.alwaysOpen && re.find(".apply-btn").hide();
                var m = ae();
                if (ne(m), a.time.enabled)
                    if (a.startDate && a.endDate || a.start && a.end) P(t(a.start || a.startDate).toDate(), "time1"),
                        P(t(a.end || a.endDate).toDate(), "time2");
                    else {
                        var c = a.defaultEndTime ? a.defaultEndTime : m;
                        P(m, "time1"),
                            P(c, "time2")
                    }
                var h = "";
                h = te(a.singleDate ? "default-single" : a.minDays && a.maxDays ? "default-range" : a.minDays ? "default-more" : a.maxDays ? "default-less" : "default-default"),
                    re.find(".default-top").html(h.replace(/\%d/, a.minDays).replace(/\%d/, a.maxDays)),
                    a.singleMonth ? re.addClass("single-month") : re.addClass("two-months"),
                    setTimeout(function() {
                            u(),
                                oe = !0
                        },
                        0),
                    re.click(function(e) {
                        e.stopPropagation()
                    }),
                    e(document).bind("click.datepicker",
                        function(e) {
                            n(e, l[0]) || re.is(":visible") && A()
                        }),
                    re.find(".next").click(function() {
                        a.stickyMonths ? i(this) : r(this)
                    }),
                    re.find(".prev").click(function() {
                        a.stickyMonths ? d(this) : o(this)
                    }),
                    re.delegate(".day", "click",
                        function(t) {
                            k(e(this))
                        }),
                    re.delegate(".day", "mouseenter",
                        function(t) {
                            D(e(this))
                        }),
                    re.delegate(".week-number", "click",
                        function(t) {
                            y(e(this))
                        }),
                    re.attr("unselectable", "on").css("user-select", "none").bind("selectstart",
                        function(e) {
                            return e.preventDefault(), !1
                        }),
                    re.find(".apply-btn").click(function() {
                        A();
                        var t = V(new Date(a.start)) + a.separator + V(new Date(a.end));
                        e(l).trigger("datepicker-apply", {
                            value: t,
                            date1: new Date(a.start),
                            date2: new Date(a.end)
                        })
                    }),
                    re.find(".empty-btn").click(function(evt) {
                        evt.stopPropagation();
                        f();
                        A();
                        e(l).trigger("datepicker-empty", {
                            value: '',
                            date1: '',
                            date2: ''
                        })
                    }),
                    re.find("[custom]").click(function() {
                        var t = e(this).attr("custom");
                        a.start = !1,
                            a.end = !1,
                            re.find(".day.checked").removeClass("checked"),
                            a.setValue.call(le, t),
                            z(),
                            C(!0),
                            S(),
                            a.autoClose && A()
                    }),
                    re.find("[shortcut]").click(function() {
                        var t, n = e(this).attr("shortcut"),
                            r = new Date,
                            s = !1;
                        if (-1 != n.indexOf("day")) {
                            var i = parseInt(n.split(",", 2)[1], 10);
                            s = new Date((new Date).getTime() + 864e5 * i),
                                r = new Date(r.getTime() + 864e5 * (i > 0 ? 1 : -1))
                        } else if (-1 != n.indexOf("week")) {
                            t = -1 != n.indexOf("prev,") ? -1 : 1;
                            var o;
                            for (o = 1 == t ? "monday" == a.startOfWeek ? 1 : 0 : "monday" == a.startOfWeek ? 0 : 6, r = new Date(r.getTime() - 864e5); r.getDay() != o;) r = new Date(r.getTime() + 864e5 * t);
                            s = new Date(r.getTime() + 864e5 * t * 6)
                        } else if (-1 != n.indexOf("month")) t = -1 != n.indexOf("prev,") ? -1 : 1,
                            s = 1 == t ? F(r) : H(r),
                            s.setDate(1),
                            r = F(s),
                            r.setDate(1),
                            r = new Date(r.getTime() - 864e5);
                        else if (-1 != n.indexOf("year")) t = -1 != n.indexOf("prev,") ? -1 : 1,
                            s = new Date,
                            s.setFullYear(r.getFullYear() + t),
                            s.setMonth(0),
                            s.setDate(1),
                            r.setFullYear(r.getFullYear() + t),
                            r.setMonth(11),
                            r.setDate(31);
                        else if ("custom" == n) {
                            var d = e(this).html();
                            if (a.customShortcuts && a.customShortcuts.length > 0)
                                for (var l = 0; l < a.customShortcuts.length; l++) {
                                    var u = a.customShortcuts[l];
                                    if (u.name == d) {
                                        var m = [];
                                        if (m = u.dates.call(), m && 2 == m.length && (s = m[0], r = m[1]), m && 1 == m.length) {
                                            var c = m[0];
                                            Y(c, "month1"),
                                                Y(F(c), "month2"),
                                                W()
                                        }
                                        break
                                    }
                                }
                        }
                        s && r && (T(s, r), z())
                    }),
                    re.find(".time1 input[type=range]").bind("change touchmove mousemove",
                        function(t) {
                            var a = t.target,
                                n = "hour" == a.name ? e(a).val().replace(/^(\d{1})$/, "0$1") : void 0,
                                r = "minute" == a.name ? e(a).val().replace(/^(\d{1})$/, "0$1") : void 0;
                            p("time1", n, r)
                        }),
                    re.find(".time2 input[type=range]").bind("change touchmove mousemove",
                        function(t) {
                            var a = t.target,
                                n = "hour" == a.name ? e(a).val().replace(/^(\d{1})$/, "0$1") : void 0,
                                r = "minute" == a.name ? e(a).val().replace(/^(\d{1})$/, "0$1") : void 0;
                            p("time2", n, r)
                        })
            }

            function s() {
                if (!a.inline) {
                    var t = e(de).offset();
                    if ("relative" == e(a.container).css("position")) {
                        var n = e(a.container).offset();
                        re.css({
                            top: t.top - n.top + e(de).outerHeight() + 4,
                            left: t.left - n.left
                        })
                    } else {
                        var left, top;
                        var screenWidth = document.body.scrollWidth;
                        if (re.width() < screenWidth - t.left) {
                            left = t.left;
                        } else {
                            left = t.left + e(de).outerWidth() - e(re).outerWidth();
                        }

                        var screenHeight = e(window).height() + document.body.scrollTop;
                        //var screenHeight = document.body.offsetHeight;
                        if (screenHeight - t.top - e(de).outerHeight() + 2 > re.height()) {
                            var fixTop = 0;
                            //if(screenHeight-t.top-e(de).outerHeight()-re.height()<20){
                            //fixTop=screenHeight-t.top-e(de).outerHeight()-re.height();
                            //}
                            // top = t.top + e(de).outerHeight() + parseInt(e("body").css("border-top") || 0, 10) - fixTop;
                            top = t.top + e(de).outerHeight();
                        } else {
                            //top= t.top +  parseInt(e("body").css("border-top") || 0, 10)-re.height();
                            top = t.top - e(re).outerHeight();
                        }
                        re.css({
                            top: top,
                            left: left
                        })
                    }
                }
            }

            function i() {
                return re
            }

            function o(t) {
                s(),
                    B(),
                    d(),
                    a.customOpenAnimation ? a.customOpenAnimation.call(re.get(0),
                        function() {
                            e(de).trigger("datepicker-opened", {
                                relatedTarget: re
                            })
                        }) : re.slideDown(t,
                        function() {
                            e(de).trigger("datepicker-opened", {
                                relatedTarget: re
                            })
                        }),
                    e(de).trigger("datepicker-open", {
                        relatedTarget: re
                    }),
                    W(),
                    u()
            }

            function d() {
                var e = a.getValue.call(le),
                    n = e ? e.split(a.separator) : "";
                if (n && (1 == n.length && a.singleDate || n.length >= 2)) {
                    var r = a.format;
                    r.match(/Do/) && (r = r.replace(/Do/, "D"), n[0] = n[0].replace(/(\d+)(th|nd|st)/, "$1"), n.length >= 2 && (n[1] = n[1].replace(/(\d+)(th|nd|st)/, "$1"))),
                        oe = !1,
                        n.length >= 2 ? T(l(n[0], r, t.locale(a.language)), l(n[1], r, t.locale(a.language))) : 1 == n.length && a.singleDate && j(l(n[0], r, t.locale(a.language))),
                        oe = !0
                }
            }

            function l(e, a, n) {
                return t(e, a, n).isValid() ? t(e, a, n).toDate() : t().toDate()
            }

            function u() {
                var e = re.find(".gap").css("margin-left");
                e && (e = parseInt(e));
                var t = re.find(".month1").width(),
                    a = re.find(".gap").width() + (e ? 2 * e : 0),
                    n = re.find(".month2").width();
                re.find(".month-wrapper").width(t + a + n + 2)
            }

            function m(e, a) {
                re.find("." + e + " input[type=range].hour-range").val(t(a).hours()),
                    re.find("." + e + " input[type=range].minute-range").val(t(a).minutes()),
                    p(e, t(a).format("HH"), t(a).format("mm"))
            }

            function c(e, n) {
                a[e] = parseInt(t(parseInt(n)).startOf("day").add(t(a[e + "Time"]).format("HH"), "h").add(t(a[e + "Time"]).format("mm"), "m").valueOf())
            }

            function h() {
                m("time1", a.start),
                    m("time2", a.end)
            }

            function p(e, n, r) {
                function s(e, t) {
                    var s = t.format("HH"),
                        i = t.format("mm");
                    a[e] = t.startOf("day").add(n || s, "h").add(r || i, "m").valueOf()
                }

                switch (n && re.find("." + e + " .hour-val").text(n), r && re.find("." + e + " .minute-val").text(r), e) {
                    case "time1":
                        a.start && s("start", t(a.start)),
                            s("startTime", t(a.startTime || t().valueOf()));
                        break;
                    case "time2":
                        a.end && s("end", t(a.end)),
                            s("endTime", t(a.endTime || t().valueOf()))
                }
                z(),
                    C(),
                    S()
            }

            function f() {
                a.start = !1,
                    a.end = !1,
                    re.find(".day.checked").removeClass("checked"),
                    re.find(".day.last-date-selected").removeClass("last-date-selected"),
                    re.find(".day.first-date-selected").removeClass("first-date-selected"),
                    a.setValue.call(le, ""),
                    z(),
                    C(),
                    S()
            }

            function v(e) {
                var n = e;
                return "week-range" === a.batchMode ? n = "monday" === a.startOfWeek ? t(parseInt(e)).startOf("isoweek").valueOf() : t(parseInt(e)).startOf("week").valueOf() : "month-range" === a.batchMode && (n = t(parseInt(e)).startOf("month").valueOf()),
                    n
            }

            function g(e) {
                var n = e;
                return "week-range" === a.batchMode ? n = "monday" === a.startOfWeek ? t(parseInt(e)).endOf("isoweek").valueOf() : t(parseInt(e)).endOf("week").valueOf() : "month-range" === a.batchMode && (n = t(parseInt(e)).endOf("month").valueOf()),
                    n
            }

            function k(n) {
                if (!n.hasClass("invalid")) {
                    var r = n.attr("time");
                    if (n.addClass("checked"), a.singleDate ? (a.start = r, a.end = !1) : "week" === a.batchMode ? "monday" === a.startOfWeek ? (a.start = t(parseInt(r)).startOf("isoweek").valueOf(), a.end = t(parseInt(r)).endOf("isoweek").valueOf()) : (a.end = t(parseInt(r)).endOf("week").valueOf(), a.start = t(parseInt(r)).startOf("week").valueOf()) : "workweek" === a.batchMode ? (a.start = t(parseInt(r)).day(1).valueOf(), a.end = t(parseInt(r)).day(5).valueOf()) : "weekend" === a.batchMode ? (a.start = t(parseInt(r)).day(6).valueOf(), a.end = t(parseInt(r)).day(7).valueOf()) : "month" === a.batchMode ? (a.start = t(parseInt(r)).startOf("month").valueOf(), a.end = t(parseInt(r)).endOf("month").valueOf()) : a.start && a.end || !a.start && !a.end ? (a.start = v(r), a.end = !1) : a.start && (a.end = g(r), a.time.enabled && c("end", a.end)), a.time.enabled && (a.start && c("start", a.start), a.end && c("end", a.end)), !a.singleDate && a.start && a.end && a.start > a.end) {
                        var s = a.end;
                        a.end = g(a.start),
                            a.start = v(s),
                            a.time.enabled && a.swapTime && h()
                    }
                    a.start = parseInt(a.start),
                        a.end = parseInt(a.end),
                        x(),
                        a.start && !a.end && (e(de).trigger("datepicker-first-date-selected", {
                            date1: new Date(a.start)
                        }), D(n)),
                        b(r),
                        z(),
                        C(),
                        S(),
                        M()
                }
            }

            function y(e) {
                var n, r, s = parseInt(e.attr("data-start-time"), 10);
                a.startWeek ? (re.find(".week-number-selected").removeClass("week-number-selected"), n = new Date(s < a.startWeek ? s : a.startWeek), r = new Date(s < a.startWeek ? a.startWeek : s), a.startWeek = !1, a.start = t(n).day("monday" == a.startOfWeek ? 1 : 0).valueOf(), a.end = t(r).day("monday" == a.startOfWeek ? 7 : 6).valueOf()) : (a.startWeek = s, e.addClass("week-number-selected"), n = new Date(s), a.start = t(n).day("monday" == a.startOfWeek ? 1 : 0).valueOf(), a.end = t(n).day("monday" == a.startOfWeek ? 7 : 6).valueOf()),
                    b(),
                    z(),
                    C(),
                    S(),
                    M()
            }

            function w(e) {
                if (e = parseInt(e, 10), a.startDate && L(e, a.startDate) < 0) return !1;
                if (a.endDate && L(e, a.endDate) > 0) return !1;
                if (a.start && !a.end && !a.singleDate) {
                    if (a.maxDays > 0 && O(e, a.start) > a.maxDays) return !1;
                    if (a.minDays > 0 && O(e, a.start) < a.minDays) return !1;
                    if (a.selectForward && e < a.start) return !1;
                    if (a.selectBackward && e > a.start) return !1;
                    if (a.beforeShowDay && "function" == typeof a.beforeShowDay) {
                        for (var t = !0,
                                n = e; O(n, a.start) > 1;) {
                            var r = a.beforeShowDay(new Date(n));
                            if (!r[0]) {
                                t = !1;
                                break
                            }
                            if (Math.abs(n - a.start) < 864e5) break;
                            n > a.start && (n -= 864e5),
                                n < a.start && (n += 864e5)
                        }
                        if (!t) return !1
                    }
                }
                return !0
            }

            function b() {
                return re.find(".day.invalid.tmp").removeClass("tmp invalid").addClass("valid"),
                    a.start && !a.end && re.find(".day.toMonth.valid").each(function() {
                        var t = parseInt(e(this).attr("time"), 10);
                        w(t) ? e(this).addClass("valid tmp").removeClass("invalid") : e(this).addClass("invalid tmp").removeClass("valid")
                    }), !0
            }

            function D(t) {
                var n = parseInt(t.attr("time")),
                    r = "";
                if (t.hasClass("has-tooltip") && t.attr("data-tooltip")) r = '<span style="white-space:nowrap">' + t.attr("data-tooltip") + "</span>";
                else if (!t.hasClass("invalid"))
                    if (a.singleDate) re.find(".day.hovering").removeClass("hovering"),
                        t.addClass("hovering");
                    else if (re.find(".day").each(function() {
                        var t = parseInt(e(this).attr("time"));
                        a.start,
                            a.end;
                        t == n ? e(this).addClass("hovering") : e(this).removeClass("hovering"),
                            a.start && !a.end && (a.start < t && n >= t || a.start > t && t >= n) ? e(this).addClass("hovering") : e(this).removeClass("hovering")
                    }), a.start && !a.end) {
                    var s = O(n, a.start);
                    a.hoveringTooltip && ("function" == typeof a.hoveringTooltip ? r = a.hoveringTooltip(s, a.start, n) : a.hoveringTooltip === !0 && s > 1 && (r = s + " " + te("days")))
                }
                if (r) {
                    var i = t.offset(),
                        o = re.offset(),
                        d = i.left - o.left,
                        l = i.top - o.top;
                    d += t.width() / 2;
                    var u = re.find(".date-range-length-tip"),
                        m = u.css({
                            visibility: "hidden",
                            display: "none"
                        }).html(r).width(),
                        c = u.height();
                    d -= m / 2,
                        l -= c,
                        setTimeout(function() {
                                u.css({
                                    left: d,
                                    top: l,
                                    display: "block",
                                    visibility: "visible"
                                })
                            },
                            10)
                } else re.find(".date-range-length-tip").hide()
            }

            function x() {
                re.find(".day.hovering").removeClass("hovering"),
                    re.find(".date-range-length-tip").hide()
            }

            function M() {
                a.singleDate === !0 ? oe && a.start && a.autoClose && A() : oe && a.start && a.end && a.autoClose && A()
            }

            function z() {
                var e = Math.ceil((a.end - a.start) / 864e5) + 1;
                a.singleDate ? a.start && !a.end ? re.find(".drp_top-bar").removeClass("error").addClass("normal") : re.find(".drp_top-bar").removeClass("error").removeClass("normal") : a.maxDays && e > a.maxDays ? (a.start = !1, a.end = !1, re.find(".day").removeClass("checked"), re.find(".drp_top-bar").removeClass("normal").addClass("error").find(".error-top").html(te("less-than").replace("%d", a.maxDays))) : a.minDays && e < a.minDays ? (a.start = !1, a.end = !1, re.find(".day").removeClass("checked"), re.find(".drp_top-bar").removeClass("normal").addClass("error").find(".error-top").html(te("more-than").replace("%d", a.minDays))) : a.start || a.end ? re.find(".drp_top-bar").removeClass("error").addClass("normal") : re.find(".drp_top-bar").removeClass("error").removeClass("normal"),
                    a.singleDate && a.start && !a.end || !a.singleDate && a.start && a.end ? re.find(".apply-btn").removeClass("disabled") : re.find(".apply-btn").addClass("disabled"),
                    a.batchMode && (a.start && a.startDate && L(a.start, a.startDate) < 0 || a.end && a.endDate && L(a.end, a.endDate) > 0) && (a.start = !1, a.end = !1, re.find(".day").removeClass("checked"))
            }

            function C(t, n) {
                re.find(".start-day").html("..."),
                    re.find(".end-day").html("..."),
                    re.find(".selected-days").hide(),
                    a.start && re.find(".start-day").html(V(new Date(parseInt(a.start)))),
                    a.end && re.find(".end-day").html(V(new Date(parseInt(a.end))));
                var r;
                a.start && a.singleDate ? (re.find(".apply-btn").removeClass("disabled"), r = V(new Date(a.start)), a.setValue.call(le, r, V(new Date(a.start)), V(new Date(a.end))), oe && !n && e(de).trigger("datepicker-change", {
                    value: r,
                    date1: new Date(a.start)
                })) : a.start && a.end ? (re.find(".selected-days").show().find(".selected-days-num").html(O(a.end, a.start)), re.find(".apply-btn").removeClass("disabled"), r = V(new Date(a.start)) + a.separator + V(new Date(a.end)), a.setValue.call(le, r, V(new Date(a.start)), V(new Date(a.end))), oe && !n && e(de).trigger("datepicker-change", {
                    value: r,
                    date1: new Date(a.start),
                    date2: new Date(a.end)
                })) : t ? re.find(".apply-btn").removeClass("disabled") : re.find(".apply-btn").addClass("disabled")
            }

            function O(e, t) {
                return Math.abs(Q(e) - Q(t)) + 1
            }

            function T(e, t, n) {
                if (e.getTime() > t.getTime()) {
                    var r = t;
                    t = e,
                        e = r,
                        r = null
                }
                var s = !0;
                return a.startDate && L(e, a.startDate) < 0 && (s = !1),
                    a.endDate && L(t, a.endDate) > 0 && (s = !1),
                    s ? (a.start = e.getTime(), a.end = t.getTime(), a.time.enabled && (m("time1", e), m("time2", t)), (a.stickyMonths || L(e, t) > 0 && 0 === N(e, t)) && (a.lookBehind ? e = H(t) : t = F(e)), a.stickyMonths && N(t, a.endDate) > 0 && (e = H(e), t = H(t)), a.stickyMonths || 0 === N(e, t) && (a.lookBehind ? e = H(t) : t = F(e)), Y(e, "month1"), Y(t, "month2"), W(), z(), C(!1, n), void M()) : (Y(a.startDate, "month1"), Y(F(a.startDate), "month2"), void W())
            }

            function j(e) {
                var t = !0;
                if (a.startDate && L(e, a.startDate) < 0 && (t = !1), a.endDate && L(e, a.endDate) > 0 && (t = !1), !t) return void Y(a.startDate, "month1");
                if (a.start = e.getTime(), a.time.enabled && m("time1", e), Y(e, "month1"), a.singleMonth !== !0) {
                    var n = F(e);
                    Y(n, "month2")
                }
                W(),
                    C(),
                    M()
            }

            function S() {
                (a.start || a.end) && (re.find(".day").each(function() {
                    var n = parseInt(e(this).attr("time")),
                        r = a.start,
                        s = a.end;
                    a.time.enabled && (n = t(n).startOf("day").valueOf(), r = t(r || t().valueOf()).startOf("day").valueOf(), s = t(s || t().valueOf()).startOf("day").valueOf()),
                        a.start && a.end && s >= n && n >= r || a.start && !a.end && t(r).format("YYYY-MM-DD") == t(n).format("YYYY-MM-DD") ? e(this).addClass("checked") : e(this).removeClass("checked"),
                        a.start && t(r).format("YYYY-MM-DD") == t(n).format("YYYY-MM-DD") ? e(this).addClass("first-date-selected") : e(this).removeClass("first-date-selected"),
                        a.end && t(s).format("YYYY-MM-DD") == t(n).format("YYYY-MM-DD") ? e(this).addClass("last-date-selected") : e(this).removeClass("last-date-selected")
                }), re.find(".week-number").each(function() {
                    e(this).attr("data-start-time") == a.startWeek && e(this).addClass("week-number-selected")
                }))
            }

            function Y(e, n) {
                e = t(e).toDate();
                var r = I(e.getMonth());
                re.find("." + n + " .month-name").html(r + " " + e.getFullYear()),
                    re.find("." + n + " tbody").html(Z(e)),
                    a[n] = e,
                    b()
            }

            function P(e, t) {
                re.find("." + t).append(R()),
                    m(t, e)
            }

            function I(e) {
                return te("month-name")[e]
            }

            function V(e) {
                return t(e).format(a.format)
            }

            function W() {
                S();
                var e = parseInt(t(a.month1).format("YYYYMM")),
                    n = parseInt(t(a.month2).format("YYYYMM")),
                    r = Math.abs(e - n),
                    s = r > 1 && 89 != r;
                s ? re.addClass("has-gap").removeClass("no-gap").find(".gap").css("visibility", "visible") : re.removeClass("has-gap").addClass("no-gap").find(".gap").css("visibility", "hidden");
                var i = re.find("table.month1").height(),
                    o = re.find("table.month2").height();
                re.find(".gap").height(Math.max(i, o) + 10)
            }

            function A() {
                if (!a.alwaysOpen) {
                    var t = function() {
                        e(de).data("date-picker-opened", !1),
                            e(de).trigger("datepicker-closed", {
                                relatedTarget: re
                            })
                    };
                    a.customCloseAnimation ? a.customCloseAnimation.call(re.get(0), t) : e(re).slideUp(a.duration, t),
                        e(de).trigger("datepicker-close", {
                            relatedTarget: re
                        })
                }
            }

            function B() {
                Y(a.month1, "month1"),
                    Y(a.month2, "month2")
            }

            function N(e, a) {
                var n = parseInt(t(e).format("YYYYMM")) - parseInt(t(a).format("YYYYMM"));
                return n > 0 ? 1 : 0 === n ? 0 : -1
            }

            function L(e, a) {
                var n = parseInt(t(e).format("YYYYMMDD")) - parseInt(t(a).format("YYYYMMDD"));
                return n > 0 ? 1 : 0 === n ? 0 : -1
            }

            function F(e) {
                return t(e).add(1, "months").toDate()
            }

            function H(e) {
                return t(e).add(-1, "months").toDate()
            }

            function R() {
                return "<div><span>" + te("Time") + ': <span class="hour-val">00</span>:<span class="minute-val">00</span></span></div><div class="hour"><label>' + te("Hour") + ': <input type="range" class="hour-range" name="hour" min="0" max="23"></label></div><div class="minute"><label>' + te("Minute") + ': <input type="range" class="minute-range" name="minute" min="0" max="59"></label></div>'
            }

            function q() {
                var t = '<div class="date-picker-wrapper';
                a.extraClass && (t += " " + a.extraClass + " "),
                    a.singleDate && (t += " single-date "),
                    a.showShortcuts || (t += " no-shortcuts "),
                    a.showTopbar || (t += " no-topbar "),
                    a.customTopBar && (t += " custom-topbar "),
                    t += '">',
                    a.showTopbar && (
                        t += '<div class="drp_top-bar">',
                        a.customTopBar ?
                        ("function" == typeof a.customTopBar && (a.customTopBar = a.customTopBar()), t += '<div class="custom-top">' + a.customTopBar + "</div>") :
                        (t += '<div class="normal-top"><span style="color:#333">' + te("selected") + ' </span> <b class="start-day">...</b>',
                            a.singleDate || (
                                t += ' <span class="separator-day">' + a.separator + '</span> <b class="end-day">...</b> <i class="selected-days">(<span class="selected-days-num">3</span> ' + te("days") + ")</i>"),
                            t += "</div>",
                            t += '<div class="error-top">error</div><div class="default-top">default</div>'
                        ),

                        t += '<div class="btn-div"><input type="button" class="apply-btn disabled' + $() + '" value="' + te("apply") + '" /><input type="button" class="empty-btn disabled" value="清空" /></div>',
                        t += "</div>"
                    );
                var n = a.showWeekNumbers ? 6 : 5;
                if (t += '<div class="month-wrapper"><table class="month1" cellspacing="0" border="0" cellpadding="0"><thead><tr class="caption"><th style="width:27px;"><span class="prev">&lt;</span></th><th colspan="' + n + '" class="month-name"></th><th style="width:27px;">' + (a.singleDate || !a.stickyMonths ? '<span class="next">&gt;</span>' : "") + '</th></tr><tr class="week-name">' + E() + "</thead><tbody></tbody></table>", G() && (t += '<div class="gap">' + J() + '</div><table class="month2" cellspacing="0" border="0" cellpadding="0"><thead><tr class="caption"><th style="width:27px;">' + (a.stickyMonths ? "" : '<span class="prev">&lt;</span>') + '</th><th colspan="' + n + '" class="month-name"></th><th style="width:27px;"><span class="next">&gt;</span></th></tr><tr class="week-name">' + E() + "</thead><tbody></tbody></table>"), t += '<div style="clear:both;height:0;font-size:0;"></div><div class="time"><div class="time1"></div>', a.singleDate || (t += '<div class="time2"></div>'), t += '</div><div style="clear:both;height:0;font-size:0;"></div></div>', t += '<div class="footer">', a.showShortcuts) {
                    t += '<div class="shortcuts"><b>' + te("shortcuts") + "</b>";
                    var r = a.shortcuts;
                    if (r) {
                        var s;
                        if (r["prev-days"] && r["prev-days"].length > 0) {
                            t += '&nbsp;<span class="prev-days">' + te("past");
                            for (var i = 0; i < r["prev-days"].length; i++) s = r["prev-days"][i],
                                s += te(r["prev-days"][i] > 1 ? "days" : "day"),
                                t += ' <a href="javascript:;" shortcut="day,-' + r["prev-days"][i] + '">' + s + "</a>";
                            t += "</span>"
                        }
                        if (r["next-days"] && r["next-days"].length > 0) {
                            t += '&nbsp;<span class="next-days">' + te("following");
                            for (var i = 0; i < r["next-days"].length; i++) s = r["next-days"][i],
                                s += te(r["next-days"][i] > 1 ? "days" : "day"),
                                t += ' <a href="javascript:;" shortcut="day,' + r["next-days"][i] + '">' + s + "</a>";
                            t += "</span>"
                        }
                        if (r.prev && r.prev.length > 0) {
                            t += '&nbsp;<span class="prev-buttons">' + te("previous");
                            for (var i = 0; i < r.prev.length; i++) s = te("prev-" + r.prev[i]),
                                t += ' <a href="javascript:;" shortcut="prev,' + r.prev[i] + '">' + s + "</a>";
                            t += "</span>"
                        }
                        if (r.next && r.next.length > 0) {
                            t += '&nbsp;<span class="next-buttons">' + te("next");
                            for (var i = 0; i < r.next.length; i++) s = te("next-" + r.next[i]),
                                t += ' <a href="javascript:;" shortcut="next,' + r.next[i] + '">' + s + "</a>";
                            t += "</span>"
                        }
                    }
                    if (a.customShortcuts)
                        for (var i = 0; i < a.customShortcuts.length; i++) {
                            var o = a.customShortcuts[i];
                            t += '&nbsp;<span class="custom-shortcut"><a href="javascript:;" shortcut="custom">' + o.name + "</a></span>"
                        }
                    t += "</div>"
                }
                if (a.showCustomValues && (t += '<div class="customValues"><b>' + (a.customValueLabel || te("custom-values")) + "</b>", a.customValues))
                    for (var i = 0; i < a.customValues.length; i++) {
                        var d = a.customValues[i];
                        t += '&nbsp;<span class="custom-value"><a href="javascript:;" custom="' + d.value + '">' + d.name + "</a></span>"
                    }
                return t += "</div></div>",
                    e(t)
            }

            function $() {
                var e = "";
                return a.autoClose === !0 && (e += " hide"),
                    "" !== a.applyBtnClass && (e += " " + a.applyBtnClass),
                    e
            }

            function E() {
                var e = a.showWeekNumbers ? "<th>" + te("week-number") + "</th>" : "";
                return "monday" == a.startOfWeek ? e + "<th>" + te("week-1") + "</th><th>" + te("week-2") + "</th><th>" + te("week-3") + "</th><th>" + te("week-4") + "</th><th>" + te("week-5") + "</th><th>" + te("week-6") + "</th><th>" + te("week-7") + "</th>" : e + "<th>" + te("week-7") + "</th><th>" + te("week-1") + "</th><th>" + te("week-2") + "</th><th>" + te("week-3") + "</th><th>" + te("week-4") + "</th><th>" + te("week-5") + "</th><th>" + te("week-6") + "</th>"
            }

            function _(e) {
                return e = t(e),
                    a.startDate && e.endOf("month").isBefore(a.startDate) ? !0 : !(!a.endDate || !e.startOf("month").isAfter(a.endDate))
            }

            function J() {
                for (var e = ['<div class="gap-top-mask"></div><div class="gap-bottom-mask"></div><div class="gap-lines">'], t = 0; 20 > t; t++) e.push('<div class="gap-line"><div class="gap-1"></div><div class="gap-2"></div><div class="gap-3"></div></div>');
                return e.push("</div>"),
                    e.join("")
            }

            function G() {
                return !a.singleMonth
            }

            function K(e, t, a) {
                var n = jQuery.extend(!0, {},
                    e);
                jQuery.each(t,
                    function(e, t) {
                        var r = t(a);
                        for (var s in r) n.hasOwnProperty(s) ? n[s] += r[s] : n[s] = r[s]
                    });
                var r = "";
                for (var s in n) n.hasOwnProperty(s) && (r += s + '="' + n[s] + '" ');
                return r
            }

            function Q(e) {
                return Math.floor(U(e) / 864e5)
            }

            function U(e) {
                return t.isMoment(e) && (e = e.toDate().getTime()),
                    "object" == typeof e && e.getTime && (e = e.getTime()),
                    "string" != typeof e || e.match(/\d{13}/) || (e = t(e, a.format).toDate().getTime()),
                    e = parseInt(e, 10) - 60 * (new Date).getTimezoneOffset() * 1e3
            }

            function Z(e) {
                var n = [];
                e.setDate(1);
                var r = (new Date(e.getTime() - 864e5), new Date),
                    s = e.getDay();
                0 === s && "monday" === a.startOfWeek && (s = 7);
                var i, o;
                if (s > 0)
                    for (var d = s; d > 0; d--) {
                        var l = new Date(e.getTime() - 864e5 * d);
                        o = w(l.getTime()),
                            a.startDate && L(l, a.startDate) < 0 && (o = !1),
                            a.endDate && L(l, a.endDate) > 0 && (o = !1),
                            n.push({
                                date: l,
                                type: "lastMonth",
                                day: l.getDate(),
                                time: l.getTime(),
                                valid: o
                            })
                    }
                for (var u = e.getMonth(), d = 0; 40 > d; d++) i = t(e).add(d, "days").toDate(),
                    o = w(i.getTime()),
                    a.startDate && L(i, a.startDate) < 0 && (o = !1),
                    a.endDate && L(i, a.endDate) > 0 && (o = !1),
                    n.push({
                        date: i,
                        type: i.getMonth() == u ? "toMonth" : "nextMonth",
                        day: i.getDate(),
                        time: i.getTime(),
                        valid: o
                    });
                for (var m = [], c = 0; 6 > c && "nextMonth" != n[7 * c].type; c++) {
                    m.push("<tr>");
                    for (var l = 0; 7 > l; l++) {
                        var h = "monday" == a.startOfWeek ? l + 1 : l;
                        i = n[7 * c + h];
                        var p = t(i.time).format("L") == t(r).format("L");
                        if (i.extraClass = "", i.tooltip = "", i.valid && a.beforeShowDay && "function" == typeof a.beforeShowDay) {
                            var f = a.beforeShowDay(t(i.time).toDate());
                            i.valid = f[0],
                                i.extraClass = f[1] || "",
                                i.tooltip = f[2] || "",
                                "" !== i.tooltip && (i.extraClass += " has-tooltip ")
                        }
                        var v = {
                            time: i.time,
                            "data-tooltip": i.tooltip,
                            "class": "day " + i.type + " " + i.extraClass + " " + (i.valid ? "valid" : "invalid") + " " + (p ? "real-today" : "")
                        };
                        0 === l && a.showWeekNumbers && m.push('<td><div class="week-number" data-start-time="' + i.time + '">' + a.getWeekNumber(i.date) + "</div></td>"),
                            m.push("<td " + K({},
                                a.dayTdAttrs, i) + "><div " + K(v, a.dayDivAttrs, i) + ">" + X(i.time, i.day) + "</div></td>")
                    }
                    m.push("</tr>")
                }
                return m.join("")
            }

            function X(e, t) {
                return a.showDateFilter && "function" == typeof a.showDateFilter ? a.showDateFilter(e, t) : t
            }

            function ee() {
                if ("auto" == a.language) {
                    var t = navigator.language ? navigator.language : navigator.browserLanguage;
                    if (!t) return e.dateRangePickerLanguages["default"];
                    t = t.toLowerCase();
                    for (var n in e.dateRangePickerLanguages)
                        if (-1 !== t.indexOf(n)) return e.dateRangePickerLanguages[n];
                    return e.dateRangePickerLanguages["default"]
                }
                return a.language && a.language in e.dateRangePickerLanguages ? e.dateRangePickerLanguages[a.language] : e.dateRangePickerLanguages["default"]
            }

            function te(t) {
                var a = t.toLowerCase(),
                    n = t in ie ? ie[t] : a in ie ? ie[a] : null,
                    r = e.dateRangePickerLanguages["default"];
                return null == n && (n = t in r ? r[t] : a in r ? r[a] : ""),
                    n
            }

            function ae() {
                var e = a.defaultTime ? a.defaultTime : new Date;
                return a.lookBehind ? (a.startDate && N(e, a.startDate) < 0 && (e = F(t(a.startDate).toDate())), a.endDate && N(e, a.endDate) > 0 && (e = t(a.endDate).toDate())) : (a.startDate && N(e, a.startDate) < 0 && (e = t(a.startDate).toDate()), a.endDate && N(F(e), a.endDate) > 0 && (e = H(t(a.endDate).toDate()))),
                    a.singleDate && (a.startDate && N(e, a.startDate) < 0 && (e = t(a.startDate).toDate()), a.endDate && N(e, a.endDate) > 0 && (e = t(a.endDate).toDate())),
                    e
            }

            function ne(e) {
                e || (e = ae()),
                    a.lookBehind ? (Y(H(e), "month1"), Y(e, "month2")) : (Y(e, "month1"), Y(F(e), "month2")),
                    a.singleDate && Y(e, "month1"),
                    S(),
                    W()
            }

            a || (a = {}),
                a = e.extend(!0, {
                        autoClose: !1,
                        format: "YYYY-MM-DD",
                        separator: " to ",
                        language: "auto",
                        startOfWeek: "sunday",
                        getValue: function() {
                            return e(this).val()
                        },
                        setValue: function(t) {
                            e(this).attr("readonly") || e(this).is(":disabled") || t == e(this).val() || e(this).val(t)
                        },
                        startDate: !1,
                        endDate: !1,
                        time: {
                            enabled: !1
                        },
                        minDays: 0,
                        maxDays: 0,
                        showShortcuts: !1,
                        shortcuts: {},
                        customShortcuts: [],
                        inline: !1,
                        container: "body",
                        alwaysOpen: !1,
                        singleDate: !1,
                        lookBehind: !1,
                        batchMode: !1,
                        duration: 200,
                        stickyMonths: !1,
                        dayDivAttrs: [],
                        dayTdAttrs: [],
                        selectForward: !1,
                        selectBackward: !1,
                        applyBtnClass: "",
                        singleMonth: "auto",
                        hoveringTooltip: function(e, t, a) {
                            return e > 1 ? e + " " + te("days") : ""
                        },
                        showTopbar: !0,
                        swapTime: !1,
                        showWeekNumbers: !1,
                        getWeekNumber: function(e) {
                            return t(e).format("w")
                        },
                        customOpenAnimation: null,
                        customCloseAnimation: null
                    },
                    a),
                a.start = !1,
                a.end = !1,
                a.startWeek = !1,
                a.isTouchDevice = "ontouchstart" in window || navigator.msMaxTouchPoints,
                a.isTouchDevice && (a.hoveringTooltip = !1),
                "auto" == a.singleMonth && (a.singleMonth = e(window).width() < 480),
                a.singleMonth && (a.stickyMonths = !1),
                a.showTopbar || (a.autoClose = !0),
                a.startDate && "string" == typeof a.startDate && (a.startDate = t(a.startDate, a.format).toDate()),
                a.endDate && "string" == typeof a.endDate && (a.endDate = t(a.endDate, a.format).toDate());
            var re, se, ie = ee(),
                oe = !1,
                de = this,
                le = e(de).get(0);
            return e(this).unbind(".datepicker").bind("click.datepicker",
                    function(e) {
                        var t = re.is(":visible");
                        t || o(a.duration)
                    }).bind("change.datepicker",
                    function(e) {
                        d()
                    }).bind("keyup.datepicker",
                    function() {
                        try {
                            clearTimeout(se)
                        } catch (e) {}
                        se = setTimeout(function() {
                                d()
                            },
                            2e3)
                    }),
                r.call(this),
                a.alwaysOpen && o(0),
                e(this).data("dateRangePicker", {
                    setDateRange: function(e, n, r) {
                        "string" == typeof e && "string" == typeof n && (e = t(e, a.format).toDate(), n = t(n, a.format).toDate()),
                            T(e, n, r)
                    },
                    clear: f,
                    close: A,
                    open: o,
                    redraw: B,
                    getDatePicker: i,
                    resetMonthsView: ne,
                    destroy: function() {
                        e(de).unbind(".datepicker"),
                            e(de).data("dateRangePicker", ""),
                            e(de).data("date-picker-opened", null),
                            re.remove(),
                            e(window).unbind("resize.datepicker", s),
                            e(document).unbind("click.datepicker", A)
                    }
                }),
                e(window).bind("resize.datepicker", s),
                this
        }
});