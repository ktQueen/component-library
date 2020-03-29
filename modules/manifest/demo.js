require.config({
    baseUrl: 'http://localhost:63342/github/component-library/'
});
require([
    'modules/manifest/js/manifest'
], function(Manifest) {
    /*------------------------------------------------------------------*/
    new Manifest({
        element: $('#demo1'),
        setData: function(callback, val) {
            callback([{
                'name': '1'
            }, {
                'name': '2'
            }]);
        },
        inputMaxMum: ''
    });
    /*------------------------------------------------------------------*/
    var ss = new Manifest({
        element: $('#demo2'),
        tagColor: '#fff',
        tagBg: ['#4bc5c3', '#ffb230', '#ed6c44', '#c3a279', '#75b1ff'],
        tagMaxNum: '4',
        setValue: function(callback) {
            //            callback(['啦啦啦1','阿萨德','工单','工单','个梵蒂冈','玩儿翁']);
            setTimeout(function() {
                callback(['工单', '工单', '个梵蒂冈', '玩儿翁']);
            }, 1100)
        },
        isAllData: true,
        setData: function(callback, val) {
            setTimeout(function() {
                callback(['啦啦啦2', '阿萨德', '工单13', '工单2', '工单', '工单', '玩儿翁2']);
                //callback(['啦啦啦1','阿萨德','工单','个梵蒂冈','玩儿翁']);
            }, 1000)
        }
    });
    ss.getValue(function(data) {
        console.log(data);
    });
    console.log();
    $('#set-data').on('click', function() {
        ss.setData(['1', '2']);
    });
    $('#set-value').on('click', function() {
        ss.setValue(['3', '4']);
    });
    $('#get-value').on('click', function() {
        ss.getValue(function(value) {
            console.log(value);
        })
        console.log(ss.getValue());
    });

    $('#change').on('click', function() {
        ss.change(function(value) {
            console.log($(this));
            console.log(value);
        })
    });
    $('#show').on('click', function() {
        ss.show();
    });
    $('#hide').on('click', function() {
        ss.hide();
    });
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
        ss.disabled();
    });
    $('#dis2').on('click', function() {
        ss.enabled();
    });
    /*------------------------------------------------------------------*/
    new Manifest({
        element: $('#demo3'),
        setData: function(callback, val) {
            callback(['啦啦啦1', '阿萨德', '工单', '个梵蒂冈', '玩儿翁']);
        },
        isAllData: true
    });
    /*------------------------------------------------------------------*/
    var s4 = new Manifest({
        element: $('#demo4')
    });
    /*------------------------------------------------------------------*/
    var s5 = new Manifest({
        element: $('#demo5'),
        uniqueFlag: 'subjectCode',
        nameFlag: 'subjectCode',
        setData: function(callback, val) {
            callback([{
                    "id": 1,
                    "subjectCode": "1001.01",
                    "subjectName": "库存现金_人民币"
                },
                {
                    "id": 2,
                    "subjectCode": "1002.01",
                    "subjectName": "银行存款_人民币"
                }
            ]);
        },
        isAllData: true
    });
});
