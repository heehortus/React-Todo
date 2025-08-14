import { useRef, useState } from "react";
import "./TodoEditor.css";

const TodoEditor = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const inputRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

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
    <div className="TodoEditor">
      <h4>새로운 To do 작성하기</h4>
      <div className="editor-wrapper">
        <input
          ref={inputRef}
          value={content}
          onChange={onChangeContent}
          onKeyDown={onKeyDown}
          placeholder="오늘의 할 일을 생성해보세요!"
        />
        <button onClick={onSubmit}>생성</button>
      </div>
    </div>
  );
};

export default TodoEditor;
