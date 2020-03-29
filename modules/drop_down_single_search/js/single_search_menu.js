/**
 * @author kt
 * @description 下拉框单选搜索菜单
 * @date 2017-4-28
 */
define(['modules/drop_down_base/js/menu_base'], function(Base) {
    var SingleSearch = Base.extend({
        /*初始入口*/
        init: function(opts) {
            var _this = this;
            _this.execute(opts);
        },
        /*创建wrap-html*/
        wrapHtml: function() {
            var _this = this;
            _this.searchCommonWrapHtml('single-search');
        },
        /*填充已选的数据*/
        valueToPage: function(value, _this) {
            _this.valueToPageFn(value.length <= 1, value, _this);
            _this.cursorFn(_this);
        },
        valueHtml: function() {
            var _this = this;
            _this.searchCommonValueHtml(_this.value.length <= 1);
        },
        bindEvent: function() {
            var _this = this;
            /*已选事件*/
            _this.menuHtml.on('click', 'ol li', function() {
                if (!_this.opts.isRequired) { //如果不是必填则可以取消
                    _this.valueFn([]);
                }
            });
            /*可选事件*/
            _this.menuHtml.on('click', 'ul li', function() {
                var $li = $(this);
                var arr = [];
                $.each(_this.data, function(i, v) {
                    if (v[_this.opts.idFlag] == $li.attr('data-'+_this.opts.idFlag)) {
                        arr = [v];
                    }
                });
                _this.valueFn(arr);
                //_this.$element.find("input").focus();
            });
            /*输入框事件*/
            _this.searchCommonInputEvent();
            /*菜单点击事件*/
            _this.menuHtml.on('click',function(){
                _this.$element.find("input").focus();
            });
        },
        /*获取值处理:单选得到的是一个对象*/
        getValueResult:function(){
            var _this = this;
            var result='';
            result=$.extend(true,[],_this.value);
            result=result.length>0?result[0]:'';
            return result;
        }
    });
    return SingleSearch;
});