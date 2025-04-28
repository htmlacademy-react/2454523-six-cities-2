import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { DetailedOfferState } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';


const getDetailedOfferSlice = (state: Pick<State, NameSpace.DetailedOffer>): DetailedOfferState => state[NameSpace.DetailedOffer];

export const getDetailedOffer = createSelector(
  [getDetailedOfferSlice],
  (state:DetailedOfferState) => state.detailedOffer
);

export const getNighboringOffers = createSelector(
  [getDetailedOfferSlice],
  (state:DetailedOfferState) => state.neighboringOffers
);


export const getIsDetailedOfferLoading = createSelector(
  [getDetailedOfferSlice],
  (state: DetailedOfferState) => state.isDetailedOfferLoading
);

export const getIsDetailedOfferFetchingError = createSelector(
  [getDetailedOfferSlice],
  (state: DetailedOfferState) => state.isDetailedOfferFetchingError
);
