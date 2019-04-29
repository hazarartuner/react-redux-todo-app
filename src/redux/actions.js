import * as Types from './types';

export const addTodo = todo => ({
  type: Types.ADD_TODO,
  payload: {
    todo,
  },
});

export const updateTodo = todo => ({
  type: Types.UPDATE_TODO,
  payload: {
    todo,
  },
});

export const toggleTodo = todoId => ({
  type: Types.TOGGLE_TODO,
  payload: {
    todoId,
  },
});

export const resetCurrentTodo = () => ({
  type: Types.UPDATE_CURRENT_TODO,
  payload: {
    todo: { id: null, text: '', isComplete: false },
  },
});

export const updateCurrentTodo = todo => ({
  type: Types.UPDATE_CURRENT_TODO,
  payload: {
    todo,
  },
});

export const removeTodo = todoId => ({
  type: Types.REMOVE_TODO,
  payload: {
    todoId,
  },
});

export const changeFilter = filter => ({
  type: Types.CHANGE_FILTER,
  payload: {
    filter,
  },
});

export const setCompletedItemsVisibility = isVisible => ({
  type: Types.SET_COMPLETED_ITEMS_VISIBILITY,
  payload: {
    isVisible,
  },
});
