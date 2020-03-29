/**
 * @name true_or_false
 * @author kt
 * @description true_or_false判断数据返回真还是假
 * @date 2017-7-24
 * @param {} data -需要判断真假的数据
 * @returns {boolean} trueOrFalse 返回的是true/false
 */
define(function () {
    function trueOrFalse(data) {
        var falseArr = ['false', false, '', ' ', 'undefined', undefined, 'null', null];
        for (var i = 0; i < falseArr.length; i++) {
            if (data == falseArr[i]) {
                return false;
            }
        }
        return true;
    }

    return trueOrFalse;
});