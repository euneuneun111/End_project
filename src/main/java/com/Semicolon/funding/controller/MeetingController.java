package com.Semicolon.funding.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
}

