import axios from "axios";
const BASE_URL = "api/persons";

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
    const res = await axios.post(BASE_URL, personObj);
    return res.data;
  } catch (error) {
    // return error
    throw error;
  }
};

const deletePerson = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
const editPerson = async (personObj) => {
  try {
    const res = await axios.put(`${BASE_URL}/${personObj.id}`, personObj);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default { getPersons, createPerson, deletePerson, editPerson };
