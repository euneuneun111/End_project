import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import MyProject from "./MyProject";
import { logout } from "../login/LoginApi";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  max-width: 480px;
  min-width: 240px;
  margin: 0 auto;
  padding: 16px;
  font-family: "Arial", sans-serif;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  font-size: 24px;
  color: #333;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Card = styled.div`
  flex: 0 0 80%; // 카드 하나 폭
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

const LogoutButton = styled.div`
  display: flex;
  justify-content: center;
  //background-color: #e6e6e6;
  color: #000;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 25px;
  text-transform: uppercase;
`

function MypageMain({ user, projects }) {
  const [projectList, setProjectList] = useState([]);
  const [loginUser, setLoginUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: user?.user_id || "",
    name: user?.name || "",
    email: user?.email || "",
    user_pwd: "",
  });

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/project/org/myproject/api/projects', { withCredentials: true });
      // ✅ 배열인지 확인, 아니면 빈 배열로 초기화
      setProjectList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("프로젝트 불러오기 실패:", err);
      setProjectList([]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
  if (isModalOpen && loginUser) {
    setFormData({
      user_id: loginUser.user_id || "",
      name: loginUser.name || "",
      email: loginUser.email || "",
      user_pwd: ""
    });
  }
}, [isModalOpen, loginUser]);

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
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    axios.post("/project/member/modifyApi", formData, { withCredentials: true })
  .then(res => {
    if (res.data.success) {
      alert("수정 완료");
      setLoginUser(res.data.member); // 화면 갱신
      localStorage.setItem("user", JSON.stringify(res.data.member));
      setIsModalOpen(false);
    } else {
      alert("수정 실패: " + res.data.message);
    }
  });
  };

  const handleLogout = async () => {
    const res = await logout();

    if (res.success !== false) {
      alert("로그아웃 되었습니다.");
      navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
    } else {
      alert("로그아웃 실패: " + res.message);
    }
  };

  return (
    <Container>
      <Title>{loginUser?.user_id}의 마이페이지</Title>
      

      {/* Profile */}
      <Card>
        <CardHeader>
          <span>profile</span>
          <EditButton onClick={() => setIsModalOpen(true)}>수정</EditButton>
        </CardHeader>
        <CardContent>
          <InfoRow>
            <i className="fa-solid fa-user" name="MYPAGE"></i>
            {loginUser?.name}
          </InfoRow>
          <InfoRow>
            <i className="fa-solid fa-envelope" name="email"></i>
            {loginUser?.email}
          </InfoRow>
        </CardContent>
      </Card>

      <MyProject projects={projectList}/>

      <LogoutButton type="button" onClick={handleLogout}>logout</LogoutButton>

      {/* 모달 */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>프로필 수정</ModalTitle>
            <Input
              type="text"
              name="name"
              placeholder="이름"
              value={formData.name}
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
              name="user_pwd"
              placeholder="비밀번호"
              value={formData.user_pwd}
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
