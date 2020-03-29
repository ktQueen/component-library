require.config({
    paths: {
        'jquery': 'modules/libs/jq/jquery-2.1.1.min',
        'cssFile': 'modules/libs/rq/css.min'
    }
});
define([
    'jquery',
    'cssFile!modules/secondary_option_menu/css/secondary_option_menu'
], function($) {
    /**
     * @class
     * @classdesc 这是最开始为冰河平台开发的一个根据分类选择城市的组件，由于大家用的频率较高，放入组件内
     * @alias ListSelect
     * @author kt
     * @since 2017-5-20
     *
     * @param {object} opts - 配置参数
     * @param {string} [opts.ele=''] - 选择元素
     * @param {function} [opts.setValue=null] - 设置已经选中的值,并执行操作
     * @param {function} [opts.setList=null] - 设置列表数据,并执行操作
     * @param {function} [opts.setSelectValue=null] - 可选择的数据
     * @param {boolean} [opts.isSelectAll=true] - 默认有全选功能
     * @param {boolean} [opts.isSearch=true] - 默认有搜索功能
     * @param {string} [opts.placeholder='请输入你想要搜索的内容'] - 提示信息
     * @param {function} [opts.save=null] - 保存时触发函数

     * @requires 'jquery'
     * @requires 'require'
     */
    function ListSelect(opts) {
        this.init(opts);
    }
    ListSelect.prototype = {
        init: function (opts) {
            if (!opts) opts = {};
            opts = $.extend(true, {
                ele: '', /*选择元素*/
                setValue: null, /*设置已经选中的值,并执行操作*/
                setList: null, /*设置列表数据,并执行操作*/
                setSelectValue: null, /*可选择的数据*/
                isSelectAll: true, /*默认有全选功能*/
                isSearch: true, /*默认有搜索功能*/
                placeholder: '请输入你想要搜索的内容',
                save: null//保存时触发函数
            }, opts);
            var that = this;
            that.opts = opts;
            /*元素不存在直接返回*/
            if (!that.opts.ele)return;
            that.createBtnHtml();
            that.eleBindEvent();
        },
        /*创建元素隐藏域*/
        createBtnHtml: function () {
            var that = this;
            /*创建传值得隐藏域*/
            var html = that.opts.ele.html();
            that.opts.ele.html(html + '<input type="hidden" name="listSelect">');
            that.opts.setValue && that.defaultValueFn();
        },
        /*元素点击事件*/
        eleBindEvent: function () {
            var that = this;
            /*元素点击事件*/
            that.opts.ele.click(function () {
                that.createHtml();
                that.bindEvent();
                /*默认值*/
                that.opts.setValue && that.setValueFn();
                /*设置选择列表*/
                that.opts.setList && that.setListFn();
                /*可选择的全部值*/
                that.opts.setSelectValue && that.setSelectValueFn('');
                /*当前的可选数据*/
                that.currentData = '';
            });
        },
        /*创建html*/
        createHtml: function () {
            var that = this;
            /*已选中区域*/
            that.opts.listSelectBox =
                    $('<div class="list-select-box">' +
                            '<div class="list-select-bg"></div>' +
                            '<div class="list-select">' +
                            '<ul class="selected clear"></ul>' +
                            '<div class="main clear">' +
                            '<div class="list-box">' +
                            '<dl></dl>' +
                            '</div>' +
                            '<div class="select-box">' +
                            '<div class="select-search clear">' +
                            '<div class="select-all"><label><input type="checkbox"><span>全选</span></label></div>' +
                            '<div class="search">' +
                            '<input type="text" placeholder="' + that.opts.placeholder + '">' +
                            '</div>' +
                            '</div>' +
                            '<ul class="select-data clear"></ul>' +
                            '</div>' +
                            '</div>' +
                            '<div class="btns">' +
                            '<button class="empty">清空</button>' +
                            '<button class="sure">完成</button>' +
                            '<button class="cancle">取消</button>' +
                            '</div>' +
                            '</div>' +
                            '</div>');
            /*对当前元素操作*/
            $('body').append(that.opts.listSelectBox);
            that.opts.eleSelected = that.opts.listSelectBox.find('.selected');
            that.opts.eleList = that.opts.listSelectBox.find('.list-box dl');
            that.opts.eleSelecte = that.opts.listSelectBox.find('.select-data');
            that.opts.eleEmpty = that.opts.listSelectBox.find('.empty');
            that.opts.eleSure = that.opts.listSelectBox.find('.sure');
            that.opts.eleCancle = that.opts.listSelectBox.find('.cancle');
        },
        /*绑定事件*/
        bindEvent: function () {
            var that = this;
            /*已选择数据点击事件*/
            that.opts.eleSelected.click(function (ev) {
                that.eventDelegation(ev, 'li', function () {
                    $(this).remove();
                    that.valueInAll();
                });
            });
            /*列表点击事件*/
            that.opts.eleList.click(function (ev) {
                that.eventDelegation(ev, 'dt,dd', function () {
                    var $this=$(this);
                    $(this).addClass('active');
                    $(this).siblings().removeClass('active');
                    that.opts.eleSelecte.empty();
                    that.opts.listSelectBox.find('.search input').val('');
                    $.each(that.data,function(i,v){
                        if(v.value==$this.attr('data-value')){
                            if(v.childs){
                                that.setSelectValueInHtml(v.childs);
                            }else{
                                that.opts.setSelectValue && that.setSelectValueFn($(this).attr('data-value'));
                            }
                        }else if($this.attr('data-value')=='all'){
                            that.opts.setSelectValue && that.setSelectValueFn($(this).attr('data-value'));
                        }
                    });
                });
            });
            /*全选事件*/
            that.opts.listSelectBox.find('.select-all input').click(function () {
                if ($(this).prop('checked') == false) {
                    that.opts.eleSelecte.find('input').each(function () {
                        if ($(this).prop('checked') == true) {
                            $(this).prop('checked', false);
                            that.allToValue($(this));
                        }
                    });
                } else {
                    that.opts.eleSelecte.find('input').each(function () {
                        if ($(this).prop('checked') == false) {
                            $(this).prop('checked', true);
                            that.allToValue($(this));
                        }
                    });
                }
            });
            /*输入框事件*/
            that.opts.listSelectBox.find('.search input').bind('input propertychange', function (ev) {
                that.searchSureFn();
            });
            /*可选数据点击事件*/
            that.opts.eleSelecte.click(function (ev) {
                that.eventDelegation(ev, 'input', function () {
                    that.allToValue($(this));
                });
            });
            /*清空按钮*/
            that.opts.eleEmpty.click(function () {
                that.opts.eleSelected.empty();
                that.valueInAll();
            });
            /*确认按钮*/
            that.opts.eleSure.click(function () {
                that.getValueFn();
                var data = [];
                that.opts.eleSelected.find('li').each(function () {
                    data.push({
                        'value': $(this).attr('data-value'),
                        'name': $(this).text()
                    });
                });
                that.opts.setValue = function (callback) {
                    callback && callback(data);
                }
                that.opts.listSelectBox.remove();
                that.opts.save && that.opts.save(data);
            });
            /*取消按钮*/
            that.opts.eleCancle.click(function () {
                that.opts.listSelectBox.remove();
            });
        },
        //事件委托
        eventDelegation: function (ev, tag, callback) {
            var ev = ev || window.event;
            var target = ev.srcElement || ev.target;
            var bBtn = false;
            tag = tag.split(',');
            $.each(tag, function (i, v) {
                if (target.nodeName.toLowerCase() == v) {
                    bBtn = true;
                }
            });
            if (bBtn) {
                callback && callback.apply(target);
            }
        },
        /*设置默认值函数*/
        setValueFn: function () {
            var that = this;
            that.opts.setValue(function (data) {
                var str = '';
                $.each(data, function (i, v) {
                    str += '<li data-value=' + v.value + '>' + v.name + '</li>';
                });
                that.opts.eleSelected.html(str);
                that.valueInAll();
            });
        },
        /*设置选择列表函数*/
        setListFn: function () {
            var that = this;
            var str = '';
            that.opts.setList(function (data) {
                that.data=data;
                $.each(data, function (i, v) {
                    str += '<dd data-value=' + v.value + ' title=' + v.name + '>' + v.name + '</dd>'
                });
                that.opts.eleList.html('<dt data-value="all" class="active">全部</dt>' + str);
            });
        },
        /*设置全部数据的函数*/
        setSelectValueFn: function (kind) {
            var that = this;
            var str = '';
            that.opts.setSelectValue(kind, function (data) {
                that.setSelectValueInHtml(data);
            });
        },
        setSelectValueInHtml:function(data){
            var that = this;
            var str = '';
            that.currentData = data;
            $.each(data, function (i, v) {
                str += '<li data-value=' + v.value + '><label><input type="checkbox"><span>' + v.name + '</span></label></li>';
            });
            that.opts.eleSelecte.html(str);
            that.valueInAll();
        },
        /*对已选中的值在所有数据中进行选中处理*/
        valueInAll: function () {
            var that = this;
            var selectArr = [];
            var $selectedLi = that.opts.eleSelected.find('li');
            var $allSelectLi = that.opts.eleSelecte.find('li');
            /*清空*/
            $allSelectLi.each(function () {
                $(this).find('input').prop('checked', false);
            });
            /*选中当前*/
            $selectedLi.each(function () {
                var $this = $(this);
                $allSelectLi.each(function () {
                    if ($(this).attr('data-value') == $this.attr('data-value')) {
                        $(this).find('input').prop('checked', true);
                    }
                });
            });
            that.selectAllFn();
        },
        /*对所有数据中选中后数据对应到已选择区域*/
        allToValue: function (obj) {
            var that = this;
            var $selectedLi = that.opts.eleSelected.find('li');
            var $allSelectLi = that.opts.eleSelecte.find('li');
            var isExist = false;
            var $currentEle = obj.closest('li');
            /*删除或选中当前*/
            $selectedLi.each(function () {
                if ($currentEle.attr('data-value') == $(this).attr('data-value')) {
                    $(this).remove();
                    isExist = true;
                }
            });
            if (!isExist) {
                that.opts.eleSelected.append('<li data-value=' + $currentEle.attr('data-value') + '>' + $currentEle.text() + '</li>');
            }
            that.selectAllFn();
        },
        /*全选判断*/
        selectAllFn: function () {
            var that = this;
            var selectArr = [];
            var $allSelectLi = that.opts.eleSelecte.find('li');
            /*全选判断*/
            $allSelectLi.each(function () {
                if ($(this).find('input').prop('checked') == true) {
                    selectArr.push($(this));
                }
            });
            if (selectArr.length == $allSelectLi.length && $allSelectLi.length != 0) {
                that.opts.listSelectBox.find('.select-all input').prop('checked', true);
            } else {
                that.opts.listSelectBox.find('.select-all input').prop('checked', false);
            }
        },
        //搜索函数
        searchSureFn: function () {
            var that = this;
            var str = '';
            var val = that.opts.listSelectBox.find('.search input').val();
            $.each(that.currentData, function (i, v) {
                if ((v.name).indexOf(val) != -1) {
                    str += '<li data-value=' + v.value + '><label><input type="checkbox"><span>' + v.name + '</span></label></li>';
                }
            });
            that.opts.eleSelecte.html(str);
            that.valueInAll();
        },
        /*默认隐藏域的值*/
        defaultValueFn: function () {
            var that = this;
            var dataArr = [];
            that.opts.setValue(function (data) {
                $.each(data, function (i, v) {
                    dataArr.push(v.value);
                })
                that.opts.ele.find('input[type="hidden"]').val(dataArr.join(','));
            });
        },
        /*向隐藏域传值*/
        getValueFn: function () {
            var that = this;
            var data = [];
            that.opts.eleSelected.find('li').each(function () {
                data.push($(this).attr('data-value'));
            });
            that.opts.ele.find('input[type="hidden"]').val(data.join(','));
        }
    };
    return ListSelect;
});
