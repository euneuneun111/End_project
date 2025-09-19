// src/main/java/com/Semicolon/org/dao/OrgDetailDAO.java
package com.Semicolon.org.dao;
import com.Semicolon.org.dto.OrgDetailDTO;
import org.apache.ibatis.annotations.Param; // Mybatis Param 어노테이션

public interface OrgDetailDAO {
    // 사용자의 조직 ID 조회 (기존 유지)
    String selectOrgIdByUserId(String userId);

    // 사용자가 조직 멤버인지 확인하며 조직 정보 조회
    OrgDetailDTO selectOrgByIdAndUserId(@Param("orId") String orId, @Param("userId") String userId);

    // 조직 정보 수정
    void updateOrg(OrgDetailDTO org);

    // 조직 삭제 (소프트 삭제)
    void deleteOrg(String orId);
}