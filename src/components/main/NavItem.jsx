import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & i {
    font-size: 2rem;
    margin-bottom: 3px;
  }
  & span {
    font-size: 0.8rem;
  }
`

function NavItem({ icon, name }) {
  return (
    <Container>
      <i className={icon} style={{ fontSize: '18px' }}></i>
      <span>{name}</span>
    </Container>
  )
}

export default NavItem