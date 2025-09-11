import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 480px;
  min-width: 240px;
  margin: 0 auto;
  padding: 16px;
  font-family: "Arial", sans-serif;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Card = styled.div`
  border: 1px solid #4287c4;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  background-color: #4287c4;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  font-size: 16px;
`;

const EditButton = styled.button`
  background-color: white;
  color: #4287c4;
  border: none;
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
`;

const CardContent = styled.div`
  background-color: #f5f5f5;
  padding: 10px 12px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
  border-bottom: solid #e0e0e0;

  i {
    margin-right: 8px;
    color: #555;
  }
`;

/* 모달 배경 */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* 모달 박스 */
const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 320px;
`;

const ModalTitle = styled.h3`
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const SaveButton = styled.button`
  background-color: #4287c4;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: #ddd;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
`;

function MypageMain({ user, projects }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    phone: user?.phone || "",
    email: user?.email || "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log("수정된 값:", formData);
    // TODO: 서버에 저장하는 API 호출 추가 가능
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Title>마이페이지</Title>

      {/* Profile */}
      <Card>
        <CardHeader>
          <span>profile</span>
          <EditButton onClick={() => setIsModalOpen(true)}>수정</EditButton>
        </CardHeader>
        <CardContent>
          <InfoRow>
            <i className="fa-solid fa-user" name="MYPAGE"></i>
            {user?.name}
          </InfoRow>
          <InfoRow>
            <i className="fa-solid fa-envelope" name="email"></i>
            {user?.email}
          </InfoRow>
        </CardContent>
      </Card>

      {/* Project */}
      <Card>
        <CardHeader>project</CardHeader>
        <CardContent>
          <InfoRow>
            <i className="fa-solid fa-calendar" name="CALENDAR"></i>
            <span>일정</span>
          </InfoRow>
          <InfoRow>
            <i className="fa-solid fa-inbox" name="TASK"></i>
            <span>업무보고</span>
          </InfoRow>
          <InfoRow>
            <i className="fa-solid fa-file-lines" name="MEETING"></i>
            <span>회의록</span>
          </InfoRow>
        </CardContent>
      </Card>

      {/* 모달 */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>프로필 수정</ModalTitle>
            <Input
              type="text"
              name="phone"
              placeholder="전화번호"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
            />
            <ModalActions>
              <CancelButton onClick={() => setIsModalOpen(false)}>
                취소
              </CancelButton>
              <SaveButton onClick={handleSave}>저장</SaveButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default MypageMain;
