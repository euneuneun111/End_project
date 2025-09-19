package com.Semicolon.dao;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.command.ReportPageMaker;
import com.Semicolon.dto.ReportVO;

public interface ReportDAO {

	ReportVO selectReportByRno(int rno) throws SQLException;

	int selectReportSequenceNextValue() throws SQLException;

	void insertReport(ReportVO report) throws SQLException;

    void updateReport(ReportVO report) throws SQLException; // ✅ 오타 수정

	void deleteReport(int rno) throws SQLException;

	List<ReportVO> selectReportList(ReportPageMaker reportpage) throws SQLException;
	int selectReportCount(ReportPageMaker reportpage) throws SQLException;

}
