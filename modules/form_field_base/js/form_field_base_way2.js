define([
    'modules/form_field_base/js/form_field_base',
], function(Base) {
    /**
     * 表单字段数据型方法
     * @alias form_field_base_way2
     * @author kt
     * @since 2017-7-25
     */
    var Base2=function(){};
    Base2.prototype = {
        /**
         * @description 设置数据方法
         * @param {array|object|function} parameter - 传入的参数
         * @example
         * var formFiled = new FormFiled({配置参数});
         * 设置值方法1：
         *      formFiled.setData({
         *          id:'1',
         *          name:'啦啦啦'
         *      });
         * 设置值方法2：
         *      formFiled.setData([{
         *          id:'1',
         *          name:'啦啦啦'
         *      },{
         *          id:'2',
         *          name:'啦啦啦22'
         *      }]);
         * 设置值方法3：
         *      formFiled.setData(function(callback){
         *           callback({
         *              id:'1',
         *              name:'啦啦啦'
         *           });//必须要执行callback
         *      });
         * 设置值方法4：
         *      formFiled.setData(function(callback){
         *           callback([{
         *              id:'1',
         *              name:'啦啦啦'
         *           }]);//必须要执行callback
         *      });
         * 设置值方法5：
         *      formFiled.setData({
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
                _this.dealType('array', parameter, function(data) {
                    _this.defaultValue = $.extend(true, [], data);
                    _this.valueFn(_this.defaultValue);
                });
            }else{
                _this.valueFn(_this.defaultValue);
            }
        },
        /**
         * @description 获取值
         * @param {requestCallback} [callback] -回调函数
         * @return {String|array} 当前的数据,没有值时为空的字符串，有值则是数组形式
         * @example
         * var formFiled = new FormFiled({配置参数});
         * 获取值方法1：
         *      formFiled.getValue(function(value,valueId,valueName){
         *          //value则为当前值,valueId为值的id用逗号拼接的,valueName为值的name用逗号拼接的
         *      });//返回值为回调函数执行结果
         * 获取值方法2：
         *      formFiled.getValue();//返回值为当前数据
         */
        getValue: function(callback) {
            var _this = this;
            var result='';
            if(_this.opts.getValueKey==_this.opts.idFlag){
                result= _this.value.length> 0 ?_this.resultData(_this.opts.idFlag):'';
            }else if(_this.opts.getValueKey==_this.opts.nameFlag){
                result= _this.value.length> 0 ?_this.resultData(_this.opts.nameFlag):'';
            }else{
                result=_this.getValueResult?_this.getValueResult():(_this.value.length> 0 ?_this.value:'');
            }
            if(_this.$element.attr('isHide')){
                return callback?callback(''):'';
            }else{
                return callback?callback( result, _this.resultData(_this.opts.idFlag), _this.resultData(_this.opts.nameFlag)):result;
            }
        },
        /**
         * @description 获取值ID
         * @param {requestCallback} [callback] -回调函数
         * @return {String} 当前的数据
         * @example
         * var formFiled = new FormFiled({配置参数});
         * 获取值方法1：
         *      formFiled.getValueId(function(value){
         *          //value则为当前值,值是通过逗号分隔的字符串
         *      });//返回值为回调函数执行结果
         * 获取值方法2：
         *      formFiled.getValueId();//返回值为当前数据,值是通过逗号分隔的字符串
         */
        getValueId: function(callback) {
            var _this = this;
            return callback?callback( _this.resultData(_this.opts.idFlag)):_this.resultData(_this.opts.idFlag);
        },
        /**
         * @description 获取值Name
         * @param {requestCallback} [callback] -回调函数
         * @return {String} 当前的数据
         * @example
         * var formFiled = new FormFiled({配置参数});
         * 获取值方法1：
         *      formFiled.getValueName(function(value){
         *          //value则为当前值,值是通过逗号分隔的字符串
         *      });//返回值为回调函数执行结果
         * 获取值方法2：
         *      formFiled.getValueName();//返回值为当前数据,值是通过逗号分隔的字符串
         */
        getValueName: function() {
            var _this = this;
            return callback?callback( _this.resultData(_this.opts.nameFlag)):_this.resultData(_this.opts.nameFlag);
        },
        resultData: function(flag) {
            var _this = this;
            var result = [];
            $.each(_this.value, function(i, v) {
                result.push(v[flag]);
            })
            return result.join(',');
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
            _this.valueFn(_this.initValue);
        },
        /**
         * @description 清除值
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.clear();
         */
        clear: function() {
            var _this = this;
            _this.valueFn([]);
        },
        /**
         * @description 摧毁
         * @param {array} [parameter] - 如果不存在的话，则把所有的单选都摧毁,如果存在的话，最后得到的是一个数组，把数组中的id对应数据的id的那个选项摧毁
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.destroy([{id:'',name:''}]);
         */
        destroy: function(parameter) {
            var _this = this;
            if (parameter) {
                _this.dealType('array', parameter, function(value) {
                    $.each(value, function(i, v) {
                        _this.$field.find('input[value=' + v[_this.opts.idFlag] + ']').parent().remove();
                    });
                });
            } else {
                _this.$field.remove();
                try {
                    for (var k in this) {
                        delete this[k];
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        },
        /**
         * @description 显示
         * @param {array} [parameter] - 如果不存在的话，则把所有的单选都显示；如果存在的话，最后得到的是一个数组，把数组中的id对应数据的id的那个选项显示
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.show([{id:'',name:''}]);
         */
        show: function(parameter) {
            var _this = this;
            if (parameter) {
                _this.dealType('array', parameter, function(value) {
                    $.each(value, function(i, v) {
                        _this.$field.find('input[value=' + v[_this.opts.idFlag] + ']').parent().show();
                    });
                });
            } else {
                _this.$field.show();
            }
        },
        /**
         * @description 隐藏
         * @param {array} [parameter] -  如果不存在的话，则把所有的单选都隐藏；如果存在的话，最后得到的是一个数组，把数组中的id对应数据的id的那个选项隐藏
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.hide([{id:'',name:''}]);
         */
        hide: function(parameter) {
            var _this = this;
            if (parameter) {
                _this.dealType('array', parameter, function(value) {
                    $.each(value, function(i, v) {
                        _this.$field.find('input[value=' + v[_this.opts.idFlag] + ']').parent().hide();
                    });
                });
            } else {
                _this.$field.hide();
            }
        },
        /**
         * @description 禁用
         * @param {array} [parameter] -  如果不存在的话，则把所有的单选都禁用掉；如果存在的话，最后得到的是一个数组，把数组中的id对应数据的id的那个选项禁用
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.disable([{id:'',name:''}]);
         */
        disable: function(parameter) {
            var _this = this;
            if (parameter) {
                _this.dealType('array', parameter, function(value) {
                    $.each(value, function(i, v) {
                        _this.$field.find('input[value=' + v[_this.opts.idFlag] + ']').attr({
                            'disabled': 'disabled',
                            'readOnly': 'readOnly'
                        });
                    });
                });
            } else {
                _this.$field.find('input').attr({
                    'disabled': 'disabled',
                    'readOnly': 'readOnly'
                });
            }
        },
        /**
         * @description 启用
         * @param {array} [parameter] -  如果不存在的话，则把所有的单选都启用；如果存在的话，最后得到的是一个数组，把数组中的id对应数据的id的那个选项启用
         * @example
         * var formFiled = new FormFiled({配置参数});
         * formFiled.enable([{id:'',name:''}]);
         */
        enable: function(parameter) {
            var _this = this;
            if (parameter) {
                _this.dealType('array', parameter, function(value) {
                    $.each(value, function(i, v) {
                        _this.$field.find('input[value=' + v[_this.opts.idFlag] + ']').removeAttr('disabled').removeAttr('readOnly');
                    });
                });
            } else {
                _this.$field.find('input').removeAttr('disabled').removeAttr('readOnly');
            }
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
    return  Base.extend(Base2);
});