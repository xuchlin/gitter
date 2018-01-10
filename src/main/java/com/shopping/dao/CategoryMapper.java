package com.shopping.dao;

import com.shopping.bean.Category;

public interface CategoryMapper {
    int deleteByPrimaryKey(Integer cid);

    int insert(Category record);

    int insertSelective(Category record);

    Category selectByPrimaryKey(Integer cid);

    int updateByPrimaryKeySelective(Category record);

    int updateByPrimaryKey(Category record);
}