import { createAction } from '@reduxjs/toolkit';
import { City, Offer } from '../types/offer';

export const changeCity = createAction<City['name']>('mainScreen/changeCity');
export const fetchOffers = createAction('OFFERS/fetchOffers');
export const fetchOffer = createAction<Offer['id']>('OFFER/fetchOffer');
export const fetchNeighboringOffers = createAction<Offer['id']>('NEAR_PLACES/fetchNeighboringOffers');
export const fetchReviews = createAction<Offer['id']>('REVIEWS/fetchReviews');
export const dropOffer = createAction('OFFER/dropOffer');
export const fetchFavorites = createAction('FAVORITES/fetchFavorites');
