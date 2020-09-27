//获取系统时间
var newDate = '';
getLangDate();
//值小于10时，在前面补0
function dateFilter(date){
    if(date < 10){return "0"+date;}
    return date;
}

layui.use(['form','element','layer','jquery'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        element = layui.element,
        $ = layui.jquery;
    //上次登录时间【此处应该从接口获取，实际使用中请自行更换】
    $(".loginTime").html(newDate.split("日")[0]+"日</br>"+newDate.split("日")[1]);
    //icon动画
    $(".panel a").hover(function(){
        $(this).find(".layui-anim").addClass("layui-anim-scaleSpring");
    },function(){
        $(this).find(".layui-anim").removeClass("layui-anim-scaleSpring");
    })
    $(".panel a").click(function(){
        parent.addTab($(this));
    })
    // //系统基本参数
    // if(window.sessionStorage.getItem("systemParameter")){
    //     var systemParameter = JSON.parse(window.sessionStorage.getItem("systemParameter"));
    //     fillParameter(systemParameter);
    // }else{
    //     $.ajax({
    //         url : "../layui_source/json/systemParameter.json",
    //         type : "get",
    //         dataType : "json",
    //         success : function(data){
    //             fillParameter(data);
    //         }
    //     })
    // }
    //填充数据方法
    function fillParameter(data){
        //判断字段数据是否存在
        function nullData(data){
            if(data == '' || data == "undefined"){
                return "未定义";
            }else{
                return data;
            }
        }
    }
    //用户数量
    $.ajax({
        url:'/getNewUserNumber',
        method:'get',
        data:null,
        dataType:'JSON',
        timeout : 30000, //超时时间：50秒
        success:function(res){
            $(".userAll span").text(res.data);
        },
        error:function (res) {
            $(".userAll span").text(0);
        }
    }) ;
    //待审核数量
    $.ajax({
        url:'/getNewRepairNumber?bfAttributes=a',
        method:'get',
        data:null,
        dataType:'JSON',
        timeout : 30000, //超时时间：50秒
        success:function(res){
            $(".daiRepair span").text(res.data);
        },
        error:function (res) {
            $(".daiRepair span").text(0);
        }
    }) ;
    //处理中数量
    $.ajax({
        url:'/getNewRepairNumber?bfAttributes=c',
        method:'get',
        data:null,
        dataType:'JSON',
        timeout : 30000, //超时时间：50秒
        success:function(res){
            $(".chuRepair span").text(res.data);
        },
        error:function (res) {
            $(".chuRepair span").text(0);
        }
    }) ;
    //今日新增报修数量
    $.ajax({
        url:'/getNewRepairNumber',
        method:'get',
        //headers: {'Authorization': localStorage.getItem('accessToken')},
        data:null,
        dataType:'JSON',
        timeout : 30000, //超时时间：50秒
        success:function(res){
            $(".newRepair span").text(res.data);
        },
        error:function (res) {
            $(".newRepair span").text(0);
        }
    }) ;

    //外部图标
    $.get(iconUrl,function(data){
        $(".outIcons span").text(data.split(".icon-").length-1);
    })

})

function getLangDate(){
    var dateObj = new Date();                    //表示当前系统时间的Date对象
    var year = dateObj.getFullYear();            //当前系统时间的完整年份值
    var month = dateObj.getMonth()+1;           //当前系统时间的月份值
    var date = dateObj.getDate();               //当前系统时间的月份中的日
    var day = dateObj.getDay();                 //当前系统时间中的星期值
    var weeks = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
    var week = weeks[day];                       //根据星期值，从数组中获取对应的星期字符串
    var hour = dateObj.getHours();              //当前系统时间的小时值
    var minute = dateObj.getMinutes();          //当前系统时间的分钟值
    var second = dateObj.getSeconds();          //当前系统时间的秒钟值
    var timeValue = "" +((hour >= 12) ? (hour >= 18) ? "晚上" : "下午" : "上午" ); //当前时间属于上午、晚上还是下午
    newDate = dateFilter(year)+"年"+dateFilter(month)+"月"+dateFilter(date)+"日 "+" "+dateFilter(hour)+":"+dateFilter(minute)+":"+dateFilter(second);
    document.getElementById("nowTime").innerHTML = timeValue+"好！ 欢迎使用长寿公安IP地址管理后台。当前时间为： "+newDate+"　"+week;
    setTimeout("getLangDate()",1000);
}
