import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { useDispatch } from 'react-redux';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin5Line } from 'react-icons/ri';
import styles from './style.module.css';
import { deleteProduction } from '../../redux/slices/productionSlice';

const ProductionTable = ({ productions }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const animStyles = useSpring({
    loop: false,
    from: { opacity: '0' },
    to: { opacity: '1' },
    config: { duration: '600' },
  });

  const handleClickOnEdit = (event) => {
    const id = event.currentTarget.getAttribute('data-value');
    navigation(`/productions/edit/${id}`);
  };
  const handleClickOnDelete = (event) => {
    const id = event.currentTarget.getAttribute('data-value');
    dispatch(deleteProduction(`http://localhost:8000/production/${id}`));
  };
  return (
    <animated.div style={{ ...animStyles }}>
      <section>
        <h1>Данные по производствам</h1>
        <div className={styles.tblHeader}>
          <table
            className={styles.tableClass}
            cellPadding="0"
            cellSpacing="0"
            border="0"
          >
            <thead>
              <tr>
                <th className={styles.thClass}>Название</th>
                <th className={styles.thClass}>Скорость печати</th>
                <th className={styles.thClass}>Скорость пошива</th>
                <th className={styles.thClass}></th>
              </tr>
            </thead>
          </table>
        </div>
        <div className={styles.tblContent}>
          <table
            className={styles.tableClass}
            cellPadding="0"
            cellSpacing="0"
            border="0"
          >
            <tbody>
              {productions.map((production) => {
                return (
                  <tr className={styles.trClass} key={production.id}>
                    <td className={styles.tdClass}>{production.name}</td>
                    <td className={styles.tdClass}>
                      {production.printing_speed}
                    </td>
                    <td className={styles.tdClass}>
                      {production.sewing_speed}
                    </td>
                    <td className={styles.tdClass}>
                      <div className={styles.buttonsBox}>
                        <CiEdit
                          data-value={production.id}
                          className={styles.button}
                          onClick={handleClickOnEdit}
                        />
                        <RiDeleteBin5Line
                          data-value={production.id}
                          className={styles.button}
                          onClick={handleClickOnDelete}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </animated.div>
  );
};

export default ProductionTable;
