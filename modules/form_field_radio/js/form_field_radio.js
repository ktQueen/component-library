/**
 * 表单字段单选框组件
 * @module form_field_radio
 */
define([
    'modules/form_field_base/js/form_field_base_way2',
    'modules/utils/true_or_false',
    'modules/utils/data_type'
], function(Base, trueOrFalse) {
    /**
     * @class
     * @classdesc 表单字段单选框组件
     * @alias FormFieldRadio
     * @extends form_field_base_way2
     * @author kt
     * @since 2017-7-25
     *
     * @param {object} opts - 配置参数
     * @param {string} opts.name='' - 必填，唯一标识，不能重复
     * @param {dom} opts.element='' - 必填，当前需要生成表单字段的元素
     * @param {string} opts.type='radio' - 必填，要创建的表单字段的类型
     * @param {string} [opts.className=''] - 可以为当前元素添加class
     * @param {object} [opts.style={}] - 设置样式
     * @param {string} [opts.layout='left-right'] - 布局，一种为上下结构'up-down'，一种为左右结构'left-right'，默认为左右结构布局
     * @param {function} [opts.initDone=null] - 表单元素初始化完成,this指向整个表单字段
     * @param {function} [opts.change=null] - return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
     * @param {boolean} [opts.isShowRequired=false] - 当必填的时候是否显示必填标志，默认是隐藏的
     * @param {string} [opts.requiredLocation='before'] - 必填标志的位置，可以在字段前before，也可以在末尾显示before， 默认在字段前显示
     * @param {string} [opts.title=''] - 标题
     * @param {object} [opts.titleStyle={}] - 标题样式
     * @param {object} [opts.contentStyle={}] - 内容样式
     * @param {boolean} [opts.readOnly=false] - 是否只读，默认不是只读，当设置了disabled，则同步设置了readOnly
     * @param {boolean} [opts.disabled=false] - 是否禁用，默认不禁用
     * @param {string} [opts.tip=''] - 在表单字段组件下面一行添加提示文字
     * @param {string} [opts.value=''] - 默认为'',在这里设置的value则是默认值，也是初始值
     *
     * @param {string} [opts.idFlag='id'] - 数据形式
     * @param {string} [opts.nameFlag='name'] - 数据形式
     * @param {array|object|function} opts.data='' - 数据的形式一定有id,name值,结果为数组形式，单个也可以为object形式
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    var FormFieldRadio=function(){};
    FormFieldRadio.prototype = {
        /*初始化*/
        init: function(opts) {
            var _this = this;
            _this.value = []; //存储当前值
            _this.parameterSetting(opts); //参数设置
            _this.opts.isRequired=true;//单选，先暂时设为必填
            _this.createFormField(); //创建表单元素
            _this.elementSetting(); //元素获取
            _this.styleSetting(); //样式设置
            _this.opts.initDone && _this.opts.initDone.call(_this.$field); //表单元素初始化完成之后执行，this指向整个表单字段
            _this.dataFn(_this.opts.data); //数据处理
            _this.valueFn(_this.opts.value); //设置值
            _this.bindEvent(); //事件绑定
            _this.isHideFn();
        },
        /* 参数设置*/
        parameterSetting:function(opts){
            var _this = this;
            _this.commonParameterSetting($.extend(true,{
                type: 'radio', //要创建的表单字段的类型
                idFlag: 'id', //数据形式
                nameFlag: 'name', //数据形式
                data: '', //array/object/function,数据的形式一定有id,name值,结果为数组形式，单个也可以为object形式
                'data-name':'',//如果页面有两个表单的情况下，name配置是一样的，那么单选选择是有问题的
                getValueKey:''//获取值的时候取值要Id还是name
            },opts));
        },
        /* 创建字段 */
        createFormField: function() {
            var _this = this;
            _this.ownClass='form-field-radio';//根据不同的类型给每个字段添加私有的class
            _this.createFormFieldBase({
                eleHtml: '<div class="form-field-element" ' +
                        (trueOrFalse(_this.opts.name) ? ('name=' + _this.opts.name) : '') +
                        '></div>'
            });
        },
        /* 数据处理 */
        dataFn: function(parameter) {
            var _this = this;
            _this.dealType('array', parameter, _this.dataToPage);
        },
        dataToPage: function(data, _this) {
            var html = '';
            $.each(data, function(i, v) {
                html += '<label class="single-radio">'+
                            '<input type="radio"'+
                               (trueOrFalse(_this.opts['data-name']?_this.opts['data-name']:_this.opts.name) ? ('name=' + _this.opts['data-name']?_this.opts['data-name']:_this.opts.name+'radio') : '') +
                                ' value="' + (v[_this.opts.idFlag]==undefined ? '':v[_this.opts.idFlag]) + '"'+
                                    (trueOrFalse(v.readOnly) ? 'readOnly' : (trueOrFalse(_this.opts.readOnly) ? 'readOnly' : '')) +
                                    (trueOrFalse(v.disabled) ? 'disabled' : (trueOrFalse(_this.opts.disabled) ? 'disabled' : '')) +
                            '/>'+
                            '<span class="single-radio-con">' + v[_this.opts.nameFlag] + '</span>'+
                        '</label>';
            });
            _this.data=$.extend(true,[],data);
            _this.$element.html(html);
            _this.$radio = _this.$element.find('input[type="radio"]');
            _this.valueToPage(_this.value, _this);
        },
        /* 设置值处理 */
        valueFn: function(parameter) {
            var _this = this;
            _this.dealType('array', parameter, _this.valueToPage, 'setValue');
        },
        valueToPage: function(value, _this) {
            _this.$radio && _this.$radio.prop('checked', false).removeAttr('checked').removeClass('checked');
            if (value.length > 0) {
                _this.$radio && _this.$radio.each(function() {
                    var $this = $(this);
                    if ($this.attr('value') == value[0][_this.opts.idFlag]) {
                        $this.prop('checked', true).attr('checked', 'checked').addClass('checked');
                    }
                });
            }
            if (JSON.stringify(_this.value) != JSON.stringify(value)) {
                _this.value = $.extend(true, [], value); //将当前值进行存储
                setTimeout(function() {
                    _this.opts.validators && _this.opts.formValidatorsCallback && _this.opts.formValidatorsCallback();
                    _this.fire('change', _this.$ele, _this.value.length>0?_this.value[0]:''); //值改变之后触发
                }, 0);
            }
        },
        /* 绑定事件 */
        bindEvent: function() {
            var _this = this;
            _this.$field.on('click', '.single-radio', function(e) {
                var $this = $(this).find('input[type="radio"]');
                if (trueOrFalse($this.attr('disabled')) || trueOrFalse($this.attr('readOnly'))) {
                    return false;
                } else {
                    if (!!$this.attr('checked')) { //已经选中，如果是必选则不做操作，如果不是必选则取消
                        if (!trueOrFalse(_this.opts.isRequired)) { //不是必选可以取消
                            _this.valueFn({});
                        } else { //是必选
                            return false;
                        }
                    } else { //没有选中，就去选中
                        var currentValue={};
                        $.each(_this.data, function(i, v) {
                            if (v[_this.opts.idFlag] ==$this.attr('value')) {
                                currentValue = v;
                            }
                        });
                        _this.valueFn(currentValue);
                    }
                }
                return false;
            });
        },
        /*获取值处理:单选得到的是一个对象*/
        getValueResult:function(){
            var _this = this;
            var result='';
            result=$.extend(true,[],_this.value);
            result=result.length>0?result[0]:'';
            return result;
        }
    };
    return Base.extend(FormFieldRadio);
});