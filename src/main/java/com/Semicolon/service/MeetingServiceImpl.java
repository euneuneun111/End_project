package com.Semicolon.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.Semicolon.command.PageMaker;
import com.Semicolon.dao.MeetingDAO;
import com.Semicolon.dto.MeetingVO;

public class MeetingServiceImpl implements MeetingService {

	private MeetingDAO meetingDAO;

	public MeetingServiceImpl(MeetingDAO meetingDAO) {
		this.meetingDAO = meetingDAO;
	}

	@Override
	public List<MeetingVO> getMeetingList(PageMaker pageMaker) throws SQLException {
		int totalCount = meetingDAO.selectMeetingListCount(pageMaker);
		pageMaker.setTotalCount(totalCount);
		List<MeetingVO> meetingList = meetingDAO.selectMeetingList(pageMaker);

		return meetingList;
	}

	@Override
	public void registMeeting(MeetingVO meeting) throws SQLException {
		int id = meetingDAO.selectMeetingSequenceNextValue();
		meeting.setId(id);
		meetingDAO.insertMeeting(meeting); // insertMeeting 호출 필요
	}

	@Override
	public MeetingVO getMeetingById(int id) throws SQLException {
		MeetingVO meeting = meetingDAO.selectMeetingById(id);

		return meeting;
	}

	@Override
	public void modifyMeeting(MeetingVO meeting) throws SQLException {
		meetingDAO.updateMeeting(meeting);

	}

	@Override
	public void removeMeeting(int id) throws SQLException {
		
		
		MeetingVO meeting = meetingDAO.selectMeetingById(id);

		meetingDAO.deleteMeeting(id);
	}

	@Override
	public List<MeetingVO> getMeetingListByProject(PageMaker pageMaker) throws SQLException {
	    return meetingDAO.selectMeetingListByProject(pageMaker);
	}

	@Override
	public int getMeetingListCountByProject(PageMaker pageMaker) throws SQLException {
	    return meetingDAO.selectMeetingListByProjectCount(pageMaker);
	}

	@Override
	public List<String> getProjectManagers(String projectId) throws SQLException {
	    // DAO에서 한 문자열 가져오기
	    String managersStr = meetingDAO.selectProjectManagers(projectId); // "홍길동,김철수"

	    
	    if (managersStr == null || managersStr.isEmpty()) {
	        return new ArrayList<>();
	    }

	    // 콤마 기준으로 분리 후 리스트 반환
	    return Arrays.asList(managersStr.split("\\s*,\\s*"));
	}

	@Override
    public String toggleApprovalStatus(int meetingId) throws SQLException {
        // 현재 상태 조회
        String currentStatus = meetingDAO.selectMeetingStatus(meetingId);

        // 상태 변경: SUBMITTED ↔ APPROVED
        String newStatus;
        if ("APPROVED".equals(currentStatus)) {
            newStatus = "SUBMITTED"; 
        } else {
            newStatus = "APPROVED";
        }

        // DB 업데이트
        meetingDAO.updateMeetingStatus(meetingId, newStatus);

        return newStatus;
    }
}
	
