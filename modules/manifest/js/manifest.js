/**
 * 多标签带搜索功能组件
 * @module manifest
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
    'modules/utils/unique',
    'modules/utils/get_charCodeAt',
    'cssFile!modules/manifest/css/manifest'
], function($, dataType, unique, getCharCodeAt) {
    /**
     * @class
     * @classdesc 多标签带搜索功能组件
     * @alias Manifest1
     * @author kt
     * @since 2017-6-26
     *
     * @param {object} opts - 配置参数
     * @param {string} opts.element='' - 当前传入的元素
     * @param {array} [opts.setData=''] - 设置获取到的模糊搜索数据，不为null就是模糊搜索的,数据的形式：['工单', '工单', '个梵蒂冈', '玩儿翁']
     * @param {string} opts.setValue=null - 设置标签值
     * @param {string} [opts.uniqueFlag='name'] -去重标识
     * @param {array} [opts.tagBg=[]] - 标签的背景
     * @param {string} [opts.tagBgExistClass='mf-list-bgExist'] - 有标签背景时的class
     * @param {boolean} [opts.isAllData=false] - 当前获取的数据是否是所有数据
     * @param {boolean} [opts.isTipValueEmpty=true] - 输入框为空时回车是否提示
     * @param {boolean} [opts.isDisabled=false] - 是否禁用，默认不禁用
     * @param {string} [opts.tagMaxNum='1000'] - 标签的最大个数
     * @param {string} [opts.inputMaxMum=''] - 输入框最多输入字符
     * @param {function} [opts.change=null] - return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
     * @param {string} [opts.nameFlag=''] - 字段
     * @param {string} [opts.isOnlySelect=''] - 是否只能通过选择，默认直接输入也可以直接成一个标签
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    function Manifest(opts) {
        this.init(opts)
    }
    Manifest.prototype = {
        /*初始化*/
        init: function(opts) {
            var _this = this;
            _this.value = []; //当前已经选择的标签
            _this.data = []; //当前获取到的所有数据
            _this.searchData = []; //存储搜索的值
            //_this.initData = []; //第一次获得的值，也就如果是isAllData为true才会用，重置会用到
            //_this.initValue = []; //重置会用到
            _this.parameterSetting(opts);
            _this.createManifest();
            _this.dataFn(_this.opts.setData); //数据处理
            _this.valueFn(_this.opts.setValue); //设置值
            _this.bindEvent();
            _this.searchBindEvent();
            _this.valueBindEvent();
            _this.isDisabledFn(_this.opts.isDisabled);
        },
        /*参数设置*/
        parameterSetting: function(opts) {
            var _this = this;
            if (!opts) opts = {};
            opts = $.extend(true, {
                element: '', //当前传入的元素
                setData: null, //设置获取到的模糊搜索数据，不为null就是模糊搜索的
                setValue: null, //设置标签值
                uniqueFlag: 'name', //去重标识
                tagBg: [], //标签的背景
                tagBgExistClass: 'mf-list-bgExist',
                isAllData: false, //搜索请求到的数据是否为全部数据，如果是全部数据则不再发送请求，否则每次输入重新发请求
                isTipValueEmpty: true, //输入框为空时回车是否提示
                isDisabled: false, //是否不可编辑，默认为可编辑
                tagMaxNum: '1000', //标签的最大个数
                inputMaxMum: '', //输入框最多输入字符
                change: null, //值改变触发
                nameFlag: 'name', //字段
                isOnlySelect: false //是否只能通过选择，默认直接输入也可以直接成一个标签
            }, opts);
            _this.opts = opts;
            _this.handlers = {}; //存储自定义事件:必须写在上面，写在下面会把别人的也存储起来的
            _this.opts.change && _this.on('change', _this.opts.change); //把change事件放入到handlers中
        },
        /*创建多值输入相应的布局
         *如果传入的元素是input,添加input相应的class,创建外框并添加到元素后面，再将元素插入到外框末尾位置
         * 如果传入的元素不是div,则当前元素是外框，添加外框对应的class,并在里面添加结构
         * 如果传入的是其他元素，则把当前元素改为div处理,（最好传入div和input,你不听就算了。。。）
         * _this.wrap为外框
         * _this.opts.element为输入框
         * */
        createManifest: function() {
            var _this = this;
            if (_this.isInput()) {
                _this.wrap =
                    $('<div class="mf-container" data-value="">' +
                        '<ol class="mf-list"></ol>' +
                        '<span class="mf_measure"></span>' +
                        '</div>');
                _this.opts.element.addClass('mf-input').after(_this.wrap);
                _this.opts.element.appendTo(_this.wrap);
            } else if (this.tagName(_this.opts.element) == 'div') {
                var str = '<ol class="mf-list"></ol>' +
                    '<span class="mf_measure"></span>' +
                    '<input type="text" class="mf-input">';
                _this.opts.element.addClass('mf-container').attr("data-value", "").html(str);
                _this.wrap = _this.opts.element;
                _this.opts.element = _this.wrap.find('.mf-input');
            } else {
                _this.wrap =
                    $('<div class="mf-container" data-value="">' +
                        '<ol class="mf-list"></ol>' +
                        '<span class="mf_measure"></span>' +
                        '<input type="text" class="mf-input">' +
                        '</div>');
                _this.opts.element.after(_this.wrap).remove();
                _this.opts.element = _this.wrap.find('.mf-input');
            }
            /*设置输入框的限制字符*/
            _this.opts.inputMaxMum && _this.opts.element.attr('maxlength', _this.opts.inputMaxMum);
            /*标签列表的外框*/
            _this.list = _this.wrap.find('.mf-list');
            /*测量宽度元素*/
            _this.measure = _this.wrap.find('.mf_measure');
            //_this.wrap外框
            //_this.opts.element输入框

            /*创建模糊搜索下拉框*/
            _this.searchList = $('<ul class="mf-search-list"></ul>');
            $('body').append(_this.searchList);
        },
        /*判断元素是否是input*/
        isInput: function() {
            var _this = this;
            return _this.tagName(_this.opts.element) == 'input';
        },
        /*获取当前元素的标签*/
        tagName: function(obj) {
            return obj.get(0) && obj.get(0).nodeName.toLowerCase();
        },
        /*数据处理*/
        dataFn: function(parameter) {
            var _this = this;
            _this.dealType('array', parameter, _this.dataToPage, 'setData');
        },
        dataToPage: function(data, _this) {
            /*进行去重处理*/
            _this.data = $.extend(true, [], data);
            _this.dataHtmlExcludeValueHtml();
        },
        dataHtmlExcludeValueHtml: function() {
            var _this = this;
            _this.dataHtml(unique.oneExistInTwo({
                arrOne: _this.data,
                arrTwo: _this.value,
                uniqueFlag: _this.opts.uniqueFlag
            }));
        },
        /*alldata放入html*/
        dataHtml: function(data) {
            var _this = this;
            var liHtml = '';
            $.each(data, function(i, v) {
                liHtml += '<li class="mf-search-item">' + v[_this.opts.nameFlag] + '</li>';
            });
            _this.searchList.html(liHtml);
            _this.searchPos();
        },
        /*设置已有的值*/
        valueFn: function(parameter) {
            var _this = this;
            _this.dealType('array', parameter, _this.valueToPage, 'setValue');
        },
        valueToPage: function(value, _this) {
            /*进行去重处理*/
            _this.value = $.extend(true, [], value);
            _this.valueHtml();
            _this.dataHtmlExcludeValueHtml();
        },
        /*将设置添加为标签*/
        valueHtml: function() {
            var _this = this;
            var liHtml = '';
            _this.list.empty();
            $.each(_this.value, function(i, v) {
                _this.addTagHtml(v[_this.opts.nameFlag]);
            });
        },
        /*添加标签*/
        addTagHtml: function(val) {
            var _this = this;
            if (_this.opts.tagMaxNum > _this.list.find('li').length) { //当前选择值小于最大标签数时，可以添加
                /*添加标签*/
                var str = ' <li class="mf-item" title="">' +
                    '<span class="mf-text">' + val + '</span>' +
                    '<em class="mf-remove" >×</em>' +
                    '<input type="hidden" class="mf-value" value="' + val + '"/>' +
                    '</li>';
                _this.list.append(str);
                _this.tagChangeDeal();
                if (!_this.opts.isDisabled) { //如果是可以用的情况下，给删除按钮加上删除提示
                    _this.list.find('.mf-remove').attr('title', "删除");
                }
            } else { //不能添加
            }
        },
        /*给标签加背景色
         *给隐藏域加唯一标识name
         */
        tagChangeDeal: function() {
            var _this = this;
            _this.opts.tagBg.length > 0 && _this.list.addClass('mf-list-bgExist');
            _this.list.find('li').each(function(i, v) {
                if (_this.opts.tagBg.length > 0) {
                    $(this).css({
                        'background': _this.opts.tagBg[getCharCodeAt($(this).text()) % _this.opts.tagBg.length],
                        'border-color': _this.opts.tagBg[getCharCodeAt($(this).text()) % _this.opts.tagBg.length]
                    });
                }
                $(this).find('.mf-value').attr('name', 'mf-values[' + i + ']');
            });
            if (_this.opts.tagMaxNum <= _this.list.find('li').length) { //当已选择的标签已经达到设置的最大标签数时，不能再添加了
                _this.noCanAddFn();
            } else {
                _this.canAddFn();
            }
            if (_this.value.length == _this.list.find('li').length) {
                setTimeout(function() {
                    _this.fire('change', _this.wrap, _this.value); //值改变之后触发
                }, 0);
            }
        },
        /*不可添加函数*/
        noCanAddFn: function() {
            var _this = this;
            _this.opts.element.hide().attr({
                'disabled': 'disabled'
            });
            _this.searchList && _this.searchList.hide();
        },
        /*可添加函数*/
        canAddFn: function() {
            var _this = this;
            _this.opts.element.show().removeAttr('disabled');
            //_this.searchList && _this.searchList.show();
        },
        /*绑定事件*/
        bindEvent: function() {
            var _this = this;
            if (!_this.opts.isDisabled) { //不可用
                /*点击整个区域让输入框获得焦点*/
                _this.wrap.on('click', function() {
                    _this.opts.element.show();
                    _this.focusInputFn();
                });
                /*输入框事件*/
                _this.opts.element.on('input', function(e) {
                    _this.setInputWidth();
                    _this.fuzzySearch($(this));
                    _this.showOrHideList();
                }).on('blur', function(e) {
                    if (_this.opts.isOnlySelect) {
                        $(this).val('');
                    } else {
                        _this.addTag($(this), 'blur');
                    }
                    _this.searchList && _this.searchList.hide();
                    _this.opts.element.hide();
                }).on('focus', function() {
                    _this.showOrHideList();
                    _this.opts.element.show();
                }).on('keyup', function(e) {
                    /*回车操作*/
                    if (e.keyCode == _this.keyCode.enter) {
                        if (!_this.searchList || _this.searchList.find('li').length == 0) { //如果没有联想的数据，则直接走添加
                            if (_this.opts.isOnlySelect) {
                                $(this).val('');
                            } else {
                                _this.addTag($(this), _this.keyCode.enter);
                            }
                        } else { //如果联想出来数据
                            _this.searchList.find("li").filter(".seled:visible").trigger("mousedown");
                            //_this.focusInputFn();
                        }
                    } else if (e.keyCode == _this.keyCode.up) { //下箭头操d
                        if (!!_this.searchList) {
                            var lis = _this.searchList.find("li:visible");
                            var curli = lis.filter(".seled");
                            var index = curli.length == 0 ? 0 : lis.index(curli);
                            index--;
                            if (index < 0) {
                                index = lis.length - 1;
                            }
                            lis.removeClass("seled");
                            var aimLi = lis.eq(index);
                            aimLi.addClass("seled");
                        }
                        return false;
                    } else if (e.keyCode == _this.keyCode.down) { //上箭头操作
                        if (!!_this.searchList) {
                            var lis = _this.searchList.find("li:visible");
                            var curli = lis.filter(".seled");
                            var index = curli.length == 0 ? 0 : lis.index(curli);
                            index++
                            if (index >= lis.length) {
                                index = 0;
                            }
                            lis.removeClass("seled");
                            var aimLi = lis.eq(index);
                            aimLi.addClass("seled");
                            return false;
                        }
                    }
                });
            }
        },
        // 当输入框为空的时候不显示下拉框
        showOrHideList: function() {
            var _this = this;
            if (_this.opts.element.val() != '') {
                _this.searchList && _this.searchList.show();
            } else {
                _this.searchList && _this.searchList.hide();
            }
        },
        /*搜索列表的事件*/
        searchBindEvent: function() {
            var _this = this;
            /*搜索列表事件*/
            _this.searchList.on('mousedown', 'li', function() {
                var obj = {};
                obj[_this.opts.nameFlag] = $(this).text()
                _this.value.push(obj);
                _this.addTagHtml($(this).text());
                $(this).remove();
                _this.focusInputFn();
                _this.showOrHideList();
                return false;
            });
            /*window事件*/
            $(window).resize(function() {
                _this.searchPos();
            });
            //            $(window).on('mousedown', function() {
            //                _this.searchList && _this.searchList.hide();
            //            });
        },
        /*标签的事件*/
        valueBindEvent: function() {
            var _this = this;
            if (!_this.opts.isDisabled) {
                /*删除事件*/
                _this.list.on('click', '.mf-remove', function() {
                    var text = $(this).closest('li').find('.mf-text').text();
                    $(this).closest('li').remove();
                    _this.removeTag(text);
                    _this.focusInputFn();
                });
            }
        },
        /*列表和标签点击出发标签改变函数*/
        focusInputFn: function() {
            var _this = this;
            if (_this.opts.element.css('display') != 'none') {
                _this.searchPos();
                _this.selFirst();
                _this.opts.element.addClass('mf-input-focus');
                _this.opts.element.focus().val("");
            }
        },
        /*搜索框跟随输入框位置*/
        searchPos: function() {
            var _this = this;
            _this.searchList && _this.searchList.css({
                'top': _this.opts.element.offset().top + _this.opts.element.outerHeight(),
                'left': _this.opts.element.offset().left
            })
        },
        /*选中第一个*/
        selFirst: function() {
            var _this = this;
            if (_this.opts.setData) {
                if (_this.searchList.find(".seled").length == 0) {
                    _this.searchList.find("li:eq(0)").addClass("seled");
                }
            }
        },
        //动态计算输入框宽度
        setInputWidth: function() {
            var _this = this;
            _this.measure.html(_this.opts.element.val() + '--');
            _this.opts.element.css({
                'width': parseFloat(_this.measure.css('width')) +
                    parseFloat(_this.opts.element.css('paddingLeft')) +
                    parseFloat(_this.opts.element.css('paddingRight'))
            });
        },
        //模糊搜索
        fuzzySearch: function($this) {
            var _this = this;
            if (_this.opts.setData) {
                if (_this.opts.isAllData) { //当setData时获取的是所有数据，则不再向后台发送请求，根据文字内容自行匹配
                    var currentData = [];
                    $.each(_this.initData, function(i, v) {
                        if ((v[_this.opts.nameFlag]).indexOf($this.val()) != -1) {
                            currentData.push(v);
                        }
                    });
                    _this.data = $.extend(true, [], currentData);
                    _this.dataHtmlExcludeValueHtml();
                    _this.selFirst();
                } else {
                    if (_this.searchData[$this.val()]) {
                        _this.data = $.extend(true, [], _this.searchData[$this.val()]);
                        _this.dataHtmlExcludeValueHtml();
                        _this.selFirst();
                    } else {
                        var key = $this.val();
                        setTimeout(function() {
                            if (key == $this.val()) {
                                _this.dealType('array', _this.opts.setData, function(data) {
                                    _this.searchData[key] = $.extend(true, [], data);
                                    _this.data = $.extend(true, [], data);
                                    _this.dataHtmlExcludeValueHtml();
                                    _this.selFirst();
                                }, 'setData', key);
                            }
                        }, 200);
                    }
                }
            }
        },
        /*按键*/
        keyCode: {
            'up': '38', //上
            'down': '40', //下
            'enter': '13' //回车
        },
        /*添加tag*/
        addTag: function($this, keyCode) {
            var _this = this;
            $this.css({ 'width': $this.css('min-width') }); //将输入大小复原为原始大小
            if ($this.val() == '') {
                /*当输入框值为空的时候，回车触发提示，失焦不触发任何操作*/
                if (_this.opts.isTipValueEmpty && keyCode == _this.keyCode.enter) {
                    _this.errorTip();
                } else {
                    /*如果是失焦的话，移除样式*/
                    if (keyCode == 'blur') {
                        _this.opts.element.removeClass('mf-input-focus');
                    }
                }
            } else {
                /*当前值，是否重复了*/
                var obj = {};
                obj[_this.opts.nameFlag] = $this.val();
                if (unique.isExist({
                        arrOne: _this.value,
                        arrTwo: [obj],
                        uniqueFlag: _this.opts.uniqueFlag
                    })) { //重复
                    _this.errorTip();
                } else {
                    _this.value.push(obj);
                    _this.addTagHtml($this.val());
                    /*清空输入框*/
                    _this.opts.element.val('');
                    /*重新计算搜索框的位置*/
                    _this.searchPos();
                    /*重新计算模糊搜索框的值*/
                    _this.dataHtmlExcludeValueHtml();
                    /*如果是失焦的话，移除样式*/
                    if (keyCode == 'blur') {
                        _this.opts.element.removeClass('mf-input-focus');
                    }
                }
            }
        },
        /*错误提示*/
        errorTip: function() {
            var _this = this;
            var timer = null;
            var iNum = 0;
            clearInterval(timer);
            timer = setInterval(function() {
                if (iNum == 5) {
                    clearInterval(timer);
                    iNum = 0;
                } else {
                    iNum++;
                }
                if (iNum % 2) {
                    _this.opts.element.addClass('mf-input-error');
                } else {
                    _this.opts.element.removeClass('mf-input-error');
                }
            }, 100);
            _this.opts.element.focus().val("");
        },
        /*删除标签函数*/
        removeTag: function(val) {
            var _this = this;
            var obj = {};
            obj[_this.opts.nameFlag] = val;
            _this.value = $.extend(true, [], unique.oneExistInTwo({
                arrOne: _this.value,
                arrTwo: [obj],
                uniqueFlag: _this.opts.uniqueFlag
            }));
            _this.tagChangeDeal();
            _this.dataHtmlExcludeValueHtml();
        },
        /*是否可用函数*/
        isDisabledFn: function(isDisabled) {
            var _this = this;
            if (isDisabled) { //不可用时
                _this.opts.element.hide().attr({
                    'disabled': 'disabled'
                });
                _this.wrap.addClass('mf-disabled');
            } else { //可用
                _this.opts.element.show().removeAttr('disabled');
                _this.wrap.removeClass('mf-disabled');
            }
        },
        /* -----------------数据处理方法------------------- */
        /*对数据进行处理*/
        dataDeal: function(data) {
            var _this = this;
            var result = [];
            if (dataType(data) == 'object') { //{'name':1},只会接到第一个参数
                data = [data];
                result = $.extend(true, [], data);
            } else if (dataType(data) == 'string') { //'1',只会接到第一个参数
                var obj = {};
                obj[_this.opts.nameFlag] = data;
                data = [obj];
                result = $.extend(true, [], data);
            } else if (dataType(data) == 'array') { //[, ,]
                if (dataType(data[0]) == 'string') { //['1','2','3']
                    var tag = [];
                    $.each(data, function(i, v) {
                        tag[i] = {};
                        tag[i][_this.opts.nameFlag] = v;
                    });
                    result = $.extend(true, [], tag);
                } else if (dataType(data[0]) == 'object') { //[{'name':'1'},{'name':'2'},{'name':'3'}]
                    result = $.extend(true, [], data);
                }
            }
            return result;
        },
        /*处理数据的类型
         * type,希望最终的类型，string
         * parameter，传入的数据,
         *      function
         *          function(callback){
         *              callback(data);
         *          }
         *      array
         *          [
         *              {id:'1',name:'文本'},
         *              {id:'2',name:'文本22'},
         *          ]
         *      object,如果没有url，直接转成数据
         *          {
         *              url:'',
         *              data:{},
         *              timeout:0,
         *              field:''
         *          }
         * fn,回调function
         * flag,是设置值还是数据setValue/setData，string
         * val为搜索输入框传进来的值,string
         * */
        dealType: function(type, parameter, fn, flag, valInput) {
            var val = valInput; //这里把||''去掉了，因为下面的请求会存在判断undefined的情况
            var _this = this;
            if (dataType(parameter) == 'function') { //如果传进来的数据是function，将回调函数里的数据取出来
                parameter.call(_this, function(data) { //这里为什么要return呢，我把它删掉了，执行函数，并将this指向_this,取出数据
                    _this.dealType(type, data, fn, flag, val);
                }, val || '');
                return false; //阻断后续操作
            }
            if (dataType(parameter) == 'object') {
                if (parameter.url) {
                    function parameterToFunction(callback, valInput) {
                        _this.requestAjaxFn(parameter, callback, valInput);
                    }
                    _this.dealType(type, parameterToFunction, fn, flag, val);
                    return false;
                } else {
                    if (type == 'array') {
                        parameter = [parameter];
                        _this.dealType(type, parameter, fn, flag, val);
                        return false;
                    }
                }
            }
            if (dataType(parameter) == type) {
                parameter = $.extend(true, [], unique.ItselfExist({
                    arrOne: _this.dataDeal(parameter),
                    uniqueFlag: _this.opts.uniqueFlag
                }));
                var typeToData = {
                    'string': parameter,
                    'array': $.extend(true, [], parameter),
                    'object': $.extend(true, {}, parameter)
                }
                if (_this.initData == undefined && flag == 'setData') { //设置初始数据
                    _this.initData = typeToData[type];
                }
                if (_this.defaultValue == undefined && flag == 'setValue') { //设置默认值,如果没有设置默认值的情况，设置的值则是初始值
                    _this.defaultValue = typeToData[type];
                }
                if (_this.initValue == undefined && flag == 'setValue') { //没有设置数据，或者数值的数据不对则默认初始值为空
                    _this.initValue = typeToData[type];
                }
                fn(parameter, _this);
            }
        },
        /* 如果是url,需要发送请求,如果要在本地测试的话，你需要指向一下fiddler，并将html的路径改为线上的路径
         * parameter:传入的请求数据
         * callback:成功之后，执行回调函数
         */
        requestAjaxFn: function(parameter, callback, valInput) {
            var _this = this;
            if (valInput) { //如果死有搜索框的输入的话，需要将输入框的值传进去
                parameter.data.input = valInput || '';
            }
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
                        callback(data);
                    } else {
                        console.log('数据出错了');
                    }
                },
                error: function() {
                    console.log('请求失败了');
                }
            });
        },
        /* -----------------自定义方法------------------- */
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
        },
        /**
         * @description 设置数据方法
         * @param {array|object|function} parameter - 传入的参数
         * @example
         * var manifest = new Manifest({配置参数});
         * 设置值方法1：
         *      manifest.setData(['啦啦啦','啦啦啦1']);
         * 设置值方法2：
         *      manifest.setData(function(callback){
         *           callback(['啦啦啦','啦啦啦1']));//必须要执行callback
         *      });
         * 设置值方法3：
         *      manifest.setData({
         *           url:'',//请求
         *           data:{},//数据
         *           timeout:'0',//超时时间
         *           field:''//取值的字段
         *      });
         */
        setData: function(parameter) {
            var _this = this;
            _this.opts.setData = parameter;
            _this.dataFn(parameter); //数据处理
        },
        /**
         * @description 设置数据方法
         * @param {array|object|function} parameter - 传入的参数
         * @example
         * var manifest = new Manifest({配置参数});
         * 设置值方法1：
         *      manifest.setValue(['啦啦啦','啦啦啦1']);
         * 设置值方法2：
         *      manifest.setValue(function(callback){
         *           callback(['啦啦啦','啦啦啦1']));//必须要执行callback
         *      });
         * 设置值方法3：
         *      manifest.setValue({
         *           url:'',//请求
         *           data:{},//数据
         *           timeout:'0',//超时时间
         *           field:''//取值的字段
         *      });
         */
        setValue: function(parameter) {
            var _this = this;
            _this.valueFn(parameter); //值处理
        },
        /**
         * @description 获取值
         * @param {requestCallback} [callback] -回调函数
         * @return {String|array} 当前的数据,没有值时为空的字符串，有值则是数组形式
         * @example
         * var manifest = new Manifest({配置参数});
         * 获取值方法1：
         *      manifest.getValue(function(value){
         *          //value则为当前值
         *      });//返回值为回调函数执行结果
         * 获取值方法2：
         *      manifest.getValue();//返回值为当前数据
         */
        getValue: function(callback) {
            var _this = this;
            if (callback) { //如果有回调函数
                return callback(_this.resultDataDeal().length == 0 ? '' : _this.resultDataDeal());
            } else {
                return _this.resultDataDeal().length == 0 ? '' : _this.resultDataDeal()
            }
        },
        resultDataDeal: function() {
            var _this = this;
            var result = [];
            $.each(_this.value, function(i, v) {
                result.push(v[_this.opts.nameFlag]);
            })
            return result;
        },
        /**
         * @description 触发改变
         * @param {requestCallback} callback -回调函数
         * @example
         * var manifest = new Manifest({配置参数});
         * manifest.change(function(value){
         *      //value为当前值
         * });
         */
        change: function(callback) {
            var _this = this;
            callback && _this.on('change', callback);
        },
        /**
         * @description 重置
         * @example
         * var manifest = new Manifest({配置参数});
         * manifest.reset();
         */
        reset: function() {
            var _this = this;
            _this.valueFn(_this.initValue);
        },
        /**
         * @description 清除值
         * @example
         * var manifest = new Manifest({配置参数});
         * manifest.clear();
         */
        clear: function() {
            var _this = this;
            _this.valueFn([]);
        },
        /**
         * @description 摧毁
         * @example
         * var manifest = new Manifest({配置参数});
         * manifest.destroy();
         */
        destroy: function() {
            var _this = this;
            _this.wrap.remove();
            _this.searchList && _this.searchList.remove();
        },
        /**
         * @description 显示
         * @example
         * var manifest = new Manifest({配置参数});
         * manifest.show();
         */
        show: function() {
            var _this = this;
            _this.wrap.show();
        },
        /**
         * @description 隐藏
         * @example
         * var manifest = new Manifest({配置参数});
         * manifest.hide();
         */
        hide: function() {
            var _this = this;
            _this.wrap.hide();
        },
        /**
         * @description 禁用
         * @example
         * var manifest = new Manifest({配置参数});
         * manifest.disabled();
         */
        disabled: function() {
            var _this = this;
            _this.isDisabledFn(true);
        },
        /**
         * @description 启用
         * @example
         * var manifest = new Manifest({配置参数});
         * manifest.enabled();
         */
        enabled: function() {
            var _this = this;
            _this.isDisabledFn(false);
        }
    };
    return Manifest;
});