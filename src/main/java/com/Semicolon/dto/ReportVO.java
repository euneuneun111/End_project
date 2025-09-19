package com.Semicolon.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ReportVO {
	
	private String projectId; // 프로젝트 ID

	
	private int rno;          // 보고 번호
	private String title="";     // 제목
	private String writer;	  // 작성자 
	private String content="";   // 내용
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date regDate= new Date();     // 등록날짜
	private Date reportDate = new Date(); // 보고 일자
	
	private boolean check; // 관리자 확인

	List<AttachReportVO> attaches;
	
	

	public String getProjectId() {
		return projectId;
	}


	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}


	public int getRno() {
		return rno;
	}


	public void setRno(int rno) {
		this.rno = rno;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getWriter() {
		return writer;
	}


	public void setWriter(String writer) {
		this.writer = writer;
	}


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public Date getRegDate() {
		return regDate;
	}


	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}


	public Date getReportDate() {
		return reportDate;
	}


	public void setReportDate(Date reportDate) {
		this.reportDate = reportDate;
	}


//	public boolean ischeck() {
//		return check;
//	}

	public String getcheck() {
		return String.valueOf(this.check);
	}

	public void setPmcheck(boolean check) {
		this.check = check;
	}


	public List<AttachReportVO> getAttaches() {
		return attaches;
	}


	public void setAttaches(List<AttachReportVO> attaches) {
		this.attaches = attaches;
	}

}