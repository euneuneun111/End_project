// com.Semicolon.pms.service.GanttService.java
package com.Semicolon.pms.service;

import java.sql.SQLException;
import java.util.List;
import com.Semicolon.pms.dto.GanttDto;

public interface GanttService {
    List<GanttDto> getGanttDataByProjectId(String projectId) throws SQLException;
    int createNewGantt(GanttDto gantt) throws SQLException;
    
    // 아래 두 메소드 추가
    int updateGanttByTask(GanttDto gantt) throws SQLException;
    int deleteGanttByTaskId(String taskId) throws SQLException;
}