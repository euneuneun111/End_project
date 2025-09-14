// App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LinkedMain from './components/main/LinkedMain';
import Login from './components/login/LoginPage';

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
          <Route path="/login" element={<Login />} />  {/* 로그인 페이지 */}
          <Route path="/*" element={<LinkedMain />} /> {/* 로그인 후 들어갈 메인 */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
