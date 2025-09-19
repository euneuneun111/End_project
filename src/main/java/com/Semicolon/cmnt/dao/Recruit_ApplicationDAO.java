package com.Semicolon.cmnt.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.Semicolon.cmnt.dto.Recruit_ApplicationVO;

public interface Recruit_ApplicationDAO {
	
	// 특정 게시글 신청자 리스트 조회
    List<Recruit_ApplicationVO> selectApplicationsByRno(@Param("rno") int rno);

    // 신청자 저장
    int insertApplication(@Param("rno") int rno, @Param("user_id") String user_id);

    // 이미 신청했는지 확인
    int existsApplication(@Param("rno") int rno, @Param("user_id") String user_id);

}