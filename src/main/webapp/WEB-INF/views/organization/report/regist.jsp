<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<%
java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
String today = sdf.format(new java.util.Date());
%>
<html>
<head>
<meta charset="UTF-8">
<title>Report regist</title>
<script src="https://kit.fontawesome.com/a076d05399.js"
	crossorigin="anonymous"></script>
	
	<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/bootstrap/plugins/fontawesome-free/css/all.min.css">
<!-- Theme style -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/bootstrap/dist/css/adminlte.min.css">
</head>
<body>


	<div class="form-section" style="padding: 30px 100px">
		<form name="registForm" role="form" enctype="multipart/form-data"
			method="post" action="regist.do">
			<div class="form-row">
			<input type="hidden" name="projectId" value="${projectId}" />
			
				<div class="form-group col-md-6">
					<label>일일 업무 보고</label> <input type="date" class="form-control"
						name="reportDate" value="<%=today%>" readonly>
				</div>
				<div class="form-group col-md-6">
					<label>작성자</label> <input type="text" class="form-control"
						value="${loginUser.name}" readonly /> <input type="hidden"
						class="form-control" name="writer" value="${loginUser.user_id}"
						readonly />
				</div>
			</div>

			<div class="form-group">
				<label>제목</label> <input type="text" class="form-control notNull"
					name="title" title="보고 제목" placeholder="내용을 입력하세요.">
			</div>

			<div class="form-group">
				<label>내용</label>
				<textarea class="form-control notNull" name="content" rows="8"
					title="보고 내용" placeholder="내용을 입력하세요."></textarea>
			</div>

			<div class="form-group">
				<label>파일 선택</label> <input type="file" class="form-control-file"
					name="uploadFile">

			</div>

			<div class="d-flex justify-content-end">
				<button type="button" class="btn btn-submit mr-2"
					style="background: #9b99ff; border-radius: 15px; color: #fff"
					onclick="regist_go();">등록</button>
				<button type="button" class="btn btn-cancel"
					onclick="CloseWindow();" style="color: #9b99ff">취소</button>
			</div>
		</form>
	</div>

	<script>
	function regist_go() {
		var form = document.forms.registForm;
		var inputNotNull = document.querySelectorAll(".notNull");

		for (var input of inputNotNull) {
			if (!input.value) {
				alert(input.getAttribute("title") + "은(는) 필수입니다.");
				input.focus();
				return;
			}
		}

		for(var fileInput of document.querySelectorAll('input[name="uploadFile"]')){
			if(!fileInput.value) fileInput.disabled=true;
		}
		form.action = "regist.do";
		form.method = "post";
		form.submit();
	}
</script>

</body>
</html>