import React from 'react'
import { Link } from 'react-router-dom'
import NavItem from "./NavItem"
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  background-color: #4287C4;
  position: relative;
  justify-content: space-around; /* 모바일에서 균등 배치 */
  padding: 5px 0;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 3px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  flex-direction: column; /* 아이콘 위, 텍스트 아래 */
  font-size: 10px; /* 글자 크기 줄임 */
 &:hover {
  background-color: #3690d9; /* 기존 파랑보다 살짝 밝게 */
}
`

function Navbar() {
    return (
        <Container>
            <StyledLink to="/project/main">
                <NavItem icon="fa-solid fa-briefcase" name="PROJECTS"  />
            </StyledLink>
            <StyledLink to="/home">
                <NavItem icon="fa-solid fa-house" name="HOME" />
            </StyledLink>
            <StyledLink to="/mypage/main">
                <NavItem icon="fa-solid fa-user" name="MYPAGE" />
            </StyledLink>
        </Container>
    )
}

export default Navbar