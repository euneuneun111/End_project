// src/main/java/com/Semicolon/org/controller/OrgDetailController.java
package com.Semicolon.org.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Semicolon.cmnt.dto.MemberVO;
import com.Semicolon.org.dto.OrgDetailDTO;
import com.Semicolon.org.service.OrgDetailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/org")
public class OrgDetailController {

    private OrgDetailService orgDetailService;
    
    // 생성자 주입
    public OrgDetailController(OrgDetailService orgDetailService) {
        this.orgDetailService = orgDetailService;
    }

    // "나의 조직" 메뉴 클릭 시 처리
    @GetMapping("/my-org")
    public String getMyOrg(HttpSession session, RedirectAttributes rttr) {
        MemberVO loginUser = (MemberVO) session.getAttribute("loginUser");
        if (loginUser == null) return "redirect:/login";

        String orId = orgDetailService.getOrgIdByUserId(loginUser.getUser_id());
        
        if (orId == null) {
            rttr.addFlashAttribute("msg", "소속된 조직이 없습니다. 조직을 생성해주세요.");
            return "redirect:/org/create";
        }
        return "redirect:/org/detail/" + orId;
    }

    // 조직 상세 페이지 (RESTful URL)
    @GetMapping("/detail/{orId}")
    public String orgDetail(@PathVariable("orId") String orId, HttpSession session, Model model, RedirectAttributes rttr) {
        MemberVO loginUser = (MemberVO) session.getAttribute("loginUser");
        if (loginUser == null) return "redirect:/login";

        OrgDetailDTO org = orgDetailService.getOrgDetailForUser(orId, loginUser.getUser_id());
        
        if (org == null) {
            rttr.addFlashAttribute("msg", "해당 조직에 접근할 권한이 없습니다.");
            return "redirect:/org/main"; // 혹은 접근 거부 페이지
        }
        
        model.addAttribute("org", org);
        model.addAttribute("loginUser", loginUser); // JSP에서 관리자 여부 확인을 위해 추가
        return "organization/orgDetail";
    }

    // 조직 정보 업데이트
    @PostMapping("/update")
    @ResponseBody
    public ResponseEntity<Map<String, String>> updateOrg(@RequestBody OrgDetailDTO org, HttpSession session) {
        Map<String, String> response = new HashMap<>();
        MemberVO loginUser = (MemberVO) session.getAttribute("loginUser");
        if (loginUser == null) {
            response.put("status", "error");
            response.put("message", "로그인이 필요합니다.");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        
        try {
            orgDetailService.modifyOrg(org, loginUser.getUser_id());
            response.put("status", "success");
            response.put("message", "조직 정보가 성공적으로 업데이트되었습니다.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", e.getMessage()); // 서비스에서 던진 예외 메시지를 그대로 사용
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
    }

    // 조직 삭제
    @PostMapping("/delete")
    @ResponseBody
    public ResponseEntity<Map<String, String>> deleteOrg(@RequestBody Map<String, String> payload, HttpSession session) {
        Map<String, String> response = new HashMap<>();
        MemberVO loginUser = (MemberVO) session.getAttribute("loginUser");
        if (loginUser == null) {
            response.put("status", "error");
            response.put("message", "로그인이 필요합니다.");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        try {
            String orId = payload.get("orId");
            orgDetailService.removeOrg(orId, loginUser.getUser_id());
            response.put("status", "success");
            response.put("message", "조직이 삭제되었습니다.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
    }
}