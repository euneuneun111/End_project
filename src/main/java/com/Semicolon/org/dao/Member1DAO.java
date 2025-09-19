package com.Semicolon.org.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.Semicolon.org.dto.Member1DTO;

public interface Member1DAO {
    
    // 조직 ID를 기준으로 모든 멤버 목록을 조회
	List<Member1DTO> getMemberListByOrgId(Map<String, Object> params);
    
    // 멤버의 권한(role)을 변경
    int updateMemberRole(@Param("userId") String userId, @Param("newRole") String newRole);
    
    // 멤버를 조직에서 추방 (논리적 삭제)
    int removeMemberFromOrg(@Param("userId") String userId, @Param("orId") int orId);


}