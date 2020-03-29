require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/form_complex_paraConfig/js/form_complex_paraConfig'
], function(FormParaConfig) {
    var demo1 = new FormParaConfig({
        element: $('#demo1'),
        type: 'paraConfig',
        addClass: 'paraConfig',
        style: {},
        //        requiredLocation:'after',
        isShowRequired:true,
        //        layout:'up-down',
        title: 'paraConfig类型',
        name: 'paraConfigName',
        readOnly: 'true',
        disabled: 'true',
        childrenList: [{
            type: 'text',
            addClass: 'text',
            title: 'text',
            name: 'textName',
            placeholder: '请输入你的2323',
            maxlength: '2000',
            validators:[
                {
                    method:'required',//必填
                    param:'',
                    message:'text不能为空'
                }
            ]
        },
            {
                type: 'password',
                addClass: 'password',
                title: 'password',
                name: 'passwordName',
                value: '2',
                placeholder: '请输入你的444码',
                maxlength: '2000',
                validators:[
                    {
                        method:'required',//必填
                        param:'',
                        message:'text不能为空'
                    }
                ]
            },
            {
                type:"actions",
                value:["add","remove"],
                language:"icon"//图标icon ,文字character
            }
        ],
        initDone: function() {
            console.log($(this));
            console.log('=====================================表单元素初始化完成之后触发');
        }
    });
    /*--------------------------设置方法-----------------*/
    $('.set').on('click', function() {
        demo1.setValue([
            {
                textName: '111',
                passwordName: '111'
            },
            {
                textName: '111',
                passwordName: '111'
            }
        ]);
    });
    /*--------------------------获取方法-----------------*/
    $('.get').on('click', function() {
//        demo1.getValue(function(data) {
//            console.log(data);
//        });
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
    /*-------------------------必填--------------*/
    $('.required1').on('click', function() {
        demo1.required(true);
    });
    /*-------------------------不必填--------------*/
    $('.required2').on('click', function() {
        demo1.required(false);
    });
    /*-------------------------校验--------------*/
    $('.check').on('click', function() {
        demo1.verify();
    });
});
