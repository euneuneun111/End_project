package com.Semicolon.pms.dao;

import java.sql.SQLException;
import java.util.List;

import com.Semicolon.pms.dto.CalendarDto;

public interface CalendarDAO {
    void addCalendar(CalendarDto calendarDto) throws SQLException;
    List<CalendarDto> getAllCalendars(String projectId) throws SQLException;            // projectId 추가
    CalendarDto getCalendarById(String projectId, String calendarId) throws SQLException; // projectId 추가
    void updateCalendar(CalendarDto calendarDto) throws SQLException;
    void deleteCalendar(String projectId, String calendarId) throws SQLException;
}