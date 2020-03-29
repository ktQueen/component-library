require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/tab/js/tab'
], function(Tab) {
    /*---------------------------*/
    var tab1 = new Tab({
        element: $('#demo1')
    });

    /*---------------------------*/
    var tab2 = new Tab({
        element: $('#demo2'),
        current: 2,
        event: 'mouseover',
        titleElement: $('#demo2 .tab-head>a'),
        conElement: $('#demo2 .tab-body>div'),
        addCurrentTitleClass: 'active',
        change: function() {
            console.log('111111111');
        },
        effect: 'fade'
    });
    tab2.on('change', function(index) {
        console.log($(this));
        console.log(index);
        console.log(333333333333);
    });

    /*---------------------------*/
    var tab3 = new Tab({
        element: $('#demo3'),
        auto: '3000'
    });
    /*---------------------------*/
    var tab4 = new Tab({
        element: $('#demo4'),
        loadingWay: 'stepwise',
        title: ['标题a', '标题b', '标题c', '标题d'],
        content: [
            (function() {
                return '呀呀呀'
            })(),
            function(callback) {
                setTimeout(function() {
                    callback('呀呀呀2');
                }, 1000)
            },
            '内容c',
            '内容d'
        ]
    });
});
