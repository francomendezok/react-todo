/* eslint-disable react/jsx-key */
/* eslint-disable react/destructuring-assignment */
import { Component } from 'react';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
    };

    this.editState = {
      hasInput: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
    }));
  }

  handleEdit() {
    this.setState({
      editState: !this.state.editState
    }, () => {
      // Este alert mostrará el nuevo valor de editState después de que se haya actualizado el estado
      alert(this.state.editState);
    });
  }
  

  handleDelete(todo) {
    this.setState(state => {
      const updatedTodos = state.todos.filter(item => item !== todo); // Filter out the todo to delete
      return {
        todos: updatedTodos,
        inputVal: '', // Clear inputVal as you've mentioned
      };
    });
  }

  

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {this.state.todos.length}
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            <div style={{display: 'flex', margin: '1rem' }}>
              <li key={todo}>{todo}</li>
              <button onClick={() => this.handleEdit()} style={{backgroundColor: 'orange', cursor: 'pointer'}}>Edit</button>
              <button onClick={() => this.handleDelete(todo)} style={{backgroundColor: 'red', cursor: 'pointer'}}>Delete</button>
            </div>
          ))}
        </ul>
      </section>
    );
  }
}

class Counter extends Component {
  constructor(props) {
    super(props)
  }

  sumList(list) {
    return list.length
  }


}

export default ClassInput;
