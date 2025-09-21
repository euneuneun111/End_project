import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavItem from "./NavItem";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  min-height: 100vh; 
  width: 100vw; 
  gap: 20px;
`;

const Container = styled.div`
  width: 90%;
  max-width: 600px; 
  background-color: #fff;
  position: relative; 
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  grid-template-rows: repeat(2, auto); 
  gap: 10px;
  padding: 15px; 
  border: #4287C4 1px solid;
  border-radius: 10px; 
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333; 
  padding: 3px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  flex-direction: column; 
  font-size: 10px; 
  &:hover {
    background-color: #f0f0f0;
    border-radius: 5px;
  }
`;

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: '1px solid #ccc',
    borderRadius: '6px',
    minHeight: '36px',
  }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
};

function Projectbar() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/project/org/myproject/api/projects', { withCredentials: true });
      // ✅ 배열인지 확인, 아니면 빈 배열로 초기화
      setProjects(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("프로젝트 불러오기 실패:", err);
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ 안전하게 map 처리
  const projectOptions = Array.isArray(projects)
    ? projects.map(proj => ({
        value: proj.projectId,
        label: proj.projectName
      }))
    : [];

  const handleProjectChange = (selected) => {
    setSelectedProject(selected);
  };

  const projectId = selectedProject?.value;

  return (
    <CenterWrapper>
      <Select
        options={projectOptions}
        value={selectedProject}
        onChange={handleProjectChange}
        styles={customStyles}
        placeholder="프로젝트 선택..."
      />

      <Container>
        <StyledLink to={projectId ? `/issue/Main/${projectId}` : '/issue/Main'}>
          <NavItem icon="fa-solid fa-circle-exclamation" name="ISSUE" />
        </StyledLink>
        <StyledLink to={projectId ? `/gant/Main/${projectId}` : '/gant/Main'}>
          <NavItem icon="fa-solid fa-chart-pie" name="GANT" />
        </StyledLink>
        <StyledLink to={projectId ? `/calendar/Main/${projectId}` : '/calendar/Main'}>
          <NavItem icon="fa-solid fa-calendar" name="CALENDAR" />
        </StyledLink>
        <StyledLink to={projectId ? `/task/Main/${projectId}` : '/task/Main'}>
          <NavItem icon="fa-solid fa-box" name="TASK" />
        </StyledLink>
        <StyledLink to={projectId ? `/report/Main/${projectId}` : '/report/Main'}>
          <NavItem icon="fa-solid fa-pen-to-square" name="REPORT" />
        </StyledLink>
        <StyledLink to={projectId ? `/meeting/Main/${projectId}` : '/meeting/Main'}>
          <NavItem icon="fa-solid fa-file-lines" name="MEETING" />
        </StyledLink>
      </Container>
    </CenterWrapper>
  );
}

export default Projectbar;
