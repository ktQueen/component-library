require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/tooltip/js/tooltip',//气泡型提示
    'modules/message/js/message',//顶部滑动式提示
    'modules/form_verify/js/form_verify'
], function(Tooltip,Message,FormVerify) {
//                        param:function(){//会有值取不到的情况就用这种
//                            return '0009'
//                        },
    var demo1 = new FormVerify({
        byteChinese:'1',//中文一个字符占几个字节,默认为一个字符占1个字节
        verify:[
            {
                name:'username',
                value:$('#demo1').val(),//如果不配置，默认是name对应的值
                validators:[
                    {
                        method:'required',//必填
                        param:'',
                        message:'名称不能为空'
                    },
                    {
                        method:'equalTo',//与某个值相等
                        param:'0009',//比较的元素,传入的是比较的值
                        message:'两个值不相等'
                    },
                    {
                        method:'maxLength',//最大长度
                        param:10,//长度限制
                        message:'最大长度不能超过10个字符'
                    },
                    {
                        method:'minLength',//最小长度
                        param:4,//长度限制
                        message:'最少不能少于4个字符'
                    },
                    {
                        method:'maxValue',//最大值
                        param:10,//值大小限制
                        message:'最大不能超过10（包括10）'
                    },
                    {
                        method:'minValue',//最小值
                        param:4,//值大小限制
                        message:'最小不能小于4（包括4）'
                    },
                    {
                        method:'gtValue',//最大值
                        param:10,//值大小限制
                        message:'最大不能超过10（不包括10）'
                    },
                    {
                        method:'ltValue',//最小值
                        param:4,//值大小限制
                        message:'最小不能小于4（不包括4）'
                    },
                    {
                        method:'remote',//远端校验
                        param:{
                            url:'data.js',
                            data:{//校验提交的数据
                                input:'11'
                            },
                            requestResult: { //请求成功结果，code得到的值等于result的值就是请求成功
                                code: 'repCode',
                                result: 0, //请求成功的结果
                                message: 'message' //请求失败的提示信息字段
                            },
                            checkResult: { //校验成功结果，code得到的值等于result的值就是没有通过校验
                                code: 'repData',
                                result: true
                            }
                        },
                        message:'名称不能重复'
                    },
                    {
                        method:'function',//自己写逻辑
                        param:function(){
                            return true;
                        },//必须有返回值
                        message:'不能通过逻辑'
                    },
                    {
                        method:'regexp',//正则
                        param:/^([a-zA-Z-0-9]+){1,}$/,//正则匹配
                        message:'没有通过正则'
                    }
                ]
            },
            {
                name:'username1',
                validators:[
                    {
                        method:'required',//必填
                        param:'',
                        message:'名称不能为空'
                    },
                    {
                        method:'equalTo',//与某个值相等
                        param:'0009',//比较的元素,传入的是比较的值
                        message:'两个值不相等'
                    },
                    {
                        method:'maxLength',//最大长度
                        param:10,//长度限制
                        message:'最大长度不能超过10个字符'
                    },
                    {
                        method:'minLength',//最小长度
                        param:4,//长度限制
                        message:'最少不能少于4个字符'
                    },
                    {
                        method:'maxValue',//最大值
                        param:10,//值大小限制
                        message:'最大不能超过10（包括10）'
                    },
                    {
                        method:'minValue',//最小值
                        param:4,//值大小限制
                        message:'最小不能小于4（包括4）'
                    },
                    {
                        method:'gtValue',//最大值
                        param:10,//值大小限制
                        message:'最大不能超过10（不包括10）'
                    },
                    {
                        method:'ltValue',//最小值
                        param:4,//值大小限制
                        message:'最小不能小于4（不包括4）'
                    },
                    {
                        method:'remote',//远端校验
                        param:{
                            url:'data.js',
                            data:{},//校验提交的数据
                            requestResult:'repCode',//请求成功结果
                            checkResult:'repData'//校验成功结果，不重复返回true（通过校验）,重复返回false（没通过检验）
                        },
                        message:'名称不能重复'
                    },
                    {
                        method:'function',//自己写逻辑
                        param:function(){
                            return true;
                        },//必须有返回值
                        message:'不能通过逻辑'
                    },
                    {
                        method:'regexp',//正则
                        param:/^([a-zA-Z-0-9]+){1,}$/,//正则匹配
                        message:'没有通过正则'
                    }
                ]
            }
        ]

    });
    //表单校验组件只返回结果
    //result:是结果
    //resultMsg:是结果消息
    console.log(demo1.result);
    $.each(demo1.result,function(i,v){
        if(v.resultStatus=='error'){
            new Message({
                duration:'100000'
            })[v.resultStatus](v.resultMsg);
            new Tooltip({
                element:$('[name="'+i+'"]').parent(),//气泡元素
                message:v.resultMsg,//气泡提示文字
                shape:'hollow',//气泡的形状：solid(实心)/hollow(空心)
                direction:'top',//气泡的方向：top/bottom/left/right
                status:v.resultStatus,//气泡的颜色状态：default/success/error/wraning/primary/info
                location:'left'//气泡的位置：(上下气泡)left/center/right,（左右气泡）top/middle/bottom
            });
            //return false;单个提示还是全部提示
        }else{
            console.log(v.resultMsg);
        }
    });
    //获取错误的个数
    $('#num').on('click',function(){
        console.log(demo1.errorNum());
        alert(demo1.errorNum());
    });
});
