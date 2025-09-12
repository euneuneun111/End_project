import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 6px;
  font-size: 14px;
  color: #333;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const DateInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DateInput = styled.input`
  width: 100%;
  padding: 5px 40px 5px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  height: 38px;
  line-height: 38px;
  box-sizing: border-box;

  &::-webkit-calendar-picker-indicator {
    opacity: 0;
    position: absolute;
    right: 10px;
    cursor: pointer;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    height: 36px;
  }
`;

const CalendarIcon = styled(Calendar)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: #007bff;
  pointer-events: none;

  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
`;

const Input = styled.input`
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  height: 38px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    font-size: 13px;
    height: 36px;
  }
`;

const TextArea = styled.textarea`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;

  @media (max-width: 480px) {
    font-size: 13px;
    min-height: 70px;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
  max-height: 120px;
  overflow-y: auto;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #e2e6ea;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 5px 8px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    gap: 10px;
  }
`;

const Button = styled.button`
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 14px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  color: ${({ disabled, primary }) => (primary ? "white" : "#333")};
  background-color: ${({ disabled, primary }) =>
    primary
      ? disabled
        ? "#a0c4ff"
        : "#007bff"
      : "#f0f0f0"};
  transition: 0.2s;
  &:hover {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.9)};
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 8px 16px;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownHeader = styled.div`
  padding: 5px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f0f2f5;
  }
`;

const Arrow = styled.span`
  display: inline-block;
  margin-left: 8px;
  transition: transform 0.2s ease;
  transform: rotate(${({ open }) => (open ? "180deg" : "0deg")});
`;

export default function MeetingCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    modifiedDate: "",
    meetingDate: "",
    host: "",
    attendees: [],
    meetingTitle: "",
    summary: "",
    details: "",
  });

  const hostOptions = [
    "이민희", "김하설", "최지은", "윤서현", "조민호", "강다은"
  ];
  const attendeeOptions = [...hostOptions];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    setFormData({...formData, [name]: value});
  };

  const handleAttendeeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({...formData, attendees: [...formData.attendees, value]});
    } else {
      setFormData({...formData, attendees: formData.attendees.filter(a=>a!==value)});
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    alert("등록되었습니다!");
    console.log("등록완료", formData);
    navigate("/meeting/Main");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Row>
          <Column>
            <Label>등록일</Label>
            <DateInputWrapper>
              <DateInput type="date" name="modifiedDate" value={formData.modifiedDate} onChange={handleChange} />
              <CalendarIcon />
            </DateInputWrapper>
          </Column>
          <Column>
            <Label>회의일자</Label>
            <DateInputWrapper>
              <DateInput type="date" name="meetingDate" value={formData.meetingDate} onChange={handleChange} />
              <CalendarIcon />
            </DateInputWrapper>
          </Column>
        </Row>

        <Column>
          <Label>주관자</Label>
          <DropdownWrapper ref={dropdownRef}>
            <DropdownHeader onClick={()=>setDropdownOpen(!dropdownOpen)}>
              {formData.host || "선택"}
              <Arrow open={dropdownOpen}>▼</Arrow>
            </DropdownHeader>
            {dropdownOpen && (
              <DropdownList>
                {hostOptions.map(name => (
                  <DropdownItem key={name} onClick={()=>{
                    setFormData({...formData, host: name});
                    setDropdownOpen(false);
                  }}>{name}</DropdownItem>
                ))}
              </DropdownList>
            )}
          </DropdownWrapper>
        </Column>

        <Column>
          <Label>참석자</Label>
          <CheckboxContainer>
            {attendeeOptions.map(name=>(
              <CheckboxLabel key={name}>
                <input type="checkbox" name="attendees" value={name} checked={formData.attendees.includes(name)} onChange={handleAttendeeChange} style={{marginRight:"6px"}}/>
                {name}
              </CheckboxLabel>
            ))}
          </CheckboxContainer>
        </Column>

        <Column>
          <Label>회의명</Label>
          <Input type="text" name="meetingTitle" value={formData.meetingTitle} onChange={handleChange} />
        </Column>

        <Column>
          <Label>회의 개요</Label>
          <TextArea name="summary" value={formData.summary} onChange={handleChange} />
        </Column>

        <Column>
          <Label>회의 내용</Label>
          <TextArea name="details" value={formData.details} onChange={handleChange} />
        </Column>

        <ButtonRow>
          <Button onClick={()=>navigate("/meeting/Main")}>취소</Button>
          <Button primary type="submit" disabled={!isFormValid}>등록</Button>
        </ButtonRow>
      </form>
    </Container>
  );
}
