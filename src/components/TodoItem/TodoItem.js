import { useContext } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import todoContext from '../../store/todo-context'
import './TodoItem.css'
import crossIcon from '../../assets/icon-cross.svg'
import Checkbox from '../UI/Checkbox'

function TodoItem(props) {
  const todoCtx = useContext(todoContext)

  const toggleTodoCompleted = () => todoCtx.toggleTodoCompleted(props.id)

  return (
    <Draggable draggableId={props.id} index={props.index} key={props.id}>
      {(provided, snapshot) => (
        <li
          className={`todo_item ${snapshot.isDragging && 'dragging'}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={`todo ${props.isCompleted && 'completed'}`}>
            <Checkbox
              checked={props.isCompleted}
              checkboxHandler={toggleTodoCompleted}
            />
            <h1 onClick={toggleTodoCompleted}>{props.content}</h1>
          </div>
          <button
            className="delete_todo"
            onClick={todoCtx.deleteTodo.bind(null, props.id)}
          >
            <img src={crossIcon} alt="Delete" />
          </button>
        </li>
      )}
    </Draggable>
  )
}

export default TodoItem
