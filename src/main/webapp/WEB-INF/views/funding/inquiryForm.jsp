<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true"%>
<title>문의</title>
<body>
	<div>



		<!-- Main content 여기부터 수정 -->
		<section class="content register-page">
			<div class="register-box">
				<form role="form" class="form-horizontal" method="post"
					onsubmit="return false;">
					<div class="register-card-header"
						style="background-color: #9B99FF; display: flex;">
						<img
							src="${pageContext.request.contextPath}/resources/images/logo.png"
							alt="로고" class="logo"
							style="object-fit: contain; width: 120px; height: 75px;">
						<h1 class="text-center"
							style="color: #fff; font-size: 25px; margin: auto auto;">1: 1 문의</h1>
					</div>
					<div class="register-card-body">

						<div class="mailbox-attachments clearfix col-md-12"
							style="text-align: center;"></div>

						<div class="form-group row">
							<label for="inputEmail3"
								class="col-sm-3 control-label text-right">사용자</label>

							<div class="col-sm-9">
								<input name="id" type="text" class="form-control"
									id="inputEmail3" value="${member.id }" readonly>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-3 control-label text-right">닉네임</label>

							<div class="col-sm-9">
								<input name="pwd" type="text" class="form-control"
									value="${member.name }" readonly>
							</div>
						</div>



						<div class="form-group col-sm-12">

							<div id="content">${board.content }</div>
						</div>
						<div class="form-group">
							<label for="content">내 용</label>



							<div class="input-group input-group-sm">
								<label for="inputFile"
									class="btn btn-warning btn-sm btn-flat input-group-addon"
									style="color: #fff; background-color: #9B99FF; border: none;">파일선택</label>
								<input id="inputFileName" class="form-control" type="text"
									name="tempPicture" disabled /> <input type="file"
									id="inputFile" name="picture" style="display: none;"
									onchange="picture_go();" />
							</div>


							<textarea class="textarea" name="content" id="content" rows="10"
								cols="40" placeholder="문의내용을 작성하세요."></textarea>
						</div>


						<div class="row">
							<div class="col-sm-9 text-right">
								<button type="button" class="btn btn-primary"
									style="color: #fff; background-color: #9B99FF; border: none;"
									id="registBtn" onclick="regist_go();">보내기</button>

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
	MemberPictureBackground("<%=request.getContextPath()%>
		");
	</script>

	<script>
		function remove_go() {
			//alert("click remove btn");
			let answer = prompt("삭제할 회원의 아이디를 입력하세요.");
			if (answer != '${member.id}') {
				alert("아이디가 일치하지 않습니다.");
				return;
			}

			location.href = "remove?id=${member.id}";
		}
	</script>


</body>
