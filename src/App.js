import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/container/Login";
import Todo from "./component/container/Todo";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/todo" element={<Todo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
