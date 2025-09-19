package com.Semicolon.org.dto;

import java.util.Date;

public class ProjectOrgDTO {

    private String projectId;        // PROJECT_ID VARCHAR2(50)
    private String projectName;      // PROJECT_NAME VARCHAR2(40)
    private String projectLogo;      // DB에 저장될 파일명 (ex: UUID$$originalName)
    private String logoUploadPath;   // 서버에 저장된 경로
    private String projectManager;   // PROJECT_MANAGER VARCHAR2(200)
    private Date projectStartDate = new Date(); // PROJECT_START_DATE DATE
    private String projectDesc;      // PROJECT_DESC VARCHAR2(400)


    // 기본 생성자
    public ProjectOrgDTO() {}

    // getter / setter
    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectLogo() {
        return projectLogo;
    }

    public void setProjectLogo(String projectLogo) {
        this.projectLogo = projectLogo;
    }

    public String getLogoUploadPath() {
        return logoUploadPath;
    }

    public void setLogoUploadPath(String logoUploadPath) {
        this.logoUploadPath = logoUploadPath;
    }

    public String getProjectManager() {
        return projectManager;
    }

    public void setProjectManager(String projectManager) {
        this.projectManager = projectManager;
    }

    public Date getProjectStartDate() {
        return projectStartDate;
    }

    public void setProjectStartDate(Date projectStartDate) {
        this.projectStartDate = projectStartDate;
    }

    public String getProjectDesc() {
        return projectDesc;
    }

    public void setProjectDesc(String projectDesc) {
        this.projectDesc = projectDesc;
    }
    


}
