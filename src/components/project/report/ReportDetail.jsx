// ReportDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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
  const { id, projectId } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=> {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`/project/organization/${projectId}/report/api/detail`,{
          params: {rno:id},
          headers: {Accept: "application/json"},
        });
        setReport(response.data);
        console.log(response.data);
      } catch (err){
        console.error("데이터 가져오기 실패:", err);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id, projectId]);

  if(loading) return <div>로딩 중...</div>;
  if(error) return <div>{error}</div>;
  if(!report) return <div>보고서를 찾을 수 없습니다.</div>;

  // 삭제 함수
const handleDelete = async () => {
  if (!window.confirm("정말 삭제하시겠습니까?")) return;

  try {
    const response = await axios.post(
      `/project/organization/${projectId}/report/api/remove`,
      { rno: report.rno }, // 삭제할 rno 전달
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data === "success") {
      alert("보고서가 삭제되었습니다.");
      navigate(`/report/Main/${projectId}`); // 삭제 후 목록 페이지로 이동
    } else {
      alert("삭제 실패");
    }
  } catch (err) {
    console.error("삭제 실패:", err);
    alert("삭제 중 오류 발생");
  }
};

  return (
    <Container>
      {/* 상단 수정/삭제 */}
      <ActionBar>
        <Button color="#6c757d" hoverColor="#5a6268" onClick={() => navigate(-1)}>목록</Button>
        <Button color="#f0ad4e" hoverColor="#ec971f" key={report.id}
                onClick={() => navigate(`/${projectId}/report/api/modify/${report.rno}`)} >수정</Button>
        <Button color="#d9534f" hoverColor="#c9302c" delete="true" onClick={handleDelete}>삭제</Button>
      </ActionBar>

      <Title>보고서 상세</Title>
      <Info><span>작성 날짜: </span> {new Date(report.regDate).toLocaleDateString()}</Info>
      <Info><span>제목: </span>{report.title}</Info>
      <Info><span>작성자: </span> {report.writer}</Info>
      <Info><span>상태: </span> {report.check}</Info>
      <Content>{report.content}</Content>

      {/* 하단 확인 버튼 */}
      <ConfirmButtonWrapper>
        <Button onClick={() => alert("확인 처리되었습니다!")}>확인</Button>
      </ConfirmButtonWrapper>

      
    </Container>
  );
}

export default ReportDetail;
