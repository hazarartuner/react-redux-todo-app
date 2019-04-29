import { fromJS, Map } from 'immutable';
import * as Types from './types';

const initialState = fromJS({
  currentTodo: { id: null, text: '', isComplete: false },
  showCompletedItems: true,
  currentFilter: '',
  filters: [
    { value: '', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'complete', label: 'Completed' },
  ],
  todoItems: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_TODO: {
      const { todo } = action.payload;

      return state.setIn(['todoItems', todo.id.toString()], Map(todo));
    }

    case Types.UPDATE_TODO: {
      const { todo } = action.payload;

      return state.setIn(['todoItems', todo.id.toString()], Map(todo));
    }

    case Types.TOGGLE_TODO: {
      const { todoId } = action.payload;
      const todo = state.getIn(['todoItems', todoId.toString()]);

      return state.setIn(
        ['todoItems', todoId.toString()],
        todo.set('isComplete', !todo.get('isComplete')),
      );
    }

    case Types.REMOVE_TODO: {
      const { todoId } = action.payload;

      return state.deleteIn(['todoItems', todoId.toString()]);
    }

    case Types.UPDATE_CURRENT_TODO: {
      const { todo } = action.payload;

      return state.set('currentTodo', Map(todo));
    }

    case Types.SET_COMPLETED_ITEMS_VISIBILITY: {
      const { isVisible } = action.payload;

      return state.set('showCompletedItems', isVisible);
    }

    case Types.CHANGE_FILTER: {
      const { filter } = action.payload;

      return state.set('currentFilter', filter);
    }

    default: {
      return state;
    }
  }
};
