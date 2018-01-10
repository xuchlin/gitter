package com.shopping.dao;

import com.shopping.bean.Cart;

public interface CartMapper {
    int deleteByPrimaryKey(Integer carId);

    int insert(Cart record);

    int insertSelective(Cart record);

    Cart selectByPrimaryKey(Integer carId);

    int updateByPrimaryKeySelective(Cart record);

    int updateByPrimaryKey(Cart record);
}