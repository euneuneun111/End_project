package com.Semicolon.org.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.Semicolon.cmnt.dto.MemberVO;
import com.Semicolon.cmnt.service.MemberService;
import com.Semicolon.org.command.ProjectCreateCommand;
import com.Semicolon.org.dto.ProjectOrgDTO;
import com.Semicolon.org.service.ProjectOrgService;

@Controller
@RequestMapping("/org/myproject")
public class ProjectOrgController {

	private final ProjectOrgService projectOrgService;
	private final MemberService memberService;

	@Resource(name = "projectSavedFilePath")
	private String projectUploadPath;

	public ProjectOrgController(ProjectOrgService projectOrgService, MemberService memberService) {
		this.projectOrgService = projectOrgService;
		this.memberService = memberService;
	}

	/** 프로젝트 목록 조회 */
	@GetMapping("/list")
	public String projectList(Model model) {
		List<ProjectOrgDTO> projectList = projectOrgService.getProjectList();

		model.addAttribute("projectList", projectList);
		return "organization/myproject";
	}

	/** 프로젝트 생성 페이지 이동 */
	@GetMapping("/create")
	public String createProjectForm() {
		return "organization/projectcreate";
	}

	/** 프로젝트 생성 처리 */
	@PostMapping("/create")
	@ResponseBody
	public String createProject(@ModelAttribute ProjectCreateCommand command) throws Exception {
		ProjectOrgDTO project = command.toProjectOrgDTO();

		// 시퀀스 조회
		int seq = projectOrgService.getProjectSeq();
		String projectId = String.format("PRJ-%03d", seq);
		project.setProjectId(projectId);

		// 파일 저장
		MultipartFile logoFile = command.getProjectLogo();
		if (logoFile != null && !logoFile.isEmpty()) {
			// UUID 포함 파일명 생성
			String uuid = UUID.randomUUID().toString().replace("-", "");
			String savedFileName = uuid + "$$" + logoFile.getOriginalFilename();

			// 파일 저장
			File target = new File(projectUploadPath, savedFileName);
			target.getParentFile().mkdirs(); // 폴더 없으면 생성
			logoFile.transferTo(target);

			// DB 컬럼에 파일명 저장
			project.setProjectLogo(savedFileName);
		}

		projectOrgService.insertProject(project);

		return "<script>alert('프로젝트가 생성되었습니다.'); opener.location.reload(); window.close();</script>";
	}

	/** 프로젝트 상세 */
	@GetMapping("/{projectId}")
	public String projectDetail(@PathVariable("projectId") String projectId, Model model) {
		ProjectOrgDTO project = projectOrgService.getProjectDetail(projectId);
		model.addAttribute("project", project);
		return "/organization/projectdetail";
	}

	@GetMapping("/getLogo")
	@ResponseBody
	public ResponseEntity<byte[]> getProjectLogo(@RequestParam String projectId) {
		ProjectOrgDTO project = projectOrgService.getProjectDetail(projectId);

		// 프로젝트가 없거나 로고가 없으면 404 반환
		if (project == null || project.getProjectLogo() == null || project.getProjectLogo().isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		File file = new File(projectUploadPath, project.getProjectLogo());
		if (!file.exists()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		try (InputStream in = new FileInputStream(file)) {
			byte[] bytes = IOUtils.toByteArray(in);

			// 파일 확장자에 맞춰 Content-Type 설정
			String fileName = project.getProjectLogo().toLowerCase();
			org.springframework.http.MediaType mediaType;

			if (fileName.endsWith(".png")) {
				mediaType = org.springframework.http.MediaType.IMAGE_PNG;
			} else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
				mediaType = org.springframework.http.MediaType.IMAGE_JPEG;
			} else if (fileName.endsWith(".gif")) {
				mediaType = org.springframework.http.MediaType.IMAGE_GIF;
			} else {
				mediaType = org.springframework.http.MediaType.APPLICATION_OCTET_STREAM;
			}

			return ResponseEntity.ok().contentType(mediaType).body(bytes);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/** 프로젝트 수정 페이지 */
	@GetMapping("/modify/{projectId}")
	public String modifyProjectForm(@PathVariable String projectId, Model model) {
		ProjectOrgDTO project = projectOrgService.getProjectDetail(projectId);
		model.addAttribute("project", project);
		return "/organization/projectmodify";
	}

	/** 멤버 닉네임 검색 (AJAX) */
	@GetMapping("/search")
	@ResponseBody
	public List<String> searchNicknames(@RequestParam String keyword) throws SQLException {
		return memberService.findNicknamesByKeyword(keyword);
	}

	// ================= React Projectbar용 API =================
	@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
	@GetMapping("/api/projects")
	@ResponseBody
	public List<ProjectOrgDTO> getProjectListForReact(HttpSession session) {
		// 세션에서 로그인 유저 가져오기
		MemberVO loginUser = (MemberVO) session.getAttribute("loginUser");

		if (loginUser == null) {
			throw new RuntimeException("로그인 정보가 없습니다.");
		}

		// 사용자 이름(또는 아이디) 가져오기
		String username = loginUser.getName(); // getId()라면 ID 기준으로 변경

		// 로그인한 사용자만의 프로젝트 반환
		return projectOrgService.getProjectsByUser(username);
	}

	@GetMapping("/api/detail")
	@ResponseBody
	public ResponseEntity<ProjectOrgDTO> getProjectDetailForReact(@RequestParam String projectId) {
		ProjectOrgDTO project = projectOrgService.getProjectDetail(projectId);
		if (project == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return ResponseEntity.ok(project);
	}

	/** React에서 프로젝트 생성 처리 */
	@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
	@PostMapping("/api/create")
	@ResponseBody
	public ResponseEntity<String> createProject(@RequestParam("projectName") String projectName,
			@RequestParam("projectDesc") String projectDesc, @RequestParam("projectManager") String projectManager, // 쉼표로
																													// 구분된
																													// 닉네임
			@RequestParam(value = "projectLogo", required = false) List<MultipartFile> projectLogoFiles) {
		try {
			// DTO 생성
			ProjectOrgDTO project = new ProjectOrgDTO();
			int seq = projectOrgService.getProjectSeq();
			String projectId = String.format("PRJ-%03d", seq);
			project.setProjectId(projectId);
			project.setProjectName(projectName);
			project.setProjectDesc(projectDesc);
			project.setProjectManager(projectManager);

			// 이미지 파일 처리
			if (projectLogoFiles != null) {
				for (MultipartFile file : projectLogoFiles) {
					if (!file.isEmpty()) {
						String uuid = UUID.randomUUID().toString().replace("-", "");
						String savedFileName = uuid + "$$" + file.getOriginalFilename();
						File target = new File(projectUploadPath, savedFileName);
						target.getParentFile().mkdirs();
						file.transferTo(target);

						// 첫 번째 파일만 로고로 지정
						if (project.getProjectLogo() == null) {
							project.setProjectLogo(savedFileName);
						}
					}
				}
			}

			projectOrgService.insertProject(project);
			return ResponseEntity.ok("프로젝트 생성 성공");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("프로젝트 생성 실패");
		}
	}

	// 🔍 프로젝트 이름으로 검색
	@GetMapping("/api/projects/search")
	@ResponseBody
	public List<ProjectOrgDTO> searchProjects(@RequestParam("name") String projectName) {
		return projectOrgService.searchProjectsByName(projectName);
	}

	@GetMapping("/api/getLogo")
	@ResponseBody
	public ResponseEntity<byte[]> getapiProjectLogo(@RequestParam String projectId) {
		ProjectOrgDTO project = projectOrgService.getProjectDetail(projectId);

		// 프로젝트 또는 로고 없으면 404
		if (project == null || project.getProjectLogo() == null || project.getProjectLogo().isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		// 실제 파일 경로
		File file = new File(projectUploadPath, project.getProjectLogo());
		if (!file.exists()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		try (InputStream in = new FileInputStream(file)) {
			byte[] bytes = IOUtils.toByteArray(in);

			// Content-Type 설정
			String lowerName = project.getProjectLogo().toLowerCase();
			org.springframework.http.MediaType mediaType;
			if (lowerName.endsWith(".png")) {
				mediaType = org.springframework.http.MediaType.IMAGE_PNG;
			} else if (lowerName.endsWith(".jpg") || lowerName.endsWith(".jpeg")) {
				mediaType = org.springframework.http.MediaType.IMAGE_JPEG;
			} else if (lowerName.endsWith(".gif")) {
				mediaType = org.springframework.http.MediaType.IMAGE_GIF;
			} else {
				mediaType = org.springframework.http.MediaType.APPLICATION_OCTET_STREAM;
			}

			return ResponseEntity.ok().contentType(mediaType).body(bytes);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/api/join")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> joinProject(@RequestBody Map<String, String> body, HttpSession session) {

		String projectId = body.get("projectId"); // JSON에서 추출
		Map<String, Object> result = new HashMap<>();

		MemberVO loginUser = (MemberVO) session.getAttribute("loginUser");
		if (loginUser == null) {
			result.put("success", false);
			result.put("message", "로그인이 필요합니다.");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
		}

		String username = loginUser.getName();

		try {
			boolean joined = projectOrgService.joinProject(projectId, username);

			if (joined) {
				result.put("success", true);
				result.put("message", "프로젝트에 참여했습니다.");
			} else {
				result.put("success", false);
				result.put("message", "이미 참여한 프로젝트입니다.");
			}

			return ResponseEntity.ok(result);
		} catch (Exception e) {
			e.printStackTrace();
			result.put("success", false);
			result.put("message", "참여 중 오류가 발생했습니다.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}
	}

	// 프로젝트 탈퇴 API
	@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
	@PostMapping("/api/leave")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> leaveProject(@RequestBody Map<String, String> body,
			HttpSession session) {
		Map<String, Object> result = new HashMap<>();

		MemberVO loginUser = (MemberVO) session.getAttribute("loginUser");
		if (loginUser == null) {
			result.put("success", false);
			result.put("message", "로그인이 필요합니다.");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
		}

		String username = loginUser.getName(); // 로그인 유저 이름(또는 ID)
		String projectId = body.get("projectId");

		try {
			boolean success = projectOrgService.leaveProject(projectId, username);

			if (success) {
				result.put("success", true);
				result.put("message", "프로젝트 탈퇴 완료");
				return ResponseEntity.ok(result);
			} else {
				result.put("success", false);
				result.put("message", "이미 탈퇴했거나 참여하지 않은 프로젝트입니다.");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.put("success", false);
			result.put("message", "서버 오류 발생: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}
	}

}