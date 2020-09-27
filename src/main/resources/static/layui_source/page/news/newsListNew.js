layui.use(['form','layer','laydate','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    var date = new Date();
    var laypage=layui.laypage;
    //新闻列表
    var tableIns = table.render({
        elem: '#newsList',
        url : '/getNewUserToday',
       // url:'../layui_source/json/newsList.json',
        request:{
            page:'curr' ,
            limit:'nums'
        },
        cellMinWidth : 95,
        page:true,
        height : "full-125",
        limit : 15,
        limits : [10,15,20,25],
        loading:true,
        id : "newsListTable",
        cols : [[
            {type: "checkbox", fixed:"left", width:30},
            {field: 'loginId', title: '登录ID', width:100, align:"center"},
            {field: 'uId', title: '用户ID', width:60, align:"center"},
            {field: 'uNick', title: '用户昵称',width:120, align:"center"},
            {field: 'uSex', title: '用户性别', width:100,align:"center",templet:function (d) {
                    if(d.uSex=="Y"){return "男"}else if(d.uSex=="X"){return "女"}else {return "出错了！"}
                }},
            {field: 'uBirth', title: '出生日期', align:"center" ,width:120, templet: function (d) {
                     var date=new Date();
                    date.setTime(d.uBirth);
                    return date.Format("yyyy-MM-dd");
            }},
            {field: 'uTell', title: '用户电话', width:150, align:"center"},
            {field: 'uMz',   title: '邮箱地址',  align:"center"},
            {field: 'uAddress', title: '客户住址', align:"center"},
            {field: 'ucName', title: '用户公司名称',   align:"center"},
            {field: 'ucAddress', title: '用户公司地址',  align:"center"},
            {title: "操作", width:170, templet:'#newsListBar',fixed:"right",align:"center"}
        ]],
        response: {
            statusName: 'code' //规定数据状态的字段名称，默认：code
            ,statusCode: 0 //规定成功的状态码，默认：0
            ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
            ,countName: 'count' //规定数据总数的字段名称，默认：count
            ,dataName: 'data' //规定数据列表的字段名称，默认：data
        },
        parseData: function(res){ //res 即为原始返回的数据
            alert(res);
            return {
                "code": res.code, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.count, //解析数据长度
                "data": res.data //解析数据列表
            };
        }
        // done: function(res, curr, count){
        //     //如果是异步请求数据方式，res即为你接口返回的信息。
        //     //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
        //     console.log(res);
        //
        //     pages=res.pageInfo.page;
        //     counts=res.pageInfo.total;
        //     rows=res.pageInfo.pageSize;
        //     laypage.render({
        //         elem: 'test1'
        //         ,count: counts    //数据总数，从服务端得到
        //         ,curr:pages
        //         ,limit:rows
        //         ,jump: function(obj, first){
        //             //obj包含了当前分页的所有参数，比如：
        //             console.log("当前页："+obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        //             console.log("每页显示的条数:"+obj.limit); //得到每页显示的条数
        //             console.log("每页显示的条数:"+obj.limit);
        //             //首次不执行
        //             if(!first){
        //                 //do something
        //             }
        //         }
        //     })
        //     //得到当前页码
        //     console.log(curr);
        //
        //     //得到数据总量
        //     console.log(count);
        // }
    });

    form.on('switch(newsTop)', function(data){
        var index = layer.msg('修改中，请稍候',{icon: 16,time:false,shade:0.8});
        setTimeout(function(){
            layer.close(index);
            if(data.elem.checked){
                layer.msg("置顶成功！");
            }else{
                layer.msg("取消置顶成功！");
            }
        },500);
    })

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".uNick").val()== ''&&$(".uTell").val() == ''&&$(".ucName").val()== ''){
            layer.msg("请输入搜索的内容");
        }else{
            table.reload("newsListTable",{
                url : '/searchForAllUserInformation',
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    uNick: $(".uNick").val(),
                    uTell: $(".uTell").val(),
                    ucName: $(".ucName").val()
                }
            })
        }
    });

    //添加文章
    function addNews(edit){
        var index = layui.layer.open({
            title : "添加文章",
            type : 2,
            content : "newsAdd.html",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
                if(edit){
                    body.find(".newsName").val(edit.newsName);
                    body.find(".abstract").val(edit.abstract);
                    body.find(".thumbImg").attr("src",edit.newsImg);
                    body.find("#news_content").val(edit.content);
                    body.find(".newsStatus select").val(edit.newsStatus);
                    body.find(".openness input[name='openness'][title='"+edit.newsLook+"']").prop("checked","checked");
                    body.find(".newsTop input[name='newsTop']").prop("checked",edit.newsTop);
                    form.render();
                }
                setTimeout(function(){
                    layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(index);
        })
    }
    $(".addNews_btn").click(function(){
        addNews();
    })

    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = table.checkStatus('newsListTable'),
            data = checkStatus.data,
            uId = [];
        if(data.length > 0) {
            for (var i in data) {
                uId.push(data[i].uId);
            }
            layer.confirm('确定删除选中的用户信息？', {icon: 3, title: '提示信息'}, function (index) {
                $.post("/deleteAllCheckedUserInformation",{
                    uId : uId.toString() //将需要删除的newsId作为参数传入
                },function(data){
                    var json = eval('(' + data + ')');
                    if(json.code==0){
                        layer.msg("删除成功！", {
                            time: 500,
                            end: function () {
                                tableIns.reload();
                                layer.close(index);
                            }
                        });
                    }else {
                        layer.msg("删除失败！", {
                            time: 500,
                            end: function () {
                                tableIns.reload();
                                layer.close(index);
                            }
                        });
                    }
                })
            })
        }else{
            layer.msg("请选择需要删除的用户信息");
        }
    })

    //列表操作
    table.on('tool(newsList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;
        // if(layEvent=='del'){
        //     layer.confirm('确定删除此文章？',{icon:3, title:'提示信息'},function(index){
        //         // $.get("删除文章接口",{
        //         //     newsId : data.newsId  //将需要删除的newsId作为参数传入
        //         // },function(data){
        //         tableIns.reload();
        //         layer.close(index);
        //         // })
        //     });
        // }else {
        //     layer.alert("(☆-ｖ-)");
        // }
        if(layEvent === 'edit'){ //编辑
            addNews(data);
        } else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除该条用户信息？',{icon:3, title:'提示信息'},function(index){
                 $.get("/deleteUserInformation",{
                     uId : data.uId  //将需要删除的newsId作为参数传入
                 },function(data){
                     var json = eval('(' + data + ')');
                     if(json.code==0){
                         layer.msg("删除成功！", {
                             time: 500,
                             end: function () {
                                 tableIns.reload();
                                 layer.close(index);
                             }
                         });
                     }else {
                         layer.msg("删除失败！", {
                             time: 500,
                             end: function () {
                                 tableIns.reload();
                                 layer.close(index);
                             }
                         });
                     }

                 });
            });
        } else if(layEvent === 'look'){ //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问")
        }
    });

})