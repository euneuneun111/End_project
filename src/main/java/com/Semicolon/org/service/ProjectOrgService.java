package com.Semicolon.org.service;

import java.util.List;
import com.Semicolon.org.dto.ProjectOrgDTO;

public interface ProjectOrgService {

    /** 프로젝트 목록 조회 */
    List<ProjectOrgDTO> getProjectList();

    /** 프로젝트 생성 */
    void insertProject(ProjectOrgDTO projectOrgDTO);

    /** 프로젝트 상세 조회 */
    ProjectOrgDTO getProjectDetail(String projectId);
    
    /** 프로젝트 시퀀스 조회 (PRJ-xxx ID용) */
    int getProjectSeq();
    
    
    List<ProjectOrgDTO> getProjectsByUser(String username);
    
    List<ProjectOrgDTO> searchProjectsByName(String projectName);


}