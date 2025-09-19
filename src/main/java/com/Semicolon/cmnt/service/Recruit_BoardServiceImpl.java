package com.Semicolon.cmnt.service;

import java.io.File;
import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.Semicolon.cmnt.command.PageMaker;
import com.Semicolon.cmnt.dao.Recruit_BoardDAO;
import com.Semicolon.cmnt.dao.ReplyDAO;
import com.Semicolon.cmnt.dto.Recruit_BoardVO;

@Service
public class Recruit_BoardServiceImpl implements Recruit_BoardService{

	private Recruit_BoardDAO recruit_boardDAO;
	private String summernotePath;
	private ReplyDAO replyDAO;
	
	public Recruit_BoardServiceImpl(Recruit_BoardDAO recruit_boardDAO,String summernotePath,ReplyDAO replyDAO) {
		this.summernotePath = summernotePath;
		this.recruit_boardDAO = recruit_boardDAO;
		this.replyDAO = replyDAO;
	}

	@Override
	public List<Recruit_BoardVO> list(PageMaker pageMaker) throws SQLException {
		List<Recruit_BoardVO> boardList = recruit_boardDAO.selectSearchBoardList(pageMaker);
		
		int totalCount = recruit_boardDAO.selectSearchBoardListCount(pageMaker);
		pageMaker.setTotalCount(totalCount);
		
		// reply count 입력
		for (Recruit_BoardVO board : boardList) {
			int replycnt = replyDAO.countReply(board.getRno());
			board.setReplycnt(replycnt);
		}
		
		return boardList;
	}

	@Override
	public Recruit_BoardVO detail(int rno) throws SQLException {
		recruit_boardDAO.increaseViewCnt(rno);
		return recruit_boardDAO.selectBoardByRno(rno);
	}

	@Override
	public void regist(Recruit_BoardVO board) throws SQLException {
		
		int rno = recruit_boardDAO.selectBoardSeqNext();
		
		board.setRno(rno);
		
		recruit_boardDAO.insertBoard(board);		
	}

	@Override
	public void modify(Recruit_BoardVO board) throws SQLException {
		recruit_boardDAO.updateBoard(board);		
	}

	@Override
	public Recruit_BoardVO getBoard(int rno) throws SQLException {		
		return recruit_boardDAO.selectBoardByRno(rno);
	}

	@Override
	public void remove(int rno) throws SQLException {
		
		Recruit_BoardVO board = recruit_boardDAO.selectBoardByRno(rno);
		
		File dir = new File(summernotePath);
		File[] files = dir.listFiles();
		if(files!=null) for(File file : files) {
			if(board.getContent().contains(file.getName())) {
				file.delete();
			}
		}
		
		recruit_boardDAO.deleteBoard(rno);
	}
}