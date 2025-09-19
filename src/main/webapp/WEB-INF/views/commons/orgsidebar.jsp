<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%-- String userOrgId = (String) session.getAttribute("userOrgId"); --%>
<%-- request.setAttribute("userOrgId", userOrgId); --%>

<div class="sidebar-container">
	<ul class="sidebar-menu">
		<li><a href="${pageContext.request.contextPath}/org/main"> <i
				class="fas fa-home"></i> MAIN
		</a></li>
		<li><a href="${pageContext.request.contextPath}/org/explore">
				<i class="fas fa-search"></i> EXPLORE ORGS
		</a></li>
		<li><a href="${pageContext.request.contextPath}/org/my-org">
				<i class="fas fa-building"></i> MY ORG
		</a></li>
		<li><a
			href="${pageContext.request.contextPath}/org/myproject/list"> <i
				class="fas fa-project-diagram"></i> MY PROJECT
		</a></li>
		<li><a href="${pageContext.request.contextPath}/org/members">
				<i class="fas fa-users"></i> MEMBERS
		</a></li>

		<c:if test="${empty userOrgId}">
			<li><a href="${pageContext.request.contextPath}/org/create">
					<i class="fas fa-plus-circle"></i> CREATE ORG
			</a></li>
		</c:if>
	</ul>
</div>

<script>
	document.addEventListener('DOMContentLoaded', function() {
		var currentPath = window.location.pathname;
		var sidebarLinks = document.querySelectorAll('.sidebar-menu li');

		sidebarLinks.forEach(function(li) {
			var link = li.querySelector('a');
			if (link && link.getAttribute('href')) {
				var href = link.getAttribute('href');
				var isActive = false;

				if (href.includes('/org/my-org')) {
					if (currentPath.includes('/org/my-org')
							|| currentPath.includes('/org/detail')) {
						isActive = true;
					}
				} else if (href.includes('/org/members')) {
					if (currentPath.includes('/org/members')) {
						isActive = true;
					}
				} else {
					if (currentPath.endsWith(href)) {
						isActive = true;
					}
				}

				if (isActive) {
					li.classList.add('active');
				} else {
					li.classList.remove('active');
				}
			}
		});
	});
</script>