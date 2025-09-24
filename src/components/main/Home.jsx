import React, { useState, useEffect } from "react";
import styled from "styled-components";
import mobileLogo from "../resource/image/모바일 로고.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 100vh;              /* min-height → height */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;    /* 화면 중앙 정렬 */
  background-color: #fff;
  font-family: "Poppins", sans-serif;
  padding-top: 0;             /* 위쪽 여백 제거 */
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

const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #3a6ea5;
  margin: 0 0 20px 0;
  letter-spacing: 1px;
`;

const SearchBox = styled.input`
  width: 80%;
  max-width: 320px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 20px;
  outline: none;
  &:focus {
    border-color: #3a6ea5;
  }
`;

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
  margin-top: 20px;

  &:hover {
    background-color: #3a6ea5;
  }
`;

const ProjectList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  margin-top: 20px;
  max-height: 200px; /* 리스트 최대 높이 */
  overflow-y: auto;  /* 스크롤 가능 */
`;

const ProjectItem = styled.li`
  padding: 12px 16px;
  margin-bottom: 10px;
  border-radius: 12px;
  border: 1px solid #ddd;
  background: #f9f9f9;
  cursor: pointer;

  &:hover {
    background: #e9f2fb;
  }
`;

function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // 프로젝트 검색
  const fetchProjects = async (query) => {
    if (!query || query.trim() === "") {
      setProjects([]); // 검색어 없으면 리스트 비움
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("/project/org/myproject/api/projects/search", {
        params: { name: query },
      });
      console.log(response.data); // ← 여기 확인
      setProjects(response.data);
    } catch (error) {
      console.error("프로젝트 검색 실패:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // 검색어 변경 시 API 호출
  useEffect(() => {
    fetchProjects(searchTerm);
  }, [searchTerm]);

  return (
    <Container>
      <Logo />
      <Title>LINKED</Title>

      {/* 검색창 */}
      <SearchBox
        type="text"
        placeholder="프로젝트를 검색하세요."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 로딩 상태 */}
      <ProjectList>
        {loading ? (
          <p>검색 중...</p>
        ) : projects.length > 0 ? (
          projects.map((project) => project && (
            <ProjectItem
              key={project.id}
              onClick={() => navigate(`/project/${project.projectId}/main`)}
            >
              {project.projectName || project.name || "이름 없음"}
            </ProjectItem>
          ))
        ) : searchTerm ? (
          <p>검색 결과가 없습니다.</p>
        ) : null}
      </ProjectList>

      {/* 프로젝트 생성 버튼 */}
      <CreateButton onClick={() => navigate("/project/create")}>
        CREATE A PROJECT
      </CreateButton>
    </Container>
  );
}

export default Home;
