package com.cs.police.cspolice.rest.Impl;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cs.police.cspolice.dao.mapper.AdsMapper;
import com.cs.police.cspolice.pojo.Ads;
import com.cs.police.cspolice.rest.AdsService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;


/**
 * @Author by hp
 * @ClassName AdsServiceImpl
 * @Description 描述
 * @Date 2020/9/21 9:40
 */
@Service
public class AdsServiceImpl extends ServiceImpl<AdsMapper, Ads> implements AdsService {

    @Resource
    private AdsMapper adsMapper;
    @Override
    public Ads addAdsForEmployee(Ads ads) {
        return null;
    }

    @Override
    public List<Ads> allEmployeeCpuAds(Ads ads) {
        QueryWrapper<Ads> queryWrapper=new QueryWrapper<>();
        if (ads.getDepartmentName()!=null && ads.getDepartmentName()!=""){
            queryWrapper.eq("department_name",ads.getDepartmentName());
          //  queryWrapper.lambda().gt(Ads::getDepartmentName,ads.getDepartmentName());
        }
        if (ads.getCpuAds()!=null&& ads.getCpuAds()!=""){
            queryWrapper.eq("cpu_ads",ads.getCpuAds());
          //  queryWrapper.lambda().gt(Ads::getCpuAds,ads.getCpuAds());
        }
        if (ads.getCpuCode()!=null&& ads.getCpuCode()!=""){
            queryWrapper.eq("cpu_code",ads.getCpuCode());
          //  queryWrapper.lambda().gt(Ads::getCpuCode,ads.getCpuCode());
        }
        if (ads.getCpuMark()!=null&& ads.getCpuMark()!=""){
            queryWrapper.eq("cpu_mark",ads.getCpuMark());
          //  queryWrapper.lambda().gt(Ads::getCpuMark,ads.getCpuMark());
        }
        if (ads.getIpAds()!=null&& ads.getIpAds()!=""){
            queryWrapper.eq("ip_ads",ads.getIpAds());
          //  queryWrapper.lambda().gt(Ads::getIpAds,ads.getIpAds());
        }
        if (ads.getMacAds()!=null&& ads.getMacAds()!=""){
            queryWrapper.eq("mac_ads",ads.getMacAds());
           // queryWrapper.lambda().gt(Ads::getMacAds,ads.getMacAds());
        }
        if (ads.getCupUser()!=null&& ads.getCupUser()!=""){
            queryWrapper.eq("cup_user",ads.getCupUser());
          //  queryWrapper.lambda().gt(Ads::getCupUser,ads.getCupUser());
        }
        List<Ads> adsList = adsMapper.selectList(queryWrapper);
        return adsList ;
    }

    @Override
    public Integer deleteAds(Long id) {
        return adsMapper.deleteById(id);
    }

    @Override
    public boolean addAds(Ads ads) {
        ads.setId(null);
        ads.setCreateTime(new Date());
       if (adsMapper.insert(ads)==1){
           return true;
       }else {
           return false;
       }
    }

    @Override
    public boolean updateAds(Ads ads) {
        if (adsMapper.updateById(ads)==1){
            return true;
        }else {
            return false;
        }
    }
}
