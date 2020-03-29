require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/form_complex_block_paraConfig/js/form_complex_block_paraConfig'
], function(FormTable) {
    var demo1= new FormTable({
        element: $('#demo1'),
        type: 'blockParaConfig',
        name: 'addTableName3',
        childrenBlock:[
            {   type:"index",
                value:"域名{{index}}：",
                language:"number"//number,roman,chinese ，
            },
            {
                type:'row',
                title:'111',
                children:[
                    {
                        type: 'text',
                        addClass: 'text',
                        title: 'text',
                        name: 'table3-textName',
                        value: '2',
                        placeholder: '请输入你的2323',
                        maxlength: '2000'
                    },{
                        type: 'text',
                        addClass: 'text',
                        title: 'text',
                        name: 'table3-textName1',
                        value: '2',
                        placeholder: '请输入你的2323',
                        maxlength: '2000'
                    }
                ]
            },
            {
                type: 'single', //类型，单选，单选搜索，多选，多选搜索
                className: 'single',
                isRequired: 'true',
                isShowRequired:true,
                title: '单选',
                name: 'table3-single',
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
                title: '单选搜索',
                name: 'table3-singleSearch',
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
                type: 'text',
                addClass: 'text',
                title: 'text',
                name: 'table3-textName',
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
                addClass: 'password',
                title: 'password',
                name: 'table3-passwordName',
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
            {   type:"actions",
                value:["add","remove","up","down","upToTop","downToBottom"],
                language:"character"//图标icon ,文字character
            }
        ],//只配置一行数据就可以了
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
        //demo1.reset();
        demo1.reset('table3-textName',0);
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
        demo1.hide();
    });
    /*-------------------------禁用--------------*/
    $('.disable').on('click', function() {
        demo1.disable('name2',0);
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
