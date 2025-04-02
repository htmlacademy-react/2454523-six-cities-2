import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DetailedOfferState } from '../../types/state';
import { fetchDetailedOfferAction } from '../api-actions';

const initialState: DetailedOfferState = {
  neighboringOffers:[],
  reviews: [],
  detailedOffer: null,
};

export const detailedOfferSlice = createSlice({
  name: NameSpace.DetailedOffer,
  initialState,
  reducers: {},
  extraReducers (builder){
    builder
      .addCase(fetchDetailedOfferAction.fulfilled, (state, action)=> {
        state.detailedOffer = action.payload.detailedOffer;
        state.neighboringOffers = action.payload.neighboringOffers;
        state.reviews = action.payload.reviews;
      });
  }
});

// убрать
//  dispatch(fetchDetailedOffer(detailedOfferData));
//       dispatch(fetchNeighboringOffers(neighboringOffers));
//       dispatch(fetchReviews(reviews));
