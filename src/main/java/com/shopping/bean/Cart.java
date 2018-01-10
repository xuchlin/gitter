package com.shopping.bean;

import java.util.Date;

public class Cart {
    private Integer carId;

    private Integer uid;

    private Integer pid;

    private Integer quantity;

    private Integer checked;

    private Date createTime;

    private Date updateTime;

    public Cart(Integer carId, Integer uid, Integer pid, Integer quantity, Integer checked, Date createTime, Date updateTime) {
        this.carId = carId;
        this.uid = uid;
        this.pid = pid;
        this.quantity = quantity;
        this.checked = checked;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    public Cart() {
        super();
    }

    public Integer getCarId() {
        return carId;
    }

    public void setCarId(Integer carId) {
        this.carId = carId;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getChecked() {
        return checked;
    }

    public void setChecked(Integer checked) {
        this.checked = checked;
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
}