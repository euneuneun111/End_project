import React from 'react';
import styled from 'styled-components';

// --- Styled Components ---
const EventListContainer = styled.div`
  padding: 0 1.5rem 1.5rem;
`;

const DateHeader = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #555;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const EventItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f4f8;
  border-radius: 8px;
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  border-left: 5px solid ${props => props.color || '#4A90E2'};
  cursor: pointer; 
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #eaf2f8;
  }
`;

const EventInfo = styled.div`
  flex-grow: 1;
  margin-left: 0.8rem;
`;

const EventTitle = styled.div`
  font-weight: 500;
  color: #333;
`;

const EventMemo = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-top: 4px;
`;

const EventTime = styled.div`
  font-size: 0.8rem;
  color: #888;
`;

const NoEventsMessage = styled.p`
    text-align: center;
    color: #999;
    padding: 2rem 0;
`;


// --- Component ---
const EventList = ({ events, selectedDate, onEventSelect }) => {

  const filteredEvents = events.filter(event => {
    const eventStartDate = new Date(event.start);
    return eventStartDate.toDateString() === selectedDate.toDateString();
  });

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(selectedDate);


  return (
    <EventListContainer>
      <DateHeader>{formattedDate}</DateHeader>
      
      {filteredEvents.length > 0 ? (
        filteredEvents.map(event => (
          <EventItem key={event.id} color={event.color} onClick={()=> onEventSelect(event)}>
            <i className="fa-solid fa-users" style={{ color: '#555' }}></i> {/* 예시 아이콘 */}
            <EventInfo>
              <EventTitle>{event.title}</EventTitle>
              {event.calendarContent && <EventMemo>{event.calendarContent}</EventMemo>}
              </EventInfo>
          </EventItem>
        ))
      ) : (
        <NoEventsMessage>등록된 일정이 없습니다.</NoEventsMessage>
      )}

    </EventListContainer>
  );
};

export default EventList;