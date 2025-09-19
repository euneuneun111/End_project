// src/main/java/com/Semicolon/org/dto/CreateOrgDTO.java
package com.Semicolon.org.dto;

import java.sql.Date;

public class CreateOrgDTO {
    private String orId;
    private String orName;
    private String orIntroduce;
    private String orIsPublic;
    private String orManagerId;
    private Date orCreateDate; // 활동 시작일을 받을 필드

    // --- Getter & Setter ---
    public String getOrId() { return orId; }
    public void setOrId(String orId) { this.orId = orId; }
    public String getOrName() { return orName; }
    public void setOrName(String orName) { this.orName = orName; }
    public String getOrIntroduce() { return orIntroduce; }
    public void setOrIntroduce(String orIntroduce) { this.orIntroduce = orIntroduce; }
    public String getOrIsPublic() { return orIsPublic; }
    public void setOrIsPublic(String orIsPublic) { this.orIsPublic = orIsPublic; }
    public String getOrManagerId() { return orManagerId; }
    public void setOrManagerId(String orManagerId) { this.orManagerId = orManagerId; }
    public Date getOrCreateDate() { return orCreateDate; }
    public void setOrCreateDate(Date orCreateDate) { this.orCreateDate = orCreateDate; }
}