// src/main/java/com/Semicolon/org/dao/OrgDetailDAOImpl.java
package com.Semicolon.org.dao;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;

import com.Semicolon.org.dto.OrgDetailDTO;

public class OrgDetailDAOImpl implements OrgDetailDAO {

	private final SqlSessionTemplate sqlSession;

	// 생성자 주입
	public OrgDetailDAOImpl(SqlSessionTemplate sqlSession) {
		this.sqlSession = sqlSession;
	}

	@Override
	public String selectOrgIdByUserId(String userId) {
		return sqlSession.selectOne("com.Semicolon.org.dao.OrgDetailDAO.selectOrgIdByUserId", userId);
	}

	@Override
	public OrgDetailDTO selectOrgByIdAndUserId(String orId, String userId) {
		// Mapper에 두 개 이상의 파라미터를 전달하기 위해 Map을 사용
		Map<String, String> params = new HashMap<>();
		params.put("orId", orId);
		params.put("userId", userId);
		return sqlSession.selectOne("com.Semicolon.org.dao.OrgDetailDAO.selectOrgByIdAndUserId", params);
	}

	@Override
	public void updateOrg(OrgDetailDTO org) {
		sqlSession.update("com.Semicolon.org.dao.OrgDetailDAO.updateOrg", org);
	}

	@Override
	public void deleteOrg(String orId) {
		// Mapper에서 update를 사용하므로 여기서도 update 메소드 호출
		sqlSession.update("com.Semicolon.org.dao.OrgDetailDAO.deleteOrg", orId);
	}
}