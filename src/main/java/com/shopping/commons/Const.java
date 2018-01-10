package com.shopping.commons;

import com.google.common.collect.Sets;

import java.util.Set;

/**
 * Created by geely
 */
public class Const {

    public static final String CURRENT_USER = "currentUser";

    public static final String EMAIL = "email";
    public static final String USERNAME = "username";
    public static final String TOKEN_PREFIX = "token_";


    public interface RedisCacheExtime{
        int REDIS_SESSION_EXTIME = 60 * 30;//30鍒嗛挓
    }
    public interface ProductListOrderBy{
        Set<String> PRICE_ASC_DESC = Sets.newHashSet("price_desc","price_asc");
    }

    public interface Cart{
        int CHECKED = 1;//鍗宠喘鐗╄溅閫変腑鐘舵��
        int UN_CHECKED = 0;//璐墿杞︿腑鏈�変腑鐘舵��

        String LIMIT_NUM_FAIL = "LIMIT_NUM_FAIL";
        String LIMIT_NUM_SUCCESS = "LIMIT_NUM_SUCCESS";
    }

    public interface Role{
        int ROLE_CUSTOMER = 0; //鏅�氱敤鎴�
        int ROLE_ADMIN = 1;//绠＄悊鍛�
    }

    public enum ProductStatusEnum{
        ON_SALE(1,"鍦ㄧ嚎");
        private String value;
        private int code;
        ProductStatusEnum(int code,String value){
            this.code = code;
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        public int getCode() {
            return code;
        }
    }


    public enum OrderStatusEnum{
        CANCELED(0,"宸插彇娑�"),
        NO_PAY(10,"鏈敮浠�"),
        PAID(20,"宸蹭粯娆�"),
        SHIPPED(40,"宸插彂璐�"),
        ORDER_SUCCESS(50,"璁㈠崟瀹屾垚"),
        ORDER_CLOSE(60,"璁㈠崟鍏抽棴");


        OrderStatusEnum(int code,String value){
            this.code = code;
            this.value = value;
        }
        private String value;
        private int code;

        public String getValue() {
            return value;
        }

        public int getCode() {
            return code;
        }

        public static OrderStatusEnum codeOf(int code){
            for(OrderStatusEnum orderStatusEnum : values()){
                if(orderStatusEnum.getCode() == code){
                    return orderStatusEnum;
                }
            }
            throw new RuntimeException("涔堟湁鎵惧埌瀵瑰簲鐨勬灇涓�");
        }
    }
    public interface  AlipayCallback{
        String TRADE_STATUS_WAIT_BUYER_PAY = "WAIT_BUYER_PAY";
        String TRADE_STATUS_TRADE_SUCCESS = "TRADE_SUCCESS";

        String RESPONSE_SUCCESS = "success";
        String RESPONSE_FAILED = "failed";
    }



    public enum PayPlatformEnum{
        ALIPAY(1,"鏀粯瀹�");

        PayPlatformEnum(int code,String value){
            this.code = code;
            this.value = value;
        }
        private String value;
        private int code;

        public String getValue() {
            return value;
        }

        public int getCode() {
            return code;
        }
    }

    public enum PaymentTypeEnum{
        ONLINE_PAY(1,"鍦ㄧ嚎鏀粯");

        PaymentTypeEnum(int code,String value){
            this.code = code;
            this.value = value;
        }
        private String value;
        private int code;

        public String getValue() {
            return value;
        }

        public int getCode() {
            return code;
        }


        public static PaymentTypeEnum codeOf(int code){
            for(PaymentTypeEnum paymentTypeEnum : values()){
                if(paymentTypeEnum.getCode() == code){
                    return paymentTypeEnum;
                }
            }
            throw new RuntimeException("涔堟湁鎵惧埌瀵瑰簲鐨勬灇涓�");
        }

    }


    public interface REDIS_LOCK{
        String CLOSE_ORDER_TASK_LOCK = "CLOSE_ORDER_TASK_LOCK"; //鍏抽棴璁㈠崟鍒嗗竷寮忛攣
    }




}
