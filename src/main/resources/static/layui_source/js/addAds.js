layui.use(['form','layer','layedit','laydate','upload'],function(){
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;



    //格式化时间
    function filterTime(val){
        if(val < 10){
            return "0" + val;
        }else{
            return val;
        }
    }



    function fsubmit(fd) {
        var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        $.ajax({
            url: "/ads/addAds",
            type: "POST",
            data: fd,
            async : false,
            contentType: false,   //jax 中 contentType 设置为 false 是为了避免 JQuery 对其操作，从而失去分界符，而使服务器不能正常解析文件
            processData: false,   //当设置为true的时候,jquery ajax 提交的时候不会序列化 data，而是直接使用data
            error : function(request) {
                layer.msg("程序出错，返回超时", {
                    time: 500,
                    end: function () {
                        layer.close(index);
                    }
                });
            },
            success: function (data) {
                var json = eval('(' + data + ')');
                if(json.code==="success"){
                    layer.msg(json.msg, {
                        time: 500,
                        end: function () {

                            layer.closeAll("iframe");
                            layer.close(index);
                        }
                    });
                }else {
                    layer.msg(json.msg, {
                        time: 500,
                        end: function () {
                            layer.close(index);
                        }
                    });
                }
            }
        });
        return false;
    }


    form.on("submit(addAds)",function(data){
        var formSatellite = document.getElementById("adsForms");//获取所要提交form的id
        var fs1 = new FormData(formSatellite);  //用所要提交form做参数建立一个formdata对象
        fsubmit(fs1);//调用函数

        //弹出loading
       //  var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
       // // 实际使用时的提交信息
       //  $.post("/addOneAppCondition",{
       //      appEdition : $(".appEdition").val(),
       //      appDescribe : $(".appDescribe").val(),
       //      multipartFile: $(".multipartFile").val()
       //  },function(res){
       //
       //  })
       //  setTimeout(function(){
       //      top.layer.close(index);
       //      top.layer.msg("文章添加成功！");
       //      layer.closeAll("iframe");
       //      //刷新父页面
       //      parent.location.reload();
       //  },500);
        return false;
    })

    form.on("submit(change)",function(data){
        var formSatellite = document.getElementById("changeForms");//获取所要提交form的id
        var fs1 = new FormData(formSatellite);  //用所要提交form做参数建立一个formdata对象
        changeSubmit(fs1);//调用函数
        return false;
    })

    function changeSubmit(fd) {
        var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        $.ajax({
            url: "/ads/changeAds",
            type: "POST",
            data: fd,
            async : false,
            contentType: false,   //jax 中 contentType 设置为 false 是为了避免 JQuery 对其操作，从而失去分界符，而使服务器不能正常解析文件
            processData: false,   //当设置为true的时候,jquery ajax 提交的时候不会序列化 data，而是直接使用data
            error : function(request) {
                layer.msg("程序出错，返回超时", {
                    time: 500,
                    end: function () {
                        layer.close(index);
                    }
                });
            },
            success: function (data) {
                var json = eval('(' + data + ')');
                if(json.code==="success"){
                    layer.msg(json.msg, {
                        time: 500,
                        end: function () {

                            layer.closeAll("iframe");
                            layer.close(index);
                        }
                    });
                }else {
                    layer.msg(json.msg, {
                        time: 500,
                        end: function () {
                            layer.close(index);
                        }
                    });
                }
            }
        });
        return false;
    }


    $(".reset").click(function () {
        layer.closeAll("iframe");
        //      //刷新父页面
           //   parent.location.reload();
    })

    //预览
    form.on("submit(look)",function(){
        layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问");
        return false;
    })



})