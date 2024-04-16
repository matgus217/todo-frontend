import './App.css';
import React from "react";
import { nanoid } from "nanoid";
import Header from "./components/Header";
import Input from "./components/Input";
import Footer from "./components/Footer";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = React.useState([]);
  const [input, setInput] = React.useState("");

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function clearInput() {
    setInput("");
  }

  function createTodo() {
    const newTodo = {
      id: nanoid(),
      body: input,
      isEditable: false,
      isCompleted: false,
    };
    setTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    });
  }

  function handleClick() {
    createTodo();
    clearInput();
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      createTodo()
      clearInput()
    }
  }

  function deleteTodo(event, todoId) {
    event.stopPropagation();
    setTodos((prevToDos) =>
      prevToDos.filter((todoItem) => todoItem.id !== todoId)
    );
  }

  function toggleCompleted(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todoItem) => {
        return todoItem.id === id
          ? { ...todoItem, isCompleted: !todoItem.isCompleted }
          : todoItem;
      })
    );
  }

  function deleteSelected() {
    setTodos((prevToDos) =>
      prevToDos.filter((todoItem) => !todoItem.isCompleted)
    );
  }

  const completedTodos = todos.includes(todos.find((todo) => todo.isCompleted));

  // function handleTodoUpdate(e, id) {
  //   setTodos(prevTodos => prevTodos.map(todoItem => {
  //     return todoItem.id === id ?
  //     {...todoItem, body: e.target.value} :
  //     todoItem
  //   }))
  // }

  // function updateTodo(id) {
  //   setTodos(prevTodos => prevTodos.map(todoItem => {
  //     return todoItem.id === id ?
  //     {...todoItem, isEditable: !todoItem.isEditable} :
  //     todoItem
  //   }))
  // }

  const todoList = todos.map((todo) => {
    return (
      <Todo
        key={todo.id}
        id={todo.id}
        body={todo.body}
        isEditable={todo.isEditable}
        isCompleted={todo.isCompleted}
        deleteTodo={(event) => deleteTodo(event, todo.id)}
        // updateTodo={(event) => handleTodoUpdate(event, todo.id)}
        toggleCompleted={() => toggleCompleted(todo.id)}
      />
    );
  });

  return (
    <div className="App">
      <div className="header-input-container">
        <Header />
        <div className="input-container">
          <Input input={input} handleChange={handleInputChange} onKeyPress={(event)=>handleKeyPress(event)}/>
          <button 
            className="add-button" 
            onClick={input && handleClick}
            title="Add to List"
          >
            ➜
          </button>
        </div>
        <Footer />
        
      </div>
      <div className="output-container">
        {completedTodos && <button
          className="erase-button"
          onClick={deleteSelected}
          title="Delete Completed"
           >
            <span>Erase</span>


          
        </button>}
        <div className="todo-list">
          {todoList}
        </div>
      </div>
    </div>
  );
}



export default App;