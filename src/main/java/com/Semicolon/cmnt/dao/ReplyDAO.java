package com.Semicolon.cmnt.dao;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.cmnt.command.PageMaker;
import com.Semicolon.cmnt.dto.ReplyVO;

public interface ReplyDAO {
	List<ReplyVO> selectReplyList(int fno,PageMaker pageMaker) throws SQLException;
	int countReply(int fno)throws SQLException;
	
	int selectReplySeqNextValue()throws SQLException;
	
	void insertReply(ReplyVO reply)throws SQLException;
	void updateReply(ReplyVO reply)throws SQLException;
	void deleteReply(int rno)throws SQLException;
}
