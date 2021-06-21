import { useEffect, useState, useContext } from 'react'

import todoContext from './store/todo-context'
import './App.css'
import moonIcon from './assets/icon-moon.svg'
import sunIcon from './assets/icon-sun.svg'
import TodoForm from './components/TodoForm/TodoForm'
import AllTodo from './components/AllTodo/AllTodo'

const isThemeDark = localStorage.getItem('isDark')

function App() {
  const [isDark, updateTheme] = useState(isThemeDark)
  const todoCtx = useContext(todoContext)

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark')
      localStorage.setItem('isDark', true)
    } else {
      document.body.classList.remove('dark')
      localStorage.removeItem('isDark')
    }
  }, [isDark])

  const toggleThemeHandler = () => updateTheme(prev => !prev)

  return (
    <div className="container">
      <header>
        <h1>TODO</h1>
        <button className="theme_toggle" onClick={toggleThemeHandler}>
          <img src={isDark ? sunIcon : moonIcon} alt="Change Theme" />
        </button>
      </header>
      <TodoForm />
      <AllTodo />
      {todoCtx.todoList.length !== 0 && (
        <p className="info">Drag and drop to reorder list</p>
      )}
    </div>
  )
}

export default App
