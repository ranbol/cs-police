package com.cs.police.cspolice.rest;


import com.baomidou.mybatisplus.extension.service.IService;
import com.cs.police.cspolice.pojo.Ads;

import java.util.List;
import java.util.Map;

/**
 * @Author by hp
 * @ClassName AdsService
 * @Description 描述
 * @Date 2020/9/18 17:17
 */
public interface AdsService extends IService<Ads> {
    /**
     * 添加一个员工电脑地址
     * @param ads
     * @return
     */
     Ads addAdsForEmployee(Ads ads);

    /**
     * 查找所有的员工电脑地址信息
     * @param ads
     * @return
     */
    List<Ads> allEmployeeCpuAds(String searchKey,String searchValue);

    /**
     * 删除信息
     * @param id
     * @return
     */
    Integer deleteAds(Long id);

    /**
     * 新增信息
     * @param ads
     * @return
     */
    boolean addAds(Ads ads);

    /**
     * 跟新信息
     * @param ads
     * @return
     */
    boolean updateAds(Ads ads);



}
