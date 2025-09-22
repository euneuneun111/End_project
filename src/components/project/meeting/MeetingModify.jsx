import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Calendar } from "lucide-react";

export default function MeetingCreate() {
  const navigate = useNavigate();
  const { projectId } = useParams(); // URL에서 projectId 가져오기
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
  const dropdownRef = useRef(null);

  // ✅ 프로젝트별 유저 목록 가져오기
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `/project/organization/${projectId}/meeting/users`, 
          { withCredentials: true }
        );
        if (res.data && Array.isArray(res.data)) {
          setHostOptions(res.data);
          setAttendeeOptions(res.data);
        }
      } catch (err) {
        console.error("사용자 목록 불러오기 실패:", err);
      }
    };
    if (projectId) fetchUsers();
  }, [projectId]);

  // 드롭다운 외부 클릭
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
      setFormData({ ...formData, attendees: formData.attendees.filter(a => a !== value) });
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
        modifiedDate: formData.modifiedDate,
        meetingDate: formData.meetingDate,
        author: formData.host,
        attend: formData.attendees.join(","),
        title: formData.meetingTitle,
        overview: formData.summary,
        content: formData.details,
        projectId,
      };

      const res = await axios.post(
        `/project/organization/${projectId}/meeting/regist`, 
        payload, 
        { withCredentials: true }
      );

      if (res.status === 200 || res.status === 201) {
        alert("회의가 등록되었습니다.");
        navigate(`/meeting/Main/${projectId}`);
      }
    } catch (err) {
      console.error("회의 등록 실패:", err);
      alert("회의 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {/* 수정일 / 회의일자 */}
        {/* 주관자 Dropdown */}
        <DropdownWrapper ref={dropdownRef}>
          <DropdownHeader onClick={() => setDropdownOpen(!dropdownOpen)}>
            {formData.host || "선택"}
            <Arrow open={dropdownOpen}>▼</Arrow>
          </DropdownHeader>
          {dropdownOpen && (
            <DropdownList>
              {hostOptions.map((name) => (
                <DropdownItem key={name} onClick={() => {
                  setFormData({ ...formData, host: name });
                  setDropdownOpen(false);
                }}>{name}</DropdownItem>
              ))}
            </DropdownList>
          )}
        </DropdownWrapper>

        {/* 참석자 Checkbox */}
        {attendeeOptions.map((name) => (
          <CheckboxLabel key={name}>
            <input 
              type="checkbox" 
              value={name} 
              checked={formData.attendees.includes(name)}
              onChange={handleAttendeeChange} 
            />
            {name}
          </CheckboxLabel>
        ))}

        {/* 회의명, 개요, 내용 */}
        {/* 버튼 */}
      </form>
    </Container>
  );
}
