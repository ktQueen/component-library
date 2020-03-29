require.config({
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min',
        'cssFile': 'modules/libs/rq/css.min'
    }
});
define([
    'modules/utils/extend',
    'modules/utils/menu_pop_manager',
    'jquery',
    'cssFile!modules/drop_down_base/css/drop_down_base'
], function (Base, menuPopManager) {
    /**
     * 下拉框组件的基础文件
     * @alias drop_down_base
     * @author kt
     * @since 2017-03-20
     */
    var DropDownBase = function () {
    };
    DropDownBase.prototype = {
        /*执行*/
        execute: function (opts, Menu) {
            var _this = this;
            _this.parameterSetting(opts);
            if (!_this.opts.isOnlyMenu) {
                _this.createHtml();
                _this.style();
                _this.bindEvent();
            }
            _this.createMenu(Menu);
        },
        /*参数设置*/
        commonParameterSetting: function (opts) {
            var _this = this;
            if (!opts) opts = {};
            var el = $('<div>');
            if (!opts.menuElement) { //设置默认menu位置,没有设置的情况下放入body
                $('body').append(el);
            }
            opts = $.extend(true, {
                /*按钮*/
                element: '', //btn放的位置
                btnAddClass: '', //btn添加class
                btnStyle: {}, //btn的相关样式
                showElement: '', //设置元素显示值的位置，如果没有设置，则默认为element放置选择的值
                placeholder: '', //按钮显示的提示文字
                isDisabled: false, //按钮是否可点击
                readOnly: false, //按钮是否是只读状态
                isIcon: true, //是否显示下拉按钮
                beforeClick: null, //最终执行完后返回值是一个布尔值，如果是false可以阻断进程
                /*菜单设置*/
                menuElement: el, //menu放的位置，默认放在body
                menuAddClass: '', //menu添加class
                menuStyle: //菜单扩展的样式，如果是只有菜单的情况下，则不设置默认样式，如果有下拉按钮的情况下，将菜单设置为定位且是不可见状态
                        (opts.isOnlyMenu ? opts.isOnlyMenu : false) ? {} : {
                            'position': 'absolute',
                            'display': 'none'
                        },
                menuListShowWay: '', //菜单列表显示形式，如果是one单行就用...,默认为''，显示所有内容
                idFlag: 'id', //数据的key值
                nameFlag: 'name', //数据的key值
                defaultValue: null, //设置默认值，和这里的setValue得到的数据是一致的
                setValue: null, //设置值，可以为object/function/array,但是数据最终纯为object/array
                setData: null, //设置数据，可以为object/function/array,但是数据最终纯为object/array
                initDone: null, //下拉菜单整体初始化完成触发,function
                change: null, //值改变触发,function
                isOnlyMenu: false, //是否只有菜单，默认为false,，为true时就没有按钮的相关设置
                //内部使用
                isArr: false, //默认不是过滤器使用的
                isConsole: false, //是否打印日志
                elementClass: 'dropdown-btn' //btn的class，只是方便以后修改
            }, opts);
            _this.opts = opts;
            _this.handlers = {}; //存储自定义事件:必须写在上面，写在下面会把别人的也存储起来的
            _this.opts.change && _this.on('change', _this.opts.change); //把change事件放入到handlers中
        },
        /*创建btn对应的menu*/
        createMenu: function (Menu) {
            var _this = this;
            _this.dropMenu = new Menu({
                type: _this.opts.type,
                menuElement: _this.opts.menuElement,
                menuAddClass: (_this.opts.isOnlyMenu ? _this.opts.isOnlyMenu : false) ?
                        ('only-menu ' + _this.opts.menuAddClass) :
                        ('drop-menu ' + _this.opts.menuAddClass),
                menuStyle: _this.opts.menuStyle,
                menuListShowWay: _this.opts.menuListShowWay,
                idFlag: _this.opts.idFlag,
                nameFlag: _this.opts.nameFlag,
                defaultValue: _this.opts.defaultValue,
                setValue: _this.opts.setValue,
                setData: _this.opts.setData,
                initDone: _this.opts.initDone,
                change: function (value) {
                    if (!_this.opts.isOnlyMenu) { //如果有下拉按钮触发下拉框的情况
                        var nameHtml = [];
                        var idHtml = [];
                        $.each(value, function (i, v) {
                            nameHtml.push(v[_this.opts.nameFlag]);
                            idHtml.push(v[_this.opts.idFlag]);
                        });
                        _this.changeTxt(nameHtml.join(','), idHtml.join(','));
                        if (_this.opts.type == 'single' || _this.opts.type == 'singleSearch') { //如果是单选或者单选搜索的话，选择了之后要让选择框隐藏
                            _this.hide();
                        }
                        _this.fire('change', _this.wrap, value);
                    } else { //只有菜单的情况
                        _this.fire('change', this, value); //this是当前的菜单元素
                    }
                },
                //单选
                isRequired: _this.opts.isRequired, //单选
                //搜索
                isAllData: _this.opts.isAllData,
                isSearch: _this.opts.isSearch || 'true', //搜索框
                searchPlaceholder: _this.opts.searchPlaceholder || ('请输入你想搜索的' + _this.opts.placeholder), //搜索框
                searchDefaultField: _this.opts.searchDefaultField || _this.opts.placeholder || '', //搜索框
                //多选
                isSelectAll: _this.opts.isSelectAll,
                //内部使用
                isArr: _this.opts.isArr,
                isConsole: _this.opts.isConsole//是否打印日志
            });
        },
        /*改变文本*/
        changeTxt: function (value, id) {
            var _this = this;
            var $showEle = _this.opts.showElement || _this.opts.element;
            if (_this.isInput()) {
                $showEle.val(value || _this.opts.placeholder);
            } else {
                $showEle.html(value || _this.opts.placeholder);
            }
            _this.wrap.attr({
                'title': value || _this.opts.placeholder || '',
                'data-value': id || ''
            });
            value ? _this.opts.element.removeClass('placeholder') : _this.opts.element.addClass('placeholder');
        },
        /*创建下拉按钮内容*/
        /*如果传进来的是input,则在input外面创建一个包裹层，因为input不支持伪类*/
        /*如果是其他元素，则直接在里面添加内容*/
        createHtml: function () {
            var _this = this;
            if (_this.isInput()) { //如果是input元素
                _this.wrap = $('<div>');
                _this.opts.element.addClass('showtext ').after(_this.wrap);
                _this.opts.element.appendTo(_this.wrap);
                _this.opts.element.attr({
                    'placeholder': _this.opts.placeholder,
                    'readOnly': 'readOnly', //让input元素不能输入
                    'disabled': 'disabled' //让input元素不能输入
                });
            } else {
                _this.opts.element.html('<span class="showtext">' + _this.opts.placeholder + '</span>');
                _this.wrap = _this.opts.element;
                _this.opts.element = _this.wrap.find('.showtext');
            }
            _this.opts.isIcon && _this.wrap.addClass('triangle triangle-down'); //是否显示下拉三角
            if (_this.opts.readOnly) { //只读显示
                _this.wrap.attr({
                    'readOnly': 'readOnly',
                }).css({
                    "cursor": 'text'
                });
            }
            if (_this.opts.isDisabled) { //禁用显示
                _this.wrap.attr({
                    'disabled': 'disabled'
                }).css({
                    "cursor": 'no-drop'
                });
            }
            _this.wrap.addClass(_this.opts.elementClass + ' ' + _this.opts.btnAddClass).attr({
                'title': _this.opts.placeholder || '',
                'data-value': '',
                'placeholder': _this.opts.placeholder
            });
            _this.opts.element.addClass('placeholder');
            //_this.wrap为按钮最外层，_this.opts.element为内容层
        },
        /*判断是否是input*/
        isInput: function () {
            var _this = this;
            return _this.tagName(_this.opts.element) == 'input';
        },
        //获取当前元素的标签
        tagName: function (obj) {
            return obj.get(0) && obj.get(0).nodeName.toLowerCase();
        },
        /*设置当前btn的样式*/
        style: function () {
            var _this = this;
            _this.opts.btnStyle && _this.wrap.css(_this.opts.btnStyle);
        },
        /*绑定事件*/
        bindEvent: function () {
            var _this = this;
            _this.showSelectEvent();
            /*document事件*/
            $(document).bind('click scroll mousedown', function (e) {
                _this.hide();
            });
            $('div').on('scroll', function (e) {
                if ($(this).css('overflow') == 'auto' && !$(this).hasClass('dropdown-menu') && $(this).find(_this.wrap).length > 0) {
                    _this.hide();
                }
            });
            /*菜单阻止冒泡*/
            _this.opts.menuElement.on("click scroll mousedown", function (evt) {
                evt.stopPropagation();
            });
            /*屏幕大小改变的时候，下拉框的位置相应改变*/
            $(window).resize(function () {
                _this.setPos();
            });
        },
        /*显示与隐藏下拉框*/
        showSelectEvent: function () {
            var _this = this;
            _this.wrap.on('click ', function () {
                if (!_this.opts.isDisabled && !_this.opts.readOnly) { //如果是可用的情况下
                    if (_this.opts.beforeClick) {
                        if (!_this.opts.beforeClick()) {
                            return false;
                        }
                    }
                    _this.showSelectFn(_this.opts.menuElement);
                }
                return false;
            }).on('mousedown', function () {
                return false;
            });
        },
        /*是否显示下拉框*/
        showSelectFn: function (obj) {
            var _this = this;
            if (obj.css('display') == 'none') { //如果下拉框是隐藏的，则显示
                menuPopManager(_this);//所有下拉菜单管理，显示当前，隐藏上一个
                _this.setPos();
                obj.find('input').eq(0).val('').focus();
            } else { //如果下拉框是显示的，则隐藏
                _this.hide();
            }
        },
        /*设置menu定位,宽，高*/
        setPos: function () {
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
        /* -----------------自定义方法------------------- */
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
        },
        /*-----------------对外的方法-------------*/
        /**
         * @description 设置数据方法
         * @param {array|object|function} parameter - 传入的参数
         * @example
         * var dropDown = new DropDown({配置参数});
         * 设置值方法1：
         *      dropDown.setData({
         *          id:'1',
         *          name:'啦啦啦'
         *      });
         * 设置值方法2：
         *      dropDown.setData([{
         *          id:'1',
         *          name:'啦啦啦'
         *      },{
         *          id:'2',
         *          name:'啦啦啦22'
         *      }]);
         * 设置值方法3：
         *      dropDown.setData(function(callback){
         *           callback({
         *              id:'1',
         *              name:'啦啦啦'
         *           });//必须要执行callback
         *      });
         * 设置值方法4：
         *      dropDown.setData(function(callback){
         *           callback([{
         *              id:'1',
         *              name:'啦啦啦'
         *           }]);//必须要执行callback
         *      });
         * 设置值方法5：
         *      dropDown.setData({
         *           url:'',//请求
         *           data:{},//数据
         *           timeout:'0',//超时时间
         *           field:''//取值的字段
         *      });
         */
        setData: function (parameter) {
            var _this = this;
            _this.dropMenu && _this.dropMenu.setData(parameter);
        },
        /**
         * @description 设置值方法
         * @param {array|object|function} parameter - 传入的参数
         * @example
         * var dropDown = new DropDown({配置参数});
         * 设置值方法1：
         *      dropDown.setValue({
         *          id:'1',
         *          name:'啦啦啦'
         *      });
         * 设置值方法2：
         *      dropDown.setValue([{//单选的数组长度不能大于1
         *          id:'1',
         *          name:'啦啦啦'
         *      }]);
         * 设置值方法3：
         *      dropDown.setValue(function(callback){
         *           callback({
         *              id:'1',
         *              name:'啦啦啦'
         *           });//必须要执行callback
         *      });
         * 设置值方法4：
         *      dropDown.setValue(function(callback){
         *           callback([{//单选的数组长度不能大于1
         *              id:'1',
         *              name:'啦啦啦'
         *           }]);//必须要执行callback
         *      });
         * 设置值方法5：
         *      dropDown.setValue({
         *           url:'',//请求
         *           data:{},//数据
         *           timeout:'0',//超时时间
         *           field:''//取值的字段
         *      });
         */
        setValue: function (parameter) {
            var _this = this;
            _this.dropMenu && _this.dropMenu.setValue(parameter);
        },
        /*设置默认值*/
        setDefaultValue: function (parameter) {
            var _this = this;
            _this.dropMenu && _this.dropMenu.setDefaultValue(parameter);
        },
        /**
         * @description 获取值
         * @param {requestCallback} [callback] -回调函数
         * @return {String} 当前的数据
         * @example
         * var dropDown = new DropDown({配置参数});
         * 获取值方法1：
         *      dropDown.getValue(function(value){
         *          //value则为当前值
         *      });//返回值为回调函数执行结果
         * 获取值方法2：
         *      dropDown.getValue();//返回值为当前数据
         */
        getValue: function (callback, isTemplate) {
            var _this = this;
            return _this.dropMenu
                    ? (!callback
                    ? _this.dropMenu.getValue('', isTemplate)
                    : _this.dropMenu.getValue(callback, isTemplate))
                    : '';
        },
        /**
         * @description 获取值ID
         * @param {requestCallback} [callback] -回调函数
         * @return {String} 当前的数据
         * @example
         * var dropDown = new DropDown({配置参数});
         * 获取值方法1：
         *      dropDown.getValueId(function(value){
         *          //value则为当前值,值是通过逗号分隔的字符串
         *      });//返回值为回调函数执行结果
         * 获取值方法2：
         *      dropDown.getValueId();//返回值为当前数据,值是通过逗号分隔的字符串
         */
        getValueId: function () {
            var _this = this;
            return _this.dropMenu.getValueId();
        },
        /**
         * @description 获取值Name
         * @param {requestCallback} [callback] -回调函数
         * @return {String} 当前的数据
         * @example
         * var dropDown = new DropDown({配置参数});
         * 获取值方法1：
         *      dropDown.getValueName(function(value){
         *          //value则为当前值,值是通过逗号分隔的字符串
         *      });//返回值为回调函数执行结果
         * 获取值方法2：
         *      dropDown.getValueName();//返回值为当前数据,值是通过逗号分隔的字符串
         */
        getValueName: function () {
            var _this = this;
            return _this.dropMenu.getValueName();
        },
        /**
         * @description 触发改变
         * @param {requestCallback} callback -回调函数
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.change(function(value){
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
         * var dropDown = new DropDown({配置参数});
         * dropDown.reset();
         */
        reset: function () {
            var _this = this;
            _this.dropMenu && _this.dropMenu.reset();
            _this.opts.isIcon && _this.wrap && _this.wrap.removeClass('triangle-up').addClass('triangle-down');
        },
        /**
         * @description 清除
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.clear();
         */
        clear: function () {
            var _this = this;
            _this.dropMenu && _this.dropMenu.clear();
            _this.opts.isIcon && _this.wrap && _this.wrap.removeClass('triangle-up').addClass('triangle-down');
        },
        /**
         * @description 摧毁:默认只摧毁菜单
         * @param {boolean} [all] -all为布尔值，如果入true就连按钮一起摧毁
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.destroy();
         */
        destroy: function (all) {
            var _this = this;
            _this.handlers = {};//把自定义事件清掉
            _this.dropMenu && _this.dropMenu.destroy();
            _this.opts.isIcon && _this.wrap && _this.wrap.removeClass('triangle-up').addClass('triangle-down');
            all && _this.wrap.remove();
        },
        /**
         * @description 显示
         * @param {boolean} all -all存在就代表显示按钮和菜单，否则只显示菜单。调用这个方法的时候需要注意一下，必须有return false,因为有body事件
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.show();
         */
        show: function (all) {
            var _this = this;
            if (!(_this.opts.readOnly && _this.opts.isDisabled)) {
                !_this.opts.isOnlyMenu && _this.setPos();
                _this.dropMenu && _this.dropMenu.show();
                _this.opts.isIcon && _this.wrap && _this.wrap.removeClass('triangle-down').addClass('triangle-up');
            }
            all && _this.wrap.show();
            return false;
        },
        /**
         * @description 隐藏
         * @param {boolean} all -all存在就代表隐藏按钮和菜单，否则只隐藏菜单
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.hide();
         */
        hide: function (all) {
            var _this = this;
            _this.dropMenu && _this.dropMenu.hide();
            _this.opts.isIcon && _this.wrap && _this.wrap.removeClass('triangle-up').addClass('triangle-down');
            all && _this.wrap.hide();
        },
        /**
         * @description 禁用
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.disable();
         */
        disable: function () {
            var _this = this;
            _this.wrap.css({
                "cursor": 'no-drop'
            });
            _this.opts.isDisabled = true;
            _this.opts.readOnly = true;
            _this.wrap.attr({'disabled':'disabled','readOnly':'readOnly'});
        },
        /**
         * @description 启用
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.enable();
         */
        enable: function () {
            var _this = this;
            _this.wrap.css({
                "cursor": 'pointer'
            });
            _this.opts.isDisabled = false;
            _this.opts.readOnly = false;
            _this.wrap.removeAttr('disabled');
            _this.wrap.removeAttr('readOnly');
        },
        /**
         * @description 是否必填，单选才有的方法
         * @param {boolean} isRequired -是否必填
         * @example
         * var dropDown = new DropDown({配置参数});
         * dropDown.required(false);
         */
        required: function (isRequired) {
            var _this = this;
            _this.dropMenu && _this.dropMenu.required(isRequired);
        }
    };
    return Base.extend(DropDownBase);
});