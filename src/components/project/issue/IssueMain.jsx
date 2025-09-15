import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProjectHeader from "../../header/ProjectHeader";
import axios from 'axios';
import Pagination from './Pagination';
import Select from 'react-select'; // ✅ 1. react-select 라이브러리 import


// ✅ 2. 드롭다운에 사용할 옵션 데이터를 미리 정의합니다.
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

// ✅ 3. react-select 컴포넌트의 스타일을 기존 디자인과 유사하게 맞춥니다.
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
  menu: (provided) => ({
    ...provided,
    zIndex: 2 // 모달 내에서 다른 요소 위에 보이도록 설정
  })
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
  position: relative;
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

// --- 새 이슈 모달 ---
function NewIssueModal({ onClose, onSave, taskList }) {
  const [form, setForm] = useState({
    issueTitle: "", issueContent: "",
    issueStatus: "대기 중", issueUrgency: "보통",
    taskId: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  // ✅ 4. react-select의 onChange 이벤트를 처리할 별도의 핸들러
  const handleSelectChange = (selectedOption, actionMeta) => {
    setForm({ ...form, [actionMeta.name]: selectedOption.value });
  };
  
  // Task 목록도 react-select 형식으로 변환
  const taskOptions = taskList.map(task => ({
    value: task.taskId,
    label: `${task.taskId} - ${task.taskTitle}`
  }));

  const handleSubmit = () => onSave(form);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeader><h2>새 이슈 생성</h2><CloseButton onClick={onClose}>&times;</CloseButton></ModalHeader>
        <FormGroup><FormLabel>이슈 제목</FormLabel><FormInput name="issueTitle" value={form.issueTitle} onChange={handleChange} /></FormGroup>
        <FormGroup><FormLabel>이슈 설명</FormLabel><FormTextarea name="issueContent" value={form.issueContent} onChange={handleChange} /></FormGroup>
        
        {/* ✅ 5. 기존 FormSelect를 Select 컴포넌트로 교체 */}
        <FormGroup>
          <FormLabel>연결할 일감</FormLabel>
          <Select name="taskId" styles={customStyles} options={taskOptions} onChange={handleSelectChange} placeholder="일감 선택..."/>
        </FormGroup>
        <FormGroup>
          <FormLabel>이슈 상태</FormLabel>
          <Select name="issueStatus" styles={customStyles} options={statusOptions} onChange={handleSelectChange} value={statusOptions.find(opt => opt.value === form.issueStatus)}/>
        </FormGroup>
        <FormGroup>
          <FormLabel>우선순위</FormLabel>
          <Select name="issueUrgency" styles={customStyles} options={urgencyOptions} onChange={handleSelectChange} value={urgencyOptions.find(opt => opt.value === form.issueUrgency)}/>
        </FormGroup>
        
        <ModalFooter><SaveButton onClick={handleSubmit}>+ 등록</SaveButton><DeleteButton onClick={onClose}>× 취소</DeleteButton></ModalFooter>
      </ModalWrapper>
    </ModalOverlay>
  );
}

// --- 이슈 상세 모달 ---
function IssueDetailModal({ issue, onClose, onUpdate, onDelete }) {
  const [form, setForm] = useState(issue);
  useEffect(() => { setForm(issue); }, [issue]);
  
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSelectChange = (selectedOption, actionMeta) => {
    setForm({ ...form, [actionMeta.name]: selectedOption.value });
  };
  

  return (
    <ModalOverlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeader><h2>이슈 상세보기</h2><CloseButton onClick={onClose}>&times;</CloseButton></ModalHeader>
        <FormGroup><FormLabel>이슈 제목</FormLabel><FormInput name="issueTitle" value={form.issueTitle} onChange={handleChange} /></FormGroup>
        <FormGroup><FormLabel>연결된 일감</FormLabel><FormInput name="taskTitle" value={form.taskTitle || "연결된 일감 없음"} readOnly style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed' }}/></FormGroup>
        <FormGroup><FormLabel>이슈 설명</FormLabel><FormTextarea name="issueContent" value={form.issueContent} onChange={handleChange} /></FormGroup>
        <FormGroup><FormLabel>담당자</FormLabel><FormInput name="issueManagerId" value={form.issueManagerId || "담당자 없음"} readOnly style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed' }}/></FormGroup>
        
        {/* ✅ 6. 상세 모달도 Select 컴포넌트로 교체 */}
        <FormGroup>
          <FormLabel>이슈 상태</FormLabel>
          <Select name="issueStatus" styles={customStyles} options={statusOptions} onChange={handleSelectChange} value={statusOptions.find(opt => opt.value === form.issueStatus)}/>
        </FormGroup>
        <FormGroup>
          <FormLabel>우선순위</FormLabel>
          <Select name="issueUrgency" styles={customStyles} options={urgencyOptions} onChange={handleSelectChange} value={urgencyOptions.find(opt => opt.value === form.issueUrgency)}/>
        </FormGroup>
        
        <ModalFooter><SaveButton onClick={() => onUpdate(form)}>✔ 수정</SaveButton><DeleteButton onClick={() => onDelete(issue.issueId)}>🗑 삭제</DeleteButton></ModalFooter>
      </ModalWrapper>
    </ModalOverlay>
  );
}

// --- 리스트 UI 스타일 (TaskMain 재사용) ---
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

const NewIssueButton = styled.button`
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

const IssueItemRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  border-bottom: 1px solid #f1f5f9;
`;

const IssueTopLine = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const IssueInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
`;

const IssueId = styled.span`
  color: #64748b;
  font-weight: 500;
  font-size: 13px;
`;

const IssueTitle = styled.span`
  color: #1e293b;
  font-weight: 500;
  font-size: 14px;
`;

const IssueBottomLine = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  padding-left: 5px;
  gap: 8px;
`;

const StatusPill = styled.span`
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
`;

const PriorityPill = styled(StatusPill)``;

const getStatusStyle = (status) => {
  switch (status) {
    case '진행 중': return { color: '#4f46e5', bgColor: '#e0e7ff' };   // 기존 Ongoing
    case '완료': return { color: '#16a34a', bgColor: '#dcfce7' };     // 기존 Completed
    case '대기 중': return { color: '#c2410c', bgColor: '#ffedd5' };   // 기존 Pending
    case '검토 중': return { color: '#9333ea', bgColor: '#f3e8ff' };   // '검토 중' 새로 추가 (보라색 계열)
    default: return { color: '#64748b', bgColor: '#f8fafc' };
  }
};

const getPriorityStyle = (priority) => {
  switch (priority) {
    case '긴급':
    case 'Critical':
      return { color: '#dc2626', bgColor: '#fee2e2' };
    
    case '높음':
      return { color: '#c2410c', bgColor: '#ffedd5' };

    case '보통':
    case 'Moderate':
      return { color: '#2563eb', bgColor: '#dbeafe' };

    case '낮음':
    case 'Minor':
      return { color: '#65a30d', bgColor: '#ecfccb' };

    default: 
      return { color: '#64748b', bgColor: '#f8fafc' };
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
  height: 100%;
`;

const IssueListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

// --- 메인 ---
function IssueMain() {
  //  useState를 빈 배열로 초기화 (서버에서 데이터를 받아올 것이므로)
  const [issues, setIssues] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [pageMaker, setPageMaker] = useState(null);
  const projectId = "PJ-001"; // TODO: 실제 프로젝트 ID를 동적으로 받아오도록 수정

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`/project/main/project/api/${projectId}/tasks`);
      setTaskList(response.data.taskList || []);
    } catch (error) {
      console.error("일감 목록을 불러오는 데 실패했습니다.", error);
      setTaskList([]);
    }
  };

  //  (1) 이슈 목록을 서버에서 불러오는 함수
  const fetchIssues = async (page = 1) => {
    try {
      // ✅ 4. axios 요청에 page 파라미터 추가
      const response = await axios.get(`/project/main/project/api/${projectId}/issues`, {
        params: { page }
      });
      if (response.data) {
        setIssues(response.data.issueList || []);
        setPageMaker(response.data.pageMaker);
      }
    } catch (error) {
      console.error("이슈 목록을 불러오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchIssues(1);
    fetchTasks(); // Task 목록도 함께 불러오도록 추가
  }, []);

  const handlePageChange = (page) => {
    fetchIssues(page);
  };

  const handleAddIssue = async (newIssue) => {
    try {
      // ✅ axios 요청에 withCredentials: true 옵션을 추가합니다.
      await axios.post(
        `/project/main/project/${projectId}/issuelist`, 
        newIssue,
        { withCredentials: true } // ✨ 이 옵션이 핵심입니다!
      );
      
      alert("새로운 이슈가 등록되었습니다.");
      setIsModalOpen(false);
      fetchIssues();
    } catch (error) {
      console.error("이슈 생성에 실패했습니다.", error);
      alert("이슈 생성 중 오류가 발생했습니다.");
    }
  };

  const handleUpdateIssue = async (updatedIssue) => {
    try {
      await axios.put(`/project/main/project/issue/update`, updatedIssue);
      
      alert("이슈가 수정되었습니다.");
      setSelectedIssue(null);
      
      // ✅ 수정 성공 후, 목록 전체를 다시 불러옴
      // 현재 페이지 정보를 알고 있다면 해당 페이지를, 모른다면 첫 페이지를 불러옵니다.
      fetchIssues(pageMaker ? pageMaker.page : 1); 

    } catch (error) {
      console.error("이슈 수정에 실패했습니다.", error);
      alert("이슈 수정 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteIssue = async (issueId) => {
    if (window.confirm("정말로 이 이슈를 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/project/main/project/issue/${issueId}`);
        alert("이슈가 삭제되었습니다.");
        setSelectedIssue(null);
        fetchIssues();
      } catch (error) {
        console.error("이슈 삭제에 실패했습니다.", error);
        alert("이슈 삭제 중 오류가 발생했습니다.");
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
              <Title>이슈</Title>
              <SearchInput placeholder="이슈 검색" />
            </TitleSection>
            <NewIssueButton onClick={() => setIsModalOpen(true)}>+ 새 이슈</NewIssueButton>
          </Header>
          <IssueListWrapper>
            {/* ✅ DTO 필드명에 맞게 수정 (id -> issueId, title -> issueTitle 등) */}
            {issues.map((issue) => (
              <IssueItemRow key={issue.issueId} onClick={() => setSelectedIssue(issue)}>
                <IssueTopLine>
                  <IssueInfo>
                    <IssueId>{issue.issueId}</IssueId>
                    <IssueTitle>{issue.issueTitle}</IssueTitle>
                  </IssueInfo>
                </IssueTopLine>
                <IssueBottomLine>
                  <StatusPill
                    color={getStatusStyle(issue.issueStatus).color}
                    bgColor={getStatusStyle(issue.issueStatus).bgColor}
                  >
                    {issue.issueStatus}
                  </StatusPill>
                  <PriorityPill
                    color={getPriorityStyle(issue.issueUrgency).color}
                    bgColor={getPriorityStyle(issue.issueUrgency).bgColor}
                  >
                    {issue.issueUrgency}
                  </PriorityPill>
                </IssueBottomLine>
              </IssueItemRow>
            ))}
          </IssueListWrapper>
          <Pagination pageMaker={pageMaker} onPageChange={handlePageChange} />
        </ContentWrapper>
      </Container>
      
      {isModalOpen && <NewIssueModal 
      onClose={() => setIsModalOpen(false)} 
      onSave={handleAddIssue} 
      taskList={taskList} />}
      
      {selectedIssue && (
        <IssueDetailModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
          onUpdate={handleUpdateIssue}
          onDelete={handleDeleteIssue}
        />
      )}
    </>
  );
}

export default IssueMain;