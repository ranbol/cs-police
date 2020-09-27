package com.cs.police.cspolice.interceptor;


import org.apache.coyote.Response;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.logging.Logger;

@Controller
public class MyInterceptor implements HandlerInterceptor {
    private Logger logger= (Logger) Logger.getLogger(String.valueOf (MyInterceptor.class));


   // private UserLoginMapper userLoginMapper;
   @Override
 public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
       HttpSession session=request.getSession();

          //请求的路径
          String url = request.getServletPath ().toString ();
          //logger.info ("url:" + url);
          System.out.println(url);
          //1、静态资源直接放行html img css js
          if (request.getServletPath ().contains (".")) {
              return true;
          }
           if (request.getServletPath ().endsWith ("404")) {
               return true;
           }
          //2、放行登录请求
          if (request.getServletPath ().endsWith ("/login")) {
              System.out.println ("url:"+url+"放行成功！");
              return true;
          }
       if (request.getServletPath ().endsWith ("/user/login")) {
           System.out.println ("url:"+url+"放行成功！");
           return true;
       }
          //3、下载pdf放行  .pdf下载
          if (request.getServletPath ().endsWith ("download")) {
              return true;
          }
          //放行菜单栏
//         if(request.getServletPath().equals("/userList")||request.getServletPath().equals("/repairList")||
//            request.getServletPath().equals("/appManager")||request.getServletPath().equals("/addApp")||
//            request.getServletPath().equals("/userListNew")||request.getServletPath().equals("/repairListNew")||
//            request.getServletPath().equals("/repairListDai")||request.getServletPath().equals("/repairListChu")
//            ){
//             return true;
//         }
         //放行 app开头的App端接口
           if (request.getServletPath().startsWith("/app")){
               System.out.println(request.getServletPath()+"放行成功！");
               return true;
           }
       // 4、如果用户已经登录，从session中获取用户信息
       Object user = request.getSession().getAttribute("user");
       if (user!=null) {
           //session持续时间
           int maxInactiveInterval = session.getMaxInactiveInterval();
           //session创建时间
           long creationTime = session.getCreationTime();
           //session最新链接时间
           long lastAccessedTime = session.getLastAccessedTime();

        /*   System.out.println("-----> maxInactiveInterval: "+maxInactiveInterval);
           System.out.println("-----> creationTime: "+creationTime);
           System.out.println("-----> lastAccessedTime: "+lastAccessedTime);*/

           //从session获取上次链接时间
           Long operateTime = (Long)session.getAttribute("operateTime");
//           System.out.println("-----> operateTime: "+operateTime);

           //如果operateTime是空，说明是第一次链接，对operateTime进行初始化
           if(operateTime ==null){
               session.setAttribute("operateTime",lastAccessedTime);
               return true;
           }else {
               //计算最新链接时间和上次链接时间的差值
               int intervalTime = (int) ((lastAccessedTime - operateTime) / 1000);
//               System.out.println("-----> intervalTime: " + intervalTime);
               //如果超过十秒没有交互的话，就跳转到超时界面
               if (intervalTime > 600) {
                   response.sendRedirect("/login");
                   return true;
               }
               //更新operateTime
               session.setAttribute("operateTime", lastAccessedTime);
               return true;
           }
       }
       if (user==null){
           response.sendRedirect("/login");
           return true;
       }
        //7、非法请求 即这些请求需要登录后才能访问
          Response baseResponse = new Response ();
          baseResponse.setError ();
          baseResponse.setMessage ("权限不够");
          response.setContentType ("text/json;charset=UTF-8");
          response.setCharacterEncoding ("UTF-8");
          response.getWriter ().write (String.valueOf (baseResponse));
          System.out.println ("未匹配url，验证失败");
          return false;
      }


}
