package com.Semicolon.dao;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.dto.AttachVO;

public interface AttachDAO {

	List<AttachVO> selectAttachByFno(int fno) throws SQLException;
	AttachVO selectAttachByAno(int ano)throws SQLException;
	
	void insertAttach(AttachVO attach)throws SQLException;
	void deletAttach(int ano)throws SQLException;
	void deletAllAttach(int fno)throws SQLException;
}
