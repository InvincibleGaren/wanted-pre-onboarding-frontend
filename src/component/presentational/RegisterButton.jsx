import styled from "styled-components";


const Input = styled.input`
`

function RegisterButton(props) {

  return (
    props.buttonEnable ? 
    <Input name="register" type={"submit"} value={"회원가입"}></Input>
    :
    <Input name="register" type={"submit"} value={"회원가입"} disabled></Input>
  )
}

export default RegisterButton;