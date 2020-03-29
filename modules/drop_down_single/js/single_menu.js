/**
 * @author kt
 * @description 下拉框单选菜单
 * @date 2017-4-28
 */
define(['modules/drop_down_base/js/menu_base'], function(Base) {
    var Single = Base.extend({
        /*初始入口*/
        init: function(opts) {
            var _this = this;
            _this.execute(opts);
        },
        /*创建wrap-html*/
        wrapHtml: function() {
            var _this = this;
            _this.noSearchCommonWrapHtml('single-select');
        },
        /*填充已选的数据*/
        valueToPage: function(value, _this) {
            _this.valueToPageFn(value.length <= 1, value, _this);
        },
        valueHtml: function() {
            var _this = this;
            _this.noSearchCommonValueHtml(_this.value.length <= 1);
        },
        /*绑定事件*/
        bindEvent: function() {
            var _this = this;
            _this.menuHtml.on('click', 'li', function() {
                var $li = $(this);
                var curData = [];
                if($(this).hasClass('active')){
                    if(_this.opts.isRequired){
                        return false;
                    }
                }else{
                    $.each(_this.data, function(i, v) {
                        if (v[_this.opts.idFlag] == $li.attr('data-'+_this.opts.idFlag)) {
                            curData = [v];
                        }
                    });
                }
                _this.valueFn(curData);
            }).on("click", function(evt) {
                evt.stopPropagation();
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
    return Single;
});