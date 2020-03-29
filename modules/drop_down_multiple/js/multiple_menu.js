/**
 * @author kt
 * @description 多选下拉框菜单
 * @date 2017-4-28
 */
define(['modules/drop_down_base/js/menu_base'], function(Base) {
    var Multiple = Base.extend({
        /*初始入口*/
        init: function(opts) {
            var _this = this;
            _this.execute(opts);
        },
        /*创建wrap-html*/
        wrapHtml: function() {
            var _this = this;
            _this.noSearchCommonWrapHtml('multiple-select');
        },
        /*填充已选的数据*/
        valueHtml: function() {
            var _this = this;
            _this.noSearchCommonValueHtml(_this.value.length >= 0);
        },
        valueToPage: function(value, _this) {
            _this.valueToPageFn(value.length >= 0, value, _this);
        },
        /*绑定事件*/
        bindEvent: function() {
            var _this = this;
            _this.menuHtml.on('click', 'li', function() {
                var $li = $(this);
                var curData = [];
                if ($li.hasClass('select-all')) {
                    if (!$li.hasClass('active')) {
                        curData = $.extend(true, [], _this.data);
                    }
                } else {
                    curData = $.extend(true, [], _this.value);
                    if ($(this).hasClass('active')) {
                        for (var i = 0; i < curData.length; i++) {
                            if (curData[i][_this.opts.idFlag] == $li.attr('data-'+_this.opts.idFlag)) {
                                curData.splice(i, 1);
                            }
                        }
                    } else {
                        if (_this.data.length > 0) {
                            for (var i = 0; i < _this.data.length; i++) {
                                if (_this.data[i][_this.opts.idFlag] == $li.attr('data-'+_this.opts.idFlag)) {
                                    curData.push(_this.data[i]);
                                }
                            }
                        }
                    }
                }
                _this.valueFn(curData);
                return false;
            });
        },
    });
    return Multiple;
});