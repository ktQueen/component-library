require.config({
    baseUrl: 'http://localhost:63342/github/component-library/',
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min',
        'cssFile': 'modules/libs/rq/css.min'
    }
});
require([
    'jquery',
    'modules/modal/js/modal'
], function($, Modal) {
    $('#demo').on('click', function() {
        setTimeout(function(){
            var s1 = new Modal({
                //modalElement: $('.modal1'),
                addClass: 'ge1 eg2',
                style: {
                    height:'500px'
                },
                title: '我是一个标题',
                content: '<span>43534534534</span>',
                textConfirmBtn: '确定',
                handlerConfirmBtn: function() {
                    console.log('1111111');
                    //s1.clear();
                },
                htmlDone:function(){
                    console.log(this);
                }
            });
            s1.on('confirm', function() {
                console.log('22');
            })
            s1.on('confirm', function() {
                console.log(33333333);
                s1.footer([{
                    code: 'deal',
                    text: '新按钮'
                }]);
                return false;
            });
            s1.on('deal', function() {
                console.log('我是新按钮的点击事件');
            });
        },200);
    });
    $('#demo1').on('click',function(){
        new Modal({
            type:'load'
        })
    });
});
