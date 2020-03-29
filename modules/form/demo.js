require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/form/js/form',
    'modules/city_selector/js/city_data'
], function(Form,cityData) {
    var demo1 = new Form({
        element: '#demo', //当前需要生成表单的元素
        className: 'big-form', //可以为当前表单添加class
        style: {},//设置样式
        mode: '1', //模式，是新建1还是编辑2，默认为新建1
        name: '', //表单的唯一标识
        title: '我是一个自定义表单', //标题
        titleStyle: {
            'text-align':'center'
        },
        contentStyle: {}, //内容样式
//        handlerEvent:[{
//            name:'text1',
//            event:'change',
//            condition:function(){
//                return true;
//            },
//            toDo:[{
//                name:'textarea1',
//                way:'setValue',
//                param:'联动操作'
//            }]
//        }],
        children: [ //form表单分为几个块
            //块（字符）
            {
                type: "block",
                title: '我是一个块（字符型）', //每个block可以不一样的
                layout:'up-down',
                name:'',
                children: [ //一个快可以有多个行
                    //行
                    {
                        type: "row",
                        title: 'text的row标题：', //单行
                        isShowRequired: true,
                        name: 'row1',
                        tip:'我是一个行提示',
                        children: [{
                            type: 'text',
                            className: 'text',
                            name: 'text1',
                            value: '1',
                            placeholder: '请输入你的姓名1',
                            maxlength: '2000',
                            change:function(value){
                            },
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
                        }]
                    },
                    //行
                    {
                        type: "row",
                        title: 'row1标题：', //单行
                        isShowRequired: true,
                       // requiredLocation: 'after',
                        name: 'row2',
                        children: [{
                            type: 'password', //类型text/password/hidden/textarea
                            addClass: 'text',
                            title: 'password',
                            name: 'password1',
                            value: '2',
                            placeholder: '请输入你的密码',
                            maxlength: '2000',
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
                        }]
                    },
                    //行
                    {
                        type: "row",
                        title: 'row1标题：', //单行
                        name: 'row6',
                        children: [{
                            type: 'textarea',
                            addClass: 'textarea11',
                            title: 'textarea',
                            name: 'textarea1',
                            value: '5',
                            placeholder: '请输入你的姓名',
                            maxlength: '2000',
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
                        }]
                    },
                    //行
                    {
                        type: "row",
                        title: 'row1标题：', //单行
                        name: 'row7',
                        children: [{
                            type: 'plainText',
                            addClass: 'plainText',
                            title: 'plainText',
                            name: 'plainText1',
                            value: '6'
                        }]
                    }
                ]
            },
            //块（数据）
            {
                type: "block",
                title: '我是一个块（数据型）', //每个block可以不一样的
                name:'rowBlockData',
                children: [ //一个快可以有多个行
                    //行
                    {
                        type: "row",
                        title: 'row1标题：', //单行
                        name:'rowRowRadioData',
                        children: [{
                            type: 'radio', //单选，只有一个，可不选
                            title: '爱好',
                            name: 'radio1',
                            data: [{
                                    id: '0',
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
                                    name: '乒乓球'
                                }
                            ],
                            validators:[
                                {
                                    method:'required',//必填
                                    param:'',
                                    message:'爱好不能为空'
                                },
                                {
                                    method:'function',//自己写逻辑
                                    param:function(){
                                        return true;
                                    },//必须有返回值
                                    message:'不能通过逻辑'
                                }
                            ]
                        }]
                    },
                    //行
                    {
                        type: "row",
                        title: 'row1标题：', //单行
                        children: [{
                            type: 'checkbox', //单选，只有一个，可不选
                            title: '爱好',
                            name: 'checkbox1',
                            data: [{
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
                                    name: '乒乓球'
                                }
                            ],
                            validators:[
                                {
                                    method:'required',//必填
                                    param:'',
                                    message:'名称不能为空'
                                },
                                {
                                    method:'function',//自己写逻辑
                                    param:function(){
                                        return true;
                                    },//必须有返回值
                                    message:'不能通过逻辑'
                                }
                            ]
                        }]
                    }
                ]
            },
            //块（引用）
            {
                type: "block",
                title: '我是一个块（引用型）', //每个block可以不一样的
                children: [ //一个快可以有多个行
                    //行
                    {
                        type: "row",
                        title: 'row1标题：', //单行
                        children: [{
                            type: 'single', //类型，单选，单选搜索，多选，多选搜索
                            className: 'select',
                            title: '单选',
                            name: 'single1',
                            data: function(callback) {
                                var data = [{
                                    id: '1',
                                    name: '敏捷项目'
                                }, {
                                    id: '2',
                                    name: '立项项目'
                                }];
                                callback && callback(data);
                            },
                            placeholder: '请选择你的姓名',
                            validators:[
                                {
                                    method:'required',//必填
                                    param:'',
                                    message:'名称不能为空'
                                }
                            ]
                        }]
                    },
                    //行
                    {
                        type: "row",
                        title: 'row1标题：', //单行
                        children: [{
                            type: 'singleSearch', //类型，单选，单选搜索，多选，多选搜索
                            className: 'select',
                            title: '单选搜索',
                            name: 'singleSearch1',
                            data: function(callback) {
                                var data = [{
                                    id: '1',
                                    name: '敏捷项目'
                                }, {
                                    id: '2',
                                    name: '立项项目'
                                }];
                                callback && callback(data);
                            },
                            placeholder: '请选择你的姓名',
                            validators:[
                                {
                                    method:'required',//必填
                                    param:'',
                                    message:'名称不能为空'
                                },
                                {
                                    method:'function',//自己写逻辑
                                    param:function(){
                                        return true;
                                    },//必须有返回值
                                    message:'不能通过逻辑'
                                }
                            ]
                        }]
                    },
                    //行
                    {
                        type: "row",
                        title: 'row1标题：', //单行
                        children: [{
                            type: 'multiple', //类型，单选，单选搜索，多选，多选搜索
                            className: 'select1',
                            title: '多选',
                            name: 'multiple1',
                            data: function(callback) {
                                var data = [{
                                    id: '1',
                                    name: '敏捷项目'
                                }, {
                                    id: '2',
                                    name: '立项项目'
                                }];
                                callback && callback(data);
                            },
                            placeholder: '请选择你的姓名',
                            validators:[
                                {
                                    method:'required',//必填
                                    param:'',
                                    message:'名称不能为空'
                                },
                                {
                                    method:'function',//自己写逻辑
                                    param:function(){
                                        return true;
                                    },//必须有返回值
                                    message:'不能通过逻辑'
                                }
                            ]
                        }]
                    },
                    //行
                    {
                        type: "row",
                        title: 'row1标题：', //单行
                        children: [{
                            type: 'multipleSearch', //类型，单选，单选搜索，多选，多选搜索
                            className: 'select',
                            title: '多选搜索',
                            name: 'multipleSearch1',
                            data: function(callback) {
                                var data = [{
                                    id: '1',
                                    name: '敏捷项目'
                                }, {
                                    id: '2',
                                    name: '立项项目'
                                }];
                                callback && callback(data);
                            },
                            placeholder: '请选择你的姓名',
                            validators:[
                                {
                                    method:'required',//必填
                                    param:'',
                                    message:'名称不能为空'
                                },
                                {
                                    method:'function',//自己写逻辑
                                    param:function(){
                                        return true;
                                    },//必须有返回值
                                    message:'不能通过逻辑'
                                }
                            ]
                        }]
                    },
                    //行
                    {
                        type: "row",
                        title: 'row1标题：', //单行
                        children: [{
                            type: 'date', //类型，单选，单选搜索，多选，多选搜索
                            className: 'select',
                            title: '时间选择',
                            name: 'date1',
                            value: '2017-03-03 ~ 2017-03-04',
                            placeholder: '请选择你的时间',
                            validators:[
                                {
                                    method:'required',//必填
                                    param:'',
                                    message:'名称不能为空'
                                },
                                {
                                    method:'function',//自己写逻辑
                                    param:function(){
                                        return true;
                                    },//必须有返回值
                                    message:'不能通过逻辑'
                                }
                            ]
                        }]
                    },
                    //行
                    {
                        type: "row",
                        title: 'row1标题：', //单行
                        children: [{
                            type: 'date2', //类型，单选，单选搜索，多选，多选搜索
                            className: 'select',
                            title: '新的时间选择',
                            name: 'date2',
                            value: '2017-03-03 ~ 2017-03-04',
                            placeholder: '请选择你的时间',
                        }]
                    },
                    //行
                    {
                        type: "row",
                        title: '自定义气泡标签 - 没有模糊搜索的情况：', //单行
                        children: [{
                            type: 'manifest', //单选，只有一个，可不选
                            title: '爱好',
                            name: 'manifest1',
                            data: function(callback, val) {
                                setTimeout(function() {
                                    callback(['啦啦啦2', '阿萨德', '工单13', '工单2', '工单', '工单', '玩儿翁2']);
                                    //callback(['啦啦啦1','阿萨德','工单','个梵蒂冈','玩儿翁']);
                                }, 1000)
                            },
                            validators:[
                                {
                                    method:'required',//必填
                                    param:'',
                                    message:'名称不能为空'
                                },
                                {
                                    method:'function',//自己写逻辑
                                    param:function(){
                                        return true;
                                    },//必须有返回值
                                    message:'不能通过逻辑'
                                }
                            ]
                        }]
                    },
                    //行
                    {
                        type: "row",
                        title: '自定义气泡标签 - 不限制输入标签个数：', //单行
                        children: [{
                            type: 'manifest', //单选，只有一个，可不选
                            title: '爱好',
                            name: 'manifest2',
                            data: function(callback, val) {
                                callback([{
                                    'name': '1'
                                }, {
                                    'name': '2'
                                }]);
                            },
                            validators:[
                                {
                                    method:'required',//必填
                                    param:'',
                                    message:'名称不能为空'
                                },
                                {
                                    method:'function',//自己写逻辑
                                    param:function(){
                                        return true;
                                    },//必须有返回值
                                    message:'不能通过逻辑'
                                }
                            ]
                        }]
                    },
                    //行
                    {
                        type: "row",
                        title: '自定义气泡标签 - 限制输入标签个数为4：', //单行
                        children: [{
                            type: 'manifest', //单选，只有一个，可不选
                            title: '爱好',
                            name: 'manifest3',
                            tagMaxNum: '4', //标签的最大个数
                            data: function(callback, val) {
                                callback([{
                                    'name': '1'
                                }, {
                                    'name': '2'
                                }]);
                            },
                            validators:[
                                {
                                    method:'required',//必填
                                    param:'',
                                    message:'名称不能为空'
                                },
                                {
                                    method:'function',//自己写逻辑
                                    param:function(){
                                        return true;
                                    },//必须有返回值
                                    message:'不能通过逻辑'
                                }
                            ]
                        }]
                    },
                    //行
                    {
                        type: "row",
                        title: '自定义气泡标签 - 定义标签颜色：', //单行
                        children: [{
                            type: 'manifest', //单选，只有一个，可不选
                            title: '爱好',
                            name: 'manifest4',
                            tagBg: ['#4bc5c3', '#ffb230', '#ed6c44', '#c3a279', '#75b1ff'],
                            tagMaxNum: '4', //标签的最大个数
                            data: function(callback, val) {
                                callback([{
                                    'name': '1'
                                }, {
                                    'name': '2'
                                }]);
                            },
                            validators:[
                                {
                                    method:'required',//必填
                                    param:'',
                                    message:'名称不能为空'
                                },
                                {
                                    method:'function',//自己写逻辑
                                    param:function(){
                                        return true;
                                    },//必须有返回值
                                    message:'不能通过逻辑'
                                }
                            ]
                        }]
                    },
                    //行
                    {
                        type: "row",
                        title: '自定义气泡标签 - 定义标签颜色：', //单行
                        children: [{
                            type: 'manifest', //单选，只有一个，可不选
                            title: '爱好',
                            name: 'manifest5',
                            disabled : true,
                            value: function(callback, val) {
                                callback([{
                                    'name': '1'
                                }, {
                                    'name': '2'
                                }, {
                                    'name': '8888'
                                }, {
                                    'name': '6666'
                                }]);
                            },
                            validators:[
                                {
                                    method:'required',//必填
                                    param:'',
                                    message:'名称不能为空'
                                },
                                {
                                    method:'function',//自己写逻辑
                                    param:function(){
                                        return true;
                                    },//必须有返回值
                                    message:'不能通过逻辑'
                                }
                            ]
                        }]
                    },
                    //行
                    {
                        type: "row",
                        title: '自定义气泡标签 - 标签最多输入字符数：', //单行
                        children: [{
                            type: 'manifest', //单选，只有一个，可不选
                            title: '爱好',
                            name: 'manifest6',
                            inputMaxMum:'4',
                            validators:[
                                {
                                    method:'required',//必填
                                    param:'',
                                    message:'名称不能为空'
                                },
                                {
                                    method:'function',//自己写逻辑
                                    param:function(){
                                        return true;
                                    },//必须有返回值
                                    message:'不能通过逻辑'
                                }
                            ]
                        }]
                    },
                    //行
                    {
                        type:'row',
                        title:'文件上传：',
                        children:[{
                            type:'upload',
                            url:'upload.json',
                            title:'文件上传',
                            name:'upload',
                            validators:[
                                {
                                    method:'required',//必填
                                    param:'',
                                    message:'文件不能为空'
                                },
                                {
                                    method:'function',//自己写逻辑
                                    param:function(){
                                        return true;
                                    },//必须有返回值
                                    message:'不能通过逻辑'
                                }
                            ]
                        }]
                    },
                    //行
                    {
                        type:'row',
                        title:'城市选择：',
                        children:[{
                            type:'city',
                            name:'city',
                            data:cityData,
                            isOwnData:true,
                            validators:[
                                {
                                    method:'required',//必填
                                    param:'',
                                    message:'文件不能为空'
                                },
                                {
                                    method:'function',//自己写逻辑
                                    param:function(){
                                        return true;
                                    },//必须有返回值
                                    message:'不能通过逻辑'
                                }
                            ]
                        }]
                    }
                ]
            },
            //块（复合）
            {

                type: "block",
                title: '我是一个块（复合型）', //每个block可以不一样的
                name:'',
                children: [ //一个快可以有多个行
                    //行
                    {
                        type: "row",
                        title: '编译配置型：', //增加参数
                        isShowRequired: true,
                        name: 'row3',
                        children: [{
                            type: 'paraConfig',
                            name:'paraConfigName',
                            childrenList: [
                                {
                                type: 'text',
                                className: 'text',
                                title: 'text',
                                name: 'textName',
                                placeholder: '请输入你的2323',
                                maxlength: '2000',
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
                                        type: 'password',
                                        className: 'password',
                                        title: 'password',
                                        name: 'passwordName',
                                        value: '2',
                                        placeholder: '请输入你的444码',
                                        maxlength: '2000',
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
                                type:'city',
                                name:'city',
                                validators:[
                                    {
                                        method:'required',//必填
                                        param:'',
                                        message:'城市不能为空'
                                    },
                                    {
                                        method:'function',//自己写逻辑
                                        param:function(){
                                            return true;
                                        },//必须有返回值
                                        message:'不能通过逻辑'
                                    }
                                ]
                            },
                                {
                                    type:"actions",
                                    value:["add","remove"],
                                    language:"icon"//图标icon ,文字character
                                }
                            ]
                        }]
                    },
                    //行
                    {
                        type: "row",
                        title: '表格配置：', //增加参数
                        isShowRequired: true,
                        name: 'rowTable1',
                        children:[
                            {
                                type: 'tableParaConfig',
                                isShowRequired:true,
                                title: '可添加行的table类型：',
                                name: 'tableParaConfigName',
                                childrenThead:['hiddenField','序号','检查内容','检查结果','检查内容','检查结果','操作'],
                                childrenTbody:[
                                    {
                                        type: 'hidden', //类型text/password/hidden/textarea
                                        name: 'hiddenName',
                                        value:'1',
                                    },
                                    {   type:"index",
                                        name:"index",
                                        value:"第{{index}}行",
                                        style:{
                                            width:'80px'
                                        },
                                        language:"number"//number,roman,chinese ，
                                    },
                                    {
                                        type:'city',
                                        name:'city',
                                        validators:[
                                            {
                                                method:'required',//必填
                                                param:'',
                                                message:'文件不能为空'
                                            },
                                            {
                                                method:'function',//自己写逻辑
                                                param:function(){
                                                    return true;
                                                },//必须有返回值
                                                message:'不能通过逻辑'
                                            }
                                        ]
                                    },
                                    {
                                        type: 'single', //类型，单选，单选搜索，多选，多选搜索
                                        className: 'single',
                                        isRequired: 'true',
                                        isShowRequired:true,
                                        title: '单选',
                                        name: 'table3-single1',
                                        data: function(callback) {
                                            var data = [{
                                                id: '1',
                                                name: '敏捷项目'
                                            }, {
                                                id: '2',
                                                name: '立项项目'
                                            }];
                                            callback && callback(data);
                                        },
                                        placeholder: '请选择项目类型',
                                        byteChinese:'1',
                                        validators:[
                                            {
                                                method:'required',//必填
                                                param:'',
                                                message:'名称不能为空'
                                            },
                                            {
                                                method:'function',//自己写逻辑
                                                param:function(){
                                                    return true;
                                                },//必须有返回值
                                                message:'不能通过逻辑'
                                            }
                                        ]
                                    },
                                    {
                                        type: 'singleSearch', //类型，单选，单选搜索，多选，多选搜索
                                        title: '单选搜索',
                                        name: 'table3-singleSearch1',
                                        isShowRequired:true,
                                        data: function(callback) {
                                            var data = [{
                                                id: '1',
                                                name: '敏捷项目'
                                            }, {
                                                id: '2',
                                                name: '立项项目'
                                            }];
                                            callback && callback(data);
                                        },
                                        placeholder: '请选择项目类型',
                                        validators:[
                                            {
                                                method:'required',//必填
                                                param:'',
                                                message:'名称不能为空'
                                            },
                                            {
                                                method:'function',//自己写逻辑
                                                param:function(){
                                                    return true;
                                                },//必须有返回值
                                                message:'不能通过逻辑'
                                            }
                                        ]
                                    },
                                    {
                                        type: 'text',
                                        addClass: 'text',
                                        title: 'text',
                                        name: 'table3-textName1',
                                        value: '2',
                                        placeholder: '请输入你的2323',
                                        maxlength: '2000',
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
                                        type: 'password',
                                        addClass: 'password',
                                        title: 'password',
                                        name: 'table3-passwordName1',
                                        value: '2',
                                        placeholder: '请输入你的444码',
                                        maxlength: '2000',
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
                                    {   type:"actions",
                                        value:["add","remove","up","down","upToTop","downToBottom",{
                                            code:'popMenu1',
                                            title:'弹窗',
                                            fn:function(){
                                                console.log($(this));
                                            }
                                        }],
                                        plusOnlyOne:true,//是否在最后一行添加,true为在最后一行添加，false则是点击哪里在哪里添加
                                        language:"icon"//图标icon ,文字character
                                    }
                                ]//只配置一行数据就可以了,
                            }]
                    }
                ]
            },
            //块级增加
            {
                type: "block",
                title: '我是一个块（可添加型）', //每个block可以不一样的
                name:'',
                children: [ //一个快可以有多个行
                    //行
                    {
                        type: "row",
                        layout:'up-down',
                        children:[
                            {
                                type: 'blockParaConfig',
                                name: 'tableParaConfigName1',
                                childrenBlock:[
                                    {   type:"index",
                                        value:"域名{{index}}",
                                        style:{
                                            width:'80px'
                                        },
                                        language:"number"//number,roman,chinese ，
                                    },
                                    {
                                        type: 'single', //类型，单选，单选搜索，多选，多选搜索
                                        className: 'single',
                                        isRequired: 'true',
                                        isShowRequired:true,
                                        title: '单选',
                                        name: 'table3-single111',
                                        data: function(callback) {
                                            var data = [{
                                                id: '1',
                                                name: '敏捷项目111'
                                            }, {
                                                id: '2',
                                                name: '立项项目22222222222'
                                            }];
                                            callback && callback(data);
                                        },
                                        placeholder: '请选择项目类型',
                                        byteChinese:'1',
                                        validators:[
                                            {
                                                method:'required',//必填
                                                param:'',
                                                message:'名称不能为空'
                                            },
                                            {
                                                method:'function',//自己写逻辑
                                                param:function(){
                                                    return true;
                                                },//必须有返回值
                                                message:'不能通过逻辑'
                                            }
                                        ]
                                    },
                                    {
                                        type: 'singleSearch', //类型，单选，单选搜索，多选，多选搜索
                                        title: '单选搜索',
                                        name: 'table3-singleSearch1',
                                        isShowRequired:true,
                                        data: function(callback) {
                                            var data = [{
                                                id: '1',
                                                name: '敏捷项目'
                                            }, {
                                                id: '2',
                                                name: '立项项目'
                                            }];
                                            callback && callback(data);
                                        },
                                        placeholder: '请选择项目类型',
                                        validators:[
                                            {
                                                method:'required',//必填
                                                param:'',
                                                message:'名称不能为空'
                                            },
                                            {
                                                method:'function',//自己写逻辑
                                                param:function(){
                                                    return true;
                                                },//必须有返回值
                                                message:'不能通过逻辑'
                                            }
                                        ]
                                    },
                                    {
                                        type: 'text',
                                        addClass: 'text',
                                        title: 'text',
                                        name: 'table3-textName1',
                                        value: '2',
                                        placeholder: '请输入你的2323',
                                        maxlength: '2000',
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
                                        type: 'password',
                                        addClass: 'password',
                                        title: 'password',
                                        name: 'table3-passwordName1',
                                        value: '2',
                                        placeholder: '请输入你的444码',
                                        maxlength: '2000',
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
                                    {   type:"actions",
                                        value:["add","remove","up","down","upToTop","downToBottom"],
                                        plusOnlyOne:true,//是否在最后一行添加,true为在最后一行添加，false则是点击哪里在哪里添加
                                        language:"character"//图标icon ,文字character
                                    }
                                ]//只配置一行数据就可以了,
                            }]
                    }]
            },
            //富文本
            {
                type: "block",
                title: '我是一个块',
                name:'',
                children: [ //一个快可以有多个行
                    {
                        type:'row',
                        children:[
                            //富文本编辑
                            {
                                type: "umEditor",
                                name:'umEditor',
                                isShowRequired:true,
                                title: '富文本编辑', //每个block可以不一样的
                                width:'100%',
                            },
                        ]
                    }
                ]
            },
            //块（多次复合）
            {
                type: "block",
                title: '我是一个块（多次复合型）', //每个block可以不一样的
                children: [
                    {
                        type: "row",
                        title: '多次复合：', //增加参数
                        isShowRequired: true,
                        name: 'row-multiple',
                        children: [{
                            type: 'tableParaConfig',
                            name:'paraConfigName-multiple',
                            childrenTbody: [
                                {   type:"index",
                                    name:"index",
                                    value:"第{{index}}行",
                                    style:{
                                        width:'80px'
                                    },
                                    language:"number"//number,roman,chinese ，
                                },
                                {
                                    type: 'radio',
                                    name: 'textName',
                                    data:[{
                                        id:"0",
                                        name:'否'
                                    },{
                                        id:"1",
                                        name:'是'
                                    }],
                                    validators:[
                                        {
                                            method:'required',//必填
                                            param:'',
                                            message:'名称不能为空'
                                        }
                                    ]
                                },
                                {
                                    type: 'checkbox',
                                    name: 'checkBox',
                                    data:[{
                                        id:"0",
                                        name:'否'
                                    },{
                                        id:"1",
                                        name:'是'
                                    }],
                                    validators:[
                                        {
                                            method:'required',//必填
                                            param:'',
                                            message:'名称不能为空'
                                        }
                                    ]
                                },
                                {
                                    type: 'single', //类型，单选，单选搜索，多选，多选搜索
                                    className: 'single',
                                    isRequired: 'true',
                                    isShowRequired:true,
                                    title: '单选',
                                    name: 'table3-single1',
                                    data: function(callback) {
                                        var data = [{
                                            id: '1',
                                            name: '敏捷项目'
                                        }, {
                                            id: '2',
                                            name: '立项项目'
                                        }];
                                        callback && callback(data);
                                    },
                                    placeholder: '请选择项目类型',
                                    byteChinese:'1',
                                    validators:[
                                        {
                                            method:'required',//必填
                                            param:'',
                                            message:'名称不能为空'
                                        }
                                    ]
                                },
                                {
                                    type: 'paraConfig',
                                    name: 'tableParaConfigName',
                                    childrenList:[
                                        {   type:"index",
                                            name:"index",
                                            value:"第{{index}}行",
                                            style:{
                                                width:'80px'
                                            },
                                            language:"number"//number,roman,chinese ，
                                        },
                                        {
                                            type: 'text',
                                            name: 'table3-textName111',
                                            value: '2',
                                            placeholder: '请输入你的2323qqq',
                                            maxlength: '2000',
                                            validators:[
                                                {
                                                    method:'required',//必填
                                                    param:'',
                                                    message:'名称不能为空'
                                                }
                                            ]
                                        },
                                        {   type:"actions",
                                            value:["add","remove","up","down","upToTop","downToBottom",{
                                                code:'popMenu1',
                                                title:'弹窗',
                                                fn:function(){
                                                    console.log($(this));
                                                }
                                            }],
                                            plusOnlyOne:true,//是否在最后一行添加,true为在最后一行添加，false则是点击哪里在哪里添加
                                            language:"icon"//图标icon ,文字character
                                        }
                                    ]//只配置一行数据就可以了,
                                },
                                {
                                    type:"actions",
                                    value:["add","remove","up","down","upToTop","downToBottom"],
                                    language:"icon"//图标icon ,文字character
                                }
                            ]
                        }]
                    },
                ]
            },
        ],
//        handlerEvent:[{
//            name:'paraConfigName-multiple.textName',
//            event:'change',//事件类型change
//            condition:function(){
//                console.log(111111);
//                return true;
//            },
//            toDo:[{
//                name:'table3-single1',
//                way:'hide',
//                param:{
//                    id: '1',
//                    name: '敏捷项目'
//                },
//                condition:function(){
//                    console.log(2222222);
//                    return true;
//                }
//            }]
//        }],
        btn: { //按钮设置
            layout: 'bottom-center',//按钮的布局
            children: [{
                    type: "default",//按钮的类型，其实就是颜色和款式
                    value: '设置数据',//值
                    className: 'set-data'//对应绑定事件的class
                },{
                    type: "default",
                    value: '设置值',
                    className: 'set'
                },{
                    type: "disabled",
                    value: '获取值',
                    className: 'get'
                },{
                    type: "default",
                    value: '重置',
                    className: 'reset'
                },{
                    type: "djourney-active",
                    value: '清除',
                    className: 'clear'
                },{
                    type: "link",
                    value: '摧毁',
                    className: 'destroy'
                },{
                    type: "warning",
                    value: '显示',
                    className: 'show'
                },{
                    type: "danger",
                    value: '隐藏',
                    code: 'hide',
                    className: 'hideBtn'
                },{
                    type: "danger",
                    value: '启用',
                    className: 'enable'
                },{
                    type: "info",
                    value: '禁用',
                    className: 'disable'
                },{
                    type: "primary",
                    value: '必填标志',
                    className: 'required1'
                },{
                    type: "primary",
                    value: '不要必填标志',
                    className: 'required2'
                },{
                    type: "primary",
                    value: '添加',
                    className: 'add'
                },{
                    type: "primary",
                    value: '执行校验',
                    className: 'verify'
                },
            ]
        }
    });
    /*--------------------------设置数据-----------------*/
    $('.set-data').on('click', function() {
        demo1.setData({
            'paraConfigName-multiple': [{
                'tableParaConfigName':[{
                    'table3-single1':[{
                            id: '2',
                            name: '111橄榄球'
                        },
                        {
                            id: '3',
                            name: '22乒乓球'
                        },
                        {
                            id: '4',
                            name: '333乒乓球'
                        }
                    ]
                }]
            }]
        });
    });
    /*--------------------------设置方法-----------------*/
    $('.set').on('click', function() {
        demo1.setValue({
            'paraConfigName-multiple': [
                {
                    index:'文本11',
                    textName:'文本2222',
                    tableParaConfigName:[
                        {
                            index:'文本333',
                            'table3-single1':{
                                id: '1',
                                name: '敏捷项目'
                            },
                            'table3-textName111':'文本44'
                        },{
                            index:'文本333',
                            'table3-single1':{
                                id: '1',
                                name: '敏捷项目'
                            },
                            'table3-textName111':'文本44'
                        }
                    ]
                },
                {
                    index:'文本11',
                    textName:'文本2222',
                    tableParaConfigName:[
                        {
                            index:'文本333',
                            'table3-single1':{
                                id: '1',
                                name: '敏捷项目'
                            },
                            'table3-textName111':'文本44'
                        },{
                            index:'文本333',
                            'table3-single1':{
                                id: '1',
                                name: '敏捷项目'
                            },
                            'table3-textName111':'文本44'
                        }
                    ]
                },
                {
                    index:'文本11',
                    textName:'文本2222',
                    tableParaConfigName:[
                        {
                            index:'文本333',
                            'table3-single1':{
                                id: '1',
                                name: '敏捷项目'
                            },
                            'table3-textName111':'文本44'
                        },{
                            index:'文本333',
                            'table3-single1':{
                                id: '1',
                                name: '敏捷项目'
                            },
                            'table3-textName111':'文本445'
                        }
                    ]
                }
            ]
        });

    });
    /*--------------------------获取方法-----------------*/
    $('.get').on('click', function() {
        var $this = $(this);
//        console.log(demo1.getValue('loves2'));
//        console.log(demo1.getValue(['loves2','loves']));
//        demo1.getValue(function(data){
//            console.log(data);
//        });
        console.log(demo1.getValue());
    });
    /*-------------------------添加字段--------------*/
    $('.add').on('click', function() {
        demo1.add({
            name:'umEditor',//在这个元素之后创建
            location:'after',
            configuration:{
                type: "row",
                title: 'row1标题：', //单行
                children: [{
                    type: 'checkbox', //单选，只有一个，可不选
                    title: '爱好',
                    name: 'loves211',
                    data: [{
                        id: '1',
                        name: '足球'
                    },{
                        id: '2',
                        name: '橄榄球'
                    },{
                        id: '3',
                        name: '乒乓球'
                    }, {
                        id: '4',
                        name: '乒乓球'
                    }],
                    value: [{
                        id: '1',
                        name: '足球'
                    }]
                }]
            }
        });
    });
    /*---------------------执行校验----------------------*/
    $('.verify').on('click',function(){
        demo1.verify();
    });
    /*-------------------------必填--------------*/
    $('.required1').on('click', function() {
        demo1.required({'umEditor':true});
    });
    /*-------------------------不必填--------------*/
    $('.required2').on('click', function() {
        demo1.required({'umEditor':false});
    });
    /*-------------------------禁用--------------*/
    $('.disable').on('click', function() {
        demo1.disable();
//        demo1.disable({
//            childrenName:'tableParaConfigName',
//            rowName:'table3-single1',
//            rowIndex:'0'
//        });
    });
    /*-------------------------启用--------------*/
    $('.enable').on('click', function() {
        demo1.enable();
    });
    /*-------------------------显示--------------*/
    $('.show').on('click', function() {
        demo1.show();
        return false;
    });
    /*-------------------------隐藏--------------*/
    $('.hideBtn').on('click', function() {
        demo1.hide();
    });
    /*-------------------------清除--------------*/
    $('.clear').on('click', function() {
        demo1.clear();
    });
    /*-------------------------重置--------------*/
    $('.reset').on('click', function() {
        demo1.reset();
    });
    /*-------------------------摧毁--------------*/
    $('.destroy').on('click', function() {
        demo1.destroy();
    });
});
