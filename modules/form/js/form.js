/**
 * 表单组件
 * @module form
 */
require.config({
    paths: {
        'cssFile': 'modules/libs/rq/css.min'
    }
});
define([
    'modules/utils/true_or_false',//判断结果值是true还是false的工具方法
    'modules/utils/data_type',//数据类型判断的工具方法
    'modules/form_base/js/form_base',//基础文件

    'modules/form_verify/js/form_verify',//校验组件
    'modules/tooltip/js/tooltip',//气泡型提示组件
    'modules/message/js/message',//顶部滑动式提示组件

    'modules/form_field_plainText/js/form_field_plainText',//纯文本
    'modules/form_field_text/js/form_field_text',//文本框
    'modules/form_field_select/js/form_field_select',//选择
    'modules/form_field_date/js/form_field_date',//时间
    'modules/form_field_radio/js/form_field_radio',//单选
    'modules/form_field_checkbox/js/form_field_checkbox',//复选

    'modules/form_complex_paraConfig/js/form_complex_paraConfig',//添加行配置0
    'modules/form_complex_table_paraConfig/js/form_complex_table_paraConfig',//表格配置0
    'modules/form_complex_block_paraConfig/js/form_complex_block_paraConfig',//块配置0
        
    'modules/form_field_manifest/js/form_field_manifest',//标签
    'modules/form_field_upload/js/form_field_upload',//文件上传
    'modules/form_field_um/js/form_field_um',//富文本编辑
    'modules/form_field_city_selector/js/form_field_city_selector',//城市选择
    'cssFile!modules/form/css/form'//表单样式
], function(trueOrFalse, dataType, FormBase,
    FormVerify,Tooltip,Message,
    FormFieldPlainText, FormFieldText,
    FormFieldSelect, FormFieldDate,
    FormFieldRadio, FormFieldCheckbox,
    FormParaConfig,FormComplexTableParaConfig,FormComplexBlockParaConfig,
    FormFieldManifest,FormFieldUpload,FormFieldUm,FormFieldCity) {
    /**
     * @class
     * @classdesc 表单组件：这是一个自动生成表单组件，是一个集合组件，子组件包括（单选框，多选框，输入框，文本框，文件上传，多值标签，下拉选择框，时间选择框以及表格形式组件等）。
     * @alias Form
     * @author kt
     * @since 2017-7-25
     *
     * @param {object} opts - 配置参数
     * @param {dom|string} opts.element - 当前需要生成表单的元素
     * @param {string} [opts.mode="1"] -  模式，是新建1还是编辑2，默认为新建1
     * @param {string} [opts.name=""] -  唯一标识<b style="color:red;">(表单字段所有的name不可以重复，并且字段的name是必填的)</b>
     * @param {string} [opts.className=""] -  可以为当前表单添加class
     * @param {object} [opts.style={}] - 表单设置样式
     * @param {string} [opts.title=""] -  标题
     * @param {object} [opts.titleStyle={}] - 标题样式设置
     * @param {object} [opts.contentStyle={}] - 内容样式设置
     * @param {string} [opts.getValueKey=''] - 获取值时想要的数据形式是要idFlag,还是要nameFlag,还是要整体,默认是拿到整体,暂时不要了，现在统一为对象形式传递
     * @param {string} [opts.idFlag='id'] - 数据的key值
     * @param {string} [opts.nameFlag='name'] - 数据的key值
     * @param {array} [opts.children=null] - 孩子（块，行，以及子组件类型）
     * @param {object} [opts.btn={}] - 按钮区域
     * @param {string} [opts.btn.layout='bottom-center'] - 按钮的布局位置
     * @param {array} [opts.btn.children=null] - 按钮的配置,每个数组里面是一个对象<br/>
     *      opts.btn.children=[{<br/>
     *       type:'',// 按钮的类型，其实就是颜色和款式default,disabled,djourney-active,link,warning,danger,info,primary<br/>
     *       value:'',//按钮的文字<br/>
     *       className:''//按钮添加的class<br/>
     *      }]
     * @param {string} [opts.byteChinese='1'] - 中文一个字符占几个字节,默认为一个字符占1个字节
     * @param {string} [opts.checkType='all'] - 单个校验还是整体校验：all/oneByOne,all整体校验是全部提示规则都出来，oneByOne一个一个校验是单个校验完了再校验下一个
     * @param {boolean} [opts.isChangeCheck=true] - 值改变的时候是否执行校验
     * @param {string} [opts.checkTipType='tooltip'] - 校验提示类型,message/tooltip
     * @param {boolean} [opts.isTipBorder=true] - 是否校验元素需要红框提示,两种提示都可以设置
     * @param {boolean} [opts.isSetRowLineHeight=false] - 使用气泡提示时，是整体校验的情况下，提示会遮挡输入框的情况，可以设置行高，默认是不设置，鼠标移入显示当前提示，移除其他提示
     * @param {string} [opts.checkTipShape='hollow'] - 气泡提示形状
     * @param {string} [opts.checkTipDirection='top'] - 气泡提示方向
     * @param {string} [opts.checkTipLocation='left'] - 气泡提示位置
     * @param {string} [opts.checkTipTime='2'] - 消息提示显示时间
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    var Form=function(){};
    Form.prototype = {
        /*初始化*/
        init: function(opts) {
            var _this = this;
            _this.fileIdArr = {}; //表单的字段的参数数组存储,每次进来都要清空
            _this.fileIdIndex = 0; //表单的字段的索引,每次进来都要清空,为了添加字段的时候，能够找到字段的位置
            _this.$fileIds = {}; //存储表单里面的字段，后面可以根据这个存储的字段通过name找到对应的字段进行操作
            _this.validators={};//校验规则存储（1）
            _this.tooltip={};//提示存储，为了再次校验的时候清空
            _this.hideNameArr=[];//存储行和块默认隐藏的name
            _this.parameterSetting(opts);//参数设置
            _this.createForm();//创建表单
            _this.elementSetting();//元素设置
            _this.styleSetting();//样式设置
            _this.createBtnHtml();//创建按钮区域
            _this.createFieldFn();//创建字段
            _this.rowStyle();//行样式设置，每行的行标题等宽
            _this.handlerEventFn();
            _this.hide(_this.hideNameArr);//处理默认隐藏的块和行
        },
        /*参数设置*/
        parameterSetting: function(opts) {
            var _this = this;
            if (!opts) opts = {};
            opts = $.extend(true, {
                element: '', //当前需要生成表单的元素
                mode: '1', //模式，是新建1还是编辑2，默认为新建1
                name: '', //唯一标识
                className: '', //可以为当前表单添加class
                style: {}, //设置样式
                title: '', //标题
                titleStyle: {},//标题样式设置
                contentStyle: {}, //内容样式
                getValueKey:'',//获取值时想要的数据形式是要idFlag,还是要nameFlag,还是要整体,默认是拿到整体
                idFlag: 'id',//数据的key值
                nameFlag: 'name',//数据的key值
                children: null ,//孩子（块，行，以及子组件类型）
                btn:{//按钮区域
                    layout:'bottom-center',//按钮的布局位置
                    children: null//按钮的个数配置
                },
                //校验配置（2）
                byteChinese:'1',//中文一个字符占几个字节,默认为一个字符占1个字节
                checkType:'all',//单个校验还是整体校验：all/oneByOne,all整体校验是全部提示规则都出来，oneByOne一个一个校验是单个校验完了再校验下一个
                isChangeCheck:true,//值改变的时候是否执行校验
                //提示
                checkTipType:'tooltip',//校验提示类型,message/tooltip
                isTipBorder:true,//是否校验元素需要红框提示,两种提示都可以设置
                isSetRowLineHeight:false,//使用气泡提示时，是整体校验的情况下，提示会遮挡输入框的情况，可以设置行高，默认是不设置，鼠标移入显示当前提示，移除其他提示
                checkTipShape:'hollow',//气泡提示形状
                checkTipDirection:'top',//气泡提示方向
                checkTipLocation:'left',//气泡提示位置
                checkTipTime:'2',//消息提示显示时间
                checkTipTop:'24px'
            }, opts);
            _this.opts = opts;
            //element处理
            if(dataType(_this.opts.element)=='string'){
                _this.opts.element=$(_this.opts.element);
            }
        },
        /*创建表单*/
        createForm: function() {
            var _this = this;
            _this.opts.element
            .html((_this.opts.title ? ('<h2 class="form-list-title">' + _this.opts.title + '</h2>') : '') +
                    '<div class="form-list-content">' + _this.createChildren(_this.opts.children) + '</div>' )
            .addClass('form-list ' +_this.opts.className)
            .attr('name',_this.opts.name);
        },
        /*创建children*/
        createChildren: function(children) {
            var _this = this;
            var html = '';
            $.each(children, function(i, v) {
                if(v.type=='block' || v.type=='row'){//行或者块，其他的就是子组件里面的类型
                    var className = v.className ? ' ' + v.className : ''; //添加的私有class
                    var nameTag = v.name ? ' name=' + v.name : ''; //是否有name
                    if (v.type == 'block') {//块类型的布局
                        var layoutClass = ((v.layout == 'left-right') ? ' form-block-leftRight' : ' form-block-upDown'); //默认上下结构
                        var headHtml = (v.title ? ('<h2 class="form-block-title">' + v.title + '</h2>') : '');
                        html += '<div class="form-block' + layoutClass  + className + '"' + nameTag + '>'+headHtml+
                                    '<div class="form-' + v.type + '-content">' + (v.children ? _this.createChildren(v.children) : '') + '</div>'+
                                '</div>';
                    } else if (v.type == 'row') {//行类型的布局
                        var lineH=_this.opts.isSetRowLineHeight==true?' form-row-verify':''; //校验配置（3）
                        var layoutClass = ((v.layout == 'up-down') ? ' form-row-upDown' : ' form-row-leftRight'); //默认左右结构
                        var headHtml = (v.isShowRequired || v.title) ? '<div class="form-row-head">' + (trueOrFalse(v.isShowRequired) ? '<span class="form-required">*</span>' : '') + (v.title ? ('<span class="form-row-title">' + v.title + '</span>') : '') + '</div>' : '';
                        var requiredClass = (v.requiredLocation == 'after') ? ' form-row-required-after' : ''; //默认必填在前面
                        html += '<div class="form-clear form-row' +lineH+ layoutClass + requiredClass + className + '" ' + nameTag + '>'+ headHtml +
                                    '<div class="form-' + v.type + '-content">'+
                                        (v.children ? _this.createChildren(v.children) : '') +
                                        (v.tip?'<p class="form-tip">'+v.tip+'</p>':'')+
                                    '</div>'+
                                '</div>';
                        if (v.requiredLocation == 'after') { //如果行数据配置了必填标志在后面的处理,将isRequiredAfter改为true
                            _this.isRequiredAfter = true;
                        }
                    }
                    if(v.isHide && v.name){
                        _this.hideNameArr.push(v.name);
                    }
                }
                else {
                    html += '<div class="form-children"></div>';
                    v.fileIdIndex = _this.fileIdIndex;//孩子加上索引
                    _this.fileIdArr[v.name]=v;//把所有孩子放入数组
                    _this.fileIdIndex++;
                }
            });
            return html;
        },
        /*元素设置*/
        elementSetting: function() {
            var _this = this;
            _this.$form = _this.opts.element;//表单元素
            _this.$title= _this.$form.find('.form-list-title');//表单的头部
            _this.$content= _this.$form.find('.form-list-content');//表单的内容
        },
        /*样式设置*/
        styleSetting: function() {
            var _this = this;
            _this.opts.style &&  _this.$form.css(_this.opts.style);
            _this.opts.titleStyle && _this.$title.css(_this.opts.titleStyle);
            _this.opts.contentStyle && _this.$content.css(_this.opts.contentStyle);
        },
        /*创建按钮区域*/
        createBtnHtml: function() {
            var _this = this;
            var btnsHtml = '';
            var pos1 = 'bottom';//按钮区域的上下位置，默认在下面
            var pos2 = 'center';//按钮区域的居左，居中还是居右，默认是居中
            if (_this.opts.btn.children) {
                var arr = _this.opts.btn.layout.split('-');//因为按钮的位置在一个上面配置的，所以需要分割
                function pos(val) {
                    if (val == 'top') {
                        pos1 = 'top';
                    } else if (val == 'bottom') {
                        pos1 = 'bottom'
                    } else if (val == 'left') {
                        pos2 = 'left';
                    } else if (val == 'right') {
                        pos2 = 'right';
                    } else if (val == 'center') {
                        pos2 = 'center';
                    }
                }
                pos(arr[0]);
                arr[1] && pos(arr[1]);
                var btnHtml = ''
                $.each(_this.opts.btn.children, function(i, v) {
                    btnHtml += '<button code="'+(v.code?v.code:'')+'" class="form-btn ' + (v.type ? 'btn-' + v.type : '') + ' ' + (v.className?v.className:'') + '">' + v.value + '</button>';
                });
                btnsHtml = '<div class="form-list-btn ' + ('btns-' + pos2) + '">' + btnHtml + '</div>';
            }
            if (pos1 == 'top') {
                _this.$content.before(btnsHtml);
            } else if (pos1 == 'bottom') {
                _this.$content.after(btnsHtml);
            }
        },
        /*行标志的位置是否在后面，默认是在前面的，所以为false*/
        isRequiredAfter: false,
        /*创建表单的所有字段*/
        createFieldFn: function() {
            var _this = this;
            $.each(_this.fileIdArr, function(i, v) {
                v.element = _this.opts.element.find('.form-children').eq(v.fileIdIndex);
                _this.createFieldSingle(v);
            });
        },
        /*根据类型创建单个字段*/
        createFieldSingle: function(v) {
            var _this = this;
            _this.validators[v.name]=v.validators//校验规则存储（4）
            //只有当你设置有改变执行校验的时候才去设置下面的函数，默认是有的
            //把校验执行放在函数里传到各个字段里去，在值改变的时候去执行
            //复合类型需要再次传递
            _this.opts.isChangeCheck && (v.formValidatorsCallback=function(){
                _this.verify(v.name);
            });
            var objType={
                'text':FormFieldText,
                'password':FormFieldText,
                'textarea':FormFieldText,
                'hidden':FormFieldText,
                'textareaAuto':FormFieldText,
                'plainText':FormFieldPlainText,
                'single':FormFieldSelect,
                'singleSearch':FormFieldSelect,
                'multiple':FormFieldSelect,
                'multipleSearch':FormFieldSelect,
                'date':FormFieldDate,
                'date2':FormFieldDate,
                'radio':FormFieldRadio,
                'checkbox':FormFieldCheckbox,
                'manifest':FormFieldManifest,
                'upload':FormFieldUpload,
                'umEditor':FormFieldUm,
                'city':FormFieldCity,
                'paraConfig':FormParaConfig,
                'tableParaConfig':FormComplexTableParaConfig,
                'blockParaConfig':FormComplexBlockParaConfig
            };
            //根据类型去创建不同的字段
            if(objType[v.type]){
                _this.$fileIds[v.name] =new objType[v.type](v);
            }
        },
        /*对行进行样式处理*/
        rowStyle: function() {
            var _this = this;
            var $rowHead = _this.$form.find('.form-row-leftRight .form-row-head');//行左右结构的头部
            var $rowTitle = _this.$form.find('.form-row-leftRight .form-row-title');//行左右结果的标题
            var $rowCon = _this.$form.find('.form-row-leftRight .form-row-content');//行左右结构的内容
            var $rowHead2 = _this.$form.find('.form-row-upDown .form-row-head');//行上下结构的头部
            var $rowTitle2 = _this.$form.find('.form-row-upDown .form-row-title');//行上下结构的标题
            var $rowCon2 = _this.$form.find('.form-row-upDown .form-row-content');//行上下结构的内容
            var $rowRequired = _this.$form.find('.form-row-leftRight .form-row-head>.form-required');//行的必填标志
            //标题
            var maxHeadWidth = 0;
            $rowHead.each(function() {//循环所有的左右结构的头部，取头部的最大宽度
                if (maxHeadWidth < $(this).width()) {
                    maxHeadWidth = $(this).width()+1;//加1是因为很多时候宽度有的时候为小数，会造成折行
                }
            });
            $rowHead.css({ //取行的标题最大宽度，设为所有标题的宽度
                'width': maxHeadWidth
            });
            //必填标志
            var requiredWidth = $rowRequired.length > 0 ? ($rowRequired.outerWidth()+1) : 0;//必填标志的宽度
            //内容
            var maxConWidth = 0;
            if (_this.isRequiredAfter) {//如果有必填标志在后面的情况下，内容宽度是（100%-头部最大宽度-必填标志宽度）
                maxConWidth = maxHeadWidth + requiredWidth; //必填标志在前，左右结构的内容宽度就是整体减去标题的宽度和必填标志的宽度
                $rowCon2.css({ //如果标题在后，上下结构内容的宽度还得减去必填标志的宽度
                    'width': 'calc(100% - ' + (requiredWidth) + 'px)'
                });
            } else {
                maxConWidth = maxHeadWidth; //必填标志在前，左右结构的内容宽度就是整体减去标题的宽度
            }
            $rowHead.each(function() {//循环所有的左右结构的头部，取头部的最大宽度
                $(this).next().css({ //左右结构的内容宽度设置
                    'width': 'calc(100% - ' + (maxConWidth ) + 'px)'
                });
            });
        },
        /*联动功能*/
        handlerEventFn:function(){
            var _this = this;
            var areaFields={};
            _this.opts.handlerEvent && $.each(_this.opts.handlerEvent,function(i,v){
                if(v.event=='change'){//change值改变时触发
                    if(v.name.indexOf(".")<0) {//一级组件下的联动
                        _this.linkHandle(i,v,_this);
                    }else{
                        var keys=v.name.split(".");//keys 层级转成数组
                        var objKey=keys[0];//把第一层的key取出来
                        v.name=keys.slice(1).join(".");//把剩下的key联合起来
                        var obj=_this.$fileIds[objKey];//事件的key重新赋值，指向下层
                        obj.addAreaEvent(v);//loopblock table等实现事件绑定方法，为默认生成的所有dom进行事件处理
                        areaFields[objKey]=obj;//把当前的子组件的对象进行存储
                    }
                }else{
                    //console.log('其他功能还没有开发呢。');
                }
            });
            for(var key in areaFields){
                areaFields[key].bindAreaEvent();
            }
        },
        /*事件改变*/
        change:function(parameter,callback){
            var _this = this;
            _this.$fileIds[parameter].change(callback);
        },
        /*条件和参数是否是function处理*/
        functionDeal:function(para,name,defaultValue ){
            var _this = this;
            if(para){//当有设置条件时
                if(dataType(para)=='function'){//如果数据类型是function的情况
                    return para(name,_this);
                }else if(dataType(para)=='object' && para.dataType && para.dataType=='function'){
                    if(para.value && para.value.indexOf('function')!=-1&& para.value.indexOf('(')!=-1){//如果当前传入的参数是字符串并且存在function则将字符串转为function
                        para=(new Function('return( ' + para.value + ' );'))();
                        var result;
                        var result2=para(name,_this,function(data){
                            result=data;
                        });
                        return result?result:result2;
                    }else{
                        if(para.value){
                            return para.value;
                        }else{
                            return defaultValue;
                        }
                    }
                }else{
                    return para;
                }
            }else{//如果没有条件，则直接返回true
                return defaultValue;
            }
        },
        /*---------------------------对外的方法-----------------------------*/
        /*公共方法*/
        setWay:function(parameter,way,isCheck){
            var _this = this;
            if (parameter) {
                if (dataType(parameter) == 'string') {//如果传入的是单个name,那么就禁用这一个
                    _this.$fileIds[parameter] && _this.$fileIds[parameter][way](isCheck);
                } else if (dataType(parameter) == 'array') {//如果传入的是数组，则循坏去禁用
                    $.each(parameter, function(i, v) {
                        if(dataType(v) == 'string'){//如果是字符串直接禁用
                            _this.$fileIds[v] && _this.$fileIds[v][way](isCheck);
                        }else if(dataType(v) == 'object'){//如果是对象设置的即使复合类型的禁用
                            _this.$fileIds[v.childrenName] && _this.$fileIds[v.childrenName][way](v.rowName,v.rowIndex,isCheck);
                        }
                    });
                }else if(dataType(parameter) == 'object'){//如果是对象设置的即使复合类型的禁用
                    _this.$fileIds[parameter.childrenName] && _this.$fileIds[parameter.childrenName][way](parameter.rowName,parameter.rowIndex,isCheck);
                }
            } else {//如果什么都没有传入，则全部禁用
                $.each(_this.fileIdArr, function(i, v) {
                    _this.$fileIds[i] && _this.$fileIds[i][way](isCheck);
                });
            }
        },
        /**
         * @description 设置数据方法
         * @param {object} {name:data,name:data} {'需要设置数据的字段name':'需要设置的数据'}
         * @since 2013-08-04
         * @example
         * var form = new Form(配置);
         * form.setData({
         *      name1:[//key值就是对应字段设置的name值
         *          {id:'1',name:'显示文本1'},
         *          {id:'2',name:'显示文本2'},
         *      ],
         *      name2:[
         *          {id:'1',name:'显示文本1'},
         *          {id:'2',name:'显示文本2'},
         *      ]
         * });
         * form.setData({
         *      name1:[//key值就是对应字段设置的name值
         *          {id:'1',name:'显示文本1'},
         *          {id:'2',name:'显示文本2'},
         *      ],
         *      name2:[
         *          {id:'1',name:'显示文本1'},
         *          {id:'2',name:'显示文本2'},
         *      ]
         * },index);//设置复合类型
         */
        setData: function(parameter,rowIndex) {
            var _this = this;
            _this.dealType('object', parameter, function(data) {
                $.each(data, function(i, v) {
                    _this.$fileIds[i] && _this.$fileIds[i].setData(v,rowIndex);
                });
            });
        },
        /**
         * @description 设置值
         * 如果当前是编辑模式，则会给字段增加一个属性，避免校验的时候查重
         * @param {object} {name:value,name:value} {'需要设置值的字段name':'需要设置的值'}
         * @example
         * var form = new Form({配置参数});
         * form.setValue({name:value,name:value});//设置符合类型
         */
        setValue: function(parameter,rowIndex) {
            var _this = this;
            _this.dealType('object', parameter, function(data) {
                $.each(data, function(i, v) {
                    _this.$fileIds[i] && _this.$fileIds[i].setValue(v,rowIndex);
                    _this.opts.mode==2&&(_this.$fileIds[i] && _this.$fileIds[i].setOldValue(v));//编辑模式
                });
            });
        },
        /*设置旧值，会在对应的元素加一个属性oldValue
         * parameter
         *  传对象{name:value,name:value},则设置对应的name所在的字段的值，name只能是字段
         *  格式为{'需要设置值的字段name':'需要设置的值'}
         * */
        setOldValue: function(parameter) {
            var _this = this;
            _this.dealType('object', parameter, function(data) {
                $.each(data, function(i, v) {
                    _this.$fileIds[i] && _this.$fileIds[i].setOldValue(v);
                });
            });
        },
        /*设置默认值
         * parameter
         *  传对象{name:value,name:value},则设置对应的name所在的字段的值，name只能是字段
         *  格式为{'需要设置值的字段name':'需要设置的值'}
         * */
        setDefaultValue: function(parameter) {
            var _this = this;
            _this.dealType('object', parameter, function(data) {
                $.each(data, function(i, v) {
                    _this.$fileIds[i] && _this.$fileIds[i].setDefaultValue(v);
                });
            });
        },
        /**
         * @description 获取值
         * @param {string|array} [name] -回去值的表单元素name
         * @param {requestCallback} [callback] -回调函数
         * @return {object} 当前的数据:{name:'value',name:'value'}
         * @example
         * var form = new Form({配置参数});
         * 获取单个值方法：
         *      form.getValue('name',function(value){
         *          //value则为当前值
         *      });//返回的是回调函数的返回值
         *      form.getValue('name');//直接返回当前值
         * 获取多个值方法：
         *      form.getValue(['name1','name2'],function(value){
         *          //value则为当前值
         *      });//返回的是回调函数的返回值
         *      form.getValue(['name1','name2']);//直接返回当前值
         * 获取整体值方法：
         *      form.getValue(function(value){
         *          //value则为当前值
         *      });//返回的是回调函数的返回值
         *      form.getValue();//直接返回当前值
         */
        getValue: function(parameter, callback,isTemplate) {
            var _this = this;
            var result=[];
            $.each(_this.fileIdArr,function(i){
                result.push(i);
            });
            if (parameter) {
                if (dataType(parameter) == 'string') {//传入的是单个name，获取单个值
                    if (callback) {//如果有回调函数，值放在回调函数里
                        if(!_this.$fileIds[parameter].$element.attr('isHide')){//如果当前的是可获取值状态
                            return _this.$fileIds[parameter].getValue(callback,isTemplate);
                        }else{//不可获取值时，返回空值
                            return callback('');
                        }
                    } else {//如果没有回调函数，直接返回值
                        if(!_this.$fileIds[parameter].$element.attr('isHide')){
                            return _this.$fileIds[parameter].getValue('',isTemplate);
                        }else{
                            return '';
                        }
                    }
                } else if (dataType(parameter) == 'array') {//如果传的是多个name
                    return _this.getArrayValueFn(parameter, callback,isTemplate);
                } else if (dataType(parameter) == 'function') { //回调函数形式
                    return _this.getArrayValueFn(result, parameter,isTemplate);
                }
            } else {//parameter没有传的情况，获取的是整个表单的值
                return _this.getArrayValueFn(result,'',isTemplate);
            }
        },
        getArrayValueFn: function(arr, callback,isTemplate) {
            var _this = this;
            var num = 0;
            var resultArr = {};
            $.each(arr, function(i, v) {
                _this.$fileIds[v] && _this.$fileIds[v].getValue(function(result,resultId,resultName) {
                    resultId=resultId?resultId:result;
                    resultName=resultName?resultName:result;
                    if(!_this.$fileIds[v].$content.attr('isHide')){//如果当前的是可获取值状态
                        resultArr[v] = _this.opts.getValueKey==_this.opts.idFlag?resultId
                                :_this.opts.getValueKey==_this.opts.nameFlag?resultName
                                :result;
                    }else{//不可获取值时，返回空值
                        resultArr[v] =  '';
                    }
                    num++;
                    if (num == arr.length) {
                        if (callback) {
                            return callback(resultArr);
                        }
                    }
                },isTemplate);
            });
            return resultArr;
        },
        getValueId:function(parameter){
            var _this = this;
            return _this.resultData(parameter,_this.opts.idFlag);
        },
        getValueName:function(parameter){
            var _this = this;
            return _this.resultData(parameter,_this.opts.nameFlag);
        },
        resultData: function(parameter,falg) {
            var _this = this;
            var result = [];
            $.each( _this.$fileIds[parameter].getValue(), function(i, v) {
                result.push(v[(falg)]);
            })
            return result.join(',');
        },
        /**
         * @description 重置
         * @param {(string|array|object)} [parameter] - name对应的表单元素重置
         * @example
         * var form = new Form({配置参数});
         * form.reset('name1');        //重置对应name的字段(简单类型)
         * form.reset({                //重置对应name的字段(复合类型下，要禁用复合类型下的某个字段)
         *      childrenName:'name1',
         *      rowName:'rowName1',
         *      rowIndex:'0'
         * });
         * form.reset(['name1','name2',{//重置多个表单元素
         *      childrenName:'name1',
         *      rowName:'rowName1',
         *      rowIndex:'0'
         * }]);
         * form.reset();                //重置的是整个表单的所有字段元素
         */
        reset: function(parameter) {
            var _this = this;
            _this.setWay(parameter,'reset');
        },
        /**
         * @description 清除
         * @param {(string|array|object)} [parameter] - name对应的表单元素清除
         * @example
         * var form = new Form({配置参数});
         * form.clear('name1');        //清除对应name的字段(简单类型)
         * form.clear({                //清除对应name的字段(复合类型下，要禁用复合类型下的某个字段)
         *      childrenName:'name1',
         *      rowName:'rowName1',
         *      rowIndex:'0'
         * });
         * form.clear(['name1','name2',{//清除多个表单元素
         *      childrenName:'name1',
         *      rowName:'rowName1',
         *      rowIndex:'0'
         * }]);
         * form.clear();                //清除的是整个表单的所有字段元素
         */
        clear: function(parameter,isCheck) {
            var _this = this;
            _this.setWay(parameter,'clear',isCheck);
        },
        /**
         * @description 摧毁
         * @param {string|array} [name] -对应的表单元素 name
         * @example
         * var form = new Form({配置参数});
         * form.destroy('name1');        //传单个name,则摧毁对应的name所在的行或者是字段，name可以是字段也可以是行
         * form.destroy(['name1','name2']);//数组的name,则摧毁对应的name所在的行或者是字段，name可以是字段也可以是行
         * form.destroy();                //摧毁表单里所有的元素
         */
        destroy: function(parameter,rowIndex) {
            var _this = this;
            if (parameter) {
                if (dataType(parameter) == 'string') {
                    _this.$fileIds[parameter] && _this.$fileIds[parameter].destroy(rowIndex);
                    _this.$form.find('[name="' + parameter + '"]') && _this.$form.find('[name="' + parameter + '"]').remove();
                } else if (dataType(parameter) == 'array') {
                    $.each(parameter, function(i, v) {
                        _this.$fileIds[v] && _this.$fileIds[v].destroy(rowIndex);
                        _this.$form.find('[name="' + v + '"]') && _this.$form.find('[name="' + v + '"]').remove();
                    })
                }
            } else {
                $.each(_this.fileIdArr, function(i, v) {
                    _this.$fileIds[i] && _this.$fileIds[i].destroy(rowIndex);
                });
                _this.$form.remove();
            }
        },
        /**
         * @description 隐藏
         * @param {string|array} [name] -对应的表单元素 name
         * @example
         * var form = new Form({配置参数});
         * form.hide('name1');        //传单个name,则隐藏对应的name所在的行或者是字段，name可以是字段也可以是行
         * form.hide(['name1','name2']);//数组的name,则隐藏对应的name所在的行或者是字段，name可以是字段也可以是行
         * form.hide();                //隐藏表单里所有的行元素
         */
        hide: function(parameter) {
            var _this = this;
            _this.showOrHideFn(parameter,'hide','hideToClear');
        },
        hideToClear: function( $ele) {
            var _this = this;
            if($ele.hasClass('form-field-element')){
                $ele.attr('isHide',true);
            }
            $ele.find('.form-field-element').each(function() {
                $(this).attr('isHide',true);
            });
        },
        /**
         * @description 显示
         * @param {string|array} [name] -对应的表单元素 name
         * @example
         * var form = new Form({配置参数});
         * form.show('name1');        //传单个name,则显示对应的name所在的行或者是字段，name可以是字段也可以是行
         * form.show(['name1','name2']);//数组的name,则显示对应的name所在的行或者是字段，name可以是字段也可以是行
         * form.show();                //显示表单里所有的行元素
         */
        show: function(parameter) {
            var _this = this;
            _this.showOrHideFn(parameter,'show','showToDefault');
        },
        showToDefault: function($ele) {
            var _this = this;
            $ele.find('.form-field-element').each(function() {
               $(this).removeAttr('isHide');
            });
        },
        /*显示与隐藏的公共方法*/
        showOrHideFn:function(parameter,way,fn){
            var _this = this;
            if (parameter) {
                if (dataType(parameter) == 'string') {
                    _this.$fileIds[parameter] && _this.$fileIds[parameter][way]();
                    _this.$form.find('[name="' + parameter + '"]')[way]();
                    _this[fn]( _this.$form.find('[name="' + parameter + '"]'));
                } else if (dataType(parameter) == 'array') {
                    $.each(parameter, function(i, v) {
                        _this.$fileIds[v] && _this.$fileIds[v][way]();
                        _this.$form.find('[name="' + v + '"]')[way]();
                        _this[fn]( _this.$form.find('[name="' + v + '"]'));
                    });
                }
            } else {
                _this.$content[way]();
                _this[fn](_this.$form.find('.form-row'));
            }
        },
        /**
         * @description 禁用
         * @param {(string|array|object)} [parameter] - name对应的表单元素禁用
         * @example
         * var form = new Form({配置参数});
         * form.disable('name1');        //禁用对应name的字段(简单类型)
         * form.disable({                //禁用对应name的字段(复合类型下，要禁用复合类型下的某个字段)
         *      childrenName:'name1',
         *      rowName:'rowName1',
         *      rowIndex:'0'
         * });
         * form.disable(['name1','name2',{//禁用多个表单元素
         *      childrenName:'name1',
         *      rowName:'rowName1',//可以是数组，禁用多个字段
         *      rowIndex:'0'
         * }]);
         * form.disable();                //禁用的是整个表单的所有字段元素
         */
        disable: function(parameter) {
            var _this = this;
            _this.setWay(parameter,'disable');
        },
        /**
         * @description 启用
         * @param {(string|array|object)} [parameter] - name对应的表单元素启用
         * @example
         * var form = new Form({配置参数});
         * form.enable('name1');        //启用对应name的字段（简单类型）
         * form.enable({                //启用对应name的字段(复合类型下，要禁用复合类型下的某个字段)
         *      childrenName:'name1',
         *      rowName:'rowName1',
         *      rowIndex:'0'
         * });
         * form.disable(['name1','name2',{//启用多个表单元素
         *      childrenName:'name1',
         *      rowName:'rowName1',
         *      rowIndex:'0'
         * }]);
         * form.enable();                //启用的是整个表单的所有字段元素
         */
        enable: function(parameter) {
            var _this = this;
            _this.setWay(parameter,'enable');
        },
        /**
         * @description 是否必填，只是前面的那个星号
         * @param {object} {'name':false/true} -对应的name是否必填
         * @example
         * var form = new Form({配置参数});
         * form.required({'name':false});
         */
        required: function(parameter) {
            var _this = this;
            _this.dealType('object', parameter, function(data) {
                $.each(data, function(i, v) {
                    _this.$fileIds[i] && _this.$fileIds[i].required(v);
                    _this.rowRequired(v,i);
                });
            });
        },
        ownType: 'row',
        rowRequired:function(isRequired,i){
            var _this = this;
            var rowRequired = $('.form-' + _this.ownType + '[name=' + i + '] .form-' + _this.ownType + '-head .form-required');
            if (rowRequired) {
                rowRequired.remove();
                if (isRequired) { //必填
                    var str = '<span class="form-required">*</span>';
                    rowRequired = $(str);
                    $('.form-' + _this.ownType + '[name=' +i + ']').find('.form-' + _this.ownType + '-title').before(rowRequired);
                }
            }
        },
        /**
         * @description <h5>添加行</h5>
         * @param {object} opts -添加行参数
         * @param {string} opts.name - 要添加到表单元素name的附近
         * @param {string} opts.location - 行要添加到对应的name的前(before)或后(after)
         * @param {object} opts.configuration - 对应的行配置
         * @example
         * var form = new Form({配置参数});
         * form.add({
         *  name:'demo1',
         *  location:'after',
         *  configuration:{
         *     type: "row",
         *     title: 'row1标题：', //要添加的行标题
         *     children: [{//要添加的行内容
         *         type: 'checkbox',
         *         title: '爱好',
         *         name: 'loves211',
         *         data: [{
         *             id: '1',
         *             name: '足球'
         *         },{
         *             id: '2',
         *             name: '橄榄球'
         *         },{
         *             id: '3',
         *             name: '乒乓球'
         *         },{
         *             id: '4',
         *             name: '乒乓球'
         *         }],
         *         value: [{
         *             id: '1',
         *             name: '足球'
         *         }]
         *     }]
         *  }
         *});
         */
        add: function(opts) {
            var _this = this;
            var $el = $('<div></div>');
            _this.$fileIds[opts.name].$element.closest('.form-row')[opts.location]($el);
            opts.configuration.element = $el;
            $el.html(_this.createChildren([opts.configuration]));
            $.each(opts.configuration.children, function(i, v) {
                v.element = $el.find('.form-children').eq(i);
                _this.createFieldSingle(v);
            });
            _this.rowStyle();
        },
        /**
         * @description 获取表单元素
         * @param {string} name -获取name的元素
         * @returns {dom} name对应的元素
         * @example
         * var form = new Form({配置参数});
         * form.getDom('name1');
         */
        getDom: function(parameter) {
            var _this = this;
            return _this.$form.find('[name="' + parameter + '"]');
        },
        /**
         * @description 校验方法
         * 单选框，多选框，选择，时间,标签，文件上传的校验只有required,function，其他的检验没法弄<br/>
         * 文本是全部校验方法都有<br/>
         * 在全部校验的时候不需要做远端校验<br/>
         * 如果元素是隐藏状态，不需要做任何校验<br/>
         * @param {string} [name] -校验的表单元素的name值
         * @returns {boolean} true:校验通过，false没有通过校验
         * @example
         * var form = new Form({配置参数});
         * form.verify();//校验全部
         * form.verify('name1');//校验name1的值
         */
        verify:function(parameter){
            var _this = this;
            var checkResult=true;
            var result=[];
            //整理所有校验规则
            var check={
                byteChinese:_this.opts.byteChinese,//中文一个字符占几个字节,默认为一个字符占1个字节
                isCheckRemote:parameter?true:false,//如果是校验全部，不走远端校验,单个校验走远端校验
                verify:[]
            };
            $.each(_this.validators,function(i,v){
                if((parameter && i==parameter)|| !parameter){//如果是单个校验，只有当前的name才往下走，或者是全部校验也往下走
                    if(dataType(v)=='array'){//字段类型有数据的情况下
                        var $currentElement=_this.fileIdArr[i].element.find('.form-field-element');
                        check.verify.push({
                            name:i,//需要校验的元素的name,可以通过表单的getValue来作为值判断,必填
                            element:$currentElement,
                            validators:v,//校验规则数组，必填
                            byteChinese:_this.fileIdArr[i].byteChinese ?_this.fileIdArr[i].byteChinese :_this.opts.byteChinese,//中文一个字符占几个字节,默认为一个字符占1个字节
                            value:_this.getVerifyValue(_this.fileIdArr[i]),//需要校验的值,如果没有配置就是name对应的值
                            isCheck:$currentElement.attr('isHide')?false:true,//如果是隐藏状态则不执行校验
                            isCheckRemote:$currentElement.attr('oldvalue')==_this.getVerifyValue(_this.fileIdArr[i])?false:true
                        });
                    }else{//复合类或者是没有数据的情况
                        if(_this.$fileIds[i].fileIdArr){
                            result.push(_this.$fileIds[i].verify());
                        }
                    }
                }
            });
            result.push(_this.check(check));
            $.each(result,function(i,v){
                if(v==false){
                    checkResult=false;
                }
            });
            return checkResult;
        },
        check:function(check){
            var _this = this;
            //执行校验
            _this.checkInstance=new FormVerify(check);
            //将校验结果对应的提示
            $.each(_this.checkInstance.result,function(i,v){
                _this.tooltip[i] && _this.tooltip[i].destroy();//不管是成功还是失败，都把上次校验的提示清除掉
                var $currentElement=_this.fileIdArr[i]?_this.fileIdArr[i].element.find('.form-field-element'):_this.$form.find('[name="'+i+'"]');//复合的情况下通过fileIdArr找不到元素
                if(v.resultStatus=='error'){//校验失败
                    if(_this.opts.checkTipType=='tooltip'){
                        _this.tooltip[i]=new Tooltip({
                            element:$currentElement.parent(),//气泡元素
                            message:v.resultMsg,//气泡提示文字
                            shape:_this.opts.checkTipShape,//气泡的形状：solid(实心)/hollow(空心)
                            direction:_this.opts.checkTipDirection,//气泡的方向：top/bottom/left/right
                            status:v.resultStatus,//气泡的颜色状态：default/success/error/wraning/primary/info
                            location:_this.fileIdArr[i].checkTipLocation?_this.fileIdArr[i].checkTipLocation:_this.opts.checkTipLocation//气泡的位置：(上下气泡)left/center/right,（左右气泡）top/middle/bottom
                        });
                        if(_this.opts.checkType=='all'){//如果选择的是整体校验模式, //如果是一个一个验证则没有交互动作
                            if(_this.opts.isSetRowLineHeight!=true){//如果设置了行高模式,则在行上加了class，默认是鼠标移入显示当前，隐藏其他
                                (_this.verifyBindEvent($currentElement,_this.tooltip[i].$tooltip));//当是全部校验，不是一个一个校验的时候增加一种交互
                            }
                        }
                    }else{
                        new Message({
                            duration:_this.opts.checkTipTime,
                            top:_this.opts.checkTipTop
                        })[v.resultStatus](v.resultMsg);
                    }
                    _this.opts.isTipBorder && $currentElement.addClass('form-verify-tip');//是否提示边框
                    if(_this.opts.checkType=='oneByOne')return false;//单个提示
                }else{//校验成功
                    _this.opts.isTipBorder &&  $currentElement.removeClass('form-verify-tip');//如果设置了边框提示，校验成功的时候则删除掉边框
                }
            });
            if(_this.checkInstance.errorNum()==0){
                return true;
            }else{
                return false;
            }
        },
        /*根据类型拿到不同的值*/
        getVerifyValue:function(v){
            var _this = this;
            var currentValue='';
           if (v.type == 'date'||v.type == 'date2') {
                currentValue=_this.getValue(v.name).startTime
                        ?_this.getValue(v.name).endTime
                            ?_this.getValue(v.name).startTime+((v.menu && v.menu.separator)?v.menu.separator:' ~ ')+_this.getValue(v.name).endTime
                            :_this.getValue(v.name).startTime
                        :'';
            }else{
                currentValue=_this.getValue(v.name);
            }
            return currentValue;
        },
        /*校验绑定一些交互事件*/
        verifyBindEvent:function($ele,$tooltip){
            var _this = this;
            $ele.on('mouseenter',function(){
                _this.$form.find('.tooltip').stop().fadeOut();
                $tooltip.stop().fadeIn();
            });
            $ele.on('mouseleave',function(){
                $tooltip.stop().fadeOut();
            });
        }
    };
    return FormBase.extend(Form);
});