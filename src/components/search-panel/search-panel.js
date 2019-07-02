import React from 'react';
import './search-panel.css';

export default class SearchPanel extends React.Component {

  state = {
    term: '',
  }

  sendText = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearch(term);
  }

  render() {
    return (
      <input type="text" onChange={this.sendText}
        className="form-control search-form"
        value={this.state.term}
        placeholder="type to search" />
    );
  }
}
