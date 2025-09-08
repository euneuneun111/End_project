import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 60px auto;
  padding: 36px;
  background: linear-gradient(145deg, #f0f4ff, #ffffff);
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  margin-bottom: 28px;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: #4287c4;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Input = styled.input`
  padding: 14px 20px;
  border: 2px solid #d0d7de;
  border-radius: 15px;
  font-size: 1rem;
  transition: all 0.3s;

  &:focus {
    border-color: #4287c4;
    box-shadow: 0 0 8px rgba(66, 135, 196, 0.3);
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 14px 20px;
  border: 2px solid #d0d7de;
  border-radius: 15px;
  font-size: 1rem;
  resize: none;
  min-height: 120px;
  transition: all 0.3s;

  &:focus {
    border-color: #4287c4;
    box-shadow: 0 0 8px rgba(66, 135, 196, 0.3);
    outline: none;
  }
`;

const Button = styled.button`
  padding: 14px;
  background: linear-gradient(90deg, #4287c4, #356aa3);
  color: #fff;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(66, 135, 196, 0.4);
  }
`;

const MemberSection = styled.div`
  display: flex;
  gap: 10px;
`;

const MemberList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const MemberItem = styled.div`
  padding: 6px 12px;
  border-radius: 12px;
  background: #e6f0ff;
  color: #0366d6;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #c2e0ff;
    transform: scale(1.05);
  }
`;

function ProjectCreate() {
  const [form, setForm] = useState({ name: "", description: "" });
  const [nickname, setNickname] = useState("");
  const [members, setMembers] = useState([]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleAddMember = () => {
    if (!nickname.trim()) return;
    setMembers([...members, nickname]);
    setNickname("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("프로젝트 생성:", { ...form, members });
    alert("프로젝트가 생성되었습니다!");
  };

  return (
    <Container>
      <Title>프로젝트 생성</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="프로젝트 이름"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextArea
          name="description"
          placeholder="프로젝트 설명"
          value={form.description}
          onChange={handleChange}
          required
        />

        <MemberSection>
          <Input
            type="text"
            placeholder="닉네임 검색"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Button type="button" onClick={handleAddMember}>
            추가
          </Button>
        </MemberSection>

        <MemberList>
          {members.map((m, i) => (
            <MemberItem key={i}>{m}</MemberItem>
          ))}
        </MemberList>

        <Button type="submit">CREATE</Button>
      </Form>
    </Container>
  );
}

export default ProjectCreate;
