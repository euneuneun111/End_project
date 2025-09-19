package com.Semicolon.cmnt.dto;

import java.util.List;

public class EngineerVO {

	private String user_id;
	private String eng_id;
	private String or_id="";
	private String major="";
	private String introduce="";

	private List<String> authorities; // 권한


	public String getUser_id() {
		return user_id;
	}


	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}


	public String getEng_id() {
		return eng_id;
	}


	public void setEng_id(String eng_id) {
		this.eng_id = eng_id;
	}


	public String getOr_id() {
		return or_id;
	}


	public void setOr_id(String or_id) {
		this.or_id = or_id;
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


	public List<String> getAuthorities() {
		return authorities;
	}


	public void setAuthorities(List<String> authorities) {
		this.authorities = authorities;
	}
	
}
