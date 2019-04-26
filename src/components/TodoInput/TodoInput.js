import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TodoInput.scss';

class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
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

  render() {
    const { text } = this.props;

    return (
      <div className="todo-input__component">
        <input
          ref={this.inputRef}
          type="text"
          onChange={this.handleOnChange}
          value={text}
          placeholder="What need to be done?"
        />
      </div>
    );
  }
}

TodoInput.propTypes = {
  onTextChange: PropTypes.func,
  text: PropTypes.string,
};

TodoInput.defaultProps = {
  onTextChange: null,
  text: '',
};

export default TodoInput;
