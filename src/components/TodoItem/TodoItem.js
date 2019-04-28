import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { todoItemType } from 'helpers/types';

import './TodoItem.scss';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnDoubleClick = this.handleOnDoubleClick.bind(this);
    this.handleOnDeleteClick = this.handleOnDeleteClick.bind(this);
  }

  handleOnChange() {
    const { todo, onToggle } = this.props;

    if (onToggle) {
      onToggle(todo.id);
    }
  }

  handleOnDoubleClick(todoId) {
    const { onSelect } = this.props;

    return e => {
      e.preventDefault();

      if (onSelect) {
        onSelect(todoId);
      }

      return false;
    };
  }

  handleOnDeleteClick(todoId) {
    const { onDelete } = this.props;

    return () => {
      if (onDelete) {
        onDelete(todoId);
      }

      return false;
    };
  }

  render() {
    const {
      todo: { id, text, isComplete },
    } = this.props;

    return (
      <div
        className={classNames('todo-item__component', {
          complete: isComplete,
        })}
      >
        <input
          type="checkbox"
          onChange={this.handleOnChange}
          role="menuitemcheckbox"
          aria-checked={isComplete}
          checked={isComplete}
        />
        <p onDoubleClick={this.handleOnDoubleClick(id)}>{text}</p>
        <button type="button" onClick={this.handleOnDeleteClick(id)}>
          Delete
        </button>
      </div>
    );
  }
}

TodoItem.propTypes = {
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  todo: todoItemType.isRequired,
};

TodoItem.defaultProps = {
  onToggle: null,
  onSelect: null,
  onDelete: null,
};

export default TodoItem;
