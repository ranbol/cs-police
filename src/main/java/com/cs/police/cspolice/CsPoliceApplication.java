package com.cs.police.cspolice;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.cs.police.cspolice.dao.mapper")
public class CsPoliceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CsPoliceApplication.class, args);
    }

}
