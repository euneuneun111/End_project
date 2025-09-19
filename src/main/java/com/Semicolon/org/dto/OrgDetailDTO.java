// src/main/java/com/Semicolon/org/dto/OrgDetailDTO.java
package com.Semicolon.org.dto;

import java.sql.Date;

public class OrgDetailDTO {

    private String orId;
    private String orName;
    private String orIsPublic;
    private String orIntroduce;
    private Date orCreateDate;
    private String orManagerId;
    private String orLinkAddress;

    // --- Getter & Setter ---
    public String getOrId() { return orId; }
    public void setOrId(String orId) { this.orId = orId; }
    public String getOrName() { return orName; }
    public void setOrName(String orName) { this.orName = orName; }
    public String getOrIsPublic() { return orIsPublic; }
    public void setOrIsPublic(String orIsPublic) { this.orIsPublic = orIsPublic; }
    public String getOrIntroduce() { return orIntroduce; }
    public void setOrIntroduce(String orIntroduce) { this.orIntroduce = orIntroduce; }
    public Date getOrCreateDate() { return orCreateDate; }
    public void setOrCreateDate(Date orCreateDate) { this.orCreateDate = orCreateDate; }
    public String getOrManagerId() { return orManagerId; }
    public void setOrManagerId(String orManagerId) { this.orManagerId = orManagerId; }
    public String getOrLinkAddress() { return orLinkAddress; }
    public void setOrLinkAddress(String orLinkAddress) { this.orLinkAddress = orLinkAddress; }
}