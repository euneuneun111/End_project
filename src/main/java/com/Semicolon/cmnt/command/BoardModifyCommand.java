package com.Semicolon.cmnt.command;

import com.Semicolon.cmnt.dto.BoardVO;
import com.Semicolon.cmnt.dto.Recruit_BoardVO;

public class BoardModifyCommand extends BoardRegistCommand{

	private int fno;
	private int rno;

	public int getFno() {
		return fno;
	}

	public void setFno(int fno) {
		this.fno = fno;
	}
	
	public BoardVO toBoardVO() {
		BoardVO board = super.toBoard();
		
		board.setFno(fno);
		
		return board;
	}

	public int getRno() {
		return rno;
	}

	public void setRno(int rno) {
		this.rno = rno;
	}
	
	public Recruit_BoardVO toRecruit_BroadVO() {
		Recruit_BoardVO board = super.toRecruit_Board();
		
		board.setRno(rno);
		
		return board;
	}
}
