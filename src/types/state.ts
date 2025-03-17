import { store } from '../store/index.js';
import { City, Offers, DetailedOffer } from './offer.js';
import { Reviews } from './review.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type InitialState ={
  city: City['name'];
  offers: Offers;
  neighboringOffers: Offers;
  reviews: Reviews;
  isDetailedOfferLoading: boolean;
  detailedOffer:DetailedOffer | null;
  favorites: Offers;
  sortType: string;
  isOffersDataLoading: boolean;
};
