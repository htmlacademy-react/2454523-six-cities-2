import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { reviews } from '../mocks/reviews';
import { InitialState } from '../types/state';


import {
  changeCity,
  fetchOffers,
  fetchFavorites,
  fetchNeighboringOffers,
  fetchOffer,
  fetchReviews,
  dropOffer } from './action';
import { MAX_COUNT_NEAR_OFFERS } from '../const';

const initialState: InitialState = {
  city: 'Paris',
  offers,
  neighboringOffers:[],
  reviews: [],
  offer: null,
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
    .addCase(fetchOffer, (state,action) => {
      state.offer = offers.find((offer) => offer.id === action.payload) ?? null;
    })
    .addCase(fetchNeighboringOffers, (state, action) => {
      state.neighboringOffers = offers.filter((offer)=> offer.id !== action.payload).slice(0, MAX_COUNT_NEAR_OFFERS);
    })
    .addCase(fetchReviews, (state, action)=> {
      state.reviews = reviews.filter((review) => review.id === action.payload);
    })
    .addCase(dropOffer, (state)=> {
      state.offer = null;
      state.neighboringOffers = [];
    })
    .addCase(fetchFavorites, (state)=> {
      state.favorites = state.offers.filter((offer) => offer.isFavorite);
    });
});


export {reducer};
