import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import CalendarWrapper from './CalendarWrapper';
import EventModal from './EventModal';
import CalendarHeader from './CalendarHeader';
import EventList from './EventList';

// ✅ 헤더와 캘린더를 감싸는 카드 스타일을 추가합니다.
const CalendarCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px H20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  overflow: hidden;
`;

function CalendarMain() {
  const calendarRef = useRef(null);
  const [currentDateTitle, setCurrentDateTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const initialEvents = [
      { id: '1', title: '팀 회의', start: '2025-09-08', extendedProps: { memo: '주간 보고 준비' } },
      { id: '2', title: '프로젝트 마감', start: '2025-09-10', end: '2025-09-12' },
    ];
    setEvents(initialEvents);
  }, []);
  
  const handleDatesSet = (newTitle) => {
    setCurrentDateTitle(newTitle);
  };

  const handleDateClick = (arg) => {
    arg.jsEvent.stopPropagation();
    setSelectedDate(arg.date);
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

  return (
    <CalendarCard>
      <CalendarHeader
        calendarRef={calendarRef}
        currentDateTitle={currentDateTitle}
      />
      <CalendarWrapper
        calendarRef={calendarRef}
        events={events}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
        onDatesSet={handleDatesSet}
        selectedDate={selectedDate}
      />
      <EventList events={events} selectedDate={selectedDate} />

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
  );
}

export default CalendarMain;