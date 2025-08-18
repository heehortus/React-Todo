import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import styles from "./TodoEditor.module.css";

const TodoEditor = ({ onCreate }) => {
  const [content, setContent] = useState("");

  const inputRef = useRef();

  // Todo 내용 적는 함수
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  // Todo 등록(생성)) 함수
  const onSubmit = () => {
    if (!content) {
      inputRef.current.focus();
      return;
    }

    onCreate(content);
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
      <h4>새로운 Todo 작성하기</h4>
      <div className={styles.editWrapper}>
        <input
          id="todoInput"
          name="todoContent"
          ref={inputRef}
          value={content}
          onChange={onChangeContent}
          onKeyDown={onKeyDown}
          placeholder="오늘은 무엇을 해볼까요?"
        />
        <button onClick={onSubmit}>
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};

export default TodoEditor;
