import React, { useState } from 'react';
import styled from 'styled-components';
import ProjectHeader from "../../header/ProjectHeader";


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 480px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 12px;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #333;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #888;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #444;
`;

const FormInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;

const FormTextarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
`;

const FormSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const SaveButton = styled.button`
  background-color: #22c55e;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background-color: #16a34a;
  }
`;

const DeleteButton = styled.button`
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background-color: #dc2626;
  }
`;

function NewTaskModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    status: "",
    description: "",
    priority: "",
    assignee: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (

    <ModalOverlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>새 일감 생성</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <FormGroup>
          <FormLabel>일감 이름</FormLabel>
          <FormInput name="title" value={form.title} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <FormLabel>일감 설명</FormLabel>
          <FormTextarea name="description" value={form.description} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <FormLabel>일감 상태</FormLabel>
          <FormSelect name="status" value={form.status} onChange={handleChange}>
            <option value="">선택</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="In review">In review</option>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>우선순위</FormLabel>
          <FormSelect name="priority" value={form.priority} onChange={handleChange}>
            <option value="">선택</option>
            <option value="Critical">Critical</option>
            <option value="Moderate">Moderate</option>
            <option value="Minor">Minor</option>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>담당자</FormLabel>
          <FormSelect name="assignee" value={form.assignee} onChange={handleChange}>
            <option value="">선택</option>
            <option value="홍길동">홍길동</option>
            <option value="김철수">김철수</option>
          </FormSelect>
        </FormGroup>

        <ModalFooter>
          <SaveButton onClick={handleSubmit}>+ 등록</SaveButton>
          <DeleteButton onClick={onClose}>× 취소</DeleteButton>
        </ModalFooter>
      </ModalWrapper>
    </ModalOverlay>
  );
}


function TaskDetailModal({ task, onClose, onUpdate, onDelete }) {
  const [form, setForm] = useState(task);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>일감 상세보기</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <FormGroup>
          <FormLabel>일감 이름</FormLabel>
          <FormInput name="title" value={form.title} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <FormLabel>일감 설명</FormLabel>
          <FormTextarea name="description" value={form.description} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <FormLabel>일감 상태</FormLabel>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FormSelect name="status" value={form.status} onChange={handleChange}>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="In review">In review</option>
            </FormSelect>
          </div>
        </FormGroup>

        <FormGroup>
          <FormLabel>우선순위</FormLabel>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FormSelect name="priority" value={form.priority} onChange={handleChange}>
              <option value="Critical">Critical</option>
              <option value="Moderate">Moderate</option>
              <option value="Minor">Minor</option>
            </FormSelect>
          </div>
        </FormGroup>

        <FormGroup>
          <FormLabel>담당자</FormLabel>
          <FormSelect name="assignee" value={form.assignee} onChange={handleChange}>
            <option value="홍길동">홍길동</option>
            <option value="김철수">김철수</option>
          </FormSelect>
        </FormGroup>

        <ModalFooter>
          <SaveButton onClick={() => onUpdate(form)}>✔ 수정</SaveButton>
          <DeleteButton onClick={() => onDelete(task.id)}>🗑 삭제</DeleteButton>
        </ModalFooter>
      </ModalWrapper>
    </ModalOverlay>
  );
}

// --- 컨테이너 (고정 크기 412 x 915) ---
const Container = styled.div`
  background-color: #f4f7fa;
  width: 412px;
  height: 915px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  font-family: 'Pretendard', sans-serif;
`;

// --- header ---
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
`;

const SearchInput = styled.input`
  padding: 8px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  width: 120px;
  font-size: 13px;
`;

const NewTaskButton = styled.button`
  background-color: #7c3aed;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
`;

// --- task list ---
const TaskItemRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  border-bottom: 1px solid #f1f5f9;
`;

const TaskTopLine = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin-right: 10px;
`;

const TaskInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
`;

const TaskId = styled.span`
  color: #64748b;
  font-weight: 500;
  font-size: 13px;
`;

const TaskTitle = styled.span`
  color: #1e293b;
  font-weight: 500;
  font-size: 14px;
`;

const TaskBottomLine = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  padding-left: 28px;
  gap: 8px;
`;

const StatusPill = styled.span`
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
  margin-left: 8px;
`;

const PriorityPill = styled(StatusPill)``;


const PageButton = styled.button`
  width: 28px;
  height: 28px;
  border: 1px solid #e2e8f0;
  background-color: ${({ active }) => (active ? '#7c3aed' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#334155')};
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  
  &:disabled {
    color: #94a3b8;
  }
`;

// --- 스타일 헬퍼 ---
const getStatusStyle = (status) => {
  switch (status) {
    case 'Ongoing': return { color: '#4f46e5', bgColor: '#e0e7ff' };
    case 'Completed': return { color: '#16a34a', bgColor: '#dcfce7' };
    case 'In review': return { color: '#c2410c', bgColor: '#ffedd5' };
    default: return { color: '#64748b', bgColor: '#f8fafc' };
  }
};

const getPriorityStyle = (priority) => {
  switch (priority) {
    case 'Critical': return { color: '#dc2626', bgColor: '#fee2e2' };
    case 'Moderate': return { color: '#2563eb', bgColor: '#dbeafe' };
    case 'Minor': return { color: '#65a30d', bgColor: '#ecfccb' };
    default: return { color: '#64748b', bgColor: '#f8fafc' };
  }
};

const ContentWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  height: 100%;  /* 전체 높이를 채움 */
`;

// --- task list (스크롤 가능 영역) ---
const TaskListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

// --- pagination (고정 하단) ---
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 10px 0;
  border-top: 1px solid #f1f5f9;
  background: #fff;
  position: sticky;
  bottom: 60px;   /* 리스트 하단 고정 */
`;
// --- 메인 ---
function TaskMain() {
  const [tasks, setTasks] = useState([
    { id: 'TSK-1', title: '샘플 작업', status: 'Ongoing', priority: 'Moderate', description: '샘플 설명', assignee: '홍길동' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // ✅ 새 일감 추가
  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: `TSK-${tasks.length + 1}` }]);
    setIsModalOpen(false);
  };

  // ✅ 일감 수정
  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setSelectedTask(null);
  };

  // ✅ 일감 삭제
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setSelectedTask(null);
  };

  return (
    <>
      <Container>
        <ProjectHeader />

        <ContentWrapper>
          <Header>
            <TitleSection>
              <Title>일감</Title>
              <SearchInput placeholder="일감 검색" />
            </TitleSection>
            <NewTaskButton onClick={() => setIsModalOpen(true)}>+ 새 일감</NewTaskButton>
          </Header>

          <TaskListWrapper>
            {tasks.map((task) => (
              <TaskItemRow key={task.id} onClick={() => setSelectedTask(task)}>
                <TaskTopLine>
                  <TaskInfo>
                    <TaskId>{task.id}</TaskId>
                    <TaskTitle>{task.title}</TaskTitle>
                  </TaskInfo>
                </TaskTopLine>

                {/* ✨ 상태/우선순위 표시 */}
                <TaskBottomLine>
                  <StatusPill
                    color={getStatusStyle(task.status).color}
                    bgColor={getStatusStyle(task.status).bgColor}
                  >
                    {task.status}
                  </StatusPill>
                  <PriorityPill
                    color={getPriorityStyle(task.priority).color}
                    bgColor={getPriorityStyle(task.priority).bgColor}
                  >
                    {task.priority}
                  </PriorityPill>
                </TaskBottomLine>
              </TaskItemRow>
            ))}
          </TaskListWrapper>
        </ContentWrapper>
      </Container>

      {/* 새 일감 모달 */}
      {isModalOpen && <NewTaskModal onClose={() => setIsModalOpen(false)} onSave={handleAddTask} />}

      {/* 상세보기 모달 */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      )}
    </>
  );
}




export default TaskMain;