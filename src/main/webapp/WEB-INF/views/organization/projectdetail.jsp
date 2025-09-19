<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>프로젝트 상세보기</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/common.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/myproject.css">
<style>
/* 메인 컨테이너 */
.project-detail-container {
	width: 90%;
	max-width: 700px;
	margin: 50px auto;
	padding: 0;
	font-family: 'Poppins', sans-serif;
	color: #333;
}

/* 헤더 */
.page-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30px;
}

.page-title {
	font-size: 1.8rem;
	font-weight: 600;
	color: #4287C4;
}

.close-btn {
	background: transparent;
	border: none;
	font-size: 1.5rem;
	color: #666;
	cursor: pointer;
	transition: 0.2s;
}

.close-btn:hover {
	color: #4287C4;
}

/* 이미지 영역 */
.image-preview-wrapper {
	display: flex;
	justify-content: center;
	margin-bottom: 30px;
}

.image-preview-wrapper img {
	width: 250px;
	height: 180px;
	object-fit: cover;
	border-radius: 8px;
	border: 1px solid #ccc;
}

/* 섹션 구분 */
.info-section {
	margin-bottom: 25px;
}

.info-section label {
	font-weight: 600;
	font-size: 1rem;
	display: block;
	margin-bottom: 6px;
	color: #4287C4;
}

.info-section p {
	margin: 0;
	font-size: 0.95rem;
}

/* 멤버 리스트 */
.member-list {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

.member-item {
	padding: 5px 12px;
	border-radius: 15px;
	background-color: #f0f4ff;
	color: #0366d6;
	font-size: 0.9rem;
}

/* 구분선 */
.section-divider {
	height: 1px;
	background-color: #e0e0e0;
	margin: 20px 0;
}

/* 반응형 */
@media ( max-width : 768px) {
	.image-preview-wrapper img {
		width: 100%;
		height: auto;
	}
}
</style>
</head>
<body>
	<%@ include file="/WEB-INF/views/module/header.jsp"%>

	<div class="main-layout-container">
		<!-- 사이드바 -->
		<jsp:include page="/WEB-INF/views/commons/sidebar.jsp" />

		<!-- 메인 컨텐츠 -->
		<div class="main-content">
			<div class="page-header">
				<h2 class="page-title">프로젝트 상세보기</h2>
				<button type="button" class="close-btn" onclick="goBack()">×</button>
			</div>

			<div class="project-detail-container">
				<!-- 이미지 -->
				<div class="image-preview-wrapper">
					<c:choose>
						<c:when test="${not empty project.projectLogo}">
						<img src="<%=request.getContextPath() %>/org/myproject/getLogo?projectId=${project.projectId}" alt="프로젝트 로고">


						</c:when>
						<c:otherwise>
							<img
								src="${pageContext.request.contextPath}/resources/images/no-image.png"
								alt="No Image">
						</c:otherwise>
					</c:choose>
				</div>

				<!-- 기본 정보 -->
				<div class="info-section">
					<label>프로젝트 이름</label>
					<p>${project.projectName}</p>
				</div>

				<div class="info-section">
					<label>프로젝트 설명</label>
					<p>
						<c:out value="${project.projectDesc}" default="등록된 설명이 없습니다." />
					</p>
				</div>

				<div class="info-section">
					<label>프로젝트 시작일</label>
					<p>
						<fmt:formatDate value="${project.projectStartDate}"
							pattern="yyyy-MM-dd" />
					</p>
				</div>

				<div class="section-divider"></div>

				<!-- 멤버 -->
				<div class="info-section">
					<label>프로젝트 멤버</label>
					<div class="member-list">
						<c:choose>
							<c:when test="${not empty project.projectManager}">
								<c:forEach var="m" items="${project.projectManager}">
									<div class="member-item">${m}</div>
								</c:forEach>
							</c:when>
							<c:otherwise>
								<p>등록된 멤버가 없습니다.</p>
							</c:otherwise>
						</c:choose>
					</div>
				</div>
			</div>
		</div>
	</div>

	<%@ include file="/WEB-INF/views/module/footer.jsp"%>

	<script>
		function goBack() {
			if (window.opener) {
				window.close();
			} else {
				window.history.back();
			}
		}
	</script>
</body>
</html>
