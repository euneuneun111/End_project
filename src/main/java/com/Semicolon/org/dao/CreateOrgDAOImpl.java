// src/main/java/com/Semicolon/org/dao/CreateOrgDAOImpl.java
package com.Semicolon.org.dao;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;

import com.Semicolon.org.dto.CreateOrgDTO;

public class CreateOrgDAOImpl implements CreateOrgDAO {

    private SqlSessionTemplate sqlSession;

    public CreateOrgDAOImpl(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    @Override
    public int isUserInAnyOrg(String userId) {
        return sqlSession.selectOne("com.Semicolon.org.dao.CreateOrgDAO.isUserInAnyOrg", userId);
    }

    @Override
    public void createOrganization(CreateOrgDTO organization) {
        sqlSession.insert("com.Semicolon.org.dao.CreateOrgDAO.createOrganization", organization);
    }
    @Override
    public void updateEngineerOrgId(Map<String, String> params) {
        sqlSession.update("com.Semicolon.org.dao.CreateOrgDAO.updateEngineerOrgId", params);
    }
}