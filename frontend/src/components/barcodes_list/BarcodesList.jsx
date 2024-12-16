import { FaSpinner } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

import { hostName } from '../../utils/host';
import {
  fetchBarcodes,
  selectBarcodes,
  selectIsLoading,
} from '../../redux/slices/barcodeSlice';
import BarcodesTable from '../barcodes_table/BarcodesTable';
import BarcodeFilters from '../barcodes_filters/BarcodeFilters';
import {
  selectBarcodeCategoryFilter,
  selectBarcodeDatesFilter,
} from '../../redux/slices/filterSlice';

const BarcodesList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const barcodes = useSelector(selectBarcodes);
  const categoryFilter = useSelector(selectBarcodeCategoryFilter);
  const dateFilter = useSelector(selectBarcodeDatesFilter);
  const startDate = new Date(dateFilter.start);
  const endDate = new Date(dateFilter.end);

  const animStyles = useSpring({
    loop: false,
    from: { opacity: '0' },
    to: { opacity: '1' },
    config: { duration: '600' },
  });

  useEffect(() => {
    dispatch(fetchBarcodes(`${hostName}/barcode/`));
  }, [barcodes.length, dispatch]);

  const filterSetted = categoryFilter.length !== 0 ? true : false;

  const filteredBarcodes = Object.fromEntries(
    Object.entries(barcodes).filter(([key, value]) => {
      if (value.category?.name) {
        return categoryFilter.includes(value.category.name);
      }
    })
  );

  return (
    <>
      {isLoading ? (
        <FaSpinner className="spinner" />
      ) : (
        <animated.div style={{ ...animStyles }}>
          <section>
            <h1>Данные по баркодам</h1>
            <BarcodeFilters />
            <BarcodesTable
              barcodes={filterSetted ? filteredBarcodes : barcodes}
            />
          </section>
        </animated.div>
      )}
    </>
  );
};

export default BarcodesList;

const getDataForPeriod = (data, startDate, endDate) => {
  const todayDate = new Date();
  const startIndex = Math.ceil((todayDate - startDate) / (1000 * 60 * 60 * 24)); // Индекс начала
  const endIndex = Math.floor((todayDate - endDate) / (1000 * 60 * 60 * 24)); // Индекс конца
  // Проверяем, что индексы в пределах массива
  if (startIndex < 0 || endIndex >= data.length || startIndex < endIndex) {
    throw new Error('Период выходит за пределы массива');
  }
  // Извлекаем данные за указанный период
  if (endIndex === 1) {
    return data.slice(-startIndex + 1);
  }
  return data.slice(-startIndex + 1, -endIndex + 1);
};

const getSum = (data, startDate, endDate) => {
  const currData = getDataForPeriod(data, startDate, endDate);
  var sumData = currData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  return sumData;
};

const getDataForPeriodRaw = (data, raw_data, startDate, endDate) => {
  const todayDate = new Date();
  const startIndex = Math.ceil((todayDate - startDate) / (1000 * 60 * 60 * 24)); // Индекс начала
  const endIndex = Math.floor((todayDate - endDate) / (1000 * 60 * 60 * 24)); // Индекс конца
  if (startIndex <= raw_data.length + 1 && endIndex <= raw_data.length + 1) {
    if (endIndex === 1) {
      return raw_data.slice(-startIndex + 1);
    }
    return raw_data.slice(-startIndex + 1, -endIndex + 1);
  } else if (
    startIndex > raw_data.length + 1 &&
    endIndex > raw_data.length + 1
  ) {
    return data.slice(
      -startIndex + raw_data.length + 1,
      -endIndex + raw_data.length + 1
    ); // Используем reverse(), чтобы вернуть порядок
  } else if (
    startIndex > raw_data.length + 1 &&
    endIndex <= raw_data.length + 1
  ) {
    if (endIndex === 1) {
      return data.slice(-startIndex + raw_data.length + 1).concat(raw_data);
    }
  }
  return data
    .slice(-startIndex + raw_data.length + 1)
    .concat(raw_data.slice(0, -endIndex + 1));
};

const getSumRaw = (data, raw_data, startDate, endDate) => {
  const currData = getDataForPeriodRaw(data, raw_data, startDate, endDate);
  var sumData = currData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  return sumData;
};
