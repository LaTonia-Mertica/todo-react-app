import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import styles from "./styles.css";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {}, [todos]);

  // passed to TodoList Component below
  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(_event) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos([...todos, { id: uuid(), name: name, complete: false }]);

    todoNameRef.current.value = null;

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...todos, { id: uuid(), name: name, complete: false }])
    );
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      {/* toggle prop passed to TodoList in TodoListComponent */}
      <div className="text box left-todo">
        🥴 {todos.filter((todo) => !todo.complete).length} LEFT TO DO 🥴
      </div>

      <div className="flex-grid">
        <div className="box">
          <input
            ref={todoNameRef}
            type="text"
            placeholder="     enter 3 or less brief todos"
          />
        </div>

        <div className="box">
          <button onClick={handleAddTodo} className="text add">
            ADD
          </button>
        </div>

        <div className="box">
          <button onClick={handleClearTodos} className="text box clear">
            CLEAR
          </button>
        </div>
      </div>

      <div className="flex-grid box">
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>
    </>
  );
}

export default App;
