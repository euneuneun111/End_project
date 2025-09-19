package com.Semicolon.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.Semicolon.dto.AttachReportVO;

public class AttachReportDAOImpl implements AttachReportDAO{
	
	private SqlSession session;
	public AttachReportDAOImpl(SqlSession session) {
		this.session = session;
	}

	@Override
	public List<AttachReportVO> selectAttachReportByRno(int rno) throws SQLException {
		return session.selectList("AttachReport-Mapper.selectAttachReportByRno", rno);
	}

	@Override
	public AttachReportVO selectAttachReportByArno(int arno) throws SQLException {
		return session.selectOne("AttachReport-Mapper.selectAttachReportByArno", arno);
	}

	@Override
	public void insertAttach(AttachReportVO attach) throws SQLException {
		session.insert("AttachReport-Mapper.insertAttach", attach);
	}

	@Override
	public void deletAttach(int arno) throws SQLException {
		session.delete("AttachReport-Mapper.deleteAttach", arno);
	}

	@Override
	public void deletAllAttach(int rno) throws SQLException {
		session.delete("AttachReport-Mapper.deleteAllAttach", rno);
		
	}

	

	
}
