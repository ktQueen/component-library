require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/drop_down_calendar/js/calendar',
    'modules/drop_down_calendar/js/calendar2'
], function(Calendar,Calendar2) {

    var demo2=new Calendar2({
        element: $('#demo2'), //btn放的位置
        setValue:'2010-01-01 ~ 2011-01-01'
    });

    var demo1 = new Calendar({
        /*按钮*/
        element: $('#demo1'), //btn放的位置
        btnAddClass: '', //btn添加class
        btnStyle: {}, //btn的相关样式
        showElement: '', //设置元素显示值的位置，如果没有设置，则默认为element放置选择的值
        placeholder: '请选择时间', //按钮显示的提示文字
        //isDisabled: true, //按钮是否可点击
        //readOnly: false, //按钮是否是只读状态
        isIcon: true, //是否显示下拉按钮
        beforeClick: function() { //最终执行完后返回值是一个布尔值，如果是false可以阻断进程
            console.log(123);
            return true;
        },
        type: 'calendar', //menu的类型//必填
//        setValue: function(callback) {
//            setTimeout(function() {
//                callback && callback({
//                    startTime: '2017-03-03',
//                    endTime: '2017-03-04'
//                });
//            }, 500);
//        },
        initDone: function() {
            console.log($(this));
            console.log('=====================================表单元素初始化完成之后触发');
        },
        change: function(val) {
            console.log($(this));
            console.log(val);
            console.log('555555555555555555555555555555值改变之后');
        },
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
        demo1.getValue(function(data) {
            console.log(data);
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
        demo1.destroy();
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
    /*值改变之后触发*/
    demo1.change(function(val) {
        console.log($(this));
        console.log(val);
        console.log('是否改变了呢');
    });
    /*值改变之后触发*/
    demo1.on('change', function(val) {
        console.log($(this));
        console.log(val);
        console.log('222222222222222222222222222222222222值改变之后触发');
    });

});
