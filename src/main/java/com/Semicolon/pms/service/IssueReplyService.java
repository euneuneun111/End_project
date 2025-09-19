package com.Semicolon.pms.service;

import java.sql.SQLException;
import java.util.List;
import com.Semicolon.pms.dto.IssueReplyDTO;

public interface IssueReplyService {
    List<IssueReplyDTO> selectReplyList(String issueId) throws SQLException;
    void insertReply(IssueReplyDTO dto) throws SQLException;
    void updateReply(IssueReplyDTO dto) throws SQLException;
    void deleteReply(String replyNumber) throws SQLException;
}