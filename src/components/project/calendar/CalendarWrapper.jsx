import React from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const CalendarWrapperStyled = styled.div`
  padding: 0 1.5rem 1.5rem;

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

const CalendarWrapper = ({ calendarRef, events, onDateClick, onEventClick, onDatesSet, selectedDate }) => {

  const dayCellClassNames = (arg) => {
    if (selectedDate && arg.date.toDateString() === selectedDate.toDateString()) {
      return ['selected-day'];
    }
    return [];
  };

  return (
    <CalendarWrapperStyled>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={false}
        initialView="dayGridMonth"
        aspectRatio={0.78} 
        events={events}
        dateClick={onDateClick}
        eventClick={onEventClick}
        
        // ✅ 부모에게 dateInfo 객체 전체를 전달하도록 수정
        datesSet={(dateInfo) => onDatesSet(dateInfo)}
        
        dayCellClassNames={dayCellClassNames}
        eventContent={() => <></>}
      />
    </CalendarWrapperStyled>
  );
};

export default CalendarWrapper;