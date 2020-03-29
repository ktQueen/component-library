/**
 * 过滤器组件
 * @module filter_bar
 */
define([
    'modules/drop_down/js/drop_down',
    'modules/fuzzy_search/js/fuzzy_search',
    'modules/switch/js/switch',
    'modules/utils/data_type',
    'modules/utils/function_deal',
], function(dropDownMenu, FuzzySearch, Switch, dataType,functionDeal) {
    /**
     * @class
     * @classdesc 这是一个过滤器控件，支持单选，多选，单选模糊搜索，多选模糊搜索，时间选择，排序，模糊查询，通过传入的类型生成不同的筛选条件。
     * @alias FilterBar
     * @author kt
     * @since 2017-03-20
     *
     * @param {object|array} opts - 配置参数:如果是object则是配置一个，配置参见各个子组件配置，如果是array，则为多个[{参见各个子组件配置},{参见各个子组件配置}]
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    function Filter(obj) {
        this.init(obj);
    }
    Filter.prototype = {
        init: function(obj) {
            var _this = this;
            if (dataType(obj) == 'object') {
                _this.filter = null;
                obj=functionDeal(obj);
                _this.newFilterOne(obj);
            } else if (dataType(obj) == 'array') {
                _this.filter = [];
                $.each(obj, function(i, v) {
                    v=functionDeal(v);
                    _this.newFilterArr(v);
                })
            }
            $(document).unbind('scroll');
        },
        newFilterOne: function(obj) {
            var _this = this;
            obj.isArr = true;
            if (obj.type == 'single' || obj.type == 'multipleSearch' || obj.type == 'multiple' || obj.type == 'singleSearch') {
                _this.filter = new dropDownMenu(obj);
            } else if (obj.type == 'fuzzySearch') {
                _this.filter = new FuzzySearch(obj);
            } else if (obj.type == 'calendar') {
                _this.filter = new dropDownMenu(obj);
            } else if (obj.type == 'switch') {
                _this.filter = new Switch(obj);
            }
            if (obj.element.get(0) && obj.element.get(0).nodeName.toLowerCase() == 'input') {
                obj.element.parent().addClass('filter');
            } else {
                obj.element.addClass('filter');
            }
        },
        newFilterArr: function(obj) {
            var _this = this;
            obj.isArr = true;
            if (obj.type == 'single' || obj.type == 'multipleSearch' || obj.type == 'multiple' || obj.type == 'singleSearch') {
                _this.filter.push(new dropDownMenu(obj));
            } else if (obj.type == 'fuzzySearch') {
                _this.filter.push(new FuzzySearch(obj));
            } else if (obj.type == 'calendar') {
                _this.filter.push(new dropDownMenu(obj));
            } else if (obj.type == 'switch') {
                _this.filter.push(new Switch(obj));
            }
            if (obj.element.get(0) && obj.element.get(0).nodeName.toLowerCase() == 'input') {
                obj.element.parent().addClass('filter');
            } else {
                obj.element.addClass('filter');
            }
        },
        /**
         * @description 设置数据方法
         * @param {array|object|function} parameter - 传入的参数(时间选择：没有这个属性),参见各个子组件的配置方式
         * @param {string} [num] - num为设置第几个的数据,num从0开始，不存在设置的是全部数据
         * @example
         * var filterBar = new FilterBar({配置参数});
         * filterBar.setData({
         *          id:'1',
         *          name:'啦啦啦'
         *      },1)
         */
        setData: function(parameter, num) {
            var _this = this;
            if (_this.filter.length) {
                if (num) {
                    _this.filter[num].setData(parameter);
                } else {
                    $.each(_this.filter, function(i, v) {
                        v.setData(parameter[i]);
                    });
                }
            } else {
                _this.filter.setData(parameter);
            }
        },
        /**
         * @description 设置值方法
         * @param {array|object|function} parameter - 传入的参数,参见各个子组件的配置方式
         * @param {string} [num] - num为设置第几个的值,num从0开始，不存在设置的是全部值
         * @example
         * var filterBar = new FilterBar({配置参数});
         * filterBar.setValue({
         *          id:'1',
         *          name:'啦啦啦'
         *      },1)
         */
        setValue: function(parameter, num) {
            var _this = this;
            if (_this.filter.length) {
                if (num) {
                    _this.filter[num].setValue(parameter);
                } else {
                    _this.isArr = true;
                    $.each(_this.filter, function(i, v) {
                        v.setValue(parameter[i]);
                    });
                }
            } else {
                _this.filter.setValue(parameter);
            }
        },
        /**
         * @description 获取值
         * @param {requestCallback} [callback] -回调函数
         * @param {string} [num] - num为获取第几个的值,num从0开始，不存在获取的是全部值
         * @return {array} 当前的数据
         * @example
         * var filterBar = new FilterBar({配置参数});
         * 获取值方法1：
         *      filterBar.getValue(function(value){
         *          //value则为当前值
         *      });//返回值为回调函数执行结果
         * 获取值方法2：
         *      filterBar.getValue();//返回值为当前数据
         */
        getValue: function(callback, num) {
            var _this = this;
            if (_this.filter.length) { //如果是多个
                if (num) { //若果有num，则去当前num的值
                    return _this.filter[num].getValue(callback);
                } else {
                    var resultArr = [];
                    var resultIdArr = [];
                    var resultNameArr = [];
                    var n = 0;
                    $.each(_this.filter, function(i, v) {
                        v.getValue(function(result, resultId, resultName) {
                            resultArr[i] = result;
                            resultIdArr[i] = (resultId == undefined ? result : resultId);
                            resultNameArr[i] = (resultName == undefined ? result : resultName);
                            n++;;
                            if (n == _this.filter.length) {
                                if (callback) {
                                    return callback(resultArr, resultIdArr, resultNameArr);
                                } else {
                                    return resultArr;
                                }
                            }
                        });
                    });
                    return resultArr;
                }
            } else {
                if (callback) {
                    return _this.filter.getValue(callback);
                } else {
                    return _this.filter.getValue();
                }
            }
        },
        /**
         * @description 触发改变
         * @param {requestCallback} callback -回调函数
         * @param {string} [num] - num为数字，标识改变哪一个
         * @example
         * var filterBar = new FilterBar({配置参数});
         * filterBar.change(function(value){
         *      //value为当前值
         * });
         */
        change: function(callback, num) {
            var _this = this;
            _this.isArr = true;
            if (_this.filter.length) {
                if (num) {
                    _this.filter[num].change(callback);
                } else {
                    var m = 0;
                    $.each(_this.filter, function(i, v) {
                        v.change(function() {
                            _this.getValue(function(value, result) {
                                m++;
                                if (_this.isArr) { //如果是第一次的话或者重置和清除，则需要处理一下，不让执行多次
                                    if (_this.filter.length == m) {
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
                _this.filter.change(function() {
                    _this.getValue(function(value, result) {
                        callback(value, result);
                    });
                });
            }
        },
        /**
         * @description 重置
         * @param {string} [num] - num为重置第几个的值,num从0开始，不存在重置的是全部值
         * @example
         * var filterBar = new FilterBar({配置参数});
         * filterBar.reset();
         */
        reset: function(num) {
            var _this = this;
            if (_this.filter.length) {
                if (num) {
                    _this.filter[num].reset();
                } else {
                    _this.isArr = true;
                    $.each(_this.filter, function(i, v) {
                        v.reset();
                    });
                }
            } else {
                _this.filter.reset();
            }
        },
        /**
         * @description 清除
         * @param {string} [num] - num为清除第几个的值,num从0开始，不存在清除的是全部值
         * @example
         * var filterBar = new FilterBar({配置参数});
         * filterBar.clear();
         */
        clear: function(num) {
            var _this = this;
            if (_this.filter.length) {
                if (num) {
                    _this.filter[num].clear();
                } else {
                    _this.isArr = true;
                    $.each(_this.filter, function(i, v) {
                        v.clear();
                    });
                }
            } else {
                _this.filter.clear();
            }
        },
        /**
         * @description 摧毁:默认只摧毁菜单
         * @param {boolean} [all] -all为布尔值，如果入true就连按钮一起摧毁
         * @param {string} [num] - 标识摧毁哪一个，不存在摧毁的是全部
         * @example
         * var filterBar = new FilterBar({配置参数});
         * filterBar.destroy();
         */
        destroy: function(all, num) {
            var _this = this;
            if (_this.filter.length) {
                if (num) {
                    _this.filter[num].destroy(all);
                } else {
                    $.each(_this.filter, function(i, v) {
                        v.destroy(all);
                    });
                }
            } else {
                _this.filter.destroy(all);
            }
        },
        /**
         * @description 显示，集合的显示，菜单下拉框和时间时间下拉框不会同时出现
         * @param {boolean} all -为布尔值，如果入true就连按钮一起显示
         * @param {string} [num] - 标识显示哪一个，不存在显示的是全部
         * @example
         * var filterBar = new FilterBar({配置参数});
         * filterBar.show();
         */
        show: function(all, num) {
            var _this = this;
            if (_this.filter.length) {
                if (num) {
                    _this.filter[num].show(all);
                } else {
                    $.each(_this.filter, function(i, v) {
                        v.show(all);
                    });
                }
            } else {
                _this.filter.show(all);
            }
        },
        /**
         * @description 隐藏
         * @param {boolean} all -all为布尔值，如果入true就连按钮一起隐藏
         * @param {string} [num] - 标识隐藏哪一个，不存在隐藏的是全部
         * @example
         * var filterBar = new FilterBar({配置参数});
         * filterBar.hide();
         */
        hide: function(all, num) {
            var _this = this;
            if (_this.filter.length) {
                if (num) {
                    _this.filter[num].hide(all);
                } else {
                    $.each(_this.filter, function(i, v) {
                        v.hide(all);
                    });
                }
            } else {
                _this.filter.hide(all);
            }
        },
        /**
         * @description 禁用
         * @param {string} [num] - 标识禁用哪一个，不存在禁用的是全部
         * @example
         * var filterBar = new FilterBar({配置参数});
         * filterBar.disable();
         */
        disable: function(num) {
            var _this = this;
            if (_this.filter.length) {
                if (num) {
                    _this.filter[num].disable();
                } else {
                    $.each(_this.filter, function(i, v) {
                        v.disable();
                    });
                }
            } else {
                _this.filter.disable();
            }
        },
        /**
         * @description 启用
         * @param {string} [num] - 标识启用哪一个，不存在启用的是全部
         * @example
         * var filterBar = new FilterBar({配置参数});
         * filterBar.enable();
         */
        enable: function(num) {
            var _this = this;
            if (_this.filter.length) {
                if (num) {
                    _this.filter[num].enable();
                } else {
                    $.each(_this.filter, function(i, v) {
                        v.enable();
                    });
                }
            } else {
                _this.filter.enable();
            }
        }
    };
    return Filter;
});