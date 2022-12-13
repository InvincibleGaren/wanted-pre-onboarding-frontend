import { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "../presentational/TodoList";
import { useNavigate } from "react-router-dom";


function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [todoListItem, setTodoListItem] = useState({
    todo : ""
  })
  const [updateTodoListItem, setUpdateTodoListItem] = useState({
    todo : "",
    isCompleted : false,
  })
  
  const navigate = useNavigate();

  // 투두리스트 내용 입력시 state 업데이트
  const onChangeTodoListItem = (e) => {
    setTodoListItem({ ...todoListItem, [e.target.name]: e.target.value })
  }

  // 투두리스트 수정 목적으로 내용 입력시 state 업데이트
    const onChangeUpdateTodoListItem = (e) => {
      switch(e.target.name) {
        case 'todo':
          setUpdateTodoListItem({ ...updateTodoListItem, [e.target.name]: e.target.value })
          break;
        case 'isCompleted':
          setUpdateTodoListItem({ ...updateTodoListItem, [e.target.name]: e.target.checked })
          break;
        default:
          break;
      }
    }

  // 투두리스트 수정 모드에서 취소를 누른 경우 state 원상 복귀
  const clearUpdateTodoListItem = (todo, isCompleted) => {
    setUpdateTodoListItem({todo : todo, isCompleted : isCompleted,})
  }
  

  // 투두리스트 항목 조회
  const getTodos = () => {
    const url = process.env.REACT_APP_ServerURL+"/todos"
    const config = {
      headers:{
        "Authorization": "Bearer "+localStorage.getItem("token")
      },
      timeout: 3000,
    }
    axios.get(url, config)
    .then((data)=>{
      switch(data.status){
        case 200:
          setTodoList(data.data);
          break;
        default:
          console.log(data);
          break;
      }
    })
    .catch((error)=>{
      alert("불러오기에 실패하셨습니다.");
      console.log(error);
    })
  }


  // 투두리스트 항목 추가
  const createTodo = () => {
    const url = process.env.REACT_APP_ServerURL+"/todos"
    const config = {
      headers:{
        "Authorization": "Bearer "+localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      timeout: 3000,
    }
    axios.post(url, todoListItem, config)
    .then((data)=>{
      switch(data.status){
        case 201:
          getTodos();
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
          console.log(error);
          break;
      }
    })    
  }

  // 투두리스트 업데이트
  const updateTodo = (e, updateId) => {
    const url = process.env.REACT_APP_ServerURL+"/todos/"+updateId;
    const config = {
      headers:{
        "Authorization": "Bearer "+localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      timeout: 3000,
    }
    axios.put(url, updateTodoListItem, config)
    .then((data)=>{
      switch(data.status){
        case 200:
          getTodos();
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
          console.log(error);
          break;
      }
    })   
  }

  // 투두리스트 항목 삭제
  const deleteTodo = (e, deleteIndex) => {
    const url = process.env.REACT_APP_ServerURL+"/todos/"+deleteIndex;
    const config = {
      headers:{
        "Authorization": "Bearer "+localStorage.getItem("token"),
      },
      timeout: 3000,
    }
    axios.delete(url, config)
    .then((data)=>{
      switch(data.status){
        case 204:
          getTodos();
          break;
        default:
          console.log(data);
          break;
      }
    })
    .catch((error)=>{
      alert("삭제에 실패하셨습니다.");
      console.log(error);
    })   
  }

  /* 로그인안 상태가 아니라면 /로 리다이렉트,
     로그인한 상태라면 투두리스트 출력*/
  useEffect(()=>{
    if(!localStorage.getItem("token"))
      navigate("/");
    else{
      getTodos();
    }
  },[navigate])

  return (
    <TodoList todoList={todoList} todoListItem={todoListItem} onChangeTodoListItem={onChangeTodoListItem} 
    createTodo={createTodo}
    deleteTodo={deleteTodo}
    updateTodo={updateTodo}
    updateTodoListItem={updateTodoListItem}
    onChangeUpdateTodoListItem={onChangeUpdateTodoListItem}
    clearUpdateTodoListItem={clearUpdateTodoListItem}/>
  )
}

export default Todo;