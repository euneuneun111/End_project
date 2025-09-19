// src/main/java/com/Semicolon/org/service/CreateOrgServiceImpl.java
package com.Semicolon.org.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional; // 트랜잭션 어노테이션 추가

import com.Semicolon.org.dao.CreateOrgDAO;
import com.Semicolon.org.dto.CreateOrgDTO;

public class CreateOrgServiceImpl implements CreateOrgService {

    private CreateOrgDAO createOrgDAO;

    public CreateOrgServiceImpl(CreateOrgDAO createOrgDAO) {
        this.createOrgDAO = createOrgDAO;
    }

    @Transactional
    @Override
    public void createOrganization(CreateOrgDTO organization) throws Exception {
        
        int orgCount = createOrgDAO.isUserInAnyOrg(organization.getOrManagerId());
        if (orgCount > 0) {
            throw new IllegalStateException("이미 소속된 조직이 존재합니다.");
        }
        
        // 1단계: ORGANIZATION 테이블에 조직 생성
        // 이 메소드가 실행되면 <selectKey> 덕분에 organization DTO에 orId가 세팅됨
        createOrgDAO.createOrganization(organization);
        
        // 2단계: 생성된 orId와 관리자 ID를 이용해 ENGINEER 테이블 업데이트
        Map<String, String> params = new HashMap<>();
        params.put("userId", organization.getOrManagerId());
        params.put("orId", organization.getOrId());
        createOrgDAO.updateEngineerOrgId(params);
    }
}