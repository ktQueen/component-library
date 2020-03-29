require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/progress_bar/js/progress_bar'
], function(progressBar) {
    var bar1 = new progressBar({
        type: 'columnar',
        element: $('#demo1'),
        addClass: 'emem',
        outerStyle: { //只能设置这些了，再设置也没有用了
            'width': '400px', //外环宽度
            'height': '30px', //外环高度
            'background': '#ddd', //外环背景
            'color': '#999', //外环字体颜色，当进度条没有到达文字时的颜色
            'border-radius': '30px' //外环圆角
        },
        innerStyle: {
            'height': '20px', //内环高度，宽度是不能设置的，设置也没有用，我会强行转换的
            'background': 'blue', //内环背景
            'color': '#f1f1f1', //内环字体颜色，当进度条到文本时的颜色
            'border-radius': '30px' //内环圆角
        },
        //        setValue:'80%',
        //        setValue:{
        //            url:'data.json',
        //            data:{},
        //            time:'100',
        //            timeout:'1000',
        //            timeoutTip:'超时了',
        //            field:'repData.bar'
        //        },
        //        setValue:function(callback){//这种方法的超时就设置在ajax上，自己去修改超时提示
        //            //console.log(this);this执行当前进度条。
        //            //_this.$inner.html(txt);
        //            //_this.$assist.html(txt);
        //            callback(num+'%')
        //            num++;
        //        },
        //        time:'100',//针对setValue是function、object的情况下设置
        isText: 'true',
        maxValue: '70%'
            //        barEnd:function(){
            //            console.log('=================');
            //        }
    });
    /*----------------------------------设置值-------------------*/
    /*第一种设置值的方法*/
    //    setInterval(function(){
    //        num++;
    //        bar1.setValue(num+'%');
    //    },100)
    /*第二种设置值的方法*/
    /*推荐用这种*/
    //    bar1.setValue({
    //        url:'data.json',
    //        data:{},
    //        time:'100',
    //        timeout:'1000',
    //        timeoutTip:'超时了',
    //        field:'repData.bar'
    //    });
    /*第三种设置值的方法*/
    $('.set').on('click', function() {
        bar1.setValue({
            url: 'data.json',
            data: {},
            time: '1000',
            timeout: '1000',
            timeoutTip: '超时了',
            field: 'repData.bar'
        });
    });
    /*--------------------------获取进度方法-----------------*/
    $('.get').on('click', function() {
        var $this = $(this);
        //$this.html(bar1.getValue());
        bar1.getValue(function(data) {
            $this.html(data);
        });
    });
    /*-------------------------重置进度条--------------*/
    $('.reset').on('click', function() {
        bar1.reset();
    });
    /*-------------------------清除进度条--------------*/
    $('.clear').on('click', function() {
        bar1.clear();
    });
    /*-------------------------摧毁进度条--------------*/
    $('.destroy').on('click', function() {
        bar1.destroy();
    });
    /*-------------------------显示进度条--------------*/
    $('.show').on('click', function() {
        bar1.show();
    });
    /*-------------------------隐藏进度条--------------*/
    $('.hide').on('click', function() {
        bar1.hide();
    });


    var num = 0;
    var bar2 = new progressBar({
        type: 'circle',
        element: $('#demo2'),
        addClass: 'emem2',
        outerStyle: {
            'width': '40px',
            'background': '#f1f1f1'
        },
        innerStyle: {
            'width': '6px', //圆环的宽度
            'background': 'green' //圆环的背景
        },
        //setValue:'50%',
        //        setValue:{
        //            url:'data.json',
        //            data:{},
        //            time:'100',
        //            timeout:'1000',
        //            timeoutTip:'超时了',
        //            field:'repData.bar'
        //        },
        //        setValue:function(callback){//这种方法的超时就设置在ajax上，自己去修改超时提示
        //            //console.log(this);this执行当前进度条。
        //            //_this.$txt.html(txt);
        //            callback(num+'%')
        //            num++;
        //        },
        //        time:'100',//针对setValue是function、object的情况下设置
        maxValue: '100%'
    });
    /*----------------------------------设置值-------------------*/
    /*第一种设置值的方法*/
    //    setInterval(function(){
    //        num++;
    //        bar2.setValue(num+'%');
    //    },100)
    /*第二种设置值的方法*/
    /*推荐用这种*/
    //    bar2.setValue({
    //        url:'data.json',
    //        data:{},
    //        time:'100',
    //        timeout:'1000',
    //        timeoutTip:'超时了',
    //        field:'repData.bar'
    //    });
    /*第三种设置值的方法*/
    bar2.setValue(function(callback) {
        setTimeout(function() {
            callback(num + '%')
            num++;
        }, 1000);
        //     /*-------------------------重置进度条--------------*/
        //     //        if(num==30){
        //     //            bar2.reset();
        //     //        }
        //     /*-------------------------清除进度条--------------*/
        //     //        if(num==30){
        //     //            bar2.clear();
        //     //        }
        //     /*-------------------------摧毁进度条--------------*/
        //     //        if(num==30){
        //     //            bar2.destroy();
        //     //        }
    }, 100);
    // bar2.setValue({
    //     url: '/versionRecord/getState',
    //     data: { ids: "31032850359681" },
    //     time: '1000',
    //     // timeout: '1000',
    //     // timeoutTip: '超时了',
    //     field: 'repData.bar'
    // });
    /*--------------------------获取进度方法-----------------*/
    bar2.getValue(function(data) {
        console.log(data);
    });
});
