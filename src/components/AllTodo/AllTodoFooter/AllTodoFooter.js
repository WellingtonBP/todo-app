import './AllTodoFooter.css'

function AllTodoFooter(props) {
  console.log(props.qty)
  return (
    <footer className="all_todo__footer">
      <p>{props.qty} items left</p>
      <nav>
        <button
          className={`nav_button ${props.show === 'ALL' && 'active'}`}
          onClick={props.showAll}
        >
          All
        </button>
        <button
          className={`nav_button ${props.show === 'ACTIVE' && 'active'}`}
          onClick={props.showActive}
        >
          Active
        </button>
        <button
          className={`nav_button ${props.show === 'COMPLETED' && 'active'}`}
          onClick={props.showCompleted}
        >
          Completed
        </button>
      </nav>
      <button className="clear_button" onClick={props.clearCompleted}>
        Clear Completed
      </button>
    </footer>
  )
}

export default AllTodoFooter
