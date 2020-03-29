require.config({
    paths: {
        'cssFile': 'modules/libs/rq/css.min'
    }
});
define([
    'modules/form_base/js/form_base',
    'modules/utils/true_or_false',
    'modules/utils/data_type',
    'modules/utils/number_change',
    'modules/utils/function_deal',
    'modules/form_verify/js/form_verify', //校验组件
    'modules/tooltip/js/tooltip', //气泡型提示组件
    'modules/message/js/message', //顶部滑动式提示组件

    'modules/form_field_plainText/js/form_field_plainText',
    'modules/form_field_text/js/form_field_text',
    'modules/form_field_select/js/form_field_select',
    'modules/form_field_date/js/form_field_date',
    'modules/form_field_radio/js/form_field_radio',
    'modules/form_field_checkbox/js/form_field_checkbox',
    'modules/form_field_manifest/js/form_field_manifest',
    'modules/form_field_upload/js/form_field_upload',
    'modules/form_field_um/js/form_field_um',
    'modules/form_field_city_selector/js/form_field_city_selector',//城市选择，
    'modules/form_complex_base/js/form_complex_manager',
    'cssFile!modules/form_complex_base/css/form_complex_base'
], function (FormBase, trueOrFalse, dataType, numberChange, functionDeal, FormVerify, Tooltip, Message, FormFieldPlainText, FormFieldText, FormFieldSelect, FormFieldDate, FormFieldRadio, FormFieldCheckbox, FormFieldManifest, FormFieldUpload, FormFieldUm, FormFieldCity, formComplexManager) {
    /**
     * 表单复合类型组件的基础文件
     * @alias form_complex_base
     * @author kt
     * @since 2017-9-7
     */
    var FormComplexBase = function () {
    };
    FormComplexBase.prototype = {
        /*参数设置*/
        commonParameterSetting: function (opts) {
            var _this = this;
            if (!opts) opts = {};
            opts = $.extend(true, {
                name: '', //唯一标识
                element: '', //当前需要生成字段的元素
                className: '', //可以为当前元素添加class
                style: {}, //设置样式
                layout: 'left-right', //布局，一种为上下结构'up-down'，一种为左右结构'left-right'，默认为左右结构布局
                isShowRequired: false, //当必填的时候是否显示必填标志，默认是隐藏的
                requiredLocation: 'before', //必填标志的位置，可以在字段前before，也可以在末尾显示before， 默认在字段前显示
                title: '', //标题
                titleStyle: {},
                contentStyle: {}, //内容样式
                readOnly: (opts.disabled || false), //只读
                disabled: false, //禁用
                tip: '', //在表单字段组件下面一行添加提示文字
                maxNum: '', //添加的条数限制
                isHide: false, //是否隐藏，默认是显示的
                canNull: false,
                //校验配置（2）
                byteChinese: '1', //中文一个字符占几个字节,默认为一个字符占1个字节
                checkType: 'all', //单个校验还是整体校验：all/oneByOne,all整体校验是全部提示规则都出来，oneByOne一个一个校验是单个校验完了再校验下一个
                isChangeCheck: true, //值改变的时候是否执行校验
                //提示
                checkTipType: 'tooltip', //校验提示类型,message/tooltip
                isTipBorder: true, //是否校验元素需要红框提示,两种提示都可以设置
                isSetRowLineHeight: false, //使用气泡提示时，是整体校验的情况下，提示会遮挡输入框的情况，可以设置行高，默认是不设置，鼠标移入显示当前提示，移除其他提示
                checkTipShape: 'hollow', //气泡提示形状
                checkTipDirection: 'top', //气泡提示方向
                checkTipLocation: 'left', //气泡提示位置
                checkTipTime: '2', //消息提示显示时间
                valueIsArray: false,//当没有加减行的时候，获取值默认不是一个数组，强制是一个数组的，则返回一个数组
            }, opts);
            _this.opts = opts;
            _this.opts = functionDeal(_this.opts);
            _this.validators = []; //校验
            _this.tooltip = []; //提示存储，为了再次校验的时候清空
            _this.handlers = {}; //自定义事件存储
            _this.fileIdArr = []; //表单的字段的参数数组存储,每次进来都要清空
            _this.$fileIds = [];
            /*存储表单里面的字段，后面可以根据这个存储的字段通过name找到对应的字段进行操作*/
        },
        /*创建配置内容*/
        createFormComplex: function () {
            var _this = this;
            _this.createFormComplexBase({
                eleHtml: '<table>' +
                        '<thead></thead>' +
                        '<tbody></tbody>' +
                        '</table>'
            });
        },
        /*创建表单混合元素
         *param为参数,标题和必填标志不能换行，换行被解析，获取的宽度就不够了
         */
        createFormComplexBase: function (param) {
            var _this = this;
            var className = ' ' + _this.opts.className;
            var requiredClass = (_this.opts.requiredLocation == 'before') ? '' : ' form-complex-required-after';
            var layoutClass = ((_this.opts.layout == 'left-right') ? ' form-complex-leftRight' : ' form-complex-upDown')
            _this.opts.element
                    .addClass('form-clear form-complex ' + layoutClass + requiredClass + ' ' + _this.ownClass + className)
                    .html('<div class="form-complex-head">' +
                            (trueOrFalse(_this.opts.isShowRequired) ? '<span class="form-required">*</span>' : '') + (trueOrFalse(_this.opts.title) ? '<span class="form-complex-title">' + _this.opts.title + '</span>' : '') +
                            '</div>' +
                            '<div class="form-complex-content">' + param.eleHtml +
                            (_this.opts.tip ? '<p class="form-tip">' + _this.opts.tip + '</p>' : '') +
                            '</div>')
                    .attr('name', _this.opts.name || '');
        },
        /*元素设置*/
        elementSetting: function () {
            var _this = this;
            _this.$field = _this.opts.element; //字段区域
            _this.$required = _this.opts.element.find('.form-complex-head .form-required'); //必填元素标志
            _this.$head = _this.opts.element.find('.form-complex-head'); //标题文字区域
            _this.$title = _this.opts.element.find('.form-complex-title'); //标题文字区域
            _this.$content = _this.opts.element.find('.form-complex-content'); //内容区域
            _this.$element = _this.$table = _this.$content.find('table');
            _this.$thead = _this.$content.find('thead').eq(0);
            _this.$tbody = _this.$content.find('tbody').eq(0);
        },
        /*样式设置*/
        styleSetting: function () {
            var _this = this;
            //字段样式处理
            _this.opts.style && _this.$field.css(_this.opts.style);
            //标题的样式设置
            _this.opts.titleStyle && _this.$head.css(_this.opts.titleStyle);
            //内容样式处理
            _this.opts.contentStyle && _this.$content.css(_this.opts.contentStyle);
            //必填标志样式处理
            _this.requiredLocationFn(_this.opts.isShowRequired);
        },
        //必填标志现实与隐藏的处理
        requiredLocationFn: function (isRequired) {
            var _this = this;
            var requiredWidth = 0;
            if (trueOrFalse(isRequired)) { //如果显示必填标志
                _this.$required.show();
                requiredWidth = _this.$required.outerWidth() + 1; //这里为什么要加1呢，是因为宽度有的时候小数会自己舍掉
            } else { //否则隐藏必填标志
                _this.$required.hide();
            }
            if (_this.opts.layout == 'left-right') {
                var titleWidth = 0;
                if (!!_this.opts.title) {
                    titleWidth = _this.$title.outerWidth() + 1; //这里为什么要加1呢，是因为宽度有的时候小数会自己舍掉
                }
                _this.$content.css({
                    'width': 'calc(100% - ' + (titleWidth + requiredWidth) + 'px)'
                });
            }
        },
        /*创建表格*/
        createTable: function () {
            var _this = this;
            //标题
            if (_this.opts.childrenThead && _this.opts.childrenThead.length > 0) {
                var theadHtml = '';
                $.each(_this.opts.childrenThead, function (i, v) {
                    if (dataType(v) == 'string') {
                        if (v == 'hiddenField') {
                            theadHtml += '<th style="display:none;"></th>';
                        } else {
                            theadHtml += '<th>' + v + '</th>';
                        }
                    } else if (dataType(v) == 'object') {
                        var required = '';
                        if (v.isShowRequired == true) {
                            required = '<span class="form-required">*</span>';
                        }
                        theadHtml += '<th>' + required + '<span>' + v.value + '</span></th>';
                    }
                });
                _this.$thead.html('<tr>' + theadHtml + '</tr>');
            }
            //内容
            if (_this.opts.childrenTbody.length == 1 && dataType(_this.opts.childrenTbody[0]) == 'array') { //如果childrenTbody的长度为一并且第一个是数组的情况下，则只去第一个
                _this.opts.childrenTbody = _this.opts.childrenTbody[0];
            }
            //如果可以为空，默认不添加行
            if (!_this.opts.canNull) _this.addRow(0, $.extend(true, [], _this.opts.childrenTbody));
            _this.indexFn();
            if (_this.opts.value) { //todo,值处理,表单工具需要，这里设置定时器是因为设置值的时候有可能没有加载完成
                _this.setValue(_this.opts.value);
            }
            if (_this.opts.data) { //todo,块添加里面设置数据时的操作
                _this.setData(_this.opts.data);
            }
        },
        /*添加行
         * index:在哪个位置加入行
         * value:这一行的配置值
         * */
        addRow: function (index, value) {
            var _this = this;
            var tdHtml = '';
            var fileIdObj = {};
            var $fileIdsObj = {};
            var validators = {};
            $.each(value, function (i, v) {
                if (v.type == 'hidden'||v.isHide==true||v.isHide=='true') {
                    tdHtml += '<td style="display: none;"><div></div></td>';
                } else {
                    tdHtml += '<td><div></div></td>';
                }
            });
            var $rowDom = $('<tr>' + tdHtml + '</tr>');
            if (_this.$tbody.children('tr').length == 0) {
                _this.$tbody.append($rowDom);
            } else {
                _this.$tbody.children('tr').eq(index - 1).after($rowDom);
            }
            $fileIdsObj.$dom = $rowDom;
            $.each(value, function (i, v) {
                v.element = _this.$tbody.children('tr').eq(index).children('td').eq(i).find('div').eq(0);
                v.disabled = v.disabled ? v.disabled : _this.opts.disabled;
                if (v.name) {
                    fileIdObj[v.name] = v;
                } else {
                    fileIdObj[v.type] = v;
                }
                _this.createFieldSingle(v, $fileIdsObj, validators, i);
            });
            _this.fileIdArr.splice(index, 0, fileIdObj);
            _this.$fileIds.splice(index, 0, $fileIdsObj);
            _this.validators.splice(index, 0, validators);
            _this.bindAreaEvent($fileIdsObj);
            _this.rows ? _this.rows.push($fileIdsObj) : this.rows = [$fileIdsObj]; //初始化时用
            _this.opts.disabled && _this.disable();
        },
        /*根据类型创建单个字段*/
        createFieldSingle: function (v, $fileIdsObj, validators, i) {
            var _this = this;
            //只有当你设置有改变执行校验的时候才去设置下面的函数，默认是有的
            //把校验执行放在函数里传到各个字段里去，在值改变的时候去执行
            if (v.name) {
                validators[v.name] = v.validators;
                _this.opts.isChangeCheck && (v.formValidatorsCallback = function () {
                    _this.verify(v.name, $fileIdsObj.$dom.index());
                });
            }
            if (v.requiredLocation == 'after') { //如果数据配置了必填标志在后面的处理,将isRequiredAfter改为true
                _this.isRequiredAfter = true;
            }
            var objType = {
                'text': FormFieldText,
                'password': FormFieldText,
                'textarea': FormFieldText,
                'hidden': FormFieldText,
                'textareaAuto': FormFieldText,
                'plainText': FormFieldPlainText,
                'single': FormFieldSelect,
                'singleSearch': FormFieldSelect,
                'multiple': FormFieldSelect,
                'multipleSearch': FormFieldSelect,
                'date': FormFieldDate,
                'date2': FormFieldDate,
                'radio': FormFieldRadio,
                'checkbox': FormFieldCheckbox,
                'manifest': FormFieldManifest,
                'upload': FormFieldUpload,
                'umEditor': FormFieldUm,
                'city': FormFieldCity,
                'paraConfig': formComplexManager.FormComplexParaConfig,
                'tableParaConfig': formComplexManager.FormComplexTableParaConfig,
                'blockParaConfig': formComplexManager.FormComplexBlockParaConfig
            };
            if (objType[v.type]) {
                $fileIdsObj[v.name] = new objType[v.type](v);
            } else if (v.type == 'index') { //索引，目前支持数字类型：阿拉伯数字number,罗马数字roman,中文数字chinese
                //设置当前元素的样式
                v.element.addClass('form-complex-index');
                v.style && v.element.css(v.style);
                if (v.name) {
                    $fileIdsObj[v.name] = _this.formComplexIndexNB = new FormFieldPlainText(v);
                } else {
                    _this.formComplexIndexNB = new FormFieldPlainText(v);
                }
            } else if (v.type == 'actions') { //操作配置
                _this.dataTypeIsArray = true; //说明当前需要的是一个数组
                v.element.addClass('form-complex-actions');
                v.style && v.element.css(v.style);
                v = $.extend(true, {
                    type: "actions",
                    value: [], //"add","remove","up","down","upToTop","downToBottom"
                    plusOnlyOne: false, //是否添加最后一行的操作，默认不是，点击哪行添加哪行
                    isDeleteOnlyOne: false, //是否可以删除唯一一行,默认是不可以的
                    language: "icon", //图标icon ,文字character
                    updateValue: '',//复制的时候，获取当前行的某些数据
                    style: {},
                }, v);
                _this.plusOnlyOne = v.plusOnlyOne;
                _this.updateValue = v.updateValue;
                _this.isDeleteOnlyOne = v.isDeleteOnlyOne;
                _this.isDeleteOnlyOneIndex = i;//操作的在哪个位置
                _this.isDeleteOnlyOne && _this.$content.addClass('deleteOnlyOne');
                if (v.value) {
                    var btnsHtml = '';
                    var character = {
                        'add': '添加',
                        'remove': '删除',
                        'up': '上移',
                        'down': '下移',
                        'upToTop': '上移到顶部',
                        'downToBottom': '下移到底部'
                    };
                    $.each(v.value, function (index, value) {
                        var className = 'form-actions form-actions-' + v.language;
                        if (dataType(value) == 'string') {
                            btnsHtml += '<span class="' + className + ' djiui-icon djiui-icon-actions-' + value + '" title="' + character[value] + '">' + character[value] + '</span>';
                        } else if (dataType(value) == 'object') {
                            btnsHtml += '<span class="' + className + ' djiui-icon djiui-icon-actions-' + value.code + '" title="' + value.title + '" code="' + value.code + '">' + value.title + '</span>';
                            if (!_this.handlers[value.code]) {
                                _this.on(value.code, value.fn);
                            }
                        }
                    });
                    v.element.html(btnsHtml);
                }
            }
        },
        /*列表的索引值*/
        indexFn: function () {
            var _this = this;
            $.each(_this.fileIdArr, function (iArr, vArr) {
                $.each(vArr, function (i, v) {
                    if (v.type == 'index') {
                        _this.indexNumber(iArr, v);
                    }
                });
            });
        },
        /*索引值处理*/
        indexNumber: function (iArr, v) {
            var _this = this;
            var newValue = $.extend(true, {}, v);
            //设置当前元素的值
            var reg = /{{(.*?)}}/gi; //正则匹配花括号
            var index = iArr + 1;
            if (reg.test(newValue.value) && newValue.value.match(reg) == '{{index}}') {
                if (newValue.language == 'roman') { //罗马数字
                    index = numberChange.toRoman(index);
                } else if (newValue.language == 'chinese') { //中文数字
                    index = numberChange.toChinese(index);
                }
                newValue.value = newValue.value.replace(reg, index);
            }
            _this.formComplexIndexNB.$element && _this.formComplexIndexNB.setValue(newValue.value);
            v.element.html(newValue.value);
        },
        /*-----------------------联动----------------*/
        /*
         * 维护交互方法列表
         * */
        addAreaEvent: function (handlerEvent) {
            if (!this.handlerEvents) {
                this.handlerEvents = [];
            }
            this.handlerEvents.push(handlerEvent);
        },
        /*
         * 当行创建完成之后，绑定相关的交互方法
         * */
        bindAreaEvent: function (curObj) {
            var _this = this;
            if (!_this.handlerEvents) {
                return;
            }
            if (!curObj) { //不是手动添加的
                for (var j = 0; j < _this.rows.length; j++) {
                    for (var i = 0; i < _this.handlerEvents.length; i++) {
                        _this.linkHandle(i, _this.handlerEvents[i], _this, _this.rows[j]);
                    }
                }
            } else {
                for (var i = 0; i < _this.handlerEvents.length; i++) {
                    _this.linkHandle(i, _this.handlerEvents[i], _this, curObj);
                }
            }
        },
        /*事件改变*/
        change: function (parameter, callback, curObj) {
            var _this = this;
            if (curObj) { //如果是联动的情况
                curObj[parameter].change(callback);
            } else {
                $.each(_this.$fileIds, function (i, v) {
                    v[parameter].change(callback);
                });
            }
        },
        /*条件和参数是否是function处理*/
        functionDeal: function (para, name, defaultValue, curObj) {
            var _this = this;
            if (para) { //当有设置条件时
                if (dataType(para) == 'function') { //如果数据类型是function的情况
                    return para(name, curObj);
                } else if (dataType(para) == 'object' && para.dataType && para.dataType == 'function') {
                    if (para.value && para.value.indexOf('function') != -1 && para.value.indexOf('(') != -1) { //如果当前传入的参数是字符串并且存在function则将字符串转为function
                        para = (new Function('return( ' + para.value + ' );'))();
                        var result;
                        var result2 = para(name, curObj, function (data) {
                            result = data;
                        });
                        return result ? result : result2;
                    } else {
                        if (para.value) {
                            return para.value;
                        } else {
                            return defaultValue;
                        }
                    }
                } else {
                    return para;
                }
            } else { //如果没有条件，则直接返回true
                return defaultValue;
            }
        },
        /*-----------------事件操作----------------*/
        /*操作类型绑定事件*/
        bindEvent: function () {
            var _this = this;
            //添加行
            _this.$field.on('click', '.djiui-icon-actions-add', function (e) {
                //添加行的时候复制该行的数据
                var clone = $.extend(true, [], _this.opts.childrenTbody);
                if ($(this).closest('thead').length > 0) {//头部点击
                    _this.addRowFn(0, clone);
                } else {//内容点击
                    var trIndex = $(this).closest('tr').index();
                    if (_this.opts.maxNum) {
                        if (_this.$tbody.children('tr').length >= _this.opts.maxNum) {
                            new Message().error('添加条数超过限制' + _this.opts.maxNum + '条');
                            return false;
                        }
                    }
                    if ($(this).attr('disable')) return false;
                    _this.updateValue && $.each(clone, function (i, v) {
                        $.each(_this.updateValue, function (index, value) {
                            if (v.name && v.name == value) {
                                clone[i].value = _this.getValue()[trIndex][v.name];
                            }
                        });
                    });
                    _this.addRowFn(trIndex, clone);
                }
                _this.isShowRemoveBtn();
                _this.codeFn(e, $(this));
                return false; //阻止冒泡
            });
            //删除行
            _this.$field.on('click', '.djiui-icon-actions-remove', function (e) {
                var $this = $(this);
                var index = $this.closest('tr').index();
                if ($this.attr('disable')) return false;
                _this.destroy(index); //摧毁对应的的所有
                _this.codeFn(e, $this, {
                    index: index
                });
                return false; //阻止冒泡
            });
            //上移行
            _this.$field.on('click', '.djiui-icon-actions-up', function (e) {
                if ($(this).attr('disable')) return false;
                var $tr = $(this).closest('tr');
                var index = $tr.index(); //当前位置的索引
                if (index != 0) { //不是第一行
                    require(['modules/utils/array_exchange_location'], function (arrayLocation) {
                        arrayLocation.exchange(_this.fileIdArr, index, index - 1);
                        arrayLocation.exchange(_this.$fileIds, index, index - 1);
                        arrayLocation.exchange(_this.validators, index, index - 1);
                        arrayLocation.exchange(_this.tooltip, index, index - 1);
                        $tr.prev().before($tr);
                        _this.indexFn();
                    });
                }
                _this.codeFn(e, $(this));
                return false; //阻止冒泡
            });
            //下移行
            _this.$field.on('click', '.djiui-icon-actions-down', function (e) {
                if ($(this).attr('disable')) return false;
                var $tr = $(this).closest('tr');
                var index = $tr.index(); //当前位置的索引
                if (index != _this.$field.children('tr').length - 1) { //不是最后一行
                    require(['modules/utils/array_exchange_location'], function (arrayLocation) {
                        arrayLocation.exchange(_this.fileIdArr, index, index + 1);
                        arrayLocation.exchange(_this.$fileIds, index, index + 1);
                        arrayLocation.exchange(_this.validators, index, index + 1);
                        arrayLocation.exchange(_this.tooltip, index, index + 1);
                        $tr.next().after($tr);
                        _this.indexFn();
                    });
                }
                _this.codeFn(e, $(this));
                return false; //阻止冒泡
            });
            //上移到顶部
            _this.$field.on('click', '.djiui-icon-actions-upToTop', function (e) {
                if ($(this).attr('disable')) return false;
                var $tr = $(this).closest('tr');
                var index = $tr.index(); //当前位置的索引
                if (index != 0) { //不是第一行
                    require(['modules/utils/array_exchange_location'], function (arrayLocation) {
                        arrayLocation.toFirst(_this.fileIdArr, index);
                        arrayLocation.toFirst(_this.$fileIds, index);
                        arrayLocation.toFirst(_this.validators, index);
                        arrayLocation.toFirst(_this.tooltip, index);
                        _this.$tbody.children('tr').eq(0).before($tr);
                        _this.indexFn();
                    });
                }
                _this.codeFn(e, $(this));
                return false; //阻止冒泡
            });
            //下移到底部
            _this.$field.on('click', '.djiui-icon-actions-downToBottom', function (e) {
                if ($(this).attr('disable')) return false;
                var $tr = $(this).closest('tr');
                var index = $tr.index(); //当前位置的索引
                if (index != _this.$tbody.children('tr').length) { //不是最后一行
                    require(['modules/utils/array_exchange_location'], function (arrayLocation) {
                        arrayLocation.toLast(_this.fileIdArr, index);
                        arrayLocation.toLast(_this.$fileIds, index);
                        arrayLocation.toLast(_this.validators, index);
                        arrayLocation.toLast(_this.tooltip, index);
                        _this.$tbody.children('tr').eq(_this.$tbody.children('tr').length - 1).after($tr);
                        _this.indexFn();
                    });
                }
                _this.codeFn(e, $(this));
                return false; //阻止冒泡
            });
            /*自定义按钮事件*/
            _this.$field.bind('click', function (e) {
                _this.codeFn(e, $(this));
                return false; //阻止冒泡
            });
        },
        /*执行之定义函数*/
        codeFn: function (e, $this, param) {
            var _this = this;
            if ($(e.target).attr('code')) {
                _this.fire($(e.target).attr('code'), $(e.target), $this, param);
            }
        },
        /*----------------------------------对外的方法---------------------*/
        /*设置的数据型的通用方法
         * ([{name:value,name:value}])数组一一对应设置
         * ({name,value},1)，对应行设置
         * */
        setWay1: function (parameter, rowIndex, way) {
            var _this = this;
            if (dataType(parameter) == 'array') { //如果传入的是一个数组，则是设置整个值
                $.each(parameter, function (index, value) {
                    if (index >= _this.fileIdArr.length) {
                        _this.addRowFn(index - 1);
                    }
                    _this.setRowWay1(value, index, way);
                });
            } else if (dataType(parameter) == 'object') { //如果是对象，则需要告诉我设置哪一行的值
                if (rowIndex == undefined) {
                    rowIndex = 0
                }
                ;
                if (rowIndex >= _this.fileIdArr.length) {
                    _this.addRowFn(rowIndex - 1);
                }
                _this.setRowWay1(parameter, rowIndex, way);
            }
            _this.isShowRemoveBtn();
        },
        setRowWay1: function (parameter, rowIndex, way) {
            var _this = this;
            $.each(parameter, function (i, v) { //循环行数据
                if (_this.$fileIds[rowIndex] && _this.$fileIds[rowIndex][i]) {
                    _this.$fileIds[rowIndex][i][way](v);
                }
            });
        },
        /*添加行函数*/
        addRowFn: function (index, children) {
            var _this = this;
            if (_this.plusOnlyOne) { //添加到最后一行
                _this.addRow(_this.$tbody.children('tr').length, children || $.extend(true, [], _this.opts.childrenTbody));
            } else { //点击哪行添加哪行
                _this.addRow(index + 1, children || $.extend(true, [], _this.opts.childrenTbody));
            }
            _this.indexFn();
        },
        /*是否显示删除按钮*/
        isShowRemoveBtn: function () {
            var _this = this;
            if (_this.isDeleteOnlyOne) {//如果是可以删除最后一行的情况
                if (_this.$tbody.children('tr').length < 1) {//如果表格行一行也没有则显示
                    _this.$tbody.html('<tr class="form-complex-noData"><td colspan="' + _this.opts.childrenTbody.length + '">暂无数据</td></tr>');
                    if (_this.opts.childrenThead) {
                        if (_this.$thead.find('.form-actions').length == 0) {
                            var className = 'form-actions form-actions-icon';
                            _this.$thead.find('th').eq(_this.isDeleteOnlyOneIndex).append('<span class="' + className + ' djiui-icon djiui-icon-actions-add" title="添加"  code="add">添加</span>');
                        }
                        _this.$thead.find('.form-actions').show();
                    }
                } else {//超过一行则隐藏
                    if (_this.$tbody.children('tr').hasClass('form-complex-noData') && _this.$tbody.children('tr').length == 1) {
                        _this.$thead.find('.form-actions').show();
                    } else {
                        _this.$thead.find('.form-actions').hide();
                        _this.$tbody.find('.form-complex-noData').remove();
                    }
                }
            } else {
                if (_this.$tbody.children('tr').length > 1) {
                    _this.$tbody.children('tr').children('td').children('.form-complex-actions').find('.djiui-icon-actions-remove').css('display', 'inline-block');
                } else {
                    _this.$tbody.children('tr').children('td').children('.form-complex-actions').find('.djiui-icon-actions-remove').css('display', 'none');
                }
            }
        },
        /*设置只有name型的通用方法
         * ('name1',index)一行中的一个
         * (['name1','name2'],index)一行中的多个
         * (index)一行中的所有有name的字段
         * ()全部
         * parameter，要清除的name,可以是单个name,也可以是数组name
         * rowIndex name的行索引,根据索引去匹配
         * way 要执行的方法
         * */
        setWay2: function (parameter, rowIndex, way, isCheck) {
            var _this = this;
            if (parameter != undefined) { //传值了，一个和多个的情况['name1','name2']
                if (rowIndex == undefined) {
                    rowIndex = 0;
                }
                if (dataType(parameter) == 'string') { //第几行的name
                    return _this.setRowWay2([parameter], rowIndex, way, isCheck);
                } else if (dataType(parameter) == 'array') { //第几行的多个name,如果是多行的多个name只能自己去循环
                    return _this.setRowWay2(parameter, rowIndex, way, isCheck);
                } else if (dataType(parameter) == 'number') { //传入的是一行
                    var nameArr = [];
                    _this.fileIdArr[parameter] && $.each(_this.fileIdArr[parameter], function (i, v) {
                        nameArr.push(v.name);
                    });
                    return _this.setRowWay2(nameArr, parameter, way, isCheck);
                }
            } else { //没有传值，全部执行方法
                var eleArr = [];
                $.each(_this.$fileIds, function (index, value) {
                    $.each(value, function (i, v) {
                        if (i != '$dom') {
                            eleArr.push(v.$element);
                            v[way]();
                        }
                    });
                });
                return eleArr;
            }
        },
        setRowWay2: function (parameter, rowIndex, way, isCheck) {
            var _this = this;
            var eleArr = [];
            $.each(parameter, function (i, v) { //循环行数据
                if (_this.$fileIds[rowIndex][v]) {
                    eleArr.push(_this.$fileIds[rowIndex][v].$element);
                    _this.$fileIds[rowIndex][v][way](isCheck);
                }
            });
            return eleArr;
        },
        /**
         * @description 设置数据方法
         * @param {array|object} parameter - 传入的参数（设置值的数据）
         * @param {string} rowIndex - 行索引(当parameter是object时需要传入rowIndex)
         * @example
         * var formComplex = new FormComplex({配置参数});
         * 设置值方法1：
         *      formComplex.setData(([{name:data,name:data},{name:data,name:data}]));//数组形式，根据索引匹配
         * 设置值方法2：
         *      formComplex.setData({name:data},row);//对象形式，则传你要设置的行的索引即可
         */
        setData: function (parameter, rowIndex) {
            var _this = this;
            //如果有设置数据,并且没有data的情况下，则把数据同步到配置上
            var data;
            if (dataType(parameter) == 'array') {
                data = parameter[parameter.length - 1];
            } else if (dataType(parameter) == 'object') {
                data = parameter;
            }
            data && $.each(data, function (i, v) {
                $.each(_this.opts.childrenTbody, function (iTbody, vTbody) {
                    $.each(vTbody, function (iFiled, vFiled) {
                        if (iFiled == 'name' && vFiled == i) {
                            _this.opts.childrenTbody[iTbody].data = v;
                        }
                    });
                });
            });
            _this.setWay1(parameter, rowIndex, 'setData');
        },
        /**
         * @description 设置值方法
         * @param {array|object} parameter - 传入的参数（设置值的数据）
         * @param {string} rowIndex - 行索引(当parameter是object时需要传入rowIndex)
         * @example
         * var formComplex = new FormComplex({配置参数});
         * 设置值方法1：
         *      formComplex.setValue(([{name:value,name:value},{name:value,name:value}]));//数组形式，根据索引匹配
         * 设置值方法2：
         *      formComplex.setValue({name:value},row);//对象形式，则传你要设置的行的索引即可
         */
        setValue: function (parameter, rowIndex) {
            var _this = this;
            _this.setWay1(parameter, rowIndex, 'setValue');
        },
        /*设置旧值，会在对应的元素加一个属性oldValue
         *  ([{name:value,name:value},{name:value,name:value}])数组形式，根据索引匹配
         *  ({name:value},row)对象形式，则传你要设置的行的索引即可
         * */
        setOldValue: function (parameter, rowIndex) {
            var _this = this;
            _this.setWay1(parameter, rowIndex, 'setOldValue');
        },
        /*设置默认值
         *  ([{name:value,name:value},{name:value,name:value}])数组形式，根据索引匹配
         *  ({name:value},row)对象形式，则传你要设置的行的索引即可
         * */
        setDefaultValue: function (parameter, rowIndex) {
            var _this = this;
            _this.setWay1(parameter, rowIndex, 'setDefaultValue');
        },
        /**
         * @description 获取值
         * @param {requestCallback} [callback] -回调函数
         * @return {array} 当前的数据
         * @example
         * var formComplex = new FormComplex({配置参数});
         * 获取值方法1：
         *      formComplex.getValue(function(value){
         *          //value则为当前值
         *      });//返回值为回调函数执行结果
         * 获取值方法2：
         *      formComplex.getValue();//返回的是以表格为维度，行为一个对象的形式返回值
         */
        getValue: function (callback, isTemplate) {
            var _this = this;
            var result = [];
            $.each(_this.$fileIds, function (index, value) { //这个循环出来的是一行的数据
                result[index] = {};
                $.each(value, function (i, v) {
                    if (i != '$dom') {
                        result[index][i] = _this.$fileIds[index][i].getValue('', isTemplate);
                    }
                });
            });
            if (result.length == 0) {//如果当前没有数据的话，则返回一个空的字符串
                result = '';
            }
            if (_this.opts.valueIsArray) {//value得到的是一个数组

            } else {
                if (!_this.dataTypeIsArray) { //如果当前有添加的操作，则是数组形式传出，如果不是拿对象
                    result = result && result[0];
                }
            }
            if (callback) {
                return callback(result);
            } else {
                return result;
            }
        },
        /**
         * @description 重置
         * @param {string/array} [parameter] -要重置的name,可以是单个name,也可以是数组name
         * @param {string} [rowIndex] -name的行索引,根据索引去匹配
         * @example
         * var formComplex = new FormComplex({配置参数});
         * formComplex.reset('name1',index);//一行中的一个
         * formComplex.reset(['name1','name2'],index);//一行中的多个
         * formComplex.reset(index);//一行中的所有有name的字段
         * formComplex.reset();//全部
         */
        reset: function (parameter, rowIndex) {
            var _this = this;
            _this.setWay2(parameter, rowIndex, 'reset');
        },
        /**
         * @description 清除
         * @param {string/array} [parameter] -要清除的name,可以是单个name,也可以是数组name
         * @param {string} [rowIndex] -name的行索引,根据索引去匹配
         * @param {boolean} [isCheck] -是否触发校验
         * @example
         * var formComplex = new FormComplex({配置参数});
         * formComplex.clear('name1',index);//一行中的一个
         * formComplex.clear(['name1','name2'],index);//一行中的多个
         * formComplex.clear(index);//一行中的所有有name的字段
         * formComplex.clear();//全部
         */
        clear: function (parameter, rowIndex, isCheck) {
            var _this = this;
            _this.setWay2(parameter, rowIndex, 'clear', isCheck);
        },
        /**
         * @description 摧毁
         * @param {string/array} [parameter] -要摧毁的name,可以是单个name,也可以是数组name
         * @param {string} [rowIndex] -name的行索引,根据索引去匹配
         * @example
         * var formComplex = new FormComplex({配置参数});
         * formComplex.destroy('name1',index);//一行中的一个
         * formComplex.destroy(['name1','name2'],index);//一行中的多个
         * formComplex.destroy(index);//一行中的所有有name的字段
         * formComplex.destroy();//全部
         */
        destroy: function (parameter, rowIndex) {
            var _this = this;
            _this.setWay2(parameter, rowIndex, 'destroy');
            if (dataType(parameter) == 'number') {
                _this.$tbody.children('tr').eq(parameter).remove();
                _this.fileIdArr.splice(parameter, 1); //删除行数据
                _this.$fileIds.splice(parameter, 1); //删除行数据
                _this.validators.splice(parameter, 1); //删除行数据
                _this.tooltip.splice(parameter, 1); //删除行数据
            }
            (parameter == undefined) && (_this.$field.remove());
            _this.indexFn();
            _this.isShowRemoveBtn();
        },
        /**
         * @description 显示
         * @param {string/array} [parameter] -要显示的name,可以是单个name,也可以是数组name
         * @param {string} [rowIndex] -name的行索引,根据索引去匹配
         * @example
         * var formComplex = new FormComplex({配置参数});
         * formComplex.show('name1',index);//一行中的一个
         * formComplex.show(['name1','name2'],index);//一行中的多个
         * formComplex.show(index);//一行中的所有有name的字段
         * formComplex.show();//全部
         */
        show: function (parameter, rowIndex) {
            var _this = this;
            var eleArr = _this.setWay2(parameter, rowIndex, 'show');
            dataType(parameter) == 'number' && (_this.$tbody.children('tr').eq(parameter).show());
            if (parameter == undefined) {
                _this.$field.show();
                _this.$tbody.children('tr').show();
            }
            $.each(eleArr, function (i, v) {
                v.removeAttr('isHide');
                if(_this.opts.type=='tableParaConfig'){
                    v.closest('td').show();
                }
            });
        },
        /**
         * @description 隐藏（隐藏的元素不能获取值）
         * @param {string/array} [parameter] -要隐藏的name,可以是单个name,也可以是数组name
         * @param {string} [rowIndex] -name的行索引,根据索引去匹配
         * @example
         * var formComplex = new FormComplex({配置参数});
         * formComplex.hide('name1',index);//一行中的一个
         * formComplex.hide(['name1','name2'],index);//一行中的多个
         * formComplex.hide(index);//一行中的所有有name的字段
         * formComplex.hide();//全部
         */
        hide: function (parameter, rowIndex) {
            var _this = this;
            var eleArr = _this.setWay2(parameter, rowIndex, 'hide');
            dataType(parameter) == 'number' && (_this.$tbody.children('tr').eq(parameter).hide());
            parameter == undefined && (_this.$field.hide());
            $.each(eleArr, function (i, v) {
                v.attr('isHide', true);
                if(_this.opts.type=='tableParaConfig'){//由于usp坏了，不能全部tdhide
                    v.closest('td').hide();
                }
            });
        },
        /**
         * @description 禁用
         * @param {string/array} [parameter] -要禁用的name,可以是单个name,也可以是数组name
         * @param {string} [rowIndex] -name的行索引,根据索引去匹配
         * @example
         * var formComplex = new FormComplex({配置参数});
         * formComplex.disable('name1',index);//一行中的一个
         * formComplex.disable(['name1','name2'],index);//一行中的多个
         * formComplex.disable(index);//一行中的所有有name的字段
         * formComplex.disable();//全部
         */
        disable: function (parameter, rowIndex) {
            var _this = this;
            _this.setWay2(parameter, rowIndex, 'disable');
            dataType(parameter) == 'number' && (_this.$tbody.children('tr').find('.form-actions').attr('disable', 'disable').css('cursor', 'no-drop'));
            if (parameter == undefined) { //整体禁用的时候把按钮同时禁用
                _this.opts.disabled = true;
                _this.$tbody.children('tr').find('.form-actions').attr('disable', 'disable').css('cursor', 'no-drop');
            }
        },
        /**
         * @description 启用
         * @param {string/array} [parameter] -要启用的name,可以是单个name,也可以是数组name
         * @param {string} [rowIndex] -name的行索引,根据索引去匹配
         * @example
         * var formComplex = new FormComplex({配置参数});
         * formComplex.enable('name1',index);//一行中的一个
         * formComplex.enable(['name1','name2'],index);//一行中的多个
         * formComplex.enable(index);//一行中的所有有name的字段
         * formComplex.enable();//全部
         */
        enable: function (parameter, rowIndex) {
            var _this = this;
            _this.opts.disabled = false;
            _this.setWay2(parameter, rowIndex, 'enable');
            dataType(parameter) == 'number' && (_this.$tbody.children('tr').find('.form-actions').removeAttr('disable').css('cursor', 'pointer'));
            if (parameter == undefined) { //整体启用的时候把按钮同时启用
                _this.$tbody.children('tr').find('.form-actions').removeAttr('disable').css('cursor', 'pointer');
            }
        },
        /**
         * @description 是否必填：根据是否必填，显示前面的必填标志
         * @param {boolean} isRequired -是否必填
         * @example
         * var formComplex = new FormComplex({配置参数});
         * formComplex.required(false);
         */
        required: function (isRequired) {
            var _this = this;
            if (dataType(isRequired) == 'boolean') { //必填
                _this.$required && _this.$required.remove();
                if (isRequired) {
                    var str = '<span class="form-required">*</span>';
                    _this.$required = $(str);
                    _this.$title.before(_this.$required);
                    _this.requiredLocationFn(isRequired);
                }
            }
        },
        /*校验*/
        verify: function (parameter, rowIndex) {
            var _this = this;
            var result = [];
            var checkResult = true;
            if (parameter) {
                result.push(_this.verifyOne(parameter, rowIndex, _this));
            } else {
                result.push(_this.verifyArr(_this.validators), _this);
            }
            $.each(result, function (i, v) {
                if (v == false) {
                    checkResult = false;
                }
            });
            return checkResult;
        },
        verifyArr: function (validators, _this) {
            var _this = this;
            var result = [];
            var checkResult = true;
            $.each(validators, function (index, value) {
                $.each(value, function (i, v) {
                    if (dataType(v) == 'array') { //字段类型有数据的情况下
                        result.push(_this.verifyOne(i, index, _this));
                    } else { //再次复合
                        if (_this.$fileIds[index][i].fileIdArr) {
                            result.push(_this.$fileIds[index][i].verifyArr(_this.$fileIds[index][i].validators, _this.$fileIds[index][i]));
                        }
                    }
                });
            });
            $.each(result, function (i, v) {
                if (v == false) {
                    checkResult = false;
                }
            });
            return checkResult;
        },
        verifyOne: function (i, index, _this) {
            if (!_this.tooltip[index]) {
                _this.tooltip[index] = {};
            }
            var check = {
                byteChinese: _this.opts.byteChinese, //中文一个字符占几个字节,默认为一个字符占1个字节
                isCheckRemote: true, //如果是校验全部，不走远端校验,单个校验走远端校验
                verify: []
            };
            if (_this.fileIdArr[index]) {
                var $currentElement = _this.fileIdArr[index][i].element.find('.form-field-element');
                var resultValue;
                if (dataType(_this.getValue()) == 'array') {
                    resultValue = _this.getValue()[index][i];
                } else {
                    resultValue = _this.getValue()[i];
                }
                resultValue = _this.getVerifyValue(_this.fileIdArr[index][i], resultValue);
                check.verify.push({
                    name: i, //需要校验的元素的name,可以通过表单的getValue来作为值判断,必填
                    element: $currentElement,
                    validators: _this.fileIdArr[index][i].validators, //校验规则数组，必填
                    byteChinese: _this.fileIdArr[index][i].byteChinese ?
                            _this.fileIdArr[index][i].byteChinese : _this.opts.byteChinese, //中文一个字符占几个字节,默认为一个字符占1个字节
                    value: resultValue, //需要校验的值,如果没有配置就是name对应的值
                    isCheck: $currentElement.attr('isHide') ? false : true, //如果是隐藏状态则不执行校验
                    isCheckRemote: $currentElement.attr('oldvalue') == resultValue ? false : true
                });
                return _this.check(check, index);
            }
        },
        /*根据类型拿到不同的值*/
        getVerifyValue: function (v, value) {
            var _this = this;
            var currentValue = '';
            if (v.type == 'date' || v.type == 'date2') {
                currentValue = value.startTime
                        ? value.endTime
                        ? value.startTime + ((v.menu && v.menu.separator) ? v.menu.separator : ' ~ ') + value.endTime
                        : value.startTime
                        : '';
            } else {
                currentValue = value;
            }
            return currentValue;
        },
        /*校验提示*/
        check: function (check, index) {
            var _this = this;
            //执行校验
            var checkInstance = new FormVerify(check);
            //将校验结果对应的提示
            $.each(checkInstance.result, function (i, v) {
                _this.tooltip[index][i] && _this.tooltip[index][i].destroy(); //不管是成功还是失败，都把上次校验的提示清除掉
                var $currentElement = _this.fileIdArr[index][i].element.find('.form-field-element');
                if (v.resultStatus == 'error') { //校验失败
                    if (_this.opts.checkTipType == 'tooltip') {
                        _this.tooltip[index][i] = new Tooltip({
                            element: $currentElement.parent(), //气泡元素
                            message: v.resultMsg, //气泡提示文字
                            shape: _this.opts.checkTipShape, //气泡的形状：solid(实心)/hollow(空心)
                            direction: _this.opts.checkTipDirection, //气泡的方向：top/bottom/left/right
                            status: v.resultStatus, //气泡的颜色状态：default/success/error/wraning/primary/info
                            location: _this.opts.checkTipLocation //气泡的位置：(上下气泡)left/center/right,（左右气泡）top/middle/bottom
                        });
                        if (_this.opts.checkType == 'all') { //如果选择的是整体校验模式, //如果是一个一个验证则没有交互动作
                            if (_this.opts.isSetRowLineHeight != true) { //如果设置了行高模式,则在行上加了class，默认是鼠标移入显示当前，隐藏其他
                                (_this.verifyBindEvent($currentElement, _this.tooltip[index][i].$tooltip)); //当是全部校验，不是一个一个校验的时候增加一种交互
                            }
                        }
                    } else {
                        new Message({
                            duration: _this.opts.checkTipTime
                        })[v.resultStatus](v.resultMsg);
                    }
                    _this.opts.isTipBorder && $currentElement.addClass('form-verify-tip'); //是否提示边框
                    if (_this.opts.checkType == 'oneByOne') return false; //单个提示
                } else { //校验成功
                    _this.opts.isTipBorder && $currentElement.removeClass('form-verify-tip'); //如果设置了边框提示，校验成功的时候则删除掉边框
                }
            });
            if (checkInstance.errorNum() == 0) {
                return true;
            } else {
                return false;
            }
        },
        /*校验绑定一些交互事件*/
        verifyBindEvent: function ($ele, $tooltip) {
            var _this = this;
            $ele.on('mouseenter', function () {
                _this.$tbody.find('.tooltip').fadeOut();
                $tooltip.stop().fadeIn();
            });
            $ele.on('mouseleave', function () {
                $tooltip.stop().fadeOut();
            });
        }
    };
    return FormBase.extend(FormComplexBase);
});