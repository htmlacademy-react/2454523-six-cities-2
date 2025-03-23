import { AxiosInstance } from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { DetailedOffer, Offers } from '../types/offer.js';
import { fetchOffers,
  setOffersDataLoadingStatus,
  requireAuthorization,
  setError, setUserEmail,
  redirectToRoute,
  fetchDetailedOffer,
  setDetailedOfferLoading,
  fetchNeighboringOffers,
  fetchReviews,
  addReview} from './action.js';
import { ApiRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import {store} from './';
import { AuthData } from '../types/auth-data.js';
import { UserData } from '../types/user-data.js';
import { saveToken } from '../services/token.js';
import { dropToken } from '../services/token.js';
import { dropEmail, getEmail, saveEmail } from '../services/email.js';
import { Reviews, Review, PostReview } from '../types/review.js';


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
      dispatch(setUserEmail(getEmail()));
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


export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const { data } = await api.post<UserData>(ApiRoute.Login, { email, password });
    saveToken(data.token);
    saveEmail(data.email);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(setUserEmail(data.email));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/logout',
  async (_arg, {dispatch, extra:api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dropEmail();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);

export const fetchDetailedOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchDetailedOffer',
  async (id, {dispatch, extra: api})=> {
    dispatch(setDetailedOfferLoading(true));
    const {data: detailedOfferData} = await api.get<DetailedOffer>(`${ApiRoute.Offers}/${id}`);
    const {data: neighboringOffers} = await api.get<Offers>(`${ApiRoute.Offers}/${id}/nearby`);
    const {data: rewievs} = await api.get<Reviews>(`${ApiRoute.Comments}/${id}`);
    dispatch(fetchDetailedOffer(detailedOfferData));
    dispatch(fetchNeighboringOffers(neighboringOffers));
    dispatch(fetchReviews(rewievs));
    dispatch(setDetailedOfferLoading(false));
  }
);

export const postReviewAction = createAsyncThunk<
  Review,
  { offerId: string ; reviewData: PostReview },
  { dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'DATA/postReview',
  async ({ offerId, reviewData }, { dispatch, extra: api }) => {
    const { data } = await api.post<Review>(
      `${ApiRoute.Comments}/${offerId}`,
      {
        comment: reviewData.comment,
        rating: reviewData.rating
      }
    );
    dispatch(addReview(data));
    return data;
  }
);
