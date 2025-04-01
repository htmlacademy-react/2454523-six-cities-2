import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersState } from '../../types/state';
import { fetchOffersAction } from '../api-actions';


const initialState: OffersState = {
  offers:[],
  isOffersDataLoading: false,
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
        state.isOffersDataLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state)=> {
        state.isOffersDataLoading = false;
      });
  }
});

//убрать setOffersDataLoadingStatus и fetchOffers;
