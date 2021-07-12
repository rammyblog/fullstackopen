import React from "react";
import { useDispatch } from "react-redux";

import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleAnecdoteSubmit = (e) => {
    e.preventDefault();
    const text = e.target.anecdote.value;
    dispatch(createAnecdote(text));
  };
  return (
    <>
      <form onSubmit={handleAnecdoteSubmit}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
