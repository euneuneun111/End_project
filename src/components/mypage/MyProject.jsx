import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

// ================= styled-components =================
const MyPCard = styled.h2`
  display: flex;
  justify-content: center;
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: -12px;
`;

const ProjectListWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  margin-top: 16px;
  max-height: 430px;
  overflow-y: auto;
  padding-right: 6px;

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
  position: relative; /* X 버튼 위치 위해 relative 설정 */
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

const CloseXButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: #555;

  &:hover {
    color: #000;
  }
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

 button {
  margin-top: 10px;
  padding: 6px 12px;
  background-color: #ff8fa5; /* 부드러운 핑크 */
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ff6292; /* 호버 시 진한 핑크 */
  }
}
`;

// ================= Component =================
function MyProject({ projects }) {
  const [openProjectId, setOpenProjectId] = useState(null);

  const openModal = (projectId) => setOpenProjectId(projectId);
  const closeModal = () => setOpenProjectId(null);

  if (!projects || projects.length === 0) {
    return <p>참여 중인 프로젝트가 없습니다.</p>;
  }

  const handleLeaveProject = async (projectId, projectName) => {
    if (!window.confirm(`정말 "${projectName}" 프로젝트에서 탈퇴하시겠습니까?`)) return;

    try {
      const res = await axios.post(
        `/project/org/myproject/api/leave`,
        { projectId }, // ✅ 여기서 projectId 전달
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("프로젝트 탈퇴 완료");
        closeModal();
        window.location.reload(); // 또는 상태 업데이트로 프로젝트 리스트 갱신
      } else {
        alert("탈퇴 실패: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("탈퇴 중 오류가 발생했습니다.");
    }
  };

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
              <InfoRow><strong>Member:</strong> {project.projectManager}</InfoRow>
              <InfoRow><strong>Description:</strong> {project.projectDesc}</InfoRow>
            </CardContent>

            {/* 모달 */}
            {openProjectId === project.projectId && (
              <ModalOverlay onClick={closeModal}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                  <ModalTitle>{project.projectName}</ModalTitle>
                  <CloseXButton onClick={closeModal}>×</CloseXButton>
                  <ModalLinks>
                    <Link to={`/issue/main/${project.projectId}`}>Issue</Link>
                    <Link to={`/gant/main/${project.projectId}`}>Gantt</Link>
                    <Link to={`/calendar/main/${project.projectId}`}>Calendar</Link>
                    <Link to={`/task/main/${project.projectId}`}>Task</Link>
                    <Link to={`/report/main/${project.projectId}`}>Report</Link>
                    <Link to={`/meeting/main/${project.projectId}`}>Meeting</Link>

                    {/* 프로젝트 탈퇴 버튼 */}
                    <button
                      onClick={() => handleLeaveProject(project.projectId, project.projectName)}
                    >
                      프로젝트 탈퇴
                    </button>
                  </ModalLinks>
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
