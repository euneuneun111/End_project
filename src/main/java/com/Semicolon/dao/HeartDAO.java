package com.Semicolon.dao;

import com.Semicolon.dto.HeartVO;

public interface HeartDAO {
    int insertHeart(HeartVO heartVO);
    int deleteHeart(HeartVO heartVO);
    int countHeartByFno(int fno);
    boolean existsHeart(HeartVO heartVO);
}