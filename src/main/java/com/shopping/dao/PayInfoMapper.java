package com.shopping.dao;

import com.shopping.bean.PayInfo;

public interface PayInfoMapper {
    int deleteByPrimaryKey(Integer piid);

    int insert(PayInfo record);

    int insertSelective(PayInfo record);

    PayInfo selectByPrimaryKey(Integer piid);

    int updateByPrimaryKeySelective(PayInfo record);

    int updateByPrimaryKey(PayInfo record);
}