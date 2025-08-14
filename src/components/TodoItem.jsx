import "./TodoItem.css";

const TodoItem = ({ id, content, isDone, createdDate, onUpdate, onDelete }) => {
  // 체크박스 체크 시 onUpdate 호출
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  // 삭제 버튼 클릭 시 onDelete 호출
  const onClickDelete = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      <div className="checkbox-col">
        <input onChange={onChangeCheckbox} checked={isDone} type="checkbox" />
      </div>
      <div className="title-col">{content}</div>
      <div className="date-col">
        {new Date(createdDate).toLocaleDateString()}
      </div>
      <div className="btn-col">
        <button onClick={onClickDelete}>삭제</button>
      </div>
    </div>
  );
};

export default TodoItem;
