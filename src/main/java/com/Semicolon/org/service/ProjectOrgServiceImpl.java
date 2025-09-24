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

	 @Override
	    public boolean joinProject(String projectId, String username) {
	        ProjectOrgDTO project = projectOrgDAO.selectProjectDetail(projectId);
	        if (project == null) return false;

	        String managers = project.getProjectManager();
	        if (managers != null && ("," + managers + ",").contains("," + username + ",")) {
	            // 이미 참여한 경우
	            return false;
	        }

	        // 참여자 추가
	        String updatedManagers = (managers == null || managers.isEmpty())
	                ? username
	                : managers + "," + username;

	        project.setProjectManager(updatedManagers);
	        projectOrgDAO.updateProject(project); // DB 반영

	        return true;
	    }

	 @Override
	 public boolean leaveProject(String projectId, String username) {
	     ProjectOrgDTO project = projectOrgDAO.selectProjectDetail(projectId);
	     if (project == null) return false;

	     String managers = project.getProjectManager();
	     if (managers == null || managers.isEmpty()) return false;

	     // 콤마로 분리 → 리스트로 변환
	     List<String> managerList = new java.util.ArrayList<>(
	         java.util.Arrays.asList(managers.split(",")));

	     // 해당 username 제거
	     boolean removed = managerList.removeIf(user -> user.trim().equals(username));
	     if (!removed) return false; // 해당 사용자가 없으면 false 반환

	     // 다시 콤마로 join
	     String updatedManagers = String.join(",", managerList);
	     project.setProjectManager(updatedManagers);

	     // DB 반영
	     projectOrgDAO.updateProject(project);

	     return true;
	 }
}