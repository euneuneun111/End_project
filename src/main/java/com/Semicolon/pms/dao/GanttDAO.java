// com.Semicolon.pms.dao.GanttDAO.java
package com.Semicolon.pms.dao;

import java.sql.SQLException;
import java.util.List;
import com.Semicolon.pms.dto.GanttDto;

public interface GanttDAO {
    List<GanttDto> getGanttDataByProjectId(String projectId) throws SQLException;
    int insertNewGantt(GanttDto gantt) throws SQLException;
    int updateGanttByTask(GanttDto gantt) throws SQLException;
    int deleteGanttByTaskId(String taskId) throws SQLException;
}