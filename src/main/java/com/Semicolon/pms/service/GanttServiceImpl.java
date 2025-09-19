// com.Semicolon.pms.service.GanttServiceImpl.java
package com.Semicolon.pms.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.Semicolon.pms.dao.CalendarDAO;
import com.Semicolon.pms.dao.GanttDAO;
import com.Semicolon.pms.dto.GanttDto;

public class GanttServiceImpl implements GanttService {

    private GanttDAO ganttDAO;

    public GanttServiceImpl(GanttDAO ganttDAO) {
    	this.ganttDAO = ganttDAO;
    }
    
    @Override
    public List<GanttDto> getGanttDataByProjectId(String projectId) throws SQLException {
        return ganttDAO.getGanttDataByProjectId(projectId);
    }

    @Override
    public int createNewGantt(GanttDto gantt) throws SQLException {
        return ganttDAO.insertNewGantt(gantt);
    }

    // 아래 두 메소드 구현 추가
    @Override
    public int updateGanttByTask(GanttDto gantt) throws SQLException {
        // Task ID를 기반으로 간트 정보를 업데이트하는 DAO 메소드 호출
        return ganttDAO.updateGanttByTask(gantt); 
    }

    @Override
    public int deleteGanttByTaskId(String taskId) throws SQLException {
        // Task ID를 기반으로 간트 정보를 삭제하는 DAO 메소드 호출
        return ganttDAO.deleteGanttByTaskId(taskId); 
    }
}