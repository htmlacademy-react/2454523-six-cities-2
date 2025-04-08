import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersState } from '../../types/state';
import { fetchOffersAction } from '../api-actions';


const initialState: OffersState = {
  offers:[],
  isOffersDataLoading: false,
  isOffersFetchingError: false
};

export const offersSlice = createSlice ({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder){
    builder
      .addCase(fetchOffersAction.pending, (state)=> {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action)=> {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state)=> {
        state.isOffersDataLoading = false;
        state.isOffersFetchingError = true;
      });
  }
});
