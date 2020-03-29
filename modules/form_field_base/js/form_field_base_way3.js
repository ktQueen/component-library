define([
    'modules/form_field_base/js/form_field_base'
], function (Base) {
    /**
     * 表单字段引用型方法
     * @alias form_field_base_way3
     * @author kt
     * @since 2017-7-25
     */
    var Base3 = function () {
    };
    Base3.prototype = {
        /**
         * @description 设置值方法
         * @param {array|object|function} parameter - 传入的参数
         * @example
         * var formFiled = new FormFiled({配置参数});
         * 设置值方法1：
         *      formFiled.setValue({
         *          id:'1',
         *          name:'啦啦啦'
         *      });
         * 设置值方法2：
         *      formFiled.setValue([{//单选的数组长度不能大于1
         *          id:'1',
         *          name:'啦啦啦'
         *      }]);
         * 设置值方法3：
         *      formFiled.setValue(function(callback){
         *           callback({
         *              id:'1',
         *              name:'啦啦啦'
         *           });//必须要执行callback
         *      });
         * 设置值方法4：
         *      formFiled.setValue(function(callback){
         *           callback([{//单选的数组长度不能大于1
         *              id:'1',
         *              name:'啦啦啦'
         *           }]);//必须要执行callback
         *      });
         * 设置值方法5：
         *      formFiled.setValue({
         *           url:'',//请求
         *           data:{},//数据
         *           timeout:'0',//超时时间
         *           field:''//取值的字段
         *      });
         */
        setValue: function (parameter) {
            var _this = this;
            _this.upperModule && _this.upperModule.setValue(parameter);
        },
        /*设置旧值:为了编辑的时候查重*/
        setOldValue: function (oldValue) {
            var _this = this;
            _this.$element.attr('oldValue', oldValue);
        },
        /*设置默认值*/
        setDefaultValue: function (parameter) {
            var _this = this;
            _this.upperModule && _this.upperModule.setDefaultValue(parameter);
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
        getValue: function (callback, isTemplate) {
            var _this = this;
            if (_this.opts.getValueKey && _this.opts.getValueKey == _this.opts.idFlag) {
                return _this.getValueIdOrName(callback, _this.getValueId());
            } else if (_this.opts.getValueKey && _this.opts.getValueKey == _this.opts.nameFlag) {
                return _this.getValueIdOrName(callback, _this.getValueName());
            }
            if (_this.$element.attr('isHide')) {
                return callback ? callback('') : '';
            } else {
                return (_this.upperModule && _this.upperModule.getValue(callback, isTemplate));
            }
        },
        getValueIdOrName: function (callback, result) {
            var _this = this;
            if (_this.opts.getValueType == 'array') {
                var resultArr = [];
                $.each(result.split(','), function (i, v) {
                    resultArr.push(v);
                });
                return callback ? callback(resultArr) : resultArr;
            } else {
                return callback ? callback(result) : result;
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
        change: function (callback) {
            var _this = this;
            callback && _this.on('change', callback);
        },
        /**
         * @description 重置
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.reset();
         */
        reset: function () {
            var _this = this;
            _this.upperModule && _this.upperModule.reset && _this.upperModule.reset();
        },
        /**
         * @description 清除值
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.clear();
         */
        clear: function (isCheck) {
            var _this = this;
            if(isCheck=='undefined' || isCheck==undefined){
                isCheck=true;
            }
            _this.opts.isCheck=isCheck;
            _this.upperModule && _this.upperModule.clear && _this.upperModule.clear(isCheck);
        },
        /**
         * @description 摧毁
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.destroy();
         */
        destroy: function () {
            var _this = this;
            _this.upperModule && _this.upperModule.destroy && _this.upperModule.destroy(true);
            _this.$field.remove();
        },
        /**
         * @description 显示
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.show();
         */
        show: function () {
            var _this = this;
            _this.$field.show();
        },
        /**
         * @description 隐藏
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.hide();
         */
        hide: function () {
            var _this = this;
            _this.$field.hide();
        },
        /**
         * @description 禁用
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.disable();
         */
        disable: function () {
            var _this = this;
            _this.upperModule && _this.upperModule.disable && _this.upperModule.disable();
        },
        /**
         * @description 启用
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.enable();
         */
        enable: function () {
            var _this = this;
            _this.upperModule && _this.upperModule.enable && _this.upperModule.enable();
        },
        /**
         * @description 是否必填：根据是否必填，显示前面的必填标志
         * @param {boolean} isRequired -是否必填
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.required(false);
         */
        required: function (isRequired) {
            var _this = this;
            _this.$required && _this.$required.remove();
            if (isRequired) { //必填
                var str = '<span class="form-required">*</span>';
                _this.$required = $(str);
                _this.$title.before(_this.$required);
                _this.requiredLocationFn(isRequired);
            }
            if (_this.opts.type == 'single' || _this.opts.type == 'singleSearch') {
                _this.upperModule && _this.upperModule.required(isRequired);
            }
        }
    };
    return Base.extend(Base3);
});