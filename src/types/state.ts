import { store } from '../store/index.js';
import { City, Offers, DetailedOffer } from './offer.js';
import { Reviews } from './review.js';
import { AuthorizationStatus } from '../const';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type InitialState ={
  city: City['name'];
  //сделано
  offers: Offers;
  isOffersDataLoading: boolean;

  //сделано
  neighboringOffers: Offers;
  reviews: Reviews;
  detailedOffer:DetailedOffer | null;

  isStatusLoading: boolean;
  favorites: Offers;
  sortType: string;

  //сделано
  authorizationStatus: AuthorizationStatus;
  userEmail: string|null;

  error: string|null;
  isFetchingError: boolean;
  isSubmitting: boolean;
  isSubmittingFailed: boolean;
};

export type UserProcessState = Pick<InitialState, 'authorizationStatus' | 'userEmail'>;
export type OffersState = Pick<InitialState, 'offers' | 'isOffersDataLoading'>;
export type DetailedOfferState = Pick<InitialState, 'neighboringOffers' | 'reviews' | 'detailedOffer'>;

export type DetailedOfferPayload = {
  detailedOffer: DetailedOffer;
  neighboringOffers: Offers;
  reviews: Reviews;
}
