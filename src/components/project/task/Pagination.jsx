import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
`;

const PageButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  margin: 0;
  background-color: #ffffff;
  color: #334155;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #e2e8f0;

  &:hover {
    background-color: #f1f5f9;
  }

  &[aria-current] {
    background-color: #3690d9;
    color: white;
    font-weight: bold;
    border-color: #3690d9;
  }

  &:disabled {
    background-color: #f8fafc;
    color: #cbd5e1;
    cursor: not-allowed;
  }
`;

function Pagination({ pageMaker, onPageChange }) {
  if (!pageMaker) return null;

  const { page, startPage, endPage, totalCount, perPageNum } = pageMaker;
  const totalPages = Math.ceil(totalCount / perPageNum);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Nav>
      <PageButton onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
        이전
      </PageButton>

      {pageNumbers.map(number => (
        <PageButton
          key={number}
          onClick={() => onPageChange(number)}
          aria-current={page === number ? "page" : null}
        >
          {number}
        </PageButton>
      ))}

      <PageButton onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
        다음
      </PageButton>
    </Nav>
  );
}

export default Pagination;