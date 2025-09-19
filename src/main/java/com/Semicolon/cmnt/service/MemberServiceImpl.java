package com.Semicolon.cmnt.service;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.cmnt.dao.MemberDAO;
import com.Semicolon.cmnt.dto.MemberVO;



public class MemberServiceImpl implements MemberService {


	private MemberDAO memberDAO;

	public MemberServiceImpl(MemberDAO memberDAO) {
		this.memberDAO = memberDAO;
	}

	@Override
	public MemberVO getMember(String user_id) throws SQLException {
		MemberVO member = memberDAO.selectMemberById(user_id);
		if (member != null)
			member.setAuthorities(memberDAO.selectAuthoritiesById(user_id));
		return member;
	}

	@Override
	public void regist(MemberVO member) throws SQLException {
		
		memberDAO.insertMember(member);
		
		if (member.getAuthorities()!=null && member.getAuthorities().size() > 0) {
			for (String authority : member.getAuthorities()) {
				memberDAO.insertAuthorities(member.getUser_id(),authority);
			}
		}

	}

	@Override
	public void modify(MemberVO member) throws SQLException {
		memberDAO.updateMember(member);
	}

	@Override
	public void remove(String id) throws SQLException {
		memberDAO.deleteMember(id);
	}

	@Override
	public void modifyAuthority(String id, List<String> authorities) throws SQLException {
		memberDAO.deleteAllAuthorityById(id);
		if(authorities.size()>0)for(String authority:authorities) {
			memberDAO.insertAuthorities(id,authority);
		}
	}

	@Override
	public List<String> findNicknamesByKeyword(String keyword) throws SQLException {
		 return memberDAO.selectNicknamesByKeyword("%" + keyword + "%");
	}

}
