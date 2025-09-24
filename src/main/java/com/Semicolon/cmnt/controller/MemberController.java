package com.Semicolon.cmnt.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.Semicolon.cmnt.command.MemberModifyCommand;
import com.Semicolon.cmnt.command.MemberRegistCommand;
import com.Semicolon.cmnt.dto.EngineerVO;
import com.Semicolon.cmnt.dto.MemberVO;
import com.Semicolon.cmnt.service.EngineerService;
import com.Semicolon.cmnt.service.MemberService;

@Controller
@RequestMapping("/member")
public class MemberController {
	
	
    private final MemberService service;
    private final EngineerService engineerService;

    @Autowired
    public MemberController(MemberService service, EngineerService engineerService) {
        this.service = service;
        this.engineerService = engineerService;
    }

    // ---------------- View 기반 ----------------
    @GetMapping("/main")
    public void main() {}

    @GetMapping("/regist")
    public void registForm() {}

    @GetMapping("/idCheck")
    @ResponseBody
    public String idCheck(String user_id) throws Exception {
        String result = "duplicated";
        MemberVO member = service.getMember(user_id);
        if (member == null) result = "";
        return result;
    }

    @PostMapping(value = "/regist", produces = "text/plain;charset=utf-8")
    public ModelAndView regist(MemberRegistCommand regCommand, ModelAndView mnv) {
        String url = "/member/regist_success";
        try {
            // DB 저장
            MemberVO member = regCommand.toMemberVO();
            service.regist(member);

            EngineerVO engineer = regCommand.toEngineerVO();
            engineerService.registerEngineer(engineer);

        } catch (Exception e) {
            url = "/error/500";
            e.printStackTrace();
        }
        mnv.setViewName(url);
        return mnv;
    }

    @GetMapping("/detail")
    public ModelAndView detail(String id, ModelAndView mnv) throws Exception {
        String url = "/member/detail";
        MemberVO member = service.getMember(id);
        mnv.addObject("member", member);
        mnv.setViewName(url);
        return mnv;
    }

    @GetMapping("/modify")
    public ModelAndView modifyForm(String id, ModelAndView mnv) throws Exception {
        String url = "/member/modify";
        MemberVO member = service.getMember(id);
        mnv.addObject("member", member);
        mnv.setViewName(url);
        return mnv;
    }

    @PostMapping(value = "/modify", produces = "text/plain;charset=utf-8")
    public ModelAndView modify(MemberModifyCommand modifyCommand, ModelAndView mnv) throws Exception {
        String url = "/member/modify_success";
        MemberVO member = modifyCommand.toMemberVO();
        service.modify(member);
        mnv.addObject("id", member.getUser_id());
        mnv.setViewName(url);
        return mnv;
    }

    @GetMapping(value = "/remove")
    public ModelAndView remove(String id, ModelAndView mnv) throws Exception {
        String url = "/member/remove_success";
        service.remove(id);
        mnv.setViewName(url);
        return mnv;
    }

    // ---------------- React API(JSON) ----------------

    /* 닉네임 중복 체크
    @ResponseBody
    @GetMapping("/api/members/checkName")
    public Map<String, Boolean> checkName(@RequestParam String name) throws Exception {
        boolean available = (service.getMember(name) == null);
        return Map.of("available", available);
    }
    */
    
    // 회원가입
    @ResponseBody
    @PostMapping("/api/members/signup")
    public Map<String, Object> signup(@RequestBody MemberVO member) {
        try {
            service.regist(member);

            EngineerVO engineer = new EngineerVO();
            engineer.setUser_id(member.getUser_id());
            engineerService.registerEngineer(engineer);

            return Map.of("success", true, "message", "회원가입 성공");
        } catch (Exception e) {
            return Map.of("success", false, "message", "회원가입 실패: " + e.getMessage());
        }
    }
    
 // JSON 반환 (React용)
 	@PostMapping(value = "/modifyApi", produces = "application/json;charset=utf-8")
     @ResponseBody
     public Map<String, Object> modifyApi(@RequestBody MemberModifyCommand modifyCommand, HttpSession session) {
         try {
             MemberVO member = modifyCommand.toMemberVO();
             service.modify(member); //DB수정
          // DB에서 최신 정보 다시 조회
             MemberVO updatedMember = service.getMember(member.getUser_id());

             // 세션에 최신 사용자 정보로 덮어쓰기
             session.setAttribute("loginUser", updatedMember);
             return Map.of("success", true, "message", "회원정보 수정 완료", "member", updatedMember);
         } catch (Exception e) {
             e.printStackTrace();
             return Map.of("success", false, "message", "회원정보 수정 실패");
         }
     }
 	
 	@GetMapping("/api/members/check-name")
 	public ResponseEntity<Map<String, Boolean>> checkNickname(@RequestParam String name) {
 	    Map<String, Boolean> response = new HashMap<>();
 	    try {
 	        boolean available = service.isNicknameAvailable(name);
 	        response.put("available", available);
 	    } catch (SQLException e) {
 	        e.printStackTrace();
 	        response.put("available", false);
 	    }
 	    return ResponseEntity.ok(response);
 	}
 	
 	 // ID 중복 체크
    @GetMapping("/api/members/check-id")
    public ResponseEntity<Map<String, Object>> checkId(@RequestParam("user_id") String userId) {
        Map<String, Object> result = new HashMap<>();
        try {
            boolean available = service.isIdAvailable(userId); // ID 사용 가능 여부 확인
            result.put("available", available);
        } catch (SQLException e) {
            e.printStackTrace();
            result.put("available", false);
            result.put("error", "서버 오류 발생");
        }
        return ResponseEntity.ok(result);
    }
    
    
    @PostMapping("/api/members/findpassword")
    @ResponseBody
    public Map<String, Object> findPassword(@RequestBody Map<String, String> request) throws SQLException {
        String id = request.get("id");
        String nickname = request.get("nickname");
        
        Map<String, Object> result = new HashMap<>();
        boolean exists = service.checkMemberByIdAndNickname(id, nickname);

        if (exists) {
            String tempPassword = service.resetPassword(id);
            result.put("success", true);
            result.put("message", "임시 비밀번호 발급됨");
            result.put("tempPassword", tempPassword);
        } else {
            result.put("success", false);
            result.put("message", "일치하는 회원 없음");
        }
        return result;
    }
    
}
