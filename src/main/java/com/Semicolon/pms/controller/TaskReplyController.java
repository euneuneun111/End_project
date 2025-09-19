// com.Semicolon.pms.controller.TaskReplyController.java

package com.Semicolon.pms.controller;

import com.Semicolon.pms.dto.TaskReplyDTO;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import com.Semicolon.pms.service.TaskReplyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task-replies") // Issue 댓글(/replies)과 경로가 겹치지 않도록 변경
public class TaskReplyController {

    private final TaskReplyService taskReplyService;

    // 생성자 주입
    public TaskReplyController(TaskReplyService taskReplyService) {
        this.taskReplyService = taskReplyService;
    }

    // 1. 특정 일감의 댓글 목록 조회
    @GetMapping("/{taskId}")
    public ResponseEntity<List<TaskReplyDTO>> list(@PathVariable("taskId") String taskId) {
        ResponseEntity<List<TaskReplyDTO>> entity;
        try {
            List<TaskReplyDTO> replies = taskReplyService.getReplyList(taskId);
            entity = new ResponseEntity<>(replies, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    // 2. 새 댓글 등록
    @PostMapping("")
    public ResponseEntity<String> register(@RequestBody TaskReplyDTO dto) {
        ResponseEntity<String> entity;
        try {
            // ▼▼▼▼▼ 수정된 부분 ▼▼▼▼▼
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String currentUserId = null;

            // 1. Principal 객체의 타입을 확인
            Object principal = authentication.getPrincipal();

            if (principal instanceof UserDetails) {
                // 2. UserDetails 타입일 경우, 원래 로직대로 username을 가져옴
                UserDetails userDetails = (UserDetails) principal;
                currentUserId = userDetails.getUsername();
            } else {
                // 3. String 타입일 경우(익명 사용자 등), 해당 문자열 값을 그대로 사용
                currentUserId = principal.toString();
            }

            // 4. DTO에 필수 값 설정
            // 'anonymousUser'와 같은 값이 DB에 저장되는 것을 원치 않는다면 추가적인 처리가 필요합니다.
            dto.setEngId(currentUserId);
            dto.setGroupId(currentUserId); 
            // ▲▲▲▲▲ 수정된 부분 ▲▲▲▲▲
            
            taskReplyService.registerReply(dto);
            entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    // 3. 댓글 수정
    @RequestMapping(value = "/{replyNumber}", method = {RequestMethod.PUT, RequestMethod.PATCH})
    public ResponseEntity<String> update(@PathVariable("replyNumber") String replyNumber, @RequestBody TaskReplyDTO dto) {
        ResponseEntity<String> entity;
        try {
            dto.setReplyNumber(replyNumber);
            taskReplyService.modifyReply(dto);
            entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    // 4. 댓글 삭제
    @DeleteMapping("/{replyNumber}")
    public ResponseEntity<String> remove(@PathVariable("replyNumber") String replyNumber) {
        ResponseEntity<String> entity;
        try {
            taskReplyService.removeReply(replyNumber);
            entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return entity;
    }
}