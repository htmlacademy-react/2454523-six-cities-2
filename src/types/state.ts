import { store } from '../store/index.js';
import { City, Offers, Offer } from './offer.js';
import { Reviews } from './review.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type InitialState ={
  city: City['name'];
  offers: Offers;
  neighboringOffers: Offers;
  reviews: Reviews;
  offer:Offer | null;
  favorites: Offers;
};
