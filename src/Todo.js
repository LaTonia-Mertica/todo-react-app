import React from "react";
import styles from "./styles.css";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
          className="checkbox"
          style={{ width: 37 }}
        />
        {todo.name}
      </label>
    </div>
  );
}
