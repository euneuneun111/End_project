import React from "react";
import styled from "styled-components";
import mobileLogo from "../resource/image/모바일 로고.png";
import { useNavigate } from "react-router-dom";



const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  font-family: "Poppins", sans-serif;
`;

const Logo = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
  background-image: url(${mobileLogo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

// 프로젝트명
const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #3a6ea5;
  margin: 0 0 20px 0;
  letter-spacing: 1px;
`;

// 검색창
const SearchBox = styled.input`
  width: 80%;
  max-width: 320px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 40px;
  outline: none;
  &:focus {
    border-color: #3a6ea5;
  }
`;

// 버튼
const CreateButton = styled.button`
  background-color: #4287C4;
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.3s;
  text-transform: uppercase;

  &:hover {
    background-color: #3a6ea5;
  }
`;

function Home() {
    const navigate = useNavigate();

  return (
    <Container>
      {/* 로고 아이콘 - SVG로 대체 */}
      <Logo />
      {/* 프로젝트 명 */}
      <Title>LINKED</Title>

      {/* 검색창 */}
      <SearchBox type="text" placeholder="프로젝트를 검색하세요." />

      {/* 프로젝트 생성 버튼 */}
      <CreateButton onClick={() => navigate("/project/create")}>
        CREATE A PROJECT
      </CreateButton>        
      </Container>
  );
}

export default Home;
