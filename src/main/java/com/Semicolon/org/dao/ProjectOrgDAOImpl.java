package com.Semicolon.org.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.Semicolon.org.dto.ProjectOrgDTO;

@Repository
public class ProjectOrgDAOImpl implements ProjectOrgDAO {

	private SqlSession session;

	// 생성자 주입
	public ProjectOrgDAOImpl(SqlSessionTemplate sqlSession) {
		this.session = sqlSession;
	}

	/** 프로젝트 목록 조회 */
	@Override
	public List<ProjectOrgDTO> selectProjectList() {
		return session.selectList("ProjectOrg-Mapper.selectAllProjects");
	}

	/** 프로젝트 등록 */
	@Override
	public void insertProject(ProjectOrgDTO projectOrgDTO) {
		session.insert("ProjectOrg-Mapper.insertProject", projectOrgDTO);
	}

	/** 프로젝트 상세 조회 */
	@Override
	public ProjectOrgDTO selectProjectDetail(String projectId) {
		return session.selectOne("ProjectOrg-Mapper.selectProjectDetail", projectId);
	}

	@Override
	public int getProjectSeq() {
		return session.selectOne("ProjectOrg-Mapper.getProjectSeq");
	}

	@Override
	public List<ProjectOrgDTO> selectProjectsByUser(String username) {
		return session.selectList("ProjectOrg-Mapper.selectProjectsByUser", username);
	}

	@Override
	public List<ProjectOrgDTO> searchProjectsByName(String projectName) {
		return session.selectList("ProjectOrg-Mapper.searchProjectsByName", projectName);
	}

}