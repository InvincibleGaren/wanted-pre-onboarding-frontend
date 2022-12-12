
function FormInput(props) {

  return (
    <div>
      <label>{props.children}</label>
      <input name={props.name} type={props.type} onChange={props.onChangeLoginInput}></input>
    </div>
  )
}

export default FormInput;