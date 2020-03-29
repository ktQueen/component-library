/**
 * @name preview
 * @description preview
 * @author kt
 * @since 2017-10-6
 */
require.config({
    baseUrl: 'http://localhost:63342/github/component-library/', //项目工程地址
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min', //引入jq
        'cssFile': 'modules/libs/rq/css.min' //引入require的引用css插件
    }
});
require([
    'jquery',
    'modules/form/js/form', //表单
], function($, Form) {
    var configsResult = JSON.parse(window.opener.document.all.formConfigs.value);
    configsResult.element = $('#preview'); //预览需要把表单元素指定为工具预览的元素
    new Form(configsResult);
});
