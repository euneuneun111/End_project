import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  font-style: italic;
  margin-bottom: 20px;
  text-align: center;
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

const BackLink = styled.p`
  font-size: 13px;
  text-align: center;
  margin-top: 16px;
  color: #555;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default function FindPassword() {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [tempPassword, setTempPassword] = useState(""); // 임시 비밀번호 상태
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || !nickname) {
      alert("아이디와 닉네임을 모두 입력해주세요.");
      return;
    }

    try {
      // Axios POST 요청 수정
      const response = await axios.post(
        "/project/member/api/members/findpassword", // 백엔드 주소와 포트 확인
        { id, nickname },
        { withCredentials: true } // 옵션은 여기!
      );

      if (response.data.success) {
        setTempPassword(response.data.tempPassword);
      } else {
        alert(`실패: ${response.data.message || "비밀번호를 찾을 수 없습니다."}`);
      }
    } catch (error) {
      console.error("비밀번호 찾기 오류:", error);
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <Box>
        <Title>Find Password</Title>

        {tempPassword ? (
          <div>
            <p>임시 비밀번호가 발급되었습니다:</p>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              {tempPassword}
            </p>
            <Button onClick={() => navigate("/login")}>Back to Login</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <Label>ID</Label>
            <Input
              type="text"
              placeholder="Enter your ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />

            <Label>Nickname</Label>
            <Input
              type="text"
              placeholder="Enter your Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />

            <Button type="submit">Find Password</Button>
          </form>
        )}

        {!tempPassword && <BackLink onClick={() => navigate(-1)}>Back to Login</BackLink>}
      </Box>
    </Container>
  );
}
