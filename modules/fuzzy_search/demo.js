require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/fuzzy_search/js/fuzzy_search'
], function(FuzzySearch) {
    var demo1 = new FuzzySearch({
        type: 'fuzzySearch',
        element: $('#demo1'),
        placeholder: '请输入你想搜索的内容',
        btnStyle: {
            'width': '400px',
            'height': '50px'
        }, //btn的相关样式
        btnAddClass: '',
        isDisabled: false, //按钮是否可点击
        readOnly: false, //按钮是否是只读状态
        setValue: function(callback) { //设置值，可以为object/function/string,但是数据最终纯为string
            setTimeout(function() {
                callback('3434');
            }, 1000)
        },
        change: function(value) {
            console.log($(this));
            console.log(value);
            console.log('值改变之后');
        }, //值改变触发,function
        initDone: function() {
            console.log($(this));
            console.log('初始化完成');
        }, //下拉菜单整体初始化完成触发,function
        isShowSearchIcon:false
    });
    //    --------------相关的方法----------
    /*-------------------------设置数据方法--------------*/
    $('.set-data').on('click', function() {
        demo1.setData();
    });
    /*--------------------------设置方法-----------------*/
    $('.set').on('click', function() {
        demo1.setValue(function(callback) {
            setTimeout(function() {
                callback('345111');
            }, 1000)
        });
    });
    /*--------------------------获取方法-----------------*/
    $('.get').on('click', function() {
        var $this = $(this);
        demo1.getValue(function(result) {
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
    });
    /*-------------------------隐藏--------------*/
    $('.hide').on('click', function() {
        demo1.hide();
    });
    /*-------------------------禁用--------------*/
    $('.disable').on('click', function() {
        demo1.disable();
    });
    /*-------------------------启用--------------*/
    $('.enable').on('click', function() {
        demo1.enable();
    });
    /*-------------------------change--------------*/
    $('.change').on('click', function() {
        demo1.change(function(val) {
            console.log('改变了吗---------');
            console.log(val);
        });
    });
    /*值改变之前触发*/
    demo1.on('beforeChange', function(val) {
        console.log($(this));
        console.log(val);
        console.log('111111111111111111111111111111111111111值改变之前触发');
    });
    /*值改变之后触发*/
    demo1.on('change', function(val) {
        console.log($(this));
        console.log(val);
        console.log('222222222222222222222222222222222222值改变之后触发');
    });
    /*值改变之后触发*/
    demo1.on('afterChange', function(val) {
        console.log($(this));
        console.log(val);
        console.log('333333333333333333333333333333值改变之后触发');
    });


    var demo2 = new FuzzySearch({
        type: 'fuzzySearch',
        element: $('#demo2'),
        placeholder: '请输入你想搜索的内容',
        isDisabled: false, //按钮是否可点击
        readOnly: false, //按钮是否是只读状态
        isBlurChange:true,
        setData: function(callback, val) {
            callback && callback([
            {code: "010", id: "0", isRelationBudget: "1", name: "差旅费"},
            {code: "011", id: "0", isRelationBudget: "1", name: "误餐费"},
            {code: "012", id: "0", isRelationBudget: "1", name: "交通费"},
            {code: "00199", id: "0", isRelationBudget: "1", name: "测试专用"},
            {code: "100", id: "0", isRelationBudget: "1", name: "TEST"},
            {code: "101", id: "0", isRelationBudget: "1", name: "测试123"},
            {code: "13209", id: "0", isRelationBudget: "1", name: "ddd"},
            {code: "00601", id: "0", isRelationBudget: "1", name: "员工工资00601"},
            {code: "00602", id: "0", isRelationBudget: "1", name: "员工工资00602"},
            {code: "999", id: "0", isRelationBudget: "1", name: "补贴类费用new31补贴类费用new31补贴类费用new31"},
            {code: "99801", id: "0", isRelationBudget: "1", name: "是多少"},
            {code: "00101010101010102", id: "0", isRelationBudget: "1", name: "2"},
            {code: "00105", id: "0", isRelationBudget: "1", name: "新用户补贴01"},
            {code: "00901", id: "0", isRelationBudget: "1", name: "员工福利00901"},
            {code: "00904", id: "0", isRelationBudget: "1", name: "员工福利00904"},
            {code: "00905", id: "0", isRelationBudget: "1", name: "员工福利00905"},
            {code: "02401", id: "0", isRelationBudget: "1", name: "第三级别"},
            {code: "026", id: "0", isRelationBudget: "1", name: "补贴类费用new31补贴类费用new31"},
            {code: "0010106", id: "0", isRelationBudget: "1", name: "新用户补贴91"},
            {code: "09901", id: "0", isRelationBudget: "1", name: "撤销第一季"},
            {code: "10223", id: "0", isRelationBudget: "1", name: "嗯嗯额"},
            {code: "09902", id: "0", isRelationBudget: "1", name: "撤销第二季"}
            ]);
//            $.ajax({
//                url: '/jsonp/employee?input=' + val,
//                success: function(data) {
//                    data = $.parseJSON(data);
//                    data = data.repData.EmployeeList;
//                    var result = [];
//                    $.each(data, function(i, v) {
//                        result.push({
//                            'id': v.id,
//                            'name': v.name + v.email.replace("@daojia.com", "")
//                        });
//                    })
//                    callback && callback(result);
//                },
//                error: function() {
//                    console.log('请求出错');
//                }
//            });
        },
        beforeChange: function(value) {
            console.log($(this));
            console.log(value);
            console.log('值改变之前');
        }, //值改变之前触发,function最终执行完后返回值是一个布尔值，如果是false可以阻断进程
        change: function(value) {
            console.log($(this));
            console.log(value);
            console.log('值改变之后');
        }, //值改变触发,function
        afterChange: function(value) {
            console.log($(this));
            console.log(value);
            console.log('值改变之后');
        }, //值改变之后触发,function
        initDone: function() {
            console.log($(this));
            console.log('初始化完成');
        }, //下拉菜单整体初始化完成触发,function
    });
    //    --------------相关的方法----------
    /*-------------------------设置数据方法--------------*/
    $('.set-data2').on('click', function() {
        demo2.setData();
    });
    /*--------------------------设置方法-----------------*/
    $('.set2').on('click', function() {
        demo2.setValue(function(callback) {
            setTimeout(function() {
                callback('345111');
            }, 1000)
        });
    });
    /*--------------------------获取方法-----------------*/
    $('.get2').on('click', function() {
        var $this = $(this);
        demo2.getValue(function(result) {
            console.log(result);
        });
        console.log(demo2.getValue());
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
    });
    /*-------------------------隐藏--------------*/
    $('.hide2').on('click', function() {
        demo2.hide();
    });
    /*-------------------------禁用--------------*/
    $('.disable2').on('click', function() {
        demo2.disable();
    });
    /*-------------------------启用--------------*/
    $('.enable2').on('click', function() {
        demo2.enable();
    });
    /*-------------------------change--------------*/
    $('.change2').on('click', function() {
        demo2.change(function(val) {
            console.log('改变了吗---------');
            console.log(val);
        });
    });
});
