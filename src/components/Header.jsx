import React from "react";
import { BookOpen } from "lucide-react";
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
      <h3>MY TODO LIST</h3>
      <BookOpen
        size={40} // 크기
        color="#1f93ff" // 색상
        strokeWidth={2} // 선 두께
      />
    </div>
  );
};

export default React.memo(Header);
