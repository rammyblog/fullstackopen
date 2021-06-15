import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [anecdotesVotes, setAnecdotesVotes] = useState({});

  const handleSetVotes = () => {
    const copyAnte = { ...anecdotesVotes };
    if (!copyAnte[selected]) {
      copyAnte[selected] = 1;
    } else {
      copyAnte[selected] += 1;
    }

    setAnecdotesVotes(copyAnte);
  };
  const genRandomNumber = () => {
    return setSelected(Math.floor(Math.random() * anecdotes.length));
  };
  console.log(
    Object.keys(anecdotesVotes).reduce((a, b) =>
      anecdotesVotes[a] > anecdotesVotes[b] ? a : b
    )
  );

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <button onClick={handleSetVotes}>Vote</button>{" "}
      <button onClick={genRandomNumber}>next anecdote</button>
      <p>has {anecdotesVotes[selected] ? anecdotesVotes[selected] : 0} votes</p>
      <h1>Anecdote with most votes</h1>
      {Object.entries(anecdotesVotes).length > 0 &&
        anecdotes[
          Object.keys(anecdotesVotes).reduce((a, b) =>
            anecdotesVotes[a] > anecdotesVotes[b] ? a : b
          )
        ]}
    </>
  );
};

export default App;
