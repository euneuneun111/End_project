package com.Semicolon.cmnt.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.Semicolon.cmnt.dto.Recruit_ApplicationVO;

public class Recruit_ApplicationDAOImpl implements Recruit_ApplicationDAO {

    private SqlSession session;

    public Recruit_ApplicationDAOImpl(SqlSession session) {
        this.session = session;
    }

    @Override
    public List<Recruit_ApplicationVO> selectApplicationsByRno(int rno) {
        return session.selectList("Recruit_Application-Mapper.selectApplicationsByRno", rno);
    }

    @Override
    public int insertApplication(int rno, String user_id) {
        Map<String, Object> param = new HashMap<>();
        param.put("rno", rno);
        param.put("user_id", user_id);
        return session.insert("Recruit_Application-Mapper.insertApplication", param);
    }

    @Override
    public int existsApplication(int rno, String user_id) {
        Map<String, Object> param = new HashMap<>();
        param.put("rno", rno);
        param.put("user_id", user_id);
        return session.selectOne("Recruit_Application-Mapper.existsApplication", param);
    }
}