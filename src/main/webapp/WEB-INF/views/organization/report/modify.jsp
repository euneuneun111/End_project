<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>


<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
String today = sdf.format(new java.util.Date());
%>
<html>
<head>
<meta charset="UTF-8">
<title>Report modify</title>
<script src="https://kit.fontawesome.com/a076d05399.js"
	crossorigin="anonymous"></script>
</head>
<body>

    <%@ include file="/WEB-INF/views/module/header.jsp" %>

	<div class="form-section" style="padding: 30px 100px">
		<form name="registForm" role="form" enctype="multipart/form-data"
			method="post" action="regist.do">
			  <input type="hidden" name="rno" value="${report.rno}" />
			
			<div class="form-row">
				<div class="form-group col-md-6">
					<label>일일 업무 보고</label> <input type="date" class="form-control"
						name="reportDate"
						value="<fmt:formatDate value='${report.reportDate}' pattern='yyyy-MM-dd'/>">
				</div>
				<div class="form-group col-md-6">
					<label>작성자</label> <input type="text" class="form-control"
						value="${loginUser.name}" readonly /> <input type="hidden"
						class="form-control" name="writer" value="${loginUser.id}"
						readonly />
				</div>
			</div>

			<div class="form-group">
				<label>제목</label> <input type="text" class="form-control notNull"
					name="title" title="보고 제목" placeholder="${report.title}">
			</div>

			<div class="form-group">
				<label>내용</label>
				<textarea class="form-control notNull" name="content" rows="8"
					title="보고 내용" placeholder="${report.content}"></textarea>
			</div>

			<c:if test="${not empty report.attaches}">
				<div class="form-group">
					<label>첨부 파일</label>
					<div class="file-list">
						<c:forEach items="${report.attaches}" var="attachreport">
							<div class="file-item d-flex align-items-center mb-2">
								<span class="file-name" style="cursor: pointer;"
									onclick="location.href='getFile?arno=${attachreport.arno}'">
									<i class="fas fa-file mr-2"></i>${attachreport.fileName}
								</span>
								<button type="button" class="btn btn-sm btn-danger ml-2"
									onclick="deleteFile('${attachreport.fileName}', ${attachreport.arno})">
									<i class="fas fa-trash"></i> 삭제
								</button>
							</div>
						</c:forEach>
					</div>
					<div class="mt-3">
						<label>새 파일 추가</label> <input type="file"
							class="form-control-file" name="uploadFile">
					</div>
				</div>
			</c:if>

			<c:if test="${empty report.attaches}">
				<div class="form-group">
					<label>파일 선택</label> <input type="file" class="form-control-file"
						name="uploadFile"> <small class="form-text text-muted">첨부된
						파일이 없습니다. 새 파일을 추가하실 수 있습니다.</small>
				</div>
			</c:if>

			<div class="d-flex justify-content-end">
				<button type="button" class="btn btn-submit mr-2"
					style="background: #9b99ff; border-radius: 15px; color: #fff"
					onclick="modify_go();">수정</button>
				<button type="button" class="btn btn-cancel"
					onclick="history.go(-1);" style="color: #9b99ff">취소</button>
			</div>
		</form>
	</div>

	<script>
		function modify_go() {
			var form = document.forms.registForm;
			
			var inputNotNull = document.querySelectorAll(".notNull");

			for (var input of inputNotNull) {
				if (!input.value) {
					alert(input.getAttribute("title") + "은(는) 필수입니다.");
					input.focus();
					return;
				}
			}
			
			
			form.action = "modify";
			form.method = "post";
			form.submit();
		}
	</script>

	<script>
	function deleteFile(fileName, arno) {
	    if(confirm("파일을 삭제하시겠습니까?")) {
	        // 파일명에서 특수문자 제거하여 클래스 선택자로 사용 가능하게 변환
	        let safeFileName = fileName.replace(/[^\w]/g, "_");
	        let li = $('li[data-filename="' + fileName + '"]');
	        
	        // li 요소 제거
	        li.remove();
	        
	        // hidden input 추가하여 서버에 전송할 삭제 파일 정보 저장
	        var input = $('<input>').attr({
	            "type": "hidden", 
	            "name": "deleteFile", 
	            "value": arno
	        });
	        
	        // form에 input 추가
	        $('form[role="form"]').prepend(input);
	    }
	}
	</script>

</body>
</html>
