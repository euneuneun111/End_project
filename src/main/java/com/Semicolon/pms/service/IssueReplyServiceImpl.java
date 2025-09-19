package com.Semicolon.pms.service;

import java.sql.SQLException;
import java.util.List;
import com.Semicolon.pms.dao.IssueReplyDAO;
import com.Semicolon.pms.dto.IssueReplyDTO;

public class IssueReplyServiceImpl implements IssueReplyService {

    // 생성자 주입 방식으로 변경
    private final IssueReplyDAO issueReplyDAO;
    public IssueReplyServiceImpl(IssueReplyDAO issueReplyDAO) {
        this.issueReplyDAO = issueReplyDAO;
    }

    // 메소드 이름 통일
    @Override
    public List<IssueReplyDTO> selectReplyList(String issueId) throws SQLException {
        return issueReplyDAO.selectReplyList(issueId);
    }

    @Override
    public void insertReply(IssueReplyDTO dto) throws SQLException {
        issueReplyDAO.insertReply(dto);
    }

    @Override
    public void updateReply(IssueReplyDTO dto) throws SQLException {
        issueReplyDAO.updateReply(dto);
    }

    @Override
    public void deleteReply(String replyNumber) throws SQLException {
        issueReplyDAO.deleteReply(replyNumber);
    }
}