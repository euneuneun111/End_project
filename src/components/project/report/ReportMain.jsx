import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ProjectHeader from "../../header/ProjectHeader";
import axios from "axios";

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
  const [reports, setReports] = useState([]); // 서버 데이터 저장
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 서버에서 보고서 데이터 가져오기
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("/project/organization/report/list"); 
        console.log("서버응답:", response.data); //응답데이터
        setReports(response.data);
      } catch (err) {
        console.log("데이터가져오기 실패:", err); //에러 로그
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

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

            {/* 데이터 상태 */}
            {loading && <p>불러오는 중...</p>}
            {error && <p style={{ color: "red" }}>에러 발생: {error}</p>}

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
                key={report.rno}
                onClick={() => navigate(`/report/detail/${report.rno}`)} // ReportDetail로 이동
                style={{ cursor: "pointer" }}
              >
                <Td>{new Date(report.regDate).toLocaleDateString()}</Td>
                <Td>{report.content}</Td>
                <Td>{report.writer}</Td>
                <Td>{report.check}</Td>
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
