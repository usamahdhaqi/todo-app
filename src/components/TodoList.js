import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all | active | completed
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { 
        id: Date.now(), 
        text: inputValue, 
        completed: false 
      }]);
      setInputValue('');
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
    setEditValue('');
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

  const playSound = (file) => {
    const audio = new Audio(file);
    audio.volume = 0.5; // bisa disesuaikan
    audio.play();
  };

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
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

      {/* Progress bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{progress}% selesai</p>

      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Cari todo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Add */}
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

      {/* Filter */}
      <div className="filter-container">
        <button onClick={() => { setFilter('all'); playSound("/sounds/click.wav"); }}>
          Semua
        </button>
        <button onClick={() => { setFilter('active'); playSound("/sounds/click.wav"); }}>
          Aktif
        </button>
        <button onClick={() => { setFilter('completed'); playSound("/sounds/click.wav"); }}>
          Selesai
        </button>
      </div>

      {/* Todo list */}
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
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
                <span 
                  onClick={() => toggleTodo(todo.id)}
                  className="todo-text"
                >
                  {todo.text}
                </span>
                <button 
                  onClick={() => startEditing(todo.id, todo.text)} 
                  className="edit-button"
                >
                  Edit
                </button>
                <button 
                  onClick={() => confirmDelete(todo.id)} 
                  className="delete-button"
                >
                  Hapus
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {showConfirm && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Konfirmasi</h3>
            <p>Kamu yakin ingin menghapus todo ini?</p>
            <div className="popup-actions">
              <button onClick={handleDelete} className="delete-button">Ya, Hapus</button>
              <button onClick={cancelDelete} className="cancel-button">Batal</button>
            </div>
          </div>
        </div>
      )}

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
