/**
 * @author kt
 * @description 表单组件的基础文件
 * @date 2017-8-9
 */
require.config({
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min',
    }
});
define([
    'jquery',
    'modules/utils/extend',
    'modules/utils/true_or_false',
    'modules/utils/data_type'
], function($, Class, trueOrFalse, dataType) {
    var Common = {
        /*默认隐藏*/
        isHideFn: function() {
            var _this = this;
            if (_this.opts.isHide) {
                _this.hide();
            }
        },
        /*联动操作
         * curObj块配置里面的每一个行配置
         * */
        linkHandle: function(i, v, _this, curObj) {
            _this[v.event](v.name, function() {
                if (_this.functionDeal(v.condition, v.name, true, curObj)) { //满足执行条件
                    $.each(v.toDo, function(index, value) {
                        if (_this.functionDeal(value.condition, v.name, true, curObj)) { //如果有执行条件先通过执行条件
                            if (value.way == 'setValue' || value.way == 'setData' || value.way == 'required') { //不同的方法调用形式不一样
                                if (dataType(value.url)) {
                                    $.each(value.data, function (dataIndex, dataValue) {
                                        if (dataType(dataValue) == 'function') {
                                            value.data[dataIndex] = dataValue(v.name, _this);
                                        }
                                    });
                                    $.ajax({
                                        url: value.url,
                                        data: value.data,
                                        dataType: 'json',
                                        success: function (data) {
                                            if (value.success) {
                                                value.success(data);
                                            } else {
                                                if (data && data != null) {
                                                    var dat = $.extend(true, {}, data);
                                                    $.each(value.field.split('.'), function (i, v) {
                                                        dat = (dataType(dat[v]) == 'string' ? JSON.parse(dat[v]) : dat[v]);
                                                    });
                                                     var obj={};
                                                    obj[value.name]=dat;
                                                    _this[value.way](obj, curObj && curObj.$dom.index());
                                                } else {
                                                    console.log('数据出错了');
                                                }
                                            }
                                        }
                                    });
                                } else {
                                    if (value.param) {
                                        var obj={};
                                        obj[value.name]=_this.functionDeal(value.param, v.name, '', curObj);
                                        _this[value.way](obj, curObj && curObj.$dom.index());
                                    }
                                }
                            } else if (value.way == 'show' || value.way == 'hide') {
                                _this[value.way](value.name, curObj && curObj.$dom.index());
                            }
                        }
                        if (value.way == 'onlyShow') {
                            if (_this.functionDeal(value.condition, v.name, false, curObj)) {
                                _this.show(value.name, curObj && curObj.$dom.index());
                            } else {
                                _this.hide(value.name, curObj && curObj.$dom.index());
                            }
                        }
                    });
                }
            }, curObj);
        },
        /*处理数据的类型
         * type,希望最终的类型，string
         * parameter，传入的数据,
         *      function
         *          function(callback){
         *              callback(data);
         *          }
         *      array
         *          [
         *              {id:'1',name:'文本'},
         *              {id:'2',name:'文本22'},
         *          ]
         *      object,如果没有url，直接转成数据
         *          {
         *              url:'',
         *              data:{},
         *              timeout:0,
         *              field:''
         *          }
         *      string
         *          ''
         * fn,回调function
         * flag,是设置值还是数据setValue/setData，string
         * val为搜索输入框传进来的值,string
         * */
        dealType: function(type, parameter, fn, flag, valInput) {
            var val = valInput; //这里把||''去掉了，因为下面的请求会存在判断undefined的情况
            var _this = this;
            if (dataType(parameter) == 'function') { //如果传进来的数据是function，将回调函数里的数据取出来
                parameter.call(_this, function(data) { //这里为什么要return呢，我把它删掉了，执行函数，并将this指向_this,取出数据
                    _this.dealType(type, data, fn, flag, val);
                }, val || '');
                return false; //阻断后续操作
            }
            if (dataType(parameter) == 'object') { //传入的是对象形式，如果有url就是一个请求，没有则是一条数据
                if (parameter.url) {
                    function parameterToFunction(callback, valInput) {
                        _this.requestAjaxFn(parameter, callback, valInput);
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
            if (dataType(parameter) == 'array') { //如果数组，需要的却是对象，则取数组中的第一个元素
                if (type == 'object') {
                    parameter = parameter[0];
                }
            }
            if (dataType(parameter) == 'number') { //如果是数字，需要的是字符串，则把数组转为字符串
                if (type == 'string') {
                    parameter = parameter + "";
                }
            }
            var typeToData = '';
            if (dataType(parameter) == type) {
                typeToData = {
                    'string': parameter,
                    'array': $.extend(true, [], parameter),
                    'object': $.extend(true, {}, parameter)
                }
                if (_this.initData == undefined && flag == 'setData') { //设置初始数据
                    _this.initData = typeToData[type];
                }
                if (_this.defaultValue == undefined && flag == 'setValue') { //设置默认值,如果没有设置默认值的情况，设置的值则是初始值
                    _this.defaultValue = typeToData[type];
                }
                if (_this.initValue == undefined && flag == 'setValue') { //没有设置数据，或者数值的数据不对则默认初始值为空
                    _this.initValue = typeToData[type];
                }
                fn(parameter, _this);
            } else {
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
        requestAjaxFn: function(parameter, callback, valInput) {
            var _this = this;
            if (valInput) { //如果死有搜索框的输入的话，需要将输入框的值传进去
                parameter.data.input = valInput || '';
            }
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
         * param是一个对象，对象里可以扩展参数
         * return false 之后会阻断同类的函数执行
         * */
        fire: function(type, ele, data, param) {
            var _this = this;
            if (_this.handlers[type] instanceof Array) {
                var handlers = _this.handlers[type];
                for (var i = 0, len = handlers.length; i < len; i++) {
                    var temp = handlers[i].call(ele, data, param);
                    if (temp === false) {
                        break;
                    }
                }
            }
        }
    };
    var Base = Class.extend(Common);
    return Base;
});