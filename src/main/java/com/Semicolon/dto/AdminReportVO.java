package com.Semicolon.dto;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

public class AdminReportVO {

	private int reportId; 


	private int fno; // funding 번호
	private String reason; // 신고 사유
	private String content; // 상세 내용
	private Date reportDate = new Date(); // 보고 일자
	private String writer;

	private MultipartFile pictureFile; // 업로드 객체, 서버 저장용
	public int getReportId() {
		return reportId;
	}
	public void setReportId(int reportId) {
		this.reportId = reportId;
	}
	public int getFno() {
		return fno;
	}
	public void setFno(int fno) {
		this.fno = fno;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getReportDate() {
		return reportDate;
	}
	public void setReportDate(Date reportDate) {
		this.reportDate = reportDate;
	}
	public MultipartFile getPictureFile() {
		return pictureFile;
	}
	public void setPictureFile(MultipartFile pictureFile) {
		this.pictureFile = pictureFile;
	}

	public String getWriter() {
		return writer;
	}
	public void setWriter(String writer) {
		this.writer = writer;
	}

	
	
	
}
