package com.Semicolon.cmnt.service;

import java.util.List;

import com.Semicolon.cmnt.dao.Recruit_ApplicationDAO;
import com.Semicolon.cmnt.dto.Recruit_ApplicationVO;

public class Recruit_ApplicationService {

    private Recruit_ApplicationDAO applicationDAO;

    // 생성자 주입
    public Recruit_ApplicationService(Recruit_ApplicationDAO applicationDAO) {
        this.applicationDAO = applicationDAO;
    }

    public List<Recruit_ApplicationVO> getApplications(int rno) {
        return applicationDAO.selectApplicationsByRno(rno);
    }

    public int saveApplication(String user_id, int rno) {
        if(applicationDAO.existsApplication(rno, user_id) > 0) {
            return 0;
        }
        return applicationDAO.insertApplication(rno, user_id);
    }
}