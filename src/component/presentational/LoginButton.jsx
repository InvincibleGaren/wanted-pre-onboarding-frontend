import styled from "styled-components";


const Input = styled.input`
`

function LoginButton(props) {

  return (
    props.buttonEnable ? 
    <Input name="login" type={"submit"} value={"로그인"}></Input>
    :
    <Input name="login" type={"submit"} value={"로그인"} disabled></Input>
  )
}

export default LoginButton;