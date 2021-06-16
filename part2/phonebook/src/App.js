import React, { useState } from "react";

const Filter = ({ search, onChangeHandler }) => {
  return (
    <>
      Filter shown with <input value={search} onChange={onChangeHandler} />
    </>
  );
};

const PersonForm = ({
  newName,
  handleNewName,
  newNumber,
  handleNewNumber,
  handleFormSubmit,
}) => {
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Person = ({ persons }) => {
  return persons.map((person) => (
    <>
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    </>
  ));
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [personSearch, setPersonSearch] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

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
    duplicate
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat({ name: newName, number: newNumber }));
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
