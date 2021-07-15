import React from "react";
import { connect } from "react-redux";

import { createAnecdote } from "../reducers/anecdoteReducer";

import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({ setNotification, createAnecdote }) => {
  const handleAnecdoteSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.anecdote.value;
    createAnecdote(text);
    setNotification(`${text} has been created`, 5);
  };
  return (
    <>
      <h2>create new</h2>

      <form onSubmit={handleAnecdoteSubmit}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default connect(null, { setNotification, createAnecdote })(AnecdoteForm);
