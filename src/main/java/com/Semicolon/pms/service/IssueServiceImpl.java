// src/main/java/com/Semicolon/pms/service/IssueServiceImpl.java
package com.Semicolon.pms.service;

import java.sql.SQLException;
import java.util.List;
import com.Semicolon.command.PageMaker;
import com.Semicolon.pms.dao.IssueDAO;
import com.Semicolon.pms.dao.IssueReplyDAO; // ReplyDAO -> IssueReplyDAO
import com.Semicolon.pms.dto.IssueDto;
import com.Semicolon.pms.dto.IssueReplyDTO; // ReplyDto -> IssueReplyDTO

public class IssueServiceImpl implements IssueService {
    
    private IssueDAO issueDAO;
    private IssueReplyDAO issueReplyDAO; // 타입 변경

    public IssueServiceImpl(IssueDAO issueDAO, IssueReplyDAO issueReplyDAO) { // 생성자 변경
        this.issueDAO = issueDAO;
        this.issueReplyDAO = issueReplyDAO;
    }

    @Override
    public List<IssueDto> getIssueList(PageMaker pageMaker) throws SQLException {
        return issueDAO.getIssueListByProjectId(pageMaker);
    }
    
    @Override
    public int getTotalCount(PageMaker pageMaker) throws SQLException {
        return issueDAO.getTotalCountByProjectId(pageMaker);
    }
    
    @Override
    public void createNewIssue(IssueDto issue) throws SQLException {
        issueDAO.insertNewIssue(issue);
    }
    
    @Override
    public IssueDto getIssueById(String issueId) throws SQLException {
        IssueDto issue = issueDAO.getIssueById(issueId);
        if (issue != null) {
            // DAO와 DTO 타입에 맞게 수정
            List<IssueReplyDTO> replies = issueReplyDAO.selectReplyList(issueId);
            issue.setComments(replies);
        }
        return issue;
    }
    
    @Override
    public void updateIssue(IssueDto issue) throws SQLException {
        issueDAO.updateIssue(issue);
    }
    
    @Override
    public void deleteIssue(String issueId) throws SQLException {
        // 이슈 삭제 전, 해당 이슈에 달린 모든 댓글을 먼저 삭제
        issueReplyDAO.deleteRepliesByIssueId(issueId);
        issueDAO.deleteIssue(issueId);
    }
}