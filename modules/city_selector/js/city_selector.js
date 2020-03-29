/**
 * @name city_selector
 * @description city_selector 城市选择器
 * @author kt
 * @since 2017-12-8
 */
require.config({
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min',
        'cssFile': 'modules/libs/rq/css.min'
    }
});
define([
    'jquery',
    'modules/tab/js/tab', //切换
    'modules/utils/data_type', //数据判断
    'modules/utils/menu_pop_manager', //菜单管理器
    'cssFile!modules/city_selector/css/city_selector' //城市选择器样式
], function ($, Tab, dataType, menuPopManager) {
    /**
     * @class
     * @classdesc 城市选择器
     * @alias citySelector
     * @author kt
     * @since 2017-12-8
     *
     * @param {(function|object|string)} [opts.data=null] - 设置数据，整体数据，拆分成数据cityData,cityLetterData,hotCityData
     * @param {string} [opts.idFlag= 'id'] -标识字段
     * @param {string} [opts.nameFlag= 'name'] -名字字段
     * @param {string} [opts.pinyinFlag= 'pinyin'] -拼音字段
     * @param {string} [opts.letterFlag= "letter"] -大写字母字段
     * @param {string} [opts. hotFlag= "hot"] -热门城市标识
     * @param {boolean} [opts.isOwnData= false] -是否是自己的数据，在文件里有一个默认的城市数据
     * @param {boolean} [opts.whole= false] -false为市级数据，true为市县级数据，显示市县级数据还是只显示市级数据，如果开启这个，需引入的数据源是city_data.js数据源才可以。
     * @param {boolean} [opts.shorthand= false] -是否使用简称，默认不使用
     * @param {boolean} [opts.multiSelect= false] -是否多选，默认是单选
     * @param {string} [opts.multiMaximum= ''] -最多可以选多少个//todo,这个还没处理完
     * @param {(function|object|string)} [opts.value= null] -值，已经选中的值
     * @param {boolean} [opts.required=true] -是否是必填
     * @param {boolean} [opts.disabled= false] -按钮是否可点击
     * @param {boolean} [opts.readOnly= false] -按钮是否是只读状态
     * @param {function} [opts.change= null] -值改变触发
     * @param {function} [opts.initDone= null] -初始化完成触发
     * @param {string} opts.element='' -创建城市选择器的元素
     * @param {string} [opts.placeholder= '请选择城市'] -默认提示语
     * @param {boolean} [opts.isSearch= true] -是否有搜索功能//todo,这个还没处理
     * @param {string} [opts.searchPlaceholder= '请输入关键字'] -输入框提示文字
     * @param {object} [opts.btnStyle= {}] -按钮样式
     * @param {string} [opts.btnClass= ''] -按钮的class
     * @param {boolean} [opts.isIcon= true] -是否显示图标
     * @param {boolean} [opts.isCenter= true] -是否居中
     * @param {dom} [opts.menuElement= $('body')] -菜单容器放置位置
     * @param {array} [opts.menuHeadData= ['热门城市', 'AB', 'CD', 'EFG', 'H', 'J', 'KL', 'MNP', 'QR', 'S', 'T', 'W', 'X', 'Y', 'Z']]-菜单头部展示数据
     * @param {object} [opts.menuStyle= {'position': 'absolute','display': 'none'}] -菜单样式
     * @param {string} [opts.menuClass= ''] -菜单class
     * @param {object} [opts.listStyle= {'position': 'absolute','display': 'none'}] -列表样式
     * @param {string} [opts.listClass= ""] -列表class
     * @requires 'jquery'
     * @requires 'require'
     */
    function CitySelector(opts) {
        this.init(opts);
    }

    CitySelector.prototype = {
        /*初始化*/
        init: function (opts) {
            var _this = this;
            _this.ele = { //存储当前的dom
                $cityBtn: '', //城市已选显示区域和搜索区域
                $cityMenu: '', //没有搜索时的城市下拉菜单
                $cityList: ''//搜索时的城市下拉列表
            };
            _this.data = []; //数据
            _this.value = []; //已选择的数据
            _this.parameterSetting(opts); //参数设置
            _this.createCitySelector(); //创建城市选择器布局
            _this.styleSetting(); //样式设置
            _this.elementSetting(); //元素设置
            _this.statusSetting(); //状态设置
            _this.opts.initDone && _this.opts.initDone.call(_this.ele.$cityBtn);
            _this.dataFn(_this.opts.data); //设置数据
            _this.valueFn(_this.opts.value); //设置值
            _this.bindEvent(); //绑定事件
        },
        /*参数设置*/
        parameterSetting: function (opts) {
            var _this = this;
            if (!opts) opts = {};
            opts = $.extend(true, {
                //数据处理
                data: '', //整体数据，拆分成数据cityData,cityLetterData,hotCityData
                //cityData:'',//城市数据
                //cityLetterData:'',//根据字母的城市数据
                //hotCityData:'',//热门城市，取前18条数据
                idFlag: 'id', //标识字段
                nameFlag: 'name', //名字字段
                pinyinFlag: 'pinyin', //拼音字段
                letterFlag: "letter", //大写字母字段
                hotFlag: "hot", //热门城市标识
                //common
                isOwnData: false, //是否是自己的数据
                whole: false, //false为市级数据，true为市县级数据，显示市县级数据还是只显示市级数据，如果开启这个，需引入的数据源是city_data.js数据源才可以。
                shorthand: false, //是否使用简称，默认不使用
                multiSelect: false, //是否多选，默认是单选
                multiMaximum: '', //最多可以选多少个//todo,这个还没处理完
                value: null, //值
                required: true, //是否是必填
                disabled: false, //按钮是否可点击
                readOnly: false, //按钮是否是只读状态
                change: null, //值改变触发
                initDone: null, //初始化完成触发
                //btn
                element: '', //创建城市选择器的元素
                placeholder: '请选择城市', //默认提示语
                isSearch: true, //是否有搜索功能//todo,这个还没处理
                searchPlaceholder: '请输入关键字', //输入框提示文字
                btnStyle: {},
                btnClass: '',
                isIcon: true, //是否显示图标
                isCenter: true, //是否居中
                //menu
                menuElement: $('body'), //菜单容器放置位置
                menuHeadData: opts.menuHeadData || ['热门城市', 'AB', 'CD', 'EFG', 'H', 'J', 'KL', 'MNP', 'QR', 'S', 'T', 'W', 'X', 'Y', 'Z'], //菜单头部展示数据
                menuStyle: {
                    'position': 'absolute',
                    'display': 'none'
                },
                menuClass: '',
                //list
                listStyle: {
                    'position': 'absolute',
                    'display': 'none'
                },
                listClass: ''
            }, opts);
            _this.opts = opts;
            _this.handlers = {}; //存储自定义事件:必须写在上面，写在下面会把别人的也存储起来的
            _this.opts.change && _this.on('change', _this.opts.change); //把change事件放入到handlers中
        },

        /*创建城市选择器的布局*/
        createCitySelector: function () {
            var _this = this;
            _this.createCityBtn(); //城市已选显示区域和搜索区域
            _this.createCityMenu(); //没有搜索时的城市下拉菜单
            _this.createCityList(); //搜索时的城市下拉列表
        },
        /*城市已选显示区域和搜索区域*/
        createCityBtn: function () {
            var _this = this;
            //已经选中的城市
            _this.ele.$selected = $('<ol class="city-selected-list"></ol>');
            //输入框
            _this.ele.$input = $('<input type="text" class="city-search-input" placeholder="' + _this.opts.placeholder + '">');
            _this.opts.element.addClass("city-selector-btn " + _this.opts.btnClass);
            _this.opts.element.append(_this.ele.$selected);
            _this.opts.element.append(_this.ele.$input);
            _this.ele.$cityBtn = _this.opts.element;
            //搜索图标
            if (_this.opts.isIcon) {
                _this.ele.$cityBtn.addClass('triangle triangle-down');
            }
        },
        /*创建没有搜索时的城市下拉菜单*/
        createCityMenu: function () {
            var _this = this;
            _this.ele.$cityMenu = $('<div class="city-selector-menu ' + _this.opts.menuClass + '"></div>');
            //菜单头部
            _this.ele.$cityMenuHeader = $('<div class="csm-header"></div>');
            _this.ele.$cityMenu.append(_this.ele.$cityMenuHeader);
            //菜单内容
            _this.ele.$cityMenuContent = $('<div class="csm-content"></div>');
            _this.ele.$cityMenu.append(_this.ele.$cityMenuContent);
            //菜单底部
            _this.ele.$cityMenuFooter = '';
            if (_this.opts.multiSelect) {
                _this.ele.$cityMenuFooter = $('<div class="csm-footer">' +
                        '<div class="csm-footer-l">*可以直接搜索查找城市（支持名称、拼音模糊搜索）</div>' +
                        '<div class="csm-footer-r">' +
                        (_this.opts.multiMaximum ? '<p class="csm-footer-num"><span>0</span><span>/</span><span>' + _this.opts.multiMaximum + '</span></p>' : '') +
                        '<a href="javascript:;">清空</a>' +
                        '</div>' +
                        '</div>');
            }
            _this.ele.$cityMenu.append(_this.ele.$cityMenuFooter);
            _this.opts.menuElement.append(_this.ele.$cityMenu);
        },
        /*创建搜索时的城市下拉列表*/
        createCityList: function () {
            var _this = this;
            _this.ele.$cityList = $('<ul class="city-selector-list ' + _this.opts.listClass + '"></ul>');
            _this.opts.menuElement.append(_this.ele.$cityList);
        },

        /*样式设置*/
        styleSetting: function () {
            var _this = this;
            _this.opts.btnStyle && _this.ele.$cityBtn.css(_this.opts.btnStyle);
            _this.opts.menuStyle && _this.ele.$cityMenu.css(_this.opts.menuStyle);
            _this.opts.listStyle && _this.ele.$cityList.css(_this.opts.listStyle);
        },
        /*元素设置*/
        elementSetting: function () {
            var _this = this;
            //菜单
            _this.ele.$cityNum = _this.ele.$cityMenu.find('.csm-footer-num span').eq(0); //已选城市个数
            _this.ele.$cityEmptyBtn = _this.ele.$cityMenu.find('.csm-footer a').eq(0); //清空按钮
        },
        /*状态设置*/
        statusSetting: function () {
            var _this = this;
            //禁用
            if (_this.opts.disable) {
                _this.ele.$cityBtn.css({
                    'cursor': 'no-drop'
                });
                _this.ele.$input.css({
                    'cursor': 'no-drop'
                });
                return false;
            } else if (_this.opts.readOnly) {
                //只读
                _this.ele.$cityBtn.css({
                    'cursor': 'default'
                });
                _this.ele.$input.css({
                    'cursor': 'default'
                });
                return false;
            }
            //既不禁用也不只读
            if (!_this.opts.readOnly && !_this.opts.disable) {
                _this.ele.$cityBtn.css({
                    'cursor': 'pointer'
                });
                _this.ele.$input.css({
                    'cursor': 'text'
                });
            }
        },

        /*数据处理*/
        dataFn: function (parameter) {
            var _this = this;
            //如果有自己设置的数据则取自己设置的数据
            if (parameter) {
                _this.dealType('array', parameter, _this.dataToPage, 'setData');
            }
        },
        /*处理数据的类型
         * type,希望最终的类型
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
        dealType: function (type, parameter, fn, flag, valInput) {
            var _this = this;
            //这里把||''去掉了，因为下面的请求会存在判断undefined的情况
            var val = valInput;
            //如果传进来的数据是function，将回调函数里的数据取出来
            if (dataType(parameter) == 'function') {
                //这里为什么要return呢，我把它删掉了，执行函数，并将this指向_this,取出数据
                parameter.call(_this, function (data) {
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
            var typeToData = '';
            //匹配到想要的数据
            if (dataType(parameter) == type) {
                typeToData = {
                    'string': parameter,
                    'array': $.extend(true, [], parameter),
                    'object': $.extend(true, {}, parameter)
                }
                //设置初始数据
                if (_this.initData == undefined && flag == 'setData') {
                    _this.initData = typeToData[type];
                }
                //设置默认值,如果没有设置默认值的情况，设置的值则是初始值
                if (_this.defaultValue == undefined && flag == 'setValue') {
                    _this.defaultValue = typeToData[type];
                }
                //没有设置数据，或者数值的数据不对则默认初始值为空
                if (_this.initValue == undefined && flag == 'setValue') {
                    _this.initValue = typeToData[type];
                }
                fn(parameter, _this);//执行后续操作
            } else {
                //无可匹配数据，给你个空值，避免报错
                typeToData = {
                    'string': '',
                    'array': [],
                    'object': {}
                }
                //设置默认值,如果没有设置默认值的情况，设置的值则是初始值
                if (_this.defaultValue == undefined && flag == 'setValue') {
                    _this.defaultValue = typeToData[type];
                }
                //没有设置数据，或者数值的数据不对则默认初始值为空
                if (_this.initValue == undefined && flag == 'setValue') {
                    _this.initValue = typeToData[type];
                    //当第一次进来且没有数据的情况下需要执行一次
                    fn(_this.initValue, _this);
                }
            }
        },
        /* 如果是url,需要发送请求,如果要在本地测试的话，你需要指向一下fiddler，并将html的路径改为线上的路径
         * parameter:传入的请求数据
         * callback:成功之后，执行回调函数
         */
        requestAjaxFn: function (parameter, callback, valInput) {
            var _this = this;
            if (valInput) { //如果是有搜索框的输入的话，需要将输入框的值传进去
                parameter.data.input = valInput || '';
            }
            $.ajax({
                url: parameter.url || '',
                dataType: 'json',
                data: parameter.data || {},
                timeout: parameter.timeout || '0', //代表永不超时
                success: function (data) {
                    if (data && data != null) {
                        $.each(parameter.field.split('.'), function (i, v) {
                            data = data[v];
                        });
                        callback(data);
                    } else {
                        console.log('数据出错了');
                    }
                },
                error: function () {
                    console.log('请求失败了');
                }
            });
        },
        /*数据到页面处理*/
        dataToPage: function (data, _this) {
            _this.dataSetting(data);
            _this.dataPage(data);
        },
        dataSetting: function (data) {
            var _this = this;
            //默认数据
            _this.default = {
                provinceData: [],//省份数据
                municipalData: [],//市级数据
                municipalAndDistrictData: [],//区县数据+市级数据
                cityData: '',//存储最终获取的城市数据
                cityLetterData: {},//存储城市通过首字母分类
                hotCityData: []//热门城市
            };
            //1.走本地默认数据
            if (_this.opts.isOwnData) {
                //获取省份和非省份数据
                $.each(data, function (i, v) {
                    if (v.parentId == '100000') {
                        _this.default.provinceData.push(v);
                    } else {
                        _this.default.municipalAndDistrictData.push(v);
                    }
                });
                // 根据省份，查找出所有的城市
                $.each(_this.default.provinceData, function (i, v) {
                    $.each(data, function (key, value) {
                        if (v[_this.opts.idFlag] === value.parentId) {
                            _this.default.municipalData.push(value);
                        }
                    });
                });
                //根据设置得到城市数据
                _this.default.cityData = (_this.opts.whole == true ? _this.default.municipalAndDistrictData : _this.default.municipalData);
                //热门城市，取前18条数据
                _this.default.hotCityData = _this.default.municipalData.slice(0, 18);
            } else {
                //2.走远端数据
                var hotData = [];
                $.each(data, function (i, v) {
                    //如果后端没有提供首字母的字段，取拼音字段的第一个字母进行数据存储，由于后端数据的拼音还是小写，把首字母转换为大写
                    if (!v[_this.opts.letterFlag]) {
                        data[i][_this.opts.letterFlag] = v[_this.opts.pinyinFlag].substring(0, 1).toLocaleUpperCase();
                    }
                    //如果有热门城市标识，则存入热门城市数组
                    if (v[_this.opts.hotFlag]) {
                        hotData.push(v);
                    }
                });
                _this.default.municipalData = $.extend(true, [], data);
                _this.default.cityData = $.extend(true, [], data);
                _this.default.hotCityData = hotData.length > 0 ? hotData : _this.default.municipalData.slice(0, 18);
            }
            //存储字母城市的对象，根据字母分类A,B,C...
            $.each(_this.default.cityData, function (i, v) {
                //根据首字母进行分类
                if (v[_this.opts.letterFlag]) {
                    //如果首字母城市没有这个对象的情况下，先定义一下，不然会报错
                    if (!_this.default.cityLetterData[v.letter]) {
                        _this.default.cityLetterData[v.letter] = [];
                    }
                    _this.default.cityLetterData[v[_this.opts.letterFlag]].push(v);
                }
            });
            //根据数据区分开各个不同的数据
            //城市数据
            _this.opts.cityData = _this.default.cityData;
            //根据字母的城市数据
            _this.opts.cityLetterData = _this.default.cityLetterData;
            //热门城市
            _this.opts.hotCityData = _this.default.hotCityData;
        },
        dataPage: function (data) {
            var _this = this;
            _this.data = $.extend(true, [], data);
            _this.dataHtml();
            //为什么在data处理层出现value的处理，是因为数据请求延迟问题
            _this.valueHtml();
        },
        dataHtml: function () {
            var _this = this;
            _this.dataMenuHtml(_this.opts.menuHeadData, _this.opts.cityLetterData, _this.opts.hotCityData);
            _this.dataListHtml(_this.opts.cityData);
        },
        /*菜单数据*/
        dataMenuHtml: function (menuHeadData, cityLetterData, hotCityData) {
            var _this = this;
            var cityMenuHeadHtml = '';
            var cityMenuContentHtml = '';
            $.each(menuHeadData, function (i, v) {
                //头部
                cityMenuHeadHtml += '<span>' + v + '</span>';
                //内容
                var menuDlHtml = '';
                //热门城市处理
                if (v == '热门城市') {
                    menuDlHtml += _this.cityDlHtml(hotCityData, '');
                }
                //字母城市处理，根据分类，每个类字母的个数不定，要取到对应的城市
                var menuContData = v.split('');
                $.each(menuContData, function (index, value) {
                    if (cityLetterData[value]) {
                        menuDlHtml += _this.cityDlHtml(cityLetterData[value], value);
                    }
                });
                cityMenuContentHtml += '<dl>' + menuDlHtml + '</dl>';
            });
            _this.ele.$cityMenuHeader.html(cityMenuHeadHtml);
            _this.ele.$cityMenuContent.html(cityMenuContentHtml);
            //城市分类切换功能
            new Tab({
                element: _this.ele.$cityMenu, //tab切换的元素
                titleElement: _this.ele.$cityMenu.find('.csm-header>span'), //标题的元素，opts.element.find('.tab-head>li')
                conElement: _this.ele.$cityMenu.find('.csm-content>dl'), //内容元素，opts.element.find('.tab-body>div'),
                currentTitleClass: 'csm-header-active', //当前标题的样式
                currentConClass: 'csm-content-active', //当前内容样式
            });
        },
        /*创建单个字母的布局*/
        cityDlHtml: function (city, value) {
            var _this = this;
            var menuSpanHtml = '';
            $.each(city, function (letterIndex, letterValue) {
                menuSpanHtml += '<span data-code="' + letterValue[_this.opts.idFlag] + '">' + (_this.opts.shorthand ? letterValue.shortName : letterValue[_this.opts.nameFlag]) + '</span>';
            });
            return ('<dt>' + value + '</dt><dd>' + menuSpanHtml + '</dd>');
        },
        /*列表数据*/
        dataListHtml: function (data) {
            var _this = this;
            _this.ele.$cityList.html(_this.cityLiHtml(data));
        },
        /*城市列表内容*/
        cityLiHtml: function (currentCityData) {
            var _this = this;
            var cityListLiHtml = '';
            if (currentCityData.length > 0) {
                $.each(currentCityData, function (i, v) {
                    cityListLiHtml += '<li data-code="' + v[_this.opts.idFlag] + '">' +
                            '<span class="csl-name">' + (_this.opts.shorthand ? v.shortName : v[_this.opts.nameFlag]) + '</span>' +
                            '<span class="csl-spell">' + (v[_this.opts.pinyinFlag] ? _this.titleCase(v[_this.opts.pinyinFlag]) : '') + '</span>' +
                            '</li>';
                });
            } else {
                cityListLiHtml = '<li class="csl-noData">暂无“<span>' + $.trim(_this.ele.$input.val()) + '</span>”相关数据</li>';
            }
            return cityListLiHtml;
        },
        /*首字母大写*/
        titleCase: function titleCase(s) {
            var i, ss = s.toLowerCase().split(/\s+/);
            for (i = 0; i < ss.length; i++) {
                ss[i] = ss[i].slice(0, 1).toUpperCase() + ss[i].slice(1);
            }
            return ss.join(' ');
        },

        /*值处理*/
        valueFn: function (parameter) {
            var _this = this;
            _this.dealType('array', parameter, _this.valueToPage, 'setValue');
        },
        valueToPage: function (value, _this) {
            _this.valueToPageFn(value.length >= 0, value, _this);
        },
        valueToPageFn: function (condition, value, _this) {
            //数据是符合条件的
            if (condition) {
                if (JSON.stringify(_this.value) != JSON.stringify(value)) {
                    //不需要去数据里面查找，直接赋值，因为可能数据里面没有当前的值
                    _this.value = $.extend(true, [], value);
                    _this.valueHtml();
                    _this.isCenter();
                    setTimeout(function () {
                        //值改变之后触发
                        _this.fire('change', _this.ele.$cityBtn, _this.getValue());
                    }, 0);
                } else {
                    //针对数据比较慢的情况下需要再一次去选中值
                    _this.valueHtml();
                }
            } else {
                console.log('数据是错误的，请检查');
            }
        },
        valueHtml: function () {
            var _this = this;
            _this.updateCityValue();
            _this.updateCityMenu();
            _this.upDateCityList();
        },
        /*更新已选的城市*/
        updateCityValue: function () {
            var _this = this;
            //已选择城市显示区域
            var selectedHtml = '';
            $.each(_this.value, function (i, v) {
                selectedHtml += '<li class="csb-item" data-code="' + v[_this.opts.idFlag] + '">' +
                        '<span class="csb-text">' + (_this.opts.shorthand ? v.shortName : v[_this.opts.nameFlag]) + '</span>' +
                        (!_this.opts.multiSelect && _this.opts.required ? '' : '<em class="csb-remove" title="删除">×</em>') + //单选必填的情况不必显示删除按钮
                        '<input type="hidden" class="csb-value" name="csb-values[' + i + ']" value="' + v[_this.opts.idFlag] + '" />' +
                        '</li>';
            });
            _this.ele.$selected.html(selectedHtml);
        },
        /*更新下拉菜单*/
        updateCityMenu: function () {
            var _this = this;
            _this.ele.$cityMenu.find('.csm-content span').removeClass('csm-city-active');
            $.each(_this.value, function (i, v) {
                _this.ele.$cityMenu.find('.csm-content span').each(function (index, value) {
                    if (v[_this.opts.idFlag] == $(this).attr('data-code')) {
                        $(this).addClass('csm-city-active');
                    }
                });
            });
            _this.ele.$cityNum.html(_this.value.length);
        },
        /*更新城市下拉列表*/
        upDateCityList: function () {
            var _this = this;
            _this.ele.$cityList.find('li').removeClass('csl-active');
            $.each(_this.value, function (i, v) {
                _this.ele.$cityList.find('li').each(function (index, value) {
                    if (v[_this.opts.idFlag] == $(this).attr('data-code')) {
                        $(this).addClass('csl-active');
                    }
                });
            });
        },
        /*是否居中*/
        isCenter: function () {
            var _this = this;
            if (_this.value.length == 0) {
                _this.removeCenter();
            } else {
                _this.addCenter();
            }
        },
        addCenter: function () {
            var _this = this;
            //_this.opts.isCenter判断需要单独处理不能放在一起
            _this.opts.isCenter && _this.ele.$cityBtn.addClass('city-selector-btn-center');
        },
        removeCenter: function () {
            var _this = this;
            _this.opts.isCenter && _this.ele.$cityBtn.removeClass('city-selector-btn-center');
        },

        /*绑定事件*/
        bindEvent: function () {
            var _this = this;
            _this.bindEventDocument();
            _this.bindEventBtn();
            _this.bindEventMenu();
            _this.bindEventList();
        },
        /*document事件*/
        bindEventDocument: function () {
            var _this = this;
            $(document).on('click scroll mousedown', function (e) {
                _this.hide();
            }).on('resize', function () {
                if (_this.ele.$cityList.css('display') != 'none') {
                    _this.setPos(_this.ele.$cityList);
                } else if (_this.ele.$cityMenu.css('display') != 'none') {
                    _this.setPos(_this.ele.$cityMenu);
                }
            });
            $('div').on('scroll', function (e) {
                if ($(this).css('overflow') == 'auto' && !$(this).hasClass('city-selector-menu') && $(this).find(_this.ele.$cityBtn).length > 0) {
                    _this.hide();
                    _this.ele.$input.blur();
                }
            });
        },
        /*按钮区域的事件*/
        bindEventBtn: function () {
            var _this = this;
            // 点击按钮的时候
            // 如果没有显示下拉，则显示下拉菜单或下拉列表，并获取输入框焦点
            // 如果显示下拉，则隐藏下拉城市，并且输入框失去焦点
            _this.ele.$cityBtn.on('click', function () {
                //如果是禁用状态，则无操作
                if (!_this.opts.readOnly && !_this.opts.disable) {
                    _this.removeCenter();
                    //上箭头的情况，则失焦改为下箭头
                    if (_this.condition()) {
                        _this.ele.$input.blur();
                        _this.hide();
                    } else {
                        //显示
                        _this.ele.$input.focus();
                        menuPopManager(_this);
                    }
                }
                return false;
            }).on('scroll mousedown', function () {
                return false;
            });
            //输入框输入的时候，隐藏菜单，显示相应的列表
            _this.ele.$input
                    .on('input', function (e) {
                        var $this = $(this);
                        if ($.trim($this.val()) == '') {
                            _this.showMenu();
                        } else {
                            _this.showList();
                            var currentData = [];
                            $.each(_this.opts.cityData, function (i, v) {
                                if ((v[_this.opts.nameFlag] + (v[_this.opts.pinyinFlag]).toLowerCase()).indexOf($this.val().toLowerCase()) != -1) { //当前输入的和数据库对比是否存在
                                    currentData.push(v);
                                }
                            });
                            _this.upDateCityListData(currentData);
                        }
                    })
                    .on('click', function (evt) {
                        //当点击到输入框区域的时候，并且当前没有显示下拉，则显示出来
                        if (!_this.opts.readOnly && !_this.opts.disable) {
                            //下箭头的情况则获取焦点
                            if (!_this.condition()) {
                                _this.ele.$input.focus();
                                menuPopManager(_this);
                            }
                        }
                        evt.stopPropagation();
                        return false;
                    })
                    .on('keyup', function (e) {
                        //箭头操作作用域整个菜单列表
                        var wrap = _this.ele.$cityList;
                        var keyCode = e.keyCode;
                        //下箭头操
                        if (keyCode == 38) {
                            var lis = wrap.find('li:visible');
                            var curli = lis.filter('.csl-current');
                            var index = curli.length == 0 ? 0 : lis.index(curli);
                            index--
                            if (index < 0) {
                                index = lis.length - 1;
                            }
                            lis.removeClass('csl-current');
                            var aimLi = lis.eq(index);
                            aimLi.addClass('csl-current');
                            return false;
                        } else if (keyCode == 40) {
                            //上箭头操作
                            var lis = wrap.find('li:visible');
                            var curli = lis.filter('.csl-current');
                            var index = curli.length == 0 ? 0 : lis.index(curli);
                            index++
                            if (index >= lis.length) {
                                index = 0;
                            }
                            lis.removeClass('csl-current');
                            var aimLi = lis.eq(index);
                            aimLi.addClass('csl-current');
                            return false;
                        } else if (keyCode == 13) {
                            //回车操作
                            var lis = _this.ele.$cityList.find('li');
                            var curli = lis.filter('.csl-current:visible');
                            curli.trigger('click');
                            lis.removeClass('csl-current');
                            return false;
                        }
                    });
            //点击删除小图标
            _this.ele.$cityBtn.on('click ', '.csb-remove', function () {
                //如果是必选的情况，则隐藏菜单
                if (_this.opts.required) {
                    //只有当前这1条数据了
                    if (_this.value.length <= 1) {
                        console.log('最后一条了，还是必填');
                    } else {
                        _this.removeCity($(this).closest('li'));
                    }
                } else {
                    //如果不是必选的情况，则删除当前值
                    _this.removeCity($(this).closest('li'));
                }
                if (!_this.condition()) {
                    _this.hide();
                } else {
                    menuPopManager(_this);
                    _this.ele.$input.focus();
                }
                return false;
            });
        },
        /*当有菜单显示的时候，则是上箭头*/
        condition: function () {
            var _this = this;
            return (_this.ele.$cityList.css('display') != 'none' || _this.ele.$cityMenu.css('display') != 'none');
        },
        /*菜单和列表的定位问题*/
        setPos: function ($eleMenu) {
            var _this = this;
            var $ele = _this.ele.$cityBtn;
            var top = 0;
            var left = 0;
            var width = 0;
            if ($ele.length > 0) {
                top = $ele.offset().top + $ele.outerHeight() - 1;
                left = $ele.offset().left;
                width = $ele.outerWidth();
                if (top - $(window).scrollTop() + $eleMenu.outerHeight() >= $(window).height()) {
                    if ($eleMenu.hasClass('menu-search')) {
                        $eleMenu.css({
                            'min-height': $eleMenu.css('max-height')
                        })
                    }
                    top = $ele.offset().top - $eleMenu.outerHeight() + 1;
                }
                !_this.opts.menuStyle.width && ($eleMenu.css({ 'width': width }));
                if ((left + $eleMenu.outerWidth() >= $(window).width())) {
                    left = $ele.offset().left + width - $eleMenu.outerWidth();
                }
                !_this.opts.menuStyle.top && ($eleMenu.css({ 'top': top }));
                !_this.opts.menuStyle.left && ($eleMenu.css({ 'left': left }));
            }
        },
        /*更新城市下拉列表数据*/
        upDateCityListData: function (currentCityData) {
            var _this = this;
            _this.ele.$cityList.html(_this.cityLiHtml(currentCityData));
            _this.upDateCityList();
            _this.selFirst();
        },
        /*当有数据的时候选中列表的第一个*/
        selFirst: function () {
            var _this = this;
            _this.ele.$cityList.find('li:not(".csl-noData")').removeClass('csl-current').eq(0).addClass('csl-current');
        },
        /*按钮菜单的事件*/
        bindEventMenu: function () {
            var _this = this;
            //点击菜单中的事件
            _this.ele.$cityMenu.on('click', '.csm-content span', function () {
                _this.cityClickFn($(this), 'csm-city-active');
                return false;
            }).on('click', function () {
                _this.ele.$input.focus();
                return false;
            }).on('scroll mousedown', function () {
                return false;
            });
            //清空按钮
            _this.ele.$cityEmptyBtn.on('click', function () {
                if (_this.value.length > 0) {
                    _this.clear();
                }
            });
        },
        /*每个城市的点击事件*/
        cityClickFn: function ($this, activeClass) {
            var _this = this;
            //多选
            if (_this.opts.multiSelect) {
                //已经选中当前的情况
                if ($this.hasClass(activeClass)) {
                    //如果是必选的情况，则隐藏菜单
                    if (_this.opts.required) {
                        //只有当前这1条数据了
                        if (_this.value.length <= 1) {
                            console.log('最后一条了，还是必填');
                        } else {
                            _this.removeCity($this);
                        }
                    } else {
                        //如果不是必选的情况，则删除当前值
                        _this.removeCity($this);
                    }
                } else {
                    //如果没有选中当前的,则增加当前值
                    _this.addCity($this);
                }
                menuPopManager(_this);
                _this.ele.$input.focus();
            } else {
                //单选
                _this.ele.$input.val('');
                //已经选中当前的情况
                if ($this.hasClass(activeClass)) {
                    //如果是必选的情况，则隐藏菜单
                    if (_this.opts.required) {
                        _this.hide();
                        _this.ele.$input.blur();
                        return false;
                    } else {
                        //如果不是必选的情况，则选中值中删除当前值
                        _this.removeCity($this);
                        menuPopManager(_this);
                        _this.ele.$input.focus();
                    }
                } else {
                    //如果没有选中当前的,点击则当前值就是选中值
                    _this.value = [];
                    _this.addCity($this);
                    _this.hide();
                    _this.ele.$input.blur();
                }
            }
        },
        /*删除城市*/
        removeCity: function ($this) {
            var _this = this;
            var curData = $.extend(true, [], _this.value);
            for (var i = 0; i < curData.length; i++) {
                if (curData[i][_this.opts.idFlag] == $this.attr('data-code')) {
                    curData.splice(i, 1);
                }
            }
            _this.valueFn(curData);
        },
        /*添加城市*/
        addCity: function ($this) {
            var _this = this;
            var curData = $.extend(true, [], _this.value);
            $.each(_this.opts.cityData, function (i, v) {
                if (v[_this.opts.idFlag] == $this.attr('data-code')) {
                    curData.push(v);
                }
            });
            _this.valueFn(curData);
        },
        /*按钮列表的事件*/
        bindEventList: function () {
            var _this = this;
            //点击列表中的事件
            _this.ele.$cityList.on('click', 'li', function () {
                _this.cityClickFn($(this), 'csl-active');
                return false;
            }).on('click scroll mousedown', function () {
                return false;
            });
        },

        /*自定义事件绑定*/
        on: function (type, handler) {
            var _this = this;
            if (typeof _this.handlers[type] == 'undefined') {
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
        },

        /**
         * @description 设置数据方法
         * @param {object/array/function} parameter - 传入的参数
         * @example
         * var citySelector = new citySelector({配置参数});
         * 设置值方法1：
         *      citySelector.setData([{
         *       "allowanceMoney": "80",
         *       "cityMoney": "100",
         *       "cityName": "北京市",
         *       "cityType": 1,
         *       "id": 41,
         *       "isHot": 1,
         *       "isLeaf": 1,
         *       "isVaild": 1,
         *       "majorId": "11001",
         *       "pid": "110",
         *       "pingyin": "beijing",
         *       "pinyinShort": "bjs",
         *       "weight": 101
         *   }]);
         * 设置值方法2：
         *   calendar.setData(function(callback){
         *    callback([{
         *       "allowanceMoney": "80",
         *       "cityMoney": "100",
         *       "cityName": "北京市",
         *       "cityType": 1,
         *       "id": 41,
         *       "isHot": 1,
         *       "isLeaf": 1,
         *       "isVaild": 1,
         *       "majorId": "11001",
         *       "pid": "110",
         *       "pingyin": "beijing",
         *       "pinyinShort": "bjs",
         *       "weight": 101
         *   }]);
         * 设置值方法3：
         *      calendar.setData({
         *           url；'',//请求
         *           data:{},//数据
         *           timeout:'0',//超时时间
         *           field:''//取值的字段
         *      });
         */
        setData: function (parameter) {
            var _this = this;
            //数据处理
            _this.dataFn(parameter);
        },
        /**
         * @description 设置值方法
         * @param {object/array/function} parameter - 传入的参数
         * @example
         * var citySelector = new citySelector({配置参数});
         * 设置值方法1：
         *      citySelector.setValue([{
         *       "allowanceMoney": "80",
         *       "cityMoney": "100",
         *       "cityName": "北京市",
         *       "cityType": 1,
         *       "id": 41,
         *       "isHot": 1,
         *       "isLeaf": 1,
         *       "isVaild": 1,
         *       "majorId": "11001",
         *       "pid": "110",
         *       "pingyin": "beijing",
         *       "pinyinShort": "bjs",
         *       "weight": 101
         *   }]);
         * 设置值方法2：
         *   calendar.setValue(function(callback){
         *    callback([{
         *       "allowanceMoney": "80",
         *       "cityMoney": "100",
         *       "cityName": "北京市",
         *       "cityType": 1,
         *       "id": 41,
         *       "isHot": 1,
         *       "isLeaf": 1,
         *       "isVaild": 1,
         *       "majorId": "11001",
         *       "pid": "110",
         *       "pingyin": "beijing",
         *       "pinyinShort": "bjs",
         *       "weight": 101
         *   }]);
         * 设置值方法3：
         *      calendar.setValue({
         *           url；'',//请求
         *           data:{},//数据
         *           timeout:'0',//超时时间
         *           field:''//取值的字段
         *      });
         */
        setValue: function (parameter) {
            var _this = this;
            //值处理
            _this.valueFn(parameter);
        },
        /*设置默认值*/
        setDefaultValue: function (parameter) {
            var _this = this;
            if (parameter) {
                _this.dealType('array', parameter, function (data) {
                    _this.defaultValue = $.extend(true, [], data);
                    //值处理
                    _this.valueFn(_this.defaultValue);
                });
            } else {
                _this.valueFn(_this.defaultValue);
            }
        },
        /**
         * @description 获取值
         * @param {requestCallback} [callback] -回调函数
         * @return {object} 当前的数据
         * @example
         * var citySelector = new citySelector({配置参数});
         * 获取值方法1：
         *      citySelector.getValue(function(value){
         *          //value则为当前值
         *      });
         * 获取值方法2：
         *      citySelector.getValue();//直接返回当前值
         */
        getValue: function (callback) {
            var _this = this;
            var result = '';
            //多选
            if (_this.opts.multiSelect) {
                result = _this.value.length == 0 ? '' : _this.value;
            } else {
                result = _this.value.length == 0 ? '' : _this.value[0];
            }
            //如果一个参数都没有，则直接返回数据
            if (!callback) {
                return result;
            } else {
                callback && callback(result);
            }
        },
        /**
         * @description 获取值ID
         * @return {String} 当前的数据
         * @example
         * var citySelector = new citySelector({配置参数});
         * 获取值方法：
         *      citySelector.getValueId();//返回值为当前数据,值是通过逗号分隔的字符串
         */
        getValueId: function () {
            var _this = this;
            return _this.resultData(_this.opts.idFlag);
        },
        /**
         * @description 获取数据Name的集合
         * @return {String} 当前的数据
         * @example
         * var citySelector = new citySelector({配置参数});
         * 获取值方法：
         *      citySelector.getValueName();//返回值为当前数据,值是通过逗号分隔的字符串
         */
        getValueName: function () {
            var _this = this;
            return _this.resultData(_this.opts.nameFlag);
        },
        resultData: function (falg) {
            var _this = this;
            var result = [];
            $.each(_this.value, function (i, v) {
                result.push(v[(falg)]);
            })
            return result.join(',');
        },
        /**
         * @description 触发改变
         * @param {requestCallback} callback -回调函数
         * @example
         * var citySelector = new citySelector({配置参数});
         * citySelector.change(function(value){
         *      //value为当前值
         * });
         */
        change: function (callback) {
            var _this = this;
            callback && _this.on('change', callback);
        },
        /**
         * @description 重置
         * @example
         * var citySelector = new citySelector({配置参数});
         * citySelector.reset();
         */
        reset: function () {
            var _this = this;
            _this.valueFn(_this.initValue);
            _this.isCenter();
        },
        /**
         * @description 清除
         * @example
         * var citySelector = new citySelector({配置参数});
         * citySelector.clear();
         */
        clear: function () {
            var _this = this;
            _this.valueFn([]);
            _this.removeCenter();
        },
        /**
         * @description 摧毁:默认只摧毁菜单
         * @example
         * var citySelector = new citySelector({配置参数});
         * citySelector.destroy();
         */
        destroy: function () {
            var _this = this;
            //把自定义事件清掉
            _this.handlers = {};
            _this.ele.$cityBtn.remove();
            _this.ele.$cityMenu.remove();
            _this.ele.$cityList.remove();
        },
        /**
         * @description 隐藏
         * @param {boolean} all -all存在就代表隐藏按钮和菜单，否则只隐藏菜单
         * @example
         * var citySelector = new citySelector({配置参数});
         * citySelector.hide();
         */
        hide: function (all) {
            var _this = this;
            _this.ele.$cityMenu.hide();
            _this.ele.$cityList.hide();
            if (_this.ele.$cityBtn.hasClass('triangle')) {
                _this.ele.$cityBtn.removeClass('triangle-up').addClass('triangle-down');
            }
            _this.isCenter();
            _this.ele.$input.attr('placeholder', _this.opts.placeholder).val('');
            all && _this.ele.$cityBtn.hide();
        },
        /**
         * @description 显示
         * @param {boolean} all -all存在就代表显示按钮和菜单，否则只显示菜单。调用这个方法的时候需要注意一下，必须有return false,因为有body事件
         * @example
         * var citySelector = new citySelector({配置参数});
         * citySelector.show();
         */
        show: function (all) {
            var _this = this;
            _this.showMenuOrList();
            all && _this.ele.$cityBtn.show();
        },
        /*显示菜单或列表*/
        showMenuOrList: function () {
            var _this = this;
            _this.removeCenter();
            if (_this.ele.$cityBtn.hasClass('triangle')) {
                _this.ele.$cityBtn.addClass('triangle-up').removeClass('triangle-down');
            }
            if ($.trim(_this.ele.$input.val()) == '') {
                _this.showMenu();
            } else {
                _this.showList();
            }
            _this.ele.$input.focus().val('').attr('placeholder', _this.opts.searchPlaceholder);
        },
        /*显示菜单*/
        showMenu: function () {
            var _this = this;
            _this.ele.$cityList.hide();
            _this.ele.$cityMenu.show();
            _this.setPos(_this.ele.$cityMenu);
        },
        /*显示列表*/
        showList: function () {
            var _this = this;
            _this.ele.$cityMenu.hide();
            _this.ele.$cityList.show();
            _this.setPos(_this.ele.$cityList);
        },
        /**
         * @description 禁用
         * @example
         * var citySelector = new citySelector({配置参数});
         * citySelector.disable();
         */
        disable: function () {
            var _this = this;
            _this.opts.readOnly = true;
            _this.opts.disable = true;
            _this.statusSetting();
        },
        /**
         * @description 启用
         * @example
         * var citySelector = new citySelector({配置参数});
         * citySelector.enable();
         */
        enable: function () {
            var _this = this;
            _this.opts.disable = false;
            _this.opts.readOnly = false;
            _this.statusSetting();
        }
    };
    return CitySelector;
});
