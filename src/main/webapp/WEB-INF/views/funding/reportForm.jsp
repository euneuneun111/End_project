<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true"%>
<title>신고</title>

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
</head>

<body>
	<div>

		<section class="content register-page">
			<div class="register-box">
				<form role="form" class="form-horizontal" method="post"
					action="report" name="report" onsubmit="return false;">
					<input type="hidden" name="writer" value="${loginUser.user_id}"> 
					<input type="hidden" name="reportDate"
						value="<%=new java.text.SimpleDateFormat("yyyy-MM-dd").format(new java.util.Date())%>" />
					<div class="register-card-header"
						style="background-color: #9B99FF; display: flex;">
						<img
							src="${pageContext.request.contextPath}/resources/images/logo.png"
							alt="로고" class="logo"
							style="object-fit: contain; width: 120px; height: 75px;">
						<h1 class="text-center"
							style="color: #fff; font-size: 25px; margin: auto auto;">신고하기</h1>
					</div>
					<div class="register-card-body">

						<div class="mailbox-attachments clearfix col-md-12"
							style="text-align: center;"></div>

						<label for="email">이메일</label></br>
						<h4 id="email">${loginUser.email}</h4>
						</br> <label for="target">신고 대상</label> </br> <input type="hidden" id="fno"
							name="fno" value="${funding.fno}" />
						<h4 id="target">${funding.title}</h4>
						<br> <label for="reason">신고 사유</label> <select id="reason"
							name="reason" class="reason notNull" title="신고 사유">
							<option value="">선택하세요</option>
							<option value="스팸 또는 광고">스팸 또는 광고</option>
							<option value="저작권 침해">저작권 침해</option>
							<option value="기타">기타</option>
						</select>


						<div class="form-group col-sm-12">
							<div id="content">${board.content }</div>
						</div>

						<div class="form-group">
							<label for="content">상세 내용</label>

							<textarea class="textarea notNull" name="content" id="content"
								rows="10" title="상세내용" cols="40" placeholder="상세내용을 작성하세요."></textarea>
						</div>



						<div class="row">
							<div class="col-sm-9 text-right">
								<button type="submit" class="btn btn-primary"
									style="color: #fff; background-color: #9B99FF; border: none;"
									id="registBtn" onclick="report_go();">제 출</button>
							</div>


							<div class="col-sm-3 text-center">
								<button type="button"
									style="color: #9B99FF; background-color: #ffffFF; border: 1px solid #9B99FF;"
									id="listBtn" onclick="CloseWindow();"
									class="btn btn-primary pull-right">취 소</button>
							</div>

							<hr />

						</div>
				</form>
			</div>

		</section>

		<!-- /.content -->
	</div>
	<!-- /.content-wrapper  여기까지 수정-->

	<script>
	
	 // 등록 버튼 눌렀을 때의 동작
	function report_go() {
    let form = document.forms.report;
    
    var inputNotNull = document.querySelectorAll(".notNull");

	for (var input of inputNotNull) {
		if (!input.value) {
			alert(input.getAttribute("title") + "은(는) 필수입니다.");
			input.focus();
			return;
		}
	}
	
	
    form.action = "report";
    form.method = "post";
    form.submit();
}
	</script>

</body>