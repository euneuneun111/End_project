<%-- src/main/webapp/WEB-INF/views/organization/createOrg.jsp --%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>LINKED - 조직 생성</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/common.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/createOrg.css">
	<style>
		.custom-confirm-btn {
			color: #fff;
    		background-color: #007bff;
		}
	</style>
	
</head>
<body>
	<script>
        const msg = "${msg}";
        if (msg) {
            alert(msg);
        }
    </script>
    <%@ include file="/WEB-INF/views/module/header.jsp" %>
    <div class="main-layout-container">
        <jsp:include page="/WEB-INF/views/commons/orgsidebar.jsp" />
        <div class="main-content">
            <div class="page-title">
                <h2>조직 생성</h2>
            </div>
            <div class="org-create-form-container">
                <form id="orgCreateForm" action="${pageContext.request.contextPath}/org/create" method="post">
                    <div class="form-grid-container">
                        <div class="form-group">
                            <label for="orName">조직 이름</label>
                            <input type="text" id="orName" name="orName" required>
                        </div>
                        <div class="form-group">
                            <label for="orIsPublic">공개 여부</label>
                            <select id="orIsPublic" name="orIsPublic">
                                <option value="Y" selected>공개</option>
                                <option value="N">비공개</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="orIntroduce">조직 설명</label>
                        <textarea id="orIntroduce" name="orIntroduce" rows="5"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="orCreateDate">활동 시작일</label>
                        <input type="date" id="orCreateDate" name="orCreateDate" required>
                    </div>
                    <div class="custom-modal-buttons">
                        <button type="submit" class="custom-confirm-btn">생성하기</button>
                        <button type="button" class="custom-cancel-btn" onclick="history.back();">취소</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <%@ include file="/WEB-INF/views/module/footer.jsp" %>
    <script>
        // 페이지 로드 시 활동 시작일 필드를 오늘 날짜로 자동 설정
        document.getElementById('orCreateDate').valueAsDate = new Date();
    </script>
</body>
</html>