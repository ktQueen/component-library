require.config({
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min',
        'cssFile': 'modules/libs/rq/css.min'
    }
});
define([
    'modules/utils/extend',
    'modules/utils/data_type',
    'jquery'
], function(Class, dataType, $) {
    /**
     * 进度条的基础文件
     * @alias ProgressBarBase
     * @author kt
     * @since 2017-7-24
     */
    var ProgressBarBase=function(){};
    ProgressBarBase.prototype =  {
        /*初始化*/
        init: function(opts) {
            var _this = this;
            _this.parameterSetting(opts);
            _this.createProgressBar();
            _this.elementSetting();
            _this.styleSetting();
            _this.setValueFn(_this.opts.setValue);
        },
        /*参数设置*/
        parameterSetting: function(opts) {
            var _this = this;
            var el = $('<div>');
            if (!opts.element) { //不存在则自动创建一个div放入body中
                $('body').append(el);
            }
            var defaultParameter = {
                element: el, //当前需要生成进度条的元素，默认放在body里
                addClass: '', //进度条添加class
                showTxt: 'bar', //显示文字,默认显示进度，none-为不显示，如果入其他的则显示该文本
                setValue: '', //设置进度条的当前进度，默认为0%,可以是string/object/function
                //                setValue:{//object形式，可以传的参数
                //                    url:'data.json',//请求的链接
                //                    data:{},//传递的数据
                //                    timeout:'1000',//超时时间
                //                    timeoutTip:'超时了',//超时提示
                //                    field:'repData.bar'//获取的字段
                //                },
                //                setValue:function(callback){//这种方法的超时就设置在ajax上，自己去修改超时提示
                //                    //console.log(this);this执行当前进度条。
                //                    //_this.$inner.html(txt);
                //                    //_this.$assist.html(txt);
                //                    callback(num+'%')
                //                },
                maxValue: '100%', //string/object/function 进度条的最大进度，默认为100，如果有特殊的最大进度可以设置
                defaultValue: '0%', //默认显示
                time: false, //向后端发请求的的间隔时间，默认为false，只发一次
                //针对setValue是function、object的情况下设置
                barEnd: null, //进度条到达最大限制时执行方法
                isText: 'false' //是否是测试环境
            };
            defaultParameter = $.extend(true, _this.ownParameterSetting(), defaultParameter);
            if (!opts) opts = {};
            opts = $.extend(true, defaultParameter, opts);
            _this.opts = opts;
        },
        /*进度设置*/
        setValueFn: function(parameter) {
            var _this = this;
            _this.dealType(parameter, _this.setValueToBar, 'setValue');
        },
        /*处理setValue和setData的类型*/
        dealType: function(parameter, fn, flag) {
            var _this = this;
            if (dataType(parameter) == 'string') {
                fn((parameter || _this.opts.defaultValue), _this);
                if (!_this.setInitValue && flag == 'setValue') {
                    _this.setInitValue = parameter;
                }
            } else if (dataType(parameter) == 'function') {
                parameter.call(_this, function(data) {
                    _this.dealType(data, fn, flag);
                });
                _this.timeFn(parameter, fn);
            } else if (dataType(parameter) == 'object') {
                if (_this.opts.isText) {
                    var textData = 0;

                    function parameterToFunction(callback) {
                        textData++;
                        _this.requestAjaxFn(parameter, callback, textData);
                    }
                } else {
                    function parameterToFunction(callback) {
                        _this.requestAjaxFn(parameter, callback);
                    }
                }
                _this.opts.time = parameter.time;
                _this.dealType(parameterToFunction, fn);
            }
        },
        /*最大值处理*/
        /*第三个参数，返回的是最大值，还是当前进度条值，默认为全部返回*/
        maxValueFn: function(barVal, flag, callback) {
            var _this = this;
            var barWidth = parseFloat(barVal) * parseFloat(_this.$outer.innerWidth()) / 100;
            _this.dealType(_this.opts.maxValue, function(maxVal, _this) {
                var maxWidth = parseFloat(maxVal) * parseFloat(_this.$outer.innerWidth()) / 100;
                if (parseFloat(barVal) > parseFloat(maxVal)) {
                    barWidth = maxWidth;
                    barVal = maxVal;
                }
                if (flag == 'bar') {
                    callback(barVal, barWidth);
                } else if (flag == 'max') {
                    callback(maxVal, maxWidth);
                } else {
                    callback(maxVal, maxWidth, barVal, barWidth);
                }
            });
        },
        /*当结束和获取数据时触发和设置文本*/
        endAndGetAndTxtFn: function(barVal, maxVal) {
            var _this = this;
            _this.setTxtFn(barVal);
            //当进度条已经到达最大进度时，执行函数barEnd
            if (parseFloat(barVal) >= parseFloat(maxVal)) {
                _this.opts.barEnd && _this.opts.barEnd();
            }
            _this.currentValue = barVal;
            if (_this.getValueCallback) {
                _this.getValueCallback(_this.currentValue);
                _this.getValueCallback = null;
            }
        },
        //进度条上的文本展示
        //如果flag为true,强制显示传进来的值
        //超时设置也走这里，flag表示就是超时应该显示的文字
        setTxtFn: function(text, flag) {
            var _this = this;
            var txt = '';
            if (flag) {
                txt = text
            } else {
                if (_this.opts.showTxt == 'bar') {
                    txt = text;
                } else if (_this.opts.showTxt == 'none') {
                    txt = '';
                } else {
                    txt = _this.opts.showTxt;
                }
            }
            _this.setTxtToPage(txt);
        },
        /*根据时间处理请求次数*/
        timer: null,
        timeFn: function(parameter, fn) {
            var _this = this;
            if (_this.opts.time) {
                _this.timer = setInterval(function() {
                    if (!_this.isStop) {
                        parameter.call(_this, function(data) {
                            _this.dealType(data, function(data) {
                                _this.maxValueFn(data, 'max', function(maxVal, maxWidth) {
                                    if (parseFloat(data) >= parseFloat(maxVal)) {
                                        fn(maxVal, _this);
                                        clearInterval(_this.timer);
                                    } else {
                                        fn(data, _this);
                                    }
                                });
                            });
                        })
                    } else {
                        clearInterval(_this.timer);
                    }
                }, _this.opts.time);
            }
        },
        //ajax请求是否出错，出错就清掉定时器
        isStop: false,
        //如果是url,需要发送请求
        requestAjaxFn: function(parameter, callback, textData) {
            var _this = this;
            $.ajax({
                url: parameter.url || '',
                dataType: 'json',
                data: parameter.data || {},
                timeout: parameter.timeout || '0', //代表永不超时
                success: function(data) {
                    if (data && data != null) {
                        $.each(parameter.field.split('.'), function(i, v) {
                            data = data[v];
                        });
                        //设置一个默认字段，免得写的时候每个都要写
                        callback((textData || data) + '%' || data.repData.code);
                    } else {
                        console.log('数据出错了');
                        _this.isStop = true;
                    }
                },
                error: function() {
                    console.log('请求失败了');
                    _this.isStop = true;
                },
                complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
                    if (status == 'timeout') { //超时,status还有success,error等值的情况
                        _this.isStop = true;
                        _this.setTxtFn(parameter.timeoutTip || '超时', true);
                    }
                }
            });
        },
        //        对外的方法
        /**
         * @description 设置值方法
         * @param {array|object|function} parameter - 传入的参数，最终获取的是string
         * @param {string} time - 几秒设置一次，只有在为object/function才有效
         * @example
         * var progressBar = new ProgressBar({配置参数});
         * 设置值方法1：
         *      progressBar.setValue({
         *        url:'data.json',//请求的链接
         *        data:{},//传递的数据
         *        timeout:'1000',//超时时间
         *        timeoutTip:'超时了',//超时提示
         *        field:'repData.bar'//获取的字段
         *    });
         * 设置值方法2：这种方法的超时就设置在ajax上，自己去修改超时提示，并且一定要执行callback
         *      formFiled.setValue(function(callback){
         *            callback(num+'%')
         *        });
         * 设置值方法3：
         *      formFiled.setValue('10%');
         */
        setValue: function(parameter, time) {
            var _this = this;
            time && (_this.opts.time = time);
            this.setValueFn(parameter);
        },
        /**
         * @description 获取值
         * @param {requestCallback} [callback] -回调函数
         * @return {String} 当前的数据
         * @example
         * var progressBar = new ProgressBar({配置参数});
         * 获取值方法1：
         *      progressBar.getValue(function(value){
         *          //value则为当前值
         *      });//返回值为回调函数执行结果
         * 获取值方法2：
         *      progressBar.getValue();//返回值为当前数据
         */
         getValue: function(callback) {
            var _this = this;
            if (callback) {
                if (_this.currentValue == false) {
                    _this.getValueCallback = callback;
                    _this.setValueFn(_this.opts.setValue);
                } else {
                    callback(_this.currentValue);
                }
            } else {
                return _this.currentValue;
            }
        },
        /**
         * @description 重置进度条
         * @example
         * var progressBar = new ProgressBar({配置参数});
         * progressBar.reset();
         */
        reset: function() {
            var _this = this;
            clearInterval(_this.timer);
            _this.setValueFn((_this.setInitValue || '0%'));
        },
        /**
         * @description 清除进度条
         * @example
         * var progressBar = new ProgressBar({配置参数});
         * progressBar.clear();
         */
        clear: function() {
            var _this = this;
            clearInterval(_this.timer);
            _this.setValueFn('0%');
        },
        /**
         * @description 摧毁进度条
         * @example
         * var progressBar = new ProgressBar({配置参数});
         * progressBar.destroy();
         */
        destroy: function() {
            var _this = this;
            clearInterval(_this.timer);
            _this.opts.element
                .empty()
                .removeAttr('style')
                .removeClass('progress-bar ' + _this.ownClass + ' ' + _this.opts.addClass);
        },
        /**
         * @description 显示
         * @example
         * var progressBar = new ProgressBar({配置参数});
         * progressBar.show();
         */
        show: function() {
            var _this = this;
            _this.opts.element.show();
        },
        /**
         * @description 隐藏
         * @example
         * var progressBar = new ProgressBar({配置参数});
         * progressBar.hide();
         */
        hide: function() {
            var _this = this;
            _this.opts.element.hide();
        }
    }
    var Base = Class.extend(ProgressBarBase);
    return Base;
});