const Person = ({ persons, handlePersonDelete }) => {
  const handleDeleteClick = ({ name, id }) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      handlePersonDelete(name, id);
    }
  };

  return persons.map((person) => (
    <>
      <p key={person.id}>
        {person.name} {person.number}{" "}
        <button onClick={() => handleDeleteClick(person)}>delete</button>
      </p>
    </>
  ));
};

export default Person;
