// src/main/java/com/Semicolon/org/controller/CreateOrgController.java
package com.Semicolon.org.controller;

import javax.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes; // RedirectAttributes 추가
import com.Semicolon.org.dto.CreateOrgDTO;
import com.Semicolon.org.service.CreateOrgService;
import com.Semicolon.cmnt.dto.MemberVO;

@Controller
@RequestMapping("/org")
public class CreateOrgController {

    private CreateOrgService createOrgService;

    public CreateOrgController(CreateOrgService createOrgService) {
        this.createOrgService = createOrgService;
    }
    
    @GetMapping("/create")
    public String showCreateOrgPage() {
        return "organization/createOrg";
    }

    @PostMapping("/create")
    public String createOrganization(CreateOrgDTO org, HttpSession session, RedirectAttributes rttr) { // RedirectAttributes 추가
        
        MemberVO loginUser = (MemberVO) session.getAttribute("loginUser");

        if (loginUser == null) {
            rttr.addFlashAttribute("msg", "로그인이 필요합니다.");
            return "redirect:/login";
        }

        org.setOrManagerId(loginUser.getUser_id());
        
        try {
            createOrgService.createOrganization(org);
            // 성공 시, 생성된 조직 상세 페이지로 이동하며 성공 메시지 전달
            rttr.addFlashAttribute("msg", "조직이 성공적으로 생성되었습니다.");
            return "redirect:/org/main"; // 생성 후 조직 메인으로 이동 (상세페이지는 아직 없으므로)
        } catch (Exception e) {
            // 실패 시 (주로 중복 소속), 다시 생성 페이지로 돌아가며 실패 메시지 전달
            rttr.addFlashAttribute("msg", e.getMessage());
            return "redirect:/org/create";
        }
    }
}