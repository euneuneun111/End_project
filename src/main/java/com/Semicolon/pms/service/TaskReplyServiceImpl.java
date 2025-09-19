// com.Semicolon.pms.service.TaskReplyServiceImpl.java

package com.Semicolon.pms.service;

import java.util.List;
import com.Semicolon.pms.dao.TaskReplyDAO;
import com.Semicolon.pms.dto.TaskReplyDTO;

public class TaskReplyServiceImpl implements TaskReplyService {

    private TaskReplyDAO taskReplyDAO;
    public void setTaskReplyDAO(TaskReplyDAO taskReplyDAO) {
        this.taskReplyDAO = taskReplyDAO;
    }

    @Override
    public List<TaskReplyDTO> getReplyList(String taskId) throws Exception {
        return taskReplyDAO.selectReplyList(taskId);
    }

    @Override
    public void registerReply(TaskReplyDTO dto) throws Exception {
        taskReplyDAO.insertReply(dto);
    }

    @Override
    public void modifyReply(TaskReplyDTO dto) throws Exception {
        taskReplyDAO.updateReply(dto);
    }

    @Override
    public void removeReply(String replyNumber) throws Exception {
        taskReplyDAO.deleteReply(replyNumber);
    }
}