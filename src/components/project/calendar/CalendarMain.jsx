import React, { useState, useEffect, useRef } from 'react';
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
  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [animationClass, setAnimationClass] = useState('');

  // ✅ 1. 서버에서 모든 일정을 가져오는 함수
  const fetchEvents = async () => {
    try {
      const response = await axios.get('/project/main/calendar/all', { 
        withCredentials: true // ✅ GET 요청에 쿠키 포함
      });
      // ✅ 서버로부터 받은 데이터가 배열인지 확인합니다.
    if (Array.isArray(response.data)) {
      setEvents(response.data); // 배열이 맞으면 상태를 업데이트합니다.
    } else {
      console.error("서버로부터 배열 형태의 데이터를 받지 못했습니다:", response.data);
      setEvents([]); // 배열이 아니면 빈 배열로 초기화하여 오류를 방지합니다.
    }
  } catch (error) {
    console.error("일정을 불러오는 데 실패했습니다.", error);
    setEvents([]); // 에러 발생 시에도 빈 배열로 초기화
  }
};

  // ✅ 기존 useEffect 내용을 fetchEvents() 호출로 교체
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleMonthChange = (direction) => {
    // 현재 애니메이션이 진행 중이면 중복 실행 방지
    if (animationClass) return;

    // 'next' 버튼 클릭 시
    if (direction === 'next') {
      setAnimationClass('slide-out-left'); // 사라지는 애니메이션
      
      setTimeout(() => {
        calendarRef.current?.getApi().next(); // 실제 캘린더 월 변경
        setAnimationClass('slide-in-right'); // 나타나는 애니메이션
      }, 250); // 애니메이션 시간과 일치
    }

    // 'prev' 버튼 클릭 시
    if (direction === 'prev') {
      setAnimationClass('slide-out-right'); // 사라지는 애니메이션

      setTimeout(() => {
        calendarRef.current?.getApi().prev(); // 실제 캘린더 월 변경
        setAnimationClass('slide-in-left'); // 나타나는 애니메이션
      }, 250); // 애니메이션 시간과 일치
    }
    
    // 애니메이션 클래스 초기화 (다음 클릭을 위해)
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
  
  // ✅ 2. 일정 추가/수정 핸들러 (서버 통신)
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
        await axios.put('/project/main/calendar/update', calendarDto, { withCredentials: true });
        alert('일정이 성공적으로 수정되었습니다.'); // ✅ 수정 완료 알림
      } else {
        await axios.post('/project/main/calendar', calendarDto, { withCredentials: true });
        alert('일정이 성공적으로 등록되었습니다.'); // ✅ 등록 완료 알림
      }
      fetchEvents();
    } catch (error) {
      console.error("일정 저장에 실패했습니다.", error);
      alert('일정 저장 중 오류가 발생했습니다.'); //  실패 알림
    }
    handleCloseModal();
  };
  
  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`/project/main/calendar/${eventId}`, { withCredentials: true });
      alert('일정이 성공적으로 삭제되었습니다.'); // ✅ 삭제 완료 알림
      fetchEvents();
    } catch (error) {
      console.error("일정 삭제에 실패했습니다.", error);
      alert('일정 삭제 중 오류가 발생했습니다.'); // 실패 알림
    }
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