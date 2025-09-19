package com.Semicolon.cmnt.dao;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;

import com.Semicolon.cmnt.command.PageMaker;
import com.Semicolon.cmnt.dto.EngineerVO;
import com.Semicolon.cmnt.dto.MemberVO;

public class MemberDAOImpl implements MemberDAO{
	
	private SqlSession session;	
	public MemberDAOImpl(SqlSession session) {
		this.session = session;
	}

	@Override
	public List<MemberVO> selectMemberList(PageMaker pageMaker) throws SQLException {
		int offset = pageMaker.getStartRow()-1;
		int limit = pageMaker.getPerPageNum();
		
		RowBounds rows = new RowBounds(offset,limit);
		
		return session.selectList("Member-Mapper.selectMemberList",pageMaker,rows);
	}
	@Override
	public int selectMemberListCount(PageMaker pageMaker) throws SQLException {
		return session.selectOne("Member-Mapper.selectMemberListCount",pageMaker);
	}

	@Override
	public MemberVO selectMemberById(String user_id) throws SQLException {
		return session.selectOne("Member-Mapper.selectMemberByID",user_id);
	}

	@Override
	public void insertMember(MemberVO member) throws SQLException {
		session.insert("Member-Mapper.insertMember",member);	
	}

	@Override
	public void updateMember(MemberVO member) throws SQLException {
		session.update("Member-Mapper.updateMember",member);
		
	}

	@Override
	public void deleteMember(String id) throws SQLException {
		session.delete("Member-Mapper.deleteMember",id);
		
	}

	@Override
	public List<String> selectAuthoritiesById(String id) throws SQLException {
		return session.selectList("Member-Mapper.selectAuthoritiesById",id);
	}

	@Override
	public void insertAuthorities(String id, String authority) throws SQLException {
		Map<String,Object> paramMap = new HashMap<String,Object>();
		paramMap.put("id",id);
		paramMap.put("authority",authority);
		session.insert("Member-Mapper.insertAuthorities",paramMap);	
	}

	@Override
	public void deleteAllAuthorityById(String id) throws SQLException {
		session.delete("Member-Mapper.deleteAllAuthorityById",id);	
	}

	@Override
	public void isnertEngineer(EngineerVO engineer) throws SQLException {
		session.insert("Engineer-Mapper.insertEngineer",engineer);		
	}

	@Override
	public List<String> selectNicknamesByKeyword(String keyword) throws SQLException {
	    // keyword에 %가 포함되어 있으면 그대로 사용, 없으면 붙이기
	    if (!keyword.contains("%")) {
	        keyword = "%" + keyword + "%";
	    }
	    return session.selectList("Member-Mapper.selectNicknamesByKeyword", keyword);
	}

}
