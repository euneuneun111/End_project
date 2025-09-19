package com.Semicolon.cmnt.dao;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.cmnt.command.PageMaker;
import com.Semicolon.cmnt.dto.EngineerVO;
import com.Semicolon.cmnt.dto.MemberVO;

public interface MemberDAO {


	List<MemberVO> selectMemberList(PageMaker pageMaker)throws SQLException;
	int selectMemberListCount(PageMaker pageMaker)throws SQLException;
	
	MemberVO selectMemberById(String id)throws SQLException;
	void insertMember(MemberVO member)throws SQLException;
	void isnertEngineer(EngineerVO engineer)throws SQLException;
	void updateMember(MemberVO member)throws SQLException;
	void deleteMember(String id)throws SQLException;	
	

	List<String> selectAuthoritiesById(String id)throws SQLException;
	void insertAuthorities(String id, String authority)throws SQLException;
	void deleteAllAuthorityById(String id)throws SQLException;
	
	  // 닉네임 검색 추가
    List<String> selectNicknamesByKeyword(String keyword) throws SQLException;
}


