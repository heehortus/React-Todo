import { useRef, useState } from "react";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import Calendar from "../components/Calendar";
import styles from "./TodoEditor.module.css";

const TodoEditor = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const titleInputRef = useRef();
  const contentInputRef = useRef();

  // 캘린더 토글
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // 날짜 선택
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // 날짜 포맷팅
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const dayName = dayNames[date.getDay()];

    return `${year}.${month}.${day} (${dayName})`;
  };

  // Todo 제목 적는 함수
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  // Todo 내용 적는 함수
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  // Todo 등록(생성)) 함수
  const onSubmit = () => {
    if (!title) {
      titleInputRef.current.focus();
      return;
    }

    if (!content) {
      contentInputRef.current.focus();
      return;
    }

    onCreate(title, content, selectedDate.getTime());
    setTitle("");
    setContent("");
  };

  // enter 누르면 onCreate
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <div className={styles.TodoEditor}>
      <h3>새로운 Todo 작성하기</h3>

      <h5>날짜</h5>
      <div className={styles.editWrapper}>
        <div className={styles.dateInputWrapper} onClick={toggleCalendar}>
          <span className={styles.dateDisplay}>{formatDate(selectedDate)}</span>
          <CalendarIcon size={18} className={styles.calendarIcon} />
        </div>
      </div>

      <h5>제목</h5>
      <div className={styles.editWrapper}>
        <input
          id="todoTitleInput"
          name="todoTitle"
          ref={titleInputRef}
          value={title}
          onChange={onChangeTitle}
          onKeyDown={onKeyDown}
          placeholder="오늘의 To-do 제목을 작성해주세요!"
          className={styles.titleInput}
        />
      </div>

      <h5>내용</h5>
      <div className={styles.editWrapper}>
        <input
          id="todoInput"
          name="todoContent"
          ref={contentInputRef}
          value={content}
          onChange={onChangeContent}
          onKeyDown={onKeyDown}
          placeholder="무엇을 해볼까요?"
        />
      </div>
      <button onClick={onSubmit} className={styles.submitButton}>
        <Plus size={20} />
      </button>

      {showCalendar && (
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onClose={() => setShowCalendar(false)}
        />
      )}
    </div>
  );
};

export default TodoEditor;
