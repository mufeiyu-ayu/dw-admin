import request from "../axios.config";
const userList = ({ offset = 0, limit = 10, keyword = "" }) =>
  request.get(
    `/api/v1/users/list?offset=${offset}&limit=${limit}&keyword=${keyword}&pageNo=1`
  );
export { userList };
