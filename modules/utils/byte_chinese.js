/**
 * @name byte_chinese
 * @author kt
 * @description byte_chinese中文1个字符占几个字节，返回字节长度
 * @date 2017-9-13
 */
define(function () {
    function byteChinese(val, num) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            if (val[i].match(/[^\x00-\xff]/ig) != null) //全角
                len += parseInt(num); //如果是全角，占用几字节
            else
                len += 1; //半角占用一个字节
        }
        return len;
    }

    return byteChinese;
});