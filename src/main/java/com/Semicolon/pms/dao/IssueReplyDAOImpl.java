// src/main/java/com/Semicolon/pms/dao/IssueReplyDAOImpl.java

package com.Semicolon.pms.dao;
import java.sql.SQLException;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;

import com.Semicolon.pms.dto.IssueReplyDTO;

public class IssueReplyDAOImpl implements IssueReplyDAO {

	private final SqlSessionTemplate sqlSession;
    public IssueReplyDAOImpl(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    private static final String NAMESPACE = "com.Semicolon.pms.dao.IssueReplyDAO";

    @Override
    public List<IssueReplyDTO> selectReplyList(String issueId) throws SQLException {
        return sqlSession.selectList(NAMESPACE + ".selectReplyList", issueId);
    }

    @Override
    public void insertReply(IssueReplyDTO dto) throws SQLException {
        sqlSession.insert(NAMESPACE + ".insertReply", dto);
    }

    @Override
    public void updateReply(IssueReplyDTO dto) throws SQLException {
        sqlSession.update(NAMESPACE + ".updateReply", dto);
    }

    @Override
    public void deleteReply(String replyNumber) throws SQLException {
        sqlSession.delete(NAMESPACE + ".deleteReply", replyNumber);
    }
    
    @Override
    public void deleteRepliesByIssueId(String issueId) throws SQLException {
        sqlSession.delete(NAMESPACE + ".deleteRepliesByIssueId", issueId);
    }
}