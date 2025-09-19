<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>프로젝트 생성</title>
<style>
/* Container */
.container {
	width: 95%;
	max-width: 600px;
	margin: 40px auto;
	padding: 24px;
	background-color: #fff;
	border-radius: 16px;
	box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
	font-family: 'Poppins', sans-serif;
}

/* Header */
.header {
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	margin-bottom: 24px;
}

.header h2 {
	font-size: 1.8rem;
	font-weight: 600;
	color: #4287c4;
}

.close-btn {
	position: absolute;
	left: 0;
	background: transparent;
	border: none;
	font-size: 1.5rem;
	font-weight: bold;
	color: #666;
	cursor: pointer;
}

.close-btn:hover {
	color: #000;
}

/* Form */
form {
	display: flex;
	flex-direction: column;
	gap: 24px;
}

/* Image upload */
.image-preview-wrapper {
	width: 40%;
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
	min-height: 150px;
	padding: 10px;
	border: 1px dashed #ccc;
	border-radius: 12px;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
}

.image-preview-wrapper img {
	width: 200px;
	height: 150px;
	border-radius: 12px;
	object-fit: cover;
	border: 1px solid #ccc;
}

.file-btn {
	padding: 10px 16px;
	border-radius: 12px;
	border: none;
	background-color: #9B99FF;
	color: #fff;
	font-weight: 500;
	cursor: pointer;
	display: inline-block;
	margin: 0 auto;
}

.file-btn:hover {
	background-color: #836fff;
}

input[type="file"] {
	display: none;
}

/* Input fields */
input[type="text"], textarea {
	width: 100%;
	padding: 10px 14px;
	border-radius: 12px;
	border: 1px solid #ccc;
	font-size: 14px;
	box-sizing: border-box;
}

input[type="text"]:focus, textarea:focus {
	border-color: #4287c4;
	box-shadow: 0 0 6px rgba(66, 135, 196, 0.2);
	outline: none;
}

/* Member input */
.input-wrapper {
	position: relative;
	width: 100%;
}

.add-btn {
	position: absolute;
	right: 5px;
	top: 50%;
	transform: translateY(-50%);
	height: 80%;
	padding: 0 16px;
	border-radius: 10px;
	border: none;
	background-color: #9B99FF;
	color: #fff;
	font-weight: 500;
	cursor: pointer;
}

.add-btn:hover {
	background-color: #836fff;
}

/* Member list */
.member-list {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	min-height: 40px;
}

.member-item {
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 6px 12px;
	border-radius: 12px;
	background-color: #e6f0ff;
	color: #0366d6;
	font-weight: 500;
}

.member-item .remove-btn {
	background: transparent;
	border: none;
	color: #888;
	font-size: 14px;
	cursor: pointer;
	margin-left: 6px;
}

.member-item .remove-btn:hover {
	color: red;
}

/* Submit button */
.submit-btn {
	padding: 14px;
	border-radius: 12px;
	border: none;
	background-color: #9B99FF;
	color: #fff;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
}

.submit-btn:hover {
	background-color: #836fff;
}

/* Search results */
.search-results {
	border: 1px solid #ccc;
	max-height: 120px;
	overflow-y: auto;
	border-radius: 6px;
	background: #fff;
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	z-index: 1000;
}

.search-results div {
	padding: 6px 10px;
	cursor: pointer;
}

.search-results div:hover {
	background-color: #f1f1f1;
}
</style>
</head>
<div class="container">
	<!-- 타이틀 -->
	<div class="header">
		<button type="button" class="close-btn" onclick="goBack()">×</button>
		<h2>프로젝트 생성</h2>
	</div>

	<form id="projectForm"
		action="${pageContext.request.contextPath}/org/myproject/create"
		method="post" enctype="multipart/form-data" onsubmit="prepareForm()">

		<!-- 이미지 업로드 -->
		<div class="image-upload-wrapper">
			<div id="imagePreviewWrapper" class="image-preview-wrapper">
				<span style="color: #ccc;">이미지 미리보기</span>
			</div>
			<input type="file" id="fileInput" name="projectLogo" accept="image/*"
				onchange="previewImage(event)">
			<button type="button" class="file-btn"
				onclick="document.getElementById('fileInput').click()">이미지
				선택</button>
		</div>

		<!-- 프로젝트 이름 -->
		<input type="text" name="projectName" placeholder="프로젝트 이름" required>

		<!-- 프로젝트 설명 -->
		<textarea name="projectDesc" placeholder="프로젝트 설명" required></textarea>

		<!-- 프로젝트 시작일 hidden (오늘 날짜로 기본값) -->
		<input type="hidden" name="projectStartDate"
			value="<fmt:formatDate value='${now}' pattern='yyyy-MM-dd'/>" />

		<%
		// JSP 페이지에서 now를 오늘 날짜로 세팅
		request.setAttribute("now", new java.util.Date());
		%>

		<!-- 멤버 입력 -->
		<div class="input-wrapper">
			<input type="text" id="nickname" placeholder="닉네임 입력"
				onkeyup="searchNickname(this.value)">
			<button type="button" class="add-btn" onclick="addMember()">추가</button>
			<div id="searchResults" class="search-results"></div>
		</div>

		<!-- 선택된 멤버 리스트 -->
		<div id="memberList" class="member-list"></div>
		<!-- JS에서 동적으로 <input type="hidden" name="projectManager" value="닉네임"> 추가 -->

		<!-- 제출 버튼 -->
		<button type="submit" class="submit-btn">프로젝트 생성</button>
	</form>
</div>

<script>


// 팝업 닫기 또는 뒤로가기
function goBack() {
    if (window.opener) window.close();
    else window.history.back();
}

//이미지 미리보기 (단일 파일)
function previewImage(event) {
    var file = event.target.files[0];
    var preview = document.getElementById("imagePreviewWrapper");
    preview.innerHTML = "";
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = document.createElement("img");
            img.src = e.target.result;
            preview.appendChild(img);
        }
        reader.readAsDataURL(file);
    }
}

let selectedNick = ""; // 클릭한 닉네임 저장용

//닉네임 검색
function searchNickname(keyword) {
 var resultsDiv = document.getElementById("searchResults");
 resultsDiv.innerHTML = "";
 selectedNick = ""; // 초기화

 if (keyword.trim() === "") return;

 fetch('${pageContext.request.contextPath}/org/myproject/search?keyword=' + encodeURIComponent(keyword))
     .then(res => res.json())
     .then(data => {
         data.forEach(nick => {
             var div = document.createElement("div");
             div.innerText = nick;
             div.onclick = function() {
                 document.getElementById("nickname").value = nick;
                 selectedNick = nick; // 클릭한 값 저장
                 resultsDiv.innerHTML = "";
             }
             resultsDiv.appendChild(div);
         });
     })
     .catch(err => console.error(err));
}

//멤버 추가
function addMember() {
 var input = document.getElementById("nickname");
 var val = input.value.trim();
 if (!val) return;

 // 선택한 값과 비교
 if (val !== selectedNick) {
     alert("검색 결과에서 선택한 닉네임만 추가 가능합니다.");
     return;
 }

 var memberList = document.getElementById("memberList");
 var exists = Array.from(memberList.children).some(div => div.dataset.nick === val);
 if (exists) return;

 var div = document.createElement("div");
 div.className = "member-item";
 div.dataset.nick = val;

 var span = document.createElement("span");
 span.innerText = val;

 var btn = document.createElement("button");
 btn.type = "button";
 btn.className = "remove-btn";
 btn.innerText = "×";
 btn.onclick = function() {
     memberList.removeChild(div);
 };

 div.appendChild(span);
 div.appendChild(btn);
 memberList.appendChild(div);

 // 초기화
 input.value = "";
 selectedNick = "";
}
// form submit 전에 선택 멤버 hidden input으로 전송
function prepareForm() {
    var memberList = Array.from(document.getElementById("memberList").children)
        .map(div => div.dataset.nick); // dataset.nick 사용
    var hidden = document.createElement("input");
    hidden.type = "hidden";
    hidden.name = "projectManager"; 
    hidden.value = memberList.join(",");
    document.getElementById("projectForm").appendChild(hidden);

    console.log("Hidden value:", hidden.value); // 확인용
    return true; // 반드시 true 반환
}

</script>

</html>