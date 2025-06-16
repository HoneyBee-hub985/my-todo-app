import React, { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTodo(inputText);
    setInputText('');
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          className="todo-input"
          placeholder="새로운 할 일을 입력하세요..."
          value={inputText}
          onChange={handleInputChange}
        />
        <button 
          type="submit" 
          className="add-button"
          disabled={inputText.trim() === ''}
        >
          추가
        </button>
      </div>
    </form>
  );
}

export default TodoForm;