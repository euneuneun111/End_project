package com.Semicolon.cmnt.command;

import java.util.List;

import com.Semicolon.cmnt.dto.EngineerVO;
import com.Semicolon.cmnt.dto.MemberVO;

public class MemberRegistCommand {
	
	private String user_id;  //아이디
	private String user_pwd; //패스워드
	private String name; //이름
	private String email;  //이메일
	private String major; //engineer 전용
	private List<String> authorities; // 권한
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUser_pwd() {
		return user_pwd;
	}
	public void setUser_pwd(String user_pwd) {
		this.user_pwd = user_pwd;
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
	public String getMajor() {
		return major;
	}
	public void setMajor(String major) {
		this.major = major;
	} 
	public List<String> getAuthorities() {
		return authorities;
	}
	public void setAuthorities(List<String> authorities) {
		this.authorities = authorities;
	}
	
	public MemberVO toMemberVO() {
		MemberVO member = new MemberVO();
		
		member.setUser_id(this.user_id);
		member.setUser_pwd(this.user_pwd);
		member.setEmail(this.email);
		member.setName(this.name);
		
		return member;
	}
	
	public EngineerVO toEngineerVO() {
        EngineerVO engineer = new EngineerVO();
        engineer.setUser_id(this.user_id);
        engineer.setMajor(this.major);
        return engineer;
    }
	
	
}