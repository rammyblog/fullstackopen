import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { initAnecdotes } from "./reducers/anecdoteReducer";
import anecdoteService from "./services/anecdotes";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdote) => dispatch(initAnecdotes(anecdote)));
  }, [dispatch]);
  return (
    <div>
      <h2>Anecdotes</h2>

      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
