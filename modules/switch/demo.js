require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/switch/js/switch'
], function(Switch) {
    var switch1 = new Switch({
        element: $('#demo1'), //btn放的位置
        placeholder: '排序排序1',
        isDisabled: false, //默认为false
        btnStyle: {
            'width': '200px',
            'border-left': '2px solid rgb(221, 221, 221)'
        }, //btn的相关样式
        btnAddClass: 'ed',
        beforeClick: function() {
            //            console.log(12);
            return true
        }, //最终执行完后返回值是一个布尔值
        isIcon: true,
        type: 'switch',
        //        change:function(data){
        //            console.log('开关参数方法改变1');
        //            console.log(data)
        //        },
        setValue: function(callback) {
            callback && callback('up');
        }
    });


    var demo2 = new Switch({
        element: $('#demo2'), //btn放的位置
        placeholder: '排序排序2',
        isDisabled: false, //默认为false
        btnStyle: {
            'width': '200px',
            'border-left': '2px solid rgb(221, 221, 221)'
        }, //btn的相关样式
        btnAddClass: 'ed',
        beforeClick: function() {
            //            console.log(12);
            return true
        }, //最终执行完后返回值是一个布尔值
        isIcon: true,
        type: 'switch',
        //        change:function(data){
        //            console.log('开关参数方法改变2');
        //            console.log(data)
        //        },
        setValue: function(callback) {
            callback && callback('down');
        }
    });
    //    --------------相关的方法----------
    /*-------------------------设置数据方法--------------*/
    /*--------------------------设置数据-----------------*/
    $('.set-data2').on('click', function() {
        demo2.setData();
    });
    /*--------------------------设置方法-----------------*/
    $('.set2').on('click', function() {
        demo2.setValue(function(callback) {
            setTimeout(function() {
                callback('up');
            }, 1000)
        });
    });
    /*--------------------------获取方法-----------------*/
    $('.get2').on('click', function() {
        var $this = $(this);
        demo2.getValue(function(value) {
            console.log(value);
        });
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
    /*-------------------------change--------------*/
    $('.change2').on('click', function() {
        demo2.change(function(val) {
            console.log('改变了吗---------');
            console.log(val);
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
        console.log($(this));
        console.log(val);
        console.log('222222222222222222222222222222222222值改变之后触发');
    });
});
