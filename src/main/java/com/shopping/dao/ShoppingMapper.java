package com.shopping.dao;

import com.shopping.bean.Shopping;

public interface ShoppingMapper {
    int deleteByPrimaryKey(Integer sid);

    int insert(Shopping record);

    int insertSelective(Shopping record);

    Shopping selectByPrimaryKey(Integer sid);

    int updateByPrimaryKeySelective(Shopping record);

    int updateByPrimaryKey(Shopping record);
}