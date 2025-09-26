import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";   // ✅ axios 추가

const Container = styled.div`
  width: 95%;
  max-width: 600px;
  margin: 40px auto;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.05);
  font-family: 'Poppins', sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  color: #4287c4;
`;

const CloseButton = styled.button`
  position: absolute;
  left: 0;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: #666;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ImageUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FileButton = styled.button`
  padding: 10px 16px;
  border-radius: 12px;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  width: fit-content;

  &:hover {
    opacity: 0.9;
  }
`;

const ImagePreviewWrapper = styled.div`
  width: 40%;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  min-height: 150px;
  padding: 10px;
  border: 1px dashed #ccc;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const ImagePreview = styled.img`
  width: 200px;
  height: 150px;
  border-radius: 12px;
  object-fit: cover;
  border: 1px solid #ccc;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 100px 10px 14px; 
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    border-color: #4287c4;
    box-shadow: 0 0 6px rgba(66, 135, 196, 0.2);
    outline: none;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const AddButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  height: 80%;
  padding: 0 16px;
  border-radius: 10px;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
  width: 100%;
  box-sizing: border-box;
`;

const MemberList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-height: 40px;
`;

// ✅ 본인 닉네임 강조 스타일
const MemberItem = styled.div`
  padding: 6px 12px;
  border-radius: 12px;
  background-color: ${(props) => (props.$isCurrentUser ? "#4287c4" : "#e6f0ff")};
  color: ${(props) => (props.$isCurrentUser ? "#fff" : "#0366d6")};
  font-weight: 500;
`;

// JSX에서 사용할 때


const SubmitButton = styled.button`
  padding: 14px;
  border-radius: 12px;
  border: none;
  background-color: #4287c4;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

function ProjectCreate() {
  const [form, setForm] = useState({ name: "", description: "" });
  const [nickname, setNickname] = useState("");
  const [members, setMembers] = useState([]);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState(null);

  // ✅ 로그인 사용자 체크
  useEffect(() => {
    axios
      .get("/project/commons/check-session", { withCredentials: true })
      .then((res) => {
        if (res.data.authenticated) {
          setLoginUser(res.data.user);
          // ✅ 로그인 사용자 닉네임을 기본 멤버로 추가
          if (!members.includes(res.data.user.name)) {
            setMembers([res.data.user.name]);
          }
        } else {
          alert("로그인이 필요합니다.");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("세션 확인 실패:", err);
        alert("로그인 확인 중 오류가 발생했습니다.");
        navigate("/login");
      });
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ 닉네임 추가 (서버 검증 포함)
  const handleAddMember = async () => {
    if (!nickname.trim()) return;

    try {
      const res = await axios.get(
        `/project/member/api/members/check-name?name=${encodeURIComponent(
          nickname.trim()
        )}`
      );

      // 서버에서 { available: true/false } 반환
      if (res.data.available) {
        alert("존재하지 않는 닉네임입니다."); // 사용 가능 = DB에 없음
        return;
      }

      if (members.includes(nickname.trim())) {
        alert("이미 추가된 멤버입니다.");
        return;
      }

      setMembers([...members, nickname.trim()]);
      setNickname("");
    } catch (err) {
      console.error("닉네임 확인 오류:", err);
      alert("닉네임 확인 중 오류가 발생했습니다.");
    }
  };


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...filePreviews]);
    setImageFiles([...imageFiles, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("projectName", form.name);
    formData.append("projectDesc", form.description);
    formData.append("projectManager", members.join(","));

    imageFiles.forEach((file) => {
      formData.append("projectLogo", file);
    });

    try {
      const response = await fetch("/project/org/myproject/api/create", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        alert("프로젝트가 성공적으로 생성되었습니다!");
        navigate(-1);
      } else {
        alert("프로젝트 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Header>
        <CloseButton onClick={() => navigate(-1)}>×</CloseButton>
        <Title>프로젝트 생성</Title>
      </Header>

      <Form onSubmit={handleSubmit}>
        {/* 이미지 업로드 */}
        <ImageUploadWrapper>
          <ImagePreviewWrapper>
            {images.length === 0 && (
              <span style={{ color: "#ccc" }}>이미지 미리보기</span>
            )}
            {images.map((src, i) => (
              <ImagePreview key={i} src={src} alt={`preview-${i}`} />
            ))}
          </ImagePreviewWrapper>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FileButton
              type="button"
              onClick={() => fileInputRef.current.click()}
            >
              이미지 선택
            </FileButton>
          </div>
          <HiddenFileInput
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </ImageUploadWrapper>

        {/* 프로젝트 이름 */}
        <Input
          type="text"
          name="name"
          placeholder="프로젝트 이름"
          value={form.name}
          onChange={handleChange}
          required
        />

        {/* 프로젝트 설명 */}
        <TextArea
          name="description"
          placeholder="프로젝트 설명"
          value={form.description}
          onChange={handleChange}
          required
        />

        {/* 멤버 추가 */}
        <InputWrapper>
          <Input
            type="text"
            placeholder="닉네임 입력"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <AddButton type="button" onClick={handleAddMember}>
            추가
          </AddButton>
        </InputWrapper>

        {/* 멤버 목록 */}
        <MemberList>
          {members.map((m, i) => (
            <MemberItem key={i} $isCurrentUser={loginUser && m === loginUser.name}>
              {m}
            </MemberItem>
          ))}
        </MemberList>

        <SubmitButton type="submit">프로젝트 생성</SubmitButton>
      </Form>
    </Container>
  );
}

export default ProjectCreate;
