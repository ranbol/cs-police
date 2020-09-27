package com.cs.police.cspolice.dao.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cs.police.cspolice.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.jpa.repository.Query;

/**
 * @Author by hp
 * @ClassName UserMapper
 * @Description 描述
 * @Date 2020/9/18 17:08
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {
    @Query(nativeQuery =true,value = "select * from user_info where userName=?1 and password=?2")
    User selectByNP(String userName, String password);
}
