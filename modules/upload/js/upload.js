require.config({
    paths: {
        'jquery': 'modules/libs/jq/jquery-3.2.1.min',
        'cssFile': 'modules/libs/rq/css.min'
    }
});
define([
    'jquery',
    'modules/message/js/message',
    'modules/utils/data_type',
    'cssFile!modules/upload/css/upload'
], function($, Message, dataType) {
    var message = new Message();

    function Upload(opts) {
        this.init(opts)
    }

    Upload.prototype = {
        // 初始化
        init: function(opts) {
            var _this = this;
            _this.parameterSetting(opts);
            _this.changeMultiple();
            _this.createUpload();
            _this.bindEvent();
        },
        /*参数设置*/
        parameterSetting: function(opts) {
            var _this = this;
            var para = _this.parameter;
            _this.filesData = [];
            if (!opts) opts = {};
            opts = $.extend(true, {
                url: '',
                element: '', //当前传入的元素
                uploadBtnText: '上传',
                uploadBtnTextDevelop: "上传中", //文件上传中按钮显示值
                multiple: true, //是否传递多个文件；true可以选择多个文件上传 ，false不可以
                formName: "upfile", //表单名称
                fileName: "fileName", //文件 input的名称
                fileNum: true, //是否可以上传多个文件
                fileNumRemark: "上传文件个数大于限制个数", //上传文件个数提示语
                successBtnShowOrHide: false, //上传一个文件后是否隐藏文件上传按钮
                accept: [], //数组限制文件类型
                acceptRemark: "上传文件类型不符合要求", //文件类型提示语
                maxSize: '', //文件大小最大值，单位kb
                maxSizeRemark: "文件大小不符合要求", //文件大小提示语,
                echoStyle: false, //返回内容回显风格
                responseKeys: { "repCode": "repCode", "code": "0", "repData": "repData", "message": "message" }, //上传成功后 返回的数据 状态 数据 和 信息的key
                uploadedFileKeys: { "fileName": "fileName", "fileUrl": "fileUrl", "fileSize": "fileSize" }, //返回的数据的格式 文件名  和 文件 路径
                drag: false, //是否拖拽上传
                dataIsObj:false,
                beginUpload: function() {
                    _this.opts.element.find('.uploadText').html(_this.opts.uploadBtnTextDevelop);
                },
                afterUpload: function() {
                    _this.opts.element.find('.uploadText').html(_this.opts.uploadBtnText);
                },
                successFileCommon: function(data) { //上传成功后，操作
                    if (data && data[opts.responseKeys.repCode] == opts.responseKeys.code) {
                        var fileInfo = data[opts.responseKeys.repData];
                        if (fileInfo instanceof Array) {
                            for (var i = 0; i < fileInfo.length; i++) {
                                var file = fileInfo[i];
                                _this.addFileViw(file);
                            }
                        }
                        if(opts.dataIsObj){
                            _this.addFileViw(data[opts.responseKeys.repData]);
                        }
                        message.success(data[opts.responseKeys.message]);

                    } else {
                        message.error(data[opts.responseKeys.message]);
                    }
                },
                successFile:function(){},
                errorFile:function(){//上传接口正确，但是返回值是其他错误状态码

                },
                extendData: {},
                callback: null
            }, opts);
            _this.opts = opts;
        },
        /*Multiple改变值*/
        changeMultiple: function() {
            var _this = this;
            if (_this.opts.fileNum === true || parseInt(_this.opts.fileNum) === 1) {
                if (_this.opts.fileNum === true) {
                    _this.opts.fileNum = 1;
                }
                _this.opts.multiple = false;
            }
        },
        /*
        创建dom
         */
        createUpload: function() {
            var _this = this;
            var accept = _this.opts.accept ? this.opts.accept.join(',') : '';

            if (_this.opts.echoStyle) {
                _this.opts.element.html('<div class="form-field-upload echo-style">' +
                    '<div class="btn-upload-wrapper">' +
                    '<a href="javascript:void(0);" class="label-remark"><div class="upFiles-list"></div><span class="uploadIcon"></span><span class="uploadText">' + _this.opts.uploadBtnText + '</span></a>' +
                    '<form name=' + _this.opts.formName + '  ><input class="fileUpload" ' + (_this.opts.multiple ? "multiple=multiple" : "") + '  ' + (accept === "" ? "" : "accept =" + accept) + '  type="file" name="' + _this.opts.fileName + '"></form></div> ' +
                    '</div> ');

            } else {
                _this.opts.element.html('<div class="form-field-upload">' +
                    '<div class="files-list clearfix"></div>' +
                    '<div class="btn-upload-wrapper">' +
                    '<a href="javascript:void(0);" class="label-remark"><span class="uploadIcon"></span><span class="uploadText">' + _this.opts.uploadBtnText + '</span></a>' +
                    '<form name=' + _this.opts.formName + ' ><input class="fileUpload" ' + (_this.opts.multiple ? "multiple=multiple" : "") + '  ' + (accept === "" ? "" : "accept =" + accept) + '  type="file" name="' + _this.opts.fileName + '"></form></div> ' +
                    '</div> ');

            }

        },

        /*绑定事件*/
        bindEvent: function() {
            var _this = this;
            $(document).on({
                dragleave: function(e) { //拖离
                    e.preventDefault();
                },
                drop: function(e) { //拖后放
                    e.preventDefault();
                },
                dragenter: function(e) { //拖进
                    e.preventDefault();
                },
                dragover: function(e) { //拖来拖去
                    e.preventDefault();
                }
            });
            if (_this.opts.drag) {
                _this.opts.element.find('.form-field-upload')[0].addEventListener('drop', function(e) {
                    e.preventDefault(); //取消默认浏览器拖拽效果
                    //上传按钮不可点击
                    if (_this.opts.element.find('input.fileUpload').prop("disabled")) {
                        return false;
                    }

                    var fileList = e.dataTransfer.files; //获取文件对象
                    var accept = _this.opts.accept;
                    var trueArray = [];
                    if (_this.opts.fileNum != false) {
                        if (parseInt(_this.opts.fileNum) < parseInt(fileList.length - (0 - _this.filesData.length))) {
                            message.error(_this.opts.fileNumRemark);
                            // return false;
                            var mockFileList = [];
                            for (var i = 0; i < (parseInt(_this.opts.fileNum) - _this.filesData.length); i++) {
                                mockFileList.push(fileList[i]);
                            }

                            fileList = mockFileList;
                        }
                    }
                    if (accept && accept.length > 0 && accept[0] !== "") {
                        for (var j = 0; fileList.length > j; j++) {
                            for (var i = 0; i < accept.length; i++) {
                                if (accept[i] === fileList[j].type) {
                                    trueArray.push(fileList[j].type);
                                }
                            }
                        }
                        if (trueArray.length != fileList.length) {
                            message.error(_this.opts.acceptRemark);
                            return false;
                        }

                    }
                    if (_this.opts.maxSize) {
                        for (var j = 0; fileList.length > j; j++) {
                            if ((fileList[j].size / 1024) > parseInt(_this.opts.maxSize)) {
                                message.error(_this.opts.maxSizeRemark);
                                return false;
                            }
                        }
                    }
                    //var upFile = new FormData(_this.opts.element.find('form')[0]);
                    var upFile = new FormData($("<form name='" + _this.opts.formName + "'></form>")[0]);
                    for (var i = 0; fileList.length > i; i++) {
                        upFile.append(_this.opts.fileName, fileList[i]);
                    }
                    _this.opts.element.find('input.fileUpload').attr("disabled", true);
                    _this.opts.element.find('.label-remark').css("background", "#f6f6f6");
                    _this.submitFile(upFile);

                })
            }
            _this.opts.element.find('input.fileUpload').on("change", function() {
                //上传按钮不可点击
                if (_this.opts.element.find('input.fileUpload').attr("disabled")) {
                    return false;
                }
                var fileList = _this.opts.element.find('input.fileUpload')[0].files;
                if (_this.opts.fileNum != false) {
                    if (parseInt(_this.opts.fileNum) < parseInt(fileList.length - (0 - _this.filesData.length))) {
                        message.error(_this.opts.fileNumRemark);
                        var mockFileList = [];
                        for (var i = 0; i < (parseInt(_this.opts.fileNum) - _this.filesData.length); i++) {
                            mockFileList.push(fileList[i]);
                        }

                        fileList = mockFileList;
                    }
                }

                for (var i = 0; fileList.length > i; i++) {
                    var fileSize = fileList[i].size / 1024;
                    if (parseInt(_this.opts.maxSize) < fileSize) {
                        message.error(_this.opts.maxSizeRemark);
                        return false;
                    }
                }
                var accept = _this.opts.accept;
                var trueArray = [];
                if (accept && accept.length > 0 && accept[0] !== "") {
                    for (var i = 0; fileList.length > i; i++) {
                        var fileType = fileList[i].type;
                        for (var j = 0; _this.opts.accept.length > j; j++) {
                            if (fileType === accept[j]) {
                                trueArray.push(fileType);
                            }
                        }
                    }

                    if (trueArray.length != fileList.length) {
                        message.error(_this.opts.acceptRemark);
                        return false;
                    }
                }
                _this.opts.element.find('input.fileUpload').hide();
                _this.opts.beginUpload();
                var upFile = new FormData($("<form name='" + _this.opts.formName + "'></form>")[0]);
                for (var i = 0; fileList.length > i; i++) {
                    upFile.append(_this.opts.fileName, fileList[i]);
                }

                //var upFile = new FormData(_this.opts.element.find('form')[0]);
                _this.opts.element.find('input.fileUpload').attr("disabled", true);
                _this.opts.element.find('.label-remark').css("background", "#f6f6f6");
                _this.submitFile(upFile);
            });
            /*文件删除事件*/
            $('.files-list').on('click', '.remove-file', function() {
                _this.filesData.splice($(this).closest('.one-file').index(), 1);
                $(this).closest('.one-file').remove();
                if (_this.opts.successBtnShowOrHide) {
                    _this.opts.element.find('.label-remark').show();
                }
                _this.opts.element.find('input.fileUpload').attr("disabled", false);
                if (!_this.opts.echoStyle) {
                    _this.opts.element.find('.label-remark').css("background", "#e6454a");
                }
                return false;
            });
            /*删除文件*/
            $('.upFiles-list').on('click', '.file-operation', function(e) {
                if (!$(e.target).hasClass('file-operation')) {
                    return false;
                }
                _this.filesData.splice($(this).closest('.file-show-area').index(), 1);
                $(this).closest('.file-show-area').remove();
                if (_this.opts.successBtnShowOrHide) {
                    _this.opts.element.find('.label-remark').show();
                }
                _this.opts.element.find('input.fileUpload').attr("disabled", false);
                if (!_this.opts.echoStyle) {
                    _this.opts.element.find('.label-remark').css("background", "#e6454a");
                }
                return false;
            });

            /*图片预览*/
            _this.opts.element.on("click", '.upFiles-list .img-preview', function(e) {

                if (!$(e.target).hasClass('img-preview')) {
                    return false;
                }
                var $this = $(this);
                var imageSrc = $this.data('src');
                $("body").append("<div class='image-preview'><div><img src=" + imageSrc + "></div></div>")
            });
            /*关闭预览*/
            $('body').on("click", '.image-preview', function() {
                $('.image-preview').html("").remove();
            })
        },
        submitFile: function(upFile) {
            var _this = this;
            var exData = {};
            if (typeof _this.opts.extendData == "function") {
                exData = _this.opts.extendData();
            } else {
                exData = _this.opts.extendData;
            }
            exData.____tongyijieshou = ""; //模式
            for (var key in exData) {
                upFile.append(key, exData[key]);
            }
            $.ajax(_this.opts.url, {
                type: "POST",
                data: upFile,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                processData: false, //  告诉jquery不要处理发送的数据
                contentType: false, // 告诉jquery不要设置content-Type请求头
                success: function(data) {
                    if (data[_this.opts.responseKeys.repCode] == _this.opts.responseKeys.code) {
                        _this.opts.successFileCommon(data);
                        _this.opts.successFile(data);
                        if (_this.opts.successBtnShowOrHide) {
                            _this.opts.element.find('.label-remark').hide();
                        }
                        _this.opts.change && _this.opts.change(_this.filesData);
                    } else {
                        _this.opts.errorFile(data);
                        _this.opts.element.find('input.fileUpload').val("");
                        _this.opts.element.find('input.fileUpload').show();
                        _this.opts.afterUpload();
                        _this.opts.element.find('input.fileUpload').attr("disabled", false);
                        if (!_this.opts.echoStyle) {
                            _this.opts.element.find('.label-remark').css("background", "#e6454a");
                        }
                        return false;
                    }
                },
                complete: function() {
                    _this.opts.element.find('input.fileUpload').val("");
                    _this.opts.element.find('input.fileUpload').show();
                    _this.opts.afterUpload();

                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    _this.opts.element.find('input.fileUpload').attr("disabled", false);
                    if (!_this.opts.echoStyle) {
                        _this.opts.element.find('.label-remark').css("background", "#e6454a");
                    }
                    alert("上传出错：" + textStatus + errorThrown);

                }
            });
        },
        addFileViw: function(file) {
            var _this = this;
            _this.filesData.push(file);
            if (_this.opts.echoStyle) {
                var sFileName = file[_this.opts.uploadedFileKeys.fileName];
                var arr = sFileName.split('.');
                var type = arr[arr.length - 1].toLowerCase();
                if (type === "bmp" || type === "jpg" || type === "jpeg" || type === "png" || type === "gif") {
                    _this.opts.element.find('.upFiles-list').append('<div class="file-list-num file-show-area" ><div class="file-name-show" title="' +
                        (file[_this.opts.uploadedFileKeys.fileName]|| _this.opts.element.find('.fileUpload').get(0).files[0].name) + '"><img class="img-preview" data-src="' + file[_this.opts.uploadedFileKeys.fileUrl] + '" src="' + file[_this.opts.uploadedFileKeys.fileUrl] + '@60w_60h_1e"></div><div class="file-size-area">' + file[_this.opts.uploadedFileKeys.fileSize] + '</div><div class="file-operation">×</div></div>');

                } else {
                    _this.opts.element.find('.upFiles-list').append('<div class="file-show-area"><div class="file-name-show">' + file[_this.opts.uploadedFileKeys.fileName] + '</div><div class="file-size-area">' + file[_this.opts.uploadedFileKeys.fileSize] + '</div><div class="file-operation">×</div></div>')
                }

            } else {
                _this.opts.element.find('.files-list').append('<a href="' + ( _this.opts.dataIsObj?file[_this.opts.uploadedFileKeys.fileName]:file[_this.opts.uploadedFileKeys.fileUrl]) + '" target="_blank" ><span class="one-file">' +
                    (file[_this.opts.uploadedFileKeys.fileName]|| _this.opts.element.find('.fileUpload').get(0).files[0].name) + '<em class="remove-file">×</em></span></a>');
            }

            if (_this.filesData.length != parseInt(_this.opts.fileNum)) {
                _this.opts.element.find('input.fileUpload').prop("disabled", false);
                if (!_this.opts.echoStyle) {
                    _this.opts.element.find('.label-remark').css("background", "#e6454a");
                }
            }
        },
        getValue: function(callback) {
            var _this = this;
            if (callback) { //如果有回调函数
                return callback(_this.filesData);
            } else {
                return _this.filesData;
            }
        },
        setValue: function(fileList) {
            var _this = this;
            if (fileList && fileList.length > 0) { //如果有回调函数
                for (var i = 0; i < fileList.length; i++) {
                    _this.addFileViw(fileList[i]);
                }
            }
        }

    };
    return Upload;
});
