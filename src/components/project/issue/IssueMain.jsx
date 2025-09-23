import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProjectHeader from "../../header/ProjectHeader";
import axios from 'axios';
import Pagination from './Pagination';
import Select from 'react-select';
import styled, { keyframes } from 'styled-components';

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
const ErrorMessage = styled.div`
  background-color: #fffbe6;
  color: #c2410c;
  border: 1px solid #fde68a;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 6px;

  // 캘린더 이미지처럼 입력창 아래에 겹치게 표시하고 싶을 경우 아래 주석 해제
  position: absolute;
  bottom: -25px; 
  left: 0;
  z-index: 1;
  width: auto;
  white-space: nowrap;
 
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

const NoResultsContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
  font-family: 'Pretendard', sans-serif;
`;

const NoResultsText = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const NoResultsSubText = styled.p`
  font-size: 14px;
  margin-top: 8px;
`;

// --- 새 이슈 모달 ---
function NewIssueModal({ onClose, onSave, taskList }) {
  const [form, setForm] = useState({
    issueTitle: "", issueContent: "",
    issueStatus: "대기 중", issueUrgency: "보통",
    taskId: ""
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  // ✅ 4. react-select의 onChange 이벤트를 처리할 별도의 핸들러
  const handleSelectChange = (selectedOption, actionMeta) => {
    const value = selectedOption ? selectedOption.value : "";
    setForm({ ...form, [actionMeta.name]: value });
  };
  
  // Task 목록도 react-select 형식으로 변환
  const taskOptions = taskList.map(task => ({
    value: task.taskId,
    label: `${task.taskId} - ${task.taskTitle}`
  }));

  const handleSubmit = () => {
    const newErrors = {};
    if (!form.issueTitle.trim()) newErrors.issueTitle = "❗ 이슈 제목을 입력하세요.";
    if (!form.issueContent.trim()) newErrors.issueContent = "❗ 이슈 설명을 입력하세요.";
    if (!form.taskId) newErrors.taskId = "❗ 연결할 일감을 선택하세요.";

    // 에러가 있으면 errors state를 업데이트하고, 없으면 저장 함수 호출
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      onSave(form);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeader><h2>새 이슈 생성</h2><CloseButton onClick={onClose}>&times;</CloseButton></ModalHeader>
        
        {/* 3. 각 입력 필드 아래에 에러 메시지 조건부 렌더링 */}
        <FormGroup>
          <FormLabel>이슈 제목</FormLabel>
          <FormInput name="issueTitle" value={form.issueTitle} onChange={handleChange} />
          {errors.issueTitle && <ErrorMessage>{errors.issueTitle}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <FormLabel>이슈 설명</FormLabel>
          <FormTextarea name="issueContent" value={form.issueContent} onChange={handleChange} />
          {errors.issueContent && <ErrorMessage>{errors.issueContent}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <FormLabel>연결할 일감</FormLabel>
          <Select name="taskId" styles={customStyles} options={taskOptions} onChange={handleSelectChange} placeholder="일감 선택..."/>
          {errors.taskId && <ErrorMessage>{errors.taskId}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <FormLabel>이슈 상태</FormLabel>
          <Select name="issueStatus" styles={customStyles} options={statusOptions} onChange={handleSelectChange} value={statusOptions.find(opt => opt.value === form.issueStatus)}/>
        </FormGroup>

        <FormGroup>
          <FormLabel>우선순위</FormLabel>
          <Select name="issueUrgency" styles={customStyles} options={urgencyOptions} onChange={handleSelectChange} value={urgencyOptions.find(opt => opt.value === form.issueUrgency)}/>
        </FormGroup>
        
        <ModalFooter>
            {/* 4. onClick 이벤트에 handleSubmit 연결 */}
            <SaveButton onClick={handleSubmit}>+ 등록</SaveButton>
            <DeleteButton onClick={onClose}>× 취소</DeleteButton>
        </ModalFooter>
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
  &.slide-out-left { animation: ${slideOutLeft} 0.25s forwards; }
  &.slide-in-right { animation: ${slideInRight} 0.25s forwards; }
  &.slide-out-right { animation: ${slideOutRight} 0.25s forwards; }
  &.slide-in-left { animation: ${slideInLeft} 0.25s forwards; }
`;

function IssueMain() {
  const [issues, setIssues] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [pageMaker, setPageMaker] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [animationClass, setAnimationClass] = useState('');
  const { projectId } = useParams();

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
  const fetchIssues = async (page = 1, searchKeyword = "") => {
    try {
      const response = await axios.get(`/project/main/project/api/${projectId}/issues`, {
        params: { 
          page: page,
          keyword: searchKeyword // ✅ API 요청에 검색어 추가
        },
        withCredentials: true
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
    // projectId가 URL에 없으면 API를 호출하지 않음
    if (!projectId) return;

    const fetchInitialData = async () => {
      try {
        // 이슈 목록 불러오기
        const issueResponse = await axios.get(`/project/main/project/api/${projectId}/issues`, {
          params: { page: 1, keyword: "" },
          withCredentials: true
        });
        if (issueResponse.data) {
          setIssues(issueResponse.data.issueList || []);
          setPageMaker(issueResponse.data.pageMaker);
        }

        // 태스크 목록 불러오기
        const taskResponse = await axios.get(`/project/main/project/api/${projectId}/tasks`);
        setTaskList(taskResponse.data.taskList || []);

      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      }
    };
    
    fetchInitialData();

  }, [projectId]);

  const handlePageChange = (newPage) => {
    // 현재 페이지보다 높은 페이지로 가면 '다음'으로 간주
    const direction = newPage > (pageMaker?.page || 1) ? 'next' : 'prev';

    if (animationClass) return; // 애니메이션 중이면 중복 실행 방지

    if (direction === 'next') {
      setAnimationClass('slide-out-left');
      setTimeout(() => {
        fetchIssues(newPage, keyword); // 실제 데이터 변경
        setAnimationClass('slide-in-right');
      }, 250);
    } else { // direction === 'prev'
      setAnimationClass('slide-out-right');
      setTimeout(() => {
        fetchIssues(newPage, keyword); // 실제 데이터 변경
        setAnimationClass('slide-in-left');
      }, 250);
    }

    // 애니메이션 클래스 초기화
    setTimeout(() => {
      setAnimationClass('');
    }, 500);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchIssues(1, keyword);
    }
  };

  const handleAddIssue = async (newIssue) => {
    try {
      await axios.post(`/project/main/project/${projectId}/issuelist`, newIssue, { withCredentials: true });
      alert("새로운 이슈가 등록되었습니다.");
      setIsModalOpen(false);
      setKeyword(""); // ✅ 검색어 초기화
      fetchIssues(1, ""); // ✅ 전체 목록 새로고침
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
              <SearchInput 
                placeholder="이슈 검색" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleSearch}
              />
            </TitleSection>
            <NewIssueButton onClick={() => setIsModalOpen(true)}>+ 새 이슈</NewIssueButton>
          </Header>
          <IssueListWrapper className={animationClass}>
          {issues.length > 0 ? (
            issues.map((issue) => (
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
            ))
          ) : (
            <NoResultsContainer>
              <NoResultsText>표시할 이슈가 없습니다.</NoResultsText>
              <NoResultsSubText>다른 검색어로 다시 시도해 보세요.</NoResultsSubText>
            </NoResultsContainer>
          )}
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