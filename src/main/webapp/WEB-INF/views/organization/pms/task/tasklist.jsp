<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>일감 목록</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/common.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/tasklist.css">
<%-- CSS 파일명은 재사용 --%>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
	<%@ include file="/WEB-INF/views/module/header.jsp"%>

	<div class="main-layout-container">
		<jsp:include page="/WEB-INF/views/commons/sidebar.jsp" />

		<div class="main-content">
			<h2 class="page-title">일감</h2>

			<div class="content-area">

				<form id="searchForm"
					action="${pageContext.request.contextPath}/main/project/${projectId}/tasklist"
					method="GET">
					<input type='hidden' name="page" value="1" /> <input type='hidden'
						name="perPageNum" value="${pageMaker.perPageNum}" /> <input
						type='hidden' name="searchType" value="${pageMaker.searchType}" />

					<div class="issue-controls">
						<div class="search-bar">
							<i class="fas fa-search search-icon"></i> <input type="text"
								name="searchQuery" id="searchInput" placeholder="일감 검색"
								value="${pageMaker.searchQuery}">
						</div>
						<button type="button" class="create-issue-btn"
							onclick="openCreateTaskModal()">
							<i class="fas fa-plus-circle"></i> 새 일감
						</button>
					</div>
				</form>
				<%-- ▲▲▲▲▲ 수정된 부분 ▲▲▲▲▲ --%>

				<div class="issue-list-container">
					<table class="issue-table">
						<thead>
							<tr>
								<th></th>
								<th>일감 제목</th>
								<th>상태</th>
								<th>중요도</th>
								<th>담당자</th>
								<th>시작일</th>
								<th>종료일</th>
							</tr>
						</thead>
						<tbody>
							<c:choose>
								<c:when test="${not empty taskList}">
									<c:forEach var="task" items="${taskList}">
										<c:set var="statusClass"
											value="${task.taskStatus.replace(' ', '')}" />
										<c:set var="statusBadgeClass"
											value="${task.taskStatus.replace(' ', '')}-badge" />
										<tr>
											<td><i class="status-icon fas fa-circle ${statusClass}"></i></td>
											<td><a
												href="${pageContext.request.contextPath}/main/project/${projectId}/tasklist/${task.taskId}"
												class="issue-title-link"> ${task.taskTitle} </a></td>
											<td><span class="status-badge ${statusBadgeClass}">${task.taskStatus}</span></td>
											<td>${task.taskUrgency}</td>
											<td>${task.taskManagerId}</td>
											<td>${task.taskStartDate}</td>
											<td>${task.taskEndDate}</td>
										</tr>
									</c:forEach>
								</c:when>
								<c:otherwise>
									<tr>
										<td colspan="7" style="text-align: center; padding: 20px;">등록된
											일감이 없습니다.</td>
									</tr>
								</c:otherwise>
							</c:choose>
						</tbody>
					</table>
				</div>

				<%-- 페이지네이션 모듈 포함 (pageMaker 객체가 컨트롤러로부터 전달되어야 함) --%>
				<%@ include file="/WEB-INF/views/module/pagination.jsp"%>
			</div>
		</div>
	</div>

	<%-- 새 일감 생성 모달 --%>
	<div id="createTaskModal" class="custom-modal">
		<div class="custom-modal-content">
			<h2>새 일감 생성</h2>
			<label for="newTaskTitle">일감 제목</label> <input type="text"
				id="newTaskTitle" placeholder="일감 제목을 입력하세요"> <label
				for="newTaskDescription">일감 설명</label>
			<textarea id="newTaskDescription" placeholder="상세 설명을 입력하세요"></textarea>

			<label for="newTaskManagerId">담당자</label> <input type="text"
				id="newTaskManagerId" placeholder="담당자 ID를 입력하세요"> <label
				for="newTaskStartDate">시작일</label> <input type="date"
				id="newTaskStartDate"> <label for="newTaskEndDate">종료일</label>
			<input type="date" id="newTaskEndDate"> <label
				for="newStatusSelect">진행 상태</label> <select id="newStatusSelect">
				<option value="">선택</option>
				<option value="진행 중">진행 중</option>
				<option value="완료">완료</option>
				<option value="검토 중">검토 중</option>
				<option value="대기 중">대기 중</option>
			</select> <label for="newUrgencySelect">중요도</label> <select
				id="newUrgencySelect">
				<option value="">선택</option>
				<option value="Critical">Critical</option>
				<option value="High">High</option>
				<option value="Moderate">Moderate</option>
				<option value="Minor">Minor</option>
			</select>
		</div>
		<div class="custom-modal-buttons">
			<button class="custom-confirm-btn" onclick="addNewTask()">확인</button>
			<button class="custom-cancel-btn" onclick="closeCreateTaskModal()">취소</button>
		</div>
	</div>
	<div id="modalOverlay" class="custom-modal-overlay"></div>

	<%@ include file="/WEB-INF/views/module/footer.jsp"%>

	<script>
    document.addEventListener('DOMContentLoaded', function() {
        
        // --- 1. 변수 선언 ---
        const contextPath = "${pageContext.request.contextPath}";
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        const searchIcon = document.querySelector('.search-icon');
        const modal = document.getElementById('createTaskModal');
        const overlay = document.getElementById('modalOverlay');
        const openModalBtn = document.querySelector('.create-issue-btn');

        // --- 2. 함수 정의 ---
        function openCreateTaskModal() {
            if (modal) modal.style.display = 'block';
            if (overlay) overlay.style.display = 'block';
        }

        function closeCreateTaskModal() {
            if (modal) modal.style.display = 'none';
            if (overlay) overlay.style.display = 'none';
        }
        
        // 전역에서 호출 가능하도록 window 객체에 할당
        window.openCreateTaskModal = openCreateTaskModal;
        window.closeCreateTaskModal = closeCreateTaskModal;

        function search_list(page) {
            if (searchForm) {
                // form 안에 page input이 없다면 동적으로 생성
                let pageInput = searchForm.querySelector('input[name="page"]');
                if (!pageInput) {
                    pageInput = document.createElement('input');
                    pageInput.type = 'hidden';
                    pageInput.name = 'page';
                    searchForm.appendChild(pageInput);
                }
                pageInput.value = page;
                searchForm.submit();
            }
        }
        window.search_list = search_list; // pagination.jsp에서 호출 가능하도록

        function addNewTask() {
        	const projectId = "${projectId}";
        	const newTask = {
            	projectId: projectId,
                taskTitle: document.getElementById('newTaskTitle').value,
                taskDescription: document.getElementById('newTaskDescription').value,
                taskManagerId: document.getElementById('newTaskManagerId').value,
                taskStartDate: document.getElementById('newTaskStartDate').value,
                taskEndDate: document.getElementById('newTaskEndDate').value,
                taskStatus: document.getElementById('newStatusSelect').value,
                taskUrgency: document.getElementById('newUrgencySelect').value
            };

            if (!newTask.taskTitle || !newTask.taskManagerId || !newTask.taskStatus || !newTask.taskUrgency) {
                alert('제목, 담당자, 상태, 중요도는 필수 입력 항목입니다.');
                return;
            }
            
            fetch(`${pageContext.request.contextPath}/main/project/${projectId}/tasklist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask)
            })
            .then(response => response.ok ? response.json() : Promise.reject('서버 응답 실패'))
            .then(data => {
                alert(data.message || '일감이 성공적으로 등록되었습니다.');
                location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('일감 등록 중 오류가 발생했습니다.');
            });
        }
        window.addNewTask = addNewTask; // onclick에서 호출 가능하도록

        // --- 3. 이벤트 리스너 할당 ---
        if (overlay) overlay.addEventListener('click', closeCreateTaskModal);
        modal.querySelector('.custom-cancel-btn').addEventListener('click', closeCreateTaskModal);

        if (searchIcon) searchIcon.addEventListener('click', () => search_list(1));
        if (searchInput) {
            searchInput.addEventListener('keypress', e => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    search_list(1);
                }
            });
        }

        const currentPath = window.location.pathname;
        const sidebarLinks = document.querySelectorAll('.sidebar-menu li a');
        sidebarLinks.forEach(function(link) {
            const linkPath = link.getAttribute('href');
            if (linkPath && currentPath.includes('/main/task')) {
                if (link.textContent.trim() === 'TASK') {
                    link.parentElement.classList.add('active');
                }
            }
        });
    });
</script>
</body>
</html>