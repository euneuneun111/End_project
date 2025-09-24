import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import ProjectHeader from "../../header/ProjectHeader";
import axios from "axios";

/* ================= Styled Components ================= */
const Container = styled.div`
  width: 100%;
  padding: 8px;
  font-family: "Poppins", sans-serif;
  background-color: #fafafa;
  min-height: 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  overflow: visible;
`;

const Button = styled.button`
  flex: 0 0 auto;
  color: white;
  background-color: #89b5fd;
  border: none;
  padding: 4px 12px;
  font-size: 16px;
  border-radius: 22px;
  cursor: pointer;
  transition: 0.3s ease;
  margin-left: auto;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow: visible;
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  background-color: white;

  tbody tr {
    cursor: pointer;
    transition: background-color 0.2s ease;
    &:hover {
      background-color: #f5f7fa;
    }
  }
`;

const Th = styled.th`
  border-bottom: 2px solid #ddd;
  text-align: center;
  padding: 6px 8px;
  font-size: 13px;
  background-color: #f5f7fa;
  word-break: break-word;
`;

const Td = styled.td`
  border-bottom: 1px solid #eee;
  text-align: center;
  padding: 6px 8px;
  font-size: 12px;
  word-break: break-word;
  white-space: normal;
  overflow-wrap: anywhere;
`;

const TitleTd = styled(Td)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StatusTd = styled(Td)`
  font-weight: bold;
  color: ${({ $status }) =>
    $status === "검토 전"
      ? "#888888"
      : $status === "검토 중"
        ? "#f0ad4e"
        : "#28a745"};
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 150px;
  z-index: 100;
`;

const DropdownHeader = styled.div`
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  max-height: 100px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f0f2f5;
  }
`;

const Arrow = styled.span`
  display: inline-block;
  margin-left: 8px;
  transition: transform 0.2s ease;
  transform: rotate(${({ open }) => (open ? "180deg" : "0deg")});
`;

/* ================= Constants ================= */
const PAGE_SIZE = 15;

/* ================= Component ================= */
function MeetingMain() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [meetings, setMeetings] = useState([]);
  const [search, setSearch] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [authorOptions, setAuthorOptions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 회의 목록 불러오기
  const getMeetingList = async () => {
    try {
      const res = await axios.get(
        `/project/organization/${projectId}/meeting/api/meeting/list`,
        { withCredentials: true }
      );
      const data = res.data.meetingList || [];
      setMeetings(data);

      // 주관자 옵션 생성
      const authors = Array.from(new Set(data.map((m) => m.author)));
      setAuthorOptions(authors);
    } catch (error) {
      console.error("회의 목록 조회 실패:", error);
    }
  };

  useEffect(() => {
    if (projectId) getMeetingList();
  }, [projectId]);

  // 주관자 필터링
  const filteredMeetings = authorFilter
    ? meetings.filter((m) => m.author === authorFilter)
    : meetings;

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Container>
      <ProjectHeader />
      <TopBar>
        <DropdownWrapper ref={dropdownRef}>
          <DropdownHeader onClick={() => setDropdownOpen((prev) => !prev)}>
            {authorFilter || "주관자 선택"}
            <Arrow open={dropdownOpen}>▼</Arrow>
          </DropdownHeader>

          {dropdownOpen && (
            <DropdownList>
              <DropdownItem
                onClick={() => {
                  setAuthorFilter(""); // 전체 선택
                  setDropdownOpen(false);
                }}
              >
                전체
              </DropdownItem>
              {authorOptions.map((author) => (
                <DropdownItem
                  key={author}
                  onClick={() => {
                    setAuthorFilter(author);
                    setDropdownOpen(false);
                  }}
                >
                  {author}
                </DropdownItem>
              ))}
            </DropdownList>
          )}
        </DropdownWrapper>

        <Button onClick={() => navigate(`/meeting/create/${projectId}`)}>
          + 회의록
        </Button>
      </TopBar>

      <TableWrapper>
        <Table>
          <colgroup>
            <col style={{ width: "25%" }} />
            <col style={{ width: "35%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead>
            <tr>
              <Th>작성 날짜</Th>
              <Th>회의 제목</Th>
              <Th>주관자</Th>
              <Th>상태</Th>
            </tr>
          </thead>
          <tbody>
            {filteredMeetings.map((meeting) => (
              <tr
                key={meeting.id}
                onClick={() =>
                  navigate(`/meeting/detail/${projectId}/${meeting.id}`)
                }
              >
                <Td>
                  {new Date(meeting.meetingDate).toLocaleDateString()}
                </Td>
                <TitleTd>{meeting.title}</TitleTd>
                <Td>{meeting.author}</Td>
                <StatusTd $status={meeting.status}>{meeting.status}</StatusTd>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
}

export default MeetingMain;
