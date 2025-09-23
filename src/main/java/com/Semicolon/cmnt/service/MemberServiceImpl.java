package com.Semicolon.cmnt.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
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
	
	@Override
	public List<MemberVO> getMembersByProjectId(String projectId) throws SQLException {
	    String managerNamesString = memberDAO.selectProjectManagersString(projectId);

	    if (managerNamesString == null || managerNamesString.trim().isEmpty()) {
	        return Collections.emptyList();
	    }

	    List<String> nameList = Arrays.asList(managerNamesString.split("\\s*,\\s*"));

	    List<MemberVO> members = new ArrayList<>();
	    for (String name : nameList) {
	        MemberVO vo = new MemberVO();
	        vo.setName(name);  // MemberVO에 name 필드 있다고 가정
	        members.add(vo);
	    }

	    return members;
	}

	@Override
	public boolean isNicknameAvailable(String nickname) throws SQLException {
	    // DAO에서 해당 닉네임이 몇 개 있는지 조회
	    int count = memberDAO.countByNickname(nickname); 
	    // count가 0이면 사용 가능(true), 0 이상이면 이미 존재(false)
	    return count == 0;
	}

}
