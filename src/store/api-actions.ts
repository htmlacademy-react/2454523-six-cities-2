import { AxiosInstance } from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { Offers } from '../types/offer.js';
import { fetchOffers, setOffersDataLoadingStatus, requireAuthorization, setError } from './action.js';
import { ApiRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import {store} from './';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchOffers',
  async (_arg, {dispatch, extra: api})=> {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offers>(ApiRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(fetchOffers(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(ApiRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const clearErrorAction = createAsyncThunk(
  'ERROR/clearError',
  () => {
    setTimeout(
      ()=>store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR
    );
  }
);
