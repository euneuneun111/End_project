package com.Semicolon.pms.dao;

import com.Semicolon.pms.dto.BudgetDTO;
import org.mybatis.spring.SqlSessionTemplate;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class BudgetDAOImpl implements BudgetDAO {

    private SqlSessionTemplate sqlSession;

    public BudgetDAOImpl(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    @Override
    public List<BudgetDTO> getAllBudgets() {
        return sqlSession.selectList("com.Semicolon.pms.dao.BudgetDAO.getAllBudgets");
    }

    @Override
    public void insertBudget(BudgetDTO budget) {
        sqlSession.insert("com.Semicolon.pms.dao.BudgetDAO.insertBudget", budget);
    }

    @Override
    public void updateBudget(BudgetDTO budget) {
        sqlSession.update("com.Semicolon.pms.dao.BudgetDAO.updateBudget", budget);
    }

    @Override
    public void deleteBudget(String taskNumber) {
        sqlSession.update("com.Semicolon.pms.dao.BudgetDAO.deleteBudget", taskNumber);
    }
    
    @Override
    public BigDecimal getTotalProjectBudget(String projectId) {
        // 이 쿼리는 프로젝트 총 예산액을 가져오는 쿼리입니다.
        // 프로젝트 테이블에 total_budget 컬럼이 있다고 가정합니다.
        return sqlSession.selectOne("com.Semicolon.pms.dao.BudgetDAO.getTotalProjectBudget", projectId);
    }

    @Override
    public BigDecimal getUsedProjectBudget(String projectId) {
        // 이 쿼리는 특정 프로젝트의 사용된 예산 합계를 가져오는 쿼리입니다.
        return sqlSession.selectOne("com.Semicolon.pms.dao.BudgetDAO.getUsedProjectBudget", projectId);
    }
}