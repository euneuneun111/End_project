package com.Semicolon.service;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.command.PageMaker;
import com.Semicolon.dao.AdminReportDAO;
import com.Semicolon.dto.AdminReportVO;

public class AdminReportServiceImpl implements AdminReportService {
	
	private AdminReportDAO adminreportDAO;
	
	@Override
	public List<AdminReportVO> list(PageMaker pageMaker) throws SQLException {
	    // DAO 호출
	    List<AdminReportVO> adminreportList =  adminreportDAO.selectAdminReportList(pageMaker);

	    // 결과 반환
	    return adminreportList;
	}

	public AdminReportServiceImpl(AdminReportDAO adminreportDAO) { 
	    this.adminreportDAO = adminreportDAO;
	}

	@Override
	public void registAdminReport(AdminReportVO adminreport) throws SQLException {
		adminreportDAO.insertReport(adminreport);
	}

	@Override
	public AdminReportVO getAdminReportById(int reportId) throws SQLException {
		return adminreportDAO.selectReportById(reportId);
	}

	@Override
	public List<AdminReportVO> getAdminReportList() throws SQLException {
		return adminreportDAO.selectReportList();
	}

	@Override
	public void removeAdminReport(int reportId) throws SQLException {
		adminreportDAO.deleteReport(reportId);
	}
}
