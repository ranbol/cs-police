layui.use(['form','layer','laydate','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        // laydate = layui.laydate,
        // laytpl = layui.laytpl,
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
        elem: '#repairList',
        url : '/ads/getPageAds',
       // url:'../layui_source/json/newsList.json',
        request:{
            page:'curr' ,
            limit:'nums'
        },
      /*  even: true ,//开启隔行背景*/
        cellMinWidth : 95,
        page:true,
        height : "full-185",
        limit : 15,
        limits : [10,15,20,25],
        loading:true,
        id : "repairList",
        cols : [[
            {type: "checkbox", fixed:"left", width:30},
            {field: 'id', title: '序号', width:80, align:"center"},
            {field: 'departmentName', edit: 'text', title: '部门名称',align:"center" ,width:120 /* templet:'<div>{{d.appUser?d.appUser.uTell:""}}</div>'*/},
            {field: 'cpuAds',  edit: 'text',title: '计算机所在地', align:"center" ,width:120/*, templet:'<div>{{d.appUser?d.appUser.uNick:""}}</div>'*/},
            {field: 'cupUser', edit: 'text', title: '使用人姓名', align:"center" ,width:120, templet:function (d) {
                    return '<div style="color: #00d20d">' + d.cupUser + '</div>'
            }},
            {field: 'zcCode',  edit: 'text',title: '资产编号', align:"center",width:120, templet:function (d) {
                    return '<div style="color: #b563ed">' + d.zcCode + '</div>'
                }},
            {field: 'cpuCode', edit: 'text', title: '计算机编号', width:120, align:"center"},
            {field: 'cpuMark',  edit: 'text',title: '计算机品牌', width:120,  align:"center" ,templet:function (d) {
                    return '<div style="color: #009E94">' + d.cpuMark + '</div>'
            }},
            {field: 'ipAds',  edit: 'text',  title: 'IP地址',  align:"center", width:160, templet:function (d) {
                    return '<div style="color: #2D93CA">' + d.ipAds + '</div>'
            }},
            {field: 'macAds', edit: 'text', title: 'MAC地址',   align:"center", width:160, templet:function (d) {
                    return '<div style="color: #A757A8">' + d.macAds + '</div>'
            }},
            {field: 'sysNv', edit: 'text',title: '操作系统软件软件名称及版本',   align:"center", width:220, templet:function (d) {
                    return '<div style="color: #A757A8">' + d.sysNv + '</div>'
                }},
            {field: 'softNv', edit: 'text', title: '预装软件名称及版本',   align:"center", width:160, templet:function (d) {
                    return '<div style="color: #A757A8">' + d.softNv + '</div>'
                }},
            {field: 'orLicense', edit: 'text', title: '操作系统软件是否授权（或OEM）',   align:"center", width:220, templet:function (d) {
                    return '<div style="color: #A757A8">' + d.orLicense + '</div>'
                }},
            {field: 'workSoftNv', edit: 'text', title: '办公软件名称及版本',  align:"center", width:160, templet:function (d) {
                    return '<div style="color: #A757A8">' + d.workSoftNv + '</div>'
                }},
            {field: 'workSoftLicense', edit: 'text', id:'workSoftLicense', title: '办公软件是否授权',  align:"center", width:160, templet:'#workSoftLicense'},

            {field: 'virusNv',  edit: 'text',title: '杀毒软件名称及版本',  align:"center",width:160, templet:function (d) {
                    return '<div style="color: #A757A8">' + d.virusNv + '</div>'
                }},
            {field: 'intType', edit: 'text', title: '使用的网络类型',   align:"center",width:160, templet:function (d) {
                    return '<div style="color: #A757A8">' + d.intType + '</div>'
                }},

            {title: "操作",  templet:'#repairListBar',fixed:"right",align:"center",width:140}
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
               // "uTell":res.data.appUser.uTell,
                //"uNick":res.data.appUser.uNick
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
    //页面更改状态值后保存更新
    form.on('select(bfAttribute_svc)', function (obj) {
        var elem = $(obj.elem);
        var trElem = elem.parents('tr');
        // 更新到表格的缓存数据中，才能在获得选中行等等其他的方法中得到更新之后的值
        tableData[trElem.data('index')][elem.attr('name')] = obj.value;
        form.render('select');
    })

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".departmentName").val()== ''&&$(".cpuAds").val() == ''&&$(".cupUser").val()== ''&&
           $(".zcCode").val()== ''&&$(".cpuCode").val()== ''&&$(".cpuMark").val()== ''&&
            $(".ipAds").val()== ''&& $(".macAds").val()== ''){
            layer.msg("请输入搜索的内容");
        }else{
            table.reload("repairList",{
                url : '/ads/getPageAds',
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    departmentName: $(".departmentName").val(),
                    cpuAds: $(".cpuAds").val(),
                    cupUser: $(".cupUser").val(),
                    zcCode:$(".zcCode").val(),
                    cpuCode:$(".cpuCode").val(),
                    cpuMark:$(".cpuMark").val(),
                    ipAds:$(".ipAds").val(),
                    macAds:$(".macAds").val()
                }
            })
        }
    });
    // 跳转至新增版本信息
    $(".add_ads").click(function () {
        layer.open({
            type: 2
            , title: "信息新增"
            , skin: "myclass"
            ,btnAlign: 'c'
            , area: ['600px', '600px']
            //, content:['/test/as', 'no']
            , content:'/addAds'
            ,end: function (end) {
                window.location.reload();
            }
        });
    })
    //监听单元格编辑
    table.on('edit(repairList)', function(obj){
        var value = obj.value //得到修改后的值
            ,data = obj.data //得到所在行所有键值
            ,field = obj.field; //得到字段
       /* layer.msg('[ID: '+ data.id +'] ' + field + ' 字段更改为：'+ value);*/
    });

    function openAdsChange(data){
        $.post("/ads/changeAds",{
            ads : data //将需要删除的newsId作为参数传入
        },function(data){
            var json = eval('(' + data + ')');
            if(json.code==="success"){
                layer.msg("保存修改成功", {
                    time: 500,
                    end: function () {
                        tableIns.reload();
                        layer.close(index);
                    }
                });
            }else {
                layer.msg("保存修改失败！", {
                    time: 500,
                    end: function () {
                        tableIns.reload();
                        layer.close(index);
                    }
                });
            }
        })

       /* layer.open({
            type: 2
            , title: "信息修改"
            , skin: "myclass"
            ,btnAlign: 'c'
            , area: ['600px', '600px']
            //, content:['/test/as', 'no']
            , content:'/changeAds'
            , success: function(layero, index){
                console.log(layero, index);
            }
            ,end: function (end) {
               // window.location.reload();
            }
        });*/
    }


    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = table.checkStatus('repairList'),
            data = checkStatus.data,
            ids = [];
        if(data.length > 0) {
            for (var i in data) {
                ids.push(data[i].id);
            }
            layer.confirm('确定删除选中的信息？', {icon: 3, title: '提示信息'}, function (index) {
                $.post("/ads/deleteAdsMore",{
                    ids : ids.toString() //将需要删除的newsId作为参数传入
                },function(data){
                    var json = eval('(' + data + ')');
                    if(json.code==="success"){
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
    table.on('tool(repairList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;
        if(layEvent === 'edit'){
            openAdsChange(data);
            //1、查看附件
            watchUserUploadFile(data);
        } else if(layEvent === 'del'){
            //2、报修删除
            layer.confirm('确定删除该条信息？',{icon:3, title:'提示信息'},function(index){
                 $.get("/ads/deleteAds",{
                     ids : data.id  //将需要删除的newsId作为参数传入
                 },function(data){
                     var json = eval('(' + data + ')');
                     if(json.code==="success"){
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
        }else if (layEvent === 'change'){
            //保存更改的报修状态进度
            layer.confirm('确定保存修改吗？',{icon:3, title:'提示信息'},function(index) {
                $.ajax({
                    url:'/ads/changeAds',
                    method:'post',
                    contentType: 'application/json; charset=UTF-8',
                    dataType:'json',
                    data:JSON.stringify(data),
                    timeout : 300, //超时时间：50秒
                    success:function(res){
                        top.layer.close(index);
                        if(res.code==="success"){
                            layer.msg("保存修改成功", {
                                time: 500,
                                end: function () {
                                    tableIns.reload();
                                    layer.close(index);
                                }
                            });
                        }else{
                            layer.msg("保存修改失败", {
                                time: 500,
                                end: function () {
                                    tableIns.reload();
                                    layer.close(index);
                                }
                            });
                        }
                    },
                    error:function (data) {

                    }
                }) ;
            })

        }
    });
    /*查看用户上传的附件信息*/
    function  watchUserUploadFile(data) {
        // var jsonRes = eval('(' + data.bfUrl + ')');
        jsonRes=JSON.parse(data.bfUrl);
        var i=1;
        var html=
            " <form class=\"layui-form\">" +
            "<div class=\"main-item-content\" style='margin-left: 15px; font-size: 1.2em; color: #e60000;'>\n" +
            "客户上传文档附件目录" +":"+
            // "<a style='margin-left: 50px;' name='downloadAll' class=\"layui-btn layui-btn-sm layui-btn-danger downloadAll \">下载查看</a>"+
            "<hr>";
        for (var i = 1; i <=10 ; i++) {
            if (jsonRes.hasOwnProperty("file"+i)){
                var keyName="file"+i;
                html=html+" <div class=\"main-item-content\"  style='color: #A757A8' >\n" +
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
            title : '附件文档',
            area : [ '700px', '500px' ],
            scrollbar: false,
            btn: ['下载查看', '关闭'],
            shade:0.3,
            shadeClose:false,
            // closeBtn:2,
            btnAlign: 'c',
            yes: function(index, layero){
            //按钮【按钮一】的回调
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
            },
            btn2: function(index, layero){
            //按钮【按钮二】的回调
             layer.close(index);
            //return false 开启该代码可禁止点击该按钮关闭
            },
            resize:true,
            fix : false,
            success: function(layero, index){
                // layer.close(index);
            },
            content:html
        });
    }

    // $(document).on('click', '.download_all', function() {
    //      alert("wode maya ");
    //     layer.msg('响应点击事件');
    // });



})