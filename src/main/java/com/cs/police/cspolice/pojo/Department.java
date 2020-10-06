package com.cs.police.cspolice.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @Author by hp
 * @ClassName Department
 * @Description 描述
 * @Date 2020/10/6 15:43
 */

@Data
@TableName(value = "department_info")
public class Department {

    @TableId(value = "id",type = IdType.AUTO)
    private Long id;
    /**
     * 部门名称
     */
    @TableField(value = "name")
    private String name;

    /**
     * 上级id
     */
    @TableField(value = "pid")
    private Integer pid;

    /**
     *  部门等级
     */
    @TableField(value = "level")
    private Integer level;
}
