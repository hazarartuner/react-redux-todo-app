import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { todoItemType } from 'helpers/types';

import ConfirmModal from 'components/ConfirmModal';

import './TodoItem.scss';

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDeleteModal: false,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnDoubleClick = this.handleOnDoubleClick.bind(this);
    this.handleOnDeleteClick = this.handleOnDeleteClick.bind(this);
    this.handleOnAcceptDeletion = this.handleOnAcceptDeletion.bind(this);
    this.handleOnRejectDeletion = this.handleOnRejectDeletion.bind(this);
  }

  handleOnChange() {
    const { todo, onToggle } = this.props;

    if (onToggle) {
      onToggle(todo.id);
    }
  }

  handleOnDoubleClick(e) {
    const { onSelect, todo } = this.props;

    e.preventDefault();

    if (onSelect) {
      onSelect(todo.id);
    }
  }

  handleOnDeleteClick() {
    this.setState({
      showDeleteModal: true,
    });
  }

  handleOnAcceptDeletion() {
    const { onDelete, todo } = this.props;

    if (onDelete) {
      onDelete(todo.id);

      this.setState({
        showDeleteModal: false,
      });
    }
  }

  handleOnRejectDeletion() {
    this.setState({
      showDeleteModal: false,
    });
  }

  render() {
    const {
      todo: { text, isComplete },
    } = this.props;
    const { showDeleteModal } = this.state;

    return (
      <Fragment>
        {showDeleteModal && (
          <ConfirmModal
            title="Delete Warning!"
            message="Are you sure to delete?"
            onAccept={this.handleOnAcceptDeletion}
            onReject={this.handleOnRejectDeletion}
          />
        )}

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
          <p onDoubleClick={this.handleOnDoubleClick}>{text}</p>
          <button
            type="button"
            onClick={this.handleOnDeleteClick}
            disabled={isComplete}
          >
            Delete
          </button>
        </div>
      </Fragment>
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
