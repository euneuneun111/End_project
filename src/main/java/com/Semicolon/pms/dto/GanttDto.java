// com.Semicolon.pms.dto.GanttDto.java
package com.Semicolon.pms.dto;

import java.util.Date;

public class GanttDto {
    private String ganttId;         // GANTT_ID
    private String taskId;          // TASK_ID
    private String projectId;       // PROJECT_ID
    private String ganttTitle;      // GANTT_TITLE
    private String ganttManagerId;  // GANTT_MANAGER_ID
    private Date ganttStartDate;    // GANTT_START_DATE
    private Date ganttEndDate;      // GANTT_END_DATE
    private Date ganttRegDate;      // GANTT_REG_DATE
    private Date ganttModifyDate;   // GANTT_MODIFY_DATE

    // Getters and Setters
    public String getGanttId() {
        return ganttId;
    }

    public void setGanttId(String ganttId) {
        this.ganttId = ganttId;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getGanttTitle() {
        return ganttTitle;
    }

    public void setGanttTitle(String ganttTitle) {
        this.ganttTitle = ganttTitle;
    }

    public String getGanttManagerId() {
        return ganttManagerId;
    }

    public void setGanttManagerId(String ganttManagerId) {
        this.ganttManagerId = ganttManagerId;
    }

    public Date getGanttStartDate() {
        return ganttStartDate;
    }

    public void setGanttStartDate(Date ganttStartDate) {
        this.ganttStartDate = ganttStartDate;
    }

    public Date getGanttEndDate() {
        return ganttEndDate;
    }

    public void setGanttEndDate(Date ganttEndDate) {
        this.ganttEndDate = ganttEndDate;
    }

    public Date getGanttRegDate() {
        return ganttRegDate;
    }

    public void setGanttRegDate(Date ganttRegDate) {
        this.ganttRegDate = ganttRegDate;
    }

    public Date getGanttModifyDate() {
        return ganttModifyDate;
    }

    public void setGanttModifyDate(Date ganttModifyDate) {
        this.ganttModifyDate = ganttModifyDate;
    }
}