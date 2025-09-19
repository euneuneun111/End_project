package com.Semicolon.org.dao;

import java.util.Map;

import com.Semicolon.org.dto.CreateOrgDTO;

public interface CreateOrgDAO {

    int isUserInAnyOrg(String userId);

    void createOrganization(CreateOrgDTO organization);
    void updateEngineerOrgId(Map<String, String> params);
}