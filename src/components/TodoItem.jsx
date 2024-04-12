import React from "react";
import { removeTodo, toggleTodoComplete } from "../store/todoSlice";
import { useDispatch } from "react-redux";

const TodoItem = ({ id, completed, text }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleTodoComplete({id}))}
      />
      <span>{text}</span>
      <span className="delete" onClick={() => dispatch(removeTodo({id}))}>
        X
      </span>
    </li>
  );
};

export default TodoItem;
