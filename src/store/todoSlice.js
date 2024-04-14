import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/*----------------------запрос за тудушками-----------------------------------------------------------------------------------------------*/
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async function (_, { rejectWithValue }) {
    //принимает первым параметром то что передаем через диспатч, но мы тут ничего не передаем
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message); //таким образом мы ловим ошибку и перекидываем ее в экстраредьюсер по обработке ошибки
    }
  }
); //принимает название экшена и функцию
/*-----------------------удаление тудушек через сервак------------------------------------------------------------------------------------------------*/
//удаляем таску не только из памяти браузера а на сервере, поэтому делает фетч с удалением,
//и если все окей - диспатчим removeTodo, чтобы удалить все с браузера как и ранее
//rejectWithValue - для обработки ошибок, dispatch - обычный диспетчер
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async function (id, { rejectWithValue, dispatch }) {
    // тут мы уже принимает id
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE"
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Can't delete task. Server error");
      }
      dispatch(removeTodo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/*--------------хэлпер на ошибки(одинаковый для обоих функицй)------------------------------------------------------*/
const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};
/*-----------------изменение статуса тудушки--------------------------------------------------------------------------------------------------*/
//нам надо обновить поле completed, чтобы его обновить,надо получить значение того, что есть сейчас
//для этого есть getState, который возвращает общий стэйт, через него получаем актуальный completed
export const toggleStatus = createAsyncThunk(
  "todos/toggleStatus",
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find((todo) => todo.id === id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            completed: !todo.completed
          })
        }
      );
      if (!response.ok) {
        throw new Error("Can't toggle task status. Server error");
      }
      /* const data = await response.json();
      console.log(data); */ // чекаем ответ сервера
      dispatch(toggleTodoComplete({ id })); //изменяем UI в соответсвии с изменениями на сервере
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/*-----------------------бавление новых данных---------------------------------------------------------*/
export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async function(text, rejectWithValue,dispatch) {
    try {
      
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

/*-------------------------------------------------------------------------------------------------------------------------*/
const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: null,
    error: null
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        id: new Date().toISOString(),
        text: action.payload.text,
        completed: false
      });
    },

    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },

    toggleTodoComplete(state, action) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      toggledTodo.completed = !toggledTodo.completed;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "resolved";
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, setError);
    builder.addCase(deleteTodo.rejected, setError);
    builder.addCase(toggleStatus.rejected, setError);
    //можно сделать так чтобы сообщение об ошибке стиралось с экрана в случае пендинга
  }
});

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;
export default todoSlice.reducer;
