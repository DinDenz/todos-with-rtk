import React from "react";
import { removeTodo, toggleTodoComplete } from "../store/todoSlice";
import { useDispatch } from "react-redux";

const TodoItem = ({ id, completed, title }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleTodoComplete({id}))}
      />
      <span>{title}</span>
      <span className="delete" onClick={() => dispatch(removeTodo({id}))}>
        X
      </span>
    </li>
  );
};

export default TodoItem;
