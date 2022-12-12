import { useEffect, useState } from "react";
import LoginForm from "../presentational/LoginForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [buttonEnable, setButtonEnable] = useState(false);
  const navigate = useNavigate();

  // 이메일 및 패스워드 입력시 state 업데이트
  const onChangeLoginInput = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
  }

  // 로그인 기능 수행
  const login = (e) => {
    const url = process.env.REACT_APP_ServerURL+"/auth/signin"
    const config = {
      headers:{
        "Content-Type": "application/json"
      },
      timeout: 3000,
    }
    axios.post(url,loginInfo, config)
    .then((data)=>{
      switch(data.status){
        case 200:
          const token = data.data.access_token;
          localStorage.setItem("token", token);
          navigate("/todo");
          break;
        default:
          console.log(data);
          break;
      }
    })
    .catch((error)=>{
      alert("로그인에 실패하셨습니다.");
      console.log(error);
    })
  }

  // 회원가입 기능 수행
  const register = (e) => {
    const url = process.env.REACT_APP_ServerURL+"/auth/signup"
    const config = {
      headers:{
        "Content-Type": "application/json"
      },
      timeout: 3000,
    }
    axios.post(url,loginInfo, config)
    .then((data)=>{
      switch(data.status){
        case 201:
          setLoginInfo({email: "", password: ""});
          alert("회원가입이 완료되었습니다. 로그인해주세요.")
          break;
        default:
          console.log(data);
          break;
      }
    })
    .catch((error)=>{
      switch(error.response.status){
        case 400:
          alert(error.response.data.message);
          break;
        default:
          alert("회원가입에 실패했습니다.");
          console.log(error);
          break;
      }
    })
  }

  // Form이 전송될 때 호출할 이벤트 핸들러
  const onSubmitForm = (e) => {
    e.preventDefault();
    switch(e.nativeEvent.submitter.name)
    {
      case "login":
        login();
        break;
      case "register":
        register();
        break;
      default:
        break;
    }
  }

  //이메일 및 패스워드 유효성 검사
  const loginInfoCheck = (loginInfo) =>{
    
    const emailRegExp = /@+/;
    const passwordRegExp = /.{8,}/;

    if(emailRegExp.test(loginInfo.email) && passwordRegExp.test(loginInfo.password)){
      setButtonEnable(true)
    }else{
      setButtonEnable(false)
    }
  }

  // 이미 로그인한 상태라면 /todo로 리다이렉트
  useEffect(()=>{
    if(localStorage.getItem("token"))
      navigate("/todo");
  },[navigate])

  // 이메일 및 패스워드 입력값이 변경될 때마다 유효성 검사
  useEffect(()=>{
    loginInfoCheck(loginInfo);
  },[loginInfo]);

  return (
    <LoginForm onSubmitForm={onSubmitForm} onChangeLoginInput={onChangeLoginInput} buttonEnable={buttonEnable}/>
  )
}

export default Login;