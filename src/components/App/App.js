import React from 'react';

import TodoInput from 'components/TodoInput';
import TodoItem from 'components/TodoItem';
import TodoList from 'components/TodoList';

import TodoContainer from 'containers/TodoContainer';

import logo from 'assets/images/logo.svg';

import './App.scss';

export default () => (
  <div className="app__component">
    <img className="app-logo" src={logo} alt="ToDo App" />
    <TodoContainer>
      {({
        currentTodo,
        currentFilter,
        todoItems,
        filters,
        showCompletedItems,
        remainingItemCount,
        allItemsCount,
        onFilterChange,
        onToggleVisibility,
        onToggleTodoItem,
        onTodoItemSelect,
        onTodoInputChange,
        onTodoTextKeyUp,
        onTodoItemDelete,
      }) => (
        <div className="app-contents">
          <TodoInput
            todo={currentTodo}
            onTextChange={onTodoInputChange}
            onTextKeyUp={onTodoTextKeyUp}
          />

          <TodoList
            filters={filters}
            showCompletedItems={showCompletedItems}
            currentFilter={currentFilter}
            onFilterChange={onFilterChange}
            onToggleVisibility={onToggleVisibility}
            remainingItemCount={remainingItemCount}
            hideFooter={allItemsCount <= 0}
          >
            {todoItems &&
              todoItems.map(todoItem => (
                <TodoItem
                  key={todoItem.id}
                  todo={todoItem}
                  onToggle={onToggleTodoItem}
                  onSelect={onTodoItemSelect}
                  onDelete={onTodoItemDelete}
                />
              ))}
          </TodoList>
        </div>
      )}
    </TodoContainer>
  </div>
);
