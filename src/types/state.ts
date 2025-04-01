import { store } from '../store/index.js';
import { City, Offers, DetailedOffer } from './offer.js';
import { Reviews } from './review.js';
import { AuthorizationStatus } from '../const';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type InitialState ={
  city: City['name'];
  offers: Offers;
  neighboringOffers: Offers;
  reviews: Reviews;
  isStatusLoading: boolean;
  detailedOffer:DetailedOffer | null;
  favorites: Offers;
  sortType: string;
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string|null;
  userEmail: string|null;
  isFetchingError: boolean;
  isSubmitting: boolean;
  isSubmittingFailed: boolean;
};

export type UserProcess = Pick<InitialState, 'authorizationStatus' | 'userEmail'>;
