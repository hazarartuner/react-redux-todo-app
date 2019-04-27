import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { todoItemType } from 'helpers/types';

import './TodoInput.scss';

class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  handleOnChange(e) {
    const { onTextChange } = this.props;

    if (onTextChange) {
      onTextChange(e);
    }
  }

  handleOnKeyUp(e) {
    const { onTextKeyUp } = this.props;

    if (onTextKeyUp) {
      onTextKeyUp(e);
    }
  }

  render() {
    const { todo } = this.props;

    return (
      <div className="todo-input__component">
        <input
          ref={this.inputRef}
          type="text"
          onChange={this.handleOnChange}
          onKeyUp={this.handleOnKeyUp}
          value={todo.text}
          placeholder="What need to be done?"
        />
      </div>
    );
  }
}

TodoInput.propTypes = {
  onTextChange: PropTypes.func,
  onTextKeyUp: PropTypes.func,
  todo: todoItemType,
};

TodoInput.defaultProps = {
  onTextChange: null,
  onTextKeyUp: null,
  todo: { id: null, text: '', isComplete: false },
};

export default TodoInput;
