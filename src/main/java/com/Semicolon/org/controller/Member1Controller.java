package com.Semicolon.org.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes; // RedirectAttributes import

import com.Semicolon.cmnt.dto.MemberVO; // MemberVO import
import com.Semicolon.org.dto.Member1DTO;
import com.Semicolon.org.service.Member1Service;
import com.Semicolon.org.service.OrgDetailService; // OrgDetailService import

@Controller
@RequestMapping("/org")
public class Member1Controller {

    private final Member1Service member1Service;
    private final OrgDetailService orgDetailService; // 조직 ID 조회를 위해 추가

    public Member1Controller(Member1Service member1Service, OrgDetailService orgDetailService) {
        this.member1Service = member1Service;
        this.orgDetailService = orgDetailService;
    }

    @GetMapping("/members")
    public String showOrgMembers(@RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "role", required = false) String role,
            @RequestParam(value = "status", required = false) String status,
            HttpSession session, Model model, RedirectAttributes rttr) { 
        
        MemberVO loginUser = (MemberVO) session.getAttribute("loginUser");
        if (loginUser == null) {
            return "redirect:/login"; 
        }

        String orId = orgDetailService.getOrgIdByUserId(loginUser.getUser_id());

        if (orId == null) {
            rttr.addFlashAttribute("msg", "소속된 조직이 없습니다.");
            return "redirect:/org/create";
        }
        
        Map<String, Object> params = new HashMap<>();
        params.put("orId", orId);
        params.put("keyword", keyword);
        params.put("role", role);
        params.put("status", status);
        
        List<Member1DTO> memberList = member1Service.getMemberList(params);
        
        model.addAttribute("memberList", memberList);
        model.addAttribute("loginUser", loginUser);
        return "organization/member1"; // View 이름 확인 (member1.jsp)
    }

    // ... (updateRole, removeMember 메소드는 잠시 후 JSP와 함께 수정) ...
}