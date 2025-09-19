package com.Semicolon.org.dao;

import java.util.List;
import com.Semicolon.org.dto.ProjectOrgDTO;

public interface ProjectOrgDAO {

    /** 프로젝트 목록 조회 */
    List<ProjectOrgDTO> selectProjectList();

    /** 프로젝트 생성 */
    void insertProject(ProjectOrgDTO projectOrgDTO);

    /** 프로젝트 상세 조회 */
    ProjectOrgDTO selectProjectDetail(String projectId);
    
    int getProjectSeq();  // 시퀀스 조회
    


}