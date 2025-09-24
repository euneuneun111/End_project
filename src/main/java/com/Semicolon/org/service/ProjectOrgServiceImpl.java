package com.Semicolon.org.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Semicolon.org.dao.ProjectOrgDAO;
import com.Semicolon.org.dto.ProjectOrgDTO;

@Service
public class ProjectOrgServiceImpl implements ProjectOrgService {

	private ProjectOrgDAO projectOrgDAO;

	public ProjectOrgServiceImpl(ProjectOrgDAO projectOrgDAO) {
		this.projectOrgDAO = projectOrgDAO;

	}

	@Override
	public List<ProjectOrgDTO> getProjectList() {
		return projectOrgDAO.selectProjectList();
	}

	@Override
	public void insertProject(ProjectOrgDTO projectOrgDTO) {
		projectOrgDAO.insertProject(projectOrgDTO);
	}

	@Override
	public ProjectOrgDTO getProjectDetail(String projectId) {
		return projectOrgDAO.selectProjectDetail(projectId);
	}

	@Override
	public int getProjectSeq() {
		return projectOrgDAO.getProjectSeq();
	}

	@Override
	public List<ProjectOrgDTO> getProjectsByUser(String username) {
	    return projectOrgDAO.selectProjectsByUser(username);
	}

	@Override
	public List<ProjectOrgDTO> searchProjectsByName(String projectName) {
		 return projectOrgDAO.searchProjectsByName(projectName);
	}

}