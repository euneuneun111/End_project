// src/main/java/com/Semicolon/pms/service/IssueService.java
package com.Semicolon.pms.service;

import com.Semicolon.pms.dto.IssueDto;
import com.Semicolon.command.PageMaker;
import java.sql.SQLException;
import java.util.List;

public interface IssueService {

    List<IssueDto> getIssueList(PageMaker pageMaker) throws SQLException;
    int getTotalCount(PageMaker pageMaker) throws SQLException;
    void createNewIssue(IssueDto issue) throws SQLException;
    IssueDto getIssueById(String issueId) throws SQLException;
    void updateIssue(IssueDto issue) throws SQLException;
    void deleteIssue(String issueId) throws SQLException;
}