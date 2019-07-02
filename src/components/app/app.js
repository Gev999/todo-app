import React from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form'

import './app.css';

export default class App extends React.Component {

  maxId = 100;

  state = {
    todoData: [
      { label: 'Drink Coffee', important: false, done: false, id: 1 },
      { label: 'Make Awesome App', important: true, done: false, id: 2 },
      { label: 'Have a lunch', important: false, done: false, id: 3 },
      { label: 'Learn React', important: false, done: false, id: 4 }
    ],
    term: '',
    status: 'all',
  }

  deleteItem = (id) => {
    const { todoData } = this.state;
    const idx = todoData.findIndex((el) => el.id === id);
    this.setState(({ todoData }) => {
      const newData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return { todoData: newData }
    });
  }

  addItem = (text) => {

    const elem = {
      label: text,
      important: false,
      id: this.maxId++,
    }

    this.setState(({ todoData }) => {
      const newData = [...todoData, elem];
      return { todoData: newData };
    });
  }

  toggleProperty=(arr, id, property)=>{
    const idx = arr.findIndex((el)=>el.id===id);
    let elem = {...arr[idx]};
    elem[property] = !elem[property];
    return [...arr.slice(0, idx), elem, ...arr.slice(idx + 1)];
  }

  onToggleImportant = (id)=> {
    this.setState(({todoData})=> {
      return { todoData: this.toggleProperty(todoData, id, 'important') }
    });
  }

  onToggleDone = (id)=> {
    this.setState(({todoData})=> {
      return { todoData: this.toggleProperty(todoData, id, 'done') }
    });
  }
  

  workListCount =()=> {
    const { todoData } = this.state;
    const doneData = todoData.filter((el)=>el.done);
    const list={
      done: doneData.length,
      todo: todoData.length - doneData.length,
    }
    return list
  }

  termResult = (term)=> {
    this.setState({ term });
  }

  search(data, term, status) {
    let newData = data;

    if (status==='done') newData = newData.filter((el)=> el.done===true);
    else if (status==='active') newData = newData.filter((el)=>el.done===false);

    if (term==='') return newData;
    return newData.filter((el)=> el.label.toLowerCase().includes(term.toLowerCase()));
  }

  statusTerm=(term)=> {
    this.setState({ status: term });
  }


  render() {
    const { todoData, term, status } = this.state;
    const newData = this.search(todoData, term, status);
    const list = this.workListCount();
    return (
      <div className="todo-app">
        <AppHeader toDo={list.todo} done={list.done} />
        <div className="top-panel d-flex">
          <SearchPanel onSearch={this.termResult}/>
          <ItemStatusFilter statusTerm = {this.statusTerm} filter= {status}/>
        </div>
        <TodoList 
          todos={newData} 
          onDeleted={this.deleteItem} 
          onTogImp = {this.onToggleImportant}
          onTogDone = {this.onToggleDone}/>
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
};
