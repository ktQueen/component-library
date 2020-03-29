/**
 * @name function_deal
 * @description function_deal
 * @author kt
 * @since 2017-11-9
 */
define(function () {
    function functionDeal(opts, isExecute) {
        $.each(opts, function (i, v) {
            if (v && v.dataType && v.dataType == 'function') {
                if (v.value && v.value.indexOf('function') != -1 && v.value.indexOf('(') != -1) {//如果当前传入的参数是字符串并且存在function则将字符串转为function
                    opts[i] = (new Function('return( ' + v.value + ' );'))();
                    isExecute && (opts[i] = opts[i]());
                } else {
                    opts[i] = v.value;
                }
            } else {
                opts[i] = v;
            }
        });
        return opts;
    }

    return functionDeal;
});