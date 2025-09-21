import React from 'react';
import styled from 'styled-components';
import HeaderItem from './HeaderItem';
import { useParams } from 'react-router-dom';

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  padding: 10px 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SlideContainer = styled.div`
  display: flex;
  gap: 20px;
`;

function ProjectHeader() {
  const { projectId } = useParams(); // URL에서 projectId 추출

  const menuItems = [
    { to: `/issue/main/${projectId}`, icon: 'fa-solid fa-circle-exclamation', name: 'ISSUE' },
    { to: `/gant/main/${projectId}`, icon: 'fa-solid fa-chart-pie', name: 'GANT' },
    { to: `/calendar/main/${projectId}`, icon: 'fa-solid fa-calendar', name: 'CALENDAR' },
    { to: `/task/main/${projectId}`, icon: 'fa-solid fa-box', name: 'TASK' },
    { to: `/report/main/${projectId}`, icon: 'fa-solid fa-pen-to-square', name: 'REPORT' },
    { to: `/meeting/main/${projectId}`, icon: 'fa-solid fa-file-lines', name: 'Meeting' },
  ];

  return (
    <HeaderWrapper>
      <SlideContainer>
        {menuItems.map(item => (
          <HeaderItem key={item.to} to={item.to} icon={item.icon} name={item.name} />
        ))}
      </SlideContainer>
    </HeaderWrapper>
  );
}

export default ProjectHeader;
