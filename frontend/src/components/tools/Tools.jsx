import { NavLink } from 'react-router-dom';

import styles from './style.module.css';
import PriceControlPage from '../price-cotrol-page/PriceControlPage';

const Tools = () => {
  return (
    <section>
      <h2 className={styles.blockName}>Настройки</h2>
      <hr className={styles.line} />
      <div className={styles.tasksBox}>
        <NavLink to="abc_page" className={styles.link}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <p className={styles.cardTitle}>ABC-критерии</p>
              <p className={styles.cardPara}>
                Установка критериев по-умолчанию для различных категорий товаров
              </p>
            </div>
          </div>
        </NavLink>

        <NavLink to="ebitda_settings" className={styles.link}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <p className={styles.cardTitle}>Настройки EBITDA</p>
              <p className={styles.cardPara}>
                Настройки параметров, используемых в расчетах EBITDA
              </p>
            </div>
          </div>
        </NavLink>
      </div>
      <h2 className={styles.blockName}>Управление ценами</h2>
      <hr className={styles.line} />
      <div className={styles.tasksBox}>
        <NavLink to="tasks_b_28" className={styles.link}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <p className={styles.cardTitle}>Контроль цен до 28 дня</p>
              <p className={styles.cardPara}>
                Задачи на регулировку цен в зависимости от рассчитываемой
                АВС-категории до 28 дня жизни товара
              </p>
            </div>
          </div>
        </NavLink>

        <NavLink to="tasks_a_28" className={styles.link}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <p className={styles.cardTitle}>Контроль цен после 28 дня</p>
              <p className={styles.cardPara}>
                Задачи на регулировку цен в зависимости от рассчитываемой
                АВС-категории после 28 дня жизни товара
              </p>
            </div>
          </div>
        </NavLink>

        <NavLink to="tasks_drain" className={styles.link}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <p className={styles.cardTitle}>Ликвидация товара</p>
              <p className={styles.cardPara}>
                Задачи на ликвидацию товара с корректировкой цены с целью
                избавления от остатков к заданной дате
              </p>
            </div>
          </div>
        </NavLink>
      </div>
      <h2 className={styles.blockName}>Реклама</h2>
      <hr className={styles.line} />
    </section>
  );
};

export default Tools;
