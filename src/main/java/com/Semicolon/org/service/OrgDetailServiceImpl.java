// src/main/java/com/Semicolon/org/service/OrgDetailServiceImpl.java
package com.Semicolon.org.service;

import java.nio.file.AccessDeniedException; // 예외 클래스

import org.springframework.transaction.annotation.Transactional;

import com.Semicolon.org.dao.OrgDetailDAO;
import com.Semicolon.org.dto.OrgDetailDTO;

public class OrgDetailServiceImpl implements OrgDetailService {

    private final OrgDetailDAO orgDetailDAO;

    public OrgDetailServiceImpl(OrgDetailDAO orgDetailDAO) {
        this.orgDetailDAO = orgDetailDAO;
    }

    @Override
    public String getOrgIdByUserId(String userId) {
        return orgDetailDAO.selectOrgIdByUserId(userId);
    }
    
    @Override
    public OrgDetailDTO getOrgDetailForUser(String orId, String userId) {
        // DAO에 orId와 userId를 함께 넘겨 멤버 여부를 확인하며 조회
        return orgDetailDAO.selectOrgByIdAndUserId(orId, userId);
    }

    @Transactional
    @Override
    public void modifyOrg(OrgDetailDTO org, String userId) throws Exception {
        OrgDetailDTO existingOrg = orgDetailDAO.selectOrgByIdAndUserId(org.getOrId(), userId);
        if (existingOrg == null) {
            throw new AccessDeniedException("조직에 대한 접근 권한이 없습니다.");
        }
        // 핵심 권한 체크: 요청한 사용자가 조직 관리자인지 확인
        if (!existingOrg.getOrManagerId().equals(userId)) {
            throw new AccessDeniedException("조직 관리자만 정보를 수정할 수 있습니다.");
        }
        orgDetailDAO.updateOrg(org);
    }

    @Transactional
    @Override
    public void removeOrg(String orId, String userId) throws Exception {
        OrgDetailDTO existingOrg = orgDetailDAO.selectOrgByIdAndUserId(orId, userId);
        if (existingOrg == null) {
            throw new AccessDeniedException("조직에 대한 접근 권한이 없습니다.");
        }
        // 핵심 권한 체크: 요청한 사용자가 조직 관리자인지 확인
        if (!existingOrg.getOrManagerId().equals(userId)) {
            throw new AccessDeniedException("조직 관리자만 조직을 삭제할 수 있습니다.");
        }
        orgDetailDAO.deleteOrg(orId);
    }
}