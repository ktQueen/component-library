/**
 * @name modal
 * @description modal 弹窗
 * @author kt
 * @since 2017-5-19
 */
require.config({
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min',
        'cssFile': 'modules/libs/rq/css.min'
    }
});
define([
    'jquery',
    'modules/utils/data_type',
    'modules/drag/js/drag',
    'cssFile!modules/modal/css/modal'
], function ($, dataType, drag) {
    /**
     * @class
     * @classdesc 弹窗组件
     * @alias Modal
     * @author kt
     * @since 2017-5-19
     *
     * @param {object} opts - 配置参数
     * @param {string} [opts.type=''] - alert/msg/load/confirm每个类型有对应的设置，如果类型默认不合你意，是可以修改的
     * @param {dom} [opts.modalElement=''] - 放模态框的元素
     * @param {string} [opts.addClass=''] - 模态框添加class
     * @param {object} [opts.style={}] -默认让她上下左右居中，设置
     * @param {boolean} [opts.hasMask=true] - 是否有遮罩
     * @param {boolean} [opts.hasHeader=true] - 是否需要头部
     * @param {boolean} [opts.hasCloseBtn=true] - 如果没有头部肯定没有关闭按钮
     * @param {function} [opts.handlerCloseBtn=null] - 关闭操作
     * @param {string} [opts.title=''] - 标题
     * @param {string} [opts.content=''] - 内容
     * @param {string} [opts.rowTitleStyle=''] - 内容里面标题的样式定义
     * @param {boolean} [opts.hasFooter=true] - 是否有底部，默认是有的
     * @param {string} [opts.footer='default'] - 底部default为保存和取消两个按钮<br/>
     *底部内容，可以自己更改,可以是字符串，可以数组[{code:'',text:'',state:'active/',className:""}]<br/>
     *按钮添加自定义事件的时候与code对应就可以了,state为active为选中的状态，className为添加的class<br/>
     *如果return false，会阻止后面的绑定事件
     * @param {boolean} [opts.hasConfirmBtn=true] - 是否有确认按钮
     * @param {string} [opts.textConfirmBtn='保存'] - 确认按钮的默认文字
     * @param {function} [opts.handlerConfirmBtn=null] - 确认按钮操作
     * @param {boolean} [opts.hasCancelBtn=true] - 是否有取消按钮
     * @param {string} [opts.textCancelBtn='取消'] - 取消按钮默认文字
     * @param {function} [opts.handlerCancelBtn=null] - 取消按钮操作
     * @param {function} [opts.htmlDone=null] - 添加完Dom节点
     * @param {string} [opts.showTime=''] - 默认几秒后弹窗消失
     * @param {function} [opts.showTimeCallback=null] - 弹窗默认几秒关闭后执行的回调函数

     * @requires 'jquery'
     * @requires 'require'
     */
    function Modal(opts) {
        this.init(opts)
    }

    Modal.prototype = {
        /*初始化*/
        init: function (opts) {
            var _this = this;
            _this.parameterSetting(opts);
            _this.createModal();
            _this.style();
            _this.defaultSetPos();
            _this.scroll();
            _this.bindEvent();
            _this.showTime();
        },
        /*参数设置*/
        parameterSetting: function (opts) {
            var _this = this;
            var el = $('<div class="modal-auto">');
            if (!opts.modalElement) {
                $('body').append(el);
            }
            opts = $.extend(true, {
                type: '', //alert/msg/load/confirm每个类型有对应的设置，如果类型默认不合你意，是可以修改的
                modalElement: el, //放模态框的元素
                addClass: '', //模态框添加class
                style: {}, //默认让她上下左右居中，设置
                hasMask: true, //是否有遮罩
                hasHeader: true, //是否需要头部
                hasCloseBtn: true, //如果没有头部肯定没有关闭按钮
                handlerCloseBtn: null, //关闭操作
                title: '', //标题
                content: '', //内容
                rowTitleStyle: '', //内容里面标题的宽度定义
                hasFooter: true, //是否有底部，默认是有的
                footer: 'default', //底部default为保存和取消两个按钮
                //底部内容，可以自己更改,可以是字符串，可以数组[{code:'',text:'',state:'active/',className:""}]
                //按钮添加自定义事件的时候与code对应就可以了,state为active为选中的状态，className为添加的class
                //如果return false，会阻止后面的绑定事件
                hasConfirmBtn: true, //是否有确认按钮
                textConfirmBtn: '保存', //确认按钮的默认文字
                handlerConfirmBtn: null, //确认按钮操作

                hasCancelBtn: true, //是否有取消按钮
                textCancelBtn: '取消', //取消按钮默认文字
                handlerCancelBtn: null, //取消按钮操作

                htmlDone: null, //添加完Dom节点
                showTime: '', //默认几秒后弹窗消失
                showTimeCallback: null, //弹窗默认几秒关闭后执行的回调函数
                drag: false//是否有拖拽功能
            }, _this.typeSetting(opts));
            _this.opts = opts;
            _this.handlers = {}; //自定义事件存储
            _this.opts.handlerConfirmBtn && _this.on("confirm", _this.opts.handlerConfirmBtn);
            _this.opts.handlerCloseBtn && _this.on("close", _this.opts.handlerCloseBtn);
            _this.opts.handlerCancelBtn && _this.on("cancel", _this.opts.handlerCancelBtn);
        },
        /*type设置*/
        typeSetting: function (opts) {
            var _this = this;
            if (!opts) opts = {};
            if (opts.type == 'alert') { //只有显示信息，没有任何操作的为alert类型
                opts = $.extend(true, {
                    title: '提示信息',
                    hasConfirmBtn: false,
                    textCancelBtn: '关闭',
                    addClass: 'modal-alert'
                }, opts);
            }
            if (opts.type == 'msg') { //只显示文本，做提示作用，msg类型，可以增加图标效果||'msg-success'||'msg-error'
                opts = $.extend(true, {
                    hasHeader: false,
                    hasFooter: false,
                    addClass: 'modal-msg',
                    showTime: '1500'
                }, opts);
            }
            if (opts.type == 'tips') { //todo,提示信息，这个单独做一个组件吧
            }
            if (opts.type == 'prompt') { //todo,有输入框的，这个暂时先自己设置内容吧
            }
            if (opts.type == 'load') { //加载弹窗,也可以增加不同的加载风格，默认为load,load-orange
                opts = $.extend(true, {
                    hasHeader: false,
                    hasFooter: false,
                    addClass: 'modal-load',
                    content: '<img src="modules/modal/img/loading.gif">'
                }, opts);
            }
            if (opts.type == 'confirm') { //询问框，有操作
                opts = $.extend(true, {
                    title: '提示信息',
                    textConfirmBtn: '确定'
                }, opts);
            }
            return opts;
        },
        /*创建弹窗*/
        createModal: function () {
            var _this = this;
            var str = (_this.opts.hasMask ? '<div class="modal-bg"></div>' : '') +
                    '<div class="modal-container">' +
                //头部
                    (_this.opts.hasHeader ?
                            '<div class="modal-header">' +
                            '<div class="modal-title">' + _this.opts.title + '</div>' +
                            (_this.opts.hasCloseBtn ? '<span class="modal-close">×</span>' : '') +
                            '</div>' : '') +
                //内容
                    '<div class="modal-content-scroll">' +
                    '<div class="modal-content">' + _this.opts.content + '</div>' +
                    '</div>' +
                //底部
                    (_this.opts.hasFooter ?
                            '<div class="modal-footer">' +
                            (_this.opts.footer == 'default' ?
                                    (_this.opts.hasConfirmBtn ? '<button class="modal-btn modal-btn-active modal-btn-confirm" code="confirm">' + _this.opts.textConfirmBtn + '</button>' : '') +
                                    (_this.opts.hasCancelBtn ? '<button class="modal-btn  modal-btn-cancel" code="cancel">' + _this.opts.textCancelBtn + '</button>' : '') :
                                            dataType(_this.opts.footer) == 'array' ?
                                    _this.footerArrFn(_this.opts.footer) :
                                    _this.opts.footer) +
                            '</div>' : '') +
                    '</div>';
            _this.opts.modalElement.addClass('modal ' + _this.opts.addClass).html(str);
            _this.$container = _this.opts.modalElement.find('.modal-container');
            _this.$header = _this.opts.modalElement.find('.modal-header');
            _this.$close = _this.opts.modalElement.find('.modal-close');
            _this.$scroll = _this.opts.modalElement.find('.modal-content-scroll');
            _this.$content = _this.opts.modalElement.find('.modal-content');
            _this.$footer = _this.opts.modalElement.find('.modal-footer');
            _this.$confirm = _this.opts.modalElement.find('.modal-btn-confirm');
            _this.$cancel = _this.opts.modalElement.find('.modal-btn-cancel');
            _this.opts.htmlDone && _this.opts.htmlDone.call(_this, _this.opts.modalElement);
        },
        footerArrFn: function (footerArr) {
            var _this = this;
            var str = ''
            var stateClass = '';
            $.each(footerArr, function (i, v) {
                if (v.state == 'active') {
                    stateClass = ' modal-btn-active';
                } else {
                    stateClass = '';
                }
                str += '<button class="modal-btn' + stateClass + ' ' + (v.className || '') + '" code="' + v.code + '">' + v.text + '</button>'
            })
            return str;
        },
        /*超出显示滚动条*/
        scroll: function () {
            var _this = this;
            _this.$scroll.css({
                height: _this.$container.outerHeight() - _this.$header.outerHeight() - _this.$footer.outerHeight()
            });
        },
        /*设置弹窗定位,宽，高*/
        defaultSetPos: function () {
            var _this = this;
            if (_this.opts.drag == true) {
                if (!_this.opts.style.top) {
                    _this.opts.style.top = ($(window).outerHeight() - _this.$container.outerHeight()) / 2 + 'px';
                    _this.$container.css({
                        top: _this.opts.style.top
                    });
                }
                if (!_this.opts.style.left) {
                    _this.opts.style.left = ($(window).outerWidth() - _this.$container.outerWidth()) / 2 + 'px';
                    _this.$container.css({
                        left: _this.opts.style.left
                    });
                }
            } else {
                if (!_this.opts.style.top) {
                    _this.opts.style.top = '50%'
                    _this.opts.style.marginTop = -_this.$container.outerHeight() / 2 + 'px';
                    _this.$container.css({
                        top: _this.opts.style.top,
                        marginTop: _this.opts.style.marginTop
                    });
                }
                if (!_this.opts.style.left) {
                    _this.opts.style.left = '50%'
                    _this.opts.style.marginLeft = -_this.$container.outerWidth() / 2 + 'px';
                    _this.$container.css({
                        left: _this.opts.style.left,
                        marginLeft: _this.opts.style.marginLeft
                    });
                }
            }
        },
        /*设置当前弹窗的样式*/
        style: function () {
            var _this = this;
            _this.opts.style && _this.$container.css(_this.opts.style);
            _this.opts.rowTitleStyle && _this.$container.find('.modal-row-title').css(_this.opts.rowTitleStyle);
            if (_this.opts.rowTitleStyle.width) {
                _this.$container.find('.modal-row-con').css({
                    'width': 'calc(100% - ' + _this.opts.rowTitleStyle.width + ')'
                });
            }
        },
        /*显示时间函数*/
        showTime: function () {
            var _this = this;
            if (_this.opts.showTime) {
                var timer = setTimeout(function () {
                    _this.destroy();
                    clearTimeout(timer);
                    _this.opts.showTimeCallback && _this.opts.showTimeCallback();
                }, _this.opts.showTime);
            }
        },
        /*绑定事件*/
        bindEvent: function () {
            var _this = this;
            /*关闭按钮*/
            _this.$close && _this.$close.unbind('click').bind('click', function () {
                _this.fire('close', this, _this.opts.modalElement);
                if (_this.handlers.close == undefined) {
                    _this.destroy();
                }
            });
            /*自定义按钮事件*/
            _this.$footer.bind('click', function (e) {
                var code=$(e.target).attr('code');
                var $target=$(e.target);
                if(e.target.tagName == 'FONT'){
                    code=$(e.target).closest('button').attr('code');
                    $target=$(e.target).closest('button');
                }
                if (code) {
                    _this.fire(code, $target, _this.opts.modalElement);
                    if (_this.handlers[code] == undefined) {
                        _this.destroy();
                    }
                }
            });
            //拖拽事件
            _this.opts.drag == true && _this.$header.length > 0 && drag(_this.$header, _this.$container);
        },
        /*---------------------对外的方法----------------*/
        /**
         * @description 显示
         * @example
         * var modal = new Modal({配置参数});
         * modal.show();
         */
        show: function () {
            var _this = this;
            _this.opts.modalElement.show();
            return _this;
        },
        open: function () {
            var _this = this;
            _this.opts.modalElement.show();
            return _this;
        },
        /**
         * @description 隐藏
         * @example
         * var modal = new Modal({配置参数});
         * modal.hide();
         */
        hide: function () {
            var _this = this;
            _this.opts.modalElement.hide();
            return _this;
        },
        close: function () {
            var _this = this;
            _this.opts.modalElement.hide();
            return _this;
        },
        /**
         * @description 摧毁
         * @example
         * var modal = new Modal({配置参数});
         * modal.destroy();
         */
        destroy: function () {
            var _this = this;
            if (this.opts.modalElement.hasClass('modal-auto')) {
                _this.opts.modalElement.remove();
            } else {
                _this.opts.modalElement.empty().removeClass('modal ' + _this.opts.addClass);
            }
            return _this;
        },
        clear: function () {
            var _this = this;
            if (_this.opts.modalElement.hasClass('modal-auto')) {
                _this.opts.modalElement.remove();
            } else {
                _this.opts.modalElement.empty().removeClass('modal ' + _this.opts.addClass);
            }
            return _this;
        },
        /**
         * @description 设置footer区域内容
         * @param {array} footerArr -设置footer区域内容
         * @example
         * var modal = new Modal({配置参数});
         * modal.footer([{
         *   code:'',//按钮添加自定义事件的时候与code对应就可以了
         *   text:'',//按钮文字
         *   state:'active/',//state为active为选中的状态，如果没有就是白色的按钮
         *   className:''//className为添加的class
         * }]);
         */
        footer: function (footerArr) {
            var _this = this;
            _this.$footer.html(_this.footerArrFn(footerArr));
        },
        /**
         * @description 设置内容
         * @param {string} content -设置内容
         * @example
         * var modal = new Modal({配置参数});
         * modal.setContent('新的内容');
         */
        setContent: function (content) {
            var _this = this;
            _this.$content.html(content);
            _this.style();
        },
        /*---------------------自定义方法----------------*/
        /*自定义事件绑定*/
        on: function (type, handler) {
            var _this = this;
            if (typeof _this.handlers[type] == "undefined") {
                _this.handlers[type] = [];
            }
            _this.handlers[type].push(handler);
            return this;
        },
        /*自定义事件释放
         * this指向ele
         * data为函数里面的参数
         * return false 之后会阻断同类的函数执行
         * */
        fire: function (type, ele, data) {
            var _this = this;
            if (_this.handlers[type] instanceof Array) {
                var handlers = _this.handlers[type];
                for (var i = 0, len = handlers.length; i < len; i++) {
                    var temp = handlers[i].call(ele, data);
                    if (temp === false) {
                        break;
                    }
                }
            }
        }
    }
    return Modal;
});
