/**
 * @name unique
 * @author kt
 * @description unique数组去重
 * @date 2017-6-28
 * @param {object} opts 每个方法的参数对象里面的值不一样，根据具体方法设置
 * @returns {object} unique 返回的是一个对象
 * @returns {array} unique.oneExistInTwo({
 *                      arrOne:arrOne,第一个数组
 *                      arrTwo:arrTwo,第二个数组
 *                      uniqueFlag:uniqueFlag 如果数组里面是对象,去重标志,默认为ID，可以是多个去除标志，用逗号分割
 *                  });返回的是第一个数组去掉第二个数组已经存在的
 * @returns {array} unique.ItselfExist({
 *                      arrOne:arrOne,第一个数组
 *                      uniqueFlag:uniqueFlag 如果数组里面是对象,去重标志,默认为ID，可以是多个去除标志，用逗号分割
 *                 });返回数组自身去掉重复后的数组
 * @returns {boolean} unique.isExist({
 *                      arrOne:arrOne,第一个数组
 *                      arrTwo:arrTwo,第二个数组
 *                      uniqueFlag:uniqueFlag 如果数组里面是对象,去重标志,默认为ID，可以是多个去除标志，用逗号分割
 *                 });返回数组arrOne与数组arrTwo是否重复
 */
define(['modules/utils/data_type'], function(dataType) {
    var unique = {
        /*两个数组，返回第一个数组去掉第二个数组已经存在的
         * opts={
         *   arrOne:arrOne,第一个数组
         *   arrTwo:arrTwo,第二个数组
         *   uniqueFlag:uniqueFlag 如果数组里面是对象,去重标志,默认为ID，可以是多个去除标志，用逗号分割
         * }
         * */
        oneExistInTwo: function(opts) {
            var _this = this;
            if (!opts) opts = {};
            opts = $.extend(true, {
                arrOne: [],
                arrTwo: [],
                uniqueFlag: 'id'
            }, opts);
            return _this.removeUniqueEle(_this.getNum(opts), opts.arrOne);
        },
        /*1个数组，返回数组去掉后的，自身去重
         * opts={
         *   arrOne:arrOne,第一个数组
         *   uniqueFlag:uniqueFlag 如果数组里面是对象,去重标志,默认为ID，可以是多个去除标志，用逗号分割
         * }
         * */
        ItselfExist: function(opts) {
            var _this = this;
            if (!opts) opts = {};
            opts = $.extend(true, {
                arrOne: [],
                arrTwo: opts.arrOne,
                uniqueFlag: 'id',
                isItself: true
            }, opts);
            return _this.removeUniqueEle(_this.getNum(opts), opts.arrOne);
        },
        /*是否存在重复
         * opts={
         *   arrOne:arrOne,第一个数组
         *   arrTwo:arrTwo,第二个数组
         *   uniqueFlag:uniqueFlag 如果数组里面是对象,去重标志,默认为ID，可以是多个去除标志，用逗号分割
         * }
         * */
        isExist: function(opts) {
            var _this = this;
            if (!opts) opts = {};
            opts = $.extend(true, {
                arrOne: [],
                arrTwo: [],
                uniqueFlag: 'id'
            }, opts);
            return _this.getNum(opts).length == 0 ? false : true; //0个是不存在,false不重复，true重复
        },
        /*获取重复的下标数组*/
        getNum: function(opts) {
            var _this = this;
            var num = []; //存放重复的元素的下表
            $.each(_this.dataDeal(opts.arrOne), function(i, v) {
                $.each(_this.dataDeal(opts.arrTwo), function(index, value) {
                    if (dataType(v) == 'string') {
                        if (v == value) {
                            opts.isItself ? _this.uniqueNumItself(num, i, index) : _this.uniqueNum(num, i);
                        }
                    } else if (dataType(v) == 'object') {
                        if (opts.uniqueFlag.indexOf(',') != -1) { //如果去重标志里面有逗号，则是多个去重
                            var isExist = true; //元素是否重复，默认为重复
                            $.each(opts.uniqueFlag.split(','), function(iUnique, vUnique) {
                                if (v[vUnique] == value[vUnique]) {

                                } else {
                                    isExist = false; //有一个不等，就是不重复
                                }
                            })
                            if (isExist) {
                                opts.isItself ? _this.uniqueNumItself(num, i, index) : _this.uniqueNum(num, i);
                            }
                        } else { //单个去重
                            if (v[opts.uniqueFlag] == value[opts.uniqueFlag]) { //首先比较去重标志是否符合
                                opts.isItself ? _this.uniqueNumItself(num, i, index) : _this.uniqueNum(num, i);
                            }
                        }
                    }
                })
            });
            return num;
        },
        /*数据处理*/
        dataDeal: function(data) {
            var _this = this;
            if (dataType(data) == 'string') { //'1',只会接到第一个参数
                data = [data];
            }
            return data;
        },
        /*去重num不能重复*/
        uniqueNum: function(num, i) {
            var flag = true;
            $.each(num, function(numIndex, numValue) {
                if (i == numValue) {
                    flag = false;
                }
            })
            flag && num.push(i);
        },
        /*自身的num不能重复*/
        uniqueNumItself: function(num, i, index) {
            if (i != index) { //相同位置的不用比较了
                var flag = true;
                $.each(num, function(numIndex, numValue) {
                    if (index == numValue || i == numValue) {
                        flag = false;
                    }
                })
                flag && num.push(i);
            }
        },
        /*循环下标把重复元素的位置从原始数组用移除*/
        removeUniqueEle: function(num, result) {
            $.each(num, function(i, v) {
                v = v - i;
                result.splice(v, 1);
            });
            return result;
        },
    };
    return unique;
});