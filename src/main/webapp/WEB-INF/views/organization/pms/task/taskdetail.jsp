<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>일감 상세</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/common.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/issuedetail.css"> <%-- CSS 파일명은 재사용 --%>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
	<%@ include file="/WEB-INF/views/module/header.jsp"%>

	<div class="main-layout-container">
		<jsp:include page="/WEB-INF/views/commons/sidebar.jsp" />

		<div class="main-content">
			<div class="page-header">
				<h2 class="page-title">일감 상세</h2>
				<div class="action-buttons">
					<button class="btn btn-primary" onclick="openEditTaskModal()">
						<i class="fas fa-edit"></i> 일감 수정
					</button>
					<button class="btn btn-danger" onclick="confirmTaskDeletion()">
						<i class="fas fa-trash-alt"></i> 일감 삭제
					</button>
				</div>
			</div>

			<div class="issue-detail-card"> <%-- CSS 클래스명은 재사용 --%>
				<div class="detail-section">
					<label for="taskTitle">일감 제목</label> <input type="text"
						id="taskTitle" value="${task.taskTitle}" readonly>
				</div>
                <div class="detail-section">
					<label for="taskManagerId">담당자</label> <input type="text"
						id="taskManagerId" value="${task.taskManagerId}" readonly>
				</div>
				<div class="detail-section">
					<label for="taskDescription">일감 설명</label>
					<textarea id="taskDescription" rows="5" readonly>${task.taskDescription}</textarea>
				</div>
                <div class="detail-section status-urgency-group">
                    <div class="detail-field">
                        <label for="taskStartDate">시작일</label> <input type="text"
                            id="taskStartDate" value="${task.taskStartDate}" readonly>
                    </div>
                    <div class="detail-field">
                        <label for="taskEndDate">종료일</label> <input type="text"
                            id="taskEndDate" value="${task.taskEndDate}" readonly>
                    </div>
                </div>
				<div class="detail-section status-urgency-group">
					<div class="detail-field">
						<label for="detailStatus">진행 상태</label> <input type="text"
							id="detailStatus" value="${task.taskStatus}" readonly>
					</div>
					<div class="detail-field">
						<label for="detailUrgency">중요도</label> <input type="text"
							id="detailUrgency" value="${task.taskUrgency}" readonly>
					</div>
				</div>

				<div class="comments-section">
					<h3>댓글</h3>
					<div class="comment-input-area">
						<textarea id="replyContentInput" placeholder="댓글을 입력하세요" rows="2"></textarea>
						<button id="addReplyBtn" class="btn btn-secondary">추가하기</button>
					</div>
					<div class="comment-list">
						<c:choose>
							<c:when test="${not empty task.comments}">
								<c:forEach var="reply" items="${task.comments}">
									<div class="comment-item">
										<span class="comment-author">${reply.userId}</span> <span
											class="comment-time">${reply.regDate}</span>
										<button class="comment-options-btn" onclick="deleteReply('${reply.replyNumber}')">
											<i class="fas fa-ellipsis-h"></i>
										</button>
										<p class="comment-text">${reply.replyContent}</p>
									</div>
								</c:forEach>
							</c:when>
							<c:otherwise>
								<div style="text-align: center; color: #888; padding: 15px;">아직 댓글이 없습니다.</div>
							</c:otherwise>
						</c:choose>
					</div>
				</div>

				<div class="form-actions">
					<button class="btn btn-primary" onclick="window.history.back()">확인</button>
					<button class="btn btn-cancel" onclick="window.history.back()">취소</button>
				</div>
			</div>
		</div>
	</div>

	<%-- 일감 수정 모달 --%>
	<div id="editTaskModal" class="custom-modal">
		<div class="custom-modal-content">
			<h2>일감 수정</h2>
			<div class="custom-modal-form-group">
			<form id="editTaskForm">
				<input type="hidden" id="editTaskId" value="${task.taskId}">

				<label for="editTaskTitle">일감 제목</label> <input type="text"
					id="editTaskTitle" value="${task.taskTitle}">

                <label for="editTaskManagerId">담당자</label> <input type="text"
					id="editTaskManagerId" value="${task.taskManagerId}">

				<label for="editTaskDescription">일감 내용</label>
				<textarea id="editTaskDescription" rows="5">${task.taskDescription}</textarea>

                <label for="editTaskStartDate">시작일</label> <input type="date"
					id="editTaskStartDate" value="${task.taskStartDate}">

                <label for="editTaskEndDate">종료일</label> <input type="date"
					id="editTaskEndDate" value="${task.taskEndDate}">

				<label for="editStatusSelect">진행 상태</label> <select
					id="editStatusSelect">
					<option value="진행 중" <c:if test="${task.taskStatus eq '진행 중'}">selected</c:if>>진행 중</option>
					<option value="완료" <c:if test="${task.taskStatus eq '완료'}">selected</c:if>>완료</option>
					<option value="검토 중" <c:if test="${task.taskStatus eq '검토 중'}">selected</c:if>>검토 중</option>
					<option value="대기 중" <c:if test="${task.taskStatus eq '대기 중'}">selected</c:if>>대기 중</option>
				</select>
                
                <label for="editUrgencySelect">중요도</label> <select
					id="editUrgencySelect">
					<option value="Critical" <c:if test="${task.taskUrgency eq 'Critical'}">selected</c:if>>Critical</option>
					<option value="High" <c:if test="${task.taskUrgency eq 'High'}">selected</c:if>>High</option>
					<option value="Moderate" <c:if test="${task.taskUrgency eq 'Moderate'}">selected</c:if>>Moderate</option>
					<option value="Minor" <c:if test="${task.taskUrgency eq 'Minor'}">selected</c:if>>Minor</option>
				</select>
			</form>
			</div>
			<div class="custom-modal-buttons">
				<button class="custom-confirm-btn" onclick="submitEditTask()">확인</button>
				<button class="custom-cancel-btn" onclick="closeEditTaskModal()">취소</button>
			</div>
		</div>
	</div>
	<div id="modalOverlayEdit" class="custom-modal-overlay"></div>

	<%@ include file="/WEB-INF/views/module/footer.jsp"%>

	<script src="${pageContext.request.contextPath}/resources/js/common.js"></script>
	<script>
document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.sidebar-menu li a');
    const currentPath = window.location.pathname;

    sidebarLinks.forEach(function(link) {
        const linkPath = link.getAttribute('href');
        if (linkPath && currentPath.includes('/main/project')) {
            if (linkPath.includes('tasklist')) {
                link.parentElement.classList.add('active');
            }
        }
    });

    // 댓글 추가 기능
    const addReplyBtn = document.getElementById('addReplyBtn');
    if (addReplyBtn) {
        addReplyBtn.addEventListener('click', function() {
            const replyContent = document.getElementById('replyContentInput').value.trim();
            const taskId = "${task.taskId}";
            const userId = "loggedInUser"; // TODO: 실제 로그인된 사용자 ID로 변경

            if (!replyContent) {
                alert("댓글 내용을 입력해주세요.");
                return;
            }

            // ✅ [수정 3] 서버 DTO에 맞게 키 이름을 'taskId'로 변경
            const newReplyData = {
                taskId: taskId,
                userId: userId,
                replyContent: replyContent
            };

            // ✅ [수정 3] Task 댓글 API 주소로 변경
            fetch('${pageContext.request.contextPath}/task-replies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReplyData)
            })
            .then(response => response.text()) // 컨트롤러가 "SUCCESS" 문자열을 반환하므로 .text() 사용
            .then(result => {
                if (result === "SUCCESS") {
                    alert("댓글이 등록되었습니다.");
                    window.location.reload();
                } else {
                    alert(result || "댓글 추가 중 오류 발생");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("댓글 추가 중 통신 오류 발생");
            });
        });
    }
});

// 댓글 삭제 함수 (전역 스코프로 이동)
function deleteReply(replyNumber) {
    if (confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
        // Task 댓글 삭제 API 주소 (예시: /task-replies/댓글번호)
        fetch('${pageContext.request.contextPath}/task-replies/' + replyNumber, {
            method: 'DELETE'
        })
        .then(response => response.text())
        .then(result => {
            if (result === "SUCCESS") {
                alert("댓글이 삭제되었습니다.");
                window.location.reload();
            } else {
                alert(result || '댓글 삭제 실패');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('댓글 삭제 중 오류가 발생했습니다.');
        });
    }
}

// 수정 모달 열기/닫기
function openEditTaskModal() {
    document.getElementById('editTaskModal').style.display = 'block';
    document.getElementById('modalOverlayEdit').style.display = 'block';
}

function closeEditTaskModal() {
    document.getElementById('editTaskModal').style.display = 'none';
    document.getElementById('modalOverlayEdit').style.display = 'none';
}

document.getElementById('modalOverlayEdit').addEventListener('click', closeEditTaskModal);

// 일감 수정 제출
function submitEditTask() {
	const taskStartDate = document.getElementById('editTaskStartDate').value;
    const taskEndDate = document.getElementById('editTaskEndDate').value;
    const taskTitle = document.getElementById('editTaskTitle').value;

    // ✅ [추가] 필수 값(제목, 시작일, 종료일)이 비어있는지 확인합니다.
    if (!taskTitle) {
        alert("일감 제목은 필수 입력 항목입니다.");
        return; // 함수 실행 중단
    }
    if (!taskStartDate || !taskEndDate) {
        alert("시작일과 종료일은 필수 입력 항목입니다.");
        return; // 함수 실행 중단
    }
	
    // ✅ [수정 1] 올바른 객체 정의
    const updatedData = {
        taskId: document.getElementById('editTaskId').value,
        taskTitle: document.getElementById('editTaskTitle').value,
        taskManagerId: document.getElementById('editTaskManagerId').value,
        taskDescription: document.getElementById('editTaskDescription').value,
        taskStartDate: document.getElementById('editTaskStartDate').value,
        taskEndDate: document.getElementById('editTaskEndDate').value,
        taskStatus: document.getElementById('editStatusSelect').value,
        taskUrgency: document.getElementById('editUrgencySelect').value
    };

    // ✅ [수정 2] task 객체에서 projectId를 가져오도록 수정
    const projectId = "${task.projectId}";
    const taskId = updatedData.taskId;

    if (!projectId) {
        alert("프로젝트 정보를 찾을 수 없어 수정할 수 없습니다.");
        return;
    }

    fetch(`${pageContext.request.contextPath}/main/project/${projectId}/tasklist/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    // ▼▼▼▼▼ 수정된 부분 ▼▼▼▼▼
    .then(response => {
        if (!response.ok) {
            // 서버 응답이 200번대가 아닐 경우 에러로 처리
            throw new Error('서버 응답이 올바르지 않습니다.');
        }
        return response.text(); // json() -> text() 로 변경
    })
    .then(result => { // 변수명을 data -> result 로 변경하여 명확화
        if (result.includes("SUCCESS")) { // 'SUCCESS' 문자열이 포함되어 있는지 확인
            alert("일감이 성공적으로 수정되었습니다."); // 성공 메시지를 직접 작성
            closeEditTaskModal();
            window.location.reload();
        } else {
            alert(result || "일감 수정 중 오류가 발생했습니다.");
        }
    })
    // ▲▲▲▲▲ 수정된 부분 ▲▲▲▲▲
    .catch(error => {
        console.error('Error:', error);
        alert("서버 통신 중 오류가 발생했습니다.");
    });
}

// 일감 삭제 확인
function confirmTaskDeletion() {
    if (confirm("해당 일감을 삭제하시겠습니까?")) {
        const taskId = "${task.taskId}";
        const projectId = "${task.projectId}";

        if (!projectId) {
            alert("프로젝트 정보를 찾을 수 없어 삭제할 수 없습니다.");
            return;
        }

        fetch(`${pageContext.request.contextPath}/main/project/${projectId}/tasklist/${taskId}`, {
            method: 'DELETE'
        })
        // ▼▼▼▼▼ 수정된 부분 ▼▼▼▼▼
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 응답이 올바르지 않습니다.');
            }
            // 서버가 "SUCCESS" 문자열을 반환하므로 .text()로 받습니다.
            return response.text(); 
        })
        .then(result => {
            // 반환된 텍스트가 "SUCCESS"를 포함하는지 확인합니다.
            if (result.includes("SUCCESS")) { 
                alert("일감이 성공적으로 삭제되었습니다.");
                // 삭제 후 일감 목록 페이지로 이동합니다.
                window.location.href = `${pageContext.request.contextPath}/main/project/${projectId}/tasklist`;
            } else {
                alert(result || "일감 삭제 중 오류가 발생했습니다.");
            }
        })
        // ▲▲▲▲▲ 수정된 부분 ▲▲▲▲▲
        .catch(error => {
            console.error('Error:', error);
            alert("서버 통신 중 오류가 발생했습니다.");
        });
    }
}
</script>
</body>
</html>