import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    date: today,
    author: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("보고 작성 데이터:", form);
    alert("보고가 저장되었습니다!");
    navigate("/report");
  };

  return (
    <Container>
      <Title>보고 수정</Title>
      <Form onSubmit={handleSubmit}>
        <Row>
          <FormGroup>
            <Label>작성 날짜</Label>
            <Input type="date" name="date" value={form.date} readOnly />
          </FormGroup>

          <FormGroup>
            <Label>작성자</Label>
            <Input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </Row>

        <FormGroup>
          <Label>내용</Label>
          <TextArea
            name="content"
            value={form.content}
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
