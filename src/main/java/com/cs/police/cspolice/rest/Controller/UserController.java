package com.cs.police.cspolice.rest.Controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cs.police.cspolice.dao.mapper.DepartmentMapper;
import com.cs.police.cspolice.dao.mapper.UserMapper;
import com.cs.police.cspolice.pojo.Department;
import com.cs.police.cspolice.pojo.User;
import com.cs.police.cspolice.rest.UserService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

    /**
     * 用户修改密码
     * @param password
     * @param request
     * @return
     */
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
     * 分页查询
     * @param queryMap
     * @param request
     * @return
     */
    @RequestMapping(value = "/user/select")
    public Map<String,Object> selectUser(Map<String,Object> queryMap,HttpServletRequest request){
        Map<String,Object> result = new HashMap<>();
        try {
            HttpSession session = request.getSession();
            User user = (User) session.getAttribute("user");
            int page = (Integer) queryMap.get("page");
            int total = (Integer) queryMap.get("total");
            IPage<User> iPage = new Page<User>(page,total);
            IPage<User> userIPage;
            Map<String,Object> map = new HashMap<>();
            List<User> listUser = new ArrayList<>();
            if ("a".equals(user.getPosition())) {
                QueryWrapper<User> queryWrapper = new QueryWrapper<>();
                if(!"all".equals(queryMap.get("position"))) {
                    queryWrapper.eq("position", queryMap.get("position"));
                }
                userIPage = userService.page(iPage,queryWrapper);
                listUser.addAll(userIPage.getRecords());
                map.put("count",userIPage.getCurrent());
            } else if ("b".equals(user.getPosition())) {
                QueryWrapper<User> queryWrapper = new QueryWrapper<>();
                queryWrapper.eq("dp_name", user.getDpName());
                userIPage = userService.page(iPage,queryWrapper);
                listUser.addAll(userIPage.getRecords());
                map.put("count",userIPage.getCurrent());
            } else {
                listUser.add(user);
                map.put("count",1);
            }
            map.put("list",listUser);
            result.put("code","true");
            result.put("data",map);
            result.put("msg","查询用户信息成功");
        }catch (Exception e){
            result.put("code","false");
            result.put("msg","查询用户信息失败");
        }
        return result;
    }

    /**
     * 删除用户
     * @param id
     * @param request
     * @return
     */
    @RequestMapping("/user/delete")
    public Map<String,Object> deleteUser(String id, HttpServletRequest request){
        Map<String,Object> map = new HashMap<>();
        try{
            userMapper.deleteById(id);
            map.put("code","false");
            map.put("msg","删除用户成功");
        }catch (Exception e){
            e.printStackTrace();
            map.put("code","false");
            map.put("msg","删除用户失败");
        }
        return map;
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
            QueryWrapper queryWrapper=new QueryWrapper();
            queryWrapper.eq("dp_name",user.getDpName());
            Department department = departmentMapper.selectOne(queryWrapper);
            session.setAttribute("department",department);
            request.getSession().setMaxInactiveInterval(6000);
        }
        return JSON.toJSONString(map);
    }

    /**
     * （管理员新增）
     * @param user
     * @return
     */
    @PostMapping(value = "/user/register")
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
