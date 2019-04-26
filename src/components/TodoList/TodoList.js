import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TodoList.scss';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.handleOnFilterChange = this.handleOnFilterChange.bind(this);
    this.handleOnToggleVisibility = this.handleOnToggleVisibility.bind(this);

    this.filters = [
      { value: '', label: 'All', isChecked: true },
      { value: 'active', label: 'Active', isChecked: false },
      { value: 'complete', label: 'Completed', isChecked: false },
    ];
  }

  handleOnFilterChange(e) {
    const { onFilterChange } = this.props;

    if (onFilterChange) {
      onFilterChange(e);
    }
  }

  handleOnToggleVisibility() {
    const { onToggleVisibility } = this.props;

    if (onToggleVisibility) {
      onToggleVisibility();
    }
  }

  render() {
    const { children, showCompletedItems } = this.props;

    return (
      <div className="todo-list__component">
        <div className="list-wrapper">{children}</div>
        <div className="list-footer">
          <span className="remaining-count">2 left</span>
          <div className="filter-list">
            {this.filters.map(filter => (
              <div
                key={filter.value}
                className={classNames('filter-item', {
                  checked: filter.isChecked,
                })}
              >
                <label htmlFor={`filter-${filter.value}`}>
                  {filter.label}
                  <input
                    id={`filter-${filter.value}`}
                    type="radio"
                    name="filter"
                    onChange={this.handleOnFilterChange}
                    value={filter.value}
                    checked={filter.isChecked}
                  />
                </label>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="toggle-visibility"
            onClick={this.handleOnToggleVisibility}
          >
            {showCompletedItems ? 'Hide Completed' : 'Show Completed'}
          </button>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  onFilterChange: PropTypes.func,
  onToggleVisibility: PropTypes.func,
  showCompletedItems: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element),
};

TodoList.defaultProps = {
  onFilterChange: null,
  onToggleVisibility: null,
  showCompletedItems: true,
  children: null,
};

export default TodoList;
