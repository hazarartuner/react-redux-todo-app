import React from 'react';

import TodoInput from 'components/TodoInput';
import TodoItem from 'components/TodoItem';
import TodoList from 'components/TodoList';

import logo from 'assets/images/logo.svg';

import './App.scss';

const fakeData = [
  {
    id: 1,
    text: 'Donec feugiat diam et ultricies sollicitudin.',
    isComplete: false,
  },
  {
    id: 2,
    text: 'Vestibulum luctus massa et sollicitudin blandit.',
    isComplete: true,
  },
  {
    id: 3,
    text: 'Phasellus ut nulla sollicitudin quam tempus eleifend.',
    isComplete: false,
  },
];

export default () => (
  <div className="app__component">
    <img className="app-logo" src={logo} alt="ToDo App" />
    <div className="app-contents">
      <TodoInput />

      <TodoList>
        {fakeData.map(data => (
          <TodoItem key={data.id} {...data} />
        ))}
      </TodoList>
    </div>
  </div>
);
