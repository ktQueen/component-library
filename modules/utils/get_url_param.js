/**
 * @name getUrlParam
 * @author kt
 * @description 获取url及url参数的方法
 * @date 2017-6-6
 * @param {string} name 必填参数 要获取的name 如没有当前参数则返回null
 * @returns {string} 当前name所对应的值
 */
define(function () {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    }
    return getUrlParam;
});