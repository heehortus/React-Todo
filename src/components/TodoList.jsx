import { useState } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = ({ todo, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");

  // 검색어 입력 내용 처리 함수
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  // 입력 검색어에 따라 아이템 필터링 함수
  // 검색어가 비었으면 todo 그대로 출력
  // 검색어가 있으면 todo filter
  // 대소문자 구별 안 가도록 (대문자 -> 소문자 변환)
  const getSearchResult = () => {
    return search === ""
      ? todo
      : todo.filter((it) =>
          it.content.toLowerCase().includes(search.toLowerCase())
        );
  };

  return (
    <div className="TodoList">
      <h4>To Do List</h4>
      <input
        value={search}
        onChange={onChangeSearch}
        className="SearchBar"
        placeholder="검색어를 입력하세요."
      />
      <div className="list-wrapper">
        {getSearchResult().map((it) => {
          return (
            <TodoItem
              key={it.id}
              {...it}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
