import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => (props.active ? '#4287C4' : '#333')}; /* 선택 색상 적용 */
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  padding: 5px;
  min-width: 60px; 
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
    border-radius: 5px;
  }
`;

function HeaderItem({ to, icon, name }) {
  const location = useLocation(); // 현재 경로 확인
  const isActive = location.pathname === to; // 현재 경로와 메뉴 경로 비교

  return (
    <StyledLink to={to} active={isActive ? 1 : 0}>
      <i className={icon} style={{ fontSize: '18px', marginBottom: '4px' }}></i>
      <span>{name}</span>
    </StyledLink>
  );
}

export default HeaderItem;
