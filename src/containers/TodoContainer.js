import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { todoItemType, filterType } from 'helpers/types';
import {
  addTodo,
  updateTodo,
  toggleTodo,
  removeTodo,
  updateCurrentTodo,
  resetCurrentTodo,
  changeFilter,
  setCompletedItemsVisibility,
} from 'redux/actions';

import {
  todoItemsSelector,
  remainingItemCountSelector,
  allItemsCountSelector,
  filtersSelector,
  currentTodoSelector,
} from 'redux/selectors';

class TodoContainer extends Component {
  constructor(props) {
    super(props);

    this.handleOnFilterChange = this.handleOnFilterChange.bind(this);
    this.handleOnToggleVisibility = this.handleOnToggleVisibility.bind(this);
    this.handleOnToggleTodoItem = this.handleOnToggleTodoItem.bind(this);
    this.handleOnTodoItemSelect = this.handleOnTodoItemSelect.bind(this);
    this.handleOnTodoInputChange = this.handleOnTodoInputChange.bind(this);
    this.handleOnTodoTextKeyUp = this.handleOnTodoTextKeyUp.bind(this);
    this.handleOnDeleteTodoItem = this.handleOnDeleteTodoItem.bind(this);
  }

  handleOnFilterChange(filter) {
    const {
      showCompletedItems,
      setCompletedItemsVisibility: _setCompletedItemsVisibility,
      changeFilter: _changeFilter,
    } = this.props;

    _changeFilter(filter);
    _setCompletedItemsVisibility(filter === '' ? true : showCompletedItems);
  }

  handleOnToggleVisibility() {
    const {
      showCompletedItems,
      setCompletedItemsVisibility: _setCompletedItemsVisibility,
    } = this.props;

    _setCompletedItemsVisibility(!showCompletedItems);
  }

  handleOnToggleTodoItem(todoId) {
    const { toggleTodo: _toggleTodo } = this.props;

    _toggleTodo(todoId);
  }

  handleOnTodoItemSelect(todo) {
    const { updateCurrentTodo: _updateCurrentTodo } = this.props;

    if (!todo.isComplete) {
      _updateCurrentTodo(todo);
    }
  }

  handleOnTodoInputChange(e) {
    const { currentTodo, updateCurrentTodo: _updateCurrentTodo } = this.props;

    _updateCurrentTodo({
      ...currentTodo,
      text: e.target.value,
    });
  }

  handleOnTodoTextKeyUp(e) {
    const {
      currentTodo,
      addTodo: _addTodo,
      updateTodo: _updateTodo,
      resetCurrentTodo: _resetCurrentTodo,
    } = this.props;

    if (e.keyCode === 13 && currentTodo.text.length > 0) {
      if (currentTodo.id) {
        _updateTodo(currentTodo);
      } else {
        _addTodo({
          ...currentTodo,
          id: new Date().getTime(),
        });
      }

      _resetCurrentTodo();

      e.preventDefault();
    }
  }

  handleOnDeleteTodoItem(todoId) {
    const { removeTodo: _removeTodo } = this.props;

    _removeTodo(todoId);
  }

  render() {
    const {
      children,
      todoItems,
      currentTodo,
      filters,
      currentFilter,
      allItemsCount,
      remainingItemCount,
      showCompletedItems,
    } = this.props;

    return children({
      currentTodo,
      currentFilter,
      todoItems,
      allItemsCount,
      remainingItemCount,
      filters,
      showCompletedItems,
      onFilterChange: this.handleOnFilterChange,
      onToggleVisibility: this.handleOnToggleVisibility,
      onToggleTodoItem: this.handleOnToggleTodoItem,
      onTodoItemSelect: this.handleOnTodoItemSelect,
      onTodoInputChange: this.handleOnTodoInputChange,
      onTodoTextKeyUp: this.handleOnTodoTextKeyUp,
      onTodoItemDelete: this.handleOnDeleteTodoItem,
    });
  }
}

TodoContainer.propTypes = {
  children: PropTypes.func.isRequired,
  todoItems: PropTypes.arrayOf(todoItemType),
  currentTodo: todoItemType,
  filters: PropTypes.arrayOf(filterType),
  currentFilter: PropTypes.string,
  allItemsCount: PropTypes.number,
  showCompletedItems: PropTypes.bool,
  remainingItemCount: PropTypes.number,
  addTodo: PropTypes.func,
  updateTodo: PropTypes.func,
  toggleTodo: PropTypes.func,
  removeTodo: PropTypes.func,
  updateCurrentTodo: PropTypes.func,
  resetCurrentTodo: PropTypes.func,
  setCompletedItemsVisibility: PropTypes.func,
  changeFilter: PropTypes.func,
};

TodoContainer.defaultProps = {
  todoItems: [],
  currentTodo: { id: null, text: '', isComplete: false },
  filters: [],
  currentFilter: '',
  remainingItemCount: 0,
  allItemsCount: 0,
  showCompletedItems: false,
  addTodo: null,
  updateTodo: null,
  toggleTodo: null,
  removeTodo: null,
  updateCurrentTodo: null,
  resetCurrentTodo: null,
  setCompletedItemsVisibility: null,
  changeFilter: null,
};

export default connect(
  state => ({
    todoItems: todoItemsSelector(state),
    currentTodo: currentTodoSelector(state),
    allItemsCount: allItemsCountSelector(state),
    remainingItemCount: remainingItemCountSelector(state),
    filters: filtersSelector(state),
    currentFilter: state.get('currentFilter'),
    showCompletedItems: state.get('showCompletedItems'),
  }),
  {
    addTodo,
    updateTodo,
    toggleTodo,
    removeTodo,
    updateCurrentTodo,
    resetCurrentTodo,
    setCompletedItemsVisibility,
    changeFilter,
  },
)(TodoContainer);
