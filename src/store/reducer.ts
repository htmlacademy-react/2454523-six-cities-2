import { createReducer } from '@reduxjs/toolkit';
import { detailedOffers } from '../mocks/offers';
import { reviews } from '../mocks/reviews';
import { InitialState } from '../types/state';
import { CITIES, SortType, AuthorizationStatus } from '../const';


import {
  changeCity,
  fetchOffers,
  fetchFavorites,
  fetchNeighboringOffers,
  fetchDetailedOffer,
  fetchReviews,
  dropOffer,
  setOfferLoading,
  changeSortOptions,
  setOffersDataLoadingStatus,
  requireAuthorization,
  setError,
} from './action';

import { MAX_COUNT_NEAR_OFFERS } from '../const';


const initialState: InitialState = {
  city: CITIES[0],
  offers:[],
  neighboringOffers:[],
  reviews: [],
  isDetailedOfferLoading: true,
  detailedOffer: null,
  favorites: [],
  sortType: SortType.Popular,
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,

};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffers, (state, action)=> {
      state.offers = action.payload;
    })
    .addCase(fetchDetailedOffer, (state,action) => {
      state.detailedOffer = detailedOffers.find((detailedOffer) => detailedOffer.id === action.payload) ?? null;
    })
    .addCase(fetchNeighboringOffers, (state, action) => {
      state.neighboringOffers = state.offers.filter((offer)=> offer.id !== action.payload).slice(0, MAX_COUNT_NEAR_OFFERS);
    })
    .addCase(fetchReviews, (state, action)=> {
      state.reviews = reviews.filter((review) => review.id === action.payload);
    })
    .addCase(dropOffer, (state)=> {
      state.detailedOffer = null;
      state.neighboringOffers = [];
    })
    .addCase(fetchFavorites, (state)=> {
      state.favorites = state.offers.filter((offer) => offer.isFavorite);
    })
    .addCase(setOfferLoading, (state)=> {
      state.isDetailedOfferLoading = false;
    })
    .addCase(changeSortOptions,(state, action)=> {
      state.sortType = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state,action)=> {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action)=> {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action)=> {
      state.error = action.payload;
    });
});


export {reducer};
