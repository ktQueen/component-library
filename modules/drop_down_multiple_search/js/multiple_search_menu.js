/**
 * @author kt
 * @description 下拉框多选搜索菜单
 * @date 2017-4-28
 */
define(['modules/drop_down_base/js/menu_base'], function(Base) {
    var MultipleSearch = Base.extend({
        /*初始入口*/
        init: function(opts) {
            var _this = this;
            _this.execute(opts);
        },
        /*创建wrap-html*/
        wrapHtml: function() {
            var _this = this;
            _this.searchCommonWrapHtml('multiple-search');
        },
        /*填充已选的数据*/
        valueHtml: function() {
            var _this = this;
            _this.searchCommonValueHtml(_this.value.length >= 0);
        },
        valueToPage: function(value, _this) {
            _this.valueToPageFn(value.length >= 0, value, _this);
        },
        /*绑定事件*/
        bindEvent: function() {
            var _this = this;
            /*已选事件*/
            _this.menuHtml.on('click', 'ol li', function() {
                var $li = $(this);
                var curData = $.extend(true, [], _this.value);
                if (curData.length > 0) {
                    for (var i = 0; i < curData.length; i++) {
                        if (curData[i][_this.opts.idFlag] == $li.attr('data-' + _this.opts.idFlag)) {
                            curData.splice(i, 1);
                        }
                    }
                }
                _this.valueFn(curData);
                _this.$element.find("input").focus();
                return false;
            }).on("click", function(evt) {
                evt.stopPropagation();
            });
            /*可选事件*/
            _this.menuHtml.on('click', 'ul li', function(evt) {
                var $li = $(this);
                var curData = $.extend(true, [], _this.value);
                if (_this.data.length > 0) {
                    for (var i = 0; i < _this.data.length; i++) {
                        if (_this.data[i][_this.opts.idFlag] == $li.attr('data-' + _this.opts.idFlag)) {
                            curData.push(_this.data[i]);
                        }
                    }
                }
                _this.valueFn(curData);
                _this.$element.find("input").focus().val('');
                return false;
            }).on("click", function(evt) {
                evt.stopPropagation();
            });
            /*输入框事件*/
            _this.searchCommonInputEvent();
            /*菜单点击事件*/
            _this.menuHtml.on('click', function() {
                _this.$element.find("input").focus();
            });
        }
    });
    return MultipleSearch;
});