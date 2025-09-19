<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>



<%
java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
String today = sdf.format(new java.util.Date());
%>

<head>

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
<script src="<%=request.getContextPath()%>/resources/js/common.js"></script>
</head>

<body>


	<section class="content-header">
		<div class="container-fluid">
			<div class="row md-2">
				<div class="col-sm-6">
					<h1>수정하기</h1>
				</div>

			</div>
		</div>
	</section>
	<!-- Main content -->
	<section class="content container-fluid">
		<div class="row">
			<div class="col-md-12">

				<div class="card-header"></div>
				<!--end card-header  -->
				<div class="card-body">
					<form role="form" method="post" action="modify.do"
						name="modifyForm">
						<input type="hidden" name="id" value="${meeting.id }" />

						<div class="form-group col-md-6">
							<label>수정일</label> <input type="date" class="form-control"
								readonly value="<%=today%>">
						</div>

						<th
							style="width: 120px; background: #e0e0e0; text-align: center; padding: 20px 16px;">회의일자</th>
						<td style="width: 200px; heigh: 10px;"><input type="date"
							class="form-control" name="meetingDate"
							value="<fmt:formatDate value='${meeting.meetingDate}' pattern='yyyy-MM-dd'/>">
						</td>

						<div class="form-group">
							<label for="title">회의 명</label> <input type="text" id="title"
								name='title' title="제목" class="form-control"
								value="${meeting.title }" />
						</div>
						<div class="form-group">
							<label for="author">주관자</label> <input type="text" id="author"
								readonly name="author" title="작성자" class="form-control"
								value="${meeting.author }" />
						</div>

						<div class="form-group col-md-12">
							<label>참석자</label>
							<c:forEach var="manager" items="${projectManagers}"
								varStatus="status">
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="checkbox" name="attend"
										value="${manager}" id="manager_${status.index}"
										<c:if test="${fn:contains(meeting.attend, manager)}">checked</c:if>>
									<label class="form-check-label" for="manager_${status.index}">${manager}</label>
								</div>
							</c:forEach>
						</div>

						<div class="form-group">
							<label for="overview">회의 개요</label>
							<textarea class="form-control" name="overview" id="overview"
								rows="3" placeholder="500자 내외로 작성하세요.">${fn:escapeXml(meeting.overview) }</textarea>
						</div>

						<div class="form-group">
							<label for="content">회의 내용</label>
							<textarea class="form-control" name="content" id="content"
								rows="3" placeholder="500자 내외로 작성하세요.">${fn:escapeXml(meeting.content) }</textarea>
						</div>
					</form>
				</div>
				<!--end card-body  -->

				<div class="card-tools">
					<div class="float-right">

						<button type="button" class="btn btn-submit mr-2" id="modifyBtn"
							onclick="modify_submit();"
							style="background: #9b99ff; color: #fff">수 정</button>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<button type="button" class="btn btn-default " id="cancelBtn"
							onclick="history.go(-1);" style="color: #9b99ff">취 소</button>
					</div>
				</div>
			</div>
			<!-- end card -->
		</div>
		<!-- end col-md-12 -->

		<!-- end row -->
	</section>
	<!-- /.content -->




	<script>

function modify_submit(){
	
	let form = $("form[name='modifyForm']");
	
	var inputNotNull = form.find(".notNull");
	for(var input of inputNotNull){
		if(!input.value){
			alert(input.getAttribute("title")+"은 필수입니다.");
			input.focus();
			return;
		}
	}
	
	form.submit();
}
</script>
</body>