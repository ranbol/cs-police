package com.cs.police.cspolice.rest.Controller;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.cs.police.cspolice.dao.mapper.DepartmentMapper;
import com.cs.police.cspolice.pojo.Department;
import com.cs.police.cspolice.pojo.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class DepartmentController {

    @Resource
    private DepartmentMapper departmentMapper;

    @RequestMapping("/department/select")
    public Map<String,Object> selectDepartment(HttpServletRequest request){
        Map<String,Object> result = new HashMap<>();
        HttpSession session=request.getSession();
        User user = (User)session.getAttribute("user");
        Department department = (Department) session.getAttribute("department");
        List<Department> list = new ArrayList<>();
        if("a".equals(user.getPosition())){
            QueryWrapper<Department> queryWrapper = new QueryWrapper();
            list =departmentMapper.selectList(queryWrapper);
        }/*else if("b".equals(user.getPosition())&&1==department.getLevel()){
            QueryWrapper<Department> queryWrapper = new QueryWrapper();
            queryWrapper.eq("pid",department.getId());
            list = departmentMapper.selectList(queryWrapper);
        }*/else{
            list.add(department);
        }
        result.put("code","true");
        result.put("data",list);
        return result;
    }
}
