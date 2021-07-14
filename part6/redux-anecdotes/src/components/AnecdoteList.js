import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  hideNotification,
  setNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) =>
    filter
      ? state.anecdotes.filter((obj) =>
          obj.content.toLowerCase().includes(filter.toLowerCase())
        )
      : state.anecdotes
  );

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    const { id, content } = anecdote;
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`you voted '${content}'`, 5));
  };
  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
