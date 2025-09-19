// src/main/java/com/Semicolon/pms/dao/IssueDAO.java

package com.Semicolon.pms.dao;

import com.Semicolon.pms.dto.IssueDto;
import com.Semicolon.command.PageMaker;
import java.sql.SQLException;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface IssueDAO {
    // 특정 프로젝트의 이슈를 페이징 및 검색 조건에 따라 조회
    List<IssueDto> getIssueListByProjectId(@Param("pageMaker") PageMaker pageMaker) throws SQLException;
    
    // 특정 프로젝트의 전체 이슈 수를 조회 (검색 조건 포함)
    int getTotalCountByProjectId(@Param("pageMaker") PageMaker pageMaker) throws SQLException;
    
    // 새 이슈 등록
    void insertNewIssue(IssueDto issue) throws SQLException;
    
    // 이슈 상세 정보 조회
    IssueDto getIssueById(@Param("issueId") String issueId) throws SQLException;
    
    // 이슈 수정
    void updateIssue(IssueDto issue) throws SQLException;
    
    // 이슈 삭제
    void deleteIssue(@Param("issueId") String issueId) throws SQLException;
}
