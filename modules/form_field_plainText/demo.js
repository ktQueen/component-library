require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/form_field_plainText/js/form_field_plainText'
], function(FormFieldPlainText) {
    /*------------plainText---------------*/
    var demo1 = new FormFieldPlainText({
        //整个类型字段
        type: 'plainText', //要创建的表单字段的类型
        element: $('#demo1'), //当前需要生成字段的元素
        className: 'plainText', //可以为当前元素添加class
        layout: 'left-right', //布局，一种为上下结构'up-down'，一种为左右结构'left-right'，默认为左右结构布局
        style: {}, //设置样式
        //必填标志
        isShowRequired: true, //当必填的时候是否显示必填标志，默认是显示的
        requiredLocation: 'after', //必填标志的位置，可以在字段前before，也可以在末尾显示before， 默认在字段前显示
        //标题
        title: '类型', //标题
        titleStyle: {},
        //字段
        value: '12', //默认为'',推荐用这个设置值跟表单统一,数据格式为字符串形式
//                value:function(callback){
//                    setTimeout(function(){
//                        callback('25');
//                    },1000)
//                },
        //        value:{
        //            url:'data.json',
        //            data:{},
        //            timeout:'1000',
        //            timeoutTip:'超时了',
        //            field:'repData.value'
        //        },
        maxlength: '10', //最大字符数
        name: 'plainTextName', //唯一标识
        contentStyle: {}, //内容样式
        //执行的一些方法
        initDone: function() { //表单元素初始化完成,this指向整个表单字段
            console.log($(this));
            console.log('=====================================表单元素初始化完成之后触发');
        },
        change: function(val) { // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
            console.log($(this));
            console.log(val);
            console.log('555555555555555555555555555555值改变之前触后');
        },
        tip:"注：我是一个小提示"
    });
    /*--------------------------设置方法-----------------*/
    $('.set').on('click', function() {
        demo1.setValue(function(callback) {
            setTimeout(function() {
                callback('25');
            }, 1000)
        });
    });
    /*--------------------------获取方法-----------------*/
    $('.get').on('click', function() {
        var $this = $(this);
        //$this.html(bar1.getValue());
        demo1.getValue(function(data) {
            $this.html(data);
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
    });
    /*-------------------------隐藏--------------*/
    $('.hide').on('click', function() {
        demo1.hide();
    });
    /*-------------------------必填--------------*/
    $('.required1').on('click', function() {
        demo1.required(true);
    });
    /*-------------------------不必填--------------*/
    $('.required2').on('click', function() {
        demo1.required(false);
    });
    /*------------------------值改变之后触发----------*/
    demo1.on('change', function(val) {
        console.log($(this));
        console.log(val);
        console.log('222222222222222222222222222222222222值改变之后触发');
    });
});
