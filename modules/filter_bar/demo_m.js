require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/filter_bar/js/filter_bar'
], function(Filter) {
    /*数据*/
    var data = {
        //从后台获取项目数据（现为死数据）
        itemData: function(callback) {
            var data = [{
                id: '0',
                name: '敏捷项目敏捷项目敏捷项目敏捷项目敏捷项目敏捷项目敏捷项目敏捷项目敏捷项目敏捷项目敏捷项目敏捷项目',
                type: 'sdds'
            }, {
                id: '1',
                name: '立项项目'
            }];
            callback && callback(data);
        },
        setItemData: function(callback) {
            var data = {
                id: '1',
                'name': '立项'
            };
            callback && callback(data);
        },
        /*人员*/
        personData: function(callback, val) {
            if (val == '') return;
            $.ajax({
                url: '/jsonp/employee?input=' + val,
                success: function(data) {
                    data = $.parseJSON(data);
                    data = data.repData.EmployeeList;
                    var result = [];
                    $.each(data, function(i, v) {
                        result.push({
                            'id': v.id,
                            'name': v.name + v.email.replace("@***.com", "")
                        });
                    })
                    callback && callback(result, data);
                },
                error: function() {
                    console.log('请求出错');
                }
            })
        },
        //获取业务线数据
        serviceLineData: function(callback, val) {
            $.ajax({
                url: '/jsonp/getNewServiceLine?input=' + val,
                success: function(data) {
                    data = jQuery.parseJSON(data);
                    callback && callback(data.repData.newServiceLineList);
                },
                error: function() {
                    console.log('请求出错');
                }
            });
        },
        //获取部门数据
        departmentData: function(callback, val) {
            $.ajax({
                url: '/jsonp/getdept?input=' + val,
                success: function(data) {
                    data = jQuery.parseJSON(data);
                    data = data.repData.deptList;
                    var result = [];
                    $.each(data, function(i, v) {
                        result.push({
                            'id': v.id,
                            'name': v.superName + '-' + v.name
                        })
                    });
                    callback(result);
                },
                error: function() {
                    console.log('请求出错');
                }
            });
        },
        //获取状态数据
        statusData: function(callback) {
            $.ajax({
                url: '/jsonp/getprojectstate',
                success: function(data) {
                    data = jQuery.parseJSON(data);
                    callback(data.repData.projectStateList);
                },
                error: function() {
                    console.log('请求出错');
                }
            });
        },
        projectStatusValue: function(callback) {
            callback && callback([{
                'id': 1,
                'name': '进行中'
            }])
        },
    }
    var demo1 = new Filter([
            /*项目类型*/
            {
                type: 'single',
                element: $('.demo1'),
                setValue: data.setItemData,
                setData: data.itemData,
                menuListShowWay:'one',
                isRequired: true,
                placeholder: '请选择项目类型'
            },
            /*人员*/
            {
                type: 'multipleSearch',
                element: $('#demo3'),
                placeholder: '人员',
                setData: data.personData,
                menuStyle: {
                    'width': '280px'
                }
            },
            /*时间*/
            {
                element: $('#demo4'), //btn放的位置
                placeholder: '建立时间',
                type: 'calendar',
            },
            /*业务线*/
            {
                type: 'multipleSearch',
                element: $('#demo5'),
                placeholder: '业务线',
                setData: data.serviceLineData,
                menuStyle: {
                    'width': '280px'
                }
            },
            /*部门*/
            {
                type: 'multipleSearch',
                element: $('#demo6'),
                placeholder: '部门',
                setData: data.departmentData,
                menuStyle: {
                    'width': '280px'
                }
            },
            /*状态*/
            {
                type: 'multiple',
                element: $('#demo7'),
                placeholder: '状态',
                setValue: data.projectStatusValue,
                setData: data.statusData,
                menuStyle: {
                    'width': '280px'
                }
            },
            /*测试时间*/
            {
                element: $('#demo8'), //btn放的位置
                placeholder: '测试时间',
                type: 'calendar',
                setValue: function(callback) {
                    callback && callback('2017-06-11 ~ 2017-06-13')
                }
            },
            /*搜索框*/
            {
                type: 'fuzzySearch',
                element: $('#demo2'),
                placeholder: '请输入你想搜索的内容'
            },
            /*排序*/
            {
                type: 'switch',
                element: $('#demo9'), //btn放的位置
                placeholder: '排序排序排序排序排序排序排序排序排序排序排序排序排序排序排序排序',
                btnStyle: {
                    'border-left': '2px solid rgb(221, 221, 221)'
                },
                setValue: function(callback) {
                    callback('down')
                }
            }
        ])
        /*-------------------------设置数据方法--------------*/
    $('.set-data').on('click', function() {
        demo1.setData([
            [{
                    id: '5',
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
            ],
            '', [{
                    id: '5',
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
            ],
        ]);
    });
    /*--------------------------设置方法-----------------*/
    $('.set').on('click', function() {
        demo1.setValue([function(callback) {
            setTimeout(function() {
                callback({
                    id: '5',
                    name: '橄榄球'
                });
            }, 1000)
        }]);
    });
    /*--------------------------获取方法-----------------*/
    $('.get').on('click', function() {
        var $this = $(this);
        demo1.getValue(function(data, result) {
            console.log(data);
            console.log(result);
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
        return false;
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
