<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>간트 차트</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/common.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/ganttchart.css">
    <script src="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
    <link href="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" rel="stylesheet">
    <style>
        #gantt_here {
            width: 100%;
            height: calc(100vh - 200px);
            border: 1px solid #e0e0e0;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <%@ include file="/WEB-INF/views/module/header.jsp" %>

    <div class="main-layout-container">
        <jsp:include page="/WEB-INF/views/commons/sidebar.jsp" />

        <div class="main-content">
            <h2 class="page-title">간트 차트</h2>
            <div class="content-area">
                <div id="gantt_here"></div>
            </div>
        </div>
    </div>

<script>
    gantt.config.columns = [
        {name: "text",       label: "일감 이름",   tree: true, width: 250},
        {name: "start_date", label: "시작일",     align: "center", width: 100},
        {name: "end_date",   label: "종료일",     align: "center", width: 100},
        {name: "manager",    label: "담당자",     align: "center", width: 100}
    ];
    gantt.config.readonly = true;

    gantt.init("gantt_here");

    const projectId = "${currentProjectId}";
    fetch('${pageContext.request.contextPath}/project/main/project/api/' + projectId + '/tasks/all')
        .then(response => response.json())
        .then(taskList => {
            const formattedTasks = taskList.map(task => {
                return {
                    id: task.taskId,
                    text: task.taskTitle,
                    start_date: new Date(task.taskStartDate),
                    end_date: new Date(task.taskEndDate),
                    manager: task.taskManagerId
                };
            });
            gantt.parse({ data: formattedTasks });
        })
        .catch(error => {
            console.error('Error fetching task data for Gantt:', error);
            alert('간트 차트 데이터를 불러오는 중 오류가 발생했습니다.');
        });
</script>
</body>
</html>