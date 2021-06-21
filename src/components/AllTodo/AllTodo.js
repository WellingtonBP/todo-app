import { useContext, memo } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import todoContext from '../../store/todo-context'
import './AllTodo.css'
import AllTodoFooter from './AllTodoFooter/AllTodoFooter'
import TodoItem from '../TodoItem/TodoItem'

function AllTodo(props) {
  const todoCtx = useContext(todoContext)

  let list = todoCtx.todoList
  if (todoCtx.show !== 'ALL') {
    list = list.filter(item =>
      todoCtx.show === 'ACTIVE' ? !item.isCompleted : item.isCompleted
    )
  }

  if (todoCtx.todoList.length === 0) {
    return <h1 className="empty_list">Empty List</h1>
  }
  return (
    <section className="all_todo">
      <DragDropContext onDragEnd={todoCtx.reorderList}>
        <Droppable droppableId="todo-list">
          {provided => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {list.map((todo, index) => (
                <TodoItem
                  content={todo.content}
                  id={todo.id}
                  isCompleted={todo.isCompleted}
                  key={todo.id}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <AllTodoFooter
        qty={todoCtx.todoList.filter(item => !item.isCompleted).length}
        show={todoCtx.show}
        showAll={todoCtx.setShow.bind(null, 'ALL')}
        showActive={todoCtx.setShow.bind(null, 'ACTIVE')}
        showCompleted={todoCtx.setShow.bind(null, 'COMPLETED')}
        clearCompleted={todoCtx.clearCompleted}
      />
    </section>
  )
}

export default memo(AllTodo)
