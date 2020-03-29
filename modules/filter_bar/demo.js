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
                    name: '敏捷项目'
                }, {
                    id: '1',
                    name: '立项项目'
                }];
                callback && callback(data);
            },
            setItemData: function(callback) {
                var data = {
                    id: '1'
                };
                callback && callback(data);
            },
            /*人员*/
            personData: function(callback, val) {
                console.log(val);
                if (val == '') {
                    callback && callback([]);
                } else {
                    $.ajax({
                        url: '/jsonp/employee?input=' + val,
                        success: function(data) {
                            data = $.parseJSON(data);
                            data = data.repData.EmployeeList;
                            var result = [];
                            $.each(data, function(i, v) {
                                result.push({
                                    'id': v.id,
                                    'name': v.name + v.email.replace(".com", "")
                                });
                            })
                            callback && callback(result);
                        },
                        error: function() {
                            console.log('请求出错');
                        }
                    });
                }
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
                        console.log(data);
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
        }
        /*单选*/
    var filteres1 = new Filter({
        type: 'single',
        element: $('.demo1'),
        setValue: data.setItemData,
        setData: data.itemData,
        placeholder: '请选择项目',
        change: function(data) {
            //console.log(data);
        },
        isRequired: true
    });
    /*搜索框*/
    var filteres2 = new Filter({
            type: 'fuzzySearch',
            element: $('#demo2'),
        })
        /*多选模糊*/
    var filteres3 = new Filter({
        type: 'multipleSearch',
        element: $('#demo3'),
        placeholder: '人员',
        setData: data.personData,
        setValue: function(callback) {
            callback([{
                'id': '5580',
                'name': '小康'
            }]);
        },
        menuStyle: {
            'width': '280px'
        }
    });

    var time = new Filter({
        element: $('#demo4'), //btn放的位置
        placeholder: '建立时间',
        isDisabled: false, //默认为false
        btnStyle: {}, //btn的相关样式
        btnAddClass: 'ed',
        //        showElement:$('#text1'),
        beforeClick: function() {
            console.log(12);
            return true
        }, //最终执行完后返回值是一个布尔值
        //        isIcon:false,
        menu: {},
        type: 'calendar',
        change: function(data) {
            console.log(data)
        },
        setValue: function(callback) {
            callback && callback('2017-05-10 ~ 2017-05-19');
        }
    });

    var filteres5 = new Filter({
        type: 'singleSearch',
        element: $('#demo5'),
        placeholder: '业务线',
        setData: data.serviceLineData,
        change: function(data) {
            console.log(data);
        },
        menuStyle: {
            'width': '280px'
        }
    });
    var filteres6 = new Filter({
        type: 'multipleSearch',
        element: $('#demo6'),
        placeholder: '部门',
        setData: data.departmentData,
        change: function(data) {
            console.log(data);
        },
        menuStyle: {
            'width': '280px'
        }
    });
    var filteres7 = new Filter({
        type: 'multiple',
        element: $('#demo7'),
        placeholder: '状态',
        setData: data.statusData,
        setValue: function(callback) {
            callback([{
                'id': 1,
                'name': '进行中'
            }]);
        },
        change: function(data) {
            console.log(data);
        },
        menuStyle: {
            'width': '280px'
        }
    });
    var time8 = new Filter({
        element: $('#demo8'), //btn放的位置
        placeholder: '创建时间',
        type: 'calendar'
    });
    var switch1 = new Filter({
        element: $('#demo9'), //btn放的位置
        placeholder: '排序排序',
        isDisabled: false, //默认为false
        btnStyle: {
            'border-left': '2px solid rgb(221, 221, 221)'
        }, //btn的相关样式
        btnAddClass: 'ed',
        beforeClick: function() {
            //            console.log(12);
            return true
        }, //最终执行完后返回值是一个布尔值
        isIcon: true,
        type: 'switch',
        change: function(data) {
            console.log('开关参数方法改变');
            console.log(data)
        },
        setValue: function(callback) {
            callback && callback('down');
        }
    });


});
