package com.cs.police.cspolice.rest.Impl;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cs.police.cspolice.common.BaseUtils;
import com.cs.police.cspolice.dao.mapper.AdsMapper;
import com.cs.police.cspolice.pojo.Ads;
import com.cs.police.cspolice.pojo.User;
import com.cs.police.cspolice.rest.AdsService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
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
    public List<Ads> allEmployeeCpuAds(String searchKey, String searchValue, HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        QueryWrapper<Ads> queryWrapper=new QueryWrapper<>();
        String s = BaseUtils.adsMap.get(searchKey);
        queryWrapper.like(s,searchValue);
        if(!"a".equals(user.getPosition())) {
            queryWrapper.eq("department_name", user.getDpName());
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
