/**
 * @author kt
 * @description 表单字段组件的基础文件
 * @date 2017-7-25
 */
require.config({
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min',
        'cssFile': 'modules/libs/rq/css.min'
    }
});
define([
    'jquery',
    'modules/form_base/js/form_base',
    'modules/utils/true_or_false',
    'modules/utils/data_type',
    'modules/utils/function_deal',
    'cssFile!modules/form_field_base/css/form_field_base'
], function($, FormBase, trueOrFalse,dataType,functionDeal) {
    var FormFieldBase = FormBase.extend({
        /*参数设置*/
        commonParameterSetting: function(opts) {
            var _this = this;
            if (!opts) opts = {};
            opts = $.extend(true, {
                name: '', //唯一标识
                element: '', //当前需要生成字段的元素
                className: '', //可以为当前元素添加class
                style: {}, //设置样式
                layout: 'left-right', //布局，一种为上下结构'up-down'，一种为左右结构'left-right'，默认为左右结构布局
                initDone: null, //表单元素初始化完成,this指向整个表单字段
                change: null, // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
                isShowRequired: false, //当必填的时候是否显示必填标志，默认是隐藏的
                requiredLocation: 'before', //必填标志的位置，可以在字段前before，也可以在末尾显示before， 默认在字段前显示
                title: '', //标题
                titleStyle: {},
                contentStyle: {}, //内容样式
                readOnly: (opts.disabled || false),//只读
                disabled: false,//禁用
                tip:'',//在表单字段组件下面一行添加提示文字
                value: '', //默认为'',在这里设置的value则是默认值，也是初始值
                isHide:false//是否隐藏，默认是显示的
            }, opts);
            _this.opts=functionDeal(opts);
            _this.handlers = {}; //存储自定义事件
            _this.opts.change && _this.on("change", _this.opts.change);
        },
        /*创建表单元素
         *param为参数,标题和必填标志不能换行，换行被解析，获取的宽度就不够了
         */
        createFormFieldBase: function(param) {
            var _this = this;
            var layoutClass = (_this.opts.layout == 'left-right') ? ' form-field-leftRight' : ' form-field-upDown'; //布局对应的class
            var requiredClass = (_this.opts.requiredLocation == 'before') ? '' : ' form-field-required-after'; //标志的位置对应的class
            _this.opts.element
                .addClass('form-clear form-field ' + layoutClass + requiredClass + ' '+_this.ownClass + ' ' + _this.opts.className)
                .html('<div class="form-field-head">'+
                        (trueOrFalse(_this.opts.isShowRequired) ? '<span class="form-required">*</span>' : '') + (trueOrFalse(_this.opts.title) ? '<span class="form-field-title">' + _this.opts.title + '</span>' : '') +
                    '</div>'+
                    '<div class="form-field-content">'+ param.eleHtml+
                        (_this.opts.tip?'<p class="form-tip">'+_this.opts.tip+'</p>':'')+
                     '</div>');
        },
        /*元素设置*/
        elementSetting: function() {
            var _this = this;
            _this.$field = _this.opts.element; //字段区域
            _this.$required = _this.opts.element.find('.form-required'); //必填元素标志
            _this.$head = _this.opts.element.find('.form-field-head'); //标题文字区域
            _this.$title = _this.opts.element.find('.form-field-title'); //标题文字区域
            _this.$content = _this.opts.element.find('.form-field-content'); //表单元素
            _this.$element = _this.opts.element.find('.form-field-element'); //表单元素
        },
        /*样式设置*/
        styleSetting: function() {
            var _this = this;
            _this.opts.style && _this.$field.css(_this.opts.style); //字段样式处理
            _this.opts.titleStyle && _this.$head.css(_this.opts.titleStyle);//标题的样式设置
            _this.opts.contentStyle && _this.$content.css(_this.opts.contentStyle);//内容样式处理
            _this.requiredLocationFn(_this.opts.isShowRequired);//必填标志样式处理
            _this.cursorFn();//只读和禁用处理
        },
        //必填标志现实与隐藏的处理
        requiredLocationFn: function(isRequired) {
            var _this = this;
            var requiredWidth = 0;
            if (trueOrFalse(isRequired)) { //如果显示必填标志
                _this.$required.show();
                requiredWidth = _this.$required.outerWidth()+1;//这里为什么要加1呢，是因为宽度有的时候小数会自己舍掉
            } else { //否则隐藏必填标志
                _this.$required.hide();
            }
            if (_this.opts.layout == 'left-right') {
                var titleWidth=0;
                if(!!_this.opts.title){
                    titleWidth = _this.$title.outerWidth()+1;//这里为什么要加1呢，是因为宽度有的时候小数会自己舍掉
                }
                _this.$content.css({
                    'width': 'calc(100% - ' + (titleWidth + requiredWidth) + 'px)'
                });
            }
        },
        //只读和禁用处理手势处理
        cursorFn:function(){
            var _this = this;
            if(_this.opts.disabled){
                _this.$element.css({
                    'cursor':'no-drop'
                });
                return false;
            }
            if(_this.opts.readOnly){
                _this.$element.css({
                    'cursor':'default'
                });
            }
        }
    });
    return FormFieldBase;
});