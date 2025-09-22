import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const MemberItem = styled.div`
  padding: 6px 12px;
  border-radius: 12px;
  background-color: #e6f0ff;
  color: #0366d6;
  font-weight: 500;
`;

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
  const [imageFiles, setImageFiles] = useState([]); // 실제 파일 객체
  const fileInputRef = React.useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddMember = () => {
    if (!nickname.trim()) return;
    if (members.includes(nickname.trim())) return;
    setMembers([...members, nickname.trim()]);
    setNickname("");
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map(file => URL.createObjectURL(file));
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
      formData.append("projectLogo", file); // 서버에서 DTO에 맞게 처리
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
        <ImageUploadWrapper>
          <ImagePreviewWrapper>
            {images.length === 0 && <span style={{ color: "#ccc" }}>이미지 미리보기</span>}
            {images.map((src, i) => (
              <ImagePreview key={i} src={src} alt={`preview-${i}`} />
            ))}
          </ImagePreviewWrapper>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FileButton type="button" onClick={() => fileInputRef.current.click()}>
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

        <Input
          type="text"
          name="name"
          placeholder="프로젝트 이름"
          value={form.name}
          onChange={handleChange}
          required
        />

        <TextArea
          name="description"
          placeholder="프로젝트 설명"
          value={form.description}
          onChange={handleChange}
          required
        />

        <InputWrapper>
          <Input
            type="text"
            placeholder="닉네임 입력"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <AddButton type="button" onClick={handleAddMember}>추가</AddButton>
        </InputWrapper>

        <MemberList>
          {members.map((m, i) => (
            <MemberItem key={i}>{m}</MemberItem>
          ))}
        </MemberList>

        <SubmitButton type="submit">프로젝트 생성</SubmitButton>
      </Form>
    </Container>
  );
}

export default ProjectCreate;