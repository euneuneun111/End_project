import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProjectHeader from "../../header/ProjectHeader";
import axios from 'axios';
import Pagination from './Pagination';


const formatDateForInput = (dateValue) => {
  if (!dateValue) return '';
  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return '';

    // ✅ UTC가 아닌 로컬 시간 기준으로 년, 월, 일을 가져옴
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  } catch (error) {
    return '';
  }
};

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
    taskTitle: "",
    taskDescription: "",
    taskStatus: "",
    taskUrgency: "",
    taskManagerId: "",
    taskStartDate: "",
    taskEndDate: "",
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
        <ModalHeader><h2>새 일감 생성</h2><CloseButton onClick={onClose}>&times;</CloseButton></ModalHeader>
        
        {/* ✅ 누락되었던 '일감 이름' 입력 필드 추가 */}
        <FormGroup>
          <FormLabel>일감 이름</FormLabel>
          <FormInput name="taskTitle" value={form.taskTitle} onChange={handleChange} />
        </FormGroup>

        {/* ✅ 누락되었던 '일감 설명' 입력 필드 추가 */}
        <FormGroup>
          <FormLabel>일감 설명</FormLabel>
          <FormTextarea name="taskDescription" value={form.taskDescription} onChange={handleChange} />
        </FormGroup>
        
        <FormGroup>
          <FormLabel>일감 상태</FormLabel>
          <FormSelect name="taskStatus" value={form.taskStatus} onChange={handleChange}>
            <option value="">선택</option>
            <option value="진행 중">진행 중</option>
            <option value="완료">완료</option>
            <option value="검토 중">검토 중</option>
            <option value="대기 중">대기 중</option>
          </FormSelect>
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
          <FormSelect name="taskUrgency" value={form.taskUrgency} onChange={handleChange}>
            <option value="">선택</option>
            <option value="긴급">긴급</option>
            <option value="높음">높음</option>
            <option value="보통">보통</option>
            <option value="낮음">낮음</option>
          </FormSelect>
        </FormGroup>
        
        {/* ✅ 누락되었던 '담당자' 선택 필드 추가 */}
        <FormGroup>
          <FormLabel>담당자</FormLabel>
          <FormSelect name="taskManagerId" value={form.taskManagerId} onChange={handleChange}>
            <option value="">선택</option>
            <option value="mimi">mimi</option>
            <option value="cheolsu">cheolsu</option>
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
  useEffect(() => { setForm(task); }, [task]); // ✅ 부모로부터 받은 task가 바뀔 때 form 상태 동기화

  return (
    <ModalOverlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeader><h2>일감 상세보기</h2><CloseButton onClick={onClose}>&times;</CloseButton></ModalHeader>
        
        <FormGroup><FormLabel>일감 이름</FormLabel><FormInput name="taskTitle" value={form.taskTitle} onChange={handleChange} /></FormGroup>
        <FormGroup><FormLabel>일감 설명</FormLabel><FormTextarea name="taskDescription" value={form.taskDescription} onChange={handleChange} /></FormGroup>
        <FormGroup><FormLabel>담당자</FormLabel><FormSelect name="taskManagerId" value={form.taskManagerId} onChange={handleChange}><option value="mimi">mimi</option><option value="cheolsu">cheolsu</option></FormSelect></FormGroup>

        {/* ✅ 시작일, 종료일 입력 필드 JSX 추가 및 formatDateForInput 사용 */}
        <FormGroup>
          <FormLabel>시작일</FormLabel>
          <FormInput type="date" name="taskStartDate" value={formatDateForInput(form.taskStartDate)} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>종료일</FormLabel>
          <FormInput type="date" name="taskEndDate" value={formatDateForInput(form.taskEndDate)} onChange={handleChange} />
        </FormGroup>

        <FormGroup><FormLabel>일감 상태</FormLabel><FormSelect name="taskStatus" value={form.taskStatus} onChange={handleChange}><option value="진행 중">진행 중</option><option value="완료">완료</option><option value="검토 중">검토 중</option><option value="대기 중">대기 중</option></FormSelect></FormGroup>
        <FormGroup><FormLabel>우선순위</FormLabel><FormSelect name="taskUrgency" value={form.taskUrgency} onChange={handleChange}><option value="긴급">긴급</option><option value="높음">높음</option><option value="보통">보통</option><option value="낮음">낮음</option></FormSelect></FormGroup>
        
        <ModalFooter><SaveButton onClick={() => onUpdate(form)}>✔ 수정</SaveButton><DeleteButton onClick={() => onDelete(task.taskId)}>🗑 삭제</DeleteButton></ModalFooter>
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
  const [tasks, setTasks] = useState([]); // ✅ 빈 배열로 초기화
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [pageMaker, setPageMaker] = useState(null); // ✅ 페이지네이션 상태 추가
  const [keyword, setKeyword] = useState("");
  const projectId = "PJ-001"; // TODO: 실제 프로젝트 ID

  // ✅ 일감 목록을 서버에서 불러오는 함수
  const fetchTasks = async (page = 1, searchKeyword = "") => {
    try {
      const response = await axios.get(`/project/main/project/api/${projectId}/tasks`, {
        params: { 
          page: page,
          keyword: searchKeyword // ✅ API 요청에 검색어 추가
        },
        withCredentials: true
      });
      if (response.data) {
        setTasks(response.data.taskList || []);
        setPageMaker(response.data.pageMaker);
      }
    } catch (error) { console.error("일감 목록 로딩 실패:", error); }
  };

  useEffect(() => {
    fetchTasks(1, ""); // ✅ 처음에는 검색어 없이 로드
  }, []);
  
  const handlePageChange = (page) => {
    fetchTasks(page, keyword); // ✅ 페이지 이동 시에도 현재 검색어 유지
  };

  // ✅ 3. 검색창에서 Enter 키를 눌렀을 때 실행될 핸들러 추가
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchTasks(1, keyword); // 검색 시에는 항상 1페이지부터 조회
    }
  };

  // ✅ 새 일감 추가 (API 연동)
  const handleAddTask = async (newTask) => {
    try {
      await axios.post(`/project/main/project/${projectId}/tasklist`, newTask, { withCredentials: true });
      alert("새로운 일감이 등록되었습니다.");
      setIsModalOpen(false);
      setKeyword(""); // ✅ 검색어 초기화
      fetchTasks(1, ""); // ✅ 전체 목록 새로고침
    } catch (error) {
      console.error("일감 생성 실패:", error);
      // ✅ 사용자에게 실패 알림을 보여주는 코드 추가
      alert("일감 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // ✅ 일감 수정 (API 연동)
  const handleUpdateTask = async (updatedTask) => {
    try {
      await axios.put(`/project/main/project/${projectId}/tasklist/${updatedTask.taskId}`, updatedTask);
      
      alert("일감이 수정되었습니다.");
      setSelectedTask(null);
      
      // ✅ 수정 성공 후, 목록 전체를 다시 불러옴
      fetchTasks(pageMaker ? pageMaker.page : 1); 

    } catch (error) { 
      console.error("일감 수정 실패:", error); 
      alert("일감 수정에 실패했습니다.");
    }
  };

  // ✅ 일감 삭제 (API 연동)
  const handleDeleteTask = async (taskId) => {
    if (window.confirm("정말로 이 일감을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/project/main/project/${projectId}/tasklist/${taskId}`);
        alert("일감이 삭제되었습니다.");
        setSelectedTask(null);
        fetchTasks(1); // 목록 새로고침
      } catch (error) { console.error("일감 삭제 실패:", error); }
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
          <TaskListWrapper>
            {/* ✅ DTO 필드명에 맞게 수정 */}
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
                </TaskBottomLine>
              </TaskItemRow>
            ))}
          </TaskListWrapper>
          {/* ✅ Pagination 컴포넌트 추가 */}
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