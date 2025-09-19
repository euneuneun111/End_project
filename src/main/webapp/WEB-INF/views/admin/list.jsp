<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>


<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<head>
<meta charset="UTF-8">
<%-- 공통 CSS 파일 연결 --%>


<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

<style>
.temporary-main-header {
	display: flex;
	justify-content: flex-end;
	padding-bottom: 20px;
	margin-bottom: 20px;
}

.temporary-main-header .nav-item {
	font-size: 16px;
	font-weight: bold;
	margin-left: 30px;
	color: #555;
	text-decoration: none;
}

.temporary-main-header .nav-item:hover {
	color: #6A3CD7;
}
</style>
</head>
<body>
	<%@ include file="/WEB-INF/views/module/header.jsp"%>
	<div class="wrapper">

		<div class="card col-sm-9" style="padding: 0 30px; margin: 30px auto;">
			<div class="card-header border-0">
				<h1 class="card-title">신고 관리</h1>

			</div>
			<div class="card-body table-responsive p-0">


				<table class="table table-striped table-valign-middle">
					<thead>
						<tr>
							<th class="text-center" style="width: 10%;">번호</th>
							<th class="text-center" style="width: 10%;">신고자</th>
							<th class="text-center" style="width: 20%;">신고 사유</th>
							<th class="text-center" style="width: 40%;">내용</th>
							<th class="text-center" style="width: 20%;">신고 날짜</th>
						</tr>
					</thead>
					<tbody>
						<c:if test="${empty adminreportList}">
							<tr>
								<td colspan="5" class="text-center">해당내용이 없습니다.</td>
							</tr>
						</c:if>
						<c:if test="${not empty adminreportList}">
							<c:forEach items="${adminreportList}" var="adminreport">
								<tr style="cursor: pointer;"
									onclick="location.href='${pageContext.request.contextPath}/funding/detail?fno=${adminreport.fno}'">
									<td class="text-center" style="width: 10%">${adminreport.fno}</td>
									<td class="text-center" style="width: 10%">${adminreport.writer}</td>
									<td class="text-center" style="width: 20%">${adminreport.reason}</td>
									<td class="text-center" style="width: 40%">${adminreport.content}</td>
									<td class="text-center" style="width: 20%"><fmt:formatDate
											value="${adminreport.reportDate}" pattern="yyyy-MM-dd" /></td>


								</tr>
							</c:forEach>
						</c:if>
					</tbody>
				</table>

				<br>

				<div style="display:${!empty adminreport ? 'visible':'none'};">
					<%@ include file="/WEB-INF/views/module/pagination.jsp"%>
				</div>
			</div>



		</div>




	</div>
</body>

