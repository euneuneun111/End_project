<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true"%>
<title>상세 페이지</title>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>

<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<style>
/* .heart-button {
	border: none;
	background: none;
	color: red;
	font-size: 24px;
	cursor: pointer;
}  */
.heart-button {
	padding: 10px 20px;
	font-size: 16px;
	background-color: #f44336;
	color: white;
	border: none;
	border-radius: 8px;
	cursor: pointer;
}

.heart-count {
	margin-left: 10px;
	font-size: 18px;
}
</style>

<head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">


</head>


<body>

    <%@ include file="/WEB-INF/views/module/header2.jsp" %>
	<div>
		<section
			class="content-header d-flex align-items-center justify-content-between"
			style="padding: 1rem 150px; position: relative;"></section>
		<section class="content-header"
			style="padding: 1rem 150px; display: flex; align-items: center; justify-content: space-between;">


			<h5>
				&nbsp;&nbsp;
				</h2>
		</section>

		<!-- Main content -->
		<section class="content register-page" style="background-color: #fff">
			<div class="card card-solid"
				style="padding: 0 150px; display: flex; justify-content: space-evenly;">
				<div class="card-body" style="padding: 0px">
					<div class="row">
						<div class="col-12 col-sm-4"
							style="position: relative; height: 450px; width: 400px; border: 1px solid #9B99FF; margin: auto auto; border-radius: 5px;">
							<!-- 이미지 뷰어 -->
							<div id="pictureView"
								style="height: calc(100% - 50px); width: 100%;">
								<img
									src="<%=request.getContextPath() %>/funding/getPicture?fno=${funding.fno}"
									alt="펀딩 이미지"
									style="width: 100%; height: 100%; object-fit: contain; border-radius: 5px;">
							</div>
							<!-- 하단 고정된 파일 선택 영역 -->

						</div>
						<div class="col-12 col-sm-6">
							<div class="col-sm-12 d-flex justify-content-end">

								<button type="button"
									class="btn btn-outline-secondary btn-sm custom-hover"
									style="border: none;" onclick="history.go(-1)">목록</button>

								<c:if test="${loginUser != null}">
									<!-- 글 작성자인 경우 -->
									<c:if test="${loginUser.user_id == funding.writer}">
										<span class="nav-link px-2"
											style="color: #ced4da; user-select: none;">/</span>
										<button type="button"
											class="btn btn-outline-secondary btn-sm custom-hover"
											style="border: none;"
											onclick="location.href='modify?fno=${funding.fno}'">수정</button>
									</c:if>

									<!-- 글 작성자 또는 관리자만 삭제 가능 -->
									<sec:authorize access="hasRole('ROLE_ADMIN')">
										<span class="nav-link px-2"
											style="color: #ced4da; user-select: none;">/</span>
										<button type="button" class="btn btn-outline-danger btn-sm"
											style="border: none;" onclick="remove();">삭제</button>
									</sec:authorize>
								</c:if>
							</div>

							<div class="form-group row" style="margin-bottom: 3px">
								<label for="id" class="col-sm-12" style="font-size: 0.9em;">
									<h4 class="input-group-append-sm">${funding.title}</h4>
								</label>

							</div>
							<div class="form-group row" style="margin-bottom: 3px">
								<label for="pwd" class="col-sm-3" style="font-size: 0.9em;">
									<span style="color: red; font-weight: bold;">*</span>누적 금액
								</label>
							</div>
							<div class="form-group row" style="margin-bottom: 3px">
								<div class="col-sm-9 input-group-sm">
									<span style="color: #333; font-weight: bold;">${funding.cmoney}
									</span>
								</div>

							</div>
							</br>
							<div class="form-group row" style="margin-bottom: 3px">
								<label for="name" class="col-sm-3" style="font-size: 0.9em;">
									<span style="color: red; font-weight: bold;">*</span>펀딩 기간 
							</div>
							<div class="form-group row d-flex align-items-center"
								style="margin-bottom: 3px;">

								<!-- 시작 날짜 -->
								<div class="col-sm-5 input-group-sm">
									<span class="form-control-plaintext"> <fmt:formatDate
											value="${funding.startDate}" pattern="yyyy-MM-dd" />
									</span>
								</div>

								<!-- ~ 기호 -->
								<div class="text-center"
									style="width: 50px; font-size: 25px; color: #222; user-select: none;">
									~</div>

								<!-- 마감 날짜 -->
								<div class="col-sm-5 input-group-sm">
									<span class="form-control-plaintext"> <fmt:formatDate
											value="${funding.endDate}" pattern="yyyy-MM-dd" />
									</span>
								</div>

							</div>

							<div class="form-group row" style="margin-bottom: 3px">
								<label for="pwd" class="col-sm-3" style="font-size: 0.9em;">
									<span style="color: red; font-weight: bold;">*</span>목표 금액
								</label>
							</div>

							<div class="form-group row" style="margin-bottom: 3px">
								<div class="col-sm-9 input-group-sm">
									<span style="color: #333; font-weight: bold;">${funding.tgMoney}
									</span>
								</div>
							</div>
							<br> </br>
							<div class="form-group row">
								<div class="col-sm-6"></div>


							</div>



							<div class="card-footer" style="background-color: #fff;">
								<div
									class="col-sm-12 d-flex justify-content-between align-items-center">

									<!-- 왼쪽: 하트 + 공유 -->
									<div
										style="display: flex; align-items: center; justify-content: flex-start; gap: 20px;">
										<!-- 하트 버튼 -->
										<form action="<%=request.getContextPath()%>/funding/heart"
											method="post" style="margin: 0;">
											<input type="hidden" name="fno" value="${funding.fno}">
											<input type="hidden" name="user_id" value="${loginUser.user_id}">
											<button type="submit"
												style="border: none; background-color: #fff; cursor: pointer; padding: 5px; display: inline-flex; align-items: center;">
												<i class="${hearted ? 'fa-solid' : 'fa-regular'} fa-heart"
													style="color: red; font-size: 18px;"></i>
											</button>
										</form>

										<span id="heartCount" style="font-size: 14px; color: #333;">
											${funding.heart} </span>

										<!-- 공유 버튼 -->
										<button id="shareBtn"
											style="border: none; background-color: #fff; cursor: pointer; padding: 5px; display: inline-flex; align-items: center;">
											<i class="fa-solid fa-share-nodes"
												style="color: #333; font-size: 18px;"></i>
										</button>
									</div>



									<!-- 오른쪽: 후원하기 버튼 -->
									<button type="button" class="btn col-sm-6" id="payment-button"
										onclick="window.open('paymentPopup','후원하기',700,800);"
										style="background-color: #9B99FF; color: #fff; border: none;">
										후&nbsp;&nbsp;원&nbsp;&nbsp;하&nbsp;&nbsp;기</button>
								</div>
							</div>

						</div>
					</div>
					<div class="row mt-4">
						<nav class="w-100">
							<div class="row mt-4 align-items-center justify-content-between">
								<!-- 왼쪽: 탭 -->
								<div class="col d-flex">
									<div class="nav nav-tabs" id="product-tab" role="tablist">
										<a class="nav-item nav-link active" id="product-desc-tab"
											data-toggle="tab" href="#product-desc" role="tab"
											aria-controls="product-desc" aria-selected="true">프로젝트 소개</a>
									</div>

								</div>

								<!-- 오른쪽: 버튼 -->
								<div class="col-auto">
									<button type="button"
										class="btn btn-outline-primary btn-sm me-2"
										onclick="OpenWindow('inquiryForm','문의하기',700,800);">문의하기</button>

									<button type="button" class="btn btn-outline-danger btn-sm"
										onclick="OpenWindow('reportForm?fno=${funding.fno}','신고하기',700,800);">신고하기</button>

								</div>
							</div>

						</nav>


						<div class="tab-content p-3" id="nav-tabContent">
							<textarea class="textarea" name="content" id="content" rows="3"
								cols="150"
								style="border: 1px solid #9B99FF; border-radius: 5px;" readonly>${funding.content }</textarea>

						</div>
					</div>
					<!-- /.card-body -->
				</div>

			</div>

		</section>

		<!-- /.content -->
	</div>
	<!-- /.content-wrapper -->



	<script>
	fundingPictureBackground("<%=request.getContextPath()%>");
</script>

	<script>
function remove_go(){
	//alert("click remove btn");
	let answer = prompt("게시글을 삭제하시겠습니까?");
	if(answer!='${funding.writer}' == '${loginUser.user_id}' ) {
		alert("아이디가 일치하지 않습니다.");
		return;
	}
	
	location.href="remove?id=${funding.fno}";
}

</script>

	<script>
  const heartBtn = document.getElementById('heartBtn');

  heartBtn.addEventListener('click', () => {
    const icon = heartBtn.querySelector('i');
    // 클래스가 빈 하트이면 -> 꽉 찬 하트로
    if (icon.classList.contains('fa-regular')) {
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
    } else {
      // 꽉 찬 하트이면 -> 빈 하트로
      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
    }
  });
  
  
</script>

	<script>
    let count = 0;

    function increaseHeart() {
      count++;
      document.getElementById('heartCount').innerText = count;
    }
  </script>


	<script>
function remove(){
	//alert("click remove btn");
	let answer = confirm("정말 삭제하시겠습니다.");
	if(!answer) return;
	
	location.href="remove?fno=${funding.fno}";
}


</script>

	<script>
document.getElementById("shareBtn").addEventListener("click", function () {
    const url = window.location.href; // 현재 페이지 URL 가져오기
    navigator.clipboard.writeText(url)
        .then(() => {
            alert("현재 링크가 클립보드에 복사되었습니다!");
        })
        .catch(err => {
            console.error("클립보드 복사 실패:", err);
        });
});
</script>

<script>
function OpenWindow(UrlStr, WinTitle, WinWidth, WinHeight) {
	winleft = (screen.width - WinWidth) / 2;
	wintop = (screen.height - WinHeight) / 2;
	var win = window.open(UrlStr , WinTitle , "scrollbars=yes,width="+ WinWidth
							+",height="+ WinHeight +", top="+ wintop +", left=" 
							+ winleft +", resizable=yes, status=yes"  );
	win.focus() ; 
} 
</script>



</body>