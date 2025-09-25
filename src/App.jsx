// App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LinkedMain from './components/main/LinkedMain';
import Login from './components/login/LoginPage';
import Signup from './components/login/Signup';
import FindPassword from './components/login/Findpassword';


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Poppins;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />       {/* 기본 경로: 로그인 */}
          <Route path="/login" element={<Login />} />  {/* /login 도 로그인 */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/find-password" element={<FindPassword/>} />

          <Route path="/*" element={<LinkedMain />} /> {/* 로그인 후 들어갈 메인 */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
