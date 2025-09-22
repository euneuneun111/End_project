package com.Semicolon.funding.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.Semicolon.command.MeetingModifyCommand;
import com.Semicolon.command.MeetingRegistCommand;
import com.Semicolon.command.PageMaker;
import com.Semicolon.dao.MeetingDAO;
import com.Semicolon.dto.MeetingVO;
import com.Semicolon.service.MeetingService;
import com.josephoconnell.html.HTMLInputFilter;

@Controller
@RequestMapping("/organization/{projectId}/meeting")
public class MeetingController {

	
    @Autowired
    private MeetingService meetingService;

    @Autowired
    private MeetingDAO meetingDAO;

    @GetMapping("/list")
    public ModelAndView meetingList(
            @PathVariable("projectId") String projectId,
            @ModelAttribute PageMaker pageMaker,
            ModelAndView mnv) throws SQLException {

        pageMaker.setProjectId(projectId); // ✅ 반드시 projectId 세팅

        List<MeetingVO> meetingList = meetingService.getMeetingListByProject(pageMaker);
        int totalCount = meetingService.getMeetingListCountByProject(pageMaker);

        mnv.addObject("meetingList", meetingList);
        mnv.addObject("totalCount", totalCount);
        mnv.addObject("pageMaker", pageMaker);
        mnv.addObject("projectId", projectId);
        mnv.setViewName("organization/meeting/list");

        return mnv;
    }

    // 회의 등록 폼
    @GetMapping("/regist")
    public String registForm(@PathVariable("projectId") String projectId, Model model) throws SQLException {
        model.addAttribute("projectId", projectId);
        List<String> projectManagers = meetingService.getProjectManagers(projectId); 

        model.addAttribute("projectManagers", projectManagers);
        
        return "/organization/meeting/regist";
    }

    @PostMapping("/regist")
    public String registPost(
            @PathVariable("projectId") String projectId,
            MeetingRegistCommand regCommand,
            Model model) throws Exception {

        String url = "/organization/meeting/regist_success";


        MeetingVO meeting = regCommand.toMeetingVO();
        meeting.setProjectId(projectId); // ✅ 여기에 반드시 세팅
        meeting.setTitle(HTMLInputFilter.htmlSpecialChars(meeting.getTitle()));

        meetingService.registMeeting(meeting);


        model.addAttribute("projectId", projectId);
        return url;
    }
    
    @GetMapping("/detail")
    public ModelAndView detail(
            @PathVariable("projectId") String projectId,
            int id,
            ModelAndView mnv) throws Exception {

        String url = "/organization/meeting/detail";

        MeetingVO meeting = meetingService.getMeetingById(id);

        mnv.addObject("meeting", meeting);
        mnv.addObject("projectId", projectId);
        mnv.setViewName(url);
        return mnv;
    }

    @GetMapping("/modify")
    public String modifyForm(@PathVariable("projectId") String projectId,
                             int id,
                             Model model) throws SQLException {

        MeetingVO meeting = meetingService.getMeetingById(id);
        List<String> projectManagers = meetingService.getProjectManagers(projectId);

        model.addAttribute("meeting", meeting);
        model.addAttribute("projectManagers", projectManagers);
        model.addAttribute("projectId", projectId);

        return "/organization/meeting/modify";
    }

    @PostMapping("/modify")
    public ModelAndView modifyPost(
            @PathVariable("projectId") String projectId,
            MeetingModifyCommand modifyCommand,
            ModelAndView mnv) throws Exception {

        String url = "/organization/meeting/modify_success";

        MeetingVO meeting = modifyCommand.toMeetingVO();
        meeting.setTitle(HTMLInputFilter.htmlSpecialChars(meeting.getTitle()));

        meetingService.modifyMeeting(meeting);

        mnv.addObject("id", meeting.getId());
        mnv.addObject("projectId", projectId);
        mnv.setViewName(url);

        return mnv;
    }

    @GetMapping("/remove")
    public String remove(
            @PathVariable("projectId") String projectId,
            int id,
            Model model) throws Exception {

        String url = "/organization/meeting/remove_success";
        meetingService.removeMeeting(id);

        model.addAttribute("projectId", projectId);
        return url;
    }
    
    @PostMapping("/updateApprovalStatus")
    public Map<String, Object> updateApprovalStatus(
            @PathVariable("projectId") String projectId,
            @RequestBody Map<String, Object> param) {
        Map<String, Object> result = new HashMap<>();
        try {
            int meetingId = (Integer) param.get("id");
            String newStatus = meetingService.toggleApprovalStatus(meetingId);

            result.put("success", true);
            result.put("newStatus", newStatus);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", false);
        }
        return result;
    }
    
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/api/meeting/list")
    @ResponseBody
    public Map<String, Object> getMeetingListApi(
            @PathVariable("projectId") String projectId,
            @ModelAttribute PageMaker pageMaker) throws SQLException {

        Map<String, Object> result = new HashMap<>();

        // projectId 세팅
        pageMaker.setProjectId(projectId);

        // 서비스에서 목록과 총 개수 가져오기
        List<MeetingVO> meetingList = meetingService.getMeetingListByProject(pageMaker);
        int totalCount = meetingService.getMeetingListCountByProject(pageMaker);

        result.put("meetingList", meetingList);
        result.put("totalCount", totalCount);
        result.put("pageMaker", pageMaker);
        result.put("projectId", projectId);

        return result;
    }

    
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/api/regist")
    @ResponseBody
    public Map<String, Object> registMeetingApi(
            @PathVariable("projectId") String projectId,
            @RequestBody MeetingRegistCommand regCommand) {

        Map<String, Object> result = new HashMap<>();

        try {
            // 커맨드 객체를 VO로 변환
            MeetingVO meeting = regCommand.toMeetingVO();

            // 필수 필드 세팅
            meeting.setProjectId(projectId);
            meeting.setTitle(HTMLInputFilter.htmlSpecialChars(meeting.getTitle()));

            // attend가 null일 수 있으므로 안전하게 처리
            if (meeting.getAttend() == null) {
                meeting.setAttend("");
            }

            // 회의 등록
            meetingService.registMeeting(meeting);

            result.put("success", true);
            result.put("message", "회의가 등록되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", false);
            result.put("message", "회의 등록 중 오류가 발생했습니다.");
        }

        return result;
    }
    
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/users")
    @ResponseBody
    public List<String> getProjectUsers(@PathVariable("projectId") String projectId) {
        // 예: 프로젝트 참여자 혹은 매니저 목록 가져오기
        try {
            // 서비스에서 프로젝트 내 사용자 이름 목록 조회
            List<String> users = meetingService.getProjectManagers(projectId);
            return users;
        } catch (Exception e) {
            e.printStackTrace();
            return List.of(); // 오류 시 빈 리스트 반환
        }
    }
    
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/api/meeting/{id}")
    @ResponseBody
    public MeetingVO getMeetingDetail(
            @PathVariable("projectId") String projectId,
            @PathVariable("id") int id) {
        try {
            // ID로 회의 상세 조회
            MeetingVO meeting = meetingService.getMeetingById(id);
            if (meeting != null) {
                // 필요하면 projectId 검증 가능
                return meeting;
            } else {
                // 없는 회의일 경우 빈 객체 반환 또는 예외 처리
                return new MeetingVO();
            }
        } catch (Exception e) {
            e.printStackTrace();
            // 오류 시 빈 객체 반환
            return new MeetingVO();
        }
    }
    
}

