package com.Semicolon.command;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import com.Semicolon.dto.MeetingVO;

public class MeetingRegistCommand {

	private String meetingDate;
	
	private String author; //주관자
	private String attend; //참석자
	private String title; //회의 명
	private String overview; //회의개요
	private String content; // 회의내용
		
	
	public String getMeetingDate() {
		return meetingDate;
	}
	public void setMeetingDate(String meetingDate) {
		this.meetingDate = meetingDate;
	}

	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getAttend() {
		return attend;
	}
	public void setAttend(String attend) {
		this.attend = attend;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getOverview() {
		return overview;
	}
	public void setOverview(String overview) {
		this.overview = overview;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}

	
	public MeetingVO toMeetingVO() throws ParseException {
		MeetingVO meeting = new MeetingVO();
		
		meeting.setTitle(this.title);
		meeting.setAttend(this.attend);
		meeting.setContent(this.content);
		meeting.setOverview(this.overview);
		meeting.setAuthor(this.author);
		meeting.setMeetingDate(new SimpleDateFormat("yyyy-MM-dd").parse(this.meetingDate));
		
		return meeting;
	}
}
