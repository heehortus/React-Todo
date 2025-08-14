import { useState, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";

// mock
const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "TIL 작성하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "React 복습하기",
    createdDate: new Date().getTime(),
  },
];

function App() {
  const idRef = useRef(3);
  const [todo, setTodo] = useState(mockTodo);

  // 아이템 추가 함수
  const onCreate = (content) => {
    const newItem = {
      id: idRef.current,
      content,
      isDone: false,
      createdDate: new Date().getTime(),
    };

    setTodo([newItem, ...todo]);
    idRef.current += 1;
  };

  // 아이템 업데이트 함수 (체크박스 체크)
  const onUpdate = (targetId) => {
    setTodo(
      todo.map((it) =>
        it.id === targetId ? { ...it, isDone: !it.isDone } : it
      )
    );
  };

  // 아이템 삭제 함수
  // 해당 id를 가진 아이템 요소를 뺀 새 배열로 todo를 업데이트(필터)한다.
  const onDelete = (targetId) => {
    setTodo(todo.filter((it) => it.id !== targetId));
  };

  return (
    <div className="App">
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
