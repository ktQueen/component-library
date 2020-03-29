/**
 * 表单模拟块配置组件
 * @module form_complex_blockParaConfig
 */
define([
    'modules/form_complex_base/js/form_complex_base',
    'modules/form_complex_base/js/form_complex_manager',
], function(Base,Manager) {
    /**
     * @class
     * @classdesc 表单模拟块配置组件
     * @alias FormComplexBlockParaConfig
     * @extends form_complex_base
     * @author kt
     * @since 2017-10-14
     *
     * @param {object} opts - 配置参数
     * @param {string} opts.name='' - 必填，唯一标识，不能重复
     * @param {dom} opts.element='' - 必填，当前需要生成表单字段的元素
     * @param {string} opts.type='tableParaConfig' - 必填，要创建的表单字段的类型
     * @param {string} [opts.className=''] - 可以为当前元素添加class
     * @param {object} [opts.style={}] - 设置样式
     * @param {string} [opts.layout='left-right'] - 布局，一种为上下结构'up-down'，一种为左右结构'left-right'，默认为左右结构布局
     * @param {function} [opts.initDone=null] - 表单元素初始化完成,this指向整个表单字段
     * @param {function} [opts.change=null] - return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
     * @param {boolean} [opts.isShowRequired=false] - 当必填的时候是否显示必填标志，默认是隐藏的
     * @param {string} [opts.requiredLocation='before'] - 必填标志的位置，可以在字段前before，也可以在末尾显示before， 默认在字段前显示
     * @param {string} [opts.title=''] - 标题
     * @param {object} [opts.titleStyle={}] - 标题样式
     * @param {object} [opts.contentStyle={}] - 内容样式
     * @param {boolean} [opts.readOnly=false] - 是否只读，默认不是只读，当设置了disabled，则同步设置了readOnly
     * @param {boolean} [opts.disabled=false] - 是否禁用，默认不禁用
     * @param {string} [opts.tip=''] - 在表单字段组件下面一行添加提示文字
     * @param {string} [opts.maxNum=''] - 添加的条数限制
     * @param {string} [opts.isHide=false] - 是否隐藏，默认是显示的
     *
     * @param {array} [opts.childrenBlock=[] - 块内容，只用配置一行的数据，如果要设置值请用setValue方法
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    var FormBlockParaConfig=function(){};
    FormBlockParaConfig.prototype = {
        /*初始化*/
        init: function(opts) {
            var _this = this;
            opts.childrenTbody=$.extend(true,[],opts.childrenBlock);
            _this.parameterSetting(opts);
            _this.createFormComplex();
            _this.elementSetting();
            _this.styleSetting();
            _this.opts.initDone && _this.opts.initDone.call(_this.$field);
            _this.createTable();
            _this.bindEvent();
            _this.isHideFn();
        },
        /* 参数设置*/
        parameterSetting:function(opts){
            var _this = this;
            _this.commonParameterSetting($.extend(true,{
                type: 'blockParaConfig', //要创建的表单字段的类型
                childrenBlock:[]
            },opts));
        },
        ownClass:'form-complex-blockParaConfig',//根据不同的类型给每个字段添加私有的class
        /*添加行：块和其他的不一致
         * index:在哪个位置加入行
         * value:这一行的配置值
         * */
        addRow:function(index,value){
            var _this = this;
            var tdHtml='';
            var fileIdObj= {};
            var $fileIdsObj = {};
            var validators={};
            $.each(value,function(i,v){
                if(v.type=='hidden'){
                    tdHtml+='<div style="display: none;"></div>';
                }else{
                    tdHtml+='<div></div>';
                }
            });
            tdHtml='<td>'+tdHtml+'</td>';
            var $rowDom=$('<tr>'+tdHtml+'</tr>');
            if(_this.$tbody.children('tr').length==0){
                _this.$tbody.append($rowDom);
            }else{
                _this.$tbody.children('tr').eq(index-1).after($rowDom);
            }
            $fileIdsObj.$dom=$rowDom;
            $.each(value,function(i,v){
                v.element =_this.$tbody.children('tr').eq(index).children('td').children('div').eq(i);
                v.disabled = v.disabled ? v.disabled : _this.opts.disabled;
                if(v.name){
                    fileIdObj[v.name]=v;
                }else{
                    fileIdObj[v.type]=v;
                }
                _this.createFieldSingle(v,$fileIdsObj,validators);
            });
            _this.fileIdArr.splice(index, 0, fileIdObj);
            _this.$fileIds.splice(index, 0, $fileIdsObj);
            _this.validators.splice(index, 0, validators);
            _this.bindAreaEvent($fileIdsObj);
            _this.rows?_this.rows.push($fileIdsObj):this.rows=[$fileIdsObj];//初始化时用
            _this.filedStyleSetting();
        },
        /*块里面的字段标题对齐*/
        filedStyleSetting:function(){
            var _this = this;
            var $rowHead = _this.$tbody.find('.form-field-leftRight .form-field-head');//行左右结构的头部
            var $rowCon = _this.$tbody.find('.form-field-leftRight .form-field-content');//行左右结构的内容
            var $rowCon2 = _this.$tbody.find('.form-field-upDown .form-field-content');//行上下结构的内容
            var $rowRequired = _this.$tbody.find('.form-field-leftRight .form-field-head>.form-required');//行的必填标志
            var $complexHead = _this.$tbody.find('.form-complex-leftRight .form-complex-head');//行左右结构的头部
            //标题
            var maxHeadWidth = 0;
            $rowHead.each(function() {//循环所有的左右结构的头部，取头部的最大宽度
                if (maxHeadWidth < $(this).width()) {
                    maxHeadWidth = $(this).width()+1;//加1是因为很多时候宽度有的时候为小数，会造成折行
                }
            });
            $complexHead.each(function() {//循环所有的左右结构的头部，取头部的最大宽度
                if (maxHeadWidth < $(this).width()) {
                    maxHeadWidth = $(this).width()+1;//加1是因为很多时候宽度有的时候为小数，会造成折行
                }
            });
            $rowHead.each(function() {//循环所有的左右结构的头部，取头部的最大宽度
                if($(this).parents('.form-complex').length>1){
                }else{
                    $(this).css({ //左右结构的内容宽度设置
                        'width': maxHeadWidth
                    });
                }
            });
            $complexHead.css({ //取行的标题最大宽度，设为所有标题的宽度
                'width': maxHeadWidth,
                'text-align':'right'
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
                if($(this).parents('.form-complex').length>1){
                }else{
                    $(this).next().css({ //左右结构的内容宽度设置
                        'width': 'calc(100% - ' + (maxConWidth ) + 'px)'
                    });
                }
            });
            $complexHead.each(function() {//循环所有的左右结构的头部，取头部的最大宽度
                $(this).next().css({ //左右结构的内容宽度设置
                    'width': 'calc(100% - ' + (maxConWidth ) + 'px)'
                });
            });
        }
    };
    Manager.FormComplexBlockParaConfig= Base.extend(FormBlockParaConfig);
    return Manager.FormComplexBlockParaConfig
});