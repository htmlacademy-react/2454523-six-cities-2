import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DetailedOfferState } from '../../types/state';
import { fetchDetailedOfferAction } from '../api-actions';
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
      })
      .addCase(fetchDetailedOfferAction.fulfilled, (state, action)=> {
        state.detailedOffer = action.payload.detailedOffer;
        state.neighboringOffers = action.payload.neighboringOffers.slice(0, MAX_COUNT_NEAR_OFFERS);
        state.isDetailedOfferLoading = false;
      })
      .addCase(fetchDetailedOfferAction.rejected, (state)=> {
        state.isDetailedOfferFetchingError = true;
        state.isDetailedOfferLoading = false;
      });

  }
});

export const {dropOffer} = detailedOfferSlice.actions;

