// LoginApi.js
import axios from "axios";

const api = axios.create({
  baseURL: "/project/commons",
  withCredentials: true,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

export const login = async (user_id, user_pwd) => {
  const params = new URLSearchParams();
  params.append("user_id", user_id);
  params.append("user_pwd", user_pwd);

  try {
    const res = await api.post("/login", params); // Security 가로채는 URL
    return res.data; // Security가 리다이렉션 후 반환
  } catch (error) {
    console.error("로그인 요청 실패", error);
    return { success: false, message: "로그인 실패" };
  }
};


export const logout = async () => {
  try {
    const res = await api.post("/logout");
    return res.data;
  } catch (error) {
    console.error("로그아웃 요청 실패", error);
    return { success: false, message: "서버 오류" };
  }
};

export const checkSession = async () => {
  try {
    const res = await api.get("/check-session");
    return res.data;
  } catch (error) {
    console.error("세션 체크 실패", error);
    return { authenticated: false };
  }
};
