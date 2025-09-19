package com.Semicolon.cmnt.dto;

import java.io.Serializable;

public class Recruit_ApplicationVO implements Serializable {

    private static final long serialVersionUID = 1L;

    private int rno;         // 게시글 번호
    private String user_id;  // 신청자 아이디

    // 기본 생성자
    public Recruit_ApplicationVO() {}

    // 생성자 (선택)
    public Recruit_ApplicationVO(int rno, String user_id) {
        this.rno = rno;
        this.user_id = user_id;
    }

    // getter / setter
    public int getRno() {
        return rno;
    }

    public void setRno(int rno) {
        this.rno = rno;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    @Override
    public String toString() {
        return "ApplicationVO [rno=" + rno + ", user_id=" + user_id + "]";
    }
}