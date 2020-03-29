/**
 * jiuiDatePicker
 * by wdbjsh
 */
requirejs.config({
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min'
    },
});
define(['jquery'], function(jquery) {
    var IUIdatePicker = function(opts) {
        var iuiDatePicker = this;
        this.opts = {
            autoClose: false, //自动关闭
            format: 'YYYY-MM-DD', //时间格式
            separator: ' 至 ',
            startOfWeek: '日', // or 一
            startDate: false, //可选时间范围 开始
            endDate: false, //可选时间范围 结束
            time: {
                enabled: false, //是否启用时间选择
                hourStep: 1, //小时的步长
                secondShow: false, //是否可以设置秒
                secondStep: 60, //秒的步长  默认是60秒，即只能设置 00
                minuteStep: 10 //分钟的步长 默认十分钟一格
            },
            clear: false, //清除时候的回调
            minDays: 0, //最大小天数
            maxDays: 0, //最大 天数
            container: 'body',
            singleDate: false,
            duration: 200,
            stickyMonths: false,
            singleMonth: false,
            showTopbar: true,
            singleMod: true,
            minYear: 2010,
            maxYear: 2030,
            showWeekNum: false, //暂时不实现
            selectMonth: false,
            attobj: null
        };
        var weekNames = ["日", "一", "二", "三", "四", "五", "六"];
        var monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
        var today = new Date();
        this.startTime, this.endTime, this.oldStartTime, this.oldEndTime, this.maxTime, this.minTime;
        this.opts = jQuery.extend(true, {}, this.opts, opts);

        if (this.opts.startTime || this.opts.value) {
            this.startTime = this.opts.startTime || this.opts.value;
            this.oldStartTime = this.startTime;
            //this.startTime = new Date(this.startTime);
        }
        if (this.opts.endDate) {
            this.maxTime = new Date(this.opts.endDate + " 00:00:00");

        }
        if (this.opts.startDate) {
            this.minTime = new Date(this.opts.startDate + " 00:00:00");
        }
        var topBar = {
            createDom: function() {
                this.dom = $("<div class='iui-datepicker-top '></div>");
                this.topStartDom = $("<div class='iui-datepicker-top-begin'></div>");
                this.topEndDom = $("<div class='iui-datepicker-top-end'></div>");
                this.toptoDom = $("<div class='iui-datepicker-top-to'></div>");
                this.topOkDom = $("<div class='iui-datepicker-top-ok'>确定</div>");
                this.topCancelDom = $("<div class='iui-datepicker-top-clear'>清空</div>");
                this.setTopShow();
                this.dom.append(this.topStartDom);
                !iuiDatePicker.opts.singleDate && this.dom.append(this.toptoDom);
                !iuiDatePicker.opts.singleDate && this.dom.append(this.topEndDom);
                !iuiDatePicker.opts.autoClose && this.dom.append(this.topOkDom);
                this.dom.append(this.topCancelDom);
                this.dom.append(this.topCancelDom);
                this.bindEvents();
                return this.dom;
            },
            setTopShow: function() {
                this.setBeginDom();
                this.setEndDom();
            },
            setEndDom: function() {
                if (iuiDatePicker.endTime) {
                    topBar.topEndDom.removeClass("error");
                    topBar.topEndDom.html(dateFormat(iuiDatePicker.endTime, iuiDatePicker.opts.format));
                } else {
                    this.topEndDom && this.topEndDom.html("选择结束时间");
                }
            },
            setBeginDom: function() {
                if (iuiDatePicker.startTime) {
                    topBar.topStartDom.html(dateFormat(iuiDatePicker.startTime, iuiDatePicker.opts.format));
                    topBar.topStartDom.removeClass("error");
                    topBar.topEndDom && topBar.topEndDom.html("选择结束时间")
                } else {
                    topBar.topStartDom.html("选择开始时间");
                }
            },
            bindEvents: function() {
                !iuiDatePicker.opts.autoClose && this.topOkDom.click(function() {
                    valSetTool.sendbackValue(true);
                })
                this.topCancelDom.click(function() {
                    valSetTool.clearValue();
                })
            },
            addError: function(item) {
                if (item == 1) {
                    this.topStartDom.addClass("error")
                } else if (item == 2) {
                    this.topEndDom.addClass("error")
                } else {
                    this.topStartDom.removeClass("error")
                    this.topEndtDom.removeClass("error")
                }
            }
        };
        var monthView = {
            createDom: function(obj, month, year) {
                this.dom = $("<div class='iui-datepicker-month '></div>");
                this.monthTop = $("<div class='iui-datepicker-month-top'></div>");
                this.monthTopLeft = $("<div class='iui-datepicker-month-top-left'></div>");
                this.monthTopright = $("<div class='iui-datepicker-month-top-right'></div>");
                this.monthSel = this.setMonthSel(month, obj.monthP);
                this.yearSel = this.setYearSel(year, obj.monthP);
                this.dateViewer = dateView.createDom(month, year, obj);
                var selContent = $("<div  class='iui-datepicker-month-sel " + obj.monthP + "'></div>")
                selContent.append(this.monthSel);
                selContent.append(this.yearSel);
                this.monthTop.append(this.monthTopright);
                this.monthTop.append(this.monthTopLeft);
                this.monthTop.append(selContent);
                this.dom.append(this.monthTop);
                this.dom.append(this.dateViewer);
                this.bindEvents(this.dateViewer, this.monthSel, this.yearSel, month, year, obj);
                obj.MonthView = this.dom;
                obj.monthSel = this.monthSel;
                obj.yearSel = this.yearSel;
                obj.dateViewer = this.dateViewer;

                return obj;
            },
            setMonthSel: function(month, monthP) {
                // monthNames,
                var monthStr = "<select name='month' class='" + monthP + "'>";
                for (var i = 0; i < monthNames.length; i++) {
                    monthStr += "<option " + (month == i + 1 ? "selected" : "") + " value='" + i + "'>" + monthNames[i] + "</option>";
                }
                monthStr += "<select>";
                return $(monthStr)
            },
            setYearSel: function(year, monthP) {
                var yearStr = "<select name='year'  class='" + monthP + "'>";
                for (var i = iuiDatePicker.opts.minYear; i < iuiDatePicker.opts.maxYear; i++) {
                    yearStr += "<option " + (year == i ? "selected" : "") + " value='" + i + "'>" + i + "年</option>";
                }
                yearStr += "<select>";
                return $(yearStr)
            },
            setEndMonthDom: function() {
                if (iuiDatePicker.endTime) {
                    rightMonth.yearTemp = iuiDatePicker.endTime.getFullYear();
                    rightMonth.monthTemp = iuiDatePicker.endTime.getMonth() + 1;
                    rightMonth.yearSel.val(rightMonth.yearTemp);
                    rightMonth.monthSel.val(rightMonth.monthTemp - 1);
                }
            },
            setBeginMonthDom: function() {
                if (iuiDatePicker.startTime) {
                    leftMonth.yearTemp = iuiDatePicker.startTime.getFullYear();
                    leftMonth.monthTemp = iuiDatePicker.startTime.getMonth() + 1;
                    leftMonth.yearSel.val(leftMonth.yearTemp);
                    leftMonth.monthSel.val(leftMonth.monthTemp - 1);
                }
            },
            bindEvents: function(dateViewer, mouthSel, yearSel, month, year, obj) {
                var _this = this;
                obj.monthTemp = month;
                obj.yearTemp = year;
                this.monthTopLeft.click(function() {
                    obj.monthTemp--;
                    if (obj.monthTemp <= 0) {
                        obj.monthTemp = 12;
                        obj.yearTemp--;
                        yearSel.val(obj.yearTemp)
                    }
                    mouthSel.val(obj.monthTemp - 1)
                    createDateView();
                });
                this.monthTopright.click(function() {
                    obj.monthTemp++;
                    if (obj.monthTemp > 12) {
                        obj.monthTemp = 1;
                        obj.yearTemp++;
                        yearSel.val(obj.yearTemp)
                    }
                    mouthSel.val(obj.monthTemp - 1)
                    createDateView();
                });
                mouthSel.change(function(evt) {
                    obj.monthTemp = parseInt(evt.target.value) + 1;
                    createDateView()
                })
                yearSel.change(function(evt) {
                    obj.yearTemp = evt.target.value;
                    createDateView()
                })

                function createDateView() {
                    if (!iuiDatePicker.opts.selectMonth) {
                        var newDView = dateView.createDom(obj.monthTemp, obj.yearTemp, obj);
                        dateViewer.replaceWith(newDView);
                        dateViewer = newDView;
                        if (valSetTool.dateSelTemp) {
                            dateView.setDateRange(obj);
                        }
                    } else {
                        var val = new Date(obj.yearTemp + "/" + obj.monthTemp + "/01 00:00:00");
                        valSetTool.setMonthValue(val, obj)
                    }
                }
            }
        };
        var dateView = {
            createDom: function(month, year, obj) {
                if (iuiDatePicker.opts.selectMonth) {
                    return;
                }
                this.dom = $("<div class='iui-datepicker-days'></div>");
                this.weekTop = $("<div class='iui-datepicker-days-top'>" + this.createWeekTop() + "</div>");
                this.dateContent = $(this.createDateItem(month, year));
                this.dom.append(this.weekTop);
                this.dom.append(this.dateContent);
                obj.dateContent = this.dateContent;
                obj.empty = this.empty;
                this.bindClick(this.dom, this.dateContent, this.empty, month, year);
                return this.dom;
            },
            createWeekTop: function() {
                var i = iuiDatePicker.opts.startOfWeek == weekNames[0] ? 0 : 1;
                var str = "";
                while (true) {
                    str += "<div class='weektop'>" + weekNames[i == 7 ? 0 : i] + "</div>";
                    i++;
                    if ((i == 7 && iuiDatePicker.opts.startOfWeek == weekNames[0]) || i > 7) break;
                }
                return str;
            },
            createDateItem: function(month, year) {
                var setDate = new Date(year + "/" + month + "/01");
                var firstDay = setDate.getDay();
                var empty = (iuiDatePicker.opts.startOfWeek == weekNames[0]) ? firstDay : (firstDay - 1);
                var str = "";
                if (empty < 0) empty = 6;
                this.empty = empty;
                for (var i = 0; i < empty; i++) {
                    str += "<div class='emptyitem'></div>";
                }
                for (var i = 1; i <= 31; i++) {
                    var curDate = new Date(year + "-" + month + "-" + i + " 00:00:00");
                    var seled = "";

                    if (iuiDatePicker.opts.singleDate && iuiDatePicker.startTime) {
                        if (isEqualTime(curDate, iuiDatePicker.startTime, 60 * 60 * 24)) {
                            seled = "seled";
                        }
                    } else if (iuiDatePicker.startTime && iuiDatePicker.endTime) {
                        if (isBetweenTime(iuiDatePicker.startTime, iuiDatePicker.endTime, curDate, true, true, 60 * 60 * 24)) {
                            seled = "seled";
                        }
                    }
                    if (iuiDatePicker.minTime) {
                        if (compareTime(curDate, iuiDatePicker.minTime, false, 60 * 60 * 24)) {
                            seled += "disabled";
                        }
                    }
                    if (iuiDatePicker.maxTime) {
                        if (compareTime(iuiDatePicker.maxTime, curDate, true, 60 * 60 * 24)) {
                            seled += "disabled";
                        }
                    }
                    str += "<div class='dateitem " + seled + "'>" + i + "</div>";
                    if (i >= 28) {
                        var nowDate = new Date(year + "/" + month + "/" + (i + 1));
                        if (nowDate.getMonth() + 1 != month) break;
                    }
                }
                this.dateDom = $(str);
                this.setToday(month, year);

                this.dateDom.filter(".seled:first()").addClass("firstseled");
                this.dateDom.filter(".seled:last()").addClass("lastseled");
                return this.dateDom;
            },
            setToday: function(month, year) {
                if (today.getMonth() + 1 == month && today.getFullYear() == year) {
                    this.dateDom.eq(today.getDate() + this.empty - 1).addClass("today")
                }
            },
            setDateRange: function(obj) {
                obj.dateContent.removeClass("disabled");
                $.each(obj.dateContent.filter(".dateitem"), function(i, o) {
                    var thisDate = new Date(obj.yearTemp + "-" + obj.monthTemp + "-" + o.innerText + " 00:00:00")
                    if (valSetTool.dateSelTemp.start1 && valSetTool.dateSelTemp.end1 && !(
                            isBetweenTime(valSetTool.dateSelTemp.start1, valSetTool.dateSelTemp.end1, thisDate, true, true, 60 * 60 * 24) ||
                            isBetweenTime(valSetTool.dateSelTemp.start2, valSetTool.dateSelTemp.end2, thisDate, true, true, 60 * 60 * 24))) {
                        $(o).addClass("disabled");
                    } else if (valSetTool.dateSelTemp.start1 && !valSetTool.dateSelTemp.end1 && (compareTime(thisDate, valSetTool.dateSelTemp.start1, true, 60 * 60 * 24) ||
                            compareTime(valSetTool.dateSelTemp.end2, thisDate, true, 60 * 60 * 24))) {
                        $(o).addClass("disabled");
                    } else if (!valSetTool.dateSelTemp.start1 && valSetTool.dateSelTemp.end1 && (compareTime(thisDate, valSetTool.dateSelTemp.end1, true, 60 * 60 * 24) ||
                            compareTime(valSetTool.dateSelTemp.start2, thisDate, true, 60 * 60 * 24))) {
                        $(o).addClass("disabled");
                    }
                });
            },
            removeDateRange: function(obj) {
                obj.dateContent.removeClass("disabled");
            },
            bindClick: function($dom, dateContent, empty, month, year) {
                var _this = this;
                $dom.on("click", "div.dateitem", function(evt) {
                    if (evt.target.innerText == "") {
                        return;
                    }
                    if ($(evt.target).hasClass("disabled")) {
                        return;
                    }
                    var val = new Date(year + "/" + month + "/" + evt.target.innerText + " 00:00:00");
                    valSetTool.setValue(val);
                });
                $dom.on("mouseover", "div.dateitem", function(evt) {
                    if (iuiDatePicker.opts.singleDate || !iuiDatePicker.startTime || (iuiDatePicker.startTime && iuiDatePicker.endTime) || $(evt.target).hasClass("disabled")) {
                        return;
                    }
                    var startM = iuiDatePicker.startTime.getMonth() + 1;
                    var startY = iuiDatePicker.startTime.getFullYear();
                    var startD = iuiDatePicker.startTime.getDate();
                    var startMY = startY + "-" + startM;
                    var curMY = year + "-" + month;

                    var curDay = evt.target.innerText;
                    var curMonthView = leftMonth;
                    if (dateContent == leftMonth.dateContent) {
                        curMonthView = leftMonth
                    }
                    if (rightMonth && dateContent == rightMonth.dateContent) {
                        curMonthView = rightMonth
                    }

                    //处理左侧月份的鼠标移动效果。
                    var leftMY = leftMonth.yearTemp + "-" + leftMonth.monthTemp;
                    var curIndex = 0,
                        startT = startD;
                    if ((leftMY > startMY && leftMY < curMY) || (leftMY > curMY && leftMY < startMY)) { //如果左侧的月份在 开始月份和选中月份之间， 那么左侧 月份需要全部选中
                        startT = leftMonth.empty; //左侧月历的变蓝的开始日期从头部开始
                        curIndex = leftMonth.dateContent.length;
                    } else if (leftMY == startMY && leftMY == curMY) { //如果 左侧的月份在 开始月份 以及当前月份
                        startT = startT + leftMonth.empty;
                        curIndex = parseInt(curDay) + leftMonth.empty;
                    } else { //其他情况， 左侧月份在开始月份 不在当前月份，或者在当前月份 不在开始月份

                        if (leftMY == startMY) { //当左侧月份跟开始月份一致
                            startT = startT + leftMonth.empty; //起止点会有一个是开始日期点。
                            if (curMY > startMY) { //如果当前月份 大于开始月份
                                curIndex = leftMonth.dateContent.length; //起止点取到月尾
                            } else {
                                curIndex = leftMonth.empty; //起止点取到月头
                            }
                        } else if (leftMY == curMY) { //当左侧月份跟当前月份一致
                            curIndex = parseInt(curDay) + leftMonth.empty;; //当前索引点是起止点的一个
                            if (curMY > startMY) { //如果当前月份 大于开始月份
                                startT = leftMonth.empty; //起止点取到月头
                            } else {
                                startT = leftMonth.dateContent.length; //起止点取到月尾
                            }
                        }
                    }
                    leftMonth.dateContent.removeClass("seled");

                    if (curIndex > startT - 1) {
                        leftMonth.dateContent.slice(startT - 1, curIndex).addClass("seled");
                    } else if (curIndex <= startT - 1) {
                        leftMonth.dateContent.slice(curIndex - 1, startT).addClass("seled");
                    }
                    leftMonth.dateContent.removeClass("firstseled lastseled");
                    leftMonth.dateContent.filter(".dateitem.seled:first()").addClass("firstseled ");
                    leftMonth.dateContent.filter(".dateitem.seled:last()").addClass("lastseled ");
                    //开始处理右侧月份
                    if (rightMonth) {

                        var rightMY = rightMonth.yearTemp + "-" + rightMonth.monthTemp;
                        var curIndex = 0,
                            startT = startD;
                        if ((rightMY > startMY && rightMY < curMY) || (rightMY > curMY && rightMY < startMY)) { //如果右侧的月份在 开始月份和选中月份之间， 那么右侧 月份需要全部选中
                            startT = rightMonth.empty; //右侧月历的变蓝的开始日期从头部开始
                            curIndex = rightMonth.dateContent.length;
                        } else if (rightMY == startMY && rightMY == curMY) { //如果 右侧的月份在 开始月份 以及当前月份
                            startT = startT + rightMonth.empty;
                            curIndex = parseInt(curDay) + rightMonth.empty;
                        } else { //其他情况， 右侧月份在开始月份 不在当前月份，或者在当前月份 不在开始月份

                            if (rightMY == startMY) { //当右侧月份跟开始月份一致
                                startT = startT + rightMonth.empty; //起止点会有一个是开始日期点。
                                if (curMY > startMY) { //如果当前月份 大于开始月份
                                    curIndex = rightMonth.dateContent.length; //起止点取到月尾
                                } else {
                                    curIndex = rightMonth.empty; //起止点取到月头
                                }
                            } else if (rightMY == curMY) { //当右侧月份跟当前月份一致
                                curIndex = parseInt(curDay) + rightMonth.empty;; //当前索引点是起止点的一个
                                if (curMY > startMY) { //如果当前月份 大于开始月份
                                    startT = rightMonth.empty; //起止点取到月头
                                } else {
                                    startT = rightMonth.dateContent.length; //起止点取到月尾
                                }
                            }
                        }
                        rightMonth.dateContent.removeClass("seled");

                        if (curIndex > startT - 1) {
                            rightMonth.dateContent.slice(startT - 1, curIndex).addClass("seled");
                        } else if (curIndex <= startT - 1) {
                            rightMonth.dateContent.slice(curIndex - 1, startT).addClass("seled");
                        }

                        rightMonth.dateContent.removeClass("firstseled lastseled");
                        rightMonth.dateContent.filter(".dateitem.seled:first()").addClass("firstseled ");
                        rightMonth.dateContent.filter(".dateitem.seled:last()").addClass("lastseled ");
                    }
                    //右侧处理完毕
                });
            }
        };
        var timeView = {
            createDom: function() {
                this.dom = $("<div class='timercontain'> </div>");
                this.leftTimer = $("<div class='timerspit'></div>");
                this.leftHour = $(timeView.createHourSel());
                this.leftTimer.append(this.leftHour);
                this.leftTimer.append(":");
                this.leftMinute = $(timeView.createMinuteSel(iuiDatePicker.opts.time.minuteStep));
                this.leftTimer.append(this.leftMinute);
                if (iuiDatePicker.opts.time.secondShow) {
                    this.leftTimer.append(":");
                    this.leftSecond = $(timeView.createMinuteSel(iuiDatePicker.opts.time.secondStep));
                    this.leftTimer.append(this.leftSecond);
                }
                this.dom.append(this.leftTimer);
                if (!iuiDatePicker.opts.singleMonth) {
                    this.rightTimer = $("<div class='timerspit'></div>");
                    this.rightHour = $(timeView.createHourSel());
                    this.rightTimer.append(this.rightHour);
                    this.rightTimer.append(":");
                    this.rightMinute = $(timeView.createMinuteSel(iuiDatePicker.opts.time.minuteStep));
                    this.rightTimer.append(this.rightMinute);
                    if (iuiDatePicker.opts.time.secondShow) {
                        this.rightTimer.append(":");
                        this.rightSecond = $(timeView.createMinuteSel(iuiDatePicker.opts.time.secondStep));
                        this.rightTimer.append(this.rightSecond);
                    }
                    this.dom.append(this.rightTimer);
                }
                this.bindEvents();
                return this.dom;
            },
            createHourSel: function() {
                var str = "<select>";
                for (var i = 0; i < 24; i += iuiDatePicker.opts.time.hourStep) {
                    str += "<option value='" + i + "'>" + (i < 10 ? "0" : "") + i + "</option>"
                }
                str += "</select>";
                return str;
            },
            createMinuteSel: function(step) {
                var str = "<select>";
                for (var i = 0; i < 60; i += step) {
                    str += "<option value='" + i + "'>" + (i < 10 ? "0" : "") + i + "</option>"
                }
                str += "</select>";
                return str;
            },
            exchangeVal: function() {
                var temp;
                temp = this.leftHour.val();
                this.leftHour.val(this.rightHour.val());
                this.rightHour.val(temp);
                temp = this.leftMinute.val();
                this.leftMinute.val(this.rightMinute.val());
                this.rightMinute.val(temp);
                if (this.leftSecond) {
                    temp = this.leftSecond.val();
                    this.leftSecond.val(this.rightSecond.val());
                    this.rightSecond.val(temp);
                }
            },
            clearValue: function() {
                this.leftHour.val("0");
                this.leftMinute.val("0");
                this.leftSecond.val("0");
                if (!iuiDatePicker.opts.singleMonth) {
                    this.rightHour.val("0");
                    this.rightMinute.val("0");
                    this.rightSecond.val("0");
                }
            },
            bindEvents: function() {
                $.each([this.leftHour, this.leftMinute, this.leftSecond], function(i, o) {
                    o && o.change(function(evt) {
                        setValue("left", $(evt.target));
                    });
                })
                $.each([this.rightHour, this.rightMinute, this.rightSecond], function(i, o) {
                    o && o.change(function(evt) {
                        setValue("right"), $(evt.target);
                    });
                })

                function setValue(timeP, $this) {
                    if (timeP == "left" && iuiDatePicker.startTime) {
                        if (iuiDatePicker.startTime) {
                            iuiDatePicker.startTime.setHours(timeView.leftHour.val());
                            iuiDatePicker.startTime.setMinutes(timeView.leftMinute.val());
                            iuiDatePicker.startTime.setSeconds(timeView.leftSecond ? timeView.leftSecond.val() : 0);
                            valSetTool.setValue(iuiDatePicker.startTime, timeP);
                        }
                    } else if (timeP == "right" && iuiDatePicker.endTime) {
                        iuiDatePicker.endTime.setHours(timeView.rightHour.val());
                        iuiDatePicker.endTime.setMinutes(timeView.rightMinute.val());
                        iuiDatePicker.endTime.setSeconds(timeView.rightSecond ? timeView.rightSecond.val() : 0);
                        valSetTool.setValue(iuiDatePicker.endTime, timeP);
                    }

                }
            }
        };
        var valSetTool = {
            startSel: false,
            dateSelTemp: false,
            setValue: function(val, setIime) {
                if (!val instanceof Date) {
                    val = new Date(val);
                }
                if (iuiDatePicker.opts.singleDate) {
                    iuiDatePicker.startTime = val;
                    theTopBar && topBar.setBeginDom();
                    iuiDatePicker.opts.autoClose && this.sendbackValue();
                    leftMonth.dateContent.removeClass("seled firstseled lastseled");

                    if (leftMonth.monthTemp == iuiDatePicker.startTime.getMonth() + 1 &&
                        leftMonth.yearTemp == iuiDatePicker.startTime.getFullYear()) {
                        leftMonth.dateContent.eq(iuiDatePicker.startTime.getDate() + leftMonth.empty - 1).addClass("seled firstseled lastseled");
                    }
                    if (rightMonth) {
                        rightMonth.dateContent.removeClass("seled firstseled lastseled");
                        if (rightMonth.monthTemp == iuiDatePicker.startTime.getMonth() + 1 &&
                            rightMonth.yearTemp == iuiDatePicker.startTime.getFullYear()) {
                            rightMonth.dateContent.eq(iuiDatePicker.startTime.getDate() + rightMonth.empty - 1).addClass("seled  firstseled lastseled");
                        }
                    }
                } else {
                    if (setIime) {


                        if (setIime == "left") {
                            iuiDatePicker.startTime = val;

                        } else if (setIime == "right") {
                            iuiDatePicker.endTime = val;

                        }
                        if (iuiDatePicker.endTime && iuiDatePicker.endTime < iuiDatePicker.startTime) {
                            var temp = iuiDatePicker.endTime;
                            iuiDatePicker.endTime = iuiDatePicker.startTime;
                            iuiDatePicker.startTime = temp;
                            timeView.exchangeVal();


                        }
                        topBar.setBeginDom();
                        topBar.setEndDom();
                        return;
                    }
                    if (!this.startSel) {
                        iuiDatePicker.startTime = val;
                        if (iuiDatePicker.opts.time.enabled) {
                            iuiDatePicker.startTime.setHours(timeView.leftHour.val());
                            iuiDatePicker.startTime.setMinutes(timeView.leftMinute.val());
                            iuiDatePicker.startTime.setSeconds(timeView.leftSecond ? timeView.leftSecond.val() : "00");
                        }
                        iuiDatePicker.endTime = "";
                        this.startSel = true;
                        if (theTopBar) {
                            topBar.setBeginDom();
                        }

                        if (iuiDatePicker.opts.maxDays > 0 || iuiDatePicker.opts.minDays > 0) {
                            this.dateSelTemp = {}
                            if (iuiDatePicker.opts.maxDays > 0) {
                                this.dateSelTemp.start1 = new Date(iuiDatePicker.startTime);
                                this.dateSelTemp.start1.setDate(iuiDatePicker.startTime.getDate() - iuiDatePicker.opts.maxDays);
                                this.dateSelTemp.end2 = new Date(iuiDatePicker.startTime);
                                this.dateSelTemp.end2.setDate(iuiDatePicker.startTime.getDate() + iuiDatePicker.opts.maxDays);
                            }

                            if (iuiDatePicker.opts.minDays > 0) {
                                this.dateSelTemp.end1 = new Date(iuiDatePicker.startTime);
                                this.dateSelTemp.end1.setDate(iuiDatePicker.startTime.getDate() - iuiDatePicker.opts.minDays);
                                this.dateSelTemp.start2 = new Date(iuiDatePicker.startTime);
                                this.dateSelTemp.start2.setDate(iuiDatePicker.startTime.getDate() + iuiDatePicker.opts.minDays);
                            }
                        }
                        leftMonth.dateContent.removeClass("seled  firstseled lastseled");
                        if (leftMonth.monthTemp == iuiDatePicker.startTime.getMonth() + 1 &&
                            leftMonth.yearTemp == iuiDatePicker.startTime.getFullYear()) {
                            leftMonth.dateContent.eq(iuiDatePicker.startTime.getDate() + leftMonth.empty - 1).addClass("seled ");

                        }
                        if (this.dateSelTemp) {
                            dateView.setDateRange(leftMonth);
                        }
                        if (rightMonth) {
                            rightMonth.dateContent.removeClass("seled  firstseled lastseled");
                            if (rightMonth.monthTemp == iuiDatePicker.startTime.getMonth() + 1 &&
                                rightMonth.yearTemp == iuiDatePicker.startTime.getFullYear()) {
                                rightMonth.dateContent.eq(iuiDatePicker.startTime.getDate() + rightMonth.empty - 1).addClass("seled ");
                            }

                            if (this.dateSelTemp) {
                                dateView.setDateRange(rightMonth);
                            }
                        }

                    } else {
                        iuiDatePicker.endTime = val;
                        if (iuiDatePicker.opts.time.enabled) {
                            iuiDatePicker.endTime.setHours(timeView.rightHour.val());
                            iuiDatePicker.endTime.setMinutes(timeView.rightMinute.val());
                            iuiDatePicker.endTime.setSeconds(timeView.rightSecond ? timeView.rightSecond.val() : "00");
                        }
                        if (iuiDatePicker.endTime < iuiDatePicker.startTime) {
                            var temp = iuiDatePicker.endTime;
                            iuiDatePicker.endTime = iuiDatePicker.startTime;
                            iuiDatePicker.startTime = temp;
                            topBar.setBeginDom();
                        }
                        if (this.dateSelTemp) {
                            dateView.removeDateRange(leftMonth);
                            rightMonth && dateView.removeDateRange(rightMonth);
                        }

                        this.startSel = false;
                        if (theTopBar) {

                            topBar.setEndDom();
                        }
                        iuiDatePicker.opts.autoClose && this.sendbackValue();

                    }
                }
            },
            setMonthValue: function(val, obj) {
                if (iuiDatePicker.opts.singleDate) { //单日期选择模式，同时也是单月选择模式
                    iuiDatePicker.startTime = val;
                    theTopBar && topBar.setBeginDom();
                    iuiDatePicker.opts.autoClose && this.sendbackValue();

                } else {
                    if (obj.monthP == "left") {
                        iuiDatePicker.startTime = val;
                    } else {
                        iuiDatePicker.endTime = val;
                    }

                    if (iuiDatePicker.endTime < iuiDatePicker.startTime) {
                        var temp = iuiDatePicker.endTime;
                        iuiDatePicker.endTime = iuiDatePicker.startTime;
                        iuiDatePicker.startTime = temp;
                    }


                    topBar.setBeginDom();
                    topBar.setEndDom();
                    monthView.setBeginMonthDom();
                    monthView.setEndMonthDom();
                }
            },
            sendbackValue: function(toClose) {
                if (iuiDatePicker.opts.singleDate) {
                    if (!iuiDatePicker.startTime) {
                        if (iuiDatePicker.opts.selectMonth) {
                            leftMonth.monthSel.change();
                            leftMonth.yearSel.change();
                        } else {
                            topBar.addError(1);
                            return;
                        }

                    }
                } else {
                    var ok = false
                    if (!iuiDatePicker.startTime) {
                        if (iuiDatePicker.opts.selectMonth) {
                            leftMonth.monthSel.change();
                            leftMonth.yearSel.change();
                        } else {
                            topBar.addError(1);
                            ok = true;
                        }
                    }
                    if (!iuiDatePicker.endTime) {
                        if (iuiDatePicker.opts.selectMonth) {
                            rightMonth.monthSel.change();
                            rightMonth.yearSel.change();
                        } else {
                            topBar.addError(2);
                            ok = true;
                        }
                    }
                    if (ok) return;
                }

                iuiDatePicker.opts.setValue && iuiDatePicker.opts.setValue(iuiDatePicker.opts.singleDate ? dateFormat(iuiDatePicker.startTime, iuiDatePicker.opts.format) : {
                    startTime: dateFormat(iuiDatePicker.startTime, iuiDatePicker.opts.format),
                    endTime: dateFormat(iuiDatePicker.endTime, iuiDatePicker.opts.format)
                });

                (iuiDatePicker.opts.autoClose || toClose) && iuiDatePicker.dom.hide();
            },
            clearValue: function() {
                this.startSel = false;
                iuiDatePicker.startTime = "";
                iuiDatePicker.endTime = "";
                topBar.setBeginDom();
                topBar.setEndDom();
                if(opts.startDate && opts.singleDate){//只改了这两行，但是选期间还是有问题，这个改动涉及比较大，我暂时不敢随意改动
                    leftMonth.dateContent && leftMonth.dateContent.removeClass("seled");
                }else{
                    leftMonth.dateContent && leftMonth.dateContent.removeClass("seled disabled");
                }
                rightMonth && leftMonth.dateContent && rightMonth.dateContent.removeClass("seled disabled");
                iuiDatePicker.opts.time.enabled && timeView.clearValue();
                iuiDatePicker.opts.clear && iuiDatePicker.opts.clear();

            }
        };
        this.setValue = function(val) {
            var dateTimes = val.split(this.opts.separator);
            if (dateTimes[0]) {
                dateTimes[0]=dateTimes[0].replace(/\-/g, "\/");
                if (!iuiDatePicker.opts.time.enabled) {
                    this.startTime = new Date(fullDate(dateTimes[0]) + " 00:00:00");
                } else {
                    this.startTime = new Date(fullDate(dateTimes[0]));
                }
            }
            if (dateTimes[1]) {
                dateTimes[1]=dateTimes[1].replace(/\-/g, "\/");
                if (!iuiDatePicker.opts.time.enabled) {
                    this.endTime = new Date(fullDate(dateTimes[1]) + " 00:00:00");
                } else {
                    this.endTime = new Date(fullDate(dateTimes[1]));
                }

            }
            if (this.startTime) {
                var startMonth = leftMonth.MonthView;
                monthView.createDom(leftMonth, this.startTime.getMonth() + 1, this.startTime.getFullYear());
                startMonth.replaceWith(leftMonth.MonthView);
            }
            if (this.endTime && rightMonth) {
                var endMonth = rightMonth.MonthView;
                monthView.createDom(rightMonth, this.endTime.getMonth() + 1, this.endTime.getFullYear());
                endMonth.replaceWith(rightMonth.MonthView);
            }
            topBar.setTopShow();
            function fullDate(val){
                var t = val.split('/');
                var year=t[0]?t[0]:'1970';
                var month=t[1]?t[1]:'01';
                var day=t[2]?t[2]:'01';
                return year+'/'+month+'/'+day;
            };

        }
        this.getValue = function(dateFormat) {
            if (!dateFormat) {
                dateFormat = this.opts.dateFormat;
            }
            if (this.opts.singleDate) {
                return dateFormat(this.startTime, dateFormat);
            } else {
                return {
                    startTime: dateFormat(this.startTime, dateFormat),
                    endTime: dateFormat(this.endTime, dateFormat)
                };
            }
        }

        //开始初始化 内容
        this.dom = $("<div class='iui-datepicker " + (this.opts.singleMonth ? "single-month " : "") + (this.opts.time.enabled ? "time-sel " : "") + (iuiDatePicker.opts.selectMonth ? "month-sel" : "") + "'></div>");
        if (this.opts.showTopbar) {
            var theTopBar = topBar.createDom();
            this.dom.append(theTopBar);
        }
        var startDate = this.startTime ? new Date(this.startTime) : new Date();
        var endDate = this.endTime ? new Date(this.endTime) : new Date();
        endDate.setMonth(endDate.getMonth() + 1)
        var leftMonth = { monthP: "left" };
        leftMonth = monthView.createDom(leftMonth, startDate.getMonth() + 1, startDate.getFullYear());
        this.dom.append(leftMonth.MonthView);
        if (!this.opts.singleMonth) {
            var rightMonth = { monthP: "right" };
            rightMonth = monthView.createDom(rightMonth, endDate.getMonth() + 1, endDate.getFullYear());
            this.dom.append(rightMonth.MonthView);
        }
        if (this.opts.time.enabled) {
            this.dom.append(timeView.createDom());
        }
        if (this.opts.container) {
            if (typeof this.opts.container == "string") {
                this.opts.container = $(this.opts.container);
            }
        } else {
            this.opts.container = $(document.body)
        }

        this.opts.container.append(this.dom);
        this.dom.on('click mousedown', function(evt) {
                if (evt.target.tagName != 'SELECT') {
                    evt.stopPropagation();
                    return false;
                } else {
                    evt.stopPropagation();
                }
            })
            //初始化动作完成
        this.show = function(val) {
            if (val) {
                this.setValue(val);
            }
            this.dom.show();
            this.dom.css({
                "position": "absolute"
            });
            var domHeight = this.dom.outerHeight(); //this.dom为日历表单
            if (this.opts.attobj) {
                //                var objPosition = opts.attobj.offset();
                //                var attobjHeight = this.opts.attobj.height();
                //                if (document.documentElement.clientHeight > objPosition.top + attobjHeight + domHeight) {
                //                    this.dom.css({
                //                        "left": objPosition.left,
                //                        "top": objPosition.top + attobjHeight
                //                    });
                //                } else if (objPosition.top > domHeight + 30) {
                //                    this.dom.css({
                //                        "left": objPosition.left,
                //                        "top": objPosition.top - domHeight - 30 //高度会忽略一些margin和padding 修正一下
                //                    });
                //                } else {
                //                    this.dom.css({
                //                        "left": objPosition.left,
                //                        "top": document.documentElement.clientHeight - domHeight + 30 //高度会忽略一些margin和padding 修正一下
                //                    });
                //                }
                var $ele = this.opts.attobj;
                var $eleMenu = this.dom;
                var top = 0;
                var left = 0;
                var width = 0;
                if ($ele.length > 0) {
                    top = $ele.offset().top + $ele.outerHeight() - 1;
                    left = $ele.offset().left;
                    width = $ele.outerWidth();
                    if (top - $(window).scrollTop() + $eleMenu.outerHeight() >= $(window).height()) {
                        top = $ele.offset().top - $eleMenu.outerHeight() + 1;
                    }
                    if ((left + $eleMenu.outerWidth() >= $(window).width())) {
                        left = $ele.offset().left + width - $eleMenu.outerWidth();
                    }
                    if (parseFloat(top) - parseFloat(document.body.scrollTop) < 0) { //如果上面放不下，下面放不下就居中显示
                        top = ($(window).height() - $eleMenu.outerHeight()) / 2 + document.body.scrollTop;
                    }
                    $eleMenu.css({
                        'top': top,
                        'left': left
                    });
                }
            }
        };
        this.hide = function() {
            this.dom.hide();
        }
        this.destroy = function(obj) {
            obj = null;
            this.dom.remove();
            this.dom = null;
            try {
                for (var k in this) {
                    delete this[k];
                }
                //this = null;
            } catch (e) {
                console.log(e);
            }

        }
    };
    //  date1 date2 :要比较的时间，都是Date的实例
    //  includeEq:包含等于情况返回true 默认不包含
    //  accuracy:比较到毫秒级别 默认只比较日期 默认 false;
    function compareTime(date1, date2, includeEq, accuracy) { //date <(=) date2 为true
        if (!accuracy) {
            if (includeEq) {
                return date1.getTime() <= date2.getTime()
            } else {
                return date1.getTime() < date2.getTime()
            }
        } else {
            var accuracy = 1000 * accuracy;
            if (includeEq) {
                return Math.floor(date1.getTime() / accuracy) <= Math.floor(date2.getTime() / accuracy)
            } else {
                return Math.floor(date1.getTime() / accuracy) < Math.floor(date2.getTime() / accuracy)
            }
        }
    }
    //  date1 date2 :要比较的目标时间，date3 是当前的时间，都是Date的实例
    //  includeEq1，includeEq2:包含等于情况返回true 默认不包含
    //  accuracy:比较到毫秒级别 默认只比较日期 默认 false;
    function isBetweenTime(date1, date2, date3, includeEq1, includeEq2, accuracy) { //date <(=) date2 为true
        if (compareTime(date1, date3, includeEq1, accuracy) && compareTime(date3, date2, includeEq2, accuracy)) {
            return true;
        } else {
            return false;
        }

    }

    function isEqualTime(date1, date2, accuracy) {
        if (!accuracy) {
            return date1.getTime() == date2.getTime()

        } else {
            var accuracy = 1000 * accuracy;
            return Math.floor(date1.getTime() / accuracy) == Math.floor(date2.getTime() / accuracy)

        }
    }

    function dateFormat(value, format) {
        if (!value instanceof Date) {
            value = new Date(value);
        }
        if (!format) {
            format = "YYYY-MM-DD";
        }
        var o = {
            "M+": value.getMonth() + 1, //month
            "D+": value.getDate(), //day
            "h+": value.getHours(), //hour
            "m+": value.getMinutes(), //minute
            "s+": value.getSeconds(), //second
            "q+": Math.floor((value.getMonth() + 3) / 3), //season
            "S": value.getMilliseconds() //millisecond
        }
        if (/(Y+)/.test(format)) {
            format = format.replace(RegExp.$1, (value.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o)
            if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    }
    return IUIdatePicker;
})
