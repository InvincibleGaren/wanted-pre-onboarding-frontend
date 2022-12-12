import styled from "styled-components";
import LoginButton from "../presentational/LoginButton";
import FormInput from "./FormInput";
import RegisterButton from "./RegisterButton";

const Form = styled.form`

`
const FlexDiv = styled.div`
  display : flex;
  justify-content: ${({justifyContent}) => justifyContent || 'center'};
`

function LoginForm(props) {
  return (
    <FlexDiv>
      <Form onSubmit={props.onSubmitForm}>
        <FormInput name="email" type="email" onChangeLoginInput={props.onChangeLoginInput}>이메일</FormInput>
        <FormInput name="password" type="password" onChangeLoginInput={props.onChangeLoginInput}>비밀번호</FormInput>
        <FlexDiv justifyContent={"space-around"}>
          <LoginButton buttonEnable={props.buttonEnable}/>
          <RegisterButton buttonEnable={props.buttonEnable}/>
        </FlexDiv>
      </Form>
    </FlexDiv>
  )
}

export default LoginForm;