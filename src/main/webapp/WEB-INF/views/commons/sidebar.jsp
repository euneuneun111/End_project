<%-- sidebar.jsp --%>
<div class="sidebar-container">
	<ul class="sidebar-menu">
		<li><a id="task-link" href="#"><i class="fas fa-tasks"></i>
				TASK</a></li>
		<li><a id="issue-link" href="#"><i class="fas fa-bug"></i>
				ISSUE</a></li>
		<li><a id="gantt-link" href="#"><i class="fas fa-chart-bar"></i>
				GANTT</a></li>
		<li><a id="calendar-link" href="#"><i
				class="fas fa-calendar-alt"></i> CALENDAR</a></li>
		<li><a id="meeting-link" href="#"><i class="fas fa-handshake"></i>
				MEETING</a></li>
		<li><a id="report-link" href="#"><i class="fas fa-file-alt"></i>
				REPORT</a></li>
	</ul>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const pathParts = window.location.pathname.split('/');

    // URL 패턴: /{contextPath}/main/project/{projectId}/...
    let projectIdIndex = pathParts.indexOf('project') + 1;
    let projectId = pathParts[projectIdIndex] || ''; // 없으면 빈 문자열

    // 링크 동적 적용
	document.getElementById('task-link').href = `<%=request.getContextPath()%>/main/project/${projectId}/tasklist`;
	document.getElementById('issue-link').href = `<%=request.getContextPath()%>/main/project/${projectId}/issuelist`;
	document.getElementById('gantt-link').href = `<%=request.getContextPath()%>/main/${projectId}/gantt`;
	document.getElementById('calendar-link').href = `<%=request.getContextPath()%>/main/${projectId}/calendar`;
	document.getElementById('meeting-link').href = `<%=request.getContextPath()%>/organization/${projectId}/meeting/list`;
	document.getElementById('report-link').href = `<%=request.getContextPath()%>/organization/${projectId}/report/list`;

    // 현재 URL 기반으로 active 클래스 설정
    const sidebarItems = document.querySelectorAll('.sidebar-menu li');
    sidebarItems.forEach(item => {
        const link = item.querySelector('a');
        if (!link) return;
        const href = link.getAttribute('href');
        if (!href) return;

        if (window.location.pathname.startsWith(href)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});
</script>
