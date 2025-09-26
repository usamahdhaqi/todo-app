import React from "react";

const AddTodo = ({ inputValue, setInputValue, addTodo }) => (
  <div className="add-todo-container">
    <input
      type="text"
      placeholder="Tambahkan todo baru..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && addTodo()}
      className="todo-input"
    />
    <button onClick={addTodo} className="add-button">
      Tambah
    </button>
  </div>
);

export default AddTodo;
