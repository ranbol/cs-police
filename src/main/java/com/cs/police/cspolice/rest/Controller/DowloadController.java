package com.cs.police.cspolice.rest.Controller;

import cn.afterturn.easypoi.excel.ExcelExportUtil;
import cn.afterturn.easypoi.excel.entity.ExportParams;
import cn.afterturn.easypoi.excel.entity.enmus.ExcelType;
import com.cs.police.cspolice.pojo.Ads;
import com.cs.police.cspolice.rest.AdsService;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.util.List;

@RestController
public class DowloadController {

    @Resource
    private AdsService adsService;

    @RequestMapping("/download/excel")
    public void download(HttpServletRequest request, HttpServletResponse response,
                                       @RequestParam(name = "searchKey") String searchKey,
                                       @RequestParam (name = "searchValue") String searchValue){
         List<Ads> adsList = adsService.allEmployeeCpuAds(searchKey, searchValue, request);

        Workbook workbook = ExcelExportUtil.exportExcel(new ExportParams("台账信息", "台账信息表", ExcelType.XSSF), Ads.class, adsList);
        FileOutputStream fileOutputStream = null;
        try {
            fileOutputStream = new FileOutputStream("台账信息表.xlsx");
            workbook.write(fileOutputStream);
            fileOutputStream.close();
        } catch (Exception e) {
          e.printStackTrace();
        }
        downLoadExcel("台账信息表.xlsx",response,workbook);
    }
    public static void downLoadExcel(String fileName, HttpServletResponse response, Workbook workbook) {
        try {
            response.setCharacterEncoding("UTF-8");
            //application/vnd.ms-excel表示输出流中的数据保存到Excel文件
            response.setHeader("content-Type", "application/vnd.ms-excel");
            //Content-Disposition的作用：告知浏览器以何种方式显示响应返回的文件，用浏览器打开还是以附件的形式下载到本地保存
            //attachment表示以附件方式下载   inline表示在线打开   "Content-Disposition:inline; filename=文件名.mp3"
            // filename表示文件的默认名称，因为网络传输只支持URL编码的相关支付，因此需要将文件名URL编码后进行传输,前端收到后需要反编码才能获取到真正的名称
            response.setHeader("Content-Disposition", "inline;filename=" + URLEncoder.encode(fileName, "UTF-8"));
            //将表单数据数据写入响应的输出流中
            workbook.write(response.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
