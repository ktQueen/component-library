require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/form_field_text/js/form_field_text'
], function(FormFieldText) {
    /*-------------text-----------------*/
    var demo1 = new FormFieldText({
        //整个类型字段
        type: 'text', //要创建的表单字段的类型
        element: $('#demo1'), //当前需要生成字段的元素
        className: 'text', //可以为当前元素添加class
        layout: 'left-right', //布局，一种为上下结构'up-down'，一种为左右结构'left-right'，默认为左右结构布局
        style: {}, //设置样式
        //必填标志
        isShowRequired: true, //当必填的时候是否显示必填标志
        requiredLocation: 'after', //必填标志的位置，可以在字段前before，也可以在末尾显示before， 默认在字段前显示
        //标题
        title: 'text类型', //标题
        titleStyle: {},
        //字段
        value: '12', //默认为'',推荐用这个设置值跟表单统一,数据格式为字符串形式
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
//        readOnly: true,
//        disabled: true,
        maxlength: '10', //最大字符数
        placeholder: '请输入你的姓名', //提示文字
        name: 'textName', //唯一标识
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
    /*-------------password-----------------*/
    var demo2 = new FormFieldText({
        element: $('#demo2'),
        type: 'password', //类型text/password/hidden/textarea/textareaAuto
        title: 'password类型',
        name: 'passwordName',
        isShowRequired: true, //当必填的时候是否显示必填标志
    });
    /*-------------textarea-----------------*/
    var demo3 = new FormFieldText({
        element: $('#demo3'),
        type: 'textarea', //类型text/password/hidden/textarea/textareaAuto
        title: 'textarea类型1',
        name: 'textareaName',
        isShowRequired: true, //当必填的时候是否显示必填标志,
        tip:"注：我是一个小提示",
        isTipWordNumber:true,
        change: function(val) { // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
            console.log($(this));
            console.log(val);
            console.log('555555555555555555555555555555值改变之前触后1');
        },
        isRetainFormat:true
    });
    /*-------------textarea类,可以自动换行，没有滚动条的-----------------*/
    var demo5 = new FormFieldText({
        //整个类型字段
        type: 'textareaAuto', //要创建的表单字段的类型
        element: $('#demo5'), //当前需要生成字段的元素
        className: 'text', //可以为当前元素添加class
        layout: 'left-right', //布局，一种为上下结构'up-down'，一种为左右结构'left-right'，默认为左右结构布局
        style: {}, //设置样式
        //必填标志
        isShowRequired: true, //当必填的时候是否显示必填标志
        requiredLocation: 'after', //必填标志的位置，可以在字段前before，也可以在末尾显示after， 默认在字段前显示
        //标题
        title: 'textarea类型,可以自动换行，没有滚动条的',
        titleStyle: {
        },
        //字段
        //value: '1233', //默认为'',推荐用这个设置值跟表单统一,数据格式为字符串形式
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
//        readOnly: true,
//        disabled: true,
//        maxlength: '10', //最大字符数
        placeholder: '请输入你的姓名', //提示文字
        name: 'textareaName', //唯一标识
        contentStyle: {
        }, //内容样式
        //执行的一些方法
        initDone: function() { //表单元素初始化完成,this指向整个表单字段
            console.log($(this));
            console.log('=====================================表单元素初始化完成之后触发1');
        },
        change: function(val) { // return false可以阻止后面的事件，this指向的是表单元素，传出去的参数为当前的值
            console.log($(this));
            console.log(val);
            console.log('555555555555555555555555555555值改变之前触后1');
        },
        tip:"注：我是一个小提示"
    });
    /*-------------hidden-----------------*/
    var demo4 = new FormFieldText({
        element: $('#demo4'),
        type: 'hidden', //类型text/password/hidden/textarea/textareaAuto
        title: 'hidden类型',
        name: 'hiddenName',
        value:'1',
        isShowRequired: true, //当必填的时候是否显示必填标志
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
    /*-------------------------禁用--------------*/
    $('.disable').on('click', function() {
        demo1.disable();
    });
    /*-------------------------启用--------------*/
    $('.enable').on('click', function() {
        demo1.enable();
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
