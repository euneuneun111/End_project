package com.Semicolon.pms.service;

import com.Semicolon.pms.dao.CalendarDAO;
import com.Semicolon.pms.dto.CalendarDto;
import java.sql.SQLException;
import java.util.List;

public class CalendarServiceImpl implements CalendarService {
    
    private CalendarDAO calendarDAO;

    public CalendarServiceImpl(CalendarDAO calendarDAO) {
        this.calendarDAO = calendarDAO;
    }

    @Override
    public void addCalendar(CalendarDto calendarDto) throws SQLException {
        calendarDAO.addCalendar(calendarDto);
    }

    @Override
    public List<CalendarDto> getAllCalendars(String projectId) throws SQLException {
        return calendarDAO.getAllCalendars(projectId);
    }

    @Override
    public CalendarDto getCalendarById(String projectId, String calendarId) throws SQLException {
        return calendarDAO.getCalendarById(projectId, calendarId);
    }

    @Override
    public void updateCalendar(CalendarDto calendarDto) throws SQLException {
        calendarDAO.updateCalendar(calendarDto);
    }

    @Override
    public void deleteCalendar(String projectId, String calendarId) throws SQLException {
        calendarDAO.deleteCalendar(projectId, calendarId);
    }
}
