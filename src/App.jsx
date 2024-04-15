import { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import InputField from "./components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "./store/todoSlice";
import { addNewTodo } from "./store/todoSlice";

function App() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.todos); //здесь мы получили объект из среза и деструктурировали статус и ошибку

  const addTask = () => {
    //dispatch(addTodo({ text }));
    dispatch(addNewTodo(text));
    setText("");
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]); // после монтирования вызывается диспетчер и fetchTodos

  return (
    <div className="App">
      <InputField text={text} handleInput={setText} handleSubmit={addTask} />
      {status === "loading" && <h2>Loading...</h2>}
      {error && <h2>An error occured:{error}</h2>}
      <TodoList />
    </div>
  );
}

export default App;
