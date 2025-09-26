import React from "react";

const TodoItem = ({
  todo,
  editingId,
  editValue,
  setEditValue,
  toggleTodo,
  startEditing,
  saveEdit,
  confirmDelete
}) => (
  <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
    {editingId === todo.id ? (
      <>
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && saveEdit(todo.id)}
          autoFocus
        />
        <button onClick={() => saveEdit(todo.id)} className="save-button">
          Simpan
        </button>
      </>
    ) : (
      <>
        <span onClick={() => toggleTodo(todo.id)} className="todo-text">
          {todo.text}
        </span>
        <button onClick={() => startEditing(todo.id, todo.text)} className="edit-button">
          Edit
        </button>
        <button onClick={() => confirmDelete(todo.id)} className="delete-button">
          Hapus
        </button>
      </>
    )}
  </li>
);

export default TodoItem;
