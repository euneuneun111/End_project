import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "Poppins", sans-serif;
  background-color: #fff;
`;

const LogoImage = styled.img`
  margin-top: 20px;
  border-radius: 8px;
`;

const JoinButton = styled.button`
  margin-top: 30px;
  padding: 12px 28px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #4287c4;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #3a6ea5;
  }
`;

function ProjectMain() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get("/project/org/myproject/api/detail", {
          params: { projectId },
        });
        setProject(res.data);

        if (res.data.projectLogo) {
          const logoRes = await axios.get(
            `/project/org/myproject/api/getLogo?projectId=${projectId}`,
            { responseType: "blob" }
          );
          const url = URL.createObjectURL(logoRes.data);
          setLogoUrl(url);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();

    return () => {
      if (logoUrl) URL.revokeObjectURL(logoUrl);
    };
  }, [projectId]);

  const handleJoin = async () => {
    try {
      // 참여 API 호출 예시
      const res = await axios.post("/project/org/myproject/api/join", { projectId }, { withCredentials: true });
      alert(res.data.message || "프로젝트에 참여했습니다!");
    } catch (err) {
      console.error(err);
      alert("참여에 실패했습니다.");
    }
  };

  if (loading) return <Container><p>로딩중...</p></Container>;
  if (!project) return <Container><p>프로젝트를 찾을 수 없습니다.</p></Container>;

  return (
    <Container>
      <h1>{project.projectName}</h1>
      <p>{project.projectDesc}</p>
      <p>멤버: {project.projectManager}</p>
      {logoUrl && <LogoImage src={logoUrl} alt="프로젝트 로고" width={200} />}
      <JoinButton onClick={handleJoin}>참여하기</JoinButton>
    </Container>
  );
}

export default ProjectMain;
