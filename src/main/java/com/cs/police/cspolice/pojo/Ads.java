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
import java.util.Date;

/**
 * @Author by hp
 * @ClassName Ads
 * @Description 描述
 * @Date 2020/9/18 16:58
 */
@Data
@TableName(value = "ads_info")
public class Ads implements Serializable {


    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;

    /**
     * 部门名称
     */
    @TableField(value = "department_name")
    private String departmentName;

    /**
     * 计算机所在地
     */
    @TableField(value = "cpu_ads")
    private String cpuAds;

    /**
     * 使用人姓名
     */
    @TableField(value = "cup_user")
    private String cupUser;

    /**
     * 资产编号
     */
    @TableField(value = "zc_code")
    private String zcCode;

    /**
     * 计算机编号
     */
    @TableField(value = "cpu_code")
    private String cpuCode;

    /**
     * 计算机品牌
     */
    @TableField(value = "cpu_mark")
    private String cpuMark;

    /**
     * ip地址
     */
    @TableField(value = "ip_ads")
    private String ipAds;

    /**
     * mac地址
     */
    @TableField(value = "mac_ads")
    private String macAds;

    /**
     * 操作系统软件
     * 操作系统使用的软件名称及版本
     */
    @TableField(value = "sys_nv")
    private String sysNv;

    /**
     * 预装软件名称及版本
     */
    @TableField(value = "soft_nv")
    private String softNv;

    /**
     * 操作系统软件是否授权（或OEM）
     */
    @TableField(value = "or_license")
    private String orLicense;

    /**
     * 办公软件名称及版本
     */
    @TableField(value = "work_soft_nv")
    private String workSoftNv;

    /**
     * 办公软件是否授权
     */
    @TableField(value = "work_soft_license")
    private String workSoftLicense;

    /**
     * 杀毒软件名称及版本
     */
    @TableField(value = "virus_nv")
    private String virusNv;

    /**
     * 使用的网络类型
     */
    @TableField(value = "inte_type")
    private String intType;

    /**
     * 创建时间
     */
    @TableField(value = "create_time")
    private Date createTime;

    /**
     * 更新时间
     */
    @TableField(value = "update_time")
    private Date updateTime;
}
