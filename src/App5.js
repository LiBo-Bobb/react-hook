import React, { useState, useMemo, memo, useCallback, useRef, PureComponent, useEffect } from 'react'
import './App.css'
let idSeq = Date.now()
const Control = memo(function Control(props) {
  const { addTodo } = props
  const inputRef = useRef()
  const onSubmit = (e) => {
    e.preventDefault()
    const newText = inputRef.current.value.trim()
    if (!newText) {
      return
    }
    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false,
    })
    inputRef.current.value = ""

  }
  return <div className="control">
    <h1>Todos</h1>
    <form onSubmit={onSubmit}>
      <input type="text" ref={inputRef} className="new-todo" placeholder="What needs to be done?" />
    </form>
  </div>
})


const TodoItem = memo(function TodoItem(props) {
  const { todo: { id, text, complete }, removeTodo, toggleTodo, } = props
  const onChange = (e) => {
    toggleTodo(id)
  }
  const onRemove = () => {
    removeTodo(id)
  }
  return <li className="todo-item">
    <input type="checkbox" onChange={onChange} checked={complete} />
    <label className={complete ? 'complete' : ''}>
      {text}
    </label>
    <button onClick={onRemove}>
      &#xd7;
    </button>

  </li>

})
const Todos = memo(function Todos(props) {
  const { removeTodo, toggleTodo, todos } = props
  return <ul>
    {
      todos.map((todo) => {
        // 每条数据一个组件，可以避免个别数据变化，整个列表都重新渲染
        return <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo} />
      })
    }
  </ul>
})

let LS_KEY = '_$-todos-_'
function TodoList() {
  const [todos, setTodos] = useState([])
  const addTodo = useCallback((todo) => {
    setTodos((todos) => [todo, ...todos,])
  }, [])

  const removeTodo = useCallback((id) => {
    setTodos((todos) => todos.filter(todo => {
      return todo.id !== id
    }))
  }, [])

  const toggleTodo = useCallback((id) => {
    setTodos((todos) => todos.map(todo => {
      return todo.id === id
        ? {
          ...todo,
          complete: !todo.complete
        }
        : todo
    }))
  }, [])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    setTodos(todos)
  }, [])
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos])



  return <div className="todo-list">
    <Control addTodo={addTodo} />
    <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos} />
  </div>
}

export default TodoList