package com.Semicolon.pms.dao;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;

import com.Semicolon.pms.dto.CalendarDto;

public class CalendarDAOImpl implements CalendarDAO {

    private SqlSessionTemplate sqlSession;

    public CalendarDAOImpl(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    @Override
    public void addCalendar(CalendarDto calendarDto) throws SQLException {
        sqlSession.insert("com.Semicolon.pms.dao.CalendarDAO.addCalendar", calendarDto);
    }

    @Override
    public List<CalendarDto> getAllCalendars(String projectId) throws SQLException {
        return sqlSession.selectList("com.Semicolon.pms.dao.CalendarDAO.getAllCalendars", projectId);
    }

    @Override
    public CalendarDto getCalendarById(String projectId, String calendarId) throws SQLException {
        Map<String, Object> param = new HashMap<>();
        param.put("projectId", projectId);
        param.put("calendarId", calendarId);
        return sqlSession.selectOne("com.Semicolon.pms.dao.CalendarDAO.getCalendarById", param);
    }

    @Override
    public void updateCalendar(CalendarDto calendarDto) throws SQLException {
        sqlSession.update("com.Semicolon.pms.dao.CalendarDAO.updateCalendar", calendarDto);
    }

    @Override
    public void deleteCalendar(String projectId, String calendarId) throws SQLException {
        Map<String, Object> param = new HashMap<>();
        param.put("projectId", projectId);
        param.put("calendarId", calendarId);
        sqlSession.delete("com.Semicolon.pms.dao.CalendarDAO.deleteCalendar", param);
    }
}
