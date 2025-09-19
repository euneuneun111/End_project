package com.Semicolon.commons.controller;

import java.sql.SQLException;
import java.util.Map;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller; // ✅ 1. @RestController에서 @Controller로 변경
import org.springframework.web.bind.annotation.*;

import com.Semicolon.cmnt.dto.MemberVO;
import com.Semicolon.cmnt.service.MemberService;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@Controller // ✅ @RestController에서 @Controller로 변경
@RequestMapping("/commons")
public class CommonsController {

    private final MemberService memberService;

    @Autowired
    public CommonsController(MemberService memberService) {
        this.memberService = memberService;
    }

    // ✅ 3. 웹 페이지의 로그인 화면 요청을 처리할 GET 메소드 추가
    @GetMapping("/login")
    public String loginPage() {
        // "WEB-INF/views/member/login.jsp" 와 같은 실제 로그인 JSP 파일 경로를 반환합니다.
        // 경로는 실제 프로젝트에 맞게 수정해주세요.
        return "commons/loginForm"; 
    }

    // ✅ 2. React의 데이터 요청(POST)을 처리하는 API 메소드에는 @ResponseBody 추가
    @PostMapping("/login")
    @ResponseBody 
    public Map<String, Object> login(@RequestParam("user_id") String userId,
                                     @RequestParam("user_pwd") String userPwd,
                                     HttpSession session) throws SQLException {
        MemberVO member = memberService.getMember(userId);
        if (member != null && userPwd.equals(member.getUser_pwd())) {
            session.setAttribute("loginUser", member);
            return Map.of("success", true, "message", "로그인 성공");
        } else {
            return Map.of("success", false, "message", "아이디 또는 비밀번호 오류");
        }
    }

    @PostMapping("/logout")
    @ResponseBody // ✅ @ResponseBody 추가
    public Map<String, Object> logout(HttpSession session) {
        session.invalidate();
        return Map.of("success", true, "message", "로그아웃 완료");
    }

    @GetMapping("/check-session")
    @ResponseBody // ✅ @ResponseBody 추가
    public Map<String, Object> checkSession(HttpSession session) {
    	MemberVO user = (MemberVO) session.getAttribute("loginUser");
        if (user != null) {
        	user.setUser_pwd(null);
            return Map.of(
            		"authenticated", true,
            		"user", user
            	);
        } else {
            return Map.of("authenticated", false);
        }
    }
}