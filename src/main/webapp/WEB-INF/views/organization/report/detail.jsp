<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<fmt:formatDate var="formattedReportDate" value="${report.reportDate}"
	pattern="yyyy-MM-dd" />

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Report Detail</title>
<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

<style>
body {
	background: #f4f4f9;
}

.form-section {
	background: #fff;
	border-radius: 10px;
	padding: 30px 40px;
	max-width: 800px;
	margin: 40px auto;
	box-shadow: 0 0 15px rgba(155, 153, 255, 0.3);
}

.form-group label {
	font-weight: 600;
}

.info-box {
	display: flex;
	align-items: center;
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
	background-color: #fff;
	margin-bottom: 10px;
}

.info-box-icon {
	width: 40px;
	height: 40px;
	background-color: #ffc107;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	margin-right: 10px;
}

.info-box-number {
	font-weight: 500;
}
</style>
</head>
<body>

    <%@ include file="/WEB-INF/views/module/header.jsp" %>

	<div class="form-section">
		<div class="form-row">
			<div class="form-group col-md-6">
				<label>업무 보고</label>
				<p class="form-control-plaintext"  id="reportDate" >${formattedReportDate}</p>
			</div>
			<div class="form-group col-md-6">
				<label>작성자</label>
				<p class="form-control-plaintext">${report.writer}</p>
			</div>
		</div>

		<div class="form-group">
			<label>제목</label>
			<p class="form-control-plaintext">${report.title}</p>
		</div>

		<div class="form-group">
			<label>내용</label>
			<div class="form-control-plaintext" style="white-space: pre-line;">${report.content}</div>
		</div>

		<c:if test="${not empty report.attaches}">
			<div class="form-group">
				<label>첨부 파일</label>
				<c:forEach items="${report.attaches}" var="attachreport">
					<ul style="list-style: none; cursor: pointer;"
						onclick="location.href='getFile?arno=${attachreport.arno}'">
						
						<li><i class="fas fa-file mr-2"></i> ${attachreport.fileName}</li>


					</ul>
				</c:forEach>
			</div>
		</c:if>

		<c:if test="${empty report.attaches}">
			<div class="form-group">
				<label>첨부 파일</label>
				<p>첨부된 파일이 없습니다.</p>
			</div>
		</c:if>

		<div class="d-flex justify-content-end">
			<button type="button" class="btn btn-modify" onclick="modify_go()">수정</button>
			<button type="button" class="btn btn-delete" onclick="remove_go()">삭제</button>
			<button type="button" class="btn btn-cancel" onclick="history.go(-1)">취소</button>
		</div>
	</div>

	<script src="https://kit.fontawesome.com/a076d05399.js"
		crossorigin="anonymous"></script>


	<script>
		function modify_go() {
			
			 const reportDateInput = document.getElementById('reportDate');
			    const reportDate = reportDateInput.value; // yyyy-MM-dd 형식

			    // 오늘 날짜 구하기 (yyyy-MM-dd)
			    const today = new Date();
			    const yyyy = today.getFullYear();
			    const mm = String(today.getMonth() + 1).padStart(2, '0');
			    const dd = String(today.getDate()).padStart(2, '0');
			    const todayStr = `${yyyy}-${mm}-${dd}`;

			    if (reportDate !== todayStr) {
			        alert('작성 당일에만 수정이 가능합니다.');
			        return; // 제출 막기
			    }

			
			location.href = "modify?rno=${report.rno}";

		}
	</script>

	<script>
		function remove_go() {
			let answer = confirm("삭제하시겠습니까?");
			if (!answer)
				return;
			location.href = "remove?rno=${report.rno}";
		}
	</script>

</body>

</html>
