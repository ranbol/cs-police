package com.cs.police.cspolice.rest.Controller;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

@RestController
public class DowloadController {

    @RequestMapping("/download/excel")
    public Map<String,Object> download(HttpServletRequest request, HttpServletResponse response){
        Map<String,Object> result = new HashMap<>();
        try {
            File file = new File("static/layui_source/测试.xlsx");
            InputStream inputStream = new FileInputStream(file);
            XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
            response.setContentType("application/binary;charset=ISO8859-1");
            String fileName = java.net.URLEncoder.encode("template", "UTF-8");
            response.setHeader("Content-disposition", "attachment; filename=" + fileName + ".xlsx");
            ServletOutputStream out = null;
            out = response.getOutputStream();
            workbook.write(out);
            out.flush();
            out.close();
            result.put("code","true");
            result.put("msg","下载成功");
        } catch (Exception e) {
            e.printStackTrace();
            result.put("code","false");
            result.put("msg","下载失败");
        } finally {
            //关闭文件输出流
        }
        return result;
    }
}
