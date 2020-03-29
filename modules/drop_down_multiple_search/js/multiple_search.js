/**
 * 下拉框多选搜索菜单组件
 * @module drop_down_multiple_search
 */
define([
    'modules/drop_down_base/js/drop_down_base',
    'modules/drop_down_multiple_search/js/multiple_search_menu'
], function(Base, MultipleSearch) {
    /**
     * @class
     * @classdesc 下拉框多选搜索菜单组件
     * @alias DropDownMultipleSearch
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
     * @param {string} opts.type='multipleSearch' - 要创建的表单字段的类型
     * @param {boolean} [opts.isAllData=false] - 搜索下拉框的数据是否一次获取的是全部数据，默认一次拿到的不是所有数据,只有单选搜索和多选搜索才有的配置，单选和多选的数据不会有重复请求的情况
     * @param {boolean} [opts.isSearch=true] - 搜索下拉框是否有搜索,默认是有的
     * @param {string} [opts.searchPlaceholder=''] - 搜索下拉框中的搜索框提示文字
     * @param {string} [opts.searchDefaultField=''] - 搜索下拉框中标识文字
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    var DropDownMultipleSearch=function(){};
    DropDownMultipleSearch.prototype = {
        /*初始化*/
        init: function(opts) {
            var _this = this;
            _this.execute(opts, MultipleSearch);
        },
        /* 参数设置*/
        parameterSetting:function(opts){
            var _this = this;
            _this.commonParameterSetting($.extend(true,{
                type: 'multipleSearch', //要创建的表单字段的类型
                isAllData: false, //搜索下拉框的数据是否一次获取的是全部数据，默认一次拿到的不是所有数据,只有单选搜索和多选搜索才有的配置，单选和多选的数据不会有重复请求的情况
                isSearch: true, //搜索下拉框是否有搜索,默认是有的
                searchPlaceholder: '', //搜索下拉框中的搜索框提示文字
                searchDefaultField: '', //搜索下拉框中标识文字
            },opts));
        }
    };
    return Base.extend(DropDownMultipleSearch);
});