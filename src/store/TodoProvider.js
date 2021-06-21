import { useState, useEffect } from 'react'

import todoContext from './todo-context'

const savedTodoList = JSON.parse(localStorage.getItem('todoList'))

function* genId() {
  let i = savedTodoList ? savedTodoList.length + 1 : 1
  while (true) {
    yield `todo-${i}`
    i++
  }
}
const idGenerator = genId()


function reorderList(list, show, destinationIndex, sourceIndex){
  const reorderedList = [...list]
  if (show === 'ALL') {
    const [item] = reorderedList.splice(sourceIndex, 1)
    reorderedList.splice(destinationIndex, 0, item)
  } else {
    const items = list.filter(item =>
      show === 'COMPLETED' ? item.isCompleted : !item.isCompleted
    )
    const indexsInList = items.map(item => list.indexOf(item))
    const [item] = items.splice(sourceIndex, 1)
    items.splice(destinationIndex, 0, item)
    indexsInList.forEach((indexInList, i) =>
      reorderedList.splice(indexInList, 1, items[i])
    )
  }
  return reorderedList
}


function TodoProvider(props) {
  const [todoList, updateList] = useState(savedTodoList || [])
  const [show, updateShow] = useState('ALL')

  useEffect(() => {
    localStorage.removeItem('todoList')
    if(todoList.length > 0){
      localStorage.setItem('todoList', JSON.stringify(todoList))
    }
  }, [todoList])

  const toggleTodoCompletedHandler = id => {
    updateList(prev =>
      prev.map(item => {
        if (item.id === id) item.isCompleted = !item.isCompleted
        return item
      })
    )
  }
  const addTodoHandler = todo =>
    updateList(prev => [...prev, { ...todo, id: idGenerator.next().value }])

  const deteleTodoHandler = id =>
    updateList(prev => prev.filter(item => item.id !== id))

  const clearCompletedHandler = () =>
    updateList(prev => prev.filter(item => !item.isCompleted))

  const updateShowHandler = todoState => updateShow(todoState)

  const reorderListHandler = dragDropResult => {
    const { destination, source } = dragDropResult
    if (destination) {
      updateList(prev => reorderList(prev, show, destination.index, source.index))
    }
  }

  const ctxValue = {
    todoList,
    show,
    clearCompleted: clearCompletedHandler,
    toggleTodoCompleted: toggleTodoCompletedHandler,
    setShow: updateShowHandler,
    addTodo: addTodoHandler,
    deleteTodo: deteleTodoHandler,
    reorderList: reorderListHandler,
  }

  return (
    <todoContext.Provider value={ctxValue}>
      {props.children}
    </todoContext.Provider>
  )
}

export default TodoProvider
