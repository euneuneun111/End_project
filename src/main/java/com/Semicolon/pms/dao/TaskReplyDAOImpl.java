// com.Semicolon.pms.dao.TaskReplyDAOImpl.java

package com.Semicolon.pms.dao;
import java.sql.SQLException;
import java.util.List;
import org.apache.ibatis.session.SqlSession;
import com.Semicolon.pms.dto.TaskReplyDTO;

public class TaskReplyDAOImpl implements TaskReplyDAO {

    private SqlSession sqlSession;
    public void setSqlSession(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    // 네임스페이스를 IssueReplyMapper -> TaskReplyMapper로 변경
    private static final String NAMESPACE = "com.Semicolon.pms.dao.TaskReplyDAO";

    @Override
    public List<TaskReplyDTO> selectReplyList(String taskId) throws SQLException {
        return sqlSession.selectList(NAMESPACE + ".selectReplyList", taskId);
    }

    @Override
    public void insertReply(TaskReplyDTO dto) throws SQLException {
        sqlSession.insert(NAMESPACE + ".insertReply", dto);
    }

    @Override
    public void updateReply(TaskReplyDTO dto) throws SQLException {
        sqlSession.update(NAMESPACE + ".updateReply", dto);
    }

    @Override
    public void deleteReply(String replyNumber) throws SQLException {
        sqlSession.delete(NAMESPACE + ".deleteReply", replyNumber);
    }
    
    @Override
    public void deleteRepliesByTaskId(String taskId) throws SQLException {
        // 호출하는 쿼리 ID와 파라미터를 taskId에 맞게 변경
        sqlSession.delete(NAMESPACE + ".deleteRepliesByTaskId", taskId);
    }

}