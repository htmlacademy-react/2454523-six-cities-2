import { createReducer } from '@reduxjs/toolkit';
import { offers, detailedOffers } from '../mocks/offers';
import { reviews } from '../mocks/reviews';
import { InitialState } from '../types/state';
import { CITIES } from '../const';


import {
  changeCity,
  fetchOffers,
  fetchFavorites,
  fetchNeighboringOffers,
  fetchDetailedOffer,
  fetchReviews,
  dropOffer,
  setOfferLoading} from './action';

import { MAX_COUNT_NEAR_OFFERS } from '../const';

const initialState: InitialState = {
  city: CITIES[0],
  offers,
  neighboringOffers:[],
  reviews: [],
  isDetailedOfferLoading: true,
  detailedOffer: null,
  favorites: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffers, (state)=> {
      state.offers = offers;
    })
    .addCase(fetchDetailedOffer, (state,action) => {
      state.detailedOffer = detailedOffers.find((detailedOffer) => detailedOffer.id === action.payload) ?? null;
    })
    .addCase(fetchNeighboringOffers, (state, action) => {
      state.neighboringOffers = offers.filter((offer)=> offer.id !== action.payload).slice(0, MAX_COUNT_NEAR_OFFERS);
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
    });
});


export {reducer};
