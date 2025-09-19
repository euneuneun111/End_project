package com.Semicolon.cmnt.command;

import com.Semicolon.cmnt.dto.BoardVO;

public class Recruit_BoardModifyCommand extends BoardRegistCommand{

	private int fno;

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
}
