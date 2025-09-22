import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
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
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
  &::-webkit-scrollbar { display: none; }
`;

const DateInput = styled.input`
  flex: 1 1 120px;
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
  flex: 0 0 auto;
  background-color: #4287c4;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover { background-color: #2f5f8a; }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  min-width: 500px;
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
  &:hover { background-color: #f9f9f9; }
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
    &:hover { background-color: #e3f2fd; }
    &.active { background-color: #3a6ea5; color: white; font-weight: bold; }
  }
`;

function ReportMain() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  // 서버에서 보고서 데이터 가져오기
  useEffect(() => {
    const fetchReports = async () => {
      try {
        if (!projectId) return;
        const response = await axios.get(`/project/organization/${projectId}/report/api/list`);
        const data = Array.isArray(response.data) ? response.data : [];
        setReports(data);

        const uniqueUsers = Array.from(new Set(data.map(r => r.writer)));
        setUsers(uniqueUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [projectId]);

  // 페이지네이션 계산
  const filteredReports = Array.isArray(reports)
    ? reports
        .filter(r => !selectedUser || r.writer === selectedUser)
        .filter(r => {
          if (!selectedDate) return true;
          const reportDate = new Date(r.regDate).toISOString().split("T")[0];
          return reportDate === selectedDate;
        })
    : [];

  const totalPages = Math.ceil(filteredReports.length / pageSize);
  const paginatedReports = filteredReports.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Container>
      <ProjectHeader />

      <TopBar>
        <DateInput
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <UserSelect
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">사용자 선택</option>
          {users.map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </UserSelect>
        <Button onClick={() => navigate(`/report/create/${projectId}`)}>
          보고 작성
        </Button>
      </TopBar>

      {loading && <p>불러오는 중...</p>}
      {error && <p style={{ color: "red" }}>에러 발생: {error}</p>}

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
            {paginatedReports.map(report => (
              <Tr
                key={report.rno}
                onClick={() => navigate(`/${projectId}/report/api/detail/${report.rno}`)}
              >
                <Td>{new Date(report.regDate).toLocaleDateString()}</Td>
                <Td>{report.content}</Td>
                <Td>{report.writer}</Td>
                <Td>{report.check.toString()}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <span
            key={i + 1}
            className={i + 1 === page ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </span>
        ))}
      </Pagination>
    </Container>
  );
}

export default ReportMain;
