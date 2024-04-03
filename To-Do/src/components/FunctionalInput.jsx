/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useState } from 'react';

// eslint-disable-next-line react/function-component-definition, react/prop-types
const FunctionalInput = ({ name }) => {

  const [todos, setTodos] = useState(['Just some demo tasks', 'As an example']);
  const [inputVal, setInputVal] = useState('');
  const [hasInput, setHasInput] = useState(false);
  const [edit, setEdit] = useState('');
  const [editingInputVal, setEditingInputVal] = useState('')


  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((todo) => [...todo, inputVal]);
    setInputVal('');
  };

  function handleResubmit(todo) {
      const updatedTodos = todos.map((existingTodo) => {
        if (existingTodo === todo) {
          return editingInputVal; 
        }
        return existingTodo; 
      });
      setTodos(updatedTodos)
  }
  
   function handleEdit(index) {
    setHasInput(!hasInput)
    setEdit(index)

  }

  function handleEditingInputChange(e) {
    setEditingInputVal(e.target.value)
  }
  
  

  function handleDelete(todo) {
      const updatedTodos = todos.filter(item => item !== todo); 
      setTodos(updatedTodos)
  }

  return (
    <section>
      <h3>{name}</h3>
      {/* The input field to enter To-Do's */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="task-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h4>All the tasks!</h4>
      <Count length={todos.length}/>
      {/* The list of all the To-Do's, displayed */}
      <ul>
      {todos.map((todo) => (
            <div style={{display: 'flex', margin: '1rem' }}>
              <EditBox hasInput={hasInput} edit={edit} todo={todo} handleEdit={handleEdit} handleDelete={handleDelete} handleEditingInputChange={handleEditingInputChange} handleResubmit={handleResubmit} editingInputVal={editingInputVal} />              
            </div>
          ))}
      </ul>
    </section>
  );
      }


function Count ({length}) {
  return (
    <div>
      <h4>Number of Todos: {length}</h4>
    </div>
  );
}

function EditAndSubmit ({todo, handleEdit, handleEditingInputChange, handleResubmit, editingInputVal}) {
  return (
    <div>
      <form onSubmit={() => handleResubmit(todo)}>
        <input
          type="text"
          name="task-entry"
          value={editingInputVal}
          onChange={handleEditingInputChange}
        />
        <button style={{backgroundColor: 'green', cursor: 'pointer'}} type="submit">Resubmit</button>
      </form>
      <button onClick={() => handleEdit(todo)} style={{backgroundColor: 'pink', cursor: 'pointer'}}>Cancel</button>
    </div>
  )
}

function Task ({todo, handleEdit, handleDelete}) {
  return (
    <div>
      <li key={todo}>{todo}</li>
      <button onClick={() => handleEdit(todo)} style={{backgroundColor: 'orange', cursor: 'pointer'}}>Edit</button>
      <button onClick={() => handleDelete(todo)} style={{backgroundColor: 'red', cursor: 'pointer'}}>Delete</button>
    </div>
  )
}

function EditBox ({hasInput, edit, todo, handleEdit, handleDelete, handleEditingInputChange, handleResubmit, editingInputVal }) {
  return (
    <div>
      {hasInput && edit === todo ? <EditAndSubmit todo={todo} handleEdit={handleEdit} handleEditingInputChange={handleEditingInputChange} handleResubmit={handleResubmit}/> : <Task todo={todo} handleEdit={handleEdit} handleDelete={handleDelete} editingInputVal={editingInputVal} />}
    </div>
  );
}

export default FunctionalInput;
