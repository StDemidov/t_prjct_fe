import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import {
  fetchProductions,
  selectProductions,
  selectIsLoading,
  selectIsDeleted,
} from '../../redux/slices/productionSlice';
import { useEffect } from 'react';
import ProductionTable from '../production-table/ProductionTable';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';

const ProductionsList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isDeleted = useSelector(selectIsDeleted);
  const productions = useSelector(selectProductions);
  const navigation = useNavigate();
  useEffect(() => {
    dispatch(fetchProductions('http://localhost:8000/production/'));
  }, [productions.length, dispatch, isDeleted]);

  const navigateToCreateProduction = () => {
    navigation(`/productions/create/`);
  };

  return (
    <>
      {isLoading ? (
        <FaSpinner className="spinner" />
      ) : (
        <>
          <ProductionTable productions={productions} />
          <Button
            text="Добавить новое производство"
            onClick={navigateToCreateProduction}
          />
        </>
      )}
    </>
  );
};

export default ProductionsList;
