import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { todoItemType } from 'helpers/types';

import './TodoItem.scss';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
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
      </div>
    );
  }
}

TodoItem.propTypes = {
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
  todo: todoItemType.isRequired,
};

TodoItem.defaultProps = {
  onToggle: null,
  onSelect: null,
};

export default TodoItem;
