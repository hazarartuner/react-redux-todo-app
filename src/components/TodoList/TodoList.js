import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { filterType } from 'helpers/types';

import './TodoList.scss';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.handleOnFilterChange = this.handleOnFilterChange.bind(this);
    this.handleOnToggleVisibility = this.handleOnToggleVisibility.bind(this);
  }

  handleOnFilterChange(e) {
    const { onFilterChange } = this.props;

    if (onFilterChange) {
      onFilterChange(e.target.value);
    }
  }

  handleOnToggleVisibility() {
    const { onToggleVisibility } = this.props;

    if (onToggleVisibility) {
      onToggleVisibility();
    }
  }

  render() {
    const {
      children,
      filters,
      currentFilter,
      remainingItemCount,
      showCompletedItems,
      hideFooter,
    } = this.props;

    return (
      <div className="todo-list__component">
        <div className="list-wrapper">{children}</div>
        {!hideFooter && (
          <div className="list-footer">
            <span className="remaining-count">{remainingItemCount} left</span>
            <div className="filter-list">
              {filters.map(filter => (
                <div
                  key={filter.value}
                  className={classNames('filter-item', {
                    checked: filter.value === currentFilter,
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
                      checked={filter.value === currentFilter}
                    />
                  </label>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="toggle-visibility"
              onClick={this.handleOnToggleVisibility}
              disabled={currentFilter !== ''}
            >
              {showCompletedItems ? 'Hide Completed' : 'Show Completed'}
            </button>
          </div>
        )}
      </div>
    );
  }
}

TodoList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  filters: PropTypes.arrayOf(filterType).isRequired,
  showCompletedItems: PropTypes.bool,
  hideFooter: PropTypes.bool,
  remainingItemCount: PropTypes.number,
  currentFilter: PropTypes.string,
  onFilterChange: PropTypes.func,
  onToggleVisibility: PropTypes.func,
};

TodoList.defaultProps = {
  children: null,
  showCompletedItems: true,
  hideFooter: false,
  remainingItemCount: 0,
  currentFilter: '',
  onFilterChange: null,
  onToggleVisibility: null,
};

export default TodoList;
