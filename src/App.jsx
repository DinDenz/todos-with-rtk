import { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import InputField from "./components/InputField";
import { useDispatch } from "react-redux";
import { addTodo, fetchTodos } from "./store/todoSlice";

function App() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const addTask = () => {
    dispatch(addTodo({ text }));
    setText("");
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]); // после монтирования вызывается диспетчер и fetchTodos

  return (
    <div className="App">
      <InputField text={text} handleInput={setText} handleSubmit={addTask} />
      <TodoList />
    </div>
  );
}

export default App;
