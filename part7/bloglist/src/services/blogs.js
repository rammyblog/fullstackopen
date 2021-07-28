import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (data) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, data, config);
  return response.data;
};

const edit = async (id, data) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.put(`${baseUrl}/${id}`, data, config);
  return response.data;
};

const remove = async (id) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const addComment = async (id, text) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    { text },
    config
  );
  return response.data;
};

export default { getAll, create, edit, remove, addComment, setToken };
