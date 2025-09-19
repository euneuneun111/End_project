package com.Semicolon.pms.dto;

import java.util.Date;
import java.util.List;

public class TaskDto {
    private String taskId;          // task_id
    private String projectId;       // project_id
    private String taskTitle;       // task_title
    private String taskManagerId;   // task_manager_id
    private String taskStatus;      // task_status
    private Date taskStartDate;     // task_start_date
    private Date taskEndDate;       // task_end_date
    private String taskDescription; // task_description
    private Date taskRegDate;       // task_reg_date
    private String taskUrgency;     // task_urgency
    private Date taskModifyDate;    // task_modify_date
    private int taskProgress;
    // 일감에 달린 댓글 목록
    private List<TaskReplyDTO> comments;

    // Getters and Setters

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getTaskTitle() {
        return taskTitle;
    }

    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
    }

    public String getTaskManagerId() {
        return taskManagerId;
    }

    public void setTaskManagerId(String taskManagerId) {
        this.taskManagerId = taskManagerId;
    }

    public String getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(String taskStatus) {
        this.taskStatus = taskStatus;
    }

    public Date getTaskStartDate() {
        return taskStartDate;
    }

    public void setTaskStartDate(Date taskStartDate) {
        this.taskStartDate = taskStartDate;
    }

    public Date getTaskEndDate() {
        return taskEndDate;
    }

    public void setTaskEndDate(Date taskEndDate) {
        this.taskEndDate = taskEndDate;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public Date getTaskRegDate() {
        return taskRegDate;
    }

    public void setTaskRegDate(Date taskRegDate) {
        this.taskRegDate = taskRegDate;
    }

    public String getTaskUrgency() {
        return taskUrgency;
    }

    public void setTaskUrgency(String taskUrgency) {
        this.taskUrgency = taskUrgency;
    }

    public Date getTaskModifyDate() {
        return taskModifyDate;
    }

    public void setTaskModifyDate(Date taskModifyDate) {
        this.taskModifyDate = taskModifyDate;
    }

    public List<TaskReplyDTO> getComments() {
        return comments;
    }

    public void setComments(List<TaskReplyDTO> comments) {
        this.comments = comments;
    }
    public int getTaskProgress() {
        return taskProgress;
    }

    public void setTaskProgress(int taskProgress) {
        this.taskProgress = taskProgress;
    }
}