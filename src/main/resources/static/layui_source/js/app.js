layui.use(['form','layer','laydate','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;
    var jsonRes=null;
    var tableData=null;
    layui.use('laydate', function(){
        var laydate = layui.laydate;

        //执行一个laydate实例
        laydate.render({
            elem: '#startTime', //指定元素
            type:'date'
        });
        laydate.render({
            elem: '#endTime', //指定元素
            type:'date'
        });
    });
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

    //报修列表展示
    var tableIns = table.render({
        elem: '#appList',
        url : '/showAllAppEdition',
       // url:'../layui_source/json/newsList.json',
        request:{
            page:'curr' ,
            limit:'nums'
        },
        even: true ,//开启隔行背景
        cellMinWidth : 95,
        page:true,
        height : "full-125",
        limit : 15,
        limits : [10,15,20,25],
        loading:true,
        id : "appList",
        cols : [[
            {type: "checkbox", fixed:"left", width:30},
            {field: 'id', title: 'ID', width:80, align:"center"},  //templet:'<div>{{d.appUser?d.appUser.uTell:""}}</div>'
            {field: 'appEdition',   title: 'App版本号', width:140, align:"center",templet:function (d) {
                    return '<div style="color: #2D93CA">' + d.appEdition + '</div>'
                }},
            {field: 'appName', title: 'App名称',width:140, align:"center"},
            {field: 'appDescribe', title: '版本描述', width:400,align:"center" ,templet:function (d) {
                    return '<div style="color: #00d20d">' + d.appDescribe + '</div>'
            }},
            {field: 'appSize', title: 'App版本大小', width:140,align:"center",templet:function (d) {
                    return '<div style="color: #b563ed">' + d.appSize + '</div>'
                }},
            {field: 'appUrl', title: 'App下载地址', width:200,align:"center"},
            {field: 'appCtime', title: 'App上传时间', align:"center" ,templet:function (d) {
                    return '<div style="color: #009E94">' + d.appCtime + '</div>'
            }},

            {title: "操作", templet:'#appListBar',fixed:"right",align:"center"}
        ]],
        response: {
            statusName: 'code' //规定数据状态的字段名称，默认：code
            ,statusCode: 0 //规定成功的状态码，默认：0
            ,msgName: 'msg' //规定状态信息的字段名称，默认：msg
            ,countName: 'count' //规定数据总数的字段名称，默认：count
            ,dataName: 'data' //规定数据列表的字段名称，默认：data
        },
        parseData: function(res){ //res 即为原始返回的数据
            return {
                "code": res.code, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.count, //解析数据长度
                "data": res.data //解析数据列表
            };
        },
        done: function(res, curr, count) {
            // var uNick=res.data.appUser.uNick;
            // 渲染之前组装select的option选项值
          }
        });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".startTime").val()== ''&&$(".endTime").val()==''){
            layer.msg("请输入搜索的内容");
        }else{
            table.reload("appList",{
                url : '/showAllAppEdition',
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    startTime:$(".startTime").val(),//起始时间
                    endTime:$(".endTime").val(),//截止时间
                }
            })
        }
    });
    // 跳转至新增版本信息
    $(".add_app").click(function () {
        layer.open({
            type: 2
            , title: "新增版本"
            , skin: "myclass"
            ,btnAlign: 'c'
            , area: ['600px', '600px']
            //, content:['/test/as', 'no']
            , content:'/addApp'
            ,end: function (end) {
                window.location.reload();
            }
        });
     })

    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = table.checkStatus('appList'),
            data = checkStatus.data,
            id = [];
        if(data.length > 0) {
            for (var i in data) {
                id.push(data[i].id);
            }
            layer.confirm('确定删除选中的信息？', {icon: 3, title: '提示信息'}, function (index) {
                $.post("/removeCheckedAppEdition",{
                    id : id.toString() //将需要删除的newsId作为参数传入
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
            layer.msg("请选择需要删除的信息");
        }
    })

    //列表操作
    table.on('tool(appList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        //1、查看附件
        if(layEvent === 'edit'){
            watchUserUploadFile(data);
        } else if(layEvent === 'del'){
            //2、报修删除
            layer.confirm('确定删除该条版本信息？',{icon:3, title:'提示信息'},function(index){
                 $.get("/removeOneAppEdition",{
                     id : data.id  //将需要删除的newsId作为参数传入
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
        //保存更改的报修状态进度
        else if (layEvent === 'appSave'){

            var str=data.appUrl;
            console.log(data.appUrl);
            var split = str.split("\\");
            var path="";
            for (var i = 0; i <split.length; i++) {
                if(i==split.length-1){
                    path=path+split[i];
                }else {
                    path=path+split[i]+"//";
                }
            }

            console.log(path);
           window.location.href="/downLoadAfter?path="+path;
        }
    });

})