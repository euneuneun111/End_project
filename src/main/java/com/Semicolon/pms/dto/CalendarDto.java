package com.Semicolon.pms.dto;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
public class CalendarDto {
    private String calendarId;
    private String calendarTitle;
    private String projectId;
    private String calendarContent;

    private Date calendarRegDate;
    private Date calendarModifyDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "UTC")
    private Date calendarStartDate;

    // ✅ 3. @JsonFormat 어노테이션 추가
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "UTC")
    private Date calendarEndDate;
    // Getters and Setters
    public String getCalendarId() { return calendarId; }
    public void setCalendarId(String calendarId) { this.calendarId = calendarId; }
    
    public String getCalendarTitle() { return calendarTitle; }
    public void setCalendarTitle(String calendarTitle) { this.calendarTitle = calendarTitle; }
    
    public String getProjectId() { return projectId; }
    public void setProjectId(String projectId) { this.projectId = projectId; }
    
    public String getCalendarContent() { return calendarContent; }
    public void setCalendarContent(String calendarContent) { this.calendarContent = calendarContent; }
    
    public Date getCalendarStartDate() { return calendarStartDate; }
    public void setCalendarStartDate(Date calendarStartDate) { this.calendarStartDate = calendarStartDate; }
    
    public Date getCalendarEndDate() { return calendarEndDate; }
    public void setCalendarEndDate(Date calendarEndDate) { this.calendarEndDate = calendarEndDate; }
    
    public Date getCalendarRegDate() { return calendarRegDate; }
    public void setCalendarRegDate(Date calendarRegDate) { this.calendarRegDate = calendarRegDate; }
    
    public Date getCalendarModifyDate() { return calendarModifyDate; }
    public void setCalendarModifyDate(Date calendarModifyDate) { this.calendarModifyDate = calendarModifyDate; }
}