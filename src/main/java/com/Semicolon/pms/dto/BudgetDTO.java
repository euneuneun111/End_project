package com.Semicolon.pms.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BudgetDTO {
    // 필드 정의
    private String taskNumber;
    private String budgetUsage;
    private BigDecimal amount;
    private LocalDateTime date; // 기존 LocalDateTime 필드
    private String dateString; // JSP에서 사용하기 위한 날짜 String 필드 추가
    private boolean isDeleted;

    // String, String, BigDecimal, LocalDateTime, boolean 매개변수를 받는 생성자
    public BudgetDTO(String taskNumber, String budgetUsage, BigDecimal amount, LocalDateTime date, boolean isDeleted) {
        this.taskNumber = taskNumber;
        this.budgetUsage = budgetUsage;
        this.amount = amount;
        this.date = date;
        this.isDeleted = isDeleted;
    }

    // 기본 생성자
    public BudgetDTO() {
    }

    // isDeleted() 메서드는 boolean 타입의 Getter 관례에 맞게 유지
    public boolean isDeleted() {
        return this.isDeleted;
    }

    // Getter and Setter
    public String getTaskNumber() {
        return taskNumber;
    }

    public void setTaskNumber(String taskNumber) {
        this.taskNumber = taskNumber;
    }

    public String getBudgetUsage() {
        return budgetUsage;
    }

    public void setBudgetUsage(String budgetUsage) {
        this.budgetUsage = budgetUsage;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    // 새로 추가된 dateString 필드의 Getter와 Setter
    public String getDateString() {
        return dateString;
    }

    public void setDateString(String dateString) {
        this.dateString = dateString;
    }
}
