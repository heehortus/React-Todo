import { useState, useRef, useEffect } from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";
import Toast from "./components/Toast";

// mock 데이터
// const mockTodo = [
//   {
//     id: 0,
//     isDone: false,
//     content: "React 공부하기",
//     createdDate: new Date().getTime(),
//   },
//   {
//     id: 1,
//     isDone: false,
//     content: "TIL 작성하기",
//     createdDate: new Date().getTime(),
//   },
//   {
//     id: 2,
//     isDone: false,
//     content: "React 복습하기",
//     createdDate: new Date().getTime(),
//   },
// ];

function App() {
  // 컴포넌트 변수 idRef
  // 아이템 생성할 때마다 idRef의 현재값 1씩 증가
  // const idRef = useRef(3);
  // const [todo, setTodo] = useState(mockTodo);

  // Toast 표시 상태
  const [showToast, setShowToast] = useState(false);

  // 로컬 스토리지에서 데이터 불러오기
  const [todo, setTodo] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // 로컬 스토리지에서 마지막 ID 불러오기
  const idRef = useRef(
    (() => {
      const savedTodos = localStorage.getItem("todos");
      if (savedTodos) {
        const todos = JSON.parse(savedTodos);
        return todos.length > 0
          ? Math.max(...todos.map((todo) => todo.id)) + 1
          : 0;
      }
      return 1;
    })()
  );

  // todo가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

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

    // toast 알림 로직: 초 후 사라진다.
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  // 아이템 업데이트 함수 (체크박스 체크)
  const onUpdate = (targetId) => {
    setTodo(
      todo.map((it) =>
        it.id === targetId ? { ...it, isDone: !it.isDone } : it
      )
    );
  };

  // 아이템 수정 함수
  const onEdit = (targetId, newContent) => {
    setTodo(
      todo.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  // 아이템 삭제 함수
  // 해당 id를 가진 아이템 요소를 뺀 새 배열로 todo를 업데이트(필터)한다.
  const onDelete = (targetId) => {
    setTodo(todo.filter((it) => it.id !== targetId));
  };

  return (
    <div className={styles.App}>
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList
        todo={todo}
        onUpdate={onUpdate}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <Toast
        message="할 일이 추가되었습니다!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default App;
