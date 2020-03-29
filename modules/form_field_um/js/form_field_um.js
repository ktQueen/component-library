/**
 * 表单字段富文本组件
 * @module form_field_um
 */
define([
    'modules/form_field_base/js/form_field_base_way3',
    'modules/utils/true_or_false',
    'modules/utils/data_type',
    'modules/um/js/um'
], function (Base,trueOrFalse, dataType ,Um) {
    /**
     * @class
     * @classdesc 富文本编辑
     * @alias FormFieldUm
     * @extends form_field_base_way3
     * @author 安文真
     * @since 2017-10-19
     *
     * @param {object} opts - 配置参数
     * @param {string} opts.element='' - 当前传入的元素
     * @param {string} opts.setValue='' - 设置标签值
     * @param {string} [opts.initialFrameWidth] - 文件编辑框的宽度 100
     * @param {string} [opts.initialFrameHeight] - 文件编辑框的高度 100
     * @param {string} [opts.UMEDITOR_HOME_URL] - um文件路径路径
     * @param {string} [opts.imageUrl] - 上传路径
     * @param {string} [opts.imageFieldName] - 图片名称
     * @param {function} [opts.getOperationDom] - 回调函数  参数是um
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    var FormFieldUm = function () {};
    FormFieldUm.prototype={
        init:function(opts) {
            var _this = this;
            _this.parameterSetting(opts);
            _this.createFormField(); //创建表单元素
            _this.elementSetting(); //元素获取
            _this.styleSetting(); //样式设置
            _this.opts.initDone && _this.opts.initDone.call(_this.$field); //表单元素初始化完成之后执行，this指向整个表单字段
            _this.createUm(); //标签样式
            _this.isHideFn();
        },

        parameterSetting:function (opts) {
            var _this = this;
            if (!opts) opts = {};
            _this.commonParameterSetting($.extend(true,{
                type: 'umEditor', //编辑器元素
                width : "",//宽
                height: "",//高
                homeUrl:'../libs/um/',//路径
                value:'',
                imageUrl:'',
                imageFieldName:"",
                getOperationDom:"" //回调函数 返回um
            }, opts));
        } ,

        /*创建表单字段*/
        createFormField: function () {
            var _this = this;
            _this.ownClass='form-field-um';//根据不同的类型给每个字段添加私有的class
            _this.createFormFieldBase({
                eleHtml: '<div class="form-field-element" ' +
                (trueOrFalse(_this.opts.name) ? ('name=' + _this.opts.name) : '') +
                '></div>'
            });
        },
        createUm:function () {
            var _this = this;
            var configObject=$.extend(true,{},_this.opts);
            configObject=$.extend(true,configObject,{
                element:_this.$element,//当前传入的元素
                setValue:_this.opts.value,//设置标签值
                initialFrameWidth : _this.opts.width,//宽
                initialFrameHeight: _this.opts.height,//高
                UMEDITOR_HOME_URL:_this.opts.homeUrl,//路径
                imageUrl:_this.opts.imageUrl,
                imageFieldName:_this.opts.imageFieldName,
                getOperationDom:_this.opts.getOperationDom, //回调函数 返回um
                change:function(value){
                    _this.opts.validators && _this.opts.formValidatorsCallback && _this.opts.formValidatorsCallback();
                    _this.fire('change', _this.$element, value);
                }
            });
            _this.upperModule = new Um(configObject);
        }
    };
    return Base.extend(FormFieldUm);
});

