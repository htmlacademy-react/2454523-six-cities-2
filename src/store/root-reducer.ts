import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { detailedOfferSlice } from './detailed-offer/detailed-offer-slice';
import { errorSlice } from './error/error-slice';
import { favoritesSlice } from './favorites/favorites-slice';
import { filtersSlice } from './filters/filters-slice';
import { offersSlice } from './offers/offers-slice';
import { reviewsSlice } from './reviews/reviews-slice';
import { userProcessSlice } from './user-process/user-process-slice';

export const rootReducer = combineReducers({
  [NameSpace.Offers]:offersSlice.reducer,
  [NameSpace.DetailedOffer]:detailedOfferSlice.reducer,
  [NameSpace.Error]:errorSlice.reducer,
  [NameSpace.Favorites]:favoritesSlice.reducer,
  [NameSpace.Filters]:filtersSlice.reducer,
  [NameSpace.Reviews]:reviewsSlice.reducer,
  [NameSpace.User]:userProcessSlice.reducer,
});

