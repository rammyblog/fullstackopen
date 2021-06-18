import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personSearch, setPersonSearch] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const createNewPerson = async (personObj) => {
    try {
      const res = await axios.post("http://localhost:3001/persons", personObj);
      setPersons(persons.concat(res.data));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      setPersonSearch(
        persons.filter((person) => person.name.toLowerCase().includes(search))
      );
    } else {
      setPersonSearch([]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const duplicate = persons.find((obj) => obj.name === newName);
    if (duplicate) {
      alert(`${newName} is already added to phonebook`);
    } else {
      createNewPerson({ name: newName, number: newNumber });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChangeHandler={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        handleFormSubmit={handleFormSubmit}
      />
      <h2>Numbers</h2>
      {search ? (
        <Person persons={personSearch} />
      ) : (
        <Person persons={persons} />
      )}
    </div>
  );
};

export default App;
