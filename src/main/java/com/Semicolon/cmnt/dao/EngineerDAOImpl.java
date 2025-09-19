package com.Semicolon.cmnt.dao;

import java.sql.SQLException;

import org.apache.ibatis.session.SqlSession;

import com.Semicolon.cmnt.dto.EngineerVO;

public class EngineerDAOImpl implements EngineerDAO{
	
	private SqlSession session;	
	public EngineerDAOImpl(SqlSession session) {
		this.session = session;
	}

	@Override
	public EngineerVO selectEngineerByEng_Id(String eng_id) throws SQLException {
		return session.selectOne("Engineer-Mapper.selectEngineerByEng_ID",eng_id);
	}

	@Override
	public void insertEngineer(EngineerVO engineer) throws SQLException {
		session.insert("Engineer-Mapper.insertEngineer",engineer);
		
	}

	@Override
	public void updateEngineer(EngineerVO engineer) throws SQLException {
		session.update("Engineer-Mapper.updateEngineer",engineer);
		
	}

}
