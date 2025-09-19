package com.Semicolon.service;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.command.PageMaker;
import com.Semicolon.dto.AdminReportVO;

public interface AdminReportService {

    List<AdminReportVO> list(PageMaker pageMaker) throws SQLException;

    // 신고 등록
    void registAdminReport(AdminReportVO adminreport) throws SQLException;

    // 특정 신고 조회
    AdminReportVO getAdminReportById(int reportId) throws SQLException;

    // 전체 신고 목록
    List<AdminReportVO> getAdminReportList() throws SQLException;

    // 신고 삭제
    void removeAdminReport(int reportId) throws SQLException;
}