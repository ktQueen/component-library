require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/tooltip/js/tooltip'
], function(Tooltip) {
    new Tooltip({
        element: $('#demo1'),
        direction:'top',
        shape:'hollow',
        status:'success',
        location:'right',
        message:'我是一个提我是一个提示文字1我是一个提示文字1我是一个提示文字1示文字1',
    });
    new Tooltip({
        element: $('#demo2'),
        direction:'bottom',
        shape:'hollow',
        message:'我是一个提示文字2',
    });
    new Tooltip({
        element: $('#demo3'),
        direction:'left',
        shape:'hollow',
        message:'我是一个提示文字3',
    });
    new Tooltip({
        element: $('#demo4'),
        direction:'right',
        shape:'hollow',
        message:'我是一个提示文字4',
    });
});
