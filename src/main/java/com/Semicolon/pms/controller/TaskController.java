package com.Semicolon.pms.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Semicolon.cmnt.dto.MemberVO;
import com.Semicolon.cmnt.service.MemberService;
import com.Semicolon.command.PageMaker;
import com.Semicolon.pms.dto.TaskDto;
import com.Semicolon.pms.service.TaskService;

@Controller
@RequestMapping("/main/project")
public class TaskController {

	
    private final TaskService taskService;
    private final MemberService memberService;

    public TaskController(TaskService taskService, MemberService memberService) {
        this.taskService = taskService;
        this.memberService = memberService;
    }

    /**
     * 프로젝트 ID가 없을 경우 기본값 사용 가능 (필요시)
     */
    @GetMapping("/task")
    public String redirectToTaskList(@RequestParam(value = "projectId", required = false) String projectId) {
        if (projectId == null || projectId.isEmpty()) {
            projectId = "DEFAULT_PROJECT"; // 필요시 기본값 설정
        }
        return "redirect:/main/project/" + projectId + "/tasklist";
    }

    @GetMapping("/{projectId}/tasklist")
    public String getTaskList(@PathVariable("projectId") String projectId,
                              @RequestParam(value = "page", defaultValue = "1") int page,
                              @RequestParam(value = "perPageNum", defaultValue = "10") int perPageNum,
                              @RequestParam(value = "searchQuery", required = false) String searchQuery,
                              Model model) {
        try {
            PageMaker pageMaker = new PageMaker();
            pageMaker.setProjectId(projectId);
            pageMaker.setPage(page);
            pageMaker.setPerPageNum(perPageNum);
            pageMaker.setSearchQuery(searchQuery); 

            pageMaker.setTotalCount(taskService.getTotalCountByProjectId(pageMaker));
            List<TaskDto> taskList = taskService.getTaskListByProjectId(pageMaker);

            model.addAttribute("taskList", taskList);
            model.addAttribute("pageMaker", pageMaker);
            model.addAttribute("projectId", projectId);

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "organization/pms/task/tasklist";
    }

    @PostMapping("/{projectId}/tasklist")
    @ResponseBody
    public ResponseEntity<Map<String, String>> createTask(@PathVariable String projectId, @RequestBody TaskDto task) {
        Map<String, String> response = new HashMap<>();
        try {
            task.setProjectId(projectId);
            taskService.createNewTask(task);
            response.put("message", "일감이 성공적으로 등록되었습니다.");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (SQLException e) {
            e.printStackTrace();
            response.put("message", "일감 등록 중 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{projectId}/tasklist/{taskId}")
    public String getTaskDetail(@PathVariable String projectId, @PathVariable String taskId, Model model) {
        try {
            TaskDto task = taskService.getTaskById(taskId);
            model.addAttribute("task", task);
            model.addAttribute("projectId", projectId);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "organization/pms/task/taskdetail";
    }

    @PutMapping("/{projectId}/tasklist/{taskId}")
    @ResponseBody
    public ResponseEntity<String> updateTask(@PathVariable String taskId, @RequestBody TaskDto task) {
        try {
            task.setTaskId(taskId);
            taskService.updateTask(task);
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{projectId}/tasklist/{taskId}")
    @ResponseBody
    public ResponseEntity<String> deleteTask(@PathVariable String taskId) {
        try {
            taskService.deleteTask(taskId);
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    @GetMapping("/api/{projectId}/tasks")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getTaskListForReact(
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
            pageMaker.setSearchQuery(keyword);

            pageMaker.setTotalCount(taskService.getTotalCountByProjectId(pageMaker));
            List<TaskDto> taskList = taskService.getTaskListByProjectId(pageMaker);

            response.put("taskList", taskList);
            response.put("pageMaker", pageMaker);

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (SQLException e) {
            e.printStackTrace();
            response.put("error", "일감 목록을 불러오는 데 실패했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api/task/{taskId}")
    @ResponseBody
    public ResponseEntity<?> getTaskDetailForReact(@PathVariable String taskId) {
        try {
            TaskDto task = taskService.getTaskById(taskId);
            if (task != null) {
                return new ResponseEntity<>(task, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Task not found", HttpStatus.NOT_FOUND);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error fetching task details", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api/{projectId}/tasks/all")
    @ResponseBody
    public ResponseEntity<List<TaskDto>> getAllTasksByProjectId(@PathVariable String projectId) {
        try {
            List<TaskDto> taskList = taskService.getAllTasksByProjectId(projectId);
            return new ResponseEntity<>(taskList, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{projectId}/gantt")
    public String showGanttChartPage(@PathVariable("projectId") String projectId, Model model) {
        model.addAttribute("currentProjectId", projectId);
        return "organization/pms/gantt/ganttchart";
    }

@GetMapping("/api/{projectId}/members")
@ResponseBody
public ResponseEntity<List<MemberVO>> getProjectMembers(@PathVariable String projectId) {
    try {
        // MemberService에 projectId로 멤버를 조회하는 메소드가 필요합니다.
        List<MemberVO> memberList = memberService.getMembersByProjectId(projectId);
        return new ResponseEntity<>(memberList, HttpStatus.OK);
    } catch (Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
}