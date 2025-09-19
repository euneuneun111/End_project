<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- Google Font: Source Sans Pro -->
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
<!-- Font Awesome Icons -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/bootstrap/plugins/fontawesome-free/css/all.min.css">
<!-- Theme style -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/bootstrap/dist/css/adminlte.min.css">
<script
	src="<%=request.getContextPath()%>/resources/bootstrap/dist/js/adminlte.min.js"></script>

<!-- jQuery -->
<script
	src="<%=request.getContextPath()%>/resources/bootstrap/plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script
	src="<%=request.getContextPath()%>/resources/bootstrap/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- AdminLTE App -->
<script
	src="<%=request.getContextPath()%>/resources/bootstrap/dist/js/adminlte.min.js"></script>
<!-- common -->


<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 5px 35px;
	background-color: #9B99FF;
}

.header-left .logo {
	width: 200px;
	height: 75px;
	object-fit: fill;
}

.header-right {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.header-right-top {
	display: flex;
	gap: 10px;
	margin-bottom: 10px;
	align-items: center;
}

.login-btn {
	padding: 6px 12px;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 6px;
}

.login-btn .user-icon {
	width: 16px;
	height: 16px;
}

.menu {
	margin-top: 10px;
}

.menu a {
	margin-left: 10px;
	margin-right: 10px;
	text-decoration: none;
	color: white;
}

.header-right a {
	margin-left: 20px;
	margin-right: 10px;
	text-decoration: none;
	color: white;
}
</style>
</head>
<div class="header">
	<div class="header-left">
		<img
			src="${pageContext.request.contextPath}/resources/images/logo.png"
			alt="로고" class="logo">
	</div>

	<div class="header-right">


		<div class="header-right-top">


			<sec:authorize access="hasRole('ROLE_ADMIN')">
				<a href="${pageContext.request.contextPath}/admin/list"> <strong><em>ADMIN</em></strong>
				</a>
			</sec:authorize>

			<a>${loginUser.name }</a>
			<div class="login-btn"
				onclick="location.href='<%=request.getContextPath()%>/commons/logout';">
				<a><strong><em>Logout</em></strong></a>
			</div>
			<a href="/me/mypage.jsp"><strong><em>My Page</em></strong></a>
		</div>

		<div class="menu">
			<a href="/project/community/Board"><strong><em>COMMUNITY</em></strong></a>
			<a href="/project/org/main"><strong><em>ORGANIZATION</em></strong></a>
			<a href="/project/funding/list"><strong><em>CROWD
						FUNDING</em></strong></a>
		</div>
	</div>
</div>

</html>