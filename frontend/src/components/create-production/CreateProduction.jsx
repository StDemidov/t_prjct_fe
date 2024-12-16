import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { selectNotificationMessage } from '../../redux/slices/notificationSlice';

import { createProduction } from '../../redux/slices/productionSlice';
import { setError } from '../../redux/slices/errorSlice';
import styles from './style.module.css';

const CreateProduction = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [sewingSpeed, setSewingSpeed] = useState(0);
  const [printingSpeed, setPrintingSpeed] = useState(0);
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
    if (name !== '' && sewingSpeed > 0 && printingSpeed > 0) {
      const data = {
        name: name,
        sewing_speed: sewingSpeed,
        printing_speed: printingSpeed,
      };
      dispatch(
        createProduction({
          data: data,
          url: `http://localhost:8000/production/`,
        })
      );
    } else {
      dispatch(setError('Все поля должны быть заполнены'));
    }
  };

  useEffect(() => {
    if (notificationMessage !== '') {
      navigation(`/productions`);
    }
  }, [notificationMessage, navigation]);

  return (
    <section>
      <animated.div style={{ ...animStyles }}>
        <h1>Создание нового производства</h1>
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
                <input type="submit" value="Создать производство" />
              </li>
            </ul>
          </form>
        </div>
      </animated.div>
    </section>
  );
};

export default CreateProduction;
