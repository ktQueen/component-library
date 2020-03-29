require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/form_field_manifest/js/form_field_manifest'
], function(FormFieldManifest) {
    /*------------------------Manifest------------------------------------------*/
    var ss = new FormFieldManifest({
        type:'manifest',
        element: $('#demo2'),
        tagColor: '#fff',
        title:'标签：',
        tagBg: ['#4bc5c3', '#ffb230', '#ed6c44', '#c3a279', '#75b1ff'],
        tagMaxNum: '4',
        value: function(callback) {
            //            callback(['啦啦啦1','阿萨德','工单','工单','个梵蒂冈','玩儿翁']);
            setTimeout(function() {
                callback(['工单', '工单', '个梵蒂冈', '玩儿翁']);
            }, 1000)
        },
        data: function(callback, val) {
            setTimeout(function() {
                callback(['啦啦啦2', '阿萨德', '工单13', '工单2', '工单', '工单', '玩儿翁2']);
                //callback(['啦啦啦1','阿萨德','工单','个梵蒂冈','玩儿翁']);
            }, 1000)
        },
        tip:"注：我是一个小提示"
    });
    ss.getValue(function(data) {
        console.log(data);
    });
    console.log();
    $('#des').on('click', function() {
        ss.destroy();
    });
    $('#clear').on('click', function() {
        ss.clear();
    });
    $('#reset').on('click', function() {
        ss.reset();
    });
    $('#dis').on('click', function() {
        ss.disabled(true);
    });
    $('#dis2').on('click', function() {
        ss.disabled(false);
    });
    /*--------------------------------Manifest----------------------------------*/
    new FormFieldManifest({
        type:'manifest',
        element: $('#demo3'),
        data: function(callback, val) {
            callback(['啦啦啦1', '阿萨德', '工单', '个梵蒂冈', '玩儿翁']);
        }
    });
    /*--------------------------------Manifest----------------------------------*/
    var s4 = new FormFieldManifest({
        type:'manifest',
        element: $('#demo4')
    });
});
