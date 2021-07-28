import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  return (
    <ul className="nav">
      <li>
        <Link>blogs</Link>
      </li>
      <li>
        <Link>users</Link>
      </li>
      <li>
        {user.name} logged in
        <button onClick={() => dispatch(logoutUser())}>log out</button>
      </li>
    </ul>
  );
};

export default Navbar;
