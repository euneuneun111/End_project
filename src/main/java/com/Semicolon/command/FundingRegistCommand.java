package com.Semicolon.command;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.Semicolon.dto.FundingVO;

public class FundingRegistCommand {

	private String title;
	private String content;
	private String writer;
	
	private String startDate;
	private String endDate;
	private int tgMoney;
	
	private List<MultipartFile> uploadFile;

	public String getTitle() {
		return title;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public int getTgMoney() {
		return tgMoney;
	}

	public void setTgMoney(int tgMoney) {
		this.tgMoney = tgMoney;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public List<MultipartFile> getUploadFile() {
		return uploadFile;
	}

	public void setUploadFile(List<MultipartFile> uploadFile) {
		this.uploadFile = uploadFile;
	}

	public FundingVO toFundingVO() throws ParseException{
		FundingVO funding = new FundingVO();

		funding.setContent(this.content);
		funding.setTitle(this.title);
		funding.setWriter(this.writer);
		funding.setStartDate(new SimpleDateFormat("yyyy-MM-dd").parse(this.startDate));
		funding.setEndDate(new SimpleDateFormat("yyyy-MM-dd").parse(this.endDate));
		funding.setTgMoney(this.tgMoney);

		return funding;
	}
}
