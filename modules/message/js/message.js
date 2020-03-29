/*
    Message全局提示

        全局展示操作反馈信息。

    何时使用

        可提供成功、警告和错误等反馈信息。
        顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。
        组件提供了一些静态方法，使用方式和参数请查看API
*/

require.config({
    // baseUrl: '',
    paths: {
        'jquery': 'modules/libs/jq/jquery-3.2.1.min',
        'cssFile': 'modules/libs/rq/css.min'
    }
});
define([
    'jquery',
    'cssFile!modules/message/css/message',
    'cssFile!modules/icons/daojia-icon'
], function($) {
    function Message(paras) {
        this.config(paras);
    }
    Message.prototype = {
        //全局配置
        config: function(paras) {
            var that = this;
            that.setting = {
                top: "24px", //消息距离顶部的位置	  默认值：24px
                duration: 1.5, //自动关闭的延时，单位秒	默认值：1.5
                getContainer: $('body'), //配置渲染节点的输出位置  默认值：document.body
            };

            for (var key in paras) {
                if (paras[key] || paras[key] == 0) {
                    that.setting[key] = paras[key];
                }
            }
        },
        //普通提示，信息提醒反馈。 参数说明： 提示内容 / 自动关闭的延时，单位秒 / 关闭时触发的回调函数
        info: function(content, duration, onClose, fixed) {
            var noticeContent = '<span class="iui-message-notice-content">' + content + '</span>'
            this.prompt(noticeContent, duration, onClose, fixed);
        },
        //成功提示
        success: function(content, duration, onClose, fixed) {
            var noticeContent = '<span class="iui-message-notice-content iui-message-success"><i class="djiui-icon djiui-icon-success"></i>' + content + '</span>'
            this.prompt(noticeContent, duration, onClose, fixed);
        },
        //错误提示
        error: function(content, duration, onClose, fixed) {
            var noticeContent = '<span class="iui-message-notice-content iui-message-error"><i class="djiui-icon djiui-icon-error"></i>' + content + '</span>'
            this.prompt(noticeContent, duration, onClose, fixed);
        },
        //警告提示
        warning: function(content, duration, onClose, fixed) {
            var noticeContent = '<span class="iui-message-notice-content iui-message-warning"><i class="djiui-icon djiui-icon-warning"></i>' + content + '</span>'
            this.prompt(noticeContent, duration, onClose, fixed);
        },
        //进行全局 loading
        loading: function(content, duration, onClose, fixed) {
            var noticeContent = '<span class="iui-message-notice-content iui-message-loading"><i class="djiui-icon djiui-icon-loading"></i>' + content + '</span>'
            this.prompt(noticeContent, duration, onClose, fixed);
        },
        prompt: function(content, duration, onClose, fixed) {
            var that = this;
            var para = that.setting;
            var top = para.top;
            //渲染dom
            var messageHtml = $('<div class="iui-message"></div>');
            var messageNotice = $('<div class="iui-message-notice">' + content + '</div>');

            var messageDom = para.getContainer.find('.iui-message');

            if (messageDom.length <= 0) {
                para.getContainer.append(messageHtml); //渲染节点的输出位置
                if (top != '24px') {
                    $(messageHtml).css({ "top": top }); //消息距离顶部的位置
                }
                if (top == "50%") {
                    $(messageHtml).css({ "transform": "translateY(-50%)" }); //消息距离顶部的位置
                }
            }
            para.getContainer.find('.iui-message').append(messageNotice); //渲染节点的输出位置

            //添加提醒进入动画calss
            setTimeout(function() {
                $(messageNotice).addClass('move-up-enter-active');
            }, 1);
            //提示固定，点击关闭在隐藏提示
            if (fixed) {
                var maskLayer = $('<div class="iui-message-mask-layer"></div>');
                if ($(".iui-message-mask-layer").length == 0) {
                    $('.iui-message').before(maskLayer);
                }
                if (fixed == "fixedButton") {
                    messageNotice.find('.iui-message-notice-content').append('<div class="closemessagebtn"><span class="closemessage">确定</span></div>');
                } else {
                    messageNotice.find('.iui-message-notice-content').append('<i class="djiui-icon djiui-icon-clear closemessage"></span>');
                }
                messageNotice.on("click", ".closemessage", function() {
                    that.closeMessage(messageNotice, 1, onClose, fixed); //提醒自动消失
                });
            } else {
                that.closeMessage(messageNotice, duration, onClose, fixed); //提醒自动消失
            }
        },
        //提醒自动消失
        closeMessage: function($this, duration, onClose, fixed) {
            var that = this;
            var para = that.setting;
            var time = para.duration * 1000; //提醒展示时间

            //提醒展示时间，修改调用传入的延时时间
            if (duration) {
                time = (duration == 1 ? 0 : duration) * 1000;
            }
            //展示时间结束添加离开动画class
            setTimeout(function() {
                $($this).removeClass('move-up-enter-active').addClass('move-up-leave-active');
            }, time);

            //离开动画结束后移除当前提醒
            setTimeout(function() {
                $($this).remove();
                //执行关闭时触发的回调函数
                if (onClose) {
                    onClose(this);
                }
            }, time + 300);

            //所有提醒都移除后，在移除message元素
            setTimeout(function() {
                //移除message层
                if (para.getContainer.find(".iui-message .iui-message-notice").length == 0) {
                    para.getContainer.find(".iui-message").remove();
                    //移除message遮罩层
                    if (para.getContainer.find(".iui-message-mask-layer").length > 0) {
                        para.getContainer.find(".iui-message-mask-layer").remove();
                    }
                }
            }, time + 500);
        }
    }
    return Message;
});
