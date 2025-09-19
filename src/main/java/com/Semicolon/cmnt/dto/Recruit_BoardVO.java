package com.Semicolon.cmnt.dto;

import java.util.Date;
import java.util.List;

public class Recruit_BoardVO {
    private int rno;          // 게시판번호
    private String title="";     // 제목
    private String or_id="";      // 작성자 (회원)
    private String content="";   // 내용 (html)
    private int view_cnt=0;      // 조회수
    private Date reg_Date=new Date();     // 등록날짜
    private String schedule="";

    private int replycnt; // 댓글 개수

    private List<Recruit_ApplicationVO> applyList;

    // getter/setter
    public List<Recruit_ApplicationVO> getApplyList() {
        return applyList;
    }

    public void setApplyList(List<Recruit_ApplicationVO> applyList) {
        this.applyList = applyList;
    }


    public int getRno() {
        return rno;
    }

    public void setRno(int rno) {
        this.rno = rno;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOr_id() {
        return or_id;
    }

    public void setOr_id(String or_id) {
        this.or_id = or_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getView_cnt() {
        return view_cnt;
    }

    public void setView_cnt(int view_cnt) {
        this.view_cnt = view_cnt;
    }

    public Date getReg_Date() {
        return reg_Date;
    }

    public void setReg_Date(Date reg_Date) {
        this.reg_Date = reg_Date;
    }

    public int getReplycnt() {
        return replycnt;
    }

    public void setReplycnt(int replycnt) {
        this.replycnt = replycnt;
    }

    public String getSchedule() {
        return schedule;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }

}