package com.Semicolon.dao;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.command.PageMaker;
import com.Semicolon.dto.MeetingVO;

public interface MeetingDAO {

	List<MeetingVO> selectMeetingList(PageMaker pageMaker) throws SQLException;
	int selectMeetingListCount(PageMaker pageMaker) throws SQLException;
	
    MeetingVO selectMeetingById(int id) throws SQLException;
    
    int selectMeetingSequenceNextValue() throws SQLException;

    void insertMeeting(MeetingVO meeting) throws SQLException;
    void updateMeeting(MeetingVO meeting) throws SQLException;
    void deleteMeeting(int id) throws SQLException;
    
    List<MeetingVO> selectMeetingListByProject(PageMaker pageMaker) throws SQLException;
    int selectMeetingListByProjectCount(PageMaker pageMaker) throws SQLException;
    
    String selectProjectManagers(String projectId) throws SQLException;
    
    String selectMeetingStatus(int meetingId) throws SQLException;

    void updateMeetingStatus(int meetingId, String status) throws SQLException;
    
    

}


