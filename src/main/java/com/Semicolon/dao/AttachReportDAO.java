package com.Semicolon.dao;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.dto.AttachReportVO;

public interface AttachReportDAO {
	
	List<AttachReportVO> selectAttachReportByRno(int rno) throws SQLException;
	AttachReportVO selectAttachReportByArno(int arno)throws SQLException;
	
	void insertAttach(AttachReportVO attach)throws SQLException;
	void deletAttach(int arno)throws SQLException;
	void deletAllAttach(int rno)throws SQLException;

}
