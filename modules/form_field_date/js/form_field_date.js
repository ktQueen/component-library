/**
 * 表单字段时间选择组件
 * @module form_field_date
 */
define([
    'modules/form_field_base/js/form_field_base_way3',
    'modules/utils/true_or_false',
    'modules/drop_down_calendar/js/calendar',
    'modules/drop_down_calendar/js/calendar2',
    'modules/utils/function_deal'
], function(Base, trueOrFalse, Calendar,Calendar2,functionDeal) {
    /**
     * @class
     * @classdesc 这是一个表单字段时间选择组件
     * @alias FormFieldDate
     * @extends form_field_base_way3
     * @author kt
     * @since 2017-7-25
     *
     * @param {object} opts - 配置参数
     * @param {string} opts.name='' - 必填，唯一标识，不能重复
     * @param {dom} opts.element='' - 必填，当前需要生成表单字段的元素
     * @param {string} opts.type='date' - 必填，要创建的表单字段的类型
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
     * @param {object} [opts.menu={}] - 菜单设置，参考日历组件
     * @param {function} [opts.beforeClick=null] - 点击之前执行的事件
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    var FormFieldDate=function(){};
    FormFieldDate.prototype = {
        /*初始化*/
        init: function(opts) {
            var _this = this;
            _this.parameterSetting(opts); //参数设置
            _this.createFormField(); //创建表单元素
            _this.elementSetting(); //元素获取
            _this.styleSetting(); //样式设置
            _this.createDate(); //创建时间下拉框
            _this.isHideFn();
        },
        /* 参数设置*/
        parameterSetting:function(opts){
            var _this = this;
            _this.commonParameterSetting($.extend(true,{
                type: 'date', //要创建的表单字段的类型
                placeholder: '', //提示文字
                menu: {}, //菜单设置，参考日历组件
                beforeClick:null,
            },opts));
            _this.opts.menu=functionDeal(_this.opts.menu,true);
        },
        /*创建表单字段*/
        createFormField: function() {
            var _this = this;
            _this.ownClass='form-field-date';//根据不同的类型给每个字段添加私有的class
            _this.createFormFieldBase({
                eleHtml: '<div class="form-field-element" ' +
                    (trueOrFalse(_this.opts.name) ? ('name=' + _this.opts.name) : '') +
                    '></div>'
            });
        },
        /*  创建时间下拉框 */
        createDate: function() {
            var _this = this;
            var configObject=$.extend(true,{},_this.opts);
            configObject=$.extend(true,configObject,{
                element: _this.$element, //btn放的位置
                isDisabled: _this.opts.disabled, //默认为false
                type: 'calendar', //menu的类型//必填
                change: function(value) { //改变事件
                    _this.opts.validators && _this.opts.formValidatorsCallback && _this.opts.formValidatorsCallback();
                    _this.fire('change', _this.$element, value);
                },
                setValue: _this.opts.value
            });
            if(_this.opts.type=='date'){
                _this.upperModule = new Calendar(configObject);
            }else{
                _this.upperModule = new Calendar2(configObject);
            }
        },
        /**
         * @description 设置值方法
         * @param {array|object|function} parameter - 传入的参数
         * @example
         * var formFiled = new FormFiled({配置参数});
         * 设置值方法1：
         *      calendar.setValue({
         *           startTime；'2017-01-01',
         *           endTime:'2017-02-02'
         *      });
         * 设置值方法2：
         *      calendar.setValue('2017-01-01 ~ 2017-02-02');
         * 设置值方法3：
         *      calendar.setValue(function(callback){
         *           callback('2017-01-01 ~ 2017-02-02');
         *      });
         * 设置值方法4：
         *      calendar.setValue(function(callback){
         *           callback({
         *               startTime；'2017-01-01',
         *               endTime:'2017-02-02'
         *           });
         *      });
         * 设置值方法5：
         *      calendar.setValue({
         *           url；'',//请求
         *           data:{},//数据
         *           timeout:'0',//超时时间
         *           field:''//取值的字段
         *      });
         */
        setValue: function(parameter) {
            var _this = this;
            _this.upperModule && _this.upperModule.setValue(parameter);
        },
    };
    return Base.extend(FormFieldDate);
});