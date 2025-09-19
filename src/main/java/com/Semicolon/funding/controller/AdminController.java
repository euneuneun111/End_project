package com.Semicolon.funding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.Semicolon.command.PageMaker;
import com.Semicolon.dto.AdminReportVO;
import com.Semicolon.service.AdminReportService;
import com.Semicolon.service.FundingService;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private AdminReportService adminreportService;
	
	@Autowired
	private FundingService fundingService; // 푸쉬 테스트
	
	/*
	@GetMapping("/list")
	public ModelAndView list(@ModelAttribute PageMaker pageMaker, ModelAndView mnv) throws Exception {
		String url = "/funding/list";
		List<FundingVO> fundingList = fundingService.searchList(pageMaker);
		mnv.addObject("fundingList", fundingList);
		mnv.setViewName(url);
		return mnv;
	}
	*/
	
	
	@GetMapping("/list")
	public ModelAndView list(@ModelAttribute PageMaker pageMaker, ModelAndView mnv) throws Exception {
		String url = "/admin/list";		
		List<AdminReportVO> adminreportList = adminreportService.list(pageMaker);
		mnv.addObject("adminreportList", adminreportList);
		mnv.setViewName(url);
		return mnv;
	}

	/*
	@GetMapping("/remove")
	public ModelAndView remove(int fno, ModelAndView mnv) throws Exception {
		String url = "/funding/remove_success";

		// 첨부파일 삭제
		List<AttachVO> attachList = fundingService.getFunding(fno).getAttachList();
		if (attachList != null) {
			for (AttachVO attach : attachList) {
				File target = new File(attach.getUploadPath(), attach.getFileName());
				if (target.exists()) {
					target.delete();
				}
			}
		}

		// DB 삭제
		fundingService.remove(fno);

		mnv.setViewName(url);
		return mnv;
	}
	*/
	
	 @GetMapping("/detail")
		public ModelAndView detail(int id, ModelAndView mnv) throws Exception {
			String url = "/admin/detail";

			AdminReportVO admin = adminreportService.getAdminReportById(id);

			mnv.addObject("admin", admin);
			mnv.setViewName(url);
			return mnv;
	    }

	    @GetMapping("/remove")
		public String remove(int id)throws Exception{
			String url="/admin/remove_success";		
			
			adminreportService.removeAdminReport(id);
			
			return url;
		}
	
	
}
