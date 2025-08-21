import React from "react";
import { useMemo, useCallback, useReducer, useRef, useEffect } from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";
import Toast from "./components/Toast";

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

// mock 데이터
const mockTodo = [
  {
    id: 0,
    isDone: false,
    title: "REACT 공부",
    content: "챕터 1 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    title: "TIL 작성",
    content: "오늘치 TIL 작성하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    title: "React 복습",
    content: "챕터 3 복습하기",
    createdDate: new Date().getTime(),
  },
];

// useReducer를 사용하기 위한 reducer 함수
function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.newItem, ...state];

    case "UPDATE":
      return state.map((it) =>
        it.id === action.targetId ? { ...it, isDone: !it.isDone } : it
      );

    case "EDIT":
      return state.map((it) =>
        it.id === action.targetId
          ? {
              ...it,
              title: action.newTitle,
              content: action.newContent,
            }
          : it
      );

    case "DELETE":
      return state.filter((it) => it.id !== action.targetId);

    default:
      return state;
  }
}

function toastReducer(state, action) {
  switch (action.type) {
    case "SHOW":
      return true;
    case "HIDE":
      return false;
    default:
      return state;
  }
}

function App() {
  // Toast 표시 상태 useState -> useReducer로 변경
  const [showToast, toastDispatch] = useReducer(toastReducer, false);
  const toastTimeoutRef = useRef(null);

  // useReducer로 변경
  const [todo, todoDispatch] = useReducer(todoReducer, null, () => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : mockTodo;
  });

  const idRef = useRef(3);

  // // 컴포넌트 변수 idRef
  // // 아이템 생성할 때마다 idRef의 현재값 1씩 증가
  // // localStorage 읽어서 나온 데이터의 최대 ID + 1
  // const idRef = useRef(() => {
  //   const mockData = getmockData();
  //   mockData.length > 0 ? Math.max(...mockData.map((it) => it.id)) + 1 : 0;
  // });

  // todo가 변경될 때마다 로컬 스토리지에 저장
  // JSON.stringfy(todo): todo 객체를 문자열로 바꿈
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  // toast setTime cleanup useEffect 추가
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  // 아이템 추가 함수
  const onCreate = useCallback((title, content, selectedDate) => {
    todoDispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        title,
        content,
        isDone: false,
        createdDate: selectedDate,
      },
    });

    idRef.current += 1;

    // setTimeout cleanup
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    // toast 알림 로직: 2초 후 사라진다.
    toastDispatch({ type: "SHOW" });
    setTimeout(() => {
      toastDispatch({ type: "HIDE" });
    }, 2000);
  }, []);

  // 아이템 업데이트 함수 (체크박스 체크)
  const onUpdate = useCallback((targetId) => {
    todoDispatch({
      type: "UPDATE",
      targetId,
    });
  }, []);

  // 아이템 수정 함수
  const onEdit = useCallback((targetId, newTitle, newContent) => {
    todoDispatch({
      type: "EDIT",
      targetId,
      newTitle,
      newContent,
    });
  }, []);

  // 아이템 삭제 함수
  // 해당 id를 가진 아이템 요소를 뺀 새 배열로 todo를 업데이트(필터)한다.
  const onDelete = useCallback((targetId) => {
    todoDispatch({
      type: "DELETE",
      targetId,
    });
  }, []);

  const onToastClose = useCallback(() => {
    todoDispatch({ type: "HIDE" });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onUpdate, onEdit, onDelete };
  }, []);

  return (
    <div className={styles.App}>
      <Header />
      <TodoStateContext.Provider value={todo}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
      <Toast
        message="할 일이 추가되었습니다!"
        isVisible={showToast}
        onClose={onToastClose}
      />
    </div>
  );
}

export default App;
