import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { selectNotificationMessage } from '../../redux/slices/notificationSlice';

import {
  fetchProductions,
  changeProduction,
  selectProductions,
  selectIsLoading,
} from '../../redux/slices/productionSlice';
import styles from './style.module.css';

const EditProduction = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const productions = useSelector(selectProductions);
  let { id } = useParams();
  const production_data = productions.filter((prod) => {
    return prod?.id === Number(id);
  })[0];
  const [name, setName] = useState(production_data?.name);
  const [sewingSpeed, setSewingSpeed] = useState(production_data?.sewing_speed);
  const [printingSpeed, setPrintingSpeed] = useState(
    production_data?.printing_speed
  );
  const notificationMessage = useSelector(selectNotificationMessage);
  const navigation = useNavigate();

  const animStyles = useSpring({
    loop: false,
    from: { opacity: '0' },
    to: { opacity: '1' },
    config: { duration: '600' },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let data =
      production_data?.name === name || name === ''
        ? {
            sewing_speed: sewingSpeed,
            printing_speed: printingSpeed,
          }
        : {
            name: name,
            sewing_speed: sewingSpeed,
            printing_speed: printingSpeed,
          };
    console.log(data);
    dispatch(
      changeProduction({
        data: data,
        url: `http://localhost:8000/production/${id}`,
      })
    );
  };

  useEffect(() => {
    if (productions.length === 0) {
      dispatch(fetchProductions('http://localhost:8000/production/'));
    }
  }, [productions.length, dispatch]);
  useEffect(() => {
    if (notificationMessage !== '') {
      navigation(`/productions`);
    }
  }, [notificationMessage, navigation]);

  return (
    <>
      {isLoading || productions.length === 0 ? (
        <FaSpinner />
      ) : (
        <section>
          <animated.div style={{ ...animStyles }}>
            <h1>Редактирование "{production_data.name}"</h1>
            <div className={styles.formContainer}>
              <form onSubmit={handleSubmit} className={styles.formStyle}>
                <ul>
                  <li>
                    <label htmlFor="name">Название: </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <span>Название должно быть уникальным</span>
                  </li>
                  <li>
                    <label htmlFor="sewingSpeed">Скорость пошива: </label>
                    <input
                      type="number"
                      min="0"
                      id="sewingSpeed"
                      value={sewingSpeed}
                      onChange={(e) => setSewingSpeed(e.target.value)}
                    />
                    <span>Значение должно быть положительным</span>
                  </li>
                  <li>
                    <label htmlFor="sewingSpeed">Скорость печати: </label>
                    <input
                      type="number"
                      min="0"
                      id="printingSpeed"
                      value={printingSpeed}
                      onChange={(e) => setPrintingSpeed(e.target.value)}
                    />
                    <span>Значение должно быть положительным</span>
                  </li>
                  <li>
                    <input type="submit" value="Применить изменения" />
                  </li>
                </ul>
              </form>
            </div>
          </animated.div>
        </section>
      )}
    </>
  );
};

export default EditProduction;
