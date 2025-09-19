package com.Semicolon.pms.dao;

import java.sql.SQLException; // SQLException 임포트
import java.util.List;
import com.Semicolon.pms.dto.TaskReplyDTO;

public interface TaskReplyDAO {

    // 모든 메서드에서 throws Exception -> throws SQLException 으로 변경
    List<TaskReplyDTO> selectReplyList(String taskId) throws SQLException;
    void insertReply(TaskReplyDTO dto) throws SQLException;
    void updateReply(TaskReplyDTO dto) throws SQLException;
    void deleteReply(String replyNumber) throws SQLException;
    void deleteRepliesByTaskId(String TaskId) throws SQLException;
}