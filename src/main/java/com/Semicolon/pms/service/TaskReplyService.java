// src/main/java/com/Semicolon/pms/service/IssueReplyService.java

package com.Semicolon.pms.service;

import java.util.List;
import com.Semicolon.pms.dto.TaskReplyDTO;

public interface TaskReplyService {

    List<TaskReplyDTO> getReplyList(String taskId) throws Exception;
    void registerReply(TaskReplyDTO dto) throws Exception;
    void modifyReply(TaskReplyDTO dto) throws Exception;
    void removeReply(String replyNumber) throws Exception; // int -> String
}