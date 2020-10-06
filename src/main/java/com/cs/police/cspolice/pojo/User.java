package com.cs.police.cspolice.pojo;



import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * @Author by hp
 * @ClassName User
 * @Description 描述
 * @Date 2020/9/18 17:02
 */
@Data
@TableName("user_info")
public class User  implements Serializable {


    @TableId(value = "id",type = IdType.AUTO)
    private Long id;
    /**
     * 用户名
     */
    @TableField(value = "name")
    private String userName;

    /**
     * 用户密码
     */
    @TableField(value = "password")
    private String password;

    /**
     * 级别
     */
    @TableField(value = "position")
    private String position;

    /**
     * 所属部门
     */
    @TableField(value = "be_enter")
    private String beEnter;

    /**
     * 描述
     */
    @TableField(value = "dsc")
    private String dsc;

}
