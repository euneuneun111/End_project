import React, { useState, useEffect } from "react";
import styled, { keyframes } from 'styled-components';
import ProjectHeader from "../../header/ProjectHeader";
import axios from 'axios';
import CalendarHeader from "../calendar/CalendarHeader"; 


const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

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
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalBox = styled.div`
  background-color: white;
  padding: 25px;
  border-radius: 12px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  animation: ${slideUp} 0.4s ease-out;
`;

const ModalHeader = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
`;

// ---------------- 스타일 (기존 코드에서 변경 없음) ----------------
const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
  font-family: "Poppins", sans-serif;
  background-color: #fafafa;
  min-height: 100vh;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow-x: auto;
  &.slide-out-left { animation: ${slideOutLeft} 0.25s forwards; }
  &.slide-in-right { animation: ${slideInRight} 0.25s forwards; }
  &.slide-out-right { animation: ${slideOutRight} 0.25s forwards; }
  &.slide-in-left { animation: ${slideInLeft} 0.25s forwards; }
`;

const MonthHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ days }) => days}, 40px);
  text-align: center;
  font-size: 13px;
  font-weight: bold;
  color: #111827;
  border-bottom: 1px solid #e5e7eb;
`;

const MonthCell = styled.div`
  grid-column: ${({ start, end }) => `${start} / ${end}`};
  padding: 4px 0;
  background: #f9fafb;
  border-right: 1px solid #e5e7eb;
`;

const CalendarHeader11 = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ days }) => days}, 40px);
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  color: #1f2937;

`;

const CalendarCell = styled.div`
  padding: 4px;
  border-left: 1px solid #e5e7eb;
  &:first-child { border-left: none; }
`;

const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ days }) => days}, 40px);
  text-align: center;
  font-size: 11px;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
`;

const WeekCell = styled.div`
  padding: 2px;
  border-left: 1px solid #f3f4f6;
  &:first-child { border-left: none; }
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ days }) => days}, 40px);
  grid-template-rows: repeat(${({ rows }) => rows}, 40px);
  position: relative;
  border-top: 1px solid #e5e7eb;
`;

const Task = styled.div`
  position: relative;
  border-radius: 4px;
  margin: 6px 0;
  padding: 4px 6px;
  font-size: 11px;
  color: #fff;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  ${({ color }) => `background: ${color};`}
`;

const DetailModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const DetailField = styled.div`
  font-size: 14px;
  & > strong {
    display: inline-block;
    width: 80px;
    color: #555;
  }
`;
const DetailModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;
const OkButton = styled.button`
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  background: #2563eb;
  color: white;
  font-size: 14px;
  cursor: pointer;
  &:hover { background: #1d4ed8; }
`;
const GridLine = styled.div`
  border-right: 1px solid #e5e7eb;
  grid-row: 1 / -1;
  &:last-child {
    border-right: none;
  }
`;

const formatDateForInput = (dateValue) => {
  if (!dateValue) return '';
  const date = new Date(dateValue);
  if (isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function getDateRange(start, end) {
  const s = new Date(start);
  const e = new Date(end);
  const range = [];
  let cur = new Date(s);
  while (cur <= e) {
    range.push(cur.toISOString().slice(0, 10));
    cur.setDate(cur.getDate() + 1);
  }
  return range;
}

function groupMonths(labels) {
    if (!labels || labels.length === 0) return [];
    let months = [];
    let currentMonth = new Date(labels[0]).getMonth();
    let currentYear = new Date(labels[0]).getFullYear();
    let startIdx = 1;
    labels.forEach((date, idx) => {
        const d = new Date(date);
        const month = d.getMonth();
        const year = d.getFullYear();
        if (month !== currentMonth || year !== currentYear) {
            months.push({ name: `${currentYear}년 ${currentMonth + 1}월`, start: startIdx, end: idx + 1 });
            currentMonth = month;
            currentYear = year;
            startIdx = idx + 1;
        }
        if (idx === labels.length - 1) {
            months.push({ name: `${year}년 ${month + 1}월`, start: startIdx, end: idx + 2 });
        }
    });
    return months;
}

function TaskDetailModal({ task, onClose }) {
  if (!task) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalHeader>일감 상세보기</ModalHeader>
        <DetailModalContent>
          <DetailField><strong>일감 ID:</strong> {task.taskId}</DetailField>
          <DetailField><strong>일감 이름:</strong> {task.taskTitle}</DetailField>
          <DetailField><strong>담당자:</strong> {task.taskManagerId}</DetailField>
          <DetailField><strong>시작일:</strong> {formatDateForInput(task.taskStartDate)}</DetailField>
          <DetailField><strong>종료일:</strong> {formatDateForInput(task.taskEndDate)}</DetailField>
          <DetailField><strong>상태:</strong> {task.taskStatus}</DetailField>
          <DetailField><strong>우선순위:</strong> {task.taskUrgency}</DetailField>
        </DetailModalContent>
        <DetailModalFooter>
          <OkButton onClick={onClose}>확인</OkButton>
        </DetailModalFooter>
      </ModalBox>
    </ModalOverlay>
  );
}

  function GanttMain() {
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const projectId = "PJ-001";

  useEffect(() => {
    // ✅ API 호출은 처음 한 번만 하도록 수정
    const fetchAllTasks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/project/main/project/api/${projectId}/tasks/all`, { withCredentials: true });
        setTasks(response.data || []);
      } catch (error) {
        console.error("간트 데이터 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllTasks();
  }, [projectId]);

  // ✅ 현재 월의 시작일과 마지막일 계산
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // ✅ 2. 월 이동 시 화면이 바뀌도록 필터링 로직 추가
  const filteredTasks = tasks.filter(task => {
    if (!task.taskStartDate || !task.taskEndDate) return false;
    const taskStart = new Date(task.taskStartDate);
    const taskEnd = new Date(task.taskEndDate);
    // 태스크 기간이 현재 월과 하루라도 겹치면 표시
    return taskStart <= endOfMonth && taskEnd >= startOfMonth;
  });

  const timeline = {
    start: formatDateForInput(startOfMonth),
    end: formatDateForInput(endOfMonth),
  };

  const labels = getDateRange(timeline.start, timeline.end);
  const days = labels.length;
  const months = groupMonths(labels);
  const getColumnIndex = (date) => labels.indexOf(formatDateForInput(date)) + 1;
  const gridRows = Math.max(tasks.length, 10);
  const [animationClass, setAnimationClass] = useState('');
  

  const handleMonthChange = (direction) => {
    if (animationClass) return;

    const changeMonth = (amount) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + amount);
            return newDate;
        });
    };

    if (direction === 'next') {
        setAnimationClass('slide-out-left');
        setTimeout(() => {
            changeMonth(1); // ✅ 다음 달로 변경
            setAnimationClass('slide-in-right');
        }, 250);
    } else { // 'prev'
        setAnimationClass('slide-out-right');
        setTimeout(() => {
            changeMonth(-1); // ✅ 이전 달로 변경
            setAnimationClass('slide-in-left');
        }, 250);
    }

    setTimeout(() => {
        setAnimationClass('');
    }, 500);
};

  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  if (isLoading) {
    return <Wrapper><ProjectHeader /><p>일감 데이터를 불러오는 중입니다...</p></Wrapper>;
  }

  return (
    <Wrapper>
      <ProjectHeader />
      <CalendarHeader 
        
        currentDate={currentDate}
        onDateChange={handleDateChange}
        onMonthChange={handleMonthChange}
      />

      <Container className={animationClass}>
        <MonthHeader days={days}>
          {months.map((m, idx) => (<MonthCell key={idx} start={m.start} end={m.end}>{m.name}</MonthCell>))}
        </MonthHeader>
        <CalendarHeader11 days={days}>
          {labels.map((date, idx) => (<CalendarCell key={idx}>{new Date(date).getDate()}</CalendarCell>))}
        </CalendarHeader11>
        <WeekHeader days={days}>
          {labels.map((date, idx) => (<WeekCell key={idx}>{["일","월","화","수","목","금","토"][new Date(date).getDay()]}</WeekCell>))}
        </WeekHeader>
        <ChartGrid days={days} rows={Math.max(filteredTasks.length, 10)}>

  {/* ✅ 1. 배경 세로줄 그리기 (이 부분이 추가되었습니다) */}
  {Array.from({ length: days }).map((_, index) => (
    <GridLine key={`line-${index}`} style={{ gridColumn: index + 1 }} />
  ))}

  {/* ✅ 2. 기존 일감(Task) 막대 그리기 (이 부분은 원래 코드입니다) */}
  {filteredTasks.map((task, index) => {
    if (!task.taskStartDate || !task.taskEndDate) return null;
    return (
      <Task
        key={task.taskId}
        color={"#3b82f6"}
        title={`${task.taskTitle} (${formatDateForInput(task.taskStartDate)} ~ ${formatDateForInput(task.taskEndDate)})`}
        onClick={() => setSelectedTask(task)}
        style={{
          gridRow: index + 1,
          gridColumn: `${getColumnIndex(task.taskStartDate)} / span ${getDateRange(task.taskStartDate, task.taskEndDate).length}`
        }}
      >
        {task.taskTitle}
      </Task>
    );
  })}

</ChartGrid>
      </Container>

      {/* ✅ 3. 상세 보기 모달 렌더링 */}
      {selectedTask && <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />}
    </Wrapper>
  );
}

export default GanttMain;