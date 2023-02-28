import React, { useState } from 'react';
import TodoCounter from './componentes/TodoCounter';
import TodoList from './componentes/TodoList';
import TodoItem from './componentes/TodoItem';
import TodoSearch from './componentes/TodoSearch';
import CreateTodoButton from './componentes/CreateTodoButton';

//import './App.css';

const todos =[
  {text : 'Practicar guitarra', completed: false},
  {text : 'Hace ejercicio', completed: false},
  {text : 'Estudiar ingles', completed: false},
  {text : 'Comer saludable', completed: false},
  {text : 'No comer azucar jajaj', completed: false}
  
]

function App() {

  const [todoss, setTodos] = React.useState(todos);
  const [stateSearch, setStateSearch] = React.useState("");
  const completados  = todoss.filter(todo => !!todo.completed).length;
  const totalTodos =  todoss.length;

  let filTodos = [];

  if (!stateSearch.length >= 1){
    filTodos = todoss;
  } else {
    filTodos = todoss.filter (todo =>{
      const todoText = todo.text.toLowerCase()
      const searText = stateSearch.toLowerCase();
      return todoText.includes(searText);
    })
  }

    const completeTodos = (text) => {
      const auxText = todoss.findIndex((todo) => todo.text === text );
      const newTodos  = [...todoss];
      newTodos[auxText].completed = true;
      setTodos(newTodos); 

    };

    const eliminarTodos = (text) => {
      const auxText = todoss.findIndex((todo) => todo.text === text );
      const newTodos  = [...todoss];
      newTodos.splice(auxText, 1);
      setTodos(newTodos);
    }
    

  return (
  <React.Fragment>
      <TodoCounter 
      total = {totalTodos}
      completed = {completados}
      />
        
      <TodoSearch 
        stateSearch={stateSearch}
        setStateSearch= {setStateSearch}
      />
      <TodoList >
        {filTodos.map(todo =>(
          <TodoItem 
            key={todo.text} 
            text = {todo.text} 
            completed = {todo.completed}
            tachar = {() => completeTodos(todo.text)}
            eliminar = {() => eliminarTodos(todo.text)}
          />

          )) }
        
      </TodoList>
     <CreateTodoButton/>
        
    </React.Fragment>

    );
}

export default App;
