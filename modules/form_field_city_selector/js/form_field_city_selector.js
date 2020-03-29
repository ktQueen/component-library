/**
 * 表单字段选择菜单组件
 * @module form_field_select
 */
define([
    'modules/form_field_base/js/form_field_base_way3',
    'modules/utils/true_or_false',
    'modules/city_selector/js/city_selector'
], function(Base, trueOrFalse,CitySelector) {
    /**
     * @class
     * @classdesc 表单字段选择城市选择：面向于PC端的一款基于JQuery的、整体功能都比较完善的拼音分类和集成搜索功能的城市选择插件。城市单选，城市单选-只读，城市单选-禁止，城市多选，城市多选-自定义热门城市-搜索等插件功能。
     * @alias FormFieldCity
     * @extends form_field_base_way3
     * @author kt
     * @since 2017-7-21
     *
     * @param {object} opts - 配置参数
     * @param {string} opts.name='' - 必填，唯一标识，不能重复
     * @param {dom} opts.element='' - 必填，当前需要生成表单字段的元素
     * @param {string} opts.type='' - 必填，要创建的表单字段的类型，single/singleSearch/multiple/multipleSearch
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
     * @param {string} [opts.idFlag='id'] - 数据形式
     * @param {string} [opts.nameFlag='name'] - 数据形式
     * @param {array|object|function} opts.data='' - 数据的形式一定有id,name值,结果为数组形式，单个也可以为object形式
     * @param {object} [opts.menuStyle={}] - 菜单样式
     * @param {boolean} [opts.isSearch=true] - 默认是带搜索的(带搜索的下拉菜单)
     * @param {string} [opts.searchPlaceholder=''] - 默认搜索框显示的字段(带搜索的下拉菜单)
     * @param {boolean} [opts.isIcon=true] - 是否显示下拉图标
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    var FormFieldCity=function(){};
    FormFieldCity.prototype = {
        /*初始化*/
        init: function(opts) {
            var _this = this;
            _this.parameterSetting(opts); //参数设置
            _this.createFormField(); //创建表单元素
            _this.elementSetting(); //元素获取
            _this.styleSetting(); //样式设置
            _this.createCity(); //创建城市选择器
            _this.isHideFn();
        },
        /* 参数设置*/
        parameterSetting:function(opts){
            var _this = this;
            _this.commonParameterSetting($.extend(true,{
                type: 'city', //要创建的表单字段的类型
            },opts));
        },
        /*创建表单字段*/
        createFormField: function() {
            var _this = this;
            _this.ownClass='form-field-'+_this.opts.type;//根据不同的类型给每个字段添加私有的class
            _this.createFormFieldBase({
                eleHtml: '<div class="form-field-element" ' +
                    (trueOrFalse(_this.opts.name) ? ('name=' + _this.opts.name) : '') +
                    '></div>'
            });
        },
        /* 创建城市选择器 */
        createCity: function() {
            var _this = this;
            var configObject=$.extend(true,{},_this.opts);
            configObject=$.extend(true,configObject,{
                element: _this.$element, //btn放的位置
                change: function(value) { //改变事件
                    _this.opts.validators && _this.opts.formValidatorsCallback && _this.opts.formValidatorsCallback();
                    _this.fire('change', _this.$element, value);
                },
            });
            _this.upperModule = new CitySelector(configObject);
        },
        /**
         * @description 设置数据方法
         * @param {array|object|function} parameter - 传入的参数
         * @example
         * var formFiled = new FormFiled({配置参数});
         * 设置值方法1：
         *      formFiled.setData({
         *          id:'1',
         *          name:'啦啦啦'
         *      });
         * 设置值方法2：
         *      formFiled.setData([{
         *          id:'1',
         *          name:'啦啦啦'
         *      },{
         *          id:'2',
         *          name:'啦啦啦22'
         *      }]);
         * 设置值方法3：
         *      formFiled.setData(function(callback){
         *           callback({
         *              id:'1',
         *              name:'啦啦啦'
         *           });//必须要执行callback
         *      });
         * 设置值方法4：
         *      formFiled.setData(function(callback){
         *           callback([{
         *              id:'1',
         *              name:'啦啦啦'
         *           }]);//必须要执行callback
         *      });
         * 设置值方法5：
         *      formFiled.setData({
         *           url:'',//请求
         *           data:{},//数据
         *           timeout:'0',//超时时间
         *           field:''//取值的字段
         *      });
         */
        setData: function(parameter) {
            var _this = this;
            _this.upperModule && _this.upperModule.setData && _this.upperModule.setData(parameter);
        }
    };
    return Base.extend(FormFieldCity);
});