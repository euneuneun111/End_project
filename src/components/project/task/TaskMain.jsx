import React from 'react';
import { useState, useEffect } from 'react';
import ProjectHeader from "../../header/ProjectHeader";
import axios from 'axios';
import Pagination from './Pagination';
import { useParams } from 'react-router-dom';
import Select from 'react-select'; // react-select import
import styled, { keyframes } from 'styled-components';

// --- 애니메이션 Keyframes ---
const fadeIn = keyframes` from { opacity: 0; } to { opacity: 1; } `;
const slideUp = keyframes` from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } `;
const slideOutLeft = keyframes` from { transform: translateX(0); opacity: 1; } to { transform: translateX(-20px); opacity: 0; } `;
const slideInRight = keyframes` from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } `;
const slideOutRight = keyframes` from { transform: translateX(0); opacity: 1; } to { transform: translateX(20px); opacity: 0; } `;
const slideInLeft = keyframes` from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } `;

// --- react-select 옵션 및 스타일 (이슈 파트와 동일) ---
const statusOptions = [
  { value: '진행 중', label: '진행 중' },
  { value: '완료', label: '완료' },
  { value: '검토 중', label: '검토 중' },
  { value: '대기 중', label: '대기 중' },
];

const urgencyOptions = [
  { value: '긴급', label: '긴급' },
  { value: '높음', label: '높음' },
  { value: '보통', label: '보통' },
  { value: '낮음', label: '낮음' },
];

const managerOptions = [ // 담당자 목록은 필요에 따라 동적으로 받아올 수 있습니다.
  { value: 'mimi', label: 'mimi' },
  { value: 'cheolsu', label: 'cheolsu' },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: '1px solid #ccc',
    borderRadius: '6px',
    padding: '2px',
    fontSize: '14px',
    boxShadow: 'none',
    '&:hover': { borderColor: '#888' }
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#7c3aed' : state.isFocused ? '#f3e8ff' : 'white',
    color: state.isSelected ? 'white' : '#333',
    fontSize: '14px',
  }),
  menu: (provided) => ({ ...provided, zIndex: 1001 })
};

// --- Helper 함수 ---
const formatDateForInput = (dateValue) => {
  if (!dateValue) return '';
  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (error) {
    return '';
  }
};

// --- 모달 공통 스타일 ---
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
  animation: ${fadeIn} 0.3s ease-out;
`;
const ModalWrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 480px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: ${slideUp} 0.4s ease-out;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 12px;
  margin-bottom: 20px;
  h2 { margin: 0; font-size: 18px; font-weight: 700; color: #333; }
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
  &:hover { background-color: #16a34a; }
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
  &:hover { background-color: #dc2626; }
`;

// --- 모달 컴포넌트 ---
function NewTaskModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    taskTitle: "",
    taskDescription: "",
    taskStatus: "대기 중",
    taskUrgency: "보통",
    taskManagerId: "",
    taskStartDate: "",
    taskEndDate: "",
    taskProgress: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setForm({ ...form, [actionMeta.name]: selectedOption.value });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeader><h2>새 일감 생성</h2><CloseButton onClick={onClose}>&times;</CloseButton></ModalHeader>
        <FormGroup>
          <FormLabel>일감 이름</FormLabel>
          <FormInput name="taskTitle" value={form.taskTitle} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>일감 설명</FormLabel>
          <FormTextarea name="taskDescription" value={form.taskDescription} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>일감 상태</FormLabel>
          <Select name="taskStatus" styles={customStyles} options={statusOptions} onChange={handleSelectChange} value={statusOptions.find(opt => opt.value === form.taskStatus)} />
        </FormGroup>
        <FormGroup>
          <FormLabel>시작일</FormLabel>
          <FormInput type="date" name="taskStartDate" value={form.taskStartDate} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>종료일</FormLabel>
          <FormInput type="date" name="taskEndDate" value={form.taskEndDate} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>우선순위</FormLabel>
          <Select name="taskUrgency" styles={customStyles} options={urgencyOptions} onChange={handleSelectChange} value={urgencyOptions.find(opt => opt.value === form.taskUrgency)} />
        </FormGroup>
        <FormGroup>
          <FormLabel>담당자</FormLabel>
          <Select name="taskManagerId" styles={customStyles} options={managerOptions} onChange={handleSelectChange} placeholder="담당자 선택..." />
        </FormGroup>
        <FormGroup>
          <FormLabel>진행도: {form.taskProgress || 0}%</FormLabel>
          <FormInput type="range" name="taskProgress" min="0" max="100" step="10" value={form.taskProgress || 0} onChange={handleChange} />
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
  useEffect(() => { setForm(task); }, [task]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setForm({ ...form, [actionMeta.name]: selectedOption.value });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeader><h2>일감 상세보기</h2><CloseButton onClick={onClose}>&times;</CloseButton></ModalHeader>
        <FormGroup><FormLabel>일감 이름</FormLabel><FormInput name="taskTitle" value={form.taskTitle} onChange={handleChange} /></FormGroup>
        <FormGroup><FormLabel>일감 설명</FormLabel><FormTextarea name="taskDescription" value={form.taskDescription} onChange={handleChange} /></FormGroup>
        <FormGroup><FormLabel>담당자</FormLabel>
          <Select name="taskManagerId" styles={customStyles} options={managerOptions} onChange={handleSelectChange} value={managerOptions.find(opt => opt.value === form.taskManagerId)} />
        </FormGroup>
        <FormGroup>
          <FormLabel>시작일</FormLabel>
          <FormInput type="date" name="taskStartDate" value={formatDateForInput(form.taskStartDate)} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>종료일</FormLabel>
          <FormInput type="date" name="taskEndDate" value={formatDateForInput(form.taskEndDate)} onChange={handleChange} />
        </FormGroup>
        <FormGroup><FormLabel>일감 상태</FormLabel>
          <Select name="taskStatus" styles={customStyles} options={statusOptions} onChange={handleSelectChange} value={statusOptions.find(opt => opt.value === form.taskStatus)} />
        </FormGroup>
        <FormGroup><FormLabel>우선순위</FormLabel>
          <Select name="taskUrgency" styles={customStyles} options={urgencyOptions} onChange={handleSelectChange} value={urgencyOptions.find(opt => opt.value === form.taskUrgency)} />
        </FormGroup>
        <FormGroup>
          <FormLabel>진행도: {form.taskProgress || 0}%</FormLabel>
          <FormInput type="range" name="taskProgress" min="0" max="100" step="10" value={form.taskProgress || 0} onChange={handleChange} />
        </FormGroup>
        <ModalFooter>
          <SaveButton onClick={() => onUpdate(form)}>✔ 수정</SaveButton>
          <DeleteButton onClick={() => onDelete(task.taskId)}>🗑 삭제</DeleteButton>
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

const ProgressBarContainer = styled.div`
  width: 100px;
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: #3b82f6;
  transition: width 0.3s ease;
`;

const ProgressText = styled.span`
  font-size: 12px;
  color: #475569;
  font-weight: 500;
  width: 40px; /* 너비를 고정하여 정렬을 맞춤 */
  text-align: right;
`;

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
    case '진행 중': return { color: '#4f46e5', bgColor: '#e0e7ff' };
    case '완료': return { color: '#16a34a', bgColor: '#dcfce7' };
    case '검토 중': return { color: '#9333ea', bgColor: '#f3e8ff' };
    case '대기 중': return { color: '#c2410c', bgColor: '#ffedd5' };
    default: return { color: '#64748b', bgColor: '#f8fafc' };
  }
};

const getPriorityStyle = (priority) => {
  switch (priority) {
    case '긴급': return { color: '#dc2626', bgColor: '#fee2e2' };
    case '높음': return { color: '#c2410c', bgColor: '#ffedd5' };
    case '보통': return { color: '#2563eb', bgColor: '#dbeafe' };
    case '낮음': return { color: '#65a30d', bgColor: '#ecfccb' };
    default: return { color: '#64748b', bgColor: '#f8fafc' };
  }
};

const ContentWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 15px 15px 90px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  height: 100%;  /* 전체 높이를 채움 */
`;

// --- task list (스크롤 가능 영역) ---
const TaskListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  &.slide-out-left { animation: ${slideOutLeft} 0.25s forwards; }
  &.slide-in-right { animation: ${slideInRight} 0.25s forwards; }
  &.slide-out-right { animation: ${slideOutRight} 0.25s forwards; }
  &.slide-in-left { animation: ${slideInLeft} 0.25s forwards; }
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
  bottom: 60px;
`;
// --- 메인 ---
function TaskMain() {
  const { projectId } = useParams(); // URL에서 projectId 가져오기
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [pageMaker, setPageMaker] = useState({ page: 1 });
  const [keyword, setKeyword] = useState("");
  const [animationClass, setAnimationClass] = useState('');

  const fetchTasks = async (page = pageMaker.page, searchKeyword = keyword) => {
    if (!projectId) return; // projectId 없으면 fetch하지 않음

    try {
      const response = await axios.get(`/project/main/project/api/${projectId}/tasks`, {
        params: { page, keyword: searchKeyword },
        withCredentials: true
      });

      if (response.data) {
        setTasks(response.data.taskList || []);
        setPageMaker(response.data.pageMaker || { page });
      }
    } catch (error) {
      console.error("일감 목록 로딩 실패:", error);
    }
  };

  useEffect(() => {
    fetchTasks(); // projectId가 바뀌면 다시 호출
  }, [projectId]);

  const handlePageChange = (newPage) => {
    if (!projectId) return; // projectId 없으면 페이지 변경 무시
    const direction = newPage > (pageMaker?.page || 1) ? 'next' : 'prev';
    if (animationClass) return;

    if (direction === 'next') {
      setAnimationClass('slide-out-left');
      setTimeout(() => { fetchTasks(newPage); setAnimationClass('slide-in-right'); }, 250);
    } else {
      setAnimationClass('slide-out-right');
      setTimeout(() => { fetchTasks(newPage); setAnimationClass('slide-in-left'); }, 250);
    }
    setTimeout(() => { setAnimationClass(''); }, 500);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (!projectId) return;
      fetchTasks(1, keyword);
    }
  };

  const handleAddTask = async (newTask) => {
    if (!projectId) return;
    try {
      await axios.post(`/project/main/project/${projectId}/tasklist`, newTask, { withCredentials: true });
      alert("새로운 일감이 등록되었습니다.");
      setIsModalOpen(false);
      setKeyword("");
      fetchTasks(1, ""); // 추가 후 1페이지, 검색 초기화
    } catch (error) {
      console.error("일감 생성 실패:", error);
      alert("일감 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    if (!projectId) return;
    try {
      await axios.put(`/project/main/project/${projectId}/tasklist/${updatedTask.taskId}`, updatedTask, { withCredentials: true });
      alert("일감이 수정되었습니다.");
      setSelectedTask(null);
      fetchTasks(pageMaker.page);
    } catch (error) {
      console.error("일감 수정 실패:", error);
      alert("일감 수정에 실패했습니다.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!projectId) return;
    if (window.confirm("정말로 이 일감을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/project/main/project/${projectId}/tasklist/${taskId}`, { withCredentials: true });
        alert("일감이 삭제되었습니다.");
        setSelectedTask(null);
        fetchTasks(pageMaker.page);
      } catch (error) {
        console.error("일감 삭제 실패:", error);
      }
    }
  };



  return (
    <>
      <Container>
        <ContentWrapper>
          <ProjectHeader />
          <Header>
            <TitleSection>
              <Title>일감</Title>
              <SearchInput
                placeholder="일감 검색"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleSearch}
              />
            </TitleSection>
            <NewTaskButton onClick={() => setIsModalOpen(true)}>+ 새 일감</NewTaskButton>
          </Header>
          <TaskListWrapper className={animationClass}>
            {tasks.map((task) => (
              <TaskItemRow key={task.taskId} onClick={() => setSelectedTask(task)}>
                <TaskTopLine>
                  <TaskInfo>
                    <TaskId>{task.taskId}</TaskId>
                    <TaskTitle>{task.taskTitle}</TaskTitle>
                  </TaskInfo>
                </TaskTopLine>
                <TaskBottomLine>
                  <StatusPill color={getStatusStyle(task.taskStatus).color} bgColor={getStatusStyle(task.taskStatus).bgColor}>
                    {task.taskStatus}
                  </StatusPill>
                  <PriorityPill color={getPriorityStyle(task.taskUrgency).color} bgColor={getPriorityStyle(task.taskUrgency).bgColor}>
                    {task.taskUrgency}
                  </PriorityPill>
                  <ProgressBarContainer>
                    <ProgressBar progress={task.taskProgress || 0} />
                  </ProgressBarContainer>
                  <ProgressText>{task.taskProgress || 0}%</ProgressText>
                </TaskBottomLine>
              </TaskItemRow>
            ))}
          </TaskListWrapper>
          <Pagination pageMaker={pageMaker} onPageChange={handlePageChange} />
        </ContentWrapper>
      </Container>
      {isModalOpen && <NewTaskModal onClose={() => setIsModalOpen(false)} onSave={handleAddTask} />}
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