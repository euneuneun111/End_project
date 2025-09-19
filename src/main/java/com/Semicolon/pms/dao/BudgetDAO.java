package com.Semicolon.pms.dao;

import com.Semicolon.pms.dto.BudgetDTO;
import java.math.BigDecimal;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface BudgetDAO {
    // 모든 예산 내역 조회 (삭제된 항목 제외)
    List<BudgetDTO> getAllBudgets();

    // 새 예산 내역 등록
    void insertBudget(BudgetDTO budget);

    // 예산 내역 수정 (업데이트)
    void updateBudget(BudgetDTO budget);

    // 예산 내역 삭제 (논리적 삭제 - is_deleted 값을 true로 변경)
    void deleteBudget(String taskNumber);
    
    // 특정 프로젝트의 총 예산액 조회
    BigDecimal getTotalProjectBudget(String projectId);

    // 특정 프로젝트의 사용된 예산액 합계 조회
    BigDecimal getUsedProjectBudget(String projectId);
}