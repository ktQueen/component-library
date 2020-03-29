require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/form_field_upload/js/form_field_upload'
], function(FormFieldUpload) {
    /*-----------------------------upload-------------------------------------*/
    new FormFieldUpload({
        type: 'upload',
        title: '上传文件：',
        element: $('#upload'),
        url: "",
        drag: true,
        responseKeys: { "repCode": "code", "repData": "data", "message": "codeMsg" }, //上传成功后 返回的数据 状态 数据 和 信息的key
        uploadedFileKeys: { "fileName": "name", "fileUrl": "url" }, //返回的数据的格式 文件名  和 文件 路径
        multiple: true
    });
});
