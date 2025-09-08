import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ProjectHeader from "../../header/ProjectHeader";

const Container = styled.div`
  width: 100%;
  padding: 16px;
  font-family: "Poppins", sans-serif;
  background-color: #fafafa;
  min-height: 100vh;
  box-sizing: border-box;
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row; /* 항상 같은 행 */
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  overflow-x: auto; /* 모바일에서 화면보다 길면 스크롤 가능 */
  padding-bottom: 8px;

  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
  }
`;

const DateInput = styled.input`
  flex: 1 1 120px; /* 최소 120px, 화면에 맞게 늘어남 */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
`;

const UserSelect = styled.select`
  flex: 1 1 120px; 
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
`;

const Button = styled.button`
  flex: 0 0 auto; /* 버튼은 고정 크기 */
  background-color: #4287c4;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #2f5f8a;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  min-width: 500px; /* 모바일에서 스크롤 가능 */
`;

const Th = styled.th`
  border-bottom: 2px solid #ddd;
  text-align: left;
  padding: 12px;
  font-size: 14px;
  background-color: #f5f7fa;
`;

const Td = styled.td`
  border-bottom: 1px solid #eee;
  padding: 10px;
  font-size: 13px;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
  cursor: pointer;
`;

const Pagination = styled.div`
  text-align: center;
  margin-top: 15px;

  span {
    margin: 0 4px;
    cursor: pointer;
    font-size: 14px;
    color: #3a6ea5;
    padding: 6px 10px;
    border-radius: 50%;
    transition: 0.2s ease;

    &:hover {
      background-color: #e3f2fd;
    }

    &.active {
      background-color: #3a6ea5;
      color: white;
      font-weight: bold;
    }
  }
`;

function ReportMain() {
  const navigate = useNavigate();

  // 샘플 데이터 (id 추가)
  const reports = [...Array(8)].map((_, i) => ({
    id: i + 1,
    date: "2025-09-04",
    content: `업무 보고 내용 ${i + 1} - 길어질 경우 말줄임 처리됩니다.`,
    author: "홍길동",
    status: "미확인",
  }));

  return (
    <Container>
             <ProjectHeader />

      {/* 상단 바 */}
      <TopBar>
        <DateInput type="date" />
        <UserSelect>
          <option>사용자 선택</option>
          <option>김철수</option>
          <option>홍길동</option>
        </UserSelect>
        <Button onClick={() => navigate("/report/create")}>보고 작성</Button>
      </TopBar>

      {/* 테이블 */}
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>작성 날짜</Th>
              <Th>내용</Th>
              <Th>작성자</Th>
              <Th>확인</Th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <Tr
                key={report.id}
                onClick={() => navigate(`/report/detail/${report.id}`)} // ReportDetail로 이동
                style={{ cursor: "pointer" }}
              >
                <Td>{report.date}</Td>
                <Td>{report.content}</Td>
                <Td>{report.author}</Td>
                <Td>{report.status}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      {/* 페이지네이션 */}
      <Pagination>
        <span>{"<"}</span>
        <span className="active">1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>{">"}</span>
      </Pagination>
    </Container>
  );
}

export default ReportMain;
