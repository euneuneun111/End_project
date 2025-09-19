package com.Semicolon.cmnt.dto;

import java.util.Date;

public class BoardVO {
	private int fno;          // 게시판번호
	private String title="";     // 제목
	private String eng_id;	  // 작성자 (회원)
	private String content="";   // 내용 (html)
	private int view_cnt=0;      // 조회수
	private Date reg_Date=new Date();     // 등록날짜
	
	private int replycnt; // 댓글 개수

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

	public String getEng_id() {
		return eng_id;
	}

	public void setEng_id(String eng_id) {
		this.eng_id = eng_id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getView_cnt() {
		return view_cnt;
	}

	public void setView_cnt(int view_cnt) {
		this.view_cnt = view_cnt;
	}

	public Date getReg_Date() {
		return reg_Date;
	}

	public void setReg_Date(Date reg_Date) {
		this.reg_Date = reg_Date;
	}

	public int getReplycnt() {
		return replycnt;
	}

	public void setReplycnt(int replycnt) {
		this.replycnt = replycnt;
	}
	
	
}
