import { useState, useRef } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    // add tasks
    const name = todoNameRef.current.value;
    if(name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4(), name, completed: false}]
    })
    todoNameRef.current.value = null;
  }

  const toggleTodo = (id) => {
    //change checked status
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }

  return (
    <div>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef}></input>
      <button onClick={handleAddTodo}>Add Task</button> 
      <button onClick={handleClear}>Delete completed tasks</button>
      <div>Remaining Tasks: {todos.filter((todo) => !todo.completed).length}</div>
    </div>
  )
}

export default App;
