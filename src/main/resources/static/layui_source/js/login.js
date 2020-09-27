layui.use(['form','layer','jquery'],function(){
    var form = layui.form;
    var layer = parent.layer === undefined ? layui.layer : top.layer;
    var  $ = layui.jquery;
    $(".loginBody .seraph").click(function(){
        layer.msg("这只是做个样式，至于功能，你见过哪个后台能这样登录的？还是老老实实的找管理员去注册吧",{
            time:500
        });
    });
    //登录按钮
        form.on('submit(login0)',function(data) {
        $(this).text("登录中...").attr("disabled", "disabled").addClass("layui-disabled");
            //setTimeout(function () {
                console.log('进入登录程序');
                var index = layer.msg('提交中，请稍候', {icon: 16, time: 8000, shade: 0.8});
            $.ajax({
                url:'/user/login',
                method:'post',
                contentType: 'application/json; charset=UTF-8',
                dataType:'json',
                data:JSON.stringify(data.field),
                timeout : 300, //超时时间：50秒
                success:function(res){
                    top.layer.close(index);
                    if(res.code==="true"){
                        layer.msg(res.msg,{
                            time:500,
                            end:function () {
                                window.location.href="/index";
                            }
                        })
                    }else{
                        layer.msg(res.msg,{
                            time:100,
                            end:function () {
                                window.location.reload();
                            }
                        })
                    }
                },
                error:function (data) {

                }
            }) ;    
            return false;//只此一句
        });

    function getToken(){

        if(!!localStorage.getItem('accessToken')){
            return localStorage.getItem('accessToken');
        }

        return null;//如果获取不到token就发送null给服务器端
    }

    function handleTokenFailed(code){
        if(code==401){
            localStorage.clear();
            new Toast().showMsg('登录信息已过期，请重新登录',500)
            setTimeout(function () {
                location.href = 'index.html';
            },1000)

        }
    }

        //表单输入效果
        $(".loginBody .input-item").click(function (e) {
            e.stopPropagation();
            $(this).addClass("layui-input-focus").find(".layui-input").focus();
        })
        $(".loginBody .layui-form-item .layui-input").focus(function () {
            $(this).parent().addClass("layui-input-focus");
        })
        $(".loginBody .layui-form-item .layui-input").blur(function () {
            $(this).parent().removeClass("layui-input-focus");
            if ($(this).val() != '') {
                $(this).parent().addClass("layui-input-active");
            } else {
                $(this).parent().removeClass("layui-input-active");
            }
        })

})
