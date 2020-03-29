/**
 * Created by kt on 2017-10-30.
 */
/*
 * @param paras
 * * paras{
 url:"",
 tableCon:"",展示数据的容器,必填
 loadType:PageBar/loadMore/onlyCurPage//加载数据，显示的类型。默认为分页显示
 //第四种： noPageBar直接就只显示几条信息，没有分页，或者有跳转框
 headTitleArry:[],//表头的内容
 pageSize:"",//每页显示多少条数据,除了没有分页按钮之外，都要传值。
 redrawTbody:redrawTbody(),//渲染每一行
 setPageInfo:setPageInfo(),//返回数据的总条数，如果没有分页显示，则不需要传值
 tableClass:"",//表格的样式
 theadClass:"",表头的样式
 tbodyClass:"",表内容样式
 pageBarClass:"",//选中页码的样式,有默认值
 infoDataCon:$(),//展示数据的信息容器
 pageBarCon:$(),//展示翻页工具的容器,如果没有传入值，则 自动生成在表格的下面
 loadMoreClass:"load-more",//加载按钮的样式，有默认值
 * }
 *
 */
require.config({
    baseUrl: 'http://localhost:63342/github/component-library/',
    paths: {
        // 'jquery': 'modules/libs/jq/jquery-1.12.4.min',
        'cssFile': 'modules/libs/rq/css.min'
    }
});
define(['jquery', 'cssFile!modules/table/css/table.css'], function ($) {
    function Table(paras) {
        var that = this;
        that.init(paras);
        that.render();
    }
    Table.prototype = {
        init: function (paras) {
            var option = {
                url: "",
                data: [],
                pageSize: 5,
                headTitleArry: [],
                currentPage: 1,
                preBtn: $("<div class=\"preBtn\"><</div>"), //上一页按钮
                nextBtn: $("<div class=\"nextBtn\">></div>"), //下一页按钮
                firstBtn: $("<div class=\"firstBtn\"><<</div>"), //首页
                endBtn: $("<div class=\"endBtn\">>></div>"), //尾页
                beforeElli: $("<div class=\"beforeElliBtn\">...</div>"), //前面省略号
                afterElli: $("<div class=\"afterElliBtn\">...</div>"), //后面省略号
                loadMore: $('<div>加载更多...</div>'),
                redrawTbody: null,
                setPageInfo: null,
                tableCon: "", //展示数据的容器
                theadClass: "thead-default", //默认头部样式
                tbodyClass: "tbody-default", //默认表内容样式
                tableClass: "table-default", //默认表格的样式
                pageBarClass: "pagebar-active-default", //选中页码的样式,有默认值
                loadMoreClass: "load-more", //默认的加载更多按钮样式
                infoDataCon: $(), //展示数据的信息容器
                pageBarCon: $(), //展示翻页工具的容器,如果没有传入值，则 自动生成在表格的下面
                loadType: "PageBar", //默认为分页
                isShowInfo: true, //是否显示数据信息
                btnNum: 5, //默认按钮数为5
            };
            this.setting = $.extend(option, paras);
        },
        render: function () {
            //如果传入表头，则添加表头
            var that = this;
            if (this.setting.headTitleArry.length > 0) {
                var str = "";
                for (var i = 0; i < this.setting.headTitleArry.length; i++) {
                    //str +="<th class='"+(this.setting.headTitleClass[i]?this.setting.headTitleClass[i]:"")+"'>"+ this.setting.headTitleArry[i]+"</th>";
                    str += "<th>" + this.setting.headTitleArry[i] + "</th>";
                }
                this.$thead = $("<thead><tr>" + str + "</tr></thead>").addClass(this.setting.theadClass);
            }
            this.$tbody = $("<tbody></tbody>").addClass(this.setting.tbodyClass);
            this.$table = $("<table cellspacing='0'>").append(this.$thead).append(this.$tbody);
            this.$table.addClass(this.setting.tableClass);
            this.setting.tableCon.html(this.$table);

        },
        //渲染分页
        renderPagination:function(){
          //如果自己传入按钮和数据信息的容器，那么不用自动生成，如果没有传入，默认在容器下方生成。
          if (this.setting.infoDataCon.length == 0) {
              this.setting.infoDataCon = $('<span class="info-default"></span>');
              this.setting.pageBarCon = $('<div class="info-bar-default"></div>');
              this.$pageBar = $('<div class="info-bar-cont-default"></div>');
              this.$pageBar.append(this.setting.infoDataCon).append(this.setting.pageBarCon);
              this.setting.tableCon.after(this.$pageBar);
          }
          //this.$pageBar = $('<div class="info-bar-cont"><span class="info"></span> <div class="info-bar"></div> </div>');
          if (this.setting.loadType == "loadMore") { //如果要显示加载更多 按钮
              this.setting.tableCon.after(this.setting.loadMore);
              this.setting.loadMore.addClass(this.setting.loadMoreClass);
          } else if (this.setting.loadType == "noPageBar") { //不显示分页信息
          } else if (this.setting.loadType == "onlyCurPage") {
          } else {
              $(this.setting.pageBarCon)
                  .append(this.setting.firstBtn)
                  .append(this.setting.preBtn)
                  .append(this.setting.beforeElli)
                  .append(this.setting.afterElli)
                  .append(this.setting.nextBtn)
                  .append(this.setting.endBtn);
          }
          $(this.setting.pageBarCon).find('.preBtn').bind('click', { _this: this }, function (e) {
              e.data._this.goto(e.data._this.setting.currentPage - 1);
          });
          $(this.setting.pageBarCon).find('.nextBtn').bind('click', { _this: this }, function (e) {
              e.data._this.goto(e.data._this.setting.currentPage + 1);
          });
          $(this.setting.pageBarCon).find('.firstBtn').bind('click', { _this: this }, function (e) {
              e.data._this.goto(1);
          });
          $(this.setting.pageBarCon).find('.endBtn').bind('click', { _this: this }, function (e) {
              e.data._this.goto(e.data._this.setting.pagecount);
          });
          //加载更多按钮
          this.setting.loadMore.bind('click', { _this: this }, function (e) {
              e.data._this.goto(e.data._this.setting.currentPage + 1);
          });
        },
        doSearch: function (filters, callback) {
            var that = this;
            that.$tbody.html("");
            if (callback) {
                callback();
            } else {
                that.setting.currentPage = 1;
                that.setting.filters = filters;
                //that.$tbody.html("");
                that.getData();
            }
        },
        pageInfo: {},
        getData: function () {
            var that = this;
            //渲染分页标签
            that.renderPagination();
            var searchData = {
                pageSize: that.setting.pageSize,
                page: that.setting.currentPage
            };
            if (that.setting.loadType == "onlyCurPage") {
                searchData = {};
            }
            if (that.setting.loadType != "loadMore") {
                that.$tbody.html("");
            }
            $.extend(searchData, that.setting.filters);
            if (that.setting.data.length <= 0) {
                $.ajax({
                    url: that.setting.url,
                    type: "GET",
                    data: searchData,
                    dataType: 'json',
                    success: function (data) {
                        if (!that.setting.setPageInfo) { } else {
                            var pageInfo = that.setting.setPageInfo(data);
                            that.pageInfo.totalInfo = pageInfo.totalInfo;
                            that.setting.pagecount = Math.ceil(pageInfo.totalInfo / that.setting.pageSize);
                        }
                        that.renderTr = that.setting.redrawTbody(data);
                        that.$tbody.append(that.renderTr);
                        that.pageBar();
                    }
                });
            } else {
                $.each(that.setting.data, function (i, n) {
                    that.$tbody.append(that.setting.redrawTbody(n));
                });
            }
        },
        goto: function (page) {
            //页面跳转，调用getData
            var that = this;
            that.setting.currentPage = page;
            that.getData();
        },
        getInfocount: function (index) {
            var that = this;
            //根据当前页数，来显示按钮的个数,//给页数添加一个点击事件，调用goto函数
            $(this.setting.pageBarCon).find('.afterElliBtn').before($('<div>').addClass("num").attr("data-index", index)
                .html(index)
                .on("click", { index: index }, function (e) {
                    that.goto(e.data.index);
                }));
            //默认的样式添加
            $('.info-bar-default').find('div').addClass('pageb');
        },
        pageBar: function () {
            var that = this;
            //判断显示出来的条数，是否显示完毕，如果显示完毕，则加载更多隐藏。
            if (!that.renderTr) {
                var nothingStr = '<div class="no-data" style="margin:10px auto; width:100px;">没有数据!</div>';
                if (this.setting.tableCon.find('.no-data').length == 0) {
                    this.setting.tableCon.append(nothingStr);
                }
            } else {
                if (this.setting.tableCon.find('.no-data').length > 0) {
                    this.setting.tableCon.find('.no-data').remove();
                }
            }
            if (that.setting.loadType == "loadMore") {
                if (that.pageInfo.totalInfo < that.setting.pageSize) {
                    that.setting.loadMore.css({ "display": "none" });
                } else if (that.pageInfo.totalInfo > that.setting.pageSize) {
                    if (that.setting.pagecount == that.setting.currentPage) {
                        that.setting.loadMore.css({ "display": "none" });
                    } else {
                        that.setting.loadMore.css({ "display": "block" });
                    }
                }
            } else if (that.setting.loadType == "PageBar") { //如果是分页类型，则需要显示分页信息
                if (!that.renderTr) {//如果没有数据
                    //var nothingStr='<div style="margin:10px auto; width:100px;">没有数据!</div>';
                    //this.setting.tableCon.append(nothingStr);
                    //infoDataCon: $(), //展示数据的信息容器
                    //pageBarCon: $(),
                    this.setting.infoDataCon.hide();
                    this.setting.pageBarCon.hide();
                    /*
                     preCls:"preBtn",
                     nextCls:"nextBtn",
                     firstCls:"firstBtn",
                     endCls:"endBtn",
                     beforeElliCls:"beforeElliBtn",
                     afterElliCls:"afterElliBtn",
                     */
                } else {
                    this.setting.pageBarCon.show();
                    if (that.setting.isShowInfo) {
                        this.setting.infoDataCon.show();
                        //显示1-9项，共9项数据，共1页
                        that.setting.infoDataCon.html("显示 " + ((that.setting.currentPage - 1) * that.setting.pageSize + 1) + "-" + (that.setting.currentPage * that.setting.pageSize < that.pageInfo.totalInfo ? that.setting.currentPage * (that.setting.pageSize) : that.pageInfo.totalInfo) + " 项，共 " + that.pageInfo.totalInfo + " 项数据，共 " + that.setting.pagecount + " 页");
                        //that.setting.infoDataCon.html("显示第 " + that.setting.currentPage + " 页信息，共 " + that.setting.pagecount + " 页，当前显示第 "+((that.setting.currentPage-1)*that.setting.pageSize+1)+" 条至"+"第 "+(that.setting.currentPage*that.setting.pageSize<that.pageInfo.totalInfo?that.setting.currentPage*(that.setting.pageSize):that.pageInfo.totalInfo)+" 条，共 "+that.pageInfo.totalInfo+" 条数据。");
                    }
                    that.setting.pageBarCon.find('div.num').remove();
                    $(this.setting.pageBarCon).find('.preBtn').show();
                    $(this.setting.pageBarCon).find('.nextBtn').show();
                    $(this.setting.pageBarCon).find('.firstBtn').show();
                    $(this.setting.pageBarCon).find('.endBtn').show();
                    if (that.setting.currentPage <= 1) {
                        $(this.setting.pageBarCon).find('.preBtn').hide();
                        $(this.setting.pageBarCon).find('.firstBtn').hide();
                    }
                    if (that.setting.currentPage >= that.setting.pagecount) {
                        //this.setting.preBtn.show();
                        $(this.setting.pageBarCon).find('.endBtn').hide();
                        $(this.setting.pageBarCon).find('.nextBtn').hide();
                        //this.setting.firstBtn.show();
                    }
                    //判断条件，来表示省略号的显示状态
                    if (that.setting.currentPage < that.setting.btnNum - 1) {
                        $(this.setting.pageBarCon).find('.beforeElliBtn').hide();
                        $(this.setting.pageBarCon).find('.afterElliBtn').show();
                        for (var i = 1; i < that.setting.currentPage + Math.ceil(that.setting.btnNum / 2); i++) {
                            if (i <= that.setting.pagecount) {
                                that.getInfocount(i); //修改。。
                            }
                        }
                        if (that.setting.pagecount <= that.setting.btnNum - 1) {
                            $(this.setting.pageBarCon).find('.afterElliBtn').hide();
                        }
                    } else if (that.setting.currentPage > that.setting.pagecount - Math.ceil(that.setting.btnNum / 2)) {
                        $(this.setting.pageBarCon).find('.beforeElliBtn').show();
                        $(this.setting.pageBarCon).find('.afterElliBtn').hide();
                        for (var i = that.setting.currentPage - Math.floor(that.setting.btnNum / 2); i <= that.setting.pagecount; i++) {
                            that.getInfocount(i);
                        }
                    } else {
                        $(this.setting.pageBarCon).find('.beforeElliBtn').show();
                        $(this.setting.pageBarCon).find('.afterElliBtn').show();
                        for (var i = that.setting.currentPage - Math.floor(that.setting.btnNum / 2); i <= that.setting.currentPage + Math.floor(that.setting.btnNum / 2); i++) {
                            that.getInfocount(i);
                        }
                    }
                    this.setting.pageBarCon.find(".num[data-index=" + this.setting.currentPage + "]").addClass(this.setting.pageBarClass);
                }
            }
        }
    };
    return Table;
});
