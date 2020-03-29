require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/upload/js/upload'
], function(Upload) {
    /*------------------------------------------------------------------*/
    new Upload({
        element: $('#upload'),
        url: "upload.json",
        maxSize:1024,
        echoStyle:true,
        drag:true,
        uploadedFileKeys: { "fileName": "fileName", "fileUrl": "fileAddress","fileSize":"fileSize"},
    });

  /*  new Upload({
        element: $('#upload2'),
        drag: true,
        fileNum:false,
        responseKeys: { "repCode": "code", "repData": "data", "message": "codeMsg" }, //上传成功后 返回的数据 状态 数据 和 信息的key
        uploadedFileKeys: { "fileName": "name", "fileUrl": "url" }, //返回的数据的格式 文件名  和 文件 路径

        url: ""
    });*/
});
