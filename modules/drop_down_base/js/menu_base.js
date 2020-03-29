/**
 * @author kt
 * @description 下拉框组件菜单的基础文件
 * @date 2017-03-20
 */
require.config({
    paths: {
        'cssFile': 'modules/libs/rq/css.min'
    }
});
define([
    'modules/utils/extend',
    'modules/utils/data_type',
    'modules/utils/unique',
    'cssFile!modules/drop_down_base/css/menu_base'
], function(Class, dataType, unique) {
    var Common = {
        /*执行*/
        execute: function(opts) {
            var _this = this;
            _this.optsSet(opts);
            _this.createHtml();
            _this.opts.initDone && _this.opts.initDone.call(_this.$element); //表单元素初始化完成之后执行，并将this指向当前的下拉框元素
            _this.style();
            _this.opts.setData && _this.dataFn(_this.opts.setData);
            _this.valueFn(_this.opts.setValue); //这里不管是否有设置value都应该走一次，因为过滤器是需要的
            _this.bindEvent();
        },
        /*参数设置*/
        optsSet: function(opts) {
            var _this = this;
            if (!opts) opts = {};
            var el = $('<div>');
            if (!opts.menuElement) { //不存在则自动创建一个div放入body中
                $('body').append(el);
            }
            opts = $.extend(true, {
                type: '', //menu的类型
                menuElement: el, //menu放的位置，默认放在body
                menuAddClass: '', //菜单添加class
                menuStyle: {}, //menu的相关样式
                menuListShowWay: '', //菜单列表显示形式，如果是one单行显示，超出则显示...；默认为''，显示所有内容，超出一行则换行展示
                idFlag: 'id', //数据的key值
                nameFlag: 'name', //数据的key值
                defaultValue: null, //设置默认值，和这里的setValue得到的数据是一致的
                setValue: null, //设置值，//这里以后的设计的时候最好为value,setValue是方法
                setData: null, //设置menu填充的数据，//这里以后的设计的时候最好为data,setData是方法
                initDone: null, //初始化完成时执行
                change: null, //数据改变的时候触发
                //单选，单选搜索
                isRequired: false, //是否必填，如果不是必填，则选中之后可以取消选中，如果是必填，则只能修改选中项，不能取消
                //搜索
                isAllData: false, //搜索下拉框的数据是否一次获取的是全部数据，默认一次拿到的不是所有数据
                isSearch: true, //搜索下拉框是否有搜索,默认是有的
                searchPlaceholder: '', //搜索下拉框中的搜索框提示文字
                searchDefaultField: '', //搜索下拉框中标识文字
                //多选
                isSelectAll: false, //是否有全部选项，用于多选
                //内部使用
                isArr: false, //默认不是过滤器使用的
                isConsole: false, //是否打印日志
                menuClass: 'dropdown-menu' //menu的class，只是方便以后修改
            }, opts);
            _this.opts = opts;

            _this.data = []; //数据的存储
            //_this.initData=[];//初始的所有数据，如果获取到的是所有的值，不必要向后台发请求，从初始数据中匹配

            _this.value = []; //存储选中的值
            //_this.initValue=[];//初始选中的数据,用于重置的
            //_this.defaultValue=[];//设置默认值，用于部分还原

            _this.searchData = []; //存储搜索的值

            _this.$element = _this.opts.menuElement; //菜单元素

            _this.handlers = {}; //存储自定义事件:必须写在上面，写在下面会把别人的也存储起来的
            _this.opts.change && _this.on('change', _this.opts.change); //把change事件放入到handlers中
        },
        /*创建html*/
        createHtml: function() {
            var _this = this;
            _this.wrapHtml();
        },
        /*设置当前menu的样式*/
        style: function() {
            var _this = this;
            _this.opts.menuStyle && _this.$element.css(_this.opts.menuStyle);
        },
        /*数据处理*/
        dataFn: function(parameter) {
            var _this = this;
            _this.dealType('array', parameter, _this.dataToPage, 'setData');
            _this.menuListShowWayFn();
        },
        dataToPage: function(data, _this) {
            _this.data = $.extend(true, [], data);
            _this.dataHtml(data, _this);
            _this.value && _this.valueHtml();
        },
        dataHtml: function(data, _this) {
            var liHtml = (data.length > 0 && !!_this.opts.isSelectAll && _this.opts.type == 'multiple') ?
                '<li class="select-all">全选</li>' : //多选下拉框如果有数据的情况下并且设置了全选的情况
                '';
            $.each(data, function(i, v) {
                liHtml += '<li data-' + _this.opts.idFlag + '="' + v[_this.opts.idFlag] + '" ' + (v.hide ? 'style="display:none;"' : '') + '>' + v[_this.opts.nameFlag] + '</li>';
            });
            //            if(liHtml.length==0){
            //                liHtml='<li style="text-align: center;">暂无数据</li>';
            //            }
            _this.$element.find('ul').html(liHtml);
        },
        /*值处理*/
        valueFn: function(parameter) {
            var _this = this;
            _this.dealType('array', parameter, _this.valueToPage, 'setValue');
        },
        valueToPageFn: function(condition, value, _this) {
            if (condition) { //数据是符合条件的
                if (_this.opts.isArr || (!_this.opts.isArr && JSON.stringify(_this.value) != JSON.stringify(value))) { //如果是过滤器组件调用的任何情况||不是过滤器组件调用并且值不相等的情况下
                    _this.value = $.extend(true, [], value); //不需要去数据里面查找，直接赋值，因为可能数据里面没有当前的值
                    _this.valueHtml();
                    setTimeout(function() {
                        _this.fire('change', _this.$element, _this.value); //值改变之后触发
                    }, 0);
                } else { //针对数据比较慢的情况下需要再一次去选中值
                    _this.valueHtml();
                }
            } else {
                console.log('数据是错误的，请检查');
            }
        },
        /*菜单列表展现形式处理*/
        menuListShowWayFn: function() {
            var _this = this;
            if (_this.opts.menuListShowWay == 'one') { //控制列表的展现形式
                _this.$element.find('li').each(function(){
                    var $this=$(this);
                    $this.addClass('text-over').attr('title', $this.text());
                });
            }
        },


        /* ----------------调用的通用的方法------------------ */
        /*没有搜索框-创建公共的外框html
         * priClass下拉框私有的class,方便以后修改样式
         */
        noSearchCommonWrapHtml: function(priClass) {
            var _this = this;
            _this.menuHtml = $('<ul></ul>');
            _this.$element.addClass(_this.opts.menuClass + ' ' + priClass + ' ' + _this.opts.menuAddClass).html(_this.menuHtml);
        },
        /*没有搜索框-填充已选值*/
        noSearchCommonValueHtml: function(condition) {
            var _this = this;
            if (condition) {
                _this.$element.find('li').removeClass('active');
                /*内容*/
                var num = 0;
                _this.$element.find('ul li').each(function() {
                    var $li = $(this);
                    $.each(_this.value, function(i, v) {
                        if ($li.attr('data-' + _this.opts.idFlag) == v[_this.opts.idFlag]) {
                            $li.addClass('active');
                            num++;
                        }
                    });
                })
                if (num == _this.$element.find('ul li:not(.select-all)').length && _this.opts.isSelectAll) {
                    _this.$element.find('ul li.select-all').addClass('active');
                } else {
                    _this.$element.find('ul li.select-all').removeClass('active');
                }
            } else {
                _this.value = [];
                console.log('数据出错，请检查');
            }
        },
        /*有搜索框-创建公共的外框html*/
        searchCommonWrapHtml: function(priClass) {
            var _this = this;
            var search = '';
            if (_this.opts.isSearch == 'true' || (_this.opts.isSearch == true)) {
                search = '<div class="search-input-box"><input type="text" placeholder=' + _this.opts.searchPlaceholder + '></div>';
            }
            _this.menuHtml =
                $(search +
                    '<div class="menu-search-select">' +
                    '<div class="fe-menu-title"><span>已选择' + (_this.opts.searchDefaultField || '') + '</span></div>' +
                    '<ol></ol>' +
                    '</div>' +
                    '<div class="menu-search-all">' +
                    '<div class="fe-menu-title"><span>可选择' + (_this.opts.searchDefaultField || '') + '</span></div>' +
                    '<ul></ul>' +
                    '</div>');
            _this.$element.addClass(_this.opts.menuClass + ' menu-search ' + priClass + ' ' + _this.opts.menuAddClass).html(_this.menuHtml);
            _this.olCon = _this.$element.find('ol');
            _this.ulCon = _this.$element.find('ul');
        },
        /*有搜索框-所选的当前值填充到可选区域*/
        searchCommonValueHtml: function(condition) {
            var _this = this;
            if (condition) {
                var iconClass = '';
                if (_this.opts.isRequired) {
                    iconClass = "no-icon-menu"
                }
                var liHtml = '';
                $.each(_this.value, function(i, v) {
                    liHtml += '<li data-' + _this.opts.idFlag + '="' + v[_this.opts.idFlag] + '" class="' + iconClass + '">' + v[_this.opts.nameFlag] + '</li>';
                });
                _this.olCon.html(liHtml);
                _this.dataHtmlExcludeValueHtml();
            } else {
                _this.value = [];
                console.log('数据不正确,请检查数据');
            }
        },
        /*获取到的所有数据除去已经选择的数据对可选区域进行填充*/
        dataHtmlExcludeValueHtml: function() {
            var _this = this;
            var data = unique.oneExistInTwo({
                arrOne: _this.data,
                arrTwo: _this.value,
                uniqueFlag: _this.opts.idFlag
            });
            _this.dataHtml(data, _this);
        },
        /*选中第一个*/
        selFirst: function() {
            var _this = this;
            if (_this.ulCon.find('li').length == 0) {
                if (_this.$element.find(".seled").length == 0) {
                    _this.$element.find("li:eq(0)").addClass("seled");
                }
            } else {
                _this.$element.find('.seled').removeClass('seled');
                if (_this.ulCon.find(".seled").length == 0) {
                    _this.ulCon.find("li:eq(0)").addClass("seled");
                }
            }
        },
        /*多选的输入框搜索事件*/
        searchCommonInputEvent: function() {
            var _this = this;
            /*输入框事件*/
            if (_this.opts.isSearch == 'true' || _this.opts.isSearch == true) {
                //下拉里的输入框点击事件
                _this.$element.find('.search-input-box input').on('input', function(e) {
                    _this.updateMenu($(this));
                }).on('focus', function() {
                    _this.updateMenu($(this));
                    _this.selFirst();
                    return false;
                }).on('blur', function() {
                    _this.$element.find("li").removeClass("seled");
                    return false;
                }).on("keyup", function(e) {
                    var wrap = _this.$element; //箭头操作作用域整个菜单列表
                    if (_this.opts.type == 'singleSearch' && _this.opts.isRequired) { //如果是单选搜索并且是必填的情况下，则已选区域是不能操作的
                        wrap = _this.ulCon;
                    }
                    var keyCode = e.keyCode;
                    if (keyCode == 38) { //下箭头操d
                        var lis = wrap.find("li:visible");
                        var curli = lis.filter(".seled");
                        var index = curli.length == 0 ? 0 : lis.index(curli);
                        index--
                        if (index < 0) {
                            index = lis.length - 1;
                        }
                        lis.removeClass("seled");
                        var aimLi = lis.eq(index);
                        aimLi.addClass("seled");
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
                        return false;
                    } else if (keyCode == 13) { //回车操作
                        var lis = _this.$element.find("li");
                        var curli = lis.filter(".seled:visible");
                        curli.trigger("click");
                        _this.$element.find("li").removeClass("seled");
                        if (_this.opts.isAllData) {
                            _this.data = $.extend(true, [], _this.initData);
                            _this.dataHtmlExcludeValueHtml();
                        }
                        _this.selFirst();
                        return false;
                    }
                }).on("mousedown", function(evt) {
                    evt.stopPropagation();
                });
            }
        },
        updateMenu: function($this) {
            var _this = this;
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
                    setTimeout(function() { //这个定时器是为了防止频繁输入
                        if (key == $this.val()) {
                            _this.dealType('array', _this.opts.setData, function(data) {
                                _this.searchData[key] = $.extend(true, [], data);
                                _this.data = $.extend(true, [], data);
                                _this.dataHtmlExcludeValueHtml();
                                _this.selFirst();
                            }, '', key);
                        }
                    }, 200);
                }
            }
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
                var typeToData = {
                    'string': parameter,
                    'array': $.extend(true, [], parameter),
                    'object': $.extend(true, {}, parameter)
                }
                if (flag == 'setData') { //设置初始数据
                    _this.initData = typeToData[type];
                }
                if (_this.defaultValue == undefined && flag == 'setValue') { //设置默认值,如果没有设置默认值的情况，设置的值则是初始值
                    _this.defaultValue = typeToData[type];
                }
                if (_this.initValue == undefined && flag == 'setValue') { //没有设置数据，或者数值的数据不对则默认初始值为空
                    _this.initValue = typeToData[type];
                }
                fn(parameter, _this);
            } else {
                var typeToData = {
                    'string': '',
                    'array': [],
                    'object': {}
                }
                if (_this.defaultValue == undefined && flag == 'setValue') { //设置默认值,如果没有设置默认值的情况，设置的值则是初始值
                    _this.defaultValue = typeToData[type];
                }
                if (_this.initValue == undefined && flag == 'setValue') { //没有设置数据，或者数值的数据不对则默认初始值为空
                    _this.initValue = typeToData[type];
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
        /*---------------对外的方法----------------- */
        /*设置数据*/
        setData: function(parameter) {
            var _this = this;
            _this.searchData = [];
            _this.opts.setData = parameter; //如果设置数据应该吧参数同步，这样模糊搜索的时候才能够执行
            _this.dataFn(parameter); //数据处理
        },
        /*设置值,parameter传进来的参数*/
        setValue: function(parameter) {
            var _this = this;
            _this.valueFn(parameter); //值处理
        },
        /*设置默认值*/
        setDefaultValue: function(parameter) {
            var _this = this;
            if (parameter) {
                _this.dealType('array', parameter, function(data) {
                    _this.defaultValue = $.extend(true, [], data);
                    _this.valueFn(_this.defaultValue); //值处理
                });
            } else {
                _this.valueFn(_this.defaultValue);
            }
        },
        /*获取值方法
         *  callback
         *   如果存在，则在回调函数的参数里有三个值，当前数据，当前数据的id集合，当前数据的Name集合
         *   如果不存在，则返回当前数据
         * */
        getValue: function(callback, isTemplate) {
            var _this = this;
            var result = '';
            result = _this.value.length == 0 ? '' : _this.value;
            if (isTemplate) {
                result = _this.getValueResult ? _this.getValueResult() : result;
            }
            if (!callback) { //如果一个参数都没有，则直接返回数据
                return result;
            } else {
                callback && callback(result,
                    _this.resultData(_this.opts.idFlag),
                    _this.resultData(_this.opts.nameFlag));
            }
        },
        /* 获取数据ID的集合 */
        getValueId: function() {
            var _this = this;
            return _this.resultData(_this.opts.idFlag);
        },
        /* 获取数据Name的集合 */
        getValueName: function() {
            var _this = this;
            return _this.resultData(_this.opts.nameFlag);
        },
        resultData: function(falg) {
            var _this = this;
            var result = [];
            $.each(_this.value, function(i, v) {
                result.push(v[(falg)]);
            })
            return result.join(',');
        },
        /*重置表单字段*/
        reset: function() {
            var _this = this;
            _this.valueFn(_this.initValue);
        },
        /*清除表单字段*/
        clear: function() {
            var _this = this;
            _this.valueFn([]);
        },
        /*摧毁字段*/
        destroy: function() {
            var _this = this;
            _this.handlers = {}; //把自定义事件清掉
            _this.$element.remove();
        },
        /*隐藏字段*/
        hide: function() {
            var _this = this;
            _this.$element.hide();
        },
        /*显示字段*/
        show: function() {
            var _this = this;
            _this.$element.show();
        },
        /*change*/
        change: function(callback) {
            var _this = this;
            callback && _this.on('change', callback);
        },
        /*是否必填
         * isRequired单选才有的属性，如果是单选和单选模糊点击事件会有所变化
         * */
        required: function(isRequired) {
            var _this = this;
            _this.opts.isRequired = isRequired;
            _this.cursorFn(_this);
        },
        cursorFn: function(_this) {
            if (_this.opts.isRequired) {
                _this.menuHtml.find('ol li').css({
                    'cursor': 'text'
                });
            } else {
                _this.menuHtml.find('ol li').css({
                    'cursor': 'pointer'
                });
            }
        }
    };
    var Base = Class.extend(Common);
    return Base;
});