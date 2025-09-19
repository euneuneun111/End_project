<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
    
<%@ include file="/WEB-INF/views/module/header.jsp" %>

<title>커뮤니티</title>

<head>

</head>    


<body>
<!-- Content Wrapper. Contains page content -->    

<!-- head content -->
<section class="content-header border-0">
  	<div class="container-fluid">
  		<!-- <div class="row md-2">
  			<div class="col-sm-6">
  				<h1>&nbsp;&nbsp;커뮤니티</h1>  				
  			</div>
  		</div> -->
  	</div>
</section>
 
 
  	<!-- Main content -->
    <section class="content">

      <!-- Default box -->
      <div class="card card-solid">
        <div class="card-body pb-0">
          <div class="row d-flex">
           <div class="col-md-2 vh-100">
           
             <div class="col-md-12 main-sidebar">
          <!-- 1. 커뮤니티 메뉴 -->
          <div class="card mb-3">
            <div class="card-body overflow-hidden">
              <ul class="nav flex-column ">
                <li class="fa-solid"><a class="nav-link" href="#">recruit</a></li>
                <li class="fa-solid"><a class="nav-link" href="/project/community/Board">Free Board</a></li>
              </ul>
            </div>
          </div>

          <!-- 2. 내가 쓴 게시글 -->
          <div class="card mb-3">
            <div class="card-header">내가 쓴 게시글</div>
            <div class="card-body">
              <ul class="list ml-2">
                <li>게시글 </li>
                <li>게시글 </li>
              </ul>
            </div>
          </div>

          <!-- 3. 알림 -->
          <div class="card">
            <div class="card-header">알림</div>
            <div class="card-body">
              <ul class="list ml-2">
                <li>알림 </li>
                <li>알림 </li>
              </ul>
            </div>
          </div>
        </div>
                 
           </div>
           
           <div class="col-md-10">
             <div class="card">
               <h4 class="mb-0 mt-3">&nbsp;&nbsp;&nbsp;인기 프로젝트</h4>
               <div class="card-body">
                 <div class="row">          
            <div class=" col-md-3 d-flex align-items-stretch flex-column" style="height: 350px; ">
              <div class="card bg-light d-flex flex-fill " style="border: 2px solid #9b99ff;">
                <div class="card-header text-center border-bottom-0">
                  <h5>Title</h5>               
                </div>
                  <div class="card-body pt-0 d-flex align-items-center ">
                    <div class="col-12 text-center"><p>Text</p></div>  
                </div>
                <div class="">
                <div class="d-flex justify-content-center align-items-center" style="height: 50px;">                
                    <p class="mb-0">Schedule</p>                  
                </div>
                </div>
              </div>
            </div>
            
            <div class=" col-md-3 d-flex align-items-stretch flex-column">
              <div class="card bg-light d-flex flex-fill " style="border: 2px solid #9b99ff;">
                <div class="card-header text-center border-bottom-0">
                  <h5>Title</h5>               
                </div>
                  <div class="card-body pt-0 d-flex align-items-center ">
                    <div class="col-12 text-center"><p>Text</p></div>  
                </div>
                <div class="">
                <div class="d-flex justify-content-center align-items-center" style="height: 50px;">                
                    <p class="mb-0">Schedule</p>                  
                </div>
                </div>
              </div>
            </div>
            
            <div class=" col-md-3 d-flex align-items-stretch flex-column">
              <div class="card bg-light d-flex flex-fill " style="border: 2px solid #9b99ff;">
                <div class="card-header text-center border-bottom-0">
                  <h5>Title</h5>               
                </div>
                  <div class="card-body pt-0 d-flex align-items-center ">
                    <div class="col-12 text-center"><p>Text</p></div>  
                </div>
                <div class="">
                <div class="d-flex justify-content-center align-items-center" style="height: 50px;">                
                    <p class="mb-0">Schedule</p>                  
                </div>
                </div>
              </div>
            </div>
            
            <div class=" col-md-3 d-flex align-items-stretch flex-column">
              <div class="card bg-light d-flex flex-fill " style="border: 2px solid #9b99ff;">
                <div class="card-header text-center border-bottom-0">
                  <h5>Title</h5>               
                </div>
                  <div class="card-body pt-0 d-flex align-items-center ">
                    <div class="col-12 text-center"><p>Text</p></div>  
                </div>
                <div class="">
                <div class="d-flex justify-content-center align-items-center" style="height: 50px;">                
                    <p class="mb-0">Schedule</p>                  
                </div>
                </div>
              </div>
            </div>
            
            
            
            </div>
            </div>
            </div>
          
             <div class="card mb-3">
               <h4 class="mb-0 mt-3">&nbsp;&nbsp;&nbsp;추천 프로젝트</h4>
               <div class="card-body">
                 <div class="row">          
            <div class=" col-md-3 d-flex align-items-stretch flex-column " style="height: 350px;">
              <div class="card bg-light d-flex flex-fill " style="border: 2px solid #9b99ff;">
                <div class="card-header text-center border-bottom-0">
                  <h5>Title</h5>               
                </div>
                  <div class="card-body pt-0 d-flex align-items-center ">
                    <div class="col-12 text-center"><p>Text</p></div>  
                </div>
                <div class="">
                <div class="d-flex justify-content-center align-items-center" style="height: 55px;">                
                    <p class="mb-0">Schedule</p>                  
                </div>
                </div>
              </div>
            </div>
            <div class=" col-md-3 d-flex align-items-stretch flex-column">
              <div class="card bg-light d-flex flex-fill " style="border: 2px solid #9b99ff;">
                <div class="card-header text-center border-bottom-0">
                  <h5>Title</h5>               
                </div>
                  <div class="card-body pt-0 d-flex align-items-center ">
                    <div class="col-12 text-center"><p>Text</p></div>  
                </div>
                <div class="">
                <div class="d-flex justify-content-center align-items-center" style="height: 55px;">                
                    <p class="mb-0">Schedule</p>                  
                </div>
                </div>
              </div>
            </div>
            <div class=" col-md-3 d-flex align-items-stretch flex-column">
              <div class="card bg-light d-flex flex-fill " style="border: 2px solid #9b99ff;">
                <div class="card-header text-center border-bottom-0">
                  <h5>Title</h5>               
                </div>
                  <div class="card-body pt-0 d-flex align-items-center ">
                    <div class="col-12 text-center"><p>Text</p></div>  
                </div>
                <div class="">
                <div class="d-flex justify-content-center align-items-center" style="height: 55px;">                
                    <p class="mb-0">Schedule</p>                  
                </div>
                </div>
              </div>
            </div>
            
            <div class=" col-md-3 d-flex align-items-stretch flex-column">
              <div class="card bg-light d-flex flex-fill " style="border: 2px solid #9b99ff;">
                <div class="card-header text-center border-bottom-0">
                  <h5>Title</h5>               
                </div>
                  <div class="card-body pt-0 d-flex align-items-center ">
                    <div class="col-12 text-center"><p>Text</p></div>  
                </div>
                <div class="">
                <div class="d-flex justify-content-center align-items-center" style="height: 50px;">                
                    <p class="mb-0">Schedule</p>                  
                </div>
                </div>
              </div>
            </div>
            </div>
            </div>
            </div>
            </div>
          </div>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->

    </section>


</body>
