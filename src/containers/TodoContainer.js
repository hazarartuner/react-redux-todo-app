import { Component } from 'react';
import PropTypes from 'prop-types';

class TodoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTodo: { id: null, text: '', isComplete: false },
      showCompletedItems: true,
      currentFilter: '',
      filters: [
        { value: '', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'complete', label: 'Completed' },
      ],
      todoItems: [],
    };

    this.handleOnFilterChange = this.handleOnFilterChange.bind(this);
    this.handleOnToggleVisibility = this.handleOnToggleVisibility.bind(this);
    this.handleOnToggleTodoItem = this.handleOnToggleTodoItem.bind(this);
    this.handleOnTodoItemSelect = this.handleOnTodoItemSelect.bind(this);
    this.handleOnTodoInputChange = this.handleOnTodoInputChange.bind(this);
    this.handleOnTodoTextKeyUp = this.handleOnTodoTextKeyUp.bind(this);
    this.handleOnDeleteTodoItem = this.handleOnDeleteTodoItem.bind(this);
  }

  handleOnFilterChange(filter) {
    const { showCompletedItems } = this.state;

    this.setState({
      currentFilter: filter,
      showCompletedItems: filter === '' ? true : showCompletedItems,
    });
  }

  handleOnToggleVisibility() {
    const { showCompletedItems } = this.state;

    this.setState(() => ({
      showCompletedItems: !showCompletedItems,
    }));
  }

  handleOnToggleTodoItem(todoId) {
    const { todoItems } = this.state;

    this.setState({
      todoItems: todoItems.reduce((acc, curr) => {
        acc.push({
          ...curr,
          isComplete: curr.id === todoId ? !curr.isComplete : curr.isComplete,
        });

        return acc;
      }, []),
    });
  }

  handleOnTodoItemSelect(todoId) {
    const { todoItems } = this.state;
    const selectedTodo =
      todoItems.find(todoItem => todoItem.id === todoId) || {};

    if (!selectedTodo.isComplete) {
      this.setState({
        currentTodo: {
          ...selectedTodo,
        },
      });
    }
  }

  handleOnTodoInputChange(e) {
    const { currentTodo } = this.state;

    this.setState({
      currentTodo: {
        ...currentTodo,
        text: e.target.value,
      },
    });
  }

  handleOnTodoTextKeyUp(e) {
    if (e.keyCode === 13) {
      const { currentTodo, todoItems } = this.state;
      const newState = {};

      newState.currentTodo = { id: null, text: '', isComplete: false };

      if (currentTodo.id) {
        newState.todoItems = todoItems.reduce((acc, curr) => {
          acc.push({
            ...curr,
            text: currentTodo.id === curr.id ? currentTodo.text : curr.text,
          });

          return acc;
        }, []);
      } else {
        newState.todoItems = [
          ...todoItems,
          {
            ...currentTodo,
            id: new Date().getTime() + Math.ceil(Math.random() * 10000),
          },
        ];
      }

      this.setState(newState);

      e.preventDefault();
    }
  }

  handleOnDeleteTodoItem(todoId) {
    const { todoItems } = this.state;

    this.setState({
      todoItems: todoItems.reduce((acc, curr) => {
        if (curr.id !== todoId) {
          acc.push(curr);
        }

        return acc;
      }, []),
    });
  }

  render() {
    const { children } = this.props;
    const {
      currentTodo,
      currentFilter,
      filters,
      todoItems,
      showCompletedItems,
    } = this.state;

    return children({
      currentTodo,
      currentFilter,
      todoItems: todoItems.filter(todoItem => {
        if (!currentFilter) {
          return showCompletedItems ? true : todoItem.isComplete === false;
        }

        return currentFilter === 'active'
          ? todoItem.isComplete === false
          : todoItem.isComplete === true;
      }),
      remainingItemCount: todoItems.filter(todoItem => !todoItem.isComplete)
        .length,
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
};

export default TodoContainer;
