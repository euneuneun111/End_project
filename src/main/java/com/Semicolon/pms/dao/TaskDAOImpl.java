package com.Semicolon.pms.dao;

import java.sql.SQLException;
import java.util.List;
import org.mybatis.spring.SqlSessionTemplate;
import com.Semicolon.command.PageMaker;
import com.Semicolon.pms.dto.TaskDto;

public class TaskDAOImpl implements TaskDAO {
    
    private SqlSessionTemplate sqlSession;

    public TaskDAOImpl(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }
    
    @Override
    public List<TaskDto> getTaskListByProjectId(PageMaker pageMaker) throws SQLException {
        return sqlSession.selectList("com.Semicolon.pms.dao.TaskDAO.getTaskListByProjectId", pageMaker);
    }

    @Override
    public int getTotalCountByProjectId(PageMaker pageMaker) throws SQLException {
        return sqlSession.selectOne("com.Semicolon.pms.dao.TaskDAO.getTotalCountByProjectId", pageMaker);
    }

    @Override
    public void insertNewTask(TaskDto task) throws SQLException {
        sqlSession.insert("com.Semicolon.pms.dao.TaskDAO.insertNewTask", task);
    }

    @Override
    public TaskDto getTaskById(String taskId) throws SQLException {
        return sqlSession.selectOne("com.Semicolon.pms.dao.TaskDAO.getTaskById", taskId);
    }

    @Override
    public void updateTask(TaskDto task) throws SQLException {
        sqlSession.update("com.Semicolon.pms.dao.TaskDAO.updateTask", task);
    }

    @Override
    public void deleteTask(String taskId) throws SQLException {
        sqlSession.delete("com.Semicolon.pms.dao.TaskDAO.deleteTask", taskId);
    }
    
    @Override
    public List<TaskDto> getAllTasksByProjectId(String projectId) throws SQLException {
        return sqlSession.selectList("com.Semicolon.pms.dao.TaskDAO.getAllTasksByProjectId", projectId);
    }
}