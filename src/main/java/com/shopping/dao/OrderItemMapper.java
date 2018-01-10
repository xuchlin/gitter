package com.shopping.dao;

import com.shopping.bean.OrderItem;

public interface OrderItemMapper {
    int deleteByPrimaryKey(Integer oiid);

    int insert(OrderItem record);

    int insertSelective(OrderItem record);

    OrderItem selectByPrimaryKey(Integer oiid);

    int updateByPrimaryKeySelective(OrderItem record);

    int updateByPrimaryKey(OrderItem record);
}