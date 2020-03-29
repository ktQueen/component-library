/**
 * 表单字段纯文本组件
 * @module form_field_plainText
 */
define([
    'modules/form_field_base/js/form_field_base_way1'
], function(Base) {
    /**
     * @class
     * @classdesc 表单字段纯文本组件
     * @alias FormFieldPlainText
     * @extends form_field_base_way1
     * @author kt
     * @since 2017-7-21
     *
     * @param {object} opts - 配置参数
     * @param {string} opts.name='' - 必填，唯一标识，不能重复
     * @param {dom} opts.element='' - 必填，当前需要生成表单字段的元素
     * @param {string} opts.type='plainText' - 必填，要创建的表单字段的类型
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
     * @requires 'jquery'
     * @requires 'require'
     */
    var FormFieldPlainText=function(){};
    FormFieldPlainText.prototype = {
        /* 初始化 */
        init: function(opts) {
            var _this = this;
            _this.value = ''; //存储当前值
            _this.parameterSetting(opts); //参数设置
            _this.createFormField(); //创建表单元素
            _this.elementSetting(); //元素获取
            _this.styleSetting(); //样式设置
            _this.opts.initDone && _this.opts.initDone.call(_this.$field); //表单元素初始化完成之后执行，this指向整个表单字段
            _this.valueFn(_this.opts.value); //设置值
            _this.isHideFn();
        },
        /* 参数设置*/
        parameterSetting:function(opts){
            var _this = this;
            _this.commonParameterSetting($.extend(true,{
                type: 'plainText', //要创建的表单字段的类型
            },opts));
        },
        /* 创建字段 */
        createFormField: function() {
            var _this = this;
            _this.ownClass='form-field-plainText';//根据不同的类型给每个字段添加私有的class
            var attrHtml = 'name="' + _this.opts.name + '"'+
                    'class="form-field-element"';
            _this.createFormFieldBase({
                eleHtml: '<div ' + attrHtml + '></div>'
            });
        },
        /*设置值*/
        valueFn: function(parameter) {
            var _this = this;
            _this.dealType('string', parameter, _this.valueToPage, 'setValue');
        },
        valueToPage: function(value, _this) {
            if (_this.value != value) {
                _this.$element.html(value);
                _this.value = value; //将当前值进行存储
                _this.$field && _this.plainTextStyle();
                var timer=setTimeout(function() {//这里的setTimeout是因为change
                    clearTimeout(timer);
                    //_this.$field && _this.plainTextStyle();
                    _this.$field && _this.opts.validators && _this.opts.formValidatorsCallback && _this.opts.formValidatorsCallback();
                    _this.$field && _this.fire('change', _this.$element, _this.value); //值改变之后触发
                }, 0);
            }
        },
        //纯文本放入样式处理，大表单里面如果是纯文本最开始的时候设置了为0px,当有数据了之后则宽度是自动的
        plainTextStyle: function() {
            var _this = this;
            if (!_this.opts.style.width) {
                _this.$field.css({
                    width: 'auto'
                });
            }
        }
    };
    return Base.extend(FormFieldPlainText);
});