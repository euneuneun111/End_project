package com.Semicolon.pms.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller; // ✅ import 변경
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.Semicolon.cmnt.dto.MemberVO;
import com.Semicolon.pms.dto.CalendarDto;
import com.Semicolon.pms.service.CalendarService;

// ✅ @RestController 대신 @Controller를 사용합니다.
@Controller
@RequestMapping("/main/{projectId}/calendar")
public class CalendarController {

    private CalendarService calendarService;

    public CalendarController(CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    @GetMapping
    public ModelAndView calendarPage(@PathVariable("projectId") String projectId) {
        ModelAndView mv = new ModelAndView("organization/pms/calendar/calendar");
        mv.addObject("projectId", projectId); // 뷰에서 사용 가능
        return mv;
    }
    
    @GetMapping("/all")
    @ResponseBody 
    public List<Map<String, Object>> getAllCalendarsForFullCalendar(@PathVariable("projectId") String projectId) {
        try {
            List<CalendarDto> calendars = calendarService.getAllCalendars(projectId);
            
            List<Map<String, Object>> events = new ArrayList<>();
            for (CalendarDto c : calendars) {
                Map<String, Object> event = new HashMap<>();
                event.put("id", c.getCalendarId());
                event.put("title", c.getCalendarTitle());
                event.put("start", c.getCalendarStartDate());
                event.put("end", c.getCalendarEndDate());
                event.put("calendarContent", c.getCalendarContent());
                event.put("allDay", true);
                
                events.add(event);
            }
            return events;
        } catch (SQLException e) {
            return Collections.emptyList();
        }
    }

    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<Map<String, String>> addCalendar(
            @PathVariable("projectId") String projectId,
            @RequestBody CalendarDto calendarDto, 
            HttpSession session) {

        MemberVO loginUser = (MemberVO) session.getAttribute("loginUser");
        if (loginUser == null) {
            return new ResponseEntity<>(
                Collections.singletonMap("message", "로그인이 필요합니다."),
                HttpStatus.UNAUTHORIZED
            );
        }

        try {
            calendarDto.setProjectId(projectId); // 하드코딩 제거
            calendarService.addCalendar(calendarDto);
            return ResponseEntity.ok(Collections.singletonMap("message", "일정이 성공적으로 추가되었습니다."));
        } catch (SQLException e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("message", "일정 추가 중 오류가 발생했습니다."));
        }
    }
    
    @GetMapping("/{calendarId}")
    @ResponseBody
    public ResponseEntity<CalendarDto> getCalendar(
            @PathVariable("projectId") String projectId,
            @PathVariable("calendarId") String calendarId) {
        try {
            CalendarDto calendar = calendarService.getCalendarById(projectId, calendarId);
            if (calendar != null) {
                return ResponseEntity.ok(calendar);
            } else {
                return ResponseEntity.status(404).body(null);
            }
        } catch (SQLException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/update")
    @ResponseBody
    public ResponseEntity<Map<String, String>> updateCalendar(
            @PathVariable("projectId") String projectId,
            @RequestBody CalendarDto calendarDto) {
        try {
            calendarDto.setProjectId(projectId); // 하드코딩 제거
            calendarService.updateCalendar(calendarDto);
            return ResponseEntity.ok(Collections.singletonMap("message", "일정이 성공적으로 수정되었습니다."));
        } catch (SQLException e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("message", "일정 수정 중 오류가 발생했습니다."));
        }
    }

    @DeleteMapping("/{calendarId}")
    @ResponseBody
    public ResponseEntity<Map<String, String>> deleteCalendar(
            @PathVariable("projectId") String projectId,
            @PathVariable("calendarId") String calendarId) {
        try {
            calendarService.deleteCalendar(projectId,calendarId);
            return ResponseEntity.ok(Collections.singletonMap("message", "일정이 성공적으로 삭제되었습니다."));
        } catch (SQLException e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("message", "일정 삭제 중 오류가 발생했습니다."));
        }
    }
    
    
    @GetMapping("/api/all")
    @ResponseBody
    public ResponseEntity<List<Map<String, Object>>> getAllCalendarsApi(@PathVariable("projectId") String projectId) {
        try {
            List<CalendarDto> calendars = calendarService.getAllCalendars(projectId);

            List<Map<String, Object>> events = new ArrayList<>();
            for (CalendarDto c : calendars) {
                Map<String, Object> event = new HashMap<>();
                event.put("id", c.getCalendarId());
                event.put("title", c.getCalendarTitle());
                event.put("start", c.getCalendarStartDate());
                event.put("end", c.getCalendarEndDate());
                event.put("calendarContent", c.getCalendarContent());
                event.put("allDay", true);

                events.add(event);
            }

            return ResponseEntity.ok(events);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
}
