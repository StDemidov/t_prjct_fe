import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectNotificationMessage } from '../../../../redux/slices/notificationSlice';
import { changeAbcInfo } from '../../../../redux/slices/abcSlice';
import styles from './style.module.css';
import { setError } from '../../../../redux/slices/errorSlice';
import { hostName } from '../../../../utils/host';

const AbcForm = ({ defaultData, setIsEditing }) => {
  const dispatch = useDispatch();
  const notificationMessage = useSelector(selectNotificationMessage);
  // const [priceAAA, setPriceAAA] = useState(defaultData?.price_aaa);
  // const [priceA, setPriceA] = useState(defaultData?.price_a);
  // const [priceB, setPriceB] = useState(defaultData?.price_b);
  // const [priceBC10, setPriceBC10] = useState(defaultData?.price_bc10);
  // const [priceBC30, setPriceBC30] = useState(defaultData?.price_bc30);
  // const [priceC, setPriceC] = useState(defaultData?.price_c);
  // const [priceG, setPriceG] = useState(defaultData?.price_g);
  const [debAAA, setDebAAA] = useState(defaultData?.deb_aaa);
  const [debA, setDebA] = useState(defaultData?.deb_a);
  const [debB, setDebB] = useState(defaultData?.deb_b);
  const [debBC10, setDebBC10] = useState(defaultData?.deb_bc10);
  const [debBC30, setDebBC30] = useState(defaultData?.deb_bc30);
  const [debC, setDebC] = useState(defaultData?.deb_c);

  useEffect(() => {
    if (notificationMessage !== '') {
      setIsEditing(false);
    }
  }, [notificationMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      // priceAAA < 1 ||
      // priceA < 1 ||
      // priceB < 1 ||
      // priceBC10 < 1 ||
      // priceBC30 < 1 ||
      // priceC < 1 ||
      // priceG < 1 ||
      debAAA < 1 ||
      debA < 1 ||
      debB < 1 ||
      debBC10 < 1 ||
      debBC30 < 1 ||
      debC < 1
    ) {
      dispatch(setError('Все значения должны быть больше 1!'));
    } else {
      const data = {
        // price_aaa: priceAAA,
        // price_a: priceA,
        // price_b: priceB,
        // price_bc10: priceBC10,
        // price_bc30: priceBC30,
        // price_c: priceC,
        // price_g: priceG,
        deb_aaa: debAAA,
        deb_a: debA,
        deb_b: debB,
        deb_bc10: debBC10,
        deb_bc30: debBC30,
        deb_c: debC,
      };
      dispatch(
        changeAbcInfo({
          data: data,
          url: `${hostName}/${defaultData.id}`,
        })
      );
    }
  };

  return (
    <div className={styles.mainBox}>
      <form id="editAbc" className={styles.infoBox} onSubmit={handleSubmit}>
        <div className={`${styles.commonRow} ${styles.headerRow}`}>
          <div className={`${styles.firstCell} ${styles.commonCell}`}></div>
          <div className={styles.commonCell}>AAA</div>
          <div className={styles.commonCell}>A</div>
          <div className={styles.commonCell}>B</div>
          <div className={styles.commonCell}>BC30</div>
          <div className={styles.commonCell}>BC10</div>
          <div className={styles.commonCell}>C</div>
          <div className={styles.commonCell}>G</div>
        </div>
        <div className={styles.commonRow}>
          <input
            className={`${styles.firstCell} ${styles.commonCell}`}
            disabled={true}
            value="Порог"
          />
          <input
            required={true}
            type="text"
            id=""
            className={styles.commonCell}
            value={debAAA === '' ? defaultData?.deb_aaa : debAAA}
            onChange={(e) =>
              setDebAAA(Number(e.target.value.replace(/\D/g, '')))
            }
          />
          <input
            required={true}
            type="text"
            id=""
            className={styles.commonCell}
            value={debA === '' ? defaultData?.deb_a : debA}
            onChange={(e) => setDebA(Number(e.target.value.replace(/\D/g, '')))}
          />
          <input
            required={true}
            type="text"
            id=""
            className={styles.commonCell}
            value={debB === '' ? defaultData?.deb_b : debB}
            onChange={(e) => setDebB(Number(e.target.value.replace(/\D/g, '')))}
          />
          <input
            required={true}
            type="text"
            id=""
            className={styles.commonCell}
            value={debBC30 === '' ? defaultData?.deb_bc30 : debBC30}
            onChange={(e) =>
              setDebBC30(Number(e.target.value.replace(/\D/g, '')))
            }
          />
          <input
            required={true}
            type="text"
            id=""
            className={styles.commonCell}
            value={debBC10 === '' ? defaultData?.deb_bc10 : debBC10}
            onChange={(e) =>
              setDebBC10(Number(e.target.value.replace(/\D/g, '')))
            }
          />

          <input
            required={true}
            type="text"
            id=""
            className={styles.commonCell}
            value={debC === '' ? defaultData?.deb_c : debC}
            onChange={(e) => setDebC(Number(e.target.value.replace(/\D/g, '')))}
          />
          <input
            className={styles.commonCell}
            disabled={true}
            value={debC === '' ? defaultData?.deb_c : debC}
          />
        </div>
        {/* <div className={styles.commonRow}>
          <div className={`${styles.firstCell} ${styles.commonCell}`}>Цена</div>
          <input
            required={true}
            id=""
            className={styles.commonCell}
            value={priceAAA === '' ? defaultData?.price_aaa : priceAAA}
            onChange={(e) =>
              setPriceAAA(Number(e.target.value.replace(/\D/g, '')))
            }
          />
          <input
            required={true}
            type="text"
            id=""
            className={styles.commonCell}
            value={priceA === '' ? defaultData?.price_a : Number(priceA)}
            onChange={(e) =>
              setPriceA(Number(e.target.value.replace(/\D/g, '')))
            }
          />
          <input
            required={true}
            type="text"
            id=""
            className={styles.commonCell}
            value={priceB === '' ? defaultData?.price_b : priceB}
            onChange={(e) =>
              setPriceB(Number(e.target.value.replace(/\D/g, '')))
            }
          />
          <input
            required={true}
            type="text"
            id=""
            className={styles.commonCell}
            value={priceBC30 === '' ? defaultData?.price_bc30 : priceBC30}
            onChange={(e) =>
              setPriceBC30(Number(e.target.value.replace(/\D/g, '')))
            }
          />
          <input
            required={true}
            type="text"
            id=""
            className={styles.commonCell}
            value={priceBC10 === '' ? defaultData?.price_bc10 : priceBC10}
            onChange={(e) =>
              setPriceBC10(Number(e.target.value.replace(/\D/g, '')))
            }
          />
          <input
            required={true}
            type="text"
            id=""
            className={styles.commonCell}
            value={priceC === '' ? defaultData?.price_c : priceC}
            onChange={(e) =>
              setPriceC(Number(e.target.value.replace(/\D/g, '')))
            }
          />
          <input
            required={true}
            type="text"
            id=""
            className={styles.commonCell}
            value={priceG === '' ? defaultData?.price_g : priceG}
            onChange={(e) =>
              setPriceG(Number(e.target.value.replace(/\D/g, '')))
            }
          />
        </div> */}
      </form>
      <div className={styles.actionsBox}>
        <button type="submit" form="editAbc">
          Применить
        </button>
        <button
          onClick={() => {
            setIsEditing(false);
          }}
        >
          Отмена
        </button>
      </div>
    </div>
  );
};

export default AbcForm;
