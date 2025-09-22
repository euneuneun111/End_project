import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate,useParams } from "react-router-dom";
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
function ReportCreate() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const { projectId } = useParams();
  const [loginUser, setLoginUser] = useState(null);

  const [form, setForm] = useState({
    regDate: today,
    writer: "",
    content: "",
    title:"",
    reportDate: today,
  });

  useEffect(() => {
    axios.get("/project/commons/check-session", { withCredentials: true })
      .then(res => {
        if (res.data.authenticated) {
          setLoginUser(res.data.user);
        } else {
          setLoginUser(null);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitForm = { ...form, writer: loginUser?.user_id };

    try {
      const response = await axios.post(
        `/project/organization/${projectId}/report/api/regist`, //백엔드 URL
        submitForm, //JSON 전송
        {
          headers: {"Content-Type":"application/json"},
        }
      );
      console.log("서버응답:",response.data);
      alert("보고가 저장되었습니다.");
      navigate(`/report/Main/${projectId}`);
      console.log(form)
    } catch (err) {
      console.error("보고 저장 실패:",err);
      alert("보고 저장 중 오류 발생");
    }
  };

  return (
    <Container>
      <Title>보고 작성</Title>
      <Form onSubmit={handleSubmit}>
        <Row>
          <FormGroup>
            <Label>작성 날짜</Label>
            <Input type="regDate" name="regDate" value={form.regDate} readOnly />
          </FormGroup>

          <FormGroup>
            <Label>작성자</Label>
            <Input
              type="text"
              name="writer"
              value={loginUser?.user_id || ""}
              onChange={handleChange}
              required
              readOnly
            />
          </FormGroup>
        </Row>

        <FormGroup>
          <Label>제목</Label>
          <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

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
          <Button type="button" cancel="true" onClick={() => navigate(`/report/Main/${projectId}`)}>
            취소
          </Button>
          <Button type="submit">저장</Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
}

export default ReportCreate;
