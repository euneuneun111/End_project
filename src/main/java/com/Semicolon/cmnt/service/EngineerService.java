package com.Semicolon.cmnt.service;

import java.sql.SQLException;

import com.Semicolon.cmnt.dto.EngineerVO;

public interface EngineerService {
	
	EngineerVO getEngineerByEng_Id(String eng_id) throws SQLException;
	
	void registerEngineer(EngineerVO engineer) throws SQLException;
	
	void modifyEngineer(EngineerVO engineer) throws SQLException;

}
