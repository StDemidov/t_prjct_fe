import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { selectNotificationMessage } from '../../../../redux/slices/notificationSlice';

import {
  fetchSkuData,
  selectSkuData,
  selectIsLoading,
  selectTaskSingle,
  fetchTaskB28ById,
  editTaskB28,
} from '../../../../redux/slices/tasksB28Slice';
import { selectSkuOrNameTasksFilter } from '../../../../redux/slices/filterSlice';
import { hostName } from '../../../../utils/host';

import SkuNameFilter from '../../sku-name-filter/SkuNameFilter';
import { setError } from '../../../../redux/slices/errorSlice';
import styles from './style.module.css';

const TaskB28Edit = () => {
  const dispatch = useDispatch();
  const notificationMessage = useSelector(selectNotificationMessage);
  const skuData = useSelector(selectSkuData);
  const taskData = useSelector(selectTaskSingle);
  const isLoading = useSelector(selectIsLoading);
  const skuOrNameFilter = useSelector(selectSkuOrNameTasksFilter);
  const navigation = useNavigate();
  let { id } = useParams();

  const [skuList, setSkuList] = useState([]);

  useEffect(() => {
    if (notificationMessage !== '') {
      navigation(`/tools/tasks_b_28`);
    }
  }, [notificationMessage]);

  useEffect(() => {
    dispatch(fetchTaskB28ById(`${hostName}/tasksb28/${id}`));
    dispatch(fetchSkuData(`${hostName}/price_control_b_28/`));
  }, []);

  useEffect(() => {
    if (taskData.task) {
      setSkuList(taskData?.task?.sku_list.split(','));
    }
  }, [taskData]);

  const filteredSkuData = skuData.filter((sku) => {
    return sku.taskId == id || skuList.includes(sku.sku);
  });

  const filteredSkuDataWCat = filteredSkuData.filter((sku) => {
    let skuOrNameMatch = true;
    if (skuOrNameFilter.length !== 0) {
      if (isNaN(skuOrNameFilter)) {
        skuOrNameMatch = sku.vcName
          .toLowerCase()
          .includes(skuOrNameFilter.toLowerCase());
      } else {
        skuOrNameMatch = sku.sku.toLowerCase().includes(skuOrNameFilter);
      }
    }
    return skuOrNameMatch;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (skuList.length === 0) {
      dispatch(setError('Необходимо выбрать хотя бы 1 артикул!'));
    } else {
      const data = {
        sku_list: skuList.join(','),
      };
      if (taskData.task.is_active) {
        dispatch(
          editTaskB28({
            data: data,
            url: `${hostName}/tasksb28/with_reset_skus/${id}`,
          })
        );
      } else {
        dispatch(
          editTaskB28({
            data: data,
            url: `${hostName}/tasksb28/${id}`,
          })
        );
      }
    }
  };

  const handeClickOnVC = (e) => {
    const sku = e.currentTarget.getAttribute('data-value');
    if (skuList.includes(sku)) {
      const newList = skuList.filter((elem) => {
        return elem !== sku;
      });
      setSkuList(newList);
    } else {
      setSkuList([].concat(skuList, sku));
    }
  };

  const highlightMatch = (text, filter) => {
    if (filter.length === 0 || !isNaN(filter)) return text;
    const regex = new RegExp(`(${filter})`, 'gi');
    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className={styles.highlight}>
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  return (
    <section>
      {taskData?.task?.is_completed ? (
        <></>
      ) : (
        <>
          <h1>Редактирование {taskData?.task?.taskName}</h1>
          <div className={styles.mainContainer}>
            <div className={styles.formContainer}>
              <form id="taskEdit" onSubmit={handleSubmit} outside>
                <ul>
                  <li className={styles.nameInput}>
                    <div>{taskData?.task?.taskName}</div>
                  </li>
                </ul>

                <div className={styles.infoText}>
                  Выберите артикулы, которые хотите отключить
                </div>

                <div className={styles.textFilter}>
                  <SkuNameFilter />
                </div>

                <div className={styles.skuGrid}>
                  {isLoading ? (
                    <FaSpinner className="spinner" />
                  ) : (
                    filteredSkuDataWCat.map((sku) => {
                      return (
                        <div
                          className={
                            skuList.includes(sku.sku)
                              ? styles.singleSkuChosen
                              : styles.singleSku
                          }
                          onClick={handeClickOnVC}
                          data-value={sku.sku}
                        >
                          <img src={sku.image} />
                          <div>
                            {highlightMatch(sku.vcName, skuOrNameFilter)}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </form>
            </div>
            <div className={styles.infoContainer}>
              <button
                type="submit"
                form="taskEdit"
                className={styles.buttonAccept}
              >
                Изменить
                <p className={styles.buttonPara}>
                  После редактирования задачи, она будет неактивной, чтобы
                  начать автоматически менять цены, запустите ее.
                </p>
              </button>
              <div className={styles.description}>
                <p>
                  1. Название задачи должно быть уникальным, лучше всего
                  придерживаться шаблона:
                  <br />
                  ДатаДропа_Категория_Пометка_ДатаЗаведенияЗадачи
                  <br />
                  (Пример: 01.01_Футболки_Узбекистан_02.01)
                  <br />
                  2. В одну задачу нельзя добавлять артикулы из разных
                  категорий.
                  <br />
                  3. Перед заведение задачи посмотрите работу алгоритма.
                  <br />
                  4. После заведения задачи, она автоматически становится
                  неактивной, чтобы запустить ее, нажмите кнопку "Запустить" в
                  меню задач.
                  <br />
                  5. Созданную задачу нельзя изменять, если вы допустили ошибку
                  - удалите задачу и создайте новую.
                  <br />
                  6. В данном типе задач отображаются только свежие артикулы
                  (срок жизни меньше 28 дней).
                  <br />
                  7. Если артикула нет в списке, но он уже появился, значит по
                  нему еще не было заказа, артикулы попадают в нашу базу только
                  после первого заказа.
                  <br />
                  8. Заводить задачу необязательно сразу после появления товара,
                  крайний срок - 8 день жизни товара.
                  <br />
                  9. Каждый артикул можно добавить только в одну задачу данного
                  типа, если артикула нет в списке, возможно, он уже привязан к
                  другой задаче
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default TaskB28Edit;
