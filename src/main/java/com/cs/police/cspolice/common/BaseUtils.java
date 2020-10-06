package com.cs.police.cspolice.common;

import java.io.Serializable;
import java.util.Map;
import com.google.common.collect.ImmutableMap;
/**
 * @Author by hp
 * @ClassName BaseUtils
 * @Description 描述
 * @Date 2020/10/6 20:48
 */
public class BaseUtils  implements Serializable {
    public static final Map<String, String> adsMap = ImmutableMap.<String, String>builder()
            .put("departmentName","department_name")
            .put("cpuAds","cpu_ads")
            .put("cupUser","cup_user")
            .put("zcCode","zc_code")
            .put("cpuCode","cpu_code")
            .put("cpuMark","cpu_mark")
            .put("ipAds","ip_ads")
            .put("macAds","mac_ads")
            .put("sysNv","sys_nv")
            .put("softNv","soft_nv")
            .put("orLicense","or_license")
            .put("workSoftNv","work_soft_nv")
            .put("workSoftLicense","work_soft_license")
            .put("virusNv","virus_nv")
            .put("intType","inte_type")
            .build();
}
