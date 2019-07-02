import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

    state= {
        value: '',
        disabled: true,
    }

    onInputChange = (e)=> {
        const val = e.target.value==='';
        this.setState({ value: e.target.value, disabled: val });
    }

    addItem = (e)=> {
        e.preventDefault();
        this.props.onItemAdded(this.state.value);
        this.setState({ value: '', disabled: true });
    }

  render() {
    const { value, disabled } = this.state;
    return (
      <form className="item-add-form d-flex" onSubmit={this.addItem}>
        <input 
            type="text" 
            className="form-control search-input" 
            placeholder="What needs to be done"
            onChange={this.onInputChange}
            value={value}/>
        <button
          className="btn btn-outline-secondary" disabled={disabled}>
          Add Item
        </button>
      </form>
    )
  }
}