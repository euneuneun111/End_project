import React from 'react'
import styled from 'styled-components'

const ItemContainer = styled.div`
 width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

& i {
    margin-bottom: 3px;
  }
  & span {
    font-size: 0.8rem;
    font-size: 8px;
  }
  
`;

function NavItem({ icon, name }) {
    return (
        <ItemContainer>
            <i className={icon} style={{ fontSize: '18px', color: '#4287C4', marginBottom: '5px' }}></i>
            <span style={{ color: '#333' }}>{name}</span>
        </ItemContainer>
    );
}

export default NavItem