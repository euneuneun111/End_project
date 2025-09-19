package com.Semicolon.cmnt.dao;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.cmnt.command.PageMaker;
import com.Semicolon.cmnt.dto.BoardVO;
import com.Semicolon.cmnt.dto.Recruit_BoardVO;

public interface Recruit_BoardDAO {

	List<Recruit_BoardVO> selectSearchBoardList(PageMaker pageMaker) throws SQLException;

	int selectSearchBoardListCount(PageMaker pageMaker) throws SQLException;

	Recruit_BoardVO selectBoardByRno(int rno) throws SQLException;

	void insertBoard(Recruit_BoardVO board) throws SQLException;

	void updateBoard(Recruit_BoardVO board) throws SQLException;

	void deleteBoard(int rno) throws SQLException;

	void increaseViewCnt(int rno) throws SQLException;

	int selectBoardSeqNext() throws SQLException;
}
