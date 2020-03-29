require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/form_field_checkbox/js/form_field_checkbox'
], function(FormFieldCheckbox) {
    /*------------checkbox---------------*/
    var demo1 = new FormFieldCheckbox({
        element: $('#demo1'),
        type: 'checkbox', //单选，只有一个，可不选
        addClass: 'checkbox',
        isRequired: 'true',
        //        requiredLocation:'after',
        //        isShowRequired:false,
        //        layout:'up-down',
        title: '爱好',
        data: function(callback) {
            setTimeout(function() {
                callback([{
                        id: '1',
                        name: '足球'
                    },
                    {
                        id: '2',
                        name: '橄榄球'
                    },
                    {
                        id: '3',
                        name: '乒乓球'
                    },
                    {
                        id: '4',
                        isRequired: 'false',
                        name: '乒乓球'
                    }
                ]);
            }, 1200);
        },
        value: function(callback) {
            setTimeout(function() {
                callback([{
                        id: '1',
                        name: '足球'
                    },
                    {
                        id: '4',
                        name: '乒乓球'
                    }
                ]);
            }, 100);
        },
        //        value:function(callback){
        //            setTimeout(function(){
        //                callback( {
        //                    name:'love',
        //                    value:'1',
        //                    text:'足球'
        //                });
        //            },1000)
        //        },
        //        value:{
        //            url:'data.json',
        //            data:{},
        //            timeout:'1000',
        //            timeoutTip:'超时了',
        //            field:'repData.value'
        //        },
        //        readOnly:'true',
        //        disabled:'true',
        initDone: function() {
            console.log($(this));
            console.log('=====================================表单元素初始化完成之后触发');
        },
        change: function(val) {
            console.log($(this));
            console.log(val);
            console.log('555555555555555555555555555555值改变之前触后');
        },
        tip:"注：我是一个小提示"
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
        demo1.getValue(function(data, resultID) {
            console.log(data);
            console.log(resultID);
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
        demo1.disable([{
            id: '1'
        }, {
            id: '2'
        }]);
    });
    /*-------------------------启用--------------*/
    $('.enable').on('click', function() {
        demo1.enable([{
            id: '1'
        }]);
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
});
