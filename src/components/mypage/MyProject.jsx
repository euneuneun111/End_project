import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// ================= styled-components =================
const MyPCard = styled.h2`
  display: flex;
  justify-content: center;
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: -12px;
`

const ProjectListWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  margin-top: 16px;
  max-height: 430px;   /* 스크롤 영역 높이 */
  overflow-y: auto;
  padding-right: 6px;

  /* 스크롤바 디자인 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bbb;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f5f5f5;
  }
`;

const ProjectCard = styled.div`
  border: 1px solid #75b7f0;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  background-color: #75b7f0;  
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  font-size: 16px;
`;

const ShortcutButton = styled.button`
  background: white;
  color: #4287c4;
  border: none;
  border-radius: 12px;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 12px;
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
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 4px;

  strong {
    margin-right: 6px;
    color: #000;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  min-width: 280px;
  max-width: 400px;
`;

const ModalTitle = styled.h3`
  margin-bottom: 16px;
  font-size: 18px;
  color: #333;
`;

const ModalLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  a {
    color: #4287c4;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CloseButton = styled.button`
  margin-top: 16px;
  background: #4287c4;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
`;

// ================= Component =================
function MyProject({ projects }) {
  const [openProjectId, setOpenProjectId] = useState(null);

  const openModal = (projectId) => setOpenProjectId(projectId);
  const closeModal = () => setOpenProjectId(null);

  if (!projects || projects.length === 0) {
    return <p>참여 중인 프로젝트가 없습니다.</p>;
  }

  return (
    <>
    <MyPCard>내 프로젝트</MyPCard>
    <ProjectListWrapper>
      {projects.map((project) => (
        <ProjectCard key={project.projectId}>
          <CardHeader>
            {project.projectName}
            <ShortcutButton onClick={() => openModal(project.projectId)}>
              바로가기
            </ShortcutButton>
          </CardHeader>
          <CardContent>
            <InfoRow><strong>Project ID: </strong> {project.projectId}</InfoRow>
            <InfoRow>
              <strong>Start Date:</strong>{" "}
              {new Date(project.projectStartDate).toLocaleDateString()}
            </InfoRow>
            <InfoRow><strong>Manager:</strong> {project.projectManager}</InfoRow>
            <InfoRow><strong>Description:</strong> {project.projectDesc}</InfoRow>
          </CardContent>

          {/* 모달 */}
          {openProjectId === project.projectId && (
            <ModalOverlay onClick={closeModal}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalTitle>{project.projectName} 바로가기</ModalTitle>
                <ModalLinks>
                  <Link  to={`/issue/main/${project.projectId}`}>Issue</Link>
                  <Link to={`/gant/main/${project.projectId}`}>Gantt</Link>
                  <Link to={`/calendar/main/${project.projectId}`}>Calendar</Link>
                  <Link to={`/task/main/${project.projectId}`}>Task</Link>
                  <Link to={`/report/main/${project.projectId}`}>Report</Link>
                  <Link to={`/meeting/main/${project.projectId}`}>Meeting</Link>
                </ModalLinks>
                <CloseButton onClick={closeModal}>닫기</CloseButton>
              </ModalContent>
            </ModalOverlay>
          )}
        </ProjectCard>
      ))}
    </ProjectListWrapper>
    </>
  );
}

export default MyProject;
