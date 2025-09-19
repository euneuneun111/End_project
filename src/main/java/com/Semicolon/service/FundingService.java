package com.Semicolon.service;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.command.PageMaker;
import com.Semicolon.dto.FundingVO;
import com.Semicolon.dto.HeartVO;

public interface FundingService {

	// 목록
	List<FundingVO> searchList(PageMaker pageMaker) throws SQLException;

	List<FundingVO> listByLatest(PageMaker pageMaker) throws Exception;

	List<FundingVO> listByPopular(PageMaker pageMaker) throws Exception;

	FundingVO getFno(int fno) throws SQLException;

	// 등록
	int regist(FundingVO funding) throws SQLException;

	// 읽기
	FundingVO detail(int fno) throws SQLException;

	// 수정
	int modify(FundingVO funding) throws SQLException;

	FundingVO getFunding(int fno) throws SQLException;

	// 삭제
	void remove(int fno) throws SQLException;
	
	boolean toggleHeart(HeartVO heartVO);
    int getHeartCount(int fno);
    boolean isHeartedByUser(int fno, String user_id);
    
    int getHeartCountByFunding(int fno) throws SQLException;
}
