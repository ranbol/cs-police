package com.cs.police.cspolice.rest.Impl;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cs.police.cspolice.dao.mapper.UserMapper;
import com.cs.police.cspolice.pojo.User;
import com.cs.police.cspolice.rest.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * @Author by hp
 * @ClassName UserServiceImpl
 * @Description 描述
 * @Date 2020/9/21 10:05
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Resource
    private UserMapper userMapper;
    @Override
    public Map userLogin(User user) {
        Map<String,Object> returnMap=new HashMap<>();
        QueryWrapper<User> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("name",user.getUserName()).eq("password",user.getPassword());
        User user1 = userMapper.selectOne(queryWrapper);
        if (user1==null){
         returnMap.put("code","false");returnMap.put("msg","用户名或密码错误");
        }else {
         returnMap.put("code","true");returnMap.put("msg","登录成功");returnMap.put("data",user1);
        }
        return returnMap;
    }
}
