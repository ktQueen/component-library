/**
 * 下拉框时间选择菜单组件
 * @module drop_down_calendar
 */
require.config({
    paths: {
        'daterangepicker': 'modules/calendar/js/jquery.daterangepicker.min',
        'cssFile': 'modules/libs/rq/css.min'
    }
});
define([
    'modules/drop_down_base/js/drop_down_base',
    'modules/utils/data_type',
    'modules/utils/menu_pop_manager',
    'daterangepicker',
    'cssFile!modules/calendar/css/daterangepicker.min.css'
], function(Base, dataType,menuPopManager) {
    /**
     * @class
     * @classdesc 下拉框时间选择菜单组件
     * @alias DropDownCalendar
     * @author kt
     * @since 2017-03-20
     *
     * @param {object} opts - 配置参数
     * @param {dom} opts.element - 选择元素
     * @param {string} [opts.btnAddClass=""] - 添加class
     * @param {object} [opts.btnStyle={}] - btn的相关样式
     * @param {dom} [opts.showElement=""] - 显示文本的元素，如果设置了此元素，element就不会显示当前值了
     * @param {string} opts.placeholder - 元素默认显示的文本
     * @param {boolean} [opts.isDisabled=false] - 是否不可用，默认为false，不禁用
     * @param {boolean} [opts.readOnly=false] - 是否只读，默认为false，不是只读
     * @param {boolean} [opts.isIcon=true] - 是否显示图标，默认显示
     * @param {function} [opts.beforeClick=null] - 最终执行完后返回值是一个布尔值，如果是false可以阻断进程
     * @param {string} opts.type - 组件类型
     * @param {object} [opts.menu] - 时间选择器的相关设置参照calendar组件 {@link modules/calendar/demo.html}
     * @param {(function|object|string)} [opts.setValue=null] - 设置值，data可为一个对象，也可是字符串，以~分隔即可
     * @param {function} [opts.change=null] - 值改变执行的参数方法，this指向为当前的下拉框元素，function的回调函数参数为当前值
     * @param {function} [opts.initDone=null] - 下拉菜单整体初始化完成触发
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    var DropDownCalendar = function() {};
    DropDownCalendar.prototype = {
        /*初始化*/
        init: function(opts) {
            var _this = this;
            _this.value = { //设置数据的初始值
                startTime: '',
                endTime: ''
            };
            _this.optsSet(opts); //参数设置
            _this.createHtml(); //创建布局
            _this.style(); //样式设置
            _this.createCalendar(); //向黄建日历
            _this.bindEventCalendar(); //日历绑定事件
            _this.setValueFn(_this.opts.setValue); //设置日历的值
        },
        /*参数设置*/
        optsSet: function(opts) {
            var _this = this;
            if (!opts) opts = {};
            opts = $.extend(true, {
                //按钮
                element: '', //btn放的位置
                btnAddClass: '', //btn添加class
                btnStyle: {}, //btn的相关样式
                showElement: '', //设置元素显示值的位置，如果没有设置，则默认为element放置选择的值@
                placeholder: '', //按钮显示的提示文字
                isDisabled: false, //按钮是否可点击
                readOnly: false, //按钮是否是只读状态
                isIcon: true, //是否显示下拉按钮
                beforeClick: null, //最终执行完后返回值是一个布尔值，如果是false可以阻断进程
                //菜单
                type: 'calendar', //当前btn对应的menu的type
                menu: {
                    autoClose: true,
                    separator: ' ~ ',
                    setValue: function(s) {
                        $(this).attr('value', s);
                    },
                    getValue: function() {
                        return $(this).attr('value');
                    }
                },
                setValue: null, //设置值，可以为string/object/function,但是数据最终纯为object
                change: null, //值改变触发,function
                initDone: null, //下拉菜单整体初始化完成触发,function
                //内部使用
                isArr: false, //默认不是过滤器使用的
                isConsole: false, //是否打印日志
                elementClass: 'dropdown-btn' //btn的class，只是方便以后修改
            }, opts);
            _this.opts = opts;
            if (!_this.opts.element) return; //没有下拉框元素直接返回
            _this.handlers = {}; //存储自定义事件:必须写在上面，写在下面会把别人的也存储起来的
            _this.opts.change && _this.on('change', _this.opts.change); //把change事件放入到handlers中
        },
        /*创建日历*/
        createCalendar: function() {
            var _this = this;
            _this.calendar = _this.wrap.dateRangePicker(_this.opts.menu);
            _this.dropMenu = _this.wrap.data('dateRangePicker');
            _this.opts.initDone && _this.opts.initDone.call(_this.wrap); //初始化完成之后执行
        },
        /*主动置值的函数*/
        setValueFn: function(parameter) {
            var _this = this;
            if (_this.opts.isArr) { //为了处理过滤器的change执行，如果是true（过滤器）
                if (parameter == null) { //如果没有设置值的情况下,给一个空值，执行触发改变函数
                    parameter = {
                        startTime: '',
                        endTime: ''
                    }
                }
            } else {
                if (parameter == null) { //正常的情况下，没有设置值，直接返回出去
                    parameter = {
                        startTime: '',
                        endTime: ''
                    }
                }
            }
            _this.dealType('object', parameter, function(value, _this) {
                if(value.startTime){
                    _this.dropMenu.setDateRange(value.startTime, value.endTime);
                }else{
                    _this.dropMenu.clear();
                }
                if((_this.opts.setValue && !_this.isFirst) || !_this.opts.setValue){
                    _this.isFirst=true;
                    _this.calendar.trigger('datepicker-change', {
                        value: value.startTime + '' + _this.opts.menu.separator + '' + value.endTime,
                        date1: value.startTime,
                        date2: value.endTime
                    });
                }
            }, 'setValue');
        },
        /*绑定事件*/
        bindEventCalendar: function() {
            var _this = this;
            //点击显示与隐藏下拉框
            _this.wrap.on('click', function(evt) {
                if (!_this.opts.isDisabled && !_this.opts.readOnly) { //如果是可用的情况下
                    if (_this.opts.beforeClick) { //如果有beforeClick配置
                        if (!_this.opts.beforeClick()) { //得到beforeClick的结果为false,则阻断后面的操作
                            _this.destroy();
                        }
                    }
                    if (!_this.isOpen) { //如果是打开状态，则关闭
                        _this.close();
                    } else { //如果是关闭状态，则关闭其他日历，打开当前日历
                        menuPopManager(_this);
                    }
                    _this.isOpen = !_this.isOpen; //将打开状态取反
                    evt.stopPropagation();
                    return false;
                }else{
                    _this.destroy();
                    evt.stopPropagation();
                    return false;
                }
            }).on("scroll", function(evt) {
                evt.stopPropagation();
            });
            //阻止菜单事件
            $('.date-picker-wrapper').on(' click', function(evt) {
                evt.stopPropagation();
            });
            /*document事件*/
            $(document).bind('click scroll', function(e) {
                _this.hide();
            });
            $('div').on('scroll', function(e) {
                if ($(this).css('overflow') == 'auto' && !$(this).hasClass('date-picker-wrapper') && $(this).find(_this.wrap).length>0) {
                    _this.hide();
                }
            });
            //日历事件
            _this.calendar
                    .bind('datepicker-empty', function(event, val) {//清空
                        _this.valueFn({
                            'startTime': '',
                            'endTime': ''
                        });
                    })
                    .bind('datepicker-apply', function(event, val) {//只有月份
                        if (_this.opts.menu.selectMonth && val != _this.value.startTime + ' ~ ' + _this.value.endTime) {
                            _this.valueFn({
                                'startTime': val.value.split(_this.opts.menu.separator)[0],
                                'endTime': val.value.split(_this.opts.menu.separator)[1]
                            });
                        }
                    })
                    .bind('datepicker-change', function(event, val) {//值改变
                        if (val != _this.value.startTime + ' ~ ' + _this.value.endTime) {
                            _this.valueFn({
                                'startTime': val.value.split(_this.opts.menu.separator)[0],
                                'endTime': val.value.split(_this.opts.menu.separator)[1]
                            });
                        }
                    })
                    .bind('datepicker-open', function() {
                        _this.isOpen = true;
                        _this.wrap.removeClass('triangle-down').addClass('triangle-up');
                    })
                    .bind('datepicker-close', function() {
                        _this.isOpen = false;
                        _this.wrap.removeClass('triangle-up').addClass('triangle-down');
                    });
        },
        /*设置值*/
        valueFn: function(parameter) {
            var _this = this;
            _this.dealType('object', parameter, _this.valueToPage, 'setValue');
        },
        valueToPage: function(value, _this) {
            if (_this.opts.isArr || (!_this.opts.isArr && JSON.stringify(_this.value) != JSON.stringify(value))) { //如果是过滤器则直接执行，否则值改变才执行
                _this.value = $.extend(true, {}, value);
                var str = _this.value.startTime ? _this.value.startTime + _this.opts.menu.separator + _this.value.endTime : _this.opts.placeholder;
                if (!_this.value.endTime) {
                    str = _this.value.startTime;
                }
                _this.changeTxt(str, str);
                setTimeout(function() {
                    //将this执行表单元素,并将当前的值传出去
                    _this.fire('change', _this.wrap, _this.value);
                }, 0);
            }
        },
        /* -----------------公共方法------------------- */
        /*处理数据的类型
         * type,希望最终的类型
         * parameter，传入的数据,
         *      function
         *          function(callback){
         *              callback(data);
         *          }
         *      object
         *           {startTime:'2017-01-01',endTime:'2017-01-01'},
         *           {url:'',success:function(){}},
         *      string
         *           '2017-01-01 ~ 2017-01-01'
         * fn,回调function
         * flag,是设置值还是数据setValue/setData，string
         * */
        dealType: function(type, parameter, fn, flag) {
            var _this = this;
            if (dataType(parameter) == 'function') { //如果是function，将回调函数里面的值取出，重新做数据处理
                parameter.call(_this, function(data) {
                    _this.dealType(type, data, fn, flag);
                });
                return false;
            }
            if (dataType(parameter) == 'object') {
                if (parameter.url) { //如果是object,将请求作为一个函数function，重新做数据处理
                    function parameterToFunction(callback) {
                        _this.requestAjaxFn(parameter, callback);
                    }
                    _this.dealType(type, parameterToFunction, fn, flag);
                    return false;
                } else { //如果是object，直接传入的是对象数据的情况，对象传的是什么就是什么
                    parameter = {
                        startTime: parameter.startTime || '',
                        endTime: parameter.endTime || ''
                    }
                }
            }
            if (dataType(parameter) == 'string') { //如果是字符串
                if ((parameter).indexOf(_this.opts.menu.separator) == -1) { // 如果只传了一个，则为开始时间，结束时间为空
                    parameter = {
                        startTime: parameter,
                        endTime: ''
                    }
                } else { //传入是两个时间，分割数据
                    parameter = {
                        startTime: parameter.split(_this.opts.menu.separator)[0] || '',
                        endTime: parameter.split(_this.opts.menu.separator)[1] || ''
                    }
                }
            }
            var typeToData = '';
            if (dataType(parameter) == type) { //当是想要的数据结构时
                typeToData = {
                    'string': parameter,
                    'array': $.extend(true, [], parameter),
                    'object': $.extend(true, {}, parameter)
                }
                if (_this.defaultValue == undefined && flag == 'setValue') { //设置默认值,如果没有设置默认值的情况，设置的值则是初始值
                    _this.defaultValue = typeToData[type];
                }
                if (_this.initValue == undefined && flag == 'setValue') { //没有设置数据，或者数值的数据不对则默认初始值为空
                    _this.initValue = typeToData[type];
                }
                fn(parameter, _this);
            }else{
                typeToData = {
                    'string': '',
                    'array': [],
                    'object': {}
                }
                if (_this.defaultValue == undefined && flag == 'setValue') { //设置默认值,如果没有设置默认值的情况，设置的值则是初始值
                    _this.defaultValue = typeToData[type];
                }
                if (_this.initValue == undefined && flag == 'setValue') { //没有设置数据，或者数值的数据不对则默认初始值为空
                    _this.initValue = typeToData[type];
                }
            }
        },
        /* 如果是url,需要发送请求,如果要在本地测试的话，你需要指向一下fiddler，并将html的路径改为线上的路径
         * parameter:传入的请求数据
         * callback:成功之后，执行回调函数
         */
        requestAjaxFn: function(parameter, callback) {
            var _this = this;
            $.ajax({
                url: parameter.url || '',
                dataType: 'json',
                data: parameter.data || {},
                timeout: parameter.timeout || '0', //代表永不超时
                success: function(data) {
                    if (data && data != null) {
                        $.each(parameter.field.split('.'), function(i, v) {
                            data = data[v];
                        });
                        callback(data);
                    } else {
                        console.log('数据出错了');
                    }
                },
                error: function() {
                    console.log('请求失败了');
                }
            });
        },
        /* -----------------自定义方法------------------- */
        /*自定义事件绑定*/
        on: function(type, handler) {
            var _this = this;
            if (typeof _this.handlers[type] == "undefined") {
                _this.handlers[type] = [];
            }
            _this.handlers[type].push(handler);
            return this;
        },
        /*自定义事件释放
         * this指向ele
         * data为函数里面的参数
         * return false 之后会阻断同类的函数执行
         * */
        fire: function(type, ele, data) {
            var _this = this;
            if (_this.handlers[type] instanceof Array) {
                var handlers = _this.handlers[type];
                for (var i = 0, len = handlers.length; i < len; i++) {
                    var temp = handlers[i].call(ele, data);
                    if (temp === false) {
                        break;
                    }
                }
            }
        },
        /*---------------对外的方法----------------- */
        /* 设置数据，防止报错 */
        setData: function() {},
        /**
         * @description 设置值方法
         * @param {object/string/function} parameter - 传入的参数
         * @example
         * var calendar = new DropDownCalendar({配置参数});
         * 设置值方法1：
         *      calendar.setValue({
         *           startTime；'2017-01-01',
         *           endTime:'2017-02-02'
         *      });
         * 设置值方法2：
         *      calendar.setValue('2017-01-01 ~ 2017-02-02');
         * 设置值方法3：
         *      calendar.setValue(function(callback){
         *           callback('2017-01-01 ~ 2017-02-02');
         *      });
         * 设置值方法4：
         *      calendar.setValue(function(callback){
         *           callback({
         *               startTime；'2017-01-01',
         *               endTime:'2017-02-02'
         *           });
         *      });
         * 设置值方法5：
         *      calendar.setValue({
         *           url；'',//请求
         *           data:{},//数据
         *           timeout:'0',//超时时间
         *           field:''//取值的字段
         *      });
         */
        setValue: function(parameter) {
            var _this = this;
            _this.setValueFn(parameter);
        },
        /*设置默认值*/
        setDefaultValue: function(parameter) {
            var _this = this;
            _this.dealType('object', parameter, function(data) {
                _this.defaultValue = $.extend(true, {}, data);
                _this.setValueFn(parameter);
            });
        },
        /**
         * @description 获取值
         * @param {requestCallback} [callback] -回调函数
         * @return {object} 当前的数据:{startTime:'',endTime:''}
         * @example
         * var calendar = new DropDownCalendar({配置参数});
         * 获取值方法1：
         *      calendar.getValue(function(value){
         *          //value则为当前值
         *      });
         * 获取值方法2：
         *      calendar.getValue();//直接返回当前值
         */
        getValue: function(callback) {
            var _this = this;
            if (callback) {
                return callback(_this.value);
            } else {
                return _this.value;
            }
        },
        /**
         * @description 重置
         * @example
         * var calendar = new DropDownCalendar({配置参数});
         * calendar.reset();
         */
        reset: function() {
            var _this = this;
            _this.setValueFn(_this.initValue);
            _this.wrap && _this.wrap.removeClass('triangle-up').addClass('triangle-down');
        },
        /**
         * @description 清除
         * @example
         * var calendar = new DropDownCalendar({配置参数});
         * calendar.clear();
         */
        clear: function() {
            var _this = this;
            _this.calendar.trigger('datepicker-empty', {
                value: '',
                date1: '',
                date2: ''
            });
            _this.wrap && _this.wrap.removeClass('triangle-up').addClass('triangle-down');
        },
        /**
         * @description 摧毁
         * @param {boolean} [all] -是否摧毁全部，默认只摧毁菜单
         * @example
         * var calendar = new DropDownCalendar({配置参数});
         * calendar.destroy();
         */
        destroy: function(all) {
            var _this = this;
            _this.handlers = {}; //把自定义事件清掉
            _this.dropMenu && _this.dropMenu.destroy();
            _this.wrap && _this.wrap.removeClass('triangle-up').addClass('triangle-down');
            all && _this.wrap.remove();
        },
        /**
         * @description 隐藏
         * @param {boolean} [all] -是否隐藏全部，默认只隐藏菜单
         * @example
         * var calendar = new DropDownCalendar({配置参数});
         * calendar.hide();
         */
        hide: function(all) {
            var _this = this;
            _this.close(all);
        },
        /**
         * @description 显示
         * @param {boolean} [all] -是否显示全部，默认只显示菜单
         * @example
         * var calendar = new DropDownCalendar({配置参数});
         * calendar.show();
         */
        show: function(all) {
            var _this = this;
            _this.open(all);
        },
        /**
         * @description 触发改变
         * @param {requestCallback} callback -回调函数
         * @example
         * var calendar = new DropDownCalendar({配置参数});
         * calendar.change(function(value){
         *      //value为当前值
         * });
         */
        change: function(callback) {
            var _this = this;
            callback && _this.on('change', callback);
        },
        /**
         * @description 禁用
         * @example
         * var calendar = new DropDownCalendar({配置参数});
         * calendar.disable();
         */
        disable: function() {
            var _this = this;
            _this.opts.isDisabled = true;
            _this.opts.readOnly = true;
            _this.wrap.css({
                "cursor": 'no-drop'
            });
            _this.wrap.unbind('click');
            _this.destroy();
        },
        /**
         * @description 启用
         * @example
         * var calendar = new DropDownCalendar({配置参数});
         * calendar.enable();
         */
        enable: function() {
            var _this = this;
            _this.opts.isDisabled = false;
            _this.opts.readOnly = false;
            _this.wrap.css({
                "cursor": 'pointer'
            });
            _this.calendar = _this.wrap.dateRangePicker(_this.opts.menu);
            _this.dropMenu = _this.wrap.data('dateRangePicker');
            _this.bindEventCalendar();
        },
        /**
         * @description 关闭（隐藏）
         * @param {boolean} [all] -是否关闭（隐藏）全部，默认只关闭（隐藏）菜单
         * @example
         * var calendar = new DropDownCalendar({配置参数});
         * calendar.close();
         */
        close: function(all) {
            var _this = this;
            _this.wrap && _this.wrap.removeClass('triangle-up').addClass('triangle-down');
            _this.dropMenu.close();
            all && _this.wrap.hide();
        },
        /**
         * @description 打开（显示）
         * @param {boolean} [all] -是否打开（显示）全部，默认只打开（显示）菜单
         * @example
         * var calendar = new DropDownCalendar({配置参数});
         * calendar.open();
         */
        open: function(all) {
            var _this = this;
            _this.wrap.data('dateRangePicker') && _this.wrap.data('dateRangePicker').open();
            _this.dropMenu.open();
            all && _this.wrap.show();
        }
    };
    return Base.extend(DropDownCalendar);
});
