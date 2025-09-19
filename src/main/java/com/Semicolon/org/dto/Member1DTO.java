package com.Semicolon.org.dto;

import java.sql.Timestamp;

public class Member1DTO {
    // ENGINEER 테이블 컬럼
    private int engId;
    private String userId;
    private String major;
    private String introduce;
    private String orId;
    // MEMBER 테이블 컬럼
    private String name;
    private String email;
    private String memberRole; // 권한
    private String status;
    
    
    public String getOrId() {
		return orId;
	}
	public void setOrId(String orId) {
		this.orId = orId;
	}
	public int getEngId() {
		return engId;
	}
	public void setEngId(int engId) {
		this.engId = engId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getMajor() {
		return major;
	}
	public void setMajor(String major) {
		this.major = major;
	}
	public String getIntroduce() {
		return introduce;
	}
	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMemberRole() {
		return memberRole;
	}
	public void setMemberRole(String memberRole) {
		this.memberRole = memberRole;
	}
	public String getStatus() { 
		return status; 
	}
    public void setStatus(String status) { 
    	this.status = status; 
    }
    
}