<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>이슈 상세</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/common.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/issuedetail.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
	<%@ include file="/WEB-INF/views/module/header.jsp"%>

	<div class="main-layout-container">
		<jsp:include page="/WEB-INF/views/commons/sidebar.jsp" />

		<div class="main-content">
			<div class="page-header">
				<h2 class="page-title">이슈 상세</h2>
				<div class="action-buttons">
					<button class="btn btn-primary" onclick="openEditIssueModal()">
						<i class="fas fa-edit"></i> 이슈 수정
					</button>
					<button class="btn btn-danger" onclick="confirmIssueDeletion()">
						<i class="fas fa-trash-alt"></i> 이슈 삭제
					</button>
				</div>
			</div>

			<div class="issue-detail-card">
				<div class="detail-section">
					<label for="issueName">이슈이름</label> <input type="text"
						id="issueName" value="${issue.issueTitle}" readonly>
				</div>

				<div class="detail-section">
					<label for="issueContent">이슈내용</label>
					<textarea id="issueContent" rows="5" readonly>${issue.issueContent}</textarea>
				</div>
				<div class="detail-section status-urgency-group">
					<div class="detail-field">
						<label for="detailStatus">진행도</label> <input type="text"
							id="detailStatus" value="${issue.issueStatus}" readonly>
					</div>
					<div class="detail-field">
						<label for="detailUrgency">우선순위</label> <input type="text"
							id="detailUrgency" value="${issue.issueUrgency}" readonly>
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
        <c:when test="${not empty issue.comments}">
            <c:forEach var="reply" items="${issue.comments}">
                <div class="comment-item">
                    <div class="comment-header">
                        <span class="comment-author">${reply.userId}</span>
                        <span class="comment-time">${reply.regDate}</span>
                    </div>
                    <p class="comment-text">${reply.replyContent}</p>
                    
                    <%-- [수정] 점 세 개 버튼을 '삭제' 텍스트 버튼으로 변경 --%>
                    <button class="comment-delete-btn" onclick="deleteReply('${reply.replyNumber}')">
                        삭제
                    </button>
                </div>
            </c:forEach>
        </c:when>
        <c:otherwise>
            <div style="text-align: center; color: #888; padding: 15px;">
                아직 댓글이 없습니다.
            </div>
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
		<%-- /main-content --%>
	</div>
	<%-- /main-layout-container --%>

	<%-- 이슈 수정 모달 HTML --%>
	<div id="editIssueModal" class="custom-modal">
		<div class="custom-modal-content">
			<h2>이슈 수정</h2>
			<div class="custom-modal-form-group">
				<input type="hidden" id="editIssueId" value="${issue.issueId}">

				<label for="editIssueTitle">이슈 이름</label> <input type="text"
					id="editIssueTitle" value="${issue.issueTitle}"> <label
					for="editIssueContent">이슈 내용</label>
				<textarea id="editIssueContent" rows="5">${issue.issueContent}</textarea>

				<label for="editStatusSelect">진행도</label> <select
					id="editStatusSelect">
					<option value="진행 중"
						<c:if test="${issue.issueStatus eq '진행 중'}">selected</c:if>>진행
						중</option>
					<option value="완료"
						<c:if test="${issue.issueStatus eq '완료'}">selected</c:if>>완료</option>
					<option value="검토 중"
						<c:if test="${issue.issueStatus eq '검토 중'}">selected</c:if>>검토
						중</option>
					<option value="대기 중"
						<c:if test="${issue.issueStatus eq '대기 중'}">selected</c:if>>대기
						중</option>
				</select> 
				
				<label for="editUrgencySelect">우선순위</label> <select
					id="editUrgencySelect">
					<option value="Critical"
						<c:if test="${issue.issueUrgency eq 'Critical'}">selected</c:if>>Critical</option>
					<option value="High"
						<c:if test="${issue.issueUrgency eq 'High'}">selected</c:if>>High</option>
					<option value="Moderate"
						<c:if test="${issue.issueUrgency eq 'Moderate'}">selected</c:if>>Moderate</option>
					<option value="Minor"
						<c:if test="${issue.issueUrgency eq 'Minor'}">selected</c:if>>Minor</option>
				</select>
			</div>
			<div class="custom-modal-buttons">
				<button class="custom-confirm-btn" onclick="submitEditIssue()">확인</button>
				<button class="custom-cancel-btn" onclick="closeEditIssueModal()">취소</button>
			</div>
		</div>
	</div>
	<div id="modalOverlayEdit" class="custom-modal-overlay"></div>

	<%@ include file="/WEB-INF/views/module/footer.jsp"%>

	<script src="${pageContext.request.contextPath}/resources/js/common.js"></script>
	<script>
		document.addEventListener('DOMContentLoaded', function() {
			var currentPath = window.location.pathname;
			var sidebarLinks = document.querySelectorAll('.sidebar-menu li a');

			sidebarLinks.forEach(function(link) {
				var linkPath = link.getAttribute('href');
				if (linkPath && currentPath.includes('/main/project/issue')) { // 경로를 더 정확하게 수정
	                if (link.textContent.trim() === 'ISSUE') { // 텍스트 기반으로 'ISSUE' 메뉴 활성화
	                    link.parentElement.classList.add('active');
	                }
	            }
			});
			
			// 댓글 추가 기능 이벤트 리스너
            const addReplyBtn = document.getElementById('addReplyBtn');
            const replyContentInput = document.getElementById('replyContentInput');

            if(addReplyBtn) {
                addReplyBtn.addEventListener('click', function() {
                    const replyContent = replyContentInput.value.trim();
                    const issueId = "${issue.issueId}";
                    const userId = "loggedInUser"; // TODO: 실제 로그인된 사용자 ID로 변경 필요

                    if (replyContent.length === 0) {
                        alert("댓글 내용을 입력해주세요.");
                        return;
                    }
                    
                    const newReplyData = {
                    	    issueId: issueId,
                    	    userId: userId,
                    	    replyContent: replyContent,
                    	    engId: "", // 또는 실제 값
                    	    groupId: "" // 또는 실제 값
                    	};

fetch('${pageContext.request.contextPath}/main/project/reply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newReplyData)
})
.then(response => response.json())
.then(data => {
    if (data.message) {
        alert(data.message);
        window.location.reload();
    } else {
        alert(data.error || "댓글 추가 중 오류가 발생했습니다.");
    }
})
.catch(error => {
    console.error('Error:', error);
    alert("댓글 추가 중 오류가 발생했습니다.");
});
});
}
});
	    // 댓글 삭제 함수 추가
	    function deleteReply(replyNumber) {
	        if (confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
	            // [수정] URL에 '/project' 추가
	            fetch('${pageContext.request.contextPath}/main/project/issue/reply/' + replyNumber, {
	                method: 'DELETE'
	            })
	            .then(response => {
	                if (!response.ok) throw new Error('댓글 삭제 실패');
	                return response.json();
	            })
	            .then(data => {
	                alert(data.message);
	                window.location.reload();
	            })
	            .catch(error => {
	                console.error('Error:', error);
	                alert('댓글 삭제 중 오류가 발생했습니다.');
	            });
	        }
	    }
		function openEditIssueModal() {
			document.getElementById('editIssueModal').style.display = 'block';
			document.getElementById('modalOverlayEdit').style.display = 'block';
			document.body.classList.add('modal-active');
		}

		function closeEditIssueModal() {
			document.getElementById('editIssueModal').style.display = 'none';
			document.getElementById('modalOverlayEdit').style.display = 'none';
			document.body.classList.remove('modal-active');
		}

		document.getElementById('modalOverlayEdit').addEventListener('click',
				closeEditIssueModal);

	    function submitEditIssue() {
	        const issueId = document.getElementById('editIssueId').value;
	        const issueTitle = document.getElementById('editIssueTitle').value;
	        const issueContent = document.getElementById('editIssueContent').value;
	        const issueStatus = document.getElementById('editStatusSelect').value;
	        const issueUrgency = document.getElementById('editUrgencySelect').value;

	        const updatedData = {
	            issueId : issueId,
	            issueTitle : issueTitle,
	            issueContent : issueContent,
	            issueStatus : issueStatus,
	            issueUrgency : issueUrgency
	        };

	        // [수정] URL에 '/project' 추가
	        fetch('${pageContext.request.contextPath}/main/project/issue/update', {
	            method: 'PUT',
	            headers: { 'Content-Type': 'application/json' },
	            body: JSON.stringify(updatedData)
	        })
	        .then(response => response.json())
	        .then(data => {
	            if (data.message) {
	                alert(data.message);
	                closeEditIssueModal();
	                window.location.reload();
	            } else {
	                alert(data.error || "이슈 수정 중 오류가 발생했습니다.");
	            }
	        })
	        .catch(error => {
	            console.error('Error:', error);
	            alert("서버 통신 중 오류가 발생했습니다.");
	        });
	    }

		var taskNameLink = document.getElementById('taskNameLink');
		if (taskNameLink) {
			taskNameLink
					.addEventListener(
							'click',
							function(event) {
								event.preventDefault();

								var taskDetailUrl = this.href;
								if (taskDetailUrl === "${pageContext.request.contextPath}/main/task/") {
									alert("해당 이슈에 연결된 일감이 없습니다.");
								} else {
									console.log("일감 클릭됨. 이동할 URL: "
											+ taskDetailUrl);
									window.location.href = taskDetailUrl;
								}
							});
		}

	    function confirmIssueDeletion() {
	        if (confirm("해당 이슈를 삭제하시겠습니까?")) {
	            const issueId = "${issue.issueId}";
	            const projectId = "${issue.projectId}"; // projectId 가져오기

	            // [수정] URL에 '/project' 추가
	            fetch('${pageContext.request.contextPath}/main/project/issue/' + issueId, {
	                method: 'DELETE'
	            })
	            .then(response => response.json())
	            .then(data => {
	                if (data.message) {
	                    alert(data.message);
	                    // [수정] 삭제 후 올바른 이슈 목록 페이지로 이동
	                    window.location.href = "${pageContext.request.contextPath}/main/project/" + projectId + "/issuelist";
	                } else {
	                    alert(data.error || "이슈 삭제 중 오류가 발생했습니다.");
	                }
	            })
	            .catch(error => {
	                console.error('Error:', error);
	                alert("서버 통신 중 오류가 발생했습니다.");
	            });
	        }
	    }
	</script>
</body>
</html>