import React, { useState, useEffect } from "react";
import "./TodoList.css";
import Form from "./components/Form";
import Todo from "./components/Todo";
const axios = require("axios");

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [text, setText] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    getTodo();
  }, []);

  // CRUD (R => get)
  const getTodo = () => {
    axios
      .get(`http://localhost:3000/todos?_sort=id&_order=desc`)
      .then((res) => {
        setTodoList(res.data);
      });
  };

  // CRUD (C => post)
  const createTodo = (e) => {
    e.preventDefault();

    const newTodo = {
      id: Date.now(),
      todo: text,
      isChecked: false,
    };

    return axios.post(`http://localhost:3000/todos/`, newTodo).then(() => {
      setTodoList((prev) => [newTodo, ...prev]);
      setText("");
    });
  };

  // CRUD (R => delete)
  const deleteTodo = (id) => {
    const notDeletedTodo = todoList.filter((todo) => todo.id !== id);

    return axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then(() => setTodoList(notDeletedTodo));
  };

  // CRUD (U => put)
  const updateTodo = (id, todo, isChecked) => {
    const updatedTodo = {
      id,
      todo,
      isChecked,
    };

    return axios
      .put(`http://localhost:3000/todos/${id}`, updatedTodo)
      .then(getTodo());
  };

  // CRUD (U => put)
  const onToggle = (id, todo) => {
    setIsChecked(!isChecked);

    const checkTodo = {
      id,
      todo,
      isChecked,
    };

    return axios
      .put(`http://localhost:3000/todos/${id}`, checkTodo)
      .then(getTodo());
  };

  return (
    <div className="entire">
      <div className="todo-list">
        <h1 className="title">TO DO LIST</h1>
        <Form text={text} setText={setText} createTodo={createTodo} />
        <ul className="todos">
          {todoList !== 0 &&
            todoList.map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                todo={todo.todo}
                isChecked={todo.isChecked}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
                onToggle={onToggle}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
