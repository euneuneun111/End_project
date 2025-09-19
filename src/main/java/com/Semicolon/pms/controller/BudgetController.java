package com.Semicolon.pms.controller;

import com.Semicolon.pms.dto.BudgetDTO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/main/budget")
public class BudgetController {

    /**
     * 예산 페이지를 로드하고 더미 데이터를 뷰로 전달합니다.
     * PM 역할로 설정하여 삭제 버튼이 보이도록 합니다.
     * @param model 뷰로 데이터를 전달하는 데 사용되는 스프링 모델 객체입니다.
     * @return 뷰의 이름 ("budget")입니다.
     */
    @GetMapping
    public String getBudgetPage(Model model) {
        // 실제로는 DB에서 데이터를 가져와야 합니다. 여기서는 더미 데이터를 사용합니다.
        List<BudgetDTO> budgetList = new ArrayList<>();

        // 더미 항목 생성 시 DTO의 생성자 매개변수 순서와 타입을 맞춰줍니다.
        budgetList.add(new BudgetDTO("TSK-D002", "클라우드 서비스 구독료", new BigDecimal("5000"), LocalDateTime.now(), false));
        budgetList.add(new BudgetDTO("TSK-E003", "UI/UX 디자인 외주 비용", new BigDecimal("250000"), LocalDateTime.now(), false));
        budgetList.add(new BudgetDTO("TSK-C004", "외부 개발자 인건비", new BigDecimal("3000000"), LocalDateTime.now(), true)); // isDeleted가 true인 항목
        budgetList.add(new BudgetDTO("TSK-F005", "마케팅 콘텐츠 제작비", new BigDecimal("120000"), LocalDateTime.now(), false));
        
        // JSP에서 JSTL fmt:formatDate 태그가 LocalDateTime을 처리하지 못하는 문제를 해결합니다.
        // LocalDateTime을 "yyyy.MM.dd" 형식의 String으로 변환하여 DTO에 저장합니다.
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
        for (BudgetDTO budget : budgetList) {
            budget.setDateString(budget.getDate().format(formatter));
        }

        // 예산 합계 계산 (실제로는 DB에서 계산)
        BigDecimal totalBudget = new BigDecimal("10000000");

        // mapToInt 오류 수정: getAmount()가 BigDecimal을 반환하므로 Stream API의 map을 사용하고 합계를 계산합니다.
        BigDecimal usedBudget = budgetList.stream()
                .filter(item -> !item.isDeleted()) // isDeleted() 메서드 호출
                .map(BudgetDTO::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 뷰에 필요한 데이터를 모델에 추가
        model.addAttribute("budgetList", budgetList);
        model.addAttribute("totalBudget", totalBudget);
        model.addAttribute("usedBudget", usedBudget);
        model.addAttribute("userRole", "PM"); // JSP에서 PM 역할 테스트를 위해 추가

        return "/organization/pms/budget/budget";
    }
}
