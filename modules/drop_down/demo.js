require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/drop_down/js/drop_down'
], function(DropDownMenu) {
    var s1 = new DropDownMenu({
        element: $('#demo1'),
        type: 'single',
        placeholder: '项目类型',
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
        },
        change: function(data) {
            console.log(data);
        }
    });

    var s2 = new DropDownMenu({
        element: $('#demo2'),
        type: 'singleSearch',
        placeholder: '项目类型项目类型项目类型',
        btnStyle: {
            'max-width': '200px'
        },
        menuStyle: {
            width: '120px'
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
        },
    });
    var s3 = new DropDownMenu({
        element: $('#demo3'),
        type: 'multiple',
        placeholder: '项目类型项目类型项目类型',
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
        },
    });
    var s4 = new DropDownMenu({
        element: $('#demo4'),
        type: 'multipleSearch',
        placeholder: '项目类型项目类型项目类型',
        btnStyle: {
            'max-width': '200px'
        },
        menuStyle: {
            width: '300px'
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
        },
    });

    var demo1 = new DropDownMenu({
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
        initDone: function() {
            console.log($(this));
            console.log('=====================================表单元素初始化完成之后触发');
        },
        change: function(val) {
            console.log($(this));
            console.log(val);
            console.log('555555555555555555555555555555值改变之前触后');
        },
    });
    //    --------------相关的方法----------
    /*-------------------------设置数据方法--------------*/
    $('.set-data').on('click', function() {
        demo1.setData({
            startTime: '2017-02-03',
            endTime: '2017-02-04'
        })
    });
    /*--------------------------设置方法-----------------*/
    $('.set').on('click', function() {
        demo1.setValue(function(callback) {
            setTimeout(function() {
                callback({
                    startTime: '2017-01-03',
                    endTime: '2017-01-04'
                })
            }, 1000);
        });
    });
    /*--------------------------获取方法-----------------*/
    $('.get').on('click', function() {
        var $this = $(this);
        demo1.getValue(function(data, result) {
            console.log(data);
            console.log(result);
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
});
