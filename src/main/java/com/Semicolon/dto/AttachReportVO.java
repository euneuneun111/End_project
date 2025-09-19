package com.Semicolon.dto;

public class AttachReportVO {

    private int arno;               // 고유번호
    private String uploadPath;     // 저장경로
    private String fileName;       // 파일명
    private String fileType;       // 파일형식
    private int rno;               // 자료실 글번호
    private String attacher;       // 등록자

    public int getArno() {
        return arno;
    }

    public void setArno(int arno) {
        this.arno = arno;
    }

    public String getUploadPath() {
        return uploadPath;
    }

    public void setUploadPath(String uploadPath) {
        this.uploadPath = uploadPath;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public int getRno() {
        return rno;
    }

    public void setRno(int rno) {
        this.rno = rno;
    }

    public String getAttacher() {
        return attacher;
    }

    public void setAttacher(String attacher) {
        this.attacher = attacher;
    }
}
