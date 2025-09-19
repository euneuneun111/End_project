<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>


<fmt:formatDate var="startDateStr" value="${funding.startDate}"
	pattern="yyyy-MM-dd" />
<fmt:formatDate var="endDateStr" value="${funding.endDate}"
	pattern="yyyy-MM-dd" />

<title>펀딩 수정</title>

<head></head>

<body>

	<%@ include file="/WEB-INF/views/module/header.jsp"%>



	<c:if test="${empty funding }">
		<script>
	alert("존재하지 않는 게시글입니다.")
	history.go(-1);
</script>

	</c:if>


	<!-- Content Wrapper. Contains page content -->
	<div>

		<section class="content-header"
			style="padding: 1rem 150px; display: flex; align-items: center; justify-content: space-between;">

			<input type="hidden" name="writer" value="${loginUser.user_id}" />
			<h2>&nbsp;&nbsp;</h2>
		</section>


		<form name="modify" method="post" action="modify" id="modifyForm"
			enctype="multipart/form-data">
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
									style="height: calc(100% - 50px); width: 100%;"></div>

								<!-- 하단 고정된 파일 선택 영역 -->
								<div class="mailbox-attachment-info"
									style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 80%;">
									<div class="input-group input-group-sm">
										<label for="inputFile"
											class="btn btn-warning btn-sm btn-flat input-group-addon"
											style="color: #fff; background-color: #9B99FF; border: none;">파일선택</label>
										<input id="inputFileName" class="form-control"
											type="text" name="tempPicture" disabled /> <input
											type="file" title="썸네일" id="inputFile" name="uploadFile"
											title="썸네일" style="display: none;" onchange="picture_on();" />
									</div>
								</div>

								<!-- 하단 고정된 파일 선택 영역 -->

							</div>
							<div class="col-12 col-sm-6">
								</br>
								<div class="form-group row">
									<div class="col-sm-9 input-group input-group-sm">
										<input name="title" onblur="validation(this.name);"
											type="title" class="form-control notNull" id="title"
											placeholder="${funding.title }" title="제목"
											style="border: none; font-size: 1.17em;">
									</div>
								</div>

								<div class="form-group row" style="margin-bottom: 3px">
									<label for="tgMoney" class="col-sm-3" style="font-size: 0.9em;">
										<span style="color: red; font-weight: bold;">*</span>목표 금액
									</label>
								</div>
								<div class="form-group row" style="margin-bottom: 3px">
									<div class="col-sm-9 input-group-sm">
										<input class="form-control" name="tgMoney" type="text"
											id="tgMoney" placeholder="${funding.tgMoney}"
											onblur="validation(this.name);" onkeyup="" value="" />
									</div>

								</div>
								<div class="form-group row" style="margin-bottom: 3px">
									<label class="col-sm-3" style="font-size: 0.9em;"> <span
										style="color: red; font-weight: bold;">*</span>펀딩 기간 
								</div>
								<div class="form-group row d-flex align-items-center"
									style="margin-bottom: 3px;">

									<!-- 시작 날짜 -->
									<div class="col-sm-5 input-group-sm">
										<input class="form-control" name="startDate" type="date"
											id="start" onblur="validation(this.name);"
											value="${startDateStr}" />
									</div>

									<div class="text-center"
										style="width: 50px; font-size: 25px; color: #222; user-select: none;">
										~</div>

									<div class="col-sm-5 input-group-sm">
										<input class="form-control" name="endDate" type="date"
											id="end" placeholder="마감" onblur="validation(this.name);"
											value="${endDateStr}" />
									</div>

								</div>

								<div class="form-group row">
									<div class="col-sm-12">&nbsp;</div>

								</div>


								<div class="form-group row">
									<div class="col-sm-12">&nbsp;</div>
								</div>
							


								<div class="card-footer" style="background-color: #fff;">
									<div
										class="col-sm-12 d-flex justify-content-between align-items-center">


										<!-- 왼쪽: 수정하기 버튼 -->
										<button type="button" class="btn col-sm-3"
											onclick="modify_go();"
											style="background-color: #9B99FF; color: #fff; border: none;">
											수&nbsp;&nbsp;정&nbsp;&nbsp;하&nbsp;&nbsp;기</button>

										<!-- 왼쪽: 수정하기 버튼 -->
										<button type="button" class="btn col-sm-3"
											onclick="history.go(-1);"
											style="background-color: #fff; border: 1px solid; color: #9B99FF;">
											취&nbsp;&nbsp;소&nbsp;&nbsp;하&nbsp;&nbsp;기</button>
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
												aria-controls="product-desc" aria-selected="true">프로젝트
												소개</a>
										</div>
									</div>

									<!-- 오른쪽: 버튼 -->

								</div>

							</nav>


							<div class="tab-content p-3" id="nav-tabContent">
								<textarea class="textarea" name="content" id="content" rows="3"
									cols="150" placeholder="${funding.content}"
									style="border: 1px solid #9B99FF; border-radius: 5px;"></textarea>



							</div>
						</div>
						<!-- /.card-body -->
					</div>

				</div>

			</section>
		</form>

		<!-- /.content -->
	</div>
	<!-- /.content-wrapper -->




	<script>

function addCategory() {
  const input = document.getElementById('newCategory');
  const select = document.getElementById('categorySelect');
  const value = input.value.trim();

  if (value === '') {
    alert("옵션 내용을 입력하세요.");
    input.focus();
    return;
  }

  const option = document.createElement('option');
  option.value = value;
  option.text = value;
  select.appendChild(option);
  input.value = '';
}

// 필드 유효성 검사
function validation(fieldName) {
  const field = document.getElementsByName(fieldName)[0];
  const value = field?.value?.trim();

  if (!value) {
    field.focus();
    return false;
  }

  // 숫자 필드일 경우 숫자 검증 (예: 금액)
  if (fieldName === 'tgmoney' && isNaN(value)) {
    alert("금액은 숫자로 입력해주세요.");
    field.focus();
    return false;
  }

  return true;
}


function modify_go() {
    let form = document.forms.modify;
    
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
	function picture_on(){
		//alert("change file");
		let pictureInput = document.querySelector("input[name='uploadFile']");
		let file = pictureInput.files[0];
		
		//이미지 확장자 jpg 확인
	    var fileFormat = file.name.substr(file.name.lastIndexOf(".")+1).toUpperCase();
	    if(!(fileFormat=="JPG" || fileFormat=="JPEG" || fileFormat=="PNG" )){
	        alert("이미지는 jpg/jpeg 형식만 가능합니다.");
	        pictureInput.value="";      
	        return;
	    }
	    
	    //이미지 파일 용량 체크
	    if(file.size>1024*1024*1){
	         alert("사진 용량은 1MB 이하만 가능합니다.");
	         pictureInput.value="";
	         return;
	     };
	     
	     //파일명 표시
	 	 document.querySelector('#inputFileName').value=file.name; 
	     
	     let pictureView = document.querySelector("#pictureView");
	     if(file){
			var reader = new FileReader();
			
			 reader.onload = function (e) {
				pictureView.style.backgroundImage = "url("+e.target.result+")";
			 	pictureView.style.backgroundPosition="center";
			 	pictureView.style.backgroundSize="contain";
			 	pictureView.style.backgroundRepeat="no-repeat";		
			 }
			 
			 reader.readAsDataURL(file);
	 	}
	} 
	
	
	</script>


	<script>
	fundingPictureBackground("<%=request.getContextPath()%>");
</script>

</body>



