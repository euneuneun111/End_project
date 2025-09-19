package com.Semicolon.cmnt.service;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.cmnt.command.PageMaker;
import com.Semicolon.cmnt.dao.ReplyDAO;
import com.Semicolon.cmnt.dto.ReplyVO;

public class ReplyServiceImpl implements ReplyService{

	private ReplyDAO replyDAO;
	public ReplyServiceImpl(ReplyDAO replyDAO) {
		this.replyDAO = replyDAO;
	}
	@Override
	public List<ReplyVO> list(int fno, PageMaker pageMaker) throws SQLException {
		List<ReplyVO> replyList = replyDAO.selectReplyList(fno, pageMaker);
		
		int count = replyDAO.countReply(fno);
		pageMaker.setTotalCount(count);
		
		return replyList;
	}
	@Override
	public void regist(ReplyVO reply) throws SQLException {
		int rno = replyDAO.selectReplySeqNextValue();
		reply.setRno(rno);
		replyDAO.insertReply(reply);		
	}
	@Override
	public void modify(ReplyVO reply) throws SQLException {
		replyDAO.updateReply(reply);		
	}
	@Override
	public void remove(int rno) throws SQLException {
		replyDAO.deleteReply(rno);
		
	}
	
}
