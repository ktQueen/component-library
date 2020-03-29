/**
 * @name demo
 * @description demo
 * @author kt
 * @since 2017-11-28
 */
require.config({
    baseUrl: 'http://localhost:63342/github/component-library/',
});
require([
    'modules/preload/js/preload'
], function( preload) {
    var demo={
        //当前
        current:1,//默认为4，我需要演示有序加载的例子
        //图片数组
        imgs:[
            'http://p16.qhimg.com/bdr/__/t013e2e081c80eb9733.jpg',
            //'http://wallpaper.pickywallpapers.com/2560x1440/norwegian-spring.jpg',
            'http://img.bizhi.sogou.com/images/2012/01/21/107268.jpg',
            'http://img.newyx.net/newspic/image/201409/16/781a802e4b.jpg',
            'http://p17.qhimg.com/bdr/__/d/_open360/fengjing0423/3.jpg',
            'http://p8.aipai.com/photo/179/19254179/photo/68/2653508/2653508_normal.jpg'
        ],
        //初始化执行
        init:function(){
            var _this=this;
            $('.example'+_this.current).show();
            _this['example'+_this.current]();
        },
        //示例1
        example1:function(){
            var _this=this;
            _this.clickFn($('.example1'));
        },
        //示例2
        example2:function(){
            var _this=this;
            var len=_this.imgs.length;
            var count=0;
            var $progress2=$('.example2 .progress');
            $.each(_this.imgs,function(i,src){
                var imgObj=new Image();
                $(imgObj).on('load error',function(){
                    $progress2.html(Math.round((count+1)/len*100)+'%');
                    if(count>=len-1){//最后一张加载完成
                        $('.example2 .loading').hide();
                    }
                    count++;
                });
                imgObj.src=src;
            });
            _this.clickFn($('.example2'));
        },
        //示例3
        example3:function(){
            var _this=this;
            var len=_this.imgs.length;
            var $progress3=$('.example3 .progress');
            $.preload({
                imgs:_this.imgs,
                each:function(count){
                    $progress3.html(Math.round((count+1)/len*100)+'%');
                },
                all:function(){
                    $('.example3 .loading').hide();
                }
            });
            _this.clickFn($('.example3'));
        },
        //示例4
        example4:function(){
            var _this=this;
            var len=_this.imgs.length;
            var count=0;
            function load(){
                var imgObj = new Image();
                $(imgObj).on('load error', function () {
                    count++;
                    if (count < len) {
                        load();
                    }else{
                        return false;
                    }
                });
                imgObj.src = _this.imgs[count];
            }
            load();
            _this.clickFn($('.example4'));
        },
        //示例5
        example5:function(){
            var _this=this;
            $.preload({
                imgs:_this.imgs,
                order:true
            });
            _this.clickFn($('.example5'));
        },
        //按钮点击事件
        clickFn:function($ele){
            var _this=this;
            var index=0;
            var len=_this.imgs.length;
            $ele.find('.btn').on('click',function(){
                if('prev'===$(this).data('control')){//这里最好把常量放在前面，避免赋值还不报错
                    index=index<=0?len-1:index-1;
                   //index=Math.max(0,--index);//前一个取最大
                }else{
                    index=index>=len-1?0:index+1;
                    //index=Math.min(len-1,++index);//后一个取最小
                }
                $ele.find('.num').html(index);
                $ele.find('.img').attr('src',_this.imgs[index]);
            });
        }
    };
    demo.init();
});
