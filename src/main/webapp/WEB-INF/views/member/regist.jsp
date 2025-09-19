<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>회원 가입</title>

<!-- Google Font: Source Sans Pro -->
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
<!-- Font Awesome Icons -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/bootstrap/plugins/fontawesome-free/css/all.min.css">
<!-- Theme style -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/bootstrap/dist/css/adminlte.min.css">
<!-- jQuery -->
<script src="<%=request.getContextPath() %>/resources/bootstrap/plugins/jquery/jquery.min.js"></script>
<!-- common -->
<script src="<%=request.getContextPath() %>/resources/js/common.js" ></script>

<style>
.register-content {
	height: 100vh;
}
.header {
	justify-items: center;
	align-item: center;
	padding: 5px 35px;
	background-color: #9B99FF;
	width: 100%;
	box-sizing: border-box;
}

.header-center .logo {
	width: 200px;
	height: 75px;
	object-fit: fill;
}

.login-page {
	background: #fff;
}

.login-box {
	width: 100%;
	min-width: 550px;
	padding: 0 20px;
	box-sizing
}

.btn-flat {
	border-radius: 15px;
	box-shadow: none;
	background-color: #9B99FF;
	color: white;
	height: 45px;
	font-size: 20px;
}

.footer {
	height: 70px;
	padding: 5px 35px;
	background-color: #9B99FF;
	width: 100%;
	box-sizing: border-box;
}

.row justify-content-center .btn {
        font-size: 0.9rem;
        font-weight: 500;
        margin: 8px;
        border-radius: 4px;
    }

#login_Who {
	width: 100%;
	color: #111111;
	background-color: #dddddd;
}
input#user_id{
	border: none;
	border-bottom: solid;
	border-color: #9B99FF;
}
input#user_pwd, #name, #email, #major {
	width: 450px;
	border: none;
	border-bottom: solid;
	border-color: #9B99FF;
}
</style>

</head>

<body>
	<!-- Content Wrapper. Contains page content -->
	<div class="header">
		<div class="header-center">
			<img
				src="${pageContext.request.contextPath}/resources/images/logo.png"
				alt="로고" class="logo">
		</div>
	</div>
	<div class="content register-content">

		<!-- Main content -->
		<section class="content register-page">
				<!-- form start -->
				<div class="card" style="width: 500px;">
				<h4 style="padding-top: 20px; padding-left: 20px;">회원가입</h4>
					<div class="register-card-body">
					<div class="row md-12 mb-4">
		 		<div class="col-md-6 d-flex">
		 			<a href="<%=request.getContextPath()%>/member/regist" id="login_Who" class="btn " ><b>개발자</b></a>
		 		</div>
		 		<div class="col-md-6">
		 			<a href="/project/community/main" id="login_Who" class="btn " ><b>후원자</b></a>
		 		</div>
			</div>
						<form name="regist" class="form-horizontal" action="regist"
							method="post" >
							<input type="hidden" name="authorities" value="2" />
							<div class="form-group">
								<label for="user_id" class="col-sm-3 mb-0" style="font-size: 0.9em;">
									· 아이디<span style="color: red; font-weight: bold;">*</span>
								</label>
								<div class="input-group input-group-sm" >
					                <input name="user_id" onblur="validation(this.name);"
					                       type="text" class="form-control" id="user_id"
					                       placeholder="13글자 영문자,숫자 조합" >
					                <div class="input-group-append">
					                    <button type="button" onclick="idCheck_go();" style="width:70px;"
					                            class="btn btn-info btn-sm btn-append">중복확인</button>
					                </div>
					            </div>
							</div>
							<div class="form-group ">
								<label for="user_pwd" class="col-sm-3 mb-0" style="font-size: 0.9em; ">
									· 패스워드<span style="color: red; font-weight: bold;">*</span>
								</label>
								<div class="col-sm-9 input-group-sm">
									<input class="form-control" name="user_pwd" type="password"
										class="form-control" id="user_pwd"
										placeholder="20글자 영문자,숫자,특수문자 조합"
										onblur="validation(this.name);" />
								</div>

							</div>
							<div class="form-group">
								<label for="email" class="col-sm-3 mb-0" style="font-size: 0.9em;">· 이메일</label>
								<div class="col-sm-9 input-group-sm">
									<input name="email" type="email" class="form-control"
										id="email" placeholder="example@naver.com"
										onblur="validation(this.name);">
								</div>
							</div>
							<div class="form-group ">
								<label for="name" class="col-sm-3 mb-0" style="font-size: 0.9em;">· 이 름</label>
								<div class="col-sm-9 input-group-sm">
									<input class="form-control" name="name" type="text"
										class="form-control" id="name" placeholder="이름을 입력하세요"
										onblur="validation(this.name);" onkeyup="" />
								</div>
							</div>
							<div class="form-group">
								<label for="major" class="col-sm-3 mb-0" style="font-size: 0.9em;">· 전공</label>
								<div class="col-sm-9 input-group-sm">
									<input name="major" type="major" class="form-control"
										id="major" placeholder="선택사항" onblur="validation(this.name);">
								</div>
							</div>
							
							

							<div class="">
								<div class="row justify-content-center">
									<div class="col-sm-3 ">
										<button type="button" id="registBtn" onclick="regist_go();"
											class="btn btn-info btn-block">등&nbsp;&nbsp;록</button>
									</div>

									<div class="col-sm-3">
										<button type="button" id="cancelBtn" onclick="CloseWindow();"
											class="btn btn-secondary btn-block">취 &nbsp;&nbsp;소</button>
									</div>

								</div>
							</div>
						</form>
					</div>
					<!-- register-card-body -->
				</div>
		</section>
		<!-- /.content -->
	</div>
<div class="footer"></div>
	
	<!-- /.content-wrapper -->




	<script>
var checkID = "";
function idCheck_go(){
	//alert("click idCheck");
	
	let inputID = $('input[name="user_id"]');
	if(!inputID.val()){
		alert("아이디를 입력하세요");
		inputID.focus();
		return;			
	}
	
	if(!validation('user_id')) return;
	
	$.ajax({
		url:"idCheck?user_id="+inputID.val(),
		method:"get",
		success:function(data){
			if(data=="duplicated"){
				alert("이미 사용중인 아이디입니다.");
				inputID.focus();
				return;		
			}else{
				alert("사용 가능한 아이디입니다.");
				checkID = inputID.val();
				$('input[name="user_pwd"]').focus();
				return;
			}
		},
		error:function(error){
			alert("시스템장애로 인해 아이디 중복확인이 불가합니다.");
		}
		
	});
}



</script>

<script>
function regist_go(){
	let form = document.forms.regist;
	
	let labels = {
	        "user_id": "아이디는",
	        "user_pwd": "비밀번호는",
	        "email": "이메일은",
	        "name": "이름은"
	    };
	
	for(let element of form ){
		//alert(element.name);
		switch(element.name){
			case "user_id": case "user_pwd": case "email":  case "name":
			if(!element.value){
				let label = labels[element.name] || element.name;
				alert(label+" 필수입니다.");					
				if(element.name=="picture"){
					element.click();
				}else{
					element.focus();
				}					
				return;
			}
			
			if(element.name=="user_id" && element.value!=checkID){
				alert("아이디 중복확인은 필수입니다.");
				return;
			}
		}
	}
	
	form.action="regist";
	form.method="post";
	form.submit();
}
</script>
</body>
