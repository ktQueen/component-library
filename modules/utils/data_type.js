/**
 * @name dataType
 * @author kt
 * @description 判断数据类型
 * @date 2017-6-6
 * @param {} data 必填参数 当前数据
 * @returns {string} 返回的是传入数据的类型
 */
define(function () {
    function dataType(data) {
        data = Object.prototype.toString.call(data);
        var type = {
            '[object String]': 'string',//字符串
            '[object Object]': 'object', //{}
            '[object Number]': 'number',//数字
            '[object Array]': 'array',//数组
            '[object Date]': 'date',//日期
            '[object Function]': 'function',//函数
            '[object Boolean]': 'boolean',//布尔值
            '[object Null]': 'null'//null
        };
        return type[data];
    }

    return dataType;
});