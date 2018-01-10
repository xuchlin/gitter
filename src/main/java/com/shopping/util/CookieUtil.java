package com.shopping.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by geely
 */
@Slf4j
public class CookieUtil {

    private final static String COOKIE_DOMAIN = ".happymmall.com";
    private final static String COOKIE_NAME = "mmall_login_token";


    public static String readLoginToken(HttpServletRequest request){
        Cookie[] cks = request.getCookies();
        if(cks != null){
            for(Cookie ck : cks){
                log.info("read cookieName:{},cookieValue:{}",ck.getName(),ck.getValue());
                if(StringUtils.equals(ck.getName(),COOKIE_NAME)){
                    log.info("return cookieName:{},cookieValue:{}",ck.getName(),ck.getValue());
                    return ck.getValue();
                }
            }
        }
        return null;
    }

    //X:domain=".happymmall.com"
    //a:A.happymmall.com            cookie:domain=A.happymmall.com;path="/"
    //b:B.happymmall.com            cookie:domain=B.happymmall.com;path="/"
    //c:A.happymmall.com/test/cc    cookie:domain=A.happymmall.com;path="/test/cc"
    //d:A.happymmall.com/test/dd    cookie:domain=A.happymmall.com;path="/test/dd"
    //e:A.happymmall.com/test       cookie:domain=A.happymmall.com;path="/test"

    public static void writeLoginToken(HttpServletResponse response,String token){
        Cookie ck = new Cookie(COOKIE_NAME,token);
        ck.setDomain(COOKIE_DOMAIN);
        ck.setPath("/");//浠ｈ〃璁剧疆鍦ㄦ牴鐩綍
        ck.setHttpOnly(true);
        //鍗曚綅鏄銆�
        //濡傛灉杩欎釜maxage涓嶈缃殑璇濓紝cookie灏变笉浼氬啓鍏ョ‖鐩橈紝鑰屾槸鍐欏湪鍐呭瓨銆傚彧鍦ㄥ綋鍓嶉〉闈㈡湁鏁堛��
        ck.setMaxAge(60 * 60 * 24 * 365);//濡傛灉鏄�-1锛屼唬琛ㄦ案涔�
        log.info("write cookieName:{},cookieValue:{}",ck.getName(),ck.getValue());
        response.addCookie(ck);
    }


    public static void delLoginToken(HttpServletRequest request,HttpServletResponse response){
        Cookie[] cks = request.getCookies();
        if(cks != null){
            for(Cookie ck : cks){
                if(StringUtils.equals(ck.getName(),COOKIE_NAME)){
                    ck.setDomain(COOKIE_DOMAIN);
                    ck.setPath("/");
                    ck.setMaxAge(0);//璁剧疆鎴�0锛屼唬琛ㄥ垹闄ゆcookie銆�
                    log.info("del cookieName:{},cookieValue:{}",ck.getName(),ck.getValue());
                    response.addCookie(ck);
                    return;
                }
            }
        }
    }







}
