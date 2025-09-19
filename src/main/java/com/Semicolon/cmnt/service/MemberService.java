package com.Semicolon.cmnt.service;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.cmnt.dto.MemberVO;

public interface MemberService {

    // 회원조회
    MemberVO getMember(String id) throws SQLException;

    // 회원등록
    void regist(MemberVO member) throws SQLException;

    // 회원수정
    void modify(MemberVO member) throws SQLException;

    // 회원삭제
    void remove(String id) throws SQLException;

    // 권한수정
    void modifyAuthority(String id, List<String> authorities) throws SQLException;
    
    // 닉네임 검색
    List<String> findNicknamesByKeyword(String keyword) throws SQLException;
}
