import React, { useState, useEffect } from "react";
import "./TodoList.css";
import AddTodo from "./AddTodo";
import SearchBar from "./SearchBar";
import FilterButtons from "./FilterButtons";
import TodoItem from "./TodoItem";
import ProgressBar from "./ProgressBar";
import ConfirmPopup from "./ConfirmPopup";

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const playSound = (file) => {
    const audio = new Audio(file);
    audio.volume = 0.5;
    audio.play();
  };

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue("");
    }
    playSound("/sounds/click.wav");
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
    playSound("/sounds/click.wav");
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditValue(text);
    playSound("/sounds/click.wav");
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editValue } : todo
    ));
    setEditingId(null);
    setEditValue("");
    playSound("/sounds/click.wav");
  };

  const confirmDelete = (id) => {
    setShowConfirm(true);
    setDeleteId(id);
    playSound("/sounds/popup.wav");
  };

  const handleDelete = () => {
    setTodos(todos.filter(todo => todo.id !== deleteId));
    setShowConfirm(false);
    setDeleteId(null);
    playSound("/sounds/click.wav");
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
    playSound("/sounds/click.wav");
  };

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  const progress = todos.length > 0
    ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100)
    : 0;

  return (
    <>
      <div className="scanlines"></div>
      <div className="todo-container">
        <h1 className="retro-title">RETRO TODO</h1>

        <ProgressBar progress={progress} />

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <AddTodo
          inputValue={inputValue}
          setInputValue={setInputValue}
          addTodo={addTodo}
        />

        <FilterButtons setFilter={setFilter} playSound={playSound} />

        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              editingId={editingId}
              editValue={editValue}
              setEditValue={setEditValue}
              toggleTodo={toggleTodo}
              startEditing={startEditing}
              saveEdit={saveEdit}
              confirmDelete={confirmDelete}
            />
          ))}
        </ul>

        {showConfirm && (
          <ConfirmPopup
            handleDelete={handleDelete}
            cancelDelete={cancelDelete}
          />
        )}

        {filteredTodos.length === 0 && (
          <p className="empty-message">
            {searchTerm ? "Todo tidak ditemukan" : "Tidak ada todo"}
          </p>
        )}
      </div>
    </>
  );
};

export default TodoList;
