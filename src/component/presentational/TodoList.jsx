import TodoListItem from "./TodoListItem";
import styled from "styled-components";

const FlexDiv = styled.div`
  display : flex;
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
`

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

function TodoList(props) {
  return (
    <FlexDiv>
      <div>
        <textarea name="todo" onChange={props.onChangeTodoListItem} value={props.todoListItem.todo}></textarea>
        <button onClick={props.createTodo}>투두리스트 추가</button>
        <Ul>
          {
            
            props.todoList.map((item, index) => <TodoListItem key={index} todoItem={item} 
            deleteTodo={props.deleteTodo}
            updateTodo={props.updateTodo}
            updateTodoListItem={props.updateTodoListItem}
            onChangeUpdateTodoListItem={props.onChangeUpdateTodoListItem}
            clearUpdateTodoListItem={props.clearUpdateTodoListItem}
            index={index}/>)
          }
        </Ul>
      </div>

    </FlexDiv>
  )
}

export default TodoList;