import React from "react";

const TodoItem = ({ id, completed, text, toggleTodoComplete, removeTodo }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodoComplete(id)}
      />
      <span>{text}</span>
      <span className="delete" onClick={() => removeTodo(id)}>
        X
      </span>
    </li>
  );
};

export default TodoItem;
