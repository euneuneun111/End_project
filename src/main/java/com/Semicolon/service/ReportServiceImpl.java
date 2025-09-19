package com.Semicolon.service;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.command.ReportPageMaker;
import com.Semicolon.dao.AttachReportDAO;
import com.Semicolon.dao.ReportDAO;
import com.Semicolon.dto.AttachReportVO;
import com.Semicolon.dto.ReportVO;

public class ReportServiceImpl implements ReportService {

	private ReportDAO reportDAO;
	private AttachReportDAO attachreportDAO;

	public ReportServiceImpl(ReportDAO reportDAO, AttachReportDAO attachreportDAO) {
		this.reportDAO = reportDAO;
		this.attachreportDAO = attachreportDAO;
	}

	// 페이지 메이커

	@Override
	public void regist(ReportVO report) throws SQLException {
		int rno = reportDAO.selectReportSequenceNextValue();
		report.setRno(rno);

		// 1. Report 먼저 insert (부모 테이블)
		reportDAO.insertReport(report);

		// 2. AttachReport 나중에 insert (자식 테이블)
		if (report.getAttaches() != null && !report.getAttaches().isEmpty()) {
			for (AttachReportVO attach : report.getAttaches()) {
				attach.setAttacher(report.getWriter());
				attach.setRno(rno);
				attachreportDAO.insertAttach(attach);
			}
		}
	}

	@Override
	public ReportVO detail(int rno) throws SQLException {
		ReportVO report = reportDAO.selectReportByRno(rno);

		List<AttachReportVO> attachreportList = attachreportDAO.selectAttachReportByRno(rno);

		report.setAttaches(attachreportList);

		return report;
	}

	@Override
	public void modify(ReportVO report) throws SQLException {
		reportDAO.updateReport(report);
	}

	@Override
	public void remove(int rno) throws SQLException {
		reportDAO.deleteReport(rno);
	}

	@Override
	public ReportVO getRno(int rno) throws SQLException {
		ReportVO report = reportDAO.selectReportByRno(rno);
		List<AttachReportVO> attachreportList = attachreportDAO.selectAttachReportByRno(rno);
		report.setAttaches(attachreportList);
		return report;
	}

	
	@Override
	public List<ReportVO> reportList(String projectId, ReportPageMaker reportpage) throws SQLException {
	    // 1. ReportPageMaker에 projectId 설정
	    reportpage.setProjectId(projectId);

	    // 2. 전체 리포트 개수 조회 (페이징용)
	    int listTotalCount = reportDAO.selectReportCount(reportpage);
	    reportpage.setTotalCount(listTotalCount);

	    // 3. 프로젝트별 리포트 리스트 조회
	    List<ReportVO> reportList = reportDAO.selectReportList(reportpage);

	    // 4. 각 리포트에 첨부파일 설정
	    if (reportList != null) {
	        for (ReportVO report : reportList) {
	            int rno = report.getRno();
	            List<AttachReportVO> attachList = attachreportDAO.selectAttachReportByRno(rno);
	            report.setAttaches(attachList);
	        }
	    }

	    return reportList;
	}
}
