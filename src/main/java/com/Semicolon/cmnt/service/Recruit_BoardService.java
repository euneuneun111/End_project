package com.Semicolon.cmnt.service;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.cmnt.command.PageMaker;
import com.Semicolon.cmnt.dto.BoardVO;
import com.Semicolon.cmnt.dto.Recruit_BoardVO;

public interface Recruit_BoardService {

	// 목록 : 검색포함.
		List<Recruit_BoardVO> list(PageMaker pageMaker) throws SQLException;
			
		// 상세 : 조회수 증가
		Recruit_BoardVO detail(int rno) throws SQLException;
			
		// 등록
		void regist(Recruit_BoardVO recruit_board)throws SQLException;
		
		// 수정
		void modify(Recruit_BoardVO recruit_board)throws SQLException;
		Recruit_BoardVO getBoard(int rno)throws SQLException;
		
		// 삭제
		void remove(int rno)throws SQLException;
}
