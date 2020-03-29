/**
 * 表单校验组件
 * @module form_verify
 */
require.config({
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min'
    }
});
define([
    'jquery',
    'modules/utils/byte_chinese',
    'modules/utils/data_type',
    'modules/utils/function_deal'
], function ($, byteChinese, dataType, functionDeal) {
    /**
     * @class
     * @classdesc 表单校验组件
     * @alias FormVerify
     * @author kt
     * @since 2017-9-11
     *
     * @param {object} opts - 配置参数
     * @param {string} [opts.byteChinese='1'] - 中文一个字符占几个字节,默认为一个字符占1个字节
     * @param {boolean} [opts.isCheckRemote=true] - 是否执行远端校验，为了查重的时候，在点击保存的时候，不再进行远端校验，这个是自己配置的
     * @param {array} opts.verify=null -校验规则数组，必填
     * @param {object} opts.verify[0]={} -校验规则示例
     * @param {string} opts.verify[0].name="" - 需要校验的元素的name,可以通过表单的getValue来作为值判断,必填
     * @param {string} [opts.verify[0].byteChinese="1"] - 中文一个字符占几个字节,默认为一个字符占1个字节
     * @param {string} [opts.verify[0].value="" ]- 需要校验的值,如果没有配置就是name对应的值
     * @param {boolean} [opts.verify[0].isCheck=true] - 是否执行校验，默认是执行的，这个是因为隐藏了当前元素的则不进行校验，得自己配才不校验
     * @param {array} [opts.verify[0].validators=null] - 校验规则数组，必填
     * @param {object} opts.verify[0].validators[0]={} - 校验规则示例
     * @param {string} opts.verify[0].validators[0].method='' - 校验的名称<br>
     * required-必填<br>
     * equalTo-与某个值相等<br>
     * maxLength-最大长度<br>
     * minLength-最小长度<br>
     * maxValue-最大值（包括边界）<br>
     * minValue-最小值（包括边界）<br>
     * gtValue-最大值（不包括边界）<br>
     * ltValue-最小值（不包括边界）<br>
     * regexp-正则表达式<br>
     * function-自己写逻辑,函数必须有返回值,返回false是逻辑校验失败<br>
     * remote-远端校验，跟后端的校验
     * @param {string} opts.verify[0].validators[0].param='' - 校验的相关参数
     * @param {string} opts.verify[0].validators[0].message='' - 校验的提示信息
     *
     * @return {object} formVerify 返回值
     * @return {object} formVerify.result 整体校验结果
     * @return {object} formVerify.result.name name校验结果
     * @return {object} formVerify.result.name.resultStatus 校验的结果error/success
     * @return {object} formVerify.result.name.resultMsg 校验结果相关的提示信息
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    function FormVerify(opts) {
        this.init(opts);
    }

    FormVerify.prototype = {
        /*初始化*/
        init: function (opts) {
            var _this = this;
            _this.result = {};
            _this.parameterSetting(opts);
            _this.checkAll();
        },
        /*参数设置*/
        parameterSetting: function (opts) {
            var _this = this;
            if (!opts) opts = {};
            opts = $.extend(true, {
                byteChinese: '1',//中文一个字符占几个字节,默认为一个字符占1个字节
                isCheckRemote: true,//是否执行远端校验，为了查重的时候，在点击保存的时候，不再进行远端校验，这个是自己配置的
                verify: null//校验规则数组，必填
            }, opts);
            _this.opts = opts;
        },
        /*校验全部*/
        checkAll: function () {
            var _this = this;
            for (var index = 0; index < _this.opts.verify.length; index++) {
                var value = _this.opts.verify[index];
                value = $.extend(true, {
                    name: '',//需要校验的元素的name,可以通过表单的getValue来作为值判断,必填
                    validators: null,//校验规则数组，必填
                    byteChinese: _this.opts.byteChinese,//中文一个字符占几个字节,默认为一个字符占1个字节
                    value: $('[name="' + value.name + '"]').val(),//需要校验的值,如果没有配置就是name对应的值
                    isCheck: true,//是否执行校验，默认是执行的，这个是因为隐藏了当前元素的则不进行校验，得自己配才不校验
                    isCheckRemote: true
                }, value);
                $.each(value.validators, function (i, v) {
                    return _this.checkRules(v, value);
                });
            }
        },
        /*校验规则
         * rule当前规则
         * ele,当前元素配置
         * * */
        checkRules: function (rule, ele) {
            var _this = this;
            if (ele.isCheck) {//如果配置的是执行校验的
                dataType(rule.param) == 'function' && (rule.param = rule.param(ele.value, ele));//如果param是function类型，去拿到返回值，赋给自己
                dataType(rule.method) == 'array' && (rule.method = rule.method[0].id);//用表单可视化工具生成的配置得到的是一个数组，再由于下拉框取值的数组bug,所有取数组的第一个的id（id是我在工具里面定的）
                switch (rule.method) {
                    case 'empty'://为空：判断为空就可以了，param为空
                        return _this.resultAndMsg(ele.value != rule.param, ele.name, ele.value, rule.message);
                        break;
                    case 'required'://必填：判断不为空就可以了，param为空
                        return _this.resultAndMsg(ele.value == rule.param, ele.name, ele.value, rule.message);
                        break;
                    case 'equalTo'://与某个值相等：判断两个值是否相等，param是比较的值，不用元素的原因是因为表单那边通过元素的val不一定拿到你想要的值
                        return _this.resultAndMsg(ele.value != rule.param, ele.name, ele.value, rule.message);
                        break;
                    case 'maxLength'://最大长度：判断长度，这个需要处理下中文的字符占几个字节
                        return _this.resultAndMsg(byteChinese(ele.value, ele.byteChinese) > rule.param, ele.name, ele.value, rule.message);
                        break;
                    case 'minLength'://最小长度：判断长度，这个需要处理下中文的字符占几个字节
                        return _this.resultAndMsg(byteChinese(ele.value, ele.byteChinese) < rule.param, ele.name, ele.value, rule.message);
                        break;
                    case 'maxValue'://最大值（包括边界）：判断值大小，需要处理下值是数字型的
                        return _this.resultAndMsg(Number(ele.value) >= rule.param, ele.name, ele.value, rule.message);
                        break;
                    case 'minValue'://最小值（包括边界）：判断值大小，需要处理下值是数字型的
                        return _this.resultAndMsg(Number(ele.value) <= rule.param, ele.name, ele.value, rule.message);
                        break;
                    case 'gtValue'://最大值（不包括边界）：判断值大小，需要处理下值是数字型的
                        return _this.resultAndMsg(Number(ele.value) > rule.param, ele.name, ele.value, rule.message);
                        break;
                    case 'ltValue'://最小值（不包括边界）：判断值大小，需要处理下值是数字型的
                        return _this.resultAndMsg(Number(ele.value) < rule.param, ele.name, ele.value, rule.message);
                        break;
                    case 'regexp'://正则表达式
                        if (dataType(rule.param) == 'string') {//如果写的是一个字符串类型的，正则无法解析，则需要用eval转一下
                            rule.param = eval(rule.param);
                        }
                        return _this.resultAndMsg(!rule.param.test(ele.value), ele.name, ele.value, rule.message);
                        break;
                    case 'function'://自己写逻辑,函数必须有返回值,返回false是逻辑校验失败
                        if (dataType(rule.param) == 'boolean') {
                            return _this.resultAndMsg(rule.param == false, ele.name, ele.value, rule.message);
                        } else if (rule.param && rule.param.indexOf('function') != -1 && rule.param.indexOf('(') != -1) {
                            rule.param = (new Function('return( ' + rule.param + ' );'))();
                            rule.param(ele.value);
                        } else {
                            console.log('致开发者：你的返回值传错了，只能是布尔值');
                            return false;
                        }
                        break;
                    case 'remote'://远端校验，跟后端的校验,请求成功和校验成功还需要处理
                        if (_this.opts.isCheckRemote) {//如果是单个校验的情况，走远端校验
                            if (ele.isCheckRemote) {//当前字段是否不是编辑状态执行远端校验
                                var data = {};
                                if (dataType(rule.param) == 'string') {
                                    rule.param = JSON.parse(rule.param);
                                    //处理从配置过来的function
                                    if (rule.param.data) {
                                        rule.param.data = functionDeal(rule.param.data);
                                    }
                                }
                                if (rule.param.data) {
                                    $.each(rule.param.data, function (i, v) {
                                        if (dataType(v) == 'function') {
                                            data[i] = v(ele.value);
                                        } else {
                                            data[i] = v;
                                        }
                                    });
                                }
                                $.ajax({
                                    url: rule.param.url,
                                    data: rule.param.data ? data : {
                                        val: ele.value
                                    },//校验提交的数据
                                    dataType: 'json',
                                    async: false,//默认是同步校验，不可以做异步校验
                                    success: function (data) {
                                        var result;
                                        if (data[rule.param.requestResult.code] == rule.param.requestResult.result) {//请求成功
                                            result = _this.resultAndMsg(data[rule.param.checkResult.code] == rule.param.checkResult.result, ele.name, ele.value, rule.message);//校验成功结果，不重复返回true（通过校验）,重复返回false（没通过检验）
                                        } else {
                                            result = _this.resultAndMsg(true, ele.name, ele.value, data[rule.param.requestResult.message] || '请求失败');
                                        }
                                        ele.element && ele.element.attr('isCheckRemote', !result)
                                        return result;
                                    },
                                    error: function (data) {
                                        return _this.resultAndMsg(true, ele.name, ele.value, data[rule.param.requestResult.message] || '请求出错了');
                                    }
                                });
                            } else {//当前是编辑状态不走远端校验
                                return true;
                            }
                        } else {//整体校验不走远端校验，但是单个的时候远端错误得保留提示
                            if (ele.element && ele.element.attr('isCheckRemote') == "true") {
                                return _this.resultAndMsg(true, ele.name, ele.value, rule.message);
                            } else {
                                return true;
                            }
                        }
                        break;
                    case ''://空方法,容错处理
                        return true;
                        break;
                    default:
                        console.log(rule);
                        console.log('没有对应的类型');
                }
            }
        },
        /*校验返回的结果和信息*/
        resultAndMsg: function (condition, name, value, message) {
            var _this = this;
            if (condition) {//错误条件满足
                _this.result[name] = {
                    resultStatus: 'error',
                    resultMsg: message,
                    value: value
                };
                return false;
            } else {
                _this.result[name] = {
                    resultStatus: 'success',
                    resultMsg: '你成功了',
                    value: value
                };
                return true;
            }
        },
        /**
         * @description 校验错误的个数
         * @return {number} 校验错误的个数
         * @example
         * var formVerify = new FormVerify({配置参数});
         * formVerify.errorNum();
         */
        errorNum: function () {
            var _this = this;
            var num = 0;
            $.each(_this.result, function (i, v) {
                v.resultStatus == 'error' && num++
            });
            return num;
        },
        /**
         * @description 重置:清空所有的数据
         * @example
         * var formVerify = new FormVerify({配置参数});
         * formVerify.reset();
         */
        reset: function () {
            var _this = this;
            _this.result = {};
        }
    };
    return FormVerify;
});