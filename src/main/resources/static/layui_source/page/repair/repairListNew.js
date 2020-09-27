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
    
    //获取今天的时间
    function getToday() {
        var day2 = new Date();
        day2.setTime(day2.getTime());
        var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
        return s2;
    }

    //获取明天时间
    function getTomorrow() {
        var day3 = new Date();
        day3.setTime(day3.getTime()+24*60*60*1000);
        var s3 = day3.getFullYear()+"-" + (day3.getMonth()+1) + "-" + day3.getDate();
        return s3;
    }

    //报修列表展示
    var tableIns = table.render({
        elem: '#repairList',
        url : '/showAllRepairInformation?startTime='+getToday()+"&endTime="+getTomorrow(),
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
        id : "repairList",
        cols : [[
            {type: "checkbox", fixed:"left", width:30},
            {field: 'uId', title: '用户ID', width:80, align:"center"},
            {field: 'uTell', title: '注册电话',width:120,align:"center" , templet:'<div>{{d.appUser?d.appUser.uTell:""}}</div>'},
            {field: 'uNick', title: '用户昵称',width:120, align:"center" ,templet:'<div>{{d.appUser?d.appUser.uNick:""}}</div>'},
            {field: 'bName', title: '公司名称', width:100,align:"center" ,templet:function (d) {
                    return '<div style="color: #00d20d">' + d.bName + '</div>'
            }},
            {field: 'bType', title: '报修类别', width:100,align:"center",templet:function (d) {
                    return '<div style="color: #b563ed">' + d.bType + '</div>'
                }},
            {field: 'bDsc', title: '问题描述', width:240,align:"center"},
            {field: 'bUname', title: '报修人姓名', width:150, align:"center" ,templet:function (d) {
                    return '<div style="color: #009E94">' + d.bUname + '</div>'
            }},
            {field: 'bTell',   title: '报修人电话', width:140, align:"center",templet:function (d) {
                    return '<div style="color: #2D93CA">' + d.bTell + '</div>'
            }},
            {field: 'bAddress', title: '服务地址',  width:220, align:"center",templet:function (d) {
                    return '<div style="color: #A757A8">' + d.bAddress + '</div>'
            }},
            {field: 'bDate', title: '报修提交时间', align:"center" ,width:160, templet: function (d) {
                    var date=new Date();
                    date.setTime(d.bDate);
                    return date.Format("yyyy-MM-dd hh:mm:ss");
            }},
            {field: 'bfAttribute', id:'bfAttribute', title: '服务状态',  align:"center",width:140, templet:'#selectServe'},
            {field: 'bfUrl',   title: '附件信息',  align:"center", width:120, templet:function (d) {
                     var json = eval("(" + d.bfUrl+ ")");
                    if (json.code=="success" && json.hasOwnProperty("file1")){
                        return "<a class=\"layui-btn layui-btn-sm layui-btn-danger\" lay-event=\"edit\">点击查看</a>"
                    }else if(json.code=="success" && !json.hasOwnProperty("file1")) {
                        return "无上传附件"
                    }else {
                        return "无附件失败"
                    }
                }},
            {title: "操作", templet:'#repairListBar',fixed:"right",align:"center"}
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
                "data": res.data ,//解析数据列表
                "uTell":res.data.appUser.uTell,
                "uNick":res.data.appUser.uNick
            };
        },
        done: function(res, curr, count) {
            // var uNick=res.data.appUser.uNick;
            tableData=res.data;
            // 渲染之前组装select的option选项值
                layui.each($("select[name='bfAttribute']"), function (index, item) {
                            var elem = $(item);
                            console.log(elem.data('value'));
                            elem.val(elem.data('value'));
                        });
                        form.render('select');
                }
        });

    form.on('select(bfAttribute_svc)', function (obj) {
        var elem = $(obj.elem);
        var trElem = elem.parents('tr');
        // 更新到表格的缓存数据中，才能在获得选中行等等其他的方法中得到更新之后的值
        tableData[trElem.data('index')][elem.attr('name')] = obj.value;
        form.render('select');
    })

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".uNick").val()== ''&&$(".uTell").val() == ''&&$(".bName").val()== ''&&
           $(".bTell").val()== ''&&$(".bType").val()== ''&&$(".startTime").val()== ''&&
            $(".endTime").val()== ''&& $(".bfAttributes").val()== ''){
            layer.msg("请输入搜索的内容");
        }else{
            table.reload("repairList",{
                url : '/showAllRepairInformation',
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    uNick: $(".uNick").val(), //用户昵称
                    uTell: $(".uTell").val(), //用户电话
                    bName: $(".bName").val(),//用户公司名称
                    bTell:$(".bTell").val(),//报修人电话
                    bType:$(".bType").val(),//报修类型
                    startTime:$(".startTime").val(),//起始时间
                    endTime:$(".endTime").val(),//截止时间
                    bfAttributes:$(".bfAttributes").val()//服务状态
                }
            })
        }
    });

    $(document).on('click', '.downloadAll', function(data) {
        console.log(jsonRes);
        var str=jsonRes["file"+1];
        var split = str.split("//");
        var path="";
        for (var i = 0; i <split.length-1 ; i++) {
            if(i==split.length-2){
                path=path+split[i];
            }else {
                path=path+split[i]+"//";
            }
        }
        $.post("/fileToZip",{
            path:path
        },function (res) {
            console.log(res);
             window.location.href="/fileDownload?path="+res;
        })
    });

    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = table.checkStatus('repairListBar'),
            data = checkStatus.data,
            bId = [];
        if(data.length > 0) {
            for (var i in data) {
                bId.push(data[i].bId);
            }
            layer.confirm('确定删除选中的报修信息？', {icon: 3, title: '提示信息'}, function (index) {
                $.post("/deleteAllCheckedRepairInformation",{
                    bId : bId.toString() //将需要删除的newsId作为参数传入
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
    table.on('tool(repairList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;
        //1、查看附件
        if(layEvent === 'edit'){
            watchUserUploadFile(data);
        } else if(layEvent === 'del'){
            //2、报修删除
            layer.confirm('确定删除该条报修信息？',{icon:3, title:'提示信息'},function(index){
                 $.get("/deleteOneRepairInformation",{
                     bId : data.bId  //将需要删除的newsId作为参数传入
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
        else if (layEvent === 'change'){
            layer.confirm('确定保存服务进度吗？',{icon:3, title:'提示信息'},function(index) {

                $.post("/changeServeCondition", {
                    bId: data.bId,
                    uId: data.uId,
                    bfAttribute: data.bfAttribute
                }, function (res) {
                    var json = eval('(' + res + ')');
                    console.log(json.code);
                    if (json.code == "0") {
                        layer.msg("保存成功！", {
                            time: 500,
                            end: function () {
                                tableIns.reload();
                                layer.close(index);
                            }
                        });
                    } else {
                        layer.msg("保存失败！", {
                            time: 500,
                            end: function () {
                                tableIns.reload();
                                layer.close(index);
                            }
                        });
                    }
                })
            })

        }
    });


    /*查看用户上传的附件信息*/
    function  watchUserUploadFile(data) {
       // var jsonRes = eval('(' + data.bfUrl + ')');
         jsonRes=JSON.parse(data.bfUrl);
        var i=1;
        var html=" <form class=\"layui-form\">" +
            "<div class=\"main-item-content\" style='margin-left: 15px;'>\n" +
                 "此次报修全部文件下载" +":"+
                 "<a style='margin-left: 50px;' class=\"layui-btn layui-btn-sm layui-btn-danger downloadAll \">下载查看</a>"+
                  "<hr>";
        for (var i = 1; i <=10 ; i++) {
            if (jsonRes.hasOwnProperty("file"+i)){
                 var keyName="file"+i;
                 html=html+" <div class=\"main-item-content\"  style='' >\n" +
                    "        附件"+i  +":"+
                    // "<button type=\"button\" style='margin-left: 50px;' class=\"layui-btn layui-btn-sm download_one\">下载查看附件</button>" +
                    "\n" +
                    "        <div  id= "+"\""+ keyName +"\""+ "class=\"items-content-fu\">\n" +
                    "\n" + jsonRes["file"+i]+
                    "        </div>\n" +

                    "\n" +
                    "    </div>"
            }
        }
        html=html+"</form>";
        layer.open({
            type : 1,
            title : '报修附件文档',
            area : [ '800px', '600px' ],
            scrollbar: false,
            resize:true,
            fix : false,
            content:html
        });
    }
})