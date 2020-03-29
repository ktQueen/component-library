require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/city_selector/js/city_selector',
    'modules/city_selector/js/city_data'
], function(CitySelector,cityData) {
    //使用默认数据的方式
    new CitySelector({
        element:$('#demo1'),
        data:cityData,
        isOwnData:true,
        required:false
    });
    //使用自定义数据的方式
    var demo1=new CitySelector({
        element:$('#demo2'),
        multiSelect:true,
        idFlag:'pingyin',//标识字段
        nameFlag:'cityName',//名字字段
        pinyinFlag:'pingyin',//拼音字段
        hotFlag:'isHot',//热门城市字段
        //isIcon:false,
        data:function(callback){
            $.ajax({
                url:'js/city.json',
                dataType:'json',
                success:function(data){
                    callback(data.repData.citySubjectResultList);
                },
                error:function(){}
            });
        }
    });

    /*--------------------------设置方法-----------------*/
    $('.set').on('click', function() {
        demo1.setValue(function(callback) {
            setTimeout(function() {
                callback([ {
                    "allowanceMoney": "80",
                    "cityMoney": "100",
                    "cityName": "北京市",
                    "cityType": 1,
                    "id": 41,
                    "isHot": 1,
                    "isLeaf": 1,
                    "isVaild": 1,
                    "majorId": "11001",
                    "pid": "110",
                    "pingyin": "beijing",
                    "pinyinShort": "bjs",
                    "weight": 101
                },
                    {
                        "allowanceMoney": "60",
                        "cityMoney": "250",
                        "cityName": "天津市",
                        "cityType": 2,
                        "id": 43,
                        "isHot": 1,
                        "isLeaf": 1,
                        "isVaild": 1,
                        "majorId": "12001",
                        "pid": "120",
                        "pingyin": "tianjins",
                        "pinyinShort": "tjs",
                        "weight": 101
                    }])
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
