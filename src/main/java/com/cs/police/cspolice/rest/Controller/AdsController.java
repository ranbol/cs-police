package com.cs.police.cspolice.rest.Controller;

import com.alibaba.fastjson.JSON;
import com.cs.police.cspolice.pojo.Ads;
import com.cs.police.cspolice.rest.AdsService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author by hp
 * @ClassName AdsController
 * @Description 描述
 * @Date 2020/9/22 9:42
 */
@RestController
@RequestMapping("/ads")
public class AdsController {

    @Resource
    private AdsService adsService;
    /**
     *
     * @param pageNum  页码
     * @param pageSize 每页显示条数
     * @param ads      地址类
     * @return
     */
    @RequestMapping("getPageAds")
    public String showAllEmployeeAds(@RequestParam(name = "page",required = true,defaultValue ="1") Integer pageNum,
                                         @RequestParam(name="limit", required=true,defaultValue = "10") Integer pageSize,
                                         Ads ads){
        Map map=new HashMap();
        PageHelper.startPage(pageNum,pageSize);
        List<Ads> adsList = adsService.allEmployeeCpuAds(ads);
        PageInfo<Ads> pageInfo=new PageInfo<>(adsList);
        if (adsList.size()==0){
            map.put("code",1);
            map.put("msg","暂无信息");
        }else {
            map.put("code",0);
            map.put("msg","SUCCESS");
            map.put("data",pageInfo.getList());
            map.put("count",pageInfo.getTotal());
            pageInfo.setList(null);
            map.put("pageInfo",pageInfo);
        }
        return JSON.toJSONString(map);
     }

    @RequestMapping("/getAds")
    public String getAds(){
        List<Ads> list = adsService.list();
        Map map=new HashMap();
        map.put("code",0);
        map.put("msg","true");
        map.put("data",list);
        return JSON.toJSONString(map);
    }

    /**
     * 新增地址
     * @param ads
     * @return
     */
    @PostMapping("/addAds")
    public String addAds(Ads ads){
        Map map=new HashMap();
        if (adsService.addAds(ads)){
            map.put("code","success");map.put("msg","添加成功");
        }else {
            map.put("code","false");map.put("msg","添加失败");
        }
        return JSON.toJSONString(map);
    }

    /**
     * 修改信息
     * @param ads
     * @return
     */
    @PostMapping("/changeAds")
    public String changeAds(@RequestBody Ads ads){
        Map map=new HashMap();
        if (adsService.updateAds(ads)){
            map.put("code","success");map.put("msg","修改成功");
        }else {
            map.put("code","false");map.put("msg","修改失败");
        }
        return JSON.toJSONString(map);
    }

    /**
     * 批量删除
     * @param ids
     * @return
     */
    @RequestMapping("/deleteAdsMore")
    @Transactional
    public String deleteAds(String ids){
        String[] split = ids.split(",");
        Map map=new HashMap();
        Integer integer=0;
        for (String s : split) {
            integer = adsService.deleteAds(Long.valueOf(s));
            if (integer==0){
                map.put("code","false");
                map.put("msg","删除失败");
                return JSON.toJSONString(map);
            }
        }
        map.put("code","success");
        map.put("msg","删除成功");
        return JSON.toJSONString(map);
    }

    /**
     * 单个删除
     * @param ids
     * @return
     */
    @RequestMapping("/deleteAds")
    @Transactional
    public String deleteAds(Long ids){
        Map map=new HashMap();
        Integer integer=0;
            integer = adsService.deleteAds(ids);
            if (integer==0){
                map.put("code","false");
                map.put("msg","删除失败");
                return JSON.toJSONString(map);
            }
        map.put("code","success");
        map.put("msg","删除成功");
        return JSON.toJSONString(map);
    }


}
