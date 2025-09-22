import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// ================= Styled Components =================
const Container = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  font-family: "Poppins", sans-serif;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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

const Row = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
`;

const Column = styled.div`
  flex: 1;
`;

const DateInputWrapper = styled.div`
  position: relative;
`;

const DateInput = styled(Input).attrs({ type: "date" })``;

const CalendarIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownHeader = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f8f9fa;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownList = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  z-index: 10;
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Arrow = styled.span`
  font-size: 12px;
  transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0)")};
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 14px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: 0.2s;
  min-width: 80px;

  background-color: ${({ primary, disabled }) =>
    primary ? (disabled ? "#89b5fd" : "#a0c4ff") : "#f0f0f0"};
  color: ${({ primary }) => (primary ? "#fff" : "#333")};

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.9)};
  }
`;

// ================= Component =================
export default function MeetingCreate() {
  const { projectId } = useParams(); // URL에서 projectId 가져오기
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    modifiedDate: "",
    meetingDate: "",
    host: "",
    attendees: [],
    meetingTitle: "",
    summary: "",
    details: "",
  });

  const [hostOptions, setHostOptions] = useState([]);
  const [attendeeOptions, setAttendeeOptions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ✅ API 인스턴스는 projectId를 알고 난 뒤 생성
  const api = axios.create({
    baseURL: `/project/organization/${projectId}/meeting`,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  // 유저 목록 불러오기
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        if (res.data && Array.isArray(res.data)) {
          setHostOptions(res.data);
          setAttendeeOptions(res.data);
        }
      } catch (err) {
        console.error("사용자 목록 불러오기 실패:", err);
      }
    };
    fetchUsers();
  }, [projectId]);

  // 드롭다운 외부 클릭 처리
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAttendeeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, attendees: [...formData.attendees, value] });
    } else {
      setFormData({
        ...formData,
        attendees: formData.attendees.filter((a) => a !== value),
      });
    }
  };

  const isFormValid =
    formData.modifiedDate &&
    formData.meetingDate &&
    formData.host &&
    formData.attendees.length > 0 &&
    formData.meetingTitle &&
    formData.summary &&
    formData.details;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const payload = {
        meetingDate: formData.meetingDate,
        author: formData.host,
        attend: formData.attendees.join(","),
        title: formData.meetingTitle,
        overview: formData.summary,
        content: formData.details,
        modifiedDate: formData.modifiedDate,
        projectId: projectId,
      };

      const res = await api.post(`/api/regist`, payload); // ✅ POST 경로 수정
      if (res.status === 200 || res.status === 201) {
        alert("회의가 등록되었습니다.");
        navigate(`/meeting/main/${projectId}`);
      }
    } catch (error) {
      console.error("회의 등록 실패:", error);
      alert("회의 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Row>
          <Column>
            <Label>등록일</Label>
            <DateInputWrapper>
              <DateInput
                name="modifiedDate"
                value={formData.modifiedDate}
                onChange={handleChange}
              />
              <CalendarIcon />
            </DateInputWrapper>
          </Column>
          <Column>
            <Label>회의일자</Label>
            <DateInputWrapper>
              <DateInput
                name="meetingDate"
                value={formData.meetingDate}
                onChange={handleChange}
              />
              <CalendarIcon />
            </DateInputWrapper>
          </Column>
        </Row>

        <Column>
          <Label>주관자</Label>
          <DropdownWrapper ref={dropdownRef}>
            <DropdownHeader onClick={() => setDropdownOpen(!dropdownOpen)}>
              {formData.host || "선택"}
              <Arrow open={dropdownOpen}>▼</Arrow>
            </DropdownHeader>
            {dropdownOpen && (
              <DropdownList>
                {hostOptions.map((name) => (
                  <DropdownItem
                    key={name}
                    onClick={() => {
                      setFormData({ ...formData, host: name });
                      setDropdownOpen(false);
                    }}
                  >
                    {name}
                  </DropdownItem>
                ))}
              </DropdownList>
            )}
          </DropdownWrapper>
        </Column>

        <Column>
          <Label>참석자</Label>
          <CheckboxContainer>
            {attendeeOptions.map((name) => (
              <CheckboxLabel key={name}>
                <input
                  type="checkbox"
                  name="attendees"
                  value={name}
                  checked={formData.attendees.includes(name)}
                  onChange={handleAttendeeChange}
                  style={{ marginRight: "6px" }}
                />
                {name}
              </CheckboxLabel>
            ))}
          </CheckboxContainer>
        </Column>

        <Column>
          <Label>회의명</Label>
          <Input
            type="text"
            name="meetingTitle"
            value={formData.meetingTitle}
            onChange={handleChange}
          />
        </Column>

        <Column>
          <Label>회의 개요</Label>
          <TextArea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
          />
        </Column>

        <Column>
          <Label>회의 내용</Label>
          <TextArea
            name="details"
            value={formData.details}
            onChange={handleChange}
          />
        </Column>

        <ButtonRow>
          <Button onClick={() => navigate(`/meeting/main/${projectId}`)}>
            취소
          </Button>
          <Button primary type="submit" disabled={!isFormValid}>
            등록
          </Button>
        </ButtonRow>
      </form>
    </Container>

  );
}
