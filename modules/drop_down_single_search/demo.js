require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/drop_down_single_search/js/single_search'
], function(SingleSearch) {
    var demo1 = new SingleSearch({
        /*菜单设置*/
        menuElement: $('#demo1'), //menu放的位置，默认放在body
        menuAddClass: 'demo123', //menu添加class
        menuStyle: {
            'width': '200px'
        }, //菜单扩展的样式，
        // 如果是只有菜单的情况下，则不设置默认样式，
        // 如果有下拉按钮的情况下，将菜单设置为定位且是不可见状态
        menuListShowWay: 'one', //菜单列表显示形式，如果是one单行就用...,默认为''，显示所有内容
        type: 'singleSearch', //menu的类型//必填
        isOnlyMenu: true, //是否只有菜单，默认为false,，为true时就没有按钮的相关设置
        setValue: //设置值，可以为object/function/array,但是数据最终纯为object/array
            function(callback) {
            setTimeout(function() {
                var data = [{
                    id: '1',
                    name: '敏捷项目'
                }];
                callback && callback(data);
            }, 1020);
        },
        setData: //设置数据，可以为object/function/array,但是数据最终纯为object/array
            function(callback,val) {
            setTimeout(function() {
                var data = [{
                    id: '1',
                    name: '敏捷项目'
                }, {
                    id: '2',
                    name: '立项项目'
                }];
                callback && callback(data);
            }, 500);
        },
        //        setData:[{
        //            id:'1',
        //            name:'敏捷项目'
        //        },{
        //            id:'2',
        //            name:'立项项目'
        //        }],
        initDone: function() {
            console.log($(this));
            console.log('=====================================表单元素初始化完成之后触发');
        },
        change: function(val) {
            console.log('33333333333333333333值改变触发');
            console.log($(this));
            console.log(val);
        },
        /*单选*/
        isRequired: false, //是否为必填，单选和单选搜索可用，多选和多选搜索不可用
        /*搜索框*/
        isAllData: true, //菜单是否是全部数据，搜索可用
        isSearch: true,
        searchPlaceholder: '请输入你想搜索的内容', //默认搜索框显示的字段
        searchDefaultField: '项目' //默认显示的字段
    });
    console.log(demo1.getValue());
    /*--------------------------设置数据-----------------*/
    $('.set-data').on('click', function() {
        demo1.setData([{
                id: '2',
                name: '橄榄球'
            },
            {
                id: '3',
                name: '乒乓球'
            },
            {
                id: '4',
                name: '乒乓球'
            }
        ]);
    });
    /*--------------------------设置方法-----------------*/
    $('.set').on('click', function() {
        demo1.setValue(function(callback) {
            setTimeout(function() {
                callback({
                    id: '4',
                    name: '乒乓球'
                });
            }, 1000)
        });
    });
    /*--------------------------获取方法-----------------*/
    $('.get').on('click', function() {
        var $this = $(this);
        demo1.getValue(function(result, resultId, resultName) {
            console.log(result);
            console.log(resultId);
            console.log(resultName);
        });
        console.log(demo1.getValue());
    });
    /*-------------------------重置--------------*/
    $('.reset').on('click', function() {
        demo1.reset();
    });
    /*-------------------------清除--------------*/
    $('.clear').on('click', function() {
        demo1.clear();
    });
    /*-------------------------摧毁--------------*/
    $('.destroy').on('click', function() {
        demo1.destroy();
    });
    /*-------------------------显示--------------*/
    $('.show').on('click', function() {
        demo1.show();
    });
    /*-------------------------隐藏--------------*/
    $('.hide').on('click', function() {
        demo1.hide();
    });
    /*-------------------------是否必填--------------*/
    $('.required').on('click', function() {
        demo1.required(true);
    });
    /*-------------------------change--------------*/
    $('.change').on('click', function() {
        demo1.change(function(val) {
            console.log('改变了吗---------');
            console.log($(this));
            console.log(val);
        });
    });
    /*值改变之后触发*/
    demo1.on('change', function(val) {
        console.log('4444444444444444444444444值改变之后触发');
        console.log($(this));
        console.log(val);
    });




    var demo2 = new SingleSearch({
        /*按钮*/
        element: $('#demo2'), //btn放的位置
        btnAddClass: '', //btn添加class
        btnStyle: {}, //btn的相关样式
        showElement: '', //设置元素显示值的位置，如果没有设置，则默认为element放置选择的值
        placeholder: '请选择项目类型', //按钮显示的提示文字
        isDisabled: false, //按钮是否可点击
        readOnly: false, //按钮是否是只读状态
        isIcon: true, //是否显示下拉按钮
        beforeClick: function() { //最终执行完后返回值是一个布尔值，如果是false可以阻断进程
            console.log(123);
            return true;
        },
        /*菜单设置*/
        menuAddClass: 'demo123', //menu添加class
        menuStyle: {
            'width': '200px'
        }, //菜单扩展的样式，
        // 如果是只有菜单的情况下，则不设置默认样式，
        // 如果有下拉按钮的情况下，将菜单设置为定位且是不可见状态
        menuListShowWay: 'one', //菜单列表显示形式，如果是one单行就用...,默认为''，显示所有内容
        type: 'singleSearch', //menu的类型//必填
        setValue: //设置值，可以为object/function/array,但是数据最终纯为object/array
        {
            id: '1',
            name: '敏捷项目'
        },
        setData: //设置数据，可以为object/function/array,但是数据最终纯为object/array
            function(callback) {
            setTimeout(function() {
                var data = [{
                    id: '1',
                    name: '敏捷项目'
                }, {
                    id: '2',
                    name: '立项项目'
                }];
                callback && callback(data);
            }, 500);
        },
        //        setData:[{
        //            id:'1',
        //            name:'敏捷项目'
        //        },{
        //            id:'2',
        //            name:'立项项目'
        //        }],
        initDone: function() {
            console.log('=====================================表单元素初始化完成之后触发');
            console.log($(this));
        },
        change: function(val) {
            console.log('555555555555555555555555555555值改变之前触后');
            console.log($(this));
            console.log(val);
        },
        /*单选*/
        isRequired: true, //是否为必填，单选和单选搜索可用，多选和多选搜索不可用
        isAllData: true, //菜单是否是全部数据，搜索可用
    });
    /*--------------------------设置数据-----------------*/
    $('.set-data2').on('click', function() {
        demo2.setData([{
                id: '2',
                name: '橄榄球'
            },
            {
                id: '3',
                name: '乒乓球'
            },
            {
                id: '4',
                name: '乒乓球'
            }
        ]);
    });
    /*--------------------------设置值方法-----------------*/
    $('.set2').on('click', function() {
        demo2.setValue(function(callback) {
            setTimeout(function() {
                callback({
                    id: '4',
                    name: '乒乓球'
                });
            }, 1000)
        });
    });
    /*--------------------------获取方法-----------------*/
    $('.get2').on('click', function() {
        var $this = $(this);
        demo1.getValue(function(result, resultId, resultName) {
            console.log(result);
            console.log(resultId);
            console.log(resultName);
        });
        console.log(demo1.getValue());
    });
    /*-------------------------重置--------------*/
    $('.reset2').on('click', function() {
        demo2.reset();
    });
    /*-------------------------清除--------------*/
    $('.clear2').on('click', function() {
        demo2.clear();
    });
    /*-------------------------摧毁--------------*/
    $('.destroy2').on('click', function() {
        demo2.destroy();
    });
    /*-------------------------显示--------------*/
    $('.show2').on('click', function() {
        demo2.show();
        return false; //必须有return false,因为有body事件
    });
    /*-------------------------隐藏--------------*/
    $('.hide2').on('click', function() {
        demo2.hide();
    });
    /*-------------------------是否必填--------------*/
    $('.required2').on('click', function() {
        demo2.required(false);
    });
    /*-------------------------change--------------*/
    $('.change2').on('click', function() {
        demo2.change(function(val) {
            console.log('改变了吗---------');
            console.log(val);
            console.log($(this));
        });
    });
    /*-------------------------禁用--------------*/
    $('.disable2').on('click', function() {
        demo2.disable();
    });
    /*-------------------------启用--------------*/
    $('.enable2').on('click', function() {
        demo2.enable();
    });
    /*值改变之后触发*/
    demo2.on('change', function(val) {
        console.log('222222222222222222222222222222222222值改变之后触发');
        console.log($(this));
        console.log(val);
    });
});
