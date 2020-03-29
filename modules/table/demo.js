require.config({
    baseUrl: 'http://localhost:63342/github/component-library/',
    paths: {
        'cssFile':'modules/libs/rq/css.min',
        'jquery':'modules/libs/jq/jquery-2.1.1.min'
    }
});
require(["js/table_online.js",'cssFile!modules/table/demo.css'],function(Table){
    var data = [{
        "name":"LUCY",
        "id":"11",
        "age":18
    },{
        "name":"TOM",
        "id":"12",
        "age":20
    },{
        "name":"DANNY",
        "id":"13",
        "age":19
    }];
    var setData = new Table({
        //url:"/getTableData",
        data:data,
        tableCon:$('.cont'),
        //loadType:"loadMore",//加载更多，默认是分页PageBar,不存在分页noPageBar
        //loadType:"noPageBar",
        headTitleArry:["ID","NAME","AGE"],
        //tableClass:'tab-class t1',
        //pageBarClass:"page-active",
        //infoDataCon:$('.aa'),
		//aaaa
        //pageSize:"10",
        loadType: "noPageBar",
        redrawTbody:function(data){
            var tr = '';

                tr +='<tr>' +
                    '<td>'+data.id+'</td>' +
                    '<td>'+data.name+'</td>' +
                    '<td>'+data.age+'</td>' +
                    '</tr>';

            return tr;
        },
        //setPageInfo:function(data){
        //    //返回一个对象，包含总条数
        //    var pageInfo = {};
        //    pageInfo.totalInfo = data.pageInfo.pageinfo;
        //    return pageInfo;
        //}
    });
    setData.getData();

    var demo2 = new Table({
        url:"json/table.json",
        tableCon:$('.content2 .demo2'),
        headTitleArry:["ID","NAME","AGE"],
        pageSize:"10",
        //infoDataCon: $(".content2 .data-info span"), //展示数据的信息容器
       // pageBarCon: $(".content2 .info-bar"), //展示翻页工具的容器
        //loadType:"noPageBar",
        redrawTbody:function(data){
            var tr = '';
            $.each(data.dataInfos,function(i,n){
                tr +='<tr>' +
                '<td>'+n.id+'</td>' +
                '<td>'+n.name+'</td>' +
                '<td>'+n.age+'</td>' +
                '</tr>';
            });
            return tr;
        },
        setPageInfo:function(data){
            //返回一个对象，包含总条数
            var pageInfo = {};
            pageInfo.totalInfo = data.pageInfo.pageinfo;
            return pageInfo;
        }
    });
    // demo2.doSearch();
    /*
    * demo2.doSearch(function(){
     //demo2.getData();
     console.log('aaaaaaaaa');
     });
    * */
    var demo3 = new Table({
        url:"json/table.json",
        tableCon:$('.content1 .demo3'),
        headTitleArry:["ID","NAME","AGE"],
        pageSize:"10",
        infoDataCon: $(".content1 .data-info span"), //展示数据的信息容器
        pageBarCon: $(".content1 .info-bar"), //展示翻页工具的容器
        //loadType:"noPageBar",
        redrawTbody:function(data){
            var tr = '';
            $.each(data.dataInfos,function(i,n){
                tr +='<tr>' +
                '<td>'+n.id+'</td>' +
                '<td>'+n.name+'</td>' +
                '<td>'+n.age+'</td>' +
                '</tr>';
            });
            return tr;
        },
        setPageInfo:function(data){
            //返回一个对象，包含总条数
            var pageInfo = {};
            pageInfo.totalInfo = data.pageInfo.pageinfo;
            return pageInfo;
        }
    });
    // demo3.doSearch();
})
