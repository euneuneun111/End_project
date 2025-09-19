package com.Semicolon.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.Semicolon.command.PageMaker;
import com.Semicolon.dto.AdminReportVO;

public class AdminReportDAOImpl implements AdminReportDAO{
	
	private SqlSession session;
	public AdminReportDAOImpl(SqlSession session) {
		this.session = session;
	}

	@Override
	public void insertReport(AdminReportVO report) throws SQLException {
		session.insert("AdminReport-Mapper.insertReport", report);
	}

	@Override
	public AdminReportVO selectReportById(int reportId) throws SQLException {
		return session.selectOne("AdminReport-Mapper.selectReportById", reportId);
	}

	@Override
	public List<AdminReportVO> selectReportList() throws SQLException {
		return session.selectList("AdminReport-Mapper.selectReportList");
	}

	@Override
	public void deleteReport(int reportId) throws SQLException {
		session.delete("AdminReport-Mapper.deleteReport", reportId);
	}

	 @Override
	    public List<AdminReportVO> selectAdminReportList(PageMaker pageMaker) throws SQLException {
	        return session.selectList("selectAdminReportList", pageMaker);
	    }
}
