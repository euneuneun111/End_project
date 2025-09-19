package com.Semicolon.command;

import java.text.ParseException;

import org.springframework.web.multipart.MultipartFile;

import com.Semicolon.dto.FundingVO;

public class FundingModifyCommand extends FundingRegistCommand{

	private int fno;
	private int[] deleteFile;
	private MultipartFile picture; // 사진파일 경로/파일명
	
	public MultipartFile getPicture() {
		return picture;
	}

	public void setPicture(MultipartFile picture) {
		this.picture = picture;
	}

	public int getFno() {
		return fno;
	}

	public void setFno(int fno) {
		this.fno = fno;
	}

	public int[] getDeleteFile() {
		return deleteFile;
	}

	public void setDeleteFile(int[] deleteFile) {
		this.deleteFile = deleteFile;
	}

	@Override
	public FundingVO toFundingVO() throws ParseException {
		FundingVO funding = super.toFundingVO();
		funding.setFno(this.fno);

		return funding;
	}
}
