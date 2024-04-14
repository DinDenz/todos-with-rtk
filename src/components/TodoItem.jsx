import React from "react";
//import { removeTodo, toggleTodoComplete } from "../store/todoSlice";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleStatus } from "../store/todoSlice";

//ранее мы синхронно удаляли через removeTodo таску из браузера, но сейчас мы удаляем ее асинхронно на сервере
//в таком случае мы используем асинхронный экшен deleteTodo, а в нем мы уже вызвали синхронный ремувТуду
//чтобыудаление было и в браузере, см слайс

const TodoItem = ({ id, completed, title }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleStatus(id))}
      />
      <span>{title}</span>
      <span className="delete" onClick={() => dispatch(deleteTodo(id))}>
        X
      </span>
    </li>
  );
};

export default TodoItem;
