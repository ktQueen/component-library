/**
 * 表单字段多标签输入组件
 * @module form_field_manifest
 */
define([
    'modules/form_field_base/js/form_field_base_way3',
    'modules/utils/true_or_false',
    'modules/utils/data_type',
    'modules/manifest/js/manifest'
], function (Base,trueOrFalse, dataType ,Manifest) {
    /**
     * @class
     * @classdesc 表单字段多标签输入组件
     * @alias FormFieldManifest
     * @extends form_field_base_way3
     * @author 安文真
     * @since 2017-6-26
     *
     * @param {object} opts - 配置参数
     * @param {string} opts.name='' - 必填，唯一标识，不能重复
     * @param {dom} opts.element='' - 必填，当前需要生成表单字段的元素
     * @param {string} opts.type='manifest' - 必填，要创建的表单字段的类型
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
     * @param {array} [opts.data=''] - 数据的形式：['工单', '工单', '个梵蒂冈', '玩儿翁']
     * @param {boolean} [opts.isAllData=false] - 当前获取的数据是否是所有数据
     * @param {string} [opts.uniqueFlag='name'] -去重标识
     * @param {array} [opts.tagBg=[]] - 标签的背景
     * @param {string} [opts.tagBgExistClass='mf-list-bgExist'] - 有标签背景时的class
     * @param {boolean} [opts.isTipValueEmpty=true] - 输入框为空时回车是否提示
     * @param {string} [opts.tagMaxNum='1000'] - 标签的最大个数
     * @param {string} [opts.inputMaxMum=''] - 输入框最多输入字符
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    var FormFieldManifest=function(){};
    FormFieldManifest.prototype = {
        /*初始化*/
        init: function (opts) {
            var _this = this;
            _this.parameterSetting(opts); //参数设置
            _this.createFormField(); //创建表单元素
            _this.elementSetting(); //元素获取
            _this.styleSetting(); //样式设置
            _this.opts.initDone && _this.opts.initDone.call(_this.$field); //表单元素初始化完成之后执行，this指向整个表单字段
            _this.createManifest(); //标签样式
            _this.isHideFn();
        },
        /* 参数设置*/
        parameterSetting:function(opts){
            var _this = this;
            _this.commonParameterSetting($.extend(true,{
                type: 'manifest', //要创建的表单字段的类型
                data:'',
                isAllData:'',
                uniqueFlag: 'name', //去重标识
                tagBg: [], //标签的背景
                tagBgExistClass: 'mf-list-bgExist',
                isTipValueEmpty: true, //输入框为空时回车是否提示
                tagMaxNum: '1000', //标签的最大个数
                inputMaxMum: '', //输入框最多输入字符
            },opts));
        },
        /*创建表单字段*/
        createFormField: function () {
            var _this = this;
            _this.ownClass='form-field-manifest';//根据不同的类型给每个字段添加私有的class
            _this.createFormFieldBase({
                eleHtml: '<div class="form-field-element" ' +
                (trueOrFalse(_this.opts.name) ? ('name=' + _this.opts.name) : '') +
                '></div>'
            });
        },
        /*创建提示标签*/
        createManifest: function () {
            var _this = this;
            var configObject=$.extend(true,{},_this.opts);
            configObject=$.extend(true,configObject,{
                element:_this.$element,//当前传入的元素
                setData:_this.opts.data,//设置获取到的模糊搜索数据，不为null就是模糊搜索的
                setValue:_this.opts.value,//设置标签值
                isTipValueEmpty:trueOrFalse(_this.opts.isTipValueEmpty),//输入框为空时回车是否提示
                isDisabled:trueOrFalse(_this.opts.disabled),//是否不可编辑，默认为可编辑
                change: function(value) { //改变事件
                    _this.opts.validators && _this.opts.formValidatorsCallback && _this.opts.formValidatorsCallback();
                    _this.fire('change', _this.$element, value);
                }
            });
            _this.upperModule = new Manifest(configObject);
        },
        /**
         * @description 设置数据方法
         * @param {array|object|function} parameter - 传入的参数
         * @example
         * var formFiled = new FormFiled({配置参数});
         * 设置值方法1：
         *      formFiled.setData(['啦啦啦','啦啦啦1']);
         * 设置值方法2：
         *      formFiled.setData(function(callback){
         *           callback(['啦啦啦','啦啦啦1']));//必须要执行callback
         *      });
         * 设置值方法3：
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
    return Base.extend(FormFieldManifest);
});