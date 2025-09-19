<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>


<title>펀딩 등록</title>


<body>
	<%@ include file="/WEB-INF/views/module/header.jsp"%>

	<!-- Content Wrapper. Contains page content -->

	<!-- /.content-wrapper -->

	<form id="regist" method="post" action="regist" name="regist"
		enctype="multipart/form-data">
		<input type="hidden" name="writer" value="${loginUser.user_id}" />

		<div class="card card-solid"
			style="padding: 1rem 150px; display: flex; justify-content: space-evenly;">
			<div class="card-body">
				<div class="row">
					<div class="col-12 col-sm-4"
						style="position: relative; height: 450px; width: 400px; border: 1px solid #9B99FF; margin: 0 auto; border-radius: 5px;">
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
								<input id="inputFileName" class="form-control notNull"
									title="썸네일" type="text" name="tempPicture" disabled /> <input
									type="file" title="썸네일" id="inputFile" name="uploadFile"
									style="display: none;" onchange="picture_on();" />
							</div>
						</div>
					</div>
					<div class="col-12 col-sm-6">

						<div class="form-group row">
							<div class="col-sm-12">&nbsp;</div>

						</div>
						<div class="form-group row">
							<div class="col-sm-9 input-group input-group-sm">
								<input name="title" onblur="validation(this.name);" type="title"
									class="form-control notNull" id="title" placeholder="제목 입력"
									title="제목" style="border: none; font-size: 1.17em;">
							</div>
						</div>

						<div class="form-group row" style="margin-bottom: 3px">
							<label for="pwd" class="col-sm-3 " style="font-size: 0.9em;">
								<span style="color: red; font-weight: bold;">*</span>목표 금액
							</label>
						</div>
						<div class="form-group row" style="margin-bottom: 3px">
							<div class="col-sm-9 input-group-sm">
								<input class="form-control notNull" name="tgMoney" type="text"
									title="목표 금액" class="form-control" id="tgMoney"
									placeholder="금액을 입력하세요" onblur="validation(this.name);"
									onkeyup="" />
							</div>

						</div>
						<div class="form-group row" style="margin-bottom: 3px">
							<label for="start" class="col-sm-3" style="font-size: 0.9em;">
								<span style="color: red; font-weight: bold;">*</span>펀딩 기간
							</label>
						</div>
						<div class="form-group row d-flex align-items-center"
							style="margin-bottom: 3px;">
							<div class="col-sm-5 input-group-sm">
								<input class="form-control notNull" name="startDate" type="date"
									style="cursor: pointer" title="시작일" id="start" placeholder="시작"
									required />
							</div>
							<div class="text-center"
								style="width: 50px; font-size: 25px; color: #222; user-select: none;">~</div>
							<div class="col-sm-5 input-group-sm">
								<input class="form-control notNull" name="endDate" type="date"
									style="cursor: pointer" id="end" title="마감일" placeholder="마감"
									required />
							</div>
						</div>


						<div class="form-group row">
							<div class="col-sm-12">&nbsp;</div>

						</div>


						<div class="form-group row">
							<div class="col-sm-12">&nbsp;</div>
						</div>
						<div class="form-group row">
							<div class="col-sm-6"></div>
						</div>
						<div class="card-footer" style="background-color: #fff;">
							<div
								class="col-sm-12 d-flex justify-content-between align-items-center">


								<!-- 왼쪽: 수정하기 버튼 -->
								<button type="button" class="btn col-sm-3"
									onclick="regist_go();"
									style="background-color: #9B99FF; color: #fff; border: none;">
									등&nbsp;&nbsp;록&nbsp;&nbsp;하&nbsp;&nbsp;기</button>

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
						<div class="nav nav-tabs" id="product-tab" role="tablist">
							<a class="nav-item nav-link active" id="product-desc-tab"
								data-toggle="tab" href="#product-desc" role="tab"
								aria-controls="product-desc" aria-selected="true">프로젝트 소개</a>

						</div>
					</nav>
					<div class="tab-content p-3" id="nav-tabContent">
						<textarea class="textarea notNull" name="content" id="content"
							rows="3" cols="150" placeholder="내용을 작성하세요." title="소개글"
							style="border: 1px solid #9B99FF; border-radius: 5px;"></textarea>

					</div>
				</div>
				<!-- /.card-body -->
			</div>

		</div>
	</form>


	<script>
	// 후원 옵션 추가 기능
	  function addCategory() {
	    const categorySelect = document.getElementById('categorySelect');
	    const newCategoryInput = document.getElementById('newCategory');
	    const newValue = newCategoryInput.value.trim();

	    if (newValue !== '') {
	      const option = document.createElement('option');
	      option.value = newValue;
	      option.textContent = newValue;
	      categorySelect.appendChild(option);
	      newCategoryInput.value = '';
	    } else {
	      alert('옵션 내용을 입력해주세요.');
	    }
	  }

	  // 유효성 검사 예시 함수
	  function validation(fieldName) {
  const field = document.getElementsByName(fieldName)[0];
  const value = field?.value?.trim();

  if (!value) {
    field.focus();
    return false;
  }

  // 숫자 필드일 경우 숫자 검증 (예: 금액)
  if (fieldName === 'tgMoney' && isNaN(value)) {
    alert("금액은 숫자로 입력해주세요.");
    field.focus();
    return false;
  }

  return true;
}

	  // 등록 버튼 눌렀을 때의 동작
	function regist_go() {
    let form = document.forms.regist;
    
    var inputNotNull = document.querySelectorAll(".notNull");

	for (var input of inputNotNull) {
		if (!input.value) {
			alert(input.getAttribute("title") + "은(는) 필수입니다.");
			input.focus();
			return;
		}
	}
	
	
    form.action = "regist";
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

</body>