require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/drop_down/js/drop_down'
], function(DropDownMenu) {
    var demo1 = new DropDownMenu([{
        element: $('#demo1'),
        type: 'single',
        placeholder: '项目类型1',
        isRequired: true,
        setValue: function(callback) {
            setTimeout(function() {
                var data = [{
                    id: '2',
                    name: '立项项目'
                }];
                callback && callback(data);
            }, 1000)
        },
        setData: function(callback) {
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
        }
    }, {
        element: $('.demo2'),
        type: 'singleSearch',
        placeholder: '项目类型2',
        btnStyle: {
            'max-width': '200px'
        },
        setValue: function(callback) {
            var data = [{
                id: '2',
                name: '立项项目'
            }];
            callback && callback(data);
        },
        setData: function(callback) {
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
        }
    }, {
        element: $('#demo3'),
        type: 'multiple',
        placeholder: '项目类型3',
        btnStyle: {
            'max-width': '200px'
        },
        setValue: function(callback) {
            setTimeout(function() {
                var data = [{
                    id: '2',
                    name: '立项项目'
                }];
                callback && callback(data);
            }, 1000)
        },
        setData: function(callback) {
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
        }
    }, {
        element: $('#demo4'),
        type: 'multipleSearch',
        placeholder: '项目类型4',
        btnStyle: {
            'max-width': '200px'
        },
        menuStyle: {
            width: '300px'
        },
        //        setValue:function(callback){
        //            setTimeout(function(){
        //                var data= [{
        //                    id:'1'
        //                }];
        //                callback && callback(data);
        //            },1000)
        //        },
        isAllData: true, //当前获取的数据是否是所有数据
        setData: function(callback) {
            setTimeout(function() {
                var data = [{
                    id: '1',
                    name: '敏捷项目'
                }, {
                    id: '2',
                    name: '立项项目'
                }];
                callback && callback(data);
            }, 50);
        }
    }, {
        /*按钮*/
        element: $('#demo5'), //btn放的位置
        btnAddClass: '', //btn添加class
        btnStyle: {}, //btn的相关样式
        showElement: '', //设置元素显示值的位置，如果没有设置，则默认为element放置选择的值
        placeholder: '请选择时间', //按钮显示的提示文字
        isDisabled: false, //按钮是否可点击
        readOnly: false, //按钮是否是只读状态
        isIcon: true, //是否显示下拉按钮
        beforeClick: function() { //最终执行完后返回值是一个布尔值，如果是false可以阻断进程
            console.log(123);
            return true;
        },
        type: 'calendar', //menu的类型//必填
        setValue: function(callback) {
            setTimeout(function() {
                callback && callback({
                    startTime: '2017-03-03',
                    endTime: '2017-03-04'
                });
            }, 500);
        },
        //        initDone:function(){
        //            console.log($(this));
        //            console.log('=====================================表单元素初始化完成之后触发');
        //        },
        //        change:function(val){
        //            console.log($(this));
        //            console.log(val);
        //            console.log('555555555555555555555555555555值改变之前触后');
        //        },
    }]);
    //    --------------相关的方法----------
    console.log(demo1.getValueId(1));
    /*-------------------------设置数据方法--------------*/
    $('.set-data').on('click', function() {
        demo1.setData([
            [{
                id: '3',
                name: '3敏捷项目'
            }, {
                id: '4',
                name: '4立项项目'
            }],
            [{
                id: '53',
                name: '53敏捷项目'
            }, {
                id: '54',
                name: '54立项项目'
            }],
            [{
                id: '63',
                name: '63敏捷项目'
            }, {
                id: '64',
                name: '64立项项目'
            }],
            [{
                id: '73',
                name: '73敏捷项目'
            }, {
                id: '74',
                name: '74立项项目'
            }]
        ]);
        //        demo1.setData([{
        //            id:'3',
        //            name:'3敏捷项目'
        //        },{
        //            id:'4',
        //            name:'4立项项目'
        //        }],1);
    });
    /*--------------------------设置方法-----------------*/
    $('.set').on('click', function() {
        //        demo1.setValue(function(callback) {
        //            callback([{
        //                id:'53',
        //                name:'3敏捷项目'
        //            }])
        //        },1);
        demo1.setValue([
            [{
                id: '3',
                name: '3敏捷项目'
            }],
            [{
                id: '53',
                name: '53敏捷项目'
            }],
            [{
                id: '63',
                name: '63敏捷项目'
            }, {
                id: '64',
                name: '64立项项目'
            }],
            [{
                id: '73',
                name: '73敏捷项目'
            }, {
                id: '74',
                name: '74立项项目'
            }],
            {
                startTime: '2017-02-03',
                endTime: '2017-02-04'
            }
        ]);
    });
    /*--------------------------获取方法-----------------*/
    $('.get').on('click', function() {
        var $this = $(this);
        demo1.getValue(function(result, resultId, resultName) {
            console.log(result);
            console.log(resultId);
            console.log(resultName);
        });
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
        demo1.destroy(true);
    });
    /*-------------------------显示--------------*/
    $('.show').on('click', function() {
        demo1.show();
        return false; //必须有return false,因为有body事件
    });
    /*-------------------------隐藏--------------*/
    $('.hide').on('click', function() {
        demo1.hide();
    });
    /*-------------------------change--------------*/
    $('.change').on('click', function() {
        demo1.change(function(val) {
            console.log('改变了吗---------');
            console.log(val);
        });
    });
    /*-------------------------禁用--------------*/
    $('.disable').on('click', function() {
        demo1.disable();
    });
    /*-------------------------启用--------------*/
    $('.enable').on('click', function() {
        demo1.enable();
    });
    demo1.change(function(val) {
        console.log('改变---------');
        console.log(val);
    });
});
