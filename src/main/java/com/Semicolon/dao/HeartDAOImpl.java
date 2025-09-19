package com.Semicolon.dao;

import org.apache.ibatis.session.SqlSession;

import com.Semicolon.dto.HeartVO;

public class HeartDAOImpl implements HeartDAO {
	
    private SqlSession session;
    public HeartDAOImpl(SqlSession session) {
        this.session = session;
    }
    

    @Override
    public int insertHeart(HeartVO heartVO) {
        return session.insert("Heart-Mapper.insertHeart", heartVO);
    }

    @Override
    public int deleteHeart(HeartVO heartVO) {
        return session.delete("Heart-Mapper.deleteHeart", heartVO);
    }

    @Override
    public int countHeartByFno(int fno) {
        return session.selectOne("Heart-Mapper.countHeartByFno", fno);
    }

    @Override
    public boolean existsHeart(HeartVO heartVO) {
        int count = session.selectOne("Heart-Mapper.existsHeart", heartVO);
        return count > 0; // 0보다 크면 true, 아니면 false
    }
}