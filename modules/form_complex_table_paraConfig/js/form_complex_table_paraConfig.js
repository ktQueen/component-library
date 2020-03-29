/**
 * 表单表格配置组件
 * @module form_complex_tableParaConfig
 */
define([
    'modules/form_complex_base/js/form_complex_base',
    'modules/form_complex_base/js/form_complex_manager'
], function(Base,Manager) {
    /**
     * @class
     * @classdesc 表单表格配置组件
     * @alias FormComplexTableParaConfig
     * @extends form_complex_base
     * @author kt
     * @since 2017-8-9
     *
     * @param {object} opts - 配置参数
     * @param {string} opts.name='' - 必填，唯一标识，不能重复
     * @param {dom} opts.element='' - 必填，当前需要生成表单字段的元素
     * @param {string} opts.type='tableParaConfig' - 必填，要创建的表单字段的类型
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
     * @param {string} [opts.maxNum=''] - 添加的条数限制
     * @param {string} [opts.isHide=false] - 是否隐藏，默认是显示的
     *
     * @param {array} [opts.childrenThead=[] - 表头内容
     * @param {array} [opts.childrenTbody=[] - 表格内容，只用配置一行的数据，如果要设置值请用setValue方法
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    var FormTableParaConfig=function(){};
    FormTableParaConfig.prototype = {
        /*初始化*/
        init: function(opts) {
            var _this = this;
            _this.parameterSetting(opts);
            _this.createFormComplex();
            _this.elementSetting();
            _this.styleSetting();
            _this.opts.initDone && _this.opts.initDone.call(_this.$field);
            _this.createTable();
            _this.bindEvent();
            _this.isHideFn();
        },
        /* 参数设置*/
        parameterSetting:function(opts){
            var _this = this;
            _this.commonParameterSetting($.extend(true,{
                type: 'tableParaConfig', //要创建的表单字段的类型
                childrenThead:[],
                childrenTbody:[]
            },opts));
        },
        ownClass:'form-complex-tableParaConfig',//根据不同的类型给每个字段添加私有的class
    };
    Manager.FormComplexTableParaConfig= Base.extend(FormTableParaConfig);
    return Manager.FormComplexTableParaConfig
});