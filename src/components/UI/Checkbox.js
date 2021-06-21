import './Checkbox.css'
import checkIcon from '../../assets/icon-check.svg'

function Checkbox(props) {
  return (
    <button type="button" className={`checkbox ${props.checked && 'checked'}`} onClick={props.checkboxHandler}>
      {props.checked && <img src={checkIcon} alt="Checked" />}
    </button>
  )
}

export default Checkbox
