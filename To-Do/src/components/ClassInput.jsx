/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react/destructuring-assignment */
import { Component } from 'react';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
      hasInput: false,
      edit: ''
    };


    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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

  handleEdit(index) {
    this.setState((state) => ({
      hasInput: !state.hasInput,
      edit: index
    }));
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
        <Count todos={this.state.todos} /> {/* Render the Count component and pass todos as props */}
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            <div style={{display: 'flex', margin: '1rem' }}>
              <EditBox hasInput={this.state.hasInput} edit={this.state.edit} todo={todo} key={todo}/>
              
              {/*This buttons should be dinamic components, edit to resumbit and delete to cancel*/}
              <button key={todo} onClick={() => this.handleEdit(todo)} style={{backgroundColor: 'orange', cursor: 'pointer'}}>Edit</button>
              <button key={todo} onClick={() => this.handleDelete(todo)} style={{backgroundColor: 'red', cursor: 'pointer'}}>Delete</button>
            </div>
          ))}
        </ul>
      </section>
    );
  }
}

class Count extends Component {
  render() {
    const count = this.props.todos.length;

    return (
      <div>
        <h4>Number of Todos: {count}</h4>
      </div>
    );
  }
}

class EditBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { todo, hasInput, edit } = this.props;
    console.log(edit);
      return (
        <div>
          {hasInput && edit === todo ? <input type='text' /> : <li key={todo}>{todo}</li>}
        </div>
      );
    }
}

export default ClassInput;
