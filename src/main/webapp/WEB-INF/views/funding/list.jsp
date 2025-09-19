<%@page import="java.text.SimpleDateFormat"%>
<%@ page import="com.Semicolon.cmnt.dto.MemberVO"%>
<%@ page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<title>펀딩 목록</title>
<style>
.funding-info {
	display: block;
	width: 100%;
	height: 200px;
	background-color: #ccc;
}

.row {
	display: flex;
	flex-wrap: wrap;
	margin: -0.5rem;
}

.btn-primary:hover {
	background-color: #0056b3;
}

.alert-info {
	padding: 1rem;
	background-color: #d1ecf1;
	color: #0c5460;
	border-radius: 4px;
}
</style>
</head>
<body>

    <%@ include file="/WEB-INF/views/module/header.jsp" %>

	<section class="content-header"
		style="padding: 1rem 150px; display: flex; align-items: center; justify-content: space-between;">

		<!-- 왼쪽 메뉴 -->
		<div class="d-flex align-items-center">
			<ul class="navbar-nav flex-row" style="font-weight: bold;">
				<li class="nav-item"><a href="<c:url value='/funding/list/latest' />"
					class="nav-link px-4 ${pageType == 'latest' ? 'active' : ''}"
					style="color: ${pageType == 'latest' ? '#9B99FF' : '#ced4da'};">
						최신 </a></li>
				<li class="nav-item"><span class="nav-link px-4"
					style="color: #ced4da; user-select: none;">/</span></li>
				<li class="nav-item"><a href="<c:url value='/funding/list/popular' />"
					class="nav-link px-4 ${pageType == 'popular' ? 'active' : ''}"
					style="color: ${pageType == 'popular' ? '#9B99FF' : '#ced4da'};">
						인기 </a></li>
			</ul>
		</div>


	
		<!-- 오른쪽 버튼 -->
		<div class="col-md-2 mb-2">
			<button type="button" class="btn btn-block btn-secondary btn-lg"
				onclick="location.href='regist';"
				style="background-color: #9B99FF; border: none;">Funding
				Add</button>
		</div>

	</section>

	<section class="content" style="padding: 0 150px;">
		<div class="row justify-content-center">

			<c:if test="${empty fundingList}">
				<div class="col-12">
					<div class="alert alert-info text-center">해당 데이터가 존재하지 않습니다.</div>
				</div>
			</c:if>

			<c:forEach var="funding" items="${fundingList}">
				<fmt:formatDate pattern="yyyy-MM-dd" var="regDate"
					value="${funding.regDate}" />

				<div class="col-md-3 mb-3">
					<div class="card h-100"
						onclick="location.href='detail?fno=${funding.fno}'"
						style="cursor: pointer;">

						<c:choose>
							<c:when test="${not empty funding.attachList}">
								<div class="funding-info mb-2" data-id="${funding.fno }" 
									style="border: 1px solid #fff; object-fit: contain; height: 200px; background-color: #f0f0f0;"></div>
							</c:when>
							<c:otherwise>
								<div class="funding-info mb-2 text-center text-muted"
									style="height: 140px; background-color: #f9f9f9; display: flex; align-items: center; justify-content: center;">
									No Image</div>
							</c:otherwise>
						</c:choose>

						<div class="card-body" style="height: 70px; overflow: hidden;">
							<h5 class="card-title"
								style="white-space: nowrap; /* 한 줄로 */ overflow: hidden; /* 넘치는 부분 숨김 */ text-overflow: ellipsis; /* 말줄임표(...) 표시 */ max-width: 200px;">
								${funding.title} <small style="color: #666;">${funding.fno}</small>
							</h5>
							<p class="card-text" style="font-size: 0.9rem; color: #333">
								<strong>글 작성자: ${funding.writer } </strong>
							</p>
							<p class="card-text" style="font-size: 0.9rem; color: #333">
								<strong>조회수: ${funding.viewcnt } </strong>
							</p>
						</div>
					</div>
				</div>
			</c:forEach>

		</div>
	</section>

	<!-- 페이징 모듈 포함 -->
	<div style="padding: 1rem;">
		<%@ include file="/WEB-INF/views/module/pagination.jsp"%>
	</div>

<script>
	fundingPictureBackground("<%=request.getContextPath()%>");

</script>

</body>
</html>