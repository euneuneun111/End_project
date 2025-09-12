// src/LoginApi.js
import axios from "axios";

// Axios 인스턴스 생성 (Base URL + 세션 쿠키 포함)
const api = axios.create({
  baseURL: "http://localhost:8080/api/commons",
  withCredentials: true,
});

// 로그인
export const login = async (id, password) => {
  try {
    const res = await api.post("/login", { id, password });
    return res.data;
  } catch (error) {
    console.error("로그인 요청 실패", error);
    return { success: false, message: "서버 오류" };
  }
};

// 로그아웃
export const logout = async () => {
  try {
    const res = await api.post("/logout");
    return res.data;
  } catch (error) {
    console.error("로그아웃 요청 실패", error);
    return { success: false, message: "서버 오류" };
  }
};

// 세션 체크
export const checkSession = async () => {
  try {
    const res = await api.get("/check-session");
    return res.data;
  } catch (error) {
    console.error("세션 체크 실패", error);
    return { authenticated: false };
  }
};
