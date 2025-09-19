package com.Semicolon.pms.service;

import com.Semicolon.pms.dto.BudgetDTO;
import java.math.BigDecimal;
import java.util.List;

public interface BudgetService {
    // 모든 예산 내역 조회
    List<BudgetDTO> getAllBudgets();

    // 새 예산 내역 등록
    void addBudget(BudgetDTO budget);

    // 예산 내역 수정
    void modifyBudget(BudgetDTO budget);

    // 예산 내역 삭제 (논리적 삭제)
    void removeBudget(String taskNumber);
    
    // 특정 프로젝트의 총 예산액 조회
    BigDecimal getTotalProjectBudget(String projectId);

    // 특정 프로젝트의 사용된 예산액 합계 조회
    BigDecimal getUsedProjectBudget(String projectId);
}