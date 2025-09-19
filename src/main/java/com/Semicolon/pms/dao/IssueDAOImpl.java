package com.Semicolon.pms.dao;

import com.Semicolon.pms.dto.IssueDto;
import com.Semicolon.command.PageMaker;
import org.mybatis.spring.SqlSessionTemplate;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public class IssueDAOImpl implements IssueDAO {
    
    private SqlSessionTemplate sqlSession;
    
    // 생성자 주입
    public IssueDAOImpl(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    @Override
    public List<IssueDto> getIssueListByProjectId(PageMaker pageMaker) throws SQLException {
        // 매퍼 네임스페이스와 쿼리 ID를 사용하여 쿼리 실행
        return sqlSession.selectList("com.Semicolon.pms.dao.IssueDAO.getIssueListByProjectId", pageMaker);
    }

    @Override
    public int getTotalCountByProjectId(PageMaker pageMaker) throws SQLException {
        return sqlSession.selectOne("com.Semicolon.pms.dao.IssueDAO.getTotalCountByProjectId", pageMaker);
    }

    @Override
    public void insertNewIssue(IssueDto issue) throws SQLException {
        sqlSession.insert("com.Semicolon.pms.dao.IssueDAO.insertNewIssue", issue);
    }

    @Override
    public IssueDto getIssueById(String issueId) throws SQLException {
        return sqlSession.selectOne("com.Semicolon.pms.dao.IssueDAO.getIssueById", issueId);
    }

    @Override
    public void updateIssue(IssueDto issue) throws SQLException {
        sqlSession.update("com.Semicolon.pms.dao.IssueDAO.updateIssue", issue);
    }

    @Override
    public void deleteIssue(String issueId) throws SQLException {
        sqlSession.delete("com.Semicolon.pms.dao.IssueDAO.deleteIssue", issueId);
    }
}