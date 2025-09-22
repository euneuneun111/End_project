package com.Semicolon.funding.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import com.Semicolon.command.ReportModifyCommand;
import com.Semicolon.command.ReportPageMaker;
import com.Semicolon.command.ReportRegistCommand;
import com.Semicolon.dao.AttachReportDAO;
import com.Semicolon.dto.AttachReportVO;
import com.Semicolon.dto.ReportVO;
import com.Semicolon.service.ReportService;
import com.josephoconnell.html.HTMLInputFilter;

@Controller
@RequestMapping("/organization/{projectId}/report")
public class ReportController {
	
	


    @Autowired
    private ReportService reportService;

    @Autowired
    private AttachReportDAO attachreportDAO;

    @javax.annotation.Resource(name = "reportSavedFilePath")
    private String fileUploadPath;

    // -------------------------------
    // 파일 저장
    // -------------------------------
    private List<AttachReportVO> saveFileToAttaches(List<MultipartFile> multiFiles, String savePath) throws Exception {
        if (multiFiles == null || multiFiles.isEmpty())
            return null;

        File dir = new File(savePath);
        if (!dir.exists()) dir.mkdirs();

        List<AttachReportVO> attachreportList = new ArrayList<>();
        for (MultipartFile multi : multiFiles) {
            if (multi.isEmpty()) continue;

            String uuid = UUID.randomUUID().toString().replace("-", "");
            String fileName = uuid + "$$" + multi.getOriginalFilename();

            File target = new File(dir, fileName);
            multi.transferTo(target);

            AttachReportVO attach = new AttachReportVO();
            attach.setUploadPath(savePath);
            attach.setFileName(fileName);
            attach.setFileType(fileName.substring(fileName.lastIndexOf('.') + 1).toUpperCase());

            attachreportList.add(attach);
        }

        return attachreportList;
    }

    // -------------------------------
    // HTML 페이지
    // -------------------------------

    // 리스트 페이지
    @GetMapping("/list")
    public String list(@PathVariable("projectId") String projectId,
                       @ModelAttribute ReportPageMaker reportpage, Model model) throws Exception {
    	    	
        List<ReportVO> reportList = reportService.reportList(projectId, reportpage);

        model.addAttribute("reportList", reportList);
        model.addAttribute("pageMaker", reportpage);
        model.addAttribute("projectId", projectId);
        System.out.println("projectId = " + projectId);

        return "organization/report/list";
    }

    // 등록 폼
    @GetMapping("/regist")
    public String registForm(@PathVariable("projectId") String projectId, Model model) throws SQLException {
        model.addAttribute("projectId", projectId);
        return "/organization/report/regist";
    }

    // 등록 처리
    @PostMapping(value = "/regist", produces = "text/plain;charset=utf-8")
    public String registPost(@PathVariable("projectId") String projectId,
                             ReportRegistCommand regCommand, Model model) throws Exception {
        String url = "/organization/report/regist_success";

        ReportVO report = regCommand.toReportVO();
        report.setTitle(HTMLInputFilter.htmlSpecialChars(report.getTitle()));
        report.setProjectId(projectId);

        List<AttachReportVO> attaches = saveFileToAttaches(regCommand.getUploadFile(), fileUploadPath);
        if (attaches != null) report.setAttaches(attaches);

        reportService.regist(report);

        return url;
    }

    // 상세 페이지
    @GetMapping("/detail")
    public String detail(@RequestParam("rno") int rno, Model model) throws Exception {
        ReportVO report = reportService.getRno(rno);
        model.addAttribute("report", report);
        return "/organization/report/detail";
    }

    // 파일 다운로드
    @GetMapping("/getFile")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@RequestParam("arno") int arno) throws Exception {
        AttachReportVO attachreport = attachreportDAO.selectAttachReportByArno(arno);
        String filePath = attachreport.getUploadPath() + File.separator + attachreport.getFileName();
        File file = new File(filePath);
        if (!file.exists()) throw new FileNotFoundException("파일이 존재하지 않습니다: " + filePath);

        Resource resource = new UrlResource(file.toURI());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + UriUtils.encode(attachreport.getFileName().split("\\$\\$")[1], "UTF-8") + "\"")
                .body(resource);
    }

    // 수정 폼
    @GetMapping("/modify")
    public String modifyForm(@RequestParam("rno") int rno, Model model) throws Exception {
        ReportVO report = reportService.getRno(rno);
        model.addAttribute("report", report);
        return "/organization/report/modify";
    }

    // 수정 처리
    @PostMapping("/modify")
    public String modify(@PathVariable("projectId") String projectId,
                         ReportModifyCommand modCommand, Model model) throws Exception {

        // 삭제 파일 처리
        if (modCommand.getDeleteFile() != null) {
            for (int arno : modCommand.getDeleteFile()) {
                AttachReportVO attachreport = attachreportDAO.selectAttachReportByArno(arno);
                File deleteFile = new File(attachreport.getUploadPath(), attachreport.getFileName());
                if (deleteFile.exists()) deleteFile.delete();
                attachreportDAO.deletAttach(arno);
            }
        }

        List<AttachReportVO> attachList = saveFileToAttaches(modCommand.getUploadFile(), fileUploadPath);
        if (attachList == null) attachList = new ArrayList<>();

        ReportVO report = modCommand.toReportVO();
        report.setAttaches(attachList);
        report.setTitle(HTMLInputFilter.htmlSpecialChars(report.getTitle()));
        report.setProjectId(projectId);

        reportService.modify(report);

        model.addAttribute("rno", report.getRno());
        return "/organization/report/modify_success";
    }

    // 삭제 처리
    @GetMapping("/remove")
    public String remove(@RequestParam("rno") int rno, Model model) throws Exception {
        ReportVO report = reportService.getRno(rno);
        List<AttachReportVO> attachList = report.getAttaches();
        if (attachList != null) {
            for (AttachReportVO attach : attachList) {
                File target = new File(attach.getUploadPath(), attach.getFileName());
                if (target.exists()) target.delete();
            }
        }

        reportService.remove(rno);
        return "/organization/report/remove_success";
    }

    // -------------------------------
    // REST API (/api/ prefix)
    // -------------------------------

    @GetMapping(value = "/api/list", produces = "application/json")
    @ResponseBody
    public List<ReportVO> listApi(@PathVariable("projectId") String projectId,
                                  @ModelAttribute ReportPageMaker reportpage) throws Exception {

        return reportService.reportList(projectId, reportpage);
    }

    @PostMapping(value = "/api/regist", produces = "application/json")
    @ResponseBody
    public String registApi(@PathVariable("projectId") String projectId,
                            @RequestParam(value = "uploadFile", required = false) List<MultipartFile> uploadFile,
                            @RequestParam("title") String title) throws Exception {
        ReportVO report = new ReportVO();
        report.setProjectId(projectId);
        report.setTitle(HTMLInputFilter.htmlSpecialChars(title));

        List<AttachReportVO> attaches = saveFileToAttaches(uploadFile, fileUploadPath);
        if (attaches != null) report.setAttaches(attaches);

        reportService.regist(report);
        return "success";
    }

    @GetMapping(value = "/api/detail", produces = "application/json")
    @ResponseBody
    public ReportVO detailApi(@RequestParam("rno") int rno) throws Exception {
        return reportService.getRno(rno);
    }

    @PostMapping(value = "/api/modify", produces = "application/json")
    @ResponseBody
    public String modifyApi(@PathVariable("projectId") String projectId,
                            @RequestParam(value = "uploadFile", required = false) List<MultipartFile> uploadFile,
                            @RequestParam("rno") int rno,
                            @RequestParam("title") String title,
                            @RequestParam(value = "deleteFile", required = false) int[] deleteFile) throws Exception {

        // 삭제 파일 처리
        if (deleteFile != null) {
            for (int arno : deleteFile) {
                AttachReportVO attachreport = attachreportDAO.selectAttachReportByArno(arno);
                File deleteFileObj = new File(attachreport.getUploadPath(), attachreport.getFileName());
                if (deleteFileObj.exists()) deleteFileObj.delete();
                attachreportDAO.deletAttach(arno);
            }
        }

        List<AttachReportVO> attachList = saveFileToAttaches(uploadFile, fileUploadPath);
        if (attachList == null) attachList = new ArrayList<>();

        ReportVO report = reportService.getRno(rno);
        report.setTitle(HTMLInputFilter.htmlSpecialChars(title));
        report.setProjectId(projectId);
        report.getAttaches().addAll(attachList);

        reportService.modify(report);
        return "success";
    }

    @PostMapping(value = "/api/remove", produces = "application/json")
    @ResponseBody
    public String removeApi(@RequestBody Map<String, Integer> param) throws Exception {
        Integer rno = param.get("rno");
        if (rno == null) return "fail";
        ReportVO report = reportService.getRno(rno);

        List<AttachReportVO> attachList = report.getAttaches();
        if (attachList != null) {
            for (AttachReportVO attach : attachList) {
                File target = new File(attach.getUploadPath(), attach.getFileName());
                if (target.exists()) target.delete();
            }
        }

        reportService.remove(rno);
        return "success";
    }
}
