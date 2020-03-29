require.config({
    baseUrl: 'http://localhost:63342/github/component-library/',
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min',
        'cssFile': 'modules/libs/rq/css.min'
    }
});
require([
    'jquery',
    'modules/drag/js/drag'
], function($, drag) {
    drag($('.header1'),$('.box1'));
    drag($('.header2'),$('.box2'));
});
