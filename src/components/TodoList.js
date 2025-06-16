import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggleComplete, onDeleteTodo }) {
  // 완료된 할 일과 미완료 할 일 분리
  const incompleteTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="todo-list">
      {/* 미완료 할 일 섹션 */}
      {incompleteTodos.length > 0 && (
        <div className="todo-section">
          <h3 className="section-title">📋 할 일 ({incompleteTodos.length})</h3>
          <div className="todo-items">
            {incompleteTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={onToggleComplete}
                onDeleteTodo={onDeleteTodo}
              />
            ))}
          </div>
        </div>
      )}

      {/* 완료된 할 일 섹션 */}
      {completedTodos.length > 0 && (
        <div className="todo-section completed-section">
          <h3 className="section-title">✅ 완료된 일 ({completedTodos.length})</h3>
          <div className="todo-items">
            {completedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={onToggleComplete}
                onDeleteTodo={onDeleteTodo}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;