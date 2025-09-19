<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LINKED - 메인 페이지</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/common.css">
    <%-- <link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css"> --%>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
	<%@ include file="/WEB-INF/views/module/header.jsp" %>
    <div class="main-layout-container">
            <jsp:include page="/WEB-INF/views/commons/orgsidebar.jsp" />

            <div class="main-content">
            	
            </div>
        </div>
    </div>

    <%@ include file="/WEB-INF/views/module/footer.jsp" %>

</body>
</html>