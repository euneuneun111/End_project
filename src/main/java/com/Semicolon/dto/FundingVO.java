package com.Semicolon.dto;

import java.util.Date;
import java.util.List;

public class FundingVO {

	private int fno;
	private String title;
	private String content;

	private String writer;
	private int viewcnt;
	private Date regDate = new Date();
	private Date startDate = new Date();
	private Date endDate = new Date();

	private int tgMoney;

	private int cmoney;

	private int heart;
	
	private List<AttachVO> attachList;

	public List<AttachVO> getAttachList() {
		return attachList;
	}

	public void setAttachList(List<AttachVO> attachList) {
		this.attachList = attachList;
	}

	public int getFno() {
		return fno;
	}

	public void setFno(int fno) {
		this.fno = fno;
	}

	public String getTitle() {
		return title;
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

	public int getViewcnt() {
		return viewcnt;
	}

	public void setViewcnt(int viewcnt) {
		this.viewcnt = viewcnt;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public int getTgMoney() {
		return tgMoney;
	}

	public void setTgMoney(int tgMoney) {
		this.tgMoney = tgMoney;
	}

	public int getCmoney() {
		return cmoney;
	}

	public void setCmoney(int cmoney) {
		this.cmoney = cmoney;
	}

	
	public int getHeart() {
		return heart;
	}

	public void setHeart(int heart) {
		this.heart = heart;
	}
}
