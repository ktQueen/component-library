/**
 * @name form_visual
 * @description form_visual
 * @author kt
 * @since 2017-9-21
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
    'modules/message/js/message', //消息提示
    'modules/scroll_bar/js/scrollbar', //滚动条
    'modules/modal/js/modal', //弹窗
    'modules/utils/data_type', //判断数据类型方法
    'tools/form_visual/js/form_configs_data', //配置项需要的数据
    'modules/modal/js/modal', //弹窗
    'cssFile!tools/form_visual/css/form_visual'
], function($, Form, Message, scrollbar, Modal, dataType, formConfigsData, modalForWork) {
    /*配置
     * 存在跨域问题，暂时不能用
     * */
    var configuration = {
        toOnline: false, //是否将配置更新到线上
        formOnline: false, //是否获取从线上来的配置
        getUrl: function(domain, url) {
            return "//" + domain + "/" + (url ? url : '');
        },
        getProcessManagerToOnlineUrl: function(url) {
            return this.getUrl(this.toOnline ? "online.com" : "test.cn", url);
        },
        getProcessManagerFormOnlineUrl: function(url) {
            return this.getUrl(this.formOnline ?  "online.com" : "test.cn", url);
        }
    };
    /*----------------------------------------头部区域------------------*/
    var head = {
        /*参数变量*/
        parameter: {
            $introduce: $('.introduce'), //工具介绍按钮
            $configsToJson: $('.configsToJson'), //配置生成JSON按钮
            $jsonToConfigs: $('.jsonToConfigs'), //JSON生成配置按钮
            $preview: $('.preview'), //预览按钮
            jsonTypeData: [ //单据选择
                {
                    id: "id",
                    name: "名字"
                }
            ]
        },
        /*初始化*/
        init: function() {
            var that = this,
                para = that.parameter;
            that.execute();
            that.bind();
        },
        /*默认执行*/
        execute: function() {
            var that = this,
                para = that.parameter;
        },
        /*绑定事件*/
        bind: function() {
            var that = this,
                para = that.parameter;
            //工具介绍按钮事件
            para.$introduce.on('click', function() {
                that.introduceFn();
            });
            //配置生成JSON按钮事件
            para.$configsToJson.on('click', function() {
                that.configsToJsonFn();
            });
            //JSON生成配置按钮事件
            para.$jsonToConfigs.on('click', function() {
                that.jsonToConfigsFn($(this));
            });
            //预览按钮事件
            para.$preview.on('click', function() {
                that.previewFn();
            });
        },
        /*工具介绍函数*/
        introduceFn: function() {
            var that = this,
                para = that.parameter;
            new Modal({
                title: '表单可视化工具介绍',
                hasConfirmBtn: false,
                textCancelBtn: '关闭',
                content: '&nbsp;&nbsp;一.功能说明：<br/>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.头部区域点击预览按钮，生成弹窗或页面展示当前配置效果。<br/>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.头部区域点击配置生成JSON按钮，弹窗显示json结构模板代码。点击确定后，流程平台将为你存储当前配置。<br/>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.头部区域点击JSON生成配置按钮，从流程平台请求到JSON串后在页面显示配置。<br/>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.配置区域默认创建了一个配置模板，可以根据自己需要去增加、删除和移动各个表单元素配置。<br/>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.控件区域点击各个控件可以增加表单元素。<br/>' +
                    '&nbsp;&nbsp;二.使用规则：<br/>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第一级form，添加其他元素无效,无法添加、删除和移动。<br/>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第二级block，添加其他元素无效，添加时自动会跟随添加一个row。在当前block，点击控件<br/>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;block，则在当前block下面添加，<br/>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row，则在当前block里面添加，<br/>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filed，则在当前block里面先添加一个row，再添加当前字段，<br/>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第三级row，添加其他元素无效，添加row时如果没有block，则自动添加block后再添加row。在当前row，点击控件<br/>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;block，则在当前row的父级block下面添加，<br/>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row，则在当前row下面添加，<br/>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filed，则在当前row里面添加，<br/>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第四级Filed(各种字段，如果是配置类型，下面还可以再添加字段)，添加其他元素无效。<br/>' +
                    '&nbsp;&nbsp;三.注意事项：<br/>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当删除的是当前选中的表单元素是，当前选中会自动移至父级元素。<br/>' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当block里有多个row时，添加字段的时候必须选中row<br/>'
            });
        },
        /*配置生成JSON函数*/
        configsToJsonFn: function() {
            var that = this,
                para = that.parameter;
            if (that.isPass()) {
                //弹窗显示JSON
                var configsToJsonModal = new Modal({
                    title: '配置生成JSON',
                    style: {
                        'width': '600px'
                    },
                    textConfirmBtn: '确定',
                    content: '<div><div class="processKey"></div><pre contenteditable="true">' + that.jsonFormat(JSON.stringify(that.getConfigs())) + '</pre></div>',
                    htmlDone: function() {
                        that.processKeyForm = new Form({
                            element: this.$content.find('.processKey'),
                            className: 'processKeyForm',
                            children: [{
                                type: 'block',
                                children: [{
                                    type: 'row',
                                    title: 'processKey：',
                                    children: [{
                                        type: 'single',
                                        placeholder: '请选择你当前配置的类型',
                                        data: para.jsonTypeData,
                                        name: 'processKeySelect',
                                        style: {
                                            width: '40%'
                                        },
                                        change: function(value) {
                                            if (value.length > 0) {
                                                that.processKeyForm.setValue({
                                                    processKey: value[0].id
                                                });
                                                that.processKeyForm.disable('processKey');
                                            } else {
                                                that.processKeyForm.clear('processKey');
                                                that.processKeyForm.enable('processKey');
                                            }
                                        }
                                    }, {
                                        type: 'plainText',
                                        name: 'processKeyPlainText',
                                        value: "或",
                                        style: {
                                            width: '5%'
                                        },
                                    }, {
                                        type: 'text',
                                        placeholder: '请输入你当前配置的类型的processKey',
                                        name: 'processKey',
                                        style: {
                                            width: '55%'
                                        },
                                        validators: [{
                                            method: 'required', //必填
                                            param: '',
                                            message: 'processKey不能为空'
                                        }]
                                    }]
                                }]
                            }]
                        });
                    }
                });
                //确定后向后端发送请求去储存配置
                configsToJsonModal.on('confirm', function() {
                    var $this = $(this);
                    $this.attr('disabled', 'disabled');
                    if (that.processKeyForm.verify()) {
                        $.ajax({
                            url: configuration.getProcessManagerToOnlineUrl() + 'processDynTemp/updateModel',
                            data: {
                                jsonModel: encodeURIComponent(JSON.stringify(that.getConfigs())),
                                processKey: that.processKeyForm.getValue('processKey')
                            },
                            type: 'POST',
                            dataType: 'json',
                            success: function(data) {
                                configsToJsonModal.destroy();
                                if (data.code == 0) {
                                    new Message().success('存储成功');
                                } else {
                                    new Message().error('存储失败');
                                }
                            }
                        });
                    }
                });
            } else {
                new Message().error('没有通过校验');
                $('.form-verify-tip').eq(0).focus(); //如果没有通过校验，定位到提示的第一个元素
            }
        },
        /*字符串转json数据格式化
         * text_value：主要转换的字符串
         * */
        jsonFormat: function(text_value) {
            if (text_value == "") {
                new Message().error('配置为空');
                return false;
            } else {
                var res = "";
                for (var i = 0, j = 0, k = 0, ii, ele; i < text_value.length; i++) { //k:缩进，j:""个数
                    ele = text_value.charAt(i);
                    if (j % 2 == 0 && ele == "}") {
                        k--;
                        for (ii = 0; ii < k; ii++) ele = "    " + ele;
                        ele = "\n" + ele;
                    } else if (j % 2 == 0 && ele == "{") {
                        ele += "\n";
                        k++;
                        //debugger;
                        for (ii = 0; ii < k; ii++) ele += "    ";
                    } else if (j % 2 == 0 && ele == ",") {
                        ele += "\n";
                        for (ii = 0; ii < k; ii++) ele += "    ";
                    } else if (ele == "\"") j++;
                    res += ele;
                }
                return res;
            }
        },
        /*获取配置*/
        getConfigs: function() {
            var that = this,
                para = that.parameter;
            var configsResult = {
                children: []
            }; //配置的结果JSON串
            that.getConfigsResult($('.configs'), configsResult.children);
            return configsResult.children[0];
        },
        getConfigsResult: function($ele, configsResult) {
            var that = this,
                para = that.parameter;
            $ele.children('.config-ele').each(function() {
                var index = $ele.children('.config-ele').index(this);
                var config = configs.parameter.configsForm[$(this).attr('index')];
                if (config.$ele.attr('children')) {
                    configsResult[index] = $.extend(true, {
                        type: config.currentType,
                        [config.$ele.attr('children')]: []
                    }, that.configsData(config));
                    that.getConfigsResult($(this), configsResult[index][config.$ele.attr('children')]);
                } else {
                    configsResult[index] = $.extend(true, {
                        type: config.currentType
                    }, that.configsData(config));
                }
            });
        },
        /*配置数据
         * v：数据，转换成当前场景得到当前所需要的数据
         * */
        configsData: function(v) {
            var that = head,
                para = that.parameter;
            var formConfigs = $.extend(true, {}, v.form.getValue()); //获取到每个表单的结果值
            $.each(formConfigs, function(configsName, configsValue) {
                var currentDataType = formConfigsData.configsData[v.currentType][configsName].dataType;
                if (currentDataType == 'function') { //如果是function的数据类型，则存储一个对象，在组件去解析
                    if (configsValue == 'dataRequest.person') {
                        configsValue = dataRequest.person
                    }
                    formConfigs[configsName] = {
                        dataType: 'function',
                        value: configsValue == '' ? null : configsValue
                    };
                } else if (currentDataType == 'string') {
                    formConfigs[configsName] = configsValue;
                } else {
                    var currentConfig = formConfigsData.configsData[v.currentType][configsName];
                    that.arrayDeal(currentConfig, currentDataType, configsValue);
                    formConfigs[configsName] = dataType(configsValue) == 'string' ? JSON.parse(configsValue) : configsValue;
                }
            });
            return formConfigs;
        },
        /*如果取到的是数组，则主要判断里面的元素是否有function类型的，如果有，则需要再次处理*/
        arrayDeal: function(currentConfig, currentDataType, configsValue) {
            var that = head,
                para = that.parameter;
            if (currentDataType == 'array') { //为了处理联动操作的那种情况
                var type = currentConfig.type;
                var children = '';
                if (type == 'tableParaConfig') {
                    children = currentConfig.childrenTbody;
                } else if (type == 'blockParaConfig') {
                    children = currentConfig.childrenBlock;
                }
                $.each(children, function(iChildren, vChildren) {
                    $.each(configsValue, function(iConfigsValue, vConfigsValue) {
                        if (vChildren.dataType == 'function') {
                            vConfigsValue[vChildren.name] = {
                                dataType: 'function',
                                value: vConfigsValue[vChildren.name] == '' ? null : vConfigsValue[vChildren.name]
                            }
                        }
                        that.arrayDeal(vChildren, vChildren.dataType, configsValue[iConfigsValue][vChildren.name]);
                    });
                });
            }
        },
        /*JSON生成配置*/
        jsonToConfigsFn: function($this) {
            var that = this,
                para = that.parameter;
            $this.attr('disabled', 'disabled');
            para.jsonToConfigsModal = new Modal({
                title: 'JSON生成配置',
                style: {
                    'width': '600px',
                    'height': '300px'
                },
                textConfirmBtn: '确定',
                htmlDone: function() {
                    that.jsonToConfigsForm = new Form({
                        element: this.$content,
                        children: [{
                            type: "block",
                            children: [{
                                type: "row",
                                title: '请选择请求的类型：',
                                isShowRequired: true,
                                children: [{
                                    type: 'single',
                                    name: 'urlSelect',
                                    placeholder: '请选择请求的类型',
                                    data: para.jsonTypeData,
                                    change: function(value) {
                                        if (value.length > 0) {
                                            that.jsonToConfigsForm.setValue({
                                                'urlText': configuration.getProcessManagerFormOnlineUrl() + 'processDynTemp/queryModelCreatPrc?processKey=' + value[0].id
                                            });
                                            that.jsonToConfigsForm.disable('urlText');
                                        } else {
                                            that.jsonToConfigsForm.clear('urlText');
                                            that.jsonToConfigsForm.enable('urlText');
                                        }
                                    }
                                }, {
                                    type: 'plainText',
                                    name: 'urlPlainText',
                                    value: "或"
                                }, {
                                    type: 'text',
                                    name: 'urlText',
                                    value: "tools/form_visual/",
                                    placeholder: '请输入请求的地址',
                                    validators: [{
                                        method: 'required', //必填
                                        param: '',
                                        message: '请求的地址不能为空'
                                    }]
                                }]
                            }]
                        }]
                    });
                }
            });
            para.jsonToConfigsModal.on('confirm', function() {
                var $thisBtn = $(this);
                $thisBtn.attr('disabled', 'disabled');
                if (that.jsonToConfigsForm.verify()) {
                    $.ajax({
                        url: that.jsonToConfigsForm.getValue('urlText'),
                        dataType: 'json',
                        success: function(data) {
                            $thisBtn.removeAttr('disabled');
                            configs.parameter.$configs.empty(); //清空配置区域
                            configs.parameter.configsForm = {};
                            configs.parameter.num = 0;
                            if (that.jsonToConfigsForm.getValue('urlSelect').length > 0) {
                                //configs.createConfigArea(JSON.parse(data.data.modalCreateProc), configs.parameter.$configs);//工单
                                //configs.createConfigArea(JSON.parse(data.repData.formData.modalCreateProc), configs.parameter.$configs);//财务
                                configs.createConfigArea(JSON.parse(data.data), configs.parameter.$configs);
                            } else {
                                configs.createConfigArea(data, configs.parameter.$configs);
                            }
                            that.destroyJsonToConfigsModal($this);
                        },
                        error: function(data) {
                            console.log(data);
                        }
                    });
                }
            });
            para.jsonToConfigsModal.on('close', function() {
                that.destroyJsonToConfigsModal($this);
            });
            para.jsonToConfigsModal.on('cancel', function() {
                that.destroyJsonToConfigsModal($this);
            });
        },
        /*摧毁json生成配置弹窗*/
        destroyJsonToConfigsModal: function($this) {
            var that = this,
                para = that.parameter;
            para.jsonToConfigsModal.destroy();
            $this.removeAttr('disabled');
        },
        /*表单预览*/
        previewFn: function() {
            var that = this,
                para = that.parameter;
            if (that.isPass()) {
                var previewForm = '';
                var previewModal = new Modal({
                    title: '表单预览',
                    textConfirmBtn: '确定',
                    htmlDone: function() {
                        previewForm = new Form({
                            element: this.$content, //当前需要生成表单的元素
                            children: [{
                                type: "block",
                                children: [{
                                    type: 'row',
                                    title: '请选择展现形式：',
                                    children: [{
                                        type: 'radio',
                                        getValueKey: 'id',
                                        name: 'preview',
                                        value: [{
                                            id: '1',
                                            name: '弹窗形式'
                                        }],
                                        data: [{
                                            id: '1',
                                            name: '弹窗形式'
                                        }, {
                                            id: '2',
                                            name: '页面形式'
                                        }]
                                    }]
                                }]
                            }]
                        });
                    }
                });
                previewModal.on('confirm', function() {
                    previewModal.destroy();
                    var configsResult = that.getConfigs();
                    if (previewForm.getValue('preview') == '2') {
                        $('[name="formConfigs"]').val(JSON.stringify(configsResult));
                        window.open('//localhost:63342/IUI/tools/form_visual/preview.html');
                    } else {
                        new Modal({
                            style: configsResult.style,
                            title: configsResult.title || '表单预览',
                            textConfirmBtn: '确定',
                            htmlDone: function() {
                                configsResult.element = this.$content; //预览需要把表单元素指定为工具预览的元素
                                configsResult.title = '';
                                configsResult.style = '';
                                new Form(configsResult);
                            }
                        });
                    }
                });
            } else {
                new Message().error('没有通过校验');
                $('.form-verify-tip').eq(0).focus(); //如果没有通过校验，定位到提示的第一个元素
            }
        },
        /*校验配置是否能够生成JSON和预览*/
        isPass: function() {
            var that = this,
                para = that.parameter;
            var isPass = true;
            //校验必填项
            $.each(configs.parameter.configsForm, function(i, v) {
                if (configs.parameter.$configs.find(v.$ele).length > 0 && !v.form.verify()) { //当元素存在的情况下才进行校验
                    isPass = false;
                }
            });
            return isPass;
        }
    };
    /*----------------------------------------配置区域-----------------------*/
    var configs = {
        /*参数变量*/
        parameter: {
            $configs: $('.configs'), //配置区域元素
            btns: { //配置数据按钮
                'open': '展开',
                'close': '收起', //默认是展开的，所以默认显示收起按钮
                'openAll': '展开全部',
                'closeAll': '收起全部', //默认是展开的，所以默认显示收起按钮
                'up': '上移',
                'down': '下移',
                'remove': '删除'
            },
            configsForm: {}, //配置表单存储
            num: 0, //索引
            firstIndex: 2, //第一个块和行的索引是从2开始的，前面有一个按钮区域和配置区域
            controlsNoFiled: ['form', 'block', 'row', 'index', 'actions'], //控件数据不是字段的
        },
        /*初始化*/
        init: function() {
            var that = this,
                para = that.parameter;
            that.execute();
            that.bind();
        },
        /*默认执行*/
        execute: function() {
            var that = this,
                para = that.parameter;
            //创建默认JSON到配置区域
            var defaultJsonToConfig = $.extend(true, {}, formConfigsData.configsData.form);
            defaultJsonToConfig.children.push($.extend(true, {}, formConfigsData.configsData.block));
            defaultJsonToConfig.children[0].children.push($.extend(true, {}, formConfigsData.configsData.row));
            //defaultJsonToConfig.children[0].children[0].children.push($.extend(true,{},formConfigsData.configsData.hidden));
            that.createConfigArea(defaultJsonToConfig, para.$configs);
        },
        /*绑定事件*/
        bind: function() {
            var that = this,
                para = that.parameter;
            //点击块配置区域
            para.$configs.on('click', '.config-ele', function(e) {
                if ($(e.target).closest('.form-field-element').length > 0) { //如果点击的是表单元素不做操作
                } else {
                    $('.config-ele').removeClass('active');
                    $(this).addClass('active');
                    that.currentIsParaConfig();
                }
                return false;
            });
            //点击展开
            para.$configs.on('click', '.open', function() {
                $(this).closest('.config-ele').removeClass('config-close').addClass('config-open');
                $('.config-ele').each(function() {
                    var num = 0;
                    $(this).find('.close').each(function() {
                        if ($(this).css('display') == 'none') {
                            num++
                        }
                    });
                    if (num == 0) {
                        $(this).find('.closeAll').show();
                        $(this).find('.openAll').hide();
                    }
                });
                that.lastHide($('.config-ele'));
                return false;
            });
            //点击收起
            para.$configs.on('click', '.close', function() {
                $(this).closest('.config-ele').removeClass('config-open').addClass('config-close');
                $('.config-ele').each(function() {
                    var num = 0;
                    $(this).find('.open').each(function() {
                        if ($(this).css('display') == 'none') {
                            num++
                        }
                    });
                    if (num == 0) {
                        $(this).find('.closeAll').hide();
                        $(this).find('.openAll').show();
                    }
                });
                that.lastHide($('.config-ele'));
                return false;
            });
            //点击展开全部
            para.$configs.on('click', '.openAll', function() {
                var $ele = $(this).closest('.config-ele');
                $ele.find('.openAll').hide();
                $ele.find('.closeAll').show();
                $ele.removeClass('config-close').addClass('config-open');
                $ele.find('.config-ele').removeClass('config-close').addClass('config-open');
                that.lastHide($('.config-ele'));
                return false;
            });
            //点击收起全部
            para.$configs.on('click', '.closeAll', function() {
                var $ele = $(this).closest('.config-ele');
                $ele.find('.closeAll').hide();
                $ele.find('.openAll').show();
                $ele.removeClass('config-open').addClass('config-close');
                $ele.find('.config-ele').removeClass('config-open').addClass('config-close');
                that.lastHide($('.config-ele'));
                return false;
            });
            //点击上移
            para.$configs.on('click', '.up', function() {
                that.upFn($(this));
                return false;
            });
            //点击下移
            para.$configs.on('click', '.down', function() {
                that.downFn($(this));
                return false;
            });
            //点击删除
            para.$configs.on('click', '.remove', function() {
                that.removeFn($(this));
                return false;
            });
        },
        /*创建一整块配置区域
         * configJson:配置的json
         * */
        createConfigArea: function(configJson, parentEle) {
            var that = this,
                para = that.parameter;
            var $configEle;
            $.each(configJson, function(i, v) {
                if (i == 'type') {
                    $configEle = $('<div class="config-ele config-open config-' + v + '"></div>'); //选中当前的表单元素
                    parentEle.append($configEle);
                    if (that.isFiledControl(v)) {
                        $configEle.addClass('config-filed'); //字段元素
                    }
                    $('.config-ele').removeClass('active'); //把表单元素选中清空
                    $configEle.addClass('active');
                    that.createTitleAndBtns($configEle);
                    that.currentIsParaConfig();
                    that.createConfigList($configEle, v, configJson);
                }
                if (i == 'children' || i == 'childrenList' || i == 'childrenTbody' || i == 'childrenBlock') {
                    $configEle.attr('children', i);
                    $.each(v, function(index, value) {
                        that.createConfigArea(value, $configEle); //递归配置
                    });
                }
            });
        },
        /*生成每个配置区域的标题和操作按钮*/
        createTitleAndBtns: function($ele) {
            var that = this,
                para = that.parameter,
                btnsHtml = '';
            $.each(para.btns, function(i, v) {
                btnsHtml += '<button class="' + i + '">' + v + '</button>';
            });
            $ele.append('<div class="config-header"><h2 class="config-title"></h2><div class="form-visual-btns">' + btnsHtml + '</div></div>');
        },
        /*当前选中的是否是配置项或者父元素是否是配置项,如果是配置项显示index和actions*/
        currentIsParaConfig: function() {
            var that = this,
                para = that.parameter;
            that.lastHide($('.config-ele'));
            if ($('.config-ele.active').hasClass('config-tableParaConfig') ||
                $('.config-ele.active').hasClass('config-blockParaConfig') ||
                $('.config-ele.active').hasClass('config-paraConfig') ||
                $('.config-ele.active').closest('.config-tableParaConfig').length > 0 ||
                $('.config-ele.active').closest('.config-blockParaConfig').length > 0 ||
                $('.config-ele.active').closest('.config-paraConfig').length > 0) {
                $('[type="index"]').show();
                $('[type="actions"]').show();
            } else {
                $('[type="index"]').hide();
                $('[type="actions"]').hide();
            }
        },
        lastHide: function($ele) {
            $ele.each(function() {
                if ($(this).find('.openAll').css('display') == 'none') {
                    $(this).find('.closeAll').show();
                }
                if ($(this).find('.config-ele').length == 0) {
                    $(this).find('.closeAll').hide(); //最后一个不显示收起全部按钮
                    $(this).find('.openAll').hide(); //最后一个不显示展示全部按钮
                }
            });

        },
        /*生成配置列表*/
        createConfigList: function($ele, currentType, filedConfigJson) {
            var that = this,
                para = that.parameter,
                $formEle = $('<div class="config-ele-txt"></div>'), //生成配置的元素
                currentConfig = []; //存储当前类型的配置
            para.num++;
            $ele.append($formEle).attr('index', currentType + para.num);
            that.createCurrentConfig(filedConfigJson, currentConfig, currentType);
            //通过配置创建对应的表单
            var form = new Form({
                element: $formEle, //当前需要生成表单的元素
                handlerEvent: formConfigsData.configsHandlerEvent[currentType] ? formConfigsData.configsHandlerEvent[currentType] : '',
                children: [{
                    type: "block",
                    children: currentConfig
                }]
            });
            para.configsForm[currentType + para.num] = { //存储生成的表单的配置结果和默认值的数据类型
                $ele: $ele,
                currentType: currentType,
                form: form
            };
            //文本域事件
            setTimeout(function() {
                that.textareaEvent();
            }, 20);
        },
        /*生成当前的配置列表对应的表单的配置*/
        createCurrentConfig: function(config, currentConfig, currentType) {
            var that = this,
                para = that.parameter;
            var requiredArr = formConfigsData.isShowRequiredConfigs[that.isFiledControl(currentType) ? 'filed' : currentType]; //必填标志
            var filed = $.extend(true, {}, formConfigsData.configsData.filed);
            if (that.isFiledControl(currentType)) { //如果是字段需要去拿一下filed里面的配置
                formConfigsData.configsData[currentType] = $.extend(true, filed, formConfigsData.configsData[currentType]); //这里不能覆盖
            }
            $.each(formConfigsData.configsData[currentType], function(i, v) {
                if (i != 'type' && i != 'children' && i != "childrenList" && i != "childrenTbody" && i != "childrenBlock") { //如果是type或者children则不用生成配置型，type是已知的，children是生成的
                    var isRequired = $.inArray(i, requiredArr) != '-1' ? true : false;
                    var val = '';
                    if (config[i] != undefined) { //如果配置项上有这个则直接在配置项上拿
                        if (config[i].defaultValue == undefined) {
                            if (config[i].dataType == 'function') {
                                val = config[i].value
                            } else {
                                val = config[i];
                            }
                        } else {
                            val = v.defaultValue;
                        }
                    } else { //如果配置上没有则直接走默认的配置
                        val = v.defaultValue;
                    }
                    currentConfig.push({
                        type: "row",
                        title: i + '：',
                        isShowRequired: isRequired,
                        name: i + 'Row',
                        children: [
                            $.extend(true, {
                                name: i,
                                'data-name': currentType + i,
                                type: 'text',
                                placeholder: '请输入' + i,
                                value: formConfigsData.configsData[currentType][i].valueFn(val),
                                validators: isRequired ? [{
                                    method: 'required', //必填
                                    param: '',
                                    message: '不能为空'
                                }] : []
                            }, formConfigsData.configsData[currentType][i])
                        ]
                    });
                }
            });
        },
        /*判断是否为字段控件
         * return 返回值为true为是字段控件，返回值是false为不是字段控件
         * */
        isFiledControl: function(currentType) {
            var that = this,
                para = that.parameter;
            for (var i = 0; i < para.controlsNoFiled.length; i++) {
                if (currentType == para.controlsNoFiled[i]) {
                    return false;
                }
            }
            return true;
        },
        /*多行文本框获取焦点变大，是去焦点变小*/
        textareaEvent: function() {
            var that = this,
                para = that.parameter;
            var $textarea = para.$configs.find('.form-field-textarea .form-field-element');
            $textarea.css({
                'position': 'relative',
                'height': '22px',
                'resize': 'auto'
            });
            $textarea.on('blur', function() {
                $(this).css({ 'z-index': '0' });
                $(this).stop().animate({ 'height': '22px' });
            });
            $textarea.on('focus', function() {
                $(this).css({ 'z-index': '1' });
                $(this).stop().animate({ 'height': '100px' });
            });
        },
        /*上移函数*/
        upFn: function($this) {
            var that = this,
                $ele = $this.closest('.config-ele');
            $ele.prev().before($ele);
        },
        /*下移函数*/
        downFn: function($this) {
            var that = this,
                $ele = $this.closest('.config-ele');
            $ele.next().after($ele);
        },
        /*删除函数*/
        removeFn: function($this) {
            var that = this,
                $ele = $this.closest('.config-ele'),
                $parent = $ele.parent();
            $ele.remove();
            ($ele.hasClass('active') || $ele.find('.active').length > 0) && $parent.addClass('active'); //当前删除的正好是选中项,则选中父级
            that.currentIsParaConfig();
        }
    };
    /*--------------------------------------- 控件区域-----------------------------*/
    var controls = {
        /*参数变量*/
        parameter: {
            $controlsBox: $('.controls-box'), //控件区域元素
            $controls: $('.controls'), //可滚动区域
            $controlsUl: $('.controls ul'), //控件列表区域
            top: $('.form-visual-header').outerHeight() + $('.attention').outerHeight(), //控件距离顶部的距离
            spaceWidth: 5, //间距
            controls: { //控件数据
                "block": { text: "block(块)" },
                "row": { text: "row(行)" },
                "text": { text: "text(单行文本输入框)" },
                "textarea": { text: "textarea(多行文本输入框)" },
                "textareaAuto": { text: "textareaAuto(多行文本输入框，高度跟随内容)" },
                "password": { text: "password(密码输入框)" },
                "hidden": { text: "hidden(隐藏域)" },
                "plainText": { text: "plainText(纯文本)" },
                "single": { text: "single(单选下拉框)" },
                "singleSearch": { text: "singleSearch(单选下拉搜索框)" },
                "multiple": { text: "multiple(多选下拉框)" },
                "multipleSearch": { text: "multipleSearch(多选下拉搜索框)" },
                "date": { text: "date(时间选择下拉框)" },
                "date2": { text: "date2(新版时间选择下拉框)" },
                "radio": { text: "radio(单选框)" },
                "checkbox": { text: "checkbox(复选框)" },
                "manifest": { text: "manifest(多标签)" },
                "upload": { text: "upload(文件上传)" },
                "umEditor": { text: "umEditor(富文本编辑器)" },
                "city": { text: "city(城市选择器)" },
                "paraConfig": { text: "paraConfig(行增删配置)" },
                "tableParaConfig": { text: "tableParaConfig(表格配置)" },
                "blockParaConfig": { text: "blockParaConfig(块配置)" },
                "index": { text: "index(索引-配置项才可以添加)" },
                "actions": { text: "actions(操作-配置项才可以添加)" },
            },
        },
        /*初始化*/
        init: function() {
            var that = this,
                para = that.parameter;
            that.execute();
            that.bind();
        },
        /*默认执行*/
        execute: function() {
            var that = this,
                para = that.parameter;
            //创建控件区域
            that.createControlsArea();
        },
        /*绑定事件*/
        bind: function() {
            var that = this,
                para = that.parameter;
            // 窗口滚动事件
            $(window).on('scroll', function() {
                that.controlsFlowPageScroll();
            });
            // 窗口缩小放大事件
            $(window).on('resize', function() {
                that.controlsSet(); //屏幕放大与缩小控件区域的高度跟随变化，当控件内容高度大于屏幕高度时出现滚动条
            });
            //控件区域点击事件
            para.$controls.on('click', 'li', function() {
                that.controlsClickFn($(this));
            });
        },
        /*生成控件区域的布局*/
        createControlsArea: function() {
            var that = this,
                para = that.parameter,
                controlsHtml = '';
            $.each(para.controls, function(i, v) {
                controlsHtml += '<li type="' + i + '">' + v.text + '</li>';
            });
            para.$controlsUl.html(controlsHtml); //控件区域内容
            para.$controlsLi = para.$controlsUl.find('li'); //控件列表
            para.$controlsUl.css('height', that.controlsHeight());
            that.controlsSet();
        },
        /*设置控件区域高度*/
        controlsHeight: function() {
            var that = this,
                para = that.parameter;
            var h = 0;
            para.$controlsLi.each(function(i, v) {
                h += $(this).outerHeight() + para.spaceWidth;
            });
            return h - para.spaceWidth;
        },
        /*控件区域高度和超出滚动条设置*/
        controlsSet: function() {
            var that = this,
                para = that.parameter,
                h1 = that.controlsHeight() + para.spaceWidth * 4, //根据列表内容能给控件区域设置的最大高度
                h2 = $(window).height() - para.top; //根据页面大小能给控件区域设置的最大高度
            para.$controlsBox.css({
                'min-height': (h1 > h2 ? h2 : h1) //给控件区域设置的最小高度，避免内容高度大于容器
            });
            para.$controls.css({
                'height': h2 - para.spaceWidth * 4 //滚动区域的高度设置
            });
            para.$controls.perfectScrollbar('update');
            para.$controls.perfectScrollbar();
        },
        /*控件区域跟随页面滚动设置*/
        controlsFlowPageScroll: function() {
            var that = this,
                para = that.parameter,
                top = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop, //获取屏幕滚动高度
                h = $(window).height() - para.spaceWidth * 4; //控件区域能占的最大高度
            if (top > para.top) { //当屏幕滚动高度大于控件区域距离顶部的高度时，控件区域跟随滚动，否则则定位到顶部固定高度，滚动区域高度也发生变化
                para.$controls.css({
                    'top': top - para.top + para.spaceWidth * 2,
                    'height': h
                });
            } else {
                para.$controls.css({
                    'top': para.spaceWidth * 2,
                    'height': h - (para.top - top)
                });
            }
        },
        /*控件点击函数
         * $this:当前点击的元素
         * */
        controlsClickFn: function($this) {
            var that = this,
                para = that.parameter,
                currentType = $this.attr('type'), //当前类型
                $block = configs.parameter.$configs.find('.config-block'), //块配置
                $row = $block.find('.config-row'),
                $form = configs.parameter.$configs.find('.config-form'),
                $active; //行配置
            if (currentType == 'block') { //当前点击block，直接在form最后添加block,并且默认添加一个行
                configs.createConfigArea(formConfigsData.configsData[currentType], $form);
                $active = configs.parameter.$configs.find('.active');
                configs.createConfigArea(formConfigsData.configsData.row, $active.closest('.config-block'));
            } else if (currentType == 'row') { //当前点击row
                if ($block.length == 0) { //如果没有block，则自动添加block,在block里添加row
                    configs.createConfigArea(formConfigsData.configsData.block, $form);
                } else { //如果有block
                    if ($('.config-form').hasClass('active')) {
                        new Message().error('请先选中块,才可以添加行');
                        return false;
                    }
                }
                $active = configs.parameter.$configs.find('.active');
                configs.createConfigArea(formConfigsData.configsData[currentType], $active.closest('.config-block')); //添加元素
            } else { //当前点击filed
                if ($block.length == 0) {
                    configs.createConfigArea(formConfigsData.configsData.block, $form);
                    $active = configs.parameter.$configs.find('.active');
                    configs.createConfigArea(formConfigsData.configsData.row, $active.closest('.config-block'));
                } else {
                    if ($row.length == 0) {
                        if ($('.config-form').hasClass('active')) {
                            new Message().error('请先选中块,才可以添加字段');
                            return false;
                        }
                        $active = configs.parameter.$configs.find('.active');
                        configs.createConfigArea(formConfigsData.configsData.row, $active.closest('.config-block'));
                    } else {
                        if ($('.config-form').hasClass('active')) {
                            new Message().error('请先选中行,才可以添加字段');
                            return false;
                        }
                        if ($('.config-block').hasClass('active')) {
                            new Message().error('请先选中行,才可以添加字段');
                            return false;
                        }
                    }
                }
                $active = configs.parameter.$configs.find('.active');
                var parentEle;
                if ($active.hasClass('config-blockParaConfig') ||
                    $active.hasClass('config-paraConfig') ||
                    $active.hasClass('config-tableParaConfig') ||
                    $active.hasClass('config-row')) { //当前选中元素是row
                    parentEle = $active;
                } else if ($active.parent().hasClass('config-blockParaConfig') ||
                    $active.parent().hasClass('config-paraConfig') ||
                    $active.parent().hasClass('config-tableParaConfig') ||
                    $active.parent().hasClass('config-row')) { //当前父元素有行
                    parentEle = $active.parent();
                }
                configs.createConfigArea(formConfigsData.configsData[currentType], parentEle); //添加元素
            }
        }
    };
    controls.init(); //控制区域先生成
    configs.init();
    head.init();
});
