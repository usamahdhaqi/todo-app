import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { 
        id: Date.now(), 
        text: inputValue, 
        completed: false 
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <div className="scanlines"></div>
    <div className="todo-container">
      <h1 className="retro-title">RETRO TODO</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Cari todo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="add-todo-container">
        <input
          type="text"
          placeholder="Tambahkan todo baru..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          className="todo-input"
        />
        <button onClick={addTodo} className="add-button">
          Tambah
        </button>
      </div>
      
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span 
              onClick={() => toggleTodo(todo.id)}
              className="todo-text"
            >
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
      
      {filteredTodos.length === 0 && (
        <p className="empty-message">
          {searchTerm ? 'Todo tidak ditemukan' : 'Tidak ada todo'}
        </p>
      )}
    </div>
    </>
  );
};

export default TodoList;