import request from "./axios.config";
// 请求登录接口
const login = (data) => request.post("/api/v1/users/login", data);
// 注册
const register = (data) => request.post("/api/v1/users", data);
// 验证用户是否存在
const registerVerUser = (str) =>
  request.get(`/api/v1/users/exists_user_unique_fields?username=${str}`);

// 验证码
const VerUserCode = (data) => request.post("/api/v1/verification_codes", data);
// 验证验证码
const isCodeRight = (email, codeA) =>
  request.get(
    `/api/v1/verification_codes/verification?target=${email}&code=${codeA}`
  );

// 获取用户信息
const getUserInfo = () => request.get("/api/v1/user/user_info");
export {
  login,
  register,
  registerVerUser,
  VerUserCode,
  isCodeRight,
  getUserInfo,
};
