import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Person from "./components/Person";
import PersonService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personSearch, setPersonSearch] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const getPersons = async () => {
    setPersons(await PersonService.getPersons());
  };
  useEffect(() => {
    getPersons();
  }, []);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const duplicate = persons.find((obj) => obj.name === newName);
    if (duplicate) {
      if (
        window.confirm(
          `${newName} is already added, replace the old number with a new one?`
        )
      ) {
        const returnedPerson = await PersonService.editPerson({
          name: newName,
          number: newNumber,
          id: duplicate.id,
        });
        setPersons(
          persons.map((person) =>
            person.id !== duplicate.id ? person : returnedPerson
          )
        );
      }
    } else {
      const newPerson = await PersonService.createPerson({
        name: newName,
        number: newNumber,
      });
      setPersons(persons.concat(newPerson));
    }
  };

  const handlePersonDelete = async (id) => {
    await PersonService.deletePerson(id);
    setPersons(persons.filter((person) => person.id !== id));
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
        <Person
          persons={personSearch}
          handlePersonDelete={handlePersonDelete}
        />
      ) : (
        <Person persons={persons} handlePersonDelete={handlePersonDelete} />
      )}
    </div>
  );
};

export default App;
