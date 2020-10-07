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
    @PostMapping(value = "/user/update")
    public String update(@RequestBody User user, HttpServletRequest request){
        Map<String,Object> map = new HashMap<>();
        HttpSession session=request.getSession();
        map = userService.userUpdate(user);
        return JSON.toJSONString(map);
    }

    /**
     * 分页查询
     * @param queryMap
     * @param request
     * @return
     */
    @RequestMapping(value = "/user/select")
    public Map<String,Object> selectUser( @RequestBody Map<String,Object> queryMap,HttpServletRequest request){
        Map<String,Object> result = new HashMap<>();
        try {
            HttpSession session = request.getSession();
            User user = (User) session.getAttribute("user");
            int page = (Integer) queryMap.get("page");
            int limit = (Integer) queryMap.get("limit");
            IPage<User> iPage = new Page<User>(page,limit);
            IPage<User> userIPage;
            Map<String,Object> map = new HashMap<>();
            List<User> listUser = new ArrayList<>();
            if ("a".equals(user.getPosition())) {
                QueryWrapper<User> queryWrapper = new QueryWrapper<>();
                if(!"all".equals(queryMap.get("position"))) {
                    queryWrapper.like("position", queryMap.get("position"));
                }
                if (!"".equals(queryMap.get("dpName"))||queryMap.get("dpName")!=null){
                    queryWrapper.like("dp_name", queryMap.get("dpName"));
                }
                userIPage = userService.page(iPage,queryWrapper);
                listUser.addAll(userIPage.getRecords());
                map.put("count",userIPage.getCurrent());
            } else if ("b".equals(user.getPosition())) {
                QueryWrapper<User> queryWrapper = new QueryWrapper<>();
                queryWrapper.like("dp_name", user.getDpName());
                if (!"".equals(queryMap.get("dpName"))||queryMap.get("dpName")!=null){
                    queryWrapper.like("dp_name", queryMap.get("dpName"));
                }
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
            map.put("code","true");
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
            session.setAttribute("department",map.get("department"));
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
        user.setPassword("123456");
        QueryWrapper queryWrapper=new QueryWrapper();
        queryWrapper.eq("name",user.getUserName());
        User user1 = userMapper.selectOne(queryWrapper);
        Map<String,Object> returnMap=new HashMap<>();
        if (user1!=null){
            returnMap.put("code","false");returnMap.put("msg","该用户名已存在");
            return  JSON.toJSONString(returnMap) ;
        }
        int insert = userMapper.insert(user);
        if (insert==1){
            returnMap.put("code","true");returnMap.put("msg","新增用户成功");
        }else {
            returnMap.put("code","false");returnMap.put("msg","新增用户失败");
        }
        return JSON.toJSONString(returnMap) ;
    }
    @GetMapping("/user/charge")
    @ResponseBody
    public String charge(HttpServletRequest request){
        Object user = request.getSession().getAttribute("user");
        Map map=new HashMap();
        if (user==null){
            map.put("code","false");
            map.put("msg","用户登陆超时");
        }else {
            map.put("code","true");
            map.put("msg","用户未超时");
        }
        return  JSON.toJSONString(map);
    }

}
