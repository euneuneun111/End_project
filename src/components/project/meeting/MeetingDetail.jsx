import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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
  const { projectId, id } = useParams(); 
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await axios.get(
          `/project/organization/${projectId}/meeting/api/meeting/${id}`,
          { withCredentials: true }
        );
        setMeeting(res.data);
      } catch (error) {
        console.error("회의 상세 조회 실패:", error);
      }
    };
    if (projectId && id) fetchMeeting();
  }, [projectId, id]);

  // 삭제 버튼 클릭 처리
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.get(
        `/project/organization/${projectId}/meeting/api/remove?id=${id}`,
        { withCredentials: true }
      );
      alert("회의가 삭제되었습니다.");
      navigate(`/meeting/main/${projectId}`); // 삭제 후 목록 페이지 이동
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  if (!meeting) return <div>로딩 중...</div>;

  return (
    <Container>
      <Label>회의일자</Label>
      <Input
        type="date"
        value={
          meeting.meetingDate
            ? new Date(meeting.meetingDate).toISOString().substring(0, 10)
            : ""
        }
        readOnly
      />

      <Label>주관자</Label>
      <Input type="text" value={meeting.author} readOnly />

      <Label>참석자</Label>
      <Input type="text" value={meeting.attend} readOnly />

      <Label>회의명</Label>
      <Input type="text" value={meeting.title} readOnly />

      <Label>회의 개요</Label>
      <TextArea value={meeting.overview} readOnly />

      <Label>회의 내용</Label>
      <TextArea value={meeting.content} readOnly />

      <ButtonBar>
        <Button $variant="danger" onClick={handleDelete}>삭제</Button>
        <Button $variant="primary" onClick={() => navigate(`/meeting/modify/${projectId}/${meeting.id}`)}>
          수정
        </Button>
        <Button onClick={() => navigate(`/meeting/main/${projectId}`)}>취소</Button>
      </ButtonBar>
    </Container>
  );
}

export default MeetingDetail;
