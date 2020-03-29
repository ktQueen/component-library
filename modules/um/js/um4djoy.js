require.config({
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min',
        'template':'modules/libs/um/third-party/template.min',
        'config':'modules/um/js/umeditor.djoy',
        'umeditor':'modules/libs/um/umeditor',
        'cssFile': 'modules/libs/rq/css.min'
    }
});

define([
    'jquery',
    'template',
    'cssFile!modules/libs/um/themes/default/css/umeditor'
], function($,etpl) {
    /**
     * @class
     * @classdesc 富文本编辑
     * @alias Um
     * @author 安文真
     * @since 2017-10-19
     *
     * @param {object} opts - 配置参数
     * @param {string} opts.element='' - 当前传入的元素
     * @param {string} opts.setValue='' - 设置标签值
     * @param {string} [opts.initialFrameWidth] - 文件编辑框的宽度 100
     * @param {string} [opts.initialFrameHeight] - 文件编辑框的高度 100
     * @param {string} [opts.UMEDITOR_HOME_URL] - um文件路径路径
     * @param {string} [opts.imageUrl] - 上传路径
     * @param {string} [opts.imageFieldName] - 图片名称
     * @param {function} [opts.getOperationDom] - 回调函数  参数是um
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    window.etpl=etpl;
    var um={
        init:function(opts) {
            var _this = this;
            _this.parameterSetting(opts);
            _this.createDom();
            _this.createEditor();
        },

        parameterSetting:function (opts) {
            var _this = this;
            if (!opts) opts = {};
            opts = $.extend(true, {
                element: '', //编辑器元素
                initialFrameWidth : "",//宽
                initialFrameHeight: "",//高
                UMEDITOR_HOME_URL:'../libs/um/',//路径
                setValue:'',
                imageUrl:'',
                imagePath:'',
                imageFieldName:"",
                getOperationDom:"" //回调函数 返回um
            }, opts);
            _this.opts = opts;
            /*存储自定义事件*/
            _this.handlers = {};
        } ,

        createDom: function () {
            var _this = this;
            _this.opts.element.html('<script type="text/plain" id="myEditor"></script>');
        },

        createEditor:function () {
            var _this = this;
            require(['config','umeditor'],function () {
                var _um = UM.getEditor('myEditor',_this.opts);
                _this.um=_um;
                if(_this.opts.getOperationDom)_this.opts.getOperationDom(_um);
                console.log(_this.opts.setValue);
                _this.um.addListener( 'ready', function(  ) {
                    _this.um.setContent(_this.opts.setValue);
                } );
            });
        },

        /**
         * @description 获取值
         * @example
         * var um = new Um({配置参数});
         * um.getValue();
         */
        getValue:function () {
            var _this = this;
            return _this.um.getContentTxt();
        },
        /**
         * @description 清除
         * @example
         * var um = new Um({配置参数});
         * um.clear();
         */
        clear:function () {
            var _this = this;
            _this.um.setContent('');
        },
        /**
         * @description 摧毁
         * @example
         * var um = new Um({配置参数});
         * um.destroy();
         */
        destroy:function () {
            var _this = this;
            _this.um.destroy();
            $('textarea#myEditor').remove();
        },
        /**
         * @description 不可编辑
         * @example
         * var um = new Um({配置参数});
         * um.disable();
         */
        disable: function () {
            var _this = this;
            _this.um.setDisabled();
        },
        /**
         * @description 启用
         * @example
         * var um = new Um({配置参数});
         * um.enable();
         */
        enable: function () {
            var _this = this;
            _this.um.setEnabled();
        },
        /**
         * @description 隐藏
         * @example
         * var um = new Um({配置参数});
         * um.hide();
         */
        hide: function () {
            var _this = this;
            _this.um.setHide();
        },
        /**
         * @description 显示
         * @example
         * var um = new Um({配置参数});
         * um.show();
         */
        show: function () {
            var _this = this;
            _this.um.setShow();
        },

        /**
         * @description 重置
         * @example
         * var um = new Um({配置参数});
         * um.reset();
         */
        reset: function () {
            var _this = this;
            _this.um.setContent(_this.opts.setValue);
        },
        /**
         * @description 赋值
         * @example
         * var um = new Um({配置参数});
         * um.setValue();
         */
        setValue:function (params) {
            var _this = this;
            _this.um.setContent(params);
        }
    };
    return um;
});

