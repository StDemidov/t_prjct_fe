import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createProductionsList from '../../utils/createProductionsList';
import { setError } from './errorSlice';
import { setNotification } from './notificationSlice';

const initialState = {
  productionsData: [],
  isLoading: false,
  isDeleted: false,
};

export const fetchProductions = createAsyncThunk(
  'production/fetchProductions',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
    }
  }
);

export const changeProduction = createAsyncThunk(
  'production/changeProduction',
  async ({ data, url }, thunkAPI) => {
    try {
      const res = await axios.patch(url, data);
      thunkAPI.dispatch(
        setNotification('Данные о производстве успешно обновлены')
      );
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
    }
  }
);

export const deleteProduction = createAsyncThunk(
  'production/deleteProduction',
  async (url, thunkAPI) => {
    try {
      const res = await axios.delete(url);
      thunkAPI.dispatch(setNotification('Производство успешно удалено'));
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
    }
  }
);

export const createProduction = createAsyncThunk(
  'production/createProduction',
  async ({ data, url }, thunkAPI) => {
    try {
      const res = await axios.post(url, data);
      thunkAPI.dispatch(setNotification('Производство успешно создано'));
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
    }
  }
);

const productionSlice = createSlice({
  name: 'production',
  initialState: initialState,
  reducers: {
    setDeleted: (state) => {
      state.isDeleted = !state.isDeleted;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductions.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.productionsData = createProductionsList(action.payload);
        state.isDeleted = false;
      }
    });
    builder.addCase(fetchProductions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changeProduction.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(changeProduction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isDeleted = true;
    });
    builder.addCase(deleteProduction.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { setIsDeleted } = productionSlice.actions;

export const selectProductions = (state) => state.production.productionsData;
export const selectIsLoading = (state) => state.production.isLoading;
export const selectIsDeleted = (state) => state.production.isDeleted;

export default productionSlice.reducer;
