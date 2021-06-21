import { useState, useContext, memo } from 'react'

import todoContext from '../../store/todo-context'
import './TodoForm.css'
import Checkbox from '../UI/Checkbox'

function TodoForm(props) {
  const [isChecked, setCheckbox] = useState(false)
  const [invalidTodoContent, setInvalidTodoContent] = useState(false)
  const [todoContent, setTodoContent] = useState('')
  const todoCtx = useContext(todoContext)

  const submitHandler = event => {
    event.preventDefault()
    if(todoContent === '') return setInvalidTodoContent(true)
    todoCtx.addTodo({content: todoContent, isCompleted: isChecked})
    setInvalidTodoContent(false)
    setTodoContent('')
  }

  return (
    <form
      className={`todo_form ${invalidTodoContent && 'invalid'}`}
      onSubmit={submitHandler}
    >
      <Checkbox
        checked={isChecked}
        checkboxHandler={() => setCheckbox(prev => !prev)}
      />
      <input
        type="text"
        placeholder="Create a new todo..."
        maxLength="60"
        value={todoContent}
        onChange={event => setTodoContent(event.target.value)}
      />
    </form>
  )
}

export default memo(TodoForm)
