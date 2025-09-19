package com.Semicolon.service;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.command.ReportPageMaker;
import com.Semicolon.dto.ReportVO;

public interface ReportService {

	void regist(ReportVO report) throws SQLException;
	
	ReportVO detail(int rno) throws SQLException;
	
	void modify(ReportVO report) throws SQLException;
	ReportVO getRno(int rno) throws SQLException;
	
	void remove(int rno) throws SQLException;
	
    List<ReportVO> reportList(String projectId, ReportPageMaker reportpage) throws SQLException;
	
	
}
