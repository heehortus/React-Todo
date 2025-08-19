import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Calendar.module.css";

const Calendar = ({ selectedDate, onDateSelect, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 선택된 날짜가 있으면 해당 월로 이동
  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(new Date(selectedDate));
    }
  }, [selectedDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 이전 달로 이동
  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // 해당 월의 첫 번째 날
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // 달력 시작일 (이전 달의 마지막 주 포함)
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  // 달력에 표시할 날짜들 생성
  const calendarDays = [];
  for (let i = 0; i < 42; i++) {
    // 6주 * 7일
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    calendarDays.push(date);
  }

  const handleDateClick = (date) => {
    onDateSelect(date);
    onClose();
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!selectedDate) return false;
    const selected = new Date(selectedDate);
    return date.toDateString() === selected.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === month;
  };

  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className={styles.calendarOverlay} onClick={onClose}>
      <div className={styles.calendar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <button onClick={goToPrevMonth} className={styles.navButton}>
            <ChevronLeft size={20} />
          </button>
          <h3 className={styles.monthYear}>
            {year}년 {monthNames[month]}
          </h3>
          <button onClick={goToNextMonth} className={styles.navButton}>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className={styles.dayNames}>
          {dayNames.map((day) => (
            <div key={day} className={styles.dayName}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.days}>
          {calendarDays.map((date, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              className={`
                ${styles.day}
                ${!isCurrentMonth(date) ? styles.otherMonth : ""}
                ${isToday(date) ? styles.today : ""}
                ${isSelected(date) ? styles.selected : ""}
              `.trim()}
            >
              {date.getDate()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
