require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/form_field_city_selector/js/form_field_city_selector',
    'modules/city_selector/js/city_data'
], function(FormFieldCity,cityData) {
    /*------------城市选择---------------*/
    var demo1 = new FormFieldCity({
        element: $('#demo1'),
        data:cityData,
        isOwnData:true,
//        type: 'city',
//        isRequired: 'true',
//        //        requiredLocation:'after',
//        isShowRequired:true,
//        //        layout:'up-down',
        title: '城市选择：',
//        name: 'userName',
////        value: {
////            id: '2',
////            name: '橄榄球'
////        },
////        data: function(callback) {
////            var data = [{
////                id: '1',
////                name: '敏捷项目'
////            }, {
////                id: '2',
////                name: '立项项目'
////            }];
////            callback && callback(data);
////        },
//        placeholder: '请选择项目类型',
//        readOnly: 'false',
//        //        disabled:'true',
//        change: function() {
//            console.log('值改变之后触发bbbbbbbb');
//        },
//        initDone: function() {
//            console.log('表单元素初始化完成之后触发');
//        },
//        tip:"注：我是一个小提示"
    });
    /*--------------------------设置数据-----------------*/
    $('.set-data').on('click', function() {
        demo1.setData([{
                id: '2',
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
        ]);
    });
    /*--------------------------设置方法-----------------*/
    $('.set').on('click', function() {
        demo1.setValue({
            id: '4',
            name: '乒乓球'
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
    /*值改变之后触发*/
    demo1.on('change', function(val) {
        console.log($(this));
        console.log(val);
        console.log('222222222222222222222222222222222222值改变之后触发');
    });
    demo1.change(function(val) {
        console.log($(this));
        console.log(val);
        console.log('3333333333333');
    });
});
