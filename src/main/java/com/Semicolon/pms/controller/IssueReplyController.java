// src/main/java/com/Semicolon/pms/controller/IssueReplyController.java

package com.Semicolon.pms.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.Semicolon.pms.dto.IssueReplyDTO;
import com.Semicolon.pms.service.IssueReplyService;

@RestController
@RequestMapping("/replies")
public class IssueReplyController {

    private final IssueReplyService issueReplyService;

    public IssueReplyController(IssueReplyService issueReplyService) {
        this.issueReplyService = issueReplyService;
    }

    // GET /replies/{issueId}
    @RequestMapping(value = "/{issueId}", method = RequestMethod.GET)
    public ResponseEntity<List<IssueReplyDTO>> selectReplyList(@PathVariable("issueId") String issueId) {
        ResponseEntity<List<IssueReplyDTO>> entity = null;
        try {
            List<IssueReplyDTO> replies = issueReplyService.selectReplyList(issueId);
            entity = new ResponseEntity<>(replies, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    // POST /replies
    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<String> insertReply(@RequestBody IssueReplyDTO dto) {
        ResponseEntity<String> entity = null;
        try {
            // TODO: 세션에서 실제 사용자 ID 설정
            // dto.setUserId("real_user_id"); 
            issueReplyService.insertReply(dto);
            entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    // PUT /replies/{replyNumber}
    @RequestMapping(value = "/{replyNumber}", method = RequestMethod.PUT)
    public ResponseEntity<String> updateReply(@PathVariable("replyNumber") String replyNumber, @RequestBody IssueReplyDTO dto) {
        ResponseEntity<String> entity = null;
        try {
            dto.setReplyNumber(replyNumber);
            issueReplyService.updateReply(dto);
            entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    // DELETE /replies/{replyNumber}
    @RequestMapping(value = "/{replyNumber}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteReply(@PathVariable("replyNumber") String replyNumber) {
        ResponseEntity<String> entity = null;
        try {
            issueReplyService.deleteReply(replyNumber);
            entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return entity;
    }
}