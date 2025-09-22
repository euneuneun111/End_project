// src/SignupPage.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// --- 스타일 정의 ---
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f7f7;
`;

const Box = styled.div`
  width: 90%;
  max-width: 380px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.05);
`;

const Logo = styled.h1`
  text-align: center;
  color: #2c7be5;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  font-style: italic;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  margin: 12px 0 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #bbb;
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: #2c7be5;
  }
`;

const Button = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  background: #2c7be5;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: #1e5cb3;
  }
`;

const Register = styled.p`
  font-size: 13px;
  text-align: center;
  margin-top: 16px;
  color: #555;

  span {
    font-weight: bold;
    color: black;
    cursor: pointer;
  }
`;

// --- SignupPage 컴포넌트 ---
export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    user_id: "",
    user_pwd: "",
    email: "",
    name: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/project/member/api/members/signup", form, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 201 || res.data.success) {
        alert("회원가입 완료!");
        navigate("/login");
      } else {
        alert("회원가입 실패: " + (res.data.message || "알 수 없는 오류"));
      }
    } catch (err) {
      console.error("회원가입 중 오류:", err);
      alert("서버 오류 발생");
    }
  };

  return (
    <Container>
      <Box>
        <Logo>LINKED</Logo>
        <Title>SIGN UP</Title>

        <form onSubmit={handleSubmit}>
          <Label>ID</Label>
          <Input
            type="text"
            name="user_id"
            placeholder="Enter your ID"
            value={form.user_id}
            onChange={handleChange}
            required
          />

          <Label>Password</Label>
          <Input
            type="password"
            name="user_pwd"
            placeholder="Enter your Password"
            value={form.user_pwd}
            onChange={handleChange}
            required
          />

          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <Label>Nickname</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter your Nickname"
            value={form.name}
            onChange={handleChange}
            required
          />

          <Button type="submit">Sign Up</Button>
        </form>

        <Register>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </Register>
      </Box>
    </Container>
  );
}