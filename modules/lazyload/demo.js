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
    'modules/lazyload/js/lazyload',
    'modules/lazyload/js/jquery.lazyload',
], function( lazyload,lazyload2) {
    var demo={
        //当前
        current:5,
        //图片数组
        imgs:[
            'http://img.mp.itc.cn/upload/20160824/8164c2633b564181ab4986f1b4d014ac_th.jpg',
            'http://img.mp.itc.cn/upload/20160824/e8e309d905db4a179cc5cb44a2058676_th.jpg',
            'http://pic.68ps.com/down/UploadFile/20140721/sc140721_1a.jpg',
            'http://img1.ph.126.net/Q_vdqZuWvrG_uf9In7FCJQ==/3247658281387632508.jpg',
            'http://ww2.sinaimg.cn/mw600/539f69f5jw1eifwzon3d2j20j60arq4u.jpg',
            'http://img3.redocn.com/tupian/20140829/yezishuziranfengjingbeijingsucai_2971281.jpg',
            'http://p4.qhimg.com/t019e3d14a56d7c7a13.jpg',
            'http://cyjctrip.qiniudn.com/8304/1349925865958p1796thv0r1iu3kj61te3t3q15j3d.jpg',
            'http://img1.3lian.com/2015/a1/18/d/88.jpg',
            'http://img.xiami.net/images/collect/456/56/30900456_1399147604_BycW.jpg',
            'http://lvyou168.cn/travel/Azerbaijan/images/gallery-15-1.jpg',
            'http://lvyou168.cn/travel/Azerbaijan/images/gallery-12-1.jpg',
            'http://img.redocn.com/sheji/20150724/yangguangyeshuhaitanshipinsucai_4696226.jpg',
            'http://img5.niutuku.com/phone/1212/1822/1822-niutuku.com-26965.jpg',
            'http://wallpaper.pickywallpapers.com/2560x1440/norwegian-spring.jpg',
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
            var html='';
            $.each(_this.imgs,function(i,v){
                html+='<li class="img-box"><img src="'+v+'" alt="图片"></li>';
            });
            $('.example1 ul').html(html);
        },
        //示例2
        example2:function(){
            var _this=this;
            var html='';
            $.each(_this.imgs,function(i,v){
                html+='<li class="img-box"><a href="http://localhost:63342/IUI/modules/preload/demo.html">1111111</a><img src="img/pixel.gif" alt="图片" data-original = "'+v+'"></li>';
            });
            $('.example2 ul').html(html);

            var aImages = document.images;
            loadImg(aImages);
            window.onscroll = function(){
                loadImg(aImages);
            };
            function loadImg(arr){
                for( var i = 0,len = arr.length; i < len; i++){
                    //元素上边到视窗上边的距离
                    if(arr[i].getBoundingClientRect().top < document.documentElement.clientHeight && !arr[i].isLoad){
                        arr[i].isLoad = true;
                        arr[i].style.cssText = "transition: ''; opacity: 0;"
                        if(arr[i].dataset){
                            aftLoadImg(arr[i],arr[i].dataset.original);
                        }else{
                            aftLoadImg(arr[i],arr[i].getAttribute("data-original"));
                        }
                        (function(i){
                            setTimeout(function(){
                                arr[i].style.cssText = "transition: 1s; opacity: 1;"
                            },16)
                        })(i);
                    }
                }
            }
            function aftLoadImg(obj,url){
                var oImg = new Image();
                oImg.onload = function(){
                    obj.src = oImg.src;
                }
                oImg.src = url;
            }
        },
        //示例3
        example3:function(){
            var _this=this;
            var html='';
            $.each(_this.imgs,function(i,v){
                html+='<li class="img-box"><img src="img/pixel.gif" alt="图片" data-original = "'+v+'"></li>';
            });
            $('.example3 ul').html(html);
            $(".example3 img").lazyload({
                effect : "fadeIn", //渐现，show(直接显示),fadeIn(淡入),slideDown(下拉)
                threshold : 10, //预加载，在图片距离屏幕180px时提前载入
                event: 'scroll',  // 事件触发时才加载，click(点击),mouseover(鼠标划过),sporty(运动的),默认为scroll（滑动）
                //container: $(".example5"), // 指定对某容器中的图片实现效果
                //failure_limit:2 //加载2张可见区域外的图片,lazyload默认在找到第一张不在可见区域里的图片时则不再继续加载,但当HTML容器混乱的时候可能出现可见区域内图片并没加载出来的情况
            });
        },
        //示例4
        example4:function(){
            var _this=this;
            _this.clickFn4($('.example4'));
        },
        //按钮点击事件
        clickFn4:function($ele){
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
        },
        //示例5
        example5:function(){
            var _this=this;
            var html='';
            $.each(_this.imgs,function(i,v){
                html+='<li class="img-box"><img src="img/pixel.gif" alt="图片" data-original = "'+v+'"></li>';
            });
            $('.example5 ul').html(html);
            var index=0;
            var len=_this.imgs.length;
            _this.zIndexFn5(index);
            _this.imgLoad5(index);
            //克洛提前加载
            $(".example5").find('.btn').on('mouseover',function(){
                if($(".example5 li[isCurrent]").index()==index) {
                    index = _this.clickFn5(index, len, $(this));
                    _this.imgLoad5(index);
                }
            });
            $(".example5").find('.btn').on('click',function(){
                if($(".example5 li[isCurrent]").index()==index){
                    index= _this.clickFn5(index,len,$(this));
                    _this.imgLoad5(index);
                    _this.zIndexFn5(index);
                }else{
                    _this.zIndexFn5(index);
                }
                $(".example5").find('.num').html(index);
            });
        },
        //按钮点击事件
        clickFn5:function(index,len,$ele){
            if('prev'===$ele.data('control')){//这里最好把常量放在前面，避免赋值还不报错
                index=index<=0?len-1:index-1;
                //index=Math.max(0,--index);//前一个取最大
            }else{
                index=index>=len-1?0:index+1;
                //index=Math.min(len-1,++index);//后一个取最小
            }
            return index;
        },
        zIndexFn5:function(index){
            $(".example5 li").css('z-index',0).eq(index).css('z-index',1);
            $(".example5 li").removeAttr('isCurrent').eq(index).attr('isCurrent',true);
        },
        imgLoad5:function(index){
            beforeLoadImg();
            function beforeLoadImg(){
                var oImg = document.images[index+1];
                console.log(oImg);
                oImg.src = "img/pixel.gif";
                if(oImg.dataset){
                    aftLoadImg(oImg,oImg.dataset.original);
                }else{
                    aftLoadImg(oImg,oImg.getAttribute("data-original"));
                }
            }
            function aftLoadImg(obj,url){
                var oImg = new Image();
                oImg.onload = function(){
                    obj.src = oImg.src;
                }
                oImg.src = url;
            }
        },
        //示例6
        example6:function(){
            var _this=this;
            var html='';
            $.each(_this.imgs,function(i,v){
                html+='<li class="img-box"><img src="img/pixel.gif" alt="图片" data-original = "'+v+'"></li>';
            });
            $('.example6 ul').html(html);
            var index=0;
            var len=_this.imgs.length;
            _this.zIndexFn6(index);
            _this.imgLoad6(index);
            $(".example6").find('.btn').on('mouseover',function(){
                if($(".example6 li[isCurrent]").index()==index) {
                    index = _this.clickFn6(index, len, $(this));
                    _this.imgLoad6(index);
                }
            });
            $(".example6").find('.btn').on('click',function(){
                if($(".example6 li[isCurrent]").index()==index){
                    index= _this.clickFn6(index,len,$(this));
                    _this.imgLoad6(index);
                    _this.zIndexFn6(index);
                }else{
                    _this.zIndexFn6(index);
                }
            });
        },
        clickFn6:function(index,len,$ele){
            if('prev'===$ele.data('control')){//这里最好把常量放在前面，避免赋值还不报错
                index=index<=0?len-1:index-1;
                //index=Math.max(0,--index);//前一个取最大
            }else{
                index=index>=len-1?0:index+1;
                //index=Math.min(len-1,++index);//后一个取最小
            }
            $(".example6").find('.num').html(index);
            return index;
        },
        zIndexFn6:function(index){
            $(".example6 li").css('z-index',0).eq(index).css('z-index',1);
            $(".example6 li").removeAttr('isCurrent').eq(index).attr('isCurrent',true);
        },
        imgLoad6:function(index){
            $(".example6 img").eq(index).lazyload({
                //effect : "fadeIn", //渐现，show(直接显示),fadeIn(淡入),slideDown(下拉)
                //threshold : 10, //预加载，在图片距离屏幕180px时提前载入
                //event: 'click',  // 事件触发时才加载，click(点击),mouseover(鼠标划过),sporty(运动的),默认为scroll（滑动）
                //container: $(".example5"), // 指定对某容器中的图片实现效果
                //failure_limit:2 //加载2张可见区域外的图片,lazyload默认在找到第一张不在可见区域里的图片时则不再继续加载,但当HTML容器混乱的时候可能出现可见区域内图片并没加载出来的情况
            });
        }
    };
    demo.init();
});
