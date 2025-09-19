package com.Semicolon.funding.controller;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Controller
@RequestMapping("/payment")
public class PaymentController {

    @PostMapping("/success")
    public String paymentSuccess(
        @RequestParam String paymentKey,
        @RequestParam String orderId,
        @RequestParam int amount,
        Model model
    ) throws Exception {

        // 승인 API 호출
        String secretKey = "test_sk_XXXXtest_sk_E92LAa5PVbPdaKlvegdp87YmpXyJ";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        String encodedKey = Base64.getEncoder().encodeToString((secretKey + ":").getBytes());

        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Basic " + encodedKey);

        Map<String, Object> body = new HashMap<>();
        body.put("orderId", orderId);
        body.put("amount", amount);
        body.put("paymentKey", paymentKey);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(
                    "https://api.tosspayments.com/v1/payments/confirm",
                    request,
                    String.class
            );
            model.addAttribute("result", response.getBody());
            return "payment/success"; // /WEB-INF/views/payment/success.jsp
        } catch (HttpClientErrorException e) {
            model.addAttribute("error", e.getResponseBodyAsString());
            return "payment/fail";
        }
    }

    @GetMapping("/fail")
    public String paymentFail(@RequestParam Map<String, String> error, Model model) {
        model.addAttribute("error", error);
        return "payment/fail";
    }
}
