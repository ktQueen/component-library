/**
 * @name input_cursor
 * @description input_cursor
 * @author kt
 * @since 2018-1-25
 */
$.extend($.fn,{
    //获取文本框内光标位置
    getSelectionStart: function() {
        var e = this[0];
        if (e.selectionStart) {
            return e.selectionStart;
        } else if (document.selection) {
            e.focus();
            var r=document.selection.createRange();
            var sr = r.duplicate();
            sr.moveToElementText(e);
            sr.setEndPoint('EndToEnd', r);
            return sr.text.length - r.text.length;
        }

        return 0;
    },
    getSelectionEnd: function() {
        var e = this[0];
        if (e.selectionEnd) {
            return e.selectionEnd;
        } else if (document.selection) {
            e.focus();
            var r=document.selection.createRange();
            var sr = r.duplicate();
            sr.moveToElementText(e);
            sr.setEndPoint('EndToEnd', r);
            return sr.text.length;
        }
        return 0;
    },
    //自动插入默认字符串
    insertString: function(str) {
        $(this).each(function() {
            var tb = $(this);
            tb.focus();
            if (document.selection){
                var r = document.selection.createRange();
                document.selection.empty();
                r.text = str;
                r.collapse();
                r.select();
            } else {
                var newstart = tb.get(0).selectionStart+str.length;
                tb.val(tb.val().substr(0,tb.get(0).selectionStart) +
                        str + tb.val().substring(tb.get(0).selectionEnd));
                tb.get(0).selectionStart = newstart;
                tb.get(0).selectionEnd = newstart;
            }
        });

        return this;
    },
    setSelection: function(startIndex,len) {
        $(this).each(function(){
            if (this.setSelectionRange){
                this.setSelectionRange(startIndex, startIndex + len);
            } else if (document.selection) {
                var range = this.createTextRange();
                range.collapse(true);
                range.moveStart('character', startIndex);
                range.moveEnd('character', len);
                range.select();
            } else {
                this.selectionStart = startIndex;
                this.selectionEnd = startIndex + len;
            }
        });

        return this;
    },
    getSelection: function() {
        var elem = this[0];

        var sel = '';
        if (document.selection){
            var r = document.selection.createRange();
            document.selection.empty();
            sel = r.text;
        } else {
            var start = elem.selectionStart;
            var end = elem.selectionEnd;
            var content = $(elem).is(':input') ? $(elem).val() : $(elem).text();
            sel = content.substring(start, end);
        }
        return sel;
    }
})