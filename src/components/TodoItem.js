import React from 'react';

function TodoItem({ todo, onToggleComplete, onDeleteTodo }) {
  // 체크박스 클릭 처리 함수
  const handleToggle = () => {
    onToggleComplete(todo.id);
  };

  // 삭제 버튼 클릭 처리 함수
  const handleDelete = () => {
    onDeleteTodo(todo.id);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />
        <span className={`todo-text ${todo.completed ? 'completed-text' : ''}`}>
          {todo.text}
        </span>
        {todo.completed && <span className="completion-badge">완료!</span>}
      </div>
      <button 
        className="delete-button"
        onClick={handleDelete}
        title="삭제"
      >
        🗑️
      </button>
    </div>
  );
}

export default TodoItem;