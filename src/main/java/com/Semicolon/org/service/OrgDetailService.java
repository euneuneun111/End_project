package com.Semicolon.org.service;

import com.Semicolon.org.dto.OrgDetailDTO;

public interface OrgDetailService {
    String getOrgIdByUserId(String userId);
    OrgDetailDTO getOrgDetailForUser(String orId, String userId);
    void modifyOrg(OrgDetailDTO org, String userId) throws Exception;
    void removeOrg(String orId, String userId) throws Exception;
}