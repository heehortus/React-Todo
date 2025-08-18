import styles from "./Header.module.css";

function KoreanDate() {
  const koreanDateString = new Date().toLocaleDateString("ko-KR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return <div>{koreanDateString}</div>;
}

const Header = () => {
  return (
    <div className={styles.Header}>
      <h3>오늘의 날짜는</h3>
      <h1>{KoreanDate()}</h1>
    </div>
  );
};

export default Header;
