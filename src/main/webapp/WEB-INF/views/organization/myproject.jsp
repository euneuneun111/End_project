<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>프로젝트 목록</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/common.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/myproject.css">
<style>
.page-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}

.add-project-btn {
	padding: 8px 14px;
	background-color: #9B99FF;
	color: #fff;
	border: none;
	border-radius: 6px;
	font-weight: 500;
	cursor: pointer;
	transition: 0.3s;
}

.add-project-btn:hover {
	background-color: #336fa1;
}

.issue-table {
	width: 100%;
	border-collapse: collapse;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
	background-color: #fff;
}

.issue-table th, .issue-table td {
	padding: 10px 15px;
	text-align: left;
	border-bottom: 1px solid #e0e0e0;
}

.issue-table th {
	background-color: #f7f7f7;
	color: #333;
	font-weight: 600;
}

.issue-table tr:hover {
	background-color: #f1f5ff;
}

.description-cell {
	max-width: 300px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.status-icon {
	font-size: 12px;
	margin-right: 5px;
}

.issue-title-link {
	color: #4287C4;
	text-decoration: none;
	font-weight: 500;
}

.issue-title-link:hover {
	text-decoration: underline;
}
</style>
<script>
	// 프로젝트 생성 팝업 열기
	function openProjectCreate() {
		const url = "${pageContext.request.contextPath}/org/myproject/create";
		window.open(url, "projectCreate",
				"width=800,height=600,scrollbars=yes,resizable=yes");
	}
</script>
</head>
<body>
	<%@ include file="/WEB-INF/views/module/header.jsp"%>

	<div class="main-layout-container">
		<jsp:include page="/WEB-INF/views/commons/orgsidebar.jsp" />

		<div class="main-content">
			<div class="page-header">
				<h2 class="page-title">프로젝트 목록</h2>
				<button class="add-project-btn" type="button"
					onclick="openProjectCreate()">프로젝트 추가</button>
			</div>

			<div class="issue-list-container">
				<table class="issue-table">
					<thead>
						<tr>
							<th></th>
							<th>프로젝트 ID</th>
							<th>프로젝트 제목</th>
							<th>설명</th>
							<th>시작일</th>
							<th>인원</th>

						</tr>
					</thead>
					<tbody>
						<c:if test="${not empty projectList}">
							<c:set var="hasProject" value="false" />
							<c:forEach var="project" items="${projectList}"  >
								<c:if
									test="${not empty project.projectManager and project.projectManager.contains(sessionScope.loginUser.name)}">
									<c:set var="hasProject" value="true" />
									<tr   >   
										<td><i class="status-icon fas fa-circle ${statusClass}"></i></td>
										<td>${project.projectId}</td>
										<td  ><a  href="${pageContext.request.contextPath}/org/myproject/${project.projectId}"
											
											class="issue-title-link">${project.projectName} </a></td>
										<td class="description-cell"><c:out
												value="${fn:length(project.projectDesc) > 50 ? fn:substring(project.projectDesc,0,50) + '...' : project.projectDesc}" />
										</td>
										<td><fmt:formatDate value="${project.projectStartDate}"
												pattern="yyyy-MM-dd" /></td>
									
										<td>${project.projectManager}</td>
									</tr>
								</c:if>
							</c:forEach>

							<c:if test="${hasProject == false}">
								<tr>
									<td colspan="7" style="text-align: center; padding: 20px;">
										참여 중인 프로젝트가 없습니다.</td>
								</tr>
							</c:if>
						</c:if>

						<c:if test="${empty projectList}">
							<tr>
								<td colspan="7" style="text-align: center; padding: 20px;">
									참여 중인 프로젝트가 없습니다.</td>
							</tr>
						</c:if>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<%@ include file="/WEB-INF/views/module/footer.jsp"%>
</body>
</html>
