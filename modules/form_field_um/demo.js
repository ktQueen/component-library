require.config({
    baseUrl: 'http://localhost:63342/github/component-library/',

});

require([
    'modules/form_field_um/js/form_field_um',
], function(Um) {
    var um= new Um({
        type:"umEditor",
        element:$('.myEditor'),
        value:"888888",
        height:500,
        width:1200,
    });
    $('.getValue').on('click',function () {
        alert(um.getValue());
    });
    $('.clear').on('click',function () {
        um.clear()
    });
    $('.destroy').on('click',function () {
        um.destroy()
    });
    $('.disable').on('click',function () {
        um.disable();
    });
    $('.enable').on('click',function () {
        um.enable();
    });
    $('.hide').on('click',function () {
        um.hide();
    });
    $('.show').on('click',function () {
        um.show();
    });
    $('.reset').on('click',function () {
        um.reset();
    });
    $('.setValue').on('click',function () {
        um.setValue("<div>3467676767676</div>");
    })
});

