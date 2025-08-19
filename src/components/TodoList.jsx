import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Filter } from "lucide-react";
import styles from "./TodoList.module.css";

const TodoList = ({ todo, onUpdate, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");

  // 정렬 및 필터
  const [sort, setSort] = useState("date"); // 정렬 기준
  const [showFilter, setShowFilter] = useState(false);

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
      : todo.filter(
          (it) =>
            it.title.toLowerCase().includes(search.toLowerCase()) ||
            it.content.toLowerCase().includes(search.toLowerCase())
        );
  };

  // 정렬 기준 변경할 경우 화면에 반영하는 함수
  const onChangeSort = (value) => {
    setSort(value);
    setShowFilter(false);
  };

  // 정렬 함수
  const getSortedResult = () => {
    const searchedTodos = getSearchResult();

    switch (sort) {
      case "date":
        // 최신순
        return searchedTodos.sort((a, b) => b.createdDate - a.createdDate);

      case "title":
        // 제목 가나다순
        return searchedTodos.sort((a, b) => a.title.localeCompare(b.title));

      case "completed":
        // 완료된 것 먼저
        return searchedTodos.sort((a, b) => b.isDone - a.isDone);

      case "incomplete":
        // 미완료된 것 먼저
        return searchedTodos.sort((a, b) => a.isDone - b.isDone);

      default:
        return searchedTodos;
    }
  };

  const getSortLabel = () => {
    switch (sort) {
      case "date":
        return "최신순";
      case "title":
        return "가나다순";
      case "completed":
        return "완료순";
      case "incomplete":
        return "미완료순";
      default:
        return "최신순";
    }
  };

  return (
    <div className={styles.TodoList}>
      <div className={styles.header}>
        <h3>To Do List</h3>

        <input
          id="searchInput"
          name="search"
          value={search}
          onChange={onChangeSearch}
          className={styles.searchBar}
          placeholder="무엇을 찾고 계신가요?"
        />

        <div className={styles.filterWrapper}>
          <button
            className={styles.filterButton}
            onClick={() => setShowFilter(!showFilter)}
          >
            <Filter size={16} />
            {getSortLabel()}
          </button>

          {showFilter && (
            <div className={styles.filterDropdown}>
              <button
                onClick={() => onChangeSort("date")}
                className={sort === "date" ? styles.active : ""}
              >
                최신순
              </button>
              <button
                onClick={() => onChangeSort("title")}
                className={sort === "title" ? styles.active : ""}
              >
                가나다순
              </button>
              <button
                onClick={() => onChangeSort("incomplete")}
                className={sort === "incomplete" ? styles.active : ""}
              >
                미완료순
              </button>
              <button
                onClick={() => onChangeSort("completed")}
                className={sort === "completed" ? styles.active : ""}
              >
                완료순
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.listWrapper}>
        {getSortedResult().map((it) => {
          return (
            <TodoItem
              key={it.id}
              {...it}
              title={it.title}
              onUpdate={onUpdate}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
