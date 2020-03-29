require.config({
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min',
        'cssFile': 'modules/libs/rq/css.min'
    }
});
define([
    'jquery',
    'modules/progress_bar/js/circle_progress_bar',
    'modules/progress_bar/js/columnar_progress_bar'
], function($, circleProgressBar, columnarProgressBar) {
    /**
     * @class
     * @classdesc 进度条组件，包括圆形进度条和柱形进度条
     * @alias ProgressBar
     * @extends ProgressBarBase
     * @author kt
     * @since 2017-7-20
     *
     * @param {object} opts - 配置参数
     * @param {string} [opts.element=''] - 当前需要生成进度条的元素，默认放在body里
     * @param {string} [opts.type='circle'] - 当前进度条的样式是圆形circle还是柱状columnar
     * @param {string} [opts.addClass=''] - 进度条添加class
     * @param {object} [opts.outerStyle={}] - 进度条外层相关样式设置<br>
     *     圆形的宽高必须一致，高度会跟宽度强制统一
     * @param {string} [opts.outerStyle.width='200px'] - 外环宽度-圆形相关设置
     * @param {string} [opts.outerStyle.background='#eee'] - 外环背景-圆形相关设置
     * @param {string} [opts.outerStyle.color='#666'] - 外环字体颜色，当进度条没有到达文字时的颜色-圆形相关设置
     * @param {string} [opts.outerStyle.width='300px'] - 外环宽度-柱形相关设置
     * @param {string} [opts.outerStyle.background='#eee'] - 外环背景-柱形相关设置
     * @param {string} [opts.outerStyle.height='24px'] - 外环高度-柱形相关设置
     * @param {string} [opts.outerStyle.color='#666'] - 外环字体颜色，当进度条没有到达文字时的颜色-柱形相关设置
     * @param {string} [opts.outerStyle[border-radius]='15px'] - 外环圆角-柱形相关设置
     * @param {object} [opts.innerStyle={}] - 进度条里面的相关样式设置
     * @param {string} [opts.innerStyle.background='#00adee'] - 内环背景-圆形相关设置
     * @param {string} [opts.innerStyle.width='18px'] - 内环高度-圆形相关设置
     * @param {string} [opts.innerStyle.background='#00adee'] - 内环高度-柱形相关设置
     * @param {string} [opts.innerStyle.color='#fff'] - 内环字体颜色，当进度条到文本时的颜色-柱形相关设置
     * @param {string} [opts.innerStyle.height='18px'] - 内环高度，宽度是不能设置的，设置也没有用，我会强行转换的-柱形相关设置
     * @param {string} [opts.innerStyle[border-radius]='15px'] - 内环圆角-柱形相关设置
     * @param {string|object|function} [opts.setValue='0%'] - 设置进度条的当前进度，默认为0%,可以是string/object/function
     * @param {string|object|function} [opts.maxValue='100%'] - 进度条的最大进度，默认为100，如果有特殊的最大进度可以设置
     * @param {string} [opts.defaultValue='0%'] - 默认显示
     * @param {string} [opts.showTxt='bar'] - 显示文字,默认显示进度，none-为不显示，如果入其他的则显示该文本
     * @param {string} [opts.time=false] - 向后端发请求的的间隔时间，默认为false，只发一次,针对setValue是function、object的情况下设置
     * @param {function} [opts.barEnd=null] - 进度条到达最大限制时执行方法
     * @param {boolean} [opts.isText=false] - 是否是测试环境,默认不是

     * @requires 'jquery'
     * @requires 'require'
     */
    function ProgressBar(opts) {
        return this.init(opts);
    }
    ProgressBar.prototype = {
        /*初始化*/
        init: function(opts) {
            var _this = this;
            if (opts.type == 'circle') {
                return new circleProgressBar(opts);
            } else { //默认为柱状
                return new columnarProgressBar(opts);
            }
        }
    }
    return ProgressBar;
});