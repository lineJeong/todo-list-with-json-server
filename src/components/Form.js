import React from "react";
import "./Form.css";

const Form = ({ text, setText, createTodo }) => {
  const onChangeInput = (e) => {
    setText(e.target.value);
  };

  return (
    <form className="create-form">
      <input
        className="create-input"
        value={text}
        onChange={onChangeInput}
        autoFocus
        required
      />
      <button
        className="submit-button"
        type="submit"
        onClick={(e) => createTodo(e)}
      >
        ADD
      </button>
    </form>
  );
};

export default Form;
