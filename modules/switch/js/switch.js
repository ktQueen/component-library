/**
 * 过滤条上的排序功能组件
 * @module switch
 */
require.config({
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min',
        'cssFile': 'modules/libs/rq/css.min'
    }
});
define([
    'jquery',
    'modules/utils/data_type',
    'cssFile!modules/switch/css/switch'
], function($, dataType) {
    /**
     * @class
     * @classdesc 过滤条上的排序功能组件
     * @alias Switch
     * @author kt
     * @since 2017-03-20
     *
     * @param {object} opts - 配置参数
     * @param {dom} opts.element="" - 选择元素
     * @param {string} [opts.placeholder=""] - 元素默认显示的文本
     * @param {boolean} [opts.isDisabled=false] - 是否不可用，默认为false可用
     * @param {object} [opts.btnStyle={}] - btn的相关样式
     * @param {object} [opts.btnAddClass=""] - 添加class
     * @param {function} [opts.beforeClick=null] - 最终执行完后返回值是一个布尔值
     * @param {boolean} [opts.isIcon=true] - 是否显示图标，默认显示
     * @param {string} [opts.type="switch"] - 该组件为开关
     * @param {function} [opts.change=null] - 值改变执行的参数方法
     * @param {string|function} [opts.setValue=''] - 设置值
     * @param {string} [opts.switchRule="down"] - 默认为down,与上面一种任选一种设置
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    function Switch(opts) {
        this.init(opts)
    }
    Switch.prototype = {
        init: function(opts) {
            var _this = this;
            _this.value = '';
            _this.optsSet(opts);
            _this.createHtml();
            _this.style();
            _this.valueFn(_this.opts.setValue || 'down');
            _this.bindEvent();
        },
        /*参数设置*/
        optsSet: function(opts) {
            var _this = this;
            if (!opts) opts = {};
            opts = $.extend(true, {
                element: '', //btn放的位置
                placeholder: '', //btn提示的文字
                readOnly: false, //是否只读
                isDisabled: false, //是否禁用默认为false
                btnStyle: {}, //btn的相关样式
                btnAddClass: '', //btn添加class
                beforeClick: null, //最终执行完后返回值是一个布尔值
                isIcon: true, //是否显示图标
                type: 'switch', //类型
                change: null, //值改变事件
                setValue: 'down' //设置值
            }, opts);
            if (!opts.element) return;
            _this.opts = opts;
            /*存储自定义事件*/
            _this.handlers = {};
            _this.opts.change && _this.on('change', _this.opts.change);
        },
        /*创建html*/
        createHtml: function() {
            var _this = this;
            _this.opts.element.addClass('switch-sort').html('<span class="showtext">' + _this.opts.placeholder + '</span>');
            _this.opts.isIcon && _this.opts.element.addClass('switch-icon');
            _this.wrap = _this.opts.element;
            if (_this.opts.isDisabled) {
                _this.wrap.css({
                    "cursor": 'no-drop'
                })
            }
            _this.wrap.addClass(_this.opts.btnAddClass).attr('title', _this.opts.placeholder);
        },
        /*设置当前btn的样式*/
        style: function() {
            var _this = this;
            $.each(_this.opts.btnStyle, function(i, v) {
                _this.wrap.css(i, v);
            });
        },
        valueFn: function(parameter) {
            var _this = this;
            _this.dealType('string', parameter, _this.valueToPage, 'setValue');
        },
        dealType: function(type, parameter, fn, flag, val) {
            var val = val || '';
            var _this = this;
            if (dataType(parameter) == 'function') {
                parameter.call(_this, function(data) {
                    _this.dealType(type, data, fn, flag, val);
                    return false;
                }, val);
            }
            if (dataType(parameter) == 'object') {
                if (parameter.url) {
                    function parameterToFunction(callback) {
                        _this.requestAjaxFn(parameter, callback);
                    }
                    _this.dealType(type, parameterToFunction, fn, flag, val);
                    return false;
                } else {
                    if (type == 'array') {
                        parameter = [parameter];
                        _this.dealType(type, parameter, fn, flag, val);
                        return false;
                    }
                }
            }
            if (dataType(parameter) == type) {
                if (_this.initValue == undefined && flag == 'setValue') {
                    if (type == 'string') {
                        _this.initValue = parameter;
                    } else if (type == 'array') {
                        _this.initValue = $.extend(true, [], parameter);
                    } else if (type == 'object') {
                        _this.initValue = $.extend(true, {}, parameter);
                    }
                }
                fn(parameter, _this);
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
        valueToPage: function(value, _this) {
            if (_this.opts.beforeClick) {
                if (_this.opts.beforeClick.call(_this.wrap, _this.value) === false) {
                    return false;
                }
            }
            _this.value = value;
            _this.currentClass(_this.value);
            setTimeout(function() {
                _this.fire('change', _this.wrap, _this.value);
            }, 0);
        },
        /*样式*/
        currentClass: function(value) {
            var _this = this;
            if (value == 'down') {
                _this.wrap.removeClass('switch-icon-up').addClass('switch-icon-down');
            } else if (value == 'up') {
                _this.wrap.removeClass('switch-icon-down').addClass('switch-icon-up');
            }
        },
        /*绑定事件*/
        bindEvent: function() {
            var _this = this;
            _this.wrap.on('click', function() {
                if (!_this.opts.isDisabled && !_this.opts.readOnly) {
                    _this.valueFn(_this.value == 'down' ? "up" : 'down');
                    return false;
                }
            })
        },
        /* ------------------------- 自定义方法----------------- */
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
        /* ------------------ 外部调用方法--------------- */
        /*设置数据*/
        setData: function() {},
        /**
         * @description 设置值方法
         * @param {string|object|function} parameter - 传入的参数
         * @example
         * var switch = new Switch({配置参数});
         * 设置值方法1：
         *      Switch.setValue('up');
         * 设置值方法2：
         *      fuzzySearch.setValue(function(callback){
         *           callback('up');//必须要执行callback
         *      });
         * 设置值方法3：
         *      fuzzySearch.setValue({
         *           url:'',//请求
         *           data:{},//数据
         *           timeout:'0',//超时时间
         *           field:''//取值的字段
         *      });
         */
        setValue: function(parameter) {
            var _this = this;
            _this.valueFn(parameter);
        },
        /**
         * @description 获取值
         * @param {requestCallback} [callback] -回调函数
         * @return {String} 当前的数据
         * @example
         * var switch = new Switch({配置参数});
         * 获取值方法1：
         *      switch.getValue(function(value){
         *          //value则为当前值
         *      });//返回值为回调函数执行结果
         * 获取值方法2：
         *      switch.getValue();//返回值为当前数据
         */
        getValue: function(callback) {
            var _this = this;
            if (!callback) { //如果一个参数都没有，则直接返回数据
                return _this.value;
            } else {
                return callback(_this.value);
            }
        },
        /**
         * @description 触发改变
         * @param {requestCallback} callback -回调函数
         * @example
         * var switch = new Switch({配置参数});
         * switch.change(function(value){
         *      //value为当前值
         * });
         */
        change: function(callback) {
            var _this = this;
            callback && _this.on('change', callback);
        },
        /**
         * @description 重置
         * @example
         * var switch = new Switch({配置参数});
         * fuzzySearch.reset();
         */
        reset: function() {
            var _this = this;
            _this.valueFn(_this.initValue);
        },
        /**
         * @description 清除
         * @example
         * var switch = new Switch({配置参数});
         * switch.clear();
         */
        clear: function() {
            var _this = this;
            _this.valueFn('down');
        },
        /**
         * @description 摧毁
         * @example
         * var switch = new Switch({配置参数});
         * switch.destroy();
         */
        destroy: function() {
            var _this = this;
            _this.handlers={};//把自定义事件清掉
            _this.wrap.remove();
        },
        /**
         * @description 显示
         * @example
         * var switch = new Switch({配置参数});
         * switch.show();
         */
        show: function() {
            var _this = this;
            _this.wrap.show();
        },
        /**
         * @description 隐藏
         * @example
         * var switch = new Switch({配置参数});
         * switch.hide();
         */
        hide: function() {
            var _this = this;
            _this.wrap.hide();
        },
        /**
         * @description 禁用
         * @example
         * var switch = new Switch({配置参数});
         * switch.disable();
         */
        disable: function() {
            var _this = this;
            _this.wrap.css({
                "cursor": 'no-drop'
            });
            _this.opts.isDisabled = true;
            _this.opts.readOnly = true;
        },
        /**
         * @description 启用
         * @example
         * var switch = new Switch({配置参数});
         * switch.enable();
         */
        enable: function() {
            var _this = this;
            _this.wrap.css({
                "cursor": 'pointer'
            });
            _this.opts.isDisabled = false;
            _this.opts.readOnly = false;
        },
    }
    return Switch;
});