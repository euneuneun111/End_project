import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #f0f0f0;

`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
  color: #222;
  min-width: 250px;
  text-align: center;
`;

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
const DatePickerWrapper = styled.div`
  position: relative;
  z-index: 10;
`;


const CalendarHeader = ({ calendarRef, currentDate, onDateChange }) => {

  const goToNext = () => calendarRef.current?.getApi().next();
  const goToPrev = () => calendarRef.current?.getApi().prev();

  return (
    <HeaderContainer>
      <NavButton onClick={goToPrev}>
        <i className="fa-solid fa-chevron-left"></i>
      </NavButton>

      <DatePickerWrapper>
      <DatePicker
        selected={currentDate}
        onChange={onDateChange}
        dateFormat="MMMM, yyyy" 
        showMonthYearPicker 
        customInput={ 
          <TitleWrapper>
            <Title>{new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate)}</Title>
            <i className="fa-solid fa-chevron-down" style={{ fontSize: '1rem', color: '#555' }}></i>
          </TitleWrapper>
        }
      />
      </DatePickerWrapper>
      
      <NavButton onClick={goToNext}>
        <i className="fa-solid fa-chevron-right"></i>
      </NavButton>
    </HeaderContainer>
  );
};

export default CalendarHeader;