import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  font-family: "Poppins", sans-serif;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #3a6ea5;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
`;

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 6px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 160px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.cancel ? "#bbb" : "#4287c4")};
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 24px;
  cursor: pointer;
  transition: background 0.25s ease;

  &:hover {
    background-color: ${(props) => (props.cancel ? "#999" : "#2f5f8a")};
  }
`;

// ✅ Component
function ReportModify() {
  const { id } = useParams();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=> {
    const fetchReport = async () => {
      try {
        const response = await axios.get("/project/organization/report/detail",{
          params: {rno:id},
          headers: {Accept : "application/json"},
        });
        setReport(response.data);
      } catch (err){
        console.error("데이터 가져오기 실패:", err);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  if(loading) return <div>로딩 중...</div>;
  if(error) return <div>{error}</div>;
  if(!report) return <div>보고서를 찾을 수 없습니다.</div>;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { reportDate, ...sendData } = report; // reportDate 제거
      const response = await axios.post(
        "/project/organization/report/modify",
        sendData,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data === "success"){
        alert("보고가 수정되었습니다!");
        navigate("/report/Main");
      }
    } catch (err) {
      console.log("report 보내기 전:",report);
      console.error("보고 수정 실패:", err);
      alert("수정 중 오류 발생");
    }
  };

  return (
    <Container>
      <Title>보고 수정</Title>
      <Form onSubmit={handleSubmit}>
        <Row>
          <FormGroup>
            <Label>작성 날짜</Label>
            <Input type="date" name="regDate" value={report.regDate ? new Date(report.regDate).toISOString().split("T")[0] : ""} readOnly />
          </FormGroup>

          <FormGroup>
            <Label>작성자</Label>
            <Input
              type="text"
              name="writer"
              value={report.writer || ""}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </Row>

        <FormGroup>
            <Label>제목</Label>
            <Input
              type="text"
              name="title"
              value={report.title || ""}
              onChange={handleChange}
              required
            />
          </FormGroup>

        <FormGroup>
          <Label>내용</Label>
          <TextArea
            name="content"
            value={report.content || ""}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <ButtonGroup>
          <Button type="button" cancel onClick={() => navigate("/report/Main")}>
            취소
          </Button>
          <Button type="submit">수정</Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
}

export default ReportModify;
