import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const response = await axios.post(baseUrl, { content, votes: 0 });
  return response.data;
};
const update = async (objectToUpdate) => {
  const response = await axios.put(
    `${baseUrl}/${objectToUpdate.id}`,
    objectToUpdate
  );
  return response.data;
};

export default { getAll, createNew, update };
