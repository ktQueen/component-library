/**
 * 下拉框选择菜单组件
 * @module drop_down
 */
define([
    'modules/drop_down_single/js/single',
    'modules/drop_down_single_search/js/single_search',
    'modules/drop_down_multiple/js/multiple',
    'modules/drop_down_multiple_search/js/multiple_search',
    'modules/drop_down_calendar/js/calendar'
], function(
    DropDownSingle,
    DropDownSingleSearch,
    DropDownMultiple,
    DropDownMultipleSearch,
    DropDownCalendar
) {
    /**
     * @class
     * @classdesc 下拉框选择菜单组件：这是一个下拉框选择菜单组件，是一个集合组件（集成5个子组件），集成了下拉单选菜单组件，下拉单选搜索菜单组件，下拉多选菜单组件，下拉多选搜索菜单组件，下拉时间选择菜单组件，根据配置调用不同的子组件。
     * @alias DropDown
     * @author kt
     * @since 2017-03-20
     *
     * @param {object|array} opts - 配置参数:如果是object则是配置一个，配置参见各个子组件配置，如果是array，则为多个[{参见各个子组件配置},{参见各个子组件配置}]
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    function DropDownMenu(opts) {
        this.init(opts);
    }
    DropDownMenu.prototype = {
        init: function(obj) {
            var _this = this;
            if (obj.length) {
                _this.menu = [];
                $.each(obj, function(i, v) {
                    _this.newMenuArr(v);
                });
            } else {
                _this.menu = null;
                _this.newMenuOne(obj)
            }
        },
        /*根据类型创建不同的菜单*/
        newMenuArr: function(obj) {
            var _this = this;
            if (obj.type == "single") {
                _this.menu.push(new DropDownSingle(obj));
            }
            if (obj.type == "singleSearch") {
                _this.menu.push(new DropDownSingleSearch(obj));
            }
            if (obj.type == "multiple") {
                _this.menu.push(new DropDownMultiple(obj));
            }
            if (obj.type == "multipleSearch") {
                _this.menu.push(new DropDownMultipleSearch(obj));
            }
            if (obj.type == "calendar") {
                _this.menu.push(new DropDownCalendar(obj));
            }
        },
        newMenuOne: function(obj) {
            var _this = this;
            if (obj.type == "single") {
                _this.menu = new DropDownSingle(obj);
            }
            if (obj.type == "singleSearch") {
                _this.menu = new DropDownSingleSearch(obj);
            }
            if (obj.type == "multiple") {
                _this.menu = new DropDownMultiple(obj);
            }
            if (obj.type == "multipleSearch") {
                _this.menu = new DropDownMultipleSearch(obj);
            }
            if (obj.type == "calendar") {
                _this.menu = new DropDownCalendar(obj);
            }
        },


        /*---------------对外的方法----------------- */
        /* 方法公共
         *parameter：需要传递的参数
         *num：执行第几个元素的方法
         *type：执行哪个方法
         */
        commonWay: function(parameter, num, type) {
            var _this = this;
            if (_this.menu.length) {
                if (num) {
                    return _this.menu[num][type] ? _this.menu[num][type](parameter) : '';
                } else {
                    $.each(_this.menu, function(i, v) {
                        (v[type] ? v[type](parameter ? parameter[i] : "") : '');
                    });
                }
            } else {
                return _this.menu[type] ? _this.menu[type](parameter) : '';
            }
        },
        /**
         * @description 设置数据方法
         * @param {array|object|function} parameter - 传入的参数(时间选择：没有这个属性),参见各个子组件的配置方式
         * @param {string} [num] - num为设置第几个的数据,num从0开始，不存在设置的是全部数据
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.setData({
         *          id:'1',
         *          name:'啦啦啦'
         *      },1)
         */
        setData: function(parameter, num) {
            var _this = this;
            _this.commonWay(parameter, num, 'setData');
        },
        /**
         * @description 设置值方法
         * @param {array|object|function} parameter - 传入的参数,参见各个子组件的配置方式
         * @param {string} [num] - num为设置第几个的值,num从0开始，不存在设置的是全部值
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.setValue({
         *          id:'1',
         *          name:'啦啦啦'
         *      },1)
         */
        setValue: function(parameter, num) {
            var _this = this;
            _this.commonWay(parameter, num, 'setValue');
        },
        /*设置默认值*/
        setDefaultValue: function(parameter, num) {
            var _this = this;
            _this.commonWay(parameter, num, 'setDefaultValue');
        },
        /**
         * @description 获取值
         * @param {requestCallback} [callback] -回调函数
         * @param {string} [num] - num为获取第几个的值,num从0开始，不存在获取的是全部值
         * @return {array} 当前的数据
         * @example
         * var dropDown = new DropDown({配置参数});
         * 获取值方法1：
         *      dropDown.getValue(function(value){
         *          //value则为当前值
         *      });//返回值为回调函数执行结果
         * 获取值方法2：
         *      dropDown.getValue();//返回值为当前数据
         */
        getValue: function(callback, num) {
            var _this = this;
            if (_this.menu.length) { //如果是多个
                if (num) { //若果有num，则去当前num的值
                    return _this.menu[num].getValue(callback);
                } else {
                    var resultArr = [];
                    var resultIdArr = [];
                    var resultNameArr = [];
                    $.each(_this.menu, function(i, v) {
                        v.getValue(function(result, resultId, resultName) {
                            resultArr.push(result);
                            resultIdArr.push((resultId == undefined ? result : resultId));
                            resultNameArr.push((resultName == undefined ? result : resultName));
                            if (resultArr.length == _this.menu.length) {
                                if (callback) {
                                    return callback(resultArr, resultIdArr, resultNameArr);
                                } else {
                                    return resultArr;
                                }
                            }
                        });
                    });
                }
            } else {
                if (callback) {
                    return _this.menu.getValue(callback);
                } else {
                    return _this.menu.getValue();
                }
            }
        },
        /* 获取数据ID的集合 */
        getValueId: function(num) {
            var _this = this;
            return _this.commonWay('', num, 'getValueId');
        },
        /* 获取数据Name的集合 */
        getValueName: function() {
            var _this = this;
            return _this.commonWay('', num, 'getValueName');
        },
        /**
         * @description 触发改变
         * @param {requestCallback} callback -回调函数
         * @param {string} [num] - num为数字，标识改变哪一个
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.change(function(value){
         *      //value为当前值
         * });
         */
        change: function(callback, num) {
            var _this = this;
            _this.isArr = true;
            if (_this.menu.length) {
                if (num) {
                    _this.menu[num].change(callback);
                } else {
                    var m = 0
                    $.each(_this.menu, function(i, v) {
                        v.change(function() {
                            _this.getValue(function(value, result) {
                                m++;
                                if (_this.isArr) { //如果是第一次的话或者重置和清除，则需要处理一下，不让执行多次
                                    if (_this.menu.length == m) {
                                        callback(value, result);
                                        _this.isArr = false;
                                        m = 0;
                                    }
                                } else { //以后的话就改变一次执行一次
                                    callback(value, result);
                                    _this.isArr = false;
                                    m = 0;
                                }
                            });
                        });
                    });
                }
            } else {
                _this.menu.change(function(value) {
                    callback(value);
                });
            }
        },
        /**
         * @description 重置
         * @param {string} [num] - num为重置第几个的值,num从0开始，不存在重置的是全部值
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.reset();
         */
        reset: function(num) {
            var _this = this;
            _this.commonWay('', num, 'reset');
        },
        /**
         * @description 清除
         * @param {string} [num] - num为清除第几个的值,num从0开始，不存在清除的是全部值
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.clear();
         */
        clear: function(num) {
            var _this = this;
            _this.commonWay('', num, 'clear');
        },
        /**
         * @description 摧毁:默认只摧毁菜单
         * @param {boolean} [all] -all为布尔值，如果入true就连按钮一起摧毁
         * @param {string} [num] - 标识摧毁哪一个，不存在摧毁的是全部
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.destroy();
         */
        destroy: function(all, num) {
            var _this = this;
            _this.commonWay(all, num, 'destroy');
        },
        /**
         * @description 显示，集合的显示，菜单下拉框和时间时间下拉框不会同时出现
         * @param {boolean} all -为布尔值，如果入true就连按钮一起显示
         * @param {string} [num] - 标识显示哪一个，不存在显示的是全部
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.show();
         */
        show: function(all, num) {
            var _this = this;
            _this.commonWay(all, num, 'show');
        },
        /**
         * @description 隐藏
         * @param {boolean} all -all为布尔值，如果入true就连按钮一起隐藏
         * @param {string} [num] - 标识隐藏哪一个，不存在隐藏的是全部
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.hide();
         */
        hide: function(all, num) {
            var _this = this;
            _this.commonWay(all, num, 'hide');
        },
        /**
         * @description 禁用
         * @param {string} [num] - 标识禁用哪一个，不存在禁用的是全部
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.disable();
         */
        disable: function(num) {
            var _this = this;
            _this.commonWay('', num, 'disable');
        },
        /**
         * @description 启用
         * @param {string} [num] - 标识启用哪一个，不存在启用的是全部
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.enable();
         */
        enable: function(num) {
            var _this = this;
            _this.commonWay('', num, 'enable');
        },
        /**
         * @description 是否必填，单选才有的方法
         * @param {boolean} isRequired -是否必填
         * @param {string} [num] - 标识必填哪一个，不存在必填的是全部
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.required(false,1);
         */
        required: function(isRequired,num) {
            var _this = this;
            _this.commonWay(isRequired, num, 'required');
        }
    };
    return DropDownMenu;
});