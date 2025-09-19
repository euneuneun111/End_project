<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>



<head>
<!-- Font Awesome Icons -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/bootstrap/plugins/fontawesome-free/css/all.min.css">
<!-- Theme style -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/bootstrap/dist/css/adminlte.min.css">
<!-- jQuery -->
<script src="<%=request.getContextPath() %>/resources/bootstrap/plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="<%=request.getContextPath() %>/resources/bootstrap/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="<%=request.getContextPath() %>/resources/js/common.js" ></script>
	
</head>

<body>
<section class="content-header">
	  	<div class="container-fluid">
	  		<!-- <div class="row md-2">
	  			<div class="col-sm-6">
	  				<h4>신고하기</h4>  				
	  			</div>
	  			<div class="col-sm-6">
	  				<ol class="breadcrumb float-sm-right">
			        <li class="breadcrumb-item">
			        	<a href="#">
				        	<i class="fa fa-dashboard"></i>자유게시판
				        </a>
			        </li>
			        <li class="breadcrumb-item active">
			        	수정하기
			        </li>		        
	    	  </ol>
	  			</div>
	  		</div> -->
	  	</div>
	</section>
  <!-- Main content -->
    <section class="content container-fluid">
		<div class="row">
			<div class="col-md-12">
				<div class="card card-outline card-info">
					<div class="card-header">
						<h3 class="card-title">게시글 신고</h3>
						
					</div><!--end card-header  -->
					<div class="card-body">
						<form role="form" method="post" action="report.do" name="reportForm">
						<div class="row">
							<input type="hidden" name="bno" value="${board.bno }" />
							<div class="form-group col-sm-6">
								<label for="title">제 목</label> 
								<input type="text" id="title" readonly name="title" title="제목" class="form-control notNull" value="${board.title }" />
							</div>
							<div class="form-group col-sm-6">
								<label for="writer">작성자</label> 
								<input type="text" id="writer" readonly	name="writer" title="작성자" class="form-control notNull"  value="${board.writer }" />
							</div>
						</div>
							<div class="form-group">
								<label for="content">신고 내용</label>		
								<textarea class="form-control" name="content" id="content" rows="3"
									placeholder="500자 내외로 작성하세요.">${fn:escapeXml(board.content) }</textarea>						
							</div>
						</form>
						<div class="card-tools">
							<div class="row justify-content-center">
								<button type="button" class="btn btn-danger" id="modifyBtn" onclick="modify_submit();">신 고</button>
								&nbsp;&nbsp;&nbsp;&nbsp;
								<button type="button" class="btn btn-default " id="cancelBtn" onclick="history.go(-1);">취 소</button>
							</div>
						</div>
					</div><!--end card-body  -->
					
				</div><!-- end card -->				
			</div><!-- end col-md-12 -->
		</div><!-- end row -->
    </section>
    <!-- /.content -->




<script>
Summernote_go($("textarea#content"),"<%=request.getContextPath() %>") ;

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








