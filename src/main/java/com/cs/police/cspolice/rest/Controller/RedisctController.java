package com.cs.police.cspolice.rest.Controller;

import com.alibaba.fastjson.JSON;
import com.cs.police.cspolice.dao.mapper.AdsMapper;
import com.cs.police.cspolice.pojo.Ads;
import org.apache.xmlbeans.impl.jam.mutable.MAnnotatedElement;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * @Author by hp
 * @ClassName RedisctController
 * @Description 描述
 * @Date 2020/9/21 10:34
 */
@Controller
public class RedisctController {
    @Resource
    private AdsMapper adsMapper;

    /**
     * 跳转到登录
     * @return
     */
    @RequestMapping("/login")
    public String login(){
        return "login";
    }

    /**
     * 退出登录
     * @return
     */
    @RequestMapping("/outLogin")
    @ResponseBody
    public String outLogin(HttpServletRequest request){
        Map map=new HashMap();
        try {
            request.getSession().setAttribute("user",null);
            request.getSession().setAttribute("department",null);
           map.put("code","true");
           map.put("msg","退出登录成功");
        }catch (Exception e){
            map.put("code","false");
            map.put("msg","退出登录失败");
        }
        return JSON.toJSONString(map);
    }

    /**
     * 跳转到主页
     * @return
     */
    @RequestMapping("/index")
    public String index(){
        return "index";
    }
    /**
     * 跳转到ip信息
     * @return
     */
    @RequestMapping("/adsPage")
    public String adsPage(){
        return "ads";
    }

    /**
     * 新增信息
     * @return
     */
    @RequestMapping("/addAds")
    public String addAds(){
        return "addAds";
    }


    /**
     * 跳转到修改页面
     * @return
     */
   /* @RequestMapping("/changeAds")
    public ModelAndView changeAds(Integer id){
    ModelAndView mv=new ModelAndView();
    Ads ads = adsMapper.selectById(id);
    mv.addObject("ads",ads);
    mv.setViewName("/changeAds");
    return mv;
    }*/

    @RequestMapping("/changeAds")
    public String changeAds(){
        return "/changeAds";
    }

}
