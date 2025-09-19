package com.Semicolon.cmnt.command;

import com.Semicolon.cmnt.dto.BoardVO;
import com.Semicolon.cmnt.dto.Recruit_BoardVO;

public class BoardRegistCommand {

	private String eng_id;
	private String title;
	private String content;
	private String or_id;
	
	
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
	
	public String getOr_id() {
		return or_id;
	}
	public void setOr_id(String or_id) {
		this.or_id = or_id;
	}
	
	public Recruit_BoardVO toRecruit_Board() {
		Recruit_BoardVO board = new Recruit_BoardVO();
		
		board.setContent(content);
		board.setTitle(title);
		board.setOr_id(or_id);
		
		return board;
	}
}









