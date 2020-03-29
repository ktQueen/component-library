/**
 * @name drag
 * @description drag
 * @author kt
 * @since 2017-11-15
 */
define(function() {
    function drag(obj,box){
        var obj=obj.get(0);//点击元素
        var box=box.get(0);//拖拽元素
        var num=0;//吸附范围
        obj.style.cursor='move';
        obj.onmousedown=function(ev){
            var ev=ev||window.event;
            var disX=ev.clientX-box.offsetLeft;
            var disY=ev.clientY-box.offsetTop;
            // 设置全局捕获.拖拽的时候，如果有文字被选中，解决产生的问题
            if(obj.setCapture){
                obj.setCapture();
            }

            document.onmousemove=function(ev){
                var ev=ev||window.event;
                var l=ev.clientX-disX;
                var t=ev.clientY-disY;
                if(l<num){
                    l=0;
                }
                if(l>document.documentElement.clientWidth-box.offsetWidth-num){
                    l=document.documentElement.clientWidth-box.offsetWidth;
                }
                if(t<num){
                    t=0;
                }
                if(t>document.documentElement.clientHeight-box.offsetHeight-num){
                    t=document.documentElement.clientHeight-box.offsetHeight;
                }
                box.style.left=l+'px';
                box.style.top=t+'px';
            };

            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
                //释放全局捕获
                if(obj.releaseCapture){
                    obj.releaseCapture();
                }
            };
            return false;
        };
    };
    return drag;
});
