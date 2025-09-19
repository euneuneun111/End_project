package com.Semicolon.service;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.command.PageMaker;
import com.Semicolon.dto.MeetingVO;

public interface MeetingService {

    List<MeetingVO> getMeetingList(PageMaker pageMaker) throws SQLException;

    MeetingVO getMeetingById(int id) throws SQLException;

    void registMeeting(MeetingVO meeting) throws SQLException;

    void modifyMeeting(MeetingVO meeting) throws SQLException;

    void removeMeeting(int id) throws SQLException;
    
    List<MeetingVO> getMeetingListByProject(PageMaker pageMaker) throws SQLException;
    int getMeetingListCountByProject(PageMaker pageMaker) throws SQLException;
    
    List<String> getProjectManagers(String projectId) throws SQLException;

    String toggleApprovalStatus(int meetingId) throws SQLException;

}
