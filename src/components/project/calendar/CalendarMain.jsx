import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import CalendarWrapper from './CalendarWrapper';
import EventModal from './EventModal';
import CalendarHeader from './CalendarHeader';
import EventList from './EventList';
import ProjectHeader from "../../header/ProjectHeader";
const Container = styled.div`
  width: 100%;
  padding: 16px;
  font-family: "Poppins", sans-serif;
  background-color: #fafafa;
  min-height: 100vh;
  box-sizing: border-box;
`;
const CalendarCard = styled.div`
  background-color: white;
  border-radius: 12px;
  /* box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); */
  /* border: 1px solid #f0f0f0; */
  
`;

function CalendarMain() {
  const calendarRef = useRef(null);
  
  // ✅ 'selectedDate'를 유일한 날짜 상태로 사용합니다.
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const initialEvents = [
      { id: '1', title: '팀 회의', start: '2025-09-08', extendedProps: { memo: '주간 보고 준비' } },
      { id: '2', title: '프로젝트 마감', start: '2025-09-10', end: '2025-09-13' }, // 12일까지 보이도록 수정
    ];
    setEvents(initialEvents);
  }, []);

  // ✅ 헤더의 DatePicker에서 날짜를 선택했을 때
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    calendarRef.current?.getApi().gotoDate(newDate);
  };
  
  // ✅ 이전/다음 버튼으로 월을 변경했을 때
  const handleDatesSet = (dateInfo) => {
    setSelectedDate(dateInfo.view.currentStart);
  };

  // ✅ 캘린더의 날짜 칸을 클릭했을 때
  const handleDateClick = (arg) => {
    arg.jsEvent.stopPropagation();
    setSelectedDate(arg.date); // 유일한 날짜 상태를 업데이트
    setModalMode('add');
    setSelectedEvent({ start: arg.dateStr });
    setIsModalOpen(true);
  };

  const handleEventClick = (clickInfo) => {
    setModalMode('detail');
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr,
      ...clickInfo.event.extendedProps,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };
  
  const handleModalSubmit = (eventData) => {
    if (eventData.id) {
      setEvents(events.map(event => event.id === eventData.id ? { ...event, ...eventData } : event));
    } else {
      const newEvent = { id: String(Date.now()), ...eventData };
      setEvents([...events, newEvent]);
    }
    handleCloseModal();
  };
  
  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    handleCloseModal();
  };

  const handleSwitchToEditMode = () => {
    setModalMode('edit');
  };

  const handleEventListSelect = (event) => {
    setModalMode('detail');
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <Container>
    <ProjectHeader />

    <CalendarCard>
      <CalendarHeader
        calendarRef={calendarRef}
        currentDate={selectedDate}
        onDateChange={handleDateChange}
      />
      <CalendarWrapper
        calendarRef={calendarRef}
        events={events}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
        onDatesSet={handleDatesSet}
        selectedDate={selectedDate}
      />
      <EventList 
      events={events} 
      selectedDate={selectedDate} 
      onEventSelect={handleEventListSelect}
      />

      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleModalSubmit}
          onDelete={handleDeleteEvent}
          onSwitchToEdit={handleSwitchToEditMode}
          mode={modalMode}
          initialData={selectedEvent}
        />
      )}
    </CalendarCard>
    </Container>
  );
}

export default CalendarMain;