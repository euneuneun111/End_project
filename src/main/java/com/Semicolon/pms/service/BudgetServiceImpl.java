package com.Semicolon.pms.service;

import com.Semicolon.pms.dao.BudgetDAO;
import com.Semicolon.pms.dto.BudgetDTO;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

public class BudgetServiceImpl implements BudgetService {

    private BudgetDAO budgetDAO;

    public BudgetServiceImpl(BudgetDAO budgetDAO) {
        this.budgetDAO = budgetDAO;
    }

    @Override
    public List<BudgetDTO> getAllBudgets() {
        return budgetDAO.getAllBudgets();
    }

    @Override
    @Transactional
    public void addBudget(BudgetDTO budget) {
        budgetDAO.insertBudget(budget);
    }

    @Override
    @Transactional
    public void modifyBudget(BudgetDTO budget) {
        budgetDAO.updateBudget(budget);
    }

    @Override
    @Transactional
    public void removeBudget(String taskNumber) {
        budgetDAO.deleteBudget(taskNumber);
    }
    
    @Override
    public BigDecimal getTotalProjectBudget(String projectId) {
        return budgetDAO.getTotalProjectBudget(projectId);
    }

    @Override
    public BigDecimal getUsedProjectBudget(String projectId) {
        return budgetDAO.getUsedProjectBudget(projectId);
    }
}