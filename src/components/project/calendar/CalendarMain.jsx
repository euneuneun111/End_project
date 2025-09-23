import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CalendarWrapper from './CalendarWrapper';
import EventModal from './EventModal';
import CalendarHeader from './CalendarHeader';
import EventList from './EventList';
import ProjectHeader from "../../header/ProjectHeader";
import axios from 'axios';

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
`;

function CalendarMain() {
  const { projectId } = useParams(); // URL에서 projectId 추출
  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [animationClass, setAnimationClass] = useState('');

  // 일정 불러오기
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`/project/main/${projectId}/calendar/api/all`, { withCredentials: true });
      if (Array.isArray(response.data)) {
        setEvents(response.data);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("일정을 불러오는 데 실패했습니다.", error);
      setEvents([]);
    }
  };

  useEffect(() => {
    if (projectId) fetchEvents();
  }, [projectId]);

  // 월 이동 애니메이션
  const handleMonthChange = (direction) => {
    if (animationClass) return;

    if (direction === 'next') {
      setAnimationClass('slide-out-left');
      setTimeout(() => {
        calendarRef.current?.getApi().next();
        setAnimationClass('slide-in-right');
      }, 250);
    }

    if (direction === 'prev') {
      setAnimationClass('slide-out-right');
      setTimeout(() => {
        calendarRef.current?.getApi().prev();
        setAnimationClass('slide-in-left');
      }, 250);
    }

    setTimeout(() => {
      setAnimationClass('');
    }, 500);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    calendarRef.current?.getApi().gotoDate(newDate);
  };

  const handleDatesSet = (dateInfo) => {
    setSelectedDate(dateInfo.view.currentStart);
  };

  const handleDateClick = (arg) => {
    arg.jsEvent.stopPropagation();
    setSelectedDate(arg.date);
    setModalMode('add');
    setSelectedEvent({ start: arg.dateStr });
    setIsModalOpen(true);
  };

  const handleEventClick = (clickInfo) => {
    const eventId = clickInfo.event.id;
    const originalEvent = events.find(event => event.id === eventId);
    if (originalEvent) {
      setModalMode('detail');
      setSelectedEvent(originalEvent);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleModalSubmit = async (eventData) => {
    const calendarDto = {
      calendarId: eventData.id,
      calendarTitle: eventData.title,
      calendarStartDate: eventData.start,
      calendarEndDate: eventData.end,
      calendarContent: eventData.calendarContent 
    };

    try {
      if (calendarDto.calendarId) {
        await axios.put(`/project/main/${projectId}/calendar/update`, calendarDto, { withCredentials: true });
        alert('일정이 성공적으로 수정되었습니다.');
      } else {
        await axios.post(`/project/main/${projectId}/calendar/add`, calendarDto, { withCredentials: true });
        alert('일정이 성공적으로 등록되었습니다.');
      }
      fetchEvents();

    } catch (error) {
      console.error("일정 저장에 실패했습니다.", error);
      alert('일정 저장 중 오류가 발생했습니다.');
    }

    handleCloseModal();
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`/project/main/${projectId}/calendar/${eventId}`, { withCredentials: true });
      alert('일정이 성공적으로 삭제되었습니다.');
      fetchEvents();
    } catch (error) {
      console.error("일정 삭제에 실패했습니다.", error);
      alert('일정 삭제 중 오류가 발생했습니다.');
    }
    handleCloseModal();
  };

  const handleSwitchToEditMode = () => setModalMode('edit');

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
          currentDate={selectedDate}
          onDateChange={handleDateChange}
          onMonthChange={handleMonthChange}
        />
        <CalendarWrapper
          animationClass={animationClass}
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