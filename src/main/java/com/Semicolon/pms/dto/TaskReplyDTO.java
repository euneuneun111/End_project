package com.Semicolon.pms.dto;

import java.util.Date;

public class TaskReplyDTO {

    private String replyNumber;  // 댓글 번호 (PK, VARCHAR2)
    private String taskId;      // 원본 이슈 ID (FK)
    private String userId;       // 작성자 ID
    private String replyContent; // 댓글 내용
    private Date regDate;        // 작성일
    private Date updateDate;     // 수정일
    private String engId;        // 개발자 ID
    private String groupId;      // 조직 ID
    
	public String getReplyNumber() {
		return replyNumber;
	}
	public void setReplyNumber(String replyNumber) {
		this.replyNumber = replyNumber;
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getReplyContent() {
		return replyContent;
	}
	public void setReplyContent(String replyContent) {
		this.replyContent = replyContent;
	}
	public Date getRegDate() {
		return regDate;
	}
	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	public String getEngId() {
		return engId;
	}
	public void setEngId(String engId) {
		this.engId = engId;
	}
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}
    
    
    
}
