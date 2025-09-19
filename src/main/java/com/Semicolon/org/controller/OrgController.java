package com.Semicolon.org.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/org")
public class OrgController {

    @GetMapping("/main")
    public String orgMain() {
        return "organization/org";
    }
}