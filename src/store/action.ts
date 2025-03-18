import { createAction } from '@reduxjs/toolkit';
import { City, Offer, Offers } from '../types/offer';
import { AuthorizationStatus } from '../const';

export const changeCity = createAction<City['name']>('mainScreen/changeCity');
export const fetchOffers = createAction<Offers>('OFFERS/fetchOffers');
export const fetchDetailedOffer = createAction<Offer['id']>('OFFER/fetchDetailedOffer');
export const fetchNeighboringOffers = createAction<Offer['id']>('NEAR_PLACES/fetchNeighboringOffers');
export const fetchReviews = createAction<Offer['id']>('REVIEWS/fetchReviews');
export const dropOffer = createAction('OFFER/dropOffer');
export const fetchFavorites = createAction('FAVORITES/fetchFavorites');
export const setOfferLoading = createAction('OFFER/setOfferLoading');
export const changeSortOptions = createAction<string>('OFFERS/changeSortOptions');
export const setOffersDataLoadingStatus = createAction<boolean>('DATA/setOffersDataLoadingStatus');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
