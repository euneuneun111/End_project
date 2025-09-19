<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이슈 목록</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/common.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/issuelist.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
    <%@ include file="/WEB-INF/views/module/header.jsp" %>

    <div class="main-layout-container">
        <jsp:include page="/WEB-INF/views/commons/sidebar.jsp" />

        <div class="main-content">
            <h2 class="page-title">이슈</h2>

            <div class="content-area">
                <!-- 검색 및 페이지네이션을 위한 폼 추가 -->
                <!-- action URL을 issuelist로 변경 -->
                <form id="jobForm" action="${pageContext.request.contextPath}/main/project/${projectId}/issuelist" method="GET">
    
    <input type='hidden' name="page" value="${pageMaker.page}" />
    <input type='hidden' name="perPageNum" value="${pageMaker.perPageNum}" />
    
    <div class="issue-controls">
        <div class="search-bar">
            <i class="fas fa-search search-icon"></i>
            <input type="text" name="keyword" id="searchInput" placeholder="이슈 검색" value="${pageMaker.searchQuery}">
        </div>
        <button type="button" class="create-issue-btn" onclick="openCreateIssueModal()">
            <i class="fas fa-plus-circle"></i> 새 이슈
        </button>
    </div>
</form>

                <div class="issue-list-container">
                    <table class="issue-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>이슈 명</th>
                                <th>상태</th>
                                <th>우선순위</th>
                                <th>담당자</th>
                            </tr>
                        </thead>
                        <tbody>
                            <c:choose>
                                <c:when test="${not empty issueList}">
                                    <c:forEach var="issue" items="${issueList}">
                                        <c:set var="statusClass" value="${issue.issueStatus.replace(' ', '')}" />
                                        <c:set var="statusBadgeClass" value="${issue.issueStatus.replace(' ', '')}-badge" />
                                        <tr>
                                            <td><i class="status-icon fas fa-circle ${statusClass}"></i></td>
                                            <td>
                                                <a href="${pageContext.request.contextPath}/main/project/${projectId}/issuelist/${issue.issueId}" class="issue-title-link">
                                                    ${issue.issueTitle}
                                                </a>
                                            </td>
                                            <td><span class="status-badge ${statusBadgeClass}">${issue.issueStatus}</span></td>
                                            <td>${issue.issueUrgency}</td>
                                            <td>${issue.issueManagerId}</td>
                                        </tr>
                                    </c:forEach>
                                </c:when>
                                <c:otherwise>
                                    <tr><td colspan="5" style="text-align: center; padding: 20px;">등록된 이슈가 없습니다.</td></tr>
                                </c:otherwise>
                            </c:choose>
                        </tbody>
                    </table>
                </div>

                <%@ include file="/WEB-INF/views/module/pagination.jsp" %>
            </div>
        </div>
    </div>

    <div id="createIssueModal" class="custom-modal">
        <h2>새 이슈 생성</h2>
        <div class="custom-modal-content">
        <div class="custom-modal-form-group">
            <label for="newIssueTitle">이슈 이름</label>
            <input type="text" id="newIssueTitle" placeholder="이슈 제목을 입력하세요">
		
            <label for="newIssueContent">이슈 설명</label>
            <textarea id="newIssueContent" placeholder="상세 설명을 입력하세요"></textarea>
		<div class="custom-modal-form-group">
            <label for="statusSelect">진행도</label>
            <select id="statusSelect">
                <option value="">선택</option>
                <option value="진행 중">진행 중</option>
                <option value="완료">완료</option>
                <option value="검토 중">검토 중</option>
                <option value="대기 중">대기 중</option>
            </select>
		</div>
		<div class="custom-modal-form-group">
            <label for="urgencySelect">우선순위</label>
            <select id="urgencySelect">
                <option value="">선택</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Moderate">Moderate</option>
                <option value="Minor">Minor</option>
            </select>
		</div>
		<div class="custom-modal-form-group">
            <label for="taskNameSelect">일감이름</label>
            <select id="taskNameSelect">
    <option value="">선택</option>
    <c:forEach var="task" items="${taskList}">
        <%-- taskName -> taskTitle --%>
        <option value="${task.taskId}">${task.taskTitle}</option>
    </c:forEach>
</select>
            </div>
        </div>
        <div class="custom-modal-buttons">
            <button class="custom-confirm-btn" onclick="addNewIssue()">확인</button>
            <button class="custom-cancel-btn" onclick="closeCreateIssueModal()">취소</button>
        </div>
        </div>
    </div>
    <div id="modalOverlay" class="custom-modal-overlay"></div>

    <%@ include file="/WEB-INF/views/module/footer.jsp" %>
    
<script>
    document.addEventListener('DOMContentLoaded', function() {
        
        // --- 1. 필요한 모든 변수를 먼저 선언합니다. ---
        const contextPath = "${pageContext.request.contextPath}";
        const currentProjectId = "PJ-001";
        const loggedInUserId = "${sessionScope.loginUser.user_id}";

        const modal = document.getElementById('createIssueModal');
        const overlay = document.getElementById('modalOverlay');
        const openModalBtn = document.getElementById('openCreateIssueModal');
        const closeButtons = modal.querySelectorAll('.custom-cancel-btn'); // CSS 클래스에 맞게 수정
        
        const jobForm = document.getElementById('jobForm');
        const searchInput = document.getElementById('searchInput');
        const searchIcon = document.querySelector('.search-bar .search-icon');
        
        // --- 2. 모든 함수를 이곳에 정의합니다. ---

        function openCreateIssueModal() {
            modal.style.display = 'block';
            overlay.style.display = 'block';
            document.body.classList.add('modal-active');
        }

        function closeCreateIssueModal() {
            modal.style.display = 'none';
            overlay.style.display = 'none';
            document.body.classList.remove('modal-active');
        }

        // 검색 및 페이지 이동을 처리하는 함수
        function search_list(page) {
            if (jobForm) {
                // jobForm 안에 page input이 없다면 동적으로 생성
                let pageInput = jobForm.querySelector('input[name="page"]');
                if (!pageInput) {
                    pageInput = document.createElement('input');
                    pageInput.type = 'hidden';
                    pageInput.name = 'page';
                    jobForm.appendChild(pageInput);
                }
                pageInput.value = page;
                jobForm.submit();
            }
        }
        
        function addNewIssue() {
            const taskSelectElement = document.getElementById('taskNameSelect');
            const issueTitle = document.getElementById('newIssueTitle').value;
            const issueContent = document.getElementById('newIssueContent').value;
            const issueStatus = document.getElementById('statusSelect').value;
            const issueUrgency = document.getElementById('urgencySelect').value;
            const taskId = taskSelectElement.value;
            const taskTitle = taskId ? taskSelectElement.options[taskSelectElement.selectedIndex].text : "";

            if (!issueTitle || !issueStatus || !issueUrgency || !taskId) {
                alert('일감을 포함한 모든 필수 필드를 입력해주세요.');
                return;
            }

            const newIssue = {
                issueTitle: issueTitle,
                issueContent: issueContent,
                issueStatus: issueStatus,
                issueUrgency: issueUrgency,
                taskId: taskId,
                taskTitle: taskTitle,
                issueManagerId: "mimi",
                projectId: currentProjectId,
                issueCreatorId: "user-001"
            };
            
            const postUrl = contextPath + '/main/project/' + currentProjectId + '/issuelist';
            
            fetch(postUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newIssue)
            })
            .then(response => {
                if (!response.ok) throw new Error(`서버 응답 오류: ${response.status}`);
                return response.json();
            })
            .then(data => {
                alert(data.message || '이슈가 성공적으로 저장되었습니다.');
                closeCreateIssueModal();
                window.location.reload();
            })
            .catch(error => {
                console.error('이슈 등록 중 오류 발생:', error);
                alert(`이슈 등록 중 오류가 발생했습니다: ${error.message}`);
            });
        }
        
        // --- 3. 이벤트 리스너를 할당합니다. ---

        if (openModalBtn) openModalBtn.addEventListener('click', openCreateIssueModal);
        if (overlay) overlay.addEventListener('click', closeCreateIssueModal);
        closeButtons.forEach(btn => btn.addEventListener('click', closeCreateIssueModal));
        
        // 함수를 HTML onclick에서 호출할 수 있도록 window 객체에 할당
        window.openCreateIssueModal = openCreateIssueModal;
        window.addNewIssue = addNewIssue;
        window.search_list = search_list; // pagination.jsp에서 호출할 수 있도록 전역 함수로 지정
        
        if (searchIcon) {
            searchIcon.addEventListener('click', () => search_list(1));
        }
        
        if (searchInput) {
            searchInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    search_list(1);
                }
            });
        }
        
        // 사이드바 활성화 로직
        const currentPath = window.location.pathname;
        const sidebarLinks = document.querySelectorAll('.sidebar-menu li a');
        sidebarLinks.forEach(function(link) {
            const linkPath = link.getAttribute('href');
            if (linkPath && currentPath.includes('issuelist')) {
                if (link.textContent.trim() === 'ISSUE') {
                    link.parentElement.classList.add('active');
                }
            }
        });
    });
</script>
</body>
</html>