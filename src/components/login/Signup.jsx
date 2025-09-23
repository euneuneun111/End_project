// src/SignupPage.jsx
import React, { useState, useEffect } from "react";
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
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
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

const SmallButton = styled(Button)`
  width: 120px;
  margin-top: 0;
  padding: 8px;
  font-size: 13px;
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

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    user_id: "",
    user_pwd: "",
    email: "",
    name: "",
  });

  const [idCheck, setIdCheck] = useState(null); // ID 중복 여부
  const [nameCheck, setNameCheck] = useState(null); // 닉네임 중복 여부

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "user_id") setIdCheck(null);
    if (e.target.name === "name") setNameCheck(null);
  };

  // --- 실시간 ID 중복 검사 ---
  useEffect(() => {
    const checkId = async () => {
      if (!form.user_id.trim()) return;
      try {
        const res = await axios.get(
          `/project/member/api/members/check-id?user_id=${encodeURIComponent(
            form.user_id
          )}`
        );
        setIdCheck(res.data.available);
      } catch (err) {
        console.error("ID 중복 검사 오류:", err);
      }
    };

    const delayDebounce = setTimeout(checkId, 500); // 0.5초 딜레이
    return () => clearTimeout(delayDebounce);
  }, [form.user_id]);

  // --- 실시간 닉네임 중복 검사 ---
  useEffect(() => {
    const checkName = async () => {
      if (!form.name.trim()) return;
      try {
        const res = await axios.get(
          `/project/member/api/members/check-name?name=${encodeURIComponent(
            form.name
          )}`
        );
        setNameCheck(res.data.available);
      } catch (err) {
        console.error("닉네임 중복 검사 오류:", err);
      }
    };

    const delayDebounce = setTimeout(checkName, 500); // 0.5초 딜레이
    return () => clearTimeout(delayDebounce);
  }, [form.name]);

  // --- 회원가입 요청 ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.user_id.trim() || !form.name.trim()) {
      alert("ID와 닉네임을 입력해주세요.");
      return;
    }

    if (idCheck === false) {
      alert("이미 사용 중인 ID입니다.");
      return;
    }

    if (nameCheck === false) {
      alert("이미 사용 중인 닉네임입니다.");
      return;
    }

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
          {idCheck === true && <p style={{ color: "green", fontSize: "12px" }}>사용 가능한 ID입니다.</p>}
          {idCheck === false && <p style={{ color: "red", fontSize: "12px" }}>이미 사용 중인 ID입니다.</p>}

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
          {nameCheck === true && <p style={{ color: "green", fontSize: "12px" }}>사용 가능한 닉네임입니다.</p>}
          {nameCheck === false && <p style={{ color: "red", fontSize: "12px" }}>이미 사용 중인 닉네임입니다.</p>}

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
