<%@page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<%@ include file="/WEB-INF/views/module/header.jsp"%>

<title>자유게시판</title>

<head>

<style>
table {
	border-top: solid;
	border-color: #9B99FF;
}

table th, td {
	text-align: center;
	line-height: 30px;
}

table td>span {
	display: block;
	width: 30px;
	height: 30px;
	margin: 0 auto;
}

</style>

</head>


<body>
	<!-- Content Wrapper. Contains page content -->

	<!-- Main content -->
	<section class="content-header border-0 ">
		<div class="justify-content-end "></div>
	</section>


	<section class="content">
		<div class="card-body pb-0">
			<div class="row d-flex">
				<div class="col-md-2 vh-100">
					<div class="col-md-12 main-sidebar">
						<!-- 1. 커뮤니티 메뉴 -->
						<div class="card mb-3">
							<div class="card-body overflow-hidden">
								<ul class="nav flex-column ">
									<li class="fa-solid "><a class="nav-link"
										href="/project/community/Recruit">recruit</a></li>
									<li class="fa-solid "><a class="nav-link"
										href="/project/community/Board">Free Board</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div class="col-md-10">
					<div class="card d-flex">
						<div class="card-header border-0 d-flex justify-content-center">
							<div id="keyword" class="card-tools " style="width: 550px;">
								<div class="input-group row ">
									<!-- search bar -->

									<!-- keyword -->
								<input  class="form-control" type="text" name="keyword" placeholder="검색어를 입력하세요." value="${pageMaker.keyword }"/>
									 <span class="input-group-append">
										<button class="btn btn-outline-secondary" type="button"
											onclick="search_list(1);" id="searchBtn"
											data-card-widget="search">
											<i class="fa fa-fw fa-search"></i>
										</button>
									</span>
									<!-- end : search bar -->
								</div>
							</div>
						</div>
						<div class="col-md-12 d-flex">
							<div class="col-md-6 d-flex">
								<h4 class="mb-0 mt-3">&nbsp;&nbsp;&nbsp;자유게시판</h4>
							</div>
							<div class="col-md-6 d-flex justify-content-end ">
								<a href="#" class="btn btn-secondary border-0" style="margin-right: 2rem; background-color:#9B99FF;" 
									onclick="OpenWindow('regist','게시글 작성',700,800);">게시글 작성</a>
							</div>
						</div>

						<div class="card-body">
							<table class="table  table-sm" id="boardTable">
								<thead>
								<tr style="background-color: #fff;">
									<th style="width:10%;">번 호</th>
						<th style="width:50%;">제 목</th>
						<th style="width:15%;">작성자</th>
						<th>등록일</th>
						<th style="width:10%;">조회수</th>
					</tr>
				   </thead>	
					
				   <tbody>
				   <c:if test="${empty boardList }">
				   	   <tr>
				   	   		<td colspan="5" class="text-center" >해당 내용이 없습니다.</td>
				   	   </tr>
				   </c:if>			
				   <c:if test="${not empty boardList }" >		
					<c:forEach items="${boardList }" var="board">
						<tr onclick="OpenWindow('detail?fno=${board.fno}','상세보기',700,800);" style="cursor:pointer;">
							<td>${board.fno }</td>
							<td style="text-align:left;max-width: 100px; overflow: hidden; 
												white-space: nowrap; text-overflow: ellipsis;">${board.title }
								<c:if test="${board.replycnt ne 0 }">		
									&nbsp;&nbsp;<span style="display:inline; align-content:center; color:#888;">[${board.replycnt }]</span>																	
								</c:if>
							</td>
							<td>${board.eng_id }</td>
							<td><fmt:formatDate value="${board.reg_Date }" pattern="yyyy-MM-dd"/></td>
							<td><span>${board.view_cnt }</span></td>
						</tr>					
					</c:forEach>		
				   </c:if>
				   </tbody>
							</table>

						</div>
						<!-- card-body -->
						<div class="card-footer">
							<%@ include file="/WEB-INF/views/module/pagination.jsp"%>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>


	<script>
	MemberPictureBackground("<%=request.getContextPath()%>
		");
	</script>

</body>
