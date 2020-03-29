require.config({
    baseUrl: 'http://localhost:63342/github/component-library/',
    paths: {
        'daterangepicker': 'modules/iui_datepicker/js/iuidatepicker',
        'cssFile': 'modules/libs/rq/css.min'
    },
    shim: {
        'daterangepicker': {
            'deps': ['cssFile!modules/iui_datepicker/css/iuidatepicker.css']
        }
    }
});
require(['daterangepicker'], function(cal) {
    $("input:not([type])").focus(function(evt) {
        var $this = $(this);
        var _this = this;
        if (this.cal) { //如果存在 不做任何操作

        } else { //如果不存在，开始执行初始化动作
            var opts = $this.siblings(".options").text();
            var initOpts = JSON.parse(opts);
            initOpts.attobj = $this;
            initOpts.setValue = function(vals) {
                if (initOpts.singleDate) {
                    $this.val(vals)
                } else {
                    $this.val(vals.startTime + " 至 " + vals.endTime)
                }

            }
            initOpts.clear = function() {
                $this.val("")


            }
            console.log(initOpts);
            _this.cal = new cal(initOpts);
            var btns = $this.siblings("input[type=button]");
            btns.click(function() {
                var act = $(this).val();
                if (act == "destroy") {
                    _this.cal[act](_this.cal);
                } else if (act == "getValue") {
                    console.log(_this.cal[act]());
                } else {
                    _this.cal[act]();
                }

            })
        }
        //var val=$this.val().split(" 至 ");
        this.cal.show($this.val());
        $(document.body).click(function() {
            _this.cal.hide();
        });

    })
    $("input").click(function(evt) {
        evt.stopPropagation();
        return false;
    })
    $(".show-option").click(function(evt) {
        var preObj = $(this).next();
        if (preObj.is(':hidden')) {
            $(this).next().show();
        } else {
            $(this).next().hide();
        }

        return false;
    })
});
