import React from 'react';
import styled from 'styled-components';
import HeaderItem from './HeaderItem';

// 헤더 Wrapper
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

// 슬라이드 메뉴 컨테이너
const SlideContainer = styled.div`
  display: flex;
  gap: 20px;
`;

function ProjectHeader({ projectId }) {
  const menuItems = [
    { to: `/issue/${projectId}`, icon: 'fa-solid fa-circle-exclamation', name: 'ISSUE' },
    { to: `/gant/${projectId}`, icon: 'fa-solid fa-chart-pie', name: 'GANT' },
    { to: `/calendar/${projectId}`, icon: 'fa-solid fa-calendar', name: 'CALENDAR' },
    { to: `/task/${projectId}`, icon: 'fa-solid fa-box', name: 'TASK' },
    { to: `/report/${projectId}`, icon: 'fa-solid fa-pen-to-square', name: 'REPORT' },
    { to: `/meeting/${projectId}`, icon: 'fa-solid fa-file-lines', name: 'Meeting' },
  ];

  return (
    <HeaderWrapper>
      <SlideContainer>
        {menuItems.map((item) => (
          <HeaderItem key={item.to} to={item.to} icon={item.icon} name={item.name} />
        ))}
      </SlideContainer>
    </HeaderWrapper>
  );
}

export default ProjectHeader;
