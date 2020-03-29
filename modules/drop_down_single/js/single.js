/**
 * 下拉框单选菜单组件
 * @module drop_down_single
 */
define([
    'modules/drop_down_base/js/drop_down_base',
    'modules/drop_down_single/js/single_menu'
], function(Base, Single) {
    /**
     * @class
     * @classdesc 下拉框单选菜单组件
     * @alias DropDownSingle
     * @extends drop_down_base
     * @author kt
     * @since 2017-4-28
     *
     * @param {object} opts - 配置参数
     * @param {dom} opts.element='' - 必填，btn放的位置
     * @param {string} [opts.btnAddClass=''] - btn添加class
     * @param {object} [opts.btnStyle={}] - btn的相关样式
     * @param {dom} [opts.showElement=''] - 设置元素显示值的位置，如果没有设置，则默认为element放置选择的值
     * @param {string} [opts.placeholder=''] - 按钮显示的提示文字
     * @param {boolean} [opts.isDisabled=false] - 按钮是否可点击
     * @param {boolean} [opts.readOnly=false] - 按钮是否是只读状态
     * @param {boolean} [opts.isIcon=true] - 是否显示下拉按钮
     * @param {function} [opts.beforeClick=null]] - 最终执行完后返回值是一个布尔值，如果是false可以阻断进程s
     * @param {dom} [opts.menuElement='']] - menu放的位置，默认放在body
     * @param {string} [opts.menuAddClass=''] - menu添加class
     * @param {object} [opts.menuStyle={}] - 菜单扩展的样式，如果是只有菜单的情况下，则不设置默认样式，如果有下拉按钮的情况下，将菜单设置为定位且是不可见状态
     * @param {string} [opts.menuListShowWay=''] - 菜单列表显示形式，如果是one单行就用...,默认为''，显示所有内容
     * @param {string} [opts.idFlag='id'] - 数据的key值
     * @param {string} [opts.nameFlag='name'] - 数据的key值
     * @param {object|function|array} [opts.setValue=null] - 设置值，可以为object/function/array,但是数据最终纯为object/array
     * @param {object|function|array} opts.setData=null - 设置数据，可以为object/function/array,但是数据最终纯为object/array
     * @param {function} [opts.initDone=null] - 下拉菜单整体初始化完成触发,function
     * @param {function} [opts.change=null] - 值改变触发
     * @param {boolean} [opts.isOnlyMenu=false] - 是否只有菜单，默认为false,，为true时就没有按钮的相关设置
     *
     * @param {string} opts.type='single' - 要创建的表单字段的类型
     * @param {boolean} [opts.isRequired=false] - 是否必填，如果不是必填，则选中之后可以取消选中，如果是必填，则只能修改选中项，不能取消
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    var DropDownSingle=function(){};
    DropDownSingle.prototype = {
        /*初始化*/
        init: function(opts) {
            var _this = this;
            _this.execute(opts, Single);
        },
        /* 参数设置*/
        parameterSetting:function(opts){
            var _this = this;
            _this.commonParameterSetting($.extend(true,{
                type: 'single', //要创建的表单字段的类型
                isRequired: false //是否必填，如果不是必填，则选中之后可以取消选中，如果是必填，则只能修改选中项，不能取消
            },opts));
        }
    };
    return Base.extend(DropDownSingle);
});