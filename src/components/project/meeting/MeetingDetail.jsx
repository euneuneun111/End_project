import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  font-family: "Poppins", sans-serif;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  margin: 12px 0 6px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f8f9fa; 
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  background-color: #f8f9fa;
`;

const ButtonBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
`;

const Button = styled.button.attrs(({ $variant, ...rest }) => rest)`
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 14px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: 0.2s;
  min-width: 80px;

  /* 색상 스타일 */
  background-color: ${({ $variant, disabled }) =>
    $variant === "danger"
      ? "#e74c3c" 
      : $variant === "primary"
      ? disabled ? "#89b5fd" : "#a0c4ff" 
      : "#f0f0f0"}; 

  color: ${({ $variant }) =>
    $variant === "danger" || $variant === "primary" ? "#fff" : "#333"}; 

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.9)};
  }
`;


function MeetingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 예시 데이터 (실제 API로 불러오기)
  const meeting = {
    id,
    date: "2025-09-09",
    host: "이민희",
    participants: "이민희, 김하설, 조민호",
    title: "프로젝트 진행 회의",
    summary: "프로젝트 일정 및 역할 분담",
    content: "세부 진행 상황과 각자의 역할에 대해 논의하였습니다."
  };

  return (
    <Container>
      <Label>회의일자</Label>
      <Input type="date" value={meeting.date} readOnly />

      <Label>주관자</Label>
      <Input type="text" value={meeting.host} readOnly />

      <Label>참석자</Label>
      <Input type="text" value={meeting.participants} readOnly />

      <Label>회의명</Label>
      <Input type="text" value={meeting.title} readOnly />

      <Label>회의 개요</Label>
      <TextArea value={meeting.summary} readOnly />

      <Label>회의 내용</Label>
      <TextArea value={meeting.content} readOnly />

<ButtonBar>
  <Button $variant="danger">삭제</Button>        
  <Button $variant="primary" onClick={() => navigate(`/meeting/modify/${meeting.id}`)}>
    수정
  </Button>                                
  <Button onClick={() => navigate("/meeting/Main")}>취소</Button> 
</ButtonBar>

    </Container>
  );
}

export default MeetingDetail;
