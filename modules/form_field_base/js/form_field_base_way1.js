define([
    'modules/form_field_base/js/form_field_base'
], function(Base) {
    /**
     * 表单字段字符型方法
     * @alias form_field_base_way1
     * @author kt
     * @since 2017-7-21
     */
    var Base1=function(){};
    Base1.prototype = {
        /*设置数据：字符型没有这个方法*/
        setData:function(){},
        /**
         * @description 设置值方法
         * @param {object|string|function} parameter - 传入的参数
         * @example
         * var formFiled = new FormFiled({配置参数});
         * 设置值方法1：
         *      formFiled.setValue('啦啦啦');
         * 设置值方法2：
         *      formFiled.setValue(function(callback){
         *           callback('啦啦啦');//必须要执行callback
         *      });
         * 设置值方法3：
         *      formFiled.setValue({
         *           url:'',//请求
         *           data:{},//数据
         *           timeout:'0',//超时时间
         *           field:''//取值的字段
         *      });
         */
        setValue: function(parameter) {
            var _this = this;
            _this.valueFn(parameter);
        },
        /*设置旧值:为了编辑的时候查重*/
        setOldValue: function(oldValue) {
            var _this = this;
            _this.$element.attr('oldValue', oldValue);
        },
        /*设置默认值*/
        setDefaultValue: function(parameter) {
            var _this = this;
            if(parameter){
                _this.dealType('string', parameter, function(data) {
                    _this.defaultValue = data;
                    _this.valueFn(_this.defaultValue);
                });
            }else{
                _this.valueFn(_this.defaultValue);
            }
        },
        /**
         * @description 获取值
         * @param {requestCallback} [callback] -回调函数
         * @return {String} 当前的数据
         * @example
         * var formFiled = new FormFiled({配置参数});
         * 获取值方法1：
         *      formFiled.getValue(function(value){
         *          //value则为当前值
         *      });//返回值为回调函数执行结果
         * 获取值方法2：
         *      formFiled.getValue();//返回值为当前数据
         */
        getValue: function(callback) {
            var _this = this;
            var result=$.trim(_this.value);
            if(_this.$element.attr('isHide')){
                return callback?callback(''):'';
            }else{
                return callback?callback(result):result;
            }
        },
        /**
         * @description 触发改变
         * @param {requestCallback} callback -回调函数
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.change(function(value){
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
         * var formFiled = new FormFiled({配置参数});
         * formFiled.reset();
         */
        reset: function() {
            var _this = this;
            _this.valueFn && _this.valueFn(_this.initValue);
        },
        /**
         * @description 清除值
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.clear();
         */
        clear: function(isCheck) {
            var _this = this;
            if(isCheck=='undefined' || isCheck==undefined){
                isCheck=true;
            }
            _this.opts.isCheck=isCheck;
            _this.valueFn && _this.valueFn('');
        },
        /**
         * @description 摧毁
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.destroy();
         */
        destroy: function() {
            var _this = this;
            _this.$field && _this.$field.remove();
            try {
                for (var k in this) {
                    delete this[k];
                }
            } catch (e) {
                console.log(e);
            }
        },
        /**
         * @description 显示
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.show();
         */
        show: function() {
            var _this = this;
            _this.$field.show();
        },
        /**
         * @description 隐藏
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.hide();
         */
        hide: function() {
            var _this = this;
            _this.$field.hide();
        },
        /**
         * @description 禁用
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.disable();
         */
        disable: function() {
            var _this = this;
            _this.$element.attr({
                'disabled': 'disabled',
                'readOnly': 'readOnly'
            });
        },
        /**
         * @description 启用
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.enable();
         */
        enable: function() {
            var _this = this;
            _this.$element.removeAttr('disabled').removeAttr('readOnly');
        },
        /**
         * @description 是否必填：根据是否必填，显示前面的必填标志
         * @param {boolean} isRequired -是否必填
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.required(false);
         */
        required: function(isRequired) {
            var _this = this;
            _this.$required && _this.$required.remove();
            if (isRequired) { //必填
                var str = '<span class="form-required">*</span>';
                _this.$required = $(str);
                _this.$title.before(_this.$required);
                _this.requiredLocationFn(isRequired);
            }
        }
    };
    return Base.extend(Base1);
});