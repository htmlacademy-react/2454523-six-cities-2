import { createReducer } from '@reduxjs/toolkit';
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
  setLoadingStatus,
  changeSortOptions,
  setOffersDataLoadingStatus,
  requireAuthorization,
  setError,
  setUserEmail,
  addReview,
  setFetchingError,
  setIsSubmitting,
  setIsSubmittingFailed
} from './action';

import { MAX_COUNT_NEAR_OFFERS } from '../const';


const initialState: InitialState = {
  city: CITIES[0],
  offers:[],
  neighboringOffers:[],
  reviews: [],
  isStatusLoading: true,
  detailedOffer: null,
  favorites: [],
  sortType: SortType.Popular,
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  userEmail: null,
  isFetchingError: false,
  isSubmitting:false,
  isSubmittingFailed: false,


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
      state.detailedOffer = action.payload;
    })
    .addCase(fetchNeighboringOffers, (state, action) => {
      state.neighboringOffers = action.payload.slice(0, MAX_COUNT_NEAR_OFFERS);
    })
    .addCase(fetchReviews, (state, action)=> {
      state.reviews = action.payload;
    })
    .addCase(dropOffer, (state)=> {
      state.detailedOffer = null;
      state.neighboringOffers = [];
    })
    .addCase(fetchFavorites, (state, action)=> {
      state.favorites = action.payload;
    })
    .addCase(setLoadingStatus, (state, action)=> {
      state.isStatusLoading = action.payload;
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
    })
    .addCase(setUserEmail, (state, action)=> {
      state.userEmail = action.payload;
    })
    .addCase(addReview, (state,action) => {
      state.reviews.push(action.payload);
    })
    .addCase(setFetchingError, (state, action)=>{
      state.isFetchingError = action.payload;
    })
    .addCase(setIsSubmitting, (state, action)=> {
      state.isSubmitting = action.payload;
    })
    .addCase(setIsSubmittingFailed, (state,action)=>{
      state.isSubmittingFailed = action.payload;
    });
});


export {reducer};
