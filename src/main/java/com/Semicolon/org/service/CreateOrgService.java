package com.Semicolon.org.service;

import com.Semicolon.org.dto.CreateOrgDTO;

public interface CreateOrgService {
    void createOrganization(CreateOrgDTO organization) throws Exception;
}