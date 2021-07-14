import anecdoteService from "../services/anecdotes";

const AnecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE_ANECDOTE":
      return state.map((anecdote) =>
        anecdote.id === action.id ? action.data : anecdote
      );
    case "SUBMIT_ANECDOTE":
      return state.concat(action.data);

    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "SUBMIT_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export const voteAnecdote = (obj) => {
  return async (dispatch) => {
    obj.votes += 1;
    const updatedAnecdote = await anecdoteService.update(obj);  
    dispatch({
      type: "VOTE_ANECDOTE",
      data: updatedAnecdote,
    });
  };
};

export default AnecdoteReducer;
