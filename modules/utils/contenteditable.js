/**
 * Created by kt on 2017-5-3.
 */
$.fn.contentEditable = function() {
    /*如果是可编辑的元素*/
    if($(this).attr('contentEditable')=='true' || $(this).attr('contentEditable')==true){
        /*如果有maxlength设置*/
        if($(this).attr('maxlength')!=undefined){
            var max=$(this).attr('maxlength');
            $(this).on('input',function(){
                $(this).attr('data-value',$(this).text());
                if($(this).text().length>max){
                    $(this).text($(this).text().substring(0,max));
                    keyAction(this);
                }
            });
        }
        /*如果有placeholder设置*/
        if($(this).attr('placeholder')!=undefined){
            var defaultHtml='<div style="color:#757575;">'+$(this).attr('placeholder')+'</div>';
            if($(this).html().length==0){
                $(this).html(defaultHtml);
                $(this).attr('data-value','');
            }
            $(this).on('focus',function(){
                if($(this).html()==defaultHtml){
                    /*如果有设置模板*/
                    if($(this).attr('template')!=undefined){
                        $(this).html($(this).attr('template'));
                    }else{
                        $(this).empty();
                    }
                    $(this).attr('data-value','');
                }
            })
            $(this).on('blur',function(){
                /*如果有设置模板*/
                if($(this).attr('template')!=undefined){
                    if($(this).html()==$(this).attr('template')){
                        $(this).html(defaultHtml);
                        $(this).attr('data-value','');
                    }
                }else{
                    if($(this).html().length==0){
                        $(this).html(defaultHtml);
                        $(this).attr('data-value','');
                    }
                }
            });
        }
        $(this).on('mouseenter',function(){//给可编辑的元素绑定鼠标进入事件
            /*如果有readOnly,disabled设置*/
            if($(this).attr('disabled')=='disabled'||
                    $(this).attr('disabled')=='true'||
                    $(this).attr('disabled')==true||
                    $(this).attr('readOnly')=='readOnly'||
                    $(this).attr('readOnly')=='true'||
                    $(this).attr('readOnly')==true){
                $(this).removeAttr('contenteditable').css({
                    'background':'#fff',
                    'cursor':'no-drop'
                });
            }else{
                $(this).attr('contenteditable',true).css({
                    'background':'#fff',
                    'cursor':'text'
                });
            }
        });
    }
    function keyAction(obj) {
        var textbox = obj;
        var sel = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(textbox);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    }
};
