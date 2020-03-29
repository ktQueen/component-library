require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/secondary_option_menu/js/secondary_option_menu'
], function(SecondaryOptionMenu) {
    var demo = {
        //参数定义
        parameter: {
        },
        //程序入口
        init: function () {
            var that = this;
            var para = that.parameter;
            that._execute();
            that._bind();
        },
        //事件绑定
        _bind: function () {
            var that = this;
            var para = that.parameter;
        },
        //执行
        _execute: function () {
            var that = this;
            var para = that.parameter;
            //初始化
            that.listSelect();
        },
        //通过列表选择数据函数
        listSelect:function(){
        	new SecondaryOptionMenu({
        		ele:$('.demo-btn'),
        		placeholder:'请输入你想要搜索的城市',
        		//获取默认的城市
        		setValue:function(callback){
        			setTimeout(function(){
        			var data=[
        			 	{
				        	'value':1,
				        	'name':'上海'
				        },
				        {
				        	'value':2,
				        	'name':'北京'
				        },
				        {
				        	'value':3,
				        	'name':'杭州'
				        },
				        {
				        	'value':4,
				        	'name':'哈尔滨'
				        },
				        {
				        	'value':5,
				        	'name':'乌鲁木齐'
				        },
				        {
				        	'value':6,
				        	'name':'新疆'
				        }
			        ];
			        callback && callback(data);
			        },300);
        		},
		        //获取分类数据
		        setList:function(callback){
		        	setTimeout(function(){
		        	var data=[
			        	{
			        		'value':1,
			        		'name':'分类123',
                            'childs':[
                                {
                                    'value':1,
                                    'name':'上海'
                                },
                                {
                                    'value':2,
                                    'name':'北京'
                                },
                                {
                                    'value':3,
                                    'name':'杭州'
                                },
                                {
                                    'value':4,
                                    'name':'哈尔滨'
                                },
                                {
                                    'value':5,
                                    'name':'乌鲁木齐'
                                },
                                {
                                    'value':6,
                                    'name':'新疆'
                                },
                                {
                                    'value':7,
                                    'name':'苏州'
                                },
                                {
                                    'value':8,
                                    'name':'广州'
                                }
                            ]
			        	},
			        	{
			        		'value':2,
			        		'name':'分类12312分类1231223分类1231223分类123122323',
                            'childs':[
                                {
                                    'value':3,
                                    'name':'杭州'
                                },
                                {
                                    'value':4,
                                    'name':'哈尔滨'
                                },
                                {
                                    'value':5,
                                    'name':'乌鲁木齐'
                                },
                                {
                                    'value':6,
                                    'name':'新疆'
                                },
                                {
                                    'value':7,
                                    'name':'苏州'
                                },
                                {
                                    'value':8,
                                    'name':'广州'
                                }
                            ]
			        	},
			        	{
			        		'value':3,
			        		'name':'分类1所得税23',
                            'childs':[
                                {
                                    'value':1,
                                    'name':'上海'
                                },
                                {
                                    'value':5,
                                    'name':'乌鲁木齐'
                                },
                                {
                                    'value':6,
                                    'name':'新疆'
                                },
                                {
                                    'value':7,
                                    'name':'苏州'
                                },
                                {
                                    'value':8,
                                    'name':'广州'
                                }
                            ]
			        	},
			        	{
			        		'value':4,
			        		'name':'分类sad123',
                            'childs':[
                                {
                                    'value':1,
                                    'name':'上海'
                                },
                                {
                                    'value':2,
                                    'name':'北京'
                                },
                                {
                                    'value':3,
                                    'name':'杭州'
                                },
                                {
                                    'value':4,
                                    'name':'哈尔滨'
                                },
                                {
                                    'value':5,
                                    'name':'乌鲁木齐'
                                }
                            ]
			        	},
			        	{
			        		'value':5,
			        		'name':'分类sad12爱的3',
                            'childs':[
                                {
                                    'value':1,
                                    'name':'上海'
                                },
                                {
                                    'value':2,
                                    'name':'北京'
                                },
                                {
                                    'value':3,
                                    'name':'杭州'
                                },
                                {
                                    'value':4,
                                    'name':'哈尔滨'
                                },
                                {
                                    'value':5,
                                    'name':'乌鲁木齐'
                                },
                                {
                                    'value':6,
                                    'name':'新疆'
                                }
                            ]
			        	},
			        	{
			        		'value':6,
			        		'name':'分类123',
                            'childs':[
                                {
                                    'value':1,
                                    'name':'上海'
                                },
                                {
                                    'value':2,
                                    'name':'北京'
                                },
                                {
                                    'value':3,
                                    'name':'杭州'
                                },
                                {
                                    'value':4,
                                    'name':'哈尔滨'
                                },
                                {
                                    'value':5,
                                    'name':'乌鲁木齐'
                                },
                                {
                                    'value':6,
                                    'name':'新疆'
                                },
                                {
                                    'value':7,
                                    'name':'苏州'
                                }
                            ]
			        	}
			        ];
			        callback && callback(data);
			        },200);
		        },
//		        //获取可选择的城市数据
//		        /*kind分类的值,空则为全部*/
//		        setSelectValue:function(kind,callback){
//		        	setTimeout(function(){
//        			var data=[
//				        {
//				        	'value':1,
//				        	'name':'上海'
//				        },
//				        {
//				        	'value':2,
//				        	'name':'北京'
//				        },
//				        {
//				        	'value':3,
//				        	'name':'杭州'
//				        },
//				        {
//				        	'value':4,
//				        	'name':'哈尔滨'
//				        },
//				        {
//				        	'value':5,
//				        	'name':'乌鲁木齐'
//				        },
//				        {
//				        	'value':6,
//				        	'name':'新疆'
//				        },
//				        {
//				        	'value':7,
//				        	'name':'苏州'
//				        },
//				        {
//				        	'value':8,
//				        	'name':'广州'
//				        }
//			        ];
//			        /*这一行到时候删了*/
//        			data.length=data.length-kind;
//			        callback && callback(data);
//			        },400);
//		        },
		        /*
		        *点击保存时，触发相关操作
		        *data为保存时所选择的数据
		        */
		        save:function(data){
		        	console.log(data);
		        }
        	});
        }
    };
    demo.init();
});
