/*
package com.cs.police.cspolice.interceptor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {
//    @Bean
//    public MyInterceptor myInterceptor(){
//        return new MyInterceptor();
//    }

//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(myInterceptor()).excludePathPatterns("/static/*")
//                .excludePathPatterns("/error").addPathPatterns("/**");
//    }
        @Override
        public void addInterceptors(InterceptorRegistry registry) {
            registry.addInterceptor(getMyInterceptor()).addPathPatterns("/**");
        }

        @Bean
        public MyInterceptor getMyInterceptor(){
            return new MyInterceptor();
        }

}


*/
