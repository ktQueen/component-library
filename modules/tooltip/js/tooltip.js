require.config({
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min',
        'cssFile': 'modules/libs/rq/css.min'
    }
});
define([
    'jquery',
    'cssFile!modules/tooltip/css/tooltip'
], function ($) {
    /**
     * @class
     * @classdesc 气泡提示组件
     * @alias Tooltip
     * @author kt
     * @since 2017-9-4
     *
     * @param {object} opts - 配置参数
     * @param {dom} [opts.element=''] - 需要添加气泡的元素
     * @param {string} [opts.message=''] - 气泡提示文字
     * @param {string} [opts.shape='solid'] - 气泡的形状：solid(实心)/hollow(空心)
     * @param {string} [opts.direction='top'] - 气泡的方向：top/bottom/left/right
     * @param {string} [opts.status='default'] - 气泡的颜色状态：default/success/error/wraning/primary/info
     * @param {string} [opts.location='center'/'middle'] - 气泡的位置：(上下气泡)left/center/right,（左右气泡）top/middle/bottom

     * @requires 'jquery'
     * @requires 'require'
     */
    function Tooltip(opts) {
        this.init(opts)
    }

    Tooltip.prototype = {
        init: function (opts) {
            var _this = this;
            _this.parameterSetting(opts);
            _this.createTooltip();
            _this.elementSetting();
            _this.styleSetting();
        },
        /*参数设置*/
        parameterSetting: function (opts) {
            var _this = this;
            if (!opts) opts = {};
            opts = $.extend(true, {
                element: '', //创建气泡的元素
                message: "",//气泡提示文字
                shape: 'hollow',//气泡的形状：solid(实心)/hollow(空心)
                direction: 'top',//气泡的方向：top/bottom/left/right
                status: 'default',//气泡的颜色状态：default/success/error/wraning/primary/info
            }, opts);
            opts = $.extend(true, {
                location: (opts.direction == 'top' || opts.direction == 'bottom') ? 'center' : 'middle',//气泡的位置：(上下气泡)left/center/right,（左右气泡）top/middle/bottom
            }, opts);
            _this.opts = opts;
        },
        /*创建气泡*/
        createTooltip: function () {
            var _this = this;
            var shape = ' tooltip-' + _this.opts.shape;
            var direction = ' tooltip-' + _this.opts.direction;
            var status = _this.opts.status ? (' tooltip-' + _this.opts.status) : '';
            var location = ' tooltip-location-' + _this.opts.location;
            _this.opts.element.append('<span class="fe-tooltip' + shape + direction + status + location + '">' + _this.opts.message + '<i></i></span>');
        },
        /*元素设置*/
        elementSetting: function () {
            var _this = this;
            _this.$ele = _this.opts.element;//创建气泡元素
            _this.$tooltip = _this.opts.element.find('.fe-tooltip');//气泡
            _this.$angle = _this.opts.element.find('.fe-tooltip i');//气泡的角
        },
        /*样式设置*/
        styleSetting: function () {
            var _this = this;
            _this.$ele.css({//创建气泡的元素相对定位
                'position': 'relative'
            });
            _this.$tooltip.css({//气泡的宽度设置
                width: _this.$tooltip.text().length * parseInt(_this.$tooltip.css('font-size'))
                        + parseInt(_this.$tooltip.css('padding-left')) + parseInt(_this.$tooltip.css('padding-right'))
                        + parseInt(_this.$tooltip.css('border-left-width')) + parseInt(_this.$tooltip.css('border-right-width')),
            });
            var direction = {//根据方向定位置
                'top': -(_this.$tooltip.outerHeight() + _this.$angle.outerHeight()) + 2,
                'bottom': -(_this.$tooltip.outerHeight() + _this.$angle.outerHeight()),
                'left': -(_this.$tooltip.outerWidth() + _this.$angle.outerWidth()),
                'right': -(_this.$tooltip.outerWidth() + _this.$angle.outerWidth()),
            }
            var obj={};
            obj[_this.opts.direction]=direction[_this.opts.direction];
            _this.$tooltip.css(obj);//气泡的宽度设置
            if (_this.opts.location == 'center') {//气泡左右居中
                _this.$tooltip.css({
                    'margin-left': -_this.$tooltip.outerWidth() / 2
                });
            }
            if (_this.opts.location == 'middle') {//气泡上下居中
                _this.$tooltip.css({
                    'margin-top': -_this.$tooltip.outerHeight() / 2
                });
            }
        },
        /*-----------对外的方法-----------*/
        /**
         * @description 摧毁
         * @example
         * var tooltip = new Tooltip({配置参数});
         * tooltip.destroy();
         */
        destroy: function () {
            var _this = this;
            _this.$tooltip.remove();
        }
    };
    return Tooltip;
});