import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import Login from "../login/LoginPage.jsx";



const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;
const Section = styled.div`
  width: 60%;
  @media (max-width: 767px) {
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 80%;
  }
  @media (min-width: 1024px) {
    width: 60%;
  }
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
  justify-content: center;  /* 가로 중앙 정렬 */
  align-items: flex-start;  /* 세로는 위쪽에 두기 */
`;
const Footer = styled.div``;

function LinkedMain() {
  return (
    <div>
      <BrowserRouter>
        <Container>
          <Section>
            <ContentBox>
              <Routes>
                <Route path="/" element={<Home />} />   {/* 첫 화면 */}

                <Route path='/home' element={<Home />}></Route>
                <Route path='/project/create' element={<ProjectCreate/>}></Route>

                <Route path='/project/main' element={<Projectbar />}></Route>
                <Route path='/calendar/main' element={<CalendarMain />}></Route>
                <Route path='/gant/main' element={<GantMain />}></Route>
                <Route path='/issue/main' element={<IssueMain />}></Route>

                <Route path='/meeting/main' element={<MeetingMain />}></Route>
                <Route path='/meeting/detail/:id' element={<MeetingDetail/>}></Route>
                <Route path='/meeting/modify/:id' element={<MeetingModify/>}></Route>
                <Route path='/meeting/create' element={<MeetingCreate />}></Route>

                <Route path='/report/main' element={<ReportMain />}></Route>
                <Route path="/report/create" element={<ReportCreate />} />
                <Route path="/report/detail/:id" element={<ReportDetail />} />
                <Route path='/report/modify/:id' element={<ReportModify />} />

                <Route path='/task/main' element={<TaskMain />}></Route>
                <Route path='/mypage/main' element={<MypageMain />}></Route>
                <Route path='/login' element={<Login />}></Route>

              </Routes>
            </ContentBox>
            <Menu>
              <Navbar></Navbar>
            </Menu>
          </Section>

        </Container>

      </BrowserRouter>

    </div>
  )
}

export default LinkedMain