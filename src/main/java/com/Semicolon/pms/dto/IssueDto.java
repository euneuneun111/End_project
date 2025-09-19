// src/main/java/com/Semicolon/pms/dto/IssueDto.java
package com.Semicolon.pms.dto;

import java.util.Date;
import java.util.List;

public class IssueDto {
    private String issueId;
    private String projectId;
    private String issueTitle;
    private String issueContent;
    private String taskId;
    private String taskTitle; // taskTilte -> taskTitle 오타 수정
    private String issueStatus;
    private String issueCreatorId;
    private Date issueRegDate;
    private Date issueModifyDate;
    private Date issueDeleteDate;
    private String issueManagerId;
    private String issueUrgency;
    
    // ReplyDto -> IssueReplyDTO 로 변경
    private List<IssueReplyDTO> comments;

	public String getIssueId() {
		return issueId;
	}

	public void setIssueId(String issueId) {
		this.issueId = issueId;
	}

	public String getProjectId() {
		return projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

	public String getIssueTitle() {
		return issueTitle;
	}

	public void setIssueTitle(String issueTitle) {
		this.issueTitle = issueTitle;
	}

	public String getIssueContent() {
		return issueContent;
	}

	public void setIssueContent(String issueContent) {
		this.issueContent = issueContent;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getTaskTitle() {
		return taskTitle;
	}

	public void setTaskTitle(String taskTitle) {
		this.taskTitle = taskTitle;
	}

	public String getIssueStatus() {
		return issueStatus;
	}

	public void setIssueStatus(String issueStatus) {
		this.issueStatus = issueStatus;
	}

	public String getIssueCreatorId() {
		return issueCreatorId;
	}

	public void setIssueCreatorId(String issueCreatorId) {
		this.issueCreatorId = issueCreatorId;
	}

	public Date getIssueRegDate() {
		return issueRegDate;
	}

	public void setIssueRegDate(Date issueRegDate) {
		this.issueRegDate = issueRegDate;
	}

	public Date getIssueModifyDate() {
		return issueModifyDate;
	}

	public void setIssueModifyDate(Date issueModifyDate) {
		this.issueModifyDate = issueModifyDate;
	}

	public Date getIssueDeleteDate() {
		return issueDeleteDate;
	}

	public void setIssueDeleteDate(Date issueDeleteDate) {
		this.issueDeleteDate = issueDeleteDate;
	}

	public String getIssueManagerId() {
		return issueManagerId;
	}

	public void setIssueManagerId(String issueManagerId) {
		this.issueManagerId = issueManagerId;
	}

	public String getIssueUrgency() {
		return issueUrgency;
	}

	public void setIssueUrgency(String issueUrgency) {
		this.issueUrgency = issueUrgency;
	}

	public List<IssueReplyDTO> getComments() {
		return comments;
	}

	public void setComments(List<IssueReplyDTO> comments) {
		this.comments = comments;
	}

    
}