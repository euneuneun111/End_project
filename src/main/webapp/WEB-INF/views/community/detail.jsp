<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<head>
<!-- jQuery -->
<script src="<%=request.getContextPath() %>/resources/bootstrap/plugins/jquery/jquery.min.js"></script>
<!-- Font Awesome Icons -->
<link rel="stylesheet" href="<%=request.getContextPath() %>/resources/bootstrap/plugins/fontawesome-free/css/all.min.css">
<!-- Theme style -->
<link rel="stylesheet" href="<%=request.getContextPath() %>/resources/bootstrap/dist/css/adminlte.min.css">
<script src="<%=request.getContextPath() %>/resources/bootstrap/plugins/jquery/jquery.min.js"></script>
<script src="<%=request.getContextPath() %>/resources/js/common.js" ></script>
<script>
function modify(){
	location.href="modify?fno=${board.fno}";
}
function remove(){
	location.href="remove?fno=${board.fno}";
}
</script>
</head>

<body>
	<section class="content-header">
	  	<div class="container-fluid">
	  		<div class="row md-2">
	  			<div class="col-sm-6">
	  				<h1>상세보기</h1>  				
	  			</div>
	  			<div class="col-sm-6">
	  				<ol class="breadcrumb float-sm-right">
			        <li class="breadcrumb-item">
			        	<a href="list.do">
				        	<i class="fa fa-dashboard"></i>자유게시판
				        </a>
			        </li>
			        <li class="breadcrumb-item active">
			        	상세보기
			        </li>		        
	    	  </ol>
	  			</div>
	  		</div>
	  	</div>
	</section>
	 
   
      <!-- Main content -->
    <section class="content container-fluid">
		<div class="row">
			<div class="col-md-12">
				<div class="card card-outline card-info">
					<div class="card-header">
						<h3 class="card-title">상세보기</h3>
						<div class="card-tools">
							<button type="button" id="modifyBtn" class="btn btn-warning" onclick="modify();">MODIFY</button>						
						    <button type="button" id="removeBtn" class="btn btn-danger" onclick="remove();">REMOVE</button>
						    <button type="button" id="listBtn" class="btn btn-primary" onclick="CloseWindow();">CLOSE</button>
					    </div>
					</div>
					<div class="card-body">
						<div class="form-group col-sm-12">
							<label for="title">제 목</label>
							<input type="text" class="form-control" id="title" readonly disabled value="${board.title }" />							
						</div>
						<div class="row">	
							<div class="form-group col-sm-4" >
								<label for="eng_id">작성자</label>
								<input type="text" class="form-control" id="eng_id" readonly value="${board.eng_id }"/>
							</div>		
							
							<div class="form-group col-sm-4" >
								<label for="reg_Date">작성일</label>
								<input type="text" class="form-control" id="reg_Date" readonly 
									   value='<fmt:formatDate value="${board.reg_Date }" pattern="yyyy-MM-dd"/>' />
							
							</div>
							<div class="form-group col-sm-4" >
								<label for="view_cnt">조회수</label>
								<input type="text" class="form-control" id="view_cnt" readonly value="${board.view_cnt }"/>
							</div>
						</div>		
						<div class="form-group col-sm-12">
							<label for="content">내 용</label>
							<div id="content">${board.content }</div>	
						</div>
												
					</div>													
				</div><!-- end card -->				
			</div><!-- end col-md-12 -->
		</div><!-- end row  -->
    </section>
    <!-- /.content -->
        
    
    <!-- Reply content -->
    <section class="content container-fluid">
    	<!-- reply component start --> 
		<div class="row">
			<div class="col-md-12">
				<div class="card card-info">					
					<div class="card-body">
						<!-- The time line -->
						<div class="timeline">
							<!-- timeline time label -->
							<div class="time-label" id="repliesDiv">
								<span class="bg-green">Replies List </span>							
							</div>
							
							
						</div>
						<div class='text-center'>
							<ul id="pagination" class="pagination justify-content-center m-0" >
								
							</ul>
						</div>
					</div>
					<div class="card-footer">
						<label for="newReplyContent">Reply Text</label>
						<input class="form-control" type="text"	placeholder="REPLY TEXT" id="newReplyContent">
						<br/>
						<button type="button" class="btn btn-primary" id="replyAddBtn" onclick="replyRegist_go();">ADD REPLY</button>
					</div>				
				</div>			
				
			</div><!-- end col-md-12 -->
		</div><!-- end row -->
    </section>
  
  <!-- /.content -->

<%@ include file="./reply_js.jsp" %>



</body>

