import React from "react";
import { useContext, useState } from "react";
import { TodoDispatchContext } from "../App";
// 아이콘
import { Edit, Check, Trash2 } from "lucide-react";
import styles from "./TodoItem.module.css";

const TodoItem = ({ id, title, content, isDone, createdDate }) => {
  const { onUpdate, onEdit, onDelete } = useContext(TodoDispatchContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  // 체크박스 체크 시 onUpdate 호출
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  // 삭제 버튼 클릭 시 onDelete 호출
  const onClickDelete = () => {
    onDelete(id);
  };

  // 수정 버튼 클릭 시 onEdit 호출
  const onClickEdit = () => {
    if (isEditing && editTitle.trim() && editContent.trim()) {
      onEdit(id, editTitle.trim(), editContent.trim());
    }

    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.todoItem}>
      <div className={styles.checkbox}>
        <input
          id={`todoCheckbox${id}`}
          name={`todoCheckbox${id}`}
          onChange={onChangeCheckbox}
          checked={isDone}
          type="checkbox"
        />
      </div>
      <div className={styles.content}>
        {isEditing ? (
          <div className={styles.editInputs}>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className={styles.editTitleInput}
              autoFocus
            />
            <input
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className={styles.editContentInput}
            />
          </div>
        ) : (
          <div className={styles.displayContent}>
            <div
              className={`${styles.title} ${isDone ? styles.completed : ""}`}
            >
              {title}
            </div>
            <div
              className={`${styles.description} ${
                isDone ? styles.completed : ""
              }`}
            >
              {content}
            </div>
          </div>
        )}
      </div>

      <div className={styles.date}>
        {new Date(createdDate).toLocaleDateString()}
      </div>

      <div className={styles.btn}>
        <button
          className={`${styles.editBtn} ${isEditing ? styles.editing : ""}`}
          onClick={onClickEdit}
        >
          {isEditing ? <Check size={16} /> : <Edit size={16} />}
        </button>
        <button className={styles.deleteBtn} onClick={onClickDelete}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default React.memo(TodoItem);
