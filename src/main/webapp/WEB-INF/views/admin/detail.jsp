<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<fmt:formatDate var="formattedRegDate" value="${admin.regDate}" pattern="yyyy-MM-dd" />

<meta charset="UTF-8">
<title>신고/문의 상세</title>
<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

<style>
body {
	background: #f4f4f9;
}

.form-section {
	background: #fff;
	border-radius: 10px;
	padding: 30px 40px;
	max-width: 800px;
	margin: 40px auto;
	box-shadow: 0 0 15px rgba(155, 153, 255, 0.3);
}

.form-group label {
	font-weight: 600;
}

.btn-delete {
	background-color: #dc3545;
	color: #fff;
	margin-right: 8px;
}
.btn-cancel {
	background-color: #6c757d;
	color: #fff;
}

.file-list {
	list-style: none;
	padding-left: 0;
}
.file-list li {
	cursor: pointer;
	padding: 5px 0;
	display: flex;
	align-items: center;
}
.file-list li i {
	margin-right: 8px;
	color: #6c63ff;
}
</style>

<body>

<section class="content-header">
		<div class="container-fluid">
			<div class="row md-2">
				<div class="col-sm-6">
					<h1>상세페이지</h1>
				</div>
				<div class="col-sm-6">
					<ol class="breadcrumb float-sm-right">
						<li class="breadcrumb-item"><a href="list.do"> <i
								class="fa fa-dashboard"></i>관리자
						</a></li>

					</ol>
				</div>
			</div>
		</div>
	</section>
	
	<div class="card-header"></div>
					<!--end card-header  -->
					<div class="card-body">
					
					<div class="form-section" style="padding: 30px 100px">
		<form name="registForm" role="form" enctype="multipart/form-data">
			<table class="table table-bordered" style="width: 100%; background: #fff;">

	<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <tr>
    <th style="width: 150px; border: 1px solid #ddd; padding: 12px; background: #f5f5f5; text-align: center;">
      등록일자
    </th>
    <td style="border: 1px solid #ddd; padding: 12px;">
      ${formattedRegDate}
    </td>
    <th style="width: 150px; border: 1px solid #ddd; padding: 12px; background: #f5f5f5; text-align: center;">
      신청자
    </th>
    <td style="border: 1px solid #ddd; padding: 12px;">
      ${admin.applicant}
    </td>
  </tr>
  <tr>
    <th style="border: 1px solid #ddd; padding: 12px; background: #f5f5f5; text-align: center;">
      구분
    </th>
    <td colspan="3" style="border: 1px solid #ddd; padding: 12px;">
      ${admin.title}
    </td>
  </tr>
  <tr>
    <th style="border: 1px solid #ddd; padding: 12px; background: #f5f5f5; text-align: center;">
      사유
    </th>
    <td colspan="3" style="border: 1px solid #ddd; padding: 12px; white-space: pre-line;">
      ${admin.reason}
    </td>
  </tr>
 <tr>
							<th
								style="background: #f5f5f5; text-align: center; vertical-align: middle;">신고
								내용</th>
							<td colspan="3"><textarea class="form-control notNull"
									name="content" rows="8" title="내용" readonly>${admin.content}</textarea>
							</td>
						</tr>
</table>

		
		<div class="card-tools" style="width: 99%; text-align: right;">
				<div class="float-right">
					<button type="button" class="btn btn-submit" id="removeBtn"
						onclick="remove();" style="background: #9b99ff; color: #fff">삭 제</button>

					&nbsp;&nbsp;&nbsp;&nbsp;
					<button type="button" class="btn btn-default " id="cancelBtn"
						onclick="CloseWindow();" style="color: #9b99ff">취 소</button>
				</div>
			</div>
	</div>

	<script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>

	<script>
		// 삭제 버튼 클릭 시
		function remove() {
			let answer = confirm("삭제하시겠습니까?");
			if (!answer) return;
			location.href = "remove?id=${admin.id}";
		}
	</script>

</body>