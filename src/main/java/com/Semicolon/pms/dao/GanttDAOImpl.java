package com.Semicolon.pms.dao;

import java.sql.SQLException;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;

import com.Semicolon.pms.dto.GanttDto;

public class GanttDAOImpl implements GanttDAO{

	private SqlSessionTemplate sqlSession;
	
	// 생성자 주입
	public GanttDAOImpl(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }
	
	@Override
	public List<GanttDto> getGanttDataByProjectId(String projectId) throws SQLException {
		// sqlSession.selectList를 사용하여 프로젝트 ID에 해당하는 Gantt 데이터를 조회합니다.
		// "GanttMapper.getGanttDataByProjectId"는 MyBatis 매퍼 파일에 정의된 쿼리 ID를 가정합니다.
		return sqlSession.selectList("GanttMapper.getGanttDataByProjectId", projectId);
	}

	@Override
	public int insertNewGantt(GanttDto gantt) throws SQLException {
		// sqlSession.insert를 사용하여 새로운 Gantt 데이터를 삽입합니다.
		// "GanttMapper.insertNewGantt"는 MyBatis 매퍼 파일에 정의된 쿼리 ID를 가정합니다.
		return sqlSession.insert("GanttMapper.insertNewGantt", gantt);
	}

	@Override
	public int updateGanttByTask(GanttDto gantt) throws SQLException {
		// sqlSession.update를 사용하여 특정 Gantt 데이터를 업데이트합니다.
		// "GanttMapper.updateGanttByTask"는 MyBatis 매퍼 파일에 정의된 쿼리 ID를 가정합니다.
		return sqlSession.update("GanttMapper.updateGanttByTask", gantt);
	}

	@Override
	public int deleteGanttByTaskId(String taskId) throws SQLException {
		// sqlSession.delete를 사용하여 특정 Gantt 데이터를 삭제합니다.
		// "GanttMapper.deleteGanttByTaskId"는 MyBatis 매퍼 파일에 정의된 쿼리 ID를 가정합니다.
		return sqlSession.delete("GanttMapper.deleteGanttByTaskId", taskId);
	}

}