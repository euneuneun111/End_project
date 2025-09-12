import React, { useState } from "react";
import styled from "styled-components";
import ProjectHeader from "../../header/ProjectHeader";


// 컨테이너
const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow-x: auto;
  margin: 0 auto;
`;

// 상단 달력 (숫자 날짜)
const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ days }) => days}, 1fr);
  text-align: center;
  font-size: 11px;
  font-weight: bold;
  color: #1f2937;
`;

const CalendarCell = styled.div`
  padding: 4px;
  border-left: 1px solid #e5e7eb;
  &:first-child {
    border-left: none;
  }
`;

// 주 단위 라벨 (M T W T F S S)
const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ days }) => days}, 1fr);
  text-align: center;
  font-size: 11px;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
`;

const WeekCell = styled.div`
  padding: 2px;
  border-left: 1px solid #f3f4f6;
  &:first-child {
    border-left: none;
  }
`;

// 간트 차트 영역
const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ days }) => days}, 1fr);
  grid-template-rows: repeat(6, 40px);
  position: relative;
  border-top: 1px solid #e5e7eb;
  border-left: 1px solid #e5e7eb;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      to right,
      transparent,
      transparent calc(100%/${({ days }) => days} - 1px),
      #f3f4f6 calc(100%/${({ days }) => days})
    );
    pointer-events: none;
  }
`;


const Task = styled.div`
  position: relative;
  border-radius: 4px;
  margin: 6px 0;
  padding: 4px 6px;
  font-size: 11px;
  color: #fff;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${({ color }) => `
    background: ${color};
  `}
`;

function dateDiffInDays(start, end) {
  const s = new Date(start);
  const e = new Date(end);
  return Math.floor((e - s) / (1000 * 60 * 60 * 24)) + 1;
}

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

function GanttMain() {
  // 전체 기간 (9월 한 달 예시)
  const timeline = { start: "2025-09-01", end: "2025-09-30" };
  const labels = getDateRange(timeline.start, timeline.end);
  const days = labels.length;

  const tasks = [
    { id: 1, name: "기획", start: "2025-09-01", end: "2025-09-04", row: 1, color: "#3b82f6" },
    { id: 2, name: "디자인", start: "2025-09-05", end: "2025-09-10", row: 2, color: "#22c55e" },
    { id: 3, name: "개발", start: "2025-09-07", end: "2025-09-20", row: 3, color: "#f97316" },
    { id: 4, name: "테스트", start: "2025-09-15", end: "2025-09-25", row: 4, color: "#a855f7" },
  ];

  const getColumnIndex = (date) => {
    return labels.indexOf(date) + 1;
  };

  return (
    <Container>
            <ProjectHeader />

      {/* 상단 달력 숫자 */}
      <CalendarHeader days={days}>
        {labels.map((date, idx) => (
          <CalendarCell key={idx}>{new Date(date).getDate()}</CalendarCell>
        ))}
      </CalendarHeader>

      {/* 요일 */}
      <WeekHeader days={days}>
        {labels.map((date, idx) => (
          <WeekCell key={idx}>
            {["S", "M", "T", "W", "T", "F", "S"][new Date(date).getDay()]}
          </WeekCell>
        ))}
      </WeekHeader>

      {/* 간트 바 */}
      <ChartGrid days={days}>
        {tasks.map(task => (
          <Task
            key={task.id}
            color={task.color}
            style={{
              gridRow: task.row,
              gridColumn: `${getColumnIndex(task.start)} / ${getColumnIndex(task.end) + 1}`
            }}
          >
            {task.name}
          </Task>
        ))}
      </ChartGrid>
    </Container>
  );
}

export default GanttMain;