// com.Semicolon.pms.service.TaskService.java
package com.Semicolon.pms.service;

import java.sql.SQLException;
import java.util.List;
import com.Semicolon.command.PageMaker;
import com.Semicolon.pms.dto.TaskDto;

public interface TaskService {
    // 특정 프로젝트의 일감 목록 조회 (페이징, 검색 포함)
    List<TaskDto> getTaskListByProjectId(PageMaker pageMaker) throws SQLException;
    
    // 특정 프로젝트의 전체 일감 수 조회 (검색 포함)
    int getTotalCountByProjectId(PageMaker pageMaker) throws SQLException;
    
    // 일감 상세 조회
    TaskDto getTaskById(String taskId) throws SQLException; 
    
    // 일감 생성
    void createNewTask(TaskDto task) throws SQLException;
    
    // 일감 수정
    void updateTask(TaskDto task) throws SQLException;
    
    // 일감 삭제
    void deleteTask(String taskId) throws SQLException;
    
    List<TaskDto> getAllTasksByProjectId(String projectId) throws SQLException;
}