import { useState } from "react";
// 아이콘
import { Edit, Check, Trash2 } from "lucide-react";
import styles from "./TodoItem.module.css";

const TodoItem = ({
  id,
  content,
  isDone,
  createdDate,
  onUpdate,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
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
    if (isEditing && editContent.trim()) {
      onEdit(id, editContent.trim());
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
      <div className={styles.title}>
        {isEditing ? (
          <input
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            autoFocus
          />
        ) : (
          content
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

export default TodoItem;
