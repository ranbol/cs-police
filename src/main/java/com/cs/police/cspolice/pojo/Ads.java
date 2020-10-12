package com.cs.police.cspolice.pojo;

import cn.afterturn.easypoi.excel.annotation.Excel;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;


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
    @Excel(name = "序号" ,width =6,orderNum = "0")
    private Integer id;

    /**
     * 部门名称
     */
    @TableField(value = "department_name")
    @Excel(name = "部门名称" ,width =18,orderNum = "1")
    private String departmentName;

    /**
     * 计算机所在地
     */
    @TableField(value = "cpu_ads")
    @Excel(name = "计算机所在地" ,width =28,orderNum = "2")
    private String cpuAds;

    /**
     * 使用人姓名
     */
    @TableField(value = "cup_user")
    @Excel(name = "使用人姓名" ,width =12,orderNum = "3")
    private String cupUser;

    /**
     * 资产编号
     */
    @TableField(value = "zc_code")
    @Excel(name = "资产编号" ,width =20,orderNum = "4")
    private String zcCode;

    /**
     * 计算机编号
     */
    @TableField(value = "cpu_code")
    @Excel(name = "计算机编号",width =20,orderNum = "5")
    private String cpuCode;

    /**
     * 计算机品牌
     */
    @TableField(value = "cpu_mark")
    @Excel(name = "计算机品牌",width =12 ,orderNum = "6")
    private String cpuMark;

    /**
     * ip地址
     */
    @TableField(value = "ip_ads")
    @Excel(name = "ip地址",width =20 ,orderNum = "7")
    private String ipAds;

    /**
     * mac地址
     */
    @TableField(value = "mac_ads")
    @Excel(name = "mac地址",width =20 ,orderNum = "8")
    private String macAds;

    /**
     * 操作系统软件
     * 操作系统使用的软件名称及版本
     */
    @TableField(value = "sys_nv")
    @Excel(name = "操作系统使用的软件名称及版本",width =40,orderNum = "9")
    private String sysNv;

    /**
     * 计算机类别
     */
    @TableField(value = "soft_nv")
    @Excel(name = "计算机类别" ,width =20,orderNum = "10")
    private String softNv;

    /**
     * 操作系统软件是否授权（或OEM）
     */
    @TableField(value = "or_license")
    @Excel(name = "操作系统软件是否授权（或OEM）",width =20 ,orderNum = "11")
    private String orLicense;

    /**
     * 办公软件名称及版本
     */
    @TableField(value = "work_soft_nv")
    @Excel(name = "办公软件名称及版本",width =20 ,orderNum = "12")
    private String workSoftNv;

    /**
     * 办公软件是否授权
     */
    @TableField(value = "work_soft_license")
    @Excel(name = "办公软件是否授权",width =20 ,orderNum = "13")
    private String workSoftLicense;

    /**
     * 杀毒软件名称及版本
     */
    @TableField(value = "virus_nv")
    @Excel(name = "杀毒软件名称及版本",width =20 ,orderNum = "14")
    private String virusNv;

    /**
     * 使用的网络类型
     */
    @TableField(value = "inte_type")
    @Excel(name = "使用的网络类型",width =20 ,orderNum = "15")
    private String intType;

    /**
     * 创建时间
     */
    @TableField(value = "create_time")
    @Excel(name = "创建时间" ,orderNum = "16",width =20,format = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    /**
     * 更新时间
     */
    @TableField(value = "update_time")
    private Date updateTime;

    @Override
    public String toString() {
        return "Ads{" +
                "id=" + id +
                ", departmentName='" + departmentName + '\'' +
                ", cpuAds='" + cpuAds + '\'' +
                ", cupUser='" + cupUser + '\'' +
                ", zcCode='" + zcCode + '\'' +
                ", cpuCode='" + cpuCode + '\'' +
                ", cpuMark='" + cpuMark + '\'' +
                ", ipAds='" + ipAds + '\'' +
                ", macAds='" + macAds + '\'' +
                ", sysNv='" + sysNv + '\'' +
                ", softNv='" + softNv + '\'' +
                ", orLicense='" + orLicense + '\'' +
                ", workSoftNv='" + workSoftNv + '\'' +
                ", workSoftLicense='" + workSoftLicense + '\'' +
                ", virusNv='" + virusNv + '\'' +
                ", intType='" + intType + '\'' +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                '}';
    }
}
