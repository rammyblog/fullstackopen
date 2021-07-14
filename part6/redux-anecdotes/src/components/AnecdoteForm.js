import React from "react";
import { useDispatch } from "react-redux";

import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";

import {
  hideNotification,
  setNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleAnecdoteSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.anecdote.value;
    const data = await anecdoteService.createNew(text);

    dispatch(createAnecdote(data));
    dispatch(setNotification(`${text} has been created`, 5));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5 * 1000);
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

export default AnecdoteForm;
