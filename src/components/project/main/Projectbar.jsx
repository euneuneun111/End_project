import React from 'react'
import styled from 'styled-components'
import NavItem from "./NavItem"
import { Link } from 'react-router-dom'

// Projectbar 컴포넌트를 중앙에 배치하기 위한 Wrapper (새로 추가)
const CenterWrapper = styled.div`
  display: flex; /* 플렉스박스 레이아웃 */
  justify-content: center; /* 가로(수평) 중앙 정렬 */
  align-items: center; /* 세로(수직) 중앙 정렬 */
  min-height: 100vh; /* 화면 전체 높이를 차지하도록 설정 */
  width: 100vw; /* 화면 전체 너비를 차지하도록 설정 */
  
`;


const Container = styled.div`
  width: 90%;
  max-width: 600px; /* 최대 너비 제한 */
  background-color: #fff;
  position: relative; /* 자식 요소에 absolute를 사용한다면 필요 */
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개씩 배치 */
  grid-template-rows: repeat(2, auto); /* 2열로 배치 */
  gap: 10px;
  padding: 15px; 
  border: #4287C4 1px solid;
  border-radius: 10px; /* 모서리를 둥글게 */
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  
  color: #333; 
  padding: 3px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  flex-direction: column; /* 아이콘 위, 텍스트 아래 */
  font-size: 10px; /* 글자 크기 줄임 */
 &:hover {
  background-color: #f0f0f0; /* 배경색에 맞춰 hover 색상 변경 */
  border-radius: 5px; /* hover 시 둥근 모서리 추가 */
}
`

function Projectbar() {
  return (
    <CenterWrapper> 
      <Container>
        <StyledLink to="/issue/Main">
          <NavItem icon="fa-solid fa-circle-exclamation" name="ISSUE" />
        </StyledLink>
        <StyledLink to="/gant/Main">
          <NavItem icon="fa-solid fa-chart-pie" name="GANT" />
        </StyledLink>
        <StyledLink to="/calendar/Main">
          <NavItem icon="fa-solid fa-calendar" name="CALENDAR" />
        </StyledLink>
        <StyledLink to="/task/Main">
          <NavItem icon="fa-solid fa-box" name="TASK" />
        </StyledLink>
        <StyledLink to="/report/Main">
          <NavItem icon="fa-solid fa-pen-to-square" name="REPORT" />
        </StyledLink>
        <StyledLink to="/meeting/Main">
          <NavItem icon="fa-solid fa-file-lines" name="Meeting" />
        </StyledLink>
      </Container>
    </CenterWrapper>
  )
}

export default Projectbar