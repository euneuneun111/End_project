package com.Semicolon.org.command;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.Semicolon.org.dto.ProjectOrgDTO;

/**
 * 프로젝트 생성용 Command 객체
 * form 데이터를 DTO보다 유연하게 받기 위해 사용
 */
public class ProjectCreateCommand {

	private String projectId;
    private String projectName;          // 프로젝트 이름
    private MultipartFile projectLogo;  
    private String projectDesc;          // 프로젝트 설명
    private String projectStartDate;  
    // 프로젝트 시작일
    private List<String> projectManager; // 선택된 멤버 리스트

    // ---------------- getters & setters ----------------
    
    public String getProjectName() {
        return projectName;
    }

    public String getProjectId() {
		return projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

	public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public MultipartFile getProjectLogo() {
		return projectLogo;
	}

	public void setProjectLogo(MultipartFile projectLogo) {
		this.projectLogo = projectLogo;
	}

	public String getProjectDesc() {
        return projectDesc;
    }

    public void setProjectDesc(String projectDesc) {
        this.projectDesc = projectDesc;
    }

  

    public String getProjectStartDate() {
		return projectStartDate;
	}

	public void setProjectStartDate(String projectStartDate) {
		this.projectStartDate = projectStartDate;
	}

	public List<String> getProjectManager() {
        return projectManager;
    }

    public void setProjectManager(List<String> projectManager) {
        this.projectManager = projectManager;
    }

    public ProjectOrgDTO toProjectOrgDTO() throws ParseException {
        ProjectOrgDTO projectorg = new ProjectOrgDTO();

        projectorg.setProjectId(this.projectId);
        projectorg.setProjectName(this.projectName);

        // MultipartFile → 파일명
        if (this.projectLogo != null && !this.projectLogo.isEmpty()) {
            projectorg.setProjectLogo(this.projectLogo.getOriginalFilename());
        }

        // List<String> → String 변환
        if (this.projectManager != null) {
            projectorg.setProjectManager(String.join(",", this.projectManager));
        }

        // String → java.util.Date 변환
        if (this.projectStartDate != null && !this.projectStartDate.isEmpty()) {
            projectorg.setProjectStartDate(
                new SimpleDateFormat("yyyy-MM-dd").parse(this.projectStartDate)
            );
        }

        projectorg.setProjectDesc(this.projectDesc);

        return projectorg; 
    }
}