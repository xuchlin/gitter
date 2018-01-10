package com.shopping.commons;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by geely
 */
@Component
public class ExceptionResolver implements HandlerExceptionResolver {

    private Logger logger = LoggerFactory.getLogger(ExceptionResolver.class);


    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        logger.error(request.getRequestURI() + " Exception锛�", ex);
        ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
//        ModelAndView modelAndView = new ModelAndView();
//        ModelAndView modelAndView = new ModelAndView(new MappingJackson2JsonView());
        modelAndView.addObject("status", ResponseCode.ERROR.getCode());
        modelAndView.addObject("msg", "鎺ュ彛寮傚父,璇︽儏璇锋煡鐪嬫棩蹇椾腑鐨勫紓甯镐俊鎭�");
        modelAndView.addObject("data",ex.toString());
        return modelAndView;
    }
}
