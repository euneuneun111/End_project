package com.Semicolon.cmnt.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;

import com.Semicolon.cmnt.command.PageMaker;
import com.Semicolon.cmnt.dto.BoardVO;
import com.Semicolon.cmnt.dto.Recruit_BoardVO;

public class Recruit_BoardDAOImpl implements Recruit_BoardDAO{
	
private SqlSession session;
	
	public Recruit_BoardDAOImpl(SqlSession session) {
		this.session = session;
	}

	@Override
	public List<Recruit_BoardVO> selectSearchBoardList(PageMaker pageMaker) throws SQLException {
		int offset = pageMaker.getStartRow()-1;
		int limit = pageMaker.getPerPageNum();
		RowBounds bounds = new RowBounds(offset,limit);
		
		List<Recruit_BoardVO> boardList = session.selectList("Recruit_Board-Mapper.selectSearchBoardList",pageMaker,bounds);
		
		return boardList;
	}

	@Override
	public int selectSearchBoardListCount(PageMaker pageMaker) throws SQLException {
		int count = session.selectOne("Recruit_Board-Mapper.selectSearchBoardListCount",pageMaker);
		return count;
	}

	@Override
	public Recruit_BoardVO selectBoardByRno(int rno) throws SQLException {
		Recruit_BoardVO board = session.selectOne("Recruit_Board-Mapper.selectBoardByFno",rno);
		return board;
	}

	@Override
	public void insertBoard(Recruit_BoardVO board) throws SQLException {
		session.insert("Recruit_Board-Mapper.insertBoard",board);
	}

	@Override
	public void updateBoard(Recruit_BoardVO board) throws SQLException {
		session.update("Recruit_Board-Mapper.updateBoard",board);		
	}

	@Override
	public void deleteBoard(int rno) throws SQLException {
		session.delete("Recruit_Board-Mapper.deleteBoard",rno);		
	}

	@Override
	public void increaseViewCnt(int rno) throws SQLException {
		session.update("Recruit_Board-Mapper.increaseViewCnt",rno);		
	}

	@Override
	public int selectBoardSeqNext() throws SQLException {
		int rno = session.selectOne("Recruit_Board-Mapper.selectBoardSeqNext");
		return rno;
	}
}
