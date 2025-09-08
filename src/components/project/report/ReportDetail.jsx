// ReportDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 24px auto;
  padding: 16px;
  font-family: "Poppins", sans-serif;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  position: relative;
`;

const Title = styled.h2`
  margin-bottom: 16px;
  font-size: 20px;
  color: #333;
`;

const Info = styled.div`
  margin-bottom: 12px;
  font-size: 14px;
  color: #555;

  span {
    font-weight: bold;
  }
`;

const Content = styled.p`
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.6;
  color: #444;
  min-height: 150px; /* 내용 공간 확보 */
`;

const Button = styled.button`
  background-color: ${(props) => props.color || "#4287c4"};
  color: white;
  border: none;
  padding: 8px 14px;
  font-size: 14px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#2f5f8a"};
  }
`;

const ActionBar = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
`;

const ConfirmButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

function ReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 예시 데이터 (실제 프로젝트에서는 API 호출)
  const report = {
    id,
    date: "2025-09-04",
    author: "홍길동",
    status: "미확인",
    content: `업무 보고 상세 내용 ${id}입니다. 실제 데이터는 API나 상태관리(store)에서 가져옵니다. 길어질 경우 내용이 길어져도 스크롤 됩니다.`
  };

  return (
    <Container>
      {/* 상단 수정/삭제 */}
      <ActionBar>
        <Button color="#6c757d" hoverColor="#5a6268" onClick={() => navigate(-1)}>목록</Button>
        <Button color="#f0ad4e" hoverColor="#ec971f" key={report.id}
                onClick={() => navigate(`/report/modify/${report.id}`)} >수정</Button>
        <Button color="#d9534f" hoverColor="#c9302c">삭제</Button>
      </ActionBar>

      <Title>보고서 상세</Title>
      <Info><span>작성 날짜:</span> {report.date}</Info>
      <Info><span>작성자:</span> {report.author}</Info>
      <Info><span>상태:</span> {report.status}</Info>
      <Content>{report.content}</Content>

      {/* 하단 확인 버튼 */}
      <ConfirmButtonWrapper>
        <Button onClick={() => alert("확인 처리되었습니다!")}>확인</Button>
      </ConfirmButtonWrapper>

      
    </Container>
  );
}

export default ReportDetail;
