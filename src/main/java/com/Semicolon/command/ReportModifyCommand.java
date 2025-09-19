package com.Semicolon.command;

import java.text.ParseException;

import com.Semicolon.dto.ReportVO;

public class ReportModifyCommand extends ReportRegistCommand {

	
	private int rno;
	
	private int[] deleteFile;

	public int getRno() {
		return rno;
	}

	public void setRno(int rno) {
		this.rno = rno;
	}

	public int[] getDeleteFile() {
		return deleteFile;
	}

	public void setDeleteFile(int[] deleteFile) {
		this.deleteFile = deleteFile;
	}
	
	@Override
	public ReportVO toReportVO() throws ParseException{
		ReportVO report = super.toReportVO();
		report.setRno(this.rno);
		
		return report;
	}
	
	
}
