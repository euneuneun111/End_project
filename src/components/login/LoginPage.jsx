// src/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "./LoginApi";

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

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // 페이지 리로드 방지

    if (!id || !password) {
      alert("ID와 Password를 입력해주세요.");
      return;
    }

    try {
      const res = await login(id, password);
      if (res.success) {
        alert("로그인 성공!");
        navigate("/home");
      } else {
        alert("로그인 실패: " + res.message);
      }
    } catch (err) {
      console.error("로그인 중 오류:", err);
      alert("서버 오류 발생");
    }
  };

  return (
    <Container>
      <Box>
        <Logo>LINKED</Logo>
        <Title>LOGIN</Title>

        <form onSubmit={handleLogin}>
          <Label>ID</Label>
          <Input
            type="text"
            placeholder="Enter your ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Login</Button>
        </form>

        <Register>
          Don’t have an Account? <span>Register</span>
        </Register>
      </Box>
    </Container>
  );
}
