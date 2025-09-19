<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>LINKED - 나의 조직 상세</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/common.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/orgDetail.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

</head>
<body>
	<%@ include file="/WEB-INF/views/module/header.jsp"%>
	<div class="main-layout-container">
		<jsp:include page="/WEB-INF/views/commons/orgsidebar.jsp" />

		<div class="main-content">
			<div class="page-title-container">
				<h2>조직 상세페이지</h2>
				<c:if test="${loginUser.user_id == org.orManagerId}">
                <div class="page-buttons">
                    <button type="button" class="edit-btn" onclick="openModal('editOrgModal')">
                        <i class="fas fa-edit"></i> 조직 편집
                    </button>
                    <button type="button" class="delete-btn" onclick="deleteOrg()">
                        <i class="fas fa-trash"></i> 조직 삭제
                    </button>
                </div>
            </c:if>
        </div>

			<div class="org-detail-form-container">
				<div class="form-grid-container">
					<div class="form-group">
						<label>조직 이름</label> <input type="text" id="orgName"
							value="${org.orName}" readonly>
					</div>
					<div class="form-group">
						<label>담당자</label> <input type="text" value="${org.orManagerId}"
							readonly>
					</div>
					<div class="form-group">
						<label>공개 여부</label> <input type="text" id="orgIsPublic"
							value="${org.orIsPublic == 'Y' ? '공개' : '비공개'}" readonly>
					</div>
					<div class="form-group full-width">
						<label>조직 소개</label>
						<textarea id="orgIntroduce" rows="4" readonly>${org.orIntroduce}</textarea>
					</div>
					<div class="form-group">
						<label>조직 생성일</label> <input type="text"
							value="<fmt:formatDate value="${org.orCreateDate}" pattern="yyyy-MM-dd" />"
							readonly>
					</div>
					<div class="form-group full-width">
						<label>지원/홍보 링크</label> <input type="text" id="orgLinkAddress"
							value="${org.orLinkAddress}" placeholder="등록된 링크가 없습니다." readonly>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div id="editOrgModal" class="custom-modal">
		<h2>조직 편집</h2>
		<div class="custom-modal-content">
			<div class="custom-modal-form-group">
				<label for="modalOrgName">조직 이름</label> <input type="text"
					id="modalOrgName" name="orName" value="${org.orName}">
			</div>
			<div class="custom-modal-form-group">
				<label for="modalOrgIsPublic">공개 여부</label> <select
					id="modalOrgIsPublic" name="orIsPublic">
					<option value="Y" ${org.orIsPublic eq 'Y' ? 'selected' : ''}>공개</option>
					<option value="N" ${org.orIsPublic eq 'N' ? 'selected' : ''}>비공개</option>
				</select>
			</div>
			<div class="custom-modal-form-group">
				<label for="modalOrIntroduce">조직 소개</label>
				<textarea id="modalOrIntroduce" name="orIntroduce" rows="4">${org.orIntroduce}</textarea>
			</div>
			<div class="custom-modal-form-group">
				<label for="modalOrLinkAddress">지원/홍보 링크</label> <input type="text"
					id="modalOrLinkAddress" name="orLinkAddress"
					value="${org.orLinkAddress}">
			</div>
		</div>
		<div class="custom-modal-buttons">
			<button type="button" class="confirm-btn" onclick="saveChanges()">저장</button>
			<button type="button" class="cancel-btn"
				onclick="closeModal('editOrgModal')">취소</button>
		</div>
	</div>
	<div id="modal-overlay" class="custom-modal-overlay"
		onclick="closeModal('editOrgModal')"></div>

	<%@ include file="/WEB-INF/views/module/footer.jsp"%>

	<script>
    const contextPath = "${pageContext.request.contextPath}";
    const orgId = '${org.orId}';

    function openModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
        document.getElementById('modal-overlay').style.display = 'block';
        document.body.classList.add('custom-modal-active');
    }

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
        document.getElementById('modal-overlay').style.display = 'none';
        document.body.classList.remove('custom-modal-active');
    }

    function saveChanges() {
        const orgData = {
            orId: orgId,
            orName: document.getElementById('modalOrgName').value,
            orIsPublic: document.getElementById('modalOrgIsPublic').value,
            orIntroduce: document.getElementById('modalOrIntroduce').value,
            orLinkAddress: document.getElementById('modalOrLinkAddress').value
        };

        fetch(contextPath + '/org/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orgData),
        })
        .then(response => {
            if (!response.ok) throw new Error('서버 응답 오류: ' + response.status);
            return response.json();
        })
        .then(data => {
            alert(data.message);
            if (data.status === 'success') window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('업데이트 중 오류가 발생했습니다.');
        });
    }

    function deleteOrg() {
        if (confirm('정말로 이 조직을 삭제하시겠습니까?')) {
            fetch(contextPath + '/org/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orId: orgId }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('서버 응답 오류: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);
                if (data.status === 'success') {
                    window.location.href = contextPath + '/org/main';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('삭제 중 오류가 발생했습니다.');
            });
        }
    }
</script>
</body>
</html>