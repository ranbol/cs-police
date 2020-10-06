package com.cs.police.cspolice.rest;


import com.baomidou.mybatisplus.extension.service.IService;
import com.cs.police.cspolice.pojo.User;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @Author by hp
 * @ClassName UserService
 * @Description 描述
 * @Date 2020/9/18 17:17
 */
public interface UserService extends IService<User> {

    Map userLogin(User user);

    Map userUpdate(User user);
}
