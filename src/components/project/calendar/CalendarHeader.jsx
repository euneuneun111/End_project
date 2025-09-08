import React from 'react';
import styled from 'styled-components';

// ---------- Styled Components (Figma 디자인 적용) ----------
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1rem; /* 상하 여백을 늘리고 좌우 여백을 살짝 줄임 */
  border-bottom: 1px solid #f0f0f0;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer; /* 클릭 가능하다는 느낌을 줌 */
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.8rem; /* 제목을 훨씬 크게 */
  font-weight: 700; /* 굵게 */
  color: #222;
`;

// 아이콘 버튼 스타일
const NavButton = styled.button`
  border: none;
  background-color: transparent;
  color: #333;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;

  &:hover {
    color: #000;
  }
`;

// ---------- Component ----------
const CalendarHeader = ({ calendarRef, currentDateTitle }) => {

  const goToNext = () => calendarRef.current?.getApi().next();
  const goToPrev = () => calendarRef.current?.getApi().prev();

  return (
    <HeaderContainer>
      {/* 왼쪽 이전 달 버튼 */}
      <NavButton onClick={goToPrev}>
        <i className="fa-solid fa-chevron-left"></i>
      </NavButton>

      {/* 중앙 제목 + 드롭다운 아이콘 */}
      <TitleWrapper>
        <Title>{currentDateTitle}</Title>
        <i className="fa-solid fa-chevron-down" style={{ fontSize: '1rem', color: '#555' }}></i>
      </TitleWrapper>
      
      {/* 오른쪽 다음 달 버튼 */}
      <NavButton onClick={goToNext}>
        <i className="fa-solid fa-chevron-right"></i>
      </NavButton>
    </HeaderContainer>
  );
};

export default CalendarHeader;