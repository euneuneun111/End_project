<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>팀원 목록</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/common.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/member.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

<style>
.Mbutton {
	height: 38px;
	background-color: #6A3CD7;
	color: #ffffff;
	border: none;
	border-radius: 5px;
	padding: 10px 15px;
	font-size: 14px;
	font-weight: bold;
	cursor: pointer;
	display: flex align-items: center;
	transition: background-color 0.2s;
}
</style>

</head>
<body>
	<%@ include file="/WEB-INF/views/module/header.jsp"%>
	<div class="main-layout-container">
		<jsp:include page="/WEB-INF/views/commons/orgsidebar.jsp" />

		<div class="main-content">
			<div class="member-list-container">
				<div class="member-list-header">
					<h2>팀원 목록</h2>
				</div>

				<div class="search-filter-bar">
					<input type="text" id="keyword" placeholder="팀원 검색..."> <select
						id="role">
						<option value="">역할 전체</option>
						<option value="PM">PM</option>
						<option value="DEVELOPER">개발자</option>
						<option value="DESIGNER">디자이너</option>
					</select> <select id="status">
						<option value="">상태 전체</option>
						<option value="active">활동중</option>
						<option value="away">휴식</option>
					</select>
					<button type="button" class="Mbutton" onclick="performSearch()">검색</button>
				</div>

				<table class="member-list-table">
					<thead>
						<tr>
							<th>아이디</th>
							<th>닉네임</th>
							<th>역할</th>
							<th>전공</th>
							<th>상태</th>
							<th>관리</th>
						</tr>
					</thead>
					<tbody>
						<%-- 서버에서 가져온 실제 데이터 (정상 동작하도록 JSTL 오류 수정) --%>
						<c:forEach var="member" items="${memberList}">
							<tr>
								<td>${member.userId}</td>
								<td>${member.name}</td>
								<td>${member.memberRole}</td>
								<td>${member.major}</td>
								<td><span class="status-badge status-active">활동중</span></td>
								<td class="member-actions"><select
									data-user-id="${member.userId}"
									onchange="changeMemberRole(this)">
										<option value="" disabled selected>역할 변경</option>
										<option value="PM">PM</option>
										<option value="DEVELOPER">개발자</option>
										<option value="DESIGNER">디자이너</option>
								</select> <c:if test="${loginUser.user_id != member.userId}">
										<button data-user-id="${member.userId}"
											onclick="kickMember(this)">추방</button>
									</c:if></td>
							</tr>
						</c:forEach>

						<%-- 화면 표시용 더미 데이터 추가 --%>
						<tr>
							<td>dev_master</td>
							<td>김개발</td>
							<td>DEVELOPER</td>
							<td>컴퓨터공학</td>
							<td><span class="status-badge status-away">휴식</span></td>
							<td class="member-actions"><select data-user-id="dev_master"
								onchange="changeMemberRole(this)">
									<option value="" disabled selected>역할 변경</option>
									<option value="PM">PM</option>
									<option value="DEVELOPER" selected>개발자</option>
									<option value="DESIGNER">디자이너</option>
							</select>
								<button data-user-id="dev_master" onclick="kickMember(this)">추방</button>
							</td>
						</tr>
						<tr>
							<td>design_lee</td>
							<td>이디자인</td>
							<td>DESIGNER</td>
							<td>시각디자인</td>
							<td><span class="status-badge status-away">휴식</span></td>
							<td class="member-actions"><select data-user-id="design_lee"
								onchange="changeMemberRole(this)">
									<option value="" disabled selected>역할 변경</option>
									<option value="PM">PM</option>
									<option value="DEVELOPER">개발자</option>
									<option value="DESIGNER" selected>디자이너</option>
							</select>
								<button data-user-id="design_lee" onclick="kickMember(this)">추방</button>
							</td>
						</tr>
						<tr>
							<td>manager_park</td>
							<td>박기획</td>
							<td>PM</td>
							<td>경영학</td>
							<td><span class="status-badge status-away">휴식</span></td>
							<td class="member-actions"><select
								data-user-id="manager_park" onchange="changeMemberRole(this)">
									<option value="" disabled selected>역할 변경</option>
									<option value="PM" selected>PM</option>
									<option value="DEVELOPER">개발자</option>
									<option value="DESIGNER">디자이너</option>
							</select>
								<button data-user-id="manager_park" onclick="kickMember(this)">추방</button>
							</td>
						</tr>
						<tr>
							<td>dev_choi</td>
							<td>최서버</td>
							<td>DEVELOPER</td>
							<td>소프트웨어공학</td>
							<td><span class="status-badge status-away">휴식</span></td>
							<td class="member-actions"><select data-user-id="dev_choi"
								onchange="changeMemberRole(this)">
									<option value="" disabled>역할 변경</option>
									<option value="PM">PM</option>
									<option value="DEVELOPER" selected>개발자</option>
									<option value="DESIGNER">디자이너</option>
							</select>
								<button data-user-id="dev_choi" onclick="kickMember(this)">추방</button>
							</td>
						</tr>
						<tr>
							<td>pm_jung</td>
							<td>정기획</td>
							<td>DEVELOPER</td>
							<td>산업공학</td>
							<td><span class="status-badge status-away">휴식</span></td>
							<td class="member-actions"><select data-user-id="pm_jung"
								onchange="changeMemberRole(this)">
									<option value="" disabled>역할 변경</option>
									<option value="PM" >PM</option>
									<option value="DEVELOPER" selected>개발자</option>
									<option value="DESIGNER">디자이너</option>
							</select>
								<button data-user-id="pm_jung" onclick="kickMember(this)">추방</button>
							</td>
						</tr>
						<tr>
							<td>design_kang</td>
							<td>강미술</td>
							<td>DESIGNER</td>
							<td>UX디자인</td>
							<td><span class="status-badge status-away">휴식</span></td>
							<td class="member-actions"><select
								data-user-id="design_kang" onchange="changeMemberRole(this)">
									<option value="" disabled>역할 변경</option>
									<option value="PM">PM</option>
									<option value="DEVELOPER">개발자</option>
									<option value="DESIGNER" selected>디자이너</option>
							</select>
								<button data-user-id="design_kang" onclick="kickMember(this)">추방</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<%@ include file="/WEB-INF/views/module/footer.jsp"%>
	<script>
        // JavaScript 부분은 이전과 동일하게 유지 (오류 없음)
        function performSearch() {
            const keyword = document.getElementById('keyword').value.toLowerCase();
            const role = document.getElementById('role').value;
            const status = document.getElementById('status').value;
            const tableRows = document.querySelectorAll('.member-list-table tbody tr');
            tableRows.forEach(row => {
                const userId = row.cells[0].textContent.toLowerCase();
                const nickname = row.cells[1].textContent.toLowerCase();
                const memberRole = row.cells[2].textContent;
                const memberStatusText = row.cells[4].textContent.trim();
                const keywordMatch = keyword === '' || userId.includes(keyword) || nickname.includes(keyword);
                const roleMatch = role === '' || memberRole === role;
                let statusMatch = true;
                if (status === 'active' && memberStatusText !== '활동중') {
                    statusMatch = false;
                } else if (status === 'away' && memberStatusText !== '휴식') {
                    statusMatch = false;
                }
                if (keywordMatch && roleMatch && statusMatch) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
        function changeMemberRole(selectElement) {
            const newRole = selectElement.value;
            if (confirm('역할을 변경하시겠습니까?')) {
                alert('역할이 변경되었습니다.');
                const roleCell = selectElement.closest('tr').cells[2];
                roleCell.textContent = newRole;
            } else {
                selectElement.selectedIndex = 0;
            }
        }
        function kickMember(buttonElement) {
            if (confirm('해당 팀원을 추방하시겠습니까?')) {
                alert('팀원이 추방되었습니다.');
                const rowToRemove = buttonElement.closest('tr');
                rowToRemove.remove();
            }
        }
    </script>
</body>
</html>