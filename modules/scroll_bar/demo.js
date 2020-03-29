require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/scroll_bar/js/scrollbar'
],function(){
    $('#demo').perfectScrollbar();
    $('#demo').scrollLeft(300);
    $('#demo').perfectScrollbar('update');
});
