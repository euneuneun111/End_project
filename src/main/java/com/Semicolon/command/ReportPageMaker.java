package com.Semicolon.command;

public class ReportPageMaker {

    private int page = 1; // 페이지 번호 (1부터 시작)
    private int perPageNum = 8; // 한 페이지당 보여줄 리스트 개수
    private int totalCount; // 전체 행 개수
    private int displayPageNum = 5; // 화면에 보여줄 페이지 번호 개수
    
    private String projectId; // 조회할 프로젝트 아이디

    private int startPage = 1; // 시작 페이지 번호
    private int endPage = 1; // 끝 페이지 번호
    private int realEndPage; // 실제 마지막 페이지 번호

    private boolean prev; // 이전 버튼 활성 여부
    private boolean next; // 다음 버튼 활성 여부

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        if (page <= 0) {
            this.page = 1;
        } else {
            this.page = page;
        }
    }
    

    public String getProjectId() {
		return projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

	public int getPerPageNum() {
        return perPageNum;
    }

    public void setPerPageNum(int perPageNum) {
        this.perPageNum = perPageNum;
    }

    // DB 쿼리에서 사용할 시작 행 번호 (0-based)
    public int getStartRow() {
        return (this.page - 1) * this.perPageNum;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
        calcData();
    }

    public int getStartPage() {
        return startPage;
    }

    public void setStartPage(int startPage) {
        this.startPage = startPage;
    }

    public int getEndPage() {
        return endPage;
    }

    public void setEndPage(int endPage) {
        this.endPage = endPage;
    }

    public int getRealEndPage() {
        return realEndPage;
    }

    public void setRealEndPage(int realEndPage) {
        this.realEndPage = realEndPage;
    }

    public boolean isPrev() {
        return prev;
    }

    public void setPrev(boolean prev) {
        this.prev = prev;
    }

    public boolean isNext() {
        return next;
    }

    public void setNext(boolean next) {
        this.next = next;
    }

    public int getDisplayPageNum() {
        return displayPageNum;
    }

    public void setDisplayPageNum(int displayPageNum) {
        this.displayPageNum = displayPageNum;
    }

    // startPage, endPage, prev, next 값을 계산하는 메서드
    private void calcData() {
        endPage = (int) (Math.ceil(page / (double) displayPageNum) * displayPageNum);
        startPage = (endPage - displayPageNum) + 1;

        realEndPage = (int) (Math.ceil(totalCount / (double) perPageNum));

        if (startPage <= 0) {
            startPage = 1;
        }

        if (endPage > realEndPage) {
            endPage = realEndPage;
        }

        prev = startPage == 1 ? false : true;
        next = endPage < realEndPage;
    }
}
