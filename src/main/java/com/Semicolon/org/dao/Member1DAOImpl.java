package com.Semicolon.org.dao;

import com.Semicolon.org.dto.Member1DTO;
import org.mybatis.spring.SqlSessionTemplate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Member1DAOImpl implements Member1DAO {

    private final SqlSessionTemplate sqlSession;

    public Member1DAOImpl(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    @Override
    public List<Member1DTO> getMemberListByOrgId(Map<String, Object> params) {
        return sqlSession.selectList("com.Semicolon.org.dao.Member1DAO.getMemberListByOrgId", params);
    }
    
    // 인터페이스에 맞게 파라미터 수정
    @Override
    public int updateMemberRole(String userId, String newRole) {
        Map<String, Object> params = new HashMap<>();
        params.put("userId", userId);
        params.put("newRole", newRole);
        return sqlSession.update("com.Semicolon.org.dao.Member1DAO.updateMemberRole", params);
    }
    
    // 인터페이스에 맞게 파라미터 수정
    @Override
    public int removeMemberFromOrg(String userId, int orId) {
        Map<String, Object> params = new HashMap<>();
        params.put("userId", userId);
        params.put("orId", orId);
        return sqlSession.update("com.Semicolon.org.dao.Member1DAO.removeMemberFromOrg", params);
    }
}