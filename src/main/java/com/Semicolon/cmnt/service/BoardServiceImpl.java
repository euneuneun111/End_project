package com.Semicolon.cmnt.service;

import java.io.File;
import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.Semicolon.cmnt.command.PageMaker;
import com.Semicolon.cmnt.dao.BoardDAO;
import com.Semicolon.cmnt.dao.ReplyDAO;
import com.Semicolon.cmnt.dto.BoardVO;

@Service
public class BoardServiceImpl implements BoardService{

	private BoardDAO boardDAO;
	private String summernotePath;
	private ReplyDAO replyDAO;
	
	public BoardServiceImpl(BoardDAO boardDAO,String summernotePath,ReplyDAO replyDAO) {
		this.summernotePath = summernotePath;
		this.boardDAO = boardDAO;
		this.replyDAO = replyDAO;
	}

	@Override
	public List<BoardVO> list(PageMaker pageMaker) throws SQLException {
		List<BoardVO> boardList = boardDAO.selectSearchBoardList(pageMaker);
		
		int totalCount = boardDAO.selectSearchBoardListCount(pageMaker);
		pageMaker.setTotalCount(totalCount);
		
		// reply count 입력
		for (BoardVO board : boardList) {
			int replycnt = replyDAO.countReply(board.getFno());
			board.setReplycnt(replycnt);
		}
		
		return boardList;
	}

	@Override
	public BoardVO detail(int fno) throws SQLException {
		boardDAO.increaseViewCnt(fno);
		return boardDAO.selectBoardByFno(fno);
	}

	@Override
	public void regist(BoardVO board) throws SQLException {
		
		int fno = boardDAO.selectBoardSeqNext();
		
		board.setFno(fno);
		
		boardDAO.insertBoard(board);		
	}

	@Override
	public void modify(BoardVO board) throws SQLException {
		boardDAO.updateBoard(board);		
	}

	@Override
	public BoardVO getBoard(int fno) throws SQLException {		
		return boardDAO.selectBoardByFno(fno);
	}

	@Override
	public void remove(int fno) throws SQLException {
		
		BoardVO board = boardDAO.selectBoardByFno(fno);
		
		File dir = new File(summernotePath);
		File[] files = dir.listFiles();
		if(files!=null) for(File file : files) {
			if(board.getContent().contains(file.getName())) {
				file.delete();
			}
		}
		
		boardDAO.deleteBoard(fno);
	}
}