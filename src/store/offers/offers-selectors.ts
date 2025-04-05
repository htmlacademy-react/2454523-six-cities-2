import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { OffersState } from '../../types/state';

const getOffersSlice = (state: State): OffersState => state[NameSpace.Offers];

export const getOffers = createSelector(
  [getOffersSlice],
  (state: OffersState) => state.offers
);

export const getIsOffersFetchingError = createSelector(
  [getOffersSlice],
  (state: OffersState) => state.isOffersFetchingError
);

export const getIsOffersDataLoading = createSelector(
  [getOffersSlice],
  (state: OffersState) => state.isOffersDataLoading
);
