import { NavLink } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import { clearCredentials } from '../../redux/slices/authSlice';
import styles from './style.module.css';

const Menu = () => {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    dispatch(clearCredentials());
  };
  return (
    <nav className={styles.navMenu}>
      <ul className={styles.menuItems}>
        <li>
          <NavLink className={styles.navLink} to="." end content="Главная">
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.navLink} to="vendorcodes" content="Товары">
            Товары
          </NavLink>
        </li>
        <li>
          <NavLink
            className={styles.navLink}
            to="categories"
            content="Категории"
          >
            Категории
          </NavLink>
        </li>
        {/* <li>
          <NavLink className={styles.navLink} to="clothes" content="Ткань">
            Ткань
          </NavLink>
        </li>
        <li>
          <NavLink
            className={styles.navLink}
            to="productions"
            content="Производства"
          >
            Производства
          </NavLink>
        </li> */}
        <li>
          <NavLink className={styles.navLink} to="barcodes" content="Баркоды">
            Баркоды
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.navLink} to="tools" content="Инструменты">
            Инструменты
          </NavLink>
        </li>
        <li className={styles.logoutBlock}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <MdLogout />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
