package com.Semicolon.pms.dao;

import java.sql.SQLException; // SQLException 임포트
import java.util.List;
import com.Semicolon.pms.dto.IssueReplyDTO;

public interface IssueReplyDAO {

    // 모든 메서드에서 throws Exception -> throws SQLException 으로 변경
    List<IssueReplyDTO> selectReplyList(String issueId) throws SQLException;
    void insertReply(IssueReplyDTO dto) throws SQLException;
    void updateReply(IssueReplyDTO dto) throws SQLException;
    void deleteReply(String replyNumber) throws SQLException;
    void deleteRepliesByIssueId(String issueId) throws SQLException;
}