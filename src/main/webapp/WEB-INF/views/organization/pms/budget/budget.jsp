<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>예산 / 진행률</title>
    <%-- 공통 CSS와 새로 분리한 CSS 파일을 연결합니다. --%>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/common.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/budget.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <%-- 기존 프로젝트의 헤더 모듈을 포함합니다. --%>
    <%@ include file="/WEB-INF/views/module/header.jsp" %>

    <div class="main-layout-container">
        <%-- 기존 프로젝트의 사이드바 모듈을 포함합니다. --%>
        <jsp:include page="/WEB-INF/views/commons/sidebar.jsp" />

        <div class="main-content">
            <h2 class="page-title">예산 / 진행률</h2>

            <div class="content-area">
                <div class="header-controls">
                    <div class="search-bar">
                        <i class="fas fa-search search-icon"></i>
                        <input type="text" id="searchInput" placeholder="일감 검색">
                    </div>
                    <%-- PM 역할일 때만 버튼이 보이도록 JSTL c:if 태그를 사용 --%>
                    <c:if test="${userRole eq 'PM'}">
                        <button id="openModalBtn" class="btn-register"><i class="fas fa-plus-circle"></i>예산 등록</button>
                    </c:if>
                </div>

                <div class="progress-section">
                    <%-- 예산 현황 시각화 --%>
                    <%-- JSTL을 사용하여 숫자 계산 및 퍼센트 표시 --%>
                    <c:set var="totalBudget" value="${totalBudget}" />
                    <c:set var="usedBudget" value="${usedBudget}" />

                    <%-- BigDecimal 객체를 double로 변환하여 계산합니다. --%>
                    <c:set var="usedPercentage" value="${usedBudget.doubleValue() / totalBudget.doubleValue() * 100}" />
                    <c:set var="remainingPercentage" value="${100 - usedPercentage}" />
                    
                    <div class="progress-bar-container">
                        <span class="progress-label">예산 현황</span>
                        <div class="progress-bar-wrapper">
                            <div class="progress-bar blue" style="width: ${usedPercentage > 100 ? 100 : usedPercentage}%;">
                                <%-- Math.round()는 double 타입을 인자로 받도록 수정합니다. --%>
                                ${Math.round(usedPercentage)}%
                            </div>
                        </div>
                    </div>
                    <div class="progress-bar-container">
                        <span class="progress-label">잔여 예산</span>
                        <div class="progress-bar-wrapper">
                            <div class="progress-bar green" style="width: ${remainingPercentage < 0 ? 0 : remainingPercentage}%;">
                                <%-- Math.round()는 double 타입을 인자로 받도록 수정합니다. --%>
                                ${Math.round(remainingPercentage < 0 ? 0 : remainingPercentage)}%
                            </div>
                        </div>
                    </div>
                </div>

                <div class="list-section">
                    <div class="list-header">
                        <div class="sort-options">
                            <span class="sort-amount">사용금액 <i class="fas fa-sort"></i></span>
                            <span class="sort-date">등록일 <i class="fas fa-sort"></i></span>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>TSK</th>
                                <th>예산 사용처</th>
                                <th>사용 금액</th>
                                <th>등록일</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <c:choose>
                                <c:when test="${not empty budgetList}">
                                    <c:forEach var="item" items="${budgetList}">
                                        <%-- isDeleted 값이 true면 'deleted' 클래스를 추가합니다. --%>
                                        <tr class="budget-item ${item.deleted ? 'deleted' : ''}" data-id="${item.taskNumber}">
                                            <td>${item.taskNumber}</td>
                                            <td>${item.budgetUsage}</td>
                                            <td><fmt:formatNumber value="${item.amount}" pattern="#,###" /> 원</td>
                                            <%-- LocalDateTime을 String으로 변환한 필드를 사용합니다. --%>
                                            <td>${item.dateString}</td>
                                            <td>
                                                <%-- isDeleted 값이 true가 아닐 때만 삭제 버튼을 보여줍니다. --%>
                                                <c:if test="${!item.deleted && userRole eq 'PM'}">
                                                    <button class="remove-btn"><i class="fas fa-times"></i></button>
                                                </c:if>
                                            </td>
                                        </tr>
                                    </c:forEach>
                                </c:when>
                                <c:otherwise>
                                    <tr><td colspan="5" style="text-align: center; padding: 20px;">등록된 예산 내역이 없습니다.</td></tr>
                                </c:otherwise>
                            </c:choose>
                        </tbody>
                    </table>
                    <div class="pagination">
                        <a href="#">&laquo;</a>
                        <a href="#">1</a>
                        <a href="#" class="active">2</a>
                        <a href="#">3</a>
                        <a href="#">&raquo;</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <%-- 예산 등록/상세보기 모달 --%>
    <div id="budgetModal" class="custom-modal">
        <div class="custom-modal-content">
            <div class="custom-modal-header">
                <h3>예산 등록</h3>
                <span class="close-btn">&times;</span>
            </div>
            <div class="custom-modal-body">
                <form>
                    <div class="custom-form-group">
                        <label for="taskNumber">일감</label>
                        <input type="text" id="taskNumber" name="taskNumber" value="TSK-B" readonly>
                    </div>
                    <div class="custom-form-group">
                        <label for="amount">할당 금액</label>
                        <input type="text" id="amount" name="amount" placeholder="₩1,500,000">
                    </div>
                    <div class="custom-form-group">
                        <label for="usage">사용처</label>
                        <textarea id="usage" name="usage" rows="4" placeholder="예) AWS 서버 호스팅 비용"></textarea>
                    </div>
                    <div class="custom-form-group">
                        <label for="date">지급 날짜</label>
                        <input type="date" id="date" name="date" value="2023-01-01">
                    </div>
                    <div class="custom-form-group">
                        <label for="assignee">담당자</label>
                        <input type="text" id="assignee" name="assignee" placeholder="PM">
                    </div>
                    <div class="custom-form-group">
                        <label for="notes">비고</label>
                        <textarea id="notes" name="notes" rows="2"></textarea>
                    </div>
                </form>
            </div>
            <div class="custom-modal-footer">
                <button type="button" class="btn btn-primary">등록</button>
                <button type="button" class="btn btn-secondary close-btn">취소</button>
            </div>
        </div>
    </div>
    
    <%-- 기존 프로젝트의 푸터 모듈을 포함합니다. --%>
    <%@ include file="/WEB-INF/views/module/footer.jsp" %>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const openModalBtn = document.getElementById('openModalBtn');
            const modal = document.getElementById('budgetModal');
            const closeButtons = document.querySelectorAll('.close-btn');
            
            // "예산 등록" 버튼 클릭 시 모달 열기
            openModalBtn.addEventListener('click', () => {
                modal.style.display = 'flex';
                // 모달이 열릴 때 제목을 "예산 등록"으로 설정
                modal.querySelector('.modal-header h3').textContent = '예산 등록';
                // 폼 입력 필드 초기화
                modal.querySelector('form').reset();
            });

            // 모달 닫기 버튼 클릭 시 모달 닫기
            closeButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            });

            // 모달 외부 클릭 시 모달 닫기
            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });

            // 상세페이지 모달 기능 (목록 항목 클릭 시)
            const budgetItems = document.querySelectorAll('.budget-item');
            budgetItems.forEach(item => {
                item.addEventListener('click', (event) => {
                    // "X" 버튼 클릭 시 모달이 열리지 않도록 방지
                    if (!event.target.closest('.remove-btn')) {
                        // 클릭한 항목이 삭제된 항목이면 모달을 열지 않습니다.
                        if (item.classList.contains('deleted')) {
                            console.log('이미 삭제된 항목입니다.');
                            return;
                        }

                        // 클릭한 항목의 데이터로 모달 내용을 채우는 로직 (임시 데이터)
                        const taskNumber = item.querySelector('td:nth-child(1)').textContent;
                        const usage = item.querySelector('td:nth-child(2)').textContent;
                        const amount = item.querySelector('td:nth-child(3)').textContent.replace(/[^0-9]/g, '');
                        
                        modal.querySelector('.modal-header h3').textContent = '예산 상세 정보';
                        document.getElementById('taskNumber').value = taskNumber;
                        document.getElementById('amount').value = amount;
                        document.getElementById('usage').value = usage;
                        // 등록일은 임시로 텍스트를 사용
                        document.getElementById('date').value = '2025-07-25';
                        document.getElementById('assignee').value = 'jhoon1234';
                        document.getElementById('notes').value = '상세 정보 예시';

                        modal.style.display = 'flex';
                    }
                });
            });

            // 삭제(비활성화) 버튼 기능
            const removeButtons = document.querySelectorAll('.remove-btn');
            removeButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.stopPropagation(); // 부모 요소 클릭 이벤트(모달 열기) 방지
                    
                    const row = event.target.closest('tr');
                    const taskId = row.dataset.id;
                    
                    // 삭제 확인 모달/알림창 (window.confirm 대신 커스텀 모달 사용 권장)
                    if (window.confirm(`일감 ${taskId}의 예산 사용 내역을 삭제하시겠습니까?`)) {
                        // 실제로는 여기서 서버에 삭제 요청(논리적 삭제)을 보냅니다.
                        // 서버 응답 성공 시, 아래의 시각적 변경을 적용합니다.
                        console.log(`Sending logical delete request for task ID: ${taskId}`);
                        row.classList.add('deleted');
                        row.style.cursor = 'default';
                        button.style.display = 'none'; // 버튼 숨기기
                        
                        // 예시: 삭제 버튼의 부모인 td를 클릭해도 모달이 열리지 않도록 이벤트 리스너 제거
                        const parentTd = button.closest('td');
                        parentTd.removeEventListener('click', (e) => e.stopPropagation());
                        
                        // 만약 모달을 다시 열 수 있게 하려면 이 부분을 수정해야 합니다.
                        // 예시: 상세 모달 열기 기능을 비활성화
                        row.removeEventListener('click', () => {});
                    }
                });
            });
            
            // 검색 기능 JavaScript
            const searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('keyup', (event) => {
                const searchText = event.target.value.toLowerCase();
                const rows = document.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    const rowText = row.textContent.toLowerCase();
                    row.style.display = rowText.includes(searchText) ? '' : 'none';
                });
            });
        });
    </script>
</body>
</html>
