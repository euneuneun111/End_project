import React from "react";
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

const ProjectRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-top: 1px solid #ddd;
  font-size: 14px;

  &:first-child {
    border-top: none;
  }

  i {
    margin-right: 8px;
    color: #555;
  }
`;

const ManageButton = styled.button`
  background-color: #4287c4;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
`;

const NavItem = styled.div``

function MypageMain({ user, projects }) {
  return (
    <Container>
      <Title>마이페이지</Title>

      {/* Profile */}
      <Card>
        <CardHeader>
          <span>profile</span>
          <EditButton>수정</EditButton>
        </CardHeader>
        <CardContent>
          <InfoRow>
            <i className="fa-solid fa-user" name="MYPAGE"></i>
            {/*{user.name}*/}
          </InfoRow>
          <InfoRow>
            <i className="fa-solid fa-envelope" name="email"></i>
            {/*{user.email}*/}
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
    </Container>
  );
}

export default MypageMain;
