import React from 'react';
import styled, { keyframes } from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const slideOutLeft = keyframes`
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(-20px); opacity: 0; }
`;

const slideInRight = keyframes`
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideOutRight = keyframes`
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(20px); opacity: 0; }
`;

const slideInLeft = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const CalendarWrapperStyled = styled.div`
  padding: 0 1.5rem 1.5rem;

  &.slide-out-left { animation: ${slideOutLeft} 0.25s forwards; }
  &.slide-in-right { animation: ${slideInRight} 0.25s forwards; }
  &.slide-out-right { animation: ${slideOutRight} 0.25s forwards; }
  &.slide-in-left { animation: ${slideInLeft} 0.25s forwards; }
  /* --- 캘린더 내부 요소 스타일링 (Figma 디자인 적용) --- */
  .fc-col-header-cell-cushion {
    color: #888;
    font-size: 0.8rem;
    font-weight: 500;
    text-decoration: none;
  }
  
  .fc-daygrid-day-number {
    color: #333;
    font-size: 0.9rem;
    text-decoration: none;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .fc th, .fc td {
      border-color: #f0f0f0;
  }

  .selected-day .fc-daygrid-day-number {
    background-color: #4A90E2;
    border-radius: 50%;
    color: white !important;
  }

  .fc-day-other .fc-daygrid-day-number {
    color: #ccc;
  }
  
  .fc-day-today.selected-day .fc-daygrid-day-number {
      border: none;
  }
`;

const CalendarWrapper = ({ calendarRef, events, onDateClick, onEventClick, onDatesSet, selectedDate, animationClass }) => {

  const dayCellClassNames = (arg) => {
    if (selectedDate && arg.date.toDateString() === selectedDate.toDateString()) {
      return ['selected-day'];
    }
    return [];
  };

  return (
    <CalendarWrapperStyled className={animationClass}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={false}
        initialView="dayGridMonth"
        aspectRatio={0.78} 
        events={events}
        dateClick={onDateClick}
        eventClick={onEventClick}
        datesSet={(dateInfo) => onDatesSet(dateInfo)}
        dayCellClassNames={dayCellClassNames}
        eventContent={() => <></>}
      />
    </CalendarWrapperStyled>
  );
};

export default CalendarWrapper;