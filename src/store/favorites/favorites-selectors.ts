import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { FavoritesState } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';

const getFavoritesSlice = (state: State): FavoritesState => state[NameSpace.Favorites];

export const getFavorites = createSelector(
  [getFavoritesSlice],
  (state: FavoritesState)=> state.favorites
);

export const getIsFavoritesLoading = createSelector(
  [getFavoritesSlice],
  (state: FavoritesState)=> state.isFavoritesLoading
);

export const getIsFavoritesFetchingError = createSelector(
  [getFavoritesSlice],
  (state: FavoritesState)=> state.isFavoritesFetchingError
);
