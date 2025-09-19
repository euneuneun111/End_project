package com.Semicolon.dao;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.command.PageMaker;
import com.Semicolon.dto.AdminReportVO;

public interface AdminReportDAO {

    List<AdminReportVO> selectAdminReportList(PageMaker pageMaker) throws SQLException; // 페이징 포함

	
	 // 신고 등록
    void insertReport(AdminReportVO report) throws SQLException;

    // 특정 신고 조회
    AdminReportVO selectReportById(int reportId) throws SQLException;

    // 전체 신고 목록
    List<AdminReportVO> selectReportList() throws SQLException;

    // 신고 삭제
    void deleteReport(int reportId) throws SQLException;

}
