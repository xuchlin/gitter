package com.shopping.bean;

import java.util.Date;

public class User {
    private Integer uid;

    private String userName;

    private String userPwd;

    private String email;

    private String phone;

    private Date createTime;

    private Date updateTime;

    private String headerPic;

    private String account;

    public User(Integer uid, String userName, String userPwd, String email, String phone, Date createTime, Date updateTime, String headerPic, String account) {
        this.uid = uid;
        this.userName = userName;
        this.userPwd = userPwd;
        this.email = email;
        this.phone = phone;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.headerPic = headerPic;
        this.account = account;
    }

    public User() {
        super();
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(String userPwd) {
        this.userPwd = userPwd == null ? null : userPwd.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getHeaderPic() {
        return headerPic;
    }

    public void setHeaderPic(String headerPic) {
        this.headerPic = headerPic == null ? null : headerPic.trim();
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account == null ? null : account.trim();
    }
}