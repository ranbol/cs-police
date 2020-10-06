package com.cs.police.cspolice.rest.Controller;

import com.alibaba.fastjson.JSON;
import com.cs.police.cspolice.dao.mapper.DepartmentMapper;
import com.cs.police.cspolice.dao.mapper.UserMapper;
import com.cs.police.cspolice.pojo.Department;
import com.cs.police.cspolice.pojo.User;
import com.cs.police.cspolice.rest.UserService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * @Author by hp
 * @ClassName UserController
 * @Description 描述
 * @Date 2020/9/18 17:20
 */
@RestController
public class UserController {
    @Resource
    private UserService userService;

    @Resource
    private UserMapper userMapper;

    @Resource
    private DepartmentMapper departmentMapper;

    @GetMapping("/getUser")
    public String getUser(){

        return JSON.toJSONString("");
    }

    @GetMapping(value = "/user/update")
    public String update(String password, HttpServletRequest request){
        Map<String,Object> map = new HashMap<>();
        HttpSession session=request.getSession();
        User user = (User)session.getAttribute("user");
        User user1 = new User();
        user1.setPassword(password);
        user1.setId(user.getId());
        map = userService.userUpdate(user1);
        return JSON.toJSONString(map);
    }

    /**
     * 用户登录
     * @param user
     * @return
     */
    @PostMapping(value = "/user/login")
    @ResponseBody
    public String login(@RequestBody User user, HttpServletRequest request){
        Map map = userService.userLogin(user);
        if (map.get("code")=="true"){
            HttpSession session=request.getSession();
            session.setAttribute("user",map.get("data"));
            Department department = departmentMapper.selectById(user.getDpId());
            session.setAttribute("department",department);
            request.getSession().setMaxInactiveInterval(60*60*1000);
        }
        return JSON.toJSONString(map);
    }

    /**
     * （管理员新增）
     * @param user
     * @return
     */
    @PostMapping(value = "/user/regist")
    @ResponseBody
    public String register(@RequestBody User user){
        int insert = userMapper.insert(user);
        Map<String,Object> returnMap=new HashMap<>();
        if (insert==1){
            returnMap.put("code","true");returnMap.put("msg","新增用户成功");
        }else {
            returnMap.put("code","false");returnMap.put("msg","新增用户失败");
        }
        return JSON.toJSONString(returnMap) ;
    }

}
