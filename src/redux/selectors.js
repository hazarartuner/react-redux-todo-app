import { createSelector } from 'reselect';

export const todoItemsSelector = createSelector(
  [
    state => state.get('todoItems'),
    state => state.get('currentFilter'),
    state => state.get('showCompletedItems'),
  ],
  (todoItems, currentFilter, showCompletedItems) => {
    return todoItems
      .toIndexedSeq()
      .filter(todoItem => {
        if (!currentFilter) {
          return showCompletedItems
            ? true
            : todoItem.get('isComplete') === false;
        }

        return currentFilter === 'active'
          ? todoItem.get('isComplete') === false
          : todoItem.get('isComplete') === true;
      })
      .toJS();
  },
);

export const allItemsCountSelector = createSelector(
  [state => state.get('todoItems')],
  todoItems => todoItems.count(),
);

export const remainingItemCountSelector = createSelector(
  [state => state.get('todoItems')],
  todoItems =>
    todoItems.filter(todoItem => !todoItem.get('isComplete')).count(),
);

export const filtersSelector = createSelector(
  [state => state.get('filters')],
  filters => {
    return filters.toJS();
  },
);

export const currentTodoSelector = createSelector(
  [state => state.get('currentTodo')],
  currentTodo => {
    return currentTodo.toJS();
  },
);
