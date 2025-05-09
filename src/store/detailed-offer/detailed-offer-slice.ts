import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DetailedOfferState } from '../../types/state';
import { addToFavorites, fetchDetailedOfferAction, removeFromFavorites } from '../api-actions';
import { MAX_COUNT_NEAR_OFFERS } from '../../const';


const initialState: DetailedOfferState = {
  neighboringOffers:[],
  detailedOffer: null,
  isDetailedOfferLoading: true,
  isDetailedOfferFetchingError: false
};

export const detailedOfferSlice = createSlice({
  name: NameSpace.DetailedOffer,
  initialState,
  reducers: {
    dropOffer: (state)=> {
      state.detailedOffer = null;
      state.neighboringOffers = [];
    }
  },
  extraReducers (builder){
    builder
      .addCase(fetchDetailedOfferAction.pending, (state)=> {
        state.isDetailedOfferLoading = true;
        state.isDetailedOfferFetchingError = false;
        state.detailedOffer = null;
      })
      .addCase(fetchDetailedOfferAction.fulfilled, (state, action)=> {
        state.detailedOffer = action.payload.detailedOffer;
        state.neighboringOffers = action.payload.neighboringOffers.slice(0, MAX_COUNT_NEAR_OFFERS);
        state.isDetailedOfferLoading = false;
        state.isDetailedOfferFetchingError = false;
      })
      .addCase(fetchDetailedOfferAction.rejected, (state)=> {
        state.isDetailedOfferFetchingError = true;
        state.isDetailedOfferLoading = false;
      })
      .addCase(addToFavorites.fulfilled, (state, action)=> {
        const updatedOffer = action.payload;
        if(state.detailedOffer?.id === updatedOffer.id){
          state.detailedOffer.isFavorite = true;
        }
      })
      .addCase(removeFromFavorites.fulfilled, (state, action)=> {
        const updatedOffer = action.payload;
        if(state.detailedOffer?.id === updatedOffer.id){
          state.detailedOffer.isFavorite = false;
        }
      });
  }
});

export const {dropOffer} = detailedOfferSlice.actions;

