/**
 * 表单字段选择菜单组件
 * @module form_field_select
 */
define([
    'modules/form_field_base/js/form_field_base_way3',
    'modules/utils/true_or_false',
    'modules/drop_down_single/js/single',
    'modules/drop_down_single_search/js/single_search',
    'modules/drop_down_multiple/js/multiple',
    'modules/drop_down_multiple_search/js/multiple_search'
], function(Base, trueOrFalse,Single,SingleSearch,Multiple,MultipleSearch) {
    /**
     * @class
     * @classdesc 表单字段选择菜单组件：这是一个表单字段选择菜单组件，根据类型配置生成对应类型的下拉选择框
     * @alias FormFieldSelect
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
     * @param {function} [opts.beforeClick=null] - 点击之前触发
     * @param {boolean} [opts.isAllData=false] - 当前获取的数据是否是所有数据(带搜索的下拉菜单)
     * @param {boolean} [opts.isSearch=true] - 默认是带搜索的(带搜索的下拉菜单)
     * @param {string} [opts.searchPlaceholder=''] - 默认搜索框显示的字段(带搜索的下拉菜单)
     * @param {string} [opts.searchDefaultField=''] - 默认显示的字段(带搜索的下拉菜单)
     * @param {string} [opts.getValueKey=''] - 获取值的时候取值要Id还是name
     * @param {string} [opts.getValueType=''] - 获取值的类型，默认是数组，设置getValueKey后得到的是逗号拼接的字符串，设置为array后分割逗号转为对应的数组
     * @param {string} [opts.menuListShowWay=''] - 菜单展示形式
     * @param {string} [opts.menuAddClass=''] - 菜单添加class
     * @param {string} [opts.isSelectAll=''] - 菜单全选功能（多选）
     * @param {boolean} [opts.isIcon=true] - 是否显示下拉图标
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    var FormFieldSelect=function(){};
    FormFieldSelect.prototype = {
        /*初始化*/
        init: function(opts) {
            var _this = this;
            //isRequired暂时根据参数设置
            _this.parameterSetting(opts); //参数设置
            _this.createFormField(); //创建表单元素
            _this.elementSetting(); //元素获取
            _this.styleSetting(); //样式设置
            _this.createSelect(); //创建下拉框
            _this.isHideFn();
        },
        /* 参数设置*/
        parameterSetting:function(opts){
            var _this = this;
            _this.commonParameterSetting($.extend(true,{
                type: '', //要创建的表单字段的类型
                placeholder: '', //提示文字
                idFlag: 'id', //数据形式
                nameFlag: 'name', //数据形式
                data: '', //array/object/function,数据的形式一定有id,name值,结果为数组形式，单个也可以为object形式
                menuStyle: {},
                isAllData: false, //当前获取的数据是否是所有数据
                isSearch: true,
                searchPlaceholder: '', //默认搜索框显示的字段
                searchDefaultField: '', //默认显示的字段
                beforeClick: null, //点击之前触发
                getValueKey:'',//获取值的时候取值要Id还是name
                getValueType:'',//获取值的类型，默认是数组，设置getValueKey后得到的是逗号拼接的字符串，设置为array后分割逗号转为对应的数组
                menuListShowWay:'',
                menuAddClass:'',
                isSelectAll:'',
                isIcon:true,
                isCheck:true,//默认校验
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
        /* 创建下拉框 */
        createSelect: function() {
            var _this = this;
            var configObject=$.extend(true,{},_this.opts);
            configObject=$.extend(true,configObject,{
                element: _this.$element, //btn放的位置
                isDisabled: trueOrFalse(_this.opts.disabled), //是否禁用，默认为false不是禁用的
                change: function(value) { //改变事件
                    _this.opts.isCheck && _this.opts.validators && _this.opts.formValidatorsCallback && _this.opts.formValidatorsCallback();
                    _this.fire('change', _this.$element, value);
                },
                setValue: _this.opts.value || _this.opts.setValue, //设置值
                setData: _this.opts.data || _this.opts.setData, //设置数据
                readOnly: trueOrFalse(_this.opts.readOnly), //只读
            });
            if (_this.opts.type == 'single') {
                configObject = $.extend(true, {
                    isRequired: _this.opts.isShowRequired
                }, configObject)
                _this.upperModule = new Single(configObject);
            } else if (_this.opts.type == 'singleSearch') {
                configObject = $.extend(true, {
                    /*单选1*/
                    isRequired: _this.opts.isShowRequired,
                    /*搜索框*/
                    isSearch: _this.opts.isSearch,
                    searchPlaceholder: _this.opts.searchPlaceholder, //默认搜索框显示的字段
                    searchDefaultField: _this.opts.searchDefaultField, //默认显示的字段
                }, configObject)
                _this.upperModule = new SingleSearch(configObject);
            } else if (_this.opts.type == 'multiple') {
                _this.upperModule = new Multiple(configObject);
            } else if (_this.opts.type == 'multipleSearch') {
                _this.upperModule = new MultipleSearch(configObject);
            }
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
        },
        /**
         * @description 获取值ID
         * @param {requestCallback} [callback] -回调函数
         * @return {String} 当前的数据
         * @example
         * var formFiled = new FormFiled({配置参数});
         * 获取值方法1：
         *      formFiled.getValueId(function(value){
         *          //value则为当前值,值是通过逗号分隔的字符串
         *      });//返回值为回调函数执行结果
         * 获取值方法2：
         *      formFiled.getValueId();//返回值为当前数据,值是通过逗号分隔的字符串
         */
        getValueId: function(callback) {
            var _this = this;
            return (_this.upperModule && _this.upperModule.getValueId && _this.upperModule.getValueId(callback));
        },
        /**
         * @description 获取值Name
         * @param {requestCallback} [callback] -回调函数
         * @return {String} 当前的数据
         * @example
         * var formFiled = new FormFiled({配置参数});
         * 获取值方法1：
         *      formFiled.getValueName(function(value){
         *          //value则为当前值,值是通过逗号分隔的字符串
         *      });//返回值为回调函数执行结果
         * 获取值方法2：
         *      formFiled.getValueName();//返回值为当前数据,值是通过逗号分隔的字符串
         */
        getValueName: function(callback) {
            var _this = this;
            return (_this.upperModule && _this.upperModule.getValueName && _this.upperModule.getValueName(callback));
        },
    };
    return Base.extend(FormFieldSelect);
});