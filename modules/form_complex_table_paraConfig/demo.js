require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/form_complex_table_paraConfig/js/form_complex_table_paraConfig',
    'modules/city_selector/js/city_data'
], function(FormTable,cityData) {
    var demo1= new FormTable({
        element: $('#demo1'),
        type: 'tableParaConfig',
        isShowRequired:true,
        title: '可添加行的table类型：',
        name: 'addTableName3',
        layout:'up-down',
        childrenThead:['序号','检查内容','检查结果','检查内容','检查内容','检查结果','操作'],
        childrenTbody:[
            {   type:"index",
                value:"第{{index}}行",
                style:{
                    width:'80px'
                },
                language:"number"//number,roman,chinese ，
            },
            {
                type: 'plainText',
                name: 'table-plainText',
                title: 'plainText',
                layout:'up-down',
                value: '2',
            },
            {
                type: 'text',
                name: 'table3-textName',
                title: 'text',
                layout:'up-down',
                value: '2',
                placeholder: '请输入你的2323',
                maxlength: '2000',
                validators:[
                    {
                        method:'required',//必填
                        param:'',
                        message:'text不能为空'
                    }
                ]
            },
            {
                type: 'password',
                name: 'table3-passwordName',
                title: 'password',
                layout:'up-down',
                value: '2',
                placeholder: '请输入你的444码',
                maxlength: '2000',
                validators:[
                    {
                        method:'required',//必填
                        param:'',
                        message:'text不能为空'
                    }
                ]
            },
            {
                type: 'textarea',
                name: 'table3-textarea',
                title: 'textarea',
                layout:'up-down',
                placeholder: '请输入',
                value: '2',
            },
            {
                type: 'textareaAuto',
                name: 'table3-textareaAuto',
                title: 'textareaAuto',
                layout:'up-down',
                placeholder: '请输入',
                value: '2',
            },
            {
                type: 'hidden',
                name: 'table3-hidden',
                title: 'hidden',
                layout:'up-down',
                value: '2',
            },
            {
                type: 'single', //类型，单选，单选搜索，多选，多选搜索
                name: 'table3-single',
                title: 'single',
                layout:'up-down',
                isRequired: 'true',
                isShowRequired:true,
                value: {
                    id: '2',
                    name: '立项项目'
                },
                data: function(callback) {
                    var data = [{
                        id: '1',
                        name: '敏捷项目'
                    }, {
                        id: '2',
                        name: '立项项目'
                    }];
                    callback && callback(data);
                },
                placeholder: '请选择项目类型',
                tip:"注：我是一个小提示",
                validators:[
                    {
                        method:'required',//必填
                        param:'',
                        message:'text不能为空'
                    }
                ]
            },
            {
                type: 'singleSearch', //类型，单选，单选搜索，多选，多选搜索
                name: 'table3-singleSearch',
                title: 'singleSearch',
                layout:'up-down',
                isShowRequired:true,
                data: function(callback) {
                    var data = [{
                        id: '1',
                        name: '敏捷项目'
                    }, {
                        id: '2',
                        name: '立项项目'
                    }];
                    callback && callback(data);
                },
                placeholder: '请选择项目类型',
                validators:[
                    {
                        method:'required',//必填
                        param:'',
                        message:'text不能为空'
                    }
                ]
            },
            {
                type: 'multiple', //类型，单选，单选搜索，多选，多选搜索
                name: 'table3-multiple',
                title: 'multiple',
                layout:'up-down',
                value: {
                    id: '2',
                    name: '立项项目'
                },
                data: function(callback) {
                    var data = [{
                        id: '1',
                        name: '敏捷项目'
                    }, {
                        id: '2',
                        name: '立项项目'
                    }];
                    callback && callback(data);
                },
                placeholder: '请选择项目类型',
                tip:"注：我是一个小提示",
                validators:[
                    {
                        method:'required',//必填
                        param:'',
                        message:'text不能为空'
                    }
                ]
            },
            {
                type: 'multipleSearch', //类型，单选，单选搜索，多选，多选搜索
                name: 'table3-multipleSearch',
                title: 'multipleSearch',
                layout:'up-down',
                isShowRequired:true,
                data: function(callback) {
                    var data = [{
                        id: '1',
                        name: '敏捷项目'
                    }, {
                        id: '2',
                        name: '立项项目'
                    }];
                    callback && callback(data);
                },
                placeholder: '请选择项目类型',
                validators:[
                    {
                        method:'required',//必填
                        param:'',
                        message:'text不能为空'
                    }
                ]
            },
            {
                type: 'date',
                name: 'table3-date',
                title: 'date',
                layout:'up-down',
                value: '2015-01-01 ~ 2015-02-03',
            },
            {
                type: 'radio',
                name: 'textName',
                title: 'radio',
                layout:'up-down',
                data:[{
                    id:"0",
                    name:'否'
                },{
                    id:"1",
                    name:'是'
                }],
                validators:[
                    {
                        method:'required',//必填
                        param:'',
                        message:'名称不能为空'
                    }
                ]
            },{
                type: 'checkbox',
                name: 'checkBox',
                title: 'checkBox',
                layout:'up-down',
                data:[{
                    id:"0",
                    name:'否'
                },{
                    id:"1",
                    name:'是'
                }],
                validators:[
                    {
                        method:'required',//必填
                        param:'',
                        message:'名称不能为空'
                    }
                ]
            },
            {
                type: 'manifest', //单选，只有一个，可不选
                title: 'manifest',
                layout:'up-down',
                name: 'manifest1',
                data: function (callback, val) {
                    setTimeout(function () {
                        callback(['啦啦啦2', '阿萨德', '工单13', '工单2', '工单', '工单', '玩儿翁2']);
                        //callback(['啦啦啦1','阿萨德','工单','个梵蒂冈','玩儿翁']);
                    }, 1000)
                },
            },
            {
                type:'upload',
                url:'upload.json',
                title:'文件上传',
                name:'upload',
                validators:[
                    {
                        method:'required',//必填
                        param:'',
                        message:'文件不能为空'
                    },
                    {
                        method:'function',//自己写逻辑
                        param:function(){
                            return true;
                        },//必须有返回值
                        message:'不能通过逻辑'
                    }
                ]
            },
            {
                type:'city',
                name:'city',
                data:cityData,
                isOwnData:true,
                validators:[
                    {
                        method:'required',//必填
                        param:'',
                        message:'文件不能为空'
                    },
                    {
                        method:'function',//自己写逻辑
                        param:function(){
                            return true;
                        },//必须有返回值
                        message:'不能通过逻辑'
                    }
                ]
            },
            {   type:"actions",
                value:[{
                    code:'add',
                    title:'添加',
                    fn:function(){
                        console.log('wwwwwwwwwwwwww');
                    }},"remove","up","down","upToTop","downToBottom",{
                    code:'djiui-icon-actions-popMenu',
                    title:'弹窗',
                    fn:function(){
                        console.log($(this));
                    }
                }],
                updateValue:['table3-single','table3-textName'],//添加的时候需要更新上次的value
                plusOnlyOne:false,//是否在最后一行添加,true为在最后一行添加，false则是点击哪里在哪里添加
                isDeleteOnlyOne:true,//是否可以删除唯一一行,默认是不可以的
                language:"icon"//图标icon ,文字character
            }
        ],//只配置一行数据就可以了
        tip:"注：我是一个小提示11"
    });
    /*--------------------------设置数据-----------------*/
    $('.set-data').on('click', function() {
        demo1.setData([
            {
                'table3-single':{
                    id:'1',
                    name:'敏捷项目'
                },
                'table3-singleSearch':{
                    id:'1',
                    name:'敏捷项目'
                },
                'table3-textName':'1',
                'table3-passwordName':'123'
            },
            {
                'table3-single':{
                    id:'2',
                    name:'立项'
                },
                'table3-singleSearch':{
                    id:'1',
                    name:'敏捷项目'
                },
                'table3-textName':'2222222222',
                'table3-passwordName':'123'
            }
        ]);
//        demo1.setData(
//            {
//                'table3-single':{
//                    id:'1',
//                    name:'敏捷项目'
//                },
//                'table3-singleSearch':{
//                    id:'1',
//                    name:'敏捷项目'
//                },
//                'table3-textName':'1',
//                'table3-passwordName':'123'
//            },0);
    });
    /*--------------------------设置数据-----------------*/
    $('.set').on('click', function() {
        demo1.setValue([
            {
                'table3-singleSearch':{
                    id:'2',
                    name:'敏捷项目'
                },
                'table3-single':{
                    id:'1',
                    name:'立项'
                },
                'table3-textName':'1',
                'table3-passwordName':'123'
            },
            {
                'table3-single':{
                    id:'2',
                    name:'立项'
                },
                'table3-singleSearch':{
                    id:'1',
                    name:'敏捷项目'
                },
                'table3-textName':'2222222222',
                'table3-passwordName':'123'
            }
        ]);
//        demo1.setValue(
//            {
//                'table3-single':{
//                    id:'1',
//                    name:'敏捷项目'
//                },
//                'table3-singleSearch':{
//                    id:'1',
//                    name:'敏捷项目'
//                },
//                'table3-textName':'12222222',
//                'table3-passwordName':'123'
//            },0);
    });
    /*--------------------------获取方法-----------------*/
    $('.get').on('click', function() {
//        demo1.getValue(function(data) {
//            console.log(data);
//        });
//        console.log(demo1.getValue('textName'));
        console.log(demo1.getValue());
    });
    /*-------------------------重置--------------*/
    $('.reset').on('click', function() {
       // demo1.reset();
//        demo1.reset('table3-textName',0);
        demo1.reset(0);
    });
    /*-------------------------清除--------------*/
    $('.clear').on('click', function() {
//        demo1.clear('table3-single',0);
//        demo1.clear(['table3-single','table3-singleSearch'],0);
//        demo1.clear(0);
        demo1.clear();
    });
    /*-------------------------摧毁--------------*/
    $('.destroy').on('click', function() {
//        demo1.destroy('table3-single',0);
//        demo1.destroy(['table3-single','table3-singleSearch'],0);
        demo1.destroy(0);
//        demo1.destroy();
    });
    /*-------------------------显示--------------*/
    $('.show').on('click', function() {
        demo1.show();
    });
    /*-------------------------隐藏--------------*/
    $('.hide').on('click', function() {
        demo1.hide(0);
    });
    /*-------------------------禁用--------------*/
    $('.disable').on('click', function() {
        demo1.disable(0);
    });
    /*-------------------------启用--------------*/
    $('.enable').on('click', function() {
        demo1.enable();
    });
    /*-------------------------必填--------------*/
    $('.required1').on('click', function() {
        demo1.required(true);
    });
    /*-------------------------不必填--------------*/
    $('.required2').on('click', function() {
        demo1.required(false);
    });
    /*-------------------------校验--------------*/
    $('.check').on('click', function() {
        demo1.verify();
    });
});
