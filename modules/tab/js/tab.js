require.config({
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min',
        'cssFile': 'modules/libs/rq/css.min'
    }
});
define([
    'jquery',
    'modules/utils/data_type',
    'cssFile!modules/tab/css/tab'
], function($, dataType) {
    /**
     * @class
     * @classdesc tab切换组件
     * @alias Tab1
     * @author kt
     * @since 2017-6-1
     *
     * @param {object} opts - 配置参数
     * @param {dom} [opts.element=''] - tab切换的元素
     * @param {string} [opts.current='1'] - 展示第几个tab,默认选中第一个
     * @param {string} [opts.event='click'] - 用来定义鼠标的触发类型，默认事件是点击
     * @param {number} [opts.delay=100] - 当是鼠标移入时，增加延时
     * @param {boolean} [opts.auto=false] - 用来定义tab是否自动切换，当指定了时间间隔，就表示自动切换，并且切换时间为指定时间间隔
     * @param {string} [opts.effect='default'] - 用来定义内容切换效果，默认直接切换（可选淡入淡出）
     * @param {string} [opts.loadingWay='stepwise'] -1.stepwise-点击之后加载一次，再次点击不再加载，2.all-上来所有全部加载
     * @param {array} [opts.title=[]] - 通过js配置titile
     * @param {array} [opts.content=[]] - 通过js配置内容
     * @param {dom} [opts.titleElement=''] - 标题的元素，opts.element.find('.tab-head>li')
     * @param {dom} [opts.conElement=''] - 内容元素，opts.element.find('.tab-body>div')
     * @param {string} [opts.currentTitleClass='current'] - 当前标题的样式
     * @param {string} [opts.currentConClass='current'] - 当前内容样式
     * @param {string} [opts.addCurrentTitleClass=''] - 当前标题增加class
     * @param {string} [opts.addCurrentConClass=''] - 当前内容增加class
     * @param {string} [opts.titleClass='tab-title'] - 标题默认class
     * @param {string} [opts.conClass='tab-con'] - 内容默认class
     * @param {string} [opts.addTitleClass=''] - 标题增加class
     * @param {string} [opts.addConClass=''] - 内容增加class
     * @param {function} [opts.change=null] - tab切换改变事件,this指向当前是第几个标题，回传的index为当前标题和内容的索引

     * @requires 'jquery'
     * @requires 'require'
     */
    function Tab(opts) {
        this.init(opts)
    }
    Tab.prototype = {
        init: function(opts) {
            var _this = this;
            _this.isLoad= []; //true表示已经加载过了
            _this.parameterSetting(opts);
            _this.createTab();
            _this.elementSetting();
            _this.showCurrent(_this.opts.current - 1);
            _this.opts.htmlDone && _this.opts.htmlDone();
            _this.opts.change && _this.on("change", _this.opts.change);
            _this.bindEvent();
            _this.opts.auto && _this.autoPlay();
        },
        /*参数设置*/
        parameterSetting: function(opts) {
            var _this = this;
            if (!opts) opts = {};
            opts = $.extend(true, {
                element: '', //tab切换的元素
                current: 1, //展示第几个tab,默认选中第一个
                event: 'click', //用来定义鼠标的触发类型，默认事件是点击
                delay: 100, //当是鼠标移入时，增加延时
                auto: false, //用来定义tab是否自动切换，当指定了时间间隔，就表示自动切换，并且切换时间为指定时间间隔
                effect: 'default', //用来定义内容切换效果，默认直接切换（可选淡入淡出）

                loadingWay: 'stepwise', //1.stepwise-点击之后加载一次，再次点击不再加载，2.all-上来所有全部加载
                title: [], //通过js配置titile
                content: [], //通过js配置内容

                titleElement: '', //标题的元素，opts.element.find('.tab-head>li')
                conElement: '', //内容元素，opts.element.find('.tab-body>div'),

                currentTitleClass: 'current', //当前标题的样式
                currentConClass: 'current', //当前内容样式
                addCurrentTitleClass: '', //当前标题增加class
                addCurrentConClass: '', //当前内容增加class

                titleClass: 'tab-title', //标题默认class
                conClass: 'tab-con', //内容默认class
                addTitleClass: '', //标题增加class
                addConClass: '', //内容增加class

                change: null, //tab切换改变事件,this指向当前是第几个标题，回传的index为当前标题和内容的索引
                htmlDone:null
            }, opts);
            _this.opts = opts;
            /*存储自定义事件*/
            _this.handlers = {};
        },
        /*创建tab*/
        createTab: function() {
            var _this = this;
            if (_this.opts.title.length > 0) { //设置标题
                var titleHtml = '';
                var liHtml = '';
                $.each(_this.opts.title, function(i, v) {
                    liHtml += '<li>' + v + '</li>';
                });
                titleHtml = '<ul class="tab-head">' + liHtml + '</ul>';
                _this.opts.element.find('.tab-head').length > 0 ? _this.opts.element.find('.tab-head').html(liHtml) : _this.opts.element.append(titleHtml);
            }
            if (_this.opts.content.length > 0) { //设置内容
                var contentHtml = '';
                var divHtml = '';
                $.each(_this.opts.content, function(i, v) {
                    divHtml += '<div></div>';
                });
                contentHtml = '<div class="tab-body">' + divHtml + '</div>';
                _this.opts.element.find('.tab-body').length > 0 ? _this.opts.element.find('.tab-body').html(divHtml) : _this.opts.element.append(contentHtml);

                /*根据加载方式加载内容*/
                _this.opts.loadingWay == 'all' && $.each(_this.opts.content, function(i, v) {
                    _this.addSingleContent(i, v);
                });
            }
        },
        /*单个内容加载*/
        addSingleContent: function(i, v) {
            var _this = this;
            if (dataType(v) == 'function') {
                v(function(data) {
                    _this.opts.element.find('.tab-body>div').eq(i).html(data);
                })
            } else {
                _this.opts.element.find('.tab-body>div').eq(i).html(v);
            }
            _this.isLoad[i] = true;
        },
        /*元素设置*/
        elementSetting: function() {
            var _this = this;
            /*当前的选中项最小为第一个*/
            _this.opts.current = _this.opts.current < 1 ? '1' : _this.opts.current;
            _this.opts.element.addClass('tab-container');
            /*增加标题和内容的class*/
            _this.opts.titleElement = _this.opts.titleElement ? _this.opts.titleElement : _this.opts.element.find('.tab-head>li');
            _this.opts.titleElement.addClass(_this.opts.titleClass + ' ' + _this.opts.addTitleClass);
            _this.opts.conElement = _this.opts.conElement ? _this.opts.conElement : _this.opts.element.find('.tab-body>div');
            _this.opts.conElement.addClass(_this.opts.conClass + ' ' + _this.opts.addConClass);
            /*增加当前的class*/
            _this.opts.currentTitleClass += ' ' + _this.opts.addCurrentTitleClass;
            _this.opts.currentConClass += ' ' + _this.opts.addCurrentConClass;
        },
        /*绑定事件*/
        bindEvent: function() {
            var _this = this;
            var timer = null;
            /*tab切换事件*/
            _this.opts.titleElement.on(_this.opts.event, function() {
                var $this = $(this);
                if (_this.opts.event == 'mouseover' && _this.opts.delay) {
                    timer = setTimeout(function() {
                        _this.showCurrentEvent($this);
                    }, _this.opts.delay);
                } else {
                    _this.showCurrentEvent($this);
                }
            }).mouseout(function() {
                clearTimeout(timer);
            });
            /*tab自动播放鼠标移入移出事件*/
            _this.opts.element.hover(function() {
                clearInterval(_this.timer);
            }, function() {
                _this.opts.auto && _this.autoPlay();
            });
        },
        /*当前执行事件*/
        showCurrentEvent: function($this) {
            var _this = this;
            _this.showCurrent($this.index(), true);
            _this.fire('change', _this.opts.titleElement.eq($this.index()), $this.index());
        },
        /*显示当前tab元素*/
        showCurrent: function(index) {
            var _this = this;
            _this.opts.titleElement.removeClass(_this.opts.currentTitleClass);
            _this.opts.titleElement.eq(index).addClass(_this.opts.currentTitleClass);
            if (_this.opts.effect == 'fade') {
                _this.opts.conElement.eq(index).fadeIn()
                    .siblings().hide();
            } else {
                _this.opts.conElement.eq(index).addClass(_this.opts.currentConClass)
                    .siblings().removeClass(_this.opts.currentConClass);
            }
            _this.iNow = index;
            /*如果用的是逐步加载，显示当前项时，加载相应的内容，并将该项的isload设为true,再次点击不再加载*/
            (_this.opts.content.length > 0 && !_this.isLoad[index]) && (_this.addSingleContent(index, _this.opts.content[index]));
        },
        /*自动播放*/
        timer: null,
        autoPlay: function() {
            var _this = this;
            var max = _this.opts.titleElement.size();
            _this.timer = setInterval(function() {
                _this.iNow++;
                (_this.iNow >= max) && (_this.iNow = 0);
                _this.showCurrent(_this.iNow);
            }, _this.opts.auto);
        },
        //        自定义方法
        /*自定义事件绑定*/
        on: function(type, handler) {
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
        fire: function(type, ele, data) {
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
    };
    return Tab;
});