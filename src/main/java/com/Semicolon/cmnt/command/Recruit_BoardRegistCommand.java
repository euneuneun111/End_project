package com.Semicolon.cmnt.command;

import com.Semicolon.cmnt.dto.BoardVO;

public class Recruit_BoardRegistCommand {

	private String eng_id;
	private String title;
	private String content;
	
	
	public String getEng_id() {
		return eng_id;
	}
	public void setEng_id(String eng_id) {
		this.eng_id = eng_id;
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
	
	public BoardVO toBoard() {
		BoardVO board = new BoardVO();
		
		board.setContent(content);
		board.setTitle(title);
		board.setEng_id(eng_id);
		
		return board;
	}
}









