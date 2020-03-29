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
    'modules/message/js/message',
    'cssFile!modules/custom_mark/css/custom_mark'
], function ($, dataType, unique, getCharCodeAt,Message) {
    /**
     * @class
     * @classdesc 自定义标签组件
     * @alias custom_mark
     * @author awz
     * @since 2017-10-19
     *
     * @param {object} opts - 配置参数
     * @param {string} opts.element='' - 当前传入的元素
     * @param {string} [opts.uniqueFlag='name'] -去重标识
     * @param {array} [opts.setData=[]] - 设置数据
     * @param {array} [opts.setValue=[]] - 设置被选中数据
     * @param {string} [opts.maxNum =''] - 最多展示几个
     * @param {boolean} [opts.isDisabled =false] - 是否可以编辑
     *
     * @requires 'jquery'
     * @requires 'require'
     */
    function CustomMark(opts) {
        this.init(opts)
    }
    var message = new Message();
    CustomMark.prototype = {
        /*初始化*/
        init: function (opts) {
            var _this = this;
            _this.value = []; //当前已经选择的标签
            _this.data = []; //当前获取到的所有数据
            _this.searchData = []; //存储搜索的值
            _this.parameterSetting(opts);
            _this.createCustomMark();
            _this.dataFn(_this.opts.setData); //数据处理(加载全部数据)
            _this.valueFn(_this.opts.setValue); //设置值(选中默认数据)
            _this.bindEvent();
        },
        /*参数设置*/
        parameterSetting: function (opts) {
            var _this = this;
            if (!opts) opts = {};
            opts = $.extend(true, {
                element: '', //当前传入的元素
                setData: [], //默认值为空数组
                setValue: [], //设置标签值
                uniqueFlag: 'name', //去重标识
                maxNum:null,//展示最多标签数
                isDisabled:false,//禁用
            }, opts);
            _this.opts = opts;
        },
        /*创建多值输入相应的布局
         *如果传入的元素是input,添加input相应的class,创建外框并添加到元素后面，再将元素插入到外框末尾位置
         * 如果传入的元素不是div,则当前元素是外框，添加外框对应的class,并在里面添加结构
         * 如果传入的是其他元素，则把当前元素改为div处理,（最好传入div和input,你不听就算了。。。）
         * _this.wrap为外框
         * _this.opts.element为输入框
         * */
        createCustomMark: function () {
            var _this = this;
            _this.wrap = "<div class='custom-mark-area' ><ul class='custom-mark-list clearfix'></ul><div class='add-custom-mark' style='display: none'><div class='add-custom-mark-title-area'><div class='add-custom-mark-title'>增加标签</div><div class='add-custom-mark-close'>×</div></div><div class='add-custom-mark-content'><input type='text'></div><div class='add-custom-mark-footer'><button class='add-custom-mark-btn confirm-btn'>确定</button><button class='add-custom-mark-btn cancel-btn'>取消</button></div> </div></div>";
            _this.opts.element.html(_this.wrap);
        },

        dataFn:function (params){
            var _this = this;
            if(params && params.length>0){
                var $li='';
                var num = _this.opts.maxNum && parseInt(_this.opts.maxNum) < params.length?parseInt(_this.opts.maxNum):params.length;
                for(var i = 0;num>i;i++){
                    $li += '<li class="content-show" title ="'+params[i]+'">'+params[i]+'</li>';
                }
                if(parseInt(_this.opts.maxNum) > params.length){
                    $li+='<li class="custom-mark-add">+</li>';
                }
                _this.opts.element.find('.custom-mark-list').html('');
                _this.opts.element.find('.custom-mark-list').append($li);
            }
        },
        valueFn:function (params) {
            var _this = this;
            if(params && params.length>0){
                for(var i = 0;params.length>i;i++){
                    _this.opts.element.find('.custom-mark-list').find('li.content-show').each(function () {
                        var $this = $(this);
                         if(params[i] === $this.html()){
                             $this.addClass("custom-mark-active");
                             return false;
                         }
                    })
                }
            }

        },
        bindEvent:function () {
            var _this = this;
            //展示增加modal
            _this.opts.element.on('click','.custom-mark-add',function () {
                if(_this.opts.isDisable){
                    return false;
                }
                _this.opts.element.find('.add-custom-mark').show();
                _this.opts.element.find('.add-custom-mark').find('input').val('');
            });
            //隐藏增加modal
            _this.opts.element.on('click','.cancel-btn',function () {
                _this.opts.element.find('.add-custom-mark').hide();
            });
            //隐藏增加modal
            _this.opts.element.on('click','.add-custom-mark-close',function () {
                _this.opts.element.find('.add-custom-mark').hide();
            });
            //点击确定增加新标签
            _this.opts.element.on('click','.confirm-btn',function () {
               var addContent =  _this.opts.element.find('.add-custom-mark').find('input').val();
               if(addContent === ''){
                   message.warning("请输入新标签");
               } else{
                   var isRepeat = true;
                   _this.opts.element.find('.custom-mark-list').find('li.content-show').each(function () {
                       var $this = $(this);
                       if(addContent === $this.html()){
                           isRepeat = false;
                           message.error("输入标签与标签重复");
                       }
                   });
                   if(isRepeat){
                       _this.opts.element.find('.custom-mark-add').before('<li class="content-show">'+addContent+'</li>');
                       if(_this.opts.element.find('.custom-mark-list li.content-show').length === _this.opts.maxNum){
                           _this.opts.element.find('.custom-mark-add').hide();
                       }
                       _this.opts.element.find('.add-custom-mark').hide();
                   }
               }
            });

            //点击标签选中标签
            _this.opts.element.on('click','.content-show',function (){
                if(_this.opts.isDisable){
                    return false;
                }
                var $this = $(this);
                if($this.hasClass('custom-mark-active')){
                    $this.removeClass('custom-mark-active');
                } else{
                    $this.addClass('custom-mark-active');
                }
            });
        },
        /**
         * @description 清除
         * @example
         * var customMark = new CustomMark({配置参数});
         * customMark.destroy();
         */
        clear:function () {
            var _this = this;
            _this.opts.element.find('.content-show').each(function () {
                if($(this).hasClass('custom-mark-active')){
                    $(this).removeClass('custom-mark-active');
                }
            })
        },
        /**
         * @description 摧毁
         * @example
         * var customMark = new CustomMark({配置参数});
         * customMark.destroy();
         */
        destroy:function () {
            var _this = this;
            _this.opts.element.remove();
        },
        /**
         * @description 禁用
         * @example
         * var customMark = new CustomMark({配置参数});
         * customMark.disable();
         */
        disable:function () {
            var _this = this;
            _this.opts.isDisable = true;
        },
        /**
         * @description 启用
         * @example
         * var customMark = new CustomMark({配置参数});
         * customMark.enable();
         */
        enable:function () {
            var _this = this;
            _this.opts.isDisable = false;
        },
        /**
         * @description 获取选中的值
         * @example
         * var customMark = new CustomMark({配置参数});
         * customMark.getValue();
         */
        getValue:function () {
            var _this = this;
            var valueArray  = [];
            _this.opts.element.find('.custom-mark-active').each(function () {
                valueArray.push($(this).html());
            });
            return valueArray;
        },
        /**
         * @description 隐藏
         * @example
         * var customMark = new CustomMark({配置参数});
         * customMark.hide();
         */
        hide:function () {
            var _this = this;
            _this.opts.element.hide();
        },
        /**
         * @description 展示
         * @example
         * var customMark = new CustomMark({配置参数});
         * customMark.show();
         */
        show:function () {
            var _this = this;
            _this.opts.element.show();
        },
        /**
         * @description 重置
         * @example
         * var customMark = new CustomMark({配置参数});
         * customMark.reset();
         */
        reset:function () {
            var _this = this;
            _this.dataFn(_this.opts.setData);
            _this.valueFn(_this.opts.setValue);
        },
        /**
         * @description 设置数据
         * @example
         * var customMark = new CustomMark({配置参数});
         * customMark.setData();
         */
        setData:function (params) {
            var _this = this;
            _this.dataFn(params);
        },
        /**
         * @description 赋值
         * @example
         * var customMark = new CustomMark({配置参数});
         * customMark.setValue();
         */
        setValue:function (params) {
            var _this = this;
            _this.valueFn(params);
        },
    };
    return CustomMark;
});