/**
 * @name get_charCodeAt
 * @author kt
 * @description get_charCodeAt获取中文的code编码
 * @date 2017-7-12
 * @param {string} data -中文字符
 * @returns {string} num 中文的code编码
 */
define(function() {
    function getCharCodeAt(data) {
        var num = 0;
        for (var i = 0; i < data.length; i++) {
            num += parseInt(data.charCodeAt(data[i])) || 6;
        }
        return num;
    }
    return getCharCodeAt;
});