package com.Semicolon.org.service;

import java.util.List;
import java.util.Map;

import com.Semicolon.org.dto.Member1DTO;

public interface Member1Service {
    
	List<Member1DTO> getMemberList(Map<String, Object> params);
    
    int updateMemberRole(String userId, String newRole);
    
    int removeMember(String userId, String orId);
}