<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.8/handlebars.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/bootstrap/plugins/jquery/jquery.min.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/bootstrap/plugins/fontawesome-free/css/all.min.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/bootstrap/dist/css/adminlte.min.css">
<script src="<%=request.getContextPath()%>/resources/js/common.js"></script>
<style>
    /* 신청자 카드 스타일 */
    .applicant-card {
        padding: 10px 15px;
        border: 1px solid #9B99FF;
        border-radius: 8px;
        background-color: #f0f0ff;
        margin: 5px;
    }
    .applicant-current {
        background-color: #ffd699; /* 로그인 사용자 강조 */
        border-color: #ffb347;
    }
</style>
</head>

<body>
<section class="content-header">
    <div class="container-fluid">
        <div class="row md-2">
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-left">
                    <li class="breadcrumb-item"><a href="#"><i class="fa fa-dashboard"></i>홍보/모집 게시판</a></li>
                    <li class="breadcrumb-item active">상세보기</li>
                </ol>
            </div>
        </div>
    </div>
</section>

<section class="content container-fluid">
    <!-- 게시글 카드 -->
    <div class="card card-outline card-info" style="border-color: #9B99FF">
        <div class="card-header d-flex align-items-center">
            <h3 class="card-title flex-grow-1 m-0">${recruit_board.title}</h3>
            <div class="card-tools">
                <button type="button" id="listBtn" class="btn btn-primary" onclick="CloseWindow();">CLOSE</button>
            </div>
        </div>
        <div class="card-body text-right" style="font-size: 14px;">
            작성자: ${recruit_board.or_id} &nbsp;|&nbsp;
            작성일: <fmt:formatDate value="${recruit_board.reg_Date}" pattern="yyyy-MM-dd" /> &nbsp;|&nbsp;
            조회수: ${recruit_board.view_cnt}
        </div>
        <div class="card-body" style="height:250px;">
            <div id="content" class="align-items-center">${recruit_board.content}</div>
        </div>
    </div>

    <!-- 신청자 카드 영역 -->
    <div class="card card-outline card-info" style="border-color: #9B99FF; min-height:200px;">
        <div class="row col-mb-12 align-items-center mt-2 ml-2 d-flex justify-content-between"><h5> 신청자 </h5>
            <div class="col-sm-2 mt-2 ">
                <button type="button" 
                        style="background-color: #9B99FF; border: #9B99FF;"
                        class="btn btn-success" 
                        onclick="applyRecruit()">신청하기</button>
            </div>
        </div>

        <!-- 로그인 사용자 박스 -->
        <div id="applyBox" 
             style="display: none; border: 1px solid #ffb347; padding: 5px; margin-top: 5px; border-radius: 8px; background: #ffd699; width: 200px;">
            <h5>나의 신청 정보</h5>
            <p><strong>아이디:</strong> <span id="applyUser_id"></span></p>
        </div>

        <!-- 신청자 목록 -->
        <div class="d-flex flex-wrap gap-3 mt-2" id="applyListContainer"></div>
    </div>
</section>

<script>
// 박스 표시 (로그인 사용자)
function showApplyBox(user_id) {
    document.getElementById("applyUser_id").textContent = user_id;
    document.getElementById("applyBox").style.display = "block";
}

// 신청자 목록에 추가 (기존 신청자 / 로그인 사용자 구분)
function addApplicantToList(user_id, isCurrentUser=false) {
    const container = document.getElementById("applyListContainer");

    // 중복 방지
    const existing = Array.from(container.children).some(div => div.textContent === user_id);
    if(existing) return;

    const div = document.createElement("div");
    div.textContent = user_id;
    div.classList.add("applicant-card");
    if(isCurrentUser) div.classList.add("applicant-current");
    container.appendChild(div);
}

// 신청 AJAX
function applyRecruit() {
    const user_id = "${sessionScope.loginUser.user_id}";
    const rno = "${recruit_board.rno}";

    if(!user_id) {
        alert("로그인 후 신청 가능합니다.");
        return;
    }

    $.ajax({
        url: '<%=request.getContextPath()%>/community/recruit_apply',
        method: 'POST',
        data: { user_id: user_id, rno: rno },
        success: function(res) {
            if (res.success) {
                alert("신청 완료!");
                showApplyBox(user_id);
                addApplicantToList(user_id, true);
            } else {
                alert("이미 신청한 사용자입니다.");
            }
        },
        error: function() {
            alert("신청 실패!");
        }
    });
}

// 페이지 로드 시 기존 신청자 불러오기
$(document).ready(function() {
    const rno = "${recruit_board.rno}";
    const loginUserId = "${sessionScope.loginUser.user_id}";

    $.ajax({
        url: '<%=request.getContextPath()%>/community/getApplications',
        method: 'GET',
        data: { rno: rno },
        success: function(res) {
            res.forEach(applicant => {
                const isCurrent = applicant.user_id === loginUserId;
                addApplicantToList(applicant.user_id, isCurrent);
                if(isCurrent) showApplyBox(applicant.user_id);
            });
        },
        error: function() {
            console.log("기존 신청자 불러오기 실패");
        }
    });
});
</script>
</body>
