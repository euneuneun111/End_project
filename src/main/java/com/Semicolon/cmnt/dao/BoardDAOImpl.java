package com.Semicolon.cmnt.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;

import com.Semicolon.cmnt.command.PageMaker;
import com.Semicolon.cmnt.dto.BoardVO;

public class BoardDAOImpl implements BoardDAO{
	
private SqlSession session;
	
	public BoardDAOImpl(SqlSession session) {
		this.session = session;
	}

	@Override
	public List<BoardVO> selectSearchBoardList(PageMaker pageMaker) throws SQLException {
		int offset = pageMaker.getStartRow()-1;
		int limit = pageMaker.getPerPageNum();
		RowBounds bounds = new RowBounds(offset,limit);
		
		List<BoardVO> boardList = session.selectList("Board-Mapper.selectSearchBoardList",pageMaker,bounds);
		
		return boardList;
	}

	@Override
	public int selectSearchBoardListCount(PageMaker pageMaker) throws SQLException {
		int count = session.selectOne("Board-Mapper.selectSearchBoardListCount",pageMaker);
		return count;
	}

	@Override
	public BoardVO selectBoardByFno(int fno) throws SQLException {
		BoardVO board = session.selectOne("Board-Mapper.selectBoardByFno",fno);
		return board;
	}

	@Override
	public void insertBoard(BoardVO board) throws SQLException {
		session.insert("Board-Mapper.insertBoard",board);
	}

	@Override
	public void updateBoard(BoardVO board) throws SQLException {
		session.update("Board-Mapper.updateBoard",board);		
	}

	@Override
	public void deleteBoard(int fno) throws SQLException {
		session.delete("Board-Mapper.deleteBoard",fno);		
	}

	@Override
	public void increaseViewCnt(int fno) throws SQLException {
		session.update("Board-Mapper.increaseViewCnt",fno);		
	}

	@Override
	public int selectBoardSeqNext() throws SQLException {
		int fno = session.selectOne("Board-Mapper.selectBoardSeqNext");
		return fno;
	}
}
