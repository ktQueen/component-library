require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/form_field_date/js/form_field_date'
], function(FormFieldDate) {
    /*------------date---------------*/
    var demo1 = new FormFieldDate({
        element: $('#demo1'),
        type: 'date',
        className: 'date',
        //        requiredLocation:'after',
        isShowRequired:true,
        //        layout:'up-down',
        title: '时间：',
        name: 'time',
        value:function(callback) {
            setTimeout(function() {
                callback && callback({
                    startTime: '2017-03-03',
                    endTime: '2017-03-04'
                });
            }, 500);
        },
        //        value:function(callback){
        //            setTimeout(function(){
        //                callback('25');
        //            },1000)
        //        },
        //        value:{
        //            url:'data.json',
        //            data:{},
        //            timeout:'1000',
        //            timeoutTip:'超时了',
        //            field:'repData.value'
        //        },
        placeholder: '请选择你的时间',
        //        readOnly:'true',
        //        disabled:'true',
        change: function(val) {
            console.log($(this));
            console.log(val);
            console.log('1111111111111值改变之后触发');
        },
        initDone: function() {
            console.log('表单元素初始化完成之后触发');
        },
        tip:"注：我是一个小提示"
    });
    /*--------------------------设置方法-----------------*/
    $('.set').on('click', function() {
        demo1.setValue({
            startTime: '2017-01-02',
            endTime: '2018-01-02'
        });
    });
    /*--------------------------获取方法-----------------*/
    $('.get').on('click', function() {
        var $this = $(this);
        //$this.html(bar1.getValue().text);
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
        return false;
    });
    /*-------------------------隐藏--------------*/
    $('.hide').on('click', function() {
        demo1.hide();
    });
    /*-------------------------禁用--------------*/
    $('.disable').on('click', function() {
        demo1.disable([{
            value: '1'
        }, {
            value: '2'
        }]);
    });
    /*-------------------------启用--------------*/
    $('.enable').on('click', function() {
        demo1.enable([{
            value: '1'
        }]);
    });
    $('.required1').on('click', function() {
        demo1.required(true);
    });
    /*-------------------------不必填--------------*/
    $('.required2').on('click', function() {
        demo1.required(false);
    });
    /*值改变之后触发*/
    demo1.on('change', function(val) {
        console.log($(this));
        console.log(val);
        console.log('222222222222222222222222222222222222值改变之后触发');
    });


    var demo2 = new FormFieldDate({
        element: $('#demo2'),
        type: 'date2',
        title: '时间2：',
        name: 'time2',
    });
});
