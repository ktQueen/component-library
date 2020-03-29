/**
 * 表单字段文本类组件
 * @module form_field_text
 */
define([
    'modules/form_field_base/js/form_field_base_way1',
    'modules/utils/true_or_false'
], function (Base, trueOrFalse) {
    /**
     * @class
     * @classdesc 表单字段单行输入框，密码输入框，多行文本域输入框,隐藏域组件
     * @alias FormFiledText
     * @extends form_field_base_way1
     * @author kt
     * @since 2017-7-21
     *
     * @param {object} opts - 配置参数
     * @param {string} opts.name='' - 必填，唯一标识，不能重复
     * @param {dom} opts.element='' - 必填，当前需要生成表单字段的元素
     * @param {string} opts.type='' - 必填，要创建的表单字段的类型，text/textarea/password/hidden/textareaAuto
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
     * @param {string} [opts.placeholder=''] - 提示文字
     * @param {string} [opts.maxlength=''] - 最大字符数
     * @param {boolean} [opts.isTipWordNumber=false] - 是否提示剩余字数
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    var FormFiledText = function () {
    };
    FormFiledText.prototype = {
        /* 初始化 */
        init: function (opts) {
            var _this = this;
            _this.value = ''; //存储当前值
            _this.parameterSetting(opts); //参数设置
            _this.createFormField(); //创建表单元素
            _this.elementSetting(); //元素获取
            _this.textareaAutoFn();
            _this.styleSetting(); //样式设置
            _this.opts.initDone && _this.opts.initDone.call(_this.$field); //表单元素初始化完成之后执行，this指向整个表单字段
            _this.valueFn(_this.opts.value); //设置值
            _this.bindEvent(); //事件绑定
            _this.isHideFn();
        },
        /* 参数设置*/
        parameterSetting: function (opts) {
            var _this = this;
            _this.commonParameterSetting($.extend(true, {
                type: '', //要创建的表单字段的类型
                placeholder: '', //提示文字
                maxlength: '', //最大字符数
                isTipWordNumber: false,//是否提示剩余字数
                inputEvent: null,//input监听事件执行
                isCheck:true
            }, opts));
        },
        /* 创建字段 */
        createFormField: function () {
            var _this = this;
            _this.ownClass = 'form-field-' + _this.opts.type;//根据不同的类型给每个字段添加私有的class
            var attrHtml = 'type="' + _this.opts.type + '"'+
                           'name="' + _this.opts.name + '"'+
                           'placeholder="' + _this.opts.placeholder + '"'+
                           (trueOrFalse(_this.opts.maxlength) ? 'maxlength="' + _this.opts.maxlength +'"': '') +
                           (trueOrFalse(_this.opts.readOnly) ? 'readOnly="readOnly"' : '') +
                           (trueOrFalse(_this.opts.disabled) ? 'disabled="disabled"' : '') +
                           ' class="form-field-element"';
            var typeHtml = {
                'textarea': '<textarea ' + attrHtml + '></textarea>',
                'textareaAuto': '<div ' + attrHtml + ' contenteditable="true"></div>'
            };
            _this.createFormFieldBase({
                eleHtml: typeHtml[_this.opts.type] || '<input ' + attrHtml + '/>'
            });
        },
        /*多行文本自动换行*/
        textareaAutoFn: function () {
            var _this = this;
            if (_this.opts.type == 'textareaAuto') {
                require(['modules/utils/contenteditable'], function () {
                    _this.$element.contentEditable();
                });
            }
        },
        /* 设置值*/
        valueFn: function (parameter) {
            var _this = this;
            _this.dealType('string', parameter, _this.valueToPage, 'setValue');
        },
        valueToPage: function (value, _this) {
            //如果没有input监听的情况下_this.value!=value则触发值改变
            //如果有input监听的情况下,因为在输入的过程中就会去校验value值是否符合要求，所有_this.value永远等于value
            if((!_this.opts.inputEvent && _this.value != value)
                    ||(_this.opts.inputEvent && ((_this.inputEvent )||(!_this.inputEvent && _this.value != value)))){
                if (_this.opts.type == 'textareaAuto') {
                    _this.$element.html(value);
                } else {
                    _this.$element.val(value);
                }
                _this.value = value; //将当前值进行存储
                setTimeout(function () {
                    _this.opts.isCheck && _this.opts.validators && _this.opts.formValidatorsCallback && _this.opts.formValidatorsCallback();
                    _this.fire('change', _this.$element, _this.value); //值改变之后触发
                }, 0);
            }
        },
        /* 绑定事件 */
        bindEvent: function () {
            var _this = this;
            //失焦事件
            _this.$element.on('blur', function () {
                if (_this.opts.type == 'textareaAuto') {//多行文本自动换行
                    _this.valueFn(_this.$element.html());
                } else {
                    _this.valueFn($.trim(_this.$element.val()));
                }
            });
            //剩余字数提示
            _this.$element.on('input', function () {
                var value = '';
                if (_this.opts.type == 'textareaAuto') {
                    value = _this.$element.text();
                } else {
                    value = _this.$element.val()
                }
                if (_this.opts.isTipWordNumber) {
                    var wordNum = value.length;
                    _this.$field.find('.form-TipWordNumber').remove();
                    if (_this.opts.maxlength) {
                        _this.$content.append('<p class="form-TipWordNumber">您已经输入<span>' + wordNum + '</span>字，还可以输入<span>' + (_this.opts.maxlength - wordNum) + '</span>字</p>');
                    } else {
                        _this.$content.append('<p class="form-TipWordNumber">您已经输入<span>' + wordNum + '</span>字</p>');
                    }
                }
                if (_this.opts.inputEvent) {
                    _this.value = value;
                    _this.inputEvent=true;
                    _this.opts.inputEvent.call(_this.$element, value);
                }
            });
        }
    };
    return Base.extend(FormFiledText);
});