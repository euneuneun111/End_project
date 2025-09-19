package com.Semicolon.cmnt.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Semicolon.cmnt.command.BoardModifyCommand;
import com.Semicolon.cmnt.command.BoardRegistCommand;
import com.Semicolon.cmnt.command.PageMaker;
import com.Semicolon.cmnt.dao.Recruit_ApplicationDAO;
import com.Semicolon.cmnt.dto.BoardVO;
import com.Semicolon.cmnt.dto.Recruit_ApplicationVO;
import com.Semicolon.cmnt.dto.Recruit_BoardVO;
import com.Semicolon.cmnt.service.BoardService;
import com.Semicolon.cmnt.service.Recruit_ApplicationService;
import com.Semicolon.cmnt.service.Recruit_BoardService;
import com.josephoconnell.html.HTMLInputFilter;

@Controller
@RequestMapping("/community")
public class CommunityController {
	
	@Autowired
	private BoardService BoardService;
	@Autowired
	private Recruit_BoardService recruit_boardservice;
	@Autowired
    private Recruit_ApplicationService applicationService;
	@Autowired
    private Recruit_ApplicationDAO recruitapplicationDAO;
	
	@Resource(name="summernotePath")
	private String summernotePath;

	
	@GetMapping("/main")
	public void main() {}
	
	@GetMapping("/Board")
	public void Board(@ModelAttribute PageMaker pageMaker, Model model) throws Exception {
		List<BoardVO> boardList = BoardService.list(pageMaker);		
		model.addAttribute("boardList",boardList);
	}
	
	@GetMapping("/Board_recruit")
	public void Recruit(@ModelAttribute PageMaker pageMaker, Model model) throws Exception {
		List<Recruit_BoardVO> boardList = recruit_boardservice.list(pageMaker);		
		model.addAttribute("boardList",boardList);
	}
	
	@GetMapping("/detail")
	public void detail(int fno, HttpServletRequest request,Model model)throws Exception{
		
		ServletContext ctx = request.getServletContext();
		
		String key = "board:"+fno;
		
		BoardVO board = null;
		
		if(ctx.getAttribute(key)!=null) {
			board = BoardService.getBoard(fno);
		}else {
			ctx.setAttribute(key, key);
			board = BoardService.detail(fno);
		}	

		model.addAttribute("board",board);
	}
	
	@GetMapping("/detail_recruit")
	public void detail_recruit(int rno, HttpServletRequest request, Model model) throws Exception {
	    ServletContext ctx = request.getServletContext();
	    String key = "board:" + rno;

	    Recruit_BoardVO board;

	    if (ctx.getAttribute(key) != null) {
	        board = recruit_boardservice.getBoard(rno);
	    } else {
	        ctx.setAttribute(key, key);
	        board = recruit_boardservice.detail(rno);
	    }

	    // ① 게시글 정보
	    model.addAttribute("recruit_board", board);

	 // 신청자 리스트 조회
        List<Recruit_ApplicationVO> applyList = applicationService.getApplications(rno);
        board.setApplyList(applyList);

        model.addAttribute("recruit_board", board);
        return ; // JSP 경로
	}
	// 신청하기 처리 (AJAX)
	@PostMapping("/recruit_apply")
    @ResponseBody
    public Map<String, Object> apply(@RequestParam String user_id, @RequestParam int rno) {
        Map<String, Object> res = new HashMap<>();
        try {
            int exists = recruitapplicationDAO.existsApplication(rno, user_id);
            if(exists > 0) {
                res.put("success", false);
            } else {
            	recruitapplicationDAO.insertApplication(rno, user_id);
                res.put("success", true);
            }
        } catch(Exception e) {
            res.put("success", false);
            e.printStackTrace();
        }
        return res;
    }
	
	//  기존 신청자 조회
    @GetMapping("/getApplications")
    @ResponseBody
    public List<Recruit_ApplicationVO> getApplications(@RequestParam int rno) {
        return recruitapplicationDAO.selectApplicationsByRno(rno);
    }
	

	
	@GetMapping("/regist")
	public void registForm() {}
	
	@GetMapping("/regist_recruit")
	public void regist_RecruitForm() {}
	
	@PostMapping("/regist")
	public String registPost(BoardRegistCommand regCommand)throws Exception{
		String url = "/community/regist_success";
		
		BoardVO board = regCommand.toBoard();
		board.setTitle(HTMLInputFilter.htmlSpecialChars(board.getTitle()));
		
		BoardService.regist(board);
		
		return url;
	}
	
	@PostMapping("/regist_recruit")
	public String registrecruitPost(BoardRegistCommand regCommand)throws Exception{
		String url = "/community/regist_success";
		
		Recruit_BoardVO board = regCommand.toRecruit_Board();
		board.setTitle(HTMLInputFilter.htmlSpecialChars(board.getTitle()));
		
		recruit_boardservice.regist(board);
		
		return url;
	}
	
	@GetMapping("/modify")
	public void modifyForm(int fno, Model model)throws Exception{
		BoardVO board = BoardService.getBoard(fno);
		
		model.addAttribute("board",board);
	}
	
	@PostMapping("/modify")
	public String modifyPost(BoardModifyCommand modifyCommand)throws Exception{
		
		String url = "/community/modify_success";
		
		BoardVO board = modifyCommand.toBoardVO();
		board.setTitle(HTMLInputFilter.htmlSpecialChars(board.getTitle()));
		
		BoardService.modify(board);
		
		return url;		
	}
	
	@GetMapping("/remove")
	public String remove(int fno)throws Exception{
		String url="/community/remove_success";		
		
		BoardService.remove(fno);
		
		return url;
	}
	
	@GetMapping("/reportBoard")
	public void reportForm(int fno, Model model)throws Exception{
		BoardVO board = BoardService.getBoard(fno);
		
		model.addAttribute("report",board);
	}

}