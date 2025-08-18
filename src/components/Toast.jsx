import { CheckCircle } from "lucide-react";
import styles from "./Toast.module.css";

const Toast = ({ message, isVisible, onClose }) => {
  return (
    <div className={`${styles.toast} ${isVisible ? styles.show : ''}`}>
      <div className={styles.icon}>
        <CheckCircle size={20} />
      </div>
      <span className={styles.message}>{message}</span>
    </div>
  );
};

export default Toast;