<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>로그인</title>
	
	<!-- Google Font: Source Sans Pro -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
	<!-- Font Awesome Icons -->
	<link rel="stylesheet" href="<%=request.getContextPath() %>/resources/bootstrap/plugins/fontawesome-free/css/all.min.css">
	<!-- Theme style -->
	<link rel="stylesheet" href="<%=request.getContextPath() %>/resources/bootstrap/dist/css/adminlte.min.css">
	
	<style>
		.header {
			justify-items: center;
			align-item: center;
			padding: 5px 35px;
			background-color:#9B99FF;
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
		.login-box{
			width: 100%;
			min-width: 550px;
			padding: 0 20px;
			box-sizing
		}
		b {
		
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
			background-color:#9B99FF;
			width: 100%;
			box-sizing: border-box;
		}
		#login_Who{
			width:100%;
			color: #111111;
			background-color: #dddddd;
		}

	</style>
	
</head>    
    
<body class="hold-transition login-page">
	<div class="header">
		<div class="header-center">
    	<img src="${pageContext.request.contextPath}/resources/images/logo.png" alt="로고" class="logo">
  </div>
	</div>
	<div class="hold-transition login-page">
	   <div class="login-box">
		<div class="login-logo">
			<b>Login</b>
		</div>
		<!-- /.login-logo -->
		<div class="card border-0 shadow-none">
		 <div class="card-body login-card-body ">
		 	<div class="row md-12 mb-4">
		 		<div class="col-md-6 d-flex">
		 			<a href="<%=request.getContextPath()%>/#" id="login_Who" class="btn " ><b>개발자</b></a>
		 		</div>
		 		<div class="col-md-6">
		 			<a href="/project/community/main" id="login_Who" class="btn " ><b>후원자</b></a>
		 		</div>
			</div>

			<form action="login/post" method="post">
				<input name="retUrl" value="${retUrl }" type="hidden" />
				<div class="form-group has-feedback">
					<label for="id">아이디</label>
					<input type="text" class="form-control" name="user_id" placeholder="아이디를 입력하세요." value="">
					<span class="glyphicon glyphicon-envelope form-control-feedback"></span>
				</div>
				<div class="form-group has-feedback">
				<label for="pwd">패스워드</label>
					<input type="password" class="form-control" name="user_pwd" placeholder="패스워드를 입력하세요."  value="">
					<span class="glyphicon glyphicon-lock form-control-feedback"></span>
				</div>
				<div class="row">
					<div class="col-sm-8">
						<div class="checkbox icheck">
							<label> <input type="checkbox" name="rememberMe" value="check"> 아이디 저장
							</label>
						</div>
					</div>
					<!-- /.col -->
					
				</div>
				<div class="row">
					<div class="col-sm-12" id="login_btn">
						<button type="submit" class="btn btn-block btn-flat">로그인</button>
					</div>
				</div>
			</form>
			
			<div class="row d-flex">
				<div class="col-md-12 text-center mt-3">
					<a href="#" >아이디 찾기</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
					<a href="#" >비밀번호 찾기</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
					<a href="<%=request.getContextPath()%>/member/regist" >회원가입</a>
					
				</div>
			</div>
			<br> 
		</div>
		<!-- /.login-box-body -->
	  </div>	
	</div>
	<!-- /.login-box -->
	</div>	
	<div class="footer"></div>
      
  
 <!-- jQuery -->
<script src="<%=request.getContextPath() %>/resources/bootstrap/plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="<%=request.getContextPath() %>/resources/bootstrap/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- AdminLTE App -->
<script src="<%=request.getContextPath() %>/resources/bootstrap/dist/js/adminlte.min.js"></script>
</body>