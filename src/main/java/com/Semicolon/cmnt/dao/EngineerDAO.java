package com.Semicolon.cmnt.dao;

import java.sql.SQLException;

import com.Semicolon.cmnt.dto.EngineerVO;

public interface EngineerDAO {

	EngineerVO selectEngineerByEng_Id(String eng_id)throws SQLException;
	void insertEngineer(EngineerVO engineer)throws SQLException;
	void updateEngineer(EngineerVO engineer)throws SQLException;	

}




