/**
 * @name time_change
 * @author kt
 * @description time_change时间转换
 * @date 2017-9-12
 * @param {timestamp} 时间字符串 是否必填 参数说明
 * @param {isShowDate} 是否要时分秒 是否必填 参数说明
 * @eg 调用方法：dateFormat(1234567890)
 */
define(function() {
    //时间戳
    var dateAdd0 = function(m) {
        return m < 10 ? '0' + m : m;
    }
    var dateFormat = function(timestamp, isShowDate) {
        var that = this;
        //timestamp是整数，否则要parseInt转换
        if (typeof(timestamp) != 'number') {
            timestamp = parseInt(timestamp);
        }
        var time = new Date(timestamp);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        var timeformat = year + '-' + dateAdd0(month) + '-' + dateAdd0(date);
        if (isShowDate == true) {
            timeformat += ' ' + dateAdd0(hours) + ':' + dateAdd0(minutes) + ':' + dateAdd0(seconds);
        }
        return timeformat;
    }
    return dateFormat;
});