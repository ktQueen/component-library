/**
 * 表单字段文件上传组件
 * @module form_field_upload
 */
define([
    'modules/form_field_base/js/form_field_base_way3',
    'modules/utils/true_or_false',
    'modules/utils/data_type',
    'modules/upload/js/upload',
], function(Base, trueOrFalse, dataType, Upload) {
    /**
     * @class
     * @classdesc 表单字段文件上传组件
     * @alias FormFieldUpload
     * @extends form_field_base_way3
     * @author 安文真
     * @since 2017-7-21
     *
     * @param {object} opts - 配置参数
     * @param {string} opts.name='' - 必填，唯一标识，不能重复
     * @param {dom} opts.element='' - 必填，当前需要生成表单字段的元素
     * @param {string} opts.type='upload' - 必填，要创建的表单字段的类型
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
     * @param {string} [opts.url=''] - 文件保存地址
     * @param {string} [opts.uploadBtnText='上传'] - 上传按钮文本
     * @param {boolean} [opts.multiple=false] -是否传递多个文件；true可以选择多个文件上传 ，false不可以
     * @param {string} [opts.formName="upfile"] - 表单名称
     * @param {string} [opts.fileName="fileName"] - 文件 input的名称
     * @param {object} [opts.extendData={}] -
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    var FormFieldUpload = function() {};
    FormFieldUpload.prototype = {
        // 初始化
        init: function(opts) {
            var _this = this;
            _this.parameterSetting(opts);
            _this.createFormField();
            _this.elementSetting();
            _this.styleSetting();
            _this.opts.initDone && _this.opts.initDone.call(_this.$field); //表单元素初始化完成之后执行，this指向整个表单字段
            _this.createUpload();
            _this.isHideFn();
        },
        /* 参数设置*/
        parameterSetting: function(opts) {
            var _this = this;
            _this.commonParameterSetting( $.extend(true, {
                type: 'upload', //要创建的表单字段的类型
                url: '',
                accept: [], //数组限制文件类型
                acceptRemark:"上传文件类型不符合要求",//文件类型提示语
                maxSize:"",//文件大小
                maxSizeRemark:"文件大小不符合要求",//文件大小提示语
                drag: false, //是否拖拽上传
                uploadBtnText: '上传',
                uploadBtnTextDevelop:"上传中",//文件上传中按钮显示值
                multiple: false, //是否传递多个文件；true可以选择多个文件上传 ，false不可以
                formName: "upfile", //表单名称
                fileName: "fileName", //文件 input的名称
                echoStyle:false,//返回内容回显风格
                fileNum:true,
                fileNumRemark:"上传文件个数大于限制个数",//上传文件个数提示语
                responseKeys: { "repCode": "repCode", "repData": "repData", "message": "message" }, //上传成功后 返回的数据 状态 数据 和 信息的key
                uploadedFileKeys: { "fileName": "fileName", "fileUrl": "fileUrl","fileSize":"fileSize" }, //返回的数据的格式 文件名  和 文件 路径
                extendData: {}
            }, opts));
        },
        /*创建表单字段*/
        createFormField: function() {
            var _this = this;
            _this.ownClass = 'form-field-upload'; //根据不同的类型给每个字段添加私有的class
            _this.createFormFieldBase({
                eleHtml: '<div class="form-field-element" ' +
                    (trueOrFalse(_this.opts.name) ? ('name=' + _this.opts.name) : '') + '></div>'
            });
        },
        //创建提示标签
        createUpload: function() {
            var _this = this;
            var configObject=$.extend(true,{},_this.opts);
            configObject=$.extend(true,configObject,{
                 element: _this.$element,
                 change:function(value){
                     _this.opts.validators && _this.opts.formValidatorsCallback && _this.opts.formValidatorsCallback();
                     _this.fire('change', _this.$element, value);
                 }
            });
            _this.upperModule = new Upload(configObject);
        }
    };
    return Base.extend(FormFieldUpload);
});