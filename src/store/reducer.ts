import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { changeCity, loadRentalOffers } from './action';

const initialState = {
  city: 'Paris',
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state) => {
      //state.city =
    });
});


export {reducer};
