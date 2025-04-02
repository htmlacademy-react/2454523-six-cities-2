import { AxiosInstance } from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State, DetailedOfferPayload} from '../types/state.js';
import { DetailedOffer, Offers } from '../types/offer.js';
import { fetchOffers,
  setOffersDataLoadingStatus,
  requireAuthorization,
  setError, setUserEmail,
  redirectToRoute,
  fetchDetailedOffer,
  setLoadingStatus,
  fetchNeighboringOffers,
  fetchReviews,
  addReview,
  fetchFavorites,
  setFetchingError,
  setIsSubmitting,
  setIsSubmittingFailed} from './action.js';
import { ApiRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import {store} from './';
import { AuthData } from '../types/auth-data.js';
import { UserData } from '../types/user-data.js';
import { saveToken } from '../services/token.js';
import { dropToken } from '../services/token.js';
import { dropEmail, getEmail, saveEmail } from '../services/email.js';
import { Reviews, Review, PostReview } from '../types/review.js';


export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchOffers',
  async (_arg, {dispatch, extra: api})=> {
    try{
      dispatch(setOffersDataLoadingStatus(true));
      const {data} = await api.get<Offers>(ApiRoute.Offers);
      dispatch(fetchOffers(data));
      return data;
    } catch (error) {
      dispatch(setFetchingError(true));
      throw error;
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }

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
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(setUserEmail(data.email));
    return data;
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


export const fetchDetailedOfferAction = createAsyncThunk<DetailedOfferPayload, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchDetailedOffer',
  async (id, {dispatch, extra: api})=> {
    try{
      dispatch(setLoadingStatus(true));
      const {data: detailedOfferData} = await api.get<DetailedOffer>(`${ApiRoute.Offers}/${id}`);
      const {data: neighboringOffers} = await api.get<Offers>(`${ApiRoute.Offers}/${id}/nearby`);
      const {data: reviews} = await api.get<Reviews>(`${ApiRoute.Comments}/${id}`);
      dispatch(fetchDetailedOffer(detailedOfferData));
      dispatch(fetchNeighboringOffers(neighboringOffers));
      dispatch(fetchReviews(reviews));
      return {
        detailedOffer: detailedOfferData,
        neighboringOffers,
        reviews
      };
    } catch (error){
      dispatch(setFetchingError(true));
      throw error;
    } finally {
      dispatch(setLoadingStatus(false));
    }
  }
);

export const postReviewAction = createAsyncThunk<
  void,
  { offerId: string ; reviewData: PostReview },
  { dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'DATA/postReview',
  async ({ offerId, reviewData }, { dispatch, extra: api }) => {
    try{
      dispatch(setIsSubmitting(true));
      const { data } = await api.post<Review>(
        `${ApiRoute.Comments}/${offerId}`,
        {
          comment: reviewData.comment,
          rating: reviewData.rating
        }
      );
      dispatch(addReview(data));
    } catch{
      dispatch(setIsSubmittingFailed(true));
    } finally {
      dispatch(setIsSubmitting(false));
    }

  }
);


export const fetchFavoritesOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchFavоritesOffers',
  async (_arg, {dispatch, extra: api})=> {
    try{
      dispatch(setLoadingStatus(true));
      const {data} = await api.get<Offers>(ApiRoute.Favorite);
      dispatch(fetchFavorites(data));
    } catch {
      dispatch(setFetchingError(true));
    } finally {
      dispatch(setLoadingStatus(false));
    }

  }
);
