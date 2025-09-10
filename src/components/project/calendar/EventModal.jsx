import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// --- Styled Components ---

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// 모달 내용이 아래에서 위로 올라오는 효과
const slideUp = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;


// --- Styled Components ---

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  /* ✅ fadeIn 애니메이션 적용 */
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  /* ✅ slideUp 애니메이션 적용 */
  animation: ${slideUp} 0.4s ease-out;
`;

const ModalHeader = styled.h2`
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const FormField = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #555;
  }

  input[type="text"],
  input[type="date"],
  textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #f8f8f8;
    font-size: 1rem;
    color: #333;
    box-sizing: border-box;
    &:focus {
      outline: none;
      border-color: #4A90E2;
      box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    }
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &.primary {
    background-color: #4287C4;
    color: white;
    &:hover { background-color: #3679b3; }
  }
  &.secondary {
    background-color: #6c757d;
    color: white;
    &:hover { background-color: #5a6268; }
  }
  &.danger {
    background-color: #dc3545;
    color: white;
    &:hover { background-color: #c82333; }
  }
`;

// ✅ 날짜 형식을 'YYYY-MM-DD'로 안전하게 변환하는 함수
const formatDateForInput = (dateValue) => {
  if (!dateValue) return '';
  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  } catch (error) {
    return '';
  }
};


// --- Component ---

const EventModal = ({ isOpen, onClose, onSubmit, onDelete, onSwitchToEdit, mode, initialData }) => {

  const [formData, setFormData] = useState({});

  useEffect(() => {
    // ✅ initialData를 직접 수정하지 않기 위해 복사본을 만듭니다.
    const dataToDisplay = { ...initialData };

    // ✅ 상세보기 또는 수정 모드일 때, 사용자에게 보여주기 위해 종료일을 하루 뺍니다.
    if ((mode === 'detail' || mode === 'edit') && dataToDisplay.end) {
      // 하루짜리 일정이 아닐 경우에만 (시작일과 종료일이 다를 때)
      if (formatDateForInput(dataToDisplay.start) !== formatDateForInput(dataToDisplay.end)) {
        const endDate = new Date(dataToDisplay.end);
        endDate.setDate(endDate.getDate() - 1);
        dataToDisplay.end = endDate.toISOString().split('T')[0];
      }
    }
    
    setFormData(dataToDisplay || {});
  }, [isOpen, initialData, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ 1. 메모(내용)가 비어있는지 확인합니다.
    if (!formData.calendarContent || formData.calendarContent.trim() === '') {
      alert('메모(일정 내용)를 입력해주세요.');
      return; // 저장을 중단합니다.
    }

    const processedData = { ...formData };

    if (!processedData.end || processedData.end === '') {
      processedData.end = processedData.start; 
    } else if (processedData.start !== processedData.end) {
      const endDate = new Date(processedData.end);
      endDate.setDate(endDate.getDate() + 1);
      processedData.end = endDate.toISOString().split('T')[0];
    }
    
    onSubmit(processedData);
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 일정을 삭제하시겠습니까?')) {
      onDelete(formData.id);
    }
  };

  if (!isOpen) return null;

  const isViewing = mode === 'detail';

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          {mode === 'add' && '새 일정 추가'}
          {mode === 'detail' && '일정 상세'}
          {mode === 'edit' && '일정 수정'}
        </ModalHeader>

        {isViewing ? (
          <div>
            <h3>{formData.title}</h3>
            <p><strong>시작:</strong> {formatDateForInput(formData.start)}</p>
            {formData.end && <p><strong>종료:</strong> {formatDateForInput(formData.end)}</p>}
            {formData.calendarContent && <p><strong>메모:</strong> {formData.calendarContent}</p>}
            <ButtonGroup>
              <Button className="danger" onClick={handleDelete}>삭제</Button>
              <Button className="secondary" onClick={onSwitchToEdit}>수정</Button>
              <Button className="primary" onClick={onClose}>닫기</Button>
            </ButtonGroup>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormField>
              <label>일정 제목</label>
              <input type="text" name="title" value={formData.title || ''} onChange={handleChange} required />
            </FormField>
            
            <FormField>
              <label>시작일</label>
              <input type="date" name="start" value={formatDateForInput(formData.start)} onChange={handleChange} required />
            </FormField>

            <FormField>
              <label>종료일 (선택 사항)</label>
              <input type="date" name="end" value={formatDateForInput(formData.end)} onChange={handleChange} />
            </FormField>
            
            <FormField>
              <label>메모</label>
              <textarea
                name="calendarContent"
                value={formData.calendarContent || ''}
                onChange={handleChange}
                required
              />
            </FormField>

            <ButtonGroup>
              <Button type="button" className="secondary" onClick={onClose}>취소</Button>
              <Button type="submit" className="primary">저장</Button>
            </ButtonGroup>
          </form>
        )}
      </ModalContent>
    </ModalBackdrop>
  );
};

export default EventModal;
