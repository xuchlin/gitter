package com.shopping.commons;//package com.mk.commons;
//
//
//import com.mk.bean.User;
//import com.mk.util.CookieUtil;
//import com.mk.util.JsonUtil;
//import com.mk.util.RedisShardedPoolUtil;
//import org.apache.commons.lang3.StringUtils;
//
//import javax.servlet.Filter;
//import javax.servlet.FilterChain;
//import javax.servlet.FilterConfig;
//import javax.servlet.ServletException;
//import javax.servlet.ServletRequest;
//import javax.servlet.ServletResponse;
//import javax.servlet.http.HttpServletRequest;
//import java.io.IOException;
//
///**
// * Created by geely
// */
//public class SessionExpireFilter implements Filter {
//    @Override
//    public void init(FilterConfig filterConfig) throws ServletException {
//
//    }
//
//    @Override
//    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
//        HttpServletRequest httpServletRequest = (HttpServletRequest)servletRequest;
//
//        String loginToken = CookieUtil.readLoginToken(httpServletRequest);
//
//        if(StringUtils.isNotEmpty(loginToken)){
//            //鍒ゆ柇logintoken鏄惁涓虹┖鎴栬��""锛�
//            //濡傛灉涓嶄负绌虹殑璇濓紝绗﹀悎鏉′欢锛岀户缁嬁user淇℃伅
//
//            String userJsonStr = RedisShardedPoolUtil.get(loginToken);
//            User user = JsonUtil.string2Obj(userJsonStr,User.class);
//            if(user != null){
//                //濡傛灉user涓嶄负绌猴紝鍒欓噸缃畇ession鐨勬椂闂达紝鍗宠皟鐢╡xpire鍛戒护
//                RedisShardedPoolUtil.expire(loginToken, Const.RedisCacheExtime.REDIS_SESSION_EXTIME);
//            }
//        }
//        filterChain.doFilter(servletRequest,servletResponse);
//    }
//
//    @Override
//    public void destroy() {
//
//    }
//}
