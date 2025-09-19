package com.Semicolon.dao;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;

import com.Semicolon.command.PageMaker;
import com.Semicolon.dto.MeetingVO;

public class MeetingDAOImpl implements MeetingDAO {

	private SqlSession session;

	public MeetingDAOImpl(SqlSession session) {
		this.session = session;
	}

	@Override
	public List<MeetingVO> selectMeetingList(PageMaker pageMaker) throws SQLException {
		int offset = pageMaker.getStartRow()-1;
		int limit = pageMaker.getPerPageNum();
		
		RowBounds rows = new RowBounds(offset,limit);
		return session.selectList("Meeting-Mapper.selectMeetingList", pageMaker,rows);
	}

	@Override
	public int selectMeetingListCount(PageMaker pageMaker) throws SQLException {
		return session.selectOne("Meeting-Mapper.selectMeetingListCount", pageMaker);
	}

	@Override
	public MeetingVO selectMeetingById(int id) throws SQLException {
		return session.selectOne("Meeting-Mapper.selectMeetingById", id);
	}

	@Override
	public void insertMeeting(MeetingVO meeting) throws SQLException {
		session.insert("Meeting-Mapper.insertMeeting", meeting);
	}

	@Override
	public void updateMeeting(MeetingVO meeting) throws SQLException {
		session.update("Meeting-Mapper.updateMeeting", meeting);
	}

	@Override
	public void deleteMeeting(int id) throws SQLException {
		session.delete("Meeting-Mapper.deleteMeeting", id);
	}

	@Override
	public int selectMeetingSequenceNextValue() throws SQLException {
		return session.selectOne("Meeting-Mapper.selectMeetingSequenceNextValue");
	}

	@Override
	public List<MeetingVO> selectMeetingListByProject(PageMaker pageMaker) throws SQLException {
	    int offset = pageMaker.getStartRow() - 1;
	    int limit = pageMaker.getPerPageNum();
	    RowBounds rows = new RowBounds(offset, limit);

	    return session.selectList("Meeting-Mapper.selectMeetingListByProject", pageMaker, rows);
	}

	@Override
	public int selectMeetingListByProjectCount(PageMaker pageMaker) throws SQLException {
	    return session.selectOne("Meeting-Mapper.selectMeetingListByProjectCount", pageMaker);
	}

	@Override
	public String selectProjectManagers(String projectId) throws SQLException {
	    return session.selectOne("Meeting-Mapper.selectProjectManagers", projectId);
	}

	public String selectMeetingStatus(int meetingId) throws SQLException {
	    return session.selectOne("Meeting-Mapper.selectMeetingStatus", meetingId);
	}

	@Override
	public void updateMeetingStatus(int meetingId, String status) throws SQLException {
	    Map<String, Object> param = new HashMap<>();
	    param.put("id", meetingId);
	    param.put("status", status);
	    session.update("Meeting-Mapper.updateMeetingStatus", param);
	}

	
}
