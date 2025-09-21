import React from 'react'
import { Routes, Route } from 'react-router-dom'  // BrowserRouter 제거
import Navbar from "./Navbar.jsx"
import styled from 'styled-components'
import Projectbar from '../project/main/Projectbar.jsx';

import Home from './Home.jsx';
import ProjectCreate from './ProjectCreate.jsx';

import CalendarMain from '../project/calendar/CalendarMain.jsx';
import IssueMain from '../project/issue/IssueMain.jsx';
import GantMain from '../project/gant/GantMain.jsx';

import MeetingMain from '../project/meeting/MeetingMain.jsx';
import MeetingDetail from '../project/meeting/MeetingDetail.jsx';
import MeetingModify from '../project/meeting/MeetingModify.jsx';
import MeetingCreate from '../project/meeting/MeetingCreate.jsx';

import TaskMain from '../project/task/TaskMain.jsx';

import ReportMain from '../project/report/ReportMain.jsx';
import ReportCreate from '../project/report/ReportCreate.jsx';
import ReportDetail from '../project/report/ReportDetail.jsx';
import ReportModify from '../project/report/ReportModify.jsx';

import MypageMain from '../mypage/MypageMain.jsx';

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Section = styled.div`
  width: 60%;
  @media (max-width: 767px) { width: 100%; }
  @media (min-width: 768px) and (max-width: 1023px) { width: 80%; }
  @media (min-width: 1024px) { width: 60%; }
`;

const Menu = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
`;

const ContentBox = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

function LinkedMain() {
  return (
    <Container>
      <Section>
        <ContentBox>
          <Routes>
            <Route path="/" element={<Home />} />   {/* 첫 화면 */}
            <Route path="/home" element={<Home />} />
            <Route path="/project/create" element={<ProjectCreate />} />
            <Route path="/project/main" element={<Projectbar />} />
            <Route path="/calendar/main/:projectId" element={<CalendarMain />} />

            <Route path="/gant/main/:projectId" element={<GantMain />} />
            
            <Route path="/issue/main/:projectId" element={<IssueMain />} />

            <Route path="/meeting/main/:projectId" element={<MeetingMain />} />
            <Route path="/meeting/detail/:id" element={<MeetingDetail />} />
            <Route path="/meeting/modify/:id" element={<MeetingModify />} />
            <Route path="/meeting/create/:projectId" element={<MeetingCreate />} />

            <Route path="/report/create/:projectId" element={<ReportCreate />} />
            <Route path="/report/main/:projectId" element={<ReportMain />} />
            <Route path="/report/modify/:id" element={<ReportModify />} />

            <Route path="/task/main/:projectId" element={<TaskMain />} />
            <Route path="/mypage/main" element={<MypageMain />} />
          </Routes>
        </ContentBox>
        <Menu>
          <Navbar />
        </Menu>
      </Section>
    </Container>
  )
}

export default LinkedMain;
