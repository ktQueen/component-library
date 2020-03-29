/**
 * @name demo_money_change
 * @description demo_money_change
 * @author kt
 * @since 2017-11-23
 */
require.config({
    baseUrl: '',
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min',
        'cssFile': 'modules/libs/rq/css.min'
    }
});
require([
    'jquery',
    'modules/utils/money_change'
], function($,moneyChange) {
    //小写转大写
    $(".usage1 button").on('click',function(){
        $(".usage1 textarea").val(moneyChange.formatRMB($(".usage1 input").val()));
    });
    //大写转小写
    $(".usage2 button").on('click',function(){
        $(".usage2 input").val(moneyChange.parseRMB($(".usage2 textarea").val()));
    });
});
