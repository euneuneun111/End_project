package com.Semicolon.pms.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.Semicolon.cmnt.dto.MemberVO;
import com.Semicolon.pms.dto.IssueDto;
import com.Semicolon.pms.dto.IssueReplyDTO;
import com.Semicolon.pms.dto.TaskDto;
import com.Semicolon.pms.service.IssueReplyService;
import com.Semicolon.pms.service.IssueService;
import com.Semicolon.pms.service.TaskService;
import com.Semicolon.command.PageMaker;

@Controller
@RequestMapping("/main/project") 
public class IssueController {

	// 확인
    private final IssueService issueService;
    private final TaskService taskService;
    private final IssueReplyService issueReplyService;

    public IssueController(IssueService issueService, TaskService taskService, IssueReplyService issueReplyService) {
        this.issueService = issueService;
        this.taskService = taskService;
        this.issueReplyService = issueReplyService;
    }

    /** 이슈 목록 페이지 (JSP) */
    @GetMapping("/{projectId}/issuelist")
    public String getIssueList(
            @PathVariable("projectId") String projectId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "perPageNum", defaultValue = "10") int perPageNum,
            @RequestParam(value = "keyword", required = false) String keyword,
            Model model) throws SQLException {

        PageMaker pageMaker = new PageMaker();
        pageMaker.setProjectId(projectId);
        pageMaker.setPage(page);
        pageMaker.setPerPageNum(perPageNum);
        pageMaker.setKeyword(keyword);
        pageMaker.setTotalCount(issueService.getTotalCount(pageMaker));

        List<IssueDto> issueList = issueService.getIssueList(pageMaker);
        List<TaskDto> taskList = taskService.getAllTasksByProjectId(projectId); // DB에서 가져오기

        model.addAttribute("issueList", issueList);
        model.addAttribute("taskList", taskList);
        model.addAttribute("pageMaker", pageMaker);
        model.addAttribute("projectId", projectId);

        return "organization/pms/issue/issuelist";
    }

    /** 이슈 등록 (React & AJAX) */
    @PostMapping("/{projectId}/issuelist")
    @ResponseBody
    public ResponseEntity<Map<String, String>> createIssue(
            @PathVariable("projectId") String projectId,
            @RequestBody IssueDto issue,
            HttpSession session) {

        Map<String, String> response = new HashMap<>();
        try {
            MemberVO loginUser = (MemberVO) session.getAttribute("loginUser");
            if (loginUser == null) {
                response.put("message", "로그인이 필요합니다.");
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }

            issue.setProjectId(projectId);
            issue.setIssueCreatorId(loginUser.getUser_id());
            issue.setIssueManagerId(loginUser.getUser_id());

            issueService.createNewIssue(issue);

            response.put("message", "이슈가 성공적으로 등록되었습니다.");
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (SQLException e) {
            e.printStackTrace();
            response.put("message", "이슈 등록 중 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /** 이슈 상세 페이지 (JSP) */
    @GetMapping("/{projectId}/issuelist/{issueId}")
    public String getIssueDetail(
            @PathVariable String projectId,
            @PathVariable String issueId,
            Model model) throws SQLException {

        IssueDto issue = issueService.getIssueById(issueId);
        model.addAttribute("issue", issue);
        model.addAttribute("projectId", projectId);

        return "organization/pms/issue/issuedetail";
    }

    /** 이슈 수정 (RESTful API) */
    @PutMapping("/issue/update")
    @ResponseBody
    public ResponseEntity<Map<String, String>> updateIssue(@RequestBody IssueDto issue) {
        Map<String, String> response = new HashMap<>();
        try {
            issueService.updateIssue(issue);
            response.put("message", "이슈가 성공적으로 수정되었습니다.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (SQLException e) {
            response.put("error", "이슈 수정 중 오류 발생");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /** 이슈 삭제 (RESTful API) */
    @DeleteMapping("/issue/{issueId}")
    @ResponseBody
    public ResponseEntity<Map<String, String>> deleteIssue(@PathVariable String issueId) {
        Map<String, String> response = new HashMap<>();
        try {
            issueService.deleteIssue(issueId);
            response.put("message", "이슈가 삭제되었습니다.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (SQLException e) {
            response.put("error", "이슈 삭제 중 오류 발생");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /** 댓글 추가 */
    @PostMapping("/reply")
    @ResponseBody
    public ResponseEntity<Map<String, String>> addReply(@RequestBody IssueReplyDTO reply, HttpSession session) {
        Map<String, String> response = new HashMap<>();
        MemberVO loginUser = (MemberVO) session.getAttribute("loginUser");
        if (loginUser == null) {
            response.put("error", "로그인이 필요합니다.");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        reply.setUserId(loginUser.getUser_id());

        try {
            issueReplyService.insertReply(reply);
            response.put("message", "댓글이 추가되었습니다.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (SQLException e) {
            response.put("error", "댓글 추가 중 오류 발생");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /** 댓글 삭제 */
    @DeleteMapping("/issue/reply/{replyNumber}")
    @ResponseBody
    public ResponseEntity<Map<String, String>> deleteReply(@PathVariable String replyNumber) {
        Map<String, String> response = new HashMap<>();
        try {
            issueReplyService.deleteReply(replyNumber);
            response.put("message", "댓글이 삭제되었습니다.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (SQLException e) {
            response.put("error", "댓글 삭제 중 오류 발생");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /** 이슈 목록 API (React) */
    @GetMapping("/api/{projectId}/issues")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getIssueListForReact(
            @PathVariable("projectId") String projectId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "perPageNum", defaultValue = "10") int perPageNum,
            @RequestParam(value = "keyword", required = false) String keyword) {

        Map<String, Object> response = new HashMap<>();
        try {
            PageMaker pageMaker = new PageMaker();
            pageMaker.setProjectId(projectId);
            pageMaker.setPage(page);
            pageMaker.setPerPageNum(perPageNum);
            pageMaker.setKeyword(keyword);
            pageMaker.setTotalCount(issueService.getTotalCount(pageMaker));

            List<IssueDto> issueList = issueService.getIssueList(pageMaker);

            response.put("issueList", issueList);
            response.put("pageMaker", pageMaker);

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (SQLException e) {
            e.printStackTrace();
            response.put("error", "이슈 목록을 불러오는 데 실패했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /** 이슈 상세 API (React) */
    @GetMapping("/api/issue/{issueId}")
    @ResponseBody
    public ResponseEntity<?> getIssueDetailForReact(@PathVariable String issueId) {
        try {
            IssueDto issue = issueService.getIssueById(issueId);
            if (issue != null) {
                return new ResponseEntity<>(issue, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Issue not found", HttpStatus.NOT_FOUND);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error fetching issue details", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
