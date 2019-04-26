import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TodoItem.scss';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange() {
    const { id, isComplete, onToggle } = this.props;

    if (onToggle) {
      onToggle({
        id,
        isComplete: !isComplete,
      });
    }
  }

  render() {
    const { text, isComplete } = this.props;

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
        <p>{text}</p>
      </div>
    );
  }
}

TodoItem.propTypes = {
  onToggle: PropTypes.func,
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isComplete: PropTypes.bool,
};

TodoItem.defaultProps = {
  isComplete: false,
  onToggle: null,
};

export default TodoItem;
