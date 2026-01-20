import { Link } from "react-router-dom";
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.link}>
        Blog
      </Link>

      <Link to="/contact" className={styles.link}>
        お問い合わせ
      </Link>
    </header>)
}

export default Header
