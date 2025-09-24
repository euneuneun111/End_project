import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

/* ================= Styled Components ================= */
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

const Row = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f8f9fa;
`;

const SmallInput = styled(Input)`
  flex: 1;
  max-width: 150px;
`;

const StatusButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer; /* 클릭 가능 표시 */
  background-color: ${({ status }) =>
    status === "검토 전" ? "#888" :    /* 회색 */
    status === "보류" ? "#f0ad4e" :   /* 주황 */
    status === "승인" ? "#28a745" :   /* 초록 */
    "#ccc"};                          /* 기본 회색 */
  color: #fff;
  min-width: 80px;
  transition: 0.2s;

  &:hover {
    opacity: 0.9;
  }
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

/* ================= Component ================= */
function MeetingDetail() {
  const { projectId, id } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);

  // 회의 상세 불러오기
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

  // 삭제 처리
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.get(
        `/project/organization/${projectId}/meeting/api/remove?id=${id}`,
        { withCredentials: true }
      );
      alert("회의가 삭제되었습니다.");
      navigate(`/meeting/main/${projectId}`);
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleStatusChange = async () => {
    if (!meeting) return;

    // 상태 변경 순서: ["검토 전" -> "검토 중" -> "완료"]
    const nextStatus =
      meeting.status === "검토 전"
        ? "보류"
        : meeting.status === "보류"
          ? "승인"
          : "검토 전";

    try {
      await axios.post(
        `/project/organization/${projectId}/meeting/api/submit`,
        {
          meetingId: meeting.id,
          status: nextStatus
        },
        { withCredentials: true }
      );

      setMeeting((prev) => ({ ...prev, status: nextStatus }));
      alert(`상태가 "${nextStatus}"로 변경되었습니다.`);
    } catch (err) {
      console.error("상태 변경 실패:", err);
      alert("상태 변경 중 오류가 발생했습니다.");
    }
  };

  if (!meeting) return <div>로딩 중...</div>;

  return (
    <Container>
      {/* 회의일자 + 상태 한 줄 배치 */}
      <Row>
        <div>
          <Label>회의일자</Label>
          <SmallInput
            type="date"
            value={
              meeting.meetingDate
                ? new Date(meeting.meetingDate).toISOString().substring(0, 10)
                : ""
            }
            readOnly
          />
        </div>

        <div>
          <Label>상태</Label>
          <StatusButton
            status={meeting.status}
            onClick={handleStatusChange} // 클릭 시 함수 호출
            style={{ cursor: "pointer" }}
          >
            {meeting.status || "미정"}
          </StatusButton>
        </div>
      </Row>

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
