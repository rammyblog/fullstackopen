import axios from "axios";
const BASE_URL = "http://localhost:3001/persons";

const getPersons = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const createPerson = async (personObj) => {
  try {
    const res = await axios.post("http://localhost:3001/persons", personObj);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default { getPersons, createPerson };
