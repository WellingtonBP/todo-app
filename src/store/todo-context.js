import { createContext } from 'react'

const todoContext = createContext({
  todoList: [],
  show: 'ALL',
  clearCompleted: () => {},
  toggleTodoCompleted: id => {},
  deleteTodo: id => {},
  setShow: todoState => {},
  addTodo: todo => {},
  reorderList: dragDropResult => {},
})

export default todoContext
