package com.Semicolon.command;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.springframework.web.multipart.MultipartFile;

import com.Semicolon.dto.AdminReportVO;

public class AdminreportRegistCommand {

	private int fno; // funding 번호
	private String reason; // 신고 사유
	private String content; // 상세 내용
	private String reportDate;
	private MultipartFile pictureFile; // 업로드 객체
	
	private String writer;

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



	public String getReportDate() {
		return reportDate;
	}



	public void setReportDate(String reportDate) {
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



	public AdminReportVO toAdminReportVO() throws ParseException {
	    AdminReportVO report = new AdminReportVO();

	    report.setContent(this.content);
	    report.setFno(this.fno);
	    report.setReason(this.reason);
	    report.setReportDate(new SimpleDateFormat("yyyy-MM-dd").parse(this.reportDate));
	    report.setWriter(this.writer);

	    // 파일 객체와 DB용 파일명 세팅
	    report.setPictureFile(this.pictureFile); 


	    return report;
	}



}
