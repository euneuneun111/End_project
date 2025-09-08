import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// ------------------ Styled Components ------------------

const ModalBackdrop = styled.div`
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

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.h2`
  margin-top: 0;
  margin-bottom: 1.5rem;
`;

const FormField = styled.div`
  margin-bottom: 1rem;
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  input, textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box; /* Ensures padding doesn't affect width */
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

  &.primary {
    background-color: #007bff;
    color: white;
  }
  &.secondary {
    background-color: #6c757d;
    color: white;
  }
  &.danger {
    background-color: #dc3545;
    color: white;
  }
`;

// ------------------ Component ------------------

const EventModal = ({ isOpen, onClose, onSubmit, onDelete, onSwitchToEdit, mode, initialData }) => {
  
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(initialData || {});
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const processedData = { ...formData };

    if (processedData.end) {
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
          // ------------------ 상세보기 모드 ------------------
          <div>
            <h3>{formData.title}</h3>
            <p><strong>시작:</strong> {formData.start}</p>
            {formData.end && <p><strong>종료:</strong> {formData.end}</p>}
            {formData.memo && <p><strong>메모:</strong> {formData.memo}</p>}
            <ButtonGroup>
              <Button className="danger" onClick={handleDelete}>삭제</Button>
              <Button className="secondary" onClick={onSwitchToEdit}>수정</Button>
              <Button className="primary" onClick={onClose}>닫기</Button>
            </ButtonGroup>
          </div>
        ) : (
          // ------------------ 추가/수정 모드 (폼) ------------------
          <form onSubmit={handleSubmit}>
            <FormField>
              <label>일정 제목</label>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                required
              />
            </FormField>
            <FormField>
              <label>시작일</label>
              <input type="date" name="start" value={(formData.start || '').split('T')[0]} onChange={handleChange} required />
            </FormField>
            
            <FormField>
              <label>종료일 (선택 사항)</label>
              <input type="date" name="end" value={(formData.end || '').split('T')[0]} onChange={handleChange} />
            </FormField>
            <FormField>
              <label>메모</label>
              <textarea
                name="memo"
                value={formData.memo || ''}
                onChange={handleChange}
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