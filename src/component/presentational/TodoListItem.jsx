import { useState } from "react";
import styled from "styled-components";


const Li = styled.li`
  display: flex;
  justify-content: space-between;
  & > *{
    width: 200px;
  }
`

function TodoListItem(props) {

  const [updateMode, setUpdateMode] = useState(false);

  const onClickUpdate = (e) => {
    setUpdateMode(true)
    props.clearUpdateTodoListItem(props.todoItem.todo, props.todoItem.isCompleted)
  }

  const onClickUpdateCancle = (e) => {
    setUpdateMode(false)
    props.clearUpdateTodoListItem(props.todoItem.todo, props.todoItem.isCompleted)
  }

  return (
    updateMode 
    ?
    <Li>
      <div>{props.todoItem.id}</div>
      <textarea name="todo" onChange={props.onChangeUpdateTodoListItem} defaultValue={props.todoItem.todo}></textarea>

      <input type="checkbox" name="isCompleted" onChange={props.onChangeUpdateTodoListItem} 
      defaultChecked={props.todoItem.isCompleted}></input>

      <div>{props.todoItem.userId}</div>
      <div>
        <button onClick={(e) => {setUpdateMode(false); props.updateTodo(e,props.todoItem.id)}}>제출</button>
      </div>
      <div>
        <button onClick={onClickUpdateCancle}>취소</button>
      </div>
    </Li>
    :
    <Li>
      <div>{props.todoItem.id}</div>
      <div>{props.todoItem.todo}</div>
        {props.todoItem.isCompleted
          ?
          <div>완료</div>
          :
          <div>미완료</div>
        }
      <div>{props.todoItem.userId}</div>
      <div>
        <button onClick={onClickUpdate}>수정</button>
      </div>
      <div>
        <button onClick={(e) => { props.deleteTodo(e, props.todoItem.id) }}>삭제</button>
      </div>
    </Li>
  )
}

export default TodoListItem;