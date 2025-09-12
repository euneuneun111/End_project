import React, { useState } from "react";
import styled from "styled-components";
import ProjectHeader from "../../header/ProjectHeader";


// ---------------- 스타일 (기존 코드에서 변경 없음) ----------------
const Wrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
`;

const FixedButton = styled.button`
  margin-left:20px;
  position: sticky;
  top: 10px;
  z-index: 10;
  margin-bottom: 12px;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: #3b82f6;
  color: white;
  font-size: 13px;
  cursor: pointer;
  &:hover { background: #2563eb; }
`;

const Container = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow-x: auto;
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

const CalendarHeader = styled.div`
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

// ---------------- 모달 (여기부터 수정) ----------------
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달이 다른 요소들 위에 확실히 뜨도록 z-index 높임 */
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 320px; /* 모달 너비를 좀 더 확보 */
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);

  /* ✅ Flexbox를 사용하여 내부 요소들을 세로로 정렬하고 간격 부여 */
  display: flex;
  flex-direction: column;
  gap: 12px; /* 요소들 사이의 간격 */
`;

const ModalHeader = styled.h3`
  margin-top: 0;
  margin-bottom: 5px; /* 제목 아래 여백 줄임 */
  color: #333;
  font-size: 1.2em;
  border-bottom: 1px solid #eee; /* 제목 아래 구분선 추가 */
  padding-bottom: 10px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column; /* 기본적으로 세로 정렬 */
  gap: 8px; /* 입력 필드들 사이의 간격 */
`;

const Input = styled.input`
  width: 100%; /* 너비를 100%로 설정하여 가득 채움 */
  padding: 8px 10px; /* 패딩 조정 */
  border: 1px solid #d1d5db;
  border-radius: 5px; /* 둥근 모서리 */
  font-size: 14px;
  box-sizing: border-box; /* 패딩이 너비에 포함되도록 */

  /* 날짜 타입 인풋 아이콘 위치 조정 */
  &[type="date"] {
    position: relative;
    padding-right: 35px; /* 달력 아이콘 공간 확보 */
  }
`;

const ColorInput = styled.input`
  width: 100%;
  height: 38px; /* 높이를 Input과 비슷하게 맞춤 */
  border: 1px solid #d1d5db; /* 테두리 추가 */
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end; /* 버튼들을 오른쪽으로 정렬 */
  gap: 8px; /* 버튼들 사이의 간격 */
  margin-top: 10px; /* 상단 여백 추가 */
`;

const ModalButton = styled.button`
  padding: 8px 15px; /* 패딩 조정 */
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease; /* 호버 효과 부드럽게 */
  
  background: ${({ cancel, danger }) => 
    cancel ? "#9ca3af" : danger ? "#dc2626" : "#3b82f6"};
  
  &:hover {
    background: ${({ cancel, danger }) => 
      cancel ? "#6b7280" : danger ? "#b91c1c" : "#2563eb"};
  }
`;

// ---------------- 헬퍼 (동일) ----------------
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

// ---------------- 메인 컴포넌트 ----------------
function GanttMain() {
  const timeline = { start: "2025-09-01", end: "2025-10-31" };
  const labels = getDateRange(timeline.start, timeline.end);
  const days = labels.length;

  const months = groupMonths(labels);

  const [tasks, setTasks] = useState([
    { id: 1, name: "디자인 작업", start: "2025-09-02", end: "2025-09-10", row: 1, color: "#ef4444" },
    { id: 2, name: "프론트엔드 개발", start: "2025-09-08", end: "2025-09-25", row: 2, color: "#3b82f6" },
    { id: 3, name: "백엔드 개발", start: "2025-09-12", end: "2025-10-05", row: 3, color: "#10b981" },
    { id: 4, name: "QA 테스트", start: "2025-10-06", end: "2025-10-15", row: 4, color: "#f97316" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const [form, setForm] = useState({
    name: "",
    start: "",
    end: "",
    row: 1,
    color: "#3b82f6"
  });

  const getColumnIndex = (date) => labels.indexOf(date) + 1;

  const openNewTaskModal = () => {
    setForm({ name: "", start: "", end: "", row: tasks.length + 1, color: "#3b82f6" });
    setEditTask(null);
    setShowModal(true);
  };

  const openEditTaskModal = (task) => {
    setForm(task);
    setEditTask(task);
    setShowModal(true);
  };

  const saveTask = () => {
    if (!form.name || !form.start || !form.end) return alert("모든 필드를 입력하세요.");
    if (new Date(form.start) > new Date(form.end)) return alert("시작일은 종료일보다 빨라야 합니다.");

    if (editTask) {
      setTasks(tasks.map(t => t.id === editTask.id ? { ...form, id: editTask.id } : t));
    } else {
      setTasks([...tasks, { ...form, id: Date.now() }]);
    }

    setShowModal(false);
    setEditTask(null);
  };

  const deleteTask = () => {
    if (!editTask) return;
    if (window.confirm("정말로 이 작업을 삭제하시겠습니까?")) {
        setTasks(tasks.filter(t => t.id !== editTask.id));
        setShowModal(false);
        setEditTask(null);
    }
  };

  const maxRow = tasks.reduce((max, task) => Math.max(max, parseInt(task.row, 10)), 0);
  const gridRows = Math.max(maxRow, 6);

  return (

    <Wrapper>
            <ProjectHeader />

      <FixedButton onClick={openNewTaskModal}>간트 생성</FixedButton>

      <Container>
        <MonthHeader days={days}>
          {months.map((m, idx) => (
            <MonthCell key={idx} start={m.start} end={m.end}>
              {m.name}
            </MonthCell>
          ))}
        </MonthHeader>

        <CalendarHeader days={days}>
          {labels.map((date, idx) => (
            <CalendarCell key={idx}>{new Date(date).getDate()}</CalendarCell>
          ))}
        </CalendarHeader>

        <WeekHeader days={days}>
          {labels.map((date, idx) => (
            <WeekCell key={idx}>
              {["일","월","화","수","목","금","토"][new Date(date).getDay()]}
            </WeekCell>
          ))}
        </WeekHeader>

        <ChartGrid days={days} rows={gridRows}>
          {tasks.map(task => (
            <Task
              key={task.id}
              color={task.color}
              onClick={() => openEditTaskModal(task)}
              style={{
                gridRow: task.row,
                gridColumn: `${getColumnIndex(task.start)} / span ${getDateRange(task.start, task.end).length}`
              }}
            >
              {task.name}
            </Task>
          ))}
        </ChartGrid>
      </Container>
      
        {/* 모달 */}
        {showModal && (
        <ModalOverlay>
            <ModalBox>
            <ModalHeader>{editTask ? "작업 수정" : "간트 생성"}</ModalHeader> {/* 스타일 컴포넌트로 변경 */}
            <InputGroup> {/* 입력 필드를 그룹화 */}
                <Input
                    placeholder="작업명"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <Input
                    type="date"
                    value={form.start}
                    onChange={e => setForm({ ...form, start: e.target.value })}
                />
                <Input
                    type="date"
                    value={form.end}
                    onChange={e => setForm({ ...form, end: e.target.value })}
                />
                <Input
                    type="number"
                    min="1"
                    placeholder="행(Row) 번호"
                    value={form.row}
                    onChange={e => setForm({ ...form, row: parseInt(e.target.value, 10) || 1 })}
                />
                <ColorInput
                    type="color"
                    value={form.color}
                    onChange={e => setForm({ ...form, color: e.target.value })}
                />
            </InputGroup>
            <ButtonGroup> {/* 버튼들을 그룹화 */}
                <ModalButton onClick={saveTask}>{editTask ? "수정" : "추가"}</ModalButton>
                {editTask && <ModalButton danger onClick={deleteTask}>삭제</ModalButton>}
                <ModalButton cancel onClick={() => setShowModal(false)}>취소</ModalButton>
            </ButtonGroup>
            </ModalBox>
        </ModalOverlay>
        )}
    </Wrapper>
  );
}

export default GanttMain;