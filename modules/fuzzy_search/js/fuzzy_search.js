/**
 * 模糊搜索组件
 * @module fuzzy_search
 */
require.config({
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min',
        'cssFile': 'modules/libs/rq/css.min'
    },
});
define([
    'jquery',
    'modules/utils/data_type',
    'cssFile!modules/fuzzy_search/css/fuzzy'
], function($, dataType) {
    /**
     * @class
     * @classdesc 模糊搜索组件
     * @alias FuzzySearch
     * @author kt
     * @since 2017-4-28
     *
     * @param {object} opts - 配置参数
     * @param {dom} opts.element='' - 必填，btn放的位置
     * @param {string} [opts.btnAddClass=''] - btn添加class
     * @param {object} [opts.btnStyle={}] - btn的相关样式
     * @param {string} [opts.placeholder=''] - 按钮显示的提示文字
     * @param {boolean} [opts.isDisabled=false] - 按钮是否可点击
     * @param {boolean} [opts.readOnly=false] - 按钮是否是只读状态
     * @param {dom} [opts.menuElement='']] - menu放的位置，默认放在body
     * @param {string} [opts.menuAddClass=''] - menu添加class
     * @param {object} [opts.menuStyle={}] - 菜单扩展的样式，如果是只有菜单的情况下，则不设置默认样式，如果有下拉按钮的情况下，将菜单设置为定位且是不可见状态
     * @param {string} [opts.menuListShowWay=''] - 菜单列表显示形式，如果是one单行就用...,默认为''，显示所有内容
     * @param {string} [opts.idFlag='id'] - 数据的key值
     * @param {string} [opts.nameFlag='name'] - 数据的key值
     * @param {string|object|function|array} [opts.setValue=null] - 设置值，可以为object/function/array,但是数据最终纯为object/array
     * @param {object|function|array} opts.setData=null - 设置数据，可以为object/function/array,但是数据最终纯为object/array
     * @param {function} [opts.initDone=null] - 下拉菜单整体初始化完成触发,function
     * @param {function} [opts.change=null] - 值改变触发
     * @param {boolean} [opts.isBlurChange=false] - 是否失焦触发改变，默认失焦不触发通过点击搜索按钮触发
     * @param {string} opts.type='fuzzySearch' - 要创建的表单字段的类型
     * @param {boolean} opts.isShowSearchIcon=true - 是否显示搜索按钮
     * @param {boolean} opts.isShowClearIcon=true - 是否显示清除按钮
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    function FuzzySearch(opts) {
        this.init(opts)
    }
    FuzzySearch.prototype = {
        /*初始化*/
        init: function(opts) {
            var _this = this;
            _this.optsSet(opts);
            _this.createHtml();
            _this.opts.initDone && _this.opts.initDone.call(_this.$input);
            _this.dataFn(_this.opts.setData);
            _this.valueFn(_this.opts.setValue);
            _this.bindEvent();
            _this.data = [];
            _this.value = '';
        },
        /*参数设置*/
        optsSet: function(opts) {
            var _this = this;
            var el;
            if (!opts.menuElement) {
                el = $('<ul class="fuzzy-search-menu"></ul>');
                $('body').append(el);
            }
            if (!opts) opts = {};
            opts = $.extend(true, {
                type: 'fuzzySearch',
                element: '', //元素
                placeholder: '请输入你想搜索的内容',
                btnStyle: {}, //btn的相关样式
                btnAddClass: '', //btn添加的class
                isDisabled: false, //按钮是否可点击
                readOnly: false, //按钮是否是只读状态
                idFlag: 'id', //数据的key值
                nameFlag: 'name', //数据的key值
                defaultValue: null, //设置默认值，和这里的setValue得到的数据是一致的
                setValue: null, //设置值，可以为object/function/string,但是数据最终纯为string
                setData: null, //设置数据，可以为object/function/string,但是数据最终纯为string
                change: null, //值改变触发,function
                initDone: null, //下拉菜单整体初始化完成触发,function
                isBlurChange:false,//是否失焦触发改变，默认失焦不触发通过点击搜索按钮触发
                isShowSearchIcon:true,//是否显示搜索按钮
                isShowClearIcon:true,//是否显示清除按钮
                //菜单配置
                menuElement: el, //menu放的位置，默认放在body
                menuAddClass: '', //menu添加class
                menuStyle: {}, //菜单扩展的样式，
                // 如果是只有菜单的情况下，则不设置默认样式，
                // 如果有下拉按钮的情况下，将菜单设置为定位且是不可见状态
                menuListShowWay: 'one', //菜单列表显示形式，如果是one单行就用...,默认为''，显示所有内容
                isArr: false, //默认不是过滤器使用的
                isFirst:true,
                menuNum:"",//菜单搜索显示条数
            }, opts);
            if (!opts.element) return;
            _this.opts = opts;

            _this.value = ''; //存储当前选择的值
            _this.searchData = []; //存储搜索的值

            _this.handlers = {}; //自定义事件存储
            _this.opts.change && _this.on('change', _this.opts.change);
        },
        /*创建html*/
        createHtml: function() {
            var _this = this;
            if (_this.isInput()) {
                _this.wrap = $('<div class="fuzzy-search"></div>');
                _this.opts.element.addClass('fuzzy-search-input').after(_this.wrap);
                _this.opts.element.appendTo(_this.wrap);
            } else {
                _this.opts.element.addClass('fuzzy-search');
                _this.opts.element.html('<input type="text" class="fuzzy-search-input">');
                _this.wrap = _this.opts.element;
            }
            if(_this.opts.isShowSearchIcon){
                _this.wrap.append('<em class="search-icon"></em>');
            }
            if(_this.opts.isShowClearIcon){
                _this.wrap.append('<em class="search-clear"></em>');
            }
            _this.$input = _this.wrap.find('.fuzzy-search-input');
            _this.wrap.addClass(_this.opts.btnAddClass);
            _this.$input.attr({
                'placeholder': _this.opts.placeholder
            });
            _this.cursorFn();
            _this.style(_this.opts.btnStyle, _this.wrap);
            //菜单
            _this.opts.menuElement.addClass(_this.opts.menuAddClass);
            _this.style(_this.opts.menuStyle, _this.opts.menuElement);
        },
        cursorFn: function() {
            var _this = this;
            if (_this.opts.readOnly == true) {
                _this.$input.attr({
                    'readOnly': 'readOnly'
                });
            } else {
                _this.$input.removeAttr('readOnly');
            }
            if (_this.opts.isDisabled == true) {
                _this.$input.attr({
                    'disabled': 'disabled'
                });
            } else {
                _this.$input.removeAttr('disabled');
            }
        },
        /*判断是否是input*/
        isInput: function() {
            var _this = this;
            return _this.tagName(_this.opts.element) == 'input';
        },
        //获取当前元素的标签
        tagName: function(obj) {
            return obj.get(0).nodeName.toLowerCase();
        },
        /*设置当前btn的样式*/
        style: function(style, ele) {
            var _this = this;
            $.each(style, function(i, v) {
                ele.css(i, v);
            });
        },
        /*设置下拉框数据*/
        dataFn: function(parameter) {
            var _this = this;
            _this.dealType('array', parameter, _this.dataToPage, 'setData');
        },
        dataToPage: function(data, _this) {
            _this.opts.menuElement.empty();
            _this.setPos();
            if (data.length > 0) {
               if(!_this.opts.isFirst){
                   if (_this.data) {
                       _this.opts.menuElement.show();
                   }
               }
                _this.opts.isFirst = false;
                var html = '';
                $.each(data, function(i, v) {
                    html += '<li data-' + _this.opts.idFlag + '="' + v[_this.opts.idFlag] + '">' + v[_this.opts.nameFlag] + '</li>'
                });
                _this.opts.menuElement.html(html);
                _this.data = $.extend(true, [], data);
                _this.setPos();
                _this.menuListShowWayFn();
            } else {
                _this.opts.menuElement.hide();
            }
        },
        /*设置menu定位,宽，高*/
        setPos: function() {
            var _this = this;
            var $ele = _this.wrap;
            var $eleMenu = _this.opts.menuElement;
            var top = 0;
            var left = 0;
            var width = 0;
            if ($ele.length > 0) {
                top = $ele.offset().top + $ele.outerHeight() - 1;
                left = $ele.offset().left;
                width = $ele.outerWidth();
                if ((top + $eleMenu.outerHeight() >= $(window).height())) {
                    top = $ele.offset().top - $eleMenu.outerHeight() + 1;
                    if ($eleMenu.hasClass('menu-search')) {
                        $eleMenu.css({
                            'min-height': $eleMenu.css('max-height')
                        })
                    }
                }
                if ((left + $eleMenu.outerWidth() >= $(window).width())) {
                    left = $ele.offset().left + $ele.outerWidth() - $eleMenu.outerWidth();
                }
            }

            !_this.opts.menuStyle.top && ($eleMenu.css({ 'top': top }));
            !_this.opts.menuStyle.left && ($eleMenu.css({ 'left': left }));
            !_this.opts.menuStyle.width && ($eleMenu.css({ 'width': width }));

        },
        /*菜单列表展现形式处理*/
        menuListShowWayFn: function() {
            var _this = this;
            if (_this.opts.menuListShowWay == 'one') { //控制列表的展现形式
                _this.opts.menuElement.find('li').each(function() {
                    $(this).addClass('text-over')
                        .attr('title', $(this).text());
                })
            }
        },
        /*设置值函数*/
        valueFn: function(parameter) {
            var _this = this;
            _this.dealType('string', parameter, _this.setValueToPage, 'setValue');
        },
        setValueToPage: function(value, _this) {
            _this.value = value;
            _this.$input.val(value);
            _this.$input.attr({
                'value': value
            });
            setTimeout(function() {
                _this.fire('change', _this.$input, _this.value);
            }, 0);
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
                }, val);
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
                if (_this.defaultValue == undefined && flag == 'setValue') { //设置默认值,如果没有设置默认值的情况，设置的值则是初始值
                    if (type == 'string') {
                        _this.defaultValue = parameter;
                    } else if (type == 'array') {
                        _this.defaultValue = $.extend(true, [], parameter);
                    } else if (type == 'object') {
                        _this.defaultValue = $.extend(true, {}, parameter);
                    }
                }
                if (_this.initValue == undefined && flag == 'setValue') { //设置初始值
                    if (type == 'string') {
                        _this.initValue = parameter;
                    } else if (type == 'array') {
                        _this.initValue = $.extend(true, [], parameter);
                    } else if (type == 'object') {
                        _this.initValue = $.extend(true, {}, parameter);
                    }
                }
                if (_this.initData == undefined && flag == 'setData') { //设置初始数据
                    if (type == 'string') {
                        _this.initData = parameter;
                    } else if (type == 'array') {
                        _this.initData = $.extend(true, [], parameter);
                    } else if (type == 'object') {
                        _this.initData = $.extend(true, {}, parameter);
                    }
                }
                fn(parameter, _this);
            } else {
                if (_this.defaultValue == undefined && flag == 'setValue') { //设置默认值
                    if (type == 'string') {
                        _this.defaultValue = '';
                    } else if (type == 'array') {
                        _this.defaultValue = [];
                    } else if (type == 'object') {
                        _this.defaultValue = {};
                    }
                }
                if (_this.initValue == undefined && flag == 'setValue') { //没有设置数据，或者数值的数据不对则默认初始值为空
                    if (type == 'string') {
                        _this.initValue = '';
                    } else if (type == 'array') {
                        _this.initValue = [];
                    } else if (type == 'object') {
                        _this.initValue = {};
                    }
                    fn(_this.initValue, _this);
                }
            }
        },
        /* 如果是url,需要发送请求,如果要在本地测试的话，你需要指向一下fiddler，并将html的路径改为线上的路径
         * parameter:传入的请求数据
         * callback:成功之后，执行回调函数
         */
        requestAjaxFn: function(parameter, callback, valInput) {
            var _this = this;
            if (valInput != undefined) { //如果死有搜索框的输入的话，需要将输入框的值传进去
                parameter.data.input = valInput;
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
        /*绑定事件*/
        bindEvent: function() {
            var _this = this;
            _this.$input.on('keydown', function(e) {
                if (e.keyCode == 13 && !_this.opts.setData) {
                    _this.valueFn(_this.$input.val());
                }
            });
            _this.$input.on('blur', function(e) {
                if(_this.opts.isBlurChange==true){
                    if(_this.$input.val()!=_this.value){
                        _this.valueFn(_this.$input.val());
                    }
                }else{
                    _this.value=_this.$input.val()
                }
            });
            //搜索事件
            _this.wrap.on('click', '.search-icon', function() {
                if (!_this.opts.isDisabled && !_this.opts.readOnly) {
                    if(_this.opts.isBlurChange==false){
                        //if(_this.$input.val()!=_this.value){
                            _this.valueFn(_this.$input.val());
                        //}
                    }
                }
            });
            //清空事件并执行所搜
            _this.wrap.on('click', '.search-clear', function() {
                if (!_this.opts.isDisabled && !_this.opts.readOnly) {
                    _this.valueFn('');
                }
            });
            _this.searchEvent();
            _this.menuBindEvent();
            $(window).on('resize', function() {
                _this.setPos();
            });
        },
        searchEvent: function() {
            var _this = this;
            _this.$input.on('input', function(e) {
                var $this = $(this);
                _this.updateMenu($this);
            }).on('focus', function() {
                if($(this).val()!==''){
                    if (_this.opts.setData && _this.data.length > 0) {
                        _this.updateMenu($(this));
                        _this.setPos();
                        _this.opts.menuElement.show();
                    }
                }
                return false;
            }).on('blur', function() {
                _this.opts.menuElement.hide();
                return false;
            }).on("keyup", function(e) {
                var wrap = _this.opts.menuElement; //箭头操作作用域整个菜单列表
                var keyCode = e.keyCode;
                if (keyCode == 38) { //下箭头操d
                    var lis = wrap.find("li:visible");
                    var curli = lis.filter(".seled");
                    var index = curli.length == 0 ? 0 : lis.index(curli);
                    index--;
                    if (index < 0) {
                        index = lis.length - 1;
                    }
                    lis.removeClass("seled");
                    var aimLi = lis.eq(index);
                    aimLi.addClass("seled");
                    aimLi[0].scrollIntoView(false);
                    return false;
                } else if (keyCode == 40) { //上箭头操作
                    var lis = wrap.find("li:visible");
                    var curli = lis.filter(".seled");
                    var index = curli.length == 0 ? 0 : lis.index(curli);
                    index++
                    if (index >= lis.length) {
                        index = 0;
                    }
                    lis.removeClass("seled");
                    var aimLi = lis.eq(index);
                    aimLi.addClass("seled");
                    aimLi[0].scrollIntoView(false);
                    return false;
                } else if (keyCode == 13) { //回车操作
                    var lis = _this.opts.menuElement.find("li");
                    var curli = lis.filter(".seled:visible");
                    curli.trigger("mousedown");
                    lis.find("li").removeClass("seled");
                    if (_this.opts.isAllData) {
                        _this.dataFn(_this.initData);
                    }
                    //_this.selFirst();
                    _this.$input.blur();
                    return false;
                }
            }).on("mousedown", function(evt) {
                evt.stopPropagation();
            });
        },
        updateMenu:function($this){
            var _this=this;
            if (_this.opts.isAllData) { //当setData时获取的是所有数据，则不再向后台发送请求，根据文字内容自行匹配
                var currentData = [];
                var currentMenuData = [];
                $.each(_this.initData, function(i, v) {
                    if ((v.name).indexOf($this.val()) != -1) {
                        currentData.push(v);
                    }
                });

                if(_this.opts.menuNum === ""){
                    _this.dataFn(currentData);
                } else{
                    if(currentData && currentData.length>0){
                        if(currentData.length >= parseInt(_this.opts.menuNum)){
                            for(var i=0;i<parseInt(_this.opts.menuNum);i++){
                                currentMenuData.push(currentData[i]);
                            }
                        } else{
                            for(var i=0;i<currentData.length;i++){
                                currentMenuData.push(currentData[i]);
                            }
                        }

                    }
                    _this.dataFn(currentMenuData);
                }
                // _this.dataFn(currentData);
                _this.selFirst();
            } else {
                if (_this.searchData[$this.val()]) {
                    _this.dataFn(_this.searchData[$this.val()]);
                    _this.selFirst();
                } else {
                    var key = $this.val();
                    setTimeout(function() {
                        if (key == $this.val()) {
                            _this.dealType('array', _this.opts.setData, function(data) {
                                _this.searchData[key] = $.extend(true, [], data);
                                _this.dataFn(data);
                                _this.selFirst();
                            }, 'setData', key);
                        }
                    }, 200)
                }
            }
        },
        /*选中第一个*/
        selFirst: function() {
            var _this = this;
            if (_this.opts.menuElement.find(".seled").length == 0) {
                _this.opts.menuElement.find("li:eq(0)").addClass("seled");
            }
        },
        menuBindEvent: function() {
            var _this = this;
            _this.opts.menuElement.on('mousedown', 'li', function() {
                _this.opts.menuElement.find('li').removeClass('seled');
                $(this).addClass('seled');
                _this.valueFn($(this).text());
                _this.opts.menuElement.hide();
            });
        },
        /*-----------------------自定义方法---------------*/
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
        /* ------------------------- 对外的方法----------------- */
        /**
         * @description 设置数据方法
         * @param {array|object|function} parameter - 传入的参数
         * @example
         * var fuzzySearch = new FuzzySearch({配置参数});
         * 设置值方法1：
         *      fuzzySearch.setData({
         *          id:'1',
         *          name:'啦啦啦'
         *      });
         * 设置值方法2：
         *      fuzzySearch.setData([{
         *          id:'1',
         *          name:'啦啦啦'
         *      },{
         *          id:'2',
         *          name:'啦啦啦22'
         *      }]);
         * 设置值方法3：
         *      fuzzySearch.setData(function(callback){
         *           callback({
         *              id:'1',
         *              name:'啦啦啦'
         *           });//必须要执行callback
         *      });
         * 设置值方法4：
         *      fuzzySearch.setData(function(callback){
         *           callback([{
         *              id:'1',
         *              name:'啦啦啦'
         *           }]);//必须要执行callback
         *      });
         * 设置值方法5：
         *      fuzzySearch.setData({
         *           url:'',//请求
         *           data:{},//数据
         *           timeout:'0',//超时时间
         *           field:''//取值的字段
         *      });
         */
        setData: function(parameter) {
            var _this = this;
            _this.dataFn(parameter); //数据处理
        },
        /**
         * @description 设置值方法
         * @param {string|array|object|function} parameter - 传入的参数
         * @example
         * var fuzzySearch = new FuzzySearch({配置参数});
         * 设置值方法1：
         *      fuzzySearch.setValue({
         *          id:'1',
         *          name:'啦啦啦'
         *      });
         * 设置值方法2：
         *      fuzzySearch.setValue([{//单选的数组长度不能大于1
         *          id:'1',
         *          name:'啦啦啦'
         *      }]);
         * 设置值方法3：
         *      fuzzySearch.setValue(function(callback){
         *           callback({
         *              id:'1',
         *              name:'啦啦啦'
         *           });//必须要执行callback
         *      });
         * 设置值方法4：
         *      fuzzySearch.setValue(function(callback){
         *           callback([{//单选的数组长度不能大于1
         *              id:'1',
         *              name:'啦啦啦'
         *           }]);//必须要执行callback
         *      });
         * 设置值方法5：
         *      fuzzySearch.setValue({
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
        /*设置默认值*/
        setDefaultValue: function(parameter) {
            var _this = this;
            _this.dealType('string', parameter, function(data) {
                _this.defaultValue = data;
                _this.valueFn(_this.defaultValue); //值处理
            });
        },
        /**
         * @description 获取值
         * @param {requestCallback} [callback] -回调函数
         * @return {String} 当前的数据
         * @example
         * var fuzzySearch = new FuzzySearch({配置参数});
         * 获取值方法1：
         *      fuzzySearch.getValue(function(value){
         *          //value则为当前值
         *      });//返回值为回调函数执行结果
         * 获取值方法2：
         *      fuzzySearch.getValue();//返回值为当前数据
         */
        getValue: function(callback) {
            var _this = this;
            if (!callback) { //如果一个参数都没有，则直接返回数据
                return $.trim(_this.value);
            } else {
                return callback($.trim(_this.value));
            }
        },
        /**
         * @description 触发改变
         * @param {requestCallback} callback -回调函数
         * @example
         * var fuzzySearch = new FuzzySearch({配置参数});
         * fuzzySearch.change(function(value){
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
         * var fuzzySearch = new FuzzySearch({配置参数});
         * fuzzySearch.reset();
         */
        reset: function() {
            var _this = this;
            _this.valueFn(_this.initValue);
        },
        /**
         * @description 清除
         * @example
         * var fuzzySearch = new FuzzySearch({配置参数});
         * fuzzySearch.clear();
         */
        clear: function() {
            var _this = this;
            _this.valueFn('');
        },
        /**
         * @description 摧毁:默认只摧毁菜单
         * @param {boolean} [all] -all为布尔值，如果入true就连按钮一起摧毁
         * @example
         * var fuzzySearch = new FuzzySearch({配置参数});
         * fuzzySearch.destroy();
         */
        destroy: function(all) {
            var _this = this;
            _this.handlers={};//把自定义事件清掉
            all && _this.wrap.remove();
            _this.opts.menuElement.remove();
        },
        /**
         * @description 显示
         * @param {boolean} all -all存在就代表显示按钮和菜单，否则只显示菜单。
         * @example
         * var fuzzySearch = new FuzzySearch({配置参数});
         * fuzzySearch.show();
         */
        show: function(all) {
            var _this = this;
            all && _this.wrap.show();
            _this.opts.menuElement.show();
        },
        /**
         * @description 隐藏
         * @param {boolean} all -all存在就代表隐藏按钮和菜单，否则只隐藏菜单
         * @example
         * var fuzzySearch = new FuzzySearch({配置参数});
         * fuzzySearch.hide();
         */
        hide: function(all) {
            var _this = this;
            all && _this.wrap.hide();
            _this.opts.menuElement.hide();
        },
        /**
         * @description 禁用
         * @example
         * var fuzzySearch = new FuzzySearch({配置参数});
         * fuzzySearch.disable();
         */
        disable: function() {
            var _this = this;
            _this.opts.isDisabled = true;
            _this.opts.readOnly = true;
            _this.cursorFn();
        },
        /**
         * @description 启用
         * @example
         * var fuzzySearch = new FuzzySearch({配置参数});
         * fuzzySearch.enable();
         */
        enable: function() {
            var _this = this;
            _this.opts.isDisabled = false;
            _this.opts.readOnly = false;
            _this.cursorFn();
        },
    }
    return FuzzySearch;
});