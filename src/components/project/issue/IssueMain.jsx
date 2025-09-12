import React, { useState } from 'react';
import styled from 'styled-components';
import ProjectHeader from "../../header/ProjectHeader";


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
function NewIssueModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    status: "",
    description: "",
    priority: "",
    reporter: ""
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
          <h2>새 이슈 생성</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <FormGroup>
          <FormLabel>이슈 제목</FormLabel>
          <FormInput name="title" value={form.title} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <FormLabel>이슈 설명</FormLabel>
          <FormTextarea name="description" value={form.description} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <FormLabel>이슈 상태</FormLabel>
          <FormSelect name="status" value={form.status} onChange={handleChange}>
            <option value="">선택</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
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
          <FormLabel>보고자</FormLabel>
          <FormSelect name="reporter" value={form.reporter} onChange={handleChange}>
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

// --- 이슈 상세 모달 ---
function IssueDetailModal({ issue, onClose, onUpdate, onDelete }) {
  const [form, setForm] = useState(issue);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>이슈 상세보기</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <FormGroup>
          <FormLabel>이슈 제목</FormLabel>
          <FormInput name="title" value={form.title} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <FormLabel>이슈 설명</FormLabel>
          <FormTextarea name="description" value={form.description} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <FormLabel>이슈 상태</FormLabel>
          <FormSelect name="status" value={form.status} onChange={handleChange}>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>우선순위</FormLabel>
          <FormSelect name="priority" value={form.priority} onChange={handleChange}>
            <option value="Critical">Critical</option>
            <option value="Moderate">Moderate</option>
            <option value="Minor">Minor</option>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>보고자</FormLabel>
          <FormSelect name="reporter" value={form.reporter} onChange={handleChange}>
            <option value="홍길동">홍길동</option>
            <option value="김철수">김철수</option>
          </FormSelect>
        </FormGroup>

        <ModalFooter>
          <SaveButton onClick={() => onUpdate(form)}>✔ 수정</SaveButton>
          <DeleteButton onClick={() => onDelete(issue.id)}>🗑 삭제</DeleteButton>
        </ModalFooter>
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

// --- 스타일 헬퍼 ---
const getStatusStyle = (status) => {
  switch (status) {
    case 'Ongoing': return { color: '#4f46e5', bgColor: '#e0e7ff' };
    case 'Completed': return { color: '#16a34a', bgColor: '#dcfce7' };
    case 'Pending': return { color: '#c2410c', bgColor: '#ffedd5' };
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
  height: 100%;
`;

const IssueListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

// --- 메인 ---
function IssueMain() {
  const [issues, setIssues] = useState([
    { id: 'ISS-1', title: '샘플 이슈', status: 'Ongoing', priority: 'Moderate', description: '샘플 설명', reporter: '홍길동' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  // 새 이슈 추가
  const handleAddIssue = (newIssue) => {
    setIssues([...issues, { ...newIssue, id: `ISS-${issues.length + 1}` }]);
    setIsModalOpen(false);
  };

  // 이슈 수정
  const handleUpdateIssue = (updatedIssue) => {
    setIssues(issues.map(issue => issue.id === updatedIssue.id ? updatedIssue : issue));
    setSelectedIssue(null);
  };

  // 이슈 삭제
  const handleDeleteIssue = (issueId) => {
    setIssues(issues.filter(issue => issue.id !== issueId));
    setSelectedIssue(null);
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
            {issues.map((issue) => (
              <IssueItemRow key={issue.id} onClick={() => setSelectedIssue(issue)}>
                <IssueTopLine>
                  <IssueInfo>
                    <IssueId>{issue.id}</IssueId>
                    <IssueTitle>{issue.title}</IssueTitle>
                  </IssueInfo>
                </IssueTopLine>

                <IssueBottomLine>
                  <StatusPill
                    color={getStatusStyle(issue.status).color}
                    bgColor={getStatusStyle(issue.status).bgColor}
                  >
                    {issue.status}
                  </StatusPill>
                  <PriorityPill
                    color={getPriorityStyle(issue.priority).color}
                    bgColor={getPriorityStyle(issue.priority).bgColor}
                  >
                    {issue.priority}
                  </PriorityPill>
                </IssueBottomLine>
              </IssueItemRow>
            ))}
          </IssueListWrapper>
        </ContentWrapper>
      </Container>

      {/* 새 이슈 모달 */}
      {isModalOpen && <NewIssueModal onClose={() => setIsModalOpen(false)} onSave={handleAddIssue} />}

      {/* 상세보기 모달 */}
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