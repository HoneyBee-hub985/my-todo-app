import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  // localStorage에서 데이터 불러오기
  const loadTodos = () => {
    try {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error('할 일 목록을 불러오는데 실패했습니다:', error);
      return [];
    }
  };

  const loadNextId = () => {
    try {
      const savedNextId = localStorage.getItem('nextId');
      return savedNextId ? parseInt(savedNextId, 10) : 1;
    } catch (error) {
      console.error('ID를 불러오는데 실패했습니다:', error);
      return 1;
    }
  };

  // 할 일 목록을 관리하는 상태 (초기값을 localStorage에서 불러옴)
  const [todos, setTodos] = useState(loadTodos);
  // 고유한 ID를 생성하기 위한 카운터 (초기값을 localStorage에서 불러옴)
  const [nextId, setNextId] = useState(loadNextId);

  // todos가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('할 일 목록을 저장하는데 실패했습니다:', error);
    }
  }, [todos]);

  // nextId가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    try {
      localStorage.setItem('nextId', nextId.toString());
    } catch (error) {
      console.error('ID를 저장하는데 실패했습니다:', error);
    }
  }, [nextId]);

  // 새로운 할 일을 추가하는 함수
  const addTodo = (text) => {
    // 빈 텍스트는 추가하지 않음
    if (text.trim() === '') return;
    
    const newTodo = {
      id: nextId,
      text: text.trim(),
      completed: false
    };
    
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setNextId(prevId => prevId + 1);
  };

  // 할 일의 완료 상태를 토글하는 함수
  const toggleComplete = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 할 일을 삭제하는 함수
  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  // 모든 데이터를 초기화하는 함수 (선택사항)
  const clearAllData = () => {
    setTodos([]);
    setNextId(1);
    localStorage.removeItem('todos');
    localStorage.removeItem('nextId');
  };

  // 할 일 목록을 미완료 → 완료 순으로 정렬
  const sortedTodos = [...todos].sort((a, b) => {
    // 완료되지 않은 항목이 먼저 오도록 정렬
    if (a.completed === b.completed) {
      return 0; // 같은 상태면 기존 순서 유지
    }
    return a.completed ? 1 : -1; // 완료된 항목은 뒤로
  });

  // 완료된 할 일과 미완료 할 일 개수 계산
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="app">
      <div className="app-container">
        <h1 className="app-title">📝 My Todo List</h1>
        
        {/* 진행 상황 표시 */}
        {totalCount > 0 && (
          <div className="progress-info">
            <span className="progress-text">
              진행률: {completedCount} / {totalCount} 완료
            </span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <TodoForm onAddTodo={addTodo} />
        {/* 정렬된 목록 전달 */}
        <TodoList 
          todos={sortedTodos}
          onToggleComplete={toggleComplete}
          onDeleteTodo={deleteTodo}
        />
        {todos.length === 0 && (
          <p className="empty-message">할 일이 없습니다. 새로운 할 일을 추가해보세요!</p>
        )}
        
        {/* 개발용: 모든 데이터 초기화 버튼 (나중에 제거 가능) */}
        {todos.length > 0 && (
          <button 
            onClick={clearAllData}
            style={{
              marginTop: '20px',
              padding: '8px 16px',
              backgroundColor: '#ff4757',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            전체삭제
          </button>
        )}
      </div>
    </div>
  );
}

export default App;