import { AxiosInstance } from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State, DetailedOfferPayload} from '../types/state.ts';
import { DetailedOffer, Offers, Offer } from '../types/offer.ts';

import { setError } from './error/error-slice.ts';

import { redirectToRoute } from './action.ts';
import { ApiRoute, AppRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData } from '../types/auth-data.ts';
import { UserData } from '../types/user-data.ts';
import { saveToken } from '../services/token.ts';
import { dropToken } from '../services/token.ts';
import { dropEmail, saveEmail } from '../services/email.ts';
import { Reviews, Review, PostReview } from '../types/review.ts';


export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchOffers',
  async (_arg, {extra: api})=> {
    const {data} = await api.get<Offers>(ApiRoute.Offers);
    return data;


  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/checkAuth',
  async (_arg, { extra: api}) => {
    await api.get(ApiRoute.Login);
  },
);


export const clearErrorAction = createAsyncThunk(
  'ERROR/clearError',
  (_arg, { dispatch }) => {
    setTimeout(() => dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const { data } = await api.post<UserData>(ApiRoute.Login, { email, password });
    saveToken(data.token);
    saveEmail(data.email);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  },
);


export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/logout',
  async (_arg, { extra:api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dropEmail();
  }
);


export const fetchDetailedOfferAction = createAsyncThunk<DetailedOfferPayload, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchDetailedOffer',
  async (id, { extra: api})=> {

    const {data: detailedOfferData} = await api.get<DetailedOffer>(`${ApiRoute.Offers}/${id}`);
    const {data: neighboringOffers} = await api.get<Offers>(`${ApiRoute.Offers}/${id}/nearby`);
    return {
      detailedOffer: detailedOfferData,
      neighboringOffers,
    };

  }
);

export const fetchReviewsAction = createAsyncThunk<Reviews, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchReview',
  async (id, { extra: api})=> {
    const {data: reviews} = await api.get<Reviews>(`${ApiRoute.Comments}/${id}`);
    return reviews;

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
  async ({ offerId, reviewData }, {extra: api }) => {

    const { data } = await api.post<Review>(
      `${ApiRoute.Comments}/${offerId}`,
      {
        comment: reviewData.comment,
        rating: reviewData.rating
      }
    );
    return data;

  }
);

export const fetchFavoritesOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchFavоritesOffers',
  async (_arg, { extra: api})=> {

    const {data} = await api.get<Offers>(ApiRoute.Favorite);

    return data;
  }

);

export const addToFavorites = createAsyncThunk<
  Offer,
  string,
  { dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'DATA/addToFavorites',
  async (offerId , {extra: api }) => {

    const { data } = await api.post<Offer>(
      `${ApiRoute.Favorite}/${offerId}/${1}`,

    );
    return data;

  }
);


export const removeFromFavorites = createAsyncThunk<
  Offer,
  string,
  { dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'DATA/removeFromFavorites',
  async (offerId, {extra: api }) => {

    const { data } = await api.post<Offer>(
      `${ApiRoute.Favorite}/${offerId}/${0}`,

    );
    return data;

  }
);
