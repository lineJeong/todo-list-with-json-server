import React, { useState } from "react";
import "./Todo.css";

const Todo = ({ id, todo, isChecked, deleteTodo, updateTodo, onToggle }) => {
  const [original, setOriginal] = useState(todo);
  const [isUpdating, setIsUpdating] = useState(false);

  const onClickTodo = () => {
    setIsUpdating(true);
  };

  const onChangeInput = (e) => {
    setOriginal(e.target.value);
  };

  const onBlurInput = (e) => {
    e.target.form.requestSubmit();
    setIsUpdating(false);
  };

  const onSubmitUpdate = (e) => {
    e.preventDefault();
    setIsUpdating(false);

    if (todo !== original) {
      updateTodo(id, original, isChecked);
    }
  };

  return (
    <li key={id} className="todo">
      <div className="check-todo" onClick={() => onToggle(id, todo, isChecked)}>
        {isChecked ? "■" : "□"}
      </div>
      {isUpdating ? (
        <form className="update-form" onSubmit={onSubmitUpdate}>
          <input
            className="update-input"
            value={original}
            onChange={onChangeInput}
            onBlur={(e) => onBlurInput(e)}
            autoFocus
          />
        </form>
      ) : (
        <div
          className={`todo-text ${isChecked && "checked"}`}
          onClick={onClickTodo}
        >
          {todo}
        </div>
      )}
      <div className="delete-todo" onClick={() => deleteTodo(id)}>
        &times;
      </div>
    </li>
  );
};

export default Todo;
