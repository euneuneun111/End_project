<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<style>
.pagination .page-item.active .page-link {
    background-color: #9B99FF;
    color: #fff;
    border-color: #9B99FF;
}

.pagination .page-link {
    color: #9B99FF;
}

.pagination .page-link:hover {
    background-color: #e9ecef;
    color: #0056b3;
}
</style>

<!-- 페이지네이션 네비게이션 -->
<nav aria-label="Navigation">
    <ul class="pagination justify-content-center m-0">
        <li class="page-item">
            <a class="page-link" href="javascript:search_list(1);" style="border-radius: 50px; margin: 5px;">
                <i class="fas fa-angle-double-left"></i>
            </a>
        </li>
        <li class="page-item">
            <a class="page-link" href="javascript:search_list(${pageMaker.prev ? pageMaker.startPage - 1 : pageMaker.page});" style="border-radius: 50px; margin: 5px;">
                <i class="fas fa-angle-left"></i>
            </a>
        </li>

        <c:forEach var="pageNum" begin="${pageMaker.startPage}" end="${pageMaker.endPage}">
            <li class="page-item ${pageMaker.page == pageNum ? 'active' : ''}">
                <a class="page-link" href="javascript:search_list(${pageNum});" style="border-radius: 50px; margin: 5px;">
                    ${pageNum}
                </a>
            </li>
        </c:forEach>

        <li class="page-item">
            <a class="page-link" href="javascript:search_list(${pageMaker.next ? pageMaker.endPage + 1 : pageMaker.page});" style="border-radius: 50px; margin: 5px; ">
                <i class="fas fa-angle-right"></i>
            </a>
        </li>
        <li class="page-item">
            <a class="page-link" href="javascript:search_list(${pageMaker.realEndPage});" style="border-radius: 50px; margin: 5px;">
                <i class="fas fa-angle-double-right"></i>
            </a>
        </li>
    </ul>
</nav>

<form id="jobForm" style="display:none;">

<input type='text' name="page" value="1">
</form>

<script>
function search_list(page) {
    // 페이지 번호만 쿼리 스트링으로 전달하여 새로고침
	let form = document.querySelector("#jobForm");
    
    form.page.value = page;
    
    form.submit();
	
}
</script>


