import React, { Component } from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {
 render() {
    const { label, onDeleted, onTogImp, onTogDone, important, done } = this.props;
    let className = done ? 'todo-list-item done' : 'todo-list-item';
    if (important) { className += ' important' };

    return (
      <span className={className}>
        <span
          className="todo-list-item-label" onClick={onTogDone}>
          {label}
        </span>

        <button type="button" onClick={ onTogImp }
          className="btn btn-outline-success btn-sm float-right">
          <i className="fa fa-exclamation" />
        </button>

        <button type="button" onClick={ onDeleted }
          className="btn btn-outline-danger btn-sm float-right">
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  };
}

